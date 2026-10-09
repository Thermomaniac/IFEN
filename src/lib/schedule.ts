// Filtering, grouping and date formatting for the course listing. Dates are stored as
// local "YYYY-MM-DDTHH:mm" strings and formatted without the runtime time zone, so the
// server and the browser render the same text.

import {
  FORMAT_LABELS,
  LANGUAGE_LABELS,
  TYPE_LABELS,
  type CourseFormat,
  type CourseType,
  type Language,
  type ScheduleItem,
} from "@/data/schedule";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type DateParts = { weekday: string; day: string; month: string; year: string; time: string };

export function dateParts(value: string): DateParts {
  const [date, time] = value.split("T");
  const [y, m, d] = date.split("-").map(Number);
  return {
    weekday: WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()],
    day: String(d).padStart(2, "0"),
    month: MONTHS[m - 1],
    year: String(y),
    time,
  };
}

/** "Mon, 05 Oct 2026" */
export function formatDay(value: string) {
  const p = dateParts(value);
  return `${p.weekday}, ${p.day} ${p.month} ${p.year}`;
}

/** Time range for one item: "19:00 to 20:00" on one day, otherwise the end date as well. */
export function formatSpan(item: ScheduleItem) {
  if (!item.start) return null;
  const start = dateParts(item.start);
  if (!item.end) return { time: start.time, until: null };
  const sameDay = item.start.slice(0, 10) === item.end.slice(0, 10);
  const end = dateParts(item.end);
  return sameDay
    ? { time: `${start.time} to ${end.time}`, until: null }
    : { time: start.time, until: `${formatDay(item.end)}, ${end.time}` };
}

export type PriceFilter = "paid" | "free" | "reduced";

export type Filters = {
  query: string;
  type: CourseType | "";
  language: Language | "";
  format: CourseFormat | "";
  price: PriceFilter | "";
};

export const EMPTY_FILTERS: Filters = { query: "", type: "", language: "", format: "", price: "" };

export const PRICE_LABELS: Record<PriceFilter, string> = {
  paid: "Paid",
  free: "Free",
  reduced: "With reduced rates",
};

export const isFiltered = (f: Filters) => Object.values(f).some(Boolean);

/** Lower case without accents, so "modulo" finds "MÓDULO" and "prufung" finds "Prüfung". */
const fold = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function matches(item: ScheduleItem, f: Filters) {
  if (f.type && item.type !== f.type) return false;
  if (f.language && item.language !== f.language) return false;
  if (f.format && item.format !== f.format) return false;
  if (f.price === "paid" && item.prices.length === 0) return false;
  if (f.price === "free" && item.prices.length > 0) return false;
  if (f.price === "reduced" && item.prices.length < 2) return false;
  const query = fold(f.query.trim());
  if (!query) return true;
  const haystack = fold(
    [
      item.title,
      item.code,
      item.location,
      TYPE_LABELS[item.type],
      FORMAT_LABELS[item.format],
      item.language ? LANGUAGE_LABELS[item.language] : "",
    ].join(" "),
  );
  return query.split(/\s+/).every((word) => haystack.includes(word));
}

export type MonthGroup = { key: string; label: string; items: ScheduleItem[] };

/** Groups by start month in list order; flexible dates form their own group, placed last. */
export function groupByMonth(items: ScheduleItem[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();
  for (const item of items) {
    const key = item.start ? item.start.slice(0, 7) : "flexible";
    if (!groups.has(key)) {
      const [y, m] = key.split("-").map(Number);
      const label = item.start ? `${MONTHS_LONG[m - 1]} ${y}` : "Flexible dates";
      groups.set(key, { key, label, items: [] });
    }
    groups.get(key)!.items.push(item);
  }
  return [...groups.values()].sort((a, b) => Number(a.key === "flexible") - Number(b.key === "flexible"));
}

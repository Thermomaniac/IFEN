// Filtering for the therapist directory. Everything runs on the published records:
// a filter on a field the directory does not publish (price, availability) matches
// nothing rather than guessing.

import type { CountryCode, Level, QualificationId, Therapist } from "@/data/therapists";

/** Slider bounds in EUR per session. */
export const PRICE_BOUNDS = { min: 0, max: 200, step: 5 };

export type DateRange = { from: string; to: string };

export type DirectoryFilters = {
  query: string;
  country: CountryCode | "";
  qualifications: QualificationId[];
  levels: Level[];
  /** "" for every practice; "yes" or "no" for practices with or without an IFEN lecturer. */
  lecturer: "" | "yes" | "no";
  price: { min: number; max: number } | null;
  dates: DateRange | null;
};

export const EMPTY_DIRECTORY_FILTERS: DirectoryFilters = {
  query: "",
  country: "",
  qualifications: [],
  levels: [],
  lecturer: "",
  price: null,
  dates: null,
};

/** Case and accent insensitive, so "munchen" finds "München". */
export const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase();

const haystack = new WeakMap<Therapist, string>();
function searchText(t: Therapist) {
  let s = haystack.get(t);
  if (s === undefined) {
    const a = t.address;
    s = fold([t.name, t.contact, a?.street, a?.postalCode, a?.city].filter(Boolean).join(" "));
    haystack.set(t, s);
  }
  return s;
}

export function matchesQuery(t: Therapist, query: string) {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = searchText(t);
  return words.every((w) => text.includes(w));
}

export function matchesTherapist(t: Therapist, f: DirectoryFilters) {
  if (!matchesQuery(t, f.query)) return false;
  if (f.country && t.country !== f.country) return false;
  // A practice must offer every selected method.
  if (f.qualifications.some((q) => !t.qualifications.includes(q))) return false;
  if (f.levels.length > 0 && (!t.level || !f.levels.includes(t.level))) return false;
  if (f.lecturer && (f.lecturer === "yes") !== Boolean(t.lecturers?.length)) return false;
  if (f.price) {
    const p = t.price;
    if (!p || p.max < f.price.min || p.min > f.price.max) return false;
  }
  if (f.dates) {
    const { from, to } = f.dates;
    if (!t.availability?.some((w) => w.from <= to && w.to >= from)) return false;
  }
  return true;
}

export function activeDirectoryFilters(f: DirectoryFilters) {
  return (
    (f.query.trim() ? 1 : 0) +
    (f.country ? 1 : 0) +
    (f.qualifications.length ? 1 : 0) +
    (f.levels.length ? 1 : 0) +
    (f.lecturer ? 1 : 0) +
    (f.price ? 1 : 0) +
    (f.dates ? 1 : 0)
  );
}

/** Great-circle distance in km. */
export function distanceKm([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function formatAddress(t: Therapist) {
  const a = t.address;
  if (!a) return "";
  const place = [a.postalCode, a.city].filter(Boolean).join(" ");
  return [a.street, place].filter(Boolean).join(", ");
}

export function initials(name: string) {
  const words = name.replace(/[^\p{L}\s-]/gu, " ").split(/[\s-]+/).filter(Boolean);
  return (words[0]?.[0] ?? "") + (words[1]?.[0] ?? "");
}

const DAY_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "12 Oct" from "YYYY-MM-DD", without the runtime time zone. */
export function shortDate(value: string) {
  const [, m, d] = value.split("-").map(Number);
  return `${d} ${DAY_MONTHS[m - 1]}`;
}

export const websiteLabel = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

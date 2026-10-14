"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { DateRange } from "@/lib/therapists";
import styles from "./RangeCalendar.module.css";

const MONTHS = [
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
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const pad = (n: number) => String(n).padStart(2, "0");
/** Local "YYYY-MM-DD", never UTC, so a click on the 12th stays the 12th. */
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/**
 * Start and end date picker in the filter-menu language: one month at a time, ink
 * chosen days, the span between them in the #FBFFE9 hover wash. First click sets the
 * start, the second the end (earlier dates restart). Arrow keys move a roving focus,
 * Enter or Space picks. Past dates are disabled.
 */
export function RangeCalendar({
  value,
  onChange,
  note,
}: {
  value: DateRange | null;
  onChange: (value: DateRange | null) => void;
  note?: string;
}) {
  const today = useMemo(() => iso(new Date()), []);
  const [start, setStart] = useState<string | null>(value?.from ?? null);
  const [end, setEnd] = useState<string | null>(value?.to ?? null);
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState(value?.from ?? today);
  const [month, setMonth] = useState(() => {
    const d = parse(value?.from ?? today);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const gridRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const lead = (month.getDay() + 6) % 7; // Monday first
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: count }, (_, i) => iso(new Date(month.getFullYear(), month.getMonth(), i + 1))),
    ];
  }, [month]);

  const thisMonth = parse(today);
  const atFirstMonth =
    month.getFullYear() === thisMonth.getFullYear() && month.getMonth() === thisMonth.getMonth();

  const shiftMonth = (n: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1));

  const pick = (day: string) => {
    if (day < today) return;
    if (!start || end || day < start) {
      setStart(day);
      setEnd(null);
      onChange(null);
    } else {
      setEnd(day);
      onChange({ from: start, to: day });
    }
  };

  const moveFocus = (day: string) => {
    const d = parse(day < today ? today : day);
    const next = iso(d);
    setFocus(next);
    if (d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) {
      setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    }
    requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${next}"]`)?.focus(),
    );
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, day: string) => {
    const d = parse(day);
    const steps: Record<string, Date> = {
      ArrowLeft: addDays(d, -1),
      ArrowRight: addDays(d, 1),
      ArrowUp: addDays(d, -7),
      ArrowDown: addDays(d, 7),
      PageUp: new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()),
      PageDown: new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
    };
    if (e.key in steps) {
      e.preventDefault();
      moveFocus(iso(steps[e.key]));
    }
  };

  // One tab stop per month: the focused day when it is shown, else the first open day.
  const rovingDay = days.includes(focus) ? focus : days.find((d) => d && d >= today);

  // The span previews towards the hovered day until the end is chosen.
  const spanEnd = end ?? (start && hover && hover > start ? hover : null);
  const label = (day: string) =>
    parse(day).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <button
          type="button"
          className={styles.nav}
          aria-label="Previous month"
          disabled={atFirstMonth}
          onClick={() => shiftMonth(-1)}
        >
          <ChevronDownIcon className={styles.prev} aria-hidden />
        </button>
        <p className={styles.month} aria-live="polite">
          {MONTHS[month.getMonth()]} {month.getFullYear()}
        </p>
        <button type="button" className={styles.nav} aria-label="Next month" onClick={() => shiftMonth(1)}>
          <ChevronDownIcon className={styles.next} aria-hidden />
        </button>
      </div>

      <div className={styles.grid} role="grid" aria-label="Choose a start and end date" ref={gridRef}>
        <div role="row" className={styles.row}>
          {WEEKDAYS.map((w) => (
            <span key={w} role="columnheader" className={styles.weekday}>
              {w}
            </span>
          ))}
        </div>
        {Array.from({ length: Math.ceil(days.length / 7) }, (_, r) => (
          <div role="row" className={styles.row} key={r}>
            {days.slice(r * 7, r * 7 + 7).map((day, i) => {
              if (!day) return <span key={`blank-${i}`} role="gridcell" className={styles.blank} />;
              const past = day < today;
              const edge = day === start || day === end;
              const inSpan = !!start && !!spanEnd && day > start && day < spanEnd;
              const tabbable = day === rovingDay;
              return (
                <span key={day} role="gridcell" aria-selected={edge || inSpan} className={styles.cell}>
                  <button
                    type="button"
                    data-day={day}
                    className={styles.day}
                    data-edge={edge || undefined}
                    data-span={inSpan || undefined}
                    data-today={day === today || undefined}
                    disabled={past}
                    tabIndex={tabbable ? 0 : -1}
                    aria-label={label(day)}
                    aria-pressed={edge}
                    onClick={() => {
                      setFocus(day);
                      pick(day);
                    }}
                    onPointerEnter={() => setHover(day)}
                    onPointerLeave={() => setHover(null)}
                    onKeyDown={(e) => onKey(e, day)}
                  >
                    {Number(day.slice(8))}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <p className={styles.status} aria-live="polite">
        {start && end
          ? `${label(start)} to ${label(end)}`
          : start
            ? "Now choose an end date."
            : "Choose a start date."}
      </p>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}

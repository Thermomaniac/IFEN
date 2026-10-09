"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import {
  CalendarCheckIcon,
  CardsIcon,
  ChevronDownIcon,
  ClockIcon,
  EuroIcon,
  GlobeIcon,
  MonitorIcon,
  PinIcon,
  ResetIcon,
  RowsIcon,
  SearchIcon,
  XCircleIcon,
} from "@/components/icons";
import { formatPrice } from "@/data/course";
import {
  FORMAT_LABELS,
  LANGUAGE_LABELS,
  TYPE_LABELS,
  type CourseFormat,
  type CourseType,
  type Language,
  type ScheduleItem,
} from "@/data/schedule";
import {
  EMPTY_FILTERS,
  PRICE_LABELS,
  dateParts,
  formatDay,
  formatSpan,
  isFiltered,
  matches,
  type Filters,
  type PriceFilter,
} from "@/lib/schedule";
import { CourseSection } from "./CourseSection";
import styles from "./CourseSchedule.module.css";

type View = "table" | "cards";
type Tab = "dates" | "interest";
type Note = { text: string; link: { label: string; href: string } };

const TABS: { id: Tab; label: string }[] = [
  { id: "dates", label: "Appointments" },
  { id: "interest", label: "Interest Lists" },
];

const options = <K extends string>(labels: Record<K, string>) =>
  (Object.entries(labels) as [K, string][]).map(([value, label]) => ({ value, label }));

/** Only offer filter values that occur in the data, so no option leads to an empty list. */
function present<K extends string>(labels: Record<K, string>, used: Set<string>) {
  return options(labels).filter((o) => used.has(o.value));
}

/**
 * Course listing: one filter box drives two tabs, the dated appointments and the
 * interest lists. The table only shows from 64rem; smaller screens always get cards.
 * Course codes stay searchable but are never shown.
 */
export function CourseSchedule({
  dates,
  interest,
  notes,
}: {
  dates: ScheduleItem[];
  interest: ScheduleItem[];
  notes: Note[];
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [view, setView] = useState<View>("table");
  const [tab, setTab] = useState<Tab>("dates");
  const uid = useId();

  const all = useMemo(() => [...dates, ...interest], [dates, interest]);
  const choices = useMemo(
    () => ({
      type: present<CourseType>(TYPE_LABELS, new Set(all.map((i) => i.type))),
      language: present<Language>(LANGUAGE_LABELS, new Set(all.map((i) => i.language ?? ""))),
      format: present<CourseFormat>(FORMAT_LABELS, new Set(all.map((i) => i.format))),
      price: options<PriceFilter>(PRICE_LABELS),
    }),
    [all],
  );

  const source = tab === "dates" ? dates : interest;
  const shown = source.filter((i) => matches(i, filters));
  const filtered = isFiltered(filters);
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));
  const reset = () => setFilters(EMPTY_FILTERS);
  const noun = tab === "dates" ? "dates" : "lists";

  // Arrow keys move between the two tabs, as in the WAI tabs pattern.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = tab === "dates" ? "interest" : "dates";
    setTab(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <CourseSection
      id="dates"
      tone="mist"
      head={{ label: "Course dates", heading: "Find your next training date" }}
      headExtra={
        <ul className={styles.notes}>
          {notes.map((note) => (
            <li key={note.link.href}>
              {note.text} <a href={note.link.href}>{note.link.label}</a>.
            </li>
          ))}
        </ul>
      }
    >
      <div className={styles.offerings}>
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>Our Offerings</h3>
          <p className={styles.count} aria-live="polite">
            Showing {shown.length} of {source.length} {noun}
          </p>
          <div className={styles.toggle} role="group" aria-label="Display">
            <button type="button" aria-pressed={view === "table"} onClick={() => setView("table")}>
              <RowsIcon aria-hidden />
              Table
            </button>
            <button type="button" aria-pressed={view === "cards"} onClick={() => setView("cards")}>
              <CardsIcon aria-hidden />
              Cards
            </button>
          </div>
        </div>

        <div className={styles.listings}>
          <div className={styles.tabs} role="tablist" aria-label="Offer type">
            {TABS.map((t) => (
              <button
                key={t.id}
                id={`${uid}-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`${uid}-panel`}
                tabIndex={tab === t.id ? 0 : -1}
                className={styles.tab}
                onClick={() => setTab(t.id)}
                onKeyDown={onTabKey}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            id={`${uid}-panel`}
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${tab}`}
          >
            <form className={styles.filters} role="search" onSubmit={(e) => e.preventDefault()}>
              <div className={styles.filterHead}>
                <p className={styles.filterTitle}>Categories</p>
                {filtered ? (
                  <button type="button" className={styles.clear} onClick={reset}>
                    <XCircleIcon aria-hidden />
                    Clear Filter
                  </button>
                ) : (
                  <p className={styles.filterState}>No filter is applied</p>
                )}
              </div>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className="sr-only" htmlFor={`${uid}-q`}>
                    Search
                  </label>
                  <input
                    id={`${uid}-q`}
                    className={styles.input}
                    data-active={filters.query ? "" : undefined}
                    type="search"
                    placeholder="Search course or place"
                    value={filters.query}
                    onChange={(e) => set("query", e.target.value)}
                  />
                  <SearchIcon className={styles.fieldIcon} aria-hidden />
                </div>
                <Select
                  id={`${uid}-type`}
                  label="Course type"
                  value={filters.type}
                  all="All types"
                  options={choices.type}
                  onChange={(v) => set("type", v as Filters["type"])}
                />
                <Select
                  id={`${uid}-lang`}
                  label="Language"
                  value={filters.language}
                  all="All languages"
                  options={choices.language}
                  onChange={(v) => set("language", v as Filters["language"])}
                />
                <Select
                  id={`${uid}-format`}
                  label="Format"
                  value={filters.format}
                  all="All formats"
                  options={choices.format}
                  onChange={(v) => set("format", v as Filters["format"])}
                />
                <Select
                  id={`${uid}-price`}
                  label="Price"
                  value={filters.price}
                  all="Paid & free"
                  options={choices.price}
                  onChange={(v) => set("price", v as Filters["price"])}
                />
              </div>
            </form>

            {shown.length === 0 ? (
              <Empty onReset={reset}>
                {tab === "dates" ? "No dates match these filters." : "No interest lists match these filters."}
              </Empty>
            ) : tab === "dates" ? (
              <>
                {view === "table" && (
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <caption className="sr-only">Training dates</caption>
                      <thead>
                        <tr>
                          <th scope="col" className={styles.colCourse}>
                            Course
                          </th>
                          <th scope="col" className={styles.colDate}>
                            Date
                          </th>
                          <th scope="col" className={styles.colPlace}>
                            Location
                          </th>
                          <th scope="col" className={styles.colLang}>
                            Language
                          </th>
                          <th scope="col" className={styles.colPrice}>
                            Price
                          </th>
                          <th scope="col" className={styles.colAction}>
                            Booking
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shown.map((item) => (
                          <Row key={item.code + item.start} item={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <ul className={`${styles.cards} ${view === "table" ? styles.cardsCompact : ""}`}>
                  {shown.map((item) => (
                    <li key={item.code + item.start}>
                      <DateCard item={item} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                {view === "table" && (
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <caption className="sr-only">Interest lists</caption>
                      <thead>
                        <tr>
                          <th scope="col">Course</th>
                          <th scope="col" className={styles.colPlace}>
                            Location
                          </th>
                          <th scope="col" className={styles.colPrice}>
                            Price
                          </th>
                          <th scope="col" className={styles.colAction}>
                            Booking
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shown.map((item) => (
                          <InterestRow key={item.code} item={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <ul className={`${styles.cards} ${view === "table" ? styles.cardsCompact : ""}`}>
                  {shown.map((item) => (
                    <li key={item.code}>
                      <DateCard item={item} interest />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </CourseSection>
  );
}

function Select({
  id,
  label,
  value,
  all,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  all: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={`${styles.input} ${styles.select}`}
        data-active={value ? "" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{all}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className={styles.fieldIcon} aria-hidden />
    </div>
  );
}

/** 24 × 18 flags, drawn as in Paper. */
function Flag({ language }: { language: Language }) {
  const stripes: Record<Exclude<Language, "en">, { dir: "h" | "v"; colors: string[] }> = {
    de: { dir: "h", colors: ["#000000", "#FF0000", "#FFCC00"] },
    es: { dir: "h", colors: ["#AA151B", "#F1BF00", "#F1BF00", "#AA151B"] },
    it: { dir: "v", colors: ["#009246", "#FFFFFF", "#CE2B37"] },
  };
  if (language === "en") {
    return (
      <svg className={styles.flag} viewBox="0 0 24 18" aria-hidden focusable="false">
        <rect width="24" height="18" fill="#FFFFFF" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} y={(i * 36) / 13} width="24" height={18 / 13} fill="#B22234" />
        ))}
        <rect width="10" height={(18 / 13) * 7} fill="#3C3B6E" />
      </svg>
    );
  }
  const { dir, colors } = stripes[language];
  const size = (dir === "h" ? 18 : 24) / colors.length;
  return (
    <svg className={styles.flag} viewBox="0 0 24 18" aria-hidden focusable="false">
      {colors.map((fill, i) =>
        dir === "h" ? (
          <rect key={i} y={i * size} width="24" height={size + 0.01} fill={fill} />
        ) : (
          <rect key={i} x={i * size} width={size + 0.01} height="18" fill={fill} />
        ),
      )}
    </svg>
  );
}

function Lang({ item }: { item: ScheduleItem }) {
  if (!item.language) return <span className={styles.sub}>–</span>;
  return (
    <span className={styles.lang}>
      <Flag language={item.language} />
      {LANGUAGE_LABELS[item.language]}
    </span>
  );
}

function CourseCell({ item }: { item: ScheduleItem }) {
  return (
    <>
      <a href={item.href} className={styles.title}>
        {item.title}
      </a>
      <span className={styles.sub}>{TYPE_LABELS[item.type]}</span>
      {item.isNew && <span className={styles.new}>New</span>}
    </>
  );
}

function When({ item }: { item: ScheduleItem }) {
  const span = formatSpan(item);
  if (!item.start || !span) {
    return (
      <>
        <span className={styles.main}>Flexible</span>
        <span className={styles.sub}>Book any time</span>
      </>
    );
  }
  return (
    <>
      <span className={styles.main}>{formatDay(item.start)}</span>
      <span className={styles.sub}>
        {span.time}
        {span.until && ` (Until ${span.until})`}
      </span>
    </>
  );
}

function Place({ item }: { item: ScheduleItem }) {
  const format = FORMAT_LABELS[item.format];
  return (
    <>
      {item.locationHref ? (
        <a href={item.locationHref} className={styles.place} target="_blank" rel="noreferrer">
          {item.location}
        </a>
      ) : (
        <span className={styles.main}>{item.location}</span>
      )}
      {format !== item.location && <span className={styles.sub}>{format}</span>}
    </>
  );
}

function Prices({ item }: { item: ScheduleItem }) {
  if (item.prices.length === 0) return <span className={styles.main}>Free</span>;
  return (
    <dl className={styles.prices}>
      {item.prices.map((p) => (
        <div key={p.label}>
          <dt>{p.label}</dt>
          <dd>{formatPrice(p.amount)}</dd>
        </div>
      ))}
    </dl>
  );
}

function BookLink({ item, label }: { item: ScheduleItem; label: string }) {
  return (
    <a href={item.href} className={styles.bookBtn}>
      {label}
      <span className="sr-only">: {item.title}</span>
    </a>
  );
}

function Row({ item }: { item: ScheduleItem }) {
  return (
    <tr>
      <td className={styles.course}>
        <CourseCell item={item} />
      </td>
      <td className={styles.stack}>
        <When item={item} />
      </td>
      <td className={styles.stack}>
        <Place item={item} />
      </td>
      <td>
        <Lang item={item} />
      </td>
      <td>
        <Prices item={item} />
      </td>
      <td className={styles.action}>
        <BookLink item={item} label="Book" />
      </td>
    </tr>
  );
}

function InterestRow({ item }: { item: ScheduleItem }) {
  return (
    <tr>
      <td className={styles.course}>
        <CourseCell item={item} />
      </td>
      <td className={styles.stack}>
        <Place item={item} />
      </td>
      <td>
        <Prices item={item} />
      </td>
      <td className={styles.action}>
        <BookLink item={item} label="Join List" />
      </td>
    </tr>
  );
}

function DateCard({ item, interest = false }: { item: ScheduleItem; interest?: boolean }) {
  const parts = item.start ? dateParts(item.start) : null;
  const span = formatSpan(item);
  const format = FORMAT_LABELS[item.format];
  return (
    <article className={styles.card}>
      <div className={styles.dateBlock} aria-hidden>
        {parts ? (
          <>
            <span className={styles.weekday}>{parts.weekday}</span>
            <span className={styles.day}>{parts.day}</span>
            <span className={styles.monthYear}>
              {parts.month} {parts.year}
            </span>
          </>
        ) : (
          <>
            <CalendarCheckIcon className={styles.flexIcon} />
            <span className={styles.monthYear}>Flexible</span>
          </>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.eyebrow}>
          {TYPE_LABELS[item.type]}
          {item.isNew && <span className={styles.new}>New</span>}
        </p>
        <h4 className={styles.cardTitle}>
          <a href={item.href}>{item.title}</a>
        </h4>
        <ul className={styles.meta}>
          {!interest && (
            <li>
              <ClockIcon aria-hidden />
              <span>
                {item.start && span ? (
                  <>
                    {formatDay(item.start)}, {span.time}
                    {span.until && <> until {span.until}</>}
                  </>
                ) : (
                  "Flexible, book any time"
                )}
              </span>
            </li>
          )}
          {item.language && (
            <li>
              <GlobeIcon aria-hidden />
              <span>{LANGUAGE_LABELS[item.language]}</span>
            </li>
          )}
          <li>
            {item.format === "online" ? <MonitorIcon aria-hidden /> : <PinIcon aria-hidden />}
            <span>
              {item.locationHref ? (
                <a href={item.locationHref} className={styles.place} target="_blank" rel="noreferrer">
                  {item.location}
                </a>
              ) : (
                item.location
              )}
              {format !== item.location && <> · {format}</>}
            </span>
          </li>
        </ul>
        {item.prices.length === 0 ? (
          <ul className={styles.chips}>
            <li className={styles.chip}>
              <EuroIcon aria-hidden />
              <span>
                <span className={styles.chipLabel}>Price</span>
                <span className={styles.chipAmount}>Free</span>
              </span>
            </li>
          </ul>
        ) : (
          <ul className={styles.chips}>
            {item.prices.map((p) => (
              <li key={p.label} className={styles.chip}>
                <EuroIcon aria-hidden />
                <span>
                  <span className={styles.chipLabel}>{p.label}</span>
                  <span className={styles.chipAmount}>{formatPrice(p.amount)}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.cardFoot}>
          <BookLink item={item} label={interest ? "Join List" : "Book"} />
        </div>
      </div>
    </article>
  );
}

function Empty({ children, onReset }: { children: string; onReset: () => void }) {
  return (
    <div className={styles.empty} role="status">
      <p>{children}</p>
      <button type="button" className={styles.reset} onClick={onReset}>
        <ResetIcon aria-hidden />
        Clear filters
      </button>
    </div>
  );
}

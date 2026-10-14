"use client";

import { useEffect, useId, useMemo, useState, type KeyboardEvent } from "react";
import {
  CalendarCheckIcon,
  CardsIcon,
  ClockIcon,
  EuroIcon,
  GlobeIcon,
  InfoCircleIcon,
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
import { clearRegistration, saveBookingStatus, useBookingStatus } from "@/lib/registration";
import {
  EMPTY_FILTERS,
  PRICE_LABELS,
  dateParts,
  formatDay,
  formatSpan,
  activeFilters,
  matches,
  type Filters,
  type PriceFilter,
} from "@/lib/schedule";
import { CourseSection } from "./CourseSection";
import { FilterSelect, type FilterOption } from "./FilterSelect";
import styles from "./CourseSchedule.module.css";

type View = "table" | "cards";
type Tab = "dates" | "interest";
type Note = { text: string; link: { label: string; href: string } };

const TABS: { id: Tab; label: string }[] = [
  { id: "dates", label: "Appointments" },
  { id: "interest", label: "Interest Lists" },
];

const options = <K extends string>(labels: Record<K, string>): FilterOption[] =>
  (Object.entries(labels) as [K, string][]).map(([value, label]) => ({ value, label }));

/** Only offer filter values that occur in the data, so no option leads to an empty list. */
function present<K extends string>(labels: Record<K, string>, used: Set<string>) {
  return options(labels).filter((o) => used.has(o.value));
}

/** Paper: "Showing Dates [50]". Lists longer than the page size grow with "Show more". */
const PAGE_SIZES = [10, 25, 50, 100];
const DEFAULT_PAGE_SIZE = 50;
const PAGE_SIZE_OPTIONS = PAGE_SIZES.map((n) => ({ value: String(n), label: String(n) }));

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
      language: present<Language>(LANGUAGE_LABELS, new Set(all.map((i) => i.language ?? ""))).map((o) => ({
        ...o,
        icon: <Flag language={o.value as Language} />,
      })),
      format: present<CourseFormat>(FORMAT_LABELS, new Set(all.map((i) => i.format))),
      price: options<PriceFilter>(PRICE_LABELS),
    }),
    [all],
  );

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pages, setPages] = useState(1);

  const source = tab === "dates" ? dates : interest;
  const matching = source.filter((i) => matches(i, filters));
  const limit = pageSize * pages;
  const shown = matching.slice(0, limit);
  const active = activeFilters(filters);
  // Any change to what is listed starts again from the first page.
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPages(1);
  };
  const reset = () => {
    setFilters(EMPTY_FILTERS);
    setPages(1);
  };
  const switchTab = (next: Tab) => {
    setTab(next);
    setPages(1);
  };
  const noun = tab === "dates" ? "dates" : "lists";
  const Noun = tab === "dates" ? "Dates" : "Lists";

  // Arrow keys move between the two tabs, as in the WAI tabs pattern.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = tab === "dates" ? "interest" : "dates";
    switchTab(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <CourseSection
      id="dates"
      tone="mist"
      head={{ label: "Course dates", heading: "Find Your Next Training Date" }}
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
        <PendingNotice />
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>Our Offerings</h3>
          <div className={styles.count}>
            <span aria-hidden="true">Showing {Noun}</span>
            <FilterSelect
              compact
              label={`${Noun} per page`}
              value={String(pageSize)}
              options={PAGE_SIZE_OPTIONS}
              onChange={(v) => {
                setPageSize(Number(v));
                setPages(1);
              }}
            />
            <p className="sr-only" aria-live="polite">
              Showing {shown.length} of {matching.length} matching {noun}
            </p>
          </div>
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
                onClick={() => switchTab(t.id)}
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
                {active > 0 ? (
                  <button type="button" className={styles.clear} onClick={reset}>
                    <XCircleIcon aria-hidden />
                    Clear Filter ({active})
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
                    placeholder="Course, code or place"
                    value={filters.query}
                    onChange={(e) => set("query", e.target.value)}
                  />
                  <SearchIcon className={styles.fieldIcon} aria-hidden />
                </div>
                <FilterSelect
                  label="Course type"
                  value={filters.type}
                  all="All types"
                  options={choices.type}
                  onChange={(v) => set("type", v as Filters["type"])}
                />
                <FilterSelect
                  label="Language"
                  value={filters.language}
                  all="All languages"
                  options={choices.language}
                  onChange={(v) => set("language", v as Filters["language"])}
                />
                <FilterSelect
                  label="Format"
                  value={filters.format}
                  all="All formats"
                  options={choices.format}
                  onChange={(v) => set("format", v as Filters["format"])}
                />
                <FilterSelect
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

            {matching.length > shown.length && (
              <div className={styles.more}>
                <button type="button" className={styles.reset} onClick={() => setPages((n) => n + 1)}>
                  Show {Math.min(pageSize, matching.length - shown.length)} more {noun}
                </button>
                <span className={styles.moreCount}>
                  {shown.length} of {matching.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CourseSection>
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

/**
 * Rows and cards whose course has a redesigned page here open it from anywhere on their
 * surface: the title link stretches over the whole row or card, and the booking button and
 * location link sit above it. Live-site entries keep their title link only.
 */
const hasDetail = (item: ScheduleItem) => item.href.startsWith("/");

function CourseCell({ item }: { item: ScheduleItem }) {
  return (
    <>
      <a href={item.href} className={`${styles.title} ${hasDetail(item) ? styles.stretch : ""}`}>
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
    <tr data-linked={hasDetail(item) || undefined}>
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
    <tr data-linked={hasDetail(item) || undefined}>
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
    <article className={styles.card} data-linked={hasDetail(item) || undefined}>
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
          <a href={item.href} className={hasDetail(item) ? styles.stretch : undefined}>
            {item.title}
          </a>
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

/**
 * Paper notice above the results after a bank-transfer booking: the registration
 * is complete while the payment is still pending. It sizes to its text and the X
 * hides it for the rest of the session. The first visit after the booking
 * also clears the finished form data, as the LMS screen does for online payments.
 */
function PendingNotice() {
  const status = useBookingStatus();

  useEffect(() => {
    if (!status?.fresh) return;
    clearRegistration();
    saveBookingStatus({ ...status, fresh: false });
  }, [status]);

  if (status?.payment !== "pending" || status.dismissed) return null;
  return (
    <p className={styles.pending} role="status">
      <InfoCircleIcon aria-hidden />
      Registration is Complete. Payment Status is Pending.
      <button
        type="button"
        className={styles.pendingClose}
        aria-label="Dismiss payment notice"
        onClick={() => saveBookingStatus({ ...status, dismissed: true })}
      >
        <svg viewBox="0 0 10.5 10.5" aria-hidden="true" focusable="false">
          <path
            d="M10.28 9.22a.75.75 0 1 1-1.06 1.06L5.25 6.32l-3.97 3.96a.75.75 0 0 1-1.06-1.06l3.97-3.97L.22 1.28A.75.75 0 0 1 1.28.22l3.97 3.97L9.22.22a.75.75 0 1 1 1.06 1.06L6.31 5.25l3.97 3.97Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </p>
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

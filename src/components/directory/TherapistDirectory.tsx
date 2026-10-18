"use client";

import { useId, useMemo, useState } from "react";
import { FilterMulti, type MultiOption } from "@/components/course/FilterMulti";
import { FilterPopover } from "@/components/course/FilterPopover";
import { FilterSelect } from "@/components/course/FilterSelect";
import { ResetIcon, XCircleIcon } from "@/components/icons";
import {
  COUNTRIES,
  LEVELS,
  QUALIFICATIONS,
  flagSrc,
  type CountryCode,
  type Level,
  type QualificationId,
  type Therapist,
} from "@/data/therapists";
import {
  EMPTY_DIRECTORY_FILTERS,
  activeDirectoryFilters,
  matchesTherapist,
  shortDate,
  type DirectoryFilters,
} from "@/lib/therapists";
import { DirectorySearch } from "./DirectorySearch";
import { LevelIcon } from "./LevelBadge";
import { MapDialog } from "./MapDialog";
import { PriceRange, priceLabel } from "./PriceRange";
import { RangeCalendar } from "./RangeCalendar";
import { TherapistCard } from "./TherapistCard";
import { TherapistMap } from "./TherapistMap";
import styles from "./TherapistDirectory.module.css";

// Paper has no pagination: the count select caps how many cards show, "All" lists every match.
const DEFAULT_PAGE_SIZE = "50";
const PAGE_SIZE_OPTIONS = [
  ...[10, 25, 50, 100].map((n) => ({ value: String(n), label: String(n) })),
  { value: "all", label: "All" },
];

const LECTURER_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const PRICE_NOTE =
  "Practices do not publish session prices in the directory yet, so this filter has no matches for now.";
const DATES_NOTE =
  "Practices do not publish availability in the directory yet, so this filter has no matches for now.";

/**
 * Therapist List: the results summary, then one panel with Paper's filter header over
 * the practice cards and the nearby map. Every filter runs on the published directory
 * records; nothing is inferred.
 */
export function TherapistDirectory({ therapists }: { therapists: Therapist[] }) {
  const uid = useId();
  const [filters, setFilters] = useState<DirectoryFilters>(EMPTY_DIRECTORY_FILTERS);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [mapOpen, setMapOpen] = useState(false);

  const set = <K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));
  const reset = () => setFilters(EMPTY_DIRECTORY_FILTERS);

  const options = useMemo(() => buildOptions(therapists), [therapists]);
  const matching = useMemo(
    () => therapists.filter((t) => matchesTherapist(t, filters)),
    [therapists, filters],
  );
  const shown = pageSize === "all" ? matching : matching.slice(0, Number(pageSize));
  const active = activeDirectoryFilters(filters);

  return (
    <div className={styles.directory}>
      <div className={styles.results}>
        <h3 className={styles.resultsTitle} id={`${uid}-results`}>
          All Lists
        </h3>
        <div className={styles.count}>
          <span aria-hidden="true">Showing Therapist</span>
          <FilterSelect
            compact
            label="Therapists Shown"
            value={pageSize}
            options={PAGE_SIZE_OPTIONS}
            onChange={setPageSize}
          />
          <p className="sr-only" aria-live="polite">
            Showing {shown.length} of {matching.length} matching practices
          </p>
        </div>
      </div>

      <div className={styles.panel}>
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
            <div className={styles.lead}>
              <DirectorySearch value={filters.query} onChange={(v) => set("query", v)} />
              <FilterSelect
                label="Country"
                all="All Countries"
                placeholder="Country"
                value={filters.country}
                options={options.countries}
                onChange={(v) => set("country", v as CountryCode | "")}
              />
            </div>
            <div className={styles.selects}>
              <FilterMulti
                label="Qualifications"
                values={filters.qualifications}
                options={options.qualifications}
                onChange={(v) => set("qualifications", v as QualificationId[])}
              />
              <FilterMulti
                label="Expert Level Status"
                values={filters.levels}
                options={options.levels}
                onChange={(v) => set("levels", v as Level[])}
              />
              <FilterSelect
                label="IFEN Lecturer"
                all="All Practices"
                placeholder="IFEN Lecturer"
                value={filters.lecturer}
                options={LECTURER_OPTIONS}
                onChange={(v) => set("lecturer", v as DirectoryFilters["lecturer"])}
              />
              <FilterPopover
                label="Price Range"
                summary={filters.price ? priceLabel(filters.price.min, filters.price.max) : null}
                onClear={() => set("price", null)}
              >
                <PriceRange
                  value={filters.price}
                  onChange={(v) => set("price", v)}
                  note={options.hasPrices ? undefined : PRICE_NOTE}
                />
              </FilterPopover>
              <FilterPopover
                label="Select Availability"
                summary={
                  filters.dates ? `${shortDate(filters.dates.from)} - ${shortDate(filters.dates.to)}` : null
                }
                onClear={() => set("dates", null)}
              >
                <RangeCalendar
                  value={filters.dates}
                  onChange={(v) => v && set("dates", v)}
                  note={options.hasDates ? undefined : DATES_NOTE}
                />
              </FilterPopover>
            </div>
          </div>
        </form>

        <div className={styles.body}>
          <aside className={styles.mapCol} aria-label="Map">
            <div className={styles.mapBox}>
              <TherapistMap therapists={matching} mode="preview" onExpand={() => setMapOpen(true)} />
            </div>
          </aside>

          <div className={styles.listCol}>
            {matching.length === 0 ? (
              <Empty onReset={reset} filters={filters} />
            ) : (
              <ul className={styles.cards} aria-labelledby={`${uid}-results`}>
                {shown.map((t) => (
                  <li key={t.id}>
                    <TherapistCard therapist={t} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {mapOpen && <MapDialog therapists={matching} onClose={() => setMapOpen(false)} />}
    </div>
  );
}

function Empty({ onReset, filters }: { onReset: () => void; filters: DirectoryFilters }) {
  const unpublished = filters.price || filters.dates;
  return (
    <div className={styles.empty} role="status">
      <p>
        {unpublished
          ? "No practice matches. The directory does not publish prices or availability yet, so those filters cannot match any practice."
          : "No practice matches these filters."}
      </p>
      <button type="button" className={styles.reset} onClick={onReset}>
        <ResetIcon aria-hidden />
        Clear filters
      </button>
    </div>
  );
}

function buildOptions(list: Therapist[]) {
  const countryCounts = new Map<CountryCode, number>();
  const levelCounts = new Map<Level, number>();
  for (const t of list) {
    if (t.country) countryCounts.set(t.country, (countryCounts.get(t.country) ?? 0) + 1);
    if (t.level) levelCounts.set(t.level, (levelCounts.get(t.level) ?? 0) + 1);
  }

  const countries = (Object.keys(COUNTRIES) as CountryCode[])
    .filter((c) => countryCounts.has(c))
    .sort((a, b) => countryCounts.get(b)! - countryCounts.get(a)! || COUNTRIES[a].localeCompare(COUNTRIES[b]))
    .map((c) => ({
      value: c,
      label: COUNTRIES[c],
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src={flagSrc(c)} alt="" width={20} height={14} className={styles.flag} />,
    }));

  const qualifications: MultiOption[] = QUALIFICATIONS.map((q) => ({
    value: q.id,
    label: q.label,
    // eslint-disable-next-line @next/next/no-img-element
    icon: q.icon ? <img src={q.icon} alt="" width={16} height={16} /> : undefined,
  }));

  const levels: MultiOption[] = LEVELS.map((l) => ({
    value: l.id,
    label: `${l.label} (${l.hours})`,
    icon: <LevelIcon level={l.id} size={16} />,
    disabledHint: levelCounts.has(l.id) ? undefined : "No practices yet",
  }));

  return {
    countries,
    qualifications,
    levels,
    hasPrices: list.some((t) => t.price),
    hasDates: list.some((t) => t.availability?.length),
  };
}

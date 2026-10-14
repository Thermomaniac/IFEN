"use client";

import {
  CalendarSlashIcon,
  CalendarTickIcon,
  DurationIcon,
  GlobeIcon,
  MapPinFillIcon,
  UsersIcon,
} from "@/components/icons";
import { course, formatAmount, getPlan, type CourseFact } from "@/data/course";
import { useRegistration } from "@/lib/registration";
import styles from "./SelectionSummary.module.css";

const factIcons: Record<CourseFact["icon"], typeof UsersIcon> = {
  start: CalendarTickIcon,
  end: CalendarSlashIcon,
  level: UsersIcon,
  location: MapPinFillIcon,
  schedule: CalendarTickIcon,
  duration: DurationIcon,
  format: UsersIcon,
  languages: GlobeIcon,
};

/** What the card shows for a booking other than the course (mentor booking). */
export type Selection = {
  title: string;
  /** "Package", "Format": the one choice the visitor makes in the flow. */
  choiceLabel: string;
  choice?: string;
  facts: readonly CourseFact[];
  price: number;
  /** Shown as a Discount line only when given; the mentor booking has no discounts. */
  discount?: number;
};

/**
 * "Your Selection" card beside the form. Steps 1 and 2 list the course facts;
 * the review step swaps them for the order total of the chosen package. Until
 * a package is picked on the billing step the card says so instead of a price.
 * Defaults to the course registration; `selection` fills it for another booking.
 */
export function SelectionSummary({
  variant,
  selection,
}: {
  variant: "facts" | "totals";
  selection?: Selection;
}) {
  const plan = getPlan(useRegistration().billing.plan);
  const { title, choiceLabel, choice, facts, price, discount }: Selection = selection ?? {
    title: course.title,
    choiceLabel: "Package",
    choice: plan?.label,
    facts: course.facts,
    price: plan?.price ?? 0,
    discount: 0,
  };

  return (
    <aside className={styles.card} aria-labelledby="selection-title">
      <div className={styles.head}>
        <p className={styles.eyebrow} id="selection-title">
          Your Selection
        </p>
        <p className={styles.course}>{title}</p>
        <p className={styles.plan}>
          {choiceLabel}: {choice ? <span>{choice}</span> : <span data-empty="">Not selected yet</span>}
        </p>
      </div>

      {variant === "facts" ? (
        <dl className={styles.facts}>
          {facts.map((fact) => {
            const Icon = factIcons[fact.icon];
            return (
              <div key={fact.label} className={styles.fact}>
                <span className={styles.factIcon}>
                  <Icon width={16} height={16} />
                </span>
                <div className={styles.factText}>
                  <dt className={styles.factLabel}>{fact.label}</dt>
                  <dd className={styles.factValue}>{fact.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      ) : (
        <div className={styles.totals}>
          <dl className={styles.lines}>
            <div className={styles.line}>
              <dt>Qty.</dt>
              <dd>01</dd>
            </div>
            <div className={styles.line}>
              <dt>Subtotal</dt>
              <dd>{formatAmount(price)}</dd>
            </div>
            {discount !== undefined && (
              <div className={styles.line}>
                <dt>Discount</dt>
                <dd>{formatAmount(discount)}</dd>
              </div>
            )}
          </dl>
          <dl className={styles.total}>
            <dt>Total</dt>
            <dd>{formatAmount(price)}</dd>
          </dl>
        </div>
      )}
    </aside>
  );
}

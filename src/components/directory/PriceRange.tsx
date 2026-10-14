"use client";

import { useId } from "react";
import { PRICE_BOUNDS } from "@/lib/therapists";
import styles from "./PriceRange.module.css";

export const priceLabel = (min: number, max: number, unit = " EUR") =>
  `${min}${unit} - ${max}${max >= PRICE_BOUNDS.max ? "+" : ""}${unit}`;

/**
 * Paper price slider: two square thumbs on one track, either end adjustable, the
 * selected span filled ink. Two native range inputs keep it keyboard and screen
 * reader friendly; they never cross. The full range means no price filter.
 */
export function PriceRange({
  value,
  onChange,
  note,
}: {
  value: { min: number; max: number } | null;
  onChange: (value: { min: number; max: number } | null) => void;
  /** Shown under the slider, e.g. when no practice publishes a price yet. */
  note?: string;
}) {
  const uid = useId();
  const { min: lo, max: hi, step } = PRICE_BOUNDS;
  const min = value?.min ?? lo;
  const max = value?.max ?? hi;
  const pct = (n: number) => ((n - lo) / (hi - lo)) * 100;

  const update = (nextMin: number, nextMax: number) =>
    onChange(nextMin <= lo && nextMax >= hi ? null : { min: nextMin, max: nextMax });

  return (
    <div className={styles.root}>
      <p className={styles.label} id={`${uid}-label`} aria-live="polite">
        {priceLabel(min, max)}
      </p>
      <div
        className={styles.slider}
        style={
          {
            "--from": `${pct(min)}%`,
            "--to": `${pct(max)}%`,
          } as React.CSSProperties
        }
      >
        <span className={styles.track} aria-hidden="true" />
        <input
          type="range"
          className={styles.input}
          min={lo}
          max={hi}
          step={step}
          value={min}
          aria-label="Minimum price per session"
          aria-valuetext={`${min} EUR`}
          onChange={(e) => update(Math.min(Number(e.target.value), max - step), max)}
        />
        <input
          type="range"
          className={styles.input}
          min={lo}
          max={hi}
          step={step}
          value={max}
          aria-label="Maximum price per session"
          aria-valuetext={max >= hi ? `${max} EUR or more` : `${max} EUR`}
          onChange={(e) => update(min, Math.max(Number(e.target.value), min + step))}
        />
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}

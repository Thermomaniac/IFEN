"use client";

import { useInView } from "framer-motion";
import type { RefObject } from "react";
import type { Version } from "@/lib/version";
import styles from "./VersionSwitcher.module.css";

type VersionSwitcherProps = {
  /** What is being switched, for the group's accessible name. */
  label: string;
  value: Version;
  onChange: (next: Version) => void;
  /** The switcher floats only while this area is on screen. Omit to show it always (a page-wide flow). */
  target?: RefObject<HTMLElement | null>;
};

const OPTIONS: { value: Version; label: string }[] = [
  { value: "v1", label: "Version 1" },
  { value: "v2", label: "Version 2" },
];

/** Floating prototype control that flips an area between its two client versions. */
export function VersionSwitcher({ label, value, onChange, target }: VersionSwitcherProps) {
  // A ref that never attaches keeps the hook unconditional when there is no target.
  const inView = useInView(target ?? { current: null }, { amount: 0.15 });
  const shown = target ? inView : true;

  return (
    <div className={styles.switcher} data-shown={shown} inert={!shown}>
      <div role="group" aria-label={label} className={styles.track} data-value={value}>
        <span className={styles.thumb} aria-hidden="true" />
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.option}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

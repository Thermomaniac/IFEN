"use client";

import { useId, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { photoConsent as copy } from "@/data/consent";
import styles from "./PhotoConsent.module.css";

/**
 * Optional photo and video consent beside a course's registration. A native checkbox inside
 * its label, so the whole sentence toggles it; unchecked by default. The box matches the
 * registration form's checkbox. Prototype: the value stays in local state, nothing is saved.
 */
export function PhotoConsent({ className = "" }: { className?: string }) {
  const id = useId();
  const [checked, setChecked] = useState(false);
  return (
    <section className={`${styles.consent} ${className}`} aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} className={styles.heading}>
        <span aria-hidden="true">{copy.emoji} </span>
        {copy.heading}
      </h3>
      <p className={styles.text}>{copy.text}</p>
      <label className={styles.check}>
        <input
          type="checkbox"
          name="photo-consent"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className={styles.input}
        />
        <span className={styles.box} aria-hidden="true">
          <CheckIcon />
        </span>
        <span className={styles.label}>{copy.label}</span>
      </label>
    </section>
  );
}

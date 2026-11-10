"use client";

import { useId, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { photoConsent as copy } from "@/data/consent";
import styles from "./PhotoConsent.module.css";

/**
 * Optional photo and video consent inside the booking modals (Figma 40001301:61849): a grey
 * card, the invitation, a hairline, then a native checkbox inside its label so the whole
 * sentence toggles it. Unchecked by default and never required. Pass `checked`/`onChange`
 * to keep the choice when the modal closes and reopens; otherwise it holds its own state.
 */
export function PhotoConsent({
  checked,
  onChange,
  className = "",
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}) {
  const id = useId();
  const [own, setOwn] = useState(false);
  const value = checked ?? own;
  return (
    <section className={`${styles.consent} ${className}`} aria-labelledby={`${id}-h`}>
      <div className={styles.intro}>
        <h3 id={`${id}-h`} className={styles.heading}>
          {copy.heading}
        </h3>
        <p className={styles.text}>{copy.text}</p>
      </div>
      <label className={styles.check}>
        <input
          type="checkbox"
          name="photo-consent"
          checked={value}
          onChange={(e) => {
            setOwn(e.target.checked);
            onChange?.(e.target.checked);
          }}
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

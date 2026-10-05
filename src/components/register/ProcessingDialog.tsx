"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { LMS_PATH } from "@/data/course";
import styles from "./ProcessingDialog.module.css";

// Simulated hand-off: no payment provider is connected yet.
const PROCESSING_MS = 2400;

/**
 * The flow's only modal. A native <dialog> opened with showModal() makes the
 * page behind it inert and keeps focus inside. Escape is ignored while the
 * payment runs, matching "do not close this window"; afterwards the visitor
 * lands on the LMS screen, which clears the stored booking.
 */
export function ProcessingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    const timer = window.setTimeout(() => router.replace(LMS_PATH), PROCESSING_MS);
    return () => {
      window.clearTimeout(timer);
      dialog.close();
    };
  }, [router]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="processing-title"
      aria-describedby="processing-note"
      onCancel={(e) => e.preventDefault()}
    >
      <div className={styles.body} role="status" tabIndex={-1} autoFocus>
        <svg className={styles.spinner} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="128 150.8" />
        </svg>
        <h2 id="processing-title" className={styles.title}>
          Processing your payment...
        </h2>
        <p id="processing-note" className={styles.note}>
          Please do not close or refresh this window.
        </p>
      </div>
    </dialog>
  );
}

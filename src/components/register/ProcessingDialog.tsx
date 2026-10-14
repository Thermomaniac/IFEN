"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { course, LMS_PATH } from "@/data/course";
import { saveBookingStatus } from "@/lib/registration";
import { BookingResult, useModal } from "./BookingDialog";
import styles from "./ProcessingDialog.module.css";

// Simulated hand-off: no payment provider is connected yet.
const PROCESSING_MS = 2400;

/** Success copy for a booking outside the course flow (therapist profiles). */
export type BookingOutcome = {
  title: string;
  text: string;
  action: string;
  onAction: () => void;
};

/**
 * Online payment modal. A native <dialog> opened with showModal() makes the page
 * behind it inert and keeps focus inside. Escape is ignored while the payment runs,
 * matching "do not close this window". Once it succeeds the same dialog shows the
 * Paper success state, whose button leads to the LMS (which clears the stored booking).
 * With `outcome` (therapist booking) nothing is stored and the button runs `onAction`.
 */
export function ProcessingDialog({ method, outcome }: { method: string; outcome?: BookingOutcome }) {
  const ref = useModal();
  const router = useRouter();
  const [done, setDone] = useState(false);

  // A boolean, so a parent re-render that recreates `outcome` does not restart the timer.
  const store = !outcome;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (store)
        saveBookingStatus({
          course: course.title,
          registration: "complete",
          payment: "paid",
          method,
        });
      setDone(true);
    }, PROCESSING_MS);
    return () => window.clearTimeout(timer);
  }, [method, store]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      data-done={done ? "" : undefined}
      aria-labelledby={done ? "payment-success-title" : "processing-title"}
      aria-describedby={done ? undefined : "processing-note"}
      onCancel={(e) => e.preventDefault()}
    >
      {done ? (
        <BookingResult
          titleId="payment-success-title"
          title={outcome?.title ?? "Your Payment Is Successful"}
          text={outcome?.text ?? `Your Payment For ${course.title} Is Successful`}
          action={outcome?.action ?? "Go To Course Dashboard"}
          onAction={outcome?.onAction ?? (() => router.replace(LMS_PATH))}
        />
      ) : (
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
      )}
    </dialog>
  );
}

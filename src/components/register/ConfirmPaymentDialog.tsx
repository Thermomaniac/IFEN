"use client";

import { PhotoConsent } from "@/components/course/PhotoConsent";
import { confirmPayment as copy } from "@/data/consent";
import { dialogStyles as styles, isBackdropClick, useModal } from "./BookingDialog";

/** Paper/Figma question mark, 17 × 24 in the 64px badge. */
function Question() {
  return (
    <svg viewBox="0 0 17 24" aria-hidden="true" focusable="false">
      <path
        d="M2.5 7.25a6 6 0 1 1 8.6 5.4c-1.6.77-2.6 2.1-2.6 3.85v.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="8.5" cy="21.6" r="1.75" fill="currentColor" />
    </svg>
  );
}

/**
 * Asks before an online payment starts (Figma 40001301:61849), with the optional photo
 * consent. Confirm hands over to the processing modal; Cancel, Escape or a backdrop click
 * return to the review. Bank transfer skips this: its own modal carries the consent.
 */
export function ConfirmPaymentDialog({
  consent,
  onConsent,
  onConfirm,
  onCancel,
}: {
  consent: boolean;
  onConsent: (checked: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useModal();
  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="confirm-payment-title"
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      onClick={(e) => isBackdropClick(e) && onCancel()}
    >
      <div className={styles.result}>
        <div className={styles.resultHead}>
          <span className={styles.ask}>
            <Question />
          </span>
          <h2 id="confirm-payment-title" className={styles.title}>
            {copy.title}
          </h2>
        </div>
        <PhotoConsent checked={consent} onChange={onConsent} className={styles.fill} />
        <div className={styles.pair}>
          <button type="button" className={styles.button} onClick={onConfirm} autoFocus>
            {copy.confirm}
          </button>
          <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={onCancel}>
            {copy.cancel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

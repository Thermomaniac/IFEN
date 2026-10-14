"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import styles from "./BookingDialog.module.css";

/** Opens a native <dialog> as a modal on mount: page behind goes inert, focus stays inside. */
export function useModal() {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // React removes the dialog before this cleanup runs, so the browser cannot hand focus
    // back on its own; return it to the control that opened the dialog.
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog.showModal();
    return () => {
      dialog.close();
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return ref;
}

/** True when a click on the <dialog> landed on its backdrop rather than its box. */
export function isBackdropClick(e: MouseEvent<HTMLDialogElement>) {
  if (e.target !== e.currentTarget) return false;
  const r = e.currentTarget.getBoundingClientRect();
  return (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  );
}

/** Paper check: 26 × 19 in a 32px box. */
function Check() {
  return (
    <svg viewBox="0 0 13 9.5" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.783 1.281L4.783 9.281C4.713 9.351 4.63 9.407 4.539 9.445C4.448 9.482 4.35 9.502 4.251 9.502C4.153 9.502 4.055 9.482 3.964 9.445C3.873 9.407 3.79 9.351 3.72 9.281L0.22 5.781C0.15 5.712 0.095 5.629 0.057 5.538C0.019 5.446 0 5.349 0 5.25C0 5.151 0.019 5.054 0.057 4.963C0.095 4.871 0.15 4.789 0.22 4.719C0.29 4.649 0.373 4.594 0.464 4.556C0.555 4.518 0.653 4.499 0.751 4.499C0.85 4.499 0.948 4.518 1.039 4.556C1.13 4.594 1.213 4.649 1.283 4.719L4.252 7.688L11.721 0.22C11.862 0.079 12.053 0 12.253 0C12.452 0 12.643 0.079 12.784 0.22C12.925 0.361 13.004 0.552 13.004 0.751C13.004 0.951 12.925 1.142 12.784 1.283Z"
      />
    </svg>
  );
}

/** Success state shared by the payment and the bank-transfer flows. */
export function BookingResult({
  titleId,
  title,
  text,
  action,
  onAction,
}: {
  titleId: string;
  title: string;
  text: ReactNode;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className={styles.result}>
      <div className={styles.resultHead}>
        <span className={styles.badge}>
          <Check />
        </span>
        <div className={styles.texts} role="status">
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={onAction}
        autoFocus
      >
        {action}
      </button>
    </div>
  );
}

export { styles as dialogStyles };

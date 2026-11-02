"use client";

import { dialogStyles, isBackdropClick, useModal } from "@/components/register/BookingDialog";
import type { Therapist } from "@/data/therapists";
import { TherapistMap } from "./TherapistMap";
import styles from "./MapDialog.module.css";

/**
 * "View In Map": the expanded map in the booking dialogs' modal shell. Esc and the backdrop
 * close it. `single` is a profile's own location map: one practice, no search.
 */
export function MapDialog({
  therapists,
  onClose,
  single = false,
}: {
  therapists: Therapist[];
  onClose: () => void;
  single?: boolean;
}) {
  const ref = useModal();
  return (
    <dialog
      ref={ref}
      className={`${dialogStyles.dialog} ${styles.dialog}`}
      aria-label={single ? "Practice location map" : "Therapist map"}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => isBackdropClick(e) && onClose()}
    >
      <TherapistMap therapists={therapists} mode="full" onClose={onClose} single={single} />
    </dialog>
  );
}

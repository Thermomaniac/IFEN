"use client";

import { useState } from "react";
import type { Therapist } from "@/data/therapists";
import { MapDialog } from "./MapDialog";
import { TherapistMap } from "./TherapistMap";
import styles from "./PracticeLocation.module.css";

/**
 * Profile hero's location card: the directory's "View In Map" preview with the one practice
 * pinned at its address. Hover, focus or tap on the pin opens the address card; "View In
 * Map" opens the same practice on the expanded map.
 */
export function PracticeLocation({ therapist }: { therapist: Therapist }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.map}>
        <TherapistMap therapists={[therapist]} mode="preview" single onExpand={() => setOpen(true)} />
      </div>
      {open && <MapDialog therapists={[therapist]} single onClose={() => setOpen(false)} />}
    </>
  );
}

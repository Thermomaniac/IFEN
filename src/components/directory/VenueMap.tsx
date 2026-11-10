"use client";

import { useState } from "react";
import type { Therapist } from "@/data/therapists";
import type { Venue } from "@/data/venues";
import { MapDialog } from "./MapDialog";
import { TherapistMap } from "./TherapistMap";
import styles from "./VenueMap.module.css";

/**
 * Workshop venue map: the therapist profile's location card (`PracticeLocation`), reused for a
 * venue with verified coordinates. One pin at the venue; the pin card shows the address and
 * links to Google Maps directions; "View In Map" opens the expanded map.
 */
export function VenueMap({ venue, label }: { venue: Venue & { location: [number, number] }; label: string }) {
  const [open, setOpen] = useState(false);
  const [street, cityLine = ""] = venue.address;
  const [postalCode, ...city] = cityLine.split(" ");
  const pin: Therapist = {
    id: venue.id,
    name: venue.practice,
    qualifications: [],
    address: { street, postalCode, city: city.join(" ") },
    country: "de",
    location: venue.location,
  };
  return (
    <section className={styles.wrap} aria-label={label}>
      <div className={styles.map}>
        <TherapistMap therapists={[pin]} mode="preview" single summaryAlign="end" onExpand={() => setOpen(true)} />
      </div>
      {open && <MapDialog therapists={[pin]} single onClose={() => setOpen(false)} />}
    </section>
  );
}

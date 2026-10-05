"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowCornerBackIcon, ArrowCornerIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { course } from "@/data/course";
import styles from "./Mentors.module.css";

// Cards per view; must match --per-view in Mentors.module.css.
const DESKTOP = "(min-width: 64rem)";
const TABLET = "(min-width: 48rem)";

function subscribe(onChange: () => void) {
  const queries = [DESKTOP, TABLET].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function usePerView() {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(DESKTOP).matches ? 4 : window.matchMedia(TABLET).matches ? 2 : 1),
    () => 4,
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

/**
 * Mentor carousel. Every card has the same structure and the row stretches to
 * the tallest one, so sliding never changes the section height. Off-screen
 * cards are inert; a live region reports the position.
 */
export function Mentors() {
  const { mentors } = course;
  const people = mentors.people;
  const perView = usePerView();
  const maxStart = Math.max(0, people.length - perView);
  const [rawStart, setStart] = useState(0);
  const start = Math.min(rawStart, maxStart);
  const end = Math.min(start + perView, people.length);

  return (
    <section className={styles.section} aria-labelledby="mentors-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal as="header" className={styles.header}>
            <RevealItem>
              <SectionLabel tone="warm" size="sm">{mentors.label}</SectionLabel>
            </RevealItem>
            <RevealItem>
              <SectionHeading id="mentors-title" align="start">
                {mentors.heading}
              </SectionHeading>
            </RevealItem>
          </Reveal>

          <Reveal className={styles.controls}>
            <RevealItem>
              <button
                type="button"
                className={styles.nav}
                onClick={() => setStart(start - 1)}
                disabled={start === 0}
                aria-label="Previous mentors"
              >
                <ArrowCornerBackIcon />
              </button>
            </RevealItem>
            <RevealItem>
              <button
                type="button"
                className={styles.nav}
                onClick={() => setStart(start + 1)}
                disabled={start === maxStart}
                aria-label="Next mentors"
              >
                <ArrowCornerIcon />
              </button>
            </RevealItem>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing ${start + 1}${end - start > 1 ? `–${end}` : ""} of ${people.length} mentors`}
        </p>

        <Reveal className={styles.viewport}>
          <ul className={styles.list} style={{ "--start": start } as CSSProperties}>
            {people.map((m, i) => (
              <RevealItem as="li" key={m.id} className={styles.card}>
                <div className={styles.cardInner} inert={i < start || i >= end}>
                  <div className={styles.media}>
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={`Portrait of ${m.name}`}
                        fill
                        sizes="(min-width: 64rem) 312px, (min-width: 48rem) 50vw, 100vw"
                        className={styles.photo}
                      />
                    ) : (
                      <span className={styles.placeholder} aria-hidden="true">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.name}>{m.name}</h3>
                    <p className={styles.role}>{m.role}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowCornerBackIcon, ArrowCornerIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Speaker, SpeakersContent } from "@/data/coursePage";
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

/**
 * Speaker carousel, same mechanics as the homepage Board: the arrows slide the
 * track one card at a time with the shared reveal easing. Every card links to
 * the speaker's page; hovering or focusing one zooms the photo and reveals the
 * small apricot register arrow (Paper's hover state). Off-screen cards are inert; a live
 * region reports the position. Speakers without a page render as plain cards, and
 * the arrows hide when every card already fits.
 */
export function Mentors({ content: mentors }: { content: SpeakersContent }) {
  const people = mentors.people;
  const perView = usePerView();
  const maxStart = Math.max(0, people.length - perView);
  const [rawStart, setStart] = useState(0);
  const start = Math.min(rawStart, maxStart);
  const end = Math.min(start + perView, people.length);

  return (
    <section id="speakers" className={styles.section} aria-labelledby="mentors-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal as="header" className={styles.header}>
            <RevealItem>
              <SectionLabel tone="warm" size="sm">
                {mentors.label}
              </SectionLabel>
            </RevealItem>
            <RevealItem>
              <SectionHeading id="mentors-title" align="start">
                {mentors.heading}
              </SectionHeading>
            </RevealItem>
          </Reveal>

          {maxStart > 0 && (
            <Reveal className={styles.controls}>
              <RevealItem>
                <button
                  type="button"
                  className={styles.nav}
                  onClick={() => setStart(start - 1)}
                  disabled={start === 0}
                  aria-label="Previous speakers"
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
                  aria-label="Next speakers"
                >
                  <ArrowCornerIcon />
                </button>
              </RevealItem>
            </Reveal>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing ${start + 1}${end - start > 1 ? `–${end}` : ""} of ${people.length} speakers`}
        </p>

        <Reveal className={styles.viewport}>
          <ul className={styles.list} style={{ "--start": start } as CSSProperties}>
            {people.map((m, i) => (
              <RevealItem as="li" key={m.id} className={styles.card}>
                <SpeakerCard person={m} hidden={i < start || i >= end} />
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function SpeakerCard({ person: m, hidden }: { person: Speaker; hidden: boolean }) {
  const inner = (
    <>
      <div className={styles.media}>
        <Image
          src={m.image}
          alt=""
          fill
          sizes="(min-width: 64rem) 312px, (min-width: 48rem) 50vw, 100vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <h3 className={styles.name}>{m.name}</h3>
          <p className={styles.role}>{m.role}</p>
        </div>
        {m.href && (
          <span className={styles.go} aria-hidden="true">
            <ArrowCornerIcon width={16} height={16} />
          </span>
        )}
      </div>
    </>
  );

  return m.href ? (
    <a href={m.href} className={styles.cardInner} inert={hidden}>
      {inner}
    </a>
  ) : (
    <div className={styles.cardInner} inert={hidden}>
      {inner}
    </div>
  );
}

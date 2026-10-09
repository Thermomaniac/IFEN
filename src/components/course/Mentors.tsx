"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowCornerBackIcon, ArrowCornerIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Speaker, SpeakersContent } from "@/data/coursePage";
import styles from "./Mentors.module.css";

/** The row always shows at least four cards; open seats are clearly marked placeholders. */
const MIN_CARDS = 4;

/**
 * Speaker carousel: a natively scrollable row that snaps card by card, so touch,
 * trackpad and keyboard scrolling all work. The arrows scroll one card at a time and
 * grey out at either end. Every speaker card links to the speaker's page; hovering or
 * focusing one zooms the photo and reveals the small apricot arrow. Pages with fewer
 * than four speakers fill the row with "to be announced" cards rather than invented
 * people. A live region reports the visible range.
 */
export function Mentors({ content: mentors }: { content: SpeakersContent }) {
  const people = mentors.people;
  const total = Math.max(MIN_CARDS, people.length);
  const placeholders = total - people.length;
  const rowRef = useRef<HTMLUListElement>(null);
  const [range, setRange] = useState({ first: 0, last: Math.min(total, MIN_CARDS) - 1, atStart: true, atEnd: true });

  // Which cards are fully in view, read only when the row scrolls or resizes.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const box = row.getBoundingClientRect();
      const cards = [...row.children] as HTMLElement[];
      const seen = cards
        .map((card, i) => ({ i, r: card.getBoundingClientRect() }))
        .filter(({ r }) => r.left >= box.left - 2 && r.right <= box.right + 2)
        .map(({ i }) => i);
      const max = row.scrollWidth - row.clientWidth;
      setRange({
        first: seen[0] ?? 0,
        last: seen[seen.length - 1] ?? 0,
        atStart: row.scrollLeft <= 2,
        atEnd: row.scrollLeft >= max - 2,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(row);
    row.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      row.removeEventListener("scroll", schedule);
    };
  }, []);

  function step(dir: 1 | -1) {
    const row = rowRef.current;
    const card = row?.firstElementChild as HTMLElement | null;
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  }

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

          <Reveal className={styles.controls}>
            <RevealItem>
              <button
                type="button"
                className={styles.nav}
                onClick={() => step(-1)}
                disabled={range.atStart}
                aria-controls="speakers-row"
                aria-label="Previous speakers"
              >
                <ArrowCornerBackIcon />
              </button>
            </RevealItem>
            <RevealItem>
              <button
                type="button"
                className={styles.nav}
                onClick={() => step(1)}
                disabled={range.atEnd}
                aria-controls="speakers-row"
                aria-label="Next speakers"
              >
                <ArrowCornerIcon />
              </button>
            </RevealItem>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing ${range.first + 1}${range.last > range.first ? `–${range.last + 1}` : ""} of ${total} cards`}
        </p>

        <Reveal className={styles.viewport}>
          <ul ref={rowRef} id="speakers-row" className={styles.list} tabIndex={-1}>
            {people.map((m) => (
              <RevealItem as="li" key={m.id} className={styles.card}>
                <SpeakerCard person={m} />
              </RevealItem>
            ))}
            {Array.from({ length: placeholders }, (_, i) => (
              <RevealItem as="li" key={`tba-${i}`} className={styles.card}>
                <div className={styles.cardInner} data-placeholder>
                  <div className={styles.media}>
                    <span className={styles.tba}>To be announced</span>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.text}>
                      <h3 className={styles.name}>Speaker to be announced</h3>
                      <p className={styles.role}>Details follow</p>
                    </div>
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

function SpeakerCard({ person: m }: { person: Speaker }) {
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
    <a href={m.href} className={styles.cardInner}>
      {inner}
    </a>
  ) : (
    <div className={styles.cardInner}>{inner}</div>
  );
}

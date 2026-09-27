"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowCornerBackIcon, ArrowCornerIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { board } from "@/data/site";
import styles from "./Board.module.css";

// Cards per view; must match the breakpoints in Board.module.css.
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
    () => (window.matchMedia(DESKTOP).matches ? 3 : window.matchMedia(TABLET).matches ? 2 : 1),
    () => 3,
  );
}

/**
 * Board carousel. Arrows slide the track one card at a time; on desktop the first
 * card in view is the large featured one with its brief showing. Hovering or focusing
 * any other card slides its brief up (CSS only, cards never resize on hover).
 * Below 1024 cards stack image-over-text with the brief always shown.
 */
export function Board() {
  const { members } = board;
  const perView = usePerView();
  const maxStart = Math.max(0, members.length - perView);
  const [rawStart, setStart] = useState(0);
  const start = Math.min(rawStart, maxStart);
  const end = Math.min(start + perView, members.length);

  return (
    <section id="board" className={styles.board} aria-labelledby="board-title">
      <span className={styles.brain} aria-hidden="true" />
      <Container className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel>{board.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="board-title" className={styles.heading}>
              {board.heading}
            </SectionHeading>
          </RevealItem>
        </Reveal>

        <Reveal className={styles.body}>
          <RevealItem className={styles.controls}>
            <span className={styles.rule} aria-hidden="true" />
            <button
              type="button"
              className={styles.nav}
              onClick={() => setStart(start - 1)}
              disabled={start === 0}
              aria-label="Previous board members"
            >
              <ArrowCornerBackIcon />
            </button>
            <button
              type="button"
              className={styles.nav}
              onClick={() => setStart(start + 1)}
              disabled={start === maxStart}
              aria-label="Next board members"
            >
              <ArrowCornerIcon />
            </button>
          </RevealItem>

          <p className="sr-only" aria-live="polite">
            {`Showing ${start + 1}${end - start > 1 ? `–${end}` : ""} of ${members.length}`}
          </p>

          <RevealItem className={styles.viewport}>
            <ul className={styles.list} style={{ "--start": start } as CSSProperties}>
              {members.map((m, i) => {
                const visible = i >= start && i < end;
                return (
                  <li key={m.id} className={styles.card} data-featured={i === start} inert={!visible}>
                    <div className={styles.media}>
                      <Image
                        src={m.image.src}
                        alt={m.image.alt}
                        fill
                        sizes="(min-width: 64rem) 562px, (min-width: 48rem) 50vw, 100vw"
                        className={styles.photo}
                      />
                    </div>
                    {/* Clip area inset 16px from the card; the slide sits at its bottom edge. */}
                    <div className={styles.clip}>
                      <div className={styles.slide}>
                        <h3 className={styles.name}>
                          {m.name}
                          <span className={styles.role}>
                            <span className={styles.sep}>, </span>
                            {m.role}
                          </span>
                        </h3>
                        <div className={styles.brief}>
                          <p className={styles.bio}>{m.bio}</p>
                          <a href={m.href} className={styles.link}>
                            <span className="sr-only">More about {m.name}</span>
                            <ArrowCornerIcon />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}

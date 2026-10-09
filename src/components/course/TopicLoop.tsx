"use client";

import { useRef, useState } from "react";
import { useAnimationFrame, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { CheckCircleIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { ArticlesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./TopicLoop.module.css";

/** Row pitch: 24px line plus the 32px gap Paper sets between topics. */
const ROW = 56;
const VISIBLE = 5;
/** Pixels per second. Slow enough to read a topic as it passes the centre. */
const SPEED = 14;
/** Topic that sits in the focus slot on first paint. */
const START = 2;

/**
 * Prose on the left, the topic list on the right as a slow bottom-to-top loop. The
 * row crossing the centre is in focus; the rest blur and fade with distance. The
 * loop pauses on hover, keyboard focus and while off screen, and is a plain static
 * list for reduced motion.
 */
export function TopicLoop({ id, tone, content }: { id: string; tone: Tone; content: ArticlesContent }) {
  const prose = content.items.find((item) => !item.list);
  const topics = content.items.find((item) => item.list);
  const items = topics?.list ?? [];

  const reduce = usePrefersReducedMotion();
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const inView = useInView(viewRef);
  const [paused, setPaused] = useState(false);
  const travelled = useRef(0);

  const loop = items.length * ROW;
  const centre = (VISIBLE * ROW) / 2;
  const origin = centre - (START * ROW + ROW / 2);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || reduce || !loop) return;
    if (inView && !paused) travelled.current = (travelled.current + (delta / 1000) * SPEED) % loop;
    const y = origin - travelled.current;
    track.style.transform = `translate3d(0, ${y}px, 0)`;
    const rows = track.children;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as HTMLElement;
      const distance = Math.abs(y + i * ROW + ROW / 2 - centre) / ROW;
      const focus = Math.max(0, 1 - distance);
      row.style.opacity = String(Math.max(0, 1 - distance * 0.32));
      row.style.filter = distance > 0.6 ? `blur(${Math.min((distance - 0.6) * 1.4, 2.4).toFixed(2)}px)` : "none";
      row.style.setProperty("--focus", focus.toFixed(3));
    }
  });

  // Two copies so the wrap point is never visible. Only the first is read out.
  const rows = reduce ? items : [...items, ...items];

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <Reveal className={styles.split} stagger={0.08}>
        {prose && (
          <RevealItem as="article" className={styles.prose}>
            {prose.heading && <h3 className={styles.heading}>{prose.heading}</h3>}
            {prose.paragraphs?.map((text) => (
              <p key={text} className={styles.text}>
                {text}
              </p>
            ))}
          </RevealItem>
        )}
        {topics && (
          <RevealItem className={styles.topics}>
            {topics.heading && (
              <h3 className="sr-only" id={`${id}-topics`}>
                {topics.heading}
              </h3>
            )}
            <div
              ref={viewRef}
              className={styles.viewport}
              data-static={reduce || undefined}
              tabIndex={reduce ? undefined : 0}
              role={reduce ? undefined : "region"}
              aria-labelledby={topics.heading ? `${id}-topics` : undefined}
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <ul ref={trackRef} className={styles.track}>
                {rows.map((topic, i) => (
                  <li
                    key={`${topic}-${i}`}
                    className={styles.row}
                    aria-hidden={i >= items.length || undefined}
                    data-focus={reduce && i === START ? "" : undefined}
                  >
                    <CheckCircleIcon className={styles.icon} aria-hidden="true" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        )}
      </Reveal>
    </CourseSection>
  );
}

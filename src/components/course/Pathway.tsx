"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { SparkleIcon } from "@/components/icons";
import { usePinnedSteps } from "@/components/motion/usePinnedSteps";
import type { PathwayContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./Pathway.module.css";

const GLIDE = [0.16, 1, 0.3, 1] as const;

/**
 * Certification steps on a shared track. The band pins under the nav with Module 1
 * active; as the page scrolls on, each next step lights up and the dark line glides on
 * to just past it. The band releases once the last step is active and the line is
 * complete. Where the band does not fit the viewport it scrolls normally and the same
 * progress follows it.
 */
export function Pathway({ id, tone, content }: { id: string; tone: Tone; content: PathwayContent }) {
  const count = content.steps.length;
  const pin = usePinnedSteps(count, { reserve: 80, media: "(min-width: 64rem)" });
  const trackRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  // Fraction of the line that is dark once step i is active: just past that card, half
  // way into the gap; the last step completes the line.
  const [stops, setStops] = useState<number[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;
    const measure = () => {
      const box = line.getBoundingClientRect();
      const across = box.width >= box.height;
      const length = across ? box.width : box.height;
      if (!length) return;
      const cards = [...track.querySelectorAll<HTMLElement>("[data-card]")];
      setStops(
        cards.map((card, i) => {
          if (i === cards.length - 1) return 1;
          const r = card.getBoundingClientRect();
          const next = cards[i + 1].getBoundingClientRect();
          const end = across ? (r.right + next.left) / 2 - box.left : (r.bottom + next.top) / 2 - box.top;
          return Math.min(1, Math.max(0, end / length));
        }),
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const fill = stops[pin.step] ?? 0;

  return (
    <CourseSection id={id} tone={tone} head={content} pin={pin}>
      <div className={styles.path}>
        <ol ref={trackRef} className={styles.track} style={{ "--fill": fill } as CSSProperties}>
          <span ref={lineRef} className={styles.line} aria-hidden="true">
            <span className={styles.fill} />
          </span>
          {content.steps.map((s, i) => {
            const active = i <= pin.step;
            return (
              <li
                key={s.label}
                className={styles.step}
                data-active={active || undefined}
                aria-current={s.current ? "step" : undefined}
              >
                <motion.span
                  className={styles.badge}
                  initial={false}
                  animate={active ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
                  transition={{ duration: pin.reduce ? 0 : 0.9, ease: GLIDE, delay: active && !pin.reduce ? 0.12 : 0 }}
                >
                  {s.label}
                </motion.span>
                <div className={styles.card} data-card>
                  <span className={styles.number} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className={styles.text}>
                    <h3 className={styles.heading}>
                      {s.heading}
                      {s.current && <span className="sr-only"> (this course)</span>}
                    </h3>
                    {s.text && <p className={styles.detail}>{s.text}</p>}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className={styles.note}>
          <SparkleIcon aria-hidden="true" className={styles.spark} />
          <span>{content.note}</span>
          <SparkleIcon aria-hidden="true" className={styles.spark} />
        </p>
      </div>
    </CourseSection>
  );
}

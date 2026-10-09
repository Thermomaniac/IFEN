"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { SparkleIcon } from "@/components/icons";
import { EASE } from "@/components/motion/Reveal";
import type { PathwayContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./Pathway.module.css";

/**
 * Certification steps on a shared track. The track fills dark as the section scrolls
 * through the viewport, and each step activates once the fill reaches it. The page
 * scrolls freely: nothing is pinned, the progress only reads the scroll position.
 * Once every step is reached, the middle steps (any order) settle into a compact card.
 */
export function Pathway({ id, tone, content }: { id: string; tone: Tone; content: PathwayContent }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLOListElement>(null);
  const count = content.steps.length;
  const [reached, setReached] = useState(-1);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.85", "end 0.45"] });

  // Steps only ever move forward, so scrolling back up never flickers them off.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p <= 0 ? -1 : Math.min(count - 1, Math.floor(p * count));
    setReached((prev) => Math.max(prev, next));
  });

  const step = reduce ? count - 1 : reached;
  const settled = step >= count - 1;
  const fill = reduce ? 1 : scrollYProgress;

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <motion.ol
        ref={trackRef}
        className={styles.track}
        style={{ "--progress": fill } as unknown as CSSProperties}
        data-settled={settled || undefined}
      >
        <span className={styles.line} aria-hidden="true">
          <span className={styles.fill} />
        </span>
        {content.steps.map((s, i) => {
          const active = i <= step;
          const compact = settled && i > 0 && i < count - 1;
          return (
            <li
              key={s.label}
              className={styles.step}
              data-active={active || undefined}
              data-compact={compact || undefined}
              aria-current={s.current ? "step" : undefined}
            >
              <motion.span
                className={styles.badge}
                initial={false}
                animate={active ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: active && !reduce ? 0.15 : 0 }}
              >
                {s.label}
              </motion.span>
              <motion.div
                className={styles.card}
                initial={false}
                animate={active ? { y: 0, opacity: 1 } : { y: 24, opacity: 0.55 }}
                transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
              >
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
              </motion.div>
            </li>
          );
        })}
      </motion.ol>
      <p className={styles.note}>
        <SparkleIcon aria-hidden="true" className={styles.spark} />
        <span>{content.note}</span>
        <SparkleIcon aria-hidden="true" className={styles.spark} />
      </p>
    </CourseSection>
  );
}

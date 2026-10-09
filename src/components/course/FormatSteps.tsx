"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarDotsIcon, CheckBoldIcon, ClockIcon, StarIcon, VideoLessonIcon } from "@/components/icons";
import type { FeatureIcon, FeaturesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./FormatSteps.module.css";

const ICONS: Record<FeatureIcon, typeof ClockIcon> = {
  clock: ClockIcon,
  video: VideoLessonIcon,
  star: StarIcon,
  calendar: CalendarDotsIcon,
};

/**
 * Format facts in open columns over a hairline. The first column is underlined as soon
 * as the row is in view; the others light up one by one as the page scrolls, each line
 * filling with the scroll position. Nothing is pinned, the page scrolls freely.
 */
export function FormatSteps({ id, tone, content }: { id: string; tone: Tone; content: FeaturesContent }) {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLUListElement>(null);
  const count = content.items.length;
  const inView = useInView(rowRef, { once: true, amount: 0.6 });
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start 0.7", "end 0.3"] });
  // Steps after the first share the scroll range: 0 → count - 1.
  const progress = useTransform(scrollYProgress, [0, 1], [0, count - 1]);

  // Lines and columns only ever move forward, so scrolling back up never empties them.
  const filled = useMotionValue(0);
  useMotionValueEvent(progress, "change", (p) => {
    if (p > filled.get()) filled.set(p);
    setReached((prev) => Math.max(prev, Math.min(count - 1, Math.ceil(p))));
  });

  const step = reduce ? count - 1 : inView ? reached : -1;

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <motion.ul
        ref={rowRef}
        className={styles.row}
        data-static={reduce || undefined}
        style={{ "--progress": reduce ? count : filled } as unknown as CSSProperties}
      >
        {content.items.map((item, i) => {
          const active = i <= step;
          const Icon = active ? CheckBoldIcon : ICONS[item.icon ?? "clock"];
          return (
            <li
              key={item.heading}
              className={styles.item}
              data-active={active || undefined}
              data-first={i === 0 || undefined}
              style={{ "--i": i } as CSSProperties}
            >
              <span className={styles.icon} aria-hidden="true">
                <Icon />
              </span>
              <div className={styles.text}>
                <h3 className={styles.heading}>{item.heading}</h3>
                <p className={styles.detail}>{item.text}</p>
              </div>
              <span className={styles.line} aria-hidden="true">
                <span className={styles.fill} />
              </span>
            </li>
          );
        })}
      </motion.ul>
    </CourseSection>
  );
}

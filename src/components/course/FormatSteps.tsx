"use client";

import { useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useSpring } from "framer-motion";
import { CalendarDotsIcon, CheckBoldIcon, ClockIcon, StarIcon, VideoLessonIcon } from "@/components/icons";
import { usePinnedSteps } from "@/components/motion/usePinnedSteps";
import type { FeatureIcon, FeaturesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./FormatSteps.module.css";

const ICONS: Record<FeatureIcon, typeof ClockIcon> = {
  clock: ClockIcon,
  video: VideoLessonIcon,
  star: StarIcon,
  calendar: CalendarDotsIcon,
};

/** A column lights up once its line is this far drawn, so the two read as one motion. */
const LIGHT_AT = 0.5;

/**
 * Format facts in open columns over a hairline. The band pins under the nav with every
 * column inactive and every line empty. Scrolling on draws each line in turn and lights
 * its column as the line passes half way; the band releases once the last line is
 * complete, and scrolling back reverses each step. Where the band does not fit the
 * viewport (phones, short windows) nothing pins and the same sequence follows the
 * columns through the viewport. With reduced motion every column is shown complete.
 */
export function FormatSteps({ id, tone, content }: { id: string; tone: Tone; content: FeaturesContent }) {
  const count = content.items.length;
  const pin = usePinnedSteps(count, { reserve: 80 });
  // The Pathway spring: smooths coarse wheel steps without lagging behind the scroll.
  const smooth = useSpring(pin.position, { stiffness: 260, damping: 40, restDelta: 0.0005 });
  const progress = pin.reduce ? pin.position : smooth;
  const [lit, setLit] = useState(0);
  useMotionValueEvent(progress, "change", (q) => setLit(Math.min(count, Math.max(0, Math.floor(q + 1 - LIGHT_AT)))));

  return (
    <CourseSection id={id} tone={tone} head={content} pin={pin} narrow>
      <motion.ul className={styles.row} style={{ "--progress": progress } as unknown as CSSProperties}>
        {content.items.map((item, i) => {
          const active = pin.reduce || i < lit;
          const Icon = ICONS[item.icon ?? "clock"];
          return (
            <li
              key={item.heading}
              className={styles.item}
              data-active={active || undefined}
              style={{ "--i": i } as CSSProperties}
            >
              <span className={styles.icon} aria-hidden="true">
                <Icon className={styles.glyph} />
                <CheckBoldIcon className={styles.check} />
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

"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
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

/**
 * Format facts in open columns over a hairline. The band pins under the nav with the
 * first column active; scrolling on fills each next line and lights its column in the
 * same motion, and the band releases once the last column is complete. Where the band
 * does not fit the viewport it scrolls normally and the same progress follows it.
 */
export function FormatSteps({ id, tone, content }: { id: string; tone: Tone; content: FeaturesContent }) {
  const count = content.items.length;
  const pin = usePinnedSteps(count, { reserve: 80 });

  return (
    <CourseSection id={id} tone={tone} head={content} pin={pin} narrow>
      <motion.ul className={styles.row} style={{ "--progress": pin.position } as unknown as CSSProperties}>
        {content.items.map((item, i) => {
          const active = i <= pin.step;
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

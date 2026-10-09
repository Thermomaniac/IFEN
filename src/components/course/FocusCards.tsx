"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Reveal, RevealItem, revealItem } from "@/components/motion/Reveal";
import type { FeaturesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./FocusCards.module.css";

/**
 * A photo beside stacked cards. One card at a time takes the gray active fill as the
 * page scrolls past; the one before returns to its outline. Scrolling back steps back.
 * The page is never pinned.
 */
export function FocusCards({ id, tone, content }: { id: string; tone: Tone; content: FeaturesContent }) {
  const listRef = useRef<HTMLUListElement>(null);
  const count = content.items.length;
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.65", "end 0.45"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setCurrent(Math.max(0, Math.min(count - 1, Math.floor(p * count))));
  });

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <Reveal className={styles.split}>
        {content.image && (
          <RevealItem className={styles.media}>
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 64rem) 66vw, 100vw"
              className={styles.photo}
            />
          </RevealItem>
        )}
        <ul ref={listRef} className={styles.cards}>
          {content.items.map((item, i) => (
            <motion.li
              key={item.heading}
              variants={revealItem}
              className={styles.card}
              data-active={i === current || undefined}
            >
              {item.eyebrow && <span className={styles.tag}>{item.eyebrow}</span>}
              <div className={styles.text}>
                <h3 className={styles.heading}>{item.heading}</h3>
                <p className={styles.detail}>{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </CourseSection>
  );
}

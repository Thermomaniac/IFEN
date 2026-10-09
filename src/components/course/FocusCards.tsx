"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PinStage } from "@/components/motion/PinStage";
import { revealItem } from "@/components/motion/Reveal";
import { usePinnedSteps } from "@/components/motion/usePinnedSteps";
import type { FeaturesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./FocusCards.module.css";

/** Natural height of the stacked cards, since the pinned split stretches them. */
function cardsHeight(split: HTMLDivElement) {
  const list = split.querySelector("ul");
  if (!list) return split.offsetHeight;
  const items = [...list.children] as HTMLElement[];
  const listGap = parseFloat(getComputedStyle(list).rowGap) || 0;
  return items.reduce((sum, li, i) => {
    const cs = getComputedStyle(li);
    const kids = [...li.children] as HTMLElement[];
    const inner = kids.reduce((h, el) => h + el.offsetHeight, 0) + (parseFloat(cs.rowGap) || 0) * (kids.length - 1);
    const own = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + inner;
    return sum + Math.max(own, parseFloat(cs.minHeight) || 0) + (i ? listGap : 0);
  }, 0);
}

/**
 * A photo beside stacked cards. The split pins under the nav with the first card in
 * the sage active fill; scrolling on hands the fill to each next card while the one
 * before returns to its outline, and the split releases after the last. Where the
 * split does not fit the viewport it scrolls normally and the same progress follows it.
 * With reduced motion all three cards sit outlined, with equal weight.
 */
export function FocusCards({ id, tone, content }: { id: string; tone: Tone; content: FeaturesContent }) {
  const count = content.items.length;
  const pin = usePinnedSteps<HTMLDivElement>(count, { media: "(min-width: 64rem)", reserve: 48, measure: cardsHeight });
  const { contentRef, pinned, step, reduce } = pin;

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <PinStage pin={pin}>
        <motion.div
          ref={contentRef}
          className={styles.split}
          data-pinned={pinned || undefined}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {content.image && (
            <motion.div variants={revealItem} className={styles.media}>
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 64rem) 66vw, 100vw"
                className={styles.photo}
              />
            </motion.div>
          )}
          <ul className={styles.cards}>
            {content.items.map((item, i) => (
              <motion.li
                key={item.heading}
                variants={revealItem}
                className={styles.card}
                data-active={(!reduce && i === step) || undefined}
              >
                {item.eyebrow && <span className={styles.tag}>{item.eyebrow}</span>}
                <div className={styles.text}>
                  <h3 className={styles.heading}>{item.heading}</h3>
                  <p className={styles.detail}>{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </PinStage>
    </CourseSection>
  );
}

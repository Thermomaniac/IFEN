"use client";

import Image from "next/image";
import { useRef, useState, type FocusEvent } from "react";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import type { RolesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./RoleMarquee.module.css";

/** Pixels per second. Slow enough to read every label as it passes. */
const SPEED = 28;

/**
 * Profession photo cards on a slow, endless horizontal loop. The loop pauses while a
 * pointer is over it or a card has keyboard focus. Hover and focus both grow the lime
 * label to fill the card. With reduced motion the row is static and scrolls by hand.
 */
export function RoleMarquee({ id, tone, content }: { id: string; tone: Tone; content: RolesContent }) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const offset = useRef(0);
  const inView = useInView(viewportRef);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const paused = hovered || focused || !inView;

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    const set = setRef.current;
    if (reduce || !track || !set) return;
    // One set plus the gap that follows it, so the copy lands exactly where the first began.
    const span = set.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    if (!paused) offset.current += (SPEED * delta) / 1000;
    offset.current = ((offset.current % span) + span) % span;
    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  });

  // Keep a focused card fully visible: nudge the loop instead of scrolling the page.
  function bringIntoView(e: FocusEvent<HTMLLIElement>) {
    const viewport = viewportRef.current;
    if (reduce || !viewport) return;
    const card = e.currentTarget.getBoundingClientRect();
    const box = viewport.getBoundingClientRect();
    if (card.left < box.left) offset.current -= box.left - card.left + 16;
    else if (card.right > box.right) offset.current += card.right - box.right + 16;
  }

  const renderCards = (copy: boolean) =>
    content.roles.map((role, i) => {
      const open = !copy && active === i;
      return (
        <li
          key={role.name}
          className={styles.card}
          tabIndex={copy ? undefined : 0}
          data-open={open || undefined}
          onPointerEnter={copy ? undefined : () => setActive(i)}
          onPointerLeave={copy ? undefined : () => setActive((a) => (a === i ? null : a))}
          onFocus={
            copy
              ? undefined
              : (e) => {
                  setActive(i);
                  bringIntoView(e);
                }
          }
          onBlur={copy ? undefined : () => setActive((a) => (a === i ? null : a))}
        >
          <Image src={role.image} alt="" fill sizes="(min-width: 48rem) 400px, 260px" className={styles.photo} />
          <span className={styles.scrim} aria-hidden="true" />
          <motion.span
            layout={!reduce}
            className={styles.label}
            data-open={open || undefined}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <motion.span layout={reduce ? false : "position"} className={styles.name}>
              {role.name}
            </motion.span>
          </motion.span>
        </li>
      );
    });

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        data-static={reduce || undefined}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        <div ref={trackRef} className={styles.track}>
          <ul ref={setRef} className={styles.set}>
            {renderCards(false)}
          </ul>
          {!reduce && (
            <ul className={styles.set} aria-hidden="true" inert>
              {renderCards(true)}
            </ul>
          )}
        </div>
      </div>
    </CourseSection>
  );
}

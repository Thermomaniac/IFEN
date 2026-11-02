"use client";

import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import type { CardChip } from "@/lib/schedule";
import styles from "./Training.module.css";

type Kind = CardChip["kind"];
type Controls = ReturnType<typeof useAnimation>;

/*
 * Animated Lucide icons (lucide-animated: flame, alarm-clock-check, badge-percent), driven by
 * the whole card instead of the icon's own hover. Variants are the library's, unchanged.
 */

const SPRING = { type: "spring", stiffness: 200, damping: 25 } as const;

// alarm-clock-check: the clock lifts and rattles, the bells rattle harder.
const CLOCK_VARIANTS: Variants = {
  normal: { y: 0, x: 0, transition: { duration: 0.2, ...SPRING } },
  animate: {
    y: -1.5,
    x: [-1, 1, -1, 1, -1, 0],
    transition: { y: { duration: 0.2, ...SPRING }, x: { duration: 0.3, repeat: Number.POSITIVE_INFINITY, ease: "linear" } },
  },
};
const BELL_VARIANTS: Variants = {
  normal: { y: 0, x: 0, transition: { duration: 0.2, ...SPRING } },
  animate: {
    y: -2.5,
    x: [-2, 2, -2, 2, -2, 0],
    transition: { y: { duration: 0.2, ...SPRING }, x: { duration: 0.3, repeat: Number.POSITIVE_INFINITY, ease: "linear" } },
  },
};

// badge-percent: the badge spins half a turn on a soft spring.
const BADGE_VARIANTS: Variants = {
  normal: { rotate: 0, transition: { type: "spring", stiffness: 60, damping: 10, duration: 0.5 } },
  animate: { rotate: 180, transition: { delay: 0.1, type: "spring", stiffness: 80, damping: 13 } },
};

// flame: the outline draws itself in.
const FLAME_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: { delay: 0.1, duration: 0.4, opacity: { duration: 0.1, delay: 0.1 } },
  },
};

function AlarmClock({ controls }: { controls: Controls }) {
  return (
    <>
      <motion.circle animate={controls} initial="normal" variants={CLOCK_VARIANTS} cx="12" cy="13" r="8" />
      <motion.path animate={controls} initial="normal" variants={BELL_VARIANTS} d="M5 3 2 6" />
      <motion.path animate={controls} initial="normal" variants={BELL_VARIANTS} d="m22 6-3-3" />
      <motion.path animate={controls} initial="normal" variants={CLOCK_VARIANTS} d="M6.38 18.7 4 21" />
      <motion.path animate={controls} initial="normal" variants={CLOCK_VARIANTS} d="M17.64 18.67 20 21" />
      <motion.path animate={controls} initial="normal" variants={CLOCK_VARIANTS} d="m9 13 2 2 4-4" />
    </>
  );
}

function BadgePercent({ controls }: { controls: Controls }) {
  return (
    <>
      <motion.path
        animate={controls}
        initial="normal"
        variants={BADGE_VARIANTS}
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      />
      <path d="m15 9-6 6" />
      <path d="M9 9h.01" />
      <path d="M15 15h.01" />
    </>
  );
}

function Flame({ controls }: { controls: Controls }) {
  return (
    <motion.path
      animate={controls}
      initial="normal"
      variants={FLAME_VARIANTS}
      d="M8.9 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
    />
  );
}

const ICONS: Record<Kind, (props: { controls: Controls }) => React.JSX.Element> = {
  "ends-today": AlarmClock,
  sale: BadgePercent,
  new: Flame,
};

/** Chip icon that animates while its card is hovered (pointer devices) or focused. Still under reduced motion. */
export function ChipIcon({ kind }: { kind: Kind }) {
  const ref = useRef<SVGSVGElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const card = ref.current?.closest("li");
    if (!card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => void controls.start("animate");
    // Stop first so the infinite rattle on the alarm clock ends before it springs back.
    const reset = () => {
      controls.stop();
      controls.start("normal").catch(() => {});
    };

    const canHover = matchMedia("(hover: hover)").matches;
    const onEnter = () => canHover && start();
    const onLeave = () => !card.contains(document.activeElement) && reset();
    const onFocusOut = (e: FocusEvent) => !card.contains(e.relatedTarget as Node | null) && !card.matches(":hover") && reset();

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("focusin", start);
    card.addEventListener("focusout", onFocusOut);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("focusin", start);
      card.removeEventListener("focusout", onFocusOut);
    };
  }, [controls]);

  const Icon = ICONS[kind];
  return (
    <svg
      ref={ref}
      className={styles.chipIcon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <Icon controls={controls} />
    </svg>
  );
}

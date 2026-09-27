"use client";

import { useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSyncExternalStore, type RefObject } from "react";

const noop = () => () => {};

/**
 * Scroll-linked vertical offset for a background layer inside `target`.
 * `distance` is the total travel in px across the section's pass through the viewport.
 * Returns 0 under prefers-reduced-motion. The server can't know that preference,
 * so it only applies after hydration; otherwise the first client render would
 * disagree with the server HTML.
 */
export function useParallax(target: RefObject<HTMLElement | null>, distance = 120): MotionValue<number> {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const still = hydrated && reduce;
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, (p) => (still ? 0 : (p - 0.5) * distance));
}

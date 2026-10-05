"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  header: motion.header,
  p: motion.p,
  h2: motion.h2,
  span: motion.span,
};
type Tag = keyof typeof tags;

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Seconds between each direct child using `revealItem`. */
  stagger?: number;
  delay?: number;
};

/**
 * Staggered scroll reveal. Children that are <RevealItem> (or any motion element
 * using `revealItem`) animate in sequence once the group is in view.
 */
export function Reveal({ children, as = "div", className, stagger = 0.08, delay = 0 }: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, as = "div", className }: { children: ReactNode; as?: Tag; className?: string }) {
  const Component = tags[as];
  return (
    <Component className={className} variants={revealItem}>
      {children}
    </Component>
  );
}

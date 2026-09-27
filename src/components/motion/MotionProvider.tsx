"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// reducedMotion="user" makes every motion component honour prefers-reduced-motion:
// transform/layout animations are skipped, opacity still fades.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

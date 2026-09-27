import type { ReactNode } from "react";
import { ArrowCornerIcon } from "@/components/icons";
import styles from "./CtaButton.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "accent" | "ink" | "light";
  className?: string;
};

/**
 * Label block + separate square arrow block, as drawn in Paper.
 * The whole thing is one link so it is a single tab stop.
 */
export function CtaButton({ href, children, variant = "accent", className }: Props) {
  return (
    <a href={href} className={[styles.cta, styles[variant], className].filter(Boolean).join(" ")}>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow}>
        <ArrowCornerIcon />
      </span>
    </a>
  );
}

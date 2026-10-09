import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

/**
 * Figma "Button", size md: 44px, label only. Primary is the apricot fill; secondary is
 * white with an ink hairline and turns #F1FAFA on hover. Used where a primary and a
 * secondary action sit side by side; a lone call to action stays a CtaButton.
 */
export function Button({ href, children, variant = "primary", className }: Props) {
  return (
    <a href={href} className={[styles.button, styles[variant], className].filter(Boolean).join(" ")}>
      {children}
    </a>
  );
}

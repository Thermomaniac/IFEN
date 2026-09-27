import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  children: ReactNode;
  id?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ children, id, align = "center", tone = "light", className }: Props) {
  const cls = [styles.heading, styles[align], tone === "dark" && styles.dark, className].filter(Boolean).join(" ");
  return (
    <h2 id={id} className={cls}>
      {children}
    </h2>
  );
}

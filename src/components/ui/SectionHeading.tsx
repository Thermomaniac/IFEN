import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  children: ReactNode;
  id?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
  className?: string;
  /** h1 where the band header is the page title, e.g. the account screens. */
  as?: "h1" | "h2";
};

export function SectionHeading({ children, id, align = "center", tone = "light", className, as: Tag = "h2" }: Props) {
  const cls = [styles.heading, styles[align], tone === "dark" && styles.dark, className].filter(Boolean).join(" ");
  return (
    <Tag id={id} className={cls}>
      {children}
    </Tag>
  );
}

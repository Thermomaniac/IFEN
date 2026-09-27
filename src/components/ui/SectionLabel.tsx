import { SparkleIcon } from "@/components/icons";
import styles from "./SectionLabel.module.css";

/** Outlined pill with two sparkles, used above every section heading. */
export function SectionLabel({ children, tone = "light" }: { children: string; tone?: "light" | "warm" | "dark" | "plain" }) {
  return (
    <p className={`${styles.label} ${tone === "light" ? "" : styles[tone]}`}>
      <SparkleIcon className={styles.sparkle} />
      <span>{children}</span>
      <SparkleIcon className={styles.sparkle} />
    </p>
  );
}

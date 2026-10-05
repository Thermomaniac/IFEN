import { SparkleIcon } from "@/components/icons";
import styles from "./SectionLabel.module.css";

/** Outlined pill with two sparkles, used above every section heading. */
export function SectionLabel({
  children,
  tone = "light",
  size = "md",
}: {
  children: string;
  tone?: "light" | "warm" | "dark" | "plain";
  /** "sm" is the compact pill used on course pages (padding 8 / 16). */
  size?: "md" | "sm";
}) {
  const cls = [styles.label, tone !== "light" && styles[tone], size === "sm" && styles.sm].filter(Boolean).join(" ");
  return (
    <p className={cls}>
      <SparkleIcon className={styles.sparkle} />
      <span>{children}</span>
      <SparkleIcon className={styles.sparkle} />
    </p>
  );
}

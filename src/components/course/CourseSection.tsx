import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { SectionHead } from "@/data/coursePage";
import styles from "./CourseSection.module.css";

export type Tone = "mist" | "cream" | "white";

/**
 * The course page band: same inner width, padding and header as Program Details,
 * Mentors and Categories. Mist and white bands carry the hairlines; cream does not.
 */
export function CourseSection({
  id,
  tone,
  head,
  headExtra,
  children,
}: {
  /** Prefix for the section and heading ids. */
  id: string;
  tone: Tone;
  head: SectionHead;
  /** Anything that sits under the intro, e.g. a contact card. */
  headExtra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]}`} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <SectionHeader id={id} tone={tone} head={head}>
          {headExtra}
        </SectionHeader>
        {children}
      </div>
    </section>
  );
}

/** Label, heading and intro. Exported for split layouts that place it in a column. */
export function SectionHeader({
  id,
  tone,
  head,
  className,
  children,
}: {
  id: string;
  tone: Tone;
  head: SectionHead;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal as="header" className={[styles.header, className].filter(Boolean).join(" ")}>
      <RevealItem>
        <SectionLabel tone={tone === "mist" ? "light" : "warm"} size="sm">
          {head.label}
        </SectionLabel>
      </RevealItem>
      <RevealItem>
        <SectionHeading id={`${id}-title`} align="start">
          {head.heading}
        </SectionHeading>
      </RevealItem>
      {head.intro?.map((text) => (
        <RevealItem key={text} as="p" className={styles.intro}>
          {text}
        </RevealItem>
      ))}
      {children && <RevealItem>{children}</RevealItem>}
    </Reveal>
  );
}

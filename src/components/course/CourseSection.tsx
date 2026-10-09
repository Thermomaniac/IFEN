import type { ReactNode } from "react";
import { PinStage } from "@/components/motion/PinStage";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { PinnedSteps } from "@/components/motion/usePinnedSteps";
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
  pin,
  narrow,
  children,
}: {
  /** Prefix for the section and heading ids. */
  id: string;
  tone: Tone;
  head: SectionHead;
  /** Anything that sits under the intro, e.g. a contact card. */
  headExtra?: ReactNode;
  /** Pins the whole band (header and content) as one scroll-driven stage. */
  pin?: PinnedSteps<HTMLDivElement>;
  /** Caps the heading at 600px so it wraps as in the design. */
  narrow?: boolean;
  children: ReactNode;
}) {
  const inner = (
    <div ref={pin?.contentRef} className={styles.inner} data-pinned={pin?.pinned || undefined}>
      <SectionHeader id={id} tone={tone} head={head} className={narrow ? styles.narrow : undefined}>
        {headExtra}
      </SectionHeader>
      {children}
    </div>
  );
  return (
    <section id={id} className={`${styles.section} ${styles[tone]}`} aria-labelledby={`${id}-title`}>
      {pin ? <PinStage pin={pin}>{inner}</PinStage> : inner}
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

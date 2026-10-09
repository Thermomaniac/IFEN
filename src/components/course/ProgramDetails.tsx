import Image from "next/image";
import { CheckCircleIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { course } from "@/data/course";
import styles from "./ProgramDetails.module.css";

/** One outcome row: lime disc with a teal check, then the line of copy. */
export function Outcome({ children }: { children: string }) {
  return (
    <li className={styles.outcome}>
      <span className={styles.mark}>
        <CheckCircleIcon />
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Outcome rows in the white bordered list, for reuse across course sections. */
export function OutcomeList({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((text) => (
        <Outcome key={text}>{text}</Outcome>
      ))}
    </ul>
  );
}

export function ProgramDetails() {
  const { program } = course;
  return (
    <section className={styles.section} aria-labelledby="program-title">
      <div className={styles.inner}>
        <Reveal as="header" className={styles.label}>
          <RevealItem>
            <SectionLabel size="sm">{program.label}</SectionLabel>
          </RevealItem>
        </Reveal>

        <div className={styles.row}>
          <Reveal className={styles.copy}>
            <RevealItem>
              <SectionHeading id="program-title" align="start" className={styles.heading}>
                {program.heading}
              </SectionHeading>
            </RevealItem>
            <RevealItem as="ul" className={styles.list}>
              {program.outcomes.map((text) => (
                <Outcome key={text}>{text}</Outcome>
              ))}
            </RevealItem>
          </Reveal>

          <Reveal className={styles.media}>
            <RevealItem className={styles.frame}>
              <Image
                src={program.image.src}
                alt={program.image.alt}
                fill
                sizes="(min-width: 64rem) 526px, 100vw"
                className={styles.photo}
              />
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

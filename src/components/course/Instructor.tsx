import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { InstructorContent } from "@/data/coursePage";
import type { Tone } from "./CourseSection";
import sectionStyles from "./CourseSection.module.css";
import styles from "./Instructor.module.css";

/**
 * One lead instructor (Figma "Instructor Section"): a 600px square portrait beside the
 * label, name, role, bio and lime credential badges, centred against the photo. When the
 * section heading is already the name, it is not repeated.
 */
export function Instructor({ id, tone, content }: { id: string; tone: Tone; content: InstructorContent }) {
  return (
    <section id={id} className={`${sectionStyles.section} ${sectionStyles[tone]}`} aria-labelledby={`${id}-title`}>
      <div className={sectionStyles.inner}>
        <div className={styles.row}>
          <Reveal className={styles.media}>
            <RevealItem className={styles.frame}>
              <Image
                src={content.image}
                alt=""
                fill
                sizes="(min-width: 64rem) 600px, (min-width: 48rem) 50vw, 100vw"
                className={styles.photo}
              />
            </RevealItem>
          </Reveal>
          <Reveal className={styles.copy} delay={0.1}>
            <RevealItem>
              <SectionLabel tone={tone === "mist" ? "light" : "warm"} size="sm">
                {content.label}
              </SectionLabel>
            </RevealItem>
            <RevealItem className={styles.title}>
              <SectionHeading id={`${id}-title`} align="start" className={styles.heading}>
                {content.heading}
              </SectionHeading>
              {content.name !== content.heading && <h3 className={styles.name}>{content.name}</h3>}
              <p className={styles.role}>{content.role}</p>
            </RevealItem>
            <div className={styles.body}>
              <div className={styles.bio}>
                {content.paragraphs.map((text) => (
                  <RevealItem key={text} as="p" className={styles.text}>
                    {text}
                  </RevealItem>
                ))}
              </div>
              {content.credentials && (
                <RevealItem as="ul" className={styles.credentials}>
                  {content.credentials.map((c) => (
                    <li key={c} className={styles.credential}>
                      {c}
                    </li>
                  ))}
                </RevealItem>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { InstructorContent } from "@/data/coursePage";
import { SectionHeader, type Tone } from "./CourseSection";
import sectionStyles from "./CourseSection.module.css";
import styles from "./Instructor.module.css";

/**
 * One lead instructor: portrait beside the name, role, bio and credentials. When the
 * section heading is already the name, it is not repeated.
 */
export function Instructor({ id, tone, content }: { id: string; tone: Tone; content: InstructorContent }) {
  return (
    <section id={id} className={`${sectionStyles.section} ${sectionStyles[tone]}`} aria-labelledby={`${id}-title`}>
      <div className={sectionStyles.inner}>
        <SectionHeader id={id} tone={tone} head={content} />
        <div className={styles.row}>
          <Reveal className={styles.media}>
            <RevealItem className={styles.frame}>
              <Image src={content.image} alt="" fill sizes="(min-width: 48rem) 320px, 100vw" className={styles.photo} />
            </RevealItem>
          </Reveal>
          <Reveal className={styles.copy} delay={0.1}>
            {content.name !== content.heading && (
              <RevealItem as="h3" className={styles.name}>
                {content.name}
              </RevealItem>
            )}
            <RevealItem as="p" className={styles.role}>
              {content.role}
            </RevealItem>
            {content.paragraphs.map((text) => (
              <RevealItem key={text} as="p" className={styles.text}>
                {text}
              </RevealItem>
            ))}
            {content.credentials && (
              <RevealItem as="ul" className={styles.credentials}>
                {content.credentials.map((c) => (
                  <li key={c} className={styles.credential}>
                    {c}
                  </li>
                ))}
              </RevealItem>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

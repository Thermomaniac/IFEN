import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { CurriculumContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./Curriculum.module.css";

/**
 * Day-by-day programme, fully expanded so every topic is readable without
 * interaction: day and theme on the left, the topics in two columns on the right.
 */
export function Curriculum({ id, tone, content }: { id: string; tone: Tone; content: CurriculumContent }) {
  return (
    <CourseSection id={id} tone={tone} head={content}>
      <Reveal as="ol" className={styles.days} stagger={0.06}>
        {content.days.map((day) => (
          <RevealItem as="li" key={day.label} className={styles.day}>
            <div className={styles.meta}>
              <span className={styles.label}>{day.label}</span>
              <span className={styles.tag}>{day.tag}</span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.heading}>{day.heading}</h3>
              <ul className={styles.topics}>
                {day.topics.map((topic) => (
                  <li key={topic} className={styles.topic}>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </CourseSection>
  );
}

import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { ArticlesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./CourseArticles.module.css";
import { OutcomeList } from "./ProgramDetails";

/**
 * Text-led content blocks in white cards: a heading, then paragraphs, check rows,
 * chips or an address. Two or three columns depending on the count; a single
 * card puts its heading beside the copy on wide screens.
 */
export function CourseArticles({ id, tone, content }: { id: string; tone: Tone; content: ArticlesContent }) {
  const cols = content.items.length >= 3 && content.items.length % 2 === 1 ? 3 : Math.min(content.items.length, 2);
  return (
    <CourseSection id={id} tone={tone} head={content}>
      <Reveal className={`${styles.grid} ${styles[`cols${cols}`]}`} stagger={0.06}>
        {content.items.map((item, i) => (
          <RevealItem
            as="article"
            key={item.heading ?? i}
            className={`${styles.card} ${cols === 1 && item.heading ? styles.split : ""}`}
          >
            {item.heading && <h3 className={styles.heading}>{item.heading}</h3>}
            {item.paragraphs?.map((text) => (
              <p key={text} className={styles.text}>
                {text}
              </p>
            ))}
            {item.address && (
              <address className={styles.address}>
                <strong>{item.address.name}</strong>
                {item.address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            )}
            {item.list && <OutcomeList items={item.list} />}
            {item.tags && (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </CourseSection>
  );
}

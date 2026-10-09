import { ChevronDownIcon, MailIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { FaqContent } from "@/data/coursePage";
import { SectionHeader, type Tone } from "./CourseSection";
import sectionStyles from "./CourseSection.module.css";
import styles from "./Faq.module.css";

/**
 * Split FAQ: heading and a contact card on the left, native disclosure rows on the
 * right, so answers work without JavaScript and with find-in-page. As in Figma the
 * first answer starts open. The split lives on its own element so the band's column
 * layout can never override it, whatever order the stylesheets load in.
 */
export function Faq({ id, tone, content }: { id: string; tone: Tone; content: FaqContent }) {
  return (
    <section id={id} className={`${sectionStyles.section} ${sectionStyles[tone]}`} aria-labelledby={`${id}-title`}>
      <div className={sectionStyles.inner}>
        <div className={styles.split}>
          <div className={styles.side}>
            <SectionHeader id={id} tone={tone} head={content} />
            <Reveal>
              <RevealItem className={styles.help}>
                <p className={styles.helpHeading}>{content.help.heading}</p>
                <p className={styles.helpText}>{content.help.text}</p>
                <a href={`mailto:${content.help.email}`} className={styles.mail}>
                  <MailIcon width={16} height={16} aria-hidden="true" />
                  {content.help.email}
                </a>
              </RevealItem>
            </Reveal>
          </div>

          <Reveal className={styles.list} stagger={0.05}>
            {content.items.map((item, i) => (
              <RevealItem key={item.question} className={styles.item}>
                <details className={styles.details} open={i === 0}>
                  <summary className={styles.summary}>
                    <span>{item.question}</span>
                    <span className={styles.chevron} aria-hidden="true">
                      <ChevronDownIcon />
                    </span>
                  </summary>
                  <p className={styles.answer}>{item.answer}</p>
                </details>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

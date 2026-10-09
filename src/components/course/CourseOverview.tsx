import { MailIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { OverviewContent } from "@/data/coursePage";
import styles from "./CourseOverview.module.css";

/**
 * Opening section under the hero: what the course is, the two ways forward, and
 * a facts card with the next dates and a contact prompt.
 */
export function CourseOverview({ content }: { content: OverviewContent }) {
  const { aside } = content;
  return (
    <section id="overview" className={styles.section} aria-labelledby="overview-title">
      <div className={styles.inner}>
        <Reveal className={styles.copy}>
          <RevealItem>
            <SectionLabel size="sm">{content.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="overview-title" align="start" className={styles.heading}>
              {content.heading}
            </SectionHeading>
          </RevealItem>
          {content.paragraphs.map((text) => (
            <RevealItem key={text} as="p" className={styles.text}>
              {text}
            </RevealItem>
          ))}
          <RevealItem className={styles.actions}>
            {content.actions.map((action, i) => (
              <CtaButton key={action.href} href={action.href} variant={i === 0 ? "accent" : "ink"}>
                {action.label}
              </CtaButton>
            ))}
          </RevealItem>
        </Reveal>

        <Reveal className={styles.card} delay={0.1}>
          <RevealItem as="h3" className={styles.eyebrow}>
            {aside.heading}
          </RevealItem>
          <RevealItem>
            <dl className={styles.rows}>
              {aside.rows.map((row) => (
                <div key={row.label} className={styles.row}>
                  <dt className={styles.rowLabel}>{row.label}</dt>
                  <dd className={styles.rowValue}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </RevealItem>
          {aside.note && (
            <RevealItem className={styles.note}>
              <p className={styles.noteHeading}>{aside.note.heading}</p>
              <p className={styles.noteText}>{aside.note.text}</p>
              <a href={`mailto:${aside.note.email}`} className={styles.mail}>
                <MailIcon width={16} height={16} aria-hidden="true" />
                {aside.note.email}
              </a>
            </RevealItem>
          )}
        </Reveal>
      </div>
    </section>
  );
}

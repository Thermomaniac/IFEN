import type { ComponentType, SVGProps } from "react";
import {
  AccessIcon,
  BankIcon,
  CalendarDotsIcon,
  ClockIcon,
  EuroIcon,
  GlobeIcon,
  InfoCircleIcon,
  MailIcon,
  TargetIcon,
  UserIcon,
} from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { FactIcon, OverviewContent } from "@/data/coursePage";
import styles from "./CourseOverview.module.css";

const ICONS: Record<FactIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  format: InfoCircleIcon,
  duration: ClockIcon,
  access: AccessIcon,
  instructor: UserIcon,
  institution: BankIcon,
  online: TargetIcon,
  inPerson: UserIcon,
  time: ClockIcon,
  language: GlobeIcon,
  date: CalendarDotsIcon,
  fee: EuroIcon,
};

/**
 * Opening section under the hero (Figma "Program Details"): what the course is and the
 * ways forward on the left, a facts card on the right. Each fact is its own bordered row
 * with a lime icon; an optional contact prompt closes the card. `decor` adds the dotted
 * brain in the bottom-left corner.
 */
export function CourseOverview({ content, decor = false }: { content: OverviewContent; decor?: boolean }) {
  const { aside } = content;
  return (
    <section id="overview" className={styles.section} aria-labelledby="overview-title">
      {decor && <span className={styles.brain} aria-hidden="true" />}
      <div className={styles.inner}>
        <Reveal>
          <RevealItem>
            <SectionLabel size="sm">{content.label}</SectionLabel>
          </RevealItem>
        </Reveal>

        <div className={styles.split}>
          <Reveal className={styles.copy}>
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
                <Button key={action.href} href={action.href} variant={i === 0 ? "primary" : "secondary"}>
                  {action.label}
                </Button>
              ))}
            </RevealItem>
          </Reveal>

          <Reveal className={styles.card} delay={0.1}>
            <RevealItem as="h3" className={styles.eyebrow}>
              {aside.heading}
            </RevealItem>
            <RevealItem>
              <dl className={styles.rows}>
                {aside.rows.map((row) => {
                  const Icon = ICONS[row.icon];
                  return (
                    <div key={row.label} className={styles.row}>
                      <dt className={styles.rowLabel}>
                        <span className={styles.icon}>
                          <Icon width={20} height={20} />
                        </span>
                        {row.label}
                      </dt>
                      <dd className={styles.rowValue}>{row.value}</dd>
                    </div>
                  );
                })}
              </dl>
            </RevealItem>
            {aside.note && (
              <RevealItem className={styles.note}>
                <div className={styles.noteText}>
                  <p className={styles.noteHeading}>{aside.note.heading}</p>
                  <p>{aside.note.text}</p>
                </div>
                <a href={`mailto:${aside.note.email}`} className={styles.mail}>
                  <MailIcon width={16} height={16} />
                  {aside.note.email}
                </a>
              </RevealItem>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

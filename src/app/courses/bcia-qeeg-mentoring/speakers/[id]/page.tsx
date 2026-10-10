import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Outcome } from "@/components/course/ProgramDetails";
import { ArrowCornerBackIcon } from "@/components/icons";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { COURSE_PATH, course, getMentor } from "@/data/course";
import styles from "./page.module.css";

type Props = PageProps<"/courses/bcia-qeeg-mentoring/speakers/[id]">;

// Only the listed speakers exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return course.mentors.people.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mentor = getMentor((await params).id);
  if (!mentor) return {};
  return {
    title: `${mentor.name} | BCIA & QEEG-D Mentoring | IFEN`,
    description: `${mentor.name}, ${mentor.role}. ${mentor.bio[0]}`,
  };
}

/**
 * Speaker page, reached from the Speaker / Instructors carousel. Built from the
 * course page's own pieces: the cream band and photo treatment of the speaker
 * cards, the outcome list of Program Details and the shared CTA button.
 */
export default async function SpeakerPage({ params }: Props) {
  const mentor = getMentor((await params).id);
  if (!mentor) notFound();

  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <section className={styles.section} aria-labelledby="speaker-name">
          <div className={styles.inner}>
            <a href={`${COURSE_PATH}#speakers`} className={styles.back}>
              <ArrowCornerBackIcon />
              <span>All speakers</span>
            </a>

            <div className={styles.row}>
              <Reveal className={styles.media}>
                <RevealItem className={styles.frame}>
                  <Image
                    src={mentor.image}
                    alt={`Portrait of ${mentor.name}`}
                    fill
                    priority
                    sizes="(min-width: 64rem) 420px, 100vw"
                    className={styles.photo}
                  />
                </RevealItem>
              </Reveal>

              <Reveal className={styles.copy}>
                <RevealItem>
                  <SectionLabel tone="warm" size="sm">
                    {course.mentors.label}
                  </SectionLabel>
                </RevealItem>
                <RevealItem className={styles.titles}>
                  <h1 id="speaker-name" className={styles.name}>
                    {mentor.name}
                  </h1>
                  <p className={styles.role}>{mentor.role}</p>
                </RevealItem>
                <RevealItem className={styles.bio}>
                  {mentor.bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </RevealItem>
                <RevealItem>
                  <h2 className={styles.focusTitle}>In the Programme</h2>
                  <ul className={styles.list}>
                    {mentor.focus.map((f) => (
                      <Outcome key={f}>{f}</Outcome>
                    ))}
                  </ul>
                </RevealItem>
                <RevealItem>
                  <CtaButton href={course.cta.action.href} variant="ink">
                    {course.cta.action.label}
                  </CtaButton>
                </RevealItem>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <CtaFooter content={course.cta} />
    </>
  );
}

import Image from "next/image";
import { ArrowCornerIcon, CalendarCheckIcon, PinIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { training, type Course } from "@/data/site";
import styles from "./Training.module.css";

function CourseCard({ course }: { course: Course }) {
  return (
    <RevealItem as="li" className={styles.card}>
      <div className={styles.media}>
        <Image
          src={course.image.src}
          alt={course.image.alt}
          fill
          sizes="(min-width: 64rem) 324px, (min-width: 40rem) 45vw, 70vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.panel}>
        <h3 className={styles.title}>
          {/* Stretched link: the whole card is one tab stop. */}
          <a href={course.href} className={styles.link}>
            {course.title}
          </a>
        </h3>
        <ul className={styles.meta}>
          <li>
            <CalendarCheckIcon />
            <span className="sr-only">Duration: </span>
            {course.duration}
          </li>
          <li>
            <PinIcon />
            <span className="sr-only">Location: </span>
            {course.location}
          </li>
        </ul>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowCornerIcon />
        </span>
      </div>
    </RevealItem>
  );
}

export function Training() {
  return (
    <section id="training" className={styles.training} aria-labelledby="training-title">
      <span className={styles.brain} aria-hidden="true" />
      <Container className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel tone="warm">{training.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="training-title">{training.heading}</SectionHeading>
          </RevealItem>
        </Reveal>

        <div className={styles.lower}>
          <Reveal as="ul" className={styles.grid} stagger={0.1}>
            {training.courses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </Reveal>
          <Reveal>
            <RevealItem>
              <CtaButton href={training.cta.href}>{training.cta.label}</CtaButton>
            </RevealItem>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

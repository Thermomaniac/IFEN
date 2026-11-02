import Image from "next/image";
import { ArrowCornerIcon, ClockIcon, GlobeIcon, MonitorIcon, PinIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { training, type TrainingImage } from "@/data/site";
import { FORMAT_LABELS, LANGUAGE_LABELS, TYPE_LABELS, scheduleDates, type ScheduleItem } from "@/data/schedule";
import { berlinNow, dateParts, formatDay, upcomingDates, urgencyFor, type Urgency } from "@/lib/schedule";
import styles from "./Training.module.css";

type Dated = ScheduleItem & { start: string };

/** Each card takes its type's photo unless an earlier card already shows it. */
function pickImages(items: Dated[]): TrainingImage[] {
  const used = new Set<string>();
  return items.map((item) => {
    const own = training.images[item.type];
    const image = used.has(own.src) ? (training.imagePool.find((p) => !used.has(p.src)) ?? own) : own;
    used.add(image.src);
    return image;
  });
}

function DateCard({ item, image, urgency }: { item: Dated; image: TrainingImage; urgency: Urgency | null }) {
  const date = dateParts(item.start);
  const format = FORMAT_LABELS[item.format];
  return (
    <RevealItem as="li" className={styles.card}>
      <div className={styles.media}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 64rem) 306px, (min-width: 34rem) 45vw, 90vw" className={styles.photo} />
        {/* The full date is in the meta list below; the chip repeats it visually. */}
        <span className={styles.date} aria-hidden="true">
          <span className={styles.weekday}>{date.weekday}</span>
          <span className={styles.day}>{date.day}</span>
          <span className={styles.month}>{date.month}</span>
        </span>
        {urgency && <span className={styles.urgency}>{urgency}</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {TYPE_LABELS[item.type]}
          {item.isNew && <span className={styles.new}>New</span>}
        </p>
        <h3 className={styles.title}>
          {/* Stretched link: the whole card is one tab stop. */}
          <a href={item.href} className={styles.link}>
            {item.title}
          </a>
        </h3>
        <ul className={styles.meta}>
          <li>
            <ClockIcon aria-hidden="true" />
            <span>
              {formatDay(item.start)}, {date.time}
            </span>
          </li>
          <li>
            {item.format === "online" ? <MonitorIcon aria-hidden="true" /> : <PinIcon aria-hidden="true" />}
            <span>
              {item.location}
              {format !== item.location && <> · {format}</>}
            </span>
          </li>
          {item.language && (
            <li>
              <GlobeIcon aria-hidden="true" />
              <span>{LANGUAGE_LABELS[item.language]}</span>
            </li>
          )}
        </ul>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowCornerIcon />
        </span>
      </div>
    </RevealItem>
  );
}

export function Training() {
  // Read at render; the homepage revalidates hourly so the list and chips follow the calendar.
  const now = berlinNow();
  const dates = upcomingDates(scheduleDates, training.count, now);
  const images = pickImages(dates);

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
          {dates.length > 0 && (
            <Reveal as="ul" className={styles.grid} stagger={0.1}>
              {dates.map((item, i) => (
                <DateCard key={item.code} item={item} image={images[i]} urgency={urgencyFor(item, now)} />
              ))}
            </Reveal>
          )}
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

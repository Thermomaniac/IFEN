import Image from "next/image";
import { ArrowCornerIcon, ClockIcon, MonitorIcon, PinIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { training, type TrainingImage } from "@/data/site";
import { FORMAT_LABELS, LANGUAGE_LABELS, TYPE_LABELS, scheduleDates, type ScheduleItem } from "@/data/schedule";
import { berlinNow, chipFor, dateParts, formatDay, upcomingDates, type CardChip } from "@/lib/schedule";
import { ChipIcon } from "./ChipIcon";
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

/** Real chip, unless the preview-only demo forces one onto this position. */
function cardChip(item: Dated, index: number, now: string): CardChip | null {
  const demo = training.demoStates;
  if (demo?.endsToday === index) return { kind: "ends-today" };
  if (demo?.sale.index === index) return { kind: "sale", discount: demo.sale.discount };
  return chipFor(item, now);
}

function Chip({ chip }: { chip: CardChip }) {
  const label =
    chip.kind === "ends-today"
      ? training.chips.endsToday
      : chip.kind === "sale"
        ? `${chip.discount}${training.chips.sale}`
        : training.chips.new;
  return (
    <span className={styles.chip} data-kind={chip.kind}>
      <ChipIcon kind={chip.kind} />
      <span className={styles.chipLabel}>{label}</span>
    </span>
  );
}

function DateCard({ item, image, chip }: { item: Dated; image: TrainingImage; chip: CardChip | null }) {
  const date = dateParts(item.start);
  const format = FORMAT_LABELS[item.format];
  return (
    <RevealItem as="li" className={chip?.kind === "sale" ? `${styles.card} ${styles.sale}` : styles.card}>
      <div className={styles.media}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 64rem) 306px, (min-width: 34rem) 45vw, 90vw" className={styles.photo} />
        {chip && <Chip chip={chip} />}
        <span className={styles.arrow} aria-hidden="true">
          <ArrowCornerIcon />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.tags}>
          <span className={styles.type}>{TYPE_LABELS[item.type]}</span>
          {item.language && (
            // eslint-disable-next-line @next/next/no-img-element -- small flag SVG
            <img className={styles.flag} src={training.flags[item.language]} alt={LANGUAGE_LABELS[item.language]} width={32} height={24} />
          )}
        </div>
        <div className={styles.content}>
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
          </ul>
        </div>
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
                <DateCard key={item.code} item={item} image={images[i]} chip={cardChip(item, i, now)} />
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

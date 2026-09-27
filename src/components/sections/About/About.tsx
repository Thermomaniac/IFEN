import Image from "next/image";
import { TimerIcon, UsersIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about, type AboutStat } from "@/data/site";
import styles from "./About.module.css";

const icons = { users: UsersIcon, timer: TimerIcon };

function StatCard({ stat }: { stat: AboutStat }) {
  const Icon = icons[stat.icon];
  return (
    <RevealItem as="li" className={`${styles.card} ${styles[stat.tone]}`}>
      <span className={styles.brain} aria-hidden="true" />
      <span className={styles.iconTile}>
        <Icon />
      </span>
      <p className={styles.body}>
        <strong className={styles.value}>{stat.value}</strong>
        <span className={styles.text}>{stat.text}</span>
      </p>
    </RevealItem>
  );
}

export function About() {
  const [first, second] = about.stats;
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <Container className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel>{about.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="about-title">{about.heading}</SectionHeading>
          </RevealItem>
        </Reveal>

        <div className={styles.lower}>
          <Reveal as="ul" className={styles.cards} stagger={0.12}>
            <StatCard stat={first} />
            <RevealItem as="li" className={`${styles.card} ${styles.media}`}>
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(min-width: 64rem) 415px, (min-width: 40rem) 90vw, 100vw"
                quality={85}
                className={styles.photo}
              />
            </RevealItem>
            <StatCard stat={second} />
          </Reveal>

          <Reveal>
            <RevealItem>
              <CtaButton href={about.cta.href}>{about.cta.label}</CtaButton>
            </RevealItem>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

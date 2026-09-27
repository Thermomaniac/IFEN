import { ModuleBrainIcon, ModuleChipIcon, ModulePulseIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { certification } from "@/data/site";
import styles from "./Certification.module.css";

const icons = { brain: ModuleBrainIcon, pulse: ModulePulseIcon, chip: ModuleChipIcon };

// Connector paths from Paper, in a 670×286 box: module 1 and module 3 curve in to the
// centre, module 2 drops straight down. All three run top to bottom, towards module 4.
const connectorPaths = [
  "M0 0C0 0 53.948 144.993 147.467 189.442C201.761 215.248 281.256 179.223 317.903 219.237C336.287 239.309 333.898 286 333.898 286",
  "M670 0C670 0 615.931 144.993 522.202 189.442C467.785 215.248 384.468 179.578 347.739 219.591C329.313 239.664 334.748 286 334.748 286",
  "M335 0V286",
];

function Line({ d }: { d: string }) {
  return (
    <>
      <path d={d} className={styles.track} vectorEffect="non-scaling-stroke" />
      <path d={d} className={styles.dash} pathLength={100} vectorEffect="non-scaling-stroke" />
    </>
  );
}

function Connector() {
  return (
    <div className={styles.connector} aria-hidden="true">
      <svg className={styles.paths} viewBox="0 0 670 286" preserveAspectRatio="none" fill="none">
        <defs>
          {/* Static state from Paper, shown when motion is reduced. */}
          <linearGradient id="cert-path-still" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="286">
            <stop offset="0.44" stopColor="#ffc18c" />
            <stop offset="0.47" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        {connectorPaths.map((d) => (
          <Line key={d} d={d} />
        ))}
      </svg>
      {/* Small screens stack the modules, so only a straight stem leads into module 4. */}
      <svg className={styles.stem} viewBox="0 0 2 96" preserveAspectRatio="none" fill="none">
        <Line d="M1 0V96" />
      </svg>
    </div>
  );
}

export function Certification() {
  const { modules, final } = certification;
  return (
    <section id="certification" className={styles.certification} aria-labelledby="certification-title">
      <span className={styles.brain} aria-hidden="true" />
      <Container className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel>{certification.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="certification-title" className={styles.heading}>
              {certification.heading}
            </SectionHeading>
          </RevealItem>
        </Reveal>

        <div className={styles.path}>
          <Reveal as="ol" className={styles.modules} stagger={0.12}>
            {modules.map((m, i) => {
              const Icon = icons[m.icon];
              return (
                <RevealItem as="li" key={m.title} className={styles.module}>
                  <span className={styles.circle}>
                    <Icon className={styles.icon} />
                  </span>
                  <span className={styles.caption}>
                    <span className={styles.number}>Module - {i + 1}</span>
                    <h3 className={styles.title}>{m.title}</h3>
                  </span>
                </RevealItem>
              );
            })}
          </Reveal>

          <Connector />

          <Reveal className={styles.final} stagger={0.1}>
            <RevealItem className={styles.finalText}>
              <span className={styles.caption}>
                <span className={styles.number}>Module - {modules.length + 1}</span>
                <h3 className={`${styles.title} ${styles.titleStrong}`}>{final.title}</h3>
              </span>
              <p className={styles.body}>{final.text}</p>
            </RevealItem>
            <RevealItem>
              <CtaButton href={certification.cta.href}>{certification.cta.label}</CtaButton>
            </RevealItem>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

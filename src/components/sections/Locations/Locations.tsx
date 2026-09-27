"use client";

import { useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { MapPinFillIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DOT_RADIUS, MAP_HEIGHT, MAP_WIDTH, germanyDots } from "@/data/germanyDots";
import { locations } from "@/data/site";
import styles from "./Locations.module.css";

const ROW_PITCH = 33.3; // vertical dot spacing in the Paper map

/**
 * Dot map of Germany with one pin per training city. The dots fill in top to
 * bottom once the map scrolls into view, then each city dot lands and its card
 * drops in. Every card sits on its own dot, so the map scales as one unit.
 */
export function Locations() {
  const map = useRef<HTMLDivElement>(null);
  const inView = useInView(map, { once: true, amount: 0.3 });

  return (
    <section id="locations" className={styles.locations} aria-labelledby="locations-title">
      <Container className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel>{locations.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="locations-title">
              {locations.headingLines.map((line, i) => (
                <span key={line} className={styles.line}>
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </SectionHeading>
          </RevealItem>
        </Reveal>

        <div ref={map} className={styles.map} data-inview={inView}>
          <svg className={styles.dots} viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true" focusable="false">
            {germanyDots.map(([cx, cy]) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={DOT_RADIUS}
                style={{ "--row": Math.round((cy - DOT_RADIUS) / ROW_PITCH) } as CSSProperties}
              />
            ))}
          </svg>

          <ul className={styles.pins} aria-label="Training cities">
            {locations.cities.map((city, i) => {
              const [x, y] = germanyDots[city.dot];
              const pos = {
                "--x": `${(x / MAP_WIDTH) * 100}%`,
                "--y": `${(y / MAP_HEIGHT) * 100}%`,
                "--i": i,
              } as CSSProperties;
              return (
                <li key={city.name} className={styles.pin} style={pos}>
                  <span className={styles.cityDot} aria-hidden="true" />
                  <span className={styles.card}>
                    <MapPinFillIcon className={styles.cardIcon} />
                    {city.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal>
          <RevealItem>
            <CtaButton href={locations.cta.href}>{locations.cta.label}</CtaButton>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}

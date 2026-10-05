"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
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
const TILE = 25; // Paper tile size; rounded squares on the dot centres

// Map stage: the 532×657 map plus the stamp slots around it, centred on the map.
const STAGE_W = 796;
const STAGE_H = 694.5;
const MAP_X = 132;
const MAP_Y = 20;

/**
 * Tile map of Germany with one pin per training city. The tiles fill in top to
 * bottom once the map scrolls into view, then each city pin lands and its photo
 * stamp drops in. Stamps sit in Paper's slots around the map and the whole stage
 * scales as one unit; on phones they move into a grid under the map.
 */
export function Locations() {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, amount: 0.3 });

  const stageVars = {
    "--map-x": `${(MAP_X / STAGE_W) * 100}%`,
    "--map-y": `${(MAP_Y / STAGE_H) * 100}%`,
    "--map-w": `${(MAP_WIDTH / STAGE_W) * 100}%`,
    "--stage-ratio": `${STAGE_W} / ${STAGE_H}`,
  } as CSSProperties;

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

        <div ref={stage} className={styles.stage} style={stageVars} data-inview={inView}>
          <div className={styles.map}>
            <svg className={styles.dots} viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true" focusable="false">
              {germanyDots.map(([cx, cy]) => (
                <rect
                  key={`${cx}-${cy}`}
                  x={cx - TILE / 2}
                  y={cy - TILE / 2}
                  width={TILE}
                  height={TILE}
                  rx={2}
                  style={{ "--row": Math.round((cy - DOT_RADIUS) / ROW_PITCH) } as CSSProperties}
                />
              ))}
            </svg>

            {locations.cities.map((city, i) => {
              const [x, y] = germanyDots[city.dot];
              const pos = {
                "--x": `${(x / MAP_WIDTH) * 100}%`,
                "--y": `${(y / MAP_HEIGHT) * 100}%`,
                "--i": i,
              } as CSSProperties;
              return <span key={city.name} className={styles.cityDot} style={pos} aria-hidden="true" />;
            })}
          </div>

          <ul className={styles.stamps} aria-label="Training cities">
            {locations.cities.map((city, i) => {
              const pos = {
                "--sx": `${(city.slot[0] / STAGE_W) * 100}%`,
                "--sy": `${(city.slot[1] / STAGE_H) * 100}%`,
                "--i": i,
              } as CSSProperties;
              return (
                <li key={city.name} className={styles.stamp} style={pos}>
                  <span className={styles.photo}>
                    {city.photo ? (
                      <Image src={city.photo} alt="" fill sizes="96px" className={styles.photoImage} />
                    ) : (
                      <MapPinFillIcon className={styles.photoPlaceholder} />
                    )}
                  </span>
                  {city.name}
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

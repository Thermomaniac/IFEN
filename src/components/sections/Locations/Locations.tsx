"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { ArrowCornerIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { DOT_RADIUS, MAP_HEIGHT, MAP_WIDTH, germanyDots } from "@/data/germanyDots";
import { locations } from "@/data/site";
import { useVersion } from "@/lib/version";
import styles from "./Locations.module.css";

const ROW_PITCH = 33.3; // vertical dot spacing in the Paper map
const TILE = 25; // Paper tile size; rounded squares on the dot centres

// Map stage: the 532×657 map plus the six stamp slots around it, centred on the map.
const STAGE_W = 877;
const STAGE_H = 694.5;
const MAP_X = 172.5;
const MAP_Y = 20;

/**
 * Our Locations, in the two versions the client compares behind the floating
 * switcher: Version 1 (default) is the Paper tile map, Version 2 the legacy
 * watercolour venue cards restyled as IFEN cards.
 */
export function Locations() {
  const section = useRef<HTMLElement>(null);
  const [version, setVersion] = useVersion("locations", "v1");

  return (
    <section ref={section} id="locations" className={styles.locations} aria-labelledby="locations-title" data-version={version}>
      <Container className={styles.inner}>
        {/* Keyed so a switch replays the reveal; a late-mounted intro would otherwise stay hidden. */}
        <Reveal key={version} as="header" className={styles.header}>
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
          {version === "v2" && (
            <RevealItem as="p" className={styles.intro}>
              {locations.legacy.intro}
            </RevealItem>
          )}
        </Reveal>

        {version === "v1" ? <TileMap /> : <VenueCards />}
      </Container>
      <VersionSwitcher label="Our Locations version" value={version} onChange={setVersion} target={section} />
    </section>
  );
}

/**
 * Version 1: tile map of Germany with Paper's training pins. The tiles fill in
 * top to bottom once the map scrolls into view, then the pins land and the photo
 * stamps drop in. Stamps sit in Paper's slots around the map and the whole stage
 * scales as one unit; on phones they move into a grid under the map.
 */
function TileMap() {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, amount: 0.3 });

  const stageVars = {
    "--map-x": `${(MAP_X / STAGE_W) * 100}%`,
    "--map-y": `${(MAP_Y / STAGE_H) * 100}%`,
    "--map-w": `${(MAP_WIDTH / STAGE_W) * 100}%`,
    "--stage-ratio": `${STAGE_W} / ${STAGE_H}`,
  } as CSSProperties;

  return (
    <>
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

          {locations.pins.map(([x, y], i) => {
            const pos = {
              "--x": `${(x / MAP_WIDTH) * 100}%`,
              "--y": `${(y / MAP_HEIGHT) * 100}%`,
              "--i": i,
            } as CSSProperties;
            return <span key={`${x}-${y}`} className={styles.cityDot} style={pos} aria-hidden="true" />;
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
              <li key={city.photo} className={styles.stamp} style={pos}>
                <span className={styles.photo}>
                  <Image src={city.photo} alt="" fill sizes="96px" className={styles.photoImage} />
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
    </>
  );
}

/** Version 2: the legacy homepage's venue watercolours, one IFEN card per city, then the all-venues card. */
function VenueCards() {
  const { cities, cityLabel, all } = locations.legacy;
  return (
    <Reveal as="ul" className={styles.venues} stagger={0.06} amount="some">
      {cities.map((city) => (
        <RevealItem as="li" key={city.photo} className={styles.venue}>
          <span className={styles.venueMedia}>
            <Image src={city.photo} alt={city.alt} fill sizes="(min-width: 64rem) 306px, 45vw" className={styles.venuePhoto} />
          </span>
          <span className={styles.venueBody}>
            <span className={styles.venueLabel}>{cityLabel}</span>
            <span className={styles.venueName}>{city.name}</span>
          </span>
        </RevealItem>
      ))}
      <RevealItem as="li" className={`${styles.venue} ${styles.venueAll}`}>
        <span className={styles.venueMedia}>
          <Image src={all.photo} alt="" fill sizes="(min-width: 64rem) 306px, 45vw" className={styles.venuePhoto} />
          <span className={styles.venueArrow} aria-hidden="true">
            <ArrowCornerIcon />
          </span>
        </span>
        <span className={styles.venueBody}>
          <span className={styles.venueLabel}>{all.label}</span>
          {/* Stretched link: the whole card is one tab stop. */}
          <a href={locations.cta.href} className={styles.venueLink}>
            {all.title}
          </a>
        </span>
      </RevealItem>
    </Reveal>
  );
}

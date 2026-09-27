"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowCornerIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { useParallax } from "@/components/motion/useParallax";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { partners } from "@/data/site";
import styles from "./Partners.module.css";

/**
 * Intro column beside a grid of partner cards. Each card is one link; hover
 * lifts the arrow tab in from below (Paper shows it on the first card only,
 * which reads as the hover state).
 */
export function Partners() {
  const section = useRef<HTMLElement>(null);
  const netY = useParallax(section, 60);

  return (
    <section ref={section} id="partners" className={styles.partners} aria-labelledby="partners-title">
      <motion.span className={`${styles.network} ${styles.networkTop}`} style={{ y: netY }} aria-hidden="true" />
      <motion.span className={`${styles.network} ${styles.networkBottom}`} style={{ y: netY }} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal as="header" className={styles.intro}>
          <RevealItem>
            <SectionLabel tone="warm">{partners.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="partners-title" align="start">
              {partners.headingLines.map((line, i) => (
                <span key={line} className={styles.line}>
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </SectionHeading>
          </RevealItem>
          <RevealItem as="p" className={styles.text}>
            {partners.intro}
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className={styles.grid} stagger={0.06}>
          {partners.items.map((p) => (
            <RevealItem as="li" key={p.name} className={styles.item}>
              <a href={p.href} className={styles.card}>
                <span className={styles.logo}>
                  <Image src={p.logo} alt="" fill sizes="92px" className={styles.logoImage} />
                </span>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowCornerIcon />
                </span>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

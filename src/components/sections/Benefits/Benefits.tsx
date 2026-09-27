"use client";

import { motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { CirclePlusIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { useParallax } from "@/components/motion/useParallax";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { benefits } from "@/data/site";
import { BenefitsArrow } from "./BenefitsArrow";
import styles from "./Benefits.module.css";

/**
 * Discount benefits: single-open accordion beside the arrow card from Paper.
 * Clicking the open row closes it. Rows animate height via grid-template-rows,
 * so text is never measured in JS.
 */
export function Benefits() {
  const [open, setOpen] = useState<string | null>(benefits.items[0].id);
  const baseId = useId();
  const card = useRef<HTMLDivElement>(null);
  const brainY = useParallax(card, 60);

  return (
    <section id="benefits" className={styles.benefits} aria-labelledby="benefits-title">
      <Container className={styles.inner}>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel tone="warm">{benefits.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="benefits-title" className={styles.heading}>
              {benefits.heading}
            </SectionHeading>
          </RevealItem>
        </Reveal>

        <div className={styles.body}>
          <Reveal as="ul" className={styles.list}>
            {benefits.items.map((item) => {
              const isOpen = open === item.id;
              const btnId = `${baseId}-${item.id}-btn`;
              const panelId = `${baseId}-${item.id}-panel`;
              return (
                <RevealItem as="li" key={item.id} className={styles.item}>
                  <div className={styles.row} data-open={isOpen}>
                    <h3 className={styles.title}>
                      <button
                        id={btnId}
                        type="button"
                        className={styles.trigger}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                      >
                        <CirclePlusIcon className={styles.icon} />
                        {item.title}
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={styles.panel}
                      inert={!isOpen}
                    >
                      <div className={styles.panelInner}>
                        <p className={styles.text}>{item.text}</p>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </Reveal>

          <Reveal className={styles.cardWrap}>
            <RevealItem className={styles.card}>
              <div ref={card} className={styles.cardInner}>
                <motion.span className={`${styles.brain} ${styles.brainTop}`} style={{ y: brainY }} aria-hidden="true" />
                <motion.span className={`${styles.brain} ${styles.brainBottom}`} style={{ y: brainY }} aria-hidden="true" />
                <BenefitsArrow className={styles.arrow} />
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

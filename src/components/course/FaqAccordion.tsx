"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { FaqContent } from "@/data/coursePage";
import styles from "./Faq.module.css";

/**
 * The homepage Benefits accordion applied to the FAQ: one row open at a time, the first
 * open on load, and clicking the open row closes it. Panels grow through grid rows, so
 * nothing is measured in JS.
 *
 * A hidden twin of the list shares the same grid cell: every question as a closed row
 * plus the answers stacked in one cell, so it is always as tall as the longest open
 * state. The list sits inside that space and the band never changes height.
 */
export function FaqAccordion({ items }: { items: FaqContent["items"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={styles.stack}>
      <Reveal className={styles.list} stagger={0.05}>
        {items.map((item, i) => {
          const isOpen = open === i;
          const btnId = `${baseId}-${i}-btn`;
          const panelId = `${baseId}-${i}-panel`;
          return (
            <RevealItem key={item.question} className={styles.item}>
              <div className={styles.row} data-open={isOpen}>
                <h3 className={styles.question}>
                  <button
                    id={btnId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.question}</span>
                    <Chevron />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel} inert={!isOpen}>
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </Reveal>

      <div className={`${styles.list} ${styles.ghost}`} aria-hidden="true">
        {items.map((item) => (
          <div key={item.question} className={styles.item}>
            <div className={styles.trigger}>
              <span>{item.question}</span>
              <Chevron />
            </div>
          </div>
        ))}
        <div className={styles.ghostAnswers}>
          {items.map((item) => (
            <p key={item.question} className={styles.answer}>
              {item.answer}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <span className={styles.chevron} aria-hidden="true">
      <ChevronDownIcon />
    </span>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { revealItem } from "@/components/motion/Reveal";
import { hero } from "@/data/site";
import styles from "./Hero.module.css";

const REEL_H = 724; // Paper reel height the tile heights are measured against
const LOOP_SECONDS = 40;

type Tile = (typeof hero.reel)[number][number];

function ReelColumn({ tiles, direction, still }: { tiles: readonly Tile[]; direction: "up" | "down"; still: boolean }) {
  // The track holds the set twice; sliding it by exactly one set (-50%) loops without a seam.
  const y = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];
  const set = (copy: number) => (
    <div className={styles.set} aria-hidden={copy > 0 || undefined}>
      {tiles.map((tile) => (
        <div
          key={tile.src}
          className={styles.tile}
          style={{ "--tile-h": tile.h / REEL_H } as CSSProperties}
        >
          <Image
            src={tile.src}
            alt=""
            fill
            sizes="(min-width: 64rem) 21vw, 50vw"
            className={styles.tileImage}
            style={{ objectPosition: tile.position }}
            priority={copy === 0}
            loading={copy === 0 ? undefined : "eager"}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.column}>
      <motion.div
        className={styles.track}
        initial={{ y: y[0] }}
        animate={still ? { y: y[0] } : { y }}
        transition={still ? { duration: 0 } : { duration: LOOP_SECONDS, ease: "linear", repeat: Infinity }}
      >
        {set(0)}
        {set(1)}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <svg className={styles.strokes} viewBox="0 0 1440 919" preserveAspectRatio="xMinYMid slice" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="112">
          <g transform="translate(526 -29) rotate(12.76) translate(0 295.49) scale(1 -1)">
            <path d="M0 295.492C0 295.492 123.366 149.12 236.134 49.563C332.994-35.95 494.517-36.507 531.416 257.909L605.2 846.7" />
          </g>
          <path
            transform="translate(-92 645)"
            d="M0 162.265C0 162.265 103 0 201 0C317 0 329 174 368.053 331.48C381.587 386.057 407 479 407 479"
          />
          <g transform="translate(997 1150) rotate(180) translate(0 515.55) scale(1 -1)">
            <path d="M-567 556.9L0 121.912C0 121.912 189-23.454 362.938 3.283C524.497 28.116 609.594 147.116 707.167 332.21C742.035 398.353 782 515.546 782 515.546" />
          </g>
        </g>
      </svg>

      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
      >
        <motion.p className={styles.trust} variants={revealItem}>
          <span className={styles.avatars}>
            {hero.avatars.map((src) => (
              <Image key={src} src={src} alt="" width={28} height={28} className={styles.avatar} />
            ))}
          </span>
          {hero.trust}
        </motion.p>

        <motion.h1 id="hero-title" className={styles.title} variants={revealItem}>
          {hero.titleLines[0]} <br />
          <span className={styles.nowrap}>{hero.titleLines[1]}</span>
        </motion.h1>

        <motion.p className={styles.subline} variants={revealItem}>
          {hero.subline}
        </motion.p>

        <motion.div variants={revealItem} className={styles.ctaRow}>
          <CtaButton href={hero.cta.href}>{hero.cta.label}</CtaButton>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.reel}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ReelColumn tiles={hero.reel[0]} direction="up" still={reduce} />
        <ReelColumn tiles={hero.reel[1]} direction="down" still={reduce} />
      </motion.div>
    </section>
  );
}

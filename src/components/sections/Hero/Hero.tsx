"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { CtaButton } from "@/components/ui/CtaButton";
import { revealItem } from "@/components/motion/Reveal";
import { hero } from "@/data/site";
import styles from "./Hero.module.css";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  // Background drifts slower than the page: 0 at the top, +18% of its height as the hero leaves.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);

  // Autoplay only when motion is welcome. Reduced motion keeps the poster frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    video.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [reduce]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().then(() => setPlaying(true));
    else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="hero-title">
      <motion.div className={styles.media} style={{ y }} aria-hidden>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.video.poster}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={hero.video.webm} type="video/webm" />
          <source src={hero.video.mp4} type="video/mp4" />
        </video>
      </motion.div>
      <div className={styles.overlay} aria-hidden />

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

      <button type="button" className={styles.toggle} onClick={toggle} aria-pressed={!playing}>
        {playing ? <PauseIcon /> : <PlayIcon />}
        <span className="sr-only">{playing ? "Pause background video" : "Play background video"}</span>
      </button>
    </section>
  );
}

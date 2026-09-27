"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { CloseIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { useParallax } from "@/components/motion/useParallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { presentation } from "@/data/site";
import styles from "./Video.module.css";

/**
 * Full-bleed presentation teaser. The play button opens a native <dialog>
 * (focus trap, Esc to close, focus returns to the button). The film only
 * downloads once the dialog opens.
 */
export function Video() {
  const section = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const bgY = useParallax(section, 40);

  const open = () => {
    dialog.current?.showModal();
    void player.current?.play().catch(() => {});
  };

  const close = () => dialog.current?.close();

  return (
    <section ref={section} id="video" className={styles.video} aria-labelledby="video-title">
      <motion.div className={styles.bg} style={{ y: bgY }} aria-hidden="true">
        <Image src={presentation.poster} alt="" fill sizes="100vw" className={styles.bgImage} />
      </motion.div>
      <span className={styles.scrim} aria-hidden="true" />

      <Reveal className={styles.playCell}>
        <RevealItem>
          <button type="button" className={styles.play} onClick={open} aria-haspopup="dialog">
            <span className="sr-only">Play video: {presentation.headingLines.join(" ")}</span>
            <svg className={styles.playGlyph} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <path d="M32 16 0 32V0l32 16Z" fill="currentColor" />
            </svg>
          </button>
        </RevealItem>
      </Reveal>

      <Reveal as="header" className={styles.info}>
        <RevealItem>
          <SectionLabel tone="plain">{presentation.label}</SectionLabel>
        </RevealItem>
        <RevealItem>
          <SectionHeading id="video-title" tone="dark" className={styles.heading}>
            {presentation.headingLines.map((line, i) => (
              <span key={line} className={styles.line}>
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </SectionHeading>
        </RevealItem>
      </Reveal>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={presentation.video.title}
        onClose={() => player.current?.pause()}
        // A click on the backdrop lands on the <dialog> itself, not its content.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className={styles.frame}>
          <video
            ref={player}
            className={styles.player}
            src={presentation.video.src}
            lang={presentation.video.lang}
            controls
            playsInline
            preload="none"
          />
          <button type="button" className={styles.close} onClick={close}>
            <span className="sr-only">Close video</span>
            <CloseIcon />
          </button>
        </div>
      </dialog>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { useParallax } from "@/components/motion/useParallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { presentation } from "@/data/site";
import styles from "./Video.module.css";

type PlayerState = "idle" | "loading" | "playing" | "error";

/** How long to wait for the first frame before offering a retry instead of a spinner. */
const LOAD_TIMEOUT = 15000;

/**
 * Full-bleed presentation teaser. The play button opens a native <dialog>
 * (focus trap, Esc to close, focus returns to the button). The film only
 * downloads once the dialog opens. While it buffers the poster stays up with
 * a spinner; a network or decode failure, or no first frame within 15s,
 * swaps the spinner for a message with Retry.
 */
export function Video() {
  const section = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const bgY = useParallax(section, 40);
  const [state, setState] = useState<PlayerState>("idle");

  const start = () => {
    const video = player.current;
    if (!video) return;
    setState("loading");
    // Autoplay can still be refused (e.g. data saver); the native controls stay usable then.
    video.play().catch((err: unknown) => {
      if (err instanceof DOMException && err.name === "NotAllowedError") setState("idle");
    });
  };

  const open = () => {
    dialog.current?.showModal();
    start();
  };

  const retry = () => {
    player.current?.load();
    start();
  };

  const close = () => dialog.current?.close();

  useEffect(() => {
    if (state !== "loading") return;
    const timer = window.setTimeout(() => setState("error"), LOAD_TIMEOUT);
    return () => window.clearTimeout(timer);
  }, [state]);

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
        onClose={() => {
          player.current?.pause();
          setState("idle");
        }}
        // A click on the backdrop lands on the <dialog> itself, not its content.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className={styles.frame} data-state={state}>
          <video
            ref={player}
            className={styles.player}
            src={presentation.video.src}
            poster={presentation.poster}
            lang={presentation.video.lang}
            controls
            playsInline
            preload="none"
            onPlaying={() => setState("playing")}
            onWaiting={() => setState((s) => (s === "playing" ? "loading" : s))}
            onError={() => setState("error")}
          />
          {state === "loading" && <span className={styles.spinner} role="status" aria-label="Loading video" />}
          {state === "error" && (
            <div className={styles.failed} role="alert">
              <p>The video could not be loaded. Check your connection and try again.</p>
              <button type="button" className={styles.retry} onClick={retry}>
                Retry
              </button>
            </div>
          )}
          <button type="button" className={styles.close} onClick={close}>
            <span className="sr-only">Close video</span>
            <CloseIcon />
          </button>
        </div>
      </dialog>
    </section>
  );
}

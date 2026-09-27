"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials, type Testimonial } from "@/data/site";
import styles from "./Testimonials.module.css";

/** Paper's first card in each row: Paul Turner, Michael Smith, Mia Kwan. */
const ROW_STARTS = [0, 4, 8];

/** Time constant for easing the marquee to a stop and back, in ms. */
const RAMP_MS = 160;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

function Card({ item }: { item: Testimonial }) {
  return (
    <figure className={styles.card}>
      <figcaption className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">
          {initials(item.name)}
        </span>
        <span className={styles.who}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.role}>{item.role}</span>
        </span>
      </figcaption>
      <blockquote className={styles.quote}>
        <p>“{item.quote}”</p>
      </blockquote>
    </figure>
  );
}

/**
 * Three rows of quote cards drifting left together. Each row is the
 * full list rotated, so together they show every quote at 1440 even when
 * still. Screen readers get the list once (row 1, first copy); the rest is
 * visual repetition. With a mouse, the rows ease to a stop under the pointer
 * and a spotlight (one gradient overlay driven by two CSS variables) dims the
 * cards around it. The button pauses for good, and reduced motion turns the
 * rows into still, swipeable strips with no spotlight.
 */
export function Testimonials() {
  const marquee = useRef<HTMLDivElement>(null);
  const inView = useInView(marquee, { margin: "100px 0px" });
  const field = useRef<HTMLDivElement>(null);
  const ramp = useRef({ rate: 1, target: 1, frame: 0, last: 0 });
  const [paused, setPaused] = useState(false);
  const { items } = testimonials;

  useEffect(() => () => cancelAnimationFrame(ramp.current.frame), []);

  // Eases the three row animations' playback rate toward `target` instead of
  // flipping play state, so hover slows the wall down rather than freezing it.
  const rampTo = (target: number) => {
    const r = ramp.current;
    r.target = target;
    if (r.frame) return;
    r.last = performance.now();
    const tick = (now: number) => {
      const step = 1 - Math.exp(-(now - r.last) / RAMP_MS);
      r.last = now;
      r.rate += (r.target - r.rate) * step;
      if (Math.abs(r.target - r.rate) < 0.005) r.rate = r.target;
      field.current?.querySelectorAll("ul").forEach((track) => {
        for (const anim of track.getAnimations()) anim.playbackRate = r.rate;
      });
      r.frame = r.rate === r.target ? 0 : requestAnimationFrame(tick);
    };
    r.frame = requestAnimationFrame(tick);
  };

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") rampTo(0);
  };
  const onPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") rampTo(1);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - box.top}px`);
  };

  return (
    <section id="testimonials" className={styles.testimonials} aria-labelledby="testimonials-title">
      <Container>
        <Reveal as="header" className={styles.header}>
          <RevealItem>
            <SectionLabel>{testimonials.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="testimonials-title">
              {testimonials.headingLines.map((line, i) => (
                <span key={line} className={styles.line}>
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </SectionHeading>
          </RevealItem>
        </Reveal>
      </Container>

      <div
        ref={marquee}
        className={styles.marquee}
        data-running={inView && !paused}
        style={{ "--n": items.length } as CSSProperties}
      >
        <div
          ref={field}
          className={styles.field}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
        >
          <Reveal className={styles.rows} stagger={0.1}>
            {ROW_STARTS.map((start, row) => {
              const rotated = [...items.slice(start), ...items.slice(0, start)];
              return (
                <RevealItem key={start} className={styles.row}>
                  <ul
                    className={styles.track}
                    aria-label={row === 0 ? "Participant testimonials" : undefined}
                    aria-hidden={row > 0 || undefined}
                  >
                    {rotated.map((item) => (
                      <li key={item.name} className={styles.item}>
                        <Card item={item} />
                      </li>
                    ))}
                    {/* Second copy so the loop joins seamlessly. */}
                    {rotated.map((item) => (
                      <li
                        key={`${item.name}-copy`}
                        className={`${styles.item} ${styles.copy}`}
                        aria-hidden="true"
                      >
                        <Card item={item} />
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          <span className="sr-only">Pause testimonials</span>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
    </section>
  );
}

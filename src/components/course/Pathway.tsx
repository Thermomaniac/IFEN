"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { SparkleIcon } from "@/components/icons";
import { usePinnedSteps } from "@/components/motion/usePinnedSteps";
import type { PathwayContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./Pathway.module.css";

const GLIDE = [0.16, 1, 0.3, 1] as const;
/** Past this share of the last phase, the line has been complete long enough to show the note. */
const NOTE_AT = 0.2;
/** Stacked and unpinned, the note shows once the line's tip is this far past its end. */
const NOTE_PAST = 40;

type Geometry = {
  /** Fraction of the line that is dark once step i is complete: half way into the gap after it. */
  stops: number[];
  /** Fraction of the line where card i begins; the card lights up as the line reaches it. */
  starts: number[];
};

/**
 * Certification steps on a shared track. The band pins under the nav with every step
 * inactive and the line empty. Scrolling on draws the line, and each card lights up as
 * the line reaches it. Once all four are lit and the line is complete, the note rises
 * into place, then the band releases. Scrolling back reverses each stage. Where the band
 * does not fit the viewport it scrolls normally and the same sequence follows it. With
 * reduced motion everything is shown at once.
 */
export function Pathway({ id, tone, content }: { id: string; tone: Tone; content: PathwayContent }) {
  const count = content.steps.length;
  // One phase per step plus one for the note, so the band never releases before the note shows.
  const pin = usePinnedSteps(count + 1, { reserve: 80, media: "(min-width: 64rem)" });
  const trackRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const geo = useRef<Geometry>({ stops: [], starts: [] });
  const [lit, setLit] = useState(0);
  const [noteShown, setNoteShown] = useState(false);

  const target = useMotionValue(0);
  // A light spring smooths coarse wheel steps without lagging behind the scroll.
  const smooth = useSpring(target, { stiffness: 260, damping: 40, restDelta: 0.0005 });
  const fill = pin.reduce ? target : smooth;

  // A card lights up the moment the line reaches it.
  const light = (f: number) => setLit(geo.current.starts.filter((s) => f >= s).length);
  useMotionValueEvent(fill, "change", light);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;
    let across = true;
    let length = 0;

    // Phase i (0 → count) draws the line from the gap before step i to the gap after it.
    const toFill = (q: number) => {
      const { stops } = geo.current;
      if (q <= 0) return 0;
      if (q >= count) return 1;
      const i = Math.floor(q);
      const from = i === 0 ? 0 : stops[i - 1];
      return from + (stops[i] - from) * (q - i);
    };

    // Pinned, the band's phases drive the line; the note waits for the last phase. Unpinned,
    // the track's own place in the viewport drives it, so every card lights up on screen.
    const read = () => {
      frame = 0;
      if (!length) return;
      const vh = window.innerHeight;
      let q: number;
      if (pin.reduce) q = count + 1;
      else if (pin.pinned) q = pin.position.get();
      // Side by side: from the row's top at 90% of the viewport to 30%.
      else if (across) q = ((vh * 0.9 - track.getBoundingClientRect().top) / (vh * 0.6)) * (count + 1);
      else {
        // Stacked: the tip of the line sits at 60% of the viewport.
        const tip = vh * 0.6 - line.getBoundingClientRect().top;
        target.set(Math.min(1, Math.max(0, tip / length)));
        setNoteShown(tip >= length + NOTE_PAST);
        return;
      }
      target.set(toFill(q));
      setNoteShown(q >= count + NOTE_AT);
    };

    const measure = () => {
      const box = line.getBoundingClientRect();
      across = box.width >= box.height;
      length = across ? box.width : box.height;
      if (!length) return;
      const at = (px: number) => Math.min(1, Math.max(0, px / length));
      const cards = [...track.querySelectorAll<HTMLElement>("[data-card]")].map((c) => c.getBoundingClientRect());
      geo.current = {
        stops: cards.map((r, i) => {
          if (i === cards.length - 1) return 1;
          const next = cards[i + 1];
          return at(across ? (r.right + next.left) / 2 - box.left : (r.bottom + next.top) / 2 - box.top);
        }),
        starts: cards.map((r) => at(across ? r.left - box.left : r.top - box.top)),
      };
      read();
      light(fill.get());
    };

    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    const stop = pin.position.on("change", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      stop();
      window.removeEventListener("scroll", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin.pinned, pin.reduce, pin.position, target, count]);

  const allLit = pin.reduce || lit === count;
  const showNote = pin.reduce || (allLit && noteShown);
  const rise = (on: boolean, delay = 0.12) => ({
    duration: pin.reduce ? 0 : 0.9,
    ease: GLIDE,
    delay: on && !pin.reduce ? delay : 0,
  });

  return (
    <CourseSection id={id} tone={tone} head={content} pin={pin}>
      <div className={styles.path}>
        <motion.ol ref={trackRef} className={styles.track} style={{ "--fill": fill } as unknown as CSSProperties}>
          <span ref={lineRef} className={styles.line} aria-hidden="true">
            <span className={styles.fill} />
          </span>
          {content.steps.map((s, i) => {
            const active = pin.reduce || i < lit;
            return (
              <li
                key={s.label}
                className={styles.step}
                data-active={active || undefined}
                aria-current={s.current ? "step" : undefined}
              >
                <motion.span
                  className={styles.badge}
                  initial={false}
                  animate={active ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
                  transition={rise(active)}
                >
                  {s.label}
                </motion.span>
                <div className={styles.card} data-card>
                  <span className={styles.number} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className={styles.text}>
                    <h3 className={styles.heading}>
                      {s.heading}
                      {s.current && <span className="sr-only"> (this course)</span>}
                    </h3>
                    {s.text && <p className={styles.detail}>{s.text}</p>}
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ol>
        {/* Always laid out, so revealing it never shifts the band. */}
        <motion.p
          className={styles.note}
          initial={false}
          animate={showNote ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
          transition={rise(showNote, 0.05)}
        >
          <SparkleIcon aria-hidden="true" className={styles.spark} />
          <span>{content.note}</span>
          <SparkleIcon aria-hidden="true" className={styles.spark} />
        </motion.p>
      </div>
    </CourseSection>
  );
}

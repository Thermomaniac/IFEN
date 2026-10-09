"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import type { RolesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./RoleMarquee.module.css";

/** Pixels per second. Slow enough to read every label as it passes. */
const SPEED = 28;
/** How long the loop waits after a swipe before it moves on again. */
const RESUME_MS = 1500;

/**
 * Profession photo cards on a slow, endless horizontal loop. The loop pauses while a
 * pointer is over it, a card has keyboard focus or a finger is swiping it, and while it
 * is off screen it does no work at all. Hover and focus spread lime across the card in a
 * ripple from the label; the label itself never moves or resizes. With reduced motion
 * the row is static, scrolls by hand and the lime simply fades in.
 */
export function RoleMarquee({ id, tone, content }: { id: string; tone: Tone; content: RolesContent }) {
  const reduce = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const offset = useRef(0);
  const span = useRef(0);
  const drag = useRef<{ id: number; x: number } | null>(null);
  const resumeTimer = useRef(0);
  const inView = useInView(viewportRef);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const running = !reduce && inView && !hovered && !focused && !swiping;

  function paint() {
    const track = trackRef.current;
    if (!track || !span.current) return;
    offset.current = ((offset.current % span.current) + span.current) % span.current;
    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  }

  // One set plus the gap after it, so the copy lands exactly where the first began.
  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (reduce || !track || !set) return;
    const ro = new ResizeObserver(() => {
      span.current = set.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
      paint();
    });
    ro.observe(set);
    return () => ro.disconnect();
  }, [reduce]);

  // The loop only exists while it is moving: no frames while paused or off screen.
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      offset.current += (SPEED * Math.min(now - last, 64)) / 1000;
      last = now;
      paint();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  // Touch: a horizontal swipe moves the row by hand; vertical page scrolling is untouched.
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === "mouse") return;
    drag.current = { id: e.pointerId, x: e.clientX };
    window.clearTimeout(resumeTimer.current);
    setSwiping(true);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    offset.current -= e.clientX - d.x;
    d.x = e.clientX;
    paint();
  }

  function onPointerEnd(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== e.pointerId) return;
    drag.current = null;
    resumeTimer.current = window.setTimeout(() => setSwiping(false), RESUME_MS);
  }

  // Keep a focused card fully visible: nudge the loop instead of scrolling the page.
  function bringIntoView(e: FocusEvent<HTMLLIElement>) {
    const viewport = viewportRef.current;
    if (reduce || !viewport) return;
    const card = e.currentTarget.getBoundingClientRect();
    const box = viewport.getBoundingClientRect();
    if (card.left < box.left) offset.current -= box.left - card.left + 16;
    else if (card.right > box.right) offset.current += card.right - box.right + 16;
    paint();
  }

  const renderCards = (copy: boolean) =>
    content.roles.map((role, i) => {
      const open = !copy && active === i;
      return (
        <li
          key={role.name}
          className={styles.card}
          tabIndex={copy ? undefined : 0}
          data-open={open || undefined}
          onPointerEnter={copy ? undefined : () => setActive(i)}
          onPointerLeave={copy ? undefined : () => setActive((a) => (a === i ? null : a))}
          onFocus={
            copy
              ? undefined
              : (e) => {
                  setActive(i);
                  bringIntoView(e);
                }
          }
          onBlur={copy ? undefined : () => setActive((a) => (a === i ? null : a))}
        >
          <Image src={role.image} alt="" fill sizes="(min-width: 48rem) 400px, 260px" className={styles.photo} />
          <span className={styles.scrim} aria-hidden="true" />
          <span className={styles.ripple} aria-hidden="true" />
          <span className={styles.slot}>
            <span className={styles.label}>{role.name}</span>
          </span>
        </li>
      );
    });

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        data-static={reduce || undefined}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        <div ref={trackRef} className={styles.track}>
          <ul ref={setRef} className={styles.set}>
            {renderCards(false)}
          </ul>
          {!reduce && (
            <ul className={styles.set} aria-hidden="true" inert>
              {renderCards(true)}
            </ul>
          )}
        </div>
      </div>
    </CourseSection>
  );
}

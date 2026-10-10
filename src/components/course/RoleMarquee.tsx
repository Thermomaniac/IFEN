"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type PanInfo,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import type { RolesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./RoleMarquee.module.css";

/** Pixels per second. Slow enough to read every label as it passes. */
const SPEED = 28;
/** How long the drift takes to come back up to speed, or to settle when it pauses. */
const EASE_S = 0.8;
/** Seconds for a released drag's velocity to fall to about a third. */
const GLIDE_S = 0.32;
/** Pixels per second; caps a hard fling so the row never races off. */
const MAX_FLING = 2400;
/** Past this many pixels a press counts as a drag, so it never also clicks. */
const DRAG_SLOP = 4;

/**
 * Profession photo cards on a slow, endless horizontal loop that starts flush with the
 * left edge of the band. The row is one unbounded position wrapped into a single set's
 * width, so it never runs out in either direction.
 *
 * Mouse, pen and touch can drag it: the row follows the pointer exactly and, on release
 * or cancel, carries on from where it was let go with the release velocity fading out
 * while the drift eases back up to speed underneath it, so there is no reset, jump or
 * pause. Hover and keyboard focus ease it to a stop; a press or drag does neither, so a
 * card focused by the press never holds the row. Off screen it does no work. With
 * reduced motion there is no drift and no drag; the row scrolls natively.
 */
export function RoleMarquee({ id, tone, content }: { id: string; tone: Tone; content: RolesContent }) {
  const reduce = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const inView = useInView(viewportRef);

  // Raw position, never wrapped, and the drift's current share of full speed (0 to 1).
  const pos = useMotionValue(0);
  const speed = useMotionValue(1);
  const span = useRef(0);
  const [copies, setCopies] = useState(2);
  // Wrapped into (-span, 0]: the first card is flush at 0 and the loop never runs dry.
  const x = useTransform(pos, (v) => {
    const p = span.current;
    return p ? -(((-v % p) + p) % p) : 0;
  });

  const glide = useRef<AnimationPlaybackControls | null>(null);
  const moved = useRef(0);
  // Release velocity still being carried, in pixels per second.
  const fling = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const drifting = !reduce && inView && !hovered && !focused && !dragging;

  // One set plus the gap after it is the loop's period. Enough copies follow it to fill
  // the widest band, plus one so the seam is never on screen.
  useEffect(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (reduce || !viewport || !set) return;
    const ro = new ResizeObserver(() => {
      const gap = parseFloat(getComputedStyle(set).columnGap) || 0;
      const period = set.offsetWidth + gap;
      span.current = period;
      setCopies(Math.max(2, Math.ceil(viewport.clientWidth / period) + 1));
    });
    ro.observe(set);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [reduce]);

  // Ease the drift in and out rather than snapping between moving and still.
  useEffect(() => {
    const controls = animate(speed, drifting ? 1 : 0, { duration: EASE_S, ease: "easeInOut" });
    return () => controls.stop();
  }, [drifting, speed]);

  // Drift and any carried fling add up, so a release blends into the drift without a seam.
  useAnimationFrame((_, delta) => {
    if (reduce || !inView || !span.current) return;
    const dt = Math.min(delta, 64) / 1000;
    let v = -SPEED * speed.get();
    if (fling.current) {
      v += fling.current;
      fling.current *= Math.exp(-dt / GLIDE_S);
      if (Math.abs(fling.current) < 1) fling.current = 0;
    }
    if (v) pos.set(pos.get() + v * dt);
  });

  useEffect(() => () => glide.current?.stop(), []);

  function onPanStart() {
    fling.current = 0;
    glide.current?.stop();
    speed.set(0);
    setDragging(true);
    setActive(null);
  }

  function onPan(_: unknown, info: PanInfo) {
    moved.current += Math.abs(info.delta.x);
    pos.set(pos.get() + info.delta.x);
  }

  // Pointer up, touch end and pointer cancel all end here. The row keeps going from where
  // it was let go: the release velocity fades out while the drift eases back in. A mouse
  // still over the row does not count as hovering until it leaves and comes back.
  function onPanEnd(_: unknown, info: PanInfo) {
    const v = Number.isFinite(info.velocity.x) ? info.velocity.x : 0;
    fling.current = Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
    setHovered(false);
    setDragging(false);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    moved.current = 0;
    // Catching the row mid-glide stops it where it is.
    if (e.button === 0) {
      fling.current = 0;
      glide.current?.stop();
    }
  }

  // A drag never doubles as a click on whatever it was released over.
  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    if (moved.current > DRAG_SLOP) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // Keep a keyboard-focused card fully visible by gliding the loop, never by scrolling the
  // page. A card focused by a press or tap is already under the pointer and stays put.
  function bringIntoView(e: FocusEvent<HTMLLIElement>) {
    const viewport = viewportRef.current;
    if (reduce || !viewport || !e.currentTarget.matches(":focus-visible")) return;
    const card = e.currentTarget.getBoundingClientRect();
    const box = viewport.getBoundingClientRect();
    const margin = e.currentTarget.offsetLeft === 0 ? 0 : 16;
    let shift = 0;
    if (card.left < box.left + margin) shift = box.left + margin - card.left;
    else if (card.right > box.right - 16) shift = box.right - 16 - card.right;
    speed.set(0);
    if (!shift) return;
    glide.current?.stop();
    glide.current = animate(pos, pos.get() + shift, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
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
          onPointerEnter={copy ? undefined : (e) => !dragging && e.pointerType === "mouse" && setActive(i)}
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
          <Image
            src={role.image}
            alt=""
            fill
            draggable={false}
            sizes="(min-width: 48rem) 400px, 260px"
            className={styles.photo}
          />
          <span className={styles.scrim} aria-hidden="true" />
          <span className={styles.ripple} aria-hidden="true" />
          <span className={styles.slot}>
            <span className={styles.label}>{role.name}</span>
          </span>
        </li>
      );
    });

  if (reduce) {
    return (
      <CourseSection id={id} tone={tone} head={content}>
        <div ref={viewportRef} className={styles.viewport} data-bleed="" data-static="">
          <ul ref={setRef} className={styles.set}>
            {renderCards(false)}
          </ul>
        </div>
      </CourseSection>
    );
  }

  return (
    <CourseSection id={id} tone={tone} head={content}>
      <motion.div
        ref={viewportRef}
        className={styles.viewport}
        data-bleed=""
        data-dragging={dragging || undefined}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        onPointerDown={onPointerDown}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
        onClickCapture={onClickCapture}
        // Only keyboard focus holds the row; the focus a press gives a card does not.
        onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        <motion.div className={styles.track} style={{ x }}>
          <ul ref={setRef} className={styles.set}>
            {renderCards(false)}
          </ul>
          {Array.from({ length: copies - 1 }, (_, k) => (
            <ul key={k} className={styles.set} aria-hidden="true" inert>
              {renderCards(true)}
            </ul>
          ))}
        </motion.div>
      </motion.div>
    </CourseSection>
  );
}

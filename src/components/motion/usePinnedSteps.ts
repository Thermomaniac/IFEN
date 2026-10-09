"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type PinnedSteps<T extends HTMLElement = HTMLElement> = {
  /** Tall wrapper the stage sticks inside; its extra height is the scroll budget. */
  trackRef: RefObject<HTMLDivElement | null>;
  /** The sticky, viewport-tall stage. */
  stageRef: RefObject<HTMLDivElement | null>;
  /** What has to fit on screen for the sequence to pin. */
  contentRef: RefObject<T | null>;
  pinned: boolean;
  count: number;
  /** 0 → count. Item i is active from i; its progress line fills from i to i + 1. */
  position: MotionValue<number>;
  /** Index of the latest active item. The first is active from the start. */
  step: number;
  reduce: boolean;
};

type Options<T extends HTMLElement> = {
  /** Media query that allows pinning, e.g. only where the row sits side by side. */
  media?: string;
  /** Height the stage adds around the content, e.g. its padding. */
  reserve?: number;
  /** Natural content height, for layouts whose content stretches to the stage. */
  measure?: (content: T) => number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function readNavHeight() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"));
  return Number.isFinite(v) ? v : 70;
}

/** The small viewport height: it ignores collapsing mobile browser chrome, so the fit never flips mid-scroll. */
function readSmallViewport() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;top:0;height:100svh;width:0;visibility:hidden;pointer-events:none";
  document.body.appendChild(probe);
  const h = probe.offsetHeight || window.innerHeight;
  probe.remove();
  return h;
}

function naturalHeight(el: HTMLElement) {
  const cs = getComputedStyle(el);
  return el.offsetHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
}

/**
 * A scroll-driven sequence of `count` items. Where the content fits the viewport the
 * stage pins under the nav and the items activate one by one as the page scrolls on;
 * once the last is complete the stage releases. Where it does not fit (small screens,
 * short windows) nothing pins and the same progress reads the section passing through
 * the viewport. With reduced motion every item is active and nothing moves.
 *
 * Progress only ever follows the native scroll position: no wheel capture, no timers,
 * keyboard and touch scrolling behave as usual, and scrolling back steps back.
 */
export function usePinnedSteps<T extends HTMLElement = HTMLDivElement>(
  count: number,
  { media = "(min-width: 48rem)", reserve = 0, measure }: Options<T> = {},
): PinnedSteps<T> {
  const reduce = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<T>(null);
  const position = useMotionValue(0);
  const [pinned, setPinned] = useState(false);
  const [step, setStep] = useState(0);
  const measureRef = useRef(measure);
  useEffect(() => {
    measureRef.current = measure;
  });

  // Pin only where the whole stage fits under the nav.
  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia(media);
    const content = contentRef.current;
    let svh = readSmallViewport();
    const check = () => {
      if (!content) return;
      const need = (measureRef.current ?? naturalHeight)(content) + reserve;
      setPinned(mq.matches && need <= svh - readNavHeight());
    };
    const onResize = () => {
      svh = readSmallViewport();
      check();
    };
    check();
    const ro = new ResizeObserver(check);
    if (content) ro.observe(content);
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", check);
    };
  }, [reduce, media, reserve]);

  // Map the scroll position to 0 → count. Work happens only on scroll, never per frame.
  useEffect(() => {
    if (reduce) {
      position.set(count);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      let p = 0;
      if (pinned) {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;
        const range = track.offsetHeight - stage.offsetHeight;
        const travelled = readNavHeight() - track.getBoundingClientRect().top;
        p = range > 0 ? travelled / range : 0;
      } else {
        const el = contentRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // From the content's top at 75% of the viewport to its bottom at 45%.
        p = (vh * 0.75 - r.top) / (vh * 0.3 + r.height);
      }
      const q = clamp01(p) * count;
      position.set(q);
      setStep(Math.min(count - 1, Math.floor(q)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduce, count, pinned, position]);

  // Reduced motion: nothing pins and every item is active.
  return {
    trackRef,
    stageRef,
    contentRef,
    pinned: pinned && !reduce,
    count,
    position,
    step: reduce ? count - 1 : step,
    reduce,
  };
}

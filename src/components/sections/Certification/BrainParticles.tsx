"use client";

import { useEffect, useRef } from "react";
import styles from "./Certification.module.css";

const VIEW_W = 800; // Paper "Brain 2" viewBox
const RADIUS = 110; // cursor reach, px
const PUSH = 34; // max displacement at the cursor, px
const SPRING = 0.07; // pull towards the target position
const DAMPING = 0.78; // close to critical: no visible overshoot
const FOLLOW = 0.18; // pointer smoothing per frame
const FADE = 0.08; // how fast the influence grows and fades
const REST = 0.02; // px: below this everything is considered settled
const COLOR = "#D1D5DC"; // Paper fill

/**
 * The dotted brain from Paper, drawn dot by dot on a canvas so the dots can react
 * to a fine pointer. Each dot springs towards its home in the brain; the cursor
 * moves that home outwards with a smooth falloff, so dots part around it and ease
 * back when it leaves. The loop sleeps once every dot is at rest. Until the canvas
 * has drawn (and for reduced motion or touch) the static SVG stays visible.
 */
export function BrainParticles() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const host = wrap?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !finePointer.matches) return;

    let cancelled = false;
    let hx = new Float32Array(0); // home, viewBox units
    let hy = new Float32Array(0);
    let r = new Float32Array(0);
    let x = new Float32Array(0); // current, px
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let count = 0;
    let scale = 1;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false, strength: 0 };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const rad = r[i] * scale;
        ctx.moveTo(x[i] + rad, y[i]);
        ctx.arc(x[i], y[i], rad, 0, Math.PI * 2);
      }
      ctx.fillStyle = COLOR;
      ctx.fill();
    };

    const step = () => {
      pointer.x += (pointer.tx - pointer.x) * FOLLOW;
      pointer.y += (pointer.ty - pointer.y) * FOLLOW;
      pointer.strength += ((pointer.inside ? 1 : 0) - pointer.strength) * FADE;
      if (pointer.strength < 0.001) pointer.strength = 0;

      const s = pointer.strength;
      let moving = s > 0;
      for (let i = 0; i < count; i++) {
        let tx = hx[i] * scale;
        let ty = hy[i] * scale;
        if (s > 0) {
          const dx = tx - pointer.x;
          const dy = ty - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            // Smoothstep falloff: strongest at the cursor, zero slope at the edge.
            const k = 1 - d / RADIUS;
            const push = PUSH * k * k * (3 - 2 * k) * s;
            const inv = d > 0.01 ? 1 / d : 0;
            tx += dx * inv * push;
            ty += dy * inv * push;
          }
        }
        vx[i] = (vx[i] + (tx - x[i]) * SPRING) * DAMPING;
        vy[i] = (vy[i] + (ty - y[i]) * SPRING) * DAMPING;
        x[i] += vx[i];
        y[i] += vy[i];
        if (!moving && (Math.abs(vx[i]) > REST || Math.abs(vy[i]) > REST || Math.abs(tx - x[i]) > REST || Math.abs(ty - y[i]) > REST)) {
          moving = true;
        }
      }
      if (!moving) {
        // Settled: land exactly on the brain so no sub-pixel drift is left behind.
        for (let i = 0; i < count; i++) {
          x[i] = hx[i] * scale;
          y[i] = hy[i] * scale;
          vx[i] = 0;
          vy[i] = 0;
        }
      }
      draw();
      return moving;
    };

    const loop = () => {
      if (step() && visible) {
        frame = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (running || !visible || !count) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      scale = width / VIEW_W;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = 0; i < count; i++) {
        x[i] = hx[i] * scale;
        y[i] = hy[i] * scale;
        vx[i] = 0;
        vy[i] = 0;
      }
      draw();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      // Only react near the brain, and enter without a jump from the last position.
      const near =
        pointer.tx > -RADIUS && pointer.tx < rect.width + RADIUS && pointer.ty > -RADIUS && pointer.ty < rect.height + RADIUS;
      if (near && pointer.strength === 0) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.inside = near;
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      wake();
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });

    // The dot data is only needed once the effect runs, so it stays out of the first bundle.
    import("./brainDots").then(({ BRAIN_DOTS }) => {
      if (cancelled) return;
      count = BRAIN_DOTS.length / 3;
      hx = new Float32Array(count);
      hy = new Float32Array(count);
      r = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        hx[i] = BRAIN_DOTS[i * 3] / 10;
        hy[i] = BRAIN_DOTS[i * 3 + 1] / 10;
        r[i] = BRAIN_DOTS[i * 3 + 2] / 10;
      }
      x = new Float32Array(count);
      y = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      resize();
      wrap.dataset.live = "";
      ro.observe(canvas);
      io.observe(wrap);
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      delete wrap.dataset.live;
    };
  }, []);

  return (
    <span ref={wrapRef} className={styles.brain} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.brainCanvas} />
    </span>
  );
}

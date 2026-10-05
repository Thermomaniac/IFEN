"use client";

import { useEffect, useRef } from "react";
import styles from "./Certification.module.css";

type Particle = {
  hx: number; // home position
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number; // alpha
  phase: number;
  speed: number;
};

const RADIUS = 150; // cursor repulsion reach, px
const PUSH = 0.9; // share of the way a dot inside the reach is moved to its edge
const SPRING = 0.045; // pull towards the target position
const DAMPING = 0.8;
const DRIFT = 6; // ambient wander around home, px
const INK = "11, 57, 65"; // --color-ink

/**
 * Ambient dot field behind the certification path. One rAF loop on a
 * DPR-aware canvas, 100–200 dots scaled to the section area. A fine pointer
 * pushes dots away within 150px and they ease back home. Touch devices get
 * no repulsion; reduced motion gets a single static frame. The canvas never
 * takes pointer events, so the pointer is read from the section.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = false;
    const pointer = { x: 0, y: 0, active: false };

    const seed = () => {
      const count = Math.round(Math.min(200, Math.max(100, (width * height) / 9000)));
      particles = Array.from({ length: count }, () => {
        const hx = Math.random() * width;
        const hy = Math.random() * height;
        return {
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          r: 0.8 + Math.random() * 1.6,
          a: 0.14 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.00015 + Math.random() * 0.0003,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${INK}, ${p.a})`;
        ctx.fill();
      }
    };

    const step = (t: number) => {
      const repel = pointer.active && finePointer.matches;
      for (const p of particles) {
        let tx = p.hx + Math.sin(t * p.speed + p.phase) * DRIFT;
        let ty = p.hy + Math.cos(t * p.speed * 0.8 + p.phase) * DRIFT;
        if (repel) {
          // Move the target out towards the edge of the reach; the spring makes it smooth.
          const dx = tx - pointer.x;
          const dy = ty - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            const out = d + (RADIUS - d) * PUSH;
            const ux = d > 0.01 ? dx / d : 1;
            const uy = d > 0.01 ? dy / d : 0;
            tx = pointer.x + ux * out;
            ty = pointer.y + uy * out;
          }
        }
        p.vx += (tx - p.x) * SPRING;
        p.vy += (ty - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
    };

    const loop = (t: number) => {
      step(t);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        draw();
        return;
      }
      if (visible) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    io.observe(host);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    reduced.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      reduced.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />;
}

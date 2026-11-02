"use client";

import { useEffect, useRef } from "react";
import type { CardChip } from "@/lib/schedule";
import styles from "./Training.module.css";

type Kind = CardChip["kind"];

/*
 * Phosphor duotone icons from the Figma chips, split into parts so each can move:
 * clock hands sweep, then the clock rings; the seal turns one lobe while the percent pops;
 * the flame flickers from its base. Paths are the Figma exports, regrouped.
 */
function Clock() {
  return (
    <g data-part="body">
      <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.2" />
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" />
      <path data-part="hour" d="M8 8h3.5" stroke="currentColor" strokeLinecap="round" />
      <path data-part="minute" d="M8 8V4.5" stroke="currentColor" strokeLinecap="round" />
    </g>
  );
}

function Seal() {
  return (
    <>
      <g data-part="seal">
        <path
          opacity="0.2"
          d="M14.5 8C14.5 8.78188 13.3863 9.37188 13.0825 10.1056C12.79 10.8131 13.1712 12.0212 12.5962 12.5962C12.0212 13.1712 10.8131 12.79 10.1056 13.0825C9.375 13.3863 8.78125 14.5 8 14.5C7.21875 14.5 6.625 13.3863 5.89437 13.0825C5.18687 12.79 3.97937 13.1712 3.40375 12.5962C2.82812 12.0212 3.21 10.8131 2.9175 10.1056C2.61375 9.375 1.5 8.78125 1.5 8C1.5 7.21875 2.61375 6.625 2.9175 5.89437C3.21 5.1875 2.82875 3.97875 3.40375 3.40375C3.97875 2.82875 5.1875 3.21 5.89437 2.9175C6.62812 2.61375 7.21875 1.5 8 1.5C8.78125 1.5 9.375 2.61375 10.1056 2.9175C10.8131 3.21 12.0206 2.82875 12.5962 3.40375C13.1719 3.97875 12.79 5.18687 13.0825 5.89437C13.3863 6.62812 14.5 7.21875 14.5 8Z"
          fill="currentColor"
        />
        <path
          d="M14.1163 6.42625C13.8806 6.18 13.6369 5.92625 13.545 5.70312C13.46 5.49875 13.455 5.16 13.45 4.83187C13.4406 4.22187 13.4306 3.53062 12.95 3.05C12.4694 2.56937 11.7781 2.55937 11.1681 2.55C10.84 2.545 10.5013 2.54 10.2969 2.455C10.0744 2.36312 9.82 2.11937 9.57375 1.88375C9.1425 1.46937 8.6525 1 8 1C7.3475 1 6.85812 1.46937 6.42625 1.88375C6.18 2.11937 5.92625 2.36312 5.70312 2.455C5.5 2.54 5.16 2.545 4.83187 2.55C4.22187 2.55937 3.53062 2.56937 3.05 3.05C2.56937 3.53062 2.5625 4.22187 2.55 4.83187C2.545 5.16 2.54 5.49875 2.455 5.70312C2.36312 5.92562 2.11937 6.18 1.88375 6.42625C1.46937 6.85812 1 7.3475 1 8C1 8.6525 1.46937 9.14187 1.88375 9.57375C2.11937 9.82 2.36312 10.0737 2.455 10.2969C2.54 10.5013 2.545 10.84 2.55 11.1681C2.55937 11.7781 2.56937 12.4694 3.05 12.95C3.53062 13.4306 4.22187 13.4406 4.83187 13.45C5.16 13.455 5.49875 13.46 5.70312 13.545C5.92562 13.6369 6.18 13.8806 6.42625 14.1163C6.8575 14.5306 7.3475 15 8 15C8.6525 15 9.14187 14.5306 9.57375 14.1163C9.82 13.8806 10.0737 13.6369 10.2969 13.545C10.5013 13.46 10.84 13.455 11.1681 13.45C11.7781 13.4406 12.4694 13.4306 12.95 12.95C13.4306 12.4694 13.4406 11.7781 13.45 11.1681C13.455 10.84 13.46 10.5013 13.545 10.2969C13.6369 10.0744 13.8806 9.82 14.1163 9.57375C14.5306 9.14187 15 8.6525 15 8C15 7.3475 14.5306 6.85812 14.1163 6.42625ZM13.3944 8.88188C13.095 9.19438 12.785 9.5175 12.6206 9.91438C12.4631 10.2956 12.4563 10.7312 12.45 11.1531C12.4437 11.5906 12.4369 12.0487 12.2425 12.2425C12.0481 12.4363 11.5931 12.4437 11.1531 12.45C10.7312 12.4563 10.2956 12.4631 9.91438 12.6206C9.5175 12.785 9.19438 13.095 8.88188 13.3944C8.56938 13.6937 8.25 14 8 14C7.75 14 7.42812 13.6925 7.11812 13.3944C6.80813 13.0962 6.4825 12.785 6.08563 12.6206C5.70438 12.4631 5.26875 12.4563 4.84688 12.45C4.40938 12.4437 3.95125 12.4369 3.7575 12.2425C3.56375 12.0481 3.55625 11.5931 3.55 11.1531C3.54375 10.7312 3.53688 10.2956 3.37937 9.91438C3.215 9.5175 2.905 9.19438 2.60562 8.88188C2.30625 8.56938 2 8.25 2 8C2 7.75 2.3075 7.42875 2.60562 7.11812C2.90375 6.8075 3.215 6.4825 3.37937 6.08563C3.53688 5.70438 3.54375 5.26875 3.55 4.84688C3.55625 4.40938 3.56312 3.95125 3.7575 3.7575C3.95187 3.56375 4.40688 3.55625 4.84688 3.55C5.26875 3.54375 5.70438 3.53688 6.08563 3.37937C6.4825 3.215 6.80562 2.905 7.11812 2.60562C7.43062 2.30625 7.75 2 8 2C8.25 2 8.57188 2.3075 8.88188 2.60562C9.19188 2.90375 9.5175 3.215 9.91438 3.37937C10.2956 3.53688 10.7312 3.54375 11.1531 3.55C11.5906 3.55625 12.0487 3.56312 12.2425 3.7575C12.4363 3.95187 12.4437 4.40688 12.45 4.84688C12.4563 5.26875 12.4631 5.70438 12.6206 6.08563C12.785 6.4825 13.095 6.80562 13.3944 7.11812C13.6937 7.43062 14 7.75 14 8C14 8.25 13.6925 8.57125 13.3944 8.88188Z"
          fill="currentColor"
        />
      </g>
      <path
        data-part="percent"
        d="M7.5 6C7.5 5.70333 7.41203 5.41332 7.2472 5.16664C7.08238 4.91997 6.84811 4.72771 6.57403 4.61418C6.29994 4.50065 5.99834 4.47094 5.70736 4.52882C5.41639 4.5867 5.14912 4.72956 4.93934 4.93934C4.72956 5.14912 4.5867 5.41639 4.52882 5.70736C4.47094 5.99834 4.50065 6.29994 4.61418 6.57403C4.72771 6.84811 4.91997 7.08238 5.16664 7.2472C5.41332 7.41203 5.70333 7.5 6 7.5C6.39782 7.5 6.77936 7.34196 7.06066 7.06066C7.34196 6.77936 7.5 6.39782 7.5 6ZM5.5 6C5.5 5.90111 5.52932 5.80444 5.58427 5.72221C5.63921 5.63999 5.7173 5.5759 5.80866 5.53806C5.90002 5.50022 6.00055 5.49031 6.09755 5.50961C6.19454 5.5289 6.28363 5.57652 6.35355 5.64645C6.42348 5.71637 6.4711 5.80546 6.49039 5.90245C6.50969 5.99945 6.49978 6.09998 6.46194 6.19134C6.4241 6.2827 6.36001 6.36079 6.27779 6.41573C6.19556 6.47068 6.09889 6.5 6 6.5C5.86739 6.5 5.74021 6.44732 5.64645 6.35355C5.55268 6.25979 5.5 6.13261 5.5 6ZM10 8.5C9.70333 8.5 9.41332 8.58797 9.16665 8.7528C8.91997 8.91762 8.72771 9.15189 8.61418 9.42597C8.50065 9.70006 8.47094 10.0017 8.52882 10.2926C8.5867 10.5836 8.72956 10.8509 8.93934 11.0607C9.14912 11.2704 9.41639 11.4133 9.70736 11.4712C9.99834 11.5291 10.2999 11.4994 10.574 11.3858C10.8481 11.2723 11.0824 11.08 11.2472 10.8334C11.412 10.5867 11.5 10.2967 11.5 10C11.5 9.60218 11.342 9.22064 11.0607 8.93934C10.7794 8.65804 10.3978 8.5 10 8.5ZM10 10.5C9.90111 10.5 9.80444 10.4707 9.72221 10.4157C9.63999 10.3608 9.5759 10.2827 9.53806 10.1913C9.50022 10.1 9.49031 9.99944 9.50961 9.90245C9.5289 9.80546 9.57652 9.71637 9.64645 9.64645C9.71637 9.57652 9.80546 9.5289 9.90245 9.50961C9.99944 9.49031 10.1 9.50022 10.1913 9.53806C10.2827 9.5759 10.3608 9.63999 10.4157 9.72221C10.4707 9.80444 10.5 9.90111 10.5 10C10.5 10.1326 10.4473 10.2598 10.3536 10.3536C10.2598 10.4473 10.1326 10.5 10 10.5ZM10.8538 5.85375L5.85375 10.8538C5.8073 10.9002 5.75214 10.9371 5.69145 10.9622C5.63075 10.9873 5.5657 11.0003 5.5 11.0003C5.4343 11.0003 5.36925 10.9873 5.30855 10.9622C5.24786 10.9371 5.1927 10.9002 5.14625 10.8538C5.09979 10.8073 5.06294 10.7521 5.0378 10.6914C5.01266 10.6308 4.99972 10.5657 4.99972 10.5C4.99972 10.4343 5.01266 10.3692 5.0378 10.3086C5.06294 10.2479 5.09979 10.1927 5.14625 10.1462L10.1462 5.14625C10.1927 5.09979 10.2479 5.06294 10.3086 5.0378C10.3692 5.01266 10.4343 4.99972 10.5 4.99972C10.5657 4.99972 10.6308 5.01266 10.6914 5.0378C10.7521 5.06294 10.8073 5.09979 10.8538 5.14625C10.9002 5.1927 10.9371 5.24786 10.9622 5.30855C10.9873 5.36925 11.0003 5.4343 11.0003 5.5C11.0003 5.5657 10.9873 5.63075 10.9622 5.69145C10.9371 5.75214 10.9002 5.8073 10.8538 5.85375Z"
        fill="currentColor"
      />
    </>
  );
}

function Flame() {
  return (
    <g data-part="flame">
      <path data-part="glow" opacity="0.2" d="M13 9C13 10.3261 12.4732 11.5979 11.5355 12.5355C10.5979 13.4732 9.32608 14 8 14C6.67392 14 5.40215 13.4732 4.46447 12.5355C3.52678 11.5979 3 10.3261 3 9C3 7.08938 3.90125 5.35875 4.9375 4L7 6L8.64188 1.5C9.99125 2.62 13 5.50938 13 9Z" fill="currentColor" />
      <path
        d="M13.5 9C13.5 10.4587 12.9205 11.8576 11.8891 12.8891C10.8576 13.9205 9.45869 14.5 8 14.5C6.54131 14.5 5.14236 13.9205 4.11091 12.8891C3.07946 11.8576 2.5 10.4587 2.5 9C2.5 7.255 3.1875 5.47063 4.54125 3.69687C4.5841 3.64071 4.63837 3.59426 4.70047 3.5606C4.76258 3.52693 4.83112 3.5068 4.90157 3.50155C4.97201 3.49629 5.04278 3.50603 5.10919 3.5301C5.17561 3.55419 5.23616 3.59207 5.28687 3.64125L6.79437 5.10437L8.16938 1.32875C8.19685 1.25345 8.24202 1.18585 8.30108 1.13166C8.36015 1.07747 8.43138 1.03828 8.50877 1.01739C8.58615 0.996492 8.66743 0.99451 8.74574 1.01161C8.82406 1.0287 8.89711 1.06438 8.95875 1.11563C10.3256 2.25 13.5 5.28437 13.5 9ZM12.5 9C12.5 6.11937 10.2631 3.63 8.86187 2.35437L7.47 6.17125C7.44143 6.24964 7.3937 6.31964 7.33116 6.37487C7.26861 6.43009 7.19324 6.46879 7.11191 6.48743C7.03059 6.50607 6.94589 6.50406 6.86553 6.48158C6.78518 6.45911 6.71173 6.41688 6.65188 6.35875L5.00375 4.76C4.00562 6.20063 3.5 7.625 3.5 9C3.5 10.1935 3.97411 11.3381 4.81802 12.182C5.66193 13.0259 6.80653 13.5 8 13.5C9.19347 13.5 10.3381 13.0259 11.182 12.182C12.0259 11.3381 12.5 10.1935 12.5 9Z"
        fill="currentColor"
      />
      <path
        data-part="spark"
        d="M11.4931 9.58375C11.3635 10.3079 11.0151 10.975 10.4948 11.4952C9.9745 12.0154 9.30734 12.3636 8.58313 12.4931C8.55563 12.4975 8.52784 12.4998 8.5 12.5C8.37458 12.5 8.25375 12.4528 8.16148 12.3679C8.06921 12.2829 8.01223 12.1664 8.00185 12.0414C7.99146 11.9164 8.02843 11.7921 8.10542 11.6931C8.18242 11.5941 8.2938 11.5276 8.4175 11.5069C9.45312 11.3325 10.3319 10.4537 10.5075 9.41625C10.5297 9.28547 10.603 9.16886 10.7112 9.09209C10.8193 9.01531 10.9536 8.98466 11.0844 9.00687C11.2152 9.02909 11.3318 9.10234 11.4085 9.21053C11.4853 9.31871 11.516 9.45296 11.4937 9.58375H11.4931Z"
        fill="currentColor"
      />
    </g>
  );
}

const ICONS: Record<Kind, () => React.JSX.Element> = { "ends-today": Clock, sale: Seal, new: Flame };

/* Strong ease-in-out for on-screen movement, back-out for a settle with a touch of overshoot. */
const IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
const BACK_OUT = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const SINE = "cubic-bezier(0.37, 0, 0.63, 1)";

type Track = { part: string; frames: Keyframe[] };

/* One loop per kind. Every track shares the duration so a loop always ends at rest. */
const MOTION: Record<Kind, { duration: number; tracks: Track[] }> = {
  // Minute hand sweeps a full hour, then the clock rings: time is up.
  "ends-today": {
    duration: 1800,
    tracks: [
      {
        part: "minute",
        frames: [
          { rotate: "0deg", easing: IN_OUT },
          { rotate: "360deg", offset: 0.45 },
          { rotate: "360deg" },
        ],
      },
      {
        part: "body",
        frames: [
          { rotate: "0deg", offset: 0, easing: SINE },
          { rotate: "0deg", offset: 0.45, easing: SINE },
          { rotate: "-14deg", offset: 0.52, easing: SINE },
          { rotate: "11deg", offset: 0.59, easing: SINE },
          { rotate: "-7deg", offset: 0.66, easing: SINE },
          { rotate: "4deg", offset: 0.72, easing: SINE },
          { rotate: "0deg", offset: 0.78 },
          { rotate: "0deg" },
        ],
      },
    ],
  },
  // The seal turns exactly one lobe (8 lobes, 45deg) so the loop is seamless; the percent pops.
  sale: {
    duration: 1600,
    tracks: [
      {
        part: "seal",
        frames: [
          { rotate: "0deg", easing: BACK_OUT },
          { rotate: "45deg", offset: 0.55 },
          { rotate: "45deg" },
        ],
      },
      {
        part: "percent",
        frames: [
          { scale: "1", easing: SINE },
          { scale: "0.78", offset: 0.14, easing: BACK_OUT },
          { scale: "1", offset: 0.5 },
          { scale: "1" },
        ],
      },
    ],
  },
  // Continuous flicker from the base of the flame; the inner glow breathes with it.
  new: {
    duration: 1100,
    tracks: [
      {
        part: "flame",
        frames: [
          { transform: "scale(1, 1) skewX(0deg)", easing: SINE },
          { transform: "scale(0.94, 1.09) skewX(-4deg)", offset: 0.28, easing: SINE },
          { transform: "scale(1.04, 0.95) skewX(2deg)", offset: 0.55, easing: SINE },
          { transform: "scale(0.97, 1.05) skewX(3deg)", offset: 0.8, easing: SINE },
          { transform: "scale(1, 1) skewX(0deg)" },
        ],
      },
      {
        part: "glow",
        frames: [
          { opacity: 0.2, easing: SINE },
          { opacity: 0.55, offset: 0.3, easing: SINE },
          { opacity: 0.3, offset: 0.6, easing: SINE },
          { opacity: 0.2 },
        ],
      },
      {
        part: "spark",
        frames: [
          { translate: "0 0", easing: SINE },
          { translate: "-0.4px -0.5px", offset: 0.4, easing: SINE },
          { translate: "0 0" },
        ],
      },
    ],
  },
};

/**
 * Chip icon that animates while its card is hovered (pointer devices) or focused.
 * On leave the current loop finishes instead of snapping back. Still under reduced motion.
 */
export function ChipIcon({ kind }: { kind: Kind }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const card = svg?.closest("li");
    if (!svg || !card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { duration, tracks } = MOTION[kind];
    let running: Animation[] = [];

    const play = () => {
      if (running.some((a) => a.playState === "running")) {
        running.forEach((a) => a.effect?.updateTiming({ iterations: Infinity }));
        return;
      }
      running = tracks.flatMap(({ part, frames }) => {
        const el = svg.querySelector(`[data-part="${part}"]`);
        return el ? [el.animate(frames, { duration, iterations: Infinity })] : [];
      });
    };
    // Let the loop in progress run out so every part lands back at rest.
    const settle = () =>
      running.forEach((a) => {
        const done = a.effect?.getComputedTiming().currentIteration ?? 0;
        a.effect?.updateTiming({ iterations: done + 1 });
      });

    const canHover = matchMedia("(hover: hover)").matches;
    const onEnter = () => canHover && play();
    const onLeave = () => !card.contains(document.activeElement) && settle();
    const onFocusOut = (e: FocusEvent) => !card.contains(e.relatedTarget as Node | null) && !card.matches(":hover") && settle();

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("focusin", play);
    card.addEventListener("focusout", onFocusOut);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("focusin", play);
      card.removeEventListener("focusout", onFocusOut);
      running.forEach((a) => a.cancel());
    };
  }, [kind]);

  const Icon = ICONS[kind];
  return (
    <svg ref={ref} className={styles.chipIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <Icon />
    </svg>
  );
}

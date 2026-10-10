import { CheckBoldIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { FeaturesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./FeatureGrid.module.css";

/**
 * Short reasons or features: three or four bordered cards. Numbered grids follow Figma's
 * "Module Benefit" cards: plain white, 8px apart, led by a large grey index.
 * The `check` variant is a 2×2 of taller white cards led by a lime check (QEEG).
 */
export function FeatureGrid({
  id,
  tone,
  content,
  variant,
}: {
  id: string;
  tone: Tone;
  content: FeaturesContent;
  variant?: "check";
}) {
  const cols = variant === "check" ? 2 : content.items.length % 4 === 0 ? 4 : 3;
  const check = variant === "check";
  return (
    <CourseSection id={id} tone={tone} head={content} narrow={content.numbered}>
      <Reveal
        as="ul"
        className={[styles.grid, styles[`cols${cols}`], check && styles.check, content.numbered && styles.numbered]
          .filter(Boolean)
          .join(" ")}
        stagger={0.06}
      >
        {content.items.map((item, i) => (
          <RevealItem as="li" key={item.heading} className={styles.card}>
            {check && (
              <>
                <Arcs />
                <span className={styles.checkMark} aria-hidden="true">
                  <CheckBoldIcon />
                </span>
              </>
            )}
            {(content.numbered || item.eyebrow) && (
              <p className={styles.top}>
                {content.numbered && (
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                {item.eyebrow && <span className={styles.eyebrow}>{item.eyebrow}</span>}
              </p>
            )}
            <div className={styles.body}>
              <h3 className={styles.heading}>{item.heading}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </CourseSection>
  );
}

/** Faint brush arcs behind the check cards (Paper). */
function Arcs({ className = styles.arcs }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 774 639.41" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor">
        <path transform="matrix(0.975 0.221 0.221 -0.975 310.46 262.807)" strokeWidth="52" d="M0 64.3S75.7-14.8 125.2 2.5c54.9 19.2 85.1 75 118.7 171.4 12 34.5 25.8 95.6 25.8 95.6" />
        <path transform="translate(-46 416.459)" strokeWidth="52" d="M0 117.5S103.9-12.5 141.7 1c42 15 65 58.6 90.7 134 9.2 27 19.8 74.8 19.8 74.8" />
        <path transform="matrix(-1 0 0 1 522.754 377.524)" strokeWidth="52" d="M0 62.5S103.1-14.4 170.4 2.4c74.8 18.6 115.9 72.9 161.7 166.6 16.4 33.5 35.1 92.9 35.1 92.9" />
        <path transform="matrix(-1 0 0 -1 774 377.524)" strokeWidth="42.55" d="M0 44.6S56.3-10.3 93.1 1.7c40.9 13.3 63.3 52 88.3 118.9 8.9 23.9 19.2 66.3 19.2 66.3" />
      </g>
    </svg>
  );
}

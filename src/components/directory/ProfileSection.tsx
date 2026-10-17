import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import styles from "./Profile.module.css";

/**
 * One section of a person profile (therapist, lecturer): a white card with an h2,
 * revealed as the directory cards are. The id doubles as the "On This Page" anchor.
 */
export function ProfileSection({
  id,
  heading,
  tall = false,
  children,
}: {
  id: string;
  heading: string;
  /** Long cards (the lecturer's course list) play as soon as they enter the viewport. */
  tall?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.card} amount={tall ? "some" : undefined}>
        <RevealItem as="h2" className={styles.heading}>
          <span id={`${id}-title`}>{heading}</span>
        </RevealItem>
        {children}
      </Reveal>
    </section>
  );
}

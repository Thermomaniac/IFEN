import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { REGISTER_PATH, registration } from "@/data/course";
import styles from "./Stepper.module.css";

/**
 * Three pills: done (ink circle + tick, links back), current (ink circle + lime
 * dot, aria-current="step"), upcoming (cream circle + number). On phones only the
 * current pill keeps its label; the others shrink to their circle.
 */
export function Stepper({ current }: { current: number }) {
  return (
    <ol className={styles.steps} aria-label="Registration progress">
      {registration.steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
        const marker = (
          <span className={styles.marker} aria-hidden="true">
            {state === "done" ? <CheckIcon /> : state === "current" ? <span className={styles.dot} /> : i + 1}
          </span>
        );
        const label = (
          <>
            {marker}
            <span className={styles.label}>{step.label}</span>
            {state === "done" && <span className="sr-only">(completed)</span>}
          </>
        );

        return (
          <li key={step.slug} className={styles.step} data-state={state}>
            {state === "done" ? (
              <Link href={`${REGISTER_PATH}/${step.slug}`} className={styles.pill}>
                {label}
              </Link>
            ) : (
              <span className={styles.pill} aria-current={state === "current" ? "step" : undefined}>
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

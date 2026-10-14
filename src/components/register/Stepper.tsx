import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { REGISTER_PATH, registration } from "@/data/course";
import styles from "./Stepper.module.css";

type Step = { slug: string; label: string };

/**
 * Three pills: done (ink circle + tick, links back), current (ink ring around a
 * lime dot, aria-current="step"), upcoming (cream circle + number). On phones only the
 * current pill keeps its label; the others shrink to their circle.
 *
 * Defaults to the course registration. Another routed flow (mentor booking) passes its own
 * `steps` and `basePath`; an in-page flow passes `onSelect`, and done steps become buttons.
 */
export function Stepper({
  current,
  steps = registration.steps,
  label = "Registration progress",
  basePath = REGISTER_PATH,
  onSelect,
}: {
  current: number;
  steps?: readonly Step[];
  label?: string;
  basePath?: string;
  onSelect?: (index: number) => void;
}) {
  return (
    <ol className={styles.steps} aria-label={label}>
      {steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
        const marker = (
          <span className={styles.marker} aria-hidden="true">
            {state === "done" ? (
              <CheckIcon />
            ) : (
              state === "upcoming" && <span className={styles.number}>{i + 1}</span>
            )}
          </span>
        );
        const text = (
          <>
            {marker}
            <span className={styles.label}>{step.label}</span>
            {state === "done" && <span className="sr-only">(completed)</span>}
          </>
        );

        return (
          <li key={step.slug} className={styles.step} data-state={state}>
            {state === "done" ? (
              onSelect ? (
                <button type="button" className={styles.pill} onClick={() => onSelect(i)}>
                  {text}
                </button>
              ) : (
                <Link href={`${basePath}/${step.slug}`} className={styles.pill}>
                  {text}
                </Link>
              )
            ) : (
              <span className={styles.pill} aria-current={state === "current" ? "step" : undefined}>
                {text}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

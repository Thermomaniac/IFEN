"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { REGISTER_PATH, registration } from "@/data/course";
import { useHydrated, useRegistration } from "@/lib/registration";
import { billingDefaults, billingRules, isComplete, participantRules } from "@/lib/registrationForm";
import { SelectionSummary } from "./SelectionSummary";
import { Stepper } from "./Stepper";
import styles from "./StepLayout.module.css";

// Set right before an in-flow navigation, so the next step moves focus to its
// heading. A direct page load leaves focus alone (skip link, header first).
let focusNextHeading = false;
export function markStepNavigation() {
  focusNextHeading = true;
}

/** Earliest step whose data is missing or invalid, or null when all are done. */
function firstIncomplete(reg: ReturnType<typeof useRegistration>) {
  if (!isComplete(participantRules, reg.participant)) return 0;
  if (!isComplete(billingRules, { ...billingDefaults, ...reg.billing })) return 1;
  return null;
}

/**
 * Shared frame of a registration step: "Step n of 3", title and stepper, the
 * selection card and the step's form. Opening a later step with earlier data
 * missing (a bookmark, a fresh tab) sends the visitor back to that step.
 */
export function StepLayout({ step, children }: { step: number; children: ReactNode }) {
  const reg = useRegistration();
  const hydrated = useHydrated();
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { title } = registration.steps[step];

  const missing = hydrated ? firstIncomplete(reg) : null;
  const blocked = missing !== null && missing < step;

  useEffect(() => {
    if (blocked) router.replace(`${REGISTER_PATH}/${registration.steps[missing].slug}`);
  }, [blocked, missing, router]);

  useEffect(() => {
    if (!focusNextHeading) return;
    focusNextHeading = false;
    headingRef.current?.focus();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.titles}>
            <p className={styles.count}>
              Step {step + 1} of {registration.steps.length}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className={styles.title}>
              {title}
            </h2>
          </div>
          <Stepper current={step} />
        </div>

        <div className={styles.aside}>
          <SelectionSummary variant={step === 2 ? "totals" : "facts"} />
        </div>

        <div className={styles.main}>
          {hydrated && !blocked ? <div className={styles.enter}>{children}</div> : <div className={styles.placeholder} aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}

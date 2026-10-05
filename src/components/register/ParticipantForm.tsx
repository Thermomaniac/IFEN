"use client";

import { registration } from "@/data/course";
import { participantRules } from "@/lib/registrationForm";
import { ErrorSummary, SelectField, TextField } from "./Fields";
import { SubmitButton } from "./SubmitButton";
import { useStepForm } from "./useStepForm";
import styles from "./Form.module.css";

export function ParticipantForm() {
  const { values, errors, onChange, onBlur, onSubmit, summaryRef } = useStepForm(
    "participant",
    participantRules,
    "billing",
  );
  const field = (name: string) => ({ name, value: values[name] ?? "", error: errors[name], onChange, onBlur });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby="required-note">
      <div className={styles.cards}>
        <ErrorSummary errors={errors} summaryRef={summaryRef} />
        <p id="required-note" className="sr-only">
          Fields marked with an asterisk are required.
        </p>
        <div className={styles.card}>
          <div className={styles.grid}>
            <SelectField
              {...field("salutation")}
              label="Salutation"
              required
              placeholder="Select salutation"
              options={registration.salutations}
              autoComplete="honorific-prefix"
            />
            <TextField {...field("firstName")} label="First Name" required placeholder="e.g. Anna" autoComplete="given-name" />
            <TextField {...field("lastName")} label="Last Name" required placeholder="e.g. Weber" autoComplete="family-name" />
            <TextField
              {...field("email")}
              size="half"
              type="email"
              label="Email Address"
              required
              placeholder="e.g. anna.weber@example.com"
              autoComplete="email"
              inputMode="email"
            />
            <TextField
              {...field("jobTitle")}
              size="half"
              label="Job Title / Specialty"
              placeholder="e.g. Clinical Therapist"
              autoComplete="organization-title"
            />
          </div>
        </div>
      </div>

      <div className={styles.actions} data-single="">
        <SubmitButton>Continue to Billing info</SubmitButton>
      </div>
    </form>
  );
}

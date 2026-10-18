"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BankTransferDialog } from "@/components/register/BankTransferDialog";
import { OptionGroup, PaymentMark } from "@/components/register/BillingForm";
import { CheckboxField, ErrorSummary, SelectField, TextAreaField, TextField } from "@/components/register/Fields";
import { ProcessingDialog, type BookingOutcome } from "@/components/register/ProcessingDialog";
import { Item, Section } from "@/components/register/ReviewStep";
import { SelectionSummary } from "@/components/register/SelectionSummary";
import { markStepNavigation, StepLayout } from "@/components/register/StepLayout";
import { SubmitButton } from "@/components/register/SubmitButton";
import { useStepForm, type StepStore } from "@/components/register/useStepForm";
import form from "@/components/register/Form.module.css";
import { formatPrice, getPaymentMethod, paymentMethods } from "@/data/course";
import { DIRECTORY_PATH } from "@/data/therapists";
import { FORMAT_LABELS, sessionFacts, type DemoProfile, type MeetingFormat } from "@/data/demo/demoTherapist";
import {
  bookingCopy,
  bookingPath,
  bookingSteps,
  PREFERRED_LANGUAGES,
  type BookingStepSlug,
} from "@/data/therapistProfile";
import { clearMentorBooking, saveMentorBooking, useMentorBooking } from "@/lib/mentorBooking";
import type { Fields } from "@/lib/registration";
import { isComplete, type FieldRule } from "@/lib/registrationForm";
import styles from "./MentorBooking.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RULES: Record<BookingStepSlug, FieldRule[]> = {
  format: [
    {
      name: "format",
      label: "Meeting Format",
      required: true,
      missing: "Choose how you'd like to meet.",
    },
  ],
  details: [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    {
      name: "email",
      label: "Email Address",
      required: true,
      check: (x) => (EMAIL.test(x) ? undefined : "Enter an email address like name@example.com."),
    },
    {
      name: "language",
      label: "Preferred Language",
      required: true,
      missing: "Choose a preferred language.",
    },
  ],
  review: [
    {
      name: "payment",
      label: "Payment Method",
      required: true,
      missing: "Choose a payment method to continue.",
    },
    {
      name: "privacy",
      label: "Booking Terms",
      required: true,
      missing: "Agree to the booking terms to continue.",
    },
  ],
};

type StepProps = {
  id: string;
  profile: DemoProfile;
  store: StepStore;
  defaults: Fields;
  steps: ReturnType<typeof bookingSteps>;
  step: number;
};

/** Go Back to the previous step, or a single Continue on the first. */
function Actions({
  store,
  steps,
  step,
  children,
}: Pick<StepProps, "store" | "steps" | "step"> & { children: ReactNode }) {
  return (
    <div className={form.actions} data-single={step === 0 ? "" : undefined}>
      {step > 0 && (
        <Link
          href={`${store.basePath}/${steps[step - 1].slug}`}
          className={form.back}
          onClick={markStepNavigation}
        >
          Go Back
        </Link>
      )}
      {children}
    </div>
  );
}

function FormatStep({ profile, store, defaults, steps, step }: StepProps) {
  const { values, errors, onChange, onSubmit, summaryRef } = useStepForm(
    store,
    RULES.format,
    steps[step + 1].slug,
    defaults,
  );
  return (
    <form className={form.form} onSubmit={onSubmit} noValidate>
      <div className={form.cards}>
        <ErrorSummary errors={errors} summaryRef={summaryRef} />
        <div className={styles.formats}>
          <OptionGroup
            name="format"
            title="How You'd Like to Meet"
            value={values.format}
            error={errors.format}
            onChange={onChange}
            options={profile.session.formats.map((f) => ({
              id: f,
              content: (
                <span className={form.optionStack}>
                  <span className={styles.routeLabel}>{FORMAT_LABELS[f].label}</span>
                  <span className={styles.audience}>{FORMAT_LABELS[f].text}</span>
                </span>
              ),
            }))}
          />
        </div>
      </div>
      <Actions store={store} steps={steps} step={step}>
        <SubmitButton>Continue to {steps[step + 1].label}</SubmitButton>
      </Actions>
    </form>
  );
}

function DetailsStep({ store, defaults, steps, step }: StepProps) {
  const { values, errors, onChange, onBlur, onSubmit, summaryRef } = useStepForm(
    store,
    RULES.details,
    steps[step + 1].slug,
    defaults,
  );
  const field = (name: string) => ({
    name,
    value: values[name] ?? "",
    error: errors[name],
    onChange,
    onBlur,
  });
  return (
    <form className={form.form} onSubmit={onSubmit} noValidate aria-describedby="required-note">
      <div className={form.cards}>
        <ErrorSummary errors={errors} summaryRef={summaryRef} />
        <p id="required-note" className="sr-only">
          Fields marked with an asterisk are required.
        </p>
        <fieldset className={form.card}>
          <legend className={form.cardTitle}>Your Details</legend>
          <div className={form.grid}>
            <TextField
              {...field("firstName")}
              size="half"
              label="First Name"
              required
              autoComplete="given-name"
            />
            <TextField
              {...field("lastName")}
              size="half"
              label="Last Name"
              required
              autoComplete="family-name"
            />
            <TextField
              {...field("email")}
              size="half"
              type="email"
              label="Email Address"
              required
              placeholder="e.g. name@example.com"
              autoComplete="email"
              inputMode="email"
            />
            <SelectField
              {...field("language")}
              size="half"
              label="Preferred Language"
              required
              placeholder="Select a language"
              options={PREFERRED_LANGUAGES}
            />
            <TextAreaField
              {...field("note")}
              size="full"
              label="Anything the practice should know to arrange it?"
              hint={bookingCopy.noteHint}
            />
          </div>
        </fieldset>
      </div>
      <Actions store={store} steps={steps} step={step}>
        <SubmitButton>Continue to {steps[step + 1].label}</SubmitButton>
      </Actions>
    </form>
  );
}

function ReviewForm({ profile, store, defaults, steps, step }: StepProps) {
  const [paying, setPaying] = useState(false);
  const { values, errors, onChange, onSubmit, summaryRef } = useStepForm(
    store,
    RULES.review,
    () => setPaying(true),
    defaults,
  );
  const router = useRouter();
  const { session } = profile;
  const method = getPaymentMethod(values.payment);
  const format = values.format ? FORMAT_LABELS[values.format as MeetingFormat] : undefined;
  const price = formatPrice(session.price);
  const isTransfer = method?.id === "transfer";
  const choose = steps.some((s) => s.slug === "format");

  // Clear the booking once the visitor has left for the directory, not before: clearing on
  // this page would send the step guard back to the first step mid-navigation.
  const finished = useRef(false);
  useEffect(
    () => () => {
      if (finished.current) clearMentorBooking();
    },
    [],
  );

  const outcome: BookingOutcome = {
    title: "Your Booking Request Is Ready",
    text: `${bookingCopy.outcome} ${profile.person} ${session.responseTime.charAt(0).toLowerCase()}${session.responseTime.slice(1)}.`,
    action: "Back to Therapist List",
    onAction: () => {
      finished.current = true;
      router.push(DIRECTORY_PATH);
    },
  };

  return (
    <>
      <form className={form.form} onSubmit={onSubmit} noValidate>
        <div className={form.cards}>
          <ErrorSummary errors={errors} summaryRef={summaryRef} />

          <div className={form.reviewCard}>
            <Section title="Appointment" edit={choose ? "format" : undefined} basePath={store.basePath}>
              <Item label="Mentor" value={`${profile.person}, ${profile.practice}`} wide />
              <Item label="Session" value={`${session.label}, ${session.minutes} min`} />
              <Item label="Fee" value={price} />
              <Item label="Format" value={format?.label} wide />
              <Item label="Schedule" value={`${session.schedule.long}. ${session.responseTime}.`} wide />
            </Section>
            <Section title="Your Details" edit="details" basePath={store.basePath}>
              <Item label="First Name" value={values.firstName} />
              <Item label="Last Name" value={values.lastName} />
              <Item label="Email" value={values.email} />
              <Item label="Preferred Language" value={values.language} />
              <Item label="Note" value={values.note} wide />
            </Section>
          </div>

          <OptionGroup
            name="payment"
            title="Payment Method"
            hint="Select how you would like to pay."
            value={values.payment}
            error={errors.payment}
            onChange={onChange}
            options={paymentMethods.map((m) => ({
              id: m.id,
              content: (
                <span className={form.optionBody}>
                  <PaymentMark id={m.id} label={m.label} />
                </span>
              ),
            }))}
          />

          <fieldset className={form.card}>
            <legend className={form.cardTitle}>Consent</legend>
            <div className={styles.checks}>
              <CheckboxField
                name="privacy"
                checked={values.privacy === "yes"}
                required
                error={errors.privacy}
                onChange={onChange}
              >
                {bookingCopy.privacy}
              </CheckboxField>
              <CheckboxField name="marketing" checked={values.marketing === "yes"} onChange={onChange}>
                {bookingCopy.marketing}
              </CheckboxField>
            </div>
          </fieldset>
        </div>

        <Actions store={store} steps={steps} step={step}>
          <SubmitButton disabled={paying && !isTransfer}>
            Pay {price}
            {method && ` With ${method.label}`}
          </SubmitButton>
        </Actions>
      </form>

      {/* Outside the form: the transfer dialog has a form of its own. */}
      {paying &&
        (isTransfer ? (
          <BankTransferDialog
            onClose={() => setPaying(false)}
            booking={{
              contact: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
              },
              account: [],
              terms: bookingCopy.transferTerms,
              outcome,
            }}
          />
        ) : (
          <ProcessingDialog method={method?.id ?? ""} outcome={outcome} />
        ))}
    </>
  );
}

const STEP_FORMS: Record<BookingStepSlug, (props: StepProps) => ReactNode> = {
  format: FormatStep,
  details: DetailsStep,
  review: ReviewForm,
};

/**
 * One step of the standalone mentor booking: Meeting Format (only when the mentor offers
 * both), Your Details, Review & Pay. It runs in the course registration frame (step title,
 * stepper, summary card, form cards) with its own sessionStorage store. One session type at
 * one price, read from the profile, and no time picker: the mentor confirms a time by email.
 * The payment is simulated by the shared dialogs; nothing is charged or sent.
 */
export function MentorBookingStep({
  id,
  profile,
  slug,
}: {
  id: string;
  profile: DemoProfile;
  slug: BookingStepSlug;
}) {
  const stored = useMentorBooking(id);
  const { session } = profile;
  const steps = bookingSteps(session.formats);
  const step = steps.findIndex((s) => s.slug === slug);
  const basePath = bookingPath(id);
  // A single format needs no choice, so it is filled in rather than asked.
  const defaults: Fields = session.formats.length === 1 ? { format: session.formats[0] } : {};
  const values = { ...defaults, ...stored };
  const store: StepStore = {
    values: stored,
    save: (next) => saveMentorBooking(id, next),
    basePath,
  };

  const firstMissing = steps.findIndex((s) => s.slug !== "review" && !isComplete(RULES[s.slug], values));
  const format = values.format ? FORMAT_LABELS[values.format as MeetingFormat] : undefined;
  const StepForm = STEP_FORMS[slug];

  return (
    <StepLayout
      step={step}
      flow={{
        steps,
        basePath,
        missing: firstMissing === -1 ? null : firstMissing,
        label: "Booking Progress",
        aside: (
          <SelectionSummary
            variant={slug === "review" ? "totals" : "facts"}
            selection={{
              title: `${session.label} with ${profile.person}`,
              choiceLabel: "Format",
              choice: format?.label,
              facts: sessionFacts(session),
              price: session.price,
            }}
          />
        ),
      }}
    >
      <StepForm id={id} profile={profile} store={store} defaults={defaults} steps={steps} step={step} />
    </StepLayout>
  );
}

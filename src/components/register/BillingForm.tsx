"use client";

import Link from "next/link";
import { BankIcon, CardIcon, CheckCircleFillIcon } from "@/components/icons";
import { formatPrice, paymentMethods, plans, REGISTER_PATH, registration, type PaymentMethodId } from "@/data/course";
import { billingDefaults, billingRules } from "@/lib/registrationForm";
import { ErrorSummary, fieldId, SelectField, TextAreaField, TextField } from "./Fields";
import { markStepNavigation } from "./StepLayout";
import { SubmitButton } from "./SubmitButton";
import { useStepForm } from "./useStepForm";
import styles from "./Form.module.css";

function PaymentMark({ id, label }: { id: PaymentMethodId; label: string }) {
  if (id === "transfer") return <><BankIcon />{label}</>;
  if (id === "card") return <><CardIcon />{label}</>;
  // Brand logos carry the name visually; the text stays for screen readers.
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG logo */}
      <img src={`/register/${id}.svg`} alt="" className={styles.logo} width={id === "stripe" ? 42 : 64} height={17} />
      <span className="sr-only">{label}</span>
    </>
  );
}

/**
 * Radio cards for package and payment method. Nothing is preselected: an optional
 * hint says a choice is needed, and a missed choice shows the field error under the
 * cards. The first radio carries the field id so the error summary can focus it.
 */
function OptionGroup({
  name,
  title,
  hint,
  kind,
  value,
  error,
  onChange,
  options,
  children,
}: {
  name: string;
  title: string;
  hint?: string;
  kind?: "package";
  value: string | undefined;
  error?: string;
  onChange: (name: string, value: string) => void;
  options: { id: string; content: React.ReactNode }[];
  children?: React.ReactNode;
}) {
  const id = fieldId(name);
  return (
    <fieldset
      className={styles.card}
      aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined}
      data-invalid={error ? "" : undefined}
    >
      <legend className={styles.cardTitle}>{title}</legend>
      <div className={styles.group}>
        {hint && (
          <p id={`${id}-hint`} className={styles.hint}>
            {hint}
          </p>
        )}
        <div className={styles.options} data-kind={kind}>
          {options.map((o, i) => (
            <label key={o.id} className={styles.option}>
              <input
                id={i === 0 ? id : undefined}
                type="radio"
                name={name}
                value={o.id}
                checked={value === o.id}
                required
                onChange={() => onChange(name, o.id)}
                className={styles.optionInput}
              />
              {o.content}
              <CheckCircleFillIcon className={styles.optionCheck} />
            </label>
          ))}
        </div>
        {error && (
          <p id={`${id}-error`} className={styles.error}>
            <span aria-hidden="true" className={styles.errorIcon}>
              !
            </span>
            {error}
          </p>
        )}
      </div>
      {children}
    </fieldset>
  );
}

export function BillingForm() {
  const { values, errors, onChange, onBlur, onSubmit, summaryRef } = useStepForm(
    "billing",
    billingRules,
    "review",
    billingDefaults,
  );
  const field = (name: string) => ({ name, value: values[name] ?? "", error: errors[name], onChange, onBlur });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby="required-note">
      <div className={styles.cards}>
        <ErrorSummary errors={errors} summaryRef={summaryRef} />
        <p id="required-note" className="sr-only">
          Fields marked with an asterisk are required.
        </p>

        <OptionGroup
          name="plan"
          title="Choose Your Package"
          kind="package"
          value={values.plan}
          error={errors.plan}
          onChange={onChange}
          options={plans.map((p) => ({
            id: p.id,
            content: (
              <span className={styles.optionStack}>
                <span className={styles.optionLabel}>{p.label}</span>
                <span className={styles.optionPrice}>{formatPrice(p.price)}</span>
              </span>
            ),
          }))}
        />

        <fieldset className={styles.card}>
          <legend className={styles.cardTitle}>Billing Details</legend>
          <div className={styles.grid}>
            <TextField
              {...field("company")}
              size="full"
              label="Company / Institution"
              placeholder="e.g. Neuroscience Institute Berlin"
              autoComplete="organization"
            />
            <TextField {...field("street")} size="full" label="Street Address" required placeholder="e.g. Friedrichstraße" autoComplete="address-line1" />
            <TextField {...field("houseNo")} label="House No." required placeholder="e.g. 112" />
            <TextField {...field("postalCode")} label="Postal Code" required placeholder="e.g. 10117" autoComplete="postal-code" />
            <TextField {...field("city")} label="City" required placeholder="e.g. Berlin" autoComplete="address-level2" />
            <SelectField
              {...field("country")}
              size="half"
              label="Country"
              required
              options={registration.countries}
              autoComplete="country-name"
            />
            <TextField
              {...field("phone")}
              size="half"
              type="tel"
              label="Phone No."
              required
              placeholder="e.g. +49 30 1234567"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
        </fieldset>

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
              <span className={styles.optionBody}>
                <PaymentMark id={m.id} label={m.label} />
              </span>
            ),
          }))}
        >
          <TextAreaField
            {...field("notes")}
            size="full"
            label="Have a discount code or special instructions?"
            hint={registration.notesHint}
            placeholder="e.g. P^24%wr"
          />
        </OptionGroup>
      </div>

      <div className={styles.actions}>
        <Link href={`${REGISTER_PATH}/participant`} className={styles.back} onClick={markStepNavigation}>
          Go Back
        </Link>
        <SubmitButton>Continue to Review &amp; Pay</SubmitButton>
      </div>
    </form>
  );
}

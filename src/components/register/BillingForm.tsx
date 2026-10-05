"use client";

import Link from "next/link";
import { BankIcon, CardIcon, CheckCircleFillIcon } from "@/components/icons";
import { formatPrice, paymentMethods, plans, REGISTER_PATH, registration, type PaymentMethodId } from "@/data/course";
import { setPlan, useRegistration } from "@/lib/registration";
import { billingDefaults, billingRules } from "@/lib/registrationForm";
import { ErrorSummary, SelectField, TextAreaField, TextField } from "./Fields";
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

export function BillingForm() {
  const { plan } = useRegistration();
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

        <fieldset className={styles.card}>
          <legend className={styles.cardTitle}>Choose Your Package</legend>
          <div className={styles.options} data-kind="package">
            {plans.map((p) => (
              <label key={p.id} className={styles.option}>
                <input
                  type="radio"
                  name="plan"
                  value={p.id}
                  checked={plan === p.id}
                  onChange={() => setPlan(p.id)}
                  className={styles.optionInput}
                />
                <span className={styles.optionStack}>
                  <span className={styles.optionLabel}>{p.label}</span>
                  <span className={styles.optionPrice}>{formatPrice(p.price)}</span>
                </span>
                <CheckCircleFillIcon className={styles.optionCheck} />
              </label>
            ))}
          </div>
        </fieldset>

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

        <fieldset className={styles.card}>
          <legend className={styles.cardTitle}>Payment Method</legend>
          <div className={styles.options}>
            {paymentMethods.map((m) => (
              <label key={m.id} className={styles.option}>
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={values.payment === m.id}
                  onChange={() => onChange("payment", m.id)}
                  className={styles.optionInput}
                />
                <span className={styles.optionBody}>
                  <PaymentMark id={m.id} label={m.label} />
                </span>
                <CheckCircleFillIcon className={styles.optionCheck} />
              </label>
            ))}
          </div>
          <TextAreaField
            {...field("notes")}
            size="full"
            label="Have a discount code or special instructions?"
            hint={registration.notesHint}
            placeholder="e.g. P^24%wr"
          />
        </fieldset>
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

"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  course,
  formatAmount,
  getPaymentMethod,
  getPlan,
  REGISTER_PATH,
  registration,
} from "@/data/course";
import { useRegistration } from "@/lib/registration";
import { billingDefaults } from "@/lib/registrationForm";
import { ProcessingDialog } from "./ProcessingDialog";
import { markStepNavigation } from "./StepLayout";
import { SubmitButton } from "./SubmitButton";
import styles from "./Form.module.css";

const startDate = course.facts.find((f) => f.icon === "start")?.value ?? "";

function Section({ title, edit, children }: { title: string; edit?: string; children: ReactNode }) {
  const id = `review-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section className={styles.reviewSection} aria-labelledby={id}>
      <div className={styles.reviewHead}>
        <h3 id={id}>{title}</h3>
        {edit && (
          <Link href={`${REGISTER_PATH}/${edit}`} className={styles.edit} onClick={markStepNavigation}>
            Edit<span className="sr-only"> {title.toLowerCase()}</span>
          </Link>
        )}
      </div>
      <dl className={styles.items}>{children}</dl>
    </section>
  );
}

function Item({ label, value, wide }: { label: string; value?: string; wide?: boolean }) {
  const text = value?.trim();
  return (
    <div className={styles.item} data-wide={wide ? "" : undefined}>
      <dt>{label}</dt>
      <dd data-empty={text ? undefined : ""}>{text || "Not provided"}</dd>
    </div>
  );
}

export function ReviewStep() {
  const reg = useRegistration();
  const p = reg.participant;
  const b = { ...billingDefaults, ...reg.billing };
  // StepLayout only renders this step once both are chosen; the fallbacks are for type safety.
  const plan = getPlan(b.plan);
  const method = getPaymentMethod(b.payment);
  const price = plan?.price ?? 0;
  const [paying, setPaying] = useState(false);

  const contact = [p.salutation, p.firstName, p.lastName].filter(Boolean).join(" ");
  const street = [b.street, b.houseNo].filter(Boolean).join(" ");

  return (
    <div className={styles.form}>
      <div className={styles.reviewCard}>
        <Section title="Course Summary" edit="billing">
          <Item label="Date" value={startDate} />
          <Item label="Course No" value={registration.courseNumber} />
          <Item label="Package" value={plan && `${plan.label}, ${formatAmount(plan.price)}`} />
          <Item label="Payment Method" value={method?.label} />
        </Section>

        <Section title="Billing Info" edit="billing">
          <Item label="Company" value={b.company} />
          <Item label="Contact Person" value={contact} />
          <Item label="Street" value={street} wide />
          <Item label="Postal Code" value={b.postalCode} />
          <Item label="City" value={b.city} />
          <Item label="Country" value={b.country} />
          <Item label="Phone" value={b.phone} />
        </Section>

        <Section title="Participant Info" edit="participant">
          <Item label="Salutation" value={p.salutation} />
          <Item label="Job Title" value={p.jobTitle} />
          <Item label="First Name" value={p.firstName} />
          <Item label="Last Name" value={p.lastName} />
          <Item label="Email" value={p.email} wide />
        </Section>

        <Section title="Additional Info" edit="billing">
          <Item label="Discount code or special instructions" value={b.notes} wide />
        </Section>
      </div>

      <div className={styles.actions}>
        <Link href={`${REGISTER_PATH}/billing`} className={styles.back} onClick={markStepNavigation}>
          Go Back
        </Link>
        <SubmitButton type="button" onClick={() => setPaying(true)} disabled={paying}>
          Pay {formatAmount(price)}
          {method && ` With ${method.label}`}
        </SubmitButton>
      </div>

      {paying && <ProcessingDialog />}
    </div>
  );
}

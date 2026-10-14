"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CloseIcon, InfoCircleIcon } from "@/components/icons";
import { bankTransfer, course } from "@/data/course";
import {
  saveBookingStatus,
  saveStep,
  useRegistration,
} from "@/lib/registration";
import {
  participantRules,
  validate,
  type Errors,
} from "@/lib/registrationForm";
import {
  BookingResult,
  dialogStyles as styles,
  isBackdropClick,
  useModal,
} from "./BookingDialog";
import { TextField } from "./Fields";
import type { BookingOutcome } from "./ProcessingDialog";

const OFFERS_PATH = "/courses";
const CONTACT = ["firstName", "lastName", "email"] as const;
const rules = participantRules.filter((r) =>
  (CONTACT as readonly string[]).includes(r.name),
);
const LABELS: Record<(typeof CONTACT)[number], string> = {
  firstName: "Your First Name",
  lastName: "Your Last Name",
  email: "Your Email Address",
};

/**
 * A transfer outside the course flow (therapist booking): the payer is prefilled from
 * that flow, `account` replaces IFEN's (empty hides the box) and nothing is stored.
 */
export type TransferBooking = {
  contact: Partial<Record<(typeof CONTACT)[number], string>>;
  account: { label: string; value: string }[];
  terms: string;
  outcome: BookingOutcome;
};

/**
 * Bank transfer: IFEN's account, the payer's name and email (prefilled from the
 * participant step) and the transfer terms. "Read & Agreed" completes the
 * registration while the payment stays pending; Done, Escape or a backdrop click
 * on the result leads to the Offers page, which shows the pending notice.
 */
export function BankTransferDialog({
  onClose,
  booking,
}: {
  onClose: () => void;
  booking?: TransferBooking;
}) {
  const ref = useModal();
  const router = useRouter();
  const reg = useRegistration();
  const prefill = booking?.contact ?? reg.participant;
  const [values, setValues] = useState(() =>
    Object.fromEntries(CONTACT.map((k) => [k, prefill[k] ?? ""])),
  );
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const account = booking?.account ?? bankTransfer.account;

  const finish = booking
    ? booking.outcome.onAction
    : () => router.push(OFFERS_PATH);
  const dismiss = done ? finish : onClose;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(rules, values);
    setErrors(found);
    const first = CONTACT.find((k) => found[k]);
    if (first) {
      document.getElementById(`field-${first}`)?.focus();
      return;
    }
    if (!booking) {
      saveStep("participant", { ...reg.participant, ...values });
      // `fresh` lets the Offers page clear the finished form data once it has loaded.
      saveBookingStatus({
        course: course.title,
        registration: "complete",
        payment: "pending",
        method: "transfer",
        fresh: true,
      });
    }
    setDone(true);
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={done ? "transfer-done-title" : "transfer-title"}
      onCancel={(e) => {
        e.preventDefault();
        dismiss();
      }}
      onClick={(e) => isBackdropClick(e) && dismiss()}
    >
      {done ? (
        <BookingResult
          titleId="transfer-done-title"
          title={booking?.outcome.title ?? "Your Registration Is Complete"}
          text={
            booking?.outcome.text ??
            `Your Registration For ${course.title} Is Successful. Payment Status is Pending`
          }
          action={booking?.outcome.action ?? "Done"}
          onAction={finish}
        />
      ) : (
        <>
          <div className={styles.head}>
            <div className={styles.headText}>
              <p className={styles.eyebrow}>Your Selection</p>
              <h2 id="transfer-title" className={styles.headTitle}>
                Bank Transfer
              </h2>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close bank transfer"
            >
              <CloseIcon />
            </button>
          </div>

          <form className={styles.body} noValidate onSubmit={submit}>
            <div className={styles.stack}>
              {account.length > 0 && (
                <dl
                  className={styles.bank}
                  aria-label={booking ? "Bank account" : "IFEN bank account"}
                >
                  {account.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className={styles.fields}>
                {CONTACT.map((name) => (
                  <TextField
                    key={name}
                    name={name}
                    label={LABELS[name]}
                    size="full"
                    required
                    type={name === "email" ? "email" : "text"}
                    autoComplete={
                      name === "email"
                        ? "email"
                        : name === "firstName"
                          ? "given-name"
                          : "family-name"
                    }
                    value={values[name]}
                    error={errors[name]}
                    onChange={(n, v) => {
                      setValues((s) => ({ ...s, [n]: v }));
                      if (errors[n]) setErrors((s) => ({ ...s, [n]: "" }));
                    }}
                  />
                ))}
              </div>

              <p className={styles.notice}>
                <InfoCircleIcon />
                {booking?.terms ?? bankTransfer.terms}
              </p>
            </div>

            <button type="submit" className={styles.button} data-wide="">
              Read &amp; Agreed
            </button>
          </form>
        </>
      )}
    </dialog>
  );
}

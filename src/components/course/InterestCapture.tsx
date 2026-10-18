"use client";

import { usePathname } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { CheckCircleFillIcon, MailIcon } from "@/components/icons";
import { CheckboxField, ErrorSummary, SelectField, TextField } from "@/components/register/Fields";
import form from "@/components/register/Form.module.css";
import button from "@/components/ui/Button.module.css";
import type { CourseHeroContent, SectionHead } from "@/data/coursePage";
import { interestSection as copy } from "@/data/interest";
import { SALUTATIONS, TERMS_URL, validateInterest, type InterestValues } from "@/lib/interestForm";
import type { Errors } from "@/lib/registrationForm";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./InterestCapture.module.css";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

const EMPTY: InterestValues = { salutation: "", firstName: "", lastName: "", email: "", phone: "", terms: "" };

/**
 * Interest list on a course or webinar page, under the content and above the speakers,
 * so booking stays the first call to action. The course is read from the hero: its
 * title and booking code travel with the submission. Errors show on submit, or on blur
 * once a field holds something, then follow every change. Success shows only when
 * `/api/interest` confirms delivery; anything else keeps the form and offers email.
 */
export function InterestCapture({
  hero,
  head = copy.head,
  id = "interest",
  tone = "white",
}: {
  hero: CourseHeroContent;
  /** Replaces the default header, e.g. on an interest-list page where the hero explains the list. */
  head?: SectionHead;
  id?: string;
  tone?: Tone;
}) {
  const path = usePathname() ?? "";
  const title = hero.title.replace(/\s*\n\s*/g, " ");
  const code = hero.booking?.code;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<Errors>({});
  const [live, setLive] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const recheck = (next: InterestValues, names: Set<string>) => {
    const all = validateInterest(next);
    setErrors(Object.fromEntries(Object.entries(all).filter(([name]) => names.has(name))));
  };

  const onChange = (name: string, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (live.has(name)) recheck(next, live);
  };

  const onBlur = (name: string) => {
    if (!values[name]?.trim() || live.has(name)) return;
    const names = new Set(live).add(name);
    setLive(names);
    recheck(values, names);
  };

  const subject = `Interest list: ${title}${code ? ` (${code})` : ""}`;
  const mailto = `mailto:${copy.email}?subject=${encodeURIComponent(subject)}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const all = validateInterest(values);
    setLive(new Set(Object.keys(EMPTY)));
    setErrors(all);
    setSummary(all);
    if (Object.keys(all).length > 0) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ kind: "sending" });
    let message: string = copy.errors.failed;
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values, course: { title, code, path } }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; errors?: Errors } | null;
      if (res.ok && data?.ok) {
        setStatus({ kind: "sent", email: values.email.trim() });
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (data?.error === "not_configured") message = copy.errors.notConfigured;
      if (data?.errors) {
        message = copy.errors.invalid;
        setErrors(data.errors);
      }
    } catch {
      // Network failure: fall through to the generic message.
    }
    setStatus({ kind: "error", message });
    requestAnimationFrame(() => alertRef.current?.focus());
  }

  const sending = status.kind === "sending";

  return (
    <CourseSection id={id} tone={tone} head={head}>
      <div className={styles.card} data-tone={tone}>
        {status.kind === "sent" ? (
          <div className={styles.done} role="status">
            <CheckCircleFillIcon className={styles.doneIcon} aria-hidden="true" />
            <div className={styles.doneText}>
              <h3 ref={doneRef} tabIndex={-1} className={styles.doneHeading}>
                {copy.success.heading}
              </h3>
              <p>{copy.success.text(title, status.email)}</p>
            </div>
          </div>
        ) : (
          <form className={styles.form} noValidate onSubmit={onSubmit} aria-busy={sending || undefined}>
            <ErrorSummary errors={summary} summaryRef={summaryRef} />
            <fieldset className={styles.fieldset}>
              <legend className={form.cardTitle}>{copy.legend}</legend>
              <div className={form.grid}>
                <SelectField
                  name="salutation"
                  label="Salutation"
                  value={values.salutation}
                  error={errors.salutation}
                  options={SALUTATIONS}
                  placeholder="Please Select"
                  autoComplete="honorific-prefix"
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <TextField
                  name="firstName"
                  label="First Name"
                  required
                  value={values.firstName}
                  error={errors.firstName}
                  autoComplete="given-name"
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  required
                  value={values.lastName}
                  error={errors.lastName}
                  autoComplete="family-name"
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  size="half"
                  value={values.email}
                  error={errors.email}
                  autoComplete="email"
                  inputMode="email"
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <TextField
                  name="phone"
                  label="Phone No."
                  type="tel"
                  required
                  size="half"
                  value={values.phone}
                  error={errors.phone}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+49 30 1234567"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </div>
            </fieldset>

            <CheckboxField name="terms" checked={values.terms === "yes"} required error={errors.terms} onChange={onChange}>
              {copy.terms.before}
              <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {copy.terms.link}
              </a>
            </CheckboxField>

            {status.kind === "error" && (
              <div ref={alertRef} tabIndex={-1} role="alert" className={styles.alert}>
                <p>{status.message}</p>
                <a href={mailto} className={styles.mail}>
                  <MailIcon width={16} height={16} aria-hidden="true" />
                  {copy.email}
                </a>
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={sending}
                className={`${button.button} ${button.secondary} ${styles.submit}`}
              >
                {sending ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    {copy.sending}
                  </>
                ) : (
                  copy.submit
                )}
              </button>
              <p className={styles.course}>
                {title}
                {code && <span className={styles.code}>{code}</span>}
              </p>
            </div>
          </form>
        )}
      </div>
    </CourseSection>
  );
}

"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { CheckCircleFillIcon, CheckIcon, MinusIcon } from "@/components/icons";
import { CheckboxField, ErrorSummary, PasswordField, TextField } from "@/components/register/Fields";
import form from "@/components/register/Form.module.css";
import { SubmitButton } from "@/components/register/SubmitButton";
import { accountCopy as copy, accountPaths, accountScreens, liveAccountUrls } from "@/data/account";
import {
  ACCOUNT_FLAGS,
  PASSWORD_MAX,
  PASSWORD_RULES,
  accountFields,
  validateAccount,
  type AccountAction,
  type AccountValues,
} from "@/lib/accountForm";
import type { Errors } from "@/lib/registrationForm";
import { Captcha, RECAPTCHA_SITE_KEY } from "./Captcha";
import styles from "./AccountForm.module.css";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; message?: string } | { kind: "error"; message: string };

const CAPTCHA_ACTIONS: AccountAction[] = ["register", "reset", "remind"];

/**
 * One form per My IFEN screen, with the live page's fields. Validation matches the
 * server (src/lib/accountForm.ts): on submit, or on blur once a field holds something,
 * then on every change. A request is only reported as done when `/api/account/<action>`
 * confirms it; every failure keeps the form and links the current My IFEN page.
 */
export function AccountForm({ action }: { action: AccountAction }) {
  const screen = accountScreens[action];
  const names = [...accountFields(action), ...(ACCOUNT_FLAGS[action] ?? [])].filter((n) => n !== "captcha");
  const needsCaptcha = CAPTCHA_ACTIONS.includes(action);
  const captchaOn = needsCaptcha && RECAPTCHA_SITE_KEY !== "";

  const [values, setValues] = useState<AccountValues>(() => Object.fromEntries(names.map((n) => [n, ""])));
  const [captcha, setCaptcha] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<Errors>({});
  const [live, setLive] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const check = (next: AccountValues, token = captcha) =>
    validateAccount(action, captchaOn ? { ...next, captcha: token } : next, { captcha: captchaOn });

  const recheck = (next: AccountValues, fields: Set<string>, token = captcha) => {
    const all = check(next, token);
    setErrors(Object.fromEntries(Object.entries(all).filter(([name]) => fields.has(name))));
  };

  const onChange = (name: string, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Retyping the first password re-checks the confirmation once it has been checked.
    if (live.has(name) || (name === "password1" && live.has("password2"))) recheck(next, live);
  };

  const onBlur = (name: string) => {
    if (!values[name] || live.has(name)) return;
    const fields = new Set(live).add(name);
    setLive(fields);
    recheck(values, fields);
  };

  const onToken = (token: string, expired?: boolean) => {
    setCaptcha(token);
    if (live.has("captcha")) recheck(values, live, token);
    if (expired) setStatus({ kind: "error", message: copy.captchaExpired });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const all = check(values);
    setLive(new Set([...names, "captcha"]));
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
      const res = await fetch(`/api/account/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values, captcha: captchaOn ? captcha : undefined }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        errors?: Errors;
        redirect?: string;
        message?: string;
      } | null;
      if (res.ok && data?.ok) {
        if (data.redirect) {
          window.location.assign(data.redirect);
          return;
        }
        setStatus({ kind: "sent", message: data.message });
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (data?.error === "not_configured") message = copy.errors.notConfigured;
      else if (data?.error === "invalid_credentials") message = copy.errors.credentials;
      else if (data?.error === "captcha_failed") message = copy.errors.captcha;
      else if (data?.errors) {
        message = copy.errors.invalid;
        setErrors(data.errors);
      }
    } catch {
      // Network failure: the generic message stands.
    }
    // A reCAPTCHA token is single use; any answer from the server spends it.
    if (captchaOn) {
      setCaptcha("");
      setCaptchaReset((n) => n + 1);
    }
    setStatus({ kind: "error", message });
    requestAnimationFrame(() => alertRef.current?.focus());
  }

  if (status.kind === "sent" && screen.success) {
    return (
      <div className={styles.done} role="status">
        <CheckCircleFillIcon className={styles.doneIcon} aria-hidden="true" />
        <div className={styles.doneText}>
          <h2 ref={doneRef} tabIndex={-1} className={styles.doneHeading}>
            {screen.success.heading}
          </h2>
          <p>{status.message ?? screen.success.text}</p>
          {action !== "login" && (
            <Link href={accountPaths.login} className={styles.link}>
              {copy.backToLogin}
            </Link>
          )}
        </div>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const field = (name: string) => ({ name, value: values[name] ?? "", error: errors[name], onChange, onBlur });
  const password1 = values.password1 ?? "";

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit} aria-busy={sending || undefined}>
      <ErrorSummary errors={summary} summaryRef={summaryRef} />

      <fieldset className={styles.fieldset}>
        <legend className={form.cardTitle}>{copy.legend}</legend>
        <div className={styles.fields}>
          {action === "login" && (
            <>
              <TextField {...field("username")} label="Username" required size="full" autoComplete="username" autoCapitalize="none" />
              <PasswordField
                {...field("password")}
                label="Password"
                required
                size="full"
                autoComplete="current-password"
                maxLength={PASSWORD_MAX}
                showLabel={copy.showPassword}
                hideLabel={copy.hidePassword}
              />
              <CheckboxField name="remember" checked={values.remember === "yes"} plain onChange={onChange}>
                {copy.remember}
              </CheckboxField>
            </>
          )}

          {action === "register" && (
            <>
              <TextField {...field("name")} label="Name" required size="full" autoComplete="name" />
              <TextField {...field("username")} label="Username" required size="full" autoComplete="username" autoCapitalize="none" />
              <PasswordField
                {...field("password1")}
                label="Password"
                required
                size="full"
                autoComplete="new-password"
                maxLength={PASSWORD_MAX}
                showLabel={copy.showPassword}
                hideLabel={copy.hidePassword}
                describedBy="password-rules"
              >
                <div id="password-rules" className={styles.rules}>
                  <p className={styles.rulesTitle}>{copy.passwordRules}</p>
                  <ul>
                    {PASSWORD_RULES.map((rule) => {
                      const met = rule.test(password1);
                      return (
                        <li key={rule.id} data-met={met || undefined}>
                          {met ? <CheckIcon aria-hidden="true" /> : <MinusIcon aria-hidden="true" />}
                          <span>
                            {rule.label}
                            <span className={styles.srOnly}>, {met ? copy.ruleMet : copy.ruleNotMet}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </PasswordField>
              <PasswordField
                {...field("password2")}
                label="Confirm Password"
                required
                size="full"
                autoComplete="new-password"
                maxLength={PASSWORD_MAX}
                showLabel={copy.showPassword}
                hideLabel={copy.hidePassword}
              />
              <TextField {...field("email1")} label="Email Address" type="email" required size="full" autoComplete="email" inputMode="email" />
            </>
          )}

          {(action === "reset" || action === "remind") && (
            <TextField {...field("email")} label="Email Address" type="email" required size="full" autoComplete="email" inputMode="email" />
          )}
        </div>
      </fieldset>

      {needsCaptcha &&
        (captchaOn ? (
          <div className={styles.captcha} data-invalid={errors.captcha ? "" : undefined}>
            <Captcha onToken={onToken} resetKey={captchaReset} error={errors.captcha} />
            {errors.captcha && (
              <p id="field-captcha-error" className={form.error}>
                <span aria-hidden="true" className={form.errorIcon}>
                  !
                </span>
                {errors.captcha}
              </p>
            )}
          </div>
        ) : (
          <p className={styles.note}>
            {copy.captchaUnavailable}{" "}
            <a href={liveAccountUrls[action]} className={styles.link}>
              {copy.liveLink}
            </a>
          </p>
        ))}

      {status.kind === "error" && (
        <div ref={alertRef} tabIndex={-1} role="alert" className={styles.alert}>
          <p>{status.message}</p>
          <a href={liveAccountUrls[action]} className={styles.link}>
            {copy.liveLink}
          </a>
        </div>
      )}

      <div className={styles.actions}>
        <SubmitButton disabled={sending}>{sending ? screen.sending : screen.submit}</SubmitButton>
        {action === "login" && (
          <ul className={styles.recovery}>
            <li>
              <Link href={accountPaths.reset} className={styles.link}>
                {copy.forgotPassword}
              </Link>
            </li>
            <li>
              <Link href={accountPaths.remind} className={styles.link}>
                {copy.forgotUsername}
              </Link>
            </li>
          </ul>
        )}
      </div>

      <p className={styles.switch}>
        {action === "login" ? (
          <>
            {copy.noAccount}{" "}
            <Link href={accountPaths.register} className={styles.link}>
              {copy.createAccount}
            </Link>
          </>
        ) : action === "register" ? (
          <>
            {copy.haveAccount}{" "}
            <Link href={accountPaths.login} className={styles.link}>
              {copy.backToLogin}
            </Link>
          </>
        ) : (
          <Link href={accountPaths.login} className={styles.link}>
            {copy.backToLogin}
          </Link>
        )}
      </p>
    </form>
  );
}

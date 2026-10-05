"use client";

import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { Errors } from "@/lib/registrationForm";
import styles from "./Form.module.css";

type Base = {
  name: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  hint?: string;
  /** "half" for two per row, "third" for three per row, "full" for the whole card width. */
  size?: "third" | "half" | "full";
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
};

export const fieldId = (name: string) => `field-${name}`;

function describedBy(name: string, hint?: string, error?: string) {
  return [hint && `${fieldId(name)}-hint`, error && `${fieldId(name)}-error`].filter(Boolean).join(" ") || undefined;
}

function Shell({ name, label, required, hint, error, size = "third", children }: Base & { children: ReactNode }) {
  return (
    <div className={styles.field} data-size={size} data-invalid={error ? "" : undefined}>
      <label htmlFor={fieldId(name)} className={styles.label}>
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <span className={styles.optional}> (Optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${fieldId(name)}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${fieldId(name)}-error`} className={styles.error}>
          <span aria-hidden="true" className={styles.errorIcon}>
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

type TextProps = Base & {
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
};

export function TextField(props: TextProps) {
  const { name, value, error, required, hint, type = "text", placeholder, autoComplete, inputMode, onChange, onBlur } = props;
  return (
    <Shell {...props}>
      <input
        id={fieldId(name)}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={styles.input}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur?.(name)}
      />
    </Shell>
  );
}

type SelectProps = Base & {
  options: string[];
  placeholder?: string;
  autoComplete?: string;
};

export function SelectField(props: SelectProps) {
  const { name, value, error, required, hint, options, placeholder, autoComplete, onChange, onBlur } = props;
  return (
    <Shell {...props}>
      <div className={styles.selectWrap}>
        <select
          id={fieldId(name)}
          name={name}
          value={value}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className={styles.input}
          data-empty={value ? undefined : ""}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur?.(name)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDownIcon className={styles.chevron} />
      </div>
    </Shell>
  );
}

export function TextAreaField(props: Base & { placeholder?: string }) {
  const { name, value, error, hint, placeholder, onChange, onBlur } = props;
  return (
    <Shell {...props}>
      <textarea
        id={fieldId(name)}
        name={name}
        value={value}
        rows={2}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={`${styles.input} ${styles.textarea}`}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur?.(name)}
      />
    </Shell>
  );
}

/**
 * Shown above the form after a failed submit and focused, so screen readers
 * read it at once. Each entry jumps to its field.
 */
export function ErrorSummary({
  errors,
  summaryRef,
}: {
  errors: Errors;
  summaryRef: React.RefObject<HTMLDivElement | null>;
}) {
  const names = Object.keys(errors);
  if (names.length === 0) return null;
  return (
    <div ref={summaryRef} className={styles.summary} tabIndex={-1} aria-labelledby="error-summary-title">
      <h3 id="error-summary-title" className={styles.summaryTitle}>
        {names.length === 1 ? "Please fix 1 field to continue" : `Please fix ${names.length} fields to continue`}
      </h3>
      <ul className={styles.summaryList}>
        {names.map((name) => (
          <li key={name}>
            <a
              href={`#${fieldId(name)}`}
              onClick={(e) => {
                const target = document.getElementById(fieldId(name));
                if (!target) return;
                e.preventDefault();
                target.focus();
                target.scrollIntoView({ block: "center" });
              }}
            >
              {errors[name]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

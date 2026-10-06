import { getPaymentMethod, getPlan } from "@/data/course";
import type { Fields } from "@/lib/registration";

/**
 * Field rules for the registration steps. Kept separate from the components so
 * each step page and the review guard agree on what "complete" means.
 */
export type FieldRule = {
  name: string;
  label: string;
  required?: boolean;
  /** Message when a required value is missing; defaults to "<label> is required." */
  missing?: string;
  /** Returns an error message, or nothing when the value is fine. */
  check?: (value: string) => string | undefined;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const participantRules: FieldRule[] = [
  { name: "salutation", label: "Salutation", required: true },
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  {
    name: "email",
    label: "Email Address",
    required: true,
    check: (v) => (EMAIL.test(v) ? undefined : "Enter an email address like name@example.com."),
  },
  { name: "jobTitle", label: "Job Title / Specialty" },
];

export const billingRules: FieldRule[] = [
  {
    name: "plan",
    label: "Package",
    required: true,
    missing: "Choose a package to continue.",
    check: (v) => (getPlan(v) ? undefined : "Choose a package to continue."),
  },
  { name: "company", label: "Company / Institution" },
  { name: "street", label: "Street Address", required: true },
  { name: "houseNo", label: "House No.", required: true },
  {
    name: "postalCode",
    label: "Postal Code",
    required: true,
    check: (v) => (/^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/.test(v) ? undefined : "Enter a valid postal code, e.g. 10117."),
  },
  { name: "city", label: "City", required: true },
  { name: "country", label: "Country", required: true },
  {
    name: "phone",
    label: "Phone No.",
    required: true,
    check: (v) =>
      /^\+?[\d\s()/-]+$/.test(v) && v.replace(/\D/g, "").length >= 6
        ? undefined
        : "Enter a phone number using digits, e.g. +49 30 1234567.",
  },
  {
    name: "payment",
    label: "Payment Method",
    required: true,
    missing: "Choose a payment method to continue.",
    check: (v) => (getPaymentMethod(v) ? undefined : "Choose a payment method to continue."),
  },
  { name: "notes", label: "Discount code or special instructions" },
];

export type Errors = Record<string, string>;

export function validate(rules: FieldRule[], values: Fields): Errors {
  const errors: Errors = {};
  for (const rule of rules) {
    const value = (values[rule.name] ?? "").trim();
    if (!value) {
      if (rule.required) errors[rule.name] = rule.missing ?? `${rule.label} is required.`;
      continue;
    }
    const message = rule.check?.(value);
    if (message) errors[rule.name] = message;
  }
  return errors;
}

export function isComplete(rules: FieldRule[], values: Fields) {
  return Object.keys(validate(rules, values)).length === 0;
}

/**
 * Pre-filled choices on the billing step. Paper shows Card selected, but package
 * and payment method start empty on purpose: the visitor has to choose both.
 */
export const billingDefaults: Fields = { country: "Germany (DE)" };

import { validate, type Errors, type FieldRule } from "@/lib/registrationForm";

/**
 * The interest list form, field for field as the live Seminarman prospect form:
 * optional salutation, first and last name, email, phone, and the required AGB
 * checkbox. No newsletter or marketing consent. Shared by the form and the
 * `/api/interest` route so both reject the same input.
 */

export const SALUTATIONS = ["Mr.", "Mrs.", "Ms."];

export const TERMS_URL = "https://www.neurofeedback-info.de/de/agb-2018.html";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 120;

const short = (label: string) => (v: string) => (v.length > MAX ? `${label} must be ${MAX} characters or fewer.` : undefined);

export const interestRules: FieldRule[] = [
  {
    name: "salutation",
    label: "Salutation",
    check: (v) => (SALUTATIONS.includes(v) ? undefined : "Choose a salutation from the list."),
  },
  { name: "firstName", label: "First Name", required: true, check: short("First Name") },
  { name: "lastName", label: "Last Name", required: true, check: short("Last Name") },
  {
    name: "email",
    label: "Email Address",
    required: true,
    check: (v) => (EMAIL.test(v) && v.length <= MAX ? undefined : "Enter an email address like name@example.com."),
  },
  {
    name: "phone",
    label: "Phone No.",
    required: true,
    check: (v) =>
      /^\+?[\d\s()/-]+$/.test(v) && v.replace(/\D/g, "").length >= 6 && v.length <= 40
        ? undefined
        : "Enter a phone number using digits, e.g. +49 30 1234567.",
  },
  {
    name: "terms",
    label: "Terms and Conditions",
    required: true,
    missing: "Accept the General Terms and Conditions to join the list.",
    check: (v) => (v === "yes" ? undefined : "Accept the General Terms and Conditions to join the list."),
  },
];

export const INTEREST_FIELDS = interestRules.map((r) => r.name);

export type InterestValues = Record<string, string>;

/** The course the visitor is interested in, read from the page's hero. */
export type InterestCourse = { title: string; code?: string; path: string };

export type InterestPayload = { values: InterestValues; course: InterestCourse };

export function validateInterest(values: InterestValues): Errors {
  return validate(interestRules, values);
}

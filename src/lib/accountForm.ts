import { validate, type Errors, type FieldRule } from "@/lib/registrationForm";

/**
 * Account forms, field for field as the live My IFEN pages (Joomla com_users on
 * neurofeedback-info.de). Shared by the forms and `/api/account/[action]` so both
 * reject the same input. Nothing here decides whether a login is valid; that stays
 * with the account service.
 */

export const ACCOUNT_ACTIONS = ["login", "register", "reset", "remind"] as const;
export type AccountAction = (typeof ACCOUNT_ACTIONS)[number];

export const isAccountAction = (v: string): v is AccountAction => (ACCOUNT_ACTIONS as readonly string[]).includes(v);

/** The live password field caps input at 99 characters. */
export const PASSWORD_MAX = 99;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const emailCheck = (v: string) => (EMAIL.test(v) && v.length <= 100 ? undefined : "Enter an email address like name@example.com.");

/** The live site's password requirements, in its order. */
export const PASSWORD_RULES: { id: string; label: string; test: (v: string) => boolean }[] = [
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "digit", label: "At least 1 number", test: (v) => /\d/.test(v) },
  { id: "symbol", label: "At least 1 special character", test: (v) => /[^A-Za-z0-9\s]/.test(v) },
  { id: "upper", label: "At least 1 upper case letter", test: (v) => /\p{Lu}/u.test(v) },
  { id: "lower", label: "At least 1 lower case letter", test: (v) => /\p{Ll}/u.test(v) },
];

const CAPTCHA: FieldRule = {
  name: "captcha",
  label: "Security Check",
  required: true,
  missing: "Complete the security check.",
};

const rules: Record<AccountAction, FieldRule[]> = {
  login: [
    { name: "username", label: "Username", required: true },
    {
      name: "password",
      label: "Password",
      required: true,
      check: (v) => (v.length > PASSWORD_MAX ? `Password must be ${PASSWORD_MAX} characters or fewer.` : undefined),
    },
  ],
  register: [
    { name: "name", label: "Name", required: true, check: (v) => (v.length > 200 ? "Name must be 200 characters or fewer." : undefined) },
    {
      name: "username",
      label: "Username",
      required: true,
      check: (v) =>
        /[<>"'%;()&\\]/.test(v) || v.length > 150 ? "Use letters, numbers, dots, hyphens or underscores for your username." : undefined,
    },
    {
      name: "password1",
      label: "Password",
      required: true,
      check: (v) =>
        v.length > PASSWORD_MAX
          ? `Password must be ${PASSWORD_MAX} characters or fewer.`
          : PASSWORD_RULES.every((r) => r.test(v))
            ? undefined
            : "The password does not meet the requirements listed below it.",
    },
    { name: "email1", label: "Email Address", required: true, check: emailCheck },
    CAPTCHA,
  ],
  reset: [{ name: "email", label: "Email Address", required: true, check: emailCheck }, CAPTCHA],
  remind: [{ name: "email", label: "Email Address", required: true, check: emailCheck }, CAPTCHA],
};

export const accountFields = (action: AccountAction) => rules[action].map((r) => r.name);

/** Optional fields that are not text: the remember-me checkbox on login. */
export const ACCOUNT_FLAGS: Partial<Record<AccountAction, string[]>> = { login: ["remember"] };

export type AccountValues = Record<string, string>;

/**
 * Validates one form. `captcha` is skipped when no site key is configured: the form
 * cannot show the check, and the server refuses to forward without verifying one.
 */
export function validateAccount(action: AccountAction, values: AccountValues, { captcha = true } = {}): Errors {
  const list = captcha ? rules[action] : rules[action].filter((r) => r.name !== "captcha");
  return validate(list, values);
}

// My IFEN account screens: login, registration, password reset and username
// reminder. Fields, labels and password rules follow the live pages
// (neurofeedback-info.de/mein-ifen.html, Joomla com_users); the success texts are
// the messages those pages show. Rules live in src/lib/accountForm.ts.

import type { AccountAction } from "@/lib/accountForm";

export const ACCOUNT_PATH = "/my-ifen";

export const accountPaths: Record<AccountAction, string> = {
  login: ACCOUNT_PATH,
  register: `${ACCOUNT_PATH}/register`,
  reset: `${ACCOUNT_PATH}/reset`,
  remind: `${ACCOUNT_PATH}/remind`,
};

/** The live account pages, offered whenever this site cannot complete a request. */
const LIVE = "https://www.neurofeedback-info.de/mein-ifen.html";
export const liveAccountUrls: Record<AccountAction, string> = {
  login: LIVE,
  register: `${LIVE}?view=registration`,
  reset: `${LIVE}?view=reset`,
  remind: `${LIVE}?view=remind`,
};

/** Figma login/register photo panel ("The BG 1"), cropped to the frame and kept local. */
export const accountImage = {
  src: "/account/login-photo.jpg",
  alt: "An IFEN therapist places a neurofeedback sensor on a smiling client's forehead.",
};

type Screen = {
  metaTitle: string;
  title: string;
  /** Figma drops the intro on login and register; the recovery screens keep it. */
  intro?: string;
  submit: string;
  sending: string;
  success?: { heading: string; text: string };
};

export const accountScreens: Record<AccountAction, Screen> = {
  login: {
    metaTitle: "Log In | My IFEN",
    title: "Log In To IFEN",
    submit: "Login",
    sending: "Logging In",
    success: { heading: "You Are Logged In", text: "Welcome back to My IFEN." },
  },
  register: {
    metaTitle: "Create an Account | My IFEN",
    title: "Create Your Account",
    submit: "Register",
    sending: "Registering",
    success: {
      heading: "Your Account Has Been Created",
      text: "Check your email inbox for the next step. You may need to activate your account before you can log in.",
    },
  },
  reset: {
    metaTitle: "Reset Your Password | My IFEN",
    title: "Forgot Your Password?",
    intro:
      "Please enter the email address for your account. A verification code will be sent to you. Once you have received the verification code, you will be able to choose a new password for your account.",
    submit: "Send Verification Code",
    sending: "Sending",
    success: {
      heading: "Check Your Email",
      text: "If the email address you entered is registered on this site, you will shortly receive an email with a link to reset the password for your account.",
    },
  },
  remind: {
    metaTitle: "Forgot Your Username? | My IFEN",
    title: "Forgot Your Username?",
    intro:
      "Please enter the email address associated with your account. Your username will be emailed to the email address on file.",
    submit: "Send Username",
    sending: "Sending",
    success: {
      heading: "Check Your Email",
      text: "If the email address you entered is registered on this site, you will shortly receive an email with a reminder of your username.",
    },
  },
};

export const accountCopy = {
  label: "My IFEN",
  legend: "Account Details",
  showPassword: "Show password",
  hidePassword: "Hide password",
  remember: "Remember me",
  forgotPassword: "Forgot your password?",
  noAccount: "No account yet?",
  createAccount: "Create an account",
  haveAccount: "Already have an account?",
  backToLogin: "Back to log in",
  login: "Login",
  home: "IFEN home",
  placeholders: {
    name: "Enter your name",
    username: "Enter your username",
    password: "Enter your password",
    email: "Enter your email address",
  },
  brand: {
    badge: "Institute for EEG Neurofeedback",
    headline: "Become A Certified Neurofeedback Therapist With IFEN",
  },
  passwordRules: "Your password needs",
  ruleMet: "met",
  ruleNotMet: "not met",
  captchaUnavailable:
    "The security check is not available on this site yet, so this form cannot be sent from here. Please use the current My IFEN page.",
  captchaExpired: "The security check expired. Please complete it again.",
  errors: {
    notConfigured: "Your request was not sent: this site is not connected to the IFEN account service yet. Please use the current My IFEN page.",
    credentials: "Username and password do not match, or you do not have an account yet.",
    invalid: "Some details were not accepted. Please check the highlighted fields.",
    captcha: "The security check could not be verified. Please complete it again.",
    failed: "Your request could not be completed. Please try again, or use the current My IFEN page.",
  },
  liveLink: "Open the current My IFEN page",
};

// Interest list section on course and webinar detail pages. Copy follows the live
// Seminarman prospect form (neurofeedback-info.de, photobiomodulation interest list):
// visitors leave their details and IFEN writes to them when matching dates are
// scheduled. Fields and the AGB checkbox live in src/lib/interestForm.ts.

import { CONTACT_EMAIL, type SectionHead } from "./coursePage";

export const interestSection = {
  head: {
    label: "Interest List",
    heading: "Not Ready to Book Yet?",
    intro: [
      "Join the interest list for this course. As soon as new dates are scheduled, IFEN will send a message to the email address you enter.",
    ],
  } satisfies SectionHead,
  legend: "Your Details",
  terms: { before: "I accept the ", link: "General Terms and Conditions" },
  submit: "Join Interest List",
  sending: "Sending",
  success: {
    heading: "You Are on the Interest List",
    text: (course: string, email: string) =>
      `Thank you. Your interest in ${course} has been received. IFEN will write to ${email} when new dates are scheduled.`,
  },
  errors: {
    notConfigured:
      "Online sign-up for interest lists is not connected yet, so your details were not sent. Please email us and we will add you to the list.",
    failed: "Your details could not be sent. Please try again, or email us and we will add you to the list.",
    invalid: "Some details were not accepted. Please check the highlighted fields.",
  },
  email: CONTACT_EMAIL,
};

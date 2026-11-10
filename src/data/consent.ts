// Photo and video consent prompt, shown in the payment confirmation and bank transfer modals
// of every booking flow. Copy supplied by IFEN for the staging prototype (2026-11-10).
// Prototype only: the choice lives in the booking's local state and is not stored or sent.

export type ConsentCopy = { heading: string; text: string; label: string };

export const photoConsent = {
  heading: "Be part of the IFEN community!",
  text: "We’d love to share highlights from our courses and workshops on our website and social media.",
  label:
    "I consent to IFEN using photos and videos in which I appear for publication on its website, social media channels, and promotional materials.",
} satisfies ConsentCopy;

/** Copy of the modal that asks before an online payment starts. */
export const confirmPayment = {
  title: "Confirm Payment?",
  confirm: "Confirm",
  cancel: "Cancel",
};

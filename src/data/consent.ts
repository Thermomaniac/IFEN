// Photo and video consent prompt shown beside course and webinar registration.
// Copy supplied by IFEN for the staging prototype (2026-11-10). Prototype only: the choice
// lives in the page's local state and is not stored or sent anywhere.

export type ConsentCopy = { emoji: string; heading: string; text: string; label: string };

export const photoConsent = {
  emoji: "📸",
  heading: "Be part of the IFEN community!",
  text: "We’d love to share highlights from our courses and workshops on our website and social media.",
  label:
    "I consent to IFEN using photos and videos in which I appear for publication on its website, social media channels, and promotional materials.",
} satisfies ConsentCopy;

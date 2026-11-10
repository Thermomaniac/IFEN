// Training FAQ page frame: metadata, hero, contact card and closing CTA. The questions and
// answers live in ./faq.ts. Title from the live English page
// (https://www.neurofeedback-info.de/en/faq-fragen-und-antworten.html, "Questions and answers
// about IFEN training"); the hero line summarises the page's own topic index.
// The page's German intro line ("Ausbildungsumfang: …") is left out: it is untranslated on the
// English page and has no English source to quote.

import type { Metadata } from "next";
import { CONTACT_EMAIL, LISTING_PATH, type CourseHeroContent, type CtaContent, type FaqContent } from "./coursePage";
import { faqTopics } from "./faq";

const questions = faqTopics.reduce((sum, t) => sum + t.items.length, 0);

export const faqPage = {
  meta: {
    title: "Questions and Answers About IFEN Training | FAQ",
    description:
      "Answers to common questions about IFEN neurofeedback training: the four modules, devices, QEEG, BCIA, booking, costs and online participation.",
  } satisfies Metadata,

  hero: {
    title: "Questions and Answers\nAbout IFEN Training",
    wide: true,
    breadcrumb: [{ label: "Course Dates", href: LISTING_PATH }, { label: "FAQ" }],
    badge: "Training FAQ",
    description:
      "Answers to common questions about IFEN training: the four modules, devices, QEEG, BCIA, booking, costs and online participation.",
    highlights: [
      { value: faqTopics.length.toString(), label: "Topics" },
      { value: questions.toString(), label: "Questions" },
    ],
  } satisfies CourseHeroContent,

  /** Shown once, on the first band. */
  help: {
    heading: "Still Have Questions?",
    text: "Write to us and we will get back to you.",
    email: CONTACT_EMAIL,
  } satisfies FaqContent["help"],

  /** Label pill above each topic heading. */
  topicLabel: (n: number) => `Topic ${String(n).padStart(2, "0")}`,

  cta: {
    label: "Neurofeedback Training",
    headingLines: ["Ready to Start", "Your Training?"],
    action: { label: "View Course Dates", href: LISTING_PATH },
    secondary: { label: "Contact IFEN", href: `mailto:${CONTACT_EMAIL}` },
  } satisfies CtaContent,
};

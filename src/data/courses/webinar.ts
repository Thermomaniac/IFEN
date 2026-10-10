// WEBINAR, Stress, Pain and the Nervous System. Content from the live course page
// neurofeedback-info.de/termine-kursbuchung-seminare/courses/1187-webinar-stress-schmerz-und-nervensystem-biofeedback-und-neurofeedback-in-der-praxis.html,
// translated from German.

import { REGISTER_PATH } from "../course";
import {
  LISTING_PATH,
  type ArticlesContent,
  type CategoriesContent,
  type CourseHeroContent,
  type CtaContent,
  type OverviewContent,
  type SpeakersContent,
} from "../coursePage";
import { ALL_OFFERS, FEINER, LIVE } from "./shared";

export const WEBINAR_PATH = "/courses/webinar-stress-pain";
const BOOK = { label: "Register For Booking", href: `${REGISTER_PATH}/participant` };

export const webinar = {
  meta: {
    title: "Webinar: Stress, Pain and the Nervous System | IFEN",
    description:
      "A 60-minute live webinar on how biofeedback and neurofeedback support self-regulation in stress and pain, and what role both methods play in clinical practice.",
  },

  hero: {
    title: "WEBINAR - Stress, Pain and the Nervous System: Biofeedback and Neurofeedback in Practice",
    breadcrumb: [{ label: "Course Booking", href: LISTING_PATH }, { label: "Webinar" }],
    badge: "Live webinar · 60 minutes",
    description:
      "A practical overview of how biofeedback and neurofeedback support self-regulation and what role both methods can play in everyday clinical practice.",
    highlights: [
      { value: "60 min", label: "Compact live session" },
      { value: "Online live", label: "Join from anywhere" },
      { value: "German", label: "Course language" },
    ],
    booking: {
      code: "WEB-191026-DE",
      prices: [{ label: "Standard price", amount: 40 }],
      facts: [
        { label: "Start", value: "Mon, 19.10.2026, 19:00", icon: "start" },
        { label: "End", value: "Mon, 19.10.2026, 20:00", icon: "end" },
        { label: "Level", value: "Flexible", icon: "level" },
        { label: "Location", value: "Online · German", icon: "location" },
      ],
      cta: BOOK,
    },
  } satisfies CourseHeroContent,

  overview: {
    label: "Overview",
    heading: "Stress, Pain and the Nervous System: Biofeedback & Neurofeedback in Practice",
    paragraphs: [
      "A practical overview of how biofeedback and neurofeedback support self-regulation and what role both methods can play in everyday clinical practice.",
    ],
    actions: [{ label: "Book Your Place", href: BOOK.href }],
    aside: {
      heading: "IFEN · Institute for EEG-Neurofeedback",
      rows: [
        { label: "Date", value: "Mon, 19.10.2026, 19:00 to 20:00", icon: "date" },
        { label: "Format", value: "Online · Live", icon: "format" },
        { label: "Duration", value: "60 minutes", icon: "duration" },
        { label: "Language", value: "German", icon: "language" },
        { label: "Fee", value: "40 EUR", icon: "fee" },
      ],
    },
  } satisfies OverviewContent,

  content: {
    label: "About the webinar",
    heading: "What You Will Take Away",
    items: [
      {
        heading: "Understanding stress, pain and self-regulation",
        paragraphs: [
          "Stress and chronic pain interact closely with the autonomic nervous system and can affect the capacity for self-regulation. Biofeedback and neurofeedback are used in various clinical fields to make these regulatory processes visible and to train them in a targeted way.",
          "In this one-hour webinar you get a practical overview of the basics of biofeedback and neurofeedback in the context of stress and pain. You learn how both methods work, which physiological signals are measured and what role they can play in clinical practice.",
        ],
      },
      {
        heading: "Topics of the webinar",
        list: [
          "Stress, pain and self-regulation",
          "Understanding the autonomic nervous system",
          "Basics of biofeedback and neurofeedback",
          "Typical areas of application in practice",
          "Possibilities and limits of the methods",
          "Time for questions and discussion",
        ],
      },
    ],
  } satisfies ArticlesContent,

  speakers: {
    label: "Your Speaker",
    heading: "Speaker / Instructors",
    people: [FEINER],
  } satisfies SpeakersContent,

  categories: {
    label: "Categories",
    heading: "Browse Categories",
    items: [
      ALL_OFFERS,
      {
        id: "webinars",
        title: "Webinars",
        icon: { kind: "pulse" },
        href: `${LIVE}/termine-kursbuchung-seminare/webinare-m.html`,
      },
      {
        id: "de-online",
        title: "German Online Training",
        icon: { kind: "flag", src: "/categories/de.png" },
        href: `${LIVE}/deutsch-online-fortbildung.html`,
      },
      {
        id: "introductory",
        title: "Introductory Trainings",
        icon: { kind: "users" },
        href: `${LIVE}/termine-kursbuchung-seminare/category/121-introductory-trainings.html`,
      },
    ],
  } satisfies CategoriesContent,

  cta: {
    label: "Live Webinar",
    headingLines: ["Join the Live Webinar", "on Stress and Pain"],
    text: "Get a compact overview of biofeedback, neurofeedback and their importance for self-regulation, with time for questions and discussion.",
    action: { label: "Register now", href: BOOK.href },
  } satisfies CtaContent,
};

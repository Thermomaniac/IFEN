// WEBINAR, QEEG and Neurofeedback in Psychotherapy. Content from the live course page
// neurofeedback-info.de/termine-kursbuchung-seminare/qeeg-kurse-m/courses/1195-webinar-qeeg-und-neurofeedback-in-der-psychotherapie-sinnvoll-ethisch-praxisnah.html,
// translated from German. The webinar is held in German.

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

export const WEBINAR_QEEG_PATH = "/courses/webinar-qeeg-psychotherapy";
const BOOK = { label: "Register For Booking", href: `${REGISTER_PATH}/participant` };

export const webinarQeeg = {
  meta: {
    title: "Webinar: QEEG and Neurofeedback in Psychotherapy | IFEN",
    description:
      "A 60-minute live webinar on how QEEG and neurofeedback can be integrated responsibly into psychotherapeutic work: possibilities, limits, ethics and practice.",
  },

  hero: {
    title: "WEBINAR - QEEG and Neurofeedback in Psychotherapy: Meaningful, Ethical, Practical",
    breadcrumb: [{ label: "Course Booking", href: LISTING_PATH }, { label: "Webinar" }],
    badge: "Live webinar · 60 minutes",
    description:
      "A well-founded overview of how QEEG and neurofeedback can be integrated responsibly into psychotherapeutic processes.",
    highlights: [
      { value: "60 min", label: "Compact live session" },
      { value: "Online live", label: "Join from anywhere" },
      { value: "German", label: "Course language" },
    ],
    booking: {
      code: "WEB-080227-DE",
      prices: [{ label: "Standard price", amount: 40 }],
      facts: [
        { label: "Start", value: "Mon, 08.02.2027, 19:00", icon: "start" },
        { label: "End", value: "Mon, 08.02.2027, 20:00", icon: "end" },
        { label: "Level", value: "Flexible", icon: "level" },
        { label: "Location", value: "Online · German", icon: "location" },
      ],
      cta: BOOK,
    },
  } satisfies CourseHeroContent,

  overview: {
    label: "Overview",
    heading: "QEEG and Neurofeedback in Psychotherapy: Meaningful, Ethical, Practical",
    paragraphs: [
      "A well-founded overview of how QEEG and neurofeedback can be integrated responsibly into psychotherapeutic processes.",
    ],
    actions: [{ label: "Book Your Place", href: BOOK.href }],
    aside: {
      heading: "IFEN · Institute for EEG-Neurofeedback",
      rows: [
        { label: "Date", value: "Mon, 08.02.2027, 19:00 to 20:00 CET (Berlin)", icon: "date" },
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
        heading: "Placing neurophysiological data in context",
        paragraphs: [
          "QEEG and neurofeedback can usefully complement psychotherapeutic processes, provided they are used on a sound professional basis, transparently and with clear limits.",
          "What matters is not the technical measurement alone, but how neurophysiological information can be integrated responsibly into diagnostics, treatment planning and progress monitoring.",
          "In this one-hour webinar you get a practical overview of the role of QEEG and neurofeedback in psychotherapy. You learn what information a QEEG can provide, where its significance is limited, and how neurofeedback fits into an existing therapeutic concept without replacing psychotherapeutic diagnostics or clinical judgement.",
        ],
      },
      {
        heading: "Topics of the webinar",
        list: [
          "Possibilities and limits of QEEG in psychotherapy",
          "Interpreting neurophysiological data correctly",
          "Neurofeedback as a complement to psychotherapeutic treatment",
          "Ethical questions, transparency and realistic communication",
          "Indication, documentation and progress monitoring",
          "Practical examples from everyday therapeutic work",
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
        id: "qeeg",
        title: "QEEG Courses",
        icon: { kind: "brain" },
        href: `${LIVE}/termine-kursbuchung-seminare/qeeg-kurse-m.html`,
      },
      {
        id: "de-online",
        title: "German Online Training",
        icon: { kind: "flag", src: "/categories/de.png" },
        href: `${LIVE}/deutsch-online-fortbildung.html`,
      },
    ],
  } satisfies CategoriesContent,

  cta: {
    label: "Live Webinar",
    headingLines: ["Join the Live Webinar", "on QEEG in Psychotherapy"],
    text: "Learn how QEEG and neurofeedback can be integrated into psychotherapeutic practice in a meaningful, transparent and responsible way.",
    action: { label: "Register now", href: BOOK.href },
  } satisfies CtaContent,
};

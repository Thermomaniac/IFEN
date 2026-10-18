// qEEG Workshop, From Recording to Clinical Interpretation. Content from the live course page
// neurofeedback-info.de/termine-kursbuchung-seminare/qeeg-kurse-m/courses/1167-workshop-interpretazione-clinica-avanzata-del-qeeg.html,
// translated from Italian. The workshop is held in Italian. The live page lists the format as
// Online, though its tagline says "Presenza"; Online is used here, matching the booking facts.
// Instructor details from the lecturer page neurofeedback-info.de/ifen-de/dozenten-m/80-silvia-fois.html.

import { REGISTER_PATH } from "../course";
import {
  CONTACT_EMAIL,
  LISTING_PATH,
  type ArticlesContent,
  type CategoriesContent,
  type CourseHeroContent,
  type CtaContent,
  type FeaturesContent,
  type InstructorContent,
  type OverviewContent,
  type SpeakersContent,
} from "../coursePage";
import { ALL_OFFERS, LIVE } from "./shared";

export const QEEG_WORKSHOP_PATH = "/courses/qeeg-workshop";
const BOOK = { label: "Register For Booking", href: `${REGISTER_PATH}/participant` };
const ENQUIRE = { label: "Request Information", href: `mailto:${CONTACT_EMAIL}` };

export const qeegWorkshop = {
  meta: {
    title: "qEEG Workshop: From Recording to Clinical Interpretation | IFEN",
    description:
      "A two-day online qEEG workshop in Italian with Silvia Fois: recording, signal quality, reading results, clinical interpretation and the clinical report.",
  },

  hero: {
    title: "qEEG Workshop: From Recording to Clinical Interpretation",
    breadcrumb: [
      { label: "Course Booking", href: LISTING_PATH },
      { label: "QEEG Courses" },
      { label: "qEEG Workshop" },
    ],
    badge: "qEEG Workshop · Online · Italian",
    description:
      "A practical, structured introduction to qEEG, from recording the data to interpreting it and writing the clinical report.",
    highlights: [
      { value: "2 Days", label: "Online Workshop" },
      { value: "8 Topics", label: "Theory and Practice" },
      { value: "Italian", label: "Course Language" },
    ],
    booking: {
      code: "QEEG-121226-EN",
      prices: [{ label: "Standard Price", amount: 750 }],
      facts: [
        { label: "Start", value: "Sat, 12.12.2026, 10:00", icon: "start" },
        { label: "End", value: "Sun, 13.12.2026, 17:00", icon: "end" },
        { label: "Level", value: "Flexible", icon: "level" },
        { label: "Location", value: "Online · Italian", icon: "location" },
      ],
      cta: BOOK,
    },
  } satisfies CourseHeroContent,

  overview: {
    label: "Workshop Details",
    heading: "A Guided Introduction to qEEG",
    paragraphs: [
      "This introductory workshop is for psychologists, physicians, therapists and other health professionals who want to integrate qEEG (quantitative electroencephalography) rigorously into their clinical practice. The course offers a practical, structured introduction to qEEG, providing the fundamental knowledge and skills to start using this important assessment tool in daily practice.",
      "Participants will gain a clear understanding of the entire qEEG process, from recording the data to interpreting it and writing the clinical report.",
    ],
    actions: [{ label: "Book Your Place", href: BOOK.href }, ENQUIRE],
    aside: {
      heading: "IFEN · Institute for EEG-Neurofeedback",
      rows: [
        { label: "Dates", value: "Sat, 12.12.2026 to Sun, 13.12.2026", icon: "date" },
        { label: "Format", value: "Online", icon: "format" },
        { label: "Duration", value: "2 Days", icon: "duration" },
        { label: "Language", value: "Italian", icon: "language" },
        { label: "Instructor", value: "Silvia Fois", icon: "instructor" },
        { label: "Fee", value: "750 EUR", icon: "fee" },
      ],
    },
  } satisfies OverviewContent,

  special: {
    label: "Why This Workshop",
    heading: "What Makes This Workshop Special?",
    numbered: true,
    items: [
      {
        heading: "Practical Skills",
        text: "The workshop is designed to build the essential skills to start working with qEEG, understanding its methodology and its main operational steps.",
      },
      {
        heading: "From Recording to Clinical Interpretation",
        text: "You will learn to understand the entire process: data recording, signal quality, reading the results and clinical interpretation.",
      },
      {
        heading: "Real Clinical Cases",
        text: "Analysing practical examples and clinical cases helps develop clinical reasoning and greater confidence in applying qEEG.",
      },
    ],
  } satisfies FeaturesContent,

  content: {
    label: "The Programme",
    heading: "A Theoretical and Practical Path",
    items: [
      {
        heading: "Built for Working With qEEG From Day One",
        paragraphs: [
          "Unlike other, more theory-oriented training events, this workshop focuses on the core skills needed to start working with qEEG straight away.",
          "The aim is to understand the methodology, learn to make quality recordings and interpret the results in a clinically meaningful way.",
          "The programme combines theoretical foundations, practical demonstrations and the analysis of real clinical cases. Working through practical examples lets participants develop clinical reasoning and gain greater confidence in applying qEEG.",
        ],
      },
      {
        heading: "Main Topics",
        list: [
          "Introduction to qEEG, quantitative electroencephalography",
          "History and clinical applications",
          "Normative databases",
          "Recording a quality qEEG",
          "Electrode placement and montages",
          "Reading and interpreting qEEG data",
          "Discussion and interpretation of real qEEGs",
          "Setting up the results feedback session with the patient",
        ],
      },
    ],
  } satisfies ArticlesContent,

  learn: {
    label: "What You Will Learn",
    heading: "Learning Objectives",
    intro: [
      "By the end of the workshop, participants will have a solid methodological base and the practical skills needed to take their first steps in the fascinating and complex world of quantitative electroencephalography.",
    ],
    items: [
      {
        eyebrow: "Foundations",
        heading: "The Fundamentals of qEEG",
        text: "Learn the key concepts qEEG is built on and get to know its fascinating history.",
      },
      {
        eyebrow: "Record",
        heading: "Recording Correctly",
        text: "Understand the recording procedures, correct electrode placement and the main montages used in qEEG.",
      },
      {
        eyebrow: "Interpret",
        heading: "Interpreting the Results",
        text: "Acquire a structured methodology for reading qEEG data and interpreting it in relation to the clinical context.",
      },
    ],
  } satisfies FeaturesContent,

  instructor: {
    label: "Your Instructor",
    heading: "Silvia Fois",
    name: "Silvia Fois",
    role: "Psychologist and psychotherapist · BCIA QEEG-D",
    image: "/speakers/silvia-fois.jpg",
    paragraphs: [
      "The workshop is led by Silvia Fois and offers a practical, structured approach to using qEEG, from recording the data to its clinical interpretation.",
      "Silvia Fois is a psychologist and psychotherapist who has worked in private practice for more than 15 years, combining psychotherapy with neurofeedback, qEEG and body-oriented approaches. She is a BCIA-certified neurofeedback therapist and QEEG Diplomate, and a BCIA mentor since 2023.",
      "She teaches at the ACABS School of Psychotherapy and in the Master's programme in Neurofeedback and Biofeedback at Università Europea di Roma, where she is Scientific Director, and teaches the Italian ISF courses with Mark Smith.",
    ],
    credentials: ["BCIA Neurofeedback", "BCIA QEEG-D", "BCIA Mentor"],
  } satisfies InstructorContent,

  speakers: {
    label: "Your Instructor",
    heading: "Speaker / Instructors",
    people: [
      {
        id: "silvia-fois",
        name: "Silvia Fois",
        role: "BCIA QEEG-D",
        image: "/speakers/silvia-fois.jpg",
        href: `${LIVE}/ifen-de/dozenten-m/80-silvia-fois.html`,
      },
    ],
  } satisfies SpeakersContent,

  categories: {
    label: "Categories",
    heading: "Browse Categories",
    items: [
      ALL_OFFERS,
      {
        id: "qeeg",
        title: "QEEG Courses",
        icon: { kind: "brain" },
        href: `${LIVE}/termine-kursbuchung-seminare/qeeg-kurse-m.html`,
      },
      {
        id: "professionals",
        title: "For Professionals & Therapists",
        icon: { kind: "users" },
        href: `${LIVE}/termine-kursbuchung-seminare/qeeg-kurse-m/category/123-for-professionals-therapist.html`,
      },
      {
        id: "workshops",
        title: "Workshops",
        icon: { kind: "pulse" },
        href: `${LIVE}/termine-kursbuchung-seminare/qeeg-kurse-m/category/129-workshops.html`,
      },
    ],
  } satisfies CategoriesContent,

  cta: {
    label: "2 Days · Online · Italian",
    headingLines: ["Book Your Place", "in the qEEG Workshop"],
    text: "Acquire the methodological and practical foundations to use qEEG with greater confidence in your clinical work.",
    action: { label: "Book Your Place", href: BOOK.href },
    secondary: ENQUIRE,
  } satisfies CtaContent,
};

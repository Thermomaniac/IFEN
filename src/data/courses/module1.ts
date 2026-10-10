// MODULE 1, Certified Neurofeedback Therapist. Content from the live course page
// neurofeedback-info.de/en/termine-kursbuchung-seminare/courses/1165-ifen-modul1.html,
// with the machine-translation errors corrected.

import { REGISTER_PATH } from "../course";
import {
  CONSULTATION_URL,
  CONTACT_EMAIL,
  LISTING_PATH,
  type ArticlesContent,
  type CategoriesContent,
  type CourseHeroContent,
  type CtaContent,
  type CurriculumContent,
  type FeaturesContent,
  type OverviewContent,
  type PathwayContent,
  type SpeakersContent,
} from "../coursePage";
import { ALL_OFFERS, FEINER, LIVE } from "./shared";

export const MODULE1_PATH = "/courses/module-1";
const BOOK = { label: "Register For Booking", href: `${REGISTER_PATH}/participant` };

export const module1 = {
  meta: {
    title: "Module 1, Certified Neurofeedback Therapist | IFEN",
    description:
      "The 5-day hybrid intensive course that starts the IFEN certification: fundamentals of EEG, biofeedback and neurofeedback with guided practical exercises.",
  },

  hero: {
    title: "MODULE 1 - Certified Neurofeedback Therapist",
    breadcrumb: [{ label: "Course Booking", href: LISTING_PATH }, { label: "Module 1" }],
    badge: "Module 1 of the IFEN training",
    description:
      "The 5-day intensive course that starts the IFEN certification programme: the fundamentals of EEG, biofeedback and neurofeedback, with first practical exercises under guidance.",
    highlights: [
      { value: "5 course days", label: "Intensive, with practice" },
      { value: "Hybrid", label: "Online and in person" },
      { value: "Module 1 of 4", label: "IFEN certificate pathway" },
    ],
    booking: {
      code: "M1-051026-EN",
      prices: [
        { label: "Standard price", amount: 1750 },
        { label: "Repeat participants", amount: 750 },
      ],
      facts: [
        { label: "Start", value: "Mon, 05.10.2026, 09:00", icon: "start" },
        { label: "End", value: "Sat, 17.10.2026, 18:00", icon: "end" },
        { label: "Level", value: "Beginner", icon: "level" },
        { label: "Location", value: "Baldham · German", icon: "location" },
      ],
      cta: BOOK,
    },
  } satisfies CourseHeroContent,

  overview: {
    label: "Overview",
    heading: "Fundamentals of Professional Neurofeedback Application",
    paragraphs: [
      "Module 1 is the 5-day intensive course that starts the IFEN certification programme. You learn the fundamentals of EEG, biofeedback and neurofeedback, get to know the methods and carry out first practical exercises under guidance.",
      "The course combines sound theory with practical application and is aimed at professionals who want to integrate neurofeedback responsibly into their existing professional context.",
    ],
    actions: [
      { label: "Reserve Space", href: BOOK.href },
      { label: "Request a Consultation", href: CONSULTATION_URL },
    ],
    aside: {
      heading: "Next appointment",
      rows: [
        { label: "Online", value: "5, 6 and 7 October 2026", icon: "online" },
        { label: "In person", value: "16 and 17 October 2026", icon: "inPerson" },
        { label: "Course times", value: "9:00 to 18:00", icon: "time" },
        { label: "Language", value: "German", icon: "language" },
        { label: "Format", value: "Hybrid", icon: "format" },
      ],
      note: {
        heading: "Questions about participation?",
        text: "We will advise you personally.",
        email: CONTACT_EMAIL,
      },
    },
  } satisfies OverviewContent,

  audience: {
    label: "Who it is for",
    heading: "Is Module 1 Right for You?",
    items: [
      {
        heading: "Who is this for?",
        paragraphs: [
          "For qualified professionals in healthcare, therapy, education or consulting, including other appropriately qualified specialists.",
        ],
        list: [
          "Medical professionals (Doctors, Specialists)",
          "Psychologists & Psychotherapists",
          "Alternative practitioners (Heilpraktiker)",
          "Occupational & Speech Therapists",
        ],
      },
      {
        heading: "After Module 1",
        paragraphs: [
          "Your foundation for the IFEN certification pathway, with first practical exercises under guidance.",
        ],
        list: [
          "Key terms & technical fundamentals of neurofeedback",
          "Basics of EEG, biofeedback & brainwaves",
          "10–20 system, classic & Z-score/database training",
          "First guidance on signal quality, technology & responsible use",
        ],
      },
    ],
  } satisfies ArticlesContent,

  why: {
    label: "Why start here",
    heading: "Why This Module Is the Ideal Starting Point",
    numbered: true,
    items: [
      {
        heading: "Solid basic knowledge",
        text: "You learn the basics of EEG, brainwaves, biofeedback, neurofeedback and the training methods step by step.",
      },
      {
        heading: "Direct practical experience",
        text: "In the in-person part you work with professional neurofeedback systems, practise EEG recordings and get to know basic training approaches hands-on.",
      },
      {
        heading: "Professional orientation",
        text: "The course combines technical fundamentals, professional classification and responsible application in medical, psychological, educational or consulting contexts.",
      },
    ],
  } satisfies FeaturesContent,

  curriculum: {
    label: "Curriculum",
    heading: "Five Days, From the Basics to Clinical Practice",
    days: [
      {
        label: "Day 1",
        tag: "Basics",
        heading: "Fundamentals of biofeedback and neurofeedback",
        topics: [
          "Introduction to biofeedback and neurofeedback",
          "History and development",
          "The biofeedback mechanism and how it works",
          "Learning theory basics: conditioning and learning",
          "Introduction to peripheral biofeedback",
          "Skin conductance and heart rate variability (HRV) training",
          "Stress, self-regulation and dysregulation",
          "Origin of the EEG and basics of brainwaves",
          "The EEG as an indicator of functional disorders",
          "Practical experience: self-experiments with skin conductance and HRV biofeedback",
        ],
      },
      {
        label: "Day 2",
        tag: "Assessment",
        heading: "Brainwaves, EEG and first training procedures",
        topics: [
          "Review of the basics",
          "Slow brainwaves: delta, theta and alpha",
          "Fast brainwaves: beta and gamma",
          "Assessment and professional classification",
          "Introduction to quantitative EEG (qEEG) and normative database procedures",
          "The international 10-20 system",
          "Classic neurofeedback training procedures: basics and structure",
          "ADHD: classic and individualised training approaches",
          "Practice: SMR/beta training and Z-score or database training",
        ],
      },
      {
        label: "Day 3",
        tag: "Practice",
        heading: "Training methods and practical application",
        topics: [
          "Review session",
          "Overview of neurofeedback training procedures",
          "One- to four-channel EEG assessments",
          "Database-driven neurofeedback",
          "Working with Z-score or database training",
          "Practical experience: conducting and evaluating exercises in a training context",
        ],
      },
      {
        label: "Day 4",
        tag: "In depth",
        heading: "In-depth study and clinical-practical application",
        topics: [
          "Review session",
          "Four-channel neurofeedback with databases",
          "Assessment and progress monitoring of training results",
          "Symptom and performance patterns in the EEG",
          "Fundamentals of functional neuroanatomy",
          "Practical application: real-time Z-score training, software functions and combination with classic neurofeedback and biofeedback methods",
        ],
      },
      {
        label: "Day 5",
        tag: "Completion",
        heading: "Advanced applications and conclusion",
        topics: [
          "Standardised database training: possibilities and limitations",
          "Individualised neurofeedback training approaches",
          "Ethical principles and responsible application",
          "Relaxation protocols and peak performance training",
          "Introduction to hemoencephalography (HEG)",
          "Final review and knowledge assessment",
          "Outlook on LORETA neurofeedback (low resolution electromagnetic tomography)",
        ],
      },
    ],
  } satisfies CurriculumContent,

  pathway: {
    label: "Certification",
    heading: "The IFEN Certificate Pathway",
    intro: [
      "Module 1 is the first step in the IFEN certification process. The certificate is awarded once all required components are completed.",
      "The training is aimed at specialists with an appropriate basic qualification and accompanies their entry into professional neurofeedback application.",
    ],
    steps: [
      { label: "Module 1", heading: "Intensive course", text: "5 days, hybrid", current: true },
      { label: "Module 2", heading: "Internship", text: "At least 5 hours, also possible online" },
      { label: "Module 3", heading: "Supervision", text: "5-hour session with a certified expert" },
      { label: "Module 4", heading: "Examination", text: "Take examination & become expert" },
    ],
    note: "Module 2 and Module 3 can be completed in any order.",
  } satisfies PathwayContent,

  practical: {
    label: "Practical information",
    heading: "Equipment and Technical Setup",
    items: [
      {
        heading: "Equipment during the course",
        paragraphs: [
          "During the in-person part, the neurofeedback systems and technical equipment for the practical exercises are provided. You do not need to bring your own equipment.",
          "You gain practical insight into professional neurofeedback technology, signal quality and how training is carried out.",
        ],
      },
      {
        heading: "Technical requirements for the online part",
        list: [
          "Stable internet connection",
          "PC or laptop with Windows 10/11",
          "A second device or monitor is recommended: one for Zoom, one for the software",
          "Screen resolution 1920 × 1080, scaling 100%",
          "Your own neurofeedback system for exercises, if available",
          "Loan equipment is available in limited numbers",
          "Please ask early if you need it",
        ],
      },
    ],
  } satisfies ArticlesContent,

  booking: {
    label: "Before you book",
    heading: "Participation, Requirements and Venue",
    items: [
      {
        heading: "Suitable for repeat participants",
        icon: "repeat",
        paragraphs: [
          "The repeat participant price is 875 EUR. It applies to former Module 1 participants who want to update their knowledge, learn new content and refresh their practical skills.",
          "We particularly recommend repeating if your last participation was more than 5 years ago, as technology, software, training methods and application practice keep developing.",
        ],
      },
      {
        heading: "Requirements",
        icon: "list",
        paragraphs: [
          "Participation requires basic medical, psychological, therapeutic, educational or comparable professional knowledge. Module 1 does not replace basic vocational training and does not on its own qualify participants to practise medicine or therapy.",
          "Neurofeedback is applied within the framework of your existing professional qualification.",
          "If you are unsure whether the module suits your professional background, we are happy to advise you before you register.",
        ],
      },
      {
        heading: "Venue",
        icon: "venue",
        address: {
          name: "Institute for EEG-Neurofeedback",
          lines: ["Karl-Böhm-Strasse 50", "85598 Baldham (Vaterstetten)"],
        },
        paragraphs: [
          "The in-person part takes place at the Institute for EEG-Neurofeedback. All neurofeedback systems and technical equipment for the practical exercises are available during the course.",
        ],
      },
    ],
  } satisfies ArticlesContent,

  speakers: {
    label: "Your Speakers",
    heading: "Speaker / Instructors",
    people: [
      FEINER,
      {
        id: "annette-stolle",
        name: "Annette Stolle",
        role: "Instructor",
        image: "/speakers/annette-stolle.jpg",
        href: `${LIVE}/ifen-de/dozenten-m/66-annette-stolle.html`,
      },
    ],
  } satisfies SpeakersContent,

  categories: {
    label: "Categories",
    heading: "Browse Categories",
    items: [
      ALL_OFFERS,
      {
        id: "therapist",
        title: "Neurofeedback Therapist IFEN",
        icon: { kind: "brain" },
        href: `${LIVE}/termine-kursbuchung-seminare/modul-1-4.html`,
      },
      {
        id: "intensive",
        title: "Module 1 Intensive Course",
        icon: { kind: "users" },
        href: `${LIVE}/modul-1-5-tage-kurs.html`,
      },
      {
        id: "de-hybrid",
        title: "German Hybrid Training",
        icon: { kind: "flag", src: "/categories/de.png" },
        href: `${LIVE}/deutsch-hybrid-fortbildung.html`,
      },
    ],
  } satisfies CategoriesContent,

  cta: {
    label: "Start Your Certification",
    headingLines: ["Reserve Your Place", "in Module 1 Now"],
    text: "Start with a sound, practical introduction to EEG, neurofeedback training and professional application.",
    action: { label: "Reserve space", href: BOOK.href },
    secondary: { label: "Request a consultation", href: CONSULTATION_URL },
  } satisfies CtaContent,
};

// Thomas Feiner lecturer profile. Content from the live page
// neurofeedback-info.de/en/ifen-de/dozenten-m/1-thomas-f-feiner-bcia-bcn-qeeg-d.html, laid
// out as the therapist profile: a summary card, credential rows, expertise badges and
// bulleted experience and research. Facts not on that page (QEEG Diplomate, FNNR board,
// IFEN Neuroscience Lab, 300+ workshops, ERP and heartbeat-evoked-potential work) come from
// his team profile on the live "Über das IFEN" page (see about.ts). The source's
// "Experience" text ends in an unfinished editor placeholder; only its finished sentences
// are used. The course list holds the dates he teaches; the codes end in -EN on the English
// page and in -DE in the schedule data, which holds the same dates.

import type { CategoriesContent, CourseHeroContent } from "../coursePage";
import { scheduleDates, type ScheduleItem } from "../schedule";
import { ALL_OFFERS, IFEN_CRUMB, IFEN_CTA, LECTURERS_PATH, RELATED } from "./shared";

const COURSE_CODES = [
  "M3-Std",
  "M4-P",
  "QEEG-EN",
  "WEB-191026-DE",
  "WEB-261026-DE",
  "WEB-021126-DE",
  "WEB-091126-DE",
  "WEB-161126-EN",
  "WEB-231126-DE",
  "WEB-301126-DE",
  "WEB-071226-DE",
  "WEB-141226-DE",
  "WEB-110127-DE",
  "WEB-250127-DE",
  "WEB-080227-DE",
  "WEB-220227-DE",
  "IFEN Symposium 2027",
  "M1-070627-DE",
];

const courses = COURSE_CODES.map((code): ScheduleItem => {
  const item = scheduleDates.find((d) => d.code === code);
  if (!item) throw new Error(`Thomas Feiner profile: no schedule date with code ${code}`);
  return item;
});

export type LecturerSectionId = "overview" | "credentials" | "expertise" | "experience" | "research" | "courses";

export const thomasFeiner = {
  meta: {
    title: "Thomas Feiner, BCIA BCN, QEEG-D | IFEN Lecturers",
    description:
      "Thomas F. Feiner has over 25 years of clinical experience working with ADHD, stress, depression, addiction, and burnout. Founder and director of IFEN.",
  },

  hero: {
    title: "Thomas F. Feiner",
    breadcrumb: [IFEN_CRUMB, { label: "Lecturers", href: LECTURERS_PATH }, { label: "Thomas Feiner" }],
    badge: "Lecturer profile",
    portrait: { src: "/board/member-1.png", alt: "Portrait of Thomas Feiner" },
    subline: { parts: ["BCIA BCN, QEEG-D", "Founder & Director, IFEN", "Munich"] },
    description: "Founder and director of IFEN, teaching neurofeedback, QEEG and supervision.",
    highlights: [
      { value: "25+ yrs", label: "Clinical experience" },
      { value: "Since 2014", label: "BCIA-certified" },
      { value: "Since 2008", label: "IFEN director" },
    ],
  } satisfies CourseHeroContent,

  nav: [
    { id: "overview", label: "Overview" },
    { id: "credentials", label: "Credentials" },
    { id: "expertise", label: "Expertise" },
    { id: "experience", label: "Experience" },
    { id: "research", label: "Research" },
    { id: "courses", label: "Courses" },
  ] satisfies { id: LecturerSectionId; label: string }[],

  book: { label: "See Courses", href: "#courses" },

  overview: {
    heading: "Overview",
    paragraphs: [
      "Thomas F. Feiner has over 25 years of clinical experience working with ADHD, stress, depression, addiction, and burnout. His approach is practice-oriented and focused on promoting neuronal self-regulation.",
    ],
    stats: [
      { label: "Clinical experience", value: "25+ years" },
      { label: "Occupational therapist", value: "Since 1991" },
      { label: "Founded IFEN", value: "2008" },
    ],
  },

  credentials: {
    heading: "Training and Certifications",
    rows: [
      { label: "Occupational therapist", value: "Since 1991" },
      { label: "BCIA-certified neurofeedback (BCN)", value: "Since 2014" },
      { label: "QEEG Diplomate", value: "QEEG-D" },
      { label: "Board member", value: "Foundation for Neurofeedback, Neuromodulation, and Research (FNNR)" },
      {
        label: "Trained with",
        value: "Thomas F. Collura, Joel Lubar, Robert Thatcher, John Demos, Paul G. Swingle, Prof. Kropotov",
      },
    ],
  },

  expertise: {
    heading: "Clinical Focus and Methods",
    groups: [
      { title: "Clinical focus", items: ["ADHD", "Stress", "Depression", "Addiction", "Burnout"] },
      {
        title: "Methods",
        items: [
          "Neurofeedback",
          "QEEG brain mapping",
          "tDCS",
          "Photobiomodulation",
          "Cognitive and emotional self-regulation",
        ],
      },
    ],
  },

  experience: {
    heading: "Experience in Practice and Teaching",
    intro:
      "As the founder (2008) and director of IFEN, Thomas F. Feiner supports professionals in Germany and Europe in their neurofeedback-based work.",
    items: [
      "Clinical practice alongside many years of training and supervision",
      "More than 300 workshops and webinars worldwide since 2008",
      "International workshops and advanced courses with Prof. Giuseppe Chiarenza and Dr. Thomas F. Collura",
      "Work with top athletes, executives and artists",
      "Training programmes for children with learning difficulties",
    ],
  },

  research: {
    heading: "Research and Publications",
    intro: "Active in applied brain research, focusing on peak performance, meditation and accelerated learning.",
    items: [
      "Author and co-author of scientific publications, speaker at international conferences",
      "Since 2016, leads with his brain mapping team a large international study of EEG patterns in meditation practices",
      "Research on heartbeat evoked potentials and other neurophysiological markers",
      "Founder of the IFEN Neuroscience Lab: ERP measurement tools, the Free-Cap-EEG system and the ERP Analyzer",
    ],
  },

  courses: {
    id: "courses" as const,
    heading: "Courses With Thomas Feiner",
    items: courses,
  },

  related: {
    label: "Explore further",
    heading: "Get to Know IFEN",
    items: [RELATED.lecturers, RELATED.about, ALL_OFFERS],
  } satisfies CategoriesContent,

  cta: {
    ...IFEN_CTA,
    secondary: { label: "Back to All Lecturers", href: LECTURERS_PATH },
  },
};

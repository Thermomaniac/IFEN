// Thomas Feiner lecturer profile. Content from the live page
// neurofeedback-info.de/en/ifen-de/dozenten-m/1-thomas-f-feiner-bcia-bcn-qeeg-d.html.
// The five profile sections are kept in full. The source's "Experience" text ends in an
// unfinished editor placeholder ("developed [a specific method/approach - context needed].
// Training programs for children with learning difficulties."); it is joined here into the
// one sentence it was meant to be. The course table lists the dates he teaches; the codes
// end in -EN on the English page and in -DE in the schedule data, which holds the same dates.

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

export type LecturerSectionId = "clinical" | "approach" | "training" | "experience" | "research" | "courses";

export const thomasFeiner = {
  meta: {
    title: "Thomas Feiner, BCIA BCN, QEEG-D | IFEN Lecturers",
    description:
      "Thomas F. Feiner has over 25 years of clinical experience working with ADHD, stress, depression, addiction, and burnout. Founder and director of IFEN.",
  },

  hero: {
    title: "Thomas Feiner, BCIA BCN, QEEG-D",
    breadcrumb: [IFEN_CRUMB, { label: "Lecturers", href: LECTURERS_PATH }, { label: "Thomas Feiner" }],
    badge: "Lecturer profile",
    portrait: { src: "/board/member-1.png", alt: "Portrait of Thomas Feiner" },
    subline: { parts: ["Founder & Director, IFEN", "Munich"] },
    description:
      "Thomas F. Feiner has over 25 years of clinical experience working with ADHD, stress, depression, addiction, and burnout. His approach is practice-oriented and focused on promoting neuronal self-regulation.",
    highlights: [
      { value: "25+ yrs", label: "Clinical experience" },
      { value: "Since 2014", label: "BCIA-certified" },
      { value: "Since 2008", label: "IFEN founder and director" },
    ],
  } satisfies CourseHeroContent,

  nav: [
    { id: "clinical", label: "Clinical Profile" },
    { id: "approach", label: "Approach" },
    { id: "training", label: "Training" },
    { id: "experience", label: "Experience" },
    { id: "research", label: "Research" },
    { id: "courses", label: "Courses" },
  ] satisfies { id: LecturerSectionId; label: string }[],

  book: { label: "See Courses", href: "#courses" },

  sections: [
    {
      id: "clinical",
      heading: "Clinical Profile",
      paragraphs: [
        "Thomas F. Feiner has over 25 years of clinical experience working with ADHD, stress, depression, addiction, and burnout. His approach is practice-oriented and focused on promoting neuronal self-regulation.",
      ],
    },
    {
      id: "approach",
      heading: "Therapeutic Approach",
      paragraphs: [
        "In his therapeutic practice, he combines neurofeedback with further neurophysiological and neuromodulatory procedures such as transcranial direct current stimulation (tDCS), photobiomodulation, and methods of cognitive and emotional self-regulation.",
      ],
    },
    {
      id: "training",
      heading: "Training and Certifications",
      paragraphs: [
        "Occupational therapist since 1991. BCIA-certified neurofeedback trainer since 2014. Professional training and further education with, among others, Thomas F. Collura, Joel Lubar, Robert Thatcher, John Demos, Paul G. Swingle and Prof. Kropotov.",
      ],
    },
    {
      id: "experience",
      heading: "Experience in Practice and Teaching",
      paragraphs: [
        "As the founder (2008) and director of IFEN, Thomas F. Feiner supports professionals in Germany and Europe in their neurofeedback-based work. In addition to his clinical practice, he has many years of experience in training and supervision, as well as in organizing international workshops and advanced training courses, including collaborations with Prof. Giuseppe Chiarenza and Dr. Thomas F. Collura. He has also worked with top athletes, executives, and artists, and developed training programs for children with learning difficulties.",
      ],
    },
    {
      id: "research",
      heading: "Research and Publications",
      paragraphs: [
        "Thomas F. Feiner is active in applied brain research, focusing on peak performance, meditation, and accelerated learning. He is the author and co-author of scientific publications and a speaker at international conferences. Since 2016, he and his brain mapping team have been leading a large-scale international study analyzing the EEG patterns of various meditation practices.",
      ],
    },
  ] satisfies { id: LecturerSectionId; heading: string; paragraphs: string[] }[],

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

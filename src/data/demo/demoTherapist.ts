// DEMO FIXTURE: a fictional therapist for the stakeholder prototype of the profile page
// and booking flow. Lena Hartmann and Praxis Hartmann do not exist. Every attribute in
// this file is generated demo content (see `GENERATED_FIELDS`); none of it comes from the
// IFEN directory or describes a real person. The shape follows the Alphawave directory
// entry (methods, mentoring provider) and the lecturer profile (education, experience).
//
// To replace it: swap this file for a record from the profile backend, or delete it and
// the `DEMO_*` lines in src/app/therapists/page.tsx and the src/app/therapists/[id] routes.

import type { CourseFact } from "../course";
import { DIRECTORY_PATH, type QualificationId, type Therapist } from "../therapists";

export const DEMO_ID = "lena-hartmann";

/** Every field below is generated. Listed so a reviewer or a migration can find them. */
export const GENERATED_FIELDS = [
  "name",
  "contact",
  "level",
  "qualifications",
  "address",
  "email",
  "location",
  "photo",
  "profile.*",
] as const;

/** Directory record: what the first card and its map pin show. */
export const DEMO_THERAPIST: Therapist = {
  id: DEMO_ID,
  name: "Praxis Hartmann Neurofeedback",
  contact: "Lena Hartmann",
  level: "gold",
  qualifications: ["mentoring", "qeeg", "loreta", "isf", "four-channel", "capito", "biofeedback"],
  address: { postalCode: "80331", city: "München" },
  country: "de",
  // example.com is reserved for documentation, so nothing reaches a real inbox.
  email: "praxis.hartmann@example.com",
  location: [48.1374, 11.5755],
  photo: "/therapists/placeholders/photo-2.jpg",
  photoPlaceholder: true,
  profileHref: `${DIRECTORY_PATH}/${DEMO_ID}`,
};

export type MeetingFormat = "online" | "in-person";

export type DemoProfile = {
  person: string;
  practice: string;
  city: string;
  portrait: string;
  /** Hero highlights, Figma order. */
  mentorshipYears: number;
  lecturer: boolean;
  /** Hero paragraph. */
  summary: string;
  /** Bio paragraphs and the three stat boxes under them. */
  overview: { bio: string[]; facts: { label: string; value: string }[] };
  credentials: { label: string; value: string; note?: string }[];
  /** Methods by group; ids match the directory's QUALIFICATIONS. A protocol names its method for the icon. */
  expertise: {
    protocols: { label: string; method?: QualificationId }[];
    ageGroups: string[];
    methods: QualificationId[];
  };
  experience: { period: string; role: string; place: string }[];
  mentorship: {
    audience: string;
    covers: string[];
    prerequisites: string[];
  };
  /** One session type, one price: the hero, the profile and checkout all read this. */
  session: {
    label: string;
    price: number;
    minutes: number;
    formats: MeetingFormat[];
    languages: string[];
    /** Therapist-defined. Clients do not pick a time; the mentor confirms one by email. */
    schedule: { short: string; long: string };
    responseTime: string;
    cancellation: string;
    included: string[];
    accessibility: string;
  };
};

export const DEMO_PROFILE: DemoProfile = {
  person: "Lena Hartmann",
  practice: "Praxis Hartmann",
  city: "München",
  portrait: "/therapists/placeholders/photo-2.jpg",
  mentorshipYears: 2,
  lecturer: false,
  summary:
    "Neurofeedback practitioner and IFEN mentor in München. One-to-one mentoring for practitioners in IFEN training: protocol choice, session planning and case reflection.",
  overview: {
    bio: [
      "Neurofeedback practitioner in Munich with a background in occupational therapy. Works with children, adolescents and adults, and mentors practitioners working towards IFEN certification.",
      "Sessions start from a qEEG-informed assessment and use ISF and four-channel training. Mentoring focuses on protocol choice, session planning and case reflection.",
    ],
    facts: [
      { label: "Practice", value: "Praxis Hartmann, München" },
      { label: "Neurofeedback Practice Since", value: "2016" },
      { label: "Mentoring Since", value: "2024" },
    ],
  },
  credentials: [
    { label: "Professional Background", value: "Occupational Therapy" },
    {
      label: "Neurofeedback Training",
      value: "IFEN Modules 1 to 4, certified IFEN neurofeedback therapist",
    },
    { label: "Further Training", value: "ISF 1 and ISF 2, qEEG workshop" },
    {
      label: "IFEN Expert Level",
      value: "Gold",
      note: "150+ training hours with IFEN",
    },
    {
      label: "Mentoring",
      value: "Listed by IFEN as an internship and mentoring provider",
    },
    { label: "IFEN Lecturer", value: "No" },
  ],
  expertise: {
    protocols: [
      { label: "ISF (Infra-Slow Fluctuation)", method: "isf" },
      { label: "Four-Channel Training", method: "four-channel" },
      { label: "sLORETA / xLORETA", method: "loreta" },
      { label: "qEEG-Guided Protocols", method: "qeeg" },
    ],
    ageGroups: ["Children", "Adolescents", "Adults"],
    methods: ["qeeg", "capito", "loreta", "isf", "four-channel", "biofeedback"],
  },
  experience: [
    {
      period: "2024 to today",
      role: "Mentor for IFEN certification candidates",
      place: "Online and in Munich",
    },
    {
      period: "2016 to today",
      role: "Own neurofeedback practice",
      place: "Praxis Hartmann, München",
    },
    {
      period: "2011 to 2016",
      role: "Occupational therapist, paediatrics",
      place: "Therapy practice, München",
    },
  ],
  mentorship: {
    audience:
      "For neurofeedback practitioners in IFEN training or newly certified. Mentoring is professional training, not therapy.",
    covers: [
      "Protocol choice and session planning",
      "Reading qEEG and LORETA reports for training decisions",
      "Case reflection with anonymised material",
      "Preparing for the IFEN Module 4 exam",
    ],
    prerequisites: ["IFEN Module 1 completed", "Own neurofeedback system, or access to one"],
  },
  session: {
    label: "Mentoring Session",
    price: 150,
    minutes: 60,
    formats: ["online", "in-person"],
    languages: ["German", "English"],
    schedule: {
      short: "Sat & Sun",
      long: "Saturdays and Sundays, 09:00 to 15:00",
    },
    responseTime: "Confirms a time by email within 2 working days",
    cancellation: "Free rescheduling up to 48 hours before the session",
    included: [
      "60 minutes one-to-one",
      "Short written summary after the session",
      "Reading list where useful",
    ],
    accessibility: "Step-free access, lift to the 2nd floor",
  },
};

/** Only the demo mentor has a profile in this prototype. */
export const getDemoProfile = (id: string) => (id === DEMO_ID ? DEMO_PROFILE : undefined);

export const FORMAT_LABELS: Record<MeetingFormat, { label: string; text: string }> = {
  online: {
    label: "Online",
    text: "Video call. The link comes with the confirmation.",
  },
  "in-person": {
    label: "In Person",
    text: "At the practice in München. The address comes with the confirmation.",
  },
};

/** "Online & In Person", as the hero fact reads in Figma. */
export const formatsLabel = (formats: MeetingFormat[]) =>
  formats.map((f) => FORMAT_LABELS[f].label.replace(/\b\w/g, (c) => c.toUpperCase())).join(" & ");

/** Schedule, duration, format and languages: the hero card and the booking summary share them. */
export const sessionFacts = (s: DemoProfile["session"]): CourseFact[] => [
  { label: "Available Schedule", value: s.schedule.short, icon: "schedule" },
  { label: "Session Duration", value: `${s.minutes} mins`, icon: "duration" },
  { label: "Session Format", value: formatsLabel(s.formats), icon: "format" },
  { label: "Languages", value: s.languages.join(", "), icon: "languages" },
];

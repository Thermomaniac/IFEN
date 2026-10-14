// Therapist profile and booking copy (IFEN profile specification, sections A to H).
// The profile content itself (bio, credentials, session, price) lives in the record it
// describes; today that is the fictional fixture in ./demo/demoTherapist.ts.

import type { Metadata } from "next";
import type { FaqContent } from "./coursePage";
import { CONTACT_EMAIL } from "./coursePage";
import { DIRECTORY_PATH, type QualificationId } from "./therapists";

/** Spec D: methods grouped as assessment, neurofeedback approaches and complementary biofeedback. */
export const METHOD_GROUPS: {
  id: string;
  label: string;
  methods: QualificationId[];
}[] = [
  { id: "assessment", label: "Assessment", methods: ["qeeg", "capito", "erp"] },
  {
    id: "neurofeedback",
    label: "Neurofeedback approaches",
    methods: ["loreta", "isf", "four-channel", "peak"],
  },
  {
    id: "biofeedback",
    label: "Complementary biofeedback",
    methods: ["biofeedback"],
  },
];

// ---------- Booking flow ----------

export const profilePath = (id: string) => `${DIRECTORY_PATH}/${id}`;
/** Entry point of the standalone booking flow; it redirects to the first step. */
export const bookingPath = (id: string) => `${profilePath(id)}/book`;

export const PREFERRED_LANGUAGES = ["English", "Deutsch", "Español", "Ελληνικά"];

export const bookingCopy = {
  heading: "Book a Mentoring Session",
  /** "format" is dropped when the mentor offers a single format. */
  steps: [
    {
      slug: "format",
      label: "Meeting Format",
      title: "Choose How You'd Like to Meet",
    },
    { slug: "details", label: "Your Details", title: "Insert Your Details" },
    { slug: "review", label: "Review & Pay", title: "Review & Confirm" },
  ] as const,
  noteHint:
    "Logistics only, e.g. access needs or which of the mentor's days suit you. Do not include health information or identifiable client case details.",
  privacy:
    "I agree to the booking terms and have read the privacy notice. My name, email, language and note are shared with this mentor only to arrange the session.",
  marketing: "Send me occasional IFEN news by email. I can unsubscribe at any time.",
  /** Prototype outcome: nothing is charged or sent, so the copy does not claim otherwise. */
  outcome: "This is a prototype, so no payment was taken and nothing was sent. In the live service",
  transferTerms:
    "This is a prototype, so no payment is taken. In the live service the mentor sends bank details and payment terms with the confirmation.",
};

// ---------- Page copy ----------

export type BookingStepSlug = (typeof bookingCopy.steps)[number]["slug"];

/** The flow for a mentor: Meeting Format only when they offer more than one. */
export const bookingSteps = (formats: readonly string[]) =>
  formats.length > 1 ? bookingCopy.steps : bookingCopy.steps.filter((s) => s.slug !== "format");

export type ProfileSectionId = "overview" | "credentials" | "expertise" | "experience" | "mentorship";

/** Section order and the labels used by the section nav. */
export const SECTION_NAV: { id: ProfileSectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "credentials", label: "Qualifications" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "mentorship", label: "Mentorship" },
];

export const profileHeads: Record<ProfileSectionId, string> = {
  overview: "Professional Overview",
  credentials: "Qualifications & Credentials",
  expertise: "Neurofeedback Expertise",
  experience: "Professional Experience",
  mentorship: "Mentorship Offerings",
};

export const profileFaq: FaqContent = {
  label: "Safety, privacy & FAQs",
  heading: "Before you book",
  intro: [
    "Mentoring is professional training for neurofeedback practitioners. It does not replace a diagnosis or treatment from a doctor.",
  ],
  items: [
    {
      question: "How is the session time set?",
      answer:
        "You don't pick a slot. The mentor works within the schedule shown on this page and confirms a time with you by email after booking.",
    },
    {
      question: "What should I share when booking?",
      answer:
        "Your name, email, preferred language and how you'd like to meet. Please leave out client names, diagnoses, medication, EEG or qEEG files and other case details. Anonymised material is discussed in the session itself.",
    },
    {
      question: "Who sees my booking details?",
      answer:
        "Only the mentor you book with, to arrange the session. Marketing emails are opt-in and off unless you tick the box.",
    },
    {
      question: "Is mentoring the same as treatment?",
      answer:
        "No. Mentoring is professional training for practitioners working towards or holding IFEN certification. It is not therapy for the mentee or their clients.",
    },
    {
      question: "What does the IFEN expert level mean?",
      answer:
        "It reflects the neurofeedback training hours completed with IFEN: Bronze 75+, Silver 100+, Gold 150+ and Platinum 300+. It is separate from the practitioner's professional qualification.",
    },
  ],
  help: {
    heading: "Questions about mentoring?",
    text: "Not sure which mentor or format suits your stage of training? Ask IFEN.",
    email: CONTACT_EMAIL,
  },
};

export const profileMeta = (person: string, practice: string, city: string): Metadata => ({
  title: `${person} | IFEN Therapist List`,
  description: `${person}, ${practice}, ${city}. Neurofeedback mentoring: qualifications, expertise, schedule and booking.`,
});

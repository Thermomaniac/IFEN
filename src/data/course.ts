// Content for the Webinar Details page. Copy is taken from the Paper file
// (artboard "Webinar Details Page").

export type PlanId = "standard" | "feiner" | "chiarenza";
export type Plan = { id: PlanId; label: string; price: number };

export const COURSE_PATH = "/courses/bcia-qeeg-mentoring";
export const REGISTER_PATH = `${COURSE_PATH}/register`;

export const plans: Plan[] = [
  { id: "standard", label: "Standard", price: 150 },
  { id: "feiner", label: "With Thomas Feiner", price: 250 },
  { id: "chiarenza", label: "With Prof. Chiarenza", price: 200 },
];

export const DEFAULT_PLAN: PlanId = "standard";

export function getPlan(id: PlanId) {
  return plans.find((p) => p.id === id) ?? plans[0];
}

export function formatPrice(amount: number) {
  return `${amount} EUR`;
}

export type CourseFact = { label: string; value: string; icon: "start" | "end" | "level" | "location" };

export type Mentor = { id: string; name: string; role: string; image?: string };

export type Category = {
  id: string;
  title: string;
  /** A glyph from the icon set, or a flag image. */
  icon: { kind: "cap" } | { kind: "users" } | { kind: "flag"; src: string; square?: boolean };
  href: string;
};

export const course = {
  title: "BCIA Mentoring, QEEG Mentoring for QEEG-D Certification",
  breadcrumb: [{ label: "Course Booking", href: "/#training" }, { label: "Mentoring" }],
  badge: "Mentoring Program",
  description:
    "Our mentoring program offers personalized guidance for professionals pursuing QEEG-D certification. With experienced mentors, participants enhance their quantitative EEG expertise, interpret brain maps accurately, and develop practical skills per BCIA standards.",
  highlights: [
    { value: "1-on-1", label: "Session Format" },
    { value: "BCIA", label: "Accredited" },
  ],
  facts: [
    { label: "Start Date", value: "Flexible", icon: "start" },
    { label: "End Date", value: "Flexible", icon: "end" },
    { label: "Level", value: "Advanced", icon: "level" },
    // Paper copy; likely means "by arrangement".
    { label: "Location", value: "After Election", icon: "location" },
  ] satisfies CourseFact[],

  program: {
    label: "Program Details",
    heading: "Customized learning path to master advanced clinical qEEG and bioregulation metrics.",
    outcomes: [
      "Personalized 1-on-1 and group mentoring sessions tailored to your pace.",
      "Complete alignment with standard BCIA requirements and qEEG-D board guidelines.",
      "Acquire advanced mapping and clinical analysis accuracy across raw brainwaves.",
      "Flexible scheduling slots custom-planned around your existing practice hours.",
    ],
    image: {
      src: "/course/program.jpg",
      alt: "A mentor points out qEEG brain maps on a monitor to a trainee, with an EEG cap on a stand beside them.",
    },
  },

  mentors: {
    label: "Your Mentors",
    heading: "Speaker / Instructors",
    // Mark Thompson's photo is missing from Paper; the card shows a tinted placeholder.
    people: [
      { id: "mark-thompson", name: "Mark Thompson", role: "Licensed Clinical Psychologist" },
      { id: "sarah-lee", name: "Sarah Lee", role: "Behavioral Health Specialist", image: "/mentors/sarah-lee.jpg" },
      {
        id: "james-rodriguez",
        name: "James Rodriguez",
        role: "Certified BCIA Mentor & Therapist",
        image: "/mentors/james-rodriguez.jpg",
      },
      { id: "lena", name: "Lena", role: "Cognitive Behavioral Therapist", image: "/mentors/lena.jpg" },
    ] satisfies Mentor[],
  },

  categories: {
    label: "Categories",
    heading: "Browse Categories",
    items: [
      { id: "further", title: "Further Training & Other Offers", icon: { kind: "cap" }, href: "/#training" },
      { id: "mentoring", title: "Supervision / Internship / Mentoring", icon: { kind: "users" }, href: "/#training" },
      { id: "es", title: "Spanish In-Person Training", icon: { kind: "flag", src: "/categories/es.png" }, href: "/#training" },
      { id: "de", title: "German In-Person Training", icon: { kind: "flag", src: "/categories/de.png" }, href: "/#training" },
      {
        id: "en",
        title: "English On-Site Training",
        icon: { kind: "flag", src: "/categories/us.png", square: true },
        href: "/#training",
      },
      { id: "ro", title: "Romanian In-Person Training", icon: { kind: "flag", src: "/categories/ro.png" }, href: "/#training" },
    ] satisfies Category[],
  },

  cta: {
    label: "Start Your Career",
    headingLines: ["Ready to Start Your QEEG-D", "Certification Journey?"],
    action: { label: "Register For Booking", href: `${REGISTER_PATH}/participant` },
  },
};

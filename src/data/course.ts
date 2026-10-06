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

/** The chosen package, or undefined while none is picked. */
export function getPlan(id: string | undefined) {
  return plans.find((p) => p.id === id);
}

export function formatPrice(amount: number) {
  return `${amount} EUR`;
}

export type CourseFact = { label: string; value: string; icon: "start" | "end" | "level" | "location" };

export type Mentor = {
  id: string;
  name: string;
  role: string;
  image: string;
  /** Short intro paragraphs for the speaker page. */
  bio: string[];
  /** What the speaker covers in the mentoring programme. */
  focus: string[];
};

export const SPEAKERS_PATH = `${COURSE_PATH}/speakers`;

export type Category = {
  id: string;
  title: string;
  /** A glyph from the icon set, or a flag image. */
  icon: { kind: "cap" } | { kind: "users" } | { kind: "flag"; src: string };
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
    // The first four are from Paper. The last four are fictitious placeholders until IFEN
    // supplies its real speaker list; their photos are free-licence Unsplash images
    // (photo-1758691461530, -1758685848602, -1739484264725, -1573496527892).
    people: [
      {
        id: "mark-thompson",
        name: "Mark Thompson",
        role: "Licensed Clinical Psychologist",
        image: "/mentors/mark-thompson.jpg",
        bio: [
          "Mark has worked with qEEG-guided neurofeedback in outpatient psychology for over fifteen years, mostly with adults living with anxiety, attention difficulties and sleep problems.",
          "In the mentoring programme, Mark reviews case histories with participants and shows how assessment findings turn into a protocol a client can actually follow.",
        ],
        focus: ["Clinical intake and case formulation", "Protocol planning from qEEG findings", "Tracking progress across sessions"],
      },
      {
        id: "sarah-lee",
        name: "Sarah Lee",
        role: "Behavioral Health Specialist",
        image: "/mentors/sarah-lee.jpg",
        bio: [
          "Sarah combines neurofeedback with behavioural therapy in an integrated care team, working with children, adolescents and their families.",
          "Mentoring with Sarah covers session structure, client communication and how to set realistic training goals with families.",
        ],
        focus: ["Neurofeedback with children and adolescents", "Working with parents and care teams", "Session structure and goal setting"],
      },
      {
        id: "james-rodriguez",
        name: "James Rodriguez",
        role: "Certified BCIA Mentor & Therapist",
        image: "/mentors/james-rodriguez.jpg",
        bio: [
          "James is a BCIA-certified mentor who has guided many practitioners through their certification hours, alongside his own therapy practice.",
          "The sessions focus on the practical requirements of BCIA certification and on building confidence with live recordings.",
        ],
        focus: ["BCIA mentoring hours and documentation", "Live recording practice", "Artifact recognition"],
      },
      {
        id: "lena",
        name: "Lena",
        role: "Cognitive Behavioral Therapist",
        image: "/mentors/lena.jpg",
        bio: [
          "Lena is a cognitive behavioural therapist who uses neurofeedback as part of structured treatment plans for mood and stress-related conditions.",
          "She helps participants connect neurofeedback training with established therapeutic frameworks.",
        ],
        focus: ["Integrating neurofeedback with CBT", "Stress and mood regulation", "Client psychoeducation"],
      },
      {
        id: "klaus-brenner",
        name: "Dr. Klaus Brenner",
        role: "Neurologist & qEEG Supervisor",
        image: "/mentors/klaus-brenner.jpg",
        bio: [
          "Klaus is a neurologist with a long clinical background in EEG diagnostics who now supervises qEEG interpretation for practitioners in training.",
          "Klaus walks participants through brain maps line by line, with an emphasis on medical red flags and when to refer.",
        ],
        focus: ["Clinical EEG and qEEG interpretation", "Recognising findings that need referral", "Medication effects on the EEG"],
      },
      {
        id: "anna-lindqvist",
        name: "Dr. Anna Lindqvist",
        role: "Neuroscience Researcher",
        image: "/mentors/anna-lindqvist.jpg",
        bio: [
          "Anna researches brain oscillations and learning, and teaches the scientific foundations behind neurofeedback.",
          "In mentoring, Anna helps participants read the research critically and explain the evidence base to clients and colleagues.",
        ],
        focus: ["Neurophysiology of brain rhythms", "Reading and evaluating research", "Normative databases and their limits"],
      },
      {
        id: "henrik-albers",
        name: "Prof. Henrik Albers",
        role: "Clinical Neurophysiologist",
        image: "/mentors/henrik-albers.jpg",
        bio: [
          "Henrik has taught clinical neurophysiology for many years and has trained generations of EEG technicians and clinicians.",
          "Henrik leads the advanced sessions on source analysis, connectivity measures and complex case reviews.",
        ],
        focus: ["Connectivity and source analysis", "Advanced case reviews", "QEEG-D board preparation"],
      },
      {
        id: "amara-okafor",
        name: "Dr. Amara Okafor",
        role: "Neurofeedback Practitioner",
        image: "/mentors/amara-okafor.jpg",
        bio: [
          "Amara runs a neurofeedback practice and mentors newly certified practitioners as they set up their own clinical work.",
          "The sessions cover the practical side of everyday practice, from equipment and electrode placement to documentation.",
        ],
        focus: ["Electrode placement and signal quality", "Setting up a neurofeedback practice", "Documentation and reporting"],
      },
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
      { id: "en", title: "English On-Site Training", icon: { kind: "flag", src: "/categories/us.svg" }, href: "/#training" },
      { id: "ro", title: "Romanian In-Person Training", icon: { kind: "flag", src: "/categories/ro.png" }, href: "/#training" },
    ] satisfies Category[],
  },

  cta: {
    label: "Start Your Career",
    headingLines: ["Ready to Start Your QEEG-D", "Certification Journey?"],
    action: { label: "Register For Booking", href: `${REGISTER_PATH}/participant` },
  },
};

export function getMentor(id: string) {
  return course.mentors.people.find((m) => m.id === id);
}

// ---------- Registration flow ----------

export const LMS_PATH = "/lms";

export type PaymentMethodId = "transfer" | "card" | "stripe" | "paypal";

export const paymentMethods: { id: PaymentMethodId; label: string }[] = [
  { id: "transfer", label: "Transfer" },
  { id: "card", label: "Card" },
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
];

export function isPaymentMethod(value: unknown): value is PaymentMethodId {
  return paymentMethods.some((m) => m.id === value);
}

export function getPaymentMethod(id: string | undefined) {
  return paymentMethods.find((m) => m.id === id);
}

/** Two decimals for the order summary and pay button, as drawn in Paper ("150.00 EUR"). */
export function formatAmount(amount: number) {
  return `${amount.toFixed(2)} EUR`;
}

export const registration = {
  heading: "Register for the Webinar",
  steps: [
    { slug: "participant", label: "Participant", title: "Insert Your Info" },
    { slug: "billing", label: "Billing", title: "Insert Your Billing Info" },
    { slug: "review", label: "Review & Pay", title: "Review & Confirm" },
  ] as const,
  // Placeholder from Paper; the real course number comes from the booking system.
  courseNumber: "WEB-120726-EH",
  salutations: ["Ms.", "Mr.", "Mx.", "Dr.", "Prof."],
  countries: [
    "Austria (AT)",
    "Belgium (BE)",
    "Czechia (CZ)",
    "Denmark (DK)",
    "Finland (FI)",
    "France (FR)",
    "Germany (DE)",
    "Ireland (IE)",
    "Italy (IT)",
    "Luxembourg (LU)",
    "Netherlands (NL)",
    "Norway (NO)",
    "Poland (PL)",
    "Portugal (PT)",
    "Romania (RO)",
    "Spain (ES)",
    "Sweden (SE)",
    "Switzerland (CH)",
    "United Kingdom (GB)",
    "United States (US)",
  ],
  defaultCountry: "Germany (DE)",
  notesHint:
    "When booking an internship or supervision, please let us know the date and the instructor. To redeem a discount code, enter it here.",
};

export type StepSlug = (typeof registration.steps)[number]["slug"];

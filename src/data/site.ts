// Site-wide content. Copy is taken from the Paper file "Final Home Page".

export const contact = {
  phone: "+49 (89) 2000 299 66",
  phoneHref: "tel:+4989200029966",
  email: "info@neurofeedback-info.de",
};

export type Language = { code: string; label: string; name: string; flag: string };

// Paper shows the Spanish flag on "EL" and a tricolour on "ES"; mapped correctly here.
export const languages: Language[] = [
  { code: "en", label: "EN", name: "English", flag: "/flags/en.png" },
  { code: "de", label: "DE", name: "Deutsch", flag: "/flags/de.png" },
  { code: "es", label: "ES", name: "Español", flag: "/flags/es.png" },
  { code: "el", label: "EL", name: "Ελληνικά", flag: "/flags/el.svg" },
];

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Course Booking",
    href: "/#training",
    children: [
      { label: "Course Dates", href: "/#training" },
      { label: "Certification Path", href: "/#certification" },
      { label: "Training Locations", href: "/#locations" },
    ],
  },
  {
    label: "Neurofeedback",
    href: "/#about",
    children: [
      { label: "What Is Neurofeedback", href: "/#about" },
      { label: "Benefits", href: "/#benefits" },
    ],
  },
  {
    label: "IFEN",
    href: "/#board",
    children: [
      { label: "Board Members", href: "/#board" },
      { label: "Partners", href: "/#partners" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  { label: "Shop", href: "#" },
  { label: "Therapist List", href: "#" },
  { label: "Blog", href: "#", children: [{ label: "Latest Articles", href: "#" }] },
];

export const hero = {
  trust: "Trusted by 500+ practitioners",
  avatars: ["/hero/avatar-1.jpg", "/hero/avatar-2.jpg", "/hero/avatar-3.jpg"],
  titleLines: ["The Institute For", "EEG-Neurofeedback"],
  subline: "Over 20 years of experience in clinical neurofeedback training & bio-regulatory science.",
  cta: { label: "Explore Courses", href: "#training" },
  video: { webm: "/hero/hero.webm", mp4: "/hero/hero.mp4", poster: "/hero/hero-poster.jpg" },
};

export type AboutStat = { value: string; text: string; icon: "users" | "timer"; tone: "lime" | "sand" };

export const about = {
  label: "About Us",
  heading:
    "We train physicians, therapists and researchers in a method that is scientifically grounded, clinically proven and still far too little known.",
  // Paper repeats "Workshops and webinars delivered" after each sentence; trimmed as a copy slip.
  stats: [
    { value: "300+", text: "Workshops and webinars delivered worldwide.", icon: "users", tone: "lime" },
    { value: "25+", text: "Years of online neurofeedback experience.", icon: "timer", tone: "sand" },
  ] satisfies AboutStat[],
  image: {
    src: "/about/metric-tile.jpg",
    alt: "A practitioner wearing an EEG electrode cap works at a computer showing a brain visualisation.",
  },
  cta: { label: "Course Overview", href: "#certification" },
};

export type CertModule = { title: string; icon: "brain" | "pulse" | "chip" };

export const certification = {
  label: "Your Path to Certification",
  // Two phrases that wrap as units, so the break lands after "Certified" without a <br>.
  headingLines: ["How to Become a Certified", "Neurofeedback Therapist"],
  // Paper spells module 2 "Practicium"; corrected to "Practicum".
  modules: [
    { title: "Intensive Course", icon: "brain" },
    { title: "Practicum", icon: "pulse" },
    { title: "Supervision", icon: "chip" },
  ] satisfies CertModule[],
  final: {
    title: "Examination & Certification",
    text: "Conducted online or in person. Upon successful completion, you receive the accredited certificate as a Certified Neurofeedback Therapist.",
  },
  cta: { label: "Check Module 1", href: "#training" },
};

export type Course = { title: string; duration: string; location: string; href: string; image: { src: string; alt: string } };

const courseImage = {
  src: "/training/course.jpg",
  alt: "A practitioner fits an EEG electrode cap on a seated trainee.",
};

// Paper shows the same course four times; swap in real dates and booking links when available.
export const training = {
  label: "Our Latest Courses & Webinars", // Paper: "Our Lates Courses & Webiners"
  heading: "Upcoming Training & Education Dates",
  courses: [
    { title: "MODULE 1 — Certified Neurofeedback Therapist", duration: "5 Days", location: "Munich", href: "#", image: courseImage },
    {
      title: "BCIA Mentoring, QEEG Mentoring for QEEG-D Certification",
      duration: "Flexible",
      location: "After Election", // Paper copy; likely means "by arrangement"
      href: "/courses/bcia-qeeg-mentoring",
      image: courseImage,
    },
    { title: "MODULE 1 — Certified Neurofeedback Therapist", duration: "5 Days", location: "Munich", href: "#", image: courseImage },
    { title: "MODULE 1 — Certified Neurofeedback Therapist", duration: "5 Days", location: "Munich", href: "#", image: courseImage },
  ] satisfies Course[],
  cta: { label: "View All Dates", href: "#" },
};

export type BoardMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  href: string;
  image: { src: string; alt: string };
};

// Paper only has role and bio for Thomas Feiner; the others reuse that copy until IFEN supplies theirs.
const boardPeople = [
  { slug: "feiner", name: "Thomas Feiner", image: "/board/member-1.png" },
  { slug: "chiarenza", name: "Prof. Giuseppe Chiarenza", image: "/board/member-2.png" },
  { slug: "garner", name: "Dr. Christoph Garner", image: "/board/member-3.png" },
];

// The carousel needs more than one view's worth of cards: the three people repeat until the full roster arrives.
const BOARD_REPEATS = 3;

export const board = {
  label: "Our Board Members",
  heading: "Management and clinical-scientific advisory board of the IFEN",
  members: Array.from({ length: BOARD_REPEATS }, (_, round) =>
    boardPeople.map(
      (p): BoardMember => ({
        id: `${p.slug}-${round + 1}`,
        name: p.name,
        role: "Director of IFEN",
        bio: `${p.name} has been working in the field of neurofeedback and EEG-based brain diagnostics for more than 20 years.`,
        href: "#",
        image: { src: p.image, alt: `Portrait of ${p.name}` },
      }),
    ),
  ).flat(),
};

export type BenefitItem = { id: string; title: string; text: string };

// Paper only has copy for DEEPEN. The other three lines are drafts derived from the
// section heading; replace them once IFEN supplies the final text.
export const benefits = {
  label: "Discount Offer",
  heading: "Graduates of External Basic Courses Can Now Also Benefit From Our Repeat Participant Discount.",
  items: [
    { id: "deepen", title: "Deepen", text: "You will enhance your knowledge in the field of neurofeedback to an advanced level." },
    { id: "benefit", title: "Benefit", text: "Your basic course counts, even if you completed it outside IFEN." },
    { id: "learn", title: "Learn", text: "You build on what you already know with IFEN's advanced training modules." },
    { id: "save", title: "Save", text: "You pay the reduced repeat participant rate on your next IFEN course." },
  ] satisfies BenefitItem[],
};

export const presentation = {
  label: "Presentation",
  headingLines: ["See How We Teach Neurofeedback", "In Our Institute"],
  // Background still from Paper; the film is IFEN's own German-language course presentation.
  poster: "/video/poster.jpg",
  video: { src: "/video/presentation.mp4", lang: "de", title: "Neurofeedback-Ausbildung: zertifizierter Neurofeedback-Therapeut IFEN" },
};

export type LocationCity = {
  name: string;
  /** Index into germanyDots, nearest dot to the real lat/lon. */
  dot: number;
  /** Photo for the stamp; null renders a neutral placeholder. */
  photo: string | null;
  /** Stamp's top-left in the 796×694.5 map stage (Paper stamp slots, map at 132,20). */
  slot: readonly [number, number];
};

// Paper reads "Our Training location’s Are"; apostrophe removed. Paper also doubles
// the Berlin and Munich stamps (spelled "Munic") and scatters 8 pins, so each city
// now has one pin at its real position and takes the Paper stamp slot nearest to it.
// Hamburg's photo is broken in Paper: placeholder until IFEN supplies one.
export const locations = {
  label: "Our Locations",
  headingLines: ["Our Training Locations Are", "Across 16 States In Germany"],
  cities: [
    { name: "Hamburg", dot: 18, photo: null, slot: [188, 0] },
    { name: "Berlin", dot: 60, photo: "/locations/berlin.jpg", slot: [542, 45] },
    { name: "Cologne", dot: 110, photo: "/locations/cologne.jpg", slot: [0, 210.5] },
    { name: "Munich", dot: 198, photo: "/locations/munich.jpg", slot: [524, 626.5] },
  ] satisfies LocationCity[],
  cta: { label: "View All Venues", href: "#" },
};

export type Partner = { name: string; /** Decorative in the card: the visible name already labels the link. */ logo: string; href: string };

// Paper fixes: label "Partnets" → "Partners"; the second card paired the GNI name with
// the BCIA logo, so it now names BCIA (full name as printed on its logo). GNI keeps its
// own card. The intro line is copied from Certification in Paper; replace once IFEN
// supplies partner copy.
export const partners = {
  label: "Partners",
  headingLines: ["Watch Our Proud", "Partners Of IFEN"],
  intro:
    "Conducted online or in person. Upon successful completion, you receive the accredited certificate as a Certified Neurofeedback Therapist.",
  items: [
    { name: "The BED eV", logo: "/partners/bed-ev.png", href: "#" },
    {
      name: "Biofeedback Certification International Alliance - BCIA",
      logo: "/partners/bcia.png",
      href: "#",
    },
    { name: "Neurological Rehabilitation Center NEPSA", logo: "/partners/nepsa.png", href: "#" },
    { name: "Medical Facilities In The Upper Palatinate District", logo: "/partners/medbo.png", href: "#" },
    { name: "Global Neurofeedback Initiative - GNI", logo: "/partners/gni.png", href: "#" },
    {
      name: "The Universidad Pontificia de Salamanca",
      logo: "/partners/upsa-salamanca.png",
      href: "#",
    },
    {
      name: "San Valero Foundation A Non-Profit Educational Institution",
      logo: "/partners/san-valero.png",
      href: "#",
    },
    {
      name: "The University of Porto is an Internationally Recognized Public University.",
      logo: "/partners/uporto.png",
      href: "#",
    },
  ] satisfies Partner[],
};

export type Testimonial = { name: string; role: string; quote: string };

// Paper repeats Jörn Guido's card in all three rows; it appears once here. The names,
// roles and quotes are Paper's and read as sample copy (e.g. "Software Engineer",
// "Web Developer"); swap in real participant quotes before launch.
export const testimonials = {
  label: "Testimonial",
  headingLines: ["This is What Participants in", "Our Courses Say"],
  items: [
    { name: "Paul Turner", role: "Software Engineer", quote: "The collaborative sessions provided a great platform to learn from my peers." },
    { name: "Sofia Reyes", role: "Marketing Strategist", quote: "The insights shared during the webinars were eye-opening and changed my approach to strategy." },
    { name: "Jörn Guido", role: "Occupational Therapist", quote: "The course structure was exceptionally clear. Module 1 gave me confidence to start practicing immediately." },
    { name: "Maya Kim", role: "Graphic Designer", quote: "The hands-on projects allowed me to apply my skills in real-time, which was invaluable." },
    { name: "Michael Smith", role: "Nurse", quote: "The interactive discussions enhanced my understanding significantly. I loved every moment!" },
    { name: "Alice Brown", role: "Psychologist", quote: "The practical sessions were invaluable. I felt well-prepared for real-world challenges." },
    { name: "Tina Kumar", role: "Speech Therapist", quote: "The resources provided were comprehensive. I could easily relate the theory to practice." },
    { name: "David Wilson", role: "Physical Therapist", quote: "Networking with peers was a great bonus. I felt supported throughout the learning journey." },
    { name: "Mia Kwan", role: "Graphic Designer", quote: "The hands-on projects in this course really helped me enhance my skills and build my portfolio." },
    { name: "Sophia Reed", role: "Data Analyst", quote: "The real-world case studies were invaluable and made the learning process much more engaging." },
    { name: "Tom Baker", role: "Web Developer", quote: "I appreciated the community support and feedback throughout the course. It made a big difference." },
  ] satisfies Testimonial[],
};

// Paper fixes: button "View All vanues" → "View All Venues". The label reads
// "Presentation" in Paper, copied from the Video section; kept until IFEN supplies one.
export const cta = {
  label: "Presentation",
  headingLines: ["Your Neurofeedback Career", "Start Here"],
  image: "/cta/background.jpg",
  action: { label: "View All Venues", href: "#locations" },
};

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

// Links point at the matching section where the home page has one; the rest are
// placeholders until those pages exist. Social profile URLs are not in Paper.
export const footer = {
  blurb:
    "The Institute for EEG Neurofeedback trains physicians, therapists and researchers in scientifically grounded neurofeedback, QEEG brain mapping and bio-regulatory practice.",
  badges: [
    { src: "/badges/isnr-2025.png", alt: "Official 2025 individual member of the ISNR" },
    { src: "/badges/bcia.png", alt: "BCIA, Biofeedback Certification International Alliance" },
  ],
  columns: [
    {
      title: "Service & Help",
      links: [
        { label: "Therapist list", href: "#" },
        { label: "Learning portal", href: "#" },
        { label: "Contact Support", href: "#" },
        { label: "FAQ - Training questions", href: "#" },
        { label: "Newsletter signup", href: "#" },
        { label: "Downloads", href: "#" },
      ],
    },
    {
      title: "Organizational",
      links: [
        { label: "CE Credits & Points", href: "#" },
        { label: "Funding Opportunities", href: "#" },
        { label: "Workshop Places Germany", href: "/#locations" },
        { label: "Repeater Discount details", href: "/#benefits" },
        { label: "Accreditation guidelines", href: "/#certification" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Imprint", href: "#" },
        { label: "General terms & conditions", href: "#" },
        { label: "Cancellation terms", href: "#" },
        { label: "Data Protection Policy", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    },
    {
      title: "My IFEN",
      links: [
        { label: "Login portal", href: "#" },
        { label: "About the institute", href: "/#about" },
        { label: "Lecturers overview", href: "/#board" },
        { label: "Advisory Board members", href: "/#board" },
        { label: "Research partnerships", href: "/#partners" },
      ],
    },
  ] satisfies FooterColumn[],
  copyright: "2026 by IFEN Neuroscience",
  socials: [
    { label: "IFEN on Facebook", icon: "facebook", href: "#" },
    { label: "IFEN on X", icon: "x", href: "#" },
    { label: "IFEN on Instagram", icon: "instagram", href: "#" },
  ] as const,
};

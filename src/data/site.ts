// Site-wide content. Copy is taken from the Paper file "Final Home Page".

import {
  BCIA_PATH,
  BRAINAVATAR_PATH,
  ISF_PATH,
  PBM_PATH,
  QEEG_COURSES_PATH,
  SUPERVISION_PATH,
  WEBINARS_PATH,
} from "./booking/paths";
import { LISTING_PATH } from "./coursePage";
import {
  IFEN100_PATH,
  MODULE1_PATH,
  MODULE2_PATH,
  MODULE3_PATH,
  MODULE4_PATH,
  MODULES_PATH,
} from "./courses/modulePaths";
import { ABOUT_PATH, LECTURERS_PATH, TRAINING_PATH } from "./ifen/paths";
import { BLOG_PATH } from "./blog/paths";
import { AREAS_PATH, TOPICS_PATH, WHAT_IS_PATH } from "./neurofeedback/shared";

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
    href: LISTING_PATH,
    children: [
      { label: "Course Dates", href: LISTING_PATH },
      { label: "Certified Neurofeedback Therapist", href: MODULES_PATH },
      { label: "Module 1, Intensive Course", href: MODULE1_PATH },
      { label: "Module 2, Internship", href: MODULE2_PATH },
      { label: "Module 3, Supervision", href: MODULE3_PATH },
      { label: "Module 4, Examination", href: MODULE4_PATH },
      { label: "IFEN 100, Exam Mentoring", href: IFEN100_PATH },
      { label: "QEEG Courses", href: QEEG_COURSES_PATH },
      { label: "ISF Neurofeedback", href: ISF_PATH },
      { label: "Supervision, Internship and Mentoring", href: SUPERVISION_PATH },
      { label: "BrainAvatar", href: BRAINAVATAR_PATH },
      { label: "BCIA Certification", href: BCIA_PATH },
      { label: "Photobiomodulation", href: PBM_PATH },
      { label: "Webinars", href: WEBINARS_PATH },
    ],
  },
  {
    label: "Neurofeedback",
    href: WHAT_IS_PATH,
    children: [
      { label: "What Is Neurofeedback", href: WHAT_IS_PATH },
      { label: "Topics", href: TOPICS_PATH },
      { label: "Areas of Application", href: AREAS_PATH },
    ],
  },
  {
    label: "IFEN",
    href: ABOUT_PATH,
    children: [
      { label: "About IFEN", href: ABOUT_PATH },
      { label: "Lecturers", href: LECTURERS_PATH },
      { label: "Training Courses in Neurofeedback", href: TRAINING_PATH },
    ],
  },
  { label: "Shop", href: "#" },
  { label: "Therapist List", href: "/therapists" },
  { label: "Blog", href: BLOG_PATH },
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
  cta: { label: "Check Module 1", href: "/courses/module-1" },
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
    { title: "Module 1: Certified Neurofeedback Therapist", duration: "5 Days", location: "Munich", href: "/courses/module-1", image: courseImage },
    {
      title: "BCIA Mentoring, QEEG Mentoring for QEEG-D Certification",
      duration: "Flexible",
      location: "After Election", // Paper copy; likely means "by arrangement"
      href: "/courses/bcia-qeeg-mentoring",
      image: courseImage,
    },
    {
      title: "Webinar: Stress, Pain and the Nervous System",
      duration: "60 Minutes",
      location: "Online",
      href: "/courses/webinar-stress-pain",
      image: courseImage,
    },
    {
      title: "QEEG for Your Practice",
      duration: "20+ Hours",
      location: "Online",
      href: "/courses/qeeg-for-your-practice",
      image: courseImage,
    },
  ] satisfies Course[],
  cta: { label: "View All Dates", href: "/courses" },
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
  heading: "Management and Clinical-Scientific Advisory Board of the IFEN",
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
  photo: string;
  /** Stamp's top-left in the 877×694.5 map stage (Paper stamp slots, map at 172.5,20). */
  slot: readonly [number, number];
};

// Paper reads "Our Training location’s Are"; apostrophe removed. Paper also doubles
// the Berlin and Munich stamps (spelled "Munic") and scatters 8 pins, so each city
// now has one pin at its real position and takes the Paper stamp slot nearest to it.
// Hamburg's photo is broken in Paper: placeholder until IFEN supplies one.
// Paper shows six stamps: Berlin and Munich appear twice, each with a different landmark.
// Kept as designed (Paper's "Munic" corrected); order is top to bottom for the drop-in stagger.
export const locations = {
  label: "Our Locations",
  headingLines: ["Our Training Locations Are", "Across 16 States In Germany"],
  cities: [
    { name: "Berlin", photo: "/locations/berlin-cathedral.jpg", slot: [228.5, 0] },
    { name: "Munich", photo: "/locations/munich.jpg", slot: [582.5, 45] },
    { name: "Cologne", photo: "/locations/cologne.jpg", slot: [40.5, 210.5] },
    { name: "Berlin", photo: "/locations/berlin.jpg", slot: [715, 360] },
    { name: "Munich", photo: "/locations/munich-town-hall.jpg", slot: [86.5, 548.5] },
    { name: "Hamburg", photo: "/locations/hamburg.jpg", slot: [564.5, 626.5] },
  ] satisfies LocationCity[],
  /** Paper's pins, centre in the 532×657 map. */
  pins: [
    [233, 145],
    [297, 179],
    [393, 245],
    [138, 278],
    [234, 278],
    [329, 312],
    [170, 412],
    [361, 512],
  ] as const,
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
        { label: "Therapist List", href: "/therapists" },
        { label: "Learning Portal", href: "#" },
        { label: "Contact Support", href: "#" },
        { label: "FAQ - Training Questions", href: "#" },
        { label: "Newsletter Signup", href: "#" },
        { label: "Downloads", href: "#" },
      ],
    },
    {
      title: "Organizational",
      links: [
        { label: "CE Credits & Points", href: "#" },
        { label: "Funding Opportunities", href: "#" },
        { label: "Workshop Places Germany", href: "/#locations" },
        { label: "Repeater Discount Details", href: "/#benefits" },
        { label: "Accreditation Guidelines", href: "/#certification" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Imprint", href: "#" },
        { label: "General Terms & Conditions", href: "#" },
        { label: "Cancellation Terms", href: "#" },
        { label: "Data Protection Policy", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    },
    {
      title: "My IFEN",
      links: [
        { label: "Login Portal", href: "#" },
        { label: "About the Institute", href: ABOUT_PATH },
        { label: "Lecturers Overview", href: LECTURERS_PATH },
        { label: "Advisory Board Members", href: "/#board" },
        { label: "Research Partnerships", href: "/#partners" },
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

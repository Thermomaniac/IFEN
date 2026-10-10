// Quantitative EEG (QEEG) for Your Practice, the on-demand masterclass. Content from
// the live course page neurofeedback-info.de/termine-kursbuchung-seminare/qeeg-kurse-m/courses/1182-quantitative-eeg-qeeg-for-your-practice-1.html.

import { REGISTER_PATH } from "../course";
import {
  CONTACT_EMAIL,
  LISTING_PATH,
  type CategoriesContent,
  type CourseHeroContent,
  type CtaContent,
  type FaqContent,
  type FeaturesContent,
  type InstructorContent,
  type OverviewContent,
  type RolesContent,
  type SpeakersContent,
} from "../coursePage";
import { ALL_OFFERS, FEINER, LIVE } from "./shared";

export const QEEG_PATH = "/courses/qeeg-for-your-practice";
const BOOK = { label: "Register For Booking", href: `${REGISTER_PATH}/participant` };

export const qeeg = {
  meta: {
    title: "Quantitative EEG (QEEG) for Your Practice | IFEN",
    description:
      "An on-demand QEEG masterclass: more than 20 hours of expert-led video instruction with lifetime access. Learn to turn complex brain data into clinical decisions.",
  },

  hero: {
    title: "Quantitative EEG (QEEG) for Your Practice",
    breadcrumb: [
      { label: "Course Booking", href: LISTING_PATH },
      { label: "QEEG Courses" },
      { label: "QEEG for Your Practice" },
    ],
    badge: "On-demand professional training",
    description:
      "Transform complex brain data into clinically meaningful decisions with an expert-led, on-demand QEEG masterclass.",
    highlights: [
      { value: "20+ hours", label: "Expert instruction" },
      { value: "4-day", label: "Video masterclass" },
      { value: "Lifetime", label: "Access to all content" },
    ],
    booking: {
      code: "QEEG-EN",
      prices: [
        { label: "Standard price", amount: 995 },
        { label: "Regional pricing", amount: 550 },
      ],
      facts: [
        { label: "Start", value: "Flexible", icon: "start" },
        { label: "End", value: "Flexible", icon: "end" },
        { label: "Level", value: "Flexible", icon: "level" },
        { label: "Location", value: "Online · English", icon: "location" },
      ],
      cta: BOOK,
    },
  } satisfies CourseHeroContent,

  overview: {
    label: "QEEG Masterclass",
    heading: "Master the Art of QEEG Interpretation",
    paragraphs: [
      "Unlock the power of complex brain data with our expert-led, on-demand QEEG masterclass. Learn how to analyze quantitative EEG results effectively and translate them into clinically meaningful decisions to enhance patient care and outcomes.",
    ],
    actions: [
      { label: "Book Your Place", href: BOOK.href },
      { label: "View FAQ", href: "#faq" },
    ],
    aside: {
      heading: "IFEN · Institute for EEG-Neurofeedback",
      rows: [
        { label: "Format", value: "4-Day Video Masterclass", icon: "format" },
        { label: "Duration", value: "20+ Hours", icon: "duration" },
        { label: "Access", value: "Lifetime", icon: "access" },
        { label: "Instructor", value: "Dr. Ismael Castillo Reyes, Ph.D. in Neuroscience", icon: "instructor" },
        { label: "Institution", value: "Ponce Health Sciences University · Puerto Rico", icon: "institution" },
      ],
    },
  } satisfies OverviewContent,

  format: {
    label: "The format",
    heading: "Expert QEEG Training That Fits Your Schedule",
    items: [
      { heading: "100% Asynchronous", text: "Learn whenever it fits your schedule.", icon: "clock" },
      { heading: "4-Day Video Masterclass", text: "More than 20 hours of expert instruction.", icon: "video" },
      { heading: "Expert-Led", text: "Learn from an internationally recognized QEEG expert.", icon: "star" },
      { heading: "Lifetime Access", text: "Return to the content whenever you need it.", icon: "calendar" },
    ],
  } satisfies FeaturesContent,

  beyond: {
    label: "Beyond the brain map",
    heading: "QEEG Data Is Only Valuable When You Know How to Interpret It",
    intro: [
      "Move beyond symptoms and isolated numbers. Learn how experienced clinicians recognize meaningful patterns and translate findings into better-informed clinical decisions.",
    ],
    numbered: true,
    items: [
      {
        heading: "EEG Activity and QEEG Patterns",
        text: "Build a structured understanding of EEG activity, brain maps and clinically relevant QEEG patterns.",
      },
      {
        heading: "Brain Activity Basics",
        text: "From recording brain activity to understanding what the data may reveal about brain function.",
      },
      {
        heading: "Neuroplasticity and Cognitive Ethics",
        text: "You delve into complex topics such as neuroplasticity, cognitive enhancement, and the ethical implications of neurofeedback.",
      },
    ],
  } satisfies FeaturesContent,

  develop: {
    label: "What you will develop",
    heading: "See More. Interpret Better. Decide With Confidence.",
    image: {
      src: "/course/qeeg-clinician.jpg",
      alt: "A clinician studying QEEG brain maps at her desk in the evening.",
    },
    items: [
      {
        eyebrow: "Understand",
        heading: "See beyond symptoms",
        text: "Develop a deeper understanding of brain function and the patterns behind a patient's clinical presentation.",
      },
      {
        eyebrow: "Interpret",
        heading: "Turn data into meaning",
        text: "Approach QEEG findings systematically and translate complex information into clinically relevant insights.",
      },
      {
        eyebrow: "Apply",
        heading: "Strengthen clinical decisions",
        text: "Build greater confidence when connecting assessment findings with individualized clinical and neurofeedback strategies.",
      },
    ],
  } satisfies FeaturesContent,

  flexible: {
    label: "Flexible professional learning",
    heading: "Advanced Learning, Without the Timetable.",
    intro: [
      "A focused learning experience for clinicians who want to deepen their QEEG knowledge without depending on fixed dates or live attendance.",
    ],
    items: [
      {
        heading: "Complete workshop recordings",
        text: "Access the full educational content of the original four-day workshop.",
      },
      {
        heading: "Learn at your own pace",
        text: "Pause, revisit and review complex concepts whenever necessary.",
      },
      {
        heading: "More than 20 hours of instruction",
        text: "A comprehensive learning experience, not a short introductory webinar.",
      },
      { heading: "Lifetime access", text: "Use the masterclass as an ongoing professional reference." },
    ],
  } satisfies FeaturesContent,

  instructor: {
    label: "Created and taught by",
    heading: "Dr. Ismael Castillo Reyes",
    name: "Dr. Ismael Castillo Reyes",
    role: "Ph.D. in Neuroscience, Ponce Health Sciences University, Puerto Rico",
    image: "/speakers/ismael-castillo-reyes.jpg",
    paragraphs: [
      "Learn from an experienced neuroscientist and QEEG educator who combines scientific knowledge with clinically relevant interpretation.",
      "The masterclass helps professionals move beyond technical data and develop a structured understanding of brain function, QEEG findings and their clinical relevance.",
    ],
    credentials: ["Ph.D. in Neuroscience", "Ponce Health Sciences University", "Puerto Rico"],
  } satisfies InstructorContent,

  audience: {
    label: "Who it is for",
    heading: "Designed for Clinicians Who Want to Master QEEG Interpretation.",
    roles: [
      { name: "Psychiatrists", image: "/hero/hero-poster.jpg" },
      { name: "Psychologists", image: "/course/program.jpg" },
      { name: "Neurologists", image: "/video/poster.jpg" },
      { name: "Neurofeedback Clinicians", image: "/training/course.jpg" },
      { name: "Physicians", image: "/cta/background.jpg" },
      { name: "Neuroscientists", image: "/about/metric-tile.jpg" },
      { name: "Researchers", image: "/course/qeeg-clinician.jpg" },
      { name: "EEG Technicians", image: "/training/course.jpg" },
      { name: "Brain Health Professionals", image: "/course/program.jpg" },
      { name: "Graduate Students", image: "/about/metric-tile.jpg" },
    ],
  } satisfies RolesContent,

  faq: {
    label: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Is this a live workshop?",
        answer:
          "No. This is an asynchronous video masterclass based on the complete recordings of IFEN's four-day QEEG workshop.",
      },
      {
        question: "How long is the masterclass?",
        answer: "The course contains more than 20 hours of expert-led video instruction.",
      },
      { question: "How long will I have access?", answer: "The masterclass includes lifetime access." },
      {
        question: "Do I need previous QEEG experience?",
        answer:
          "Previous knowledge of EEG, neurofeedback or neuroscience is recommended and will help participants benefit more deeply from the course.",
      },
      {
        question: "Is this suitable for clinical professionals?",
        answer:
          "Yes. It is primarily designed for clinicians and professionals working with brain health, EEG, neurofeedback and neuroscience.",
      },
    ],
    help: {
      heading: "Need help before booking?",
      text: "If you have any questions about the course, registration or payment, our team will be happy to help.",
      email: CONTACT_EMAIL,
    },
  } satisfies FaqContent,

  speakers: {
    label: "Your Speakers",
    heading: "Speaker / Instructors",
    people: [
      FEINER,
      {
        id: "hanelore-branga",
        name: "Hanelore Branga",
        role: "Instructor",
        image: "/speakers/hanelore-branga.jpg",
        href: `${LIVE}/ifen-de/dozenten-m/19-hanelore-branga.html`,
      },
      {
        id: "ismael-castillo-reyes",
        name: "Dr. Ismael J. Castillo-Reyes",
        role: "PhD, QEEG-DL",
        image: "/speakers/ismael-castillo-reyes.jpg",
        href: `${LIVE}/ifen-de/dozenten-m/65-dr-ismael-j-castillo-reyes-phd-qeeg-dl.html`,
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
        id: "en-online",
        title: "English Online Training",
        icon: { kind: "flag", src: "/categories/us.svg" },
        href: `${LIVE}/english-online-training.html`,
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
    label: "20+ Hours · On-Demand Learning · Lifetime Access",
    headingLines: ["Master QEEG Interpretation", "at Your Own Pace"],
    action: { label: "Book your place", href: BOOK.href },
    secondary: { label: "View FAQ", href: "#faq" },
  } satisfies CtaContent,
};

// Pieces shared by the blog pages (index, articles). Post titles, dates, reading times,
// categories and excerpts come from the live German blog, neurofeedback-ifen.com/blog
// (home page and wp-json/wp/v2/posts), translated to English. The source excerpts end
// mid-sentence in "…" and are kept that way. Reading times are the source's Yoast
// "Geschätzte Lesezeit". Only the evidence article has a page here; the other posts link to
// the German original. Posts from April 2026 on have only text-on-image social graphics as
// their featured image, so they use the dotted-brain tile instead of a cropped graphic.

import type { Category } from "../course";
import { LISTING_PATH, type CtaContent } from "../coursePage";
import { ALL_OFFERS } from "../courses/shared";
import { TOPICS_PATH, WHAT_IS_PATH } from "../neurofeedback/shared";
import { BLOG_PATH, EVIDENCE_PATH, LIVE_BLOG } from "./paths";

export { BLOG_PATH, EVIDENCE_PATH, LIVE_BLOG };

export type BlogPost = {
  id: string;
  title: string;
  /** ISO date of first publication. */
  date: string;
  /** Minutes, as the source's reading-time estimate. */
  minutes: number;
  /** The post's first category on the source blog. */
  category: string;
  excerpt: string;
  image?: { src: string; alt: string };
  href: string;
  /** Opens the German original on the live blog. */
  external?: boolean;
};

/** The section's breadcrumb root. */
export const BLOG_CRUMB = { label: "Blog", href: BLOG_PATH };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "20 Jul 2026", from the ISO date alone, so server and client always agree. */
export function formatPostDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export const POSTS = {
  evidence: {
    id: "evidence",
    title: "Measured by the Wrong Yardstick",
    date: "2026-07-20",
    minutes: 12,
    category: "News",
    excerpt:
      "Why neurofeedback should not be judged by the yardstick of pharmacology. Scientifically grounded, critical and practical.",
    image: { src: "/blog/evidence.jpg", alt: "A clinician holding a brain model over a patient health form" },
    href: EVIDENCE_PATH,
  },
  biofeedback: {
    id: "biofeedback",
    title:
      "Two Signals, One Decision. Why Biofeedback and Neurofeedback Are Not the Same in Practice, and Why That Matters",
    date: "2026-06-23",
    minutes: 4,
    category: "News",
    excerpt:
      "In many practices, biofeedback and neurofeedback are mentioned in the same breath. That is understandable: both methods work with physiological signals, both use real-time feedback and both aim to improve self-regulation. But they…",
    image: { src: "/blog/biofeedback.jpg", alt: "" },
    href: `${LIVE_BLOG}/biofeedback-und-neurofeedback`,
    external: true,
  },
  neuromeditation: {
    id: "neuromeditation",
    title: "Meditation Is Not Just Meditation. The EEG Shows Why That Matters.",
    date: "2026-06-18",
    minutes: 3,
    category: "News",
    excerpt:
      "When people say “meditation”, they often mean very different things: focusing on the breath, a mantra, open mindfulness, compassion or deep meditative states. These are different mental processes, and in the EEG these differences become visible.…",
    image: { src: "/blog/neuromeditation.jpg", alt: "" },
    href: `${LIVE_BLOG}/eeg-neuromeditation`,
    external: true,
  },
  photobiomodulation: {
    id: "photobiomodulation",
    title: "Mitochondrial Integrity and Cognitive Longevity: The Scientific Role of Photobiomodulation",
    date: "2026-06-11",
    minutes: 2,
    category: "News",
    excerpt:
      "June is the international “Alzheimer’s & Brain Awareness Month”, a good occasion to take a closer look at a mechanism that still receives little attention in clinical neurofeedback practice: mitochondrial efficiency as a prerequisite for neuronal…",
    image: { src: "/blog/photobiomodulation.jpg", alt: "" },
    href: `${LIVE_BLOG}/photobiomodulation-kognitive-langlebigkeit`,
    external: true,
  },
  moellenkamp: {
    id: "moellenkamp",
    title: "Expert Portrait: Irmgard Möllenkamp. Humanistic Psychotherapy and ISF Precision",
    date: "2026-05-06",
    minutes: 3,
    category: "News",
    excerpt:
      "In the world of neurofeedback there are therapists who apply protocols, and there are pioneers who understand the language of the brain at its deepest frequency. Irmgard Möllenkamp is undoubtedly one of the latter. As a permanent member of our team of lecturers and mentors at…",
    href: `${LIVE_BLOG}/irmgard-moellenkamp-isf-neurofeedback`,
    external: true,
  },
  castilloReyes: {
    id: "castillo-reyes",
    title: "The Bridge Between Data and Therapy: Dr. Ismael J. Castillo-Reyes and the Precision of QEEG Analysis",
    date: "2026-04-17",
    minutes: 4,
    category: "News",
    excerpt:
      "In modern neurophysiology it is no longer enough simply to observe symptoms. To achieve lasting clinical success, we have to understand the underlying neural networks. This requires expertise that goes beyond the mere application of technology; it…",
    href: `${LIVE_BLOG}/ismael-castillo-reyes-qeeg-analyse`,
    external: true,
  },
  brainMonitoring: {
    id: "brain-monitoring",
    title: "Observing Neural Dynamics: Why We Should Stop Guessing",
    date: "2026-04-14",
    minutes: 3,
    category: "News",
    excerpt:
      "In therapeutic practice and in meditation research we often rely on subjective reports. We ask: “How do you feel?” or “Do you notice a change?” This phenomenology is valuable but remains incomplete. The brain is not a static organ but a…",
    href: `${LIVE_BLOG}/brain-monitoring-neurofeedback-messung-statt-raten`,
    external: true,
  },
  fois: {
    id: "fois",
    title: "Expert Portrait: Dr. Silvia Fois. Clear Therapeutic Roadmaps Through Scientific Excellence",
    date: "2026-04-09",
    minutes: 2,
    category: "News",
    excerpt:
      "The Institute for EEG Neurofeedback (IFEN) left the phase of the “expert-centred workshop” behind long ago. We are building a global neuro-ecosystem that combines regulatory depth with the highest clinical precision. In this system, the experienced psychotherapist Dr. Silvia Fois acts as the central “validation anchor”…",
    href: `${LIVE_BLOG}/dr-silvia-fois-neurophysiologische-diagnostik`,
    external: true,
  },
  qeegPractice: {
    id: "qeeg-practice",
    title: "A Modern Practice Wants More Than Diagnoses and Symptoms. It Wants to Understand What Lies Behind Them.",
    date: "2026-04-06",
    minutes: 3,
    category: "News",
    excerpt:
      "For me, QEEG is one of the most exciting methods in applied neuroscience. Why? Because it does not replace the classic EEG but extends it quantitatively: brain activity is evaluated mathematically, for example in terms of frequency distribution, asymmetries and connectivity patterns. This creates a functional perspective on regulation,…",
    href: `${LIVE_BLOG}/qeeg-praxis-diagnostik-hirnaktivitaet-verstehen`,
    external: true,
  },
  rawEeg: {
    id: "raw-eeg",
    title: "“Things Are Never Quite the Way They Seem”: Why True QEEG Expertise Begins With the Raw EEG",
    date: "2026-04-03",
    minutes: 5,
    category: "News",
    excerpt:
      "In more than twenty years of working with the human EEG I have learned a fundamental truth: a high-quality 19-channel system and a colourful brain map are only the beginning. The decisive moment comes much earlier, namely when looking at the…",
    href: `${LIVE_BLOG}/qeeg-interpretation-roh-eeg-expertise`,
    external: true,
  },
  chiarenza: {
    id: "chiarenza",
    title: "Faculty Portrait: Prof. Giuseppe Chiarenza, the Architect of Clinical Electrophysiology",
    date: "2026-04-01",
    minutes: 3,
    category: "News",
    excerpt:
      "At the Institute for EEG Neurofeedback (IFEN) one principle has always held: education is only as strong as its scientific foundation. To truly understand the human brain, we have to stand on the shoulders of those who have spent decades on its…",
    href: `${LIVE_BLOG}/prof-giuseppe-chiarenza-qeeg-erp-portraet`,
    external: true,
  },
  emotionTuner: {
    id: "emotion-tuner",
    title: "Your Emotional Blueprint: From Insight to Action With the “EmotionTuner”",
    date: "2026-03-17",
    minutes: 3,
    category: "News",
    excerpt:
      "In more than twenty years of working with the human brain I have learned a fundamental truth: your brain is not a static machine. It is a living, breathing and constantly evolving landscape full of possibilities. Yet for many people the “black box”…",
    href: `${LIVE_BLOG}/emotiontuner-emotionales-gehirnprofil-bauplan`,
    external: true,
  },
  brodmann: {
    id: "brodmann",
    title: "Korbinian Brodmann and the Brodmann Areas: The Interactive Brodmann Poster",
    date: "2022-09-06",
    minutes: 3,
    category: "General & Insights",
    excerpt:
      "One of the greatest achievements of modern medicine and neuroscience is imaging, the ability to map neuronal activity, known today as brain mapping. The German neuroanatomist and psychiatrist Korbinian Brodmann (1868–1918) was the first to map the human brain.",
    image: { src: "/blog/brodmann.png", alt: "The IFEN Brodmann Areas poster: left and right brain maps with numbered, colour-coded areas" },
    href: `${LIVE_BLOG}/das-interaktive-brodmann-plakat`,
    external: true,
  },
} satisfies Record<string, BlogPost>;

export const RELATED: Record<"blog" | "whatIs" | "topics", Category> = {
  blog: { id: "blog", title: "All Blog Articles", icon: { kind: "brain" }, href: BLOG_PATH },
  whatIs: { id: "what-is", title: "What Is Neurofeedback?", icon: { kind: "pulse" }, href: WHAT_IS_PATH },
  topics: { id: "topics", title: "Neurofeedback Topics", icon: { kind: "brain" }, href: TOPICS_PATH },
};

export { ALL_OFFERS };

export const BLOG_CTA: CtaContent = {
  label: "Neurofeedback Training",
  headingLines: ["Learn Neurofeedback", "at IFEN"],
  action: { label: "View Course Dates", href: LISTING_PATH },
  secondary: { label: "Check Module 1", href: "/courses/module-1" },
};

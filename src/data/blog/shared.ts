// Pieces shared by the blog pages (index, articles). Post titles, dates, reading times,
// categories and excerpts come from the live German blog, neurofeedback-ifen.com/blog
// (home page and wp-json/wp/v2/posts), translated to English. The source excerpts end
// mid-sentence in "…" and are kept that way. Only the evidence article has a page here;
// the other posts link to the German original.

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
  philosophy: {
    id: "philosophy",
    title: "The Philosophy of IFEN",
    date: "2022-08-17",
    minutes: 2,
    category: "Philosophy",
    excerpt:
      "Neurofeedback is a rapidly developing field in medicine. The method has existed for around 50 years. Yet it is still far too little known. And neurofeedback offers a universe of new opportunities and possibilities for healthcare professionals and for people who suffer from life-threatening and life-…",
    href: `${LIVE_BLOG}/philosophie-des-ifen`,
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

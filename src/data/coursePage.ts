// Shared shapes for course detail pages. Each course lives in its own file under
// data/courses so it can later be swapped for a CMS / Shopify product payload.

import type { Category, CourseFact } from "./course";

export type Crumb = { label: string; href?: string };
export type Link = { label: string; href: string };
export type Price = { label: string; amount: number };

export type CourseHeroContent = {
  title: string;
  breadcrumb: Crumb[];
  badge: string;
  /** One or more paragraphs under the title. */
  description: string | string[];
  highlights: { value: string; label: string }[];
  /** Photo on the right under an ink fade, in place of the line pattern (listing hero). */
  image?: string;
  /** The white panel. Omitted on listing pages, which use the hero alone. */
  booking?: {
    /** Course number from the booking system, e.g. "M1-051026-EN". */
    code?: string;
    prices: Price[];
    facts: CourseFact[];
    cta: Link;
  };
};

/** A speaker card. `href` is optional: only some speakers have their own page. */
export type Speaker = { id: string; name: string; role: string; image: string; href?: string };

export type SpeakersContent = { label: string; heading: string; people: Speaker[] };

export type CategoriesContent = { label: string; heading: string; items: Category[] };

export type CtaContent = {
  label: string;
  headingLines: string[];
  text?: string;
  action: Link;
  secondary?: Link;
};

export const CONTACT_EMAIL = "info@neurofeedback-info.de";
export const CONSULTATION_URL = "https://calendly.com/neurofeedback-partner-info/30min";
export const LISTING_PATH = "/courses";

// ---------- Section content ----------

/** Label pill, heading and optional intro paragraphs above every section. */
export type SectionHead = { label: string; heading: string; intro?: string[] };

/** Glyph in the lime circle of an overview fact row. */
export type FactIcon =
  | "format"
  | "duration"
  | "access"
  | "instructor"
  | "institution"
  | "online"
  | "inPerson"
  | "time"
  | "language"
  | "date"
  | "fee";

export type OverviewContent = SectionHead & {
  paragraphs: string[];
  actions: Link[];
  aside: {
    heading: string;
    rows: { label: string; value: string; icon: FactIcon }[];
    /** Contact prompt under the rows. */
    note?: { heading: string; text: string; email: string };
  };
};

export type ArticleIcon = "repeat" | "list" | "venue";

export type Article = {
  /** Optional when the section heading already names the block. */
  heading?: string;
  /** Leads the heading in the `rows` layout. */
  icon?: ArticleIcon;
  paragraphs?: string[];
  /** Rendered as check rows. */
  list?: string[];
  /** Short labels rendered as chips. */
  tags?: string[];
  address?: { name: string; lines: string[] };
};

export type ArticlesContent = SectionHead & { items: Article[] };

export type FeatureIcon = "clock" | "video" | "star" | "calendar";

export type FeaturesContent = SectionHead & {
  /** Show 01, 02 … above each card. */
  numbered?: boolean;
  /** Photo beside the cards, for split layouts. */
  image?: { src: string; alt: string };
  items: { heading: string; text: string; eyebrow?: string; icon?: FeatureIcon }[];
};

/** Professions shown as photo cards. */
export type RolesContent = SectionHead & { roles: { name: string; image: string }[] };

export type CurriculumContent = SectionHead & {
  days: { label: string; tag: string; heading: string; topics: string[] }[];
};

export type PathwayContent = SectionHead & {
  steps: { label: string; heading: string; text?: string; current?: boolean }[];
  note: string;
};

export type InstructorContent = SectionHead & {
  name: string;
  role: string;
  image: string;
  paragraphs: string[];
  credentials?: string[];
};

export type FaqContent = SectionHead & {
  items: { question: string; answer: string }[];
  help: { heading: string; text: string; email: string };
};

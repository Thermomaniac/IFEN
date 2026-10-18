// Shared shapes for course detail pages. Each course lives in its own file under
// data/courses so it can later be swapped for a CMS / Shopify product payload.

import type { Category, CourseFact } from "./course";

export type Crumb = { label: string; href?: string };
export type Link = { label: string; href: string };
export type Price = { label: string; amount: number };

export type CourseHeroContent = {
  /** "\n" marks the design's line break from 48rem. */
  title: string;
  /** Paper's 599 measure for a listing hero whose title sets on two lines. */
  wide?: boolean;
  breadcrumb: Crumb[];
  badge: string;
  /** Person heroes (therapist profile): a 92×100 portrait beside the title. */
  portrait?: { src: string; alt: string };
  /** Line under the title, e.g. practice and country, with an optional flag after it. */
  subline?: { parts: string[]; flag?: { src: string; alt: string } };
  /** One or more paragraphs under the title. */
  description: string | string[];
  highlights: { value: string; label: string }[];
  /** Photo on the right under an ink fade, in place of the line pattern (listing hero). */
  image?: string;
  /** The white panel. Omitted on listing pages, which use the hero alone. */
  booking?: {
    /** Course number from the booking system, e.g. "M1-051026-EN". */
    code?: string;
    /** Replaces "Select your plan" / "Course fee" above the price (therapist profiles). */
    eyebrow?: string;
    /** Left out where the price lives in the dates and the registration (Module 1). */
    prices?: Price[];
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
  /** Further reading and booking links under the copy (content pages). */
  links?: Link[];
};

export type ArticlesContent = SectionHead & {
  items: Article[];
  /** `rows`: lead each row with 01, 02 … in place of an icon. */
  numbered?: boolean;
  /** `media`: the photo beside the copy. */
  image?: { src: string; alt: string };
  /** `profile`: the person card (portrait, name, role) beside the copy. */
  person?: { image: string; alt: string; name: string; role: string };
  /** A highlighted remark under the blocks. */
  note?: string;
};

export type FeatureIcon =
  | "clock"
  | "video"
  | "star"
  | "calendar"
  | "refresh"
  | "hand"
  | "heart"
  | "lifebuoy"
  | "community"
  | "books"
  | "mentor"
  | "cap"
  | "checklist";

/** Soft token washes for an icon card's disc; lime when unset. */
export type FeatureTint = "lime" | "teal" | "cream" | "grey";

export type FeaturesContent = SectionHead & {
  /** Show 01, 02 … above each card. */
  numbered?: boolean;
  /** Photo beside the cards, for split layouts. */
  image?: { src: string; alt: string };
  /** `link` adds a primary button at the foot of the card (module overview cards). */
  items: { heading: string; text: string; eyebrow?: string; icon?: FeatureIcon; tint?: FeatureTint; link?: Link }[];
};

/** Professions shown as photo cards. */
export type RolesContent = SectionHead & { roles: { name: string; image: string }[] };

export type CurriculumContent = SectionHead & {
  days: { label: string; tag: string; heading: string; topics: string[] }[];
};

export type PathwayContent = SectionHead & {
  /** `href` links a step to its own page; the current step never links. */
  steps: { label: string; heading: string; text?: string; current?: boolean; href?: string }[];
  note: string;
};

export type InstructorContent = SectionHead & {
  name: string;
  role: string;
  image: string;
  paragraphs: string[];
  credentials?: string[];
};

/** A team member: the instructor profile without its own section header. */
export type TeamMember = Omit<InstructorContent, keyof SectionHead>;

export type TeamContent = SectionHead & { people: TeamMember[] };

/**
 * One block of a longer answer: a paragraph, a bullet list, or a group of links with an
 * optional heading (the source FAQ's reading lists).
 */
export type FaqBlock = string | { list: string[] } | { heading?: string; links: Link[] };

export type FaqContent = SectionHead & {
  /** A single paragraph, or blocks in reading order. */
  items: { question: string; answer: string | FaqBlock[] }[];
  help: { heading: string; text: string; email: string };
};

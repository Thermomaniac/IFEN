// IFEN therapist directory: the practices registered on therapeutenliste.neurofeedback-info.de.
// The records live in therapists.generated.ts; this file holds their shape, the labels and
// icons the filters use, and the page content. Practice names and contact names stay as
// published; labels are translated.

import type { Metadata } from "next";
import type { CourseHeroContent, CtaContent } from "./coursePage";
import { LECTURERS_PATH } from "./ifen/paths";
import { THERAPISTS } from "./therapists.generated";

export const DIRECTORY_PATH = "/therapists";
export const LIVE_DIRECTORY_URL = "https://therapeutenliste.neurofeedback-info.de/";
export const LECTURERS_URL = LECTURERS_PATH;
export const REGISTRATION_URL = "https://therapeutenliste.neurofeedback-info.de/";

export type QualificationId =
  | "mentoring"
  | "qeeg"
  | "loreta"
  | "isf"
  | "four-channel"
  | "capito"
  | "peak"
  | "biofeedback"
  | "erp";

/** IFEN expert levels and the training hours each one stands for. */
export type Level = "bronze" | "silver" | "gold" | "platinum";

export type CountryCode = "de" | "at" | "es" | "nl" | "cy" | "it" | "pt" | "lu" | "be";

export type Therapist = {
  id: string;
  /** Practice or institution, as published. */
  name: string;
  /** Contact person, when the entry names one. */
  contact?: string;
  /** Only set when the directory records a level. Never inferred. */
  level?: Level;
  qualifications: QualificationId[];
  address?: { street?: string; postalCode?: string; city?: string };
  country?: CountryCode;
  phone?: string;
  email?: string;
  website?: string;
  /** IFEN lecturers working at this practice, matched by full name on the lecturers page. */
  lecturers?: string[];
  /** [lat, lng] from the directory. Entries without one are listed but not mapped. */
  location?: [number, number];
  /** Session price in EUR. The directory does not publish prices yet. */
  price?: { min: number; max: number };
  /** Open booking windows, "YYYY-MM-DD". The directory does not publish availability yet. */
  availability?: { from: string; to: string }[];
  /** Portrait. The directory publishes none yet, so cards fall back to initials. */
  photo?: string;
  /** True when `photo` is a review placeholder, not the practice's own picture. */
  photoPlaceholder?: boolean;
  /** Profile page. Only records with one get the card's "View Profile" and the map arrow. */
  profileHref?: string;
};

/**
 * Review placeholders: stock portraits on a few cards so the photo and the initials
 * states can both be judged. Replace with the practices' own photos (with their consent)
 * before launch.
 */
const PLACEHOLDER_PHOTOS = [
  "/therapists/placeholders/photo-1.jpg",
  "/therapists/placeholders/photo-2.jpg",
  "/therapists/placeholders/photo-3.jpg",
];

export const therapists: Therapist[] = THERAPISTS.map((t, i) =>
  !t.photo && i % 4 !== 3 && i < 12
    ? { ...t, photo: PLACEHOLDER_PHOTOS[i % PLACEHOLDER_PHOTOS.length], photoPlaceholder: true }
    : t,
);

/**
 * Paper's menu order; icons from the Paper file. ERP has no icon there. `short` is the
 * card badge text (Figma practice card); filters and the profile keep the full `label`.
 */
export const QUALIFICATIONS: { id: QualificationId; label: string; short: string; icon?: string }[] = [
  {
    id: "mentoring",
    label: "Internship and Mentoring Providers",
    short: "Internships & mentoring",
    icon: "/therapists/quals/mentoring.png",
  },
  {
    id: "qeeg",
    label: "QEEG With Neuroguide (19-Channel Quantitative EEG Assessments)",
    short: "QEEG with Neuroguide",
    icon: "/therapists/quals/qeeg.png",
  },
  { id: "loreta", label: "Loreta Neurofeedback", short: "LORETA neurofeedback", icon: "/therapists/quals/loreta.png" },
  { id: "isf", label: "ISF Infra-Slow Fluctuation Neurofeedback", short: "ISF neurofeedback", icon: "/therapists/quals/isf.png" },
  {
    id: "four-channel",
    label: "4-Channel Z-Value Method and Classical Methods",
    short: "4-channel Z-value",
    icon: "/therapists/quals/four-channel.png",
  },
  { id: "capito", label: "CapitO - Tests for Attention Performance", short: "CapitO attention tests", icon: "/therapists/quals/capito.png" },
  { id: "peak", label: "Peak Performance", short: "Peak Performance", icon: "/therapists/quals/peak.png" },
  {
    id: "biofeedback",
    label: "Heart Rate Variability, Skin Resistance, Temperature, HEG",
    short: "Biofeedback (HRV, HEG)",
    icon: "/therapists/quals/biofeedback.png",
  },
  { id: "erp", label: "Event-Related Potentials (ERP)", short: "ERP" },
];

export const QUALIFICATION_LABELS = Object.fromEntries(QUALIFICATIONS.map((q) => [q.id, q.label])) as Record<
  QualificationId,
  string
>;

/** Hours as defined by IFEN. Only Gold has an icon in the Paper file; the others use a tinted medal. */
export const LEVELS: { id: Level; label: string; hours: string; icon: string }[] = [
  { id: "bronze", label: "Bronze", hours: "75+ hrs", icon: "/therapists/levels/bronze.png" },
  { id: "silver", label: "Silver", hours: "100+ hrs", icon: "/therapists/levels/silver.png" },
  { id: "gold", label: "Gold", hours: "150+ hrs", icon: "/therapists/levels/gold.png" },
  { id: "platinum", label: "Platinum", hours: "300+ hrs", icon: "/therapists/levels/platinum.png" },
];

export const COUNTRIES: Record<CountryCode, string> = {
  de: "Germany",
  at: "Austria",
  es: "Spain",
  nl: "Netherlands",
  cy: "Cyprus",
  it: "Italy",
  pt: "Portugal",
  lu: "Luxembourg",
  be: "Belgium",
};

export const flagSrc = (code: CountryCode) => `/flags/countries/${code}.png`;

/** Paper's nearby view: practices within this distance of the starting point. */
export const NEARBY = { label: "Hamburg", center: [53.5511, 9.9937] as [number, number], radiusKm: 150 };

const lecturerNames = new Set(therapists.flatMap((t) => t.lecturers ?? []));
const countryCount = new Set(therapists.map((t) => t.country).filter(Boolean)).size;

export const directoryPage: {
  meta: Metadata;
  hero: CourseHeroContent;
  head: { label: string; heading: string; intro: string[] };
  cta: CtaContent;
} = {
  meta: {
    title: "Therapist List | IFEN Neurofeedback",
    description:
      "Find an IFEN-registered neurofeedback therapist near you, by qualification, expert level, country and IFEN lecturer.",
  },
  hero: {
    title: "Find an IFEN-Registered\nNeurofeedback Therapist",
    wide: true,
    breadcrumb: [{ label: "Therapist List" }],
    // Paper copy, kept as designed.
    badge: "All Trainings at a Glance",
    description:
      "Every practice listed here has completed IFEN training. Search by method, city or name, then narrow by qualification and expert level.",
    image: "/therapists/hero.jpg",
    highlights: [
      { value: String(therapists.length), label: "Registered Practices" },
      { value: String(countryCount), label: "Countries" },
      { value: String(lecturerNames.size), label: "IFEN Lecturers" },
    ],
  },
  head: {
    label: "Therapist List",
    heading: "Therapy Facilities Recognized\nBy IFEN",
    intro: [
      "For training units without fixed dates, such as internships, supervision and mentoring, you can register.",
    ],
  },
  cta: {
    label: "For Therapists",
    headingLines: ["IFEN-trained? Get your", "practice on this list."],
    action: { label: "Apply for Registration", href: REGISTRATION_URL },
  },
};

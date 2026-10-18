// Pieces shared by the Course Booking category pages (QEEG Courses, ISF Neurofeedback,
// Supervision / Internship / Mentoring, BCIA Certification, Webinars). Each page is data:
// a hero, a list of sections rendered in order by `ContentSections`, related cards and the CTA.

import type { Category } from "../course";
import {
  LISTING_PATH,
  type ArticlesContent,
  type CategoriesContent,
  type CourseHeroContent,
  type CtaContent,
  type FeaturesContent,
  type SectionHead,
} from "../coursePage";
import { ALL_OFFERS } from "../courses/shared";
import { scheduleDates, type ScheduleItem } from "../schedule";
import { BCIA_PATH, ISF_PATH, QEEG_COURSES_PATH, SUPERVISION_PATH, WEBINARS_PATH } from "./paths";

export { BCIA_PATH, ISF_PATH, QEEG_COURSES_PATH, SUPERVISION_PATH, WEBINARS_PATH };

/** The group's breadcrumb root: the course dates listing. */
export const BOOKING_CRUMB = { label: "Course Booking", href: LISTING_PATH };

export const RELATED: Record<"qeeg" | "isf" | "supervision" | "bcia" | "webinars", Category> = {
  qeeg: { id: "qeeg-courses", title: "QEEG Courses", icon: { kind: "brain" }, href: QEEG_COURSES_PATH },
  isf: { id: "isf", title: "ISF Neurofeedback", icon: { kind: "pulse" }, href: ISF_PATH },
  supervision: {
    id: "supervision",
    title: "Supervision, Internship and Mentoring",
    icon: { kind: "users" },
    href: SUPERVISION_PATH,
  },
  bcia: { id: "bcia", title: "BCIA Certification", icon: { kind: "cap" }, href: BCIA_PATH },
  webinars: { id: "webinars", title: "Webinars", icon: { kind: "pulse" }, href: WEBINARS_PATH },
};

export { ALL_OFFERS };

export const BOOKING_CTA: CtaContent = {
  label: "Course Booking",
  headingLines: ["Find Your Next", "Course Date"],
  action: { label: "View All Course Dates", href: LISTING_PATH },
  secondary: { label: "Check Module 1", href: "/courses/module-1" },
};

/** A dated list of courses under a section header. */
export type DatesContent = SectionHead & { items: ScheduleItem[] };

/** One band of a category page. Tones alternate mist, cream, white in order. */
export type BookingSection =
  | { kind: "articles"; id: string; variant?: "panels" | "columns" | "rows" | "media"; content: ArticlesContent }
  | { kind: "features"; id: string; content: FeaturesContent }
  | { kind: "dates"; id: string; content: DatesContent };

export type BookingPage = {
  meta: { title: string; description: string };
  hero: CourseHeroContent;
  sections: BookingSection[];
  related: CategoriesContent;
  cta: CtaContent;
};

/**
 * The schedule rows for a page's course codes, in the given order. Fails the build when a
 * code is missing, so a removed date cannot silently drop off a page.
 */
export function datesFor(page: string, codes: string[]): ScheduleItem[] {
  return codes.map((code) => {
    const item = scheduleDates.find((d) => d.code === code);
    if (!item) throw new Error(`${page}: no schedule date with code ${code}`);
    return item;
  });
}

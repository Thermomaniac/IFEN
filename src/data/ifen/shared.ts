// Pieces shared by the IFEN pages (About IFEN, lecturers index, lecturer profile).

import type { Category } from "../course";
import { LISTING_PATH, type CtaContent } from "../coursePage";
import { ALL_OFFERS } from "../courses/shared";
import { ABOUT_PATH, FEINER_PATH, LECTURERS_PATH } from "./paths";

export { ABOUT_PATH, FEINER_PATH, LECTURERS_PATH };

/** The section's breadcrumb root. About IFEN is the landing page of the group. */
export const IFEN_CRUMB = { label: "IFEN", href: ABOUT_PATH };

export const RELATED: Record<"about" | "lecturers" | "board" | "therapists", Category> = {
  about: { id: "about", title: "About IFEN", icon: { kind: "brain" }, href: ABOUT_PATH },
  lecturers: { id: "lecturers", title: "Our Lecturers", icon: { kind: "users" }, href: LECTURERS_PATH },
  board: { id: "board", title: "Board Members", icon: { kind: "users" }, href: "/#board" },
  therapists: { id: "therapists", title: "Find a Therapist", icon: { kind: "pulse" }, href: "/therapists" },
};

export { ALL_OFFERS };

export const IFEN_CTA: CtaContent = {
  label: "Neurofeedback Training",
  headingLines: ["Learn Neurofeedback", "at IFEN"],
  action: { label: "View Course Dates", href: LISTING_PATH },
  secondary: { label: "Meet Our Lecturers", href: LECTURERS_PATH },
};

// Pieces shared by the Neurofeedback content pages (What Is Neurofeedback, Areas of Application, Topics).

import type { Category } from "../course";
import { LISTING_PATH, type CtaContent } from "../coursePage";
import { ALL_OFFERS } from "../courses/shared";

export const WHAT_IS_PATH = "/neurofeedback/what-is-neurofeedback";
export const AREAS_PATH = "/neurofeedback/areas-of-application";
export const TOPICS_PATH = "/neurofeedback/topics";

/** The section's breadcrumb root. What Is Neurofeedback is the landing page of the group. */
export const NEUROFEEDBACK_CRUMB = { label: "Neurofeedback", href: WHAT_IS_PATH };

export const RELATED: Record<"whatIs" | "applications" | "topics" | "therapists", Category> = {
  whatIs: { id: "what-is", title: "What Is Neurofeedback?", icon: { kind: "pulse" }, href: WHAT_IS_PATH },
  applications: { id: "applications", title: "Areas of Application", icon: { kind: "pulse" }, href: AREAS_PATH },
  topics: { id: "topics", title: "Neurofeedback Topics", icon: { kind: "brain" }, href: TOPICS_PATH },
  therapists: { id: "therapists", title: "Find a Therapist", icon: { kind: "users" }, href: "/therapists" },
};

export { ALL_OFFERS };

export const NEUROFEEDBACK_CTA: CtaContent = {
  label: "Neurofeedback Training",
  headingLines: ["Learn Neurofeedback", "at IFEN"],
  action: { label: "View Course Dates", href: LISTING_PATH },
  secondary: { label: "Check Module 1", href: "/courses/module-1" },
};

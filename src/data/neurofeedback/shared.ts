// Pieces shared by the Neurofeedback content pages (What Is Neurofeedback, Applications, Methods).

import type { Category } from "../course";
import { LISTING_PATH, type CtaContent } from "../coursePage";
import { ALL_OFFERS } from "../courses/shared";

export const WHAT_IS_PATH = "/neurofeedback/what-is-neurofeedback";
export const APPLICATIONS_PATH = "/neurofeedback/applications";
export const METHODS_PATH = "/neurofeedback/methods";

/** The section's breadcrumb root. What Is Neurofeedback is the landing page of the group. */
export const NEUROFEEDBACK_CRUMB = { label: "Neurofeedback", href: WHAT_IS_PATH };

export const RELATED: Record<"whatIs" | "applications" | "methods" | "therapists", Category> = {
  whatIs: { id: "what-is", title: "What Is Neurofeedback?", icon: { kind: "pulse" }, href: WHAT_IS_PATH },
  applications: { id: "applications", title: "Applications of Neurofeedback", icon: { kind: "pulse" }, href: APPLICATIONS_PATH },
  methods: { id: "methods", title: "Neurofeedback Methods", icon: { kind: "brain" }, href: METHODS_PATH },
  therapists: { id: "therapists", title: "Find a Therapist", icon: { kind: "users" }, href: "/therapists" },
};

export { ALL_OFFERS };

export const NEUROFEEDBACK_CTA: CtaContent = {
  label: "Neurofeedback Training",
  headingLines: ["Learn Neurofeedback", "at IFEN"],
  action: { label: "View Course Dates", href: LISTING_PATH },
  secondary: { label: "Check Module 1", href: "/courses/module-1" },
};

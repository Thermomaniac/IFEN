/**
 * Hero themes, chosen per route from this table and never from the URL at runtime.
 *
 * - default: ink band with the listing photo (IFEN and neurofeedback pages).
 * - courses: ink band with the line pattern and the booking panel; the listing keeps its photo.
 * - therapist: compact white band with ink type, the portrait kept on the profile.
 * - blog: white band (Figma "Blog") with gold facts under a hairline and the post or header image framed on the right.
 *
 * The home page has its own hero (`sections/Hero`) and sits under `default`.
 */
export type HeroTheme = "default" | "courses" | "therapist" | "blog";

export const heroThemes = {
  "/": "default",
  "/ifen/about": "default",
  "/ifen/lecturers": "default",
  "/ifen/lecturers/[slug]": "default",
  "/ifen/training-courses": "default",
  "/neurofeedback/areas-of-application": "default",
  "/neurofeedback/topics": "default",
  "/neurofeedback/what-is-neurofeedback": "default",
  "/courses": "courses",
  "/courses/modules": "courses",
  "/courses/module-1": "courses",
  "/courses/bcia-qeeg-mentoring": "courses",
  "/courses/qeeg-workshop": "courses",
  "/courses/qeeg-for-your-practice": "courses",
  "/courses/webinar-qeeg-psychotherapy": "courses",
  "/courses/webinar-stress-pain": "courses",
  "/courses/interest-list/[slug]": "courses",
  "/courses/ifen-100": "courses",
  "/courses/module-2": "courses",
  "/courses/module-3": "courses",
  "/courses/module-4": "courses",
  "/course-booking/bcia-certification": "courses",
  "/course-booking/brainavatar": "courses",
  "/course-booking/isf-neurofeedback": "courses",
  "/course-booking/photobiomodulation": "courses",
  "/course-booking/qeeg-courses": "courses",
  "/course-booking/supervision-internship-mentoring": "courses",
  "/course-booking/webinars": "courses",
  "/therapists": "therapist",
  "/therapists/[id]": "therapist",
  "/blog": "blog",
  "/blog/[slug]": "blog",
} as const satisfies Record<string, HeroTheme>;

export type HeroRoute = keyof typeof heroThemes;

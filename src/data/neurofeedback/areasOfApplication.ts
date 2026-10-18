// Areas of Application. Content from the live page
// neurofeedback-info.de/neurofeedback-de/anwendungsgebiete.html ("Anwendung von Neurofeedback"),
// translated from German; both lists and the closing remark are kept in full. The source
// illustration is a flat clip-art graphic, so the hero uses IFEN's EEG practice photo instead.

import type { ArticlesContent, CategoriesContent, CourseHeroContent } from "../coursePage";
import { NEUROFEEDBACK_CRUMB, NEUROFEEDBACK_CTA, RELATED } from "./shared";

export const applications = {
  meta: {
    title: "Areas of Application | IFEN",
    description:
      "What neurofeedback can do and where it helps: its positive effects and the disorders and clinical pictures it is applied for.",
  },

  hero: {
    title: "Areas of Application",
    breadcrumb: [NEUROFEEDBACK_CRUMB, { label: "Areas of Application" }],
    badge: "Areas of application",
    description: "What neurofeedback can do, and the disorders and clinical pictures it is applied for.",
    highlights: [],
    image: "/about/metric-tile.jpg",
  } satisfies CourseHeroContent,

  effects: {
    label: "Effects and indications",
    heading: "What Neurofeedback Can Do and Where It Helps",
    items: [
      {
        heading: "Positive effects",
        paragraphs: [
          "Depending on the correct settings and the client, the method has a range of positive effects, including:",
        ],
        list: [
          "Increased concentration",
          "Better sleep quality",
          "Noticeable overall relaxation and balance",
          "Reduced anxiety",
          "Reduced chronic pain",
          "Fewer psychosomatic symptoms",
        ],
      },
      {
        heading: "Disorders and clinical pictures",
        paragraphs: ["Neurofeedback is applied above all for the following disorders and clinical pictures:"],
        list: [
          "AD(H)D",
          "Depression",
          "Chronic pain",
          "Insomnia",
          "Migraine",
          "Autism",
          "Panic and anxiety disorders",
          "Addiction",
        ],
      },
    ],
    note: "Some of our practitioners also successfully support top athletes with methods we teach in our courses.",
  } satisfies ArticlesContent,

  related: {
    label: "Explore further",
    heading: "Continue Learning",
    items: [RELATED.whatIs, RELATED.topics, RELATED.therapists],
  } satisfies CategoriesContent,

  cta: NEUROFEEDBACK_CTA,
};

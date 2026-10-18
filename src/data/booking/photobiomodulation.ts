// Photobiomodulation. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/photobiomodulation.html, translated from
// the German original and kept in full. The page has no dates, only its interest list.

import { ALL_OFFERS, BOOKING_CRUMB, BOOKING_CTA, RELATED, interestFor, type BookingPage } from "./shared";

export const photobiomodulation = {
  meta: {
    title: "Photobiomodulation | IFEN",
    description:
      "Photobiomodulation, the effect of soft laser light on living cells, in webinars with Thomas Feiner. Join the interest list for the next course.",
  },

  hero: {
    title: "Photobiomodulation",
    breadcrumb: [BOOKING_CRUMB, { label: "Photobiomodulation" }],
    badge: "Webinars",
    description: "The possibilities of light.",
    highlights: [],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      variant: "columns",
      content: {
        label: "Photobiomodulation",
        heading: "Understanding the Possibilities of Light",
        items: [
          {
            heading: "Light and Living Organisms",
            paragraphs: [
              "Photobiology is a field of research that has long studied photochemical reactions in biological systems, that is, the effect of light on living organisms.",
              "Photobiomodulation is one of the most exciting topics in photobiology. In webinars, Thomas Feiner, founder and director of IFEN, explores its connections and mechanisms.",
            ],
          },
          {
            heading: "How It Works",
            paragraphs: [
              "Photobiomodulation (Ancient Greek photos = light, Greek bios = life, Latin modulatio = measure, abbreviated PBM) is a phenomenon in which so-called soft lasers are used: radiation limited to a specific range (400 to 700 nm or 700 to 1000 nm, close to the infrared spectrum), to trigger targeted biochemical reactions in the cells.",
              "The key link between this soft radiation and the organism is the mitochondria, which, depending on the frequency and energy density of the radiation, are stimulated to higher performance during a photobiomodulation application.",
            ],
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "interest",
      content: {
        label: "Interest List",
        heading: "Be the First to Know",
        intro: ["No photobiomodulation dates are set yet. Join the interest list and we will email you when a course is scheduled."],
        items: interestFor("Photobiomodulation", ["PBM-INTER"]),
        interest: true,
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [RELATED.webinars, RELATED.brainavatar, ALL_OFFERS],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

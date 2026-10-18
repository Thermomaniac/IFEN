// ISF Neurofeedback. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/isf-neurofeedback-m.html ("ISF Neurofeedback",
// "Infra Slow Fluctuation mit Mark Smith, New York"), translated from the German original; the
// three paragraphs, the further-information PDF and both article downloads are kept.
// Dates: the source's date table, by course code, from `schedule.ts`.

import { TOPICS_PATH } from "../neurofeedback/shared";
import { ALL_OFFERS, BOOKING_CRUMB, BOOKING_CTA, RELATED, datesFor, type BookingPage } from "./shared";

const DOWNLOADS = "https://www.neurofeedback-info.de/images";

export const isfNeurofeedback = {
  meta: {
    title: "ISF Neurofeedback | IFEN",
    description:
      "Infra Slow Fluctuation (ISF) neurofeedback with Mark Smith, New York: what ISF training is, articles to download and the course dates.",
  },

  hero: {
    title: "ISF Neurofeedback",
    breadcrumb: [BOOKING_CRUMB, { label: "ISF Neurofeedback" }],
    badge: "Infra-slow fluctuation",
    description: "Infra Slow Fluctuation with Mark Smith, New York: the method, further reading and the course dates.",
    highlights: [],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      content: {
        label: "ISF Neurofeedback",
        heading: "What Is ISF Neurofeedback?",
        items: [
          {
            paragraphs: [
              "Infra-slow fluctuations (ISF) are extremely slow fluctuations of the electrical activity in the brain, with frequencies below 0.1 Hz. These slow rhythms are considered fundamental control mechanisms for attention, consciousness and emotional regulation. They influence the synchronization and communication between different brain regions and so form a kind of basic rhythm for higher cognitive processes.",
              "ISF neurofeedback was developed by Mark L. Smith in the early 2000s. He built on findings from neurophysiology and clinical practice to create a training method that specifically modulates this slow brain activity. Unlike classical neurofeedback methods, which target faster frequency ranges such as alpha, beta or theta, ISF neurofeedback works at a deeper level: the self-regulation of the autonomic nervous system and the basic states of the brain.",
              "This depth is what makes ISF neurofeedback so interesting. It shows promising results in complex conditions such as chronic pain, depression, anxiety or post-traumatic stress disorder. ISF is an approach that reaches many clients where other methods reach their limits.",
              "Mark L. Smith's article in the renowned journal NeuroConnections is available in English and in IFEN's German translation.",
            ],
            links: [
              { label: "Further Information (PDF)", href: `${DOWNLOADS}/ISF%20Workshop%20allgemein.pdf` },
              { label: "Article in English (PDF)", href: `${DOWNLOADS}/downloads/ISF_Neurofeedback_Smith_Article_ISNR.pdf` },
              {
                label: "German Translation (PDF)",
                href: `${DOWNLOADS}/downloads/ISF_all_Artikel/ISF-Neurofeedback_DE_Uebersetzung_IFEN.pdf`,
              },
            ],
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        label: "Dates",
        heading: "ISF Course Dates",
        intro: ["The ISF courses run online, in German."],
        items: datesFor("ISF Neurofeedback", ["ISF2-090427-DE", "ISF2-250627-DE", "ISF1-bipolar-151027-DE"]),
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [
      { id: "topics", title: "Neurofeedback Topics", icon: { kind: "brain" }, href: TOPICS_PATH },
      RELATED.qeeg,
      ALL_OFFERS,
    ],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

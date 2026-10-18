// BrainAvatar software training. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/brainavatar.html, translated from the
// German original and kept in full. Dates: the source's date table (the BCIA foundation course
// and the four BrainAvatar workshops), then its interest list, both from `schedule.ts`.

import {
  ALL_OFFERS,
  BOOKING_CRUMB,
  BOOKING_CTA,
  RELATED,
  datesFor,
  interestFor,
  type BookingPage,
} from "./shared";

export const brainavatar = {
  meta: {
    title: "BrainAvatar Software Training | IFEN",
    description:
      "BrainAvatar software training at IFEN: the next generation of EEG and neurofeedback software, with workshop dates and an interest list.",
  },

  hero: {
    title: "BrainAvatar\nSoftware Training",
    breadcrumb: [BOOKING_CRUMB, { label: "BrainAvatar" }],
    badge: "Software Training",
    description: "Learn from the best in their field.",
    highlights: [],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      content: {
        label: "BrainAvatar",
        heading: "The Next Generation of Neurofeedback Software",
        items: [
          {
            paragraphs: [
              "BrainAvatar™ is the next generation of EEG and neurofeedback software, available for Atlantis and Discovery systems. BrainAvatar combines all existing BrainMaster components with new functions, including EEG, peripheral modalities and integrated assessment and training, in a system without precedent.",
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
        heading: "BrainAvatar Workshops",
        intro: ["Advanced users, mixed protocols: two-day workshops in Hannover."],
        items: datesFor("BrainAvatar", [
          "BCIA-011126-EN",
          "AVA-120327-DE",
          "AVA-230927-DE",
          "AVA-100328-DE",
          "AVA-280928-DE",
        ]),
      },
    },
    {
      kind: "dates",
      id: "interest",
      content: {
        label: "Interest List",
        heading: "No Suitable Date Online?",
        intro: [
          "Interested in a BrainAvatar course and nothing suitable is online right now? No problem. Join our interest list and we will email you as soon as new BrainAvatar courses are in the programme.",
        ],
        items: interestFor("BrainAvatar", ["AVA-INTER"]),
        interest: true,
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [RELATED.bcia, RELATED.qeeg, ALL_OFFERS],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

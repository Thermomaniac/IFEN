// Webinars. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/webinare-m.html ("Webinare", "online
// weiterbilden wo immer SIE wollen"), translated from the German original and kept in full.
// The source's single "How does a webinar work?" paragraph is split into three numbered steps.
// Dates: the source's date table, by course code, from `schedule.ts`, in the filterable schedule.

import { ALL_OFFERS, BOOKING_CRUMB, BOOKING_CTA, RELATED, datesFor, type BookingPage } from "./shared";

export const webinars = {
  meta: {
    title: "Webinars | IFEN",
    description:
      "Neurofeedback and QEEG webinars at IFEN: continue your education online, wherever you want. How webinars work and all webinar dates.",
  },

  hero: {
    title: "Webinars",
    breadcrumb: [BOOKING_CRUMB, { label: "Webinars" }],
    badge: "Online",
    description: "Continue your education online, wherever you want.",
    highlights: [],
  },

  sections: [
    {
      kind: "features",
      id: "about",
      content: {
        label: "How It Works",
        heading: "How Does a Webinar Work?",
        numbered: true,
        items: [
          { heading: "Register", text: "Choose a webinar from the dates below and book it online." },
          {
            heading: "Receive Your Invitation",
            text: "After you register, you receive an invitation link at regular intervals.",
          },
          {
            heading: "Download the Software",
            text: "The invitation comes with the download of the webinar software. The download is free of charge.",
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        label: "Dates",
        heading: "Webinar Dates",
        intro: ["Search by topic or filter the list, and switch between table and cards."],
        schedule: true,
        items: datesFor("Webinars", [
          "WEB-191026-DE",
          "WEB-261026-DE",
          "WEB-021126-DE",
          "WEB-091126-DE",
          "WEB-ADV-111126",
          "WEB-161126-EN",
          "WEB-231126-DE",
          "WEB-301126-DE",
          "WEB-Anfänger-021226",
          "WEB-071226-DE",
          "WEB-141226-DE",
          "Gruppen-Mentoring -161226-DE",
          "WEB-110127-DE",
          "WEB-250127-DE",
          "WEB-080227-DE",
          "WEB-220227-DE",
          "IFEN Symposium 2027",
        ]),
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [RELATED.qeeg, RELATED.isf, ALL_OFFERS],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

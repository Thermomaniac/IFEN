// Supervision / Internship / Mentoring / individual days. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/supervision-praktikum-mentoring-einzelne-tage.html
// ("Praxis, Praxis, Praxis"), translated from the German original and kept in full. The source
// links its therapist list and marks partner practices with an internship icon; here the link
// goes to the local directory, whose cards carry the "Internships & mentoring" badge. The
// source's TeamViewer note ("you need the software TeamViewer, available as a free download")
// becomes its own card with set-up steps; the download goes to TeamViewer's official page instead
// of the source's intermediate article. Dates: the source's date table, by course code, from `schedule.ts`.

import { ALL_OFFERS, BOOKING_CRUMB, BOOKING_CTA, RELATED, datesFor, type BookingPage } from "./shared";

export const supervision = {
  meta: {
    title: "Supervision, Internship and Mentoring | IFEN",
    description:
      "Internship in a neurofeedback practice, online supervision, mentoring and individual days for the IFEN certificate training, with flexible dates.",
  },

  hero: {
    title: "Supervision, Internship\nand Mentoring",
    breadcrumb: [BOOKING_CRUMB, { label: "Supervision, Internship and Mentoring" }],
    badge: "Individual Days",
    description:
      "Internship, online supervision, mentoring and individual days for your certificate training, all without fixed dates.",
    highlights: [],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      content: {
        label: "Practice, Practice, Practice",
        heading: "Internship and Supervision",
        items: [
          {
            heading: "Internship",
            paragraphs: [
              "We are the only institute to make an internship in a neurofeedback practice a mandatory part of the certificate training. You can book your internship, for example Module 2 of the qualification as a certified neurofeedback therapist, below.",
              "Our partner practices, where you can complete your internship, are listed in our therapist list. Look for entries marked Internships & mentoring.",
            ],
            links: [{ label: "Find a Partner Practice", href: "/therapists" }],
          },
          {
            heading: "Supervision",
            paragraphs: [
              "Supervision takes place over an internet connection. In this concept, unique so far, you run a session and your screen is transmitted to the supervisor directly and without delay. The session can be discussed and guided as if the tutor were sitting in the room. This gives you maximum freedom to set the dates as best suits your needs.",
            ],
          },
          {
            heading: "TeamViewer",
            paragraphs: [
              "For supervision you need the screen-sharing software TeamViewer, which is free to download.",
            ],
            list: [
              "Download TeamViewer from the official website and install it",
              "Open TeamViewer before the session starts",
              "Give your supervisor the ID and password shown in the app",
            ],
            links: [{ label: "Download TeamViewer", href: "https://www.teamviewer.com/en/download/" }],
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        label: "Dates",
        heading: "Book Supervision, Internship and Mentoring",
        intro: ["These units have no fixed dates."],
        items: datesFor("Supervision", [
          "IFEN - BCIA Mentoring, QEEG-Mentoring for QEEG-D certification",
          "IFEN-100-DE",
          "M2-P-IFEN-DE",
          "M3-S",
          "M3-Std",
          "M4-P",
        ]),
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [
      { id: "therapists", title: "Find a Therapist", icon: { kind: "users" }, href: "/therapists" },
      RELATED.bcia,
      ALL_OFFERS,
    ],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

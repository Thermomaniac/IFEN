// QEEG Courses. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/qeeg-kurse-m.html ("QEEG-Kurse",
// "quantitative Elektroenzephalographie"), translated from the German original; the three
// paragraphs are kept in full. The source banner (an EEG / QEEG diagram with German labels)
// is left out. Dates: the source's date table, by course code, from `schedule.ts`.

import { QEEG_PATH } from "../courses/qeeg";
import { ALL_OFFERS, BOOKING_CRUMB, BOOKING_CTA, RELATED, datesFor, type BookingPage } from "./shared";

export const qeegCourses = {
  meta: {
    title: "QEEG Courses | IFEN",
    description:
      "Courses, workshops and webinars on quantitative EEG (QEEG): brain maps, normative data and biomarkers for more precise therapy planning.",
  },

  hero: {
    title: "QEEG Courses",
    breadcrumb: [BOOKING_CRUMB, { label: "QEEG Courses" }],
    badge: "Quantitative electroencephalography",
    description:
      "Courses, workshops and webinars on quantitative EEG, from brain maps and normative data to the course dates.",
    highlights: [],
  },

  sections: [
    {
      kind: "articles",
      id: "about",
      content: {
        label: "Quantitative EEG",
        heading: "Why Quantitative EEG",
        items: [
          {
            paragraphs: [
              "The EEG has long given doctors important clues in severe disorders such as epilepsy or head injuries. But even the best diagnostician reaches their limits at some point: with the naked eye, they will not recognize more complex illnesses such as depression or AD(H)D in a raw EEG.",
              "This is where quantitative EEG (QEEG) can help. State-of-the-art data processing compares the EEG with databases and makes disorders visible in a brain map. This greatly extends what a diagnostician can do; ultimately, it reveals the psychophysiological basis of autism, stress, illness or learning disorders in the brain. That means more precise therapy planning which, thanks to the biomarker analysis, also gives psychologists, neurologists and psychiatrists valuable insight into the severity of an illness and the effect of medication.",
              "As with measuring blood pressure, there are reliable normative data for the brain, against which unfavourable brain activity can be identified with great certainty. These biomarkers can then be assigned to a specific symptom or illness.",
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
        heading: "QEEG Course Dates",
        intro: ["The course language is shown on each card."],
        items: datesFor("QEEG Courses", [
          "QEEG-EN",
          "WEB-071226-DE",
          "QEEG-121226-EN",
          "WEB-141226-DE",
          "WEB-110127-DE",
          "WEB-250127-DE",
          "WEB-080227-DE",
          "WEB-220227-DE",
        ]),
      },
    },
  ],

  related: {
    label: "Related training",
    heading: "More Course Categories",
    items: [
      { id: "qeeg-practice", title: "QEEG for Your Practice", icon: { kind: "brain" }, href: QEEG_PATH },
      RELATED.isf,
      ALL_OFFERS,
    ],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

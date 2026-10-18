// BCIA Board Certified in Neurofeedback. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/bcia-board-certified-in-neurofeeedback.html,
// translated from the German original; the six facts are kept in full, with short card headings
// taken from each fact's bold lead. The source's closing heading "Nähere Informationen zur
// internationalen BCIA-Zertifizierung" has no text or link and is left out. Dates: the BCIA
// rows of `schedule.ts`, by course code.

import { FEINER_PATH } from "../ifen/paths";
import { ALL_OFFERS, BOOKING_CRUMB, BOOKING_CTA, RELATED, datesFor, type BookingPage } from "./shared";

export const bcia = {
  meta: {
    title: "BCIA Board Certified in Neurofeedback | IFEN",
    description:
      "Six facts about the BCIA certification program, the international qualification in neurofeedback, and the BCIA dates at IFEN.",
  },

  hero: {
    title: "BCIA Board Certified\nin Neurofeedback",
    breadcrumb: [BOOKING_CRUMB, { label: "BCIA Certification" }],
    badge: "International qualification",
    description: "The international qualification in neurofeedback: six facts about the BCIA certification program.",
    highlights: [],
  },

  sections: [
    {
      kind: "features",
      id: "facts",
      content: {
        label: "What is BCIA?",
        heading: "Six Facts About the Certification Program",
        numbered: true,
        items: [
          {
            heading: "A non-profit organization",
            text: "BCIA is a non-profit organization that has established standards in bio- and neurofeedback that are valid and recognized worldwide.",
          },
          {
            heading: "Recognized by three associations",
            text: "Biofeedback certification is the only program recognized by the three major international associations: the Association for Applied Psychophysiology and Biofeedback (AAPB), the Biofeedback Foundation of Europe (BFE) and the International Society for Neurofeedback and Research (ISNR).",
          },
          {
            heading: "Based on scientific findings",
            text: "BCIA biofeedback certification is based on scientific findings published in peer-reviewed journals, and on professional standards and ethical principles developed after a comprehensive task analysis. A task force of international biofeedback experts updates them regularly. BCIA continuously collects, validates and evaluates data on topics relevant to neurofeedback. The exams are built with psychometric methods to ensure the relevance, integrity and value of the certification program.",
          },
          {
            heading: "Strict ethical principles",
            text: "BCIA requires its graduates to follow very strict ethical principles. Graduates therefore have to complete a three-hour ethics course to renew their certification. These strict ethical standards are one of the many reasons why the international partners have chosen BCIA biofeedback certification unanimously.",
          },
          {
            heading: "A board of experts",
            text: "A directive board of physicians, educators and researchers who have played a leading role in developing biofeedback is responsible. The board includes directors and presidents of the three major international associations, who have served the development of the whole field for decades.",
          },
          {
            heading: "Member of ICE",
            text: "BCIA is a member of the Institute for Credentialing Excellence (ICE), formerly the National Organization for Competency Assurance (NOCA).",
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "ifen",
      content: {
        label: "BCIA at IFEN",
        heading: "Certification Through IFEN Workshops",
        items: [
          {
            paragraphs: [
              "Thomas F. Feiner, BCIA BCN and director of the Institute for EEG Neurofeedback IFEN, offers you the opportunity to gain this international qualification within the framework of workshops.",
            ],
            links: [{ label: "About Thomas Feiner", href: FEINER_PATH }],
          },
        ],
      },
    },
    {
      kind: "dates",
      id: "dates",
      content: {
        label: "Dates",
        heading: "BCIA Courses and Mentoring",
        intro: ["The BCIA dates in the IFEN course schedule."],
        items: datesFor("BCIA", ["BCIA-011126-EN", "IFEN - BCIA Mentoring, QEEG-Mentoring for QEEG-D certification"]),
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [RELATED.supervision, RELATED.webinars, ALL_OFFERS],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

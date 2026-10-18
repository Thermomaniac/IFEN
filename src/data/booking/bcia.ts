// BCIA Board Certified in Neurofeedback. Content from the live page
// neurofeedback-info.de/termine-kursbuchung-seminare/bcia-board-certified-in-neurofeeedback.html,
// translated from the German original; the six facts are kept in full, with short card headings
// taken from each fact's bold lead. The source's "Nähere Informationen zur internationalen
// BCIA-Zertifizierung" accordion holds the five certification requirements, the order BCIA
// recommends, the fees, certification through prior experience and the EEG brochure; all are
// kept, translated. Dates: the BCIA rows of `schedule.ts`, by course code.

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
      kind: "articles",
      id: "requirements",
      variant: "rows",
      content: {
        label: "Requirements",
        heading: "Certification Requirements",
        intro: ["What BCIA asks of every candidate for the Board Certification in Neurofeedback."],
        numbered: true,
        items: [
          {
            heading: "Didactic Neurofeedback Education, 36 Hours",
            paragraphs: [
              "Candidates can meet this requirement by completing a university course of three semesters or equivalent, by completing a BCIA-accredited training program, or by earning 36 hours of BCIA-approved workshop credits. The education must cover the BCIA blueprint of knowledge, 36 hours in total:",
            ],
            list: [
              "I Orientation to Neurofeedback: 4 hours",
              "II Basic Neurophysiology and Neuroanatomy: 4 hours",
              "III Instrumentation and Electronics: 8 hours",
              "IV Research: 2 hours",
              "V Psychopharmacological Considerations: 2 hours",
              "VI Treatment Planning: 12 hours",
              "VII Professional Conduct: 4 hours",
            ],
          },
          {
            heading: "Practical Neurofeedback Training",
            paragraphs: ["25 contact hours with a BCIA-approved mentor for discussion, covering:"],
            list: [
              "10 sessions of personal neurofeedback to demonstrate self-regulation",
              "100 sessions of patient or client treatment",
              "10 case conference presentations",
            ],
          },
          {
            heading: "Human Anatomy and Physiology Course",
            paragraphs: [
              "A comprehensive course in human anatomy, physiology or human biology, or neuroanatomy, through a BCIA-approved program or a locally accredited academic institution that meets the requirements.",
            ],
          },
          {
            heading: "Licence or Proof of Independent Practice",
            paragraphs: [
              "Treating a medical or psychological disorder requires a current health care licence in a BCIA-approved health care field, issued by the state in which you practise, or your agreement to work under the supervision of an appropriately licensed health care professional.",
            ],
          },
          {
            heading: "Written Exam",
            paragraphs: [
              "All candidates must pass a three-hour written exam that covers the whole blueprint. Exams are offered at various locations, or as a special exam with a paid proctor.",
            ],
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "process",
      content: {
        label: "Process",
        heading: "How Certification Works",
        items: [
          {
            heading: "The Order of Requirements",
            paragraphs: [
              "You become a certification candidate by submitting an application with proof of the education requirement and paying a processing fee. BCIA recommends, but does not require, that candidates complete the remaining requirements in this order:",
            ],
            list: [
              "Anatomy and physiology course",
              "Didactic neurofeedback education",
              "Supervised clinical neurofeedback training",
              "Written exam",
            ],
          },
          {
            heading: "Fees",
            paragraphs: [
              "Applications can be submitted for $150.00, with a balance of $275.00 due before the written exam. All fees are paid by cheque, bank transfer or credit card in US dollars. Applications are valid for two years.",
            ],
          },
          {
            heading: "Certification Through Prior Experience",
            paragraphs: [
              "Appropriately licensed health care professionals with at least 100 hours and 3,000 patient or client hours may apply through this option.",
            ],
            links: [
              {
                label: "BCIA EEG Brochure (PDF)",
                href: "https://www.neurofeedback-info.de/images/documents/EEGBrochureBCIA.pdf",
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
        heading: "BCIA Courses and Mentoring",
        intro: ["The BCIA dates in the IFEN course schedule."],
        items: datesFor("BCIA", ["BCIA-011126-EN", "IFEN - BCIA Mentoring, QEEG-Mentoring for QEEG-D certification"]),
      },
    },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [RELATED.supervision, RELATED.brainavatar, RELATED.webinars, ALL_OFFERS],
  },

  cta: BOOKING_CTA,
} satisfies BookingPage;

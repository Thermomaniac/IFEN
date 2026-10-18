// Training Courses in Neurofeedback. Content from the live page
// neurofeedback-info.de "Ausbildungskurse im Neurofeedback", translated from the German original.
// Kept: the introduction, who the courses are for, what to expect, why neurofeedback, why IFEN,
// the next step, both date tables and the FAQ (the same thirteen answers as the modules overview,
// so that copy is reused). Left out: the participant quotes, and the orphaned "Für wen ist dieser
// Kurs geeignet?" block, which repeats a single course's audience and has no course around it.
// The upcoming table lists WEB-071126-EN (Swingle assessment), which is not in `schedule.ts`, so
// it is not shown.

import { MODULES_PATH } from "../courses/modulePaths";
import { modulesOverview } from "../courses/modules";
import { LISTING_PATH } from "../coursePage";
import { datesFor, type BookingPage } from "../booking/shared";
import { ALL_OFFERS, IFEN_CRUMB, RELATED } from "./shared";

export const trainingCourses = {
  meta: {
    title: "Training Courses in Neurofeedback | IFEN",
    description:
      "Neurofeedback training at IFEN for therapists, psychologists, physicians and health professionals: who the courses are for, what to expect, and the next dates.",
  },

  hero: {
    title: "Training Courses\nin Neurofeedback",
    breadcrumb: [IFEN_CRUMB, { label: "Training Courses in Neurofeedback" }],
    badge: "Training",
    description:
      "More than theory: a well-founded, scientifically validated approach to a method that is gaining importance worldwide in the treatment of mental, neurological and developmental disorders.",
    highlights: [],
  },

  sections: [
    {
      kind: "articles",
      id: "audience",
      variant: "panels",
      content: {
        label: "Introduction",
        heading: "Our Training Courses in Neurofeedback",
        intro: [
          "Whether you are new to the field or want to deepen what you already know, you will find the right format and level for your personal and professional development.",
        ],
        items: [
          {
            heading: "Who Our Courses Are For",
            paragraphs: ["Our training is aimed specifically at:"],
            list: [
              "Therapists",
              "Psychologists",
              "Physicians",
              "Heilpraktiker (non-medical practitioners)",
              "Educators and health care professionals",
            ],
          },
          {
            heading: "What to Expect",
            paragraphs: ["Four things every IFEN course offers."],
            list: [
              "Practical content: ready to use in everyday clinical work",
              "Leading international lecturers: years of experience in research and practice",
              "Flexible participation: online, hybrid or on site, you decide",
              "A certified training path: with the option of BCIA certification",
            ],
          },
        ],
      },
    },
    {
      kind: "articles",
      id: "why",
      variant: "columns",
      content: {
        label: "Why",
        heading: "Why Neurofeedback, Why IFEN",
        items: [
          {
            heading: "Why Neurofeedback?",
            paragraphs: [
              "Neurofeedback is a method based on EEG data for optimising brain function. It makes it possible to train the brain in a targeted way: for ADHD, sleep disorders, anxiety, depression, chronic pain, burnout and much more.",
              "Our courses give you the knowledge you need to integrate evidence-based applications into your practice safely and effectively.",
            ],
          },
          {
            heading: "Why IFEN?",
            paragraphs: [
              "IFEN is one of the pioneers of neurofeedback in Europe. Founded in Munich in 2008 by Thomas F. Feiner, we are today a leading training institute for therapists, physicians and health professionals. Our approach combines a scientific foundation, intensive practical experience and personal closeness, so that participants gain not only expertise but also confidence and trust for clinical use.",
              "We are convinced that every brain is unique, and so training should be too. That is why we offer up-to-date content, personal supervision, continuous support and an international community that shares experience and support. With this philosophy, hundreds of therapists have already built their careers in neurofeedback and made real changes in their patients' lives.",
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
        heading: "Neurofeedback Training Dates",
        intro: ["Module 1, the BCIA foundation course and group mentoring in the IFEN course schedule."],
        items: datesFor("Training Courses", [
          "M1-231026-ES",
          "BCIA-011126-EN",
          "M1-091126-DE",
          "Gruppen-Mentoring -161226-DE",
          "M1-220227-DE",
          "M1-070627-DE",
          "M1-221127-DE",
          "M1-210228-DE",
          "M1-201128-DE",
        ]),
      },
    },
    {
      kind: "dates",
      id: "upcoming",
      content: {
        label: "Coming Up",
        heading: "Upcoming Courses and Webinars",
        intro: ["The next courses and webinars across the IFEN programme."],
        items: datesFor("Training Courses", [
          "WEB-191026-DE",
          "M1-231026-ES",
          "WEB-261026-DE",
          "BCIA-011126-EN",
          "WEB-021126-DE",
        ]),
      },
    },
    { kind: "faq", id: "faq", content: modulesOverview.faq },
  ],

  related: {
    label: "Related",
    heading: "Keep Exploring",
    items: [RELATED.about, RELATED.lecturers, ALL_OFFERS],
  },

  cta: {
    label: "Your Next Step",
    headingLines: ["Start Your Journey Into", "Modern Neuroscience"],
    text: "Learn how to support your clients sustainably with innovative methods. Sign up today and invest in your future as a neurofeedback specialist.",
    action: { label: "View Course Dates", href: LISTING_PATH },
    secondary: { label: "Certified Neurofeedback Therapist", href: MODULES_PATH },
  },
} satisfies BookingPage;

// Neurofeedback Methods. Content from the live page
// neurofeedback-info.de/neurofeedback-de/themenbereiche.html ("Neurofeedback Verfahren", "Themenbereiche"),
// translated from German; all five topic texts are kept in full.
// Links: the source's training links point at /de pages; the English equivalents on the live
// site are used where they exist. Checked 2026-10-15, these source links return 404 and are left
// out: qeeg.neurofeedback-partner.de, vielight.neurofeedback-partner.de/index.php,
// /de/startseite/neuromeditation-munich.html and /de/termine-kursbuchung-seminare/neuromeditation-inter.html.
// ISF has no link on the source; it links the local ISF Neurofeedback page. QEEG links the local
// QEEG Courses page, which replaces the source's qeeg-kurse-m.html.

import { ISF_PATH, QEEG_COURSES_PATH } from "../booking/paths";
import type { ArticlesContent, CategoriesContent, CourseHeroContent } from "../coursePage";
import { QEEG_WORKSHOP_PATH } from "../courses/qeegWorkshop";
import { LIVE } from "../courses/shared";
import { ALL_OFFERS, NEUROFEEDBACK_CRUMB, NEUROFEEDBACK_CTA } from "./shared";

const BOOKING = `${LIVE}/termine-kursbuchung-seminare`;

export const methods = {
  meta: {
    title: "Neurofeedback Methods | IFEN",
    description:
      "QEEG, neuromeditation, ISF neurofeedback, photobiomodulation and BrainAvatar: the topic areas around neurofeedback, briefly explained.",
  },

  hero: {
    title: "Neurofeedback Methods",
    breadcrumb: [NEUROFEEDBACK_CRUMB, { label: "Methods" }],
    badge: "Topic areas",
    description:
      "Five topic areas around neurofeedback, from QEEG brain mapping to photobiomodulation, with links to the matching training.",
    highlights: [],
  } satisfies CourseHeroContent,

  topics: {
    label: "Topic areas",
    heading: "Methods and Topic Areas",
    numbered: true,
    items: [
      {
        heading: "QEEG",
        paragraphs: [
          "Quantitative EEG uses modern data processing to make disorders visible in a brain map. This gives diagnosticians far greater possibilities and makes the biological basis of autism, stress, illness or learning disorders in the brain visible.",
        ],
        links: [{ label: "QEEG Courses", href: QEEG_COURSES_PATH }],
      },
      {
        heading: "Neuromeditation",
        paragraphs: [
          "Neurofeedback approaches are integrated into meditation practices such as MBSR (mindfulness-based stress reduction). This can help meditators and therapists support the meditation process itself. It can be applied for many symptoms, including AD(H)D, anxiety and depression.",
        ],
      },
      {
        heading: "ISF",
        paragraphs: [
          "Infra Slow Fluctuation (infra, below; slow; fluctuation) is the scientific term for very low-frequency oscillations in the brain. ISF neurofeedback trains these slow oscillations specifically, to improve the general performance of the brain.",
        ],
        links: [{ label: "ISF Neurofeedback", href: ISF_PATH }],
      },
      {
        heading: "Photobiomodulation",
        paragraphs: [
          "From the Ancient Greek phos, light, and bios, life, and the Latin modulatio, measure. A special branch of phototherapy in which areas of the body, for example the head, are irradiated with near-infrared light to stimulate the mitochondria in the cells to higher performance. Among other effects, the cells regenerate faster and become more resilient.",
        ],
        links: [{ label: "Photobiomodulation Training", href: `${BOOKING}/photobiomodulation.html` }],
      },
      {
        heading: "BrainAvatar",
        paragraphs: [
          "BrainAvatar™ is the next generation of EEG and neurofeedback software, available for the Atlantis and Discovery systems. It combines all existing BrainMaster components with new functions, including EEG, peripheral modalities, and integrated evaluation and training, in a system without precedent.",
        ],
        links: [{ label: "BrainAvatar Training", href: `${BOOKING}/brainavatar.html` }],
      },
    ],
  } satisfies ArticlesContent,

  related: {
    label: "Related training",
    heading: "Start With QEEG",
    items: [
      { id: "qeeg-practice", title: "QEEG for Your Practice", icon: { kind: "brain" }, href: "/courses/qeeg-for-your-practice" },
      { id: "qeeg-workshop", title: "qEEG Workshop", icon: { kind: "pulse" }, href: QEEG_WORKSHOP_PATH },
      ALL_OFFERS,
    ],
  } satisfies CategoriesContent,

  cta: NEUROFEEDBACK_CTA,
};

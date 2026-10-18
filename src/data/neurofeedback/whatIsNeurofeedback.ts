// What Is Neurofeedback. Content from the live page
// neurofeedback-info.de/neurofeedback-de/was-ist-neurofeedback.html ("Neurofeedback kurz erklärt"),
// translated from German. The six source paragraphs are kept in full: the first as the
// introduction, the rest as the four steps of a session (the last two share a step).
// Photo from the same page (/images/2018/500x333/neurofeedback_500_333.jpg).

import type { ArticlesContent, CategoriesContent, CourseHeroContent, FeaturesContent } from "../coursePage";
import { ALL_OFFERS, NEUROFEEDBACK_CRUMB, NEUROFEEDBACK_CTA, RELATED } from "./shared";

export const whatIsNeurofeedback = {
  meta: {
    title: "What Is Neurofeedback? | IFEN",
    description:
      "Neurofeedback explained in brief: how the EEG makes brain activity visible and how feedback and reward help the brain learn a balanced state.",
  },

  hero: {
    title: "What Is Neurofeedback?",
    breadcrumb: [NEUROFEEDBACK_CRUMB, { label: "What Is Neurofeedback" }],
    badge: "Neurofeedback Explained",
    description:
      "A short explanation of how neurofeedback makes brain activity visible and trains it towards balance.",
    highlights: [],
  } satisfies CourseHeroContent,

  intro: {
    label: "In Brief",
    heading: "Neurofeedback Explained",
    items: [
      {
        paragraphs: [
          "Neurofeedback (from the Ancient Greek neuron, nerve) is a special branch of biofeedback. It is used above all for neural and psychosomatic complaints and disorders such as ADHD, epilepsy, depression, sleep disorders, and anxiety and panic disorders.",
        ],
        links: [{ label: "Where Neurofeedback Helps", href: RELATED.applications.href }],
      },
    ],
    image: {
      src: "/neurofeedback/what-is-neurofeedback.jpg",
      alt: "A client wearing an EEG electrode cap rests in a chair while a practitioner reads brain activity on a screen.",
    },
  } satisfies ArticlesContent,

  steps: {
    label: "How It Works",
    heading: "From the EEG to a Balanced Brain",
    numbered: true,
    items: [
      {
        heading: "Recording the EEG",
        text: "First, the electrical potential fluctuations in the brain are picked up by electrodes on the scalp and shown graphically in an electroencephalogram (EEG, from the Ancient Greek enkephalos, brain, and graphein, to write).",
      },
      {
        heading: "Reading the Brain Map",
        text: "Certain symptoms and clinical pictures can sometimes be read from anomalies in the EEG, which mostly result from an imbalance in brain activity. This is known as a brain map.",
      },
      {
        heading: "Training With Feedback",
        text: "In a session, the client's EEG makes their inner brain processes visible, usually through visualisations. One example is a video game in which a plane has to be steered through a target by changing brain activity.",
      },
      {
        heading: "Reward and Lasting Balance",
        text: "When the client settles into the desired state and steers the screen so that a goal is reached, the brain's reward centre is activated. This starts a learning process that improves brain activity. This positive feedback reinforces the brain in holding the state, and with regular training brain activity can be brought into balance in the long term.",
      },
    ],
  } satisfies FeaturesContent,

  related: {
    label: "Explore Further",
    heading: "Continue Learning",
    items: [RELATED.applications, RELATED.topics, ALL_OFFERS],
  } satisfies CategoriesContent,

  cta: NEUROFEEDBACK_CTA,
};

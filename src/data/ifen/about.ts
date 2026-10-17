// About IFEN. Content from the live page neurofeedback-info.de/ifen-de/ueber-uns.html
// ("Über das IFEN"), in the site's English translation. Every source paragraph is kept:
// what IFEN is, its vision, the director's message, the six points of the IFEN concept and
// the four team profiles. Dashes inside sentences became commas or brackets.
// Photo from the same page (NFB_klein); team portraits from the same page.

import type { ArticlesContent, CategoriesContent, CourseHeroContent, FeaturesContent, TeamContent } from "../coursePage";
import { ALL_OFFERS, IFEN_CRUMB, IFEN_CTA, LECTURERS_PATH, RELATED } from "./shared";

export const about = {
  meta: {
    title: "About IFEN | Institute for EEG Neurofeedback",
    description:
      "The Institute for EEG Neurofeedback (IFEN) was founded in Munich in 2008 by Thomas F. Feiner and is one of the leading training institutes for neurofeedback in Germany.",
  },

  hero: {
    title: "About IFEN",
    breadcrumb: [IFEN_CRUMB, { label: "About IFEN" }],
    badge: "Institute for EEG Neurofeedback",
    description:
      "The Institute for EEG Neurofeedback (IFEN for short) was founded in Munich in 2008 by Thomas F. Feiner and is one of the leading training institutes for neurofeedback in Germany.",
    highlights: [
      { value: "2008", label: "Founded in Munich" },
      { value: "300+", label: "Workshops and webinars since 2008" },
      { value: "25+ yrs", label: "Founder's work in neurofeedback" },
    ],
  } satisfies CourseHeroContent,

  vision: {
    label: "About us",
    heading: "What Is IFEN?",
    items: [
      {
        paragraphs: [
          "The Institute for EEG Neurofeedback (IFEN for short) was founded in Munich in 2008 by Thomas F. Feiner and is one of the leading training institutes for neurofeedback in Germany.",
        ],
      },
      {
        heading: "Vision and philosophy of IFEN",
        paragraphs: [
          "Neurofeedback is a rapidly developing field in medicine. This method has existed for about 50 years, yet it remains far too little known. Yet neurofeedback continues to offer unforeseen opportunities and possibilities for our entire healthcare system.",
          "These new incentives are urgently needed because our healthcare systems are facing an unprecedented challenge affecting the well-being of millions of people. To address this, we need methods that relieve the burden on the system, prevent cost increases, and ensure that the system does not collapse or ultimately descend into a two-tier healthcare system.",
          "The modern and scientifically based neurofeedback therapy method, as taught by IFEN (founded by Thomas Feiner) for over 12 years, has already helped thousands of patients suffering from life-threatening and debilitating illnesses. It helps people living in circumstances where their suffering is a significant burden and poses a risk to the health of their loved ones. We know the method works. We receive messages almost daily from enthusiastic therapists who are achieving remarkable therapeutic success with the IFEN method.",
        ],
      },
    ],
    image: {
      src: "/about/ifen-neurofeedback.jpg",
      alt: "A smiling practitioner places an EEG electrode on a young man's forehead in a treatment room.",
    },
  } satisfies ArticlesContent,

  director: {
    label: "From the director",
    heading: "Message from the Director",
    items: [
      {
        heading: "Thomas Feiner, Director of the Institute for EEG Neurofeedback",
        paragraphs: [
          "When I first encountered neurofeedback over 20 years ago, I was one of the first neurofeedback therapists in Germany, and the first in my hometown of Regensburg. Later, I moved to Munich, where there were also very few knowledgeable neurofeedback therapists. This fact puzzled me. Why is such an effective method so little known?",
          "I therefore see it as my duty to promote neurofeedback, to raise awareness about it, and to give neurofeedback a professional image. Only good and thorough training, with continuous professional development and further education, can ensure that neurofeedback becomes established in the long term and can benefit a broad public.",
          "We want to continue pursuing this goal together with the people who accompany and support us in training and research. And we are proud of that. Thanks to our involvement, hundreds of therapists have been able to build a livelihood with neurofeedback, whose excellent reputation has become an example for others. The Institute for EEG Neurofeedback, of which I have been director for more than 12 years, provides a foundation on which we pursue this goal together with people all over the world.",
          "We see it as our mission to promote standards in education, support scientists, and advance our own innovations through the IFEN Neuroscience Lab. Ultimately, it is an endeavor to enable a happier life for those whose fate has dealt a less favorable hand.",
        ],
      },
    ],
  } satisfies ArticlesContent,

  concept: {
    label: "The IFEN concept",
    heading: "Modern Neurofeedback",
    intro: [
      "Every client is unique, every brain is different. We know how important an individually tailored and holistic treatment is for therapy. Only in this way can rapid and lasting therapeutic success be guaranteed.",
      "We offer numerous benefits for our trainees and therapists that are unique in Germany:",
    ],
    items: [
      {
        heading: "Always up-to-date",
        text: "Scientific rigor is our top priority. We base the content of our courses exclusively on current, well-founded research and studies, as well as many years of experience. Furthermore, we work closely with international universities.",
      },
      {
        heading: "Always “hands-on”",
        text: "Practical experience is paramount at IFEN. The certificate is only awarded to those who can demonstrate sufficient experience through an internship and supervision with a personal mentor.",
      },
      {
        heading: "Closeness to people",
        text: "Our lecturers are not just technicians, but therapists and doctors who care about the well-being and health of people.",
      },
      {
        heading: "Reliable support",
        text: "Our experienced neurofeedback experts are available almost 24 hours a day, online and by phone.",
      },
      {
        heading: "Inclusive community",
        text: "No one is alone in the IFEN family. Our friendly community welcomes everyone who needs help and advice.",
      },
      {
        heading: "Extensive range of courses",
        text: "Our wide-ranging training program offers something for everyone. Our workshops are supported by international experts. Quantitative EEG is one of our key areas of focus.",
      },
    ],
  } satisfies FeaturesContent,

  team: {
    label: "Our team",
    heading: "The People Behind IFEN",
    people: [
      {
        name: "Thomas F. Feiner",
        role: "Founder & Director, Institute for EEG Neurofeedback (IFEN) | Founder, IFEN Neuroscience Lab | QEEG Diplomat | Board Member, FNNR",
        image: "/board/member-1.png",
        paragraphs: [
          "Thomas Feiner has been working in the field of neurofeedback and EEG-based brain diagnostics for more than 25 years. He is the founder and director of the Institute for EEG Neurofeedback (IFEN) in Munich and of the IFEN Neuroscience Lab, where he has developed innovative tools for measuring event-related potentials (ERPs) and other instruments for neurocognitive diagnostics.",
          "Since 2008, Thomas has conducted more than 300 workshops and webinars worldwide, training doctors, therapists, and researchers in neurofeedback, QEEG brain mapping, and ERP applications. His work includes the development of specialized EEG hardware, such as the Free-Cap-EEG system, and software solutions, such as the ERP Analyzer, which support both research and clinical practice.",
          "As a QEEG diplomat and board member of the Foundation for Neurofeedback, Neuromodulation, and Research (FNNR), Thomas actively collaborates with international experts to advance progress in cognitive health, aging research, and performance optimization. He has conducted research on heartbeat evoked potentials and other neurophysiological markers, contributing to the understanding of brain-body interaction and its significance for diagnostics and training.",
          "Driven by the goal of combining technological innovation with clinical expertise, Thomas provides professionals with the scientific foundation and practical skills to effectively and responsibly integrate neurofeedback and brainmapping into their work.",
        ],
        credentials: ["OT", "QEEG-D", "BCIA BCN"],
      },
      {
        name: "Alina Feiner",
        role: "Research, innovation and training concepts at IFEN",
        image: "/lecturers/alina-feiner.jpg",
        paragraphs: [
          "Alina Feiner has over 10 years of international experience as a manager in large and small companies, specializing in quality and change management. She holds a Master's degree in International Relations and Intercultural Strategies. She studied business administration at Al.I. Cuza University and the University of Rostock. Her most recent qualification is an Executive MBA from the Quantic School of Business and Technology. Alina Feiner is a certified internal auditor for quality management audits and ensures the continuous optimization of existing processes and improved customer loyalty.",
          "At the Institute for EEG Neurofeedback, she leads the development of new training concepts and uses her experience to drive research and innovation forward.",
          "Alina Feiner leads an international project to develop innovative solutions for the rehabilitation of stroke patients using NIR-PBM and speech therapy based on neuroscientific findings.",
          "In addition to her professional work, she possesses profound, long-standing knowledge and experience as a talent coach. She helps to identify and specifically develop talents in employees, colleagues, and friends. She speaks fluent English, Russian, Romanian, and German. In her free time, she enjoys learning to play the piano and programming.",
        ],
      },
      {
        name: "Maria Donaire",
        role: "Psychologist | Neuromarketing & Digital Strategy | Event & Marketing Coordinator at IFEN",
        image: "/lecturers/maria-donaire.jpg",
        paragraphs: [
          "María is a psychologist specialized in neuromarketing, digital strategy, and user-centered communication, with a strong interest in how emotions, cognition, and brain processes shape human behavior and decision-making.",
          "She studied Psychology at the University of the Balearic Islands and later specialized in neuromarketing and consumer psychology. In her master's thesis, she explored how emotional variables influence employee and customer performance within a hotel chain, with a particular focus on optimizing digital user experience and engagement.",
          "At IFEN, Institute for EEG Neurofeedback, María works at the intersection of psychology, neuroscience, and digital communication. As Event & Marketing Coordinator, she is responsible for shaping IFEN's educational communication, strengthening its digital presence, and connecting scientific neurofeedback training with the real needs of healthcare professionals.",
          "Her work includes content strategy, educational marketing, event coordination, and the translation of complex scientific concepts into clear, ethical, and human-centered communication. She is particularly interested in building meaningful learning journeys, supporting professional growth, and ensuring that IFEN's values (scientific rigor, responsibility, and human impact) are consistently reflected across all channels.",
        ],
      },
      {
        name: "Leidy Cubillos, PhD",
        role: "Head of Scientific Partnerships and Product Strategy",
        image: "/lecturers/leidy-cubillos.jpg",
        paragraphs: [
          "Dr. Leidy Cubillos-Pinilla brings deep scientific expertise in neurocognitive psychology, creativity research, and applied clinical and organizational neuroscience to the strategic development of our educational and communication formats.",
          "She has published in top-tier peer-reviewed journals such as the Journal of Small Business Management, Neuroscience & Biobehavioral Reviews, Biological Psychiatry, and PLOS ONE. Leidy has managed end-to-end research projects within Germany and international collaborators and supervised research projects, internships, and theses.",
          "Leidy holds a diploma in Psychology with a minor in Biology from the University of the Andes (Colombia). She gained early professional experience as HR Manager (Recruitment and Development) at Mercados Zapatoca SA. She later completed an M.Sc. in Neurocognitive Psychology at Ludwig Maximilian University of Munich (LMU) and contributed to several neuroscience laboratories.",
          "She earned her PhD in Management and Applied Neuroscience at the Technical University of Munich (TUM), where she also worked as a postdoctoral researcher, and subsequently completed a postdoctoral fellowship at the University of Cambridge (UK).",
          "Her interdisciplinary background, from psychology and neuroscience to human resources and neuroscientific methods such as EEG (resting-state and task-related measurements), fMRI, behavioral research, eye tracking, and data analysis, adds scientific depth and innovative momentum to the IFEN team.",
        ],
      },
    ],
  } satisfies TeamContent,

  related: {
    label: "Explore further",
    heading: "Get to Know IFEN",
    items: [RELATED.lecturers, RELATED.board, ALL_OFFERS],
  } satisfies CategoriesContent,

  cta: {
    ...IFEN_CTA,
    secondary: { label: "Continue to Our Lecturers", href: LECTURERS_PATH },
  },
};

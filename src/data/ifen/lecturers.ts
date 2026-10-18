// Lecturers index. Content from the live page neurofeedback-info.de/en/ifen-de/dozenten-m.html
// ("Our trainers"). All 25 lecturers in the source order. The source cards show only a name
// and the opening of each clinical profile, so each role line is a short summary of that
// opening sentence. Thomas Feiner links to his page here; the others still link to their
// live profile pages. Portraits from the same page.

import type { CategoriesContent, CourseHeroContent, Speaker, SpeakersContent } from "../coursePage";
import { LIVE } from "../courses/shared";
import { ALL_OFFERS, FEINER_PATH, IFEN_CRUMB, IFEN_CTA, RELATED } from "./shared";

const live = (slug: string) => `${LIVE}/ifen-de/dozenten-m/${slug}.html`;

/** [id, name, role, live profile slug]. The id is also the portrait file name. */
const LECTURERS: [string, string, string, string][] = [
  ["georg-handwerker", "Dr. Georg Handwerker", "Paediatrics and adolescent medicine, Passau", "2-dr-georg-handwerker"],
  ["timo-skladny", "Timo Skladny", "Occupational therapist, Regenstauf", "4-timo-skladny"],
  ["normen-schack", "Normen Schack, Sec. HP", "Occupational therapist, alternative practitioner and coach, Hanover", "7-normen-schack"],
  ["hanelore-branga", "Hanelore Branga", "Psychologist and occupational therapist", "19-hanelore-branga"],
  ["ruben-perez-elvira", "Dr. Rubén Pérez Elvira", "Clinical neuropsychologist, Salamanca", "21-ruben-perez-elvira"],
  ["monique-breithaupt-peters", "Monique Breithaupt-Peters", "Diploma psychologist and systemic coach", "24-monique-breithaupt-peters"],
  ["patricia-dornuf", "Patricia Dornuf", "Occupational therapist", "25-patricia-dornuf"],
  ["lena-ehrhard", "Lena Ehrhard", "Neurological disorders and rehabilitation", "42-lena-ehrhard"],
  ["giuseppe-chiarenza", "Prof. Giuseppe Augusto Chiarenza", "Child and adolescent neuropsychiatrist and neurologist", "45-prof-giuseppe-augusto-chiarenza-bcia"],
  ["christoph-garner", "Dr. med. Christoph Garner", "Neurologist and EEG expert", "47-dr-med-christoph-garner"],
  ["irmgard-moellenkamp", "Irmgard Möllenkamp", "Alternative practitioner for psychotherapy", "51-irmgard-moellenkamp"],
  ["javier-rodriguez-escobar", "Javier Rodriguez Escobar", "Clinical psychologist and psychotherapist", "60-javier-rodriguez-escobar"],
  ["ismael-castillo-reyes", "Dr. Ismael J. Castillo-Reyes", "Neuro-Cognitive Research Lab, Ponce Health Sciences University", "65-dr-ismael-j-castillo-reyes-phd-qeeg-dl"],
  ["annette-stolle", "Annette Stolle", "Occupational therapist", "66-annette-stolle"],
  ["andreea-muresanu", "Andreea Cristina Muresanu", "Neurofeedback therapist and clinical psychologist (MA)", "72-m"],
  ["daniel-cordeiro", "PhD Daniel Cordeiro", "Doctoral candidate in psychology, UPSA", "74-daniel-cordeiro"],
  ["yuval-oded", "Dr. Yuval Oded", "Psychologist, psychotherapy and applied psychophysiology", "76-dr-yuval-oded-psychologist"],
  ["franz-muehlberger", "Franz Mühlberger", "Registered nurse, psychiatry", "77-franz-muehlberger"],
  ["mark-smith", "Mark Llewellyn Smith, LCSW, BCN, QEEG-D", "Licensed clinical social worker", "78-mark-smith-0"],
  ["petra-seitz", "Petra Seitz", "Occupational therapist", "79-petra-seitz"],
  ["silvia-fois", "Silvia Fois, BCIA QEEG-D", "Psychologist and psychotherapist", "80-silvia-fois"],
  ["tanya-morosoli", "Tanya Morosoli, MSc, BCN", "Clinical neuropsychologist", "81-tanya-morosoli-msc-bcn"],
  ["dimitris-messinis", "Dr. Dimitris Messinis", "IFEN Representative for Switzerland, Neuchâtel", "82-dr-dimitris-messinis"],
  ["jamuna-rajeswaran", "Prof. Dr. Jamuna Rajeswaran", "Clinical neuropsychology, NIMHANS Bangalore", "83-prof-dr-jamuna-rajeswaran"],
];

/** A lecturer's card by id, linked to the live profile (module pages list their lecturers). */
export function lecturer(id: string): Speaker {
  const row = LECTURERS.find(([key]) => key === id);
  if (!row) throw new Error(`No lecturer with id ${id}`);
  const [, name, role, slug] = row;
  return { id, name, role, image: `/lecturers/${id}.jpg`, href: live(slug) };
}

export const lecturers = {
  meta: {
    title: "Our Lecturers | IFEN Neurofeedback",
    description: "A complete overview of the IFEN lecturers: doctors, psychologists and therapists who teach neurofeedback and QEEG.",
  },

  hero: {
    title: "Our Trainers",
    breadcrumb: [IFEN_CRUMB, { label: "Lecturers" }],
    badge: "Lecturers at IFEN",
    description: "Here you will find a complete overview of the speakers.",
    highlights: [
      { value: "25", label: "Lecturers" },
      { value: "2008", label: "IFEN Founded in Munich" },
    ],
  } satisfies CourseHeroContent,

  people: {
    label: "Lecturers at IFEN",
    heading: "Meet Our Lecturers",
    people: [
      {
        id: "thomas-feiner",
        name: "Thomas Feiner, BCIA BCN, QEEG-D",
        role: "Founder and Director of IFEN",
        image: "/lecturers/thomas-feiner.jpg",
        href: FEINER_PATH,
      },
      ...LECTURERS.map(
        ([id, name, role, slug]): Speaker => ({ id, name, role, image: `/lecturers/${id}.jpg`, href: live(slug) }),
      ),
    ],
  } satisfies SpeakersContent,

  related: {
    label: "Explore Further",
    heading: "Get to Know IFEN",
    items: [RELATED.about, RELATED.therapists, ALL_OFFERS],
  } satisfies CategoriesContent,

  cta: IFEN_CTA,
};

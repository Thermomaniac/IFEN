// On-site interest-list pages, one per entry in the schedule's `interestList`. Content
// from the live Seminarman prospect pages (neurofeedback-info.de, .../prospect/*.html):
// course number, price, place, the description and the sign-up form. The description
// keeps the live English text; the BrainAvatar page is German only, so it follows the
// same English text, and the Spanish pages keep their Spanish text.

import { BOOKING_CRUMB } from "./booking/shared";
import type { CourseHeroContent, SectionHead } from "./coursePage";
import { interestList, type ScheduleItem } from "./schedule";

export type InterestPage = {
  slug: string;
  item: ScheduleItem;
  meta: { title: string; description: string };
  hero: CourseHeroContent;
};

/** The live English description, with the topic set per page. */
const english = (topic: string) => [
  `Are you interested in a further education around the topic ${topic} and currently there is no corresponding training offer online?`,
  "No problem. Please send us the form below and let us know your interest. As soon as we include appropriate further education programs in the program, you will receive a message to your deposited e-mail address.",
];

/** The live Spanish description, with the topic set per page. */
const spanish = (topic: string) => [
  `¿Está interesado en una formación adicional sobre el tema del ${topic} y actualmente no hay una oferta de formación correspondiente en línea?`,
  "No hay problema. Por favor, envíenos el formulario a continuación y háganos saber su interés. Tan pronto como incluyamos programas de formación adecuados en nuestro programa, recibirá un mensaje en la dirección de correo electrónico que haya proporcionado.",
];

const DESCRIPTIONS: Record<string, { slug: string; text: string[]; lang?: string }> = {
  "AVA-INTER": { slug: "brainavatar", text: english("BrainAvatar") },
  "M1-EN": { slug: "module-1-en", text: english("Module 1") },
  "M1-ES": { slug: "module-1-es", text: spanish("Módulo 1"), lang: "es" },
  "NM-INTER": { slug: "neuromeditation", text: english("Neuromeditation") },
  "PBM-INTER": { slug: "photobiomodulation", text: english("photobiomodulation") },
  "QEEG-ES": { slug: "workshop-isf-es", text: spanish("QEEG"), lang: "es" },
};

/** "Tragen Sie sich in die Interessentenliste ein!" above the form. */
export const interestFormHead: SectionHead = {
  label: "Interest List",
  heading: "Join the Interest List",
};

export const interestPages: InterestPage[] = interestList.map((item) => {
  const entry = DESCRIPTIONS[item.code];
  if (!entry) throw new Error(`Interest list: no page content for ${item.code}`);
  return {
    slug: entry.slug,
    item,
    meta: { title: `${item.title} | IFEN`, description: entry.text[0] },
    hero: {
      title: item.title,
      breadcrumb: [BOOKING_CRUMB, { label: "Interest List" }],
      badge: "Interest List",
      description: entry.text,
      lang: entry.lang,
      highlights: [],
      booking: {
        code: item.code,
        ...(item.prices.length > 0 ? { prices: item.prices } : { eyebrow: "Price", priceNote: "Free" }),
        facts: [{ label: "Location", value: item.location, icon: "location" }],
        cta: { label: "Join the Interest List", href: "#interest" },
      },
    },
  };
});

export const getInterestPage = (slug: string) => interestPages.find((p) => p.slug === slug);

// Workshop locations overview. Source: https://www.neurofeedback-info.de/workshoporte.html and its
// English version https://www.neurofeedback-info.de/en/workshoporte.html, fetched 2026-11-10.
// The source lists 11 entries; "Seminar Location Baldham, Munich" (411) repeats "Venue Baldham,
// Munich" (403), so 10 venues remain. Venue and host names follow the English page; street lines
// follow the German page where the English one is mistranslated (Offenburg "Str. 58" for
// "Hauptstr. 58", "Munster", "Schuettorf"). Hannover and Baldham link to their redesigned pages,
// the rest to their legacy detail pages. Watercolours are the legacy homepage city images
// (all 3:2); the source has no image of its own for Offenburg, Bad Griesbach or Schüttorf and
// reuses other cities' pictures, so those cards show a neutral placeholder instead.

import type { CourseHeroContent, CtaContent, SectionHead } from "./coursePage";
import { LISTING_PATH } from "./coursePage";
import { venuePath, VENUES_PATH } from "./venues";

export type VenueCard = {
  /** City label above the name. */
  city: string;
  /** Host institution or practice. */
  name: string;
  /** Extra lines (department, room) and the street address, in source order. */
  lines: string[];
  href: string;
  image?: { src: string; alt: string };
};

const LEGACY = "https://www.neurofeedback-info.de/en/workshoporte";

export const venueCards = [
  {
    city: "Bad Griesbach",
    name: "KWA Clinic Stift Rottal",
    lines: ["Max-Köhler-Strasse 3", "94086 Bad Griesbach"],
    href: `${LEGACY}/402-seminarort-bad-griesbach-klinik-stift-rottal.html`,
  },
  {
    city: "Baldham, Munich",
    name: "Institute for EEG Neurofeedback",
    lines: ["Karl-Böhm-Strasse 50", "85598 Baldham"],
    href: venuePath("baldham-munich"),
    image: {
      src: "/locations/legacy/muenchen.jpg",
      alt: "Watercolour of Munich's Marienplatz with the Frauenkirche and the New Town Hall",
    },
  },
  {
    city: "Berlin",
    name: "EIZ-Berlin gGmbH (European Integration Centre)",
    lines: ["Diversity & Intercultural Academy", "Harzer Strasse 51-52", "12059 Berlin"],
    href: `${LEGACY}/396-seminarort-berlin-eiz.html`,
    image: { src: "/locations/legacy/berlin.jpg", alt: "Watercolour of the Brandenburg Gate in Berlin" },
  },
  {
    city: "Hamburg",
    name: "Practice for occupational therapy Schürholz Sievers",
    lines: ["Therapy Center Fuhlsbüttel", "Etzestr. 64", "22335 Hamburg"],
    href: `${LEGACY}/189-serminarort-hamburg.html`,
    image: { src: "/locations/legacy/hamburg.jpg", alt: "Watercolour of the Elbphilharmonie in Hamburg" },
  },
  {
    city: "Hannover",
    name: "Occupational therapy in Hanover",
    lines: ["Neue-Land-Str. 7", "30655 Hanover"],
    href: venuePath("hannover"),
    image: {
      src: "/locations/legacy/hannover.jpg",
      alt: "Watercolour of the New Town Hall in Hannover reflected in the Maschteich",
    },
  },
  {
    city: "Münster",
    name: "ITF - Institute for Therapeutic Training",
    lines: ["Kiesekampweg 8", "48157 Münster"],
    href: `${LEGACY}/398-seminarort-muenster.html`,
    image: { src: "/locations/legacy/muenster.jpg", alt: "Watercolour of St. Paulus Cathedral on the Domplatz in Münster" },
  },
  {
    city: "Offenburg",
    name: "Venue Offenburg",
    lines: ["Hauptstr. 58", "77652 Offenburg"],
    href: `${LEGACY}/408-seminarort-offenburg.html`,
  },
  {
    city: "Regensburg",
    name: "medbo - Regensburg District Hospital",
    lines: ["Universitätsstrasse 84", "93053 Regensburg"],
    href: `${LEGACY}/363-seminarort-regensburg.html`,
    image: {
      src: "/locations/legacy/regensburg.jpg",
      alt: "Watercolour of the Regensburg old town and cathedral across the Danube",
    },
  },
  {
    city: "Rotenburg an der Fulda",
    name: "HKZ (Heart and Circulation Center)",
    lines: ["Conference room at the main entrance", "Heinz-Meise-Strasse 100", "36199 Rotenburg an der Fulda"],
    href: `${LEGACY}/397-seminarort-rotenburg-an-der-fulda-hkz.html`,
    image: {
      src: "/locations/legacy/rotenburg.jpg",
      alt: "Watercolour of a church and half-timbered houses in Rotenburg an der Fulda",
    },
  },
  {
    city: "Schüttorf",
    name: "Practice for Occupational Therapy and Neurofeedback",
    lines: ["Hany Branga", "Milchstrasse 19", "48465 Schüttorf"],
    href: `${LEGACY}/410-seminarort-schuettorf.html`,
  },
] satisfies VenueCard[];

export const venueListPage = {
  meta: {
    title: "Workshop Locations in Germany | IFEN",
    description: "The venues across Germany where IFEN neurofeedback courses and workshops take place, with addresses and venue details.",
  },
  hero: {
    title: "Workshop Locations",
    breadcrumb: [{ label: "Course Dates", href: LISTING_PATH }, { label: "Workshop Locations" }],
    badge: "Workshop Locations",
    description: "IFEN courses and workshops take place at these venues across Germany. Open a venue for its address and details.",
    highlights: [
      { value: venueCards.length.toString(), label: "Venues" },
      { value: "Germany", label: "Country" },
    ],
  } satisfies CourseHeroContent,
  head: { label: "All Venues", heading: "Where Our Courses Take Place" } satisfies SectionHead,
  /** Card affordance; external cards add the new-tab note for screen readers. */
  more: "View venue details",
  newTab: "(opens the venue page on neurofeedback-info.de in a new tab)",
  placeholder: "No photo of this venue yet",
  cta: {
    label: "Course Dates",
    headingLines: ["Find a course", "near you"],
    action: { label: "View Course Dates", href: LISTING_PATH },
  } satisfies CtaContent,
};

export { VENUES_PATH };

// Version 2 therapist profile: a directory practice shown with only what its legacy profile
// publishes (therapeutenliste.neurofeedback-info.de): qualifications, address, contact and
// the map. No bio, prices, availability or booking; none of that exists for these records.

import type { Metadata } from "next";
import type { CtaContent } from "./coursePage";
import { DIRECTORY_PATH, therapists, type Therapist } from "./therapists";

/** Practices with a Version 2 profile page. Add an id to publish its profile. */
export const PRACTICE_PROFILE_IDS = ["alphawave-praxis-fuer-ergotherapie-und-neurofeedback"];

export const practiceProfilePath = (id: string) => `${DIRECTORY_PATH}/${id}`;

/** The directory record behind a practice profile, without the list's placeholder photo. */
export function getPractice(id: string): Therapist | undefined {
  if (!PRACTICE_PROFILE_IDS.includes(id)) return undefined;
  const record = therapists.find((t) => t.id === id);
  return record && { ...record, photo: undefined, photoPlaceholder: undefined };
}

/** The directory list in Version 2: practices with a profile link to it. */
export const withProfileLinks = (list: Therapist[]) =>
  list.map((t) => (PRACTICE_PROFILE_IDS.includes(t.id) ? { ...t, profileHref: practiceProfilePath(t.id) } : t));

export type PracticeSectionId = "qualifications" | "address" | "contact";

/** The legacy profile's sections, in its order. */
export const PRACTICE_NAV: { id: PracticeSectionId; label: string }[] = [
  { id: "qualifications", label: "Qualifications" },
  { id: "address", label: "Address" },
  { id: "contact", label: "Contact" },
];

export const practiceHeads: Record<PracticeSectionId, string> = {
  qualifications: "Qualifications",
  address: "Address",
  contact: "Contact",
};

export const practiceCopy = {
  badge: "Therapist Profile",
  location: "Practice Location",
  directions: "Get Directions",
  rows: {
    street: "Street",
    city: "Postcode and city",
    country: "Country",
    person: "Contact person",
    phone: "Phone",
    email: "Email",
    website: "Website",
  },
};

export const practiceCta: CtaContent = {
  label: "Therapist List",
  headingLines: ["Looking for another", "practice near you?"],
  action: { label: "Back to Therapist List", href: DIRECTORY_PATH },
};

export const practiceMeta = (t: Therapist): Metadata => ({
  title: `${t.name} | IFEN Therapist List`,
  description: [t.contact, t.name, t.address?.city].filter(Boolean).join(", ") + ". Neurofeedback qualifications, address and contact.",
});

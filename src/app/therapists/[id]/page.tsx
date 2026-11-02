import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CourseHero } from "@/components/course/CourseHero";
import { Faq } from "@/components/course/Faq";
import { LevelIcon } from "@/components/directory/LevelBadge";
import { PracticeLocation } from "@/components/directory/PracticeLocation";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { Badges, Box, Group, IconList, List, Rows, Stats } from "@/components/directory/ProfileParts";
import { ProfileSection } from "@/components/directory/ProfileSection";
import { ProfileVersionGate } from "@/components/directory/ProfileVersionGate";
import { addressLines, directionsHref } from "@/lib/therapists";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { LISTING_PATH, type CourseHeroContent, type CtaContent } from "@/data/coursePage";
import {
  DEMO_ID,
  DEMO_PROFILE,
  DEMO_THERAPIST,
  getDemoProfile,
  sessionFacts,
} from "@/data/demo/demoTherapist";
import {
  getPractice,
  PRACTICE_NAV,
  PRACTICE_PROFILE_IDS,
  practiceCopy,
  practiceCta,
  practiceHeads,
  practiceMeta,
  practiceProfilePath,
  type PracticeSectionId,
} from "@/data/practiceProfile";
import {
  bookingPath,
  profilePath,
  METHOD_GROUPS,
  profileFaq,
  profileHeads,
  profileMeta,
  SECTION_NAV,
  type ProfileSectionId,
} from "@/data/therapistProfile";
import { COUNTRIES, DIRECTORY_PATH, flagSrc, LEVELS, QUALIFICATIONS, type Therapist } from "@/data/therapists";
import styles from "@/components/directory/Profile.module.css";

type Props = PageProps<"/therapists/[id]">;

// Version 1: the demo mentor with the booking flow. Version 2: directory practices with a
// profile, from their published record only. Every other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: DEMO_ID }, ...PRACTICE_PROFILE_IDS.map((id) => ({ id }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const practice = getPractice(id);
  if (practice) return practiceMeta(practice);
  const p = getDemoProfile(id);
  return p ? profileMeta(p.person, p.practice, p.city) : {};
}

const p = DEMO_PROFILE;
const s = p.session;
const level = LEVELS.find((l) => l.id === DEMO_THERAPIST.level);
const country = DEMO_THERAPIST.country ? COUNTRIES[DEMO_THERAPIST.country] : undefined;
const book = { label: "Register For Booking", href: bookingPath(DEMO_ID) };

const hero: CourseHeroContent = {
  title: p.person,
  breadcrumb: [{ label: "Course Booking", href: LISTING_PATH }, { label: "Mentoring" }],
  badge: "Therapist Profile",
  portrait: { src: p.portrait, alt: `Portrait of ${p.person}` },
  subline: {
    parts: [p.practice, `From ${country ?? "Germany"}`],
    flag: DEMO_THERAPIST.country
      ? { src: `/flags/countries/${DEMO_THERAPIST.country}.png`, alt: "" }
      : undefined,
  },
  description: p.summary,
  highlights: [
    { value: `${p.mentorshipYears} yrs`, label: "Mentorship Experience" },
    ...(level ? [{ value: level.label, label: "Expert Level Status" }] : []),
    { value: p.lecturer ? "Yes" : "No", label: "IFEN Lecturer" },
  ],
  booking: {
    eyebrow: "Book Your Mentor",
    prices: [{ label: s.label, amount: s.price }],
    facts: sessionFacts(s),
    cta: book,
  },
};

const cta: CtaContent = {
  label: "Next Step",
  headingLines: ["Ready to book", "your mentoring session?"],
  action: book,
  secondary: { label: "Back to Therapist List", href: DIRECTORY_PATH },
};

/** One profile section, headed from the shared profile headings. */
function Section({ id, children }: { id: ProfileSectionId; children: ReactNode }) {
  return (
    <ProfileSection id={id} heading={profileHeads[id]}>
      {children}
    </ProfileSection>
  );
}

const QUAL_ICONS = new Map(QUALIFICATIONS.map((q) => [q.id, q.icon]));

export default async function TherapistProfilePage({ params }: Props) {
  const id = (await params).id;
  const practice = getPractice(id);
  if (practice) return <PracticeProfile t={practice} />;
  if (!getDemoProfile(id)) notFound();
  return <MentorProfile />;
}

/** Version 1: the demo mentor's profile with the booking panel, extra sections and FAQ. */
function MentorProfile() {
  const methodGroups = METHOD_GROUPS.map((g) => ({
    ...g,
    items: QUALIFICATIONS.filter((q) => g.methods.includes(q.id) && p.expertise.methods.includes(q.id)),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero route="/therapists/[id]" content={hero} />

        <div className={styles.band}>
          <div className={styles.layout}>
            <ProfileNav items={SECTION_NAV} book={book} />

            <div className={styles.sections}>
              <Section id="overview">
                <div className={styles.bio}>
                  {p.overview.bio.map((text) => (
                    <RevealItem key={text} as="p" className={styles.text}>
                      {text}
                    </RevealItem>
                  ))}
                </div>
                <Stats items={p.overview.facts} />
              </Section>

              <Section id="credentials">
                <Rows
                  items={p.credentials.map((c) => ({
                    label: c.label,
                    note: c.note,
                    value:
                      c.label === "IFEN expert level" && DEMO_THERAPIST.level ? (
                        <span className={styles.level}>
                          <LevelIcon level={DEMO_THERAPIST.level} size={16} />
                          {c.value}
                        </span>
                      ) : (
                        c.value
                      ),
                  }))}
                />
              </Section>

              <Section id="expertise">
                <div className={styles.boxes}>
                  <Box title="Protocols">
                    <Badges
                      items={p.expertise.protocols.map((r) => ({
                        label: r.label,
                        icon: r.method && QUAL_ICONS.get(r.method),
                      }))}
                    />
                  </Box>
                  <Box title="Age groups">
                    <Badges items={p.expertise.ageGroups.map((label) => ({ label }))} />
                  </Box>
                  {methodGroups.map((g) => (
                    <Box key={g.id} title={g.label}>
                      <Badges items={g.items} check />
                    </Box>
                  ))}
                </div>
              </Section>

              <Section id="experience">
                <RevealItem as="ol" className={styles.timeline}>
                  {p.experience.map((e) => (
                    <li key={e.period + e.role} className={styles.step}>
                      <span className={styles.period}>{e.period}</span>
                      <span className={styles.role}>{e.role}</span>
                      <span className={styles.place}>{e.place}</span>
                    </li>
                  ))}
                </RevealItem>
              </Section>

              <Section id="mentorship">
                <RevealItem as="p" className={styles.text}>
                  {p.mentorship.audience}
                </RevealItem>
                <Group title="What sessions cover">
                  <List items={p.mentorship.covers} />
                </Group>
                <Group title="Before you book">
                  <List items={p.mentorship.prerequisites} />
                </Group>
              </Section>
            </div>
          </div>
        </div>

        <Faq id="faq" tone="white" content={profileFaq} />
      </main>
      <CtaFooter content={cta} />
      <ProfileVersionGate version="v1" other={practiceProfilePath(PRACTICE_PROFILE_IDS[0])} />
    </>
  );
}

function PracticeSection({ id, children }: { id: PracticeSectionId; children: ReactNode }) {
  return (
    <ProfileSection id={id} heading={practiceHeads[id]}>
      {children}
    </ProfileSection>
  );
}

const QUAL_LABELS = new Map(QUALIFICATIONS.map((q) => [q.id, q]));

/**
 * Version 2: a directory practice with only what its legacy profile publishes. The hero's
 * white panel holds the location map in place of booking; no prices, availability or bio.
 */
function PracticeProfile({ t }: { t: Therapist }) {
  const country = t.country ? COUNTRIES[t.country] : undefined;
  const quals = t.qualifications.map((id) => QUAL_LABELS.get(id)!).filter(Boolean);
  const directions = directionsHref(t);
  const { rows } = practiceCopy;

  const hero: CourseHeroContent = {
    title: t.name,
    breadcrumb: [{ label: "Therapist List", href: DIRECTORY_PATH }, { label: t.contact ?? t.name }],
    badge: practiceCopy.badge,
    subline: {
      parts: [t.contact, country && `From ${country}`].filter(Boolean) as string[],
      flag: t.country ? { src: flagSrc(t.country), alt: "" } : undefined,
    },
    description: [],
    highlights: [
      { value: String(quals.length), label: "Listed Qualifications" },
      ...(t.address?.city ? [{ value: t.address.city, label: "Practice City" }] : []),
      ...(t.qualifications.includes("mentoring") ? [{ value: "Yes", label: "Mentoring Provider" }] : []),
    ],
  };

  const address = addressLines(t);
  const contact = [
    t.contact && { label: rows.person, value: t.contact },
    t.phone && {
      label: rows.phone,
      value: (
        <a href={`tel:${t.phone.replace(/\s/g, "")}`} className={styles.link}>
          {t.phone}
        </a>
      ),
    },
    t.email && {
      label: rows.email,
      value: (
        <a href={`mailto:${t.email}`} className={styles.link}>
          {t.email}
        </a>
      ),
    },
    t.website && {
      label: rows.website,
      value: (
        <a href={t.website} className={styles.link} target="_blank" rel="noopener noreferrer">
          {t.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
  ].filter(Boolean) as { label: string; value: ReactNode }[];

  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero
          route="/therapists/[id]"
          content={hero}
          panel={t.location ? { children: <PracticeLocation therapist={t} /> } : undefined}
        />

        <div className={styles.band}>
          <div className={styles.layout}>
            <ProfileNav items={PRACTICE_NAV} />

            <div className={styles.sections}>
              <PracticeSection id="qualifications">
                <IconList items={quals.map((q) => ({ label: q.label, icon: q.icon }))} />
              </PracticeSection>

              <PracticeSection id="address">
                <Rows
                  items={[
                    ...(address[0] ? [{ label: rows.street, value: address[0] }] : []),
                    ...(address[1] ? [{ label: rows.city, value: address[1] }] : []),
                    ...(country ? [{ label: rows.country, value: country }] : []),
                  ]}
                />
                {directions && (
                  <RevealItem as="p" className={styles.text}>
                    <a href={directions} className={styles.link} target="_blank" rel="noopener noreferrer">
                      {practiceCopy.directions}
                      <span className="sr-only"> in Google Maps (opens in a new tab)</span>
                    </a>
                  </RevealItem>
                )}
              </PracticeSection>

              {contact.length > 0 && (
                <PracticeSection id="contact">
                  <Rows items={contact} />
                </PracticeSection>
              )}
            </div>
          </div>
        </div>
      </main>
      <CtaFooter content={practiceCta} />
      <ProfileVersionGate version="v2" other={profilePath(DEMO_ID)} />
    </>
  );
}

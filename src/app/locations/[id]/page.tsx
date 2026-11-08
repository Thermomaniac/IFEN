import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CourseHero } from "@/components/course/CourseHero";
import { Box, Rows } from "@/components/directory/ProfileParts";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { ProfileSection } from "@/components/directory/ProfileSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { LISTING_PATH, type CourseHeroContent } from "@/data/coursePage";
import {
  directionsHref,
  getVenue,
  venueCopy,
  venueCta,
  venueHeads,
  venueMeta,
  VENUE_IDS,
  VENUE_NAV,
  type Venue,
  type VenueSectionId,
} from "@/data/venues";
import styles from "@/components/directory/Profile.module.css";

type Props = PageProps<"/locations/[id]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return VENUE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const venue = getVenue(id);
  return venue ? venueMeta(venue) : {};
}

export default async function VenuePage({ params }: Props) {
  const id = (await params).id;
  const venue = getVenue(id);
  if (!venue) notFound();
  return <VenueProfile v={venue} />;
}

function Section({ id, children }: { id: VenueSectionId; children: ReactNode }) {
  return (
    <ProfileSection id={id} heading={venueHeads[id]}>
      {children}
    </ProfileSection>
  );
}

function VenueProfile({ v }: { v: Venue }) {
  const { rows } = venueCopy;
  const directions = directionsHref(v);

  const hero: CourseHeroContent = {
    title: v.name,
    breadcrumb: [{ label: "Course Dates", href: LISTING_PATH }, { label: v.name }],
    badge: venueCopy.badge,
    subline: { parts: [v.practice] },
    description: [],
    image: v.heroImage,
    highlights: [
      { value: v.hotels.length.toString(), label: "Hotels Nearby" },
      { value: v.address[v.address.length - 1] ?? "", label: "City" },
    ],
  };

  const contact = [
    v.contact && { label: rows.person, value: v.contact },
    v.phone && {
      label: rows.phone,
      value: (
        <a href={`tel:${v.phone.replace(/[^+\d]/g, "")}`} className={styles.link}>
          {v.phone}
        </a>
      ),
    },
    v.fax && { label: rows.fax, value: v.fax },
    v.email && {
      label: rows.email,
      value: (
        <a href={`mailto:${v.email}`} className={styles.link}>
          {v.email}
        </a>
      ),
    },
    v.website && {
      label: rows.website,
      value: (
        <a href={v.website.href} className={styles.link} target="_blank" rel="noopener noreferrer">
          {v.website.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
  ].filter(Boolean) as { label: string; value: ReactNode }[];

  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero route="/locations/[id]" content={hero} />

        <div className={styles.band}>
          <div className={styles.layout}>
            <ProfileNav items={VENUE_NAV} />

            <div className={styles.sections}>
              <Section id="address">
                <Rows
                  items={[
                    { label: rows.street, value: v.address[0] },
                    { label: rows.city, value: v.address[1] },
                  ]}
                />
                {contact.length > 0 && <Rows items={contact} />}
              </Section>

              <Section id="directions">
                {v.directionsText.map((text) => (
                  <RevealItem key={text} as="p" className={styles.text}>
                    {text}
                  </RevealItem>
                ))}
                {v.transit?.map((group) => (
                  <RevealItem key={group.heading} className={styles.box}>
                    <h3 className={styles.groupTitle}>{group.heading}</h3>
                    <ul className={styles.list}>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </RevealItem>
                ))}
                {v.parkingNote && (
                  <RevealItem as="p" className={styles.text}>
                    {v.parkingNote}
                  </RevealItem>
                )}
                {v.shoppingNote && (
                  <RevealItem as="p" className={styles.text}>
                    {v.shoppingNote}
                  </RevealItem>
                )}
                <RevealItem as="p" className={styles.text}>
                  <a href={directions} className={styles.link} target="_blank" rel="noopener noreferrer">
                    {venueCopy.directions}
                    <span className="sr-only"> in Google Maps (opens in a new tab)</span>
                  </a>
                </RevealItem>
              </Section>

              <Section id="hotels">
                <div className={styles.boxes}>
                  {v.hotels.map((hotel) => (
                    <Box key={hotel.name} title={hotel.name} className={styles.hotelBox}>
                      <Rows
                        items={[
                          { label: "Address", value: hotel.address.join(", ") },
                          ...(hotel.distance ? [{ label: "Distance", value: hotel.distance }] : []),
                          ...(hotel.travel ? [{ label: "Getting there", value: hotel.travel.join(" · ") }] : []),
                          ...(hotel.features ? [{ label: "Features", value: hotel.features }] : []),
                          ...(hotel.phone ? [{ label: "Phone", value: hotel.phone }] : []),
                          ...(hotel.fax ? [{ label: "Fax", value: hotel.fax }] : []),
                          ...(hotel.email
                            ? [
                                {
                                  label: "Email",
                                  value: (
                                    <a href={`mailto:${hotel.email}`} className={styles.link}>
                                      {hotel.email}
                                    </a>
                                  ),
                                },
                              ]
                            : []),
                          ...(hotel.website
                            ? [
                                {
                                  label: "Website",
                                  value: (
                                    <a
                                      href={hotel.website.href}
                                      className={styles.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {hotel.website.label}
                                      <span className="sr-only"> (opens in a new tab)</span>
                                    </a>
                                  ),
                                },
                              ]
                            : []),
                          ...(hotel.gps ? [{ label: "GPS", value: hotel.gps }] : []),
                        ]}
                      />
                    </Box>
                  ))}
                </div>
              </Section>
            </div>
          </div>
        </div>
      </main>
      <CtaFooter content={venueCta} />
    </>
  );
}

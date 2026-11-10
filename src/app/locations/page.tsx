import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSection } from "@/components/course/CourseSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VenueGrid } from "@/components/sections/Locations/VenueGrid";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { venueCards, venueListPage as page } from "@/data/venueList";

export const metadata: Metadata = page.meta;

export default function LocationsPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero route="/locations" content={page.hero} />
        <CourseSection id="venues" tone="mist" head={page.head}>
          <VenueGrid venues={venueCards} />
        </CourseSection>
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

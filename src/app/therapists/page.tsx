import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSection } from "@/components/course/CourseSection";
import { PracticeMap } from "@/components/directory/PracticeMap";
import { TherapistDirectory } from "@/components/directory/TherapistDirectory";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { DEMO_THERAPIST } from "@/data/demo/demoTherapist";
import { withProfileLinks } from "@/data/practiceProfile";
import { directoryPage, therapists } from "@/data/therapists";

export const metadata: Metadata = directoryPage.meta;

export default function TherapistsPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero route="/therapists" content={directoryPage.hero} aside={<PracticeMap />} />
        <CourseSection id="therapists" tone="mist" head={directoryPage.head}>
          <TherapistDirectory therapists={withProfileLinks(therapists)} demo={DEMO_THERAPIST} />
        </CourseSection>
      </main>
      <CtaFooter content={directoryPage.cta} />
    </>
  );
}

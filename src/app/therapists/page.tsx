import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSection } from "@/components/course/CourseSection";
import { TherapistDirectory } from "@/components/directory/TherapistDirectory";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { DEMO_THERAPIST } from "@/data/demo/demoTherapist";
import { directoryPage, therapists } from "@/data/therapists";

export const metadata: Metadata = directoryPage.meta;

export default function TherapistsPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={directoryPage.hero} />
        <CourseSection id="therapists" tone="mist" head={directoryPage.head}>
          {/* Demo fixture first: the only card with a profile page in this prototype. */}
          <TherapistDirectory therapists={[DEMO_THERAPIST, ...therapists]} />
        </CourseSection>
      </main>
      <CtaFooter content={directoryPage.cta} />
    </>
  );
}

import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSchedule } from "@/components/course/CourseSchedule";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { interestList, listingPage, scheduleDates, scheduleIntro } from "@/data/schedule";

export const metadata: Metadata = listingPage.meta;

export default function CoursesPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={listingPage.hero} />
        <CourseSchedule dates={scheduleDates} interest={interestList} notes={scheduleIntro.notes} />
      </main>
      <CtaFooter content={listingPage.cta} />
    </>
  );
}

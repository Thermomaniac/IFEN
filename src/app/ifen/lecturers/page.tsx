import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { Mentors } from "@/components/course/Mentors";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { lecturers as page } from "@/data/ifen/lecturers";

export const metadata: Metadata = page.meta;

export default function LecturersPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <Mentors id="lecturers" tone="mist" grid content={page.people} />
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

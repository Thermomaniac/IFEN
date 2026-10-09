import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseOverview } from "@/components/course/CourseOverview";
import { Curriculum } from "@/components/course/Curriculum";
import { FeatureGrid } from "@/components/course/FeatureGrid";
import { Mentors } from "@/components/course/Mentors";
import { Pathway } from "@/components/course/Pathway";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { module1 } from "@/data/courses/module1";

export const metadata: Metadata = module1.meta;

export default function Module1Page() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={module1.hero} />
        <CourseOverview content={module1.overview} />
        <CourseArticles id="audience" tone="white" content={module1.audience} />
        <FeatureGrid id="why" tone="cream" content={module1.why} />
        <Curriculum id="curriculum" tone="white" content={module1.curriculum} />
        <Pathway id="pathway" tone="mist" content={module1.pathway} />
        <CourseArticles id="practical" tone="white" content={module1.practical} />
        <CourseArticles id="booking-info" tone="mist" content={module1.booking} />
        <Mentors content={module1.speakers} />
        <Categories content={module1.categories} />
      </main>
      <CtaFooter content={module1.cta} />
    </>
  );
}

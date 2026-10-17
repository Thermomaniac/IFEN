import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { FeatureGrid } from "@/components/course/FeatureGrid";
import { Team } from "@/components/course/Instructor";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { about as page } from "@/data/ifen/about";

export const metadata: Metadata = page.meta;

export default function AboutPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <CourseArticles id="vision" tone="mist" variant="media" content={page.vision} />
        <CourseArticles id="director" tone="cream" content={page.director} />
        <FeatureGrid id="concept" tone="white" content={page.concept} />
        <Team id="team" tone="mist" content={page.team} />
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

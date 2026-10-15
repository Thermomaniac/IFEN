import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { applications as page } from "@/data/neurofeedback/applications";

export const metadata: Metadata = page.meta;

export default function ApplicationsPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <CourseArticles id="effects" tone="mist" variant="panels" content={page.effects} />
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { topics as page } from "@/data/neurofeedback/topics";

export const metadata: Metadata = page.meta;

export default function TopicsPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <CourseArticles id="topics" tone="mist" variant="rows" content={page.topics} />
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

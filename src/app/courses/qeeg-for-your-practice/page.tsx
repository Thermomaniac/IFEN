import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseOverview } from "@/components/course/CourseOverview";
import { Faq } from "@/components/course/Faq";
import { FeatureGrid } from "@/components/course/FeatureGrid";
import { FocusCards } from "@/components/course/FocusCards";
import { FormatSteps } from "@/components/course/FormatSteps";
import { Instructor } from "@/components/course/Instructor";
import { Mentors } from "@/components/course/Mentors";
import { RoleMarquee } from "@/components/course/RoleMarquee";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { qeeg } from "@/data/courses/qeeg";

export const metadata: Metadata = qeeg.meta;

export default function QeegPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={qeeg.hero} />
        <CourseOverview content={qeeg.overview} />
        <FormatSteps id="format" tone="white" content={qeeg.format} />
        <CourseArticles id="beyond" tone="cream" content={qeeg.beyond} />
        <FocusCards id="develop" tone="white" content={qeeg.develop} />
        <FeatureGrid id="flexible" tone="mist" content={qeeg.flexible} variant="check" />
        <Instructor id="instructor" tone="white" content={qeeg.instructor} />
        <RoleMarquee id="audience" tone="cream" content={qeeg.audience} />
        <Faq id="faq" tone="white" content={qeeg.faq} />
        <Mentors content={qeeg.speakers} />
        <Categories content={qeeg.categories} />
      </main>
      <CtaFooter content={qeeg.cta} />
    </>
  );
}

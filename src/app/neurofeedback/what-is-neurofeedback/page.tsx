import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { FeatureGrid } from "@/components/course/FeatureGrid";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { whatIsNeurofeedback as page } from "@/data/neurofeedback/whatIsNeurofeedback";

export const metadata: Metadata = page.meta;

export default function WhatIsNeurofeedbackPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <CourseArticles id="in-brief" tone="mist" variant="media" content={page.intro} />
        <FeatureGrid id="how-it-works" tone="cream" content={page.steps} />
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

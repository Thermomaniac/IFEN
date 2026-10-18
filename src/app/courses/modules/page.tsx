import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseArticles } from "@/components/course/CourseArticles";
import { CourseHero } from "@/components/course/CourseHero";
import { DatesBand } from "@/components/course/ContentPage";
import { CourseSchedule } from "@/components/course/CourseSchedule";
import { Faq } from "@/components/course/Faq";
import { FeatureGrid } from "@/components/course/FeatureGrid";
import { Pathway } from "@/components/course/Pathway";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { datesFor, interestFor } from "@/data/booking/shared";
import { modulesOverview as page } from "@/data/courses/modules";

export const metadata: Metadata = page.meta;

const dates = datesFor("Modules", page.dates.codes);
const interest = interestFor("Modules", page.interest.codes);

// Certified Neurofeedback Therapist: the four modules in order, the module cards, every module
// date in the filterable table (no tabs), the Module 1 interest list, then the training FAQ.
export default function ModulesPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <CourseArticles id="intro" tone="mist" variant="panels" content={page.intro} />
        <Pathway id="pathway" tone="cream" content={page.pathway} />
        <FeatureGrid id="modules" tone="white" content={page.cards} />
        <CourseSchedule dates={dates} section={{ id: "dates", tone: "mist", head: page.dates }} />
        <DatesBand id="interest" tone="cream" content={{ ...page.interest, items: interest, interest: true }} />
        <Faq id="faq" tone="white" content={page.faq} />
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseOverview } from "@/components/course/CourseOverview";
import { FeatureGrid } from "@/components/course/FeatureGrid";
import { Instructor } from "@/components/course/Instructor";
import { InterestCapture } from "@/components/course/InterestCapture";
import { Mentors } from "@/components/course/Mentors";
import { TopicLoop } from "@/components/course/TopicLoop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { qeegWorkshop } from "@/data/courses/qeegWorkshop";

export const metadata: Metadata = qeegWorkshop.meta;

export default function QeegWorkshopPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={qeegWorkshop.hero} />
        <CourseOverview content={qeegWorkshop.overview} decor />
        <FeatureGrid id="special" tone="cream" content={qeegWorkshop.special} />
        <TopicLoop id="content" tone="white" content={qeegWorkshop.content} />
        <FeatureGrid id="learn" tone="mist" content={qeegWorkshop.learn} />
        <Instructor id="instructor" tone="white" content={qeegWorkshop.instructor} />
        <InterestCapture tone="mist" hero={qeegWorkshop.hero} />
        <Mentors content={qeegWorkshop.speakers} />
        <Categories content={qeegWorkshop.categories} />
      </main>
      <CtaFooter content={qeegWorkshop.cta} />
    </>
  );
}

import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseOverview } from "@/components/course/CourseOverview";
import { Mentors } from "@/components/course/Mentors";
import { TopicLoop } from "@/components/course/TopicLoop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { webinar } from "@/data/courses/webinar";

export const metadata: Metadata = webinar.meta;

export default function WebinarPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={webinar.hero} />
        <CourseOverview content={webinar.overview} />
        <TopicLoop id="content" tone="white" content={webinar.content} />
        <Mentors content={webinar.speakers} />
        <Categories content={webinar.categories} />
      </main>
      <CtaFooter content={webinar.cta} />
    </>
  );
}

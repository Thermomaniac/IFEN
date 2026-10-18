import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseOverview } from "@/components/course/CourseOverview";
import { InterestCapture } from "@/components/course/InterestCapture";
import { Mentors } from "@/components/course/Mentors";
import { TopicLoop } from "@/components/course/TopicLoop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { webinarQeeg } from "@/data/courses/webinarQeegPsychotherapy";

export const metadata: Metadata = webinarQeeg.meta;

export default function WebinarQeegPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={webinarQeeg.hero} />
        <CourseOverview content={webinarQeeg.overview} decor />
        <TopicLoop id="content" tone="white" content={webinarQeeg.content} />
        <InterestCapture tone="mist" hero={webinarQeeg.hero} />
        <Mentors content={webinarQeeg.speakers} />
        <Categories content={webinarQeeg.categories} />
      </main>
      <CtaFooter content={webinarQeeg.cta} />
    </>
  );
}

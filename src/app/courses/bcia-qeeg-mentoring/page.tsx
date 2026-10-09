import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { Mentors } from "@/components/course/Mentors";
import { ProgramDetails } from "@/components/course/ProgramDetails";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { course, courseHero, courseSpeakers } from "@/data/course";

export const metadata: Metadata = {
  title: "BCIA & QEEG-D Mentoring | IFEN",
  description: course.description,
};

export default function CoursePage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={courseHero} />
        <ProgramDetails />
        <Mentors content={courseSpeakers} />
        <Categories content={course.categories} />
      </main>
      <CtaFooter content={course.cta} />
    </>
  );
}

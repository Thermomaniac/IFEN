import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { qeegCourses as page } from "@/data/booking/qeegCourses";

export const metadata: Metadata = page.meta;

export default function QeegCoursesPage() {
  return <ContentPage page={page} />;
}

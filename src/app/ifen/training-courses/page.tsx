import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { trainingCourses as page } from "@/data/ifen/trainingCourses";

export const metadata: Metadata = page.meta;

export default function TrainingCoursesPage() {
  return <ContentPage page={page} />;
}

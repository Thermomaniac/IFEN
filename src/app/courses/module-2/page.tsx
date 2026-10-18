import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { module2 as page } from "@/data/courses/modules";

export const metadata: Metadata = page.meta;

export default function Module2Page() {
  return <ContentPage page={page} />;
}

import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { ifen100 as page } from "@/data/courses/modules";

export const metadata: Metadata = page.meta;

export default function Ifen100Page() {
  return <ContentPage page={page} />;
}

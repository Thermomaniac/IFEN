import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { webinars as page } from "@/data/booking/webinars";

export const metadata: Metadata = page.meta;

export default function WebinarsPage() {
  return <ContentPage page={page} />;
}

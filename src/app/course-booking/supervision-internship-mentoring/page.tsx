import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { supervision as page } from "@/data/booking/supervision";

export const metadata: Metadata = page.meta;

export default function SupervisionPage() {
  return <ContentPage page={page} />;
}

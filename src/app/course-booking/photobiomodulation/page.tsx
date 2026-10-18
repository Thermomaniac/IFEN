import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { photobiomodulation as page } from "@/data/booking/photobiomodulation";

export const metadata: Metadata = page.meta;

export default function PhotobiomodulationPage() {
  return <ContentPage page={page} />;
}

import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { brainavatar as page } from "@/data/booking/brainavatar";

export const metadata: Metadata = page.meta;

export default function BrainAvatarPage() {
  return <ContentPage page={page} />;
}

import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { bcia as page } from "@/data/booking/bcia";

export const metadata: Metadata = page.meta;

export default function BciaPage() {
  return <ContentPage page={page} />;
}

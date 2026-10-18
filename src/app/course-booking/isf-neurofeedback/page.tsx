import type { Metadata } from "next";
import { ContentPage } from "@/components/course/ContentPage";
import { isfNeurofeedback as page } from "@/data/booking/isfNeurofeedback";

export const metadata: Metadata = page.meta;

export default function IsfNeurofeedbackPage() {
  return <ContentPage page={page} />;
}

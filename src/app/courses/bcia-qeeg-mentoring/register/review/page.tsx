import type { Metadata } from "next";
import { ReviewStep } from "@/components/register/ReviewStep";
import { StepLayout } from "@/components/register/StepLayout";

export const metadata: Metadata = {
  title: "Register: Review & pay | IFEN",
};

export default function ReviewPage() {
  return (
    <StepLayout step={2}>
      <ReviewStep />
    </StepLayout>
  );
}

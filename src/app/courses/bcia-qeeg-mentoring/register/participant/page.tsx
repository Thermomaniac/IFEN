import type { Metadata } from "next";
import { ParticipantForm } from "@/components/register/ParticipantForm";
import { StepLayout } from "@/components/register/StepLayout";

export const metadata: Metadata = {
  title: "Register: Participant details | IFEN",
};

export default function ParticipantPage() {
  return (
    <StepLayout step={0}>
      <ParticipantForm />
    </StepLayout>
  );
}

import type { Metadata } from "next";
import { BillingForm } from "@/components/register/BillingForm";
import { StepLayout } from "@/components/register/StepLayout";

export const metadata: Metadata = {
  title: "Register: Billing details | IFEN",
};

export default function BillingPage() {
  return (
    <StepLayout step={1}>
      <BillingForm />
    </StepLayout>
  );
}

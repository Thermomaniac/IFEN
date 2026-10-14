import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MentorBookingStep } from "@/components/directory/MentorBooking";
import { getDemoProfile } from "@/data/demo/demoTherapist";

export const metadata: Metadata = {
  title: "Book a mentoring session: Review & pay | IFEN",
};

export default async function MentorReviewPage({ params }: PageProps<"/therapists/[id]/book/review">) {
  const { id } = await params;
  const profile = getDemoProfile(id);
  if (!profile) notFound();

  return <MentorBookingStep id={id} profile={profile} slug="review" />;
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MentorBookingStep } from "@/components/directory/MentorBooking";
import { getDemoProfile } from "@/data/demo/demoTherapist";
import { bookingPath, bookingSteps } from "@/data/therapistProfile";

export const metadata: Metadata = {
  title: "Book a mentoring session: Meeting format | IFEN",
};

export default async function MentorFormatPage({ params }: PageProps<"/therapists/[id]/book/format">) {
  const { id } = await params;
  const profile = getDemoProfile(id);
  if (!profile) notFound();
  // A mentor with one format has no choice to make; the flow starts at Your Details.
  if (!bookingSteps(profile.session.formats).some((s) => s.slug === "format"))
    redirect(`${bookingPath(id)}/details`);
  return <MentorBookingStep id={id} profile={profile} slug="format" />;
}

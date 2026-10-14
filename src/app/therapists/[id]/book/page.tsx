import { notFound, redirect } from "next/navigation";
import { getDemoProfile } from "@/data/demo/demoTherapist";
import { bookingPath, bookingSteps } from "@/data/therapistProfile";

/** Entry point linked from the profile: opens the first step of this mentor's flow. */
export default async function MentorBookingIndex({ params }: PageProps<"/therapists/[id]/book">) {
  const { id } = await params;
  const profile = getDemoProfile(id);
  if (!profile) notFound();
  redirect(`${bookingPath(id)}/${bookingSteps(profile.session.formats)[0].slug}`);
}

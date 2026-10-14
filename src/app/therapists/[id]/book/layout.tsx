import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { DEMO_ID, getDemoProfile } from "@/data/demo/demoTherapist";
import { bookingCopy, profilePath } from "@/data/therapistProfile";

export const metadata: Metadata = {
  robots: { index: false },
};

// Only the demo mentor has a profile in this prototype; every other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: DEMO_ID }];
}

/** The course registration frame: site header, ink title band, the step body, CTA and footer. */
export default async function MentorBookingLayout({
  params,
  children,
}: LayoutProps<"/therapists/[id]/book">) {
  const { id } = await params;
  const profile = getDemoProfile(id);
  if (!profile) notFound();

  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <RegisterHeader
          backHref={profilePath(id)}
          backLabel={`Back to ${profile.person}'s profile`}
          title={bookingCopy.heading}
        />
        {children}
      </main>
      <CtaFooter />
    </>
  );
}

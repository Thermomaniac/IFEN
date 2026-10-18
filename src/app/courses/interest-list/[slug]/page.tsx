import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseHero } from "@/components/course/CourseHero";
import { InterestCapture } from "@/components/course/InterestCapture";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { BOOKING_CTA } from "@/data/booking/shared";
import { getInterestPage, interestFormHead, interestPages } from "@/data/interestPages";

type Props = PageProps<"/courses/interest-list/[slug]">;

// One page per interest-list entry in the schedule; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return interestPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getInterestPage((await params).slug)?.meta ?? {};
}

/**
 * An interest list (courses without a date yet), in place of the live prospect form: the
 * hero carries the course number, price, place and description, the band below the
 * sign-up form that the course and webinar pages use.
 */
export default async function InterestListPage({ params }: Props) {
  const page = getInterestPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        <InterestCapture tone="mist" hero={page.hero} head={interestFormHead} />
      </main>
      <CtaFooter content={BOOKING_CTA} />
    </>
  );
}

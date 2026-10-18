import { SiteHeader } from "@/components/layout/SiteHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import type { BookingPage, BookingSection } from "@/data/booking/shared";
import { Categories } from "./Categories";
import { CourseArticles } from "./CourseArticles";
import { CourseHero } from "./CourseHero";
import { CourseCards } from "./CourseSchedule";
import { CourseSection, type Tone } from "./CourseSection";
import { FeatureGrid } from "./FeatureGrid";
import styles from "./ContentPage.module.css";

const TONES: Tone[] = ["mist", "cream", "white"];

/**
 * A data-driven content page (Course Booking categories): the ink hero, then each section
 * in order on alternating mist, cream and white bands, related cards and the CTA footer.
 * Sections are explainers (`CourseArticles`), fact cards (`FeatureGrid`) or a page's
 * course dates as the schedule's date cards.
 */
export function ContentPage({ page }: { page: BookingPage }) {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />
        {page.sections.map((section, i) => (
          <Section key={section.id} section={section} tone={TONES[i % TONES.length]} />
        ))}
        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

function Section({ section, tone }: { section: BookingSection; tone: Tone }) {
  switch (section.kind) {
    case "articles":
      return <CourseArticles id={section.id} tone={tone} variant={section.variant} content={section.content} />;
    case "features":
      return <FeatureGrid id={section.id} tone={tone} content={section.content} />;
    case "dates":
      return (
        <CourseSection id={section.id} tone={tone} head={section.content}>
          <Reveal amount="some">
            <RevealItem>
              <CourseCards items={section.content.items} className={styles.dates} />
            </RevealItem>
          </Reveal>
        </CourseSection>
      );
  }
}

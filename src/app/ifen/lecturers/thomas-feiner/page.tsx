import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseCards } from "@/components/course/CourseSchedule";
import { CourseHero } from "@/components/course/CourseHero";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { ProfileSection } from "@/components/directory/ProfileSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { thomasFeiner as page } from "@/data/ifen/thomasFeiner";
import styles from "@/components/directory/Profile.module.css";

export const metadata: Metadata = page.meta;

// The therapist profile layout without the booking flow: hero, "On This Page" nav and
// section cards, ending in the dates he teaches.
export default function ThomasFeinerPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />

        <div className={styles.band}>
          <div className={styles.layout}>
            <ProfileNav items={page.nav} book={page.book} />

            <div className={styles.sections}>
              {page.sections.map((s) => (
                <ProfileSection key={s.id} id={s.id} heading={s.heading}>
                  <div className={styles.bio}>
                    {s.paragraphs.map((text) => (
                      <RevealItem key={text} as="p" className={styles.text}>
                        {text}
                      </RevealItem>
                    ))}
                  </div>
                </ProfileSection>
              ))}

              <ProfileSection id={page.courses.id} heading={page.courses.heading} tall>
                <RevealItem>
                  <CourseCards items={page.courses.items} className={styles.courses} />
                </RevealItem>
              </ProfileSection>
            </div>
          </div>
        </div>

        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

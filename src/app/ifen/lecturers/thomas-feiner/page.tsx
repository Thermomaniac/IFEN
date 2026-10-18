import type { Metadata } from "next";
import { Categories } from "@/components/course/Categories";
import { CourseCards } from "@/components/course/CourseSchedule";
import { CourseHero } from "@/components/course/CourseHero";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { Badges, Box, List, Rows, Stats } from "@/components/directory/ProfileParts";
import { ProfileSection } from "@/components/directory/ProfileSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { thomasFeiner as page } from "@/data/ifen/thomasFeiner";
import styles from "@/components/directory/Profile.module.css";

export const metadata: Metadata = page.meta;

// The therapist profile layout without the booking flow: hero, "On This Page" nav and
// section cards (summary, credentials, expertise, experience, research), ending in the
// dates he teaches.
export default function ThomasFeinerPage() {
  const { overview, credentials, expertise, experience, research } = page;
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />

        <div className={styles.band}>
          <div className={styles.layout}>
            <ProfileNav items={page.nav} book={page.book} />

            <div className={styles.sections}>
              <ProfileSection id="overview" heading={overview.heading}>
                {overview.paragraphs.map((text) => (
                  <RevealItem key={text} as="p" className={styles.text}>
                    {text}
                  </RevealItem>
                ))}
                <Stats items={overview.stats} />
              </ProfileSection>

              <ProfileSection id="credentials" heading={credentials.heading}>
                <Rows items={credentials.rows} />
              </ProfileSection>

              <ProfileSection id="expertise" heading={expertise.heading}>
                <div className={styles.boxes}>
                  {expertise.groups.map((g) => (
                    <Box key={g.title} title={g.title}>
                      <Badges items={g.items.map((label) => ({ label }))} check />
                    </Box>
                  ))}
                </div>
              </ProfileSection>

              {[
                { id: "experience", ...experience },
                { id: "research", ...research },
              ].map((s) => (
                <ProfileSection key={s.id} id={s.id} heading={s.heading}>
                  <RevealItem as="p" className={styles.text}>
                    {s.intro}
                  </RevealItem>
                  <RevealItem>
                    <List items={s.items} />
                  </RevealItem>
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

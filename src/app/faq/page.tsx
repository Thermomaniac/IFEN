import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { Faq } from "@/components/course/Faq";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { faqTopics } from "@/data/faq";
import { faqPage as page } from "@/data/faqPage";
import layout from "@/components/directory/Profile.module.css";

export const metadata: Metadata = page.meta;

const nav = faqTopics.map((t) => ({ id: t.id, label: t.heading }));

// Same frame as the profile, venue and article pages: photo hero, then a mist band with one
// white card per topic and the sticky "On This Page" nav (a scrolling strip below 64rem).
export default function FaqPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero route="/faq" content={page.hero} />

        <div className={layout.band}>
          <div className={layout.layout}>
            <ProfileNav items={nav} />
            <div className={layout.sections}>
              {faqTopics.map((t, i) => (
                <Faq
                  key={t.id}
                  id={t.id}
                  tone="white"
                  card
                  content={{
                    label: page.topicLabel(i + 1),
                    heading: t.heading,
                    items: t.items,
                    help: i === 0 ? page.help : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

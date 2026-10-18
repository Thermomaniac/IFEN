import type { Metadata } from "next";
import { Fragment } from "react";
import { PostNav } from "@/components/blog/BlogPosts";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { ProfileSection } from "@/components/directory/ProfileSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { evidenceArticle as page } from "@/data/blog/evidence";
import { EVIDENCE_PATH } from "@/data/blog/shared";
import styles from "@/components/directory/Profile.module.css";

export const metadata: Metadata = page.meta;

/** "**term**" in the data is the source's bold. */
function Rich({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

const nav = [...page.sections, page.sources].map(({ id, label }) => ({ id, label }));

// A long article in the profile layout: hero, "On This Page" nav (the source's table of
// contents) and one card per section, ending in the sources, a link to the original,
// the share row and the previous post.
export default function EvidenceArticlePage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />

        <div className={styles.band}>
          <div className={styles.layout}>
            <ProfileNav items={nav} book={page.book} />

            <div className={styles.sections}>
              {page.sections.map((s) => (
                <ProfileSection key={s.id} id={s.id} heading={s.heading} tall={s.blocks.length > 3}>
                  <div className={styles.bio}>
                    {s.blocks.map((b) =>
                      typeof b === "string" ? (
                        <RevealItem key={b} as="p" className={styles.text}>
                          <Rich text={b} />
                        </RevealItem>
                      ) : (
                        <RevealItem key={b.claim} className={styles.box}>
                          <p className={styles.claim}>{b.claim}</p>
                          <p className={styles.text}>{b.answer}</p>
                        </RevealItem>
                      ),
                    )}
                  </div>
                </ProfileSection>
              ))}

              <ProfileSection id={page.sources.id} heading={page.sources.heading} tall>
                <RevealItem as="ol" className={styles.sources}>
                  {page.sources.items.map((s) => (
                    <li key={s.text}>
                      {s.text}{" "}
                      {s.links.map((l, i) => (
                        <Fragment key={l.href}>
                          {i > 0 && "; "}
                          <a href={l.href} className={styles.source}>
                            {l.label}
                          </a>
                        </Fragment>
                      ))}
                    </li>
                  ))}
                </RevealItem>
                <RevealItem as="p" className={styles.note}>
                  {page.sources.note.text}{" "}
                  <a href={page.sources.note.link.href} className={styles.source} hrefLang="de">
                    {page.sources.note.link.label}
                  </a>
                </RevealItem>
              </ProfileSection>

              <ProfileSection id={page.share.id} heading={page.share.heading}>
                <RevealItem>
                  <ShareLinks title={page.share.title} path={EVIDENCE_PATH} />
                </RevealItem>
                <RevealItem>
                  <PostNav previous={page.share.previous} />
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

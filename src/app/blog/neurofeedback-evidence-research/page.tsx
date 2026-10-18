import type { Metadata } from "next";
import { Fragment } from "react";
import { ArticleBody, ArticleSection } from "@/components/blog/Article";
import { PostNav } from "@/components/blog/BlogPosts";
import { PostGrid } from "@/components/blog/PostGrid";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSection } from "@/components/course/CourseSection";
import { ProfileNav } from "@/components/directory/ProfileNav";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealItem } from "@/components/motion/Reveal";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { evidenceArticle as page } from "@/data/blog/evidence";
import { EVIDENCE_PATH } from "@/data/blog/shared";
import layout from "@/components/directory/Profile.module.css";
import styles from "@/components/blog/Article.module.css";

export const metadata: Metadata = page.meta;

/** "**term**" in the data is the source's bold. */
function Rich({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

const nav = [...page.sections, page.sources, page.share].map(({ id, label }) => ({ id, label }));

// A long article: hero, "On This Page" nav (the source's table of contents) and one reading
// column of continuous prose. It ends in the sources, the share row and the previous post,
// then more posts from the blog.
export default function EvidenceArticlePage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />

        <div className={layout.band}>
          <div className={layout.layout}>
            <ProfileNav items={nav} book={page.book} />

            <ArticleBody>
              {page.sections.map((s, si) => (
                <ArticleSection key={s.id} id={s.id} heading={s.heading}>
                  {s.blocks.map((b, bi) =>
                    typeof b === "string" ? (
                      <RevealItem
                        key={b}
                        as="p"
                        className={si === 0 && bi === 0 ? `${styles.text} ${styles.lead}` : styles.text}
                      >
                        <Rich text={b} />
                      </RevealItem>
                    ) : (
                      <RevealItem key={b.claim} className={styles.quote}>
                        <p className={styles.claim}>{b.claim}</p>
                        <p className={styles.text}>{b.answer}</p>
                      </RevealItem>
                    ),
                  )}
                </ArticleSection>
              ))}

              <ArticleSection id={page.sources.id} heading={page.sources.heading}>
                <RevealItem as="ol" className={styles.sources}>
                  {page.sources.items.map((s) => (
                    <li key={s.text}>
                      {s.text}{" "}
                      {s.links.map((l, i) => (
                        <Fragment key={l.href}>
                          {i > 0 && "; "}
                          <a href={l.href} className={styles.link}>
                            {l.label}
                          </a>
                        </Fragment>
                      ))}
                    </li>
                  ))}
                </RevealItem>
                <RevealItem as="p" className={styles.note}>
                  {page.sources.note.text}{" "}
                  <a href={page.sources.note.link.href} className={styles.link} hrefLang="de">
                    {page.sources.note.link.label}
                  </a>
                </RevealItem>
              </ArticleSection>

              <ArticleSection id={page.share.id} heading={page.share.heading}>
                <RevealItem>
                  <ShareLinks title={page.share.title} path={EVIDENCE_PATH} />
                </RevealItem>
                <RevealItem>
                  <PostNav previous={page.share.previous} />
                </RevealItem>
              </ArticleSection>
            </ArticleBody>
          </div>
        </div>

        <CourseSection id="keep-reading" tone="white" head={page.more.head}>
          <PostGrid posts={page.more.posts} pageSize={page.more.posts.length} archive={page.more.archive} />
        </CourseSection>
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

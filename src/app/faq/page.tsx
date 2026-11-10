import type { Metadata } from "next";
import { CourseHero } from "@/components/course/CourseHero";
import { Faq } from "@/components/course/Faq";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { faqTopics } from "@/data/faq";
import { faqPage as page } from "@/data/faqPage";
import styles from "./page.module.css";

export const metadata: Metadata = page.meta;

const TONES = ["mist", "cream", "white"] as const;

export default function FaqPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero
          route="/faq"
          content={page.hero}
          panel={{
            eyebrow: page.topicsLabel,
            children: (
              <nav aria-label="FAQ topics">
                <ol className={styles.topics}>
                  {faqTopics.map((t, i) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className={styles.topic}>
                        <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                        <span>{t.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ),
          }}
        />
        {faqTopics.map((t, i) => (
          <Faq
            key={t.id}
            id={t.id}
            tone={TONES[i % TONES.length]}
            content={{
              label: page.topicLabel(i + 1),
              heading: t.heading,
              items: t.items,
              help: i === 0 ? page.help : undefined,
            }}
          />
        ))}
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import styles from "./Article.module.css";

/**
 * Long-form article body (Giga news style): one white card holding continuous prose at a
 * reading measure, sections separated by space rather than boxes. Sits in the profile
 * layout beside the "On This Page" nav.
 */
export function ArticleBody({ children }: { children: ReactNode }) {
  return <article className={styles.article}>{children}</article>;
}

/** One section of the body: an h2 and its blocks. The id doubles as the nav anchor. */
export function ArticleSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.flow} amount="some">
        <RevealItem as="h2" className={styles.heading}>
          <span id={`${id}-title`}>{heading}</span>
        </RevealItem>
        {children}
      </Reveal>
    </section>
  );
}

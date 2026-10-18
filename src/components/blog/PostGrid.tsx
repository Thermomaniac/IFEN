"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import type { BlogPost } from "@/data/blog/shared";
import { PostImage, PostMeta, PostTitle } from "./BlogPosts";
import styles from "./BlogPosts.module.css";

/**
 * 3 / 2 / 1 column grid of post cards. Shows `pageSize` cards, then a "Show N more" text
 * button with an "N of M" count; once every card is shown, the archive link takes its place.
 */
export function PostGrid({
  posts,
  pageSize = 6,
  archive,
}: {
  posts: BlogPost[];
  pageSize?: number;
  archive?: { label: string; href: string };
}) {
  const [count, setCount] = useState(pageSize);
  const list = useRef<HTMLDivElement>(null);
  const added = useRef(false);

  // After "Show more", focus the first new card's link: the button may have just gone.
  useEffect(() => {
    if (!added.current) return;
    list.current?.querySelectorAll<HTMLAnchorElement>("ul a")[count - pageSize]?.focus({ preventScroll: true });
  }, [count, pageSize]);
  const shown = posts.slice(0, count);
  const left = posts.length - shown.length;

  return (
    <div ref={list} className={styles.posts}>
      <Reveal as="ul" className={styles.grid} amount="some">
        {shown.map((post, i) => (
          // Cards added by "Show more" mount after the group has played, so they animate in
          // on their own instead of waiting for a whileInView that has already fired.
          <motion.li
            key={post.id}
            variants={revealItem}
            {...(i >= pageSize && { initial: "hidden", animate: "visible" })}
          >
            <article className={styles.card}>
              <PostImage post={post} sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw" />
              <div className={styles.body}>
                <PostMeta post={post} />
                <PostTitle post={post} as="h3" />
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </article>
          </motion.li>
        ))}
      </Reveal>
      {left > 0 ? (
        <div className={styles.more}>
          <button type="button" className={styles.moreBtn} onClick={() => {
              added.current = true;
              setCount((n) => n + pageSize);
            }}>
            Show {Math.min(pageSize, left)} more articles
          </button>
          <span className={styles.moreCount} aria-live="polite">
            {shown.length} of {posts.length}
          </span>
        </div>
      ) : (
        archive && (
          <div className={styles.archive}>
            <CtaButton href={archive.href}>{archive.label}</CtaButton>
          </div>
        )
      )}
    </div>
  );
}

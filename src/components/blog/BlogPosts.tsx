import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowCircleLeftIcon } from "@/components/icons";
import { formatPostDate, type BlogPost } from "@/data/blog/shared";
import styles from "./BlogPosts.module.css";

/** Category badge and "20 Jul 2026 · 12 min read". */
export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className={styles.meta}>
      <span className={styles.badge}>{post.category}</span>
      <span className={styles.date}>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true"> · </span>
        {post.minutes} min read
      </span>
    </div>
  );
}

/** The post's photo, or the dotted brain on ink for posts without one. */
export function PostImage({ post, sizes, priority }: { post: BlogPost; sizes: string; priority?: boolean }) {
  return (
    <div className={styles.media} data-empty={post.image ? undefined : true}>
      {post.image ? (
        <Image src={post.image.src} alt={post.image.alt} fill sizes={sizes} priority={priority} />
      ) : (
        <Image src="/therapists/dotted-brain.svg" alt="" width={120} height={120} className={styles.brain} />
      )}
    </div>
  );
}

/** Title link that covers the whole card, plus the "in German" note for external posts. */
export function PostTitle({ post, as: Heading }: { post: BlogPost; as: "h2" | "h3" }) {
  return (
    <Heading className={styles.title}>
      <a href={post.href} className={styles.link}>
        {post.title}
        {post.external && <span className={styles.srOnly}> (in German, opens the IFEN blog)</span>}
      </a>
    </Heading>
  );
}

/** Wide card: text left, image right from 48rem (GitBook / Mural featured post). */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Reveal as="article" className={`${styles.card} ${styles.featured}`}>
      <RevealItem className={styles.featuredBody}>
        <PostMeta post={post} />
        <PostTitle post={post} as="h3" />
        <p className={styles.excerpt}>{post.excerpt}</p>
      </RevealItem>
      <RevealItem className={styles.featuredMedia}>
        <PostImage post={post} sizes="(min-width: 48rem) 50vw, 100vw" priority />
      </RevealItem>
    </Reveal>
  );
}

/** Previous post under an article (the source's "Vorheriger Beitrag"), as a linked box. */
export function PostNav({ previous }: { previous: { label: string; post: BlogPost } }) {
  const { label, post } = previous;
  return (
    <nav aria-label="More articles">
      <a href={post.href} className={styles.prev} rel="prev">
        <span className={styles.prevLabel}>
          <ArrowCircleLeftIcon width={20} height={20} />
          {label}
        </span>
        <span className={styles.prevTitle}>{post.title}</span>
        <span className={styles.prevMeta}>
          <span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.minutes} min read
          </span>
          {post.external && <span className={styles.srOnly}> (in German, opens the IFEN blog)</span>}
        </span>
      </a>
    </nav>
  );
}

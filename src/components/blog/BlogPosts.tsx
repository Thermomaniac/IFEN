import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowCircleLeftIcon } from "@/components/icons";
import { CtaButton } from "@/components/ui/CtaButton";
import { formatPostDate, type BlogPost } from "@/data/blog/shared";
import styles from "./BlogPosts.module.css";

/** Category badge and "20 Jul 2026 · 12 min read". */
function PostMeta({ post }: { post: BlogPost }) {
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
function PostImage({ post, sizes, priority }: { post: BlogPost; sizes: string; priority?: boolean }) {
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
function PostTitle({ post, as: Heading }: { post: BlogPost; as: "h2" | "h3" }) {
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
export function FeaturedPost({ post, cta }: { post: BlogPost; cta: string }) {
  return (
    <Reveal as="article" className={`${styles.card} ${styles.featured}`}>
      <RevealItem className={styles.featuredBody}>
        <PostMeta post={post} />
        <PostTitle post={post} as="h3" />
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.more} aria-hidden="true">
          {cta}
          {post.external && <span className={styles.lang}>German</span>}
        </span>
      </RevealItem>
      <RevealItem className={styles.featuredMedia}>
        <PostImage post={post} sizes="(min-width: 48rem) 50vw, 100vw" priority />
      </RevealItem>
    </Reveal>
  );
}

/** 3 / 2 / 1 column grid of post cards, with an optional archive link under it. */
export function PostGrid({ posts, archive }: { posts: BlogPost[]; archive?: { label: string; href: string } }) {
  return (
    <>
      <Reveal as="ul" className={styles.grid} amount="some">
        {posts.map((post) => (
          <RevealItem key={post.id} as="li">
            <article className={styles.card}>
              <PostImage post={post} sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw" />
              <div className={styles.body}>
                <PostMeta post={post} />
                <PostTitle post={post} as="h3" />
                <p className={styles.excerpt}>{post.excerpt}</p>
                {post.external && <span className={styles.lang}>German original</span>}
              </div>
            </article>
          </RevealItem>
        ))}
      </Reveal>
      {archive && (
        <Reveal className={styles.archive}>
          <RevealItem>
            <CtaButton href={archive.href}>{archive.label}</CtaButton>
          </RevealItem>
        </Reveal>
      )}
    </>
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
          {post.external && (
            <>
              <span className={styles.lang}>German original</span>
              <span className={styles.srOnly}> (opens the IFEN blog)</span>
            </>
          )}
        </span>
      </a>
    </nav>
  );
}

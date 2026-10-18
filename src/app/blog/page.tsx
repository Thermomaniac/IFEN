import type { Metadata } from "next";
import { FeaturedPost } from "@/components/blog/BlogPosts";
import { PostGrid } from "@/components/blog/PostGrid";
import { Categories } from "@/components/course/Categories";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseSection } from "@/components/course/CourseSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CtaFooter } from "@/components/sections/CtaFooter/CtaFooter";
import { blogIndex as page } from "@/data/blog";

export const metadata: Metadata = page.meta;

// Blog index: photo hero, the featured post, the twelve latest posts in a card grid that loads
// six at a time and ends in a link to the full German archive, then related pages and the CTA.
export default function BlogPage() {
  return (
    <>
      <SiteHeader currentHref="" />
      <main id="main">
        <CourseHero content={page.hero} />

        <CourseSection id="featured" tone="mist" head={page.featured.head}>
          <FeaturedPost post={page.featured.post} />
        </CourseSection>

        <CourseSection id="latest" tone="cream" head={page.latest.head}>
          <PostGrid posts={page.latest.posts} pageSize={page.latest.pageSize} archive={page.latest.archive} />
        </CourseSection>

        <Categories content={page.related} />
      </main>
      <CtaFooter content={page.cta} />
    </>
  );
}

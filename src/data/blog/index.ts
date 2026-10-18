// Blog index. Content from the live blog home, neurofeedback-ifen.com/blog ("Thomas Feiners
// Neurofeedback BLOG"), translated to English: the welcome text, the featured post (the
// Brodmann poster) and the twelve most recent posts from the blog's wp-json API (newest
// first). The welcome's link to www.neurofeedback-info.de points to this site's course
// listing. The first post date (27 Aug 2018) comes from the same API; all posts are in
// German. No article count is shown, since it changes with every post.

import type { CategoriesContent, CourseHeroContent, SectionHead } from "../coursePage";
import { ALL_OFFERS, BLOG_CTA, LIVE_BLOG, POSTS, RELATED, type BlogPost } from "./shared";

export const blogIndex = {
  meta: {
    title: "Neurofeedback Blog | IFEN",
    description:
      "Thomas Feiner's neurofeedback blog: important information, news and insights on neurofeedback from IFEN, the Institute for EEG Neurofeedback.",
  },

  hero: {
    title: "Thomas Feiner's\nNeurofeedback Blog",
    wide: true,
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Blog" }],
    badge: "Blog",
    description: [
      "Welcome! IFEN, the Institute for EEG Neurofeedback, is one of the leading providers of training and further education for neurofeedback therapists in Germany. On these pages you will find important information, news and insights on the topic of neurofeedback.",
      "Interested in training as a neurofeedback therapist? Looking for further education? Then see our course dates.",
    ],
    highlights: [
      { value: "Since 2018", label: "Publishing" },
      { value: "German", label: "Original language" },
    ],
    image: "/blog/blog-header.jpg",
  } satisfies CourseHeroContent,

  featured: {
    head: { label: "Featured", heading: "Featured Article" } satisfies SectionHead,
    post: POSTS.brodmann satisfies BlogPost,
  },

  latest: {
    head: {
      label: "Latest",
      heading: "Latest Articles",
      intro: ["The first article is translated here. The others open in German on the IFEN blog."],
    } satisfies SectionHead,
    posts: [
      POSTS.evidence,
      POSTS.biofeedback,
      POSTS.neuromeditation,
      POSTS.photobiomodulation,
      POSTS.moellenkamp,
      POSTS.castilloReyes,
      POSTS.brainMonitoring,
      POSTS.fois,
      POSTS.qeegPractice,
      POSTS.rawEeg,
      POSTS.chiarenza,
      POSTS.emotionTuner,
    ] satisfies BlogPost[],
    /** Cards shown at first and added per "Show more". */
    pageSize: 6,
    archive: { label: "More Articles on the IFEN Blog", href: LIVE_BLOG },
  },

  related: {
    label: "Explore further",
    heading: "Learn More About Neurofeedback",
    items: [RELATED.whatIs, RELATED.topics, ALL_OFFERS],
  } satisfies CategoriesContent,

  cta: BLOG_CTA,
};

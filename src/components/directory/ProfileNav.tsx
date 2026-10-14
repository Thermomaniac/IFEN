"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import styles from "./ProfileNav.module.css";

type Item = { id: string; label: string };

/**
 * "On This Page" nav for the therapist profile. A sticky card on the right on desktop,
 * with an ink header and the booking CTA, and a sticky scrolling strip under the main nav
 * below 64rem. The section in view gets aria-current.
 */
export function ProfileNav({ items, book }: { items: Item[]; book: { label: string; href: string } }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    // A section counts as current while it crosses a line ~30% down the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Keep the current link visible in the mobile strip.
  useEffect(() => {
    const link = document.querySelector<HTMLElement>(`.${styles.list} [aria-current="location"]`);
    const list = link?.closest<HTMLElement>(`.${styles.list}`);
    if (!link || !list || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
  }, [current]);

  return (
    <nav className={styles.nav} aria-label="On this page">
      <p className={styles.title}>On This Page</p>
      <div className={styles.body}>
        <ul className={styles.list}>
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={styles.link}
                aria-current={current === i.id ? "location" : undefined}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <CtaButton href={book.href} className={styles.book}>
          {book.label}
        </CtaButton>
      </div>
    </nav>
  );
}

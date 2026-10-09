"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { CopyrightIcon, FacebookIcon, InstagramIcon, XLogoIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { useParallax } from "@/components/motion/useParallax";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { CtaContent } from "@/data/coursePage";
import { cta, footer } from "@/data/site";
import styles from "./CtaFooter.module.css";

const socialIcons = { facebook: FacebookIcon, x: XLogoIcon, instagram: InstagramIcon };

/**
 * Closing call to action over a photo, with the cream footer card rising into
 * the bottom of the same photo. Both share one backdrop, so they live in one
 * wrapper after <main>: the CTA is a labelled region, the card the page footer.
 * Course pages may add a line of supporting text and a secondary action.
 */
export function CtaFooter({ content = cta }: { content?: CtaContent }) {
  const stage = useRef<HTMLDivElement>(null);
  const bgY = useParallax(stage, 60);

  return (
    <div ref={stage} className={styles.stage}>
      <motion.div className={styles.bg} style={{ y: bgY }} aria-hidden="true">
        <Image src={cta.image} alt="" fill sizes="100vw" className={styles.bgImage} />
      </motion.div>
      <span className={styles.scrim} aria-hidden="true" />

      <section className={styles.cta} aria-labelledby="cta-title">
        <Reveal as="header" className={styles.ctaInner}>
          <RevealItem>
            <SectionLabel tone="plain">{content.label}</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionHeading id="cta-title" tone="dark" className={styles.heading}>
              {content.headingLines.map((line, i) => (
                <span key={line} className={styles.line}>
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </SectionHeading>
          </RevealItem>
          {content.text && (
            <RevealItem as="p" className={styles.text}>
              {content.text}
            </RevealItem>
          )}
          <RevealItem className={styles.actions}>
            <CtaButton href={content.action.href}>{content.action.label}</CtaButton>
            {content.secondary && (
              <CtaButton href={content.secondary.href} variant="light">
                {content.secondary.label}
              </CtaButton>
            )}
          </RevealItem>
        </Reveal>
      </section>

      <footer className={styles.footer}>
        <span className={styles.brain} aria-hidden="true" />

        <div className={styles.top}>
          <Reveal className={styles.brand}>
            <RevealItem>
              <Link href="/" className={styles.logo}>
                {/* eslint-disable-next-line @next/next/no-img-element -- vector logo, nothing to optimise */}
                <img src="/brand/logo-ifen-ink.svg" alt="IFEN home" width={124} height={47} />
              </Link>
            </RevealItem>
            <RevealItem as="p" className={styles.blurb}>
              {footer.blurb}
            </RevealItem>
            <RevealItem className={styles.badges}>
              {footer.badges.map((badge) => (
                <Image key={badge.src} src={badge.src} alt={badge.alt} width={64} height={64} className={styles.badge} />
              ))}
            </RevealItem>
          </Reveal>

          <nav className={styles.nav} aria-label="Footer">
            <Reveal className={styles.columns} stagger={0.06}>
              {footer.columns.map((column) => (
                <RevealItem key={column.title} className={styles.column}>
                  <h2 className={styles.title}>{column.title}</h2>
                  <ul className={styles.links}>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className={styles.link}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </Reveal>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <CopyrightIcon className={styles.copyIcon} />
            <span className="sr-only">Copyright</span>
            {footer.copyright}
          </p>
          <ul className={styles.socials}>
            {footer.socials.map(({ label, icon, href }) => {
              const Icon = socialIcons[icon];
              return (
                <li key={icon}>
                  <a href={href} className={styles.social} aria-label={label}>
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </footer>
    </div>
  );
}

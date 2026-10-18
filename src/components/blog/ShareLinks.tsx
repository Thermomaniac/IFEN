"use client";

import { useSyncExternalStore } from "react";
import { FacebookIcon, LinkedInIcon, MailIcon, XLogoIcon } from "@/components/icons";
import styles from "./BlogPosts.module.css";

// The page's own address, read in the browser so staging and production share their own URL.
const noop = () => () => {};
const pageUrl = () => window.location.origin + window.location.pathname;
const serverUrl = () => null;

/** The source's share row: Facebook, X, LinkedIn and email, each opening a share dialog. */
export function ShareLinks({ title, path }: { title: string; path: string }) {
  const url = useSyncExternalStore(noop, pageUrl, serverUrl) ?? path;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "Facebook", Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "X", Icon: XLogoIcon, href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: "LinkedIn", Icon: LinkedInIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    {
      label: "Email",
      Icon: MailIcon,
      href: `mailto:?subject=${t}&body=${encodeURIComponent(`I found this article for you: "${title}". ${url}`)}`,
    },
  ];

  return (
    <ul className={styles.share}>
      {links.map(({ label, Icon, href }) => (
        <li key={label}>
          <a
            href={href}
            className={styles.shareLink}
            {...(label === "Email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            <span className={styles.shareIcon}>
              <Icon />
            </span>
            {label}
            <span className={styles.srOnly}>{label === "Email" ? " (share by email)" : " (share, opens in a new tab)"}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

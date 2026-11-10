import Image from "next/image";
import { ArrowCornerIcon, MapPinFillIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { venueListPage, type VenueCard } from "@/data/venueList";
import styles from "./VenueGrid.module.css";

/**
 * Workshop locations overview: the homepage V2 venue card (white, warm hairline, 4px radius,
 * 3:2 watercolour) extended with the host name, address and a visible "View venue details"
 * line. The whole card is one link (stretched), with the arrow chip on hover and focus.
 */
export function VenueGrid({ venues }: { venues: VenueCard[] }) {
  return (
    <Reveal as="ul" className={styles.grid} stagger={0.05} amount="some">
      {venues.map((v) => {
        const external = v.href.startsWith("http");
        return (
          <RevealItem as="li" key={v.href} className={styles.card}>
            <span className={styles.media}>
              {v.image ? (
                <Image src={v.image.src} alt={v.image.alt} fill sizes="(min-width: 64rem) 306px, (min-width: 34rem) 45vw, 100vw" className={styles.photo} />
              ) : (
                <span className={styles.placeholder} role="img" aria-label={venueListPage.placeholder}>
                  <MapPinFillIcon width={28} height={28} aria-hidden="true" />
                </span>
              )}
              <span className={styles.arrow} aria-hidden="true">
                <ArrowCornerIcon />
              </span>
            </span>
            <span className={styles.body}>
              <span className={styles.city}>{v.city}</span>
              <a
                href={v.href}
                className={styles.link}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {v.name}
                {external && <span className="sr-only"> {venueListPage.newTab}</span>}
              </a>
              <span className={styles.address}>
                {v.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
              <span className={styles.more} aria-hidden="true">
                {venueListPage.more}
              </span>
            </span>
          </RevealItem>
        );
      })}
    </Reveal>
  );
}

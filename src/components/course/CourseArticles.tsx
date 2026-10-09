import type { ReactNode } from "react";
import { CheckCircleIcon, ListBulletsIcon, MapPinIcon, RepeatIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { Article, ArticleIcon, ArticlesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./CourseArticles.module.css";
import { Arcs } from "./FeatureGrid";
import { OutcomeList } from "./ProgramDetails";

const ICONS: Record<ArticleIcon, ReactNode> = {
  repeat: <RepeatIcon />,
  list: <ListBulletsIcon />,
  venue: <MapPinIcon />,
};

type Variant = "panels" | "columns" | "rows";

/**
 * Text-led content blocks: a heading, then paragraphs, check rows, chips or an address.
 * By default they sit in white cards, two or three columns depending on the count; a
 * single card puts its heading beside the copy on wide screens. The Figma layouts:
 * - `panels`: mist cards with faint arcs and a grey check list (Module 1 audience).
 * - `columns`: open columns, a list renders as the bordered outcome rows (equipment).
 * - `rows`: full-width rows between rules, icon and heading left, copy right (venue).
 */
export function CourseArticles({
  id,
  tone,
  content,
  variant,
}: {
  id: string;
  tone: Tone;
  content: ArticlesContent;
  variant?: Variant;
}) {
  if (variant) {
    return (
      <CourseSection id={id} tone={tone} head={content}>
        <Reveal className={styles[variant]} stagger={0.06}>
          {content.items.map((item, i) => (
            <RevealItem as="article" key={item.heading ?? i} className={styles[`${variant}Item`]}>
              {variant === "panels" && <Panel item={item} />}
              {variant === "columns" && <Column item={item} />}
              {variant === "rows" && <Row item={item} />}
            </RevealItem>
          ))}
        </Reveal>
      </CourseSection>
    );
  }

  const cols = content.items.length >= 3 && content.items.length % 2 === 1 ? 3 : Math.min(content.items.length, 2);
  return (
    <CourseSection id={id} tone={tone} head={content}>
      <Reveal className={`${styles.grid} ${styles[`cols${cols}`]}`} stagger={0.06}>
        {content.items.map((item, i) => (
          <RevealItem
            as="article"
            key={item.heading ?? i}
            className={`${styles.card} ${cols === 1 && item.heading ? styles.split : ""}`}
          >
            {item.heading && <h3 className={styles.heading}>{item.heading}</h3>}
            {item.paragraphs?.map((text) => (
              <p key={text} className={styles.text}>
                {text}
              </p>
            ))}
            {item.address && <Address address={item.address} />}
            {item.list && <OutcomeList items={item.list} />}
            {item.tags && (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </CourseSection>
  );
}

function Address({ address, className = styles.address }: { address: NonNullable<Article["address"]>; className?: string }) {
  return (
    <address className={className}>
      <strong>{address.name}</strong>
      {address.lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </address>
  );
}

function Panel({ item }: { item: Article }) {
  return (
    <>
      <Arcs className={styles.panelArcs} />
      <div className={styles.panelHead}>
        {item.heading && <h3 className={styles.panelHeading}>{item.heading}</h3>}
        {item.paragraphs?.map((text) => (
          <p key={text} className={styles.panelText}>
            {text}
          </p>
        ))}
      </div>
      {item.list && (
        <ul className={styles.checks}>
          {item.list.map((text) => (
            <li key={text} className={styles.check}>
              <CheckCircleIcon className={styles.checkIcon} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Column({ item }: { item: Article }) {
  return (
    <>
      {item.heading && <h3 className={styles.columnHeading}>{item.heading}</h3>}
      {item.paragraphs && (
        <div className={styles.columnText}>
          {item.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}
      {item.address && <Address address={item.address} />}
      {item.list && <OutcomeList items={item.list} />}
    </>
  );
}

function Row({ item }: { item: Article }) {
  return (
    <>
      <div className={styles.rowHead}>
        {item.icon && (
          <span className={styles.rowIcon} aria-hidden="true">
            {ICONS[item.icon]}
          </span>
        )}
        {item.heading && <h3 className={styles.columnHeading}>{item.heading}</h3>}
      </div>
      <div className={styles.rowBody}>
        {item.paragraphs?.map((text) => (
          <p key={text} className={styles.rowText}>
            {text}
          </p>
        ))}
        {item.address && <Address address={item.address} className={styles.rowAddress} />}
        {item.list && <OutcomeList items={item.list} />}
      </div>
    </>
  );
}

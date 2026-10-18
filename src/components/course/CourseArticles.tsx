import Image from "next/image";
import type { ReactNode } from "react";
import { CheckCircleIcon, InfoCircleIcon, ListBulletsIcon, MapPinIcon, RepeatIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import type { Article, ArticleIcon, ArticlesContent } from "@/data/coursePage";
import { CourseSection, type Tone } from "./CourseSection";
import styles from "./CourseArticles.module.css";
import { OutcomeList } from "./ProgramDetails";

const ICONS: Record<ArticleIcon, ReactNode> = {
  repeat: <RepeatIcon />,
  list: <ListBulletsIcon />,
  venue: <MapPinIcon />,
};

type Variant = "panels" | "columns" | "rows" | "media" | "profile";

/**
 * Text-led content blocks: a heading, then paragraphs, check rows, chips or an address.
 * By default they sit in white cards, two or three columns depending on the count; a
 * single card puts its heading beside the copy on wide screens. The Figma layouts:
 * - `panels`: white stroked cards with a grey check list (Module 1 audience).
 * - `columns`: open columns, a list renders as the bordered outcome rows (equipment).
 * - `rows`: full-width rows between rules, icon and heading left, copy right (venue).
 *   With `numbered` an index leads each heading instead (Neurofeedback methods).
 * - `media`: the copy beside `content.image`, for explainers (What Is Neurofeedback).
 * - `profile`: `content.person` as a portrait card beside the copy (About IFEN director).
 * Any layout takes per-item `links` (secondary buttons, or primary when flagged) and a
 * highlighted `note` below. Default cards also take a `listHeading` and `facts` tiles.
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
  const note = content.note && <Note text={content.note} />;

  if (variant === "media") {
    return (
      <CourseSection id={id} tone={tone} head={content}>
        <Reveal className={styles.media} stagger={0.06}>
          <div className={styles.mediaText}>
            {content.items.map((item, i) => (
              <RevealItem as="article" key={item.heading ?? i} className={styles.columnsItem}>
                <Column item={item} />
              </RevealItem>
            ))}
          </div>
          {content.image && (
            <RevealItem className={styles.mediaFrame}>
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 64rem) 40vw, 100vw"
                className={styles.mediaPhoto}
              />
            </RevealItem>
          )}
        </Reveal>
        {note}
      </CourseSection>
    );
  }

  if (variant === "profile") {
    const { person } = content;
    return (
      <CourseSection id={id} tone={tone} head={content}>
        <Reveal className={styles.profile} stagger={0.06}>
          {person && (
            <RevealItem className={styles.person}>
              <span className={styles.personFrame}>
                <Image
                  src={person.image}
                  alt={person.alt}
                  fill
                  sizes="(min-width: 64rem) 320px, (min-width: 48rem) 280px, 320px"
                  className={styles.personPhoto}
                />
              </span>
              <p className={styles.personCaption}>
                <strong className={styles.personName}>{person.name}</strong>
                <span className={styles.personRole}>{person.role}</span>
              </p>
            </RevealItem>
          )}
          <div className={styles.mediaText}>
            {content.items.map((item, i) => (
              <RevealItem as="article" key={item.heading ?? i} className={styles.columnsItem}>
                <Column item={item} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
        {note}
      </CourseSection>
    );
  }

  if (variant) {
    return (
      <CourseSection id={id} tone={tone} head={content}>
        <Reveal className={styles[variant]} stagger={0.06}>
          {content.items.map((item, i) => (
            <RevealItem as="article" key={item.heading ?? i} className={styles[`${variant}Item`]}>
              {variant === "panels" && <Panel item={item} />}
              {variant === "columns" && <Column item={item} />}
              {variant === "rows" && <Row item={item} index={content.numbered ? i + 1 : undefined} />}
            </RevealItem>
          ))}
        </Reveal>
        {note}
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
            {item.heading &&
              (item.lead ? (
                <div className={styles.head}>
                  <h3 className={styles.heading}>{item.heading}</h3>
                  <p className={styles.text}>{item.lead}</p>
                </div>
              ) : (
                <h3 className={styles.heading}>{item.heading}</h3>
              ))}
            {item.paragraphs?.map((text) => (
              <p key={text} className={styles.text}>
                {text}
              </p>
            ))}
            {item.address && <Address address={item.address} />}
            {item.list && (
              <div className={styles.group}>
                {item.listHeading && <h4 className={styles.subheading}>{item.listHeading}</h4>}
                <OutcomeList items={item.list} />
              </div>
            )}
            {item.facts && <Facts facts={item.facts} />}
            {item.tags && (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {item.links && <Links links={item.links} />}
          </RevealItem>
        ))}
      </Reveal>
      {note}
    </CourseSection>
  );
}

function Links({ links }: { links: NonNullable<Article["links"]> }) {
  return (
    <ul className={styles.links}>
      {links.map((link) => (
        <li key={link.href}>
          <Button href={link.href} variant={link.primary ? "primary" : "secondary"}>
            {link.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}

/** Key figures in mist tiles, value over label, under an optional small heading. */
function Facts({ facts }: { facts: NonNullable<Article["facts"]> }) {
  return (
    <div className={styles.group}>
      {facts.heading && <h4 className={styles.subheading}>{facts.heading}</h4>}
      <dl className={styles.facts}>
        {facts.items.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.factLabel}>{fact.label}</dt>
            <dd className={styles.factValue}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Highlighted remark: a lime panel with an info glyph. */
function Note({ text }: { text: string }) {
  return (
    <Reveal>
      <RevealItem as="p" className={styles.note}>
        <InfoCircleIcon className={styles.noteIcon} aria-hidden="true" />
        <span>{text}</span>
      </RevealItem>
    </Reveal>
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
      {item.links && <Links links={item.links} />}
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
      {item.links && <Links links={item.links} />}
    </>
  );
}

function Row({ item, index }: { item: Article; index?: number }) {
  return (
    <>
      <div className={`${styles.rowHead} ${index ? styles.rowHeadNumbered : ""}`}>
        {index && (
          <span className={styles.rowIndex} aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
        )}
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
        {item.list &&
          (item.plainList ? (
            <ul className={styles.rowList}>
              {item.list.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          ) : (
            <OutcomeList items={item.list} />
          ))}
        {item.links && <Links links={item.links} />}
      </div>
    </>
  );
}

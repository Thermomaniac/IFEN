import type { ReactNode } from "react";
import { CheckCircleIcon, CheckIcon } from "@/components/icons";
import { RevealItem } from "@/components/motion/Reveal";
import styles from "./Profile.module.css";

/** Pieces shared by the person profiles (therapist, lecturer) inside a ProfileSection. */

/** Mist stat boxes: a small label over a large value. */
export function Stats({ items }: { items: { label: string; value: string }[] }) {
  return (
    <RevealItem>
      <dl className={styles.stats}>
        {items.map((f) => (
          <div key={f.label} className={styles.stat}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </RevealItem>
  );
}

/** Credential rows: a ticked label left, the value right. */
export function Rows({
  items,
}: {
  items: { label: string; value: ReactNode; note?: string }[];
}) {
  return (
    <RevealItem>
      <dl className={styles.rows}>
        {items.map((c) => (
          <div key={c.label} className={styles.row}>
            <dt>
              <span className={styles.tick} aria-hidden="true">
                <CheckCircleIcon width={16} height={16} />
              </span>
              {c.label}
            </dt>
            <dd>
              {c.value}
              {c.note && <span className={styles.note}> ({c.note})</span>}
            </dd>
          </div>
        ))}
      </dl>
    </RevealItem>
  );
}

/** Bordered group with an uppercase title: the expertise boxes. */
export function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RevealItem className={styles.box}>
      <h3 className={styles.groupTitle}>{title}</h3>
      {children}
    </RevealItem>
  );
}

/** Badges with an optional icon image; a check when it has none and `check` is set. */
export function Badges({ items, check }: { items: { label: string; icon?: string }[]; check?: boolean }) {
  return (
    <ul className={styles.badges}>
      {items.map((i) => (
        <li key={i.label} className={styles.badge}>
          {i.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={i.icon} alt="" width={16} height={16} />
          ) : (
            check && <CheckIcon width={12} height={12} aria-hidden="true" />
          )}
          {i.label}
        </li>
      ))}
    </ul>
  );
}

export function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RevealItem className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      {children}
    </RevealItem>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

import { GlobeIcon, MailIcon, PhoneIcon, PinOutlineIcon, TickIcon } from "@/components/icons";
import { COUNTRIES, QUALIFICATIONS, type Therapist } from "@/data/therapists";
import { formatAddress, initials, websiteLabel } from "@/lib/therapists";
import { LevelIcon, levelLabel } from "./LevelBadge";
import styles from "./TherapistCard.module.css";

/** Published emails are sometimes "a@b.de / Name"; the link uses the first real address. */
const mailto = (email: string) => email.match(/[^\s/,;<>]+@[^\s/,;<>]+\.[a-z]{2,}/i)?.[0];
const tel = (phone: string) => phone.replace(/[^\d+]/g, "");

/**
 * Paper directory card: photo beside the therapist (or the practice when no one is named)
 * with the practice beneath, two rows of chips (the recorded level first, then "+ N more
 * qualifications" as text), then a grey box with what the entry publishes. Nothing is shown that the directory does not record. A record with a
 * profile page opens on click (card and "View Profile"); every card shows the button and the
 * hover. Contact links sit on top.
 */
export function TherapistCard({ therapist: t }: { therapist: Therapist }) {
  const href = t.profileHref;
  const quals = QUALIFICATIONS.filter((q) => t.qualifications.includes(q.id) && q.id !== "mentoring");
  const visible = quals.slice(0, t.level ? 2 : 3);
  const hidden = quals.length - visible.length;
  const address = formatAddress(t);
  const country = t.country && t.country !== "de" ? COUNTRIES[t.country] : "";
  const place = [address, country].filter(Boolean).join(", ");
  const email = t.email ? mailto(t.email) : undefined;
  const mentoring = t.qualifications.includes("mentoring");
  // The therapist leads when the entry names one; the practice then sits beneath.
  const title = t.contact ?? t.name;
  const practice = t.contact ? t.name : undefined;

  const rows = [
    place && {
      key: "place",
      icon: <PinOutlineIcon aria-hidden />,
      body: <span>{place}</span>,
    },
    mentoring && {
      key: "mentor",
      icon: <TickIcon aria-hidden />,
      body: <span>Takes interns &amp; mentees</span>,
    },
    t.email && {
      key: "email",
      icon: <MailIcon aria-hidden />,
      body: email ? (
        <a href={`mailto:${email}`} className={styles.link}>
          {t.email}
        </a>
      ) : (
        <span>{t.email}</span>
      ),
    },
    t.website && {
      key: "web",
      icon: <GlobeIcon aria-hidden />,
      body: (
        <a href={t.website} className={styles.link} target="_blank" rel="noreferrer">
          {websiteLabel(t.website)}
        </a>
      ),
    },
    t.phone && {
      key: "phone",
      icon: <PhoneIcon aria-hidden />,
      body: (
        <a href={`tel:${tel(t.phone)}`} className={styles.link}>
          {t.phone}
        </a>
      ),
    },
  ].filter(Boolean) as {
    key: string;
    icon: React.ReactNode;
    body: React.ReactNode;
  }[];

  const chips = [
    t.level && (
      <li key="level" className={styles.chip}>
        <LevelIcon level={t.level} className={styles.chipIcon} />
        <span className={styles.chipText}>{levelLabel(t.level)}</span>
      </li>
    ),
    ...visible.map((q) => (
      <li key={q.id} className={styles.chip} title={q.short === q.label ? undefined : q.label}>
        {q.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={q.icon} alt="" width={12} height={12} className={styles.chipIcon} />
        )}
        <span className={styles.chipText} aria-hidden={q.short !== q.label || undefined}>
          {q.short}
        </span>
        {q.short !== q.label && <span className="sr-only">{q.label}</span>}
      </li>
    )),
  ].filter(Boolean);
  const chipRows = [chips.slice(0, 2), chips.slice(2)];

  return (
    <article className={styles.card} data-link={href ? "" : undefined}>
      <div className={styles.main}>
        <div className={styles.top}>
          <header className={styles.head}>
            {t.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.photo} alt="" width={64} height={70} className={styles.photo} loading="lazy" />
            ) : (
              <span className={styles.photo} aria-hidden="true">
                {initials(title)}
              </span>
            )}
            <div className={styles.titles}>
              <h4 className={styles.name} title={title}>
                {href ? (
                  <a href={href} className={styles.stretch}>
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h4>
              {practice && (
                <p className={styles.contact} title={practice}>
                  {practice}
                </p>
              )}
            </div>
          </header>

          {chips.length > 0 && (
            <div className={styles.chips} role="group" aria-label="Certification and methods">
              {chipRows.map(
                (row, r) =>
                  (row.length > 0 || (r === 1 && hidden > 0)) && (
                    <ul key={r} className={styles.chipRow} data-row={r}>
                      {row}
                      {r === 1 && hidden > 0 && (
                        <li className={styles.more}>
                          + {hidden} more {hidden === 1 ? "qualification" : "qualifications"}
                        </li>
                      )}
                    </ul>
                  ),
              )}
            </div>
          )}
        </div>

        {rows.length > 0 && (
          <ul className={styles.info}>
            {rows.map((r) => (
              <li key={r.key}>
                {r.icon}
                {r.body}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Every card shows the button; only a record with a profile page opens one. */}
      <div className={styles.foot}>
        <span className={styles.profileBtn} aria-hidden="true">
          View Profile
        </span>
      </div>
    </article>
  );
}

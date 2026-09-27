import Image from "next/image";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { contact, languages } from "@/data/site";
import styles from "./UtilityBar.module.css";

export function UtilityBar({ current = "en" }: { current?: string }) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <ul className={styles.contact}>
          <li>
            <a href={contact.phoneHref} className={styles.contactLink}>
              <PhoneIcon />
              <span>{contact.phone}</span>
            </a>
          </li>
          <li aria-hidden className={styles.divider} />
          <li>
            <a href={`mailto:${contact.email}`} className={styles.contactLink}>
              <MailIcon />
              <span className={styles.email}>{contact.email}</span>
            </a>
          </li>
        </ul>

        <nav aria-label="Language">
          <ul className={styles.langs}>
            {languages.map((lang) => {
              const active = lang.code === current;
              return (
                <li key={lang.code}>
                  <a
                    href={active ? "/" : `/?lang=${lang.code}`}
                    hrefLang={lang.code}
                    lang={lang.code}
                    aria-current={active ? "page" : undefined}
                    className={`${styles.lang} ${active ? styles.langActive : ""}`}
                  >
                    <Image src={lang.flag} alt="" width={16} height={16} className={styles.flag} />
                    <span aria-hidden>{lang.label}</span>
                    <span className="sr-only">{lang.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

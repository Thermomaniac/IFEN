import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { accountCopy as copy, accountImage, accountPaths, accountScreens } from "@/data/account";
import type { AccountAction } from "@/lib/accountForm";
import { AccountForm } from "./AccountForm";
import styles from "./AccountScreen.module.css";

/**
 * A My IFEN screen (Figma 40001147-110209 login, 40001148-110591 register): a full
 * screen split. Left, a white panel with the logo, the form in a 412px column and the
 * switch link at the foot. Right, the IFEN photo under an ink fade with the institute
 * badge and headline; it stays in view while a long form scrolls. Below 64rem only the
 * panel shows.
 */
export function AccountScreen({ action }: { action: AccountAction }) {
  const screen = accountScreens[action];
  return (
    <div className={styles.screen}>
      <section className={styles.panel} aria-labelledby="account-title">
        <Link href="/" className={styles.logo}>
          <Image src="/brand/logo-ifen.png" alt={copy.home} width={92} height={42} priority />
        </Link>

        <Reveal className={styles.body}>
          <RevealItem as="header" className={styles.header}>
            <h1 id="account-title" className={styles.title}>
              {screen.title}
            </h1>
            {screen.intro && <p className={styles.intro}>{screen.intro}</p>}
          </RevealItem>
          <RevealItem>
            <AccountForm action={action} />
          </RevealItem>
        </Reveal>

        <p className={styles.switch}>
          {action === "login" ? (
            <>
              {copy.noAccount}{" "}
              <Link href={accountPaths.register} className={styles.switchLink}>
                {copy.createAccount}
              </Link>
            </>
          ) : action === "register" ? (
            <>
              {copy.haveAccount}{" "}
              <Link href={accountPaths.login} className={styles.switchLink}>
                {copy.login}
              </Link>
            </>
          ) : (
            <Link href={accountPaths.login} className={styles.switchLink}>
              {copy.backToLogin}
            </Link>
          )}
        </p>
      </section>

      <div className={styles.media}>
        <Image src={accountImage.src} alt={accountImage.alt} fill sizes="(max-width: 64rem) 0px, 720px" className={styles.image} priority />
        <span className={styles.fade} aria-hidden="true" />
        <div className={styles.brand}>
          <p className={styles.badge}>{copy.brand.badge}</p>
          <p className={styles.headline}>{copy.brand.headline}</p>
        </div>
      </div>
    </div>
  );
}

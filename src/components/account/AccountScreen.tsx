import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { accountCopy, accountImage, accountScreens } from "@/data/account";
import type { AccountAction } from "@/lib/accountForm";
import { AccountForm } from "./AccountForm";
import styles from "./AccountScreen.module.css";

/**
 * A My IFEN screen: one mist band, the form in a white card on the left and an IFEN
 * photo on the right. Below 64rem the photo drops and the card takes the full width.
 */
export function AccountScreen({ action }: { action: AccountAction }) {
  const screen = accountScreens[action];
  return (
    <section className={styles.band} aria-labelledby="account-title">
      <div className={styles.inner}>
        <div className={styles.card}>
          <Reveal as="header" className={styles.header}>
            <RevealItem>
              <SectionLabel tone="light" size="sm">
                {accountCopy.label}
              </SectionLabel>
            </RevealItem>
            <RevealItem>
              <SectionHeading as="h1" id="account-title" align="start" className={styles.title}>
                {screen.title}
              </SectionHeading>
            </RevealItem>
            <RevealItem as="p" className={styles.intro}>
              {screen.intro}
            </RevealItem>
          </Reveal>
          <AccountForm action={action} />
        </div>
        <div className={styles.media}>
          <Image src={accountImage.src} alt={accountImage.alt} fill sizes="(max-width: 64rem) 0px, 40vw" className={styles.image} priority />
        </div>
      </div>
    </section>
  );
}

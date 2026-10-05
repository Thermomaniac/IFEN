import type { Metadata } from "next";
import { ClearRegistration } from "./ClearRegistration";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "LMS Dashboard | IFEN",
  robots: { index: false },
};

/** Placeholder for the learning platform the payment flow hands over to. */
export default function LmsPage() {
  return (
    <main id="main" className={styles.page}>
      <ClearRegistration />
      <h1 className={styles.title}>LMS Dashboard Screen</h1>
    </main>
  );
}

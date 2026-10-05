import Link from "next/link";
import { ArrowCircleLeftIcon } from "@/components/icons";
import { COURSE_PATH, registration } from "@/data/course";
import styles from "./RegisterHeader.module.css";

/** Ink band above the registration steps: back to the course, page title, four thick strokes. */
export function RegisterHeader() {
  return (
    <header className={styles.band}>
      <svg className={styles.lines} viewBox="0 0 1440 136" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="64">
          <path
            transform="translate(-142 26)"
            d="M0 92.584C0 92.584 94.845 -21.328 156.871 3.554C225.708 31.17 263.482 111.499 305.656 250.409C320.726 300.048 338 388 338 388"
          />
          <path
            transform="translate(630 641) rotate(180) translate(0 641) scale(1 -1)"
            d="M0 152.954C0 152.954 184.078 -35.236 304.459 5.872C438.06 51.494 511.373 184.203 593.225 413.691C622.475 495.698 656 641 656 641"
          />
          <path
            transform="translate(736.46 -501) rotate(12.76) translate(0 531.96) scale(1 -1)"
            d="M0 126.934C0 126.934 149.43 -29.241 247.153 4.873C355.606 42.734 415.12 152.867 481.566 343.315C505.31 411.372 532.525 531.955 532.525 531.955"
          />
          <path
            transform="translate(1478 168) rotate(180)"
            d="M0 88.05C0 88.05 121.222 -20.284 200.498 3.38C288.478 29.643 336.758 106.039 390.66 238.147C409.922 285.355 432 369 432 369"
          />
        </g>
      </svg>

      <div className={styles.inner}>
        <Link href={COURSE_PATH} className={styles.back} aria-label="Back to course details">
          <ArrowCircleLeftIcon />
        </Link>
        <h1 className={styles.title}>{registration.heading}</h1>
      </div>
    </header>
  );
}

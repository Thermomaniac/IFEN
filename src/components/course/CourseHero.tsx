import Link from "next/link";
import { Fragment } from "react";
import {
  CalendarSlashIcon,
  CalendarTickIcon,
  MapPinFillIcon,
  UsersIcon,
} from "@/components/icons";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { course, formatPrice, plans, REGISTER_PATH, type CourseFact } from "@/data/course";
import styles from "./CourseHero.module.css";

const factIcons: Record<CourseFact["icon"], typeof UsersIcon> = {
  start: CalendarTickIcon,
  end: CalendarSlashIcon,
  level: UsersIcon,
  location: MapPinFillIcon,
};

const fromPrice = Math.min(...plans.map((p) => p.price));

/**
 * Webinar hero: breadcrumb, badge, title and highlights on the left, the booking
 * panel on the right. The plans are a static price list; the package is chosen
 * in the registration flow.
 */
export function CourseHero() {
  const factRows = [course.facts.slice(0, 2), course.facts.slice(2, 4)];

  return (
    <section className={styles.hero} aria-labelledby="course-title">
      <svg className={styles.lines} viewBox="0 0 1528 1262.29" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="84">
          <path
            transform="matrix(0.975 0.221 0.221 -0.975 612.898 518.824)"
            d="M0 126.934C0 126.934 149.43 -29.241 247.153 4.873C355.606 42.734 415.12 152.867 481.566 343.315C505.31 411.372 532.525 531.955 532.525 531.955"
          />
          <path
            transform="matrix(1 0 0 1 0 820.293)"
            d="M0 99.265C0 99.265 114.207 -22.867 188.895 3.811C271.784 33.419 317.269 119.545 368.053 268.48C386.2 321.701 407 416 407 416"
          />
          <path
            transform="matrix(-1 0 0 1 1032 745.293)"
            d="M0 123.366C0 123.366 203.44 -28.419 336.483 4.736C484.136 41.533 565.16 148.57 655.622 333.663C687.948 399.806 725 517 725 517"
          />
          <path
            transform="matrix(-1 0 0 -1 1528 745.293)"
            d="M0 88.05C0 88.05 111.12 -20.284 183.789 3.38C264.438 29.643 308.694 106.039 358.105 238.147C375.762 285.355 396 369 396 369"
          />
        </g>
      </svg>

      <div className={styles.inner}>
        <Reveal className={styles.intro}>
          <RevealItem>
            <nav aria-label="Breadcrumb">
              <ol className={styles.breadcrumb}>
                {course.breadcrumb.map((crumb, i) => (
                  <li key={crumb.label} className={styles.crumb}>
                    {i > 0 && (
                      <span className={styles.slash} aria-hidden="true">
                        /
                      </span>
                    )}
                    {crumb.href ? (
                      <Link href={crumb.href} className={styles.crumbLink}>
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </RevealItem>

          <div className={styles.titleBlock}>
            <RevealItem as="p" className={styles.badge}>
              {course.badge}
            </RevealItem>
            <RevealItem>
              <h1 id="course-title" className={styles.title}>
                {course.title}
              </h1>
            </RevealItem>
            <RevealItem as="p" className={styles.description}>
              {course.description}
            </RevealItem>
          </div>

          <RevealItem as="ul" className={styles.highlights}>
            {course.highlights.map((h, i) => (
              <Fragment key={h.label}>
                {i > 0 && <li className={styles.divider} aria-hidden="true" />}
                <li className={styles.highlight}>
                  <span className={styles.highlightValue}>{h.value}</span>
                  <span className={styles.highlightLabel}>{h.label}</span>
                </li>
              </Fragment>
            ))}
          </RevealItem>
        </Reveal>

        <Reveal className={styles.panel} delay={0.15}>
          <RevealItem className={styles.panelHead}>
            <p className={styles.eyebrow} id="plan-legend">
              Select your plan
            </p>
            <p className={styles.from}>From {formatPrice(fromPrice)}</p>
          </RevealItem>

          <RevealItem className={styles.rule}>
            <span />
          </RevealItem>

          <RevealItem>
            <ul className={styles.plans} aria-labelledby="plan-legend">
              {plans.map((p) => (
                <li key={p.id} className={styles.plan}>
                  <span className={styles.planLabel}>{p.label}</span>
                  <span className={styles.planPrice}>{formatPrice(p.price)}</span>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className={styles.facts}>
            {factRows.map((row, r) => (
              <Fragment key={r}>
                {r > 0 && <span className={styles.factRule} aria-hidden="true" />}
                <dl className={styles.factRow}>
                  {row.map((fact) => {
                    const Icon = factIcons[fact.icon];
                    return (
                      <div key={fact.label} className={styles.fact}>
                        <span className={styles.factIcon}>
                          <Icon width={16} height={16} />
                        </span>
                        <div className={styles.factText}>
                          <dt className={styles.factLabel}>{fact.label}</dt>
                          <dd className={styles.factValue}>{fact.value}</dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </Fragment>
            ))}
          </RevealItem>

          <RevealItem>
            <CtaButton href={`${REGISTER_PATH}/participant`} className={styles.cta}>
              Register For Booking
            </CtaButton>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

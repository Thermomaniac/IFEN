import type { CSSProperties } from "react";
import { MAP_HEIGHT, MAP_WIDTH, germanyDots } from "@/data/germanyDots";
import { busiestCities, mappedInGermany, practiceTiles } from "@/data/practiceMap";
import styles from "./PracticeMap.module.css";

const ROW_PITCH = 33.3; // vertical tile spacing in the Paper map
const TILE = 25;

/**
 * Therapist list hero visual: the Paper tile map of Germany, with every tile that holds a
 * registered practice set teal and the three busiest cities called out. Tiles fill in row
 * by row on load, then the practice tiles land (Locations uses the same map and rhythm).
 */
export function PracticeMap() {
  return (
    <figure className={styles.figure}>
      <div className={styles.map}>
        <svg className={styles.tiles} viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true" focusable="false">
          {germanyDots.map(([cx, cy], i) => {
            const count = practiceTiles.get(i) ?? 0;
            return (
              <rect
                key={`${cx}-${cy}`}
                x={cx - TILE / 2}
                y={cy - TILE / 2}
                width={TILE}
                height={TILE}
                rx={3}
                className={count >= 3 ? styles.dense : count > 0 ? styles.lit : undefined}
                style={{ "--row": Math.round(cy / ROW_PITCH) } as CSSProperties}
              />
            );
          })}
        </svg>

        <ul className={styles.callouts} aria-label="Cities with the most practices">
          {busiestCities.map(({ name, count, tile: [x, y] }, i) => (
            <li
              key={name}
              className={styles.callout}
              data-side={x > MAP_WIDTH / 2 ? "left" : "right"}
              style={
                {
                  "--x": `${(x / MAP_WIDTH) * 100}%`,
                  "--y": `${(y / MAP_HEIGHT) * 100}%`,
                  "--i": i,
                } as CSSProperties
              }
            >
              <span className={styles.calloutCard}>
                <span className={styles.calloutCity}>{name}</span>
                <span className={styles.calloutCount}>
                  {count} {count === 1 ? "practice" : "practices"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.key}>
          <span className={styles.swatch} aria-hidden="true" />
          {mappedInGermany} practices in Germany, by area
        </span>
        <span className={styles.key}>
          <span className={`${styles.swatch} ${styles.swatchDense}`} aria-hidden="true" />
          3 or more in one area
        </span>
      </figcaption>
    </figure>
  );
}

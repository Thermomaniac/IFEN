import { Fragment } from "react";
import styles from "./LineBreaks.module.css";

/**
 * Renders "\n" in copy as the design's explicit line break from 48rem. Below that the
 * break folds into a space, so phones and long German compounds keep wrapping freely.
 */
export function LineBreaks({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          {" "}
          <br className={styles.break} />
        </>
      )}
      {line}
    </Fragment>
  ));
}

/** The copy without its design breaks, for metadata and aria labels. */
export const plainText = (text: string) => text.replace(/\s*\n\s*/g, " ");

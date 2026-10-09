import type { CSSProperties, ReactNode } from "react";
import type { PinnedSteps } from "./usePinnedSteps";
import styles from "./PinStage.module.css";

/**
 * Track and sticky stage for `usePinnedSteps`. Unpinned it is two plain wrappers, so
 * switching between pinned and flowing never remounts the content.
 */
export function PinStage({
  pin: { trackRef, stageRef, pinned, count },
  className,
  children,
}: {
  pin: Pick<PinnedSteps, "trackRef" | "stageRef" | "pinned" | "count">;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      ref={trackRef}
      className={styles.track}
      data-pinned={pinned || undefined}
      style={{ "--pin-count": count } as CSSProperties}
    >
      <div ref={stageRef} className={[styles.stage, className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </div>
  );
}

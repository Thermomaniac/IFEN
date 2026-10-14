import { LEVELS, type Level } from "@/data/therapists";

/** The IFEN expert level medal from the component catalog. */
export function LevelIcon({
  level,
  size = 12,
  className,
}: {
  level: Level;
  size?: number;
  className?: string;
}) {
  const l = LEVELS.find((x) => x.id === level)!;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={l.icon} alt="" width={size} height={size} className={className} />;
}

export const levelLabel = (level: Level) => {
  const l = LEVELS.find((x) => x.id === level)!;
  return `${l.label} Certified (${l.hours})`;
};

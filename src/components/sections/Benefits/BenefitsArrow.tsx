import type { SVGProps } from "react";

// Isometric "upward" arrow from the Paper Benefits card. Decorative.
const faces = [
  {
    t: "106.701 5.976",
    d: "M137.280 152.436L115.989 163.069L88.391 176.880L63.629 134.176L34.173 83.380L22.122 62.602L1.491 27.011L0 24.444L48.889 0L137.280 152.436Z",
  },
  {
    t: "18.333 30.42",
    d: "M176.758 152.436L156.126 164.193L151.995 157.056L122.540 106.260L103.106 72.722V228.239L73.651 211.224V55.733L68.005 58.936L20.606 85.947L0 50.380L88.366 0L89.858 2.566L110.489 38.158L122.540 58.936L151.995 109.731L176.758 152.436Z",
  },
  {
    t: "38.939 86.153",
    d: "M53.044 0V3.398L48.889 5.769L0 30.214L47.398 3.202L53.044 0Z",
  },
  {
    t: "174.46 158.411",
    d: "M69.520 0L48.889 11.758L0 36.202L20.632 24.444L48.229 10.633L69.520 0Z",
    thin: true,
  },
  {
    t: "121.439 103.142",
    d: "M48.889 84.333V131.071L0 155.517V0L19.433 33.538L48.889 84.333Z",
  },
];

export function BenefitsArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 264 264" aria-hidden="true" focusable="false" {...props}>
      {faces.map((f) => (
        <path
          key={f.t}
          transform={`translate(${f.t.replace(" ", ",")})`}
          d={f.d}
          fill="#1a565f"
          stroke="#d1fcfa"
          strokeWidth={f.thin ? 0.6 : 1.2}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

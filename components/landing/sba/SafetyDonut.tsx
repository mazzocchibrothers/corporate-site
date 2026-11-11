// The donut of the three elements of workplace safety on
// /lp/safety-behaviour-assessment, drawn as in the deck: competences on the
// left, experience top right, attitudes bottom right, the Skillvue mark in the
// middle. `active` lights one segment and dims the other two.

import React from 'react';
import type { LucideIcon } from 'lucide-react';

// Centre of each segment, in degrees clockwise from three o'clock.
const CENTRES = [180, 300, 60];
const SPAN = 120;
const GAP = 12;
const R_OUTER = 92;
const R_INNER = 54;
const R_ICON = (R_OUTER + R_INNER) / 2;

// Rounded to two decimals: the server and the browser can disagree on the last
// digit of a cosine, and an SVG path that differs by one digit fails hydration.
const round = (n: number) => Math.round(n * 100) / 100;

const point = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [round(100 + r * Math.cos(a)), round(100 + r * Math.sin(a))];
};

function segment(centre: number) {
  const a0 = centre - SPAN / 2 + GAP / 2;
  const a1 = centre + SPAN / 2 - GAP / 2;
  const [x0, y0] = point(R_OUTER, a0);
  const [x1, y1] = point(R_OUTER, a1);
  const [x2, y2] = point(R_INNER, a1);
  const [x3, y3] = point(R_INNER, a0);
  return `M${x0} ${y0} A${R_OUTER} ${R_OUTER} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_INNER} ${R_INNER} 0 0 0 ${x3} ${y3} Z`;
}

export default function SafetyDonut({
  icons,
  active,
  className = '',
}: {
  icons: LucideIcon[];
  active?: number;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {CENTRES.map((c, i) => {
          const opacity = active === undefined || active === i ? 1 : 0.22;
          return (
            <path
              key={c}
              d={segment(c)}
              fill="#6366F8"
              fillOpacity={opacity}
              stroke="#6366F8"
              strokeOpacity={opacity}
              strokeWidth={8}
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
      {CENTRES.map((c, i) => {
        const [x, y] = point(R_ICON, c);
        const Icon = icons[i];
        return (
          <Icon
            key={c}
            className="absolute h-[13%] w-[13%] -translate-x-1/2 -translate-y-1/2 text-white"
            style={{ left: `${x / 2}%`, top: `${y / 2}%` }}
            strokeWidth={1.75}
          />
        );
      })}
      <img
        src="/logos/skillvue-logomark.svg"
        alt=""
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

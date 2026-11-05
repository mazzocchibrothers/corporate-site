'use client';

// The dashed lines in the /trust hero that tie each team's card to the
// agreement in the middle. They depend on where the grid placed the cards, so
// they are measured, not drawn by hand, and redrawn whenever the grid resizes.
//
// Rendered as the grid's first child: it reads its siblings — the agreement
// (`data-deal-doc`) and the team cards (`data-dn`). Positions come from
// offsetLeft/offsetTop rather than getBoundingClientRect, so the cards' intro
// rise does not bend the lines while it plays.

import { useEffect, useRef, useState } from 'react';

type Line = { x1: number; y1: number; x2: number; y2: number };

const box = (el: HTMLElement) => ({
  left: el.offsetLeft,
  top: el.offsetTop,
  right: el.offsetLeft + el.offsetWidth,
  bottom: el.offsetTop + el.offsetHeight,
  width: el.offsetWidth,
  height: el.offsetHeight,
});

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export function DealLines() {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; lines: Line[] } | null>(null);

  useEffect(() => {
    const grid = ref.current?.parentElement;
    if (!grid) return;

    const draw = () => {
      const doc = grid.querySelector<HTMLElement>('[data-deal-doc]');
      if (!doc || !grid.offsetWidth || !grid.offsetHeight) return;
      const d = box(doc);
      const lines: Line[] = [];
      grid.querySelectorAll<HTMLElement>('[data-dn]').forEach((node) => {
        const b = box(node);
        const mid = b.top + b.height / 2;
        if (b.right <= d.left + 1) lines.push({ x1: b.right, y1: mid, x2: d.left, y2: clamp(mid, d.top + 16, d.bottom - 16) });
        else if (b.left >= d.right - 1) lines.push({ x1: b.left, y1: mid, x2: d.right, y2: clamp(mid, d.top + 16, d.bottom - 16) });
        else if (b.top >= d.bottom - 1) lines.push({ x1: b.left + b.width / 2, y1: b.top, x2: d.left + d.width / 2, y2: d.bottom });
      });
      setGeo({ w: grid.offsetWidth, h: grid.offsetHeight, lines });
    };

    draw();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(draw);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none max-[760px]:hidden">
      {geo && (
        <svg width={geo.w} height={geo.h} className="absolute left-0 top-0 block overflow-visible">
          {geo.lines.map((l, i) => (
            <g key={i}>
              <path
                d={`M${l.x1} ${l.y1}L${l.x2} ${l.y2}`}
                fill="none"
                stroke="#BDBDD0"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                strokeLinecap="round"
                className="trust-dash-flow"
              />
              <circle cx={l.x2} cy={l.y2} r={3} fill="#fff" stroke="#8C9FFF" strokeWidth={1.5} />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

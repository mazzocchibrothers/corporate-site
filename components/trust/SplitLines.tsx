'use client';

// The branching dashed line on /trust under "What we give you": one stem
// that splits and curves down into each document card below it. Each branch
// lands on the centre of its card, so the cards are measured — they are the
// element right after this one — and the branches redrawn on any resize.

import { useEffect, useRef, useState } from 'react';

export function SplitLines({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; xs: number[] } | null>(null);

  useEffect(() => {
    const el = ref.current;
    const docs = el?.nextElementSibling as HTMLElement | null;
    if (!el || !docs) return;

    const draw = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const left = el.getBoundingClientRect().left;
      const xs = Array.from(docs.children).map((child) => {
        const b = child.getBoundingClientRect();
        return b.left - left + b.width / 2;
      });
      setGeo({ w, h, xs });
    };

    draw();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    ro.observe(docs);
    return () => ro.disconnect();
  }, []);

  const c = geo ? geo.w / 2 : 0;
  const r = geo ? Math.min(12, geo.h / 2) : 0;

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {geo && (
        <svg width={geo.w} height={geo.h} className="absolute left-0 top-0 block overflow-visible">
          {geo.xs.map((x, i) => {
            const dir = x < c ? -1 : 1;
            return (
              <path
                key={i}
                d={`M${c} 0H${x - dir * r}Q${x} 0 ${x} ${r}V${geo.h}`}
                fill="none"
                stroke="#BDBDD0"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                strokeLinecap="round"
                className="trust-dash-flow"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}

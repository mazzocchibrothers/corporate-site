'use client';

// The branching dashed line on /trust under "What we give you": one stem
// that splits and curves down into each document card below it. Each branch
// lands on the centre of its card, so the cards are measured — they are the
// element right after this one — and the branches redrawn on any resize.

import { DashedPath, useMeasuredGeometry } from '@/components/trust/connectors';

function measure(el: HTMLDivElement) {
  const docs = el.nextElementSibling;
  const w = el.clientWidth;
  const h = el.clientHeight;
  if (!docs || !w || !h) return null;
  const left = el.getBoundingClientRect().left;
  const xs = Array.from(docs.children).map((child) => {
    const b = child.getBoundingClientRect();
    return b.left - left + b.width / 2;
  });
  return { w, h, xs };
}

const observe = (el: HTMLDivElement) => [el.nextElementSibling];

/** A branch from the stem's top at `c` down to `x`: across, a rounded corner, then down. */
function branch(c: number, x: number, r: number, h: number) {
  // The corner is never wider than the offset, so a card just off-centre still
  // meets the stem, and one centred under it gets a straight drop.
  const rr = Math.min(r, Math.abs(x - c));
  if (rr < 0.5) return `M${c} 0V${h}`;
  const dir = x < c ? -1 : 1;
  return `M${c} 0H${x - dir * rr}Q${x} 0 ${x} ${rr}V${h}`;
}

export function SplitLines({ className }: { className?: string }) {
  const [ref, geo] = useMeasuredGeometry(measure, observe);
  const r = geo ? Math.min(12, geo.h / 2) : 0;

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {geo && (
        <svg width={geo.w} height={geo.h} className="absolute left-0 top-0 block overflow-visible">
          {geo.xs.map((x, i) => <DashedPath key={i} d={branch(geo.w / 2, x, r, geo.h)} />)}
        </svg>
      )}
    </div>
  );
}

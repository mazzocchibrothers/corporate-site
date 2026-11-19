'use client';

import { useEffect, useRef, useState } from 'react';
import { groupFigure } from '@/components/landing/sba/count-up';

// A figure that counts up from zero the first time it scrolls into view. The
// same behaviour as the figures on /lp/safety-behaviour-assessment (its
// <CountUp> in components/landing/sba/ImpactPanel.tsx), copied rather than moved
// so that page is untouched, and widened to keep what comes before the number:
// "−30%" counts as −0% … −30%.
//
// The server renders the final figure, so it reads right without JavaScript and
// for a crawler. It drops to zero only when it mounts below the fold, out of
// sight, and never with reduced motion. Italian groups thousands with a dot,
// English with a comma; a figure keeps the separator it was written with.

const DURATION_MS = 1400;

function split(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  return { pre: m[1], n: Number(m[2].replace(/[.,]/g, '')), rest: m[3], sep: (m[2].includes(',') ? ',' : '.') as ',' | '.' };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    const parts = split(value);
    if (!el || !parts || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen at mount: leave it as rendered.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setShown(`${parts.pre}0${parts.rest}`);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / DURATION_MS);
          const eased = 1 - Math.pow(1 - p, 3);
          if (p < 1) {
            setShown(`${parts.pre}${groupFigure(Math.round(parts.n * eased), parts.sep)}${parts.rest}`);
            raf = requestAnimationFrame(tick);
          } else {
            setShown(null);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  // While it climbs, the visible text changes every frame; the label stays the
  // final figure, so a screen reader never reads a half-counted number.
  return (
    <span ref={ref} className={className} aria-label={shown === null ? undefined : value}>
      {shown ?? value}
    </span>
  );
}

'use client';

// What the /trust connector lines share: one dashed stroke, and the measure ->
// observe -> redraw lifecycle. <DealLines> (the hero) and <SplitLines> ("What
// we give you") each supply only their geometry.

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Measures with `measure(el)` after mount and again whenever `el` or any of
 * the elements `observe(el)` returns resize. `measure` returns null when there
 * is nothing to draw yet (a hidden or zero-size box).
 */
export function useMeasuredGeometry<T>(
  measure: (el: HTMLDivElement) => T | null,
  observe: (el: HTMLDivElement) => (Element | null | undefined)[] = () => [],
): [RefObject<HTMLDivElement | null>, T | null] {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const draw = () => {
      const next = measure(el);
      if (next) setGeo(next);
    };
    draw();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    for (const other of observe(el)) if (other) ro.observe(other);
    return () => ro.disconnect();
    // Runs once: measure and observe are module-level functions in both callers.
  }, []);

  return [ref, geo];
}

/** The page's connector: a 1.5px dashed line in #121212 at 22%, flowing. */
export function DashedPath({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#121212"
      strokeOpacity={0.22}
      strokeWidth={1.5}
      strokeDasharray="4 4"
      strokeLinecap="round"
      className="trust-dash-flow"
    />
  );
}

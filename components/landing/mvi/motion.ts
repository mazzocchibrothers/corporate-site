'use client';

// The in-view hook for the measured-vs-inferred visuals. The same
// observer <Reveal> uses, exposed as state so a visual can drive its own
// transitions; and, like <Reveal>, a reader who asked for less motion gets the
// final state at once.

import { useEffect, useState, type RefObject } from 'react';

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function useInView(ref: RefObject<Element | null>, rootMargin = '-80px'): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || reducedMotion()) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setInView(true);
      io.disconnect();
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

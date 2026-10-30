'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// The entrance of a still product screen: its blocks fade in and rise, one
// after another (`.product-reveal` in styles/globals.css). It plays the first
// time the screen is on screen and its tab is showing, and again every time the
// tab is chosen: the key remounts the blocks, which restarts their animation.
//
// The rise is the `translate` property, not `transform`, because many blocks
// position themselves with a transform of their own, which an animated
// transform would replace.

const STEP_MS = 45;
// Past this many blocks the rest arrive together, so a screen with dozens of
// small parts (the interview's waveform) still finishes in about a second.
const MAX_STEPS = 24;

export function StaggerReveal({ active, children }: { active: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  useEffect(() => {
    if (active && seen) setRun((r) => r + 1);
  }, [active, seen]);

  // Before the first paint of each run, so no block shows before its turn. A
  // block can name its own delay (`data-reveal-delay`, in ms) and is then left
  // out of the count, so a run of small parts timed together — the interview's
  // waveform — does not push the blocks after it back.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !run) return;
    let n = 0;
    Array.from(el.children).forEach((child) => {
      const block = child as HTMLElement;
      const own = block.dataset.revealDelay;
      block.style.animationDelay = own !== undefined ? `${own}ms` : `${Math.min(n++, MAX_STEPS) * STEP_MS}ms`;
    });
  }, [run]);

  return (
    <div key={run} ref={ref} className={run ? 'product-reveal' : 'product-reveal-wait'} style={{ position: 'absolute', inset: 0 }}>
      {children}
    </div>
  );
}

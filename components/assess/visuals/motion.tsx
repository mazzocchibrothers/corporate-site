'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// The motion every Skillvue Assess visual shares, built on what the site already
// has: the `.product-reveal` entrance in styles/globals.css (each block fades in
// and rises, one after another — the same one <StaggerReveal> plays on /product)
// and an IntersectionObserver. No framer-motion.
//
// <StaggerReveal> fills an absolutely positioned, fixed-ratio screen; these
// visuals are laid out in flow, so <Sequence> applies the same classes to its
// own children instead. With reduced motion the CSS shows every block at once.

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * `seen` turns true the first time the element is a quarter on screen and stays
 * true; `visible` follows it in and out, so a running cycle can pause.
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, seen, visible] as const;
}

/**
 * Steps an index through `count` states, starting from and ending on `start`.
 * It begins once the visual has been seen, pauses while it is off screen, runs
 * through the states at most `cycles` times, then rests on `start` for good.
 * With reduced motion it never moves.
 */
export function useAutoCycle({
  count,
  start,
  seen,
  visible,
  intervalMs,
  cycles = 2,
}: {
  count: number;
  start: number;
  seen: boolean;
  visible: boolean;
  intervalMs: number;
  cycles?: number;
}) {
  const [step, setStep] = useState(0);
  const total = count * cycles;

  useEffect(() => {
    if (!seen || !visible || step >= total || reducedMotion()) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), intervalMs);
    return () => window.clearTimeout(id);
  }, [seen, visible, step, total, intervalMs]);

  // After the last step (start + count × cycles) the index is back on `start`.
  return (start + step) % count;
}

const STEP_MS = 70;

/**
 * Plays `.product-reveal` on its direct children, one after another, once
 * `run` is true. Change `replay` to play it again (a new channel, a new skill).
 * A child can set its own delay in ms with `data-reveal-delay`.
 */
export function Sequence({
  run,
  replay = 0,
  className,
  step = STEP_MS,
  offset = 0,
  children,
}: {
  run: boolean;
  replay?: number | string;
  className?: string;
  step?: number;
  offset?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Before the first paint of each run, so no block shows before its turn.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !run) return;
    let n = 0;
    Array.from(el.children).forEach((child) => {
      const block = child as HTMLElement;
      const own = block.dataset.revealDelay;
      block.style.animationDelay = own !== undefined ? `${own}ms` : `${offset + n++ * step}ms`;
    });
  }, [run, replay, offset, step]);

  return (
    <div key={`${run}-${replay}`} ref={ref} className={`${run ? 'product-reveal' : 'product-reveal-wait'} ${className ?? ''}`}>
      {children}
    </div>
  );
}

'use client';

import React, { useLayoutEffect, useRef } from 'react';

/**
 * A hero's h1 and its subtitle, ending on one right edge.
 *
 * CSS alone gets close (.hero-copy is fit-content, .hero-subtitle adds no
 * width of its own), but a heading that wraps by itself keeps the full
 * available width as its box while its longest line stops short of it. So
 * after layout this sets the wrapper to the width of that longest line — the
 * heading cannot re-wrap at its own longest line, and the subtitle fills it.
 * Measured again whenever the column resizes and once the webfont is in.
 */
export function HeroCopy({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const heading = el?.querySelector('h1');
    if (!el || !heading) return;

    const fit = () => {
      el.style.width = '';
      const range = document.createRange();
      range.selectNodeContents(heading);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0);
      if (!rects.length) return;
      const width = Math.max(...rects.map((r) => r.right)) - Math.min(...rects.map((r) => r.left));
      el.style.width = `${Math.ceil(width) + 1}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    // Only a change of the column's width can re-wrap the heading; fitting
    // changes the column's height, which must not trigger another fit.
    let lastWidth = el.parentElement?.clientWidth;
    const observer = new ResizeObserver(() => {
      const width = el.parentElement?.clientWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      fit();
    });
    if (el.parentElement) observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`hero-copy ${className}`.trim()}>{children}</div>;
}

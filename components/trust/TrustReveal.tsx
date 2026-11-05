'use client';

// The /trust scroll reveal. Its design does not use the site's <Reveal>: an
// element fades and rises 28px over 1.1s, and the elements that enter the
// viewport together come in one after another, 90ms apart, top to bottom.
// <Reveal> animates each element on its own clock, which cannot stagger a
// batch, and wrapping every target would make each section a client tree.
//
// So this renders nothing and drives the elements marked `data-trust-reveal`
// in the server-rendered page. Only elements still below the fold when the page
// loads are hidden; anything already on screen stays put. A second check every
// second reveals whatever was scrolled past too fast for the observer.

import { useEffect } from 'react';

const EASE = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
const STAGGER = 0.09;

const reset = (el: HTMLElement) => {
  for (const prop of ['opacity', 'visibility', 'transform', 'transition']) el.style.removeProperty(prop);
};

export function TrustReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rise = reduce ? 0 : 28;
    const duration = reduce ? 0.4 : 1.1;
    const fold = window.innerHeight * 0.85;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-trust-reveal]'))
      .filter((el) => el.getBoundingClientRect().top > fold);
    const pending = new Set(targets);
    const timers: number[] = [];

    for (const el of targets) {
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      el.style.transform = `translateY(${rise}px)`;
    }

    const reveal = (list: HTMLElement[]) => {
      list.forEach((el, i) => {
        pending.delete(el);
        const delay = i * STAGGER;
        void el.offsetWidth;
        el.style.transition =
          `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s, visibility 0s linear ${delay}s`;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        timers.push(window.setTimeout(() => reset(el), (delay + duration) * 1000 + 50));
      });
    };

    const byPosition = (a: HTMLElement, b: HTMLElement) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return ra.top - rb.top || ra.left - rb.left;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement).sort(byPosition);
        hits.forEach((el) => io.unobserve(el));
        if (hits.length) reveal(hits);
      },
      { rootMargin: '0px 0px -22% 0px', threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));

    const failSafe = window.setInterval(() => {
      const passed = Array.from(pending).filter((el) => el.getBoundingClientRect().bottom < 0);
      if (passed.length) reveal(passed);
      if (!pending.size) window.clearInterval(failSafe);
    }, 1000);

    return () => {
      io.disconnect();
      window.clearInterval(failSafe);
      timers.forEach((t) => window.clearTimeout(t));
      targets.forEach(reset);
    };
  }, []);

  return null;
}

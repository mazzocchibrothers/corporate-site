'use client';

// The site's one animation: fade up when the element scrolls into view.
//
// It exists so that a section does not have to be a Client Component in order to
// move. framer-motion's `whileInView` lives on the element itself, which makes
// the element — and therefore the whole section around it, and therefore its
// copy — client-side. `<Reveal>` is the client boundary instead, and its
// children arrive already rendered by the server.
//
// That is the difference between using the App Router and being on it: with
// framer-motion, /science shipped six client sections and their strings; with
// this, it ships two.
//
// The animation is deliberately the same one: opacity 0 -> 1 and a 30px rise,
// once, when the element is 100px inside the viewport. `x` and `scale` are here
// because the site's `initial` objects use them too — 27 elements slide in from
// the side and one photo grows — and they are the same transform, not a second
// animation.

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Pixels to rise from. framer-motion's `y` in the `initial` object. */
  y?: number;
  /** Pixels to slide in from. framer-motion's `x`. */
  x?: number;
  /** Scale to grow from. framer-motion's `scale`. */
  scale?: number;
  /** Seconds. */
  duration?: number;
  delay?: number;
  /** The element to render. `section`, `li`, whatever the markup needs. */
  as?: ElementType;
  style?: CSSProperties;
  [key: string]: unknown;
};

export function Reveal({
  children,
  className,
  y = 30,
  x = 0,
  scale = 1,
  duration = 0.5,
  delay = 0,
  as: Tag = 'div',
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // No observer (an old browser, a test runner): show it. An element that
    // never animates is a smaller problem than one that never appears.
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }

    // Respect the OS setting. framer-motion was not doing this, so this is the
    // one behavioural difference from what the site does today.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();          // once: true
      },
      { rootMargin: '-100px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The caller's own style is merged, not spread after ours: `{...rest}` on the
  // element would replace the whole style object, and the element would simply
  // never animate — with nothing to see in a diff or a build.
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown
          ? 'none'
          : `translate(${x}px, ${y}px)${scale === 1 ? '' : ` scale(${scale})`}`,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

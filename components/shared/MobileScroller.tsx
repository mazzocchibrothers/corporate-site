// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode[];
  className?: string;
  dotColor?: 'light' | 'dark';
  desktopClassName?: string;
};

/**
 * Mobile horizontal scroller with peek + dots indicator.
 * On mobile: horizontal scroll with snap points, shows progress dots below.
 * On desktop: renders children inside `desktopClassName` (e.g. a grid).
 */
export default function MobileScroller({ children, className = '', dotColor = 'light', desktopClassName = '' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const items = React.Children.toArray(children);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const itemWidth = el.scrollWidth / items.length;
      const idx = Math.round(el.scrollLeft / itemWidth);
      setActiveIdx(Math.min(Math.max(idx, 0), items.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [items.length]);

  const activeDot = dotColor === 'dark' ? 'bg-[#1A1A2E]/60' : 'bg-white/70';
  const inactiveDot = dotColor === 'dark' ? 'bg-[#1A1A2E]/15' : 'bg-white/20';

  return (
    <div>
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className={`flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2 ${className}`}
        >
          {items.map((child, i) => (
            <div key={i} className="shrink-0 w-[80vw] snap-center">
              {child}
            </div>
          ))}
        </div>
        {/* Progress dots */}
        {items.length > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {items.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIdx ? `w-6 ${activeDot}` : `w-1.5 ${inactiveDot}`
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: normal grid/layout */}
      <div className={`hidden md:block ${desktopClassName}`}>
        {children}
      </div>
    </div>
  );
}

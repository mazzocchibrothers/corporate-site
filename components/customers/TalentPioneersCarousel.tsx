'use client';

import { useEffect, useRef, type PointerEvent, type MouseEvent, type ReactNode } from 'react';
import {
  shouldSuppressCarouselClick,
  wrapCarouselOffset,
} from './talent-pioneers-carousel';

const LOOP_SECONDS = 45;

export default function TalentPioneersCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const capturedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const applyTransform = () => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
  };

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) loopWidthRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener('resize', measure);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (time: number) => {
      const dt = (time - (lastTimeRef.current ?? time)) / 1000;
      lastTimeRef.current = time;
      if (!draggingRef.current && !pausedRef.current && !reduceMotion && loopWidthRef.current) {
        offsetRef.current = wrapCarouselOffset(offsetRef.current + (loopWidthRef.current / LOOP_SECONDS) * dt, loopWidthRef.current);
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    dragDistanceRef.current = 0;
    event.currentTarget.style.cursor = 'grabbing';
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = event.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.abs(dx);
    if (!capturedRef.current && shouldSuppressCarouselClick(dragDistanceRef.current)) {
      event.currentTarget.setPointerCapture(event.pointerId);
      capturedRef.current = true;
    }
    offsetRef.current = wrapCarouselOffset(dragStartOffsetRef.current - dx, loopWidthRef.current);
    applyTransform();
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.style.cursor = 'grab';
    suppressClickRef.current = shouldSuppressCarouselClick(dragDistanceRef.current);
    if (capturedRef.current) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      capturedRef.current = false;
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        cursor: 'grab',
        touchAction: 'pan-y',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onClickCapture={handleClickCapture}
    >
      <div ref={trackRef} className="flex items-stretch" style={{ width: 'max-content', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

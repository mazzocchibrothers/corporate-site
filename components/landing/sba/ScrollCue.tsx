'use client';

// The cue at the foot of the first screen on /lp/safety-behaviour-assessment:
// a quiet pill, a word and an arrow that nudges down. It links to the next
// section and fades away once the visitor has started to scroll.

import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function ScrollCue({ label, target }: { label: string; target: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onScroll = () => setGone(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`#${target}`}
      className={`group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-white/[0.12] lg:inline-flex ${
        gone ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes sba-nudge { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(3px) } }
        .sba-nudge { animation: sba-nudge 1.6s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .sba-nudge { animation: none } }
      `}</style>
      <span className="type-body-sm font-medium text-white/80 group-hover:text-white">{label}</span>
      <ArrowDown className="sba-nudge h-3.5 w-3.5 text-white/80 group-hover:text-white" aria-hidden="true" />
    </a>
  );
}

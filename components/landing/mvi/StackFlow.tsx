'use client';

// "We feed them", drawn as a two-way exchange: the visitor's jobs and business
// data flow in, measured skills data flows back out to the systems they
// already run. The destinations are the integration targets the messaging
// names, nothing more.

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { useInView } from './motion';

function Lane({ dir, active }: { dir: 'out' | 'in'; active: boolean }) {
  return (
    <div className="relative h-full w-px md:h-px md:w-full" aria-hidden="true">
      <div className="absolute inset-0 bg-white/[0.12]" />
      {active && [0, 1, 2].map((d) => (
        <span
          key={d}
          className={`absolute -left-[3px] top-0 md:-top-[3px] md:left-0 h-[7px] w-[7px] rounded-full motion-reduce:hidden animate-[mvi-flow-v_1.8s_linear_infinite] md:animate-[mvi-flow-h_1.8s_linear_infinite] ${
            dir === 'in' ? 'bg-[#a9a9a9] [animation-direction:reverse] md:[animation-direction:reverse]' : 'bg-[#8385FF] shadow-[0_0_10px_rgba(99,102,248,0.8)]'
          }`}
          style={{ animationDelay: `${d * 0.6 + (dir === 'in' ? 0.3 : 0)}s` }}
        />
      ))}
    </div>
  );
}

export default function StackFlow() {
  const t = useTranslations('lp.measured-vs-inferred.stack.flow');
  const destinations = t.raw('destinations') as string[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[minmax(0,1fr)_190px_minmax(0,1.5fr)] items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-8 mb-10"
    >
      {/* Skillvue */}
      <div className="flex items-center gap-4 rounded-xl border border-[#6366F8]/40 bg-[#6366F8]/10 p-4 md:p-5">
        <img src="/logos/skillvue-logomark.svg" alt="" width={32} height={32} loading="lazy" decoding="async" className="h-8 w-8 shrink-0" />
        <div>
          <p className="text-[16px] font-semibold text-white">{t('source')}</p>
          <p className="text-[13px] text-white/60">{t('sourceSub')}</p>
        </div>
      </div>

      {/* Two lanes: out (accent) and in (grey). Horizontal from md, vertical below. */}
      <div className="flex md:flex-col items-center md:items-stretch justify-center gap-6 md:gap-0 py-4 md:py-0 md:px-4">
        <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#8385FF] whitespace-nowrap mb-2 md:self-center">
          {t('outbound')}<ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
        <div className="flex md:flex-col gap-6 md:gap-5 h-20 md:h-auto md:w-full">
          <Lane dir="out" active={inView} />
          <Lane dir="in" active={inView} />
        </div>
        <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-white/50 whitespace-nowrap mt-2 md:self-center">
          <ArrowLeft className="h-3 w-3" aria-hidden="true" />{t('inbound')}
        </span>
        {/* Labels beside the vertical lanes on small screens */}
        <div className="md:hidden flex flex-col gap-2 text-[12px]">
          <span className="inline-flex items-center gap-1 text-[#8385FF]"><ArrowDown className="h-3 w-3" aria-hidden="true" />{t('outbound')}</span>
          <span className="inline-flex items-center gap-1 text-white/50"><ArrowUp className="h-3 w-3" aria-hidden="true" />{t('inbound')}</span>
        </div>
      </div>

      {/* The visitor's stack */}
      <div>
        <p className="text-[12px] text-white/40 mb-3">{t('label')}</p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {destinations.map((d, i) => (
            <li
              key={d}
              className={`rounded-lg border px-3 py-2.5 text-[14px] text-center transition-all duration-500 ${
                inView ? 'border-[#6366F8]/40 bg-[#6366F8]/[0.08] text-white/90' : 'border-white/[0.08] bg-transparent text-white/40'
              }`}
              style={{ transitionDelay: `${600 + i * 180}ms` }}
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

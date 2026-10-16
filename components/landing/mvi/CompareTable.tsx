'use client';

// "Same goal. Very different data.": both answers on every row, side by side,
// so the difference is read in one glance. The Skillvue column is one raised
// panel from header to last row; as the section comes into view each row's
// inference answer appears, then Skillvue's lights up next to it.

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Minus } from 'lucide-react';
import { useInView } from './motion';

type Row = { label: string; inferred: string; measured: string };

const ROW_MS = 110;

function Mark({ measured }: { measured: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        measured ? 'bg-[#4B4DF7] text-white' : 'border border-dashed border-black/[0.25] text-[#121212]/40'
      }`}
      aria-hidden="true"
    >
      {measured ? <Check className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" />}
    </span>
  );
}

export default function CompareTable() {
  const t = useTranslations('lp.measured-vs-inferred.compare');
  const rows = t.raw('rows') as Row[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, '-120px');

  const cell = (delay: number) => ({
    className: `transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <div ref={ref} className="relative rounded-2xl bg-white border border-black/[0.06] p-2 md:p-3">
      <div className="relative md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]">
        {/* The Skillvue column: one panel behind the whole column (md and up) */}
        <div
          className={`hidden md:block col-start-3 rounded-xl border bg-[#4B4DF7]/[0.04] transition-all duration-700 ${
            inView ? 'border-[#4B4DF7]/25 shadow-[0_12px_40px_rgba(75,77,247,0.10)]' : 'border-transparent'
          }`}
          style={{ gridRow: `1 / span ${rows.length + 1}` }}
          aria-hidden="true"
        />

        {/* Header */}
        <span className="hidden md:block row-start-1 col-start-1" />
        <span className="hidden md:block row-start-1 col-start-2 px-5 pt-4 pb-3 text-[13px] font-medium text-[#121212]/50">
          {t('colInferred')}
        </span>
        <span className="hidden md:block row-start-1 col-start-3 px-5 pt-4 pb-3 text-[13px] font-semibold text-[#4B4DF7]">
          {t('colMeasured')}
        </span>

        {rows.map((r, i) => {
          const gridRow = { gridRow: i + 2 };
          const border = i > 0 ? 'md:border-t md:border-black/[0.06]' : '';
          return (
            <React.Fragment key={r.label}>
              <div
                className={`md:col-start-1 px-3 md:px-5 pt-5 md:py-5 text-[15px] font-semibold text-[#121212] ${i > 0 ? 'border-t border-black/[0.06]' : ''}`}
                style={gridRow}
              >
                {r.label}
              </div>
              <div className={`md:col-start-2 px-3 md:px-5 pt-3 md:py-5 ${border}`} style={gridRow}>
                <div {...cell(i * ROW_MS)}>
                  <span className="md:hidden block text-[12px] font-medium text-[#121212]/40 mb-1.5">{t('colInferred')}</span>
                  <div className="flex items-start gap-3">
                    <Mark measured={false} />
                    <p className="text-[15px] text-[#121212]/55 leading-[1.6]">{r.inferred}</p>
                  </div>
                </div>
              </div>
              <div className={`md:col-start-3 px-3 md:px-5 pt-3 pb-5 md:py-5 ${border}`} style={gridRow}>
                <div {...cell(i * ROW_MS + 260)} className={`${cell(0).className} rounded-lg bg-[#4B4DF7]/[0.04] md:bg-transparent p-3 md:p-0`}>
                  <span className="md:hidden block text-[12px] font-semibold text-[#4B4DF7] mb-1.5">{t('colMeasured')}</span>
                  <div className="flex items-start gap-3">
                    <Mark measured />
                    <p className="text-[15px] text-[#121212] leading-[1.6]">{r.measured}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

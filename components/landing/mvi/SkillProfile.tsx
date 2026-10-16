'use client';

// The hero visual on /lp/measured-vs-inferred: one profile, seen first the way
// inference sees it and then the way an assessment does. It is a diagram, not
// data: the bar geometry below is illustrative, which is why the card says so
// and no bar carries a number.

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { useInView } from './motion';

type Mode = 'inferred' | 'measured';
type Row = { name: string; inferred: string; measured: string };

// Per row: where the inferred estimate band sits (null = not visible in system
// data) and how far the measured bar reaches. Percent of the track.
const GEOMETRY = [
  { band: [30, 48] as const, score: 72 },
  { band: [22, 52] as const, score: 64 },
  { band: null, score: 81 },
  { band: null, score: 68 },
];

const CYCLE_MS = 4200;

export default function SkillProfile() {
  const t = useTranslations('lp.measured-vs-inferred.hero.visual');
  const rows = t.raw('rows') as Row[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, '0px');
  const [mode, setMode] = useState<Mode>('inferred');
  const [auto, setAuto] = useState(true);

  // A reader who asked for less motion gets the buttons, not the rotation.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!inView || !auto) return;
    const id = setInterval(() => setMode((m) => (m === 'inferred' ? 'measured' : 'inferred')), CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, auto]);

  const choose = (m: Mode) => { setAuto(false); setMode(m); };
  const measured = mode === 'measured';

  return (
    <div ref={ref} className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <span className="text-[12px] text-white/40 whitespace-nowrap">{t('label')}</span>
        <div className="inline-flex rounded-full bg-white/[0.06] p-1" role="group">
          {(['inferred', 'measured'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => choose(m)}
              className={`rounded-full px-3.5 py-1 text-[15px] font-medium transition-colors duration-300 ${
                mode === m ? 'bg-[#6366F8] text-white' : 'text-white/55 hover:text-white/80'
              }`}
            >
              {m === 'inferred' ? t('tabInferred') : t('tabMeasured')}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-5">
        {rows.map((row, i) => {
          const g = GEOMETRY[i];
          const visible = measured || g.band !== null;
          const left = measured ? 0 : g.band?.[0] ?? 0;
          const width = measured ? g.score : g.band?.[1] ?? 0;
          return (
            <li key={row.name}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[15px] font-medium text-white/90">{row.name}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border border-[#6366F8]/40 bg-[#6366F8]/15 px-2 py-0.5 text-[11px] text-[#8385FF] transition-opacity duration-500 ${
                    measured ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: measured ? `${300 + i * 120}ms` : '0ms' }}
                  aria-hidden={!measured}
                >
                  <Check className="h-3 w-3" aria-hidden="true" />
                  {t('evidence')}
                </span>
              </div>

              <div
                className={`relative h-2.5 rounded-full transition-colors duration-500 ${
                  visible ? 'bg-white/[0.06]' : 'border border-dashed border-white/[0.18]'
                }`}
              >
                <div
                  className="absolute inset-y-0 rounded-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ left: `${left}%`, width: `${width}%`, transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`absolute inset-0 mvi-estimate transition-opacity duration-500 ${measured ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <div
                    className={`absolute inset-0 bg-[#6366F8] transition-opacity duration-500 ${measured ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              </div>

              <div className="grid mt-1.5">
                <span aria-hidden={measured} className={`[grid-area:1/1] text-[12px] leading-[1.4] text-white/45 transition-opacity duration-300 ${measured ? 'opacity-0' : 'opacity-100'}`}>
                  {row.inferred}
                </span>
                <span aria-hidden={!measured} className={`[grid-area:1/1] text-[12px] leading-[1.4] text-white/70 transition-opacity duration-300 ${measured ? 'opacity-100' : 'opacity-0'}`}>
                  {row.measured}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="grid mt-6 pt-4 border-t border-white/[0.08]">
        <p aria-hidden={measured} className={`[grid-area:1/1] text-[13px] text-white/50 transition-opacity duration-300 ${measured ? 'opacity-0' : 'opacity-100'}`}>
          {t('footerInferred')}
        </p>
        <p aria-hidden={!measured} className={`[grid-area:1/1] text-[13px] text-white/85 transition-opacity duration-300 ${measured ? 'opacity-100' : 'opacity-0'}`}>
          {t('footerMeasured')}
        </p>
      </div>
    </div>
  );
}

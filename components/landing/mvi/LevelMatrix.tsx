'use client';

// The hero visual on /lp/measured-vs-inferred-v2: one team, two views side by
// side. On the left, the skill map: who carries which skill tag. On the right,
// the same team measured: a level per skill and per person, against the level
// the role requires. A diagram, not data — the card says the team is
// illustrative, and the numbers below were chosen to show the point.

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { useInView } from './motion';

// Rows are skills, columns are people. `tags`: the skill map has the tag.
// `levels`: the measured level, 1-5. `targets`: the role's level per skill.
const TAGS = [
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1],
];
const LEVELS = [
  [4, 2, 3, 5, 1],
  [3, 2, 1, 4, 3],
  [2, 1, 3, 4, 1],
  [1, 3, 2, 4, 4],
];
const TARGETS = [4, 3, 3, 3];

const CELL_MS = 35;

function Panel({ title, accent, footer, aside, children }: { title: string; accent?: boolean; footer: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className={`min-w-0 rounded-2xl border p-4 md:p-6 lg:px-6 lg:py-5 ${
        accent ? 'border-[#6366F8]/40 bg-[#6366F8]/[0.06]' : 'border-white/[0.08] bg-white/[0.03]'
      }`}
    >
      <div className="flex items-baseline justify-between gap-4 mb-5 lg:mb-3">
        <p className={`text-[15px] font-semibold ${accent ? 'text-[#8385FF]' : 'text-white/70'}`}>{title}</p>
        {aside && <div className="hidden lg:block">{aside}</div>}
      </div>
      {children}
      <p className={`mt-5 pt-4 lg:mt-3 lg:pt-3 border-t border-white/[0.08] text-[13px] leading-[1.5] ${accent ? 'text-white/80' : 'text-white/50'}`}>{footer}</p>
    </div>
  );
}

export default function LevelMatrix() {
  const t = useTranslations('lp.measured-vs-inferred-v2.hero.visual');
  const skills = t.raw('skills') as string[];
  const people = t.raw('people') as string[];
  const levels = t.raw('levels') as string[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, '0px');

  const appear = (i: number) => ({
    className: `transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`,
    style: { transitionDelay: `${i * CELL_MS}ms` },
  });

  // Skill name column, then one column per person (and the target, measured side).
  const grid = (extra: boolean) =>
    ({ gridTemplateColumns: `minmax(0,1.6fr) repeat(${people.length + (extra ? 1 : 0)}, minmax(0,1fr))` });

  const Header = ({ target }: { target?: boolean }) => (
    <div className="grid gap-1.5 md:gap-2 mb-2 text-[11px] text-white/40" style={grid(!!target)}>
      <span>{t('peopleLabel')}</span>
      {people.map((p) => <span key={p} className="text-center">{p}</span>)}
      {target && <span className="text-center text-white/70">{t('targetLabel')}</span>}
    </div>
  );

  const legend = (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/55">
      <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-[#6366F8]" aria-hidden="true" />{t('legendMeets')}</span>
      <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-white/[0.15]" aria-hidden="true" />{t('legendBelow')}</span>
    </div>
  );

  // On a laptop the caption goes under the panels and the legend into the
  // measured panel's title row: the hero then fits both panels whole in an
  // 800px-tall window.
  return (
    <div ref={ref} className="min-w-0 flex flex-col">
      <p className="text-[13px] md:text-[14px] font-medium text-white/65 mb-3">{t('label')}</p>
      <div className="grid lg:grid-cols-2 gap-4 md:gap-5">
        <Panel title={t('inferredTitle')} footer={t('footerInferred')}>
          <Header />
          <ul className="space-y-1.5 md:space-y-2 lg:space-y-1.5">
            {skills.map((s, r) => (
              <li key={s} className="grid gap-1.5 md:gap-2 items-center" style={grid(false)}>
                <span className="text-[12px] md:text-[13px] text-white/75 leading-tight">{s}</span>
                {TAGS[r].map((has, c) => (
                  <span
                    key={c}
                    style={appear(r * people.length + c).style}
                    className={`${appear(0).className} flex h-8 md:h-9 lg:h-8 items-center justify-center rounded-md ${
                      has ? 'border border-white/[0.18] bg-white/[0.06] text-white/70' : 'border border-dashed border-white/[0.10]'
                    }`}
                  >
                    {has ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t('measuredTitle')} footer={t('footerMeasured')} aside={legend} accent>
          <Header target />
          <ul className="space-y-1.5 md:space-y-2 lg:space-y-1.5">
            {skills.map((s, r) => (
              <li key={s} className="grid gap-1.5 md:gap-2 items-center" style={grid(true)}>
                <span className="text-[12px] md:text-[13px] text-white/85 leading-tight">{s}</span>
                {LEVELS[r].map((lv, c) => {
                  const meets = lv >= TARGETS[r];
                  return (
                    <span
                      key={c}
                      title={levels[lv - 1]}
                      className={`${appear(0).className} flex h-8 md:h-9 lg:h-8 items-center justify-center rounded-md stat-value text-[14px] md:text-[15px] ${
                        meets ? 'text-white' : 'text-white/70'
                      }`}
                      style={{
                        ...appear(r * people.length + c + 10).style,
                        backgroundColor: meets ? `rgba(99,102,248,${0.45 + lv * 0.1})` : `rgba(255,255,255,${0.04 + lv * 0.03})`,
                      }}
                    >
                      {lv}
                    </span>
                  );
                })}
                <span className="flex h-8 md:h-9 lg:h-8 items-center justify-center rounded-md border border-white/60 stat-value text-[14px] md:text-[15px] text-white">
                  {TARGETS[r]}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 lg:hidden">{legend}</div>
        </Panel>
      </div>
    </div>
  );
}

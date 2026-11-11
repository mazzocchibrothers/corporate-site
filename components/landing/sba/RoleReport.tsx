'use client';

// "Il report per ruolo" on /lp/safety-behaviour-assessment: the same person,
// read against what each role expects of every behaviour — the enablers and
// the accelerator against a floor, the drifts against a ceiling — and the
// outcome said plainly. The numbers live in role-report.ts.

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, TriangleAlert } from 'lucide-react';
import { EXPECTED, KINDS, MEASURED, inLine, type Kind } from './role-report';

type Column = { name: string; items: { title: string }[] };

const STYLE: Record<Kind, { fill: string; text: string }> = {
  enabler: { fill: 'bg-[#22c55e]', text: 'text-[#047857]' },
  drift: { fill: 'bg-[#ff5656]', text: 'text-[#ef4444]' },
  accelerator: { fill: 'bg-[#4B4DF7]', text: 'text-[#4B4DF7]' },
};

function Bar({ kind, measured, expected }: { kind: Kind; measured: number; expected: number }) {
  return (
    <span className="relative flex gap-1" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-2.5 flex-1 rounded-full ${n <= measured ? STYLE[kind].fill : 'bg-[#E5E7EB]'}`} />
      ))}
      {/* The role's level: a tick at the end of its segment. */}
      <span
        className="absolute -top-1.5 -bottom-1.5 w-[3px] -translate-x-1/2 rounded-full bg-[#121212]"
        style={{ left: `calc(${(expected / 5) * 100}% - ${expected === 5 ? 0 : 2}px)` }}
      />
    </span>
  );
}

export default function RoleReport() {
  const t = useTranslations('lp.safety-behaviour-assessment');
  const [role, setRole] = useState(0);

  const roles = t.raw('reporting.individual.roles') as string[];
  const columns = t.raw('framework.columns') as Column[];
  const names = columns.flatMap((c) => c.items.map((i) => i.title));
  const expected = EXPECTED[role];
  const ok = KINDS.map((k, i) => inLine(k, MEASURED[i], expected[i]));
  const watch = names.filter((_, i) => !ok[i]);

  let index = 0;

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 text-[#121212]">
      {/* Title and the role switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.02em]">{t('reporting.individual.title')}</h3>
          <span className="rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 type-caption text-[#4B4B4B]">{t('reporting.individual.example')}</span>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <span className="type-body-sm text-[#4B4B4B]">{t('reporting.individual.roleLabel')}</span>
          <div className="flex flex-1 rounded-full bg-[#f1f5f9] p-1 sm:flex-none" role="group" aria-label={t('reporting.individual.roleLabel')}>
            {roles.map((r, i) => (
              <button
                key={r}
                type="button"
                aria-pressed={role === i}
                onClick={() => setRole(i)}
                className={`flex-1 whitespace-nowrap rounded-full px-3 py-2 type-body-sm font-medium transition-colors sm:flex-none sm:px-4 ${
                  role === i ? 'bg-[#4B4DF7] text-white shadow-sm' : 'text-[#4B4B4B] hover:text-[#121212]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Behaviours, by family */}
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {columns.map((c) => {
          const kind = KINDS[index];
          return (
            <div key={c.name}>
              <div className="flex items-baseline justify-between gap-3 border-b border-[#E5E7EB] pb-2 mb-4">
                <p className={`type-body-bold ${STYLE[kind].text}`}>{c.name}</p>
                <p className="type-caption text-[#4B4B4B]">
                  {kind === 'drift' ? t('reporting.individual.ceiling') : t('reporting.individual.floor')}
                </p>
              </div>
              <ul className="space-y-4">
                {c.items.map((item) => {
                  const i = index++;
                  return (
                    <li key={item.title}>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="type-body-sm text-[#121212]">{item.title}</span>
                        {ok[i] ? (
                          <Check className="h-4 w-4 shrink-0 text-[#047857]" strokeWidth={2.5} aria-label={t('reporting.individual.inLine')} />
                        ) : (
                          <TriangleAlert className="h-4 w-4 shrink-0 text-[#ef4444]" aria-label={t('reporting.individual.toWatch')} />
                        )}
                      </div>
                      <Bar kind={kind} measured={MEASURED[i]} expected={expected[i]} />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* The outcome, in plain words */}
      <div className="mt-8 grid gap-4 border-t border-[#E5E7EB] pt-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-8">
        <p className="flex items-baseline gap-2">
          <span className="stat-value text-[32px] md:text-[40px] text-[#121212]" style={{ lineHeight: 1 }}>
            {ok.filter(Boolean).length}/{ok.length}
          </span>
          <span className="type-body-sm text-[#4B4B4B]">{t('reporting.individual.summary')}</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="type-body-sm font-medium text-[#121212]">{t('reporting.individual.toWatch')}:</span>
          {watch.map((w) => (
            <span key={w} className="rounded-full border border-[#ff9a9a] bg-[#ff9a9a]/15 px-3 py-0.5 type-caption font-medium text-[#ef4444]">{w}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 type-caption text-[#4B4B4B]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-[3px] rounded-full bg-[#121212]" aria-hidden="true" />
          {t('reporting.individual.legend')}
        </span>
        <span>{t('reporting.individual.note')}</span>
      </div>
    </div>
  );
}

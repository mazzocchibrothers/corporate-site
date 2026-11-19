'use client';

import { useTranslations } from 'next-intl';
import { UserRound } from 'lucide-react';
import { Illustration, LevelBar } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { DECISION } from '@/components/assess/visuals/data';

// How it works, step 3: one person's result next to what the role needs, and
// the decision it leads to — here, develop.

export function DecideResult() {
  const t = useTranslations('product.skillvue-assess.visuals.decideResult');
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Sequence run={seen} step={180} className="flex flex-col gap-3">
          <div className="rounded-xl border border-black/[0.08] bg-white p-3">
            <div className="flex items-center gap-2.5 border-b border-black/[0.06] pb-2.5 type-body-sm font-medium text-[#121212]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e1e2ff] text-[#6366f8]">
                <UserRound className="h-4 w-4" strokeWidth={1.75} />
              </span>
              {t('person')}
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2 type-caption">
              <span className="text-[#121212]">{t('skill')}</span>
              <span className="text-[#7A7A7A]">
                {t('needed')} <span className="text-[#121212]">{DECISION.needed}</span>
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <LevelBar level={DECISION.level} needed={DECISION.needed} size="lg" />
              <span className="type-body-sm tabular-nums text-[#121212]">{DECISION.level}</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {DECISION.options.map((id) => (
              <span
                key={id}
                className={`rounded-full border px-3 py-1 type-caption font-medium ${
                  id === DECISION.chosen ? 'border-[#f8ddc9] bg-[#fdf1ea] text-[#d9603f]' : 'border-black/[0.08] bg-white text-[#121212]'
                }`}
              >
                {t(`decisions.${id}`)}
              </span>
            ))}
          </div>
        </Sequence>
      </Illustration>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Illustration, StatusPill, Window } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { GENERATOR } from '@/components/assess/visuals/data';

// Step 1 · Generate: the question generator takes a role, a skill, a target
// level and company context, drafts, critiques, refines and checks each
// question; confident ones are ready, uncertain ones go to your expert.

const ROW = 'grid grid-cols-[64px_1fr] items-center gap-3 border-b border-black/[0.06] py-3 last:border-b-0 sm:grid-cols-[96px_1fr]';
const LABEL = 'type-caption text-[#4B4B4B]';
const PILL = 'rounded-full border px-2.5 py-1 type-caption';

export function QuestionGenerator() {
  const t = useTranslations('product.skillvue-assess.visuals.generator');
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Window title={t('window')} fade={88}>
          <Sequence run={seen} step={110} className="px-4 py-1">
            <div className={ROW}>
              <span className={LABEL}>{t('role')}</span>
              <span className="type-body-sm text-[#121212]">{t('roleValue')}</span>
            </div>
            <div className={ROW}>
              <span className={LABEL}>{t('skill')}</span>
              <span className="flex flex-wrap items-center gap-2">
                <span className="type-body-sm text-[#121212]">{t('skillValue')}</span>
                <span className={`${PILL} border-black/[0.06] bg-[#f5f5f7] text-[#707070]`}>{t('skillType')}</span>
              </span>
            </div>
            <div className={ROW}>
              <span className={LABEL}>{t('level')}</span>
              <span className="flex flex-wrap gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border type-caption ${
                      n === GENERATOR.level ? 'border-black/[0.12] bg-[#ebebeb] text-[#121212]' : 'border-black/[0.08] text-[#707070]'
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </span>
            </div>
            <div className={ROW}>
              <span className={LABEL}>{t('context')}</span>
              <span className="flex flex-wrap gap-1.5">
                {GENERATOR.contexts.map((id) => (
                  <span key={id} className={`${PILL} border-black/[0.08] bg-[#f5f5f7] text-[#121212]`}>
                    {t(`contexts.${id}`)}
                  </span>
                ))}
              </span>
            </div>
          </Sequence>

          <Sequence
            run={seen}
            offset={520}
            step={150}
            className="flex flex-wrap items-center justify-center gap-1 border-y border-black/[0.06] px-3 py-4 sm:gap-2 sm:px-4"
          >
            {GENERATOR.pipeline.map((id, i) => (
              <span key={id} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && <ArrowRight className="h-3 w-3 text-[#9a9a9a]" strokeWidth={1.5} />}
                <span
                  className={`rounded-full border px-2.5 py-1 type-caption sm:px-4 sm:py-1.5 sm:type-body-sm ${
                    i === GENERATOR.pipeline.length - 1 ? 'border-[#4b4df7] bg-[#4b4df7] text-white' : 'border-black/[0.12] text-[#121212]'
                  }`}
                >
                  {t(`pipeline.${id}`)}
                </span>
              </span>
            ))}
          </Sequence>

          <Sequence run={seen} offset={1180} step={260} className="flex flex-col gap-5 px-4 py-5 sm:px-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="type-caption font-medium text-[#121212]">{t('openEnded')}</span>
                <StatusPill tone="ok">{t('ready')}</StatusPill>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {GENERATOR.ready.map((w, i) => (
                  <i key={i} className="h-1.5 rounded-full bg-[#ebebeb]" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 type-caption text-[#707070]">
                {t('rubric')}
                <span className="flex gap-1.5">
                  {['bg-[#d9daff]', 'bg-[#a9aaff]', 'bg-[#8385ff]', 'bg-[#6366f8]', 'bg-[#4b4df7]'].map((c) => (
                    <i key={c} className={`h-1 w-5 rounded-full ${c}`} />
                  ))}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="type-caption font-medium text-[#121212]">{t('multipleChoice')}</span>
                <StatusPill tone="gap">{t('expert')}</StatusPill>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {GENERATOR.expert.map((w, i) => (
                  <i key={i} className="h-1.5 rounded-full bg-[#ebebeb]" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </Sequence>
        </Window>
      </Illustration>
    </div>
  );
}

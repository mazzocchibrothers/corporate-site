'use client';

import { useTranslations } from 'next-intl';
import { Illustration, Window } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { EXPERT_MATCH } from '@/components/assess/visuals/data';

// The science: the same answer scored twice, by a trained expert and by
// Skillvue Assess, landing on the same level. The expert's pips fill first,
// then Skillvue's, then the two scores.

function Pips({ level, filled }: { level: number; filled: string }) {
  return (
    <Sequence run={level > 0} step={90} className="flex flex-1 gap-1.5">
      {[1, 2, 3, 4, 5].map((k) => (
        <i key={k} data-reveal="grow" className={`h-1.5 flex-1 rounded-full ${k <= level ? filled : 'bg-[#ebebeb]'}`} />
      ))}
    </Sequence>
  );
}

export function ExpertMatch() {
  const t = useTranslations('product.skillvue-assess.visuals.expert');
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto w-full max-w-[400px]">
      <Illustration label={t('label')}>
        <Window fade={51}>
          <div className="flex flex-col gap-4 px-5 py-5">
            <span className="type-caption text-[#7A7A7A]">{t('tag')}</span>
            <Sequence run={seen} step={600} className="flex flex-col gap-3">
              <div className="grid grid-cols-[108px_1fr_16px] items-center gap-3">
                <span className="type-body-sm text-[#121212]">{t('expertLabel')}</span>
                <Pips level={seen ? EXPERT_MATCH.expert : 0} filled="bg-[#a9aaff]" />
                <b className="text-right type-body-sm font-semibold text-[#121212]">{EXPERT_MATCH.expert}</b>
              </div>
              <div className="grid grid-cols-[108px_1fr_16px] items-center gap-3">
                <span className="type-body-sm text-[#4b4df7]">{t('assessLabel')}</span>
                <Pips level={seen ? EXPERT_MATCH.assess : 0} filled="bg-[#4b4df7]" />
                <b className="text-right type-body-sm font-semibold text-[#4b4df7]">{EXPERT_MATCH.assess}</b>
              </div>
            </Sequence>
          </div>
        </Window>
      </Illustration>
    </div>
  );
}

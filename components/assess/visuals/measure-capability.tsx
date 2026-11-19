'use client';

import { useTranslations } from 'next-intl';
import { Illustration, LevelBar, Voice } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { CAPABILITY, WAVE_SHORT } from '@/components/assess/visuals/data';

// How it works, step 2: a question about a real situation, a spoken answer, and
// the scores it earns — soft skills 1 to 5, hard skills 0 to 100%.

export function MeasureCapability() {
  const t = useTranslations('product.skillvue-assess.visuals.measureCapability');
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Sequence run={seen} step={160} className="flex flex-col gap-2.5">
          <p className="rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 type-caption text-[#121212]">{t('question')}</p>
          <div className="flex justify-end">
            <Voice bars={WAVE_SHORT} duration={t('duration')} />
          </div>
          <div className="flex flex-col gap-2.5 rounded-xl border border-black/[0.08] bg-white px-3 py-3">
            <div className="grid grid-cols-[1fr_minmax(0,1.3fr)_36px] items-center gap-2">
              <span className="type-caption text-[#121212]">{t('soft')}</span>
              <LevelBar level={CAPABILITY.soft} size="sm" />
              <span className="text-right type-caption tabular-nums text-[#121212]">{CAPABILITY.soft}</span>
            </div>
            <div className="grid grid-cols-[1fr_minmax(0,1.3fr)_36px] items-center gap-2">
              <span className="type-caption text-[#121212]">{t('hard')}</span>
              <span className="relative h-1.5 overflow-hidden rounded-full bg-[#ebebeb]">
                <i className="absolute inset-y-0 left-0 rounded-full bg-[#6366f8]" style={{ width: `${CAPABILITY.hardPercent}%` }} />
              </span>
              <span className="text-right type-caption tabular-nums text-[#121212]">{t('hardValue', { percent: CAPABILITY.hardPercent })}</span>
            </div>
          </div>
        </Sequence>
      </Illustration>
    </div>
  );
}

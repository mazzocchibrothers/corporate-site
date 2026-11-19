'use client';

import { useTranslations } from 'next-intl';
import { Illustration, LevelBar } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { ROLE_PROFILE } from '@/components/assess/visuals/data';

// How it works, step 1: roles, context, goals and people flow into one role
// profile — the skills a store manager needs and at what level.

const INPUTS = ['roles', 'context', 'goals'] as const;

export function ContextToRole() {
  const t = useTranslations('product.skillvue-assess.visuals.contextToRole');
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <div className="flex items-center">
          <Sequence run={seen} className="flex w-[76px] shrink-0 flex-col gap-2">
            {INPUTS.map((id) => (
              <span key={id} className="rounded-full border border-black/[0.08] bg-white px-2.5 py-1 type-caption text-[#121212]">
                {t(`inputs.${id}`)}
              </span>
            ))}
            <span className="flex w-fit items-center rounded-full border border-black/[0.08] bg-white px-2 py-1">
              {['bg-[#d9daff]', 'bg-[#8385ff]', 'bg-[#4b4df7]'].map((c, i) => (
                <i key={c} className={`h-3.5 w-3.5 rounded-full border border-white ${c} ${i ? '-ml-1' : ''}`} />
              ))}
            </span>
          </Sequence>

          {/* Four inputs converging on the role profile. */}
          <svg viewBox="0 0 40 120" className="h-[120px] w-8 shrink-0 sm:w-10" fill="none" preserveAspectRatio="none">
            {[12, 44, 76, 108].map((y) => (
              <path key={y} d={`M0 ${y} C 22 ${y}, 18 60, 40 60`} stroke="#d9daff" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          <div className="min-w-0 flex-1 rounded-xl border border-black/[0.08] bg-white p-3">
            <p className="type-caption font-semibold text-[#121212]">{t('role')}</p>
            <Sequence run={seen} offset={280} step={120} className="mt-2 flex flex-col gap-2.5">
              {ROLE_PROFILE.map(({ skill, needed }) => (
                <div key={skill}>
                  <div className="flex items-center justify-between gap-2 type-caption text-[#4B4B4B]">
                    <span className="truncate">{t(`skills.${skill}`)}</span>
                    <span className="tabular-nums text-[#121212]">{needed}</span>
                  </div>
                  <LevelBar level={0} needed={needed} showGap={false} size="sm" className="mt-1.5" />
                </div>
              ))}
            </Sequence>
          </div>
        </div>
      </Illustration>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Illustration, StatusPill, Window } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { MAPPING } from '@/components/assess/visuals/data';

// Step 3 · Measure: a store manager's own framework mapped onto Skillvue's
// validated one — the mapping chosen by HR — and the 0 to 100% hard-skill scale.
//
// The two columns are a fixed three rows each, so the connectors are drawn in a
// viewBox of three equal bands and stretched to the gap between the columns.

const ITEM = 'flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 type-caption font-medium text-[#121212] sm:type-body-sm';
const YOUR_DOTS = ['bg-[#ebebeb]', 'bg-[#9a9a9a]', 'bg-[#ebebeb]'];
const SCIENCE_DOTS = ['bg-[#8385ff]', 'bg-[#d9daff]', 'bg-[#d9daff]'];

export function FrameworkMapping() {
  const t = useTranslations('product.skillvue-assess.visuals.mapping');
  const [ref, seen] = useInView<HTMLDivElement>();
  const y = (i: number) => 16.67 + i * 33.33;

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Window title={t('window')} fade={90}>
          <div className="grid grid-cols-[1fr_28px_1fr] gap-y-3 px-3 pt-5 pb-5 sm:grid-cols-[1fr_56px_1fr] sm:px-6">
            <span className="type-caption text-[#4B4B4B]">{t('yours')}</span>
            <span />
            <span className="type-caption text-[#4B4B4B]">{t('ours')}</span>

            <Sequence run={seen} step={200} className="flex flex-col gap-3">
              {MAPPING.yours.map((id, i) => (
                <span key={id} className={`${ITEM} bg-[#f5f5f7]`}>
                  <i className={`h-2 w-2 shrink-0 rounded-full ${YOUR_DOTS[i]}`} />
                  {t(`yourItems.${id}`)}
                </span>
              ))}
            </Sequence>

            <svg viewBox="0 0 56 100" preserveAspectRatio="none" className="h-full w-full" fill="none">
              {MAPPING.links.map(([from, to]) => (
                <path
                  key={`${from}-${to}`}
                  d={`M0 ${y(from)} C 28 ${y(from)}, 28 ${y(to)}, 56 ${y(to)}`}
                  stroke={from === 1 ? '#8385ff' : '#d9daff'}
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                  className={seen ? 'opacity-100 transition-opacity delay-700 duration-700 motion-reduce:transition-none' : 'opacity-0 motion-reduce:opacity-100'}
                />
              ))}
            </svg>

            <Sequence run={seen} offset={100} step={200} className="flex flex-col gap-3">
              {MAPPING.science.map((id, i) => (
                <span key={id} className={`${ITEM} border border-[#d9daff] bg-[#f1f2ff]`}>
                  <i className={`h-2 w-2 shrink-0 rounded-full ${SCIENCE_DOTS[i]}`} />
                  {t(`scienceItems.${id}`)}
                </span>
              ))}
            </Sequence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-y border-black/[0.06] bg-[#fafafa] px-3 py-3.5 sm:px-6">
            <span className="type-caption font-medium text-[#121212]">{t('foot')}</span>
            <StatusPill tone="ok">{t('chosen')}</StatusPill>
          </div>

          <div className="px-3 py-5 sm:px-6">
            <span className="type-caption text-[#4B4B4B]">{t('hard')}</span>
            <Sequence run={seen} offset={900} step={120} className="mt-3 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} data-reveal="grow" className={`h-1.5 flex-1 rounded-full ${i < MAPPING.hardFilled ? 'bg-[#4b4df7]' : 'bg-[#ebebeb]'}`} />
              ))}
            </Sequence>
            <div className="mt-2 flex justify-between type-caption text-[#7A7A7A]">
              <span>{t('min')}</span>
              <span>{t('max')}</span>
            </div>
          </div>
        </Window>
      </Illustration>
    </div>
  );
}

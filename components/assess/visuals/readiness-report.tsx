'use client';

import { useTranslations } from 'next-intl';
import { Illustration, Legend, LevelBar, StatusPill, Window } from '@/components/assess/visuals/frame';
import { Sequence, useAutoCycle, useInView } from '@/components/assess/visuals/motion';
import { REPORT, REPORT_DEFAULT, REPORT_EVIDENCE, REPORT_WHY } from '@/components/assess/visuals/data';

// What you get: one person's readiness report. Each skill's measured level
// against what the role needs, and for the skill in focus its gap, the evidence
// from the answers and why it got that level.
//
// The design's skill list is clickable; here it is drawn. The focus moves down
// the list on its own, through the skills twice, then rests on Sales KPI
// analysis. It waits while it is off screen, and with reduced motion it stays
// on Sales KPI analysis.

const CYCLE_MS = 2800;

export function ReadinessReport() {
  const t = useTranslations('product.skillvue-assess.visuals.report');
  const [ref, seen, visible] = useInView<HTMLDivElement>();
  const index = useAutoCycle({ count: REPORT.length, start: REPORT_DEFAULT, seen, visible, intervalMs: CYCLE_MS });
  const skill = REPORT[index];

  const value = (s: (typeof REPORT)[number]) => (s.hard ? t('hardValue', { percent: s.level * 20 }) : t('softValue', { level: s.level }));
  const gap = skill.needed - skill.level;
  const status =
    gap > 0 ? (
      <StatusPill tone="gap">{skill.hard ? t('developHard', { points: gap * 20 }) : t('developSoft', { gap })}</StatusPill>
    ) : (
      <StatusPill tone="neutral">{gap < 0 ? t('strength') : t('meets')}</StatusPill>
    );

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Window title={t('window')} fade={140}>
          <div className="flex flex-col gap-2 border-b border-black/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <Legend measured={t('legend.measured')} needed={t('legend.needed')} gap={t('legend.gap')} />
            <span className="type-caption text-[#707070]">{t('scale')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <Sequence run={seen} step={110} className="flex flex-col gap-1 border-b border-black/[0.06] p-3 md:border-r md:border-b-0 md:p-4">
              {REPORT.map((s, i) => (
                <div
                  key={s.id}
                  className={`grid grid-cols-[minmax(0,1.3fr)_minmax(56px,1fr)_40px] items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 motion-reduce:transition-none ${
                    i === index ? 'border-[#d9daff] bg-[#f6f7ff]' : 'border-transparent'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block type-body-sm font-medium text-[#121212]">{t(`skills.${s.id}`)}</span>
                    <span className="block type-caption text-[#707070]">{s.hard ? t('types.hard') : t('types.soft')}</span>
                  </span>
                  <LevelBar level={s.level} needed={s.needed} size="sm" />
                  <span className="text-right type-body-sm tabular-nums text-[#4B4B4B]">{value(s)}</span>
                </div>
              ))}
            </Sequence>

            <Sequence run={seen} replay={skill.id} offset={120} step={120} className="flex flex-col gap-5 p-4 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#121212] sm:text-[24px]">{t(`skills.${skill.id}`)}</p>
                  <p className="mt-1 type-caption text-[#707070]">
                    {skill.hard
                      ? t('hardMeta', { percent: skill.level * 20, needed: skill.needed * 20 })
                      : t('softMeta', { level: skill.level, needed: skill.needed })}
                  </p>
                </div>
                {status}
              </div>
              <div>
                <LevelBar level={skill.level} needed={skill.needed} size="lg" />
                <div className="mt-2 flex justify-between type-caption text-[#707070]">
                  <span>{skill.hard ? t('ends.hardMin') : t('ends.softMin')}</span>
                  <span>{skill.hard ? t('ends.hardMax') : t('ends.softMax')}</span>
                </div>
              </div>
              <div className="rounded-xl border border-black/[0.08] bg-[#fafafa] p-4">
                <span className="type-caption font-medium text-[#121212]">{t('evidence')}</span>
                <div className="mt-3 flex flex-col gap-2">
                  {REPORT_EVIDENCE.map((w, i) => (
                    <i key={i} className={`h-1.5 rounded-full ${i === 1 ? 'bg-[#9a9a9a]/60' : 'bg-[#ebebeb]'}`} style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
              <div>
                <span className="type-caption font-medium text-[#121212]">{t('why')}</span>
                <div className="mt-3 flex flex-col gap-2">
                  {REPORT_WHY.map((w, i) => (
                    <i key={i} className="h-1.5 rounded-full bg-[#ebebeb]" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </Sequence>
          </div>
        </Window>
      </Illustration>
    </div>
  );
}

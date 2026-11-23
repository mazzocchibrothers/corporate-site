'use client';

import { useTranslations } from 'next-intl';
import { UserRound } from 'lucide-react';
import { Illustration, Legend, LevelBar, StatusPill, Window } from '@/components/assess/visuals/frame';
import { Sequence, useInView } from '@/components/assess/visuals/motion';
import { TEAM, TEAM_NEEDED, TEAM_SKILLS } from '@/components/assess/visuals/data';

// Hero: a store manager's team, each person's role fit and level on every skill
// against the level the role needs. A table from md up; one card per person
// below that, so the phone never scrolls sideways.

// One grid for the whole table; the header, the rows and the <Sequence> between
// them are subgrids of it, so every row shares the same column widths. The
// role-fit column is as wide as its longest word ("Compatibilità" in Italian),
// and only a shared grid can size it once for every row.
const COLS = 'md:grid-cols-[minmax(120px,1.3fr)_minmax(64px,min-content)_repeat(4,minmax(0,1fr))_minmax(140px,1.2fr)]';
const ROW = 'col-span-full grid grid-cols-subgrid';

export function TeamReadiness() {
  const t = useTranslations('product.skillvue-assess.visuals.team');
  const [ref, seen] = useInView<HTMLDivElement>();

  const status = (develop: (typeof TEAM)[number]['develop']) =>
    develop === null ? (
      <StatusPill tone="ok">{t('ready')}</StatusPill>
    ) : (
      <StatusPill tone="gap">{t('develop', { skill: t(`skills.${develop}`) })}</StatusPill>
    );

  const person = (id: (typeof TEAM)[number]['id']) => (
    <span className="flex min-w-0 items-center gap-2.5 type-body-sm font-medium text-[#121212]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ebebeb] text-[#9a9a9a]">
        <UserRound className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="truncate">{t(`people.${id}`)}</span>
    </span>
  );

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Window title={t('window')} fade={88}>
          <div className="flex flex-col gap-3 border-b border-black/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 type-body-sm">
              <span className="text-[#707070]">{t('roleLabel')}</span>
              <span className="font-medium text-[#121212]">{t('role')}</span>
            </span>
            <Legend measured={t('legend.measured')} needed={t('legend.needed')} gap={t('legend.gap')} />
          </div>

          {/* md and up: the table */}
          <div className={`hidden md:grid ${COLS}`}>
            <div className={`${ROW} border-b border-black/[0.06] type-caption text-[#707070]`}>
              <span className="px-4 py-3">{t('columns.participant')}</span>
              <span className="px-2 py-3">{t('columns.roleFit')}</span>
              {TEAM_SKILLS.map((s) => (
                <span key={s} className="border-l border-black/[0.06] px-3 py-2.5">
                  <span className="block font-medium text-[#121212]">{t(`skills.${s}`)}</span>
                  <span className="block">{t('needed', { level: TEAM_NEEDED[s] })}</span>
                </span>
              ))}
              <span className="border-l border-black/[0.06] px-3 py-3">{t('columns.status')}</span>
            </div>
            <Sequence run={seen} step={140} offset={200} className={ROW}>
              {TEAM.map((p) => (
                <div key={p.id} className={`${ROW} items-center border-b border-black/[0.06] last:border-b-0`}>
                  <span className="px-4 py-3">{person(p.id)}</span>
                  <span className="px-2 py-3 type-body-sm text-[#4B4B4B]">{t('fit', { fit: p.fit })}</span>
                  {TEAM_SKILLS.map((s) => (
                    <span key={s} className="flex items-center gap-2 border-l border-black/[0.06] px-3 py-3">
                      <LevelBar level={p.levels[s]} needed={TEAM_NEEDED[s]} size="sm" />
                      <span className="type-caption text-[#4B4B4B]">{t('score', { level: p.levels[s] })}</span>
                    </span>
                  ))}
                  <span className="border-l border-black/[0.06] px-3 py-3">{status(p.develop)}</span>
                </div>
              ))}
            </Sequence>
          </div>

          {/* Below md: a card per person */}
          <Sequence run={seen} step={140} className="flex flex-col gap-2 p-3 md:hidden">
            {TEAM.map((p) => (
              <div key={p.id} className="rounded-xl border border-black/[0.06] p-3">
                <div className="flex items-center justify-between gap-2">
                  {person(p.id)}
                  <span className="type-caption text-[#4B4B4B]">{t('columns.roleFit')} {t('fit', { fit: p.fit })}</span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {TEAM_SKILLS.map((s) => (
                    <div key={s} className="grid grid-cols-[96px_1fr_28px] items-center gap-2">
                      <span className="truncate type-caption text-[#4B4B4B]">{t(`skills.${s}`)}</span>
                      <LevelBar level={p.levels[s]} needed={TEAM_NEEDED[s]} size="sm" />
                      <span className="text-right type-caption text-[#4B4B4B]">{t('score', { level: p.levels[s] })}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3">{status(p.develop)}</div>
              </div>
            ))}
          </Sequence>
        </Window>
      </Illustration>
    </div>
  );
}

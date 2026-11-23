'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button, SECONDARY_ON_LIGHT } from '@/components/ui/button';
import { href } from '@/i18n/routes';

// Route ids. The path comes from the registry, so an Italian slug declared
// there reaches this block too.
const solutions = [
  { key: 'talentAcquisition', id: 'solutions/talent-acquisition' },
  { key: 'performanceManagement', id: 'solutions/performance-management' },
  { key: 'learningDevelopment', id: 'solutions/learning-development' },
  { key: 'internalMobility', id: 'solutions/internal-mobility' },
  { key: 'projectResourcing', id: 'solutions/project-resourcing' },
];

// `currentId` is a route id, not a path. It used to be a path compared against
// href(id, lang), which agreed in English and never in Italian — href returns
// /it/solutions/… there, so the page's own solution stayed in its own "explore
// the others" list on all five Italian pages. An id has one spelling.
export default function SolutionCrossLinks({ currentId }) {
  const lang = useLocale();
  const t = useTranslations('shared');
  const router = useRouter();
  const otherSolutions = solutions.filter((s) => s.id !== currentId);

  const handleNav = (path) => { router.push(path); window.scrollTo(0, 0); };

  return (
    <section className="section-light relative pt-20 pb-16 lg:pt-24 lg:pb-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal y={20} duration={0.6}>
          {/* Mobile: vertical stack for Platform + Science */}
          <div className="md:hidden flex flex-col gap-3 mb-6">
            <button onClick={() => handleNav('/product')} className="group text-left rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] active:bg-[#f1f5f9] p-5 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div>{t.rich('solutionCrossLinks.cta', {
                  span: (chunks) => <span className="type-eyebrow text-[#4B4DF7] block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="type-body-bold text-[#121212]">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-[#121212]/40 shrink-0" />
              </div>
            </button>
            <button onClick={() => handleNav('/science')} className="group text-left rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] active:bg-[#f1f5f9] p-5 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div>{t.rich('solutionCrossLinks.cta2', {
                  span: (chunks) => <span className="type-eyebrow text-[#4B4DF7] block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="type-body-bold text-[#121212]">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-[#121212]/40 shrink-0" />
              </div>
            </button>
          </div>

          {/* Desktop: Platform + Science links */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 mb-8">
            <button onClick={() => handleNav('/product')} className="group text-left rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] focus-visible:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] p-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>{t.rich('solutionCrossLinks.cta3', {
                  span: (chunks) => <span className="type-eyebrow text-[#4B4DF7] block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="type-body-bold text-[#121212]">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-[#121212]/40 group-hover:text-[#4B4DF7] group-focus-visible:text-[#4B4DF7] group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-all duration-300" />
              </div>
            </button>
            <button onClick={() => handleNav('/science')} className="group text-left rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] focus-visible:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] p-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>{t.rich('solutionCrossLinks.cta4', {
                  span: (chunks) => <span className="type-eyebrow text-[#4B4DF7] block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="type-body-bold text-[#121212]">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-[#121212]/40 group-hover:text-[#4B4DF7] group-focus-visible:text-[#4B4DF7] group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>

          {/* Other solutions */}
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-6">
            <span className="type-eyebrow text-[#4B4DF7] block mb-4">{t('solutionCrossLinks.text')}</span>
            <div className="flex flex-wrap gap-2">
              {otherSolutions.map(s => (
                <Button key={s.key} variant="secondary" mode="light" className={SECONDARY_ON_LIGHT} icon={null} onClick={() => handleNav(href(s.id, lang))}>
                  {t(`solutionCrossLinks.solutions.${s.key}`)}
                </Button>
              ))}
              <Button variant="secondary" mode="light" className={SECONDARY_ON_LIGHT} icon={null} onClick={() => { router.push('/'); window.scrollTo(0, 0); }}>{t('solutionCrossLinks.cta5')}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

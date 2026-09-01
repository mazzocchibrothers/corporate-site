// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
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

export default function SolutionCrossLinks({ currentPath }) {
  const { lang } = useLanguage();
  const t = useTranslations('shared');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();
  const otherSolutions = solutions.filter(s => href(s.id, lang) !== currentPath);

  const handleNav = (path) => { router.push(path); window.scrollTo(0, 0); };

  return (
    <section className="relative pt-20 pb-16 lg:pt-24 lg:pb-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          {/* Mobile: vertical stack for Platform + Science */}
          <div className="md:hidden flex flex-col gap-3 mb-6">
            <button onClick={() => handleNav('/product-overview')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-5 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div>{t.rich('solutionCrossLinks.cta', {
                  span: (chunks) => <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.12em] uppercase block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="text-[15px] font-semibold text-white/85 leading-snug">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-white/30 shrink-0" />
              </div>
            </button>
            <button onClick={() => handleNav('/science')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-5 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div>{t.rich('solutionCrossLinks.cta2', {
                  span: (chunks) => <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.12em] uppercase block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="text-[15px] font-semibold text-white/85 leading-snug">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-white/30 shrink-0" />
              </div>
            </button>
          </div>

          {/* Desktop: Platform + Science links */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 mb-8">
            <button onClick={() => handleNav('/product-overview')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] p-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>{t.rich('solutionCrossLinks.cta3', {
                  span: (chunks) => <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="text-[16px] font-semibold text-white/85">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
            <button onClick={() => handleNav('/science')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] p-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>{t.rich('solutionCrossLinks.cta4', {
                  span: (chunks) => <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase block mb-1">{chunks}</span>,
                  span2: (chunks) => <span className="text-[16px] font-semibold text-white/85">{chunks}</span>,
                })}</div>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>

          {/* Other solutions */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase block mb-4">{t('solutionCrossLinks.text')}</span>
            <div className="flex flex-wrap gap-2">
              {otherSolutions.map(s => (
                <Button key={s.key} variant="secondary" mode="dark" icon={null} onClick={() => handleNav(href(s.id, lang))}>
                  {t(`solutionCrossLinks.solutions.${s.key}`)}
                </Button>
              ))}
              <Button variant="secondary" mode="dark" icon={null} onClick={() => { router.push('/'); window.scrollTo(0, 0); }}>{t('solutionCrossLinks.cta5')}</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

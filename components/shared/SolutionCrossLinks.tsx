// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const solutions = [
  { name: 'Talent Acquisition', path: '/solutions/talent-acquisition' },
  { name: 'Performance Management', path: '/solutions/performance-management' },
  { name: 'Learning & Development', path: '/solutions/learning-development' },
  { name: 'Internal Mobility', path: '/solutions/internal-mobility' },
  { name: 'Project Resourcing', path: '/solutions/project-resourcing' },
];

export default function SolutionCrossLinks({ currentPath }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();
  const otherSolutions = solutions.filter(s => s.path !== currentPath);

  const handleNav = (path) => { router.push(path); window.scrollTo(0, 0); };

  return (
    <section className="relative pt-20 pb-16 lg:pt-24 lg:pb-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          {/* Mobile: vertical stack for Platform + Science */}
          <div className="md:hidden flex flex-col gap-3 mb-6">
            <button onClick={() => handleNav('/product-overview')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-5 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#9B9DFB]/60 tracking-[0.12em] uppercase block mb-1">{t('Platform')}</span>
                  <span className="text-[15px] font-semibold text-white/85 leading-snug">{t('See how the full product works')}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 shrink-0" />
              </div>
            </button>
            <button onClick={() => handleNav('/science')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-5 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#9B9DFB]/60 tracking-[0.12em] uppercase block mb-1">{t('Science')}</span>
                  <span className="text-[15px] font-semibold text-white/85 leading-snug">{t('Why you can trust the data')}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 shrink-0" />
              </div>
            </button>
          </div>

          {/* Desktop: Platform + Science links */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 mb-8">
            <button onClick={() => handleNav('/product-overview')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] p-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#9B9DFB]/50 tracking-[0.1em] uppercase block mb-1">{t('Platform')}</span>
                  <span className="text-[16px] font-semibold text-white/85">{t('See how the full product works')}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
            <button onClick={() => handleNav('/science')} className="group text-left rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] p-6 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#9B9DFB]/50 tracking-[0.1em] uppercase block mb-1">{t('Science')}</span>
                  <span className="text-[16px] font-semibold text-white/85">{t('Why you can trust the data')}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>

          {/* Other solutions */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-4">{t('Explore other solutions')}</span>
            <div className="flex flex-wrap gap-2">
              {otherSolutions.map(s => (
                <button key={s.path} onClick={() => handleNav(s.path)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-white/[0.65] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-400">
                  {t(s.name)}
                </button>
              ))}
              <button onClick={() => { router.push('/'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-white/40 border border-white/[0.06] hover:border-white/[0.15] hover:text-white/[0.65] transition-all duration-400">
                {t('Customer Stories')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const solutions = [
  { name: 'Talent Acquisition', path: '/solutions/talent-acquisition', desc: 'Predict who will perform' },
  { name: 'Performance Management', path: '/solutions/performance-management', desc: 'Objective reviews' },
  { name: 'Learning & Development', path: '/solutions/learning-development', desc: 'Close real skill gaps' },
  { name: 'Internal Mobility', path: '/solutions/internal-mobility', desc: 'Unlock hidden talent' },
  { name: 'Project Resourcing', path: '/solutions/project-resourcing', desc: 'Staff by capability' },
];

export default function ProductCrossLinks() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  const handleNav = (path) => { router.push(path); window.scrollTo(0, 0); };

  return (
    <section className="relative pt-8 pb-2 lg:pt-10 lg:pb-2" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h3 className="text-[16px] md:text-[20px] font-bold text-white/90 mb-5 md:mb-8">{t('Explore by use case')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {solutions.map((s, i) => (
              <motion.button
                key={s.path}
                onClick={() => handleNav(s.path)}
                className="group text-left rounded-lg md:rounded-xl border border-white/[0.08] hover:border-white/[0.16] bg-white/[0.04] hover:bg-white/[0.07] p-4 md:p-6 transition-all duration-500"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[15px] md:text-[15px] font-semibold text-white/85 block mb-0.5 md:mb-1 leading-tight">{t(s.name)}</span>
                    <span className="text-[12px] md:text-[13px] text-white/40">{t(s.desc)}</span>
                  </div>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-white/20 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-300 shrink-0 hidden md:block" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const stages = [
  { num: '01', title: 'Pre-screening', subtitle: 'Top of funnel', desc: 'Short assessments on suitability and killer skills via web app or WhatsApp. Reduce manual effort, accelerate pre-selection, filter for objective eligibility before deeper assessment.', color: '#9B9DFB' },
  { num: '02', title: 'Screening', subtitle: 'Mid funnel', desc: 'Assessments on soft skills, hard skills, potential, and traits. Standardized evaluation that removes bias and produces comparable, predictive shortlists.', color: '#7577F8' },
  { num: '03', title: 'In-depth', subtitle: 'Late funnel', desc: 'Deep assessments on potential, traits, and skills for professional+ roles. Cross-job insights, detailed candidate profiles, and in-person interview support packages.', color: '#4B4DF7' },
];

export default function TAHowSolves() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ta-how" data-testid="ta-how" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('Skillvue adds value at every step of the')}{' '}
            <span className="font-bold gradient-text-on-light">{t('hiring funnel')}</span>
          </h2>
        </motion.div>

        {/* Horizontal funnel tabs */}
        <div className="grid lg:grid-cols-3 gap-3 mb-8">
          {stages.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setActive(i)}
              data-testid={`ta-stage-${s.num}`}
              className={`text-left p-6 rounded-xl transition-all duration-500 border ${
                i === active
                  ? 'bg-[#0E0E0E] border-[#0E0E0E] shadow-lg shadow-[#0E0E0E]/20'
                  : 'bg-white/40 border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[12px] font-bold tracking-[0.1em] ${i === active ? 'text-white/50' : 'text-[#4B4DF7]/40'}`}>{s.num}</span>
                <div className={`h-px flex-1 ${i === active ? 'bg-white/10' : 'bg-[#4B4DF7]/[0.08]'}`} />
              </div>
              <h3 className={`text-[18px] font-bold mb-1 ${i === active ? 'text-white' : 'text-[#121212]/70'}`}>{t(s.title)}</h3>
              <span className={`text-[13px] ${i === active ? 'text-white/50' : 'text-[#121212]/35'}`}>{t(s.subtitle)}</span>
            </button>
          ))}
        </div>

        {/* Active stage detail */}
        <motion.div
          key={active}
          className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-10 lg:p-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-start gap-6">
            <div className="w-1 h-20 rounded-full shrink-0" style={{ background: stages[active].color }} />
            <div>
              <h3 className="text-[clamp(1.3rem,2vw,1.8rem)] font-bold text-[#121212] mb-4">{t(stages[active].title)}: {t(stages[active].subtitle)}</h3>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] max-w-3xl">{t(stages[active].desc)}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

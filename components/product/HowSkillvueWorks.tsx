'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  {
    id: 'informationGathering',
    num: '01',
  },
  {
    id: 'jobsPeopleSkills',
    num: '02',
  },
  {
    id: 'verificationGeneration',
    num: '03',
  },
  {
    id: 'verificationDelivery',
    num: '04',
  },
  {
    id: 'evaluationScoring',
    num: '05',
  },
  {
    id: 'reportingInsights',
    num: '06',
  },
];

export default function HowSkillvueWorks() {
  const t = useTranslations('product-overview');
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-skillvue-works" data-testid="how-skillvue-works" className="relative py-16 md:py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 max-w-4xl mb-4 md:mb-6">{t.rich('howSkillvueWorks.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
          <p className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-2xl">{t('howSkillvueWorks.body')}</p>
        </motion.div>

        {/* Timeline — grid 3x2 on mobile, inline on desktop */}
        <div className="grid grid-cols-3 gap-2 mb-8 md:flex md:items-center md:gap-2 md:mb-12 md:overflow-x-auto md:pb-2">
          {steps.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActive(i)}
              data-testid={`timeline-step-${step.num}`}
              className={`px-4 py-2.5 md:px-5 md:py-3 md:shrink-0 rounded-full text-[12px] md:text-[13px] font-medium transition-all duration-400 ${
                i === active
                  ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                  : 'text-white/40 hover:text-white/70 border border-transparent'
              }`}
            >
              {step.num}
            </button>
          ))}
        </div>

        {/* Active step card */}
        <motion.div
          key={active}
          className="rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 md:p-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid lg:grid-cols-2 gap-5 md:gap-10">
            <div>
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-2 md:mb-4 block">{t('howSkillvueWorks.text')} {steps[active].num}</span>
              <h3 className="text-[18px] md:text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-white/90 mb-3 md:mb-5 leading-[1.2]">{t(`howSkillvueWorks.steps.${steps[active].id}.title`)}</h3>
              <p className="text-[14px] md:text-[16px] text-white/[0.65] leading-[1.6] md:leading-[1.75]">{t(`howSkillvueWorks.steps.${steps[active].id}.what`)}</p>
            </div>
            <div>
              <div className="rounded-lg md:rounded-xl bg-white/[0.04] border border-white/[0.06] p-4 md:p-6 w-full">
                <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-2 md:mb-3 block">{t('howSkillvueWorks.text2')}</span>
                <p className="text-[13px] md:text-[15px] text-white/[0.65] leading-[1.5] md:leading-[1.7]">{t(`howSkillvueWorks.steps.${steps[active].id}.capability`)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nav arrows */}
        <div className="flex items-center justify-between mt-5 md:mt-8">
          <span className="text-[12px] md:text-[12px] font-medium text-white/25">
            {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive((p) => (p - 1 + steps.length) % steps.length)}
              aria-label="Previous step"
              className="group flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % steps.length)}
              aria-label="Next step"
              className="group flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full border border-white/15 text-white/60 hover:text-white/90 hover:border-white/30 transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

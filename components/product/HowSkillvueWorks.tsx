import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const steps = [
  { num: '01', title: 'Information Gathering', what: 'We learn your organization: competency frameworks, HR processes, systems, documentation.', capability: 'Context, process, and data ingestion' },
  { num: '02', title: 'Jobs-People-Skills Mapping', what: 'We digest your organizational landscape into a dynamic skill taxonomy.', capability: 'Skill taxonomy generation, talent demand-supply mapping, market & AI impact view' },
  { num: '03', title: 'Assessment Generation', what: 'We create assessments skill by skill. deeply contextualized to your roles and framework.', capability: 'AI-generated items, expert validation, continuous adaptation' },
  { num: '04', title: 'Assessment Delivery', what: 'We meet people where they are, through the channels where adoption is highest.', capability: 'Web apps, WhatsApp, MS Teams, Slack. audio, video, written, MCQs' },
  { num: '05', title: 'Evaluation & Scoring', what: 'AI agents recommend scores rooted in science. Humans keep control over the final decision.', capability: 'Scoring explainability, human-in-the-loop review' },
  { num: '06', title: 'Reporting & Insights', what: 'Ready-to-use analytics for immediate consumption; integrations with core HR for full potential.', capability: 'Skillvue reporting platform + native integrations (ATS, LMS, HRIS, PMS)' },
];

export default function HowSkillvueWorks() {
  const { t } = useLanguage();
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
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 max-w-4xl mb-4 md:mb-6">
            {t('From your context to actionable intelligence')}{' '}
            <span className="font-bold gradient-text">{t('in six steps')}</span>
          </h2>
          <p className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-2xl">
            {t("Skillvue doesn't ask you to change how you work. We start by learning your organization and deliver insights where your teams already operate.")}
          </p>
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
          className="rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 md:p-10 lg:p-14"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid lg:grid-cols-2 gap-5 md:gap-10">
            <div>
              <span className="text-[10px] md:text-[12px] font-semibold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase mb-2 md:mb-4 block">{t('STEP')} {steps[active].num}</span>
              <h3 className="text-[18px] md:text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-white/90 mb-3 md:mb-5 leading-[1.2]">{t(steps[active].title)}</h3>
              <p className="text-[13px] md:text-[16px] text-white/[0.65] leading-[1.6] md:leading-[1.75]">{t(steps[active].what)}</p>
            </div>
            <div>
              <div className="rounded-lg md:rounded-xl bg-white/[0.04] border border-white/[0.06] p-4 md:p-6 w-full">
                <span className="text-[9px] md:text-[11px] font-semibold text-white/30 tracking-[0.1em] uppercase mb-2 md:mb-3 block">{t('KEY CAPABILITY')}</span>
                <p className="text-[12px] md:text-[15px] text-white/[0.65] leading-[1.5] md:leading-[1.7]">{t(steps[active].capability)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nav arrows */}
        <div className="flex items-center justify-between mt-5 md:mt-8">
          <span className="text-[11px] md:text-[12px] font-medium text-white/25">
            {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive((p) => (p - 1 + steps.length) % steps.length)}
              className="group flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all duration-400"
            >
              <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % steps.length)}
              className="group flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full border border-white/15 text-white/60 hover:text-white/90 hover:border-white/30 transition-all duration-400"
            >
              <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

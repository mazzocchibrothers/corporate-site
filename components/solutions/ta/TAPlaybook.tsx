// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const rows = [
  {
    role: 'Senior / leadership',
    steps: [
      { label: 'HR', active: true },
      { label: 'HR + senior', active: true },
      { label: 'Senior', active: true },
      { label: 'C-level', active: true },
    ],
    barWidth: '75%',
    skillvue: 'Attitudes + Soft + Potential',
  },
  {
    role: 'Managers',
    steps: [
      { label: 'HR', active: true },
      { label: 'HR + manager', active: true },
      { label: 'Manager', active: true },
      { label: 'Senior', active: true },
    ],
    barWidth: '70%',
    skillvue: 'Attitude + Soft + Potential + Hard',
  },
  {
    role: 'Employees',
    steps: [
      { label: 'HR', active: true },
      { label: 'HR + manager', active: true },
      { label: 'Manager', active: true },
      { label: '', active: false },
    ],
    barWidth: '90%',
    skillvue: 'Suitability + Attitudes + Soft + Potential + Hard',
  },
  {
    role: 'Field operators',
    steps: [
      { label: 'HR', active: true },
      { label: 'Manager', active: true },
      { label: '', active: false },
      { label: '', active: false },
    ],
    barWidth: '50%',
    skillvue: 'Suitability + Soft + Hard',
  },
];

export default function RecruitmentPlaybook() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-breathe relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-[#1A1A2E] tracking-[-0.02em] mb-3">
            {t('Skillvue is a partner for the recruitment journey')}
          </h2>
          <p className="text-[16px] text-[#1A1A2E]/[0.4]">{t('Skillvue playbook recruitment process')}</p>
        </motion.div>

        {/* Step headers */}
        <motion.div
          className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-0 mb-2"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div />
          <div className="grid grid-cols-4 gap-2">
            {['Step 1', 'Step 2', 'Step 3', 'Step N'].map((step, i) => (
              <div key={step} className="py-3 rounded-xl text-center text-[14px] font-semibold text-white" style={{ backgroundColor: '#5E60F2', boxShadow: '0 2px 12px rgba(94,96,242,0.25)' }}>
                {t(step)}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data rows */}
        <div className="space-y-0">
          {rows.map((row, ri) => (
            <motion.div
              key={row.role}
              className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-0 border-b border-[#1A1A2E]/[0.05] last:border-b-0"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + ri * 0.1 }}
            >
              {/* Role label */}
              <div className="flex items-center pr-6 py-8">
                <h3 className="text-[18px] font-bold text-[#1A1A2E] leading-tight">{t(row.role)}</h3>
              </div>

              {/* Steps + bar + Skillvue */}
              <div className="py-8">
                {/* People icons row */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {row.steps.map((step, si) => (
                    <div key={si} className="flex flex-col items-center gap-1.5">
                      {step.active ? (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="8" r="4" fill="#5E60F2" fillOpacity="0.35" />
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#5E60F2" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          <span className="text-[12px] text-[#1A1A2E]/50 text-center leading-tight">{t(step.label)}</span>
                        </>
                      ) : <div className="h-10" />}
                    </div>
                  ))}
                </div>

                {/* Competency bar */}
                <div className="mb-3" style={{ width: row.barWidth }}>
                  <div className="h-10 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #DDDCFF 0%, #C8C6FF 50%, #B8B5FF 100%)', border: '1px solid rgba(94,96,242,0.15)' }}>
                    <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)' }} />
                  </div>
                </div>

                {/* Skillvue assessment pill */}
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ backgroundColor: '#F0EFFF', border: '1px solid rgba(94,96,242,0.1)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #FF5F24, #5E60F2)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-[#1A1A2E]/60">{t(row.skillvue)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

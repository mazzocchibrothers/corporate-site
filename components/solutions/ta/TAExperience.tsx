// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const candidateItems = [
  '5-30 minutes depending on funnel stage',
  'Audio, video, or written responses',
  'Available via web app and WhatsApp',
  'Branded, multilingual, mobile-first',
];

const hrItems = [
  'Hiring process docs generated automatically',
  'Suitability filtering, ranking, benchmarking with full explainability',
  'Scoring with evidence: answer, justification, behavioral anchor',
  '100+ ATS integrations \u2014 data flows where you already work',
];

export default function TAExperience() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ta-experience" data-testid="ta-experience" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        {/* Full-width split layout */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/[0.08]">
          {/* Candidate side */}
          <motion.div
            className="relative p-10 lg:p-14 bg-white/[0.04] border-b lg:border-b-0 lg:border-r border-white/[0.06]"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                <User className="h-4 w-4 text-[#9B9DFB]/70" strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-bold text-white/90">{t('Candidate Experience')}</h3>
            </div>
            <p className="text-[15px] text-white/[0.65] font-medium mb-8">{t('Fast, frictionless, and designed to meet people where they are.')}</p>
            <div className="space-y-4">
              {candidateItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B9DFB] mt-2.5 shrink-0" />
                  <span className="text-[15px] text-white/[0.65] leading-[1.7]">{t(item)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HR side */}
          <motion.div
            className="relative p-10 lg:p-14 bg-white/[0.02]"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-[#9B9DFB]/70" strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-bold text-white/90">{t('HR Experience')}</h3>
            </div>
            <p className="text-[15px] text-white/[0.65] font-medium mb-8">{t('From automation to insight.')}</p>
            <div className="space-y-4">
              {hrItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9B9DFB] mt-2.5 shrink-0" />
                  <span className="text-[15px] text-white/[0.65] leading-[1.7]">{t(item)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

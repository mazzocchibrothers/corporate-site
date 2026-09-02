// @ts-nocheck
'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Zap, BarChart3, Plug, FileText, Calendar, MessageSquare, Users, Filter, Trophy, Brain, Search, ArrowDown } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const stages = [
  {
    id: 'pre-screening',
    number: '01',
    automation: {
      keyPath: 'taFunnel.stages.pre-screening.automation',
      icon: Zap,
      items: [
        { icon: FileText, id: 'hiringProcessDocs', detail: true },
        { icon: Calendar, id: 'interviewScheduling' },
        { icon: MessageSquare, id: 'candidatesFeedback' },
        { icon: Users, id: 'lineManagerFeedback' },
      ],
    },
    reporting: {
      keyPath: 'taFunnel.stages.pre-screening.reporting',
      icon: BarChart3,
      items: [
        { icon: Filter, id: 'suitabilityFiltering' },
        { icon: Trophy, id: 'rankingBenchmarking' },
        { icon: Brain, id: 'scoringExplained', detail: true },
      ],
    },
    integration: {
      keyPath: 'taFunnel.stages.pre-screening.integration',
      icon: Plug,
      logos: ['oracle', 'sap-successfactors', 'workday', 'sage', 'bamboohr', 'greenhouse'],
    },
  },
  {
    id: 'screening',
    number: '02',
    automation: {
      keyPath: 'taFunnel.stages.screening.automation',
      icon: Zap,
      items: [
        { icon: Brain, id: 'aiPoweredSkill', detail: true },
        { icon: Calendar, id: 'automatedScheduling' },
        { icon: MessageSquare, id: 'realTimeCandidate' },
      ],
    },
    reporting: {
      keyPath: 'taFunnel.stages.screening.reporting',
      icon: BarChart3,
      items: [
        { icon: Filter, id: 'competencyBasedFiltering' },
        { icon: Trophy, id: 'rankingBenchmarking' },
        { icon: Brain, id: 'scoringExplained', detail: true },
      ],
    },
    integration: {
      keyPath: 'taFunnel.stages.screening.integration',
      icon: Plug,
      logos: ['oracle', 'sap-successfactors', 'workday', 'sage', 'bamboohr', 'greenhouse'],
    },
  },
  {
    id: 'in-depth',
    number: '03',
    automation: {
      keyPath: 'taFunnel.stages.in-depth.automation',
      icon: Zap,
      items: [
        { icon: Calendar, id: 'interviewScheduling' },
        { icon: Search, id: 'personInterviewsSupport', detail: true },
        { icon: MessageSquare, id: 'depthCandidateFeedback' },
      ],
    },
    reporting: {
      keyPath: 'taFunnel.stages.in-depth.reporting',
      icon: BarChart3,
      items: [
        { icon: Brain, id: 'crossJobsInsights' },
        { icon: Trophy, id: 'rankingBenchmarking' },
        { icon: Brain, id: 'scoringExplained', detail: true },
      ],
    },
    integration: {
      keyPath: 'taFunnel.stages.in-depth.integration',
      icon: Plug,
      logos: ['oracle', 'sap-successfactors', 'workday', 'sage', 'bamboohr', 'greenhouse'],
    },
  },
];

function ColumnCard({ data, delay, t }) {
  const Icon = data.icon;
  return (
    <motion.div
      className="rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-4 md:p-8 hover:border-[#4B4DF7]/[0.15] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-3 mb-6">
        <IconTile icon={Icon} mode="light" />
        <h4 className="text-[15px] md:text-[14px] font-semibold text-[#1A1A2E]/70 tracking-wide">{t(`${data.keyPath}.title`)}</h4>
      </div>

      {data.items ? (
        <div className="space-y-4">
          {data.items.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <ItemIcon className="h-5 w-5 md:h-4 md:w-4 text-[#9B9DFB]/40 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[14px] text-[#1A1A2E]/80 font-medium">{t(`${data.keyPath}.items.${item.id}.text`)}</span>
                  {item.detail && (
                    <span className="text-[13px] md:text-[12px] text-[#7A7A7A] ml-1.5">({t(`${data.keyPath}.items.${item.id}.detail`)})</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-[14px] md:text-[14px] text-[#1A1A2E]/60 font-semibold mb-5">{t(`${data.keyPath}.text`)}</p>
          <div className="grid grid-cols-3 gap-3">
            {data.logos.map((logo) => (
              <div key={logo} className="flex items-center justify-center h-8">
                <img
                  src={`/logos/integrations/${logo}_white.png`}
                  alt={logo}
                  className="h-5 w-auto max-w-[80px] object-contain"
                  style={{ filter: 'grayscale(1) brightness(0.3)', opacity: 0.5 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function TAFunnel() {
  const t = useTranslations('solutions.talent-acquisition');
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const stage = stages[active];

  return (
    <section id="ta-funnel" data-testid="ta-funnel" className="section-breathe relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Title */}
        <motion.div
          className="mb-8 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl">{t.rich('taFunnel.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </motion.div>

        {/* Stage selector — compact pills on mobile, full cards on desktop */}
        <motion.div
          className="grid grid-cols-3 gap-2 md:flex md:items-stretch md:gap-2 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              data-testid={`funnel-${s.id}`}
              className={`md:flex-1 relative rounded-xl px-3 py-3 md:px-6 md:py-5 text-left transition-all duration-500 border ${
                i === active
                  ? 'bg-[#1A1A2E] border-[#1A1A2E]'
                  : 'bg-white border-[#1A1A2E]/[0.06] hover:bg-[#1A1A2E]/[0.04] hover:border-[#1A1A2E]/[0.12]'
              }`}
            >
              <span className={`text-[11px] font-bold tracking-[0.15em] uppercase block mb-0.5 md:mb-1 ${i === active ? 'text-[#9B9DFB]' : 'text-[#1A1A2E]/25'}`}>
                {t('taFunnel.cta')} {s.number}
              </span>
              <span className={`text-[13px] md:text-[18px] font-bold leading-tight ${i === active ? 'text-white' : 'text-[#7A7A7A]'}`}>
                {t(`taFunnel.stages.${s.id}.label`)}
              </span>
              {i === active && (
                <motion.div
                  className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDown className="h-4 w-4 text-[#9B9DFB]/50 mt-2" />
                </motion.div>
              )}
            </button>
          ))}
        </motion.div>

        {/* Content cards for active stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Mobile: vertical stack */}
            <div className="md:hidden flex flex-col gap-3">
              <ColumnCard data={stage.automation} delay={0} t={t} />
              <ColumnCard data={stage.reporting} delay={0.08} t={t} />
              <ColumnCard data={stage.integration} delay={0.16} t={t} />
            </div>

            {/* Desktop */}
            <div className="hidden md:grid lg:grid-cols-3 gap-5">
              <ColumnCard data={stage.automation} delay={0} t={t} />
              <ColumnCard data={stage.reporting} delay={0.08} t={t} />
              <ColumnCard data={stage.integration} delay={0.16} t={t} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

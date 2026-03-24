// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Zap, BarChart3, Plug, FileText, Calendar, MessageSquare, Users, Filter, Trophy, Brain, Search, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const stages = [
  {
    id: 'pre-screening',
    label: 'Pre-screening',
    number: '01',
    automation: {
      title: 'Process automation',
      icon: Zap,
      items: [
        { icon: FileText, text: 'Hiring process docs generation', detail: 'JDs, reports etc.' },
        { icon: Calendar, text: 'Interview scheduling' },
        { icon: MessageSquare, text: 'Candidates feedback' },
        { icon: Users, text: 'Line manager feedback' },
      ],
    },
    reporting: {
      title: 'Reporting & decision making',
      icon: BarChart3,
      items: [
        { icon: Filter, text: 'Suitability filtering' },
        { icon: Trophy, text: 'Ranking and benchmarking' },
        { icon: Brain, text: 'Scoring explained', detail: 'answer, justification, evidence' },
      ],
    },
    integration: {
      title: 'Core HR integration',
      icon: Plug,
      logos: ['oracle', 'sap-successfactors', 'workday', 'sage', 'bamboohr', 'greenhouse_onblack'],
      text: '100+ ATS integrations',
    },
  },
  {
    id: 'screening',
    label: 'Screening',
    number: '02',
    automation: {
      title: 'Process automation',
      icon: Zap,
      items: [
        { icon: Brain, text: 'AI-powered skill assessment', detail: 'Audio, video, written' },
        { icon: Calendar, text: 'Automated scheduling' },
        { icon: MessageSquare, text: 'Real-time candidate feedback' },
      ],
    },
    reporting: {
      title: 'Reporting & decision making',
      icon: BarChart3,
      items: [
        { icon: Filter, text: 'Competency-based filtering' },
        { icon: Trophy, text: 'Ranking and benchmarking' },
        { icon: Brain, text: 'Scoring explained', detail: 'answer, justification, evidence' },
      ],
    },
    integration: {
      title: 'Core HR integration',
      icon: Plug,
      logos: ['oracle', 'sap-successfactors', 'workday', 'sage', 'bamboohr', 'greenhouse_onblack'],
      text: '100+ ATS integrations',
    },
  },
  {
    id: 'in-depth',
    label: 'In-depth',
    number: '03',
    automation: {
      title: 'Process automation',
      icon: Zap,
      items: [
        { icon: Calendar, text: 'Interview scheduling' },
        { icon: Search, text: 'In-person interviews support', detail: 'Questions packages, benchmarks, drill-down' },
        { icon: MessageSquare, text: 'In-depth candidate feedback' },
      ],
    },
    reporting: {
      title: 'Reporting & decision making',
      icon: BarChart3,
      items: [
        { icon: Brain, text: 'Cross-jobs insights' },
        { icon: Trophy, text: 'Ranking and benchmarking' },
        { icon: Brain, text: 'Scoring explained', detail: 'answer, justification, evidence' },
      ],
    },
    integration: {
      title: 'Core HR integration',
      icon: Plug,
      logos: ['oracle', 'sap-successfactors', 'workday', 'sage', 'bamboohr', 'greenhouse_onblack'],
      text: '100+ ATS integrations',
    },
  },
];

function ColumnCard({ data, delay, t }) {
  const Icon = data.icon;
  return (
    <motion.div
      className="rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-8 hover:border-[#4B4DF7]/[0.15] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-[#4B4DF7]/[0.12] flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-[#9B9DFB]" />
        </div>
        <h4 className="text-[14px] font-bold text-[#1A1A2E]/70 tracking-wide">{t(data.title)}</h4>
      </div>

      {data.items ? (
        <div className="space-y-4">
          {data.items.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <ItemIcon className="h-4 w-4 text-[#4B4DF7]/40 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[14px] text-[#1A1A2E]/80 font-medium">{t(item.text)}</span>
                  {item.detail && (
                    <span className="text-[12px] text-[#1A1A2E]/35 ml-1.5">({t(item.detail)})</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-[14px] text-[#1A1A2E]/60 font-semibold mb-5">{t(data.text)}</p>
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
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const stage = stages[active];

  return (
    <section id="ta-funnel" data-testid="ta-funnel" className="section-breathe relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

        {/* Title */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl">
            {t('From automation to insight, what your team gets at')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('every stage of the funnel')}</span>
          </h2>
        </motion.div>

        {/* Stage selector — funnel visual */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              data-testid={`funnel-${s.id}`}
              className={`flex-1 relative rounded-xl px-6 py-5 text-left transition-all duration-500 border ${
                i === active
                  ? 'bg-[#1A1A2E] border-[#1A1A2E]'
                  : 'bg-white border-[#1A1A2E]/[0.06] hover:bg-[#1A1A2E]/[0.04] hover:border-[#1A1A2E]/[0.12]'
              }`}
            >
              <span className={`text-[11px] font-bold tracking-[0.15em] uppercase block mb-1 ${i === active ? 'text-[#9B9DFB]' : 'text-[#1A1A2E]/25'}`}>
                {t('Stage')} {s.number}
              </span>
              <span className={`text-[18px] font-bold ${i === active ? 'text-white' : 'text-[#1A1A2E]/50'}`}>
                {t(s.label)}
              </span>
              {i === active && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowDown className="h-4 w-4 text-[#4B4DF7]/50 mt-2" />
                </motion.div>
              )}
            </button>
          ))}
        </motion.div>

        {/* Content cards for active stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className="grid lg:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ColumnCard data={stage.automation} delay={0} t={t} />
            <ColumnCard data={stage.reporting} delay={0.08} t={t} />
            <ColumnCard data={stage.integration} delay={0.16} t={t} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

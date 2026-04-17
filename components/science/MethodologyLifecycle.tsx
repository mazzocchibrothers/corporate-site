// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Shield, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const steps = [
  { num: '01', title: 'Define constructs', desc: 'Identify what to measure, grounded in I-O psychology research and the client\'s competency model.' },
  { num: '02', title: 'Design assessment items', desc: 'AI generates deeply contextualized items; format, scale, and scoring model selected based on psychometric best practice.' },
  { num: '03', title: 'Expert validation', desc: 'Human-in-the-loop validation by subject-matter experts and psychometricians. Calibration against proprietary benchmark data.' },
  { num: '04', title: 'Pilot and refine', desc: 'Items tested with real participants, analyzed for reliability, discrimination, and fairness. Bias evaluation across demographics.' },
  { num: '05', title: 'Deploy at scale', desc: 'Assessments delivered via web, WhatsApp, Teams, Slack — in 50+ languages with consistent measurement quality.' },
  { num: '06', title: 'Score with explainability', desc: 'Every response scored with transparent evidence: answer, justification, and behavioral anchor. AI recommends; humans decide.' },
  { num: '07', title: 'Monitor and evolve', desc: 'Continuous item analysis, reliability tracking, and construct stability monitoring as populations and roles change over time.' },
];

const principles = [
  { icon: Sparkles, title: 'Better evidence', desc: 'AI unlocks richer, more direct evidence of skill through realistic scenarios, interactive tasks, and multiple response modalities that reflect how work is actually done.' },
  { icon: Shield, title: 'Rigor at scale', desc: 'We embed assessment science into the product so rigor scales with the system. Clear constructs, evidence-centered design, and governed scoring prevent AI from introducing noise.' },
  { icon: RefreshCw, title: 'Continuous evolution', desc: 'Because skills and roles evolve quickly, measurement must evolve with them. Continuous monitoring and scientist-led iteration keep signals accurate and defensible.' },
];

export default function MethodologyLifecycle() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="methodology" data-testid="methodology" className="relative py-20 lg:py-28" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">

        {/* Title */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 mb-6">
            {t('A rigorous, end-to-end assessment')}{' '}
            <span className="font-bold gradient-text">{t('lifecycle')}</span>
          </h2>
        </motion.div>

        {/* Steps interactive */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 mb-20">
          <div className="space-y-1">
            {steps.map((s, i) => (
              <button key={s.num} onClick={() => setActive(i)} data-testid={`lifecycle-${s.num}`} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-400 flex items-center gap-4 ${i === active ? 'bg-white/[0.06] border border-white/[0.1]' : 'hover:bg-white/[0.03] border border-transparent'}`}>
                <span className={`text-[12px] font-bold ${i === active ? 'text-[#9B9DFB]' : 'text-[#9B9DFB]/30'}`}>{s.num}</span>
                <span className={`text-[15px] font-medium ${i === active ? 'text-white/90' : 'text-white/40'}`}>{t(s.title)}</span>
              </button>
            ))}
          </div>

          <motion.div key={active} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-10 lg:p-14" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <span className="text-[12px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase mb-4 block">{t('Step')} {steps[active].num}</span>
            <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-white/90 mb-5">{t(steps[active].title)}</h3>
            <p className="text-[16px] text-white/[0.55] leading-[1.75]">{t(steps[active].desc)}</p>
          </motion.div>
        </div>

        {/* 3 principle cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}>
                <Icon className="h-6 w-6 text-[#9B9DFB]/50 mb-5" strokeWidth={1.5} />
                <h3 className="text-[20px] font-bold text-white/90 mb-4">{t(p.title)}</h3>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t(p.desc)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

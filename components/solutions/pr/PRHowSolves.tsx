// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Radar, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  { icon: Users, title: 'Skills-matched staffing', desc: 'Assemble project teams based on verified skill data. Match people to assignments based on what they can actually do, not who raised their hand.' },
  { icon: Radar, title: 'Real-time capability visibility', desc: 'A live skills inventory across your entire workforce. Search by skill, proficiency level, and availability. Find the right person in minutes, not days.' },
  { icon: ShieldCheck, title: 'Delivery risk reduction', desc: 'Before a project kicks off, see whether the team has the skills to deliver. Identify gaps early, upskill or reassign before they become expensive problems.' },
];

export default function PRHowSolves() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pr-how" data-testid="pr-how" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90">
            {t('How Skillvue transforms')}{' '}
            <span className="font-bold gradient-text">{t('project resourcing')}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
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

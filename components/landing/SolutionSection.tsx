import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, TrendingUp, Award, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    id: 'hire',
    icon: Target,
    label: 'Hire right',
    desc: 'AI-powered assessments predict on-the-job performance before you make an offer. Stop gambling on interviews.',
    stat: '85%+',
    statLabel: 'hiring success rate',
  },
  {
    id: 'develop',
    icon: TrendingUp,
    label: 'Develop the right people',
    desc: 'Identify high-potential talent before they disengage. Personalized development paths based on real competency data.',
    stat: '3x',
    statLabel: 'faster leadership pipeline',
  },
  {
    id: 'promote',
    icon: Award,
    label: 'Promote with confidence',
    desc: 'Replace gut-feel promotions with evidence-based decisions. Know who is truly ready for the next level.',
    stat: '90%',
    statLabel: 'promotion success rate',
  },
  {
    id: 'transform',
    icon: Shield,
    label: 'De-risk transformation',
    desc: 'Map the skill gaps that will derail your next transformation. Know exactly where to invest in reskilling.',
    stat: '6-9mo',
    statLabel: 'faster execution',
  },
];

export default function SolutionSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solutions" data-testid="solution-section" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 max-w-3xl">
            {t('Skillvue brings people processes')}<br />
            <span className="italic font-bold gradient-text-warm">{t('to life.')}</span>
          </h2>
          <p className="text-[18px] text-white/[0.65] leading-[1.7] mt-6 max-w-xl">
            {t('One platform for every talent decision. hiring, performance, development, mobility. Objective. Scalable. Defensible.')}
          </p>
        </motion.div>

        {/* 2x2 Card grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              data-testid={`solution-card-${pillar.id}`}
              className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm p-8 lg:p-10 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
            >
              {/* Subtle hover glow */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#4B4DF7]/[0.04] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative">
                {/* Icon */}
                {(() => { const Icon = pillar.icon; return <Icon className="h-6 w-6 text-[#9B9DFB]/50 mb-5" strokeWidth={1.5} />; })()}

                {/* Card label */}
                <h3
                  className="text-2xl font-semibold text-white/85 group-hover:text-white/95 transition-colors duration-500 mb-4"
                >
                  {t(pillar.label)}
                </h3>

                {/* Description */}
                <p className="text-[16px] text-white/[0.65] group-hover:text-white/[0.75] leading-[1.75] transition-colors duration-500 mb-8">
                  {t(pillar.desc)}
                </p>

                {/* Stat */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-white/90"
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {pillar.stat}
                  </span>
                  <span className="text-[13px] text-white/[0.65] font-medium tracking-wide">
                    {t(pillar.statLabel)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

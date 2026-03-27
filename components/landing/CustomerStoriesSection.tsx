import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const stories = [
  {
    company: 'Carrefour',
    industry: 'Large-Scale Retail',
    quote: 'Skills mapping was faster, more effective and fully data-driven.',
    author: 'Francesca',
    role: 'TA & EB Manager',
    path: '/customers/carrefour',
  },
  {
    company: "In's Mercato",
    industry: 'Large-Scale Retail',
    quote: 'Having a consistent skills assessment, from external hiring to internal growth, meant delivering concrete solutions to our real challenges.',
    author: 'Mirko',
    role: 'HR Director',
    path: '/customers/ins-mercato',
  },
  {
    company: 'Subdued',
    industry: 'Fashion Retail',
    quote: 'It not only improves the quality of my work, it makes us very attractive to candidates.',
    author: 'Valentina',
    role: 'HR Manager',
    path: '/customers/subdued',
  },
];

export default function CustomerStoriesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  return (
    <section id="customers" data-testid="customer-stories-section" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 mb-4">
            {t('Proof, not')} <span className="italic font-bold gradient-text">{t('promises.')}</span>
          </h2>
          <p className="text-[18px] text-white/[0.65] leading-[1.75] max-w-2xl">
            {t('Leading Global enterprises make talent decisions with confidence.')}
          </p>
        </motion.div>

        {/* 4 story cards. 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {stories.map((s, i) => (
            <motion.div
              key={s.company}
              data-testid={`story-${s.company.toLowerCase().replace(/\s+/g, '-')}`}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-12 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              onClick={() => { router.push(s.path); window.scrollTo(0, 0); }}
            >
              {/* Company + industry */}
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-[22px] font-bold text-white/90">{t(s.company)}</h3>
                <span className="text-[14px] text-white/40">·</span>
                <span className="text-[15px] text-white/40">{t(s.industry)}</span>
              </div>

              {/* Quote */}
              <p className="text-[17px] text-white/[0.65] italic leading-[1.7] mb-8">"{t(s.quote)}"</p>

              {/* Author */}
              <div>
                <span className="text-[15px] font-semibold text-white/60">{t(s.author)}</span>
                <span className="text-[14px] text-white/35 ml-2">{t(s.role)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
              className="group inline-flex items-center justify-between px-7 py-3.5 text-[14px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500"
            >
              <span>{t('Book a Meeting')}</span>
              <ArrowRight className="h-4 w-4 ml-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
            </button>
            <button
              onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
              className="group inline-flex items-center gap-2.5 text-[13px] font-semibold text-white/[0.45] hover:text-white/80 transition-colors duration-300 tracking-wide"
            >
              {t('Join 50+ Global enterprises')}
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

        {/* Enterprise readiness */}
        <motion.div
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-[20px] font-bold text-white/90 mb-4">
            {t('Built')} <span className="italic font-bold gradient-text">{t('enterprise-ready')}</span>
          </h3>
          <p className="text-[15px] text-white/[0.65] leading-[1.75] mb-6 max-w-3xl">
            {t('100+ native integrations (Oracle, SAP, Workday, Greenhouse + more). Fully customisable to your processes, on your terms.')}
          </p>
          <div className="flex flex-wrap gap-3">
            {['ISO 27001', 'SOC 2', 'GDPR', 'EU AI Act'].map(b => (
              <span key={b} className="inline-flex px-4 py-2 rounded-full text-[12px] font-semibold text-white/[0.65] border border-white/[0.1] bg-white/[0.03] tracking-wide">
                {t(b)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

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
    quote: 'Having a consistent skills verification, from external hiring to internal growth, meant delivering concrete solutions to our real challenges.',
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
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();
  return (
    <section id="customers" data-testid="customer-stories-section" className="relative py-16 md:py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <m.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.6rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 mb-3 md:mb-4">
            {t('Proof, not')} <span className="italic font-bold gradient-text">{t('promises.')}</span>
          </h2>
          <p className="text-[15px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-2xl">
            {t('Leading Global enterprises make talent decisions with confidence.')}
          </p>
        </m.div>

        {/* Story cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5 mb-8 md:mb-10">
          {stories.map((s, i) => (
            <m.div
              key={s.company}
              data-testid={`story-${s.company.toLowerCase().replace(/\s+/g, '-')}`}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.14] backdrop-blur-sm p-5 md:p-10 transition-all duration-500 cursor-pointer flex flex-col justify-between gap-5 md:gap-8"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              onClick={() => { router.push(s.path); window.scrollTo(0, 0); }}
            >
              {/* Company + industry */}
              <div>
                <h3 className="text-[17px] md:text-[22px] font-semibold text-white/90 mb-4 md:mb-5">{t(s.company)}</h3>
                <span className="inline-flex px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-[11px] font-semibold text-white/[0.65] border border-white/[0.1] bg-white/[0.03] tracking-wide">
                  {t(s.industry)}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[14px] md:text-[17px] text-white/[0.65] italic leading-[1.6] md:leading-[1.7]">"{t(s.quote)}"</p>

              {/* Author */}
              <div>
                <span className="text-[13px] md:text-[15px] font-semibold text-white/60">{t(s.author)}</span>
                <span className="text-[13px] md:text-[14px] text-white/35 ml-1.5 md:ml-2">{t(s.role)}</span>
              </div>
            </m.div>
          ))}
        </div>


        {/* Join CTA */}
        <m.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <Button
              variant="primary"
              mode="dark"
              onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }}
            >
              {t('Book a Demo')}
            </Button>
            <Button
              variant="tertiary"
              mode="dark"
              onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }}
            >
              {t('Join 50+ Global enterprises')}
            </Button>
          </div>
        </m.div>

        {/* Enterprise readiness */}
        <m.div
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-8 lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-[18px] md:text-[20px] font-semibold text-white/90 mb-3 md:mb-4">
            {t('Built')} <span className="italic font-bold gradient-text">{t('enterprise-ready')}</span>
          </h3>
          <p className="text-[14px] md:text-[15px] text-white/[0.65] leading-[1.6] md:leading-[1.75] mb-4 md:mb-6 max-w-3xl">
            {t('100+ native integrations (Oracle, SAP, Workday, Greenhouse + more). Fully customisable to your processes, on your terms.')}
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {['ISO 27001', 'SOC 2', 'GDPR', 'EU AI Act'].map(b => (
              <span key={b} className="inline-flex px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[12px] md:text-[12px] font-semibold text-white/[0.65] border border-white/[0.1] bg-white/[0.03] tracking-wide">
                {t(b)}
              </span>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

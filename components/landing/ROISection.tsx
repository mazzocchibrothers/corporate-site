'use client';

import React, { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { m, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const stats = [
  {
    id: 'savedAnnually',
    value: '4.5M',
  },
  {
    id: 'monthsFaster',
    value: '6-9',
  },
  {
    id: 'roi',
    value: '10-30x',
  },
];

export default function ROISection() {
  const lang = useLocale();
  const t = useTranslations('home');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section
      id="roi"
      data-testid="roi-section"
      className="section-breathe relative pt-12 pb-2 lg:pt-16 lg:pb-2 md:flex md:items-center md:min-h-screen"
      ref={ref}
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        {/* Header row: title left + CTA right */}
        <m.div
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl">{t.rich('roi.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-warm-on-light">{chunks}</span>,
          })}</h2>
          <Button asChild variant="primary" mode="light" className="shrink-0">
            <a
              href={href('book-meeting', lang)}
              data-testid="roi-cta"
            >
              {t('roi.cta')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </m.div>

        {/* 3-column stat cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 mb-10 md:mb-16">
          {stats.map((stat, i) => (
            <m.div
              key={stat.value}
              data-testid={`roi-stat-${stat.value}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-10 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
            >
              {/* Stat number */}
              <span
                className="block text-[#1A1A2E] text-[32px] md:text-[64px] stat-value mb-6 md:mb-10"
                style={{
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </span>

              {/* Label + Sublabel + Footnote */}
              <div>
                <h3
                  className="text-[15px] md:text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-2 md:mb-4"
                >
                  {t(`roi.stats.${stat.id}.label`)} <span className="font-normal text-[#7A7A7A]">{t(`roi.stats.${stat.id}.sublabel`)}</span>
                </h3>
                <p className="text-[13px] md:text-[15px] text-[#7A7A7A] leading-[1.5] md:leading-relaxed">
                  {t(`roi.stats.${stat.id}.footnote`)}
                </p>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}

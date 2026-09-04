// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';

const integrations = ['Cornerstone', 'Docebo', 'SAP Learning'];

export default function LDIntegration() {
  const t = useTranslations('solutions.learning-development');

  return (
    <section id="ld-integration" data-testid="ld-integration" className="relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-10">
          <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold text-white/90 mb-6">{t.rich('ldIntegration.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
          <p className="text-[16px] text-white/[0.65] leading-[1.75] max-w-3xl mb-10">{t('ldIntegration.body')}</p>
          <div className="flex flex-wrap gap-3">
            {integrations.map((name) => (
              <span key={name} className="inline-flex px-5 py-2.5 rounded-full text-[13px] font-medium text-white/[0.65] border border-white/[0.1] bg-white/[0.03]">
                {name}
              </span>
            ))}
            <span className="inline-flex px-5 py-2.5 rounded-full text-[13px] font-medium text-white/40 border border-white/[0.06]">{t('ldIntegration.text')}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

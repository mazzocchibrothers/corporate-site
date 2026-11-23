'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';

const integrations = ['Cornerstone', 'Docebo', 'SAP Learning'];

export default function LDIntegration() {
  const t = useTranslations('solutions.learning-development');

  return (
    <section id="ld-integration" data-testid="ld-integration" className="section-light relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-10">
          <h2 className="max-w-[880px] text-[clamp(1.5rem,4vw,3rem)] font-semibold text-[#121212] mb-6 tracking-[-0.02em]">{t.rich('ldIntegration.heading', {
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}</h2>
          <p className="max-w-[880px] type-body text-[#4B4B4B] mb-10">{t('ldIntegration.body')}</p>
          <div className="flex flex-wrap gap-3">
            {integrations.map((name) => (
              <span key={name} className="type-body-sm inline-flex px-5 py-2.5 rounded-full font-medium text-[#4B4B4B] border border-[#e5e7eb] bg-[#f1f5f9]">
                {name}
              </span>
            ))}
            <span className="type-body-sm inline-flex px-5 py-2.5 rounded-full font-medium text-[#4B4B4B] border border-dashed border-[#121212]/25">{t('ldIntegration.text')}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

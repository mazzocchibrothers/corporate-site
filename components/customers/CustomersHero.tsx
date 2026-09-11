'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';

const metrics = [
  {
    id: 'europeanEnterprises',
    value: '100+',
  },
  {
    id: 'roiWithin18',
    value: '10-30x',
  },
  {
    id: 'savedYearly',
    value: '€4.5M',
  },
  {
    id: 'fasterTimeToHire',
    value: '40%',
  },
];

const clientLogos = [
  { name: 'Unicredit', src: '/logos/client-unicredit.svg' },
  { name: 'Carrefour', src: '/logos/client-carrefour.svg' },
  { name: 'Fidia', src: '/logos/client-fidia.svg' },
  { name: 'Generali', src: '/logos/client-generali.svg' },
  { name: 'Novacoop', src: '/logos/client-novacoop.svg' },
  { name: 'Douglas', src: '/logos/client-douglas.svg' },
  { name: 'Moncler', src: '/logos/client-moncler.svg' },
  { name: 'Lagardère', src: '/logos/client-lagardere.svg' },
  { name: 'Nespresso', src: '/logos/client-nespresso.svg' },
  { name: 'Tecnomat', src: '/logos/client-tecnomat.svg' },
  { name: 'Avolta', src: '/logos/client-avolta.svg' },
  { name: 'Europ Assistance', src: '/logos/client-europ-assistance.svg?v=2' },
];


export default function CustomersHero() {
  const lang = useLocale();
  const t = useTranslations('customers');
  // Repeat to keep the track wider than any viewport (no visible gap on wide screens)
  const logoFiles = [...clientLogos, ...clientLogos];
  return (
    <section id="customers-hero" data-testid="customers-hero" className="relative pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal
              y={20}
              duration={0.6}
              delay={0.15}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B7DFF]" />
              <span className="text-[12px] font-medium text-[#6B7DFF] tracking-[0.1em] uppercase">{t('hero.eyebrow')}</span>
            </Reveal>
            <Reveal
              as="h1"
              y={40}
              duration={0.8}
              delay={0.3}
              className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-8"
              style={{ lineHeight: 1.15 }}
            >{t.rich('hero.heading', {
              span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
            })}</Reveal>
            <Reveal
              as="p"
              y={20}
              duration={0.8}
              delay={0.5}
              className="text-[18px] text-white/[0.65] leading-[1.75] max-w-2xl mb-10"
              style={{ fontWeight: 300 }}
            >{t('hero.body')}</Reveal>

            {/* CTA - Read the stories */}
            <Reveal
              as="a"
              y={20}
              duration={0.8}
              delay={0.55}
              href="#explore"
              className="group inline-flex items-center gap-4 px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500"
            >
              <span>{t('hero.cta')}</span>
              <svg className="h-4 w-4 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-y-1 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </Reveal>
          </div>

          {/* Metrics grid */}
          <Reveal
            y={20}
            duration={0.8}
            delay={0.6}
            className="grid grid-cols-2 gap-4"
          >
            {metrics.map((m) => (
              <div key={m.value} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <span className="block text-[#6B7DFF] mb-8 stat-value" style={{ fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                <span className="text-[13px] text-white/[0.65]">{t(`hero.metrics.${m.id}.label`)}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Logo marquee. identical to homepage trust bar */}
        </div>
        <Reveal
          y={0}
          duration={0.8}
          delay={0.8}
          className="relative overflow-hidden mt-16"
        >
          <div className="flex items-center h-[80px]">
            <div
              className="flex-1 overflow-hidden relative"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <div className="marquee-track flex items-center">
                <div className="marquee-content flex items-center gap-16 shrink-0 pr-16">
                  {logoFiles.map((l, i) => (
                    <div key={`a-${i}-${l.name}`} className="shrink-0 opacity-[0.55]">
                      <img src={l.src} alt={l.name} className="h-8 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                  ))}
                </div>
                <div className="marquee-content flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
                  {logoFiles.map((l, i) => (
                    <div key={`b-${i}-${l.name}`} className="shrink-0 opacity-[0.55]">
                      <img src={l.src} alt="" className="h-8 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
    </section>
  );
}

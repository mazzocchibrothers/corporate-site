'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { HeroCopy } from '@/components/ui/hero-copy';

// One result per industry. `value` is a number so it is formatted per locale
// (2,200 in English, 2.200 in Italian); `suffix` follows it unchanged.
const metrics = [
  { id: 'fasterHires', value: 40, suffix: '%' },
  { id: 'timeToProcess', value: 90, suffix: '%' },
  { id: 'peopleMapped', value: 2200, suffix: '' },
  { id: 'turnover', value: 50, suffix: '%' },
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
  // The wide wordmarks sit a step smaller (h-5) than the rest.
  { name: 'Avolta', src: '/logos/client-avolta.svg', className: 'h-5' },
  // Redion: the file keeps its old name, commit 8228ad4 replaced its artwork.
  { name: 'Redion', src: '/logos/client-europ-assistance.svg?v=2', className: 'h-5' },
];


export default function CustomersHero() {
  const lang = useLocale();
  const t = useTranslations('customers');
  // Repeat to keep the track wider than any viewport (no visible gap on wide screens)
  const logoFiles = [...clientLogos, ...clientLogos];
  return (
    <section id="customers-hero" data-testid="customers-hero" className="relative pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-16 lg:gap-12 items-center">
          <div>
            <Reveal
              y={20}
              duration={0.6}
              delay={0.15}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="type-eyebrow font-medium text-[#6B7DFF]">{t('hero.eyebrow')}</span>
            </Reveal>
            <HeroCopy>
              <Reveal
                as="h1"
                y={40}
                duration={0.8}
                delay={0.3}
                className="text-[48px] md:text-[58px] font-semibold tracking-[-0.02em] text-white/95 mb-8"
                style={{ lineHeight: 1.1 }}
              >{t.rich('hero.heading', {
                span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
              })}</Reveal>
              <Reveal
                as="p"
                y={20}
                duration={0.8}
                delay={0.5}
                className="type-body-lg hero-subtitle text-white/[0.65]"
              >{t('hero.body')}</Reveal>
            </HeroCopy>

          </div>

          {/* Metrics grid */}
          <Reveal
            y={20}
            duration={0.8}
            delay={0.6}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {metrics.map((m) => (
              <div
                key={m.id}
                data-testid={`customers-hero-metric-${m.id}`}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 md:p-7 min-h-[180px] md:min-h-[220px]"
              >
                <span className="flex items-center gap-2 type-eyebrow text-white/[0.65] mb-4 md:mb-5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7DFF]" />
                  {t(`hero.metrics.${m.id}.industry`)}
                </span>
                <span className="block font-display text-[#6B7DFF] mb-4 md:mb-6 stat-value text-[40px] md:text-[54px]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {new Intl.NumberFormat(lang, { useGrouping: 'always' }).format(m.value)}{m.suffix}
                </span>
                <span className="block type-body text-white/80">{t(`hero.metrics.${m.id}.label`)}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Logo marquee. identical to homepage trust bar */}
      <div className="relative overflow-hidden mt-16">
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
                    <img src={l.src} alt={l.name} className={`${l.className ?? 'h-6'} w-auto object-contain`} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                ))}
              </div>
              <div className="marquee-content flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
                {logoFiles.map((l, i) => (
                  <div key={`b-${i}-${l.name}`} className="shrink-0 opacity-[0.55]">
                    <img src={l.src} alt="" className={`${l.className ?? 'h-6'} w-auto object-contain`} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

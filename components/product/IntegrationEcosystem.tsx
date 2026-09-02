'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';

const integrations = [
  { name: 'Oracle', logo: '/logos/integrations/oracle_white.avif' },
  { name: 'SAP SuccessFactors', logo: '/logos/integrations/sap-successfactors_white.avif' },
  { name: 'Workday', logo: '/logos/integrations/workday_white.avif' },
  { name: 'SmartRecruiters', logo: '/logos/integrations/smartrecruiters_white.avif' },
  { name: 'Greenhouse', logo: '/logos/integrations/greenhouse_onblack.avif' },
  { name: 'BambooHR', logo: '/logos/integrations/bamboohr_white.avif' },
  { name: 'Cornerstone', logo: '/logos/integrations/cornerstone_white.avif' },
  { name: 'Docebo', logo: '/logos/integrations/docebo_white.avif' },
  { name: 'SAP Learning', logo: '/logos/integrations/sap_clean.png' },
  { name: 'Oracle HCM', logo: '/logos/integrations/oraclehcm_color.png' },
  { name: 'ADP', logo: '/logos/integrations/adp_white.avif' },
  { name: 'Sage', logo: '/logos/integrations/sage_white.avif' },
  { name: 'Lever', logo: '/logos/integrations/lever_white.avif' },
  { name: 'iCIMS', logo: '/logos/integrations/icims_onblack.png' },
];

function LogoItem({ item }: { item: { name: string; logo: string } }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 mx-4 md:mx-8 lg:mx-12"
      style={{ minWidth: '100px' }}
    >
      <img
        src={item.logo}
        alt={item.name}
        className="h-7 lg:h-8 w-auto max-w-[140px] object-contain transition-opacity duration-400"
        style={{ filter: 'grayscale(1) brightness(0.3)', opacity: 0.65 }}
      />
    </div>
  );
}

export default function IntegrationEcosystem() {
  const lang = useLocale();
  const t = useTranslations('product-overview');

  return (
    <section
      id="integrations"
      data-testid="integrations"
      className="section-breathe relative pt-16 pb-10 lg:pt-20 lg:pb-12"
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-8 md:mb-10">
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-3 md:mb-4">{t.rich('integrationEcosystem.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[14px] md:text-[18px] text-[#7A7A7A] leading-[1.6] md:leading-[1.75] max-w-2xl mb-4 md:mb-6">{t('integrationEcosystem.body')}</p>
          <p className="text-[15px] text-[#7A7A7A] leading-[1.75]">
            {t.rich('integrationEcosystem.systems', {
              acr: (chunks) => <span className="text-[#9B9DFB]/70 font-semibold">{chunks}</span>,
            })}
          </p>
        </Reveal>
      </div>

      {/* Marquee container */}
      <Reveal
        y={0}
        duration={0.6}
        delay={0.2}
        className="relative overflow-hidden"
      >
        {/* No fade edges needed */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F5F5FA, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F5F5FA, transparent)' }} />

        {/* Row 1 - scrolls left */}
        <div className="flex items-center py-5 marquee-track">
          <div className="flex items-center animate-marquee-left">
            {integrations.map((item, i) => <LogoItem key={`a-${i}`} item={item} />)}
            {integrations.map((item, i) => <LogoItem key={`b-${i}`} item={item} />)}
          </div>
        </div>
      </Reveal>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal
          as="p"
          y={0}
          delay={0.5}
          className="mt-8 text-[15px] text-[#7A7A7A] font-semibold"
        >{t('integrationEcosystem.body2')}</Reveal>
      </div>
    </section>
  );
}

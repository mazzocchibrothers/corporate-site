import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const integrations = [
  { name: 'Oracle', logo: '/logos/integrations/oracle_white.png' },
  { name: 'SAP SuccessFactors', logo: '/logos/integrations/sap-successfactors_white.png' },
  { name: 'Workday', logo: '/logos/integrations/workday_white.png' },
  { name: 'SmartRecruiters', logo: '/logos/integrations/smartrecruiters_white.png' },
  { name: 'Greenhouse', logo: '/logos/integrations/greenhouse_onblack.png' },
  { name: 'BambooHR', logo: '/logos/integrations/bamboohr_white.png' },
  { name: 'Cornerstone', logo: '/logos/integrations/cornerstone_white.png' },
  { name: 'Docebo', logo: '/logos/integrations/docebo_white.png' },
  { name: 'SAP Learning', logo: '/logos/integrations/sap_clean.png' },
  { name: 'Oracle HCM', logo: '/logos/integrations/oraclehcm_color.png' },
  { name: 'ADP', logo: '/logos/integrations/adp_white.png' },
  { name: 'Sage', logo: '/logos/integrations/sage_white.png' },
  { name: 'Lever', logo: '/logos/integrations/lever_white.png' },
  { name: 'iCIMS', logo: '/logos/integrations/icims_onblack.png' },
];

function LogoItem({ item }: { item: { name: string; logo: string } }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 mx-8 lg:mx-12"
      style={{ minWidth: '140px' }}
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
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="integrations"
      data-testid="integrations"
      className="section-breathe relative pt-16 pb-10 lg:pt-20 lg:pb-12"
      ref={ref}
    >
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4">
            {t('Giving life to your')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('core HR systems')}</span>
          </h2>
          <p className="text-[18px] text-[#1A1A2E]/[0.65] leading-[1.75] max-w-2xl mb-6">
            {t('Skillvue layers objective talent data into your existing stack, turning them from process gatekeepers into decision engines.')}
          </p>
          <p className="text-[15px] text-[#1A1A2E]/[0.4] leading-[1.75]">
            {t('Integrating with')} <span className="text-[#4B4DF7]/70 font-semibold">ATS</span> &middot; <span className="text-[#4B4DF7]/70 font-semibold">LMS</span> &middot; <span className="text-[#4B4DF7]/70 font-semibold">LXP</span> &middot; <span className="text-[#4B4DF7]/70 font-semibold">PMS</span> &middot; <span className="text-[#4B4DF7]/70 font-semibold">HRIS</span> &mdash; {t('100+ native integrations')}
          </p>
        </motion.div>
      </div>

      {/* Marquee container */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
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
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.p
          className="mt-8 text-[15px] text-[#1A1A2E]/40 font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t('If it has an API, we connect.')}
        </motion.p>
      </div>
    </section>
  );
}

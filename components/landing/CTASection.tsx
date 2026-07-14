import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { ArrowRight, ShieldIcon, Languages, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });


  return (
    <section id="cta" data-testid="cta-section" className="relative pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-36 lg:pb-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <m.div
          className="mb-8 md:mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white/90 max-w-4xl">
            {t('Ready to make talent decisions')}{' '}
            <span className="italic font-bold gradient-text">{t('you can defend?')}</span>
          </h2>
        </m.div>

        <m.div
          className="grid grid-cols-2 lg:grid-cols-12 gap-5 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Track A — Demo CTA */}
          <div
            data-testid="cta-track-a"
            className="col-span-2 md:col-span-1 lg:col-span-6 group relative rounded-2xl md:rounded-3xl border border-white/[0.05] hover:border-[#7577F8]/20 bg-white/[0.02] backdrop-blur-sm transition-all duration-700 p-5 md:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#4B4DF7]/[0.06] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative">
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase">{t('Ready to explore')}</span>
              <h3 className="text-[20px] md:text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-white/85 mt-3 md:mt-5 mb-2 md:mb-4 leading-tight">
                {t('Book a 30-min Demo')}
              </h3>
              <p className="text-[12px] md:text-[17px] text-white/[0.65] mb-5 md:mb-8 max-w-md leading-[1.5] md:leading-normal">
                {t('See Skillvue live with your specific use case')}
              </p>
            </div>
            <Button asChild variant="primary" mode="dark" className="w-full md:w-auto md:max-w-sm">
              <a
                href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'}
                data-testid="cta-book-demo"
              >
                <span>{t('Book a Demo')}</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Track B — Our Customers logos */}
          <div
            data-testid="cta-track-b"
            className="col-span-2 md:col-span-1 lg:col-span-6 group relative rounded-2xl md:rounded-3xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] backdrop-blur-sm transition-all duration-700 p-5 md:p-10"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-5 md:mb-10 block">{t('Our Customers')}</span>
            {(() => {
              const ctaLogos = [
                    { name: 'Moncler', src: '/logos/client-moncler.svg' },
                    { name: 'Lagardère', src: '/logos/client-lagardere.svg' },
                    { name: 'Nespresso', src: '/logos/client-nespresso.svg' },
                    { name: 'Tecnomat', src: '/logos/client-tecnomat.svg' },
                    { name: 'Avolta', src: '/logos/client-avolta.svg' },
                    { name: 'Carrefour', src: '/logos/client-carrefour.svg' },
                    { name: 'Generali', src: '/logos/client-generali.svg' },
                    { name: 'Douglas', src: '/logos/client-douglas.svg' },
                    { name: 'Europ Assistance', src: '/logos/client-europ-assistance.svg' },
                  ];
              return (
                <div className="grid grid-cols-3 gap-x-4 gap-y-5 md:gap-x-10 md:gap-y-8 mb-3 md:mb-8">
                  {ctaLogos.map((logo) => (
                    <div key={logo.name} className="flex items-center justify-center h-8 md:h-12">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-6 w-auto object-contain opacity-[0.45] hover:opacity-[0.75] transition-opacity duration-500"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </m.div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ShieldIcon, Languages, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });


  return (
    <section id="cta" data-testid="cta-section" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white/90 max-w-4xl">
            {t('Ready to make talent decisions')}{' '}
            <span className="italic font-bold gradient-text">{t('you can defend?')}</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Track A */}
          <div
            data-testid="cta-track-a"
            className="lg:col-span-6 group relative rounded-3xl border border-white/[0.05] hover:border-[#7577F8]/20 bg-white/[0.02] backdrop-blur-sm transition-all duration-700 p-10 lg:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#4B4DF7]/[0.06] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative">
              <span className="text-[15px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase">{t('Ready to explore')}</span>
              <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/85 mt-5 mb-4 leading-tight">
                {t('Book a 30-min Demo')}
              </h3>
              <p className="text-[17px] text-white/[0.65] mb-8 max-w-md">
                {t('See Skillvue live with your specific use case')}
              </p>
              <a
                href="/book-meeting"
                data-testid="cta-book-demo"
                className="group/btn inline-flex items-center justify-between w-full max-w-sm px-8 py-5 text-[14px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500"
              >
                <span>{t('Book a Meeting')}</span>
                <ArrowRight className="h-4 w-4 text-white/30 group-hover/btn:text-[#9B9DFB] group-hover/btn:translate-x-1 transition-all duration-500" />
              </a>
            </div>
          </div>

          {/* Track B. Our Customers logos */}
          <div
            data-testid="cta-track-b"
            className="lg:col-span-6 group relative rounded-3xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] backdrop-blur-sm transition-all duration-700 p-10 lg:p-12"
          >
            <span className="text-[15px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase mb-10 block">{t('Our Customers')}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8 mb-8">
              {['unicredit', 'carrefour_fixed', 'generali', 'capgemini_fixed', 'douglas', 'coop'].map((logo) => (
                <div key={logo} className="flex items-center justify-center h-12">
                  <img
                    src={`/logos/${logo}.png`}
                    alt={logo}
                    className="h-9 w-auto max-w-[120px] object-contain opacity-[0.45] hover:opacity-[0.75] transition-opacity duration-500"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-x-10">
              {['loropiana_fixed', 'fidia_fixed'].map((logo) => (
                <div key={logo} className="flex items-center justify-center h-12">
                  <img
                    src={`/logos/${logo}.png`}
                    alt={logo}
                    className="h-9 w-auto max-w-[120px] object-contain opacity-[0.45] hover:opacity-[0.75] transition-opacity duration-500"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}

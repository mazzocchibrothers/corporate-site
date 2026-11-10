import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/ui/reveal';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { HeroCopy } from '@/components/ui/hero-copy';

// The AI system reporting channel (ISO 42001). Kept apart from the privacy
// notices at legal's request; laid out as they are.
//
// One Google Form, written differently in each language's legal text (the
// Italian uses its forms.gle short link), so the href follows the locale.
const FORM_URL: Record<string, string> = {
  en: 'https://docs.google.com/forms/d/e/1FAIpQLSfjpYLxINag9C6pddz2n9PKSurZKtknC5Av50OGxPalJJSnEQ/viewform',
  it: 'https://forms.gle/eqVdAsAeDE3tzbVd7',
};

export default async function AiSystemReporting() {
  const t = await getTranslations('ai-system-reporting');
  const formUrl = FORM_URL[await getLocale()];
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(75,77,247,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <div className="relative z-10 max-w-[900px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <Reveal y={20} duration={0.6}>
              <span className="type-eyebrow text-[#6B7DFF] mb-6 block">
                {t('eyebrow')}</span>
              <HeroCopy>
                <h1 className="font-semibold text-white/95 mb-4 text-[48px] md:text-[58px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {t('heading')}</h1>
              </HeroCopy>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="section-breathe py-16 lg:py-24">
          <div className="max-w-[900px] mx-auto px-8 lg:px-12">
            <Reveal y={20} duration={0.6} delay={0.2} className="prose-custom">
              <p className="type-body text-[#121212]/70">
                {t.rich('body', {
                  a: (chunks) => <a href={formUrl} target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}<span className="sr-only"> {t('newTab')}</span></a>,
                })}</p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

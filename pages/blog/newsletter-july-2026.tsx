// @ts-nocheck
import React from 'react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, ImageIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { messagesFor } from '@/i18n/messages';

// ─── Fill these in when the assets/links are ready ──────────────────────────
const IMAGES = {
  vivatech: '/newsletter-july-vivatech.jpeg',
  execTa: '/newsletter-july-execta.jpeg',
  aiReadiness: '/newsletter-july-ai-readiness.png',
  fidia: '/newsletter-july-fidia.webp',
};
const LINKS = {
  vivatech: 'https://www.linkedin.com/posts/skillvue_we-flew-to-france-for-vivatech-and-came-back-activity-7473749153379041280-cxBR?utm_source=share&utm_medium=member_desktop&rcm=ACoAACZSO2IBOJeEW6vWG4-WdHsN9EKvCSEp4DA',
  execTa: 'https://www.linkedin.com/feed/update/urn:li:activity:7480888533185093632',
  aiTest: '/lp/ai-competency-newsletter',
  fidia: '/customers/fidia-farmaceutici',
};
// ────────────────────────────────────────────────────────────────────────────


// Renders **bold** markers inside a plain string as <strong> spans.
function renderRich(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-[#121212]">{part.slice(2, -2)}</strong>
      : part
  );
}

function Img({ src, label, soon }) {
  if (src) return <img src={src} alt={label} className="block w-full rounded-2xl my-8" />;
  return (
    <div className="my-8 w-full rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-6"
      style={{ aspectRatio: '16 / 10', background: 'linear-gradient(135deg, #ece9fb 0%, #f7e6dc 100%)', border: '1px dashed rgba(75,77,247,0.25)' }}>
      <ImageIcon className="h-7 w-7 text-[#4B4DF7]/50" />
      <span className="text-[13px] font-semibold text-[#4B4DF7]/70">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-[#121212]/25">{soon}</span>
    </div>
  );
}

function CtaLink({ label, href, external }) {
  return (
    <div className="mt-8">
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex items-center gap-2 rounded-full bg-[#4B4DF7] text-white text-[14px] font-semibold px-6 py-3.5 transition-colors duration-300 hover:bg-[#3133E7]"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('blog/newsletter-july-2026');

export default function JulyNewsletter() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = useTranslations('blog.newsletter-july-2026');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('subtitle')} />
      </Head>

      <Navbar />
      <main>
        {/* HERO — dark, on-brand */}
        <section className="relative pt-[80px] overflow-hidden" style={{ background: '#08080c' }}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
            <div className="absolute top-10 right-[-200px] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
            <Button
              variant="tertiary" mode="dark" iconPosition="left" icon={<ArrowLeft aria-hidden />}
              onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }}
              className="mb-10"
            >
              {t('back')}
            </Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{t('tag')}</span>
                <span className="text-[13px] text-white/35">{t('date')}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('readTime')}</span>
              </div>
              <h1 className="font-semibold text-white/95 mb-6 text-[40px] md:text-[60px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('title')}</h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>{t('subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* BODY — light panel */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20">
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
              {t.raw('intro').map((p, i) => <p key={i} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
            </motion.div>

            {/* Sections */}
            {t.raw('sections').map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
                <h2 className="text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-1">{s.heading}</h2>
                <Img src={IMAGES[s.img]} label={t.raw('imgLabels')[s.img]} soon={t('imgSoon')} />
                <div className="space-y-5">
                  {s.body.map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
                </div>
                <CtaLink label={s.cta.label} href={s.cta.href} external={s.cta.external} />
              </motion.div>
            ))}

            {/* Closing */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
              <h2 className="text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-4">{t('closing.heading')}</h2>
              <div className="space-y-5">
                {t.raw('closing.body').map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA — dark */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24" style={{ background: '#08080c' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t('finalKicker')}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t('finalTitle')} <span className="gradient-text">{t('finalTitleHighlight')}</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">{t('finalBody')}</p>
              <Button variant="primary" mode="dark" onClick={() => { router.push(t('onClick')); window.scrollTo(0, 0); }}>
                {t('finalButton')}
              </Button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

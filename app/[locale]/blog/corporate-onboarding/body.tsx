// @ts-nocheck
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Clipboard, Users, MessageSquare, Heart, BarChart3 } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';





// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const PHASES = [
  { id: 'n01', icon: Clipboard },
  { id: 'n02', icon: Users },
  { id: 'n03', icon: MessageSquare },
  { id: 'n04', icon: Heart },
  { id: 'n05', icon: BarChart3 },
];

export default function BlogArticle6() {
  const router = useRouter();
  const t = useTranslations('blog.corporate-onboarding');


  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1758519288548-046187014c85?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <Button
              variant="tertiary"
              mode="dark"
              iconPosition="left"
              icon={<ArrowLeft aria-hidden />}
              onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }}
              className="mb-10"
            >
              {t('cta')}
            </Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Onboarding</span>
                <span className="text-[13px] text-white/35">{t('text')}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('text2')}</span>
              </div>
              <h1 className="font-semibold text-white/95 mb-6 text-[48px] md:text-[64px]" style={{ lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                {t('heading')}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {t('body')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* All article content in one continuous light section */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-14 lg:py-16">

            {/* What Is Onboarding */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading2')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body2')}
              </p>
              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 mb-6">
                <p className="text-[16px] text-[#121212]/[0.7] leading-[1.8] italic">
                  {t('body3')}
                </p>
              </div>
            </motion.div>

            {/* The 5 Phases */}
            <h2 className="text-[26px] font-semibold text-[#121212] mb-4 mt-12 tracking-[-0.02em]">
              {t('heading3')}
            </h2>
            <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-8">
              {t('body4')}
            </p>

            <div className="space-y-0 mb-12">
              {PHASES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.details
                    key={t(`phases.${p.id}.num`)}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{t(`phases.${p.id}.num`)}</span>
                      <div className="flex-1">
                        <span className="text-[17px] font-semibold text-[#121212]/80 block">{t(`phases.${p.id}.title`)}</span>
                        <span className="text-[12px] text-[#121212]/30">{t(`phases.${p.id}.timing`)}</span>
                      </div>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <div className="space-y-2">
                        {t.raw(`phases.${p.id}.points`).map((point, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle className="h-3.5 w-3.5 text-[#4B4DF7]/40 mt-1 shrink-0" />
                            <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.details>
                );
              })}
            </div>

            {/* Onboarding as Field Verification */}
            <h2 className="text-[26px] font-bold text-[#121212] mb-5 mt-12 tracking-[-0.02em]">
              {t('heading4')}
            </h2>
            <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
              {t.rich('body5', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
            </p>

            <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                <h3 className="text-[16px] font-semibold text-[#121212]">Key Takeaway</h3>
              </div>
              <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                {t('body6')}
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">
                {t('text3')}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.rich('heading5', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {t('body7')}
              </p>
              <Button
                variant="primary"
                mode="dark"
                onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
              >
                {t('cta2')}
              </Button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

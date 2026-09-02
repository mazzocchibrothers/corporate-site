// @ts-nocheck
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Users, Target, MessageCircle, Lock, Handshake, FileCheck, HelpCircle } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';





// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const TECHNIQUES = [
  { id: 'n01', icon: Users },
  { id: 'n02', icon: Target },
  { id: 'n03', icon: HelpCircle },
  { id: 'n04', icon: MessageCircle },
  { id: 'n05', icon: Lock },
  { id: 'n06', icon: Handshake },
  { id: 'n07', icon: FileCheck },
];

export default function BlogArticle3() {
  const router = useRouter();
  const t = useTranslations('blog.negotiation-techniques');


  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
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
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{t('tag')}</span>
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

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body2')}
              </p>
              <p className="text-[17px] text-[#121212]/[0.75] leading-[1.9] mb-6 font-medium">
                {t('body3')}
              </p>

              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">
                {t('heading2')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body4')}
              </p>

              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">
                {t('heading3')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t.rich('body5', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white p-6">
                  <h3 className="text-[15px] font-semibold text-[#121212] mb-2">{t('heading4')}</h3>
                  <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{t('body6')}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white p-6">
                  <h3 className="text-[15px] font-semibold text-[#121212] mb-2">{t('heading5')}</h3>
                  <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{t('body7')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The 7 Techniques — Accordion */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.h2 className="text-[26px] font-semibold text-[#121212] mb-4 tracking-[-0.02em] leading-[1.15]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {t('heading6')}
            </motion.h2>
            <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
              {t('body8')}
            </p>

            <div className="space-y-0">
              {TECHNIQUES.map((technique, i) => {
                const Icon = technique.icon;
                return (
                  <motion.details
                    key={t(`techniques.${technique.id}.num`)}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{t(`techniques.${technique.id}.num`)}</span>
                      <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t(`techniques.${technique.id}.title`)}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <p className="text-[15px] text-[#121212]/[0.55] leading-[1.8] mb-4">{t(`techniques.${technique.id}.summary`)}</p>
                      <div className="rounded-xl bg-[#121212]/[0.03] p-5 mt-3">
                        <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.1em] uppercase mb-2 block">{t('text3')}</span>
                        <p className="text-[14px] text-[#121212]/[0.55] leading-[1.75] italic">{t(`techniques.${technique.id}.example`)}</p>
                      </div>
                    </div>
                  </motion.details>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Evaluate */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em] leading-[1.15]">
                {t('heading7')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body9')}
              </p>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body10')}
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-semibold text-[#121212]">{t('heading8')}</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {t('body11')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t('text4')}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.rich('heading9', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {t('body12')}
              </p>
              <Button
                variant="primary"
                mode="dark"
                onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="mb-16"
              >
                {t('cta2')}
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {['psychometricScience', 'beiMethodology', 'objectiveProfiles', 'skillsBasedHiring'].map((item) => (
                  <span key={item} className="text-[13px] text-white/25 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#4B4DF7]/50" />{t(`credentials.${item}`)}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

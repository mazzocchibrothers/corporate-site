// @ts-nocheck
import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, AlertTriangle, CheckCircle, Settings, MessageSquare, Users, Layers } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { messagesFor } from '@/i18n/messages';






// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('blog/accountability');

// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const SCENARIOS = [
  { id: 'deliverableLate' },
  { id: 'twoUrgentRequests' },
  { id: 'newProjectNo' },
  { id: 'teamDeliverableDepends' },
];

const LEVERS = [
  { id: 'n01', icon: Settings },
  { id: 'n02', icon: MessageSquare },
  { id: 'n03', icon: Layers },
  { id: 'n04', icon: Users },
];

export default function BlogArticle4() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = useTranslations('blog.accountability');


  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1545005785-a4a5554b8efe?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
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
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Culture</span>
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

        {/* Definition */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading2')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t.rich('body2', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>

              <div className="grid md:grid-cols-3 gap-3 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-semibold text-[#121212] mb-2">{t('heading3')}</h3>
                  <p className="text-[13px] text-[#121212]/[0.45] leading-[1.6]">{t('body3')}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-semibold text-[#121212] mb-2">Ownership</h3>
                  <p className="text-[13px] text-[#121212]/[0.45] leading-[1.6]">{t('body4')}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.03] p-5 text-center">
                  <h3 className="text-[14px] font-semibold text-[#4B4DF7]">Accountability</h3>
                  <p className="text-[13px] text-[#121212]/[0.55] leading-[1.6]">{t('body5')}</p>
                </div>
              </div>

              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 mt-14 tracking-[-0.02em]">
                {t('heading4')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t.rich('body6', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                  {t('body7')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Low vs High — Clean editorial format */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-4 tracking-[-0.02em]">
                {t('heading5')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
                {t('body8')}
              </p>

              <div className="space-y-0">
                {SCENARIOS.map((s, i) => (
                  <motion.details
                    key={i}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                      <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t(`scenarios.${s.id}.context`)}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6 space-y-3">
                      <div className="rounded-xl border border-[#121212]/[0.04] bg-[#121212]/[0.02] p-4">
                        <span className="text-[11px] font-bold text-[#121212]/30 tracking-[0.08em] uppercase mb-1.5 block">
                          {t('text3')}
                        </span>
                        <p className="text-[14px] text-[#121212]/[0.45] leading-[1.7] italic">{t(`scenarios.${s.id}.low`)}</p>
                      </div>
                      <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-4">
                        <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.08em] uppercase mb-1.5 block">
                          {t('text4')}
                        </span>
                        <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7] italic">{t(`scenarios.${s.id}.high`)}</p>
                      </div>
                    </div>
                  </motion.details>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to Develop */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading6')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-8">
                {t('body9')}
              </p>
              <div className="space-y-3">
                {LEVERS.map((l) => {
                  const Icon = l.icon;
                  return (
                    <div key={t(`levers.${l.id}.num`)} className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#4B4DF7]/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-[#4B4DF7]/60" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#121212] mb-1.5">{t(`levers.${l.id}.title`)}</h3>
                        <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{t(`levers.${l.id}.desc`)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-12">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-semibold text-[#121212]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {t('body10')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">
                {t('text5')}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.rich('heading7', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {t('body11')}
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

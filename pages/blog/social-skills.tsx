// @ts-nocheck
import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Heart, Users, Handshake, Target, Brain, RefreshCw, Wrench, Shield, Calendar, Compass } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { messagesFor } from '@/i18n/messages';




// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('blog/social-skills');

// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const SOCIAL_SKILLS = [
  { id: 'emotionalIntelligence', icon: Heart },
  { id: 'orientationOthers', icon: Users },
  { id: 'negotiation', icon: Handshake },
  { id: 'teamworking', icon: Target },
  { id: 'leadership', icon: Compass },
  { id: 'goalOrientation', icon: Brain },
  { id: 'cognitiveFlexibility', icon: RefreshCw },
  { id: 'problemSolving', icon: Wrench },
  { id: 'resilience', icon: Shield },
  { id: 'organizationPlanning', icon: Calendar },
];

export default function BlogArticle8() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = useTranslations('blog.social-skills');


  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1544477989-b64060e53f36?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
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
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Soft Skills</span>
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

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">{t('heading2')}</h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body2')}
              </p>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t.rich('body3', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                  {t('body4')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">{t('heading3')}</h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-8">
                {t('body5')}
              </p>
              <div className="space-y-0">
                {SOCIAL_SKILLS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.details
                      key={t(`socialSkills.${s.id}.title`)}
                      className="group border-b border-[#121212]/[0.06] last:border-b-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                        <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t(`socialSkills.${s.id}.title`)}</span>
                        <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                      </summary>
                      <div className="pl-12 pb-6">
                        <p className="text-[15px] text-[#121212]/[0.55] leading-[1.8]">{t(`socialSkills.${s.id}.desc`)}</p>
                      </div>
                    </motion.details>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">{t('heading4')}</h2>
              <h3 className="text-[17px] font-semibold text-[#121212]/80 mb-4">{t('heading5')}</h3>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body6')}
              </p>
              <h3 className="text-[17px] font-semibold text-[#121212]/80 mb-4">{t('heading6')}</h3>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body7')}
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-semibold text-[#121212]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {t('body8')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t('text3')}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.rich('heading7', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {t('body9')}
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

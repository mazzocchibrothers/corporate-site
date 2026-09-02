// @ts-nocheck
'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, Mail } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const pressArticles = [
  {
    publication: 'Tech.eu',
    logo: '/logos/press-techeu.svg',
    logoH: 28,
    title: 'Skillvue secures $6.3M to develop comprehensive skills verification agents',
    url: 'https://tech.eu/2025/05/05/skillvue-secures-6-3m-to-develop-comprehensive-skills-assessment-agents/',
  },
  {
    publication: 'CFOtech UK',
    logo: '/logos/press-cfotech.svg',
    logoH: 28,
    title: 'Skillvue raises USD $6.3 million to scale AI skills platform',
    url: 'https://cfotech.co.uk/story/skillvue-raises-usd-6-3-million-to-scale-ai-skills-platform',
  },
  {
    publication: 'GlobeNewsWire',
    logo: '/logos/press-globenewswire.svg',
    logoH: 22,
    title: 'Italian-based Skillvue raises $6.3M to transform how companies discover and develop hidden talent',
    url: 'https://www.globenewswire.com/NewsRoom/ReleaseNg/402135258',
  },
  {
    publication: 'Business Insider',
    logo: '/logos/press-businessinsider.svg',
    logoH: 28,
    title: 'Italian-based Skillvue raises $6.3M to transform how companies discover and develop hidden talent',
    url: 'https://markets.businessinsider.com/news/stocks/italian-based-skillvue-raises-6-3m-to-transform-how-companies-discover-and-develop-hidden-talent-1034669096',
  },
  {
    publication: 'StartupRise UK',
    logo: '/logos/press-startuprise.png',
    logoH: 28,
    title: 'HRtech Startup Skillvue Raises €5.5 Mn Seed Funding',
    url: 'https://startuprise.co.uk/hrtech-startup-skillvue-raises-e5-5-mn-seed-funding/',
  },
  {
    publication: 'AI World EU',
    logo: '/logos/press-aiworld.svg',
    logoH: 26,
    title: 'Skillvue to rediscover the talent in your company',
    url: 'https://aiworld.eu/story/skillvue-to-rediscover-the-talent-in-your-company',
  },
];

// Italian press coverage: a list of third-party articles that exists only in
// Italian. The titles are citations, not copy of ours, so they stay data — the
// same as the investor and publication names below.
const pressArticlesIt = [
  {
    publication: 'La Repubblica',
    title: "L'IA per valutare le competenze in azienda: per Skillvue 5,5 milioni di investimenti",
    url: 'https://www.repubblica.it/economia/finanza/2025/05/05/news/l_ia_per_valutare_le_competenze_in_azienda_per_skillvue_55_milioni_di_investimenti-424166391/',
  },
  {
    publication: 'Il Quotidiano d\'Italia',
    title: 'Skillvue chiude un round seed da 5,5 milioni',
    url: 'https://ilquotidianoditalia.it/skillvue-chiude-un-round-seed-da-55-milioni/',
  },
  {
    publication: 'Forbes Italia',
    title: 'La startup HR Skillvue raccoglie 5,5 milioni di euro per cambiare la valutazione delle competenze con l\'intelligenza artificiale',
    url: 'https://forbes.it/2025/05/05/la-startup-hr-skillvue-raccoglie-55-milioni-di-euro-per-cambiare-la-valutazione-delle-competenze-con-lintelligenza-artificiale/',
  },
  {
    publication: 'Borsa Italiana / Radiocor',
    title: 'Skillvue chiude round seed da 5,5 mln guidato da italofrancese 360 Capital',
    url: 'https://www.borsaitaliana.it/borsa/notizie/radiocor/finanza/dettaglio/skillvue-chiude-round-seed-da-55-mln-guidato-da-italofrancese-360-capital-nRC_05052025_1113_211100406.html',
  },
  {
    publication: 'La Stampa',
    title: 'Skillvue: round seed da 5,5 milioni di euro guidato da 360 Capital',
    url: 'https://finanza.lastampa.it/News/2025/05/05/skillvue-round-seed-da-5-5-milioni-di-euro-guidato-da-360-capital/OTlfMjAyNS0wNS0wNV9UTEI',
  },
  {
    publication: 'La Repubblica (Finanza)',
    title: 'Skillvue: round seed da 5,5 milioni di euro guidato da 360 Capital',
    url: 'https://finanza.repubblica.it/News/2025/05/05/skillvue_round_seed_da_5_5_milioni_di_euro_guidato_da_360_capital-99/',
  },
  {
    publication: 'Il Sole 24 Ore',
    title: 'Round seed da 5,5 milioni di euro: Skillvue, la startup HR tech che sta cambiando la valutazione delle competenze attraverso l\'intelligenza artificiale',
    url: 'https://ntplusdiritto.ilsole24ore.com/art/round-seed-55-milioni-euro-skillvue-startup-hr-tech-che-sta-cambiando-valutazione-competenze-attraverso-l-intelligenza-artificiale-AH8qYEd',
  },
  {
    publication: 'La Repubblica',
    title: 'A maggio investiti 426 milioni in startup in Italia: i round e le notizie principali',
    url: 'https://www.ilgiorno.it/milano/cronaca/i-nuovi-cacciatori-di-teste-f6af576a',
  },
];

const interviews = [
  {
    publication: 'Forbes',
    logo: '/logos/press-forbes.svg',
    logoH: 32,
    title: 'Meet The Start-Ups Who Say AI Will Transform Recruitment',
    url: 'https://www.forbes.com/sites/davidprosser/2025/05/05/meet-the-start-ups-who-say-ai-will-transform-recruitment/',
  },
  {
    publication: 'HRTech Edge',
    logo: '/logos/press-hrtechedge.svg',
    logoH: 28,
    title: 'Skillvue raises €5.5M to scale AI HR Agents',
    url: 'https://hrtechedge.com/interviews/skillvue-raises-e5-5m-to-scale-ai-hr-agents/',
  },
];

// The date is data. The headline and the PDF are both per-language — a file
// that changes with the language is a translation, whatever its extension — so
// both live in the catalogue.
const pressReleases = [
  { id: 'seedRound', date: 'May 5, 2025' },
  { id: 'becomesSkillvue', date: 'September 3, 2024' },
];

const investors = [
  { name: '360 Capital', src: '/logos/investor-360capital.svg', h: '42px' },
  { name: '14 Peaks', src: '/logos/investor-14peaks.svg', h: '42px' },
  { name: 'Orbita', src: '/logos/investor-orbita.svg', h: '42px' },
  { name: 'Kfund', src: '/logos/investor-kfund.svg', h: '42px' },
  { name: 'IFF', src: '/logos/investor-iff.svg', h: '42px' },
  { name: 'Ithaca', src: '/logos/investor-ithaca.svg', h: '42px' },
];



export default function PressPage() {
  const router = useRouter();
  const lang = useLocale();
  const t = useTranslations('resources.press');

  return (
    <>
      <Navbar />
      <main>

        {/* 1. Hero — dark */}
        <section className="relative pt-[80px] min-h-[60vh] flex items-center overflow-hidden bg-black">
          {/* Subtle gradient orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute rounded-full"
              style={{
                width: '600px', height: '600px',
                top: '-200px', left: '-100px',
                background: 'radial-gradient(circle, rgba(75,77,247,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '500px', height: '500px',
                bottom: '-150px', right: '-80px',
                background: 'radial-gradient(circle, rgba(255,95,36,0.07) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-8 block">{t('text')}</span>
              <h1
                className="font-semibold text-white/95 mb-6 text-[48px] md:text-[64px]"
                style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >{t.rich('heading', {
                br: () => <br />,
                span: (chunks) => <span className="gradient-text">{chunks}</span>,
              })}</h1>
              <p className="text-[18px] text-white/[0.45] leading-[1.8] max-w-lg mb-10" style={{ fontWeight: 300 }}>{t('body')}</p>
              <Button asChild variant="tertiary" mode="dark">
                <a href="mailto:press@skillvue.ai">
                  <Mail aria-hidden />
                  press@skillvue.ai
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* 2. Press Coverage */}
        <section className="section-breathe py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-12"
            >
              <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.2em] uppercase mb-4 block">{t('text2')}</span>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-[#121212] tracking-[-0.02em]">{t('heading2')}</h2>
            </motion.div>

            {(() => {
              const renderCard = (article, i) => (
                <motion.a
                  key={article.publication}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-[#121212]/[0.06] bg-white p-6 md:p-8 hover:border-[#4B4DF7]/[0.18] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.4) }}
                >
                  <div>
                    <div className="mb-5 md:mb-6 h-10 flex items-center">
                      <img
                        src={article.logo}
                        alt={article.publication}
                        style={{ height: `${article.logoH}px`, maxWidth: '160px', objectFit: 'contain', objectPosition: 'left center' }}
                      />
                    </div>
                    <p className="text-[14px] md:text-[15px] font-medium text-[#121212]/80 leading-[1.65] group-hover:text-[#121212] transition-colors duration-300">
                      {article.title}
                    </p>
                  </div>
                  <div className="mt-5 md:mt-6 flex items-center justify-end">
                    <ArrowUpRight className="h-4 w-4 text-[#4B4DF7]/30 group-hover:text-[#4B4DF7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </motion.a>
              );
              return (
                <>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
                    {pressArticles.map((article, i) => renderCard(article, i))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        {/* 2b. Italian Press Coverage — only shown in IT */}
        {lang === 'it' && (
          <section className="section-breathe py-16 lg:py-20 border-t border-[#121212]/[0.04]">
            <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 md:mb-12"
              >
                <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.2em] uppercase mb-4 block">
                  Stampa italiana
                </span>
                <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-[#121212] tracking-[-0.02em]">
                  Skillvue sui media italiani
                </h2>
              </motion.div>

              {(() => {
                const renderCard = (article, i) => (
                  <motion.a
                    key={`${article.publication}-${i}`}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-2xl border border-[#121212]/[0.06] bg-white p-6 md:p-8 hover:border-[#4B4DF7]/[0.18] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.4) }}
                  >
                    <div>
                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.12em] uppercase">
                          {article.publication}
                        </span>
                      </div>
                      <p className="text-[14px] md:text-[15px] font-medium text-[#121212]/80 leading-[1.65] group-hover:text-[#121212] transition-colors duration-300">
                        {article.title}
                      </p>
                    </div>
                    <div className="mt-5 md:mt-6 flex items-center justify-end">
                      <ArrowUpRight className="h-4 w-4 text-[#4B4DF7]/30 group-hover:text-[#4B4DF7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </motion.a>
                );
                return (
                  <>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
                      {pressArticlesIt.map((article, i) => renderCard(article, i))}
                    </div>
                  </>
                );
              })()}
            </div>
          </section>
        )}

        {/* 3. Interviews */}
        <section className="section-breathe py-16 lg:py-20 border-t border-[#121212]/[0.04]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-12"
            >
              <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.2em] uppercase mb-4 block">{t('text3')}</span>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-[#121212] tracking-[-0.02em]">{t('heading3')}</h2>
            </motion.div>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-5 md:max-w-3xl">
              {interviews.map((item, i) => (
                <motion.a
                  key={item.publication}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-[#4B4DF7]/[0.10] bg-white p-6 md:p-8 hover:border-[#4B4DF7]/[0.25] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.06] transition-all duration-500"
                  style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f8ff 100%)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div>
                    <div className="mb-5 md:mb-6 h-10 flex items-center">
                      <img
                        src={item.logo}
                        alt={item.publication}
                        style={{ height: `${item.logoH}px`, maxWidth: '160px', objectFit: 'contain', objectPosition: 'left center' }}
                      />
                    </div>
                    <p className="text-[14px] md:text-[15px] font-medium text-[#121212]/80 leading-[1.65] group-hover:text-[#121212] transition-colors duration-300">
                      {item.title}
                    </p>
                  </div>
                  <div className="mt-5 md:mt-6 flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-[#4B4DF7]/50 tracking-[0.08em] uppercase group-hover:text-[#4B4DF7]/80 transition-colors duration-300">{t('cta')}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#4B4DF7]/40 group-hover:text-[#4B4DF7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Press Releases — dark section */}
        <section className="relative py-20 lg:py-28 bg-black">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-12"
            >
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-4 block">{t('text4')}</span>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-white/90 tracking-[-0.02em]">{t('heading4')}</h2>
            </motion.div>

            <div className="flex flex-col gap-3 md:gap-4">
              {pressReleases.map((release, i) => (
                <motion.a
                  key={release.id}
                  href={t(`releases.${release.id}.url`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6 rounded-2xl border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.03] px-5 py-5 md:px-8 md:py-6 transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 min-w-0 flex-1">
                    <span className="text-[11px] md:text-[13px] text-[#9B9DFB]/60 md:text-white/25 shrink-0 md:mt-0.5 font-mono tracking-wider uppercase md:normal-case md:tracking-normal">{release.date}</span>
                    <span className="text-[16px] md:text-[15px] font-semibold md:font-medium text-white/85 md:text-white/70 group-hover:text-white/95 md:group-hover:text-white/90 leading-snug md:leading-[1.55] transition-colors duration-300">
                      {t(`releases.${release.id}.title`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Download className="h-4 w-4 text-[#9B9DFB]/70 md:text-white/20 group-hover:text-[#9B9DFB] md:group-hover:text-white/50 transition-colors duration-300" />
                    <span className="text-[12px] font-semibold text-[#9B9DFB]/70 md:text-white/25 tracking-[0.08em] uppercase group-hover:text-[#9B9DFB] md:group-hover:text-white/50 transition-colors duration-300">{t('cta2')}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Investors — animated marquee, same as About */}
        <section className="relative pt-8 pb-8 bg-black">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-6 block text-center">{t('text5')}</span>
          </div>
          <div
            className="overflow-hidden relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div className="marquee-track flex items-center">
              {[0, 1].map(set => (
                <div key={set} className="flex items-center gap-20 lg:gap-32 shrink-0 pr-20 lg:pr-32" aria-hidden={set === 1}>
                  {investors.map(inv => (
                    <div key={`${set}-${inv.name}`} className="flex items-center justify-center shrink-0">
                      <img
                        src={inv.src}
                        alt={inv.name}
                        className="object-contain"
                        style={{
                          filter: inv.customFilter || 'brightness(0) invert(1)',
                          opacity: 0.5,
                          height: inv.h,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Final CTA — dark */}
        <section className="relative pt-8 pb-24 lg:pb-32 bg-black">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="font-semibold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)' }}
              >{t('heading5')}</h2>
              <p className="text-[16px] text-white/[0.4] mb-10 max-w-xl mx-auto leading-[1.7]">{t('body2')}</p>
              <Button
                onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                variant="primary"
                mode="dark"
              >{t('cta3')}</Button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// @ts-nocheck
import React, { useRef } from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Brain, Shield, Cpu, Globe, Award, Users, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const stats = [
  { value: '€9M+', label: 'Raised', icon: Award },
  { value: '50+', label: 'Enterprise Clients', icon: Users },
  { value: '50+', label: 'Languages', icon: Globe },
  { value: '500K+', label: 'Assessments Delivered', icon: Brain },
];

const values = [
  { icon: Brain, title: 'Science, not gut feel', desc: 'Every assessment is grounded in psychometric science. Validated methodologies that predict real-world performance, not just test-taking ability.' },
  { icon: Cpu, title: 'AI that amplifies, not replaces', desc: 'We combine the rigour of psychometrics with the power of modern AI to deliver assessments that are personalised, scalable, and continuously improving.' },
  { icon: Shield, title: 'Built for European complexity', desc: 'GDPR, EU AI Act, multi-country operations, multi-language workforces. Designed for the regulatory and cultural complexity European enterprises face every day.' },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const isIT = router.locale === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/about`;
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  return (
    <>
      <Head>
        <title>{isIT ? 'Chi Siamo | Skillvue — Talent Science, Made in Europe' : 'About Us | Skillvue — Talent Science, Built in Europe'}</title>
        <meta name="description" content={isIT
          ? "Skillvue è una startup milanese che applica la scienza psicometrica e l'AI alle decisioni sul talento. €9M+ raccolti, 50+ clienti enterprise, 500K+ valutazioni."
          : 'Skillvue is a Milan-based startup applying psychometric rigour and AI to talent decisions. €9M+ raised, 50+ enterprise clients, 500K+ assessments delivered.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        {/* 1. Hero. Dark with blurred team photo background */}
        <section className="relative pt-[80px] min-h-screen flex items-center overflow-hidden">
          <img src="/assets/team-photo-2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.5]" style={{ filter: 'blur(8px)', transform: 'scale(1.05)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
              <span className="text-[14px] font-semibold text-[#4B4DF7]/60 tracking-[0.2em] uppercase mb-8 block">{t('About Us')}</span>
              <h1
                className="font-bold text-white/95 mb-8"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t('Every talent decision,')}<br />
                {t('finally backed by')}<br />
                <span className="gradient-text">{t('science.')}</span>
              </h1>
              <p className="text-[20px] text-white/[0.5] leading-[1.75] max-w-xl" style={{ fontWeight: 300 }}>
                {t("We're building the intelligence layer that makes hiring, promotion, development, and transformation decisions objective, predictive, and defensible at enterprise scale.")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Stats */}
        <section className="section-breathe py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    className="rounded-2xl border border-[#121212]/[0.04] bg-white p-6 hover:border-[#4B4DF7]/[0.12] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.03] transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Icon className="h-5 w-5 text-[#4B4DF7]/50 mb-4" />
                    <span className="block text-[#121212] font-bold text-[28px] tracking-[-0.03em] mb-1">{s.value}</span>
                    <span className="text-[13px] text-[#121212]/35">{t(s.label)}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Our Story */}
        <section className="section-breathe py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
                <div className="lg:col-span-5">
                  <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t('Our Story')}</span>
                  <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#121212] mb-8 tracking-[-0.02em] leading-[1.1]">
                    {t('We believe talent decisions deserve the same rigour as')} <span className="gradient-text-on-light">{t('business decisions.')}</span>
                  </h2>
                  <div className="border-l-2 border-[#4B4DF7]/30 pl-6 my-10">
                    <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                      "{t('Organizations spend billions on talent yet still rely on gut feeling for their most important people decisions. We are changing that.')}"
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[17px] text-[#121212]/[0.55] leading-[1.85] mb-8">
                    {t('Skillvue is an AI-powered talent intelligence platform that adds a dynamic, objective dimension to HR data, transforming static information into predictive insights that drive better decisions across hiring, performance management, internal mobility, and learning & development.')}
                  </p>
                  <p className="text-[17px] text-[#121212]/[0.55] leading-[1.85] mb-8">
                    {t("Founded in 2021, we've raised over €9 million from national and international investors to build a product that combines psychometric rigour with modern AI. Our team brings together experts in psychometrics, AI, product design, and enterprise go-to-market, operating out of Milan and London.")}
                  </p>
                  <p className="text-[17px] text-[#121212]/[0.55] leading-[1.85]">
                    {t('Leading European enterprises across retail, financial services, pharma, and professional services already trust Skillvue to make their most critical talent decisions objective, scalable, and defensible.')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. Team Photo. Dark section */}
        <section className="relative py-24 lg:py-32" ref={teamRef}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-white/95 mb-3 tracking-[-0.02em]">{t('Our Team')}</h2>
              <p className="text-[16px] text-white/[0.35] max-w-lg">{t('Psychometricians, AI engineers, designers, and product managers, united by one mission.')}</p>
            </motion.div>

            <motion.div
              className="rounded-3xl overflow-hidden relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img src="/assets/team-photo.jpg" alt="Skillvue Team" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-1000" style={{ maxHeight: '550px', objectPosition: 'center 30%' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 flex items-end justify-between">
                <div>
                  <span className="text-[24px] font-bold text-white/90 block mb-1">{t('+40 people')}</span>
                  <span className="text-[14px] text-white/50">{t('Milan, London & Berlin')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. Investors. Marquee scroll, right under team */}
        <section className="relative pt-4 pb-8">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <span className="text-[12px] font-bold text-white/25 tracking-[0.2em] uppercase mb-6 block text-center">{t('Backed by')}</span>
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
                  {[
                    { name: '360 Capital', src: '/logos/investor-360capital.png', h: '130px' },
                    { name: '14 Peaks', src: '/logos/investor-14peaks-new.svg', h: '60px' },
                    { name: 'Orbita', src: '/logos/investor-orbita.png', h: '60px' },
                    { name: 'Kfund', src: '/logos/investor-kfund.webp', h: '42px' },
                    { name: 'IFF', src: '/logos/iff_logo.svg', h: '80px', customFilter: 'grayscale(1) invert(1) brightness(1.2)' },
                    { name: 'Ithaca', src: '/logos/investor-ithaca.svg', h: '75px' },
                  ].map(inv => (
                    <div key={`${set}-${inv.name}`} className="flex items-center justify-center shrink-0">
                      <img src={inv.src} alt={inv.name} className="object-contain" style={{ filter: inv.customFilter || (inv.noFilter ? 'none' : 'brightness(0) invert(1)'), opacity: inv.noFilter ? 0.7 : 0.5, height: inv.h }} />
                    </div>
                  ))}
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. What Drives Us */}
        <section className="section-breathe" ref={valuesRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-16 lg:py-20 w-full">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-5 block">{t('Our Values')}</span>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-[#121212] tracking-[-0.02em]">{t('What Drives Us')}</h2>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    className="group rounded-2xl border border-[#4B4DF7]/[0.06] hover:border-[#4B4DF7]/[0.15] bg-white p-12 lg:p-14 transition-all duration-500 text-center hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.1] flex items-center justify-center mx-auto mb-10 group-hover:bg-[#4B4DF7]/[0.12] group-hover:border-[#4B4DF7]/[0.2] transition-all duration-500">
                      <Icon className="h-8 w-8 text-[#4B4DF7]/60 group-hover:text-[#4B4DF7] transition-colors duration-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-[#121212] mb-5 leading-tight">{t(v.title)}</h3>
                    <p className="text-[16px] text-[#121212]/[0.50] leading-[1.85]">{t(v.desc)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. CTA. Full dark section */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]">
                {t('Ready to make talent decisions you can defend?')}
              </h2>
              <p className="text-[16px] text-white/[0.4] mb-10 max-w-xl mx-auto leading-[1.7]">
                {t('Book a meeting with our team and see how Skillvue can transform your hiring, performance, and development processes.')}
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500">
                <span>{t('Book a Meeting')}</span>
                <ArrowRight className="h-4 w-4 ml-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

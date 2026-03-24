// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';

const metrics = [
  { value: 'Reduced', label: 'time-to-hire across all retail roles' },
  { value: 'Strategic', label: 'HR time recovered from pre-screening' },
  { value: 'Gen Z', label: 'candidate satisfaction improved' },
];

const sidebar = [
  { label: 'Industry', value: 'Fashion Retail' },
  { label: 'Employees', value: '50+ stores across Europe' },
  { label: 'Region', value: 'Italy + 5 European cities' },
  { label: 'Use Cases', value: 'Hiring & Screening (Store Manager, Sales Assistant)' },
  { label: 'Customer Since', value: '2024' },
];

const beforeItems = [
  "Key competencies (communication, selling, teamwork) invisible on a CV",
  "Only way to assess: interviews. Calendar blocked with back-to-back calls",
  "High volumes + lean HR team = long wait times for candidates",
  "Gen Z dropping off or choosing faster employers before process concludes",
  "Strategic HR work (employer branding, workforce planning) consistently sacrificed",
];

const afterItems = [
  "Algo Interview assesses communication, selling, teamwork before any human call",
  "Objective competency data on every candidate before scheduling interviews",
  "Calendar freed: interviews only with pre-validated candidates",
  "Shorter wait times reduce dropout for Gen Z applicants",
  "Time recovered reinvested into strategic HR work",
];

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}

export default function SubduedStoryPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          {/* Background image. blurred */}
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/subdued-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.4)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0,0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{t('Customers')}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Subdued</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <h1 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
                    {t('Winning Gen Z talent.')}<br />{t('Without drowning in interviews.')}
                  </h1>
                  <div className="flex flex-wrap gap-6 mb-12">
                    {metrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.65] mt-1 block">{t(m.label)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-l-2 border-[#4B4DF7]/30 pl-6">
                    <p className="text-[17px] text-white/[0.65] italic leading-[1.7]">"{t('It not only improves the quality of my work, it makes us very attractive to candidates. The innovation of the selection process became a genuine element of Employer Branding.')}"</p>
                    <p className="text-[14px] text-white/50 mt-3 font-semibold">Valentina Cianciaruso, <span className="font-normal text-white/35">{t('HR Manager Dept. Italy, Subdued')}</span></p>
                  </div>
                </motion.div>
              </div>

              <motion.div className="lg:col-span-4 lg:sticky lg:top-[100px] self-start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  <div className="divide-y divide-white/[0.08]">
                    {sidebar.map(s => (
                      <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{t(s.label)}</span>
                        <p className="text-[14px] text-white/[0.65] leading-[1.6]">{t(s.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        

        <section className="section-breathe relative py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* Context */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Context')}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { num: '50+', label: 'stores across Europe' },
                  { num: 'Gen Z', label: 'primary candidate pool' },
                  { num: 'Lean', label: 'HR team, multiple locations' },
                ].map(s => (
                  <div key={s.num} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/70 p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</span>
                    <span className="text-[13px] text-[#1A1A2E]/50 mt-2 block">{t(s.label)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl">
{                t('In fashion retail, turnover is structurally high and Gen Z candidates bring strong instincts but limited CV depth. For Store Managers and Sales Assistants, what matters most. communication, selling, teamwork. is invisible on a CV. The only way to assess it was interviews, creating an unsustainable equation for a lean HR team.')}
              </p>
            </Section>

            {/* Challenge. Before/After */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{t('The challenge')}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-10 max-w-3xl">
{                t('The calendar fills up with back-to-back interviews, wait times stretch, and strategic HR work gets consistently sacrificed.')}
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8">
                  <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-6 block">{t('Before')}</span>
                  <div className="space-y-5">
                    {beforeItems.map((item, i) => (
                      <div key={item} className="flex items-start gap-4">
                        <span className="text-[12px] font-bold text-[#1A1A2E]/30 shrink-0 mt-1 w-6">{String(i+1).padStart(2,'0')}</span>
                        <p className="text-[15px] text-[#1A1A2E]/50 leading-[1.6]">{t(item)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-[#4B4DF7]/[0.03] p-8">
                  <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">{t('With Skillvue')}</span>
                  <div className="space-y-5">
                    {afterItems.map((item, i) => (
                      <div key={item} className="flex items-start gap-4">
                        <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] shrink-0 mt-1 w-6">{String(i+1).padStart(2,'0')}</span>
                        <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{t(item)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Transformation. 3 steps */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-12">{t('The Transformation')}</h2>
              <div className="grid lg:grid-cols-3 gap-4 mb-10">
                {[
                  { step: '01', title: 'Co-design assessments', desc: "Valentina's team worked with Skillvue to select the right tests per role. Store Manager vs Sales Assistant with different competency weights" },
                  { step: '02', title: 'Algo Interview first', desc: 'Candidates complete a structured behavioural interview autonomously, from any device, within set days' },
                  { step: '03', title: 'Human where it matters', desc: 'HR reviews objective competency profiles, then invests interview time only in validated candidates' },
                ].map(s => (
                  <div key={s.step} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/60 p-6">
                    <span className="text-[12px] font-bold text-[#4B4DF7]/40 mb-3 block">{s.step}</span>
                    <h4 className="text-[16px] font-bold text-[#1A1A2E] mb-2">{t(s.title)}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.6]">{t(s.desc)}</p>
                  </div>
                ))}
              </div>
              <div className="border-l-2 border-[#4B4DF7]/20 pl-6 max-w-3xl">
                <p className="text-[15px] text-[#1A1A2E]/50 italic leading-[1.7]">"{t('Using Skillvue for competency evaluation at the pre-screening stage, I managed to reduce time-to-hire, maintain a direct relationship with candidates, and recover precious time for strategic activities I previously had to sacrifice.')}"</p>
                <p className="text-[13px] text-[#1A1A2E]/40 mt-2 font-semibold">Valentina Cianciaruso</p>
              </div>
            </Section>

            {/* Results */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Results')}</h2>
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { icon: 'Calendar freed', desc: 'Back-to-back screening interviews eliminated. Every human conversation now more productive.' },
                    { icon: 'Strategic time back', desc: 'Employer branding, workforce planning, talent development. no longer sacrificed to volume.' },
                    { icon: 'EB asset unlocked', desc: 'The hiring process itself became a talent attraction tool for Gen Z candidates.' },
                  ].map(r => (
                    <div key={r.icon} className="rounded-xl bg-white/[0.04] p-6">
                      <h4 className="text-[16px] font-bold text-white/90 mb-3">{t(r.icon)}</h4>
                      <p className="text-[14px] text-white/[0.65] leading-[1.7]">{t(r.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-[#4B4DF7]/20 pl-6 max-w-3xl">
                <p className="text-[15px] text-[#1A1A2E]/50 italic leading-[1.7]">"{t('I no longer have to squeeze one interview after another into my calendar. At first I had some doubts about such advanced technology, but I immediately understood that it not only improves my work quality. it made us very attractive to our candidates.')}"</p>
                <p className="text-[13px] text-[#1A1A2E]/40 mt-2 font-semibold">Valentina Cianciaruso</p>
              </div>
            </Section>

            {/* What's Next */}
            <Section className="mb-20">
              <div className="rounded-2xl border border-[#4B4DF7]/[0.1] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-10 lg:p-14">
                <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-6 w-6 text-[#4B4DF7]/50" />
                  </div>
                  <div>
                    <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{t("What's Next")}</h2>
                    <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-2xl">
{                      t('With an expanding European footprint. stores already in five major European cities alongside the Italian network. the ability to run a consistent, high-quality, technology-supported selection process across locations is not just an advantage. It is a prerequisite for growth.')}
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Science Note */}
            <Section>
              <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8 lg:p-10">
                <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">{t('The Science Behind It')}</span>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl bg-black/[0.03] p-6 text-center">
                    <span className="block text-[#1A1A2E]/30" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>14%</span>
                    <span className="text-[13px] text-[#1A1A2E]/40 mt-2 block">{t('Unstructured interviews')}<br />{t('predictive accuracy')}</span>
                  </div>
                  <div className="rounded-xl bg-[#4B4DF7]/[0.06] p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>51%+</span>
                    <span className="text-[13px] text-[#1A1A2E]/[0.65] mt-2 block">{t('Structured competency assessment')}<br />{t('predictive validity')}</span>
                  </div>
                </div>
                <button onClick={() => { router.push('/science'); window.scrollTo(0,0); }} className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#4B4DF7] hover:text-[#3A3BD6] transition-colors duration-300">
                  {t('Discover the Science')} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* Related Stories */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 mb-12">{t('Related Stories')}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[{ id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring', headline: '35% fewer days to hire. 30% better hires.' },
                { id: 'credem', company: 'Credem', tag: 'Financial Services · Hiring', headline: 'Time-to-hire halved. Twice the quality.' }].map(s => (
                <button key={s.id} onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0,0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{t(s.tag)}</span>
                  <h4 className="text-[24px] font-bold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{t(s.headline)}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    {t('Read the story')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SolutionFinalCTA headline={t("Ready to see what Skillvue can do for your")} accentWord={t("organization?")} />
      <Footer />
      </main>
    </>
  );
}

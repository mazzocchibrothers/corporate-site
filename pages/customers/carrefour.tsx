// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';

const metrics = [
  { value: '-35%', label: 'time-to-hire' },
  { value: '+30%', label: 'new hire success rate' },
  { value: '30K', label: 'CVs/year managed' },
];

const sidebar = [
  { label: 'Industry', value: 'Large-Scale Retail (GDO)' },
  { label: 'Employees', value: '18,000+' },
  { label: 'Region', value: 'Italy' },
  { label: 'Use Cases', value: 'Hiring & Screening, Internal Skills Mapping' },
  { label: 'Customer Since', value: '2024' },
];

const beforeItems = [
  '30,000 CVs/year with no objective competency layer at screening',
  'Video interviews in use, but no automated scoring output',
  'Team split across 3 sales channels + HQ: bandwidth at the limit',
  'Employer Branding and data analysis sacrificed to manage volume',
];

const afterItems = [
  'AI pre-screening for all candidatures with deep competency evaluation',
  "Carrefour's '4C' values model mapped onto Skillvue assessments",
  'HR team freed to focus on nurturing, data analysis, and Employer Branding',
  'Same framework extended to internal skills mapping',
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

export default function CarrefourStoryPage() {
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
            <img src="/logos/carrefour-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.4)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0,0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{t('Customers')}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Carrefour</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <h1 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
                    {t('35% fewer days to hire.')}<br />{t('30% better hires.')}
                  </h1>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-6 mb-12">
                    {metrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.65] mt-1 block">{t(m.label)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Opening quote */}
                  <div className="border-l-2 border-[#4B4DF7]/30 pl-6 mb-6">
                    <p className="text-[17px] text-white/[0.65] italic leading-[1.7]">{t('"Skillvue allowed us to strengthen our People Strategy, making skills mapping faster, more effective and data-driven. It is a fundamental ally for both standardizing selection and developing employee competencies."')}</p>
                    <p className="text-[14px] text-white/50 mt-3 font-semibold">Alessandro Mazzarol, <span className="font-normal text-white/35">{t('TA & EB Manager, Carrefour Italia')}</span></p>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
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

        

        {/* Context + Before/After + Transformation + Results + What's Next */}
        <section className="section-breathe relative py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* ===== THE CONTEXT ===== */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Context')}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { num: '1,200+', label: 'stores across Italy' },
                  { num: '18,000', label: 'employees' },
                  { num: '30,000', label: 'CVs per year' },
                  { num: '800', label: 'interviews conducted yearly' },
                ].map(s => (
                  <div key={s.num} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/70 p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</span>
                    <span className="text-[13px] text-[#1A1A2E]/50 mt-2 block">{t(s.label)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl">
                {t("Three sales channels and an HQ compete for the same HR bandwidth. The process was straining. and the recruiting team's most strategic activities were systematically deprioritized to manage the volume.")}
              </p>
            </Section>

            {/* ===== THE CHALLENGE ===== */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{t('The challenge')}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-10 max-w-3xl">
                {t('Assess more candidates, assess them more deeply, or do it faster. but never all three at once.')}
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

            {/* ===== THE TRANSFORMATION ===== */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-16">{t('The Transformation')}</h2>
              <div className="relative">
                {/* Animated timeline line */}
                <div className="hidden lg:block absolute top-[40px] left-[40px] right-[40px] h-px bg-[#4B4DF7]/[0.06]">
                  <motion.div
                    className="h-full bg-[#4B4DF7]/30 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                  {[
                    { step: '01', title: 'Map values to skills', desc: 'Joint exercise to translate 4C model into competency tests', delay: 0 },
                    { step: '02', title: 'Build assessments', desc: 'HR selects skill tests per role and channel from Skillvue library', delay: 0.6 },
                    { step: '03', title: 'Evaluate at scale', desc: 'Candidates complete evaluation from any device, AI provides detailed analysis', delay: 1.2 },
                  ].map((s) => (
                    <motion.div
                      key={s.step}
                      className="relative flex flex-col items-center text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: s.delay }}
                    >
                      <motion.div
                        className="relative z-10 w-[80px] h-[80px] rounded-full border-2 border-[#4B4DF7]/30 flex items-center justify-center bg-[#F5F5FA] mb-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: s.delay }}
                      >
                        <span className="text-[18px] font-bold text-[#4B4DF7]/70">{s.step}</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: s.delay + 0.2 }}
                      >
                        <h4 className="text-[18px] font-bold text-[#1A1A2E] mb-3">{t(s.title)}</h4>
                        <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.65] max-w-[280px]">{t(s.desc)}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ===== THE RESULTS ===== */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Results')}</h2>
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-3 gap-8">
                  {metrics.map(m => (
                    <div key={m.value} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[14px] text-white/[0.65] mt-3 block">{t(m.label)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    'More candidates evaluated more thoroughly',
                    'Technology absorbs analytical burden',
                    'Time recovered for Employer Branding',
                    'Framework extended to internal skills mapping',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#4B4DF7]/40 shrink-0" />
                      <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{t(item)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-l-2 border-[#4B4DF7]/20 pl-6">
                  <p className="text-[15px] text-[#1A1A2E]/50 italic leading-[1.7]">{t('"Candidates now look for companies with an absolute focus on values and competencies. Skillvue has proven to be a truly strategic ally in meeting this need."')}</p>
                  <p className="text-[13px] text-[#1A1A2E]/40 mt-2 font-semibold">Alessandro Mazzarol</p>
                </div>
              </div>
            </Section>

            {/* ===== WHAT'S NEXT. Forward-looking ===== */}
            <Section className="mb-20">
              <div className="rounded-2xl border border-[#4B4DF7]/[0.1] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-10 lg:p-14">
                <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-6 w-6 text-[#4B4DF7]/50" />
                  </div>
                  <div>
                    <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{t("What's Next")}</h2>
                    <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-6 max-w-2xl">
                      {t('Carrefour Italia is extending the Skillvue assessment framework to internal mobility. using the same skills language built for recruitment to identify internal candidates for promotion and lateral moves across the 3 sales channels.')}
                    </p>
                    <div className="border-l-2 border-[#4B4DF7]/20 pl-6">
                      <p className="text-[15px] text-[#1A1A2E]/50 italic leading-[1.7]">{t('"We\'ve decided to raise the bar further. creating a full parallel between selection and development teams. This will allow us to anticipate training and internal mobility needs."')}</p>
                      <p className="text-[13px] text-[#1A1A2E]/40 mt-2 font-semibold">Alessandro Mazzarol</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* ===== SCIENCE NOTE. Visual comparison ===== */}
            <Section>
              <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8 lg:p-10">
                <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">{t('The Science Behind It')}</span>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-6">
                  <div className="rounded-xl bg-black/[0.03] p-6 text-center">
                    <span className="block text-[#1A1A2E]/30" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>14%</span>
                    <span className="text-[13px] text-[#1A1A2E]/40 mt-2 block">{t('Unstructured interviews')}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[24px] text-[#4B4DF7]/40">→</span>
                  </div>
                  <div className="rounded-xl bg-[#4B4DF7]/[0.06] p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>51%+</span>
                    <span className="text-[13px] text-[#1A1A2E]/[0.65] mt-2 block">{t('Skillvue competency-based')}</span>
                  </div>
                </div>
                <p className="text-[14px] text-[#1A1A2E]/50 mb-4">{t('Predictive validity based on 100K+ validated responses (Schmidt & Hunter, 1998)')}</p>
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
              {[{ id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Hiring + Internal Mobility', headline: '~900 people assessed. A Store Manager pipeline built from within.' },
                { id: 'subdued', company: 'Subdued', tag: 'Retail Fashion · Hiring', headline: 'Winning Gen Z Talent Without Drowning in Interviews.' }].map(s => (
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

        {/* Final CTA */}
        <SolutionFinalCTA headline={t("Ready to see what Skillvue can do for your")} accentWord={t("organization?")} />
      <Footer />
      </main>
    </>
  );
}

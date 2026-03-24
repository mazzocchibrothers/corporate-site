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
  { value: '~900', label: 'AI assessments completed' },
  { value: '90', label: 'top talent identified' },
  { value: '95%', label: 'completion rate' },
];

const sidebar = [
  { label: 'Industry', value: 'GDO - Hard Discount' },
  { label: 'Revenue', value: '1.5 billion EUR' },
  { label: 'Employees', value: '4,200+' },
  { label: 'Stores', value: '570+' },
  { label: 'Region', value: 'Italy' },
  { label: 'Use Cases', value: 'Internal Mobility, Succession Planning, Hiring' },
];

const skills = ['People Orientation', 'Leadership', 'Resilience', 'Organization & Planning', 'Cognitive Flexibility', 'Goal Orientation'];

const businessPains = [
  { title: 'Expansion blocked', desc: 'New store openings at risk without qualified Store Managers ready and aligned to company culture' },
  { title: 'Store ROI at stake', desc: 'Every opening is a significant investment. without the right SM, stores underperform from day one' },
  { title: 'External dependency', desc: 'Chasing external hires: higher costs, longer onboarding, cultural mismatch risk' },
];

const hrPains = [
  { title: 'Invisible talent', desc: 'No objective visibility on capabilities of thousands of employees across 570+ stores' },
  { title: 'Fragmented evaluations', desc: 'Every manager evaluated with different criteria. two people with same potential, completely different paths' },
  { title: 'Reactive, not predictive', desc: 'Every key role to fill became an external recruitment process. Double cost: recruiting + losing internal talent' },
];

const funnel = [
  { label: 'Involved', value: '~1,000', width: '100%' },
  { label: 'Completed', value: '~900', width: '90%' },
  { label: 'Top Talent', value: '~90', width: '30%' },
  { label: 'Role-Ready (47%)', value: '~42', width: '18%' },
  { label: 'In Development (53%)', value: '~48', width: '20%' },
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

export default function InsMercatoStoryPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/insmercato-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.4)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0,0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{t('Customers')}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">In's Mercato</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <h1 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
                    {t('~900 people assessed.')}<br />{t('A Store Manager pipeline built from within.')}
                  </h1>
                  <div className="flex flex-wrap gap-6 mb-12">
                    {metrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.65] mt-1 block">{t(m.label)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-l-2 border-[#4B4DF7]/30 pl-6">
                    <p className="text-[17px] text-white/[0.65] italic leading-[1.7]">{t('"More agile, data-driven selection, with significant time savings for our teams."')}</p>
                    <p className="text-[14px] text-white/50 mt-3 font-semibold">Mirko Tortolano, <span className="font-normal text-white/35">{t("HR Director, In's Mercato")}</span></p>
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

        {/* Content */}
        <section className="section-breathe relative py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* Context */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Context')}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { num: '1.5B', label: 'EUR revenue' },
                  { num: '4,200+', label: 'employees' },
                  { num: '570+', label: 'stores across Italy' },
                  { num: 'Active', label: 'expansion plan (new openings)' },
                ].map(s => (
                  <div key={s.num} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/70 p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</span>
                    <span className="text-[13px] text-[#1A1A2E]/50 mt-2 block">{t(s.label)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl">
{                t('Without qualified Store Managers. ready, trained, culturally aligned. new stores risk underperforming from day one. Growth depends directly on having the right managerial talent when and where it is needed.')}
              </p>
            </Section>

            {/* Challenge. Business + HR split */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Challenge')}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8">
                  <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-6 block">{t('Business Impact')}</span>
                  <div className="space-y-6">
                    {businessPains.map(p => (
                      <div key={p.title}>
                        <h4 className="text-[15px] font-bold text-[#1A1A2E]/70 mb-1">{t(p.title)}</h4>
                        <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.6]">{t(p.desc)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-[#4B4DF7]/[0.03] p-8">
                  <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">{t('HR Reality')}</span>
                  <div className="space-y-6">
                    {hrPains.map(p => (
                      <div key={p.title}>
                        <h4 className="text-[15px] font-bold text-[#1A1A2E]/70 mb-1">{t(p.title)}</h4>
                        <p className="text-[14px] text-[#1A1A2E]/[0.65] leading-[1.6]">{t(p.desc)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Solution. Skills framework + setup */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Solution')}</h2>
              <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">
                <div>
                  <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-6">
{                    t('Skillvue enabled a structured assessment based on the soft skill framework Ins had already built for the Store Manager profile. ~1,000 employees assessed via mobile in ~30 minutes during work hours.')}
                  </p>
                  <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8]">
{                    t('Target population chosen without prior high-potential flags: sales associates with 18-48 months tenure. An objective picture of real talent. not a confirmation of existing impressions.')}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8">
                  <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.1em] uppercase mb-5 block">{t('6 Soft Skills Assessed')}</span>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map(s => (
                      <div key={s} className="rounded-lg bg-[#4B4DF7]/[0.04] px-4 py-3">
                        <span className="text-[13px] text-[#1A1A2E]/[0.65] font-medium">{t(s)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Results. Funnel visualization */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Results')}</h2>
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {metrics.map(m => (
                    <div key={m.value} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[14px] text-white/[0.65] mt-3 block">{t(m.label)}</span>
                    </div>
                  ))}
                </div>
                {/* Assessment funnel. clean stat cards */}
                <div className="grid grid-cols-5 gap-3">
                  {funnel.map((f, i) => (
                    <motion.div
                      key={f.label}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-5 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <span className="block text-white font-bold mb-2" style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>{f.value}</span>
                      <span className="text-[11px] text-white/40 leading-tight block">{t(f.label)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    { title: 'Internal pipeline built', desc: 'First-ever objective talent map across the entire store network' },
                    { title: 'Reactive to predictive', desc: 'People development now directly linked to expansion plan' },
                    { title: 'Cultural impact', desc: 'Participants shared the experience, generating positive perception of meritocracy' },
                    { title: 'Cross-functional mobility', desc: 'Opened paths not just vertical but across divisions (e.g. logistics)' },
                  ].map(item => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#4B4DF7]/40 mt-2 shrink-0" />
                      <div>
                        <span className="text-[14px] font-bold text-[#1A1A2E]/70">{t(item.title)}</span>
                        <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.5]">{t(item.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/60 p-5 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>47%</span>
                    <span className="text-[12px] text-[#1A1A2E]/50 mt-2 block">{t('Role-Ready')}<br />{t('(~42 profiles)')}</span>
                  </div>
                  <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/60 p-5 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>53%</span>
                    <span className="text-[12px] text-[#1A1A2E]/50 mt-2 block">{t('In Development')}<br />{t('(~48 profiles)')}</span>
                  </div>
                </div>
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
                    <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-[#1A1A2E] mb-6 leading-[1.2]">{t('2026: From Internal Development to Integrated Talent Strategy')}</h2>
                    <div className="space-y-4 mb-6">
                      {[
                        'Same framework from hiring to development. every person evaluated with one consistent logic from day one',
                        'WhatsApp-based assessment: in GDO, this is strategic. removes every access barrier',
                        'Extending evaluation to current Store Managers to identify Area Manager readiness',
                        'Selection, development, and training integrated into one continuous talent strategy',
                      ].map(item => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4B4DF7]/40 mt-2 shrink-0" />
                          <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{t(item)}</p>
                        </div>
                      ))}
                    </div>
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
              {[{ id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO \u00b7 Hiring', headline: '35% fewer days to hire. 30% better hires.' },
                { id: 'subdued', company: 'Subdued', tag: 'Fashion Retail \u00b7 Hiring', headline: 'Winning Gen Z Talent Without Drowning in Interviews.' }].map(s => (
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

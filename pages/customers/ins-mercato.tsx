// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';

const heroMetrics = [
  { value: '~1,000', label: 'Employees involved' },
  { value: '95%', label: 'Completion rate' },
  { value: '~90', label: 'Top Talent identified' },
  { value: '47%', label: 'Role-Ready' },
  { value: '6', label: 'Soft skills assessed' },
];

const sidebar = [
  { label: 'Industry', value: 'GDO - Hard Discount' },
  { label: 'Revenue', value: '€1.5B' },
  { label: 'Employees', value: '4,200+' },
  { label: 'Stores', value: '570+' },
  { label: 'Region', value: 'Italy' },
  { label: 'Use Cases', value: 'Internal Mobility, Succession Planning' },
];

const skills = ['Customer Orientation', 'Leadership', 'Resilience', 'Organization & Planning', 'Cognitive Flexibility', 'Goal Orientation'];

const businessPains = [
  {
    title: 'Expansion held back by Store Manager shortage',
    desc: 'An active new opening plan, but without qualified, ready, and culturally aligned managerial talent, every new store risks underperforming.',
  },
  {
    title: 'Store performance and return on investment',
    desc: 'Every new opening is a significant investment: without the right Store Manager to lead it, that store doesn\'t reach its potential. Failing to identify high-value people in time means compromising profitability.',
  },
  {
    title: 'Dependence on external hiring',
    desc: 'Chasing demand through external recruitment means higher costs, longer onboarding times, and a real risk of cultural mismatch — in a sector where finding experienced profiles is increasingly difficult.',
  },
];

const hrPains = [
  {
    title: 'Invisible talent across the network',
    desc: 'No objective visibility into the competencies of thousands of sales associates distributed across 570+ stores: decisions on potential were based on sales numbers and subjective perceptions.',
  },
  {
    title: 'Fragmented and non-comparable evaluations',
    desc: 'Each store manager assessed with their own criteria, each area operated with different standards: two people with the same potential could have completely different career paths — not based on merit, but on geographic luck.',
  },
  {
    title: 'Reactive talent management, not predictive',
    desc: 'Without structured visibility on internal potential, every key position to fill turned into an external recruitment process. A double cost: time and investment to recruit, plus the risk of losing unrecognized talent already in the company.',
  },
];

const methodologyCards = [
  {
    title: 'Mobile-first assessment',
    text: '~30 minutes from a smartphone, completed during paid working hours. 1,000 people involved across 570 stores.',
  },
  {
    title: 'Neutral baseline',
    text: 'Target population selected without prior high-potential nominations: sales associates with 18–48 months of tenure. An objective snapshot of real talent, not a confirmation of existing impressions.',
  },
  {
    title: 'Communication as an engagement lever',
    text: 'A paid activity, completed during working hours, and positioned as an investment in professional development. Not an exam, but an opportunity — with a direct impact on participation rates and positive perception of the entire project.',
  },
];

const funnel = [
  { label: 'Involved', value: '~1,000' },
  { label: 'Assessments completed', value: '~900' },
  { label: 'Top Talent identified', value: '~90' },
  { label: 'Role-Ready (47%)', value: '~42' },
  { label: 'In Development (53%)', value: '~48' },
];

const impactCards = [
  {
    title: 'Internal pipeline built',
    text: 'For the first time, In\'s has an objective map of potential across the network and can plan openings with the certainty of having qualified talent available.',
  },
  {
    title: 'From reactive to predictive',
    text: 'People development has been directly linked to the real estate expansion plan: the internal pipeline becomes a business asset that enables growth.',
  },
  {
    title: 'Significant cultural impact',
    text: 'Participants who attended in-person sessions returned to their stores sharing the experience, generating a positive ripple effect and a perception of meritocracy.',
  },
  {
    title: 'Internal mobility unlocked',
    text: 'The project opened not only vertical opportunities (sales associate → Store Manager) but also lateral moves across divisions, for example into logistics roles at distribution centers.',
  },
];

const visionBullets = [
  'Same criteria and competency framework from hiring to development: new hires are assessed from day one with the same logic used to develop them',
  'Assessment via WhatsApp: in grocery retail this isn\'t a convenience choice, it\'s a strategic one. It removes every barrier to access and drives completion rates that other tools can\'t match',
  'Extending assessment to current Store Managers to identify profiles ready for the Area Manager role',
  'Hiring, development, and training integrated into one continuous system. No longer separate processes, but a single talent strategy that works as a business asset',
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
  const { t, lang } = useLanguage();

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
                  <h1 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-[-0.03em] text-white/95 mb-6" style={{ lineHeight: 1.12 }}>
                    {lang === 'it'
                      ? <>Come In's Mercato ha costruito una <span className="italic gradient-text">pipeline interna</span> di Store Manager</>
                      : <>How In's Mercato built an <span className="italic gradient-text">internal pipeline</span> of Store Managers</>
                    }
                  </h1>
                  <p className="text-[17px] text-white/[0.65] leading-[1.7] mb-10 max-w-2xl">
                    {lang === 'it'
                      ? "La crescita della rete dipende dalla capacità di avere figure manageriali formate nel momento in cui servono. Con Skillvue, In's ha trasformato la gestione del talento da reattiva a predittiva."
                      : "Network growth depends on having trained managerial talent ready when it's needed. With Skillvue, In's transformed talent management from reactive to predictive."
                    }
                  </p>
                  <div className="flex flex-wrap gap-4 mb-12">
                    {heroMetrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                        <span className="block text-white" style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[12px] text-white/[0.55] mt-1 block">{t(m.label)}</span>
                      </div>
                    ))}
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-6">{t('The Context')}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl mb-6">
                {lang === 'it'
                  ? "In's Mercato è una delle principali insegne hard discount italiane, con 1,5 miliardi di fatturato, oltre 4.200 dipendenti e più di 570 punti vendita. Il piano di nuove aperture crea un vincolo operativo preciso: senza Store Manager qualificati e allineati alla cultura aziendale, i nuovi negozi rischiano di sottoperformare."
                  : "In's Mercato is one of Italy's leading hard discount grocery chains, with €1.5 billion in revenue, over 4,200 employees, and a network of more than 570 stores. The company is in a phase of aggressive real estate expansion, with a new store opening plan that creates a clear operational constraint: without qualified Store Managers who are ready and fully aligned with the company culture, new stores risk underperforming. Network growth depends directly on having trained managerial talent available when it's needed."
                }
              </p>
              <div className="rounded-xl border border-[#4B4DF7]/[0.1] bg-[#4B4DF7]/[0.03] px-8 py-6 max-w-3xl">
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.7] italic">
                  {lang === 'it'
                    ? "Il progetto ha trasformato la gestione del talento da reattiva a predittiva, collegando direttamente la people strategy al piano di espansione: ogni nuova apertura può ora contare su una pipeline interna di figure pronte, invece di rincorrere il fabbisogno sul mercato esterno."
                    : "The project transformed talent management from reactive to predictive, directly linking the people strategy to the expansion plan: every new opening can now count on an internal pipeline of ready talent, instead of chasing demand on the external market."
                  }
                </p>
              </div>
            </Section>

            {/* Challenge */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-6">{t('The Challenge')}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl mb-10">
                {lang === 'it'
                  ? "In's Mercato è un'azienda in forte crescita. Con oltre 570 punti vendita e un piano di sviluppo immobiliare attivo, il business aveva un vincolo operativo che precedeva qualsiasi considerazione HR."
                  : "In's Mercato is a fast-growing company. With over 570 stores and an active real estate development plan, the business faced an operational constraint that preceded any HR consideration."
                }
              </p>
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

            {/* Solution */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-6">{t('The Solution')}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl mb-10">
                {lang === 'it'
                  ? "Skillvue ha abilitato un assessment strutturato, basato sul framework di soft skill che In's aveva già costruito internamente per il profilo di Store Manager."
                  : "Skillvue enabled a structured assessment based on the soft skill framework that In's had already built internally for the Store Manager profile."
                }
              </p>
              <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">
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
                <div className="space-y-4">
                  {methodologyCards.map(card => (
                    <div key={card.title} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/50 p-6">
                      <h4 className="text-[14px] font-bold text-[#1A1A2E]/70 mb-2">{t(card.title)}</h4>
                      <p className="text-[13px] text-[#1A1A2E]/50 leading-[1.6]">{t(card.text)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Results */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{t('The Results')}</h2>
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                {/* Funnel */}
                <div className="grid grid-cols-5 gap-3 mb-10">
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
                {/* Role split */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-6 text-center">
                    <span className="block text-white" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>47%</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block">{t('Role-Ready')} <span className="text-white/30">(~42 {t('profiles')})</span></span>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-6 text-center">
                    <span className="block text-white" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>53%</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block">{t('In Development')} <span className="text-white/30">(~48 {t('profiles')})</span></span>
                  </div>
                </div>
                <p className="text-[12px] text-white/20 mt-4 text-center">
                  {lang === 'it'
                    ? 'Completamento al netto delle cause esterne (dimissioni, malattia). 48 non terminate per cause esterne.'
                    : 'Completion rate net of external causes (resignations, sick leave). 48 not completed due to external causes.'
                  }
                </p>
              </div>

              {/* Impact cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {impactCards.map(card => (
                  <div key={card.title} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/60 p-6">
                    <h4 className="text-[15px] font-bold text-[#1A1A2E]/70 mb-2">{t(card.title)}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.6]">{t(card.text)}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Future Vision */}
            <Section className="mb-20">
              <div className="rounded-2xl border border-[#4B4DF7]/[0.1] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-10 lg:p-14">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.08)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  {lang === 'it' ? 'EVOLUZIONE 2026' : 'EVOLUTION 2026'}
                </span>
                <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-[#1A1A2E] mb-4 leading-[1.2]">
                  {lang === 'it' ? 'Da sviluppo interno a talent strategy integrata' : 'From internal development to integrated talent strategy'}
                </h2>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.7] mb-8 max-w-2xl">
                  {lang === 'it'
                    ? "Quando l'assessment sullo sviluppo interno ha iniziato a produrre risultati concreti e scalabili, la scelta naturale è stata estenderlo anche alla selezione esterna, eliminando la discontinuità tra \"chi cerchiamo\" e \"come lo facciamo crescere\"."
                    : "When the internal development assessment began delivering concrete, scalable results, the natural next step was extending it to external hiring — eliminating the gap between \"who we're looking for\" and \"how we develop them.\""
                  }
                </p>
                <div className="space-y-4">
                  {visionBullets.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4B4DF7]/40 mt-2 shrink-0" />
                      <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{t(item)}</p>
                    </div>
                  ))}
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
              {[
                { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring', headline: '35% fewer days to hire. 30% better hires.' },
                { id: 'subdued', company: 'Subdued', tag: 'Fashion Retail · Hiring', headline: 'Winning Gen Z Talent Without Drowning in Interviews.' },
              ].map(s => (
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

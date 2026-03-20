// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

const metrics = [
  { value: '-50%', label: 'time-to-hire' },
  { value: '+50%', label: 'fit-to-hire at interview' },
  { value: '-15%', label: 'candidates to interview (better qualified)' },
];

const sidebar = [
  { label: 'Industry', value: 'Financial Services (Banking)' },
  { label: 'Employees', value: '5,000+' },
  { label: 'Region', value: 'Italy (19 regions, 600+ branches)' },
  { label: 'Use Cases', value: 'Hiring & Screening' },
  { label: 'Customer Since', value: '2024' },
];

const beforeItems = [
  '30,000 candidatures/year with first step not selective enough',
  'Strong candidates. often young, limited CV depth. lost in the volume',
  'Selection timelines too long: best profiles moved on before process concluded',
  'Interview stage crowded with candidates not genuinely fit to hire',
];

const afterItems = [
  'Skillvue deployed after CV collection: deeper evaluation, same bandwidth',
  '-15% candidates advancing to interview, but dramatically better qualified',
  'Time-to-hire halved: faster response, fewer pipeline dropouts',
  '+50% of candidates reaching interview are fit to hire',
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

export default function CredemStoryPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          {/* Background image. blurred */}
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/credem-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.4)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0,0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">Customers</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Credem</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <h1 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
                    Time-to-hire halved.<br />Twice the quality.
                  </h1>
                  <div className="flex flex-wrap gap-6 mb-12">
                    {metrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.65] mt-1 block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-l-2 border-[#4B4DF7]/30 pl-6">
                    <p className="text-[17px] text-white/[0.65] italic leading-[1.7]">"We gave more candidates a chance to prove their abilities, making our search for high-potential talent much more effective. All while cutting time-to-hire by 50%."</p>
                    <p className="text-[14px] text-white/50 mt-3 font-semibold">Giuliana Barigazzi, <span className="font-normal text-white/35">HR Recruiter, Credem</span></p>
                  </div>
                </motion.div>
              </div>

              <motion.div className="lg:col-span-4 lg:sticky lg:top-[100px] self-start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  <div className="divide-y divide-white/[0.08]">
                    {sidebar.map(s => (
                      <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[14px] text-white/[0.65] leading-[1.6]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        

        {/* Content sections */}
        <section className="section-breathe relative py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* Context. 4 stat cards + short text */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">The Context</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { num: '5,000+', label: 'employees' },
                  { num: '19', label: 'regions across Italy' },
                  { num: '600+', label: 'branches' },
                  { num: '30K', label: 'candidatures per year' },
                ].map(s => (
                  <div key={s.num} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/70 p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</span>
                    <span className="text-[13px] text-[#1A1A2E]/50 mt-2 block">{s.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-3xl">
                One of Italy's most established banking groups. Every year, 30,000 candidatures arrive. mostly young professionals entering the job market. The challenge wasn't volume. It was finding the high-potential profiles hidden inside it.
              </p>
            </Section>

            {/* Challenge. Before/After with visual funnel concept */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">The challenge</h2>
              <p className="text-[18px] text-[#1A1A2E]/50 leading-[1.6] mb-12 max-w-3xl italic">
                The first screening filter wasn't selective enough. Strong candidates got lost in the volume.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8">
                  <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-6 block">Before</span>
                  <div className="space-y-5">
                    {beforeItems.map((item, i) => (
                      <div key={item} className="flex items-start gap-4">
                        <span className="text-[12px] font-bold text-[#1A1A2E]/30 shrink-0 mt-1 w-6">{String(i+1).padStart(2,'0')}</span>
                        <p className="text-[15px] text-[#1A1A2E]/50 leading-[1.6]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-[#4B4DF7]/[0.03] p-8">
                  <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">With Skillvue</span>
                  <div className="space-y-5">
                    {afterItems.map((item, i) => (
                      <div key={item} className="flex items-start gap-4">
                        <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] shrink-0 mt-1 w-6">{String(i+1).padStart(2,'0')}</span>
                        <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Transformation. Visual step flow */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-12">The Transformation</h2>
              <div className="grid lg:grid-cols-4 gap-4 mb-10">
                {[
                  { step: '01', title: 'Gradual rollout', desc: 'Validate impact with real data before scaling' },
                  { step: '02', title: 'Deploy after CV', desc: 'Skillvue added right after CV collection for deeper evaluation' },
                  { step: '03', title: 'Library per role', desc: 'Competency tests selected from Skillvue Library for each target' },
                  { step: '04', title: 'AI surfaces talent', desc: 'Candidates self-complete. AI provides clear competency profiles' },
                ].map(s => (
                  <div key={s.step} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/60 p-6 text-center">
                    <span className="text-[28px] font-bold text-[#4B4DF7]/20 block mb-3">{s.step}</span>
                    <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{s.title}</h4>
                    <p className="text-[13px] text-[#1A1A2E]/50 leading-[1.6]">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="border-l-2 border-[#4B4DF7]/20 pl-6 max-w-3xl">
                <p className="text-[15px] text-[#1A1A2E]/50 italic leading-[1.7]">"For organizations like ours, managing truly significant candidate volumes, integrating technological support like Skillvue into the selection process is fundamental to exponentially increasing results. both qualitatively and quantitatively."</p>
                <p className="text-[13px] text-[#1A1A2E]/40 mt-2 font-semibold">Daniele Candiani, <span className="font-normal">TA & EB Manager, Credem</span></p>
              </div>
            </Section>

            {/* Results. Before/After comparison numbers + dark panel */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">The Results</h2>
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-3 gap-6 mb-10">
                  {metrics.map(m => (
                    <div key={m.value} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[14px] text-white/[0.65] mt-3 block">{m.label}</span>
                    </div>
                  ))}
                </div>
                {/* Before/After comparison row */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Interview quality', before: 'Crowded with unfit candidates', after: '+50% fit-to-hire at interview stage' },
                    { label: 'Employer brand', before: 'Long, opaque process', after: 'Faster, inclusive. measurably improved perception' },
                  ].map(row => (
                    <div key={row.label} className="rounded-xl bg-white/[0.04] p-5">
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-3">{row.label}</span>
                      <p className="text-[13px] text-white/35 line-through mb-2">{row.before}</p>
                      <p className="text-[13px] text-white/[0.65]">{row.after}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-[#4B4DF7]/20 pl-6 max-w-3xl">
                <p className="text-[15px] text-[#1A1A2E]/50 italic leading-[1.7]">"Today, thanks to Skillvue, we include more people in the first phase while conducting a more effective and selective analysis. saving time in subsequent stages."</p>
                <p className="text-[13px] text-[#1A1A2E]/40 mt-2 font-semibold">Alessandro Bonsignori, <span className="font-normal">HR Training Manager, Credem</span></p>
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
                    <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">What's Next</h2>
                    <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] max-w-2xl">
                      Now that the value has been proven, Credem is extending Skillvue to the full organization. The same level of quality and selectivity will become the standard for all selection processes. bringing consistent, objective competency evaluation to every hire across 19 regions and 600+ branches.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Science Note */}
            <Section>
              <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8 lg:p-10">
                <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">The Science Behind It</span>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl bg-black/[0.03] p-6 text-center">
                    <span className="block text-[#1A1A2E]/30" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>14%</span>
                    <span className="text-[13px] text-[#1A1A2E]/40 mt-2 block">Unstructured interviews<br />predictive accuracy</span>
                  </div>
                  <div className="rounded-xl bg-[#4B4DF7]/[0.06] p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>50%+</span>
                    <span className="text-[13px] text-[#1A1A2E]/[0.65] mt-2 block">Structured competency assessment<br />predictive validity</span>
                  </div>
                </div>
                <button onClick={() => { router.push('/science'); window.scrollTo(0,0); }} className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#4B4DF7] hover:text-[#3A3BD6] transition-colors duration-300">
                  Discover the Science <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* Related Stories */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 mb-12">Related Stories</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[{ id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring', headline: '35% fewer days to hire. 30% better hires. Zero additional headcount.' },
                { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Hiring + Internal Mobility', headline: '~900 people assessed. A Store Manager pipeline built from within.' }].map(s => (
                <button key={s.id} onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0,0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{s.tag}</span>
                  <h4 className="text-[24px] font-bold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{s.headline}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    Read the story <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SolutionFinalCTA headline="Ready to see what Skillvue can do for your" accentWord="organization?" />
      <Footer />
      </main>
    </>
  );
}

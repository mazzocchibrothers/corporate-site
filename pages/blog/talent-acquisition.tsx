// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, Search, Building2, Users, BarChart3, GitBranch, Target } from 'lucide-react';
import { useRouter } from 'next/router';

const differences = [
  { dimension: 'Approach', recruiting: 'Reactive — responds to an open vacancy', ta: 'Strategic — starts from competency mapping' },
  { dimension: 'Time Horizon', recruiting: 'Short term — fill the position quickly', ta: 'Medium-long term — build lasting capabilities' },
  { dimension: 'Key Metrics', recruiting: 'Time-to-hire, volume of applications', ta: 'Quality-of-hire, retention, performance over time' },
  { dimension: 'Decision Basis', recruiting: 'CV, experience, interview impressions', ta: 'Structured data on skills, potential, behaviors' },
];

const strategySteps = [
  { icon: Search, title: 'Start from competencies, not job titles', desc: 'A solid talent acquisition strategy always begins with: which competencies are truly needed to make work function today and in the coming months? Working on critical competencies lets you anticipate future needs.' },
  { icon: Building2, title: 'Align recruiting and employer branding', desc: 'If what you communicate externally doesn\'t reflect the real way of working, you\'ll attract misaligned candidates and increase early turnover risk. Coherence between messages, declared values, and observable behaviors is key.' },
  { icon: Users, title: 'Build a talent pipeline over time', desc: 'Talent acquisition doesn\'t start when a position opens, but much earlier. Cultivate relationships with potentially relevant professionals even without an immediate need.' },
  { icon: BarChart3, title: 'Use data and objective evaluations', desc: 'A mature strategy doesn\'t rely on intuitions or interview impressions but on comparable data and clear criteria. Integrate objective evaluations of competencies, potential, and observable behaviors.' },
  { icon: GitBranch, title: 'Connect talent acquisition and internal development', desc: 'Before looking for new people externally, ask whether some competencies are already present in-house or developable through targeted upskilling and reskilling paths.' },
  { icon: Target, title: 'Measure what truly matters', desc: 'Monitoring only time-to-hire risks rewarding speed at the expense of quality. Indicators like quality-of-hire, performance over time, and retention give a much more useful reading.' },
];

export default function BlogArticle9() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1726842172813-55c6e284f8b5?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Talent Acquisition</span>
                <span className="text-[13px] text-white/35">February 12, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 13 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                Talent Acquisition: What It Is, How It Works, Why It Matters
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                How many hires, despite being "right on paper," start showing cracks after a few months? The role is covered, the CV was coherent, the interview went well... and yet.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">What Is Talent Acquisition (and Why It's Not Just Recruiting)</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Talent acquisition is the set of strategies and processes through which a company identifies, attracts, evaluates, and develops the people it will need not only today, but also in the future. The difference from traditional recruiting lies primarily in the level of <strong className="text-[#1A1A2E]/80">intentionality</strong>.
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Recruiting is often tactical: it responds to an open vacancy, works on timing and volumes. Talent acquisition, instead, is strategic: it starts from understanding which competencies are critical for the organization, which will become so, and how to build over time a pool of people capable of sustaining them.
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  "The horizon is not the single hire but the medium-long term. Decisions aren't based only on what's needed today, but on how a role might evolve and what kind of contribution a person can make over time."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">Talent Acquisition vs Recruiting: The Differences</h2>
              <div className="overflow-x-auto my-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#1A1A2E]/[0.08]">
                      <th className="py-3 pr-4 text-[12px] font-bold text-[#1A1A2E]/40 tracking-[0.1em] uppercase">Dimension</th>
                      <th className="py-3 pr-4 text-[12px] font-bold text-[#1A1A2E]/40 tracking-[0.1em] uppercase">Recruiting</th>
                      <th className="py-3 text-[12px] font-bold text-[#4B4DF7]/60 tracking-[0.1em] uppercase">Talent Acquisition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {differences.map((d, i) => (
                      <tr key={i} className="border-b border-[#1A1A2E]/[0.04]">
                        <td className="py-4 pr-4 text-[14px] font-semibold text-[#1A1A2E]/70">{d.dimension}</td>
                        <td className="py-4 pr-4 text-[14px] text-[#1A1A2E]/[0.45]">{d.recruiting}</td>
                        <td className="py-4 text-[14px] text-[#1A1A2E]/[0.65] font-medium">{d.ta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">How to Build an Effective Strategy</h2>
              <div className="space-y-0">
                {strategySteps.map((s, i) => {
                  return (
                    <motion.details
                      key={s.title}
                      className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                        <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                        <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{s.title}</span>
                        <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                      </summary>
                      <div className="pl-12 pb-6">
                        <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8]">{s.desc}</p>
                      </div>
                    </motion.details>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  Through rapid, standardized Skill Assessments, Skillvue helps you evaluate candidates on clear, comparable criteria using BEI-based situational questions, targeted hard skill tests, and indicators on potential, autonomy, and learning ability. Shift selection from a comparison of CVs and impressions to a structured evaluation of competencies, behaviors, and potential.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">Discover Skillvue</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                Build a talent pipeline based on <span className="italic gradient-text">real competencies.</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Improve quality-of-hire with structured, objective skill assessments.
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-9 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500">
                <span>Book a Meeting</span>
                <ArrowRight className="h-4 w-4 ml-8 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

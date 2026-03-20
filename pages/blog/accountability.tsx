// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, AlertTriangle, CheckCircle, Settings, MessageSquare, Users, Layers } from 'lucide-react';
import { useRouter } from 'next/router';

const scenarios = [
  { context: 'A deliverable is late', low: '"It wasn\'t up to me." "I was missing information." "Nobody told me it was urgent."', high: '"We missed the deadline, this impacts X. The reason is Y. Going forward I propose Z and I\'m taking charge of recovery."' },
  { context: 'Two urgent requests from different stakeholders', low: 'Executes in order of arrival, or waits for someone else to decide what comes first.', high: 'Verifies real impacts and urgencies, makes the trade-off explicit, proposes a choice, aligns with the manager when needed.' },
  { context: 'New project with no clear owner', low: 'Waits for a point person to be named. Meanwhile, doesn\'t move.', high: 'Calls stakeholders, proposes an initial scope and responsibility split, kicks off rapid alignment.' },
  { context: 'A team deliverable depends on multiple people', low: '"I did my part" even if the final result doesn\'t arrive.', high: 'Follows progress of dependencies, escalates, realigns, and flags risks on the overall result in advance.' },
];

const levers = [
  { num: '01', title: 'Clarity on Expectations & KPIs', icon: Settings, desc: 'People must know which results are priority, which metrics will be used, and within which boundaries they can decide autonomously.' },
  { num: '02', title: 'Continuous Feedback', icon: MessageSquare, desc: 'Accountability strengthens with timely feedback. Move from judgmental ("you weren\'t responsible enough") to behavioral ("in that situation, you waited instead of proposing a solution").' },
  { num: '03', title: 'Delegation, Not Micro-management', icon: Layers, desc: 'Real delegation transfers not just the activity, but the decision-making space. This means accepting some margin for error.' },
  { num: '04', title: 'Role-Competency Alignment', icon: Users, desc: 'Accountability is sustainable only if the person has the skills to exercise it. If the role exceeds capability, you generate freeze or defense.' },
];

export default function BlogArticle4() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1545005785-a4a5554b8efe?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Culture</span>
                <span className="text-[13px] text-white/35">February 27, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 11 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                What Is Accountability and Why It Improves Work Performance
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                When a project stalls, a deadline slips, or an error bounces between functions with nobody taking ownership, the missing word is often just one: accountability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Definition */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">What Is Accountability, Really?</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                The most common translation is "responsibility." In a company, though, this equivalence is misleading. <strong className="text-[#1A1A2E]/80">Responsibility can be assigned. Accountability cannot.</strong>
              </p>

              <div className="grid md:grid-cols-3 gap-3 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#1A1A2E] mb-2">Delegation</h3>
                  <p className="text-[13px] text-[#1A1A2E]/[0.45] leading-[1.6]">Transfer of a task to another person</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#1A1A2E] mb-2">Ownership</h3>
                  <p className="text-[13px] text-[#1A1A2E]/[0.45] leading-[1.6]">Sense of ownership over a project or result</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.03] p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#4B4DF7]">Accountability</h3>
                  <p className="text-[13px] text-[#1A1A2E]/[0.55] leading-[1.6]">Full ownership of decisions and consequences, even in ambiguity</p>
                </div>
              </div>

              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-14 tracking-[-0.02em]">The Link to Performance</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                When accountability is missing: responsibility shifting, deferred decisions, implicit conflicts. Performance drops not just from operational inefficiency, but because <strong className="text-[#1A1A2E]/80">ambiguity increases</strong>.
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  "Accountability reduces the organizational cost of ambiguity."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Low vs High — Clean editorial format */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 tracking-[-0.02em]">Recognizing Accountability in Daily Work</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-10">
                Four scenarios. Two behaviors. Which one do you see in your organization?
              </p>

              <div className="space-y-0">
                {scenarios.map((s, i) => (
                  <motion.details
                    key={i}
                    className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                      <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{s.context}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6 space-y-3">
                      <div className="rounded-xl border border-[#1A1A2E]/[0.04] bg-[#1A1A2E]/[0.02] p-4">
                        <span className="text-[11px] font-bold text-[#1A1A2E]/30 tracking-[0.08em] uppercase mb-1.5 block">Low accountability</span>
                        <p className="text-[14px] text-[#1A1A2E]/[0.45] leading-[1.7] italic">{s.low}</p>
                      </div>
                      <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-4">
                        <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.08em] uppercase mb-1.5 block">High accountability</span>
                        <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7] italic">{s.high}</p>
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
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">How to Develop Accountability</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-8">
                Accountability isn't imposed through internal communications or ethics codes. It's built through coherent organizational choices. Four operational levers:
              </p>
              <div className="space-y-3">
                {levers.map((l) => {
                  const Icon = l.icon;
                  return (
                    <div key={l.num} className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#4B4DF7]/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-[#4B4DF7]/60" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-1.5">{l.title}</h3>
                        <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">{l.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-12">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  Through skill assessments based on psychometric science, situational questions, and BEI methodology, Skillvue observes how a person reasons and decides in realistic organizational scenarios, distinguishing between declared responsibility and real accountability.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">Discover Skillvue</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                Reduce the risk of promoting based on <span className="italic gradient-text">impressions.</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Integrate skill assessment into your evaluation process for more solid and sustainable decisions.
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

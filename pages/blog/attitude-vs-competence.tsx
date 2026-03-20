// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { useRouter } from 'next/router';

const whenAttitude = [
  'The role is junior or entry-level',
  'The context is evolving or growing rapidly',
  'There is time for structured onboarding',
  'There is strong investment in L&D programs',
];

const whenCompetence = [
  'The role is critical or high-impact',
  'Consolidated technical skills are required',
  'Immediate performance impact is needed',
  'The team cannot absorb a long learning curve',
];

const methods = [
  { num: '01', title: 'Behavioral Event Interview (BEI)', desc: 'Instead of asking "how would you behave," ask for a concrete episode. Analyze the process: what decisions were made, what alternatives were considered, what impact the action had.' },
  { num: '02', title: 'Situational Questions', desc: 'Present realistic scenarios to understand how the candidate reasons. You\'re not looking for the "perfect" answer, but the structure of their reasoning: problem analysis, constraint management, decision criteria.' },
  { num: '03', title: 'Behavioral Evidence', desc: 'A competence must be supported by observable behaviors. The candidate must describe: a specific goal, actions taken, results obtained, metrics used.' },
  { num: '04', title: 'Practical Tests', desc: 'When possible, integrate technical tests or simulated tasks. A case study, a simulation, a practical exercise that allows you to directly observe competence in action.' },
];

export default function BlogArticle1() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1713865469900-d12502a39875?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Talent Acquisition</span>
                <span className="text-[13px] text-white/35">March 13, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 8 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                Attitude vs. Competence: How to Evaluate a Candidate
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                Should you hire someone who already knows how to do the job, or someone who seems to have the potential to learn it?
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                This is one of the most common and most underestimated questions in recruitment. When you evaluate a candidate, you're always making a choice between attitude and competence.
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                One profile may have a great predisposition: curiosity, speed of learning, energy. Another may have already consolidated skills, developed in similar contexts. The decision between the two is not just technical but involves strategic considerations for your company.
              </p>

              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 my-10">
                <p className="text-[16px] text-[#1A1A2E]/[0.7] leading-[1.8] italic">
                  Let's look at the difference between attitude and competence, when it makes sense to prioritize one over the other, and how you can evaluate both while reducing the risk of decisions based on impressions or bias.
                </p>
              </div>

              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">Attitude vs. Competence: What's the Real Difference?</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                The difference between attitude and competence is not theoretical. It's deeply operational.
              </p>

              <div className="grid md:grid-cols-3 gap-3 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#1A1A2E] mb-2">Attitude</h3>
                  <p className="text-[13px] text-[#1A1A2E]/[0.45] leading-[1.6]">Predisposition, potential. The ability to learn quickly, relate easily, tackle problems with curiosity.</p>
                </div>
                <div className="rounded-xl border border-[#1A1A2E]/[0.04] bg-[#1A1A2E]/[0.02] p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#1A1A2E]/50 mb-2">vs.</h3>
                  <p className="text-[13px] text-[#1A1A2E]/[0.35] leading-[1.6]">Potential versus already observable performance</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.03] p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#4B4DF7]">Competence</h3>
                  <p className="text-[13px] text-[#1A1A2E]/[0.55] leading-[1.6]">Already developed and applied in real contexts. Observable behaviors, results achieved, decisions made.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* When to prioritize */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 tracking-[-0.02em] leading-[1.15]">When to Evaluate Attitude (and When Not To)</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-10">
                The key question is: <strong className="text-[#1A1A2E]/80">how much time and learning margin can your organization afford?</strong>
              </p>

              <div className="space-y-0">
                <motion.details className="group border-b border-[#1A1A2E]/[0.06]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">01</span>
                    <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">Prioritize Attitude When</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {whenAttitude.map((item, j) => (
                        <li key={j} className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.details>

                <motion.details className="group border-b border-[#1A1A2E]/[0.06]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}>
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">02</span>
                    <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">Don't Rely Only on Attitude When</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {whenCompetence.map((item, j) => (
                        <li key={j} className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.details>
              </div>

              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  "Attitude is a promise. Competence is a partial guarantee. The choice depends on the level of urgency and the maturity of the organizational context."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to evaluate — accordions */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 tracking-[-0.02em] leading-[1.15]">How to Objectively Evaluate Competence</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-10">
                Competence cannot be evaluated only through declarations. You need to shift the focus from opinions to behavioral evidence.
              </p>

              <div className="space-y-0">
                {methods.map((m, i) => (
                  <motion.details
                    key={m.num}
                    className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{m.num}</span>
                      <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{m.title}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8]">{m.desc}</p>
                    </div>
                  </motion.details>
                ))}
              </div>

              <div className="rounded-xl bg-[#1A1A2E]/[0.04] p-6 my-10">
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  <strong className="text-[#1A1A2E]/80">Important:</strong> some candidates can explain very well how something should be done. Explaining is not the same as knowing how to do it in a real context, with constraints, pressure, and responsibility.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skill Assessment */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em] leading-[1.15]">Why Skill Assessment Helps You Distinguish Attitude and Competence</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Distinguishing between attitude and competence requires more than a good interview. A structured skill assessment allows you to work on two distinct levels:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">Competence Measurement</h3>
                  <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">Observe behaviors, decision-making processes, concrete application of skills in realistic scenarios.</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">Potential Evaluation</h3>
                  <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">Analyze learning capacity, cognitive flexibility, goal orientation. Elements that indicate the possibility of future growth.</p>
                </div>
              </div>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                The immediate advantage is <strong className="text-[#1A1A2E]/80">comparability</strong>: different candidates are evaluated on the same criteria, with uniform indicators. This reduces the risk of basing decisions on storytelling, impressions, or personal affinity.
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  Through assessments based on psychometric science, situational questions, and BEI methodology, Skillvue helps you distinguish between those who have already developed a competence and those who show potential consistent with the role. Decisions based on evidence, not impressions.
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
                Start making decisions based on <span className="italic gradient-text">evidence,</span> not impressions.
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Skillvue analyzes skills of candidates and employees quickly, objectively, and at scale using proprietary AI technology.
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

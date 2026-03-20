// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, AlertTriangle, Shield, Eye, Anchor, UserCheck, Zap, ThumbsUp, Brain } from 'lucide-react';
import { useRouter } from 'next/router';

const biases = [
  { num: '01', title: 'Halo Effect', icon: ThumbsUp, oneliner: 'One positive trait overshadows everything else', desc: 'A single positive characteristic disproportionately influences the overall evaluation. A prestigious university, a brilliant communication style, or an international experience becomes dominant and "contaminates" the judgment on unverified competencies.', mitigation: ['Define key competencies before the interview', 'Use separate scoring grids per skill', 'Ask probing questions even when positive', 'Compare on uniform criteria'] },
  { num: '02', title: 'Horn Effect', icon: AlertTriangle, oneliner: 'One negative detail tanks the whole evaluation', desc: 'The negative twin of the Halo Effect. A perceived negative element conditions the entire evaluation. A CV error, a short work experience, or a less confident style. The interview becomes a search for confirmation of the initial doubt.', mitigation: ['Separate competencies in evaluation', 'Verify before confirming negatives', 'Distinguish error from pattern', 'Use structured scoring for all'] },
  { num: '03', title: 'Affinity Bias', icon: UserCheck, oneliner: 'You prefer candidates who feel like you', desc: 'You evaluate more positively candidates you perceive as similar to you or your team. Background, career path, communication style, or interests. The chemistry feels like competence, but it is not.', mitigation: ['Anchor to observable competencies', 'Identical questions for all candidates', 'Multiple evaluators with shared criteria', 'Separate "likeable" from "qualified"'] },
  { num: '04', title: 'Confirmation Bias', icon: Eye, oneliner: 'You only see what confirms your first impression', desc: 'The tendency to seek, interpret, and remember only information that confirms an already formed idea. Once you have an opinion, you start asking questions oriented to confirm it. If you find no contradicting evidence, you did not look hard enough.', mitigation: ['Challenge your first impression', 'Search for contrary evidence', 'Use predefined evaluation grids', 'Separate gathering from judging'] },
  { num: '05', title: 'Anchoring Bias', icon: Anchor, oneliner: 'First data point dominates all that follows', desc: 'The first piece of information received about a candidate becomes a reference point conditioning all subsequent evaluations. Current salary, degree, a colleague comment. Judgment revolves around that initial data point.', mitigation: ['Postpone economic evaluation', 'Independent criteria per competency', 'Evaluate each skill separately first', 'Compare on behavioral evidence'] },
  { num: '06', title: 'Similar-to-me Bias', icon: UserCheck, oneliner: 'You favor candidates who mirror your own path', desc: 'The tendency to prefer candidates who reflect your own path, decision-making style, or way of working. If the candidate faced similar challenges or shares your approach, you unconsciously consider them "more suitable."', mitigation: ['Clear shared competency model', 'Distinguish style from adequacy', 'Diverse evaluator backgrounds', 'Ask: competent or just similar?'] },
  { num: '07', title: 'First Impression Bias', icon: Zap, oneliner: 'The first 5 minutes determine everything', desc: 'Forming a judgment in the first minutes and maintaining it throughout. Punctuality, handshake, tone of voice, presentation style. The interview risks becoming a confirmation of the initial impression, positive or negative.', mitigation: ['Section the interview with distinct criteria', 'Defer judgment to the end', 'Notes on evidence, not perceptions', 'Multiple evaluation moments'] },
  { num: '08', title: 'Overconfidence Bias', icon: Brain, oneliner: 'You trust your own judgment too much', desc: 'The tendency to overestimate your own judgment ability. You think you can "read people instantly" or have a special instinct for talent. This is insidious because it concerns the evaluator, not the candidate.', mitigation: ['Shared measurable criteria', 'Cross-evaluator comparison', 'Distinguish experience from validation', 'Integrate structured tools'] },
];

export default function BlogArticle2() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1758519288480-1489c17b1519?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Hiring</span>
                <span className="text-[13px] text-white/35">March 10, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 12 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                The 8 Most Common Recruitment Biases (and How to Avoid Them)
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                Have you ever rejected a candidate in the first five minutes of an interview? Or decided almost immediately they were "the one"?
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                If the answer is yes, it doesn't mean you're a superficial recruiter: it means you're human and, precisely for this reason, exposed to recruitment biases.
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                In the selection process, many decisions are formed earlier than we imagine. The rest of the interview often becomes a search for confirmation. This happens because our brain uses cognitive shortcuts to simplify complexity: fast, automatic, apparently efficient. The problem is they're not always accurate.
              </p>

              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 my-10">
                <p className="text-[16px] text-[#1A1A2E]/[0.7] leading-[1.8] italic">
                  The question we want to answer in this guide isn't whether biases exist. The question is: how much do they concretely impact your decisions?
                </p>
              </div>

              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">What Are Cognitive Biases?</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Cognitive biases are mental shortcuts we use to make decisions faster. They're not intentional errors: they're automatic brain mechanisms that help us simplify complexity. The problem arises when these shortcuts come into play in situations requiring structured evaluations, like recruitment.
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                In the selection process, a bias can lead you to overestimate a candidate for a single positive characteristic, reject them for an irrelevant detail, seek only information confirming your first impression, or unconsciously prefer profiles similar to you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The 8 Biases — Minimal accordion */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 tracking-[-0.02em] leading-[1.15]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              The 8 Most Common Recruitment Biases
            </motion.h2>
            <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-12">
              They rarely appear as obvious errors. More often, they disguise themselves as experience, intuition, or "gut feeling."
            </p>

            <div className="space-y-0">
              {biases.map((b, i) => (
                <motion.details
                  key={b.num}
                  className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{b.num}</span>
                    <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{b.title}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8] mb-4">{b.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {b.mitigation.map((m, j) => (
                        <span key={j} className="inline-flex px-3 py-1.5 rounded-full text-[12px] text-[#4B4DF7]/70 border border-[#4B4DF7]/[0.1] bg-[#4B4DF7]/[0.03]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* How to Reduce */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em] leading-[1.15]">How to Reduce Biases in Recruitment</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                The bad news: being human, biases cannot be eliminated. The good news: they can be managed with method. If you want to reduce their impact, you need to intervene on the selection process, making it more structured and less dependent on individual perception.
              </p>
              <div className="space-y-3 my-8">
                {[
                  'Define job profiles based on competencies, not just activities or seniority',
                  'Structure interviews with consistent questions for all candidates',
                  'Evaluate on uniform criteria, separating different dimensions (hard skills, soft skills, potential)',
                  'Separate data collection from final judgment, avoiding early evaluations',
                  'Compare decisions across multiple evaluators on shared indicators',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#4B4DF7]/[0.06] bg-white">
                    <span className="w-6 h-6 rounded-full bg-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-[#4B4DF7]">{i + 1}</span>
                    </span>
                    <p className="text-[15px] text-[#1A1A2E]/[0.6] leading-[1.7]">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Skillvue supports HR and Talent Acquisition in objective competency evaluation through assessments based on psychometric science, situational questions, and BEI methodology. This allows comparing candidates on measurable criteria, reducing the weight of individual perceptions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">Discover Skillvue</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                Make your recruitment process more structured, less exposed to <span className="italic gradient-text">bias.</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Skillvue analyzes skills of candidates and employees quickly, objectively, and at scale using proprietary AI technology.
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-9 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500 mb-16">
                <span>Book a Meeting</span>
                <ArrowRight className="h-4 w-4 ml-8 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {['Psychometric science', 'BEI methodology', 'Objective profiles', 'Bias reduction'].map((item) => (
                  <span key={item} className="text-[13px] text-white/25 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#4B4DF7]/50" />{item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, Compass, Target, Heart, Handshake, Wrench } from 'lucide-react';
import { useRouter } from 'next/router';

const skills = [
  { icon: Compass, title: 'Leadership', desc: 'The ability to orient the team toward a clear direction, even in conditions of ambiguity. Observable when a manager defines coherent priorities, makes decisions taking responsibility, and maintains alignment during uncertainty.' },
  { icon: Target, title: 'Goal Orientation', desc: 'An effective manager maintains focus on results without dispersing energy in non-functional dynamics. Translates strategy into operational priorities, renegotiates deadlines transparently, and guides the team toward concrete outcomes.' },
  { icon: Heart, title: 'Emotional Intelligence', desc: 'Managing people means managing emotional dynamics. This competence manifests in the ability to read tensions in the team, modulate communication style, and address feedback or conflicts without rigidity.' },
  { icon: Handshake, title: 'Negotiation', desc: 'Much of managerial work is mediation between different interests: top management, team, other functions. Emerges when a manager makes constraints explicit and builds acceptable solutions while maintaining functional relationships.' },
  { icon: Wrench, title: 'Problem Solving', desc: 'In managerial roles, problems are rarely technical and linear. They involve people, priorities, and organizational constraints. Visible in the ability to analyze situations, distinguish facts from perceptions, and make practicable decisions.' },
];

const observables = [
  { context: 'In meetings', signs: ['Clarifies the meeting objective before entering details', 'Synthesizes key points when discussion disperses', 'Takes a position when a decision is needed', 'Assigns clear responsibilities at the end'] },
  { context: 'In conflict moments', signs: ['Avoids personalizing the problem', 'Makes constraints explicit instead of shifting responsibility', 'Seeks an operational agreement instead of imposing a solution'] },
  { context: 'In priority management', signs: ['Translates strategic objectives into concrete activities', 'Renegotiates deadlines when conditions change', 'Protects the team from incoherent or overlapping requests', 'Maintains coherence between declared priorities and what they monitor'] },
];

export default function BlogArticle7() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1752650735509-58f11eaa2e10?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Leadership</span>
                <span className="text-[13px] text-white/35">February 23, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 12 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                Managerial Skills: What They Are and How to Identify Them
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                Promoting a good professional to manager is one of the most delicate decisions you can make. The skills required change radically.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">What Are Managerial Skills?</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Managerial skills concern how a person exercises responsibility over others and over results. They are the set of abilities that enable someone to define clear priorities, make decisions under uncertainty, manage relational dynamics, develop autonomy in collaborators, and maintain alignment between individual and organizational objectives.
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                One of the most frequent misunderstandings is <strong className="text-[#1A1A2E]/80">confusing activities with generated value</strong>. A manager can organize many meetings and monitor tasks, but this isn't in itself an indicator of managerial competence. The real difference is seen in impact: is the team aligned? Are decisions clear? Are conflicts managed or avoided? Do people grow or remain dependent on the boss?
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  "Managerial skills don't concern only what a person can do, but what they can make happen through their role."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">The 5 Key Managerial Skills</h2>
              <div className="space-y-0">
                {skills.map((s, i) => {
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
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">How to Recognize Them in Daily Work</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-8">
                Managerial skills don't manifest spectacularly but are visible in the details: how a manager runs a meeting, makes an uncomfortable decision, handles a shifting priority.
              </p>
              {observables.map((obs, i) => (
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
                    <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{obs.context}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {obs.signs.map((sign, j) => (
                        <li key={j} className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4B4DF7]/40 mt-2.5 shrink-0" />{sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.details>
              ))}

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  Skillvue supports HR and organizations in the objective evaluation of managerial skills through assessments based on psychometric sciences, situational questions, and BEI methodology. Instead of asking "what kind of leader are you?", the assessment observes how a person reasons and decides in concrete managerial scenarios.
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
                Make leadership decisions based on <span className="italic gradient-text">data, not impressions.</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Evaluate managerial potential with structured assessments based on behavioral evidence.
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

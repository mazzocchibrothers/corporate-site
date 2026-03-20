// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, Heart, Users, Handshake, Target, Brain, RefreshCw, Wrench, Shield, Calendar, Compass } from 'lucide-react';
import { useRouter } from 'next/router';

const socialSkills = [
  { icon: Heart, title: 'Emotional Intelligence', desc: 'The ability to read emotional dynamics that influence decisions, behaviors, and professional relationships. Recognizes tension signals before they become explicit conflict.' },
  { icon: Users, title: 'Orientation to Others', desc: 'The ability to understand needs, expectations, and priorities of interlocutors and act accordingly. Clarifies what the interlocutor really needs before proposing a solution.' },
  { icon: Handshake, title: 'Negotiation', desc: 'The daily negotiation that happens on priorities, resources, and deadlines. Observable in the ability to find sustainable compromises considering both individual and organizational goals.' },
  { icon: Target, title: 'Teamworking', desc: 'The ability to work in an integrated way toward a common goal, even when individual or functional priorities aren\'t perfectly aligned.' },
  { icon: Compass, title: 'Leadership', desc: 'Not necessarily tied to a hierarchical role. It\'s a competence that concerns the ability to orient people toward a shared direction, even without formal power.' },
  { icon: Brain, title: 'Goal Orientation', desc: 'The ability to maintain focus on results even when relational dynamics become complex or conflictual.' },
  { icon: RefreshCw, title: 'Cognitive Flexibility', desc: 'The ability to adapt one\'s way of thinking and acting to different contexts, interlocutors, and requests, without losing decision-making coherence.' },
  { icon: Wrench, title: 'Problem Solving', desc: 'Not just technical resolution, but managing situations involving multiple actors, interests, and constraints. Analyzing problems distinguishing facts, perceptions, and interpretations.' },
  { icon: Shield, title: 'Resilience', desc: 'The ability to maintain balance and relational effectiveness even in particularly critical contexts. After a conflict, quickly restores a functional relationship.' },
  { icon: Calendar, title: 'Organization & Planning', desc: 'Has an often-underestimated social component. Managing time, priorities, and responsibilities impacts directly on work relationships.' },
];

export default function BlogArticle8() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1544477989-b64060e53f36?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Soft Skills</span>
                <span className="text-[13px] text-white/35">February 18, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 14 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                Social Skills: What They Are and Why They Matter at Work
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                Social skills aren't about being sociable. They concern how a person acts in professional interactions, especially when the context is complex.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">What Are Social Skills?</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Social skills are observable capabilities that manifest in how a person interacts with colleagues, stakeholders, and managers, especially when the context requires choices, negotiation, and adaptation.
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                The most critical aspect is that social skills are often treated as a label. We frequently read in CVs phrases like "good relational abilities" or "excellent communication," <strong className="text-[#1A1A2E]/80">without ever clarifying which behaviors to observe</strong> and which decisions to support.
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  "Social skills represent a subset of transversal competencies that specifically concern the management of relationships, interpersonal dynamics, and professional interactions."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">10 Social Skills Relevant for Work Today</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-8">
                These dimensions are not measured as generic labels but as scientifically validated constructs, observable in daily work.
              </p>
              <div className="space-y-0">
                {socialSkills.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.details
                      key={s.title}
                      className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                        <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
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
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">Concrete Examples in Daily Work</h2>
              <h3 className="text-[17px] font-bold text-[#1A1A2E]/80 mb-4">In meetings</h3>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                A well-developed social skill is recognized when a person clarifies the meeting objective, brings conversation back on point when it disperses, gives space to different positions without losing focus, and explicates disagreements functionally without blocking the discussion.
              </p>
              <h3 className="text-[17px] font-bold text-[#1A1A2E]/80 mb-4">In moments of tension</h3>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Social skills are noticed more clearly when context stops being linear. Observe whether a person asks for clarification before reacting, makes constraints explicit instead of shifting responsibility, addresses disagreement without personalizing it, and takes a position even without clear direction.
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  Through Skill Assessments based on accurate psychometric methodologies and BEI-inspired situational questions, Skillvue lets you observe how people act in complex interactions: stakeholder disagreements, role ambiguity, conflicting requests, relational pressures. Not how a person describes themselves, but how they reason and decide in realistic social situations.
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
                Evaluate real social effectiveness, not <span className="italic gradient-text">perceived agreeableness.</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Make decisions based on real social competencies, not impressions.
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

// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, CheckCircle, Clipboard, Users, MessageSquare, Heart, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/router';

const phases = [
  { num: '01', title: 'Preboarding', timing: 'Offer accepted → Day 1', icon: Clipboard, points: ['Clarify priorities for the first 90 days: not just generic goals, but expected results and evaluation criteria', 'Define key references: direct manager, buddy, HR contacts', 'Align expectations on role and responsibilities before entry', 'Maintain active, structured contact: scheduled communications reduce uncertainty', 'Prepare the operational context: tools, access, first weeks agenda already planned'] },
  { num: '02', title: 'Operational Integration', timing: 'Weeks 1-4', icon: Users, points: ['Define clear short-term objectives (30-60 days): concrete results, not just activities', 'Schedule structured check-ins with the manager: frequent feedback prevents easily fixable errors', 'Assign progressive responsibilities: start with observable tasks, gradually increasing autonomy', 'Make priority criteria explicit: what is urgent, strategic, or can wait', 'Collect early signals of misalignment: recurring difficulties, decision hesitation'] },
  { num: '03', title: 'Role & Expectations Alignment', timing: 'Weeks 4-8', icon: MessageSquare, points: ['Formally review role responsibilities: compare what was defined in selection with reality', 'Make performance criteria explicit: what "doing well" means in the first 3-6 months', 'Verify autonomy level reached: which decisions are autonomous, which still need supervision', 'Ask for bidirectional feedback: manager to person and vice versa', 'Identify competency gaps: distinguish between training need, organizational support, or priority redefinition'] },
  { num: '04', title: 'Cultural Integration', timing: 'Months 2-3', icon: Heart, points: ['Make operational values explicit, not just declared ones', 'Facilitate cross-functional relationships: meetings with key stakeholders beyond the direct team', 'Clarify decision-making models: centralized, participative, data-driven?', 'Share concrete examples of expected behaviors: what gets rewarded, what creates friction', 'Schedule experience check-ins: asking "what surprised you?" is often more useful than a standard survey'] },
  { num: '05', title: 'Monitoring & Feedback', timing: 'Days 30-60-90+', icon: BarChart3, points: ['Schedule structured checkpoints at 30-60-90 days with clear objectives and criteria', 'Actively involve the direct manager: feedback cannot be delegated only to HR', 'Collect bidirectional feedback: what is working and what can improve', 'Evaluate autonomy reached vs. initial expectations: not just tasks completed, but decision quality', 'Connect gaps to concrete development plans: training, mentoring, priority redefinition'] },
];

export default function BlogArticle6() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1758519288548-046187014c85?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Onboarding</span>
                <span className="text-[13px] text-white/35">February 23, 2026</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 15 min read</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                Corporate Onboarding: A Complete Process Guide
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                About 50% of selected candidates back out before starting. Every failed onboarding means repeating selection costs, lost manager time, and team slowdown.
              </p>
            </motion.div>
          </div>
        </section>

        {/* All article content in one continuous light section */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-14 lg:py-16">

            {/* What Is Onboarding */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">What Is Onboarding, Really?</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                Onboarding is a process of progressive alignment between person, role, and organization. It builds clarity on three fundamental dimensions: what is expected in the first months, how processes and decisions actually work, and which behaviors generate value in that specific context.
              </p>
              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 mb-6">
                <p className="text-[16px] text-[#1A1A2E]/[0.7] leading-[1.8] italic">
                  Don't confuse onboarding with welcome. Welcome concerns the initial experience. Onboarding concerns the person's ability to become autonomous, productive, and integrated into the organizational system.
                </p>
              </div>
            </motion.div>

            {/* The 5 Phases */}
            <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 mt-12 tracking-[-0.02em]">The 5 Phases of Onboarding</h2>
            <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-8">
              Each phase answers a specific question. Together they form a structured, measurable process.
            </p>

            <div className="space-y-0 mb-12">
              {phases.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.details
                    key={p.num}
                    className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{p.num}</span>
                      <div className="flex-1">
                        <span className="text-[17px] font-semibold text-[#1A1A2E]/80 block">{p.title}</span>
                        <span className="text-[12px] text-[#1A1A2E]/30">{p.timing}</span>
                      </div>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <div className="space-y-2">
                        {p.points.map((point, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle className="h-3.5 w-3.5 text-[#4B4DF7]/40 mt-1 shrink-0" />
                            <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.details>
                );
              })}
            </div>

            {/* Onboarding as Field Assessment */}
            <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-12 tracking-[-0.02em]">Onboarding as a Field Assessment</h2>
            <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
              During onboarding you can distinguish three very different situations: a <strong className="text-[#1A1A2E]/80">competency gap</strong> (needs targeted training), a <strong className="text-[#1A1A2E]/80">role mismatch</strong> (present skills don't match real context needs), or an <strong className="text-[#1A1A2E]/80">integration problem</strong> (technical skills are there but cultural alignment is weak). Confusing these leads to ineffective interventions.
            </p>

            <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
              </div>
              <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                Integrating a skill assessment at the start of onboarding lets you validate key competencies against the actual role, identify gaps before they impact performance, and build a personalized development plan based on evidence, not perceptions. Skillvue supports this through psychometric assessments, situational questions, and BEI methodology.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">Discover Skillvue</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                Make onboarding decisions based on real <span className="italic gradient-text">competencies.</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                Skillvue analyzes skills quickly, objectively, and at scale using proprietary AI technology.
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

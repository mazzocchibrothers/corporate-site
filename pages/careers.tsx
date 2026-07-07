// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import { useRouter } from 'next/router';

const stats = [
  { value: '50+', label: 'People across Europe' },
  { value: '4', label: 'Offices in Milan, Paris, Berlin, London' },
  { value: 'Hybrid', label: 'Working environment' },
  { value: '1M+', label: 'People empowered' },
];

const steps = [
  {
    num: '01',
    title: 'Apply with your skills',
    desc: 'A short Skillvue verification of skills, mindset and readiness.',
  },
  {
    num: '02',
    title: 'Meet the team',
    desc: "Structured, fair conversations with the people you'd actually work with.",
  },
  {
    num: '03',
    title: 'Move forward with clarity',
    desc: 'An objective, bias-free, explainable decision. For you and for us.',
  },
];

const tags = ['Skills-first', 'Bias-free', 'GDPR-compliant', 'Explainable'];

const allRoles = [
  { team: 'Product', title: 'Technical Product Manager', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://skillvue.factorial.it/job_posting/technical-product-manager-310502' },
  { team: 'Design', title: 'Senior Brand Designer', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://skillvue.factorial.it/job_posting/senior-brand-designer-305100' },
  { team: 'People & Talent', title: 'Talent Lead', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://www.linkedin.com/jobs/search/?currentJobId=4420136873&f_C=74553239&geoId=92000000&origin=COMPANY_PAGE_JOBS_CLUSTER_EXPANSION&originToLandingJobPostings=4418742788%2C4420136873%2C4434628642%2C4407791647&trk=d_flagship3_company_posts' },
  { team: 'Sales', title: 'Enterprise Account Executive – Italy', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://skillvue.factorial.it/job_posting/enterprise-account-executive-italy-294480' },
];

const filters = ['All teams', 'Design', 'People', 'Sales', 'Milan'];

export default function CareersPage() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All teams');

  const filtered =
    activeFilter === 'All teams'
      ? allRoles
      : allRoles.filter(
          (r) =>
            r.team.toLowerCase().includes(activeFilter.toLowerCase()) ||
            r.location === activeFilter
        );

  const grouped = filtered.reduce<Record<string, typeof allRoles>>((acc, role) => {
    if (!acc[role.team]) acc[role.team] = [];
    acc[role.team].push(role);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main>

        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[80px] min-h-screen flex flex-col justify-center">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute rounded-full"
              style={{
                width: '700px', height: '700px',
                top: '-200px', left: '-150px',
                background: 'radial-gradient(circle, rgba(75,77,247,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '500px', height: '500px',
                bottom: '-100px', right: '-80px',
                background: 'radial-gradient(circle, rgba(255,95,36,0.07) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left — headline + CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-6 block">
                  Careers
                </span>
                <h1
                  className="font-semibold text-white/95 mb-6"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
                >
                  Join the team making talent decisions{' '}
                  <span className="italic font-bold gradient-text-warm">objective.</span>
                </h1>
                <p className="text-[15px] md:text-[17px] text-white/55 leading-[1.7] mb-8 max-w-lg font-light">
                  You'll help the world's biggest companies hire, promote and develop people based on skills and potential.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#open-roles"
                    className="group inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500"
                  >
                    See open roles
                    <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
                  </a>
                  <a
                    href="#life-at-skillvue"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-semibold text-white/70 rounded-full border border-white/[0.15] hover:border-white/[0.25] hover:text-white transition-all duration-300"
                  >
                    Life at Skillvue
                  </a>
                </div>
              </motion.div>

              {/* Right — photo */}
              <motion.div
                className="rounded-2xl overflow-hidden aspect-video"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <img
                  src="/careers/team_foto_01.avif"
                  alt="Skillvue team"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 mt-14 lg:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`pt-6 pb-8 ${i % 2 !== 0 ? 'pl-6 md:pl-8' : ''}`}
                >
                  <p className="text-[26px] md:text-[34px] font-semibold text-white/90 tracking-[-0.02em] leading-none mb-1.5">
                    {s.value}
                  </p>
                  <p className="text-[12px] md:text-[13px] text-white/40 leading-[1.4]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 2. WHY SKILLVUE ─────────────────────────────────────── */}
        <section className="section-breathe py-20 lg:py-28 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.2em] uppercase mb-6 block">
                Why Skillvue
              </span>
              <h2
                className="font-semibold text-[#121212] mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Every talent decision, from hiring to transformation, is{' '}
                <span className="italic font-bold gradient-text-on-light">finally the right one</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#7A7A7A] leading-[1.7] mb-8 max-w-2xl">
                We are building the objective skills data layer for the enterprise, grounded in science and scaled by AI.
              </p>
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); router.push('/about'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-[#121212] rounded-full border border-[#121212]/[0.12] hover:border-[#4B4DF7]/30 hover:text-[#4B4DF7] transition-all duration-300"
              >
                Read the full story
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── 3. HOW WE HIRE ──────────────────────────────────────── */}
        <section className="relative py-20 lg:py-28 min-h-screen flex flex-col justify-center">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(75,77,247,0.07) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              className="mb-12 lg:mb-16 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-6 block">
                How we hire
              </span>
              <h2
                className="font-semibold text-white/95 mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                We hire the way we help{' '}
                <span className="italic font-bold gradient-text-warm">enterprises hire</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-white/50 leading-[1.7] font-light">
                Our own hiring reflects the same principles we bring to our customers: a skills-based method, not CV screening.
              </p>
            </motion.div>

            {/* Step cards */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 mb-8 md:mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 md:p-8 lg:p-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="block text-[40px] md:text-[56px] font-light text-white/10 leading-none tracking-[-0.04em] mb-6 md:mb-8">
                    {step.num}
                  </span>
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-white/90 mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-white/50 leading-[1.6]">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 md:gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[12px] font-semibold text-white/[0.65] border border-white/[0.1] bg-white/[0.03] tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 4. LIFE AT SKILLVUE ─────────────────────────────────── */}
        <section id="life-at-skillvue" className="section-breathe py-20 lg:py-28 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              className="mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.2em] uppercase mb-4 block">
                Life at Skillvue
              </span>
              <h2
                className="font-semibold text-[#121212] mb-2"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                50+ people across Milan, Paris, Berlin &amp; London.
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#7A7A7A] leading-[1.6]">
                Flexible and hybrid working environment
              </p>
            </motion.div>

            {/* Photo mosaic — large left + 2×2 right */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img
                  src="/careers/life_at_skillvue.png"
                  alt="Skillvue team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="rounded-2xl overflow-hidden aspect-video">
                    <img
                      src={`/careers/life_at_skillvue-${n}.png`}
                      alt={`Life at Skillvue ${n}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 5. OPEN ROLES ───────────────────────────────────────── */}
        <section id="open-roles" className="relative py-20 lg:py-28 min-h-screen flex flex-col justify-start">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
            <motion.div
              className="mb-8 lg:mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-4 block">
                Join us!
              </span>
              <h2
                className="font-semibold text-white/95"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Open roles
              </h2>
            </motion.div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    activeFilter === f
                      ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                      : 'text-white/40 border border-transparent hover:text-white/70'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grouped listings */}
            <div className="flex flex-col gap-8">
              {Object.entries(grouped).map(([team, teamRoles], gi) => (
                <motion.div
                  key={team}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gi * 0.07 }}
                >
                  <p className="text-[11px] font-medium text-white/40 tracking-[0.05em] uppercase mb-3">
                    {team}
                  </p>
                  <div className="flex flex-col gap-2">
                    {teamRoles.map((role) => (
                      <a
                        key={role.title}
                        href={role.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.05] px-5 py-5 md:px-8 md:py-6 transition-all duration-300"
                      >
                        <span className="text-[15px] md:text-[17px] font-semibold text-white/85 group-hover:text-white/95 transition-colors duration-300">
                          {role.title}
                        </span>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-[13px] text-white/35">
                            {role.location} · {role.work}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#9B9DFB]/80 group-hover:text-[#9B9DFB] transition-colors duration-300">
                            Apply
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}

              {Object.keys(grouped).length === 0 && (
                <p className="text-[15px] text-white/35 py-8">No roles match this filter.</p>
              )}
            </div>

            <motion.p
              className="mt-8 text-[13px] text-white/35"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Don't see your role?{' '}
              <a
                href="mailto:careers@skillvue.ai"
                className="text-[#9B9DFB]/60 hover:text-[#9B9DFB] underline underline-offset-2 transition-colors duration-300"
              >
                Submit an open application
              </a>
            </motion.p>
          </div>
        </section>

        {/* ── 6. FINAL CTA ────────────────────────────────────────── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 md:p-8 lg:p-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="font-semibold text-white/90 mx-auto mb-6 max-w-2xl"
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to do the most important work in HR tech?
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#open-roles"
                  className="group inline-flex items-center gap-3 px-6 py-4 md:gap-4 md:px-10 md:py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/15 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500"
                >
                  <span>See open roles</span>
                  <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
                </a>
                <a
                  href="#life-at-skillvue"
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/40 hover:text-white/70 transition-colors duration-300"
                >
                  Life at Skillvue
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

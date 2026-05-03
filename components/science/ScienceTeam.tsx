// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const lead = {
  name: 'Dr. Tony Lee, Ph.D.',
  role: 'Head of AI & Science',
  bio: 'Computational psychologist with double Ph.D. degrees and hands-on experience in Machine Learning and AI-based assessment. His interdisciplinary background brings a unique perspective to the assessment field, combining psychological knowledge with advanced AI and machine learning techniques. At Skillvue, he leads the AI & Science team, innovating, validating and implementing new competency assessment models built on the latest technologies.',
  photo: '/team/tony-lee.jpg',
  linkedin: 'https://www.linkedin.com/in/dr-tony-lee/',
};

const members = [
  { name: 'Jatin Babbar', role: 'Senior Machine Learning Engineer', photo: '/team/jatin-babbar.jpg', linkedin: 'https://www.linkedin.com/in/jatin-babbar/' },
  { name: 'Dr. Serena Dolfi, Ph.D.', role: 'People Scientist', photo: '/team/serena-dolfi.jpg', linkedin: 'https://www.linkedin.com/in/serena-dolfi/' },
  { name: 'Wamiq Raza', role: 'Machine Learning Engineer', photo: '/team/wamiq-raza.jpg', linkedin: 'https://www.linkedin.com/in/wamiq-raza/' },
  { name: 'Luca Sbrollini', role: 'People Scientist', photo: '/team/luca-sbrollini.jpg', linkedin: 'https://www.linkedin.com/in/luca-sbrollini/' },
];

export default function ScienceTeam() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const pct = max > 0 ? (el.scrollLeft / max) * 100 : 0;
      setScrollProgress(pct);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const renderMember = (m, i) => (
    <motion.div
      key={m.name}
      data-testid={`team-${m.name.split(' ')[0]?.toLowerCase()}`}
      className="group text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
    >
      <div className="rounded-xl md:rounded-2xl border border-[#1A1A2E]/[0.06] bg-white overflow-hidden mb-2 md:mb-4 hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500">
        <div className="w-full aspect-[3/4]">
          <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <h4 className="text-[13px] md:text-[15px] font-bold text-[#1A1A2E] mb-0.5 md:mb-1 leading-tight">
        {m.name}
      </h4>
      <p className="text-[12px] md:text-[13px] text-[#1A1A2E]/45 leading-snug">
        {t(m.role)}
      </p>
    </motion.div>
  );

  return (
    <section id="science-team" data-testid="science-team" className="section-breathe relative py-16 lg:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Section title */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('The team behind the')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('science')}</span>
          </h2>
        </motion.div>

        {/* Lead card */}
        <motion.div
          className="rounded-xl md:rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-5 md:p-6 lg:p-10 mb-8 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-start">
            <div className="shrink-0 w-32 h-40 md:w-48 md:h-56 rounded-xl md:rounded-2xl overflow-hidden bg-[#F5F5FA]">
              <img src={lead.photo} alt={lead.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pt-0 md:pt-2">
              <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-[#1A1A2E] mb-1.5">
                {lead.name}
              </h3>
              <p className="text-[13px] md:text-[15px] font-semibold text-[#4B4DF7]/70 mb-3 md:mb-6">
                {t(lead.role)}
              </p>
              <p className="text-[14px] md:text-[15px] text-[#1A1A2E]/[0.55] leading-[1.6] md:leading-[1.8] max-w-2xl">
                {t(lead.bio)}
              </p>
              <a
                href={lead.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Team members - Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {members.map((m, i) => (
            <div key={m.name} className="shrink-0 w-[60vw] snap-center">
              {renderMember(m, i)}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 w-48 h-1.5 rounded-full bg-[#1A1A2E]/20 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%` }} />
        </div>

        {/* Team members - Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {members.map((m, i) => renderMember(m, i))}
        </div>

        {/* 50+ collaborators */}
        <motion.div
          className="mt-8 md:mt-12 rounded-xl md:rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-5 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="text-[32px] md:text-[48px] font-bold text-[#1A1A2E] leading-none tracking-[-0.03em] shrink-0">50+</span>
          <div className="w-px h-10 bg-[#1A1A2E]/[0.08] hidden sm:block shrink-0" />
          <p className="text-[14px] md:text-[16px] text-[#1A1A2E]/[0.5] leading-[1.6] md:leading-[1.7]">
            {t('External collaborators from academic, HR consulting and corporate world')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

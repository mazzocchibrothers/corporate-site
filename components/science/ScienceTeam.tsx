// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';

const lead = {
  name: 'Dr. Tony Lee, Ph.D.',
  photo: '/team/tony-lee.avif',
  linkedin: 'https://www.linkedin.com/in/dr-tony-lee/',
};

const members = [
  {
    id: 'seniorMachineLearning',
    name: 'Jatin Babbar',
    photo: '/team/jatin-babbar.avif',
    linkedin: 'https://www.linkedin.com/in/jatin-babbar/',
  },
  {
    id: 'peopleScientist',
    name: 'Dr. Serena Dolfi, Ph.D.',
    photo: '/team/serena-dolfi.avif',
    linkedin: 'https://www.linkedin.com/in/serena-dolfi/',
  },
  {
    id: 'machineLearningEngineer',
    name: 'Wamiq Raza',
    photo: '/team/wamiq-raza.avif',
    linkedin: 'https://www.linkedin.com/in/wamiq-raza/',
  },
  {
    id: 'peopleScientist2',
    name: 'Luca Sbrollini',
    photo: '/team/luca-sbrollini.avif',
    linkedin: 'https://www.linkedin.com/in/luca-sbrollini/',
  },
];

export default function ScienceTeam() {
  const t = useTranslations('science');

  const renderMember = (m, i) => (
    <Reveal
      y={20}
      delay={0.2 + i * 0.08}
      key={m.id}
      data-testid={`team-${m.name.split(' ')[0]?.toLowerCase()}`}
      className="group text-center"
    >
      <div className="rounded-xl md:rounded-2xl border border-[#1A1A2E]/[0.06] bg-white overflow-hidden mb-2 md:mb-4 hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500">
        <div className="w-full aspect-[3/4]">
          <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <h4 className="text-[13px] md:text-[15px] font-semibold text-[#1A1A2E] mb-0.5 md:mb-1 leading-tight">
        {m.name}
      </h4>
      <p className="text-[12px] md:text-[13px] text-[#7A7A7A] leading-snug">
        {t(`team.members.${m.id}.role`)}
      </p>
    </Reveal>
  );

  return (
    <section id="science-team" data-testid="science-team" className="section-breathe relative py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Section title */}
        <Reveal duration={0.7} className="mb-8 md:mb-12">
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">{t.rich('team.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Lead card */}
        <Reveal
          y={20}
          duration={0.6}
          delay={0.1}
          className="rounded-xl md:rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-5 md:p-6 lg:p-10 mb-8 md:mb-14"
        >
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-start">
            <div className="shrink-0 w-full md:w-[clamp(6rem,25vw,12rem)] aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-[#F5F5FA]">
              <img loading="lazy" decoding="async" src={lead.photo} alt={lead.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pt-0 md:pt-2">
              <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-[#1A1A2E] mb-1.5">
                {lead.name}
              </h3>
              <p className="text-[13px] md:text-[15px] font-semibold text-[#4B4DF7]/70 mb-3 md:mb-6">
                {t('team.lead.role')}
              </p>
              <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.8] max-w-2xl">
                {t('team.lead.bio')}
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
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {members.map((m, i) => renderMember(m, i))}
        </div>

        {/* 50+ collaborators */}
        <Reveal
          y={20}
          delay={0.6}
          className="mt-8 md:mt-12 rounded-xl md:rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-5 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10"
        >
          <span className="text-[32px] font-semibold md:text-[48px] md:font-bold text-[#1A1A2E] leading-none tracking-[-0.03em] shrink-0">50+</span>
          <div className="w-px h-10 bg-[#1A1A2E]/[0.08] hidden sm:block shrink-0" />
          <p className="text-[14px] md:text-[16px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7]">{t('team.body')}</p>
        </Reveal>
      </div>
    </section>
  );
}

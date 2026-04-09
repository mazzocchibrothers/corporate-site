// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import PRHero from '@/components/solutions/pr/PRHero';
import PRProblem from '@/components/solutions/pr/PRProblem';
import PRHowSolves from '@/components/solutions/pr/PRHowSolves';
import PRConsulting from '@/components/solutions/pr/PRConsulting';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function ProjectResourcingPage() {
  const { t, lang } = useLanguage();
  const isIT = lang === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/solutions/project-resourcing`;

  return (
    <>
      <Head>
        <title>{isIT ? 'Project Resourcing | Staffing per Competenza | Skillvue' : 'Project Resourcing | Match Skills to Projects | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Assegna i progetti in base alle competenze verificate, non alla disponibilità. Riduci il rischio di delivery e migliora la composizione dei team."
          : 'Assign projects based on verified skill fit, not just availability. Reduce delivery risk, improve team composition and stop staffing in the dark.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <PRHero />
        <div className="fade-into-light" />
        <PRProblem />
        <div className="fade-into-dark" />
        <PRHowSolves />
        <div className="fade-into-light" />
        <PRConsulting />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentPath="/solutions/project-resourcing" />
        <SolutionFinalCTA headline={t('Ready to staff projects with')} accentWord={t('confidence?')} />
      <Footer />
      </main>
    </>
  );
}

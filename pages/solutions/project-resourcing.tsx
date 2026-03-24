// @ts-nocheck
import React from 'react';
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
  const { t } = useLanguage();
  return (
    <>
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

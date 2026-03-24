// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import LDHero from '@/components/solutions/ld/LDHero';
import LDProblem from '@/components/solutions/ld/LDProblem';
import LDShift from '@/components/solutions/ld/LDShift';
import LDHowSolves from '@/components/solutions/ld/LDHowSolves';
import LDIntegration from '@/components/solutions/ld/LDIntegration';
import LDImpact from '@/components/solutions/ld/LDImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function LearningDevelopmentPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main>
        <LDHero />
        <div className="fade-into-light" />
        <LDProblem />
        <div className="fade-into-dark" />
        <LDShift />
        <div className="fade-into-light" />
        <LDHowSolves />
        <div className="fade-into-dark" />
        <LDIntegration />
        <SolutionCrossLinks currentPath="/solutions/learning-development" />
        <div className="fade-into-light" />
        <LDImpact />
        <div className="fade-into-dark" />
        <SolutionFinalCTA headline={t('Ready to prove L&D impact with')} accentWord={t('data?')} />
      <Footer />
      </main>
    </>
  );
}

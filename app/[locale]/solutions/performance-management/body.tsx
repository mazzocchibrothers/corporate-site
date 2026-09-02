// @ts-nocheck
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import PMHero from '@/components/solutions/pm/PMHero';
import PMProblem from '@/components/solutions/pm/PMProblem';
import PMShift from '@/components/solutions/pm/PMShift';
import PMHowSolves from '@/components/solutions/pm/PMHowSolves';
import PMImpact from '@/components/solutions/pm/PMImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';



export default function PerformanceManagementPage() {
  const t = useTranslations('solutions.performance-management');

  return (
    <>
      <Navbar />
      <main>
        <PMHero />
        <div className="fade-into-light" />
        <PMProblem />
        <div className="fade-into-dark" />
        <PMShift />
        <div className="fade-into-light" />
        <PMHowSolves />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentId="solutions/performance-management" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}

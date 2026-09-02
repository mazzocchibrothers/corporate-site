// @ts-nocheck
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import IMHero from '@/components/solutions/im/IMHero';
import IMProblem from '@/components/solutions/im/IMProblem';
import IMShift from '@/components/solutions/im/IMShift';
import IMHowSolves from '@/components/solutions/im/IMHowSolves';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';



export default function InternalMobilityPage() {
  const t = useTranslations('solutions.internal-mobility');

  return (
    <>
      <Navbar />
      <main>
        <IMHero />
        <div className="fade-into-light" />
        <IMProblem />
        <div className="fade-into-dark" />
        <IMShift />
        <div className="fade-into-light" />
        <IMHowSolves />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentId="solutions/internal-mobility" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}

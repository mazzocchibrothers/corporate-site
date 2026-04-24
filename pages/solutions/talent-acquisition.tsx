// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import TAHero from '@/components/solutions/ta/TAHero';
import TAProblem from '@/components/solutions/ta/TAProblem';
import TAShift from '@/components/solutions/ta/TAShift';
import TAHowSolves from '@/components/solutions/ta/TAHowSolves';
import TAPlaybook from '@/components/solutions/ta/TAPlaybook';
import TAExperience from '@/components/solutions/ta/TAExperience';
import TAImpact from '@/components/solutions/ta/TAImpact';
import TAFunnel from '@/components/solutions/ta/TAFunnel';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function TalentAcquisitionPage() {
  const { t, lang } = useLanguage();
  const isIT = lang === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/solutions/talent-acquisition`;

  return (
    <>
      <Head>
        <title>{isIT ? 'Talent Acquisition | Valutazioni Predittive con AI | Skillvue' : 'Talent Acquisition | AI Hiring Assessments | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Sostituisci il recruiting basato sull'istinto con valutazioni AI predittive. Riduci il turnover precoce e rendi ogni decisione di assunzione difendibile."
          : 'Replace gut-feel hiring with AI assessments that predict performance. Reduce early turnover and make every hiring decision defensible at scale.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <TAHero />
        <div className="fade-into-light" />
        <TAProblem />
        <div className="fade-into-dark" />
        <TAShift />
        <div className="fade-into-light" />
        <TAFunnel />
        <TAImpact />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentPath="/solutions/talent-acquisition" />
        <SolutionFinalCTA headline={t('Ready to hire with')} accentWord={t('confidence?')} />
      <Footer />
      </main>
    </>
  );
}

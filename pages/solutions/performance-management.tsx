// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import PMHero from '@/components/solutions/pm/PMHero';
import PMProblem from '@/components/solutions/pm/PMProblem';
import PMShift from '@/components/solutions/pm/PMShift';
import PMHowSolves from '@/components/solutions/pm/PMHowSolves';
import PMImpact from '@/components/solutions/pm/PMImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function PerformanceManagementPage() {
  const { t, lang } = useLanguage();
  const isIT = lang === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/solutions/performance-management`;

  return (
    <>
      <Head>
        <title>{isIT ? 'Performance Management | Valutazioni Obiettive | Skillvue' : 'Performance Management | Data-Backed Reviews | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Integra valutazioni oggettive nei tuoi cicli di performance. Riduci i bias e dai a ogni manager un punto di partenza basato sui dati."
          : 'Add objective skill assessments to your performance cycles. Reduce bias, improve calibration and give every manager a data-backed starting point.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
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
        <SolutionCrossLinks currentPath="/solutions/performance-management" />
        <SolutionFinalCTA headline={t('Ready to make performance reviews')} accentWord={t('objective?')} />
      <Footer />
      </main>
    </>
  );
}

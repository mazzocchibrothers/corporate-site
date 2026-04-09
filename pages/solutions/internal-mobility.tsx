// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import IMHero from '@/components/solutions/im/IMHero';
import IMProblem from '@/components/solutions/im/IMProblem';
import IMShift from '@/components/solutions/im/IMShift';
import IMHowSolves from '@/components/solutions/im/IMHowSolves';
import IMImpact from '@/components/solutions/im/IMImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function InternalMobilityPage() {
  const { t, lang } = useLanguage();
  const isIT = lang === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/solutions/internal-mobility`;

  return (
    <>
      <Head>
        <title>{isIT ? 'Mobilità Interna e Successione | Skillvue' : 'Internal Mobility & Succession | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Mappa competenze e potenziale nell'intera organizzazione. Successione data-driven, mobilità interna trasparente e talento interno finalmente visibile."
          : 'Map skills and potential across your entire workforce. Make internal talent visible, succession decisions data-driven and mobility paths transparent.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
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
        <SolutionCrossLinks currentPath="/solutions/internal-mobility" />
        <SolutionFinalCTA headline={t('Ready to unlock the talent you')} accentWord={t('already have?')} />
      <Footer />
      </main>
    </>
  );
}

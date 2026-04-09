// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import ScienceHero from '@/components/science/ScienceHero';
import ScientificPillars from '@/components/science/ScientificPillars';
import ScienceTeam from '@/components/science/ScienceTeam';
import MethodologyLifecycle from '@/components/science/MethodologyLifecycle';
import ResponsibleAI from '@/components/science/ResponsibleAI';
import ScienceCTA from '@/components/science/ScienceCTA';
import ProductCrossLinks from '@/components/shared/ProductCrossLinks';

export default function SciencePage() {
  const { locale } = useRouter();
  const isIT = locale === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/science`;

  return (
    <>
      <Head>
        <title>{isIT ? 'La Scienza di Skillvue | Psicometria e AI per il Talent' : 'The Science Behind Skillvue | Psychometrics & AI'}</title>
        <meta name="description" content={isIT
          ? "Skillvue è costruita sulla psicologia I/O e la psicometria. Ogni valutazione è accurata, affidabile e progettata per resistere al vaglio scientifico."
          : 'Skillvue is built on I/O psychology and psychometrics. Every assessment is accurate, reliable and defensible — designed to hold up to scientific scrutiny.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <ScienceHero />
        <div className="fade-into-light" />
        <ScientificPillars />
        <ScienceTeam />
        <div className="fade-into-dark" />
        <MethodologyLifecycle />
        <div className="fade-into-light" />
        <ResponsibleAI />
        <div className="fade-into-dark" />
        <ProductCrossLinks />
        <ScienceCTA />
      <Footer />
      </main>
    </>
  );
}

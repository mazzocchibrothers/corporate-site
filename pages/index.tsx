import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CustomerStoriesSection from '@/components/landing/CustomerStoriesSection';
import ROISection from '@/components/landing/ROISection';
import CTASection from '@/components/landing/CTASection';

export default function HomePage() {
  const { locale } = useRouter();
  const isIT = locale === 'it';
  const canonical = isIT ? 'https://skillvue.ai/it' : 'https://skillvue.ai/';

  return (
    <>
      <Head>
        <title>{isIT ? 'Skillvue | Piattaforma di Talent Intelligence con AI' : 'Skillvue | AI Talent Intelligence Platform'}</title>
        <meta name="description" content={isIT
          ? "Valuta le competenze, prevedi le performance e rendi ogni decisione di hiring e promozione difendibile. Skillvue combina la scienza psicometrica con l'AI per le aziende europee."
          : 'Assess skills, predict performance and make every hiring and promotion decision defensible. Skillvue combines psychometric rigour with AI for European enterprises.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <div className="fade-into-light" />
        <ProblemSection />
        <div className="fade-into-dark" />
        <SolutionSection />
        <div className="fade-into-light" />
        <HowItWorksSection />
        <div className="fade-into-dark" />
        <CustomerStoriesSection />
        <div className="fade-into-light" />
        <ROISection />
        <div className="fade-into-dark" />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}

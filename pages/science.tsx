// @ts-nocheck
import React from 'react';
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
  return (
    <>
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

// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import IMHero from '@/components/solutions/im/IMHero';
import IMProblem from '@/components/solutions/im/IMProblem';
import IMShift from '@/components/solutions/im/IMShift';
import IMHowSolves from '@/components/solutions/im/IMHowSolves';
import IMImpact from '@/components/solutions/im/IMImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function InternalMobilityPage() {
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
        <SolutionCrossLinks currentPath="/solutions/internal-mobility" />
        <SolutionFinalCTA headline="Ready to unlock the talent you" accentWord="already have?" />
      <Footer />
      </main>
    </>
  );
}

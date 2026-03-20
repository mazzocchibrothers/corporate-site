// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TAHero from '@/components/solutions/ta/TAHero';
import TAProblem from '@/components/solutions/ta/TAProblem';
import TAShift from '@/components/solutions/ta/TAShift';
import TAHowSolves from '@/components/solutions/ta/TAHowSolves';
import TAPlaybook from '@/components/solutions/ta/TAPlaybook';
import TAExperience from '@/components/solutions/ta/TAExperience';
import TAImpact from '@/components/solutions/ta/TAImpact';
import TAFunnel from '@/components/solutions/ta/TAFunnel';
import TACustomerStory from '@/components/solutions/ta/TACustomerStory';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function TalentAcquisitionPage() {
  return (
    <>
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
        <SolutionFinalCTA headline="Ready to hire with" accentWord="confidence?" />
      <Footer />
      </main>
    </>
  );
}

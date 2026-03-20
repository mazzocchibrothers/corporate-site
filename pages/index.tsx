import React from 'react';
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
  return (
    <>
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

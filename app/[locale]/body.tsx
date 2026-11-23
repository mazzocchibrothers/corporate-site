'use client';

import React from 'react';
import { LazyMotion } from 'framer-motion';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import { PlatformCards } from '@/components/product/PlatformCards';
import CustomerStoriesSection from '@/components/landing/CustomerStoriesSection';
import ROISection from '@/components/landing/ROISection';
import CTASection from '@/components/landing/CTASection';

const loadMotionFeatures = () => import('@/lib/motion-features').then((res) => res.default);


export default function HomePage() {
  return (
    <>
      <>
        {/* Preconnect for the hero's YouTube facade — only this page has the video. */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      </>
      <Navbar />
      <LazyMotion features={loadMotionFeatures} strict>
        <main>
          <HeroSection />
          <div className="fade-into-light" />
          <ProblemSection />
          <div className="fade-into-dark" />
          <SolutionSection />
          <div className="fade-into-light" />
          {/* The platform as /product introduces it: Map, Assess, Decide, on the
              light-section grey. The id is the old section's, so links to
              /#how-it-works still land here. */}
          <section id="how-it-works" className="section-breathe py-16 md:py-20 lg:py-28">
            <PlatformCards link="page" surface={false} />
          </section>
          <div className="fade-into-dark" />
          <CustomerStoriesSection />
          <div className="fade-into-light" />
          <ROISection />
          <div className="fade-into-dark" />
          <CTASection />
          <Footer />
        </main>
      </LazyMotion>
    </>
  );
}

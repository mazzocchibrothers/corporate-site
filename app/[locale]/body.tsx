'use client';

import React from 'react';
import { LazyMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { href } from '@/i18n/routes';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CustomerStoriesSection from '@/components/landing/CustomerStoriesSection';
import ROISection from '@/components/landing/ROISection';
import CTASection from '@/components/landing/CTASection';

const loadMotionFeatures = () => import('@/lib/motion-features').then((res) => res.default);


export default function HomePage() {
  const t = useTranslations('home.banner');
  const locale = useLocale();

  return (
    <>
      <>
        {/* Hero's italic gradient span needs Bold Italic; only this page (and /science) does. */}
        <link rel="preload" href="/fonts/MonaSans-BoldItalic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Preconnect for the hero's YouTube facade — only this page has the video. */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      </>
      <Navbar
        banner={
          <div className="h-12 flex items-center justify-center gap-4 px-5 bg-[#ece9fb] text-[14px] md:text-[16px]">
            <span className="text-[#121212]">{t('text')}</span>
            <a
              href={href('product/skillvue-map', locale)}
              className="inline-flex items-center gap-1 font-semibold text-[#4b4df7] border-b-2 border-[#4b4df7] hover:text-[#3133e7] hover:border-[#3133e7] transition-colors"
            >
              {t('cta')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        }
      />
      <LazyMotion features={loadMotionFeatures} strict>
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
      </LazyMotion>
    </>
  );
}

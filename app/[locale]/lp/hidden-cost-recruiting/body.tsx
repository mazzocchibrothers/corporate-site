// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';
import React, { useEffect, useRef, useState } from 'react';
import SkillvueLogo from '@/components/landing/SkillvueLogo';
import { Button } from '@/components/ui/button';

// TODO: Replace with the actual HubSpot form ID for this whitepaper
const HUBSPOT_PORTAL_ID = '48438018';
const HUBSPOT_FORM_ID = 'YOUR_WHITEPAPER_FORM_ID';

const FADE = { y: 32, duration: 0.7, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' };

const stats = [
  { value: '€15–25M', label: 'Non-predictive selection cost / year' },
  { value: '2,000', label: 'Agents in the reference network' },
  { value: '20–25%', label: 'Annual agency network turnover' },
  { value: '0.54', label: 'Predictive validity of verification' },
];

const chapters = [
  {
    num: '01',
    title: 'The Hybrid Agent: A Rising Profile',
    desc: 'How digital penetration has redefined the insurance agent from salesperson to trusted advisor.',
  },
  {
    num: '02',
    title: '4 Key Traits of High-Performing Agents',
    desc: 'The behavioural dimensions that predict effectiveness in the new distribution model.',
  },
  {
    num: '03',
    title: 'Why Traditional Hiring No Longer Works',
    desc: 'Three critical limitations of unstructured interviews and personality tests.',
  },
  {
    num: '04',
    title: 'Measuring Talent Through Structured Verification',
    desc: 'How behavioural event interviews and situational judgment tests surface real potential.',
  },
  {
    num: '05',
    title: 'From Verification to Impact',
    desc: 'Expected ROI: improved selection quality, network productivity, and cross-market consistency.',
  },
];

const dimensions = [
  {
    num: 1,
    title: 'Resilience Under Commercial Pressure',
    desc: 'Observable behavioural patterns: analysing interactions after refusals, seeking feedback, avoiding generalising setbacks. Resilient agents recover productivity dips faster and ensure portfolio stability.',
    pct: 85,
  },
  {
    num: 2,
    title: 'Advisory Mindset vs. Transactional Selling',
    desc: 'Consultatively oriented profiles build relationships with significantly higher lifetime value. Traditional interviews cannot detect this distinction — every candidate knows what to say.',
    pct: 92,
  },
  {
    num: 3,
    title: 'Omnichannel Adaptability',
    desc: 'Moving coherently between face-to-face, digital, and telephone is today a core competency. Top performers show lower resistance to workflow change and natural communication adaptation.',
    pct: 78,
  },
  {
    num: 4,
    title: 'Active Listening & Implicit Cue Interpretation',
    desc: 'The ability to intercept unstated concerns and read tensions between protection needs and budget constraints. Accenture (2024) identifies this as the most significant differentiator among top performers.',
    pct: 88,
  },
];

const economics = [
  { value: '€35–50k', label: 'Cost of a failed hire' },
  { value: '25–40%', label: 'Reduction in mis-hire rate' },
  { value: '3–5×', label: 'Top vs. low performer differential' },
  { value: '0.54', label: 'Predictive validity of structured verification' },
];



export default function HiddenCostRecruiting() {
  const t = useTranslations('lp.hidden-cost-recruiting');
  const formRef = useRef(null);
  const formSectionRef = useRef(null);
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID,
          region: 'na1',
          target: '#lp-hubspot-form',
          onFormReady: () => setFormLoaded(true),
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>

      {/* ── LP NAVBAR ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-12 py-4"
        style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <SkillvueLogo size={28} className="text-white" />
          <span className="text-white/90 font-semibold text-[15px] tracking-[-0.03em]">{t('text')}</span>
        </div>
        <Button variant="primary" mode="light" icon={null} onClick={scrollToForm}>
          {t('text2')}</Button>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-24 lg:py-32">
          <div className="max-w-[780px]">
            {/* Badge */}
            <Reveal
              {...FADE}
              delay={0.1}
              className="inline-flex items-center gap-2 mb-8"
            >
              {t.rich('text3', {
          s: (chunks) => <span className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase text-white" style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>{chunks}</span>,
        })}</Reveal>

            {/* Title */}
            <Reveal
              {...FADE}
              delay={0.2}
              as="h1"
              className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-6"
              style={{ lineHeight: 1.1 }}
            >
              {t.rich('text4', {
          s: (chunks) => <span className="gradient-text">{chunks}</span>,
          br: () => <br />,
        })}</Reveal>

            {/* Subtitle */}
            <Reveal
              {...FADE}
              delay={0.3}
              as="p"
              className="text-[18px] text-white/55 leading-[1.75] mb-10 max-w-[560px]"
              style={{ fontWeight: 300 }}
            >
              {t('text5')}</Reveal>

            {/* Metadata */}
            <Reveal
              {...FADE}
              delay={0.4}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/40 mb-14"
            >
              {t.rich('text6', {
          s: (chunks) => <span>{chunks}</span>,
          b: (chunks) => <strong className="text-white/60">{chunks}</strong>,
          s2: (chunks) => <span className="w-px h-3 bg-white/15 hidden sm:block">{chunks}</span>,
          s3: (chunks) => <span>{chunks}</span>,
          s4: (chunks) => <span className="w-px h-3 bg-white/15 hidden sm:block">{chunks}</span>,
          s5: (chunks) => <span>{chunks}</span>,
        })}</Reveal>

            {/* CTA */}
            <Reveal {...FADE} delay={0.5}>
              <Button variant="primary" mode="light" onClick={scrollToForm}>
                {t('text7')}</Button>
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal
            {...FADE}
            delay={0.6}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6"
              >
                <div
                  className="text-[2rem] font-semibold md:font-bold tracking-[-0.03em] mb-1"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {s.value}
                </div>
                <div className="text-[12px] text-white/45 leading-snug">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ─────────────────────────────────────── */}
      <section className="relative pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full">
          <Reveal
            {...FADE}
            delay={0}
            className="rounded-2xl p-8 lg:p-12"
            style={{ border: '1px solid rgba(75,77,247,0.2)', background: 'rgba(75,77,247,0.05)' }}
          >
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('body')}</p>
            <p className="text-[18px] lg:text-[20px] text-white/80 leading-[1.75]" style={{ fontWeight: 300 }}>
              {t.rich('body2', {
          b: (chunks) => <strong className="text-white/95">{chunks}</strong>,
          b2: (chunks) => <strong className="text-white/95">{chunks}</strong>,
          b3: (chunks) => <strong className="text-white/95">{chunks}</strong>,
          b4: (chunks) => <strong className="text-white/95">{chunks}</strong>,
        })}</p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ─────────────────────────────────────────── */}
      <div className="fade-into-light" />
      <section className="section-breathe py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full">
          <Reveal {...FADE} className="mb-14">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('body3')}</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] text-[#0D0D0D] leading-[1.15]">
              {t('heading')}</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((c, i) => (
              <Reveal
                {...FADE}
                delay={i * 0.08}
                key={i}
                className="rounded-2xl bg-white border border-black/[0.06] p-7 hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-[11px] font-bold tracking-[0.2em] mb-4"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {c.num}
                </div>
                <h3 className="text-[15px] font-semibold text-[#0D0D0D] mb-2 leading-snug">{c.title}</h3>
                <p className="text-[13px] text-[#0D0D0D]/55 leading-[1.65]">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="fade-into-dark" />

      {/* ── 4 BEHAVIORAL DIMENSIONS ───────────────────────────────── */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full">
          <Reveal {...FADE} className="mb-14">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('body4')}</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] text-white/95 leading-[1.15] max-w-[600px]">
              {t.rich('heading2', {
          s: (chunks) => <span className="gradient-text">{chunks}</span>,
        })}</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {dimensions.map((d, i) => (
              <Reveal
                {...FADE}
                delay={i * 0.1}
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                  >
                    {d.num}
                  </div>
                  <h3 className="text-[16px] font-semibold text-white/90 leading-snug pt-1">{d.title}</h3>
                </div>
                <p className="text-[14px] text-white/50 leading-[1.7] mb-6">{d.desc}</p>
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-white/30 tracking-wide">{t('text8')}</span>
                    <span className="text-[12px] font-semibold text-white/60">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${d.pct}%`, background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECONOMICS ─────────────────────────────────────────────── */}
      <section className="relative pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full">
          <Reveal {...FADE} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 lg:p-10">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('body5')}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {economics.map((e, i) => (
                <div key={i}>
                  <div
                    className="text-[32px] font-semibold md:text-[2.2rem] md:font-bold tracking-[-0.03em] mb-1"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {e.value}
                  </div>
                  <div className="text-[12px] text-white/40 leading-snug">{e.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              <p className="text-[15px] text-white/60 leading-[1.7]" style={{ fontWeight: 300 }}>
                {t.rich('body6', {
          i: (chunks) => <em className="text-white/80 not-italic">{chunks}</em>,
        })}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DOWNLOAD FORM ─────────────────────────────────────────── */}
      <div className="fade-into-light" />
      <section ref={formSectionRef} className="section-breathe py-20 lg:py-28" id="download">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left */}
            <div className="lg:col-span-5">
              <Reveal {...FADE}>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t('body7')}</p>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-[#0D0D0D] leading-[1.15] mb-6">
                  {t.rich('heading3', {
          s: (chunks) => <span className="italic" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</h2>
                <p className="text-[16px] text-[#0D0D0D]/55 leading-[1.75] mb-8" style={{ fontWeight: 300 }}>
                  {t('body8')}</p>
                <ul className="space-y-3">
                  {[
                    'Why unstructured interviews have a predictive validity of only 0.38',
                    'The 4 behavioural dimensions that predict top-performer insurance agents',
                    'How structured verification reduces mis-hire rates by 25–40%',
                    'The EU AI Act regulatory framework as a competitive advantage',
                    '3 strategic questions for your executive committee',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-[#0D0D0D]/65 leading-snug">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                      >
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right: HubSpot Form */}
            <div className="lg:col-span-7">
              <Reveal
                {...FADE}
                delay={0.15}
                className="rounded-2xl bg-white border border-black/[0.08] p-8 lg:p-10 shadow-sm"
              >
                <h3 className="text-[18px] font-semibold text-[#0D0D0D] mb-2">{t('heading4')}</h3>
                <p className="text-[13px] text-[#0D0D0D]/45 mb-8">{t('body9')}</p>
                <div
                  id="lp-hubspot-form"
                  ref={formRef}
                  style={{ minHeight: '380px' }}
                />
                {!formLoaded && (
                  <div className="flex items-center justify-center h-[380px]">
                    <div className="text-[13px] text-[#0D0D0D]/30">{t('text9')}</div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <div className="fade-into-dark" />

      {/* ── ABOUT SKILLVUE ────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <Reveal {...FADE} className="lg:col-span-7">
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('body10')}</p>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] text-white/95 leading-[1.15] mb-6">
                {t.rich('heading5', {
          s: (chunks) => <span className="gradient-text">{chunks}</span>,
        })}</h2>
              <p className="text-[16px] text-white/50 leading-[1.8] mb-4" style={{ fontWeight: 300 }}>
                {t('body11')}</p>
              <p className="text-[16px] text-white/50 leading-[1.8]" style={{ fontWeight: 300 }}>
                {t('body12')}</p>
            </Reveal>
            <Reveal
              {...FADE}
              delay={0.15}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                <p className="text-[14px] text-white/40 italic leading-[1.75] mb-6">
                  {t('body13')}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-px h-8 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #4B4DF7, #FF5F24)' }}
                  />
                  <span className="text-[13px] text-white/50">{t('text10')}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/[0.06] py-8">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SkillvueLogo size={22} className="text-white/40" />
            <span className="text-[13px] text-white/30">{t('copyright', { year: new Date().getFullYear() })}</span>
          </div>
          <div className="flex items-center gap-6 text-[12px]">
            <Button asChild variant="tertiary" mode="dark" icon={null} className="text-[12px]">
              {t.rich('text11', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            <Button asChild variant="tertiary" mode="dark" icon={null} className="text-[12px]">
              {t.rich('text12', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </div>
        </div>
      </footer>
    </>
  );
}

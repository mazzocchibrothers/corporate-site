// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/reveal';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';



export default function PrivacyPolicyAlgo() {
  const t = useTranslations('privacy-policy-algo');
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(75,77,247,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <div className="relative z-10 max-w-[900px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <Reveal y={20} duration={0.6}>
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-6 block">
                {t('text')}</span>
              <h1 className="font-semibold text-white/95 mb-4 text-[48px] md:text-[64px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {t('heading')}</h1>
              <p className="text-[16px] text-white/40 leading-[1.7]">
                {t('body')}</p>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="section-breathe py-16 lg:py-24">
          <div className="max-w-[900px] mx-auto px-8 lg:px-12">
            <Reveal
              y={20}
              duration={0.6}
              delay={0.2}
              className="prose-custom"
            >

              {/* ══ NOTICE 1: SITO WEB ══ */}
              <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8" style={{ background: 'rgba(217,96,63,0.08)', color: '#D9603F', border: '1px solid rgba(217,96,63,0.18)' }}>
                  {t('text2')}</div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold text-[#121212] mb-3 leading-[1.3]">
                  {t('heading2')}</h2>
                <p className="text-[14px] text-[#121212]/40 mb-8">
                  {t('body2')}</p>

                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-6">
                  {t.rich('body3', {
          a: (chunks) => <a href="https://www.skillvue.ai/it" target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-10">
                  {t('body4')}</p>

                <PolicySection title={t('heading5')}>
                  <p>{t('body5')}</p>
                  <p className="font-semibold text-[#121212]/80 mt-4">{t('body6')}</p>
                  <ul>
                    <li>{t('item')}</li>
                    <li>{t.rich('item2', {
          a: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading6')}>
                  <p>{t.rich('body7', {
          a: (chunks) => <a href="mailto:dpo@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
                </PolicySection>

                <PolicySection title={t('heading7')}>
                  <p>{t('body8')}</p>
                  <p>{t('body9')}</p>
                  <ul>
                    <li>{t('item3')}</li>
                    <li>{t('item4')}</li>
                    <li>{t('item5')}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading8')}>
                  <p>{t('body10')}</p>
                  <p className="mt-5">{t.rich('body11', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body12', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body13', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body14', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </PolicySection>

                <PolicySection title={t('heading9')}>
                  <p>{t('body15')}</p>
                </PolicySection>

                <PolicySection title={t('heading10')}>
                  <p>{t('body16')}</p>
                </PolicySection>

                <PolicySection title={t('heading11')}>
                  <p>{t('body17')}</p>
                  <p>{t('body18')}</p>
                </PolicySection>

                <PolicySection title={t('heading12')}>
                  <p>{t('body19')}</p>
                  <ul>
                    <li>{t('item6')}</li>
                    <li>{t('item7')}</li>
                    <li>{t('item8')}</li>
                  </ul>
                  <p>{t('body20')}</p>
                </PolicySection>

                <PolicySection title={t('heading13')}>
                  <p>{t('body21')}</p>
                  <ul>
                    <li>{t('item9')}</li>
                    <li>{t('item10')}</li>
                  </ul>
                  <p>{t('body22')}</p>
                </PolicySection>

                <PolicySection title={t('heading14')}>
                  <p>{t('body23')}</p>
                  <p>{t.rich('body24', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body25', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body26', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body27', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t('body28')}</p>
                </PolicySection>

                <PolicySection title={t('heading15')}>
                  <p>{t('body29')}</p>
                  <ul>
                    <li>{t.rich('item11', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                    <li>{t.rich('item12', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                    <li>{t.rich('item13', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                    <li>{t.rich('item14', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                    <li>{t.rich('item15', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                    <li>{t.rich('item16', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                    <li>{t.rich('item17', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</li>
                  </ul>
                  <p>{t.rich('body30', {
          a: (chunks) => <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
          a2: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
          a3: (chunks) => <a href="mailto:dpo@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
                </PolicySection>

                <p className="text-[13px] text-[#121212]/35 mt-12 pt-8 border-t border-[#121212]/[0.06]">
                  {t('body31')}</p>
              </div>

              {/* Notice-level divider */}
              <div className="h-px bg-[#121212]/[0.1] mb-20" />

              {/* ══ NOTICE 2: SOFTWARE SKILLVUE (AI) ══ */}

              {/* IT Version */}
              <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-4" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  {t('text3')}</div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8 ml-2" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  {t('text4')}</div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold text-[#121212] mb-8 leading-[1.3]">
                  {t('heading3')}</h2>

                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-10">
                  {t.rich('body32', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>

                <PolicySection title={t('heading16')}>
                  <p>{t('body33')}</p>
                  <ul>
                    <li>{t('item18')}</li>
                    <li>{t('item19')}</li>
                    <li>{t('item20')}</li>
                    <li>{t.rich('item21', {
          a: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading17')}>
                  <p>{t('body34')}</p>
                </PolicySection>

                <PolicySection title={t('heading18')}>
                  <ul>
                    <li>{t('item22')}</li>
                    <li>{t('item23')}</li>
                    <li>{t('item24')}</li>
                    <li>{t('item25')}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading19')}>
                  <p>{t.rich('body35', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body36', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </PolicySection>

                <PolicySection title={t('heading20')}>
                  <p>{t('body37')}</p>
                </PolicySection>

                <PolicySection title={t('heading21')}>
                  <p>{t.rich('body38', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </PolicySection>

                <PolicySection title={t('heading22')}>
                  <ul>
                    <li>{t('item26')}</li>
                    <li>{t('item27')}</li>
                    <li>{t('item28')}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading23')}>
                  <p>{t('body39')}</p>
                </PolicySection>

                <PolicySection title={t('heading24')}>
                  <p>{t('body40')}</p>
                  <ul>
                    <li>{t('item29')}</li>
                    <li>{t('item30')}</li>
                    <li>{t('item31')}</li>
                    <li>{t('item32')}</li>
                  </ul>
                  <p>{t.rich('body41', {
          a: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
                </PolicySection>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#121212]/[0.08] mb-20" />

              {/* EN Version */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  {t('text5')}</div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold text-[#121212] mb-8 leading-[1.3]">
                  {t('heading4')}</h2>

                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-10">
                  {t.rich('body42', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>

                <PolicySection title={t('heading25')}>
                  <p>{t('body43')}</p>
                  <ul>
                    <li>{t('item33')}</li>
                    <li>{t('item34')}</li>
                    <li>{t('item35')}</li>
                    <li>{t.rich('item36', {
          a: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading26')}>
                  <p>{t('body44')}</p>
                </PolicySection>

                <PolicySection title={t('heading27')}>
                  <ul>
                    <li>{t('item37')}</li>
                    <li>{t('item38')}</li>
                    <li>{t('item39')}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading28')}>
                  <p>{t.rich('body45', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>{t.rich('body46', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </PolicySection>

                <PolicySection title={t('heading29')}>
                  <p>{t('body47')}</p>
                </PolicySection>

                <PolicySection title={t('heading30')}>
                  <p>{t.rich('body48', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </PolicySection>

                <PolicySection title={t('heading31')}>
                  <ul>
                    <li>{t('item40')}</li>
                    <li>{t('item41')}</li>
                    <li>{t('item42')}</li>
                  </ul>
                </PolicySection>

                <PolicySection title={t('heading32')}>
                  <p>{t('body49')}</p>
                </PolicySection>

                <PolicySection title={t('heading33')}>
                  <p>{t('body50')}</p>
                  <ul>
                    <li>{t('item43')}</li>
                    <li>{t('item44')}</li>
                    <li>{t('item45')}</li>
                    <li>{t('item46')}</li>
                  </ul>
                  <p>{t.rich('body51', {
          a: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
                </PolicySection>

                <p className="text-[13px] text-[#121212]/35 mt-12 pt-8 border-t border-[#121212]/[0.06]">
                  {t('body52')}</p>
              </div>

            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-[17px] font-semibold text-[#121212] mb-4 pb-3 border-b border-[#121212]/[0.07]">
        {title}
      </h3>
      <div className="text-[15px] text-[#121212]/65 leading-[1.8] space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mt-2">
        {children}
      </div>
    </div>
  );
}

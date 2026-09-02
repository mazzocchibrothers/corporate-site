// @ts-nocheck
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

function PolicySection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <h2 className="text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold text-[#121212] mb-5 pb-4 border-b border-[#121212]/[0.07] leading-[1.4]">
        <span className="text-[#4B4DF7] mr-2">{num}.</span>{title}
      </h2>
      <div className="text-[15px] text-[#121212]/70 leading-[1.85] space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mt-2">
        {children}
      </div>
    </div>
  );
}

function SubSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 pl-0">
      <h3 className="text-[16px] font-semibold text-[#121212]/85 mb-3 leading-[1.5]">
        {num} {title}
      </h3>
      <div className="text-[15px] text-[#121212]/70 leading-[1.8] space-y-3">
        {children}
      </div>
    </div>
  );
}



export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy-policy');
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] min-h-[45vh] flex items-end">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-24">
            <Button
              onClick={() => router.back()}
              variant="tertiary"
              mode="dark"
              icon={<ArrowLeft aria-hidden />}
              iconPosition="left"
              className="mb-10"
            >{t('cta')}</Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-[40px] md:text-[56px] font-semibold text-white/95 mb-4 tracking-[-0.02em] leading-[1.1]">
                {t('heading')}</h1>
              <p className="text-[16px] text-white/[0.45] leading-[1.75] max-w-2xl" style={{ fontWeight: 300 }}>
                {t('body')}</p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-breathe">
          <div className="max-w-[860px] mx-auto px-8 lg:px-12 py-20 lg:py-28">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 space-y-5"
            >
              <p className="text-[16px] text-[#121212]/70 leading-[1.85]">
                {t.rich('body2', {
          a: (chunks) => <a href="https://www.skillvue.ai/it" target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
              <p className="text-[16px] text-[#121212]/70 leading-[1.85]">
                {t('body3')}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

              <PolicySection num="1" title={t('sections.s1')}>
                <p>
                  {t('body4')}</p>
                <p className="font-semibold text-[#121212]/80">{t('body5')}</p>
                <ul>
                  <li>{t('item')}</li>
                  <li>
                    {t.rich('item2', {
          a: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</li>
                </ul>
              </PolicySection>

              <PolicySection num="2" title={t('sections.s2')}>
                <p>
                  {t.rich('body6', {
          a: (chunks) => <a href="mailto:dpo@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
              </PolicySection>

              <PolicySection num="3" title={t('sections.s3')}>
                <p>{t('body7')}</p>
                <p>{t('body8')}</p>
                <ul>
                  <li>{t('item3')}</li>
                  <li>{t('item4')}</li>
                  <li>{t('item5')}</li>
                </ul>
              </PolicySection>

              <PolicySection num="4" title={t('sections.s4')}>
                <p>{t('body9')}</p>

                <SubSection num="4.1" title={t('subsections.s41')}>
                  <p>
                    {t.rich('body10', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>
                    {t.rich('body11', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </SubSection>

                <SubSection num="4.2" title={t('subsections.s42')}>
                  <p>
                    {t.rich('body12', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>
                    {t.rich('body13', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </SubSection>

                <SubSection num="4.3" title={t('subsections.s43')}>
                  <p>
                    {t.rich('body14', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>
                    {t.rich('body15', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </SubSection>

                <SubSection num="4.4" title={t('subsections.s44')}>
                  <p>
                    {t.rich('body16', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                  <p>
                    {t.rich('body17', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                </SubSection>
              </PolicySection>

              <PolicySection num="5" title={t('sections.s5')}>
                <p>
                  {t('body18')}</p>
              </PolicySection>

              <PolicySection num="6" title={t('sections.s6')}>
                <p>
                  {t('body19')}</p>
              </PolicySection>

              <PolicySection num="7" title={t('sections.s7')}>
                <p>
                  {t('body20')}</p>
                <p>
                  {t('body21')}</p>
              </PolicySection>

              <PolicySection num="8" title={t('sections.s8')}>
                <p>{t('body22')}</p>
                <ul>
                  <li>{t('item6')}</li>
                  <li>{t('item7')}</li>
                  <li>{t('item8')}</li>
                </ul>
                <p>
                  {t('body23')}</p>
              </PolicySection>

              <PolicySection num="9" title={t('sections.s9')}>
                <p>
                  {t('body24')}</p>
                <ul>
                  <li>{t('item9')}</li>
                  <li>{t('item10')}</li>
                </ul>
                <p>
                  {t('body25')}</p>
              </PolicySection>

              <PolicySection num="10" title={t('sections.s10')}>
                <p>{t('body26')}</p>
                <p>
                  {t.rich('body27', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                <p>
                  {t.rich('body28', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                <p>
                  {t.rich('body29', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                <p>
                  {t.rich('body30', {
          b: (chunks) => <strong className="text-[#121212]/85 font-semibold">{chunks}</strong>,
        })}</p>
                <p>
                  {t('body31')}</p>
              </PolicySection>

              <PolicySection num="11" title={t('sections.s11')}>
                <p>{t('body32')}</p>
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
                <p>
                  {t.rich('body33', {
          a: (chunks) => <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
          a2: (chunks) => <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
          a3: (chunks) => <a href="mailto:dpo@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">{chunks}</a>,
        })}</p>
              </PolicySection>

            </motion.div>

            {/* Last modified */}
            <div className="border-t border-[#121212]/[0.06] mt-4 pt-10">
              <p className="text-[13px] text-[#121212]/[0.3] leading-[1.7]">
                {t('body34')}</p>
            </div>
          </div>
        </section>

      <Footer />
      </main>
    </>
  );
}

// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SkillvueIcon({ size = 24 }: { size?: number }) {
  return (
    <img
      src="/skillvue-logomark.svg"
      alt="Skillvue"
      width={size}
      height={size}
      style={{ display: 'inline-block', flexShrink: 0 }}
    />
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-5 text-center">
      <div
        className="text-[1.9rem] font-bold tracking-[-0.02em] mb-1"
        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {value}
      </div>
      <div className="text-[12px] text-[#0D0D0D]/45 leading-snug">{label}</div>
    </div>
  );
}

function Quote({ children, source }: { children: React.ReactNode; source?: string }) {
  return (
    <div
      className="rounded-xl p-6 my-8"
      style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg, #4B4DF7, #FF5F24) 1', background: 'rgba(75,77,247,0.03)' }}
    >
      <p className="text-[15px] text-[#0D0D0D]/60 italic leading-[1.7] mb-2">{children}</p>
      {source && <p className="text-[12px] text-[#0D0D0D]/35">— {source}</p>}
    </div>
  );
}

function SectionHeading({ num, title }: { num?: string; title: string }) {
  return (
    <div className="mt-12 mb-5">
      <div className="w-8 h-0.5 rounded mb-3" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
      <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-[#0D0D0D]">
        {num && <span className="mr-1">{num}.</span>}{title}
      </h2>
    </div>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3
      className="text-[14px] font-semibold mb-2 mt-6 flex items-center gap-2"
      style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
    >
      {title}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] text-[#0D0D0D]/70 leading-[1.75] mb-4">{children}</p>;
}

function InfoBox({ title, children, accent = false }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      className="rounded-xl p-6 my-6"
      style={{ border: `1px solid ${accent ? 'rgba(255,85,36,0.2)' : 'rgba(75,77,247,0.2)'}`, background: accent ? 'rgba(255,85,36,0.03)' : 'rgba(75,77,247,0.04)' }}
    >
      <p
        className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
        style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {title}
      </p>
      <div className="text-[14px] text-[#0D0D0D]/65 leading-[1.7]">{children}</div>
    </div>
  );
}

function NumberedItem({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-5">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[12px] font-bold"
        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
      >
        {n}
      </div>
      <div>
        <p
          className="text-[13px] font-bold mb-1"
          style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {title}
        </p>
        <p className="text-[13.5px] text-[#0D0D0D]/65 leading-[1.65]">{children}</p>
      </div>
    </div>
  );
}



export default function IlCostoInvisibileWhitepaper() {
  const t = useTranslations('lp.il-costo-invisibile.whitepaper');
  const tl = useTranslations('shared.lp');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <div style={{ background: '#F5F5F7', minHeight: '100vh' }}>
        {/* Top gradient bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #4B4DF7 0%, #FF5F24 100%)' }} />

        {/* Navbar */}
        <nav
          className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 py-3.5 bg-white"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center gap-2.5">
            <SkillvueIcon size={24} />
            <span className="font-bold text-[14px] text-[#0D0D0D] tracking-[-0.01em]">{t('text')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary" mode="light">
              <a
                href="/WP-I1-ITA.pdf"
                download="Il-Costo-Invisibile-Selezione-Non-Predittiva-Skillvue.pdf"
              >
                <Download aria-hidden="true" />{tl('downloadPdf')}</a>
            </Button>
            <Button asChild variant="primary" mode="light">
              <a
                href="https://www.skillvue.ai/contact-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tl('contact')}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </nav>

        {/* Document */}
        <div className="max-w-[760px] mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>

            {/* Document Cover */}
            <div className="px-10 pt-12 pb-8 text-center border-b border-black/[0.06]">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-7"
                style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
              >
                {t('text2')}</span>
              <h1 className="text-[48px] md:text-[2rem] font-semibold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
                {t.rich('heading', {
          s: (chunks) => <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</h1>
              <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
                {t('body')}</p>
              <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
              <p className="text-[13px] text-[#0D0D0D]/40">
                {t.rich('body2', {
          i: (chunks) => <em>{chunks}</em>,
        })}</p>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-1">{t.rich('body3', {
          i: (chunks) => <em>{chunks}</em>,
        })}</p>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
                {t.rich('body4', {
          s: (chunks) => <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>{chunks}</span>,
        })}</p>
            </div>

            {/* Document Body */}
            <div className="px-10 py-10">

              {/* Problem box */}
              <InfoBox title={t('heading5')}>
                <p>
                  {t.rich('body5', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b6: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b7: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              </InfoBox>

              {/* Cover stats */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <StatBox value="€15-25M" label={t('label')} />
                <StatBox value="2.000" label={t('label2')} />
                <StatBox value="20-25%" label={t('label3')} />
                <StatBox value="0,54" label={t('label4')} />
              </div>

              {/* Cost breakdown */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
                <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body6')}</p>
                <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body7')}</p>
                <div className="space-y-3">
                  {[
                    { label: 'Mancata produzione nei primi 12 mesi', pct: 45, color: '#FF6550' },
                    { label: 'Spese di formazione', pct: 25, color: '#9B59B6' },
                    { label: 'Spese di recruiting', pct: 20, color: '#4B4DF7' },
                    { label: 'Impatto negativo su portafoglio', pct: 10, color: '#FFB74B' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#0D0D0D]/55">{item.label}</span>
                        <span className="font-semibold" style={{ color: item.color }}>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/[0.06]">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Para>
                {t.rich('text3', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* Section 1 */}
              <SectionHeading num="1" title={t('heading6')} />
              <Para>
                {t.rich('text4', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text5', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          i: (chunks) => <em>{chunks}</em>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text6', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          i: (chunks) => <em>{chunks}</em>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t('text7')}</Para>

              {/* Predictive validity comparison */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
                <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body8')}</p>
                <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">{t('body9')}</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      {t.rich('text8', {
          s: (chunks) => <span className="text-[#0D0D0D]/55">{chunks}</span>,
          s2: (chunks) => <span className="font-bold text-[#EF4444]">{chunks}</span>,
        })}</div>
                    <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '38%', background: '#EF4444' }}>
                        {t.rich('text9', {
          s: (chunks) => <span className="text-white text-[11px] font-bold">{chunks}</span>,
        })}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      {t.rich('text10', {
          s: (chunks) => <span className="text-[#0D0D0D]/55">{chunks}</span>,
          s2: (chunks) => <span className="font-bold text-[#4B4DF7]">{chunks}</span>,
        })}</div>
                    <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '54%', background: 'linear-gradient(90deg, #4B4DF7, #7B4DFF)' }}>
                        {t.rich('text11', {
          s: (chunks) => <span className="text-white text-[11px] font-bold">{chunks}</span>,
        })}</div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#0D0D0D]/25 mt-4 italic">{t('body10')}</p>
              </div>

              {/* Section 2 */}
              <SectionHeading num="2" title={t('heading7')} />
              <Para>
                {t.rich('text12', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <NumberedItem n={1} title={t('heading8')}>
                {t.rich('text13', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

              <NumberedItem n={2} title={t('heading9')}>
                {t.rich('text14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

              <NumberedItem n={3} title={t('heading10')}>
                {t.rich('text15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

              <NumberedItem n={4} title={t('heading11')}>
                {t.rich('text16', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

              {/* 4 dimensions bar chart */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
                <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body11')}</p>
                <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">{t('body12')}</p>
                <div className="space-y-3">
                  {[
                    { label: 'Orientamento consulenziale', pct: 92 },
                    { label: 'Ascolto attivo', pct: 88 },
                    { label: 'Resilienza', pct: 85 },
                    { label: 'Adattabilità omnicanale', pct: 78 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#0D0D0D]/55">{item.label}</span>
                        <span className="font-semibold text-[#0D0D0D]/60">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/[0.06]">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <SectionHeading num="3" title={t('heading12')} />
              <Para>
                {t.rich('text17', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* Limits table */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] overflow-hidden my-6">
                <div className="grid grid-cols-3 bg-black/[0.04] text-[11px] font-bold uppercase tracking-[0.12em] text-[#0D0D0D]/50">
                  <div className="p-3 border-r border-black/[0.06]">{t('text18')}</div>
                  <div className="p-3 border-r border-black/[0.06]">{t('text19')}</div>
                  <div className="p-3">{t('text20')}</div>
                </div>
                {[
                  {
                    limite: 'Bassa validità predittiva',
                    causa: 'Il candidato risponde in base agli script attesi, non al comportamento reale',
                    impatto: 'Validità predittiva del colloquio non strutturato: 0,38 (Schmidt & Hunter, 2016)',
                  },
                  {
                    limite: 'Tratto vs. comportamento situazionale',
                    causa: 'I test di personalità misurano disposizioni latenti, non come il candidato agisce sotto pressione',
                    impatto: 'Alto punteggio in "coscienziosità" non predice la gestione di una trattativa complessa',
                  },
                  {
                    limite: 'Non scalabilità',
                    causa: 'Colloqui approfonditi con valutatori formati non sono replicabili su migliaia di posizioni',
                    impatto: 'Le reti europee gestiscono migliaia di inserimenti annui: la qualità di selezione cala con il volume',
                  },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 border-t border-black/[0.06] text-[12px] text-[#0D0D0D]/60">
                    <div className="p-3 border-r border-black/[0.06] font-semibold text-[#0D0D0D]/75">{row.limite}</div>
                    <div className="p-3 border-r border-black/[0.06]">{row.causa}</div>
                    <div className="p-3">{row.impatto}</div>
                  </div>
                ))}
              </div>

              <SubHeading title={t('heading13')} />
              <Para>
                {t.rich('text21', {
          i: (chunks) => <em>{chunks}</em>,
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading14')} />
              <Para>
                {t.rich('text22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading15')} />
              <Para>
                {t.rich('text23', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* Section 4 */}
              <SectionHeading num="4" title={t('heading16')} />
              <Para>
                {t.rich('text24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <InfoBox title={t('heading17')}>
                <p className="mb-3">
                  {t.rich('body13', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
        })}</p>
                <p className="font-semibold text-[#0D0D0D]/70 mb-2">{t('body14')}</p>
                <ul className="space-y-1.5">
                  {[
                    'Come il candidato bilancia il rischio di perdere il cliente con il dovere di consulenza adeguata — orientamento consulenziale',
                    'Se approfondisce le motivazioni reali attraverso domande mirate — ascolto attivo',
                    'Come gestisce la tensione tra aspettative del cliente e vincoli tecnici — resilienza',
                    'Se adatta linguaggio e dettaglio al profilo dell\'interlocutore — adattamento',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-[13px]">
                      <span className="text-[#4B4DF7] flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InfoBox>

              <Quote>
                {t('text26')}</Quote>

              <Para>
                {t.rich('text27', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading18')} />
              <Para>
                {t.rich('text28', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <Quote source="Regolamento (UE) 2024/1689 — Art. 10, 13, 14">
                {t('text29')}</Quote>

              {/* Section 5 */}
              <SectionHeading num="5" title={t('heading19')} />
              <Para>
                {t.rich('text30', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading20')} />
              <Para>
                {t.rich('text31', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading21')} />
              <Para>
                {t.rich('text32', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading22')} />
              <Para>
                {t.rich('text33', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <InfoBox title={t('heading23')} accent>
                <ul className="space-y-1.5">
                  <li>{t.rich('item', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#FF5F24', fontWeight: 600 }}>{chunks}</span>,
        })}</li>
                  <li>{t.rich('item2', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#FF5F24', fontWeight: 600 }}>{chunks}</span>,
        })}</li>
                  <li>{t.rich('item3', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#FF5F24', fontWeight: 600 }}>{chunks}</span>,
        })}</li>
                </ul>
                <p className="mt-3 text-[#0D0D0D]/60">
                  {t.rich('body15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
        })}</p>
              </InfoBox>

              {/* 3 domande */}
              <SectionHeading title={t('heading24')} />
              <Para>
                {t('text34')}</Para>

              {[
                {
                  n: 1,
                  q: 'Chi è il top performer nella tua rete oggi e lo sarà ancora tra tre anni?',
                  a: 'I KPI tradizionali misurano i traguardi raggiunti: premi emessi, numero di polizze e rinnovi, ma non spiegano il "come" dietro quei risultati. Senza comprendere le competenze e i comportamenti che generano la performance, è impossibile capire se il successo sia replicabile e sostenibile.',
                },
                {
                  n: 2,
                  q: 'Il tuo processo di selezione è comparabile tra i vari mercati, pur restando sensibile alle specificità locali?',
                  a: 'I grandi gruppi europei operano in mercati con culture profondamente diverse. Se il processo non è strutturato in modo comparabile, il rischio è di costruire reti basate su criteri incoerenti.',
                },
                {
                  n: 3,
                  q: 'La valutazione si ferma all\'ingresso o accompagna il ciclo di vita dell\'agente?',
                  a: 'I tratti che predicono un inserimento efficace non sono necessariamente gli stessi che garantiscono la crescita nel lungo periodo. Strumenti capaci di unire selezione, sviluppo e mobilità interna forniscono alla direzione HR un segnale continuo sulla salute comportamentale della rete.',
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="flex gap-4 p-5 rounded-xl mb-4"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#FAFAFA' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                  >
                    {item.n}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#0D0D0D]/80 mb-2 leading-snug">{item.q}</p>
                    <p className="text-[13px] text-[#0D0D0D]/50 leading-[1.65]">{item.a}</p>
                  </div>
                </div>
              ))}

              {/* Next step */}
              <div className="mt-10 mb-8">
                <div className="w-8 h-0.5 rounded mb-3" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-[#0D0D0D] mb-4">{t('heading2')}</h2>
              </div>
              <Para>
                {t.rich('text35', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <p className="text-[14px] text-[#0D0D0D]/50 mb-8">
                {t.rich('body16', {
          a: (chunks) => <a href="https://www.skillvue.ai/contact-us" className="hover:opacity-70 transition-opacity" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>{chunks}</a>,
        })}</p>

              {/* Final stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatBox value="€35-50k" label={t('label5')} />
                <StatBox value="25-40%" label={t('label6')} />
                <StatBox value="20-30%" label={t('label7')} />
                <StatBox value="3-5x" label={t('label8')} />
              </div>

              <Quote>
                {t('text36')}</Quote>

              {/* About Skillvue */}
              <div className="border-t border-black/[0.07] pt-10 mt-10">
                <div className="w-8 h-0.5 rounded mb-4" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
                <h3 className="text-[1.1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading3')}</h3>
                <Para>
                  {t.rich('text37', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
                <Para>
                  {t.rich('text38', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              </div>

              {/* References */}
              <div className="border-t border-black/[0.07] pt-8 mt-8">
                <h3 className="text-[1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading4')}</h3>
                <ul className="space-y-2">
                  {[
                    'McKinsey & Company (2023). The future of work in financial services: automation, reskilling, and redistribution.',
                    'EIOPA (2023). Digital Distribution of Insurance Products — Market Study.',
                    'Deloitte (2024). 2024 Insurance Industry Outlook: Navigating trust, talent and transformation.',
                    'Accenture (2024). Future of Insurance Distribution: The Trusted Advisor Model in European Markets.',
                    'Schmidt, F.L. & Hunter, J.E. (1998, updated 2016). The validity and utility of selection methods in personnel psychology. Psychological Bulletin.',
                    'Good, V., Hughes, D.E. & LaBrecque, A.C. (2020). Understanding and motivating salesperson resilience. Marketing Letters, 32, 113–127.',
                    'EU AI Act — Regulation (EU) 2024/1689. Insurance Distribution Directive (IDD) — EIOPA Implementation Reports 2022–2023.',
                  ].map((ref, i) => (
                    <li key={i} className="text-[12px] text-[#0D0D0D]/40 italic leading-[1.6]">{ref}</li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-black/[0.07] pt-6 mt-8 flex items-center justify-between">
                <span className="text-[11px] text-[#0D0D0D]/25">{t('text39')}</span>
                <div className="flex items-center gap-2">
                  <SkillvueIcon size={16} />
                  <span className="text-[11px] text-[#0D0D0D]/25">{t('text40')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Page footer */}
        <div className="py-6 px-6 text-center">
          <p className="text-[12px] text-[#0D0D0D]/30">
            {tl('copyright', { year: new Date().getFullYear() })} ·{' '}
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text41', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            {' '}·{' '}
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text42', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </p>
        </div>
      </div>
    </>
  );
}

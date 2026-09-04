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
      className="text-[14px] font-semibold mb-2 mt-6"
      style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
    >
      {title}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] text-[#0D0D0D]/70 leading-[1.75] mb-4">{children}</p>;
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-6 my-6"
      style={{ border: '1px solid rgba(75,77,247,0.2)', background: 'rgba(75,77,247,0.04)' }}
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



export default function CareerAspirationInsuranceWhitepaper() {
  const t = useTranslations('lp.career-aspiration-insurance.whitepaper');
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
                href="/WP-I2-ITA.pdf"
                download="Career-Aspiration-Intelligence-Insurance-Skillvue.pdf"
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

              {/* Executive Summary */}
              <InfoBox title={t('heading5')}>
                <p className="mb-3">
                  {t.rich('body5', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
                <p>
                  {t.rich('body6', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              </InfoBox>

              {/* Cover stats */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <StatBox value="75%" label={t('label')} />
                <StatBox value="67%" label={t('label2')} />
                <StatBox value="20-25%" label={t('label3')} />
                <StatBox value="1,5-2x" label={t('label4')} />
              </div>

              {/* TURNOVER PREVENIBILE */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
                <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body7')}</p>
                <p className="text-[13px] text-[#0D0D0D]/40 mb-5 italic">{t('body8')}</p>
                <div className="flex items-center gap-8">
                  {/* Donut chart visual */}
                  <div className="relative flex-shrink-0">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="14" />
                      <circle
                        cx="50" cy="50" r="38" fill="none" strokeWidth="14"
                        stroke="url(#donut-grad)"
                        strokeDasharray={`${2 * Math.PI * 38 * 0.75} ${2 * Math.PI * 38 * 0.25}`}
                        strokeDashoffset={2 * Math.PI * 38 * 0.25}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4B4DF7" />
                          <stop offset="100%" stopColor="#FF5F24" />
                        </linearGradient>
                      </defs>
                      <text x="50" y="55" textAnchor="middle" className="text-[16px] font-bold" fill="#0D0D0D" fontSize="16" fontWeight="bold">75%</text>
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-[13px] font-semibold mb-3"
                      style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {t('body9')}</p>
                    <div className="flex flex-col gap-1.5 text-[12px] text-[#0D0D0D]/45">
                      {t.rich('text3', {
          s: (chunks) => <span className="flex items-center gap-1.5">{chunks}</span>,
          s2: (chunks) => <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}>{chunks}</span>,
          s3: (chunks) => <span className="flex items-center gap-1.5">{chunks}</span>,
          s4: (chunks) => <span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block">{chunks}</span>,
        })}</div>
                    <p className="text-[11px] text-[#0D0D0D]/25 mt-3 italic">{t('body10')}</p>
                  </div>
                </div>
              </div>

              <Para>
                {t.rich('text4', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text5', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* Section 1 */}
              <SectionHeading num="1" title={t('heading6')} />
              <Para>
                {t('text6')}</Para>

              <SubHeading title={t('heading7')} />
              <Para>
                {t.rich('text7', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading8')} />
              <Para>
                {t.rich('text8', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading9')} />
              <Para>
                {t.rich('text9', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <Quote source="Gartner HR Research, 2023">
                {t('text10')}</Quote>

              {/* Section 2 */}
              <SectionHeading num="2" title={t('heading10')} />
              <Para>
                {t.rich('text11', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text12', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* 5 dimensions */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
                <p
                  className="text-[12px] font-bold tracking-[0.2em] uppercase mb-5 text-center"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {t('body11')}</p>
                <div className="space-y-3">
                  {[
                    { d: 'Immaginare un futuro desiderato', desc: 'Una visione definita e chiara della traiettoria professionale aumenta la motivazione e guida il comportamento orientato all\'obiettivo.' },
                    { d: 'Fissare obiettivi di carriera', desc: 'La formulazione di obiettivi specifici e misurabili migliora le prestazioni e la concentrazione; la specificità nella goal-setting theory è correlata ad azioni coerenti nel tempo.' },
                    { d: 'Implementare strategie di carriera', desc: 'Trasformare visione e obiettivi in azione richiede pianificazione strategica; formare intenzioni di implementazione aumenta significativamente la probabilità di raggiungere i risultati desiderati.' },
                    { d: 'Trasmettere fiducia', desc: 'L\'autoefficacia — la fiducia nel superare gli ostacoli — influenza direttamente perseveranza e performance; è correlata al successo professionale e alla performance lavorativa.' },
                    { d: 'Dimostrare resilienza', desc: 'La perseveranza di fronte alle difficoltà è cruciale per raggiungere obiettivi a lungo termine; il costrutto di grinta è un determinante chiave del successo.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[10px] font-bold"
                        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p
                          className="text-[13px] font-semibold mb-0.5"
                          style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                          {item.d}
                        </p>
                        <p className="text-[12.5px] text-[#0D0D0D]/55 leading-[1.6]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <SectionHeading num="3" title={t('heading11')} />

              <div className="grid grid-cols-3 gap-4 my-6">
                <StatBox value="42%" label={t('label5')} />
                <StatBox value="№1" label={t('label6')} />
                <StatBox value="94%" label={t('label7')} />
              </div>

              <Para>
                {t.rich('text13', {
          i: (chunks) => <em>{chunks}</em>,
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* Section 4 */}
              <SectionHeading num="4" title={t('heading12')} />
              <Para>
                {t.rich('text15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          i: (chunks) => <em>{chunks}</em>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text16', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <Quote>
                {t('text17')}</Quote>

              {/* Section 5 */}
              <SectionHeading num="5" title={t('heading13')} />
              <Para>
                {t.rich('text18', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading14')} />
              <Para>
                {t.rich('text19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <p className="text-[13.5px] font-semibold text-[#0D0D0D]/70 mb-3" style={{ fontStyle: 'italic' }}>
                {t('body12')}</p>
              <ul className="space-y-2.5 mb-5">
                {[
                  { bold: 'prevenzione del disallineamento:', text: 'identifica i profili tecnicamente idonei ma con ambizioni divergenti. Questo riduce il rischio di nomine che, dopo un\'iniziale alta performance, sfociano inevitabilmente in burnout, disimpegno o dimissioni.' },
                  { bold: 'emersione del potenziale nascosto:', text: 'rivela i "talenti invisibili" che, pur non essendo stati pienamente valorizzati dal management di linea, mostrano una forte sintonia con la direzione strategica dell\'organizzazione.' },
                  { bold: 'monitoraggio predittivo della Retention:', text: 'fornisce ai comitati HR una mappa del rischio di uscita per i ruoli chiave, intercettando il malessere o il desiderio di cambiamento con mesi di anticipo rispetto ai segnali d\'allarme convenzionali.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] text-[#0D0D0D]/65 leading-[1.65]">
                    <span className="text-[#4B4DF7] mt-1 flex-shrink-0">•</span>
                    <span><strong className="text-[#0D0D0D]/75">{item.bold}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>

              <SubHeading title={t('heading15')} />
              <Para>
                {t.rich('text20', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              <SubHeading title={t('heading16')} />
              <Para>
                {t.rich('text21', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

              {/* 4-step cycle */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
                <p className="text-[12px] font-bold text-[#0D0D0D]/50 text-center mb-6 uppercase tracking-[0.15em]">
                  {t('body13')}</p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { num: '01', title: 'Verification conversazionale', sub: 'Agentic-AI, domande aperte' },
                    { num: '02', title: 'Analisi dei risultati', sub: 'Pattern aspirazionali nascoste' },
                    { num: '03', title: 'Risk map aspirazionale', sub: 'Segmenti a rischio vs alto potenziale' },
                    { num: '04', title: 'Intervento HR mirato', sub: 'Sviluppo, planning, conversazioni' },
                  ].map((step, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="text-[1.4rem] font-bold mb-1.5"
                        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                      >
                        {step.num}
                      </div>
                      <p className="text-[12px] font-semibold text-[#0D0D0D]/70 leading-snug mb-1">{step.title}</p>
                      <p className="text-[11px] text-[#0D0D0D]/35 leading-snug">{step.sub}</p>
                      {i < 3 && (
                        <div className="hidden" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <InfoBox title={t('heading17')}>
                <p>
                  {t.rich('body14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
        })}</p>
              </InfoBox>

              {/* 3 domande */}
              <SectionHeading title={t('heading18')} />
              <Para>
                {t('text22')}</Para>

              {[
                {
                  n: 1,
                  q: 'Sapete davvero il motivo per cui le persone che non volevate perdere se ne sono andate?',
                  a: 'Le uscite che vi hanno sorpreso di più negli ultimi due anni: erano davvero imprevedibili, o semplicemente non avevate gli strumenti per vederle arrivare? Quanto della vostra lettura del fenomeno si basa su dati, e quanto su percezioni a posteriori?',
                },
                {
                  n: 2,
                  q: 'Le traiettorie di crescita che offrite sono credibili per chi ha ambizioni alte?',
                  a: 'I vostri percorsi di sviluppo rispondono alle aspirazioni dei profili che volete trattenere, o sono costruiti attorno alle esigenze organizzative? C\'è coerenza tra ciò che promettete nelle conversazioni di sviluppo e ciò che siete effettivamente in grado di offrire?',
                },
                {
                  n: 3,
                  q: 'Siete pronti a fare le azioni concrete con le informazioni che raccoglierete?',
                  a: 'Mappare le aspirazioni crea aspettative. Se rilevate che un manager aspira a qualcosa che non potete offrirgli, siete disposti ad affrontare quella conversazione? Avete la capacità organizzativa di rispondere a ciò che emergerà?',
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
                {t.rich('text23', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <p className="text-[14px] text-[#0D0D0D]/50 mb-8">
                {t.rich('body15', {
          a: (chunks) => <a href="https://www.skillvue.ai/contact-us" className="hover:opacity-70 transition-opacity" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>{chunks}</a>,
        })}</p>

              {/* Final stats */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <StatBox value=">€1M" label={t('label8')} />
                <StatBox value="33%" label={t('label9')} />
                <StatBox value="70-80%" label={t('label10')} />
                <StatBox value="51%" label={t('label11')} />
              </div>

              {/* About Skillvue */}
              <div className="border-t border-black/[0.07] pt-10 mt-10">
                <div className="w-8 h-0.5 rounded mb-4" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
                <h3 className="text-[1.1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading3')}</h3>
                <Para>
                  {t.rich('text24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
                <Para>
                  {t.rich('text25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              </div>

              {/* References */}
              <div className="border-t border-black/[0.07] pt-8 mt-8">
                <h3 className="text-[1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading4')}</h3>
                <ul className="space-y-2">
                  {[
                    'Mercer. (2024). Global Talent Trends Study 2024. Marsh McLennan.',
                    'Work Institute. (2024). Retention Report 2024: Decoding the Emerging Workforce.',
                    'Deloitte. (2024). 2024 Global Human Capital Trends: Thriving Beyond Boundaries.',
                    'McKinsey & Company. (2024). McKinsey on Insurance: 2024 Trends and Innovations.',
                    'Deci, E. L., & Ryan, R. M. (2000). The \'what\' and \'why\' of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268.',
                    'Locke, E. A., & Latham, G. P. (2002). Building a practically useful theory of goal setting and task motivation. The American psychologist, 57(9), 705–717.',
                    'LinkedIn. (2024). Workforce Learning Report 2024. LinkedIn Talent Solutions.',
                    'EIOPA. (2024). Insurance Labour Market and Conduct Supervisory Report.',
                  ].map((ref, i) => (
                    <li key={i} className="text-[12px] text-[#0D0D0D]/40 italic leading-[1.6]">{ref}</li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-black/[0.07] pt-6 mt-8 flex items-center justify-between">
                <span className="text-[11px] text-[#0D0D0D]/25">{t('text26')}</span>
                <div className="flex items-center gap-2">
                  <SkillvueIcon size={16} />
                  <span className="text-[11px] text-[#0D0D0D]/25">{t('text27')}</span>
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
              {t.rich('text28', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            {' '}·{' '}
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text29', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </p>
        </div>
      </div>
    </>
  );
}

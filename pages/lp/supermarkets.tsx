// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { useLanguage } from '@/i18n/LanguageContext';
import { Download, ArrowRight, AlertTriangle, Check } from 'lucide-react';

const TITLE = 'Skillvue — Supermarkets One-Pager';
const GRAD = 'linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)';

// --- HubSpot download tracking (same pattern as the AI Competency LP) ---
const HS_PORTAL_ID = '48438018';
// TODO: create one HubSpot form per language (standard `email` field only) and
// paste the GUIDs here. Until then the download stays untracked in HubSpot —
// the GTM dataLayer event below fires regardless.
const HS_DOWNLOAD_FORM_GUID = {
  en: '',
  it: '',
};

const ASSETS = {
  en: { pdf: '/skillvue-supermarkets-one-pager-en.pdf', book: '/book-meeting' },
  // A raw <a href> (unlike next/link) doesn't add the locale prefix, so without
  // /it an Italian reader would land on the English booking page.
  it: { pdf: '/skillvue-supermarkets-one-pager-it.pdf', book: '/it/prenota-incontro' },
};

const C = {
  en: {
    badge: 'SUPERMARKETS',
    titleLead: 'The ',
    titleHighlight: 'Skills Operating System',
    titleTail: ' for your organization',
    subhead:
      'Skillvue is the **objective skills data layer** for your retail workforce. Tailored to your competency framework, grounded in science, scaled by AI, embedded into the HR systems you already run. So every talent decision, from hiring to transformation, is finally the right one.',
    download: 'Download the one-pager',
    s1: {
      n: '01',
      label: 'WHERE RETAIL STANDS TODAY',
      cards: [
        {
          t: 'Your Status Quo',
          b: 'Stores run on **people**, but talent decisions remain expensive gambles. You **hire based on CVs** and **gut feeling**, and you **promote who is visible** rather than who has the **potential** for the next role.',
        },
        {
          t: 'What You Face',
          b: 'High **turnover** and **unstructured hiring** fail at scale. Store managers are evaluated on **subjective criteria** with no **predictability of future performance**, and **reskilling** programs stay generic with no focus on gap maps.',
        },
        {
          t: 'What We Do',
          b: 'Our skills operating system **powers the entire retail talent lifecycle**: from the checkout counter to store management, **with no silos** or inconsistent assessments between **new hires** and **internal talent**.',
        },
      ],
    },
    s2: {
      n: '02',
      label: 'WORKFORCE CHALLENGES VS SKILLVUE SOLUTIONS',
      costLabel: 'COST OF INACTION',
      valueLabel: 'SKILLVUE VALUE',
      roiLabel: 'SKILLVUE ROI',
      rows: [
        {
          t: 'Hire Right',
          sub: 'Hiring, screening and confirmation at scale',
          cost: 'Low margins, high turnover, costly mishires, confirmation left to subjective, store-by-store judgment. At **€30-40K per failure**, a **30%** mishire rate becomes a massive drag on tight **2.8% EBIT margins**.',
          value: 'Fast, objective screening (5 to 15 minutes) based on **your organization’s specific model**. Structured, bias-free probation reviews provide **one unified lens** for new hires and growing employees.',
          roi: ['30% reduction in mis-hire rate; 70% faster CV screening', 'Payback period: 6 months', '1st year ROI: 85%'],
        },
        {
          t: 'Promote with Confidence',
          sub: 'Store manager and department head pipelines',
          cost: '**40% of new managers** fail within **24 months** because promotions rely on sales performance rather than leadership skills.',
          value: 'Build internal academies on **potential**, not seniority. Early leadership mapping ensures **training reaches the right people**, reducing promotion failures and creating a pipeline for roles the market lacks.',
          roi: ['Post-promotion failure reduced from 40% to 15%', 'Payback period: 2 months', '1st year ROI: 500%'],
        },
        {
          t: 'Develop the Right People',
          sub: 'Frontline development and succession',
          cost: '**A lack of effective leadership** drives a **5-10% performance drop**, costing stores millions in lost revenue.',
          value: 'Top-tier retail staff **double retention** and **drive growth**. Verifying soft skills early lets you **hire for attitude** and **motivational fit**, identifying long-term talent and reducing early turnover.',
          roi: ['Time-to-fill for leadership roles reduced by 35%', 'Payback period: 4 months', '1st year ROI: 170%'],
        },
        {
          t: 'De-Risk Transformation',
          sub: 'M&A integration and multi-format reorganization',
          cost: '**70%+** of business transformations **fall short** of their original ambitions. **Lacking shared criteria** across brands, **people managers** can’t assure acquisition success.',
          value: 'Standardize skills with a **single framework** and assure **meritocracy in internal mobility**. Post-deal skills mapping achieved in just weeks. Adaptability, learning agility and growth mindset verified before integration.',
          roi: ['Post-deal skills mapped in just weeks', 'Payback period: 5 months', '1st year ROI: 160%'],
        },
      ],
    },
    s3: {
      n: '03',
      label: 'FIRST-YEAR RETURN',
      body: 'Across the four areas, this is what the skills operating system pays back within the first twelve months.',
      stats: [
        { v: '85%', l: 'Hire Right', s: 'payback in 6 months' },
        { v: '500%', l: 'Promote with Confidence', s: 'payback in 2 months' },
        { v: '170%', l: 'Develop the Right People', s: 'payback in 4 months' },
        { v: '160%', l: 'De-Risk Transformation', s: 'payback in 5 months' },
      ],
      note: '1st year ROI',
    },
    cta: {
      title: 'See it on your own competency framework',
      body: 'Book a demo and we’ll walk through how objective skills data works across your stores — from hiring to post-deal integration.',
      button: 'Contact us for a demo',
    },
    footNote: 'SKILLVUE FOR RETAIL',
  },
  it: {
    badge: 'GDO',
    titleLead: 'Il ',
    titleHighlight: 'Sistema Operativo delle Competenze',
    titleTail: ' per la tua organizzazione',
    subhead:
      'Skillvue è il **data layer** oggettivo sulle competenze per la tua forza lavoro nel retail. Progettato su misura per la tua organizzazione, fondato sulla scienza, scalabile grazie all’AI e integrabile nei tuoi sistemi HR che già utilizzi. Ogni decisione sui talenti, dall’assunzione alla trasformazione, finalmente supportata da dati oggettivi.',
    download: 'Scarica il one-pager',
    s1: {
      n: '01',
      label: 'DA DOVE PARTE OGGI IL RETAIL',
      cards: [
        {
          t: 'Status Quo',
          b: 'I punti vendita si reggono sulle **persone**, ma le decisioni sui talenti restano ancora scommesse costose: le assunzioni basate su CV e istinto, le promozioni a chi è più visibile anziché a chi ha maggior **potenziale** e **fit** per il ruolo.',
        },
        {
          t: 'Ciò Che Affronti',
          b: 'L’alto **turnover** e la selezione **non strutturata** diventano insostenibili su larga scala: gli store manager sono valutati su **criteri soggettivi**, senza prevedibilità sulle performance future, e i **programmi di reskilling** restano generici, senza un focus sulla **mappatura dei gap**.',
        },
        {
          t: 'Ciò Che Facciamo',
          b: 'Il **nostro sistema operativo delle competenze** valorizza **l’intero ciclo di vita del talento** nel settore retail: dall’addetto di cassa allo store manager, senza silos o valutazioni incoerenti tra nuovi assunti e risorse interne.',
        },
      ],
    },
    s2: {
      n: '02',
      label: 'LE SFIDE DEL PERSONALE VS. LE SOLUZIONI SKILLVUE',
      costLabel: 'COSTO DELL’INAZIONE',
      valueLabel: 'VALORE AGGIUNTO DI SKILLVUE',
      roiLabel: 'IL ROI DI SKILLVUE',
      rows: [
        {
          t: 'Assunzioni Giuste',
          sub: 'Selezioni, assunzioni, screening e conferme su larga scala',
          cost: 'Margini ridotti, alto turnover e conferme basate su **valutazioni soggettive**. Ogni inserimento inefficace costa **30-40k €**, un peso insostenibile con un EBIT del **2,8%**.',
          value: 'Uno screening rapido e oggettivo, basato sul **tuo framework**. Valutazioni del periodo di prova strutturate e senza bias, per una **visione unificata** di nuovi assunti e talenti in crescita.',
          roi: ['-30% tassi di assunzioni errate; +70% velocità di CV screening', 'Risultati entro: 6 mesi', 'ROI del primo anno: 85%'],
        },
        {
          t: 'Promozioni Strategiche',
          sub: 'Pipeline per store manager e capi reparto',
          cost: 'Il **40% delle promozioni a nuovi manager** si rivela inefficace entro 24 mesi, perché si basa sulle **performance di vendita**, non sulle leadership skill.',
          value: 'Academy interne basate sul **potenziale** e sullo **skill mapping** indirizzano la formazione alle **persone giuste**, riducendo le **promozioni inefficaci** e creando una **pipeline per i ruoli più difficili da reperire**.',
          roi: ['Promozioni inefficaci ridotte dal 40% al 15%', 'Risultati entro: 2 mesi', 'ROI del primo anno: 500%'],
        },
        {
          t: 'Formazioni Mirate',
          sub: 'Sviluppo del personale frontline e succession planning',
          cost: 'La mancanza di una **leadership preparata** fa calare del **5-10%** le performance, causando **milioni di euro di fatturato perso** per i punti vendita.',
          value: 'I migliori talenti nel retail **raddoppiano la retention** e **la crescita del brand**. Valutare le soft skill fin dall’inizio aiuta ad assumere per **attitudine** e **fit motivazionale**, riducendo il turnover.',
          roi: ['-35% sul tempo di copertura per i ruoli di leadership', 'Risultati entro: 4 mesi', 'ROI del primo anno: 170%'],
        },
        {
          t: 'Trasformazioni sicure',
          sub: 'Integrazione post-M&A e riorganizzazione multi-formato',
          cost: 'Oltre **il 70%** delle trasformazioni aziendali **non raggiunge gli obiettivi**. Servono criteri condivisi tra gli store per garantire il successo post-acquisizione.',
          value: 'Un **unico framework di competenze** per una **mobilità interna meritocratica**. Mappa le skill post-acquisizione in poche settimane, per integrare i talenti con **criteri oggettivi**.',
          roi: ['Skills mapping post-deal in poche settimane', 'Risultati entro: 5 mesi', 'ROI del primo anno: 160%'],
        },
      ],
    },
    s3: {
      n: '03',
      label: 'IL RITORNO NEL PRIMO ANNO',
      body: 'Sui quattro ambiti, questo è il ritorno che il sistema operativo delle competenze genera entro i primi dodici mesi.',
      stats: [
        { v: '85%', l: 'Assunzioni Giuste', s: 'risultati in 6 mesi' },
        { v: '500%', l: 'Promozioni Strategiche', s: 'risultati in 2 mesi' },
        { v: '170%', l: 'Formazioni Mirate', s: 'risultati in 4 mesi' },
        { v: '160%', l: 'Trasformazioni sicure', s: 'risultati in 5 mesi' },
      ],
      note: 'ROI del primo anno',
    },
    cta: {
      title: 'Guardalo sul tuo modello di competenze',
      body: 'Prenota una demo: vediamo insieme come i dati oggettivi sulle competenze funzionano nei tuoi punti vendita, dalla selezione all’integrazione post-acquisizione.',
      button: 'Prenota una demo',
    },
    footNote: 'SKILLVUE PER IL RETAIL',
  },
};

// Renders **bold** markers inside a plain string as <strong> spans.
function rich(text, cls = 'text-white/90') {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className={`font-semibold ${cls}`}>{part.slice(2, -2)}</strong>
      : part
  );
}

const SectionHead = ({ n, label }) => (
  <div className="flex items-baseline gap-4 mb-5">
    <span className="text-[34px] md:text-[40px] font-extrabold leading-none gradient-text" style={{ backgroundImage: GRAD }}>{n}</span>
    <span className="text-[12px] md:text-[13px] font-bold tracking-[0.16em] uppercase text-white/70">{label}</span>
  </div>
);

export default function SupermarketsPage() {
  const { lang } = useLanguage();
  const isIt = lang === 'it';
  const t = isIt ? C.it : C.en;
  const a = isIt ? ASSETS.it : ASSETS.en;
  const langCode = isIt ? 'it' : 'en';

  const track = (action) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: `lp_${action}`, lp: 'supermarkets', language: langCode });
    }
  };

  const readParam = (name) => (typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get(name) || '');
  const readCookie = (name) => {
    if (typeof document === 'undefined') return '';
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  };

  // Attribute the download to the known HubSpot contact (identity comes from the
  // personalized newsletter link, e.g. ...?e={{contact.email}}). No gate, non-blocking.
  const logDownloadToHubSpot = () => {
    const email = readParam('e') || readParam('email');
    const formGuid = HS_DOWNLOAD_FORM_GUID[langCode];
    if (!formGuid || !email) return; // unknown visitor → stays anonymous
    const hutk = readCookie('hubspotutk');
    try {
      fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${formGuid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          fields: [{ name: 'email', value: email }],
          context: {
            ...(hutk ? { hutk } : {}),
            pageUri: typeof window !== 'undefined' ? window.location.href : '',
            pageName: 'Supermarkets One-Pager',
          },
        }),
      }).catch(() => {});
    } catch (e) { /* non-blocking */ }
  };

  const handleDownload = (placement) => {
    track(placement);
    logDownloadToHubSpot();
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="The Skills Operating System for supermarkets — objective skills data across the retail talent lifecycle." />
        <meta name="robots" content="noindex" />
      </Head>

      <Navbar />

      <main className="relative" style={{ background: '#08080c' }}>
        {/* Branded background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
          <div className="absolute top-[900px] right-[-200px] w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8 pt-[120px] md:pt-[140px] pb-20">

          {/* HERO */}
          <header className="mb-14 md:mb-20">
            <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#7b7df9' }}>{t.badge}</span>
            <h1 className="text-[32px] md:text-[52px] font-bold tracking-[-0.02em] text-white/95" style={{ lineHeight: 1.08 }}>
              {t.titleLead}
              <span className="gradient-text" style={{ backgroundImage: GRAD }}>{t.titleHighlight}</span>
              {t.titleTail}
            </h1>
            <p className="text-[16px] md:text-[18px] text-white/65 leading-[1.55] mt-5 max-w-2xl">{rich(t.subhead, 'text-white/85')}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={a.pdf} download onClick={() => handleDownload('download')} data-testid="download-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:opacity-90" style={{ background: '#4b4df7' }}>
                <Download className="h-[18px] w-[18px]" /> {t.download}
              </a>
            </div>
          </header>

          {/* 01 — STATUS QUO / FACE / DO */}
          <section className="mb-16">
            <SectionHead n={t.s1.n} label={t.s1.label} />
            <div className="grid md:grid-cols-3 gap-4">
              {t.s1.cards.map((card, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <h3 className="text-[17px] font-bold text-white/95 mb-3">{card.t}</h3>
                  <p className="text-[14px] text-white/60 leading-[1.6]">{rich(card.b)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — CHALLENGES VS SOLUTIONS */}
          <section className="mb-16">
            <SectionHead n={t.s2.n} label={t.s2.label} />
            <div className="space-y-4">
              {t.s2.rows.map((row, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
                  <div className="mb-5">
                    <h3 className="text-[18px] md:text-[19px] font-bold text-white/95">{row.t}</h3>
                    <p className="text-[13px] text-white/45 mt-1">{row.sub}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                    {/* Cost of inaction */}
                    <div className="md:pr-5 md:border-r md:border-white/[0.07]">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5" style={{ color: '#FF7A7A' }}>
                        <AlertTriangle className="h-3.5 w-3.5" /> {t.s2.costLabel}
                      </span>
                      <p className="text-[14px] text-white/60 leading-[1.6]">{rich(row.cost, 'text-white/85')}</p>
                    </div>
                    {/* Skillvue value */}
                    <div className="md:pr-5 md:border-r md:border-white/[0.07]">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5" style={{ color: '#8a8cff' }}>
                        <Check className="h-3.5 w-3.5" /> {t.s2.valueLabel}
                      </span>
                      <p className="text-[14px] text-white/60 leading-[1.6]">{rich(row.value, 'text-white/85')}</p>
                    </div>
                    {/* ROI chips */}
                    <div>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5" style={{ color: '#5ddba4' }}>
                        <Check className="h-3.5 w-3.5" /> {t.s2.roiLabel}
                      </span>
                      <div className="space-y-2">
                        {row.roi.map((chip, j) => (
                          <div key={j} className="rounded-lg px-3 py-2 text-[13px] font-semibold leading-[1.4]"
                            style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(93,219,164,0.25)', color: '#a8ecca' }}>
                            {chip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 03 — FIRST-YEAR RETURN */}
          <section className="mb-16">
            <SectionHead n={t.s3.n} label={t.s3.label} />
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] mb-8 max-w-3xl">{t.s3.body}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.s3.stats.map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(160deg, #23234d 0%, #16163a 100%)', border: '1px solid rgba(123,125,249,0.25)' }}>
                  <div className="text-[32px] md:text-[38px] font-extrabold leading-none gradient-text" style={{ backgroundImage: GRAD }}>{s.v}</div>
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35 mt-2">{t.s3.note}</div>
                  <div className="text-[14px] font-semibold text-white/90 mt-3 leading-[1.35]">{s.l}</div>
                  <div className="text-[12px] text-white/45 mt-1">{s.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA banner */}
          <section className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-16 text-center"
            style={{ background: 'linear-gradient(120deg, #1a1a3f 0%, #201436 45%, #3a1730 100%)' }}>
            <div className="pointer-events-none absolute -top-24 right-[-80px] w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.22) 0%, rgba(255,86,86,0) 65%)' }} />
            <div className="relative">
              <h2 className="text-[26px] md:text-[38px] font-bold text-white tracking-[-0.02em] mb-3">{t.cta.title}</h2>
              <p className="text-[15px] md:text-[16px] text-white/65 mb-8 max-w-xl mx-auto">{t.cta.body}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={a.book} onClick={() => track('book_bottom')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-[#1a1a3f] bg-white hover:opacity-90 transition-all duration-300">
                  {t.cta.button} <ArrowRight className="h-4 w-4" />
                </a>
                <a href={a.pdf} download onClick={() => handleDownload('download_bottom')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-white border border-white/20 hover:bg-white/[0.08] transition-all duration-300">
                  <Download className="h-[18px] w-[18px]" /> {t.download}
                </a>
              </div>
            </div>
          </section>

          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/25 mt-10 text-center">{t.footNote}</p>
        </div>

        <TrustLogosBar lang={isIt ? 'it' : 'en'} />
      </main>

      <Footer />
    </>
  );
}

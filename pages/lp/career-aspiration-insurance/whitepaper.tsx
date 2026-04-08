// @ts-nocheck
import React, { useEffect } from 'react';
import Head from 'next/head';

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
      <h2 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#0D0D0D]">
        {num && <span className="mr-1">{num}.</span>}{title}
      </h2>
    </div>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3
      className="text-[14px] font-bold mb-2 mt-6"
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Career Aspiration Intelligence nel settore assicurativo | Skillvue</title>
        <meta
          name="description"
          content="Perché misurare le aspirazioni aiuta a prevedere chi rimane e chi eccelle. Whitepaper gratuito di Skillvue per CHRO, Chief Talent Officer e Head of Leadership Development."
        />
      </Head>

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
            <span className="font-bold text-[14px] text-[#0D0D0D] tracking-[-0.01em]">Skillvue</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/WP-I2-ITA.pdf"
              download="Career-Aspiration-Intelligence-Insurance-Skillvue.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:opacity-80 border"
              style={{ borderColor: 'rgba(75,77,247,0.3)', color: '#4B4DF7', background: 'rgba(75,77,247,0.05)' }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Scarica PDF
            </a>
            <a
              href="https://www.skillvue.ai/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
            >
              Contattaci
            </a>
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
                INSURANCE · 2026
              </span>
              <h1 className="text-[2rem] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
                Career Aspiration Intelligence
                <span
                  className="block"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  nel settore assicurativo
                </span>
              </h1>
              <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
                Perché misurare le aspirazioni aiuta a prevedere chi rimane e chi eccelle
              </p>
              <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
              <p className="text-[13px] text-[#0D0D0D]/40">
                <em>Settore:</em> Insurance
              </p>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-1"><em>Lettura:</em> circa 6 minuti</p>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
                A cura di{' '}
                <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>
                  Skillvue
                </span>
              </p>
            </div>

            {/* Document Body */}
            <div className="px-10 py-10">

              {/* Executive Summary */}
              <InfoBox title="Executive Summary">
                <p className="mb-3">
                  Nel settore assicurativo europeo il <strong className="text-[#0D0D0D]/80">67% dei CHRO</strong> indica la{' '}
                  <strong className="text-[#0D0D0D]/80">retention</strong> del middle management come una{' '}
                  <strong className="text-[#0D0D0D]/80">priorità HR critica</strong> per il biennio 2025–2026. Eppure la variabile
                  che più fortemente predice chi rimane e chi eccelle — le aspirazioni di carriera —{' '}
                  <strong className="text-[#0D0D0D]/80">è sistematicamente assente</strong> dai processi di talent management.
                </p>
                <p>
                  Questo documento analizza <strong className="text-[#0D0D0D]/80">perché misurare le aspirazioni</strong> genera
                  un reale <strong className="text-[#0D0D0D]/80">vantaggio predittivo</strong>, quali implicazioni operative
                  comporta per talent review, succession planning e leadership development e come sviluppare questa capacità in
                  modo scalabile e <strong className="text-[#0D0D0D]/80">conforme all'EU AI Act</strong>.
                </p>
              </InfoBox>

              {/* Cover stats */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <StatBox value="75%" label="Del turnover è prevenibile con azioni mirate" />
                <StatBox value="67%" label="Retention come priorità critica per i CHRO" />
                <StatBox value="20-25%" label="Turnover annuo rete agenziale" />
                <StatBox value="1,5-2x" label="Costo di sostituzione vs. retribuzione annua" />
              </div>

              {/* TURNOVER PREVENIBILE */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
                <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">TURNOVER PREVENIBILE:</p>
                <p className="text-[13px] text-[#0D0D0D]/40 mb-5 italic">la maggior parte delle uscite si può anticipare</p>
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
                      Il driver №1 della retention non è la retribuzione, ma lo sviluppo di carriera.
                    </p>
                    <div className="flex flex-col gap-1.5 text-[12px] text-[#0D0D0D]/45">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }} />Prevenibile (75%)</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block" />Non prevenibile (25%)</span>
                    </div>
                    <p className="text-[11px] text-[#0D0D0D]/25 mt-3 italic">Fonte: Work Institute, Retention Report 2024</p>
                  </div>
                </div>
              </div>

              <Para>
                Questi numeri convergono su un punto: la maggior parte delle uscite volontarie non è inevitabile. Sono il risultato
                di un <strong className="text-[#0D0D0D]/80">mismatch tra aspirazioni e opportunità percepite</strong>, che rimane
                invisibile finché non compaiono i segnali terminali. La performance review e le engagement survey misurano bene il
                presente, ma non possono predire dove una persona vuole arrivare, né se l'organizzazione è percepita come il veicolo
                credibile per raggiungere quella meta.
              </Para>
              <Para>
                <strong className="text-[#0D0D0D]/80">Avremmo potuto prevederlo?</strong> È la domanda che emerge spesso dopo
                alcune di queste uscite. La risposta onesta, nella maggior parte dei casi, è sì. Ma per farlo occorreva misurare
                qualcosa che quasi nessun sistema HR misura in modo strutturato: le aspirazioni di carriera. La{' '}
                <strong className="text-[#0D0D0D]/80">Career Aspiration Intelligence</strong> mappa il futuro — ossia dove vuole
                andare questa persona e quanto è probabile che la tua organizzazione faccia ancora parte del suo percorso tra 18 mesi.
              </Para>

              {/* Section 1 */}
              <SectionHeading num="1" title="Perché il settore assicurativo è un caso a sé" />
              <Para>
                Ci sono tre dinamiche convergenti che rendono il problema aspirazionale particolarmente acuto nei gruppi assicurativi europei:
              </Para>

              <SubHeading title="1. La trasformazione del profilo professionale" />
              <Para>
                La digitalizzazione progressiva e l'avanzata dei modelli <strong className="text-[#0D0D0D]/80">embedded insurance</strong>{' '}
                rendono <strong className="text-[#0D0D0D]/80">obsoleti i profili distributivi tradizionali</strong> e creano domanda di{' '}
                <strong className="text-[#0D0D0D]/80">figure ibride</strong> capaci di navigare simultaneamente il canale digitale e la
                relazione consulenziale con il cliente. McKinsey ha identificato nel ridisegno dei modelli distributivi assicurativi una
                delle priorità strategiche più urgenti del settore per il 2024–2026. Un agente che ha costruito la propria identità
                professionale sul modello tradizionale si trova in un percorso di{' '}
                <strong className="text-[#0D0D0D]/80">ridefinizione della propria aspirazione</strong>, e le organizzazioni che non
                intercettano questa ridefinizione la scopriranno solo attraverso le dimissioni.
              </Para>

              <SubHeading title="2. La competizione per il talento manageriale" />
              <Para>
                I profili di middle management ad <strong className="text-[#0D0D0D]/80">alto potenziale</strong> nel settore assicurativo
                hanno oggi un'offerta crescente di alternative: le insurtech offrono traiettorie di crescita più rapide, le piattaforme
                digitali esposizione internazionale, le società di consulenza varietà progettuale. Le grandi compagnie competitive su
                salary e benefit si trovano a{' '}
                <strong className="text-[#0D0D0D]/80">perdere profili non per ragioni economiche, ma per ragioni aspirazionali</strong>:
                la percezione che la traiettoria di crescita disponibile altrove sia più ambiziosa.
              </Para>

              <SubHeading title="3. I cicli lunghi di formazione del capitale umano" />
              <Para>
                Un responsabile di agenzia, un talent developer di area, un key account manager assicurativo accumula{' '}
                <strong className="text-[#0D0D0D]/80">know-how relazionale, regolatorio e di portafoglio</strong> che non si costruisce
                in pochi mesi. Quando questa figura lascia, la perdita non è solo di un ruolo: è di un{' '}
                <strong className="text-[#0D0D0D]/80">asset di conoscenza</strong> che richiede anni per essere ricostruito. Il{' '}
                <strong className="text-[#0D0D0D]/80">costo reale di sostituzione</strong>, stimato da Deloitte tra{' '}
                <strong className="text-[#0D0D0D]/80">1,5x e 2x la retribuzione annua lorda</strong> per ruoli manageriali, è
                sistematicamente sottostimato perché i costi indiretti rimangono fuori dai modelli contabili standard.
              </Para>

              <Quote source="Gartner HR Research, 2023">
                "Le organizzazioni che misurano le aspirazioni in modo strutturato e le integrano nelle decisioni di talent management,
                riportano tassi di retention del management superiori fino al 20–25% rispetto alla media di settore."
              </Quote>

              {/* Section 2 */}
              <SectionHeading num="2" title="Cosa significa davvero misurare le aspirazioni" />
              <Para>
                L'aspirazione di carriera è un <strong className="text-[#0D0D0D]/80">costrutto psicologico</strong> che rappresenta il
                grado in cui una persona <strong className="text-[#0D0D0D]/80">immagina e pianifica</strong> attivamente il proprio{' '}
                <strong className="text-[#0D0D0D]/80">successo professionale</strong> a lungo termine. Misurare le aspirazioni non
                equivale a chiedere "dove ti vedi tra cinque anni". Questa domanda produce risposte che riflettono le aspettative
                percepite dell'interlocutore più che le aspirazioni reali. Il suo valore predittivo è basso per definizione.
              </Para>
              <Para>
                Un <strong className="text-[#0D0D0D]/80">approccio strutturato</strong> per misurare le aspirazioni opera su cinque{' '}
                <strong className="text-[#0D0D0D]/80">dimensioni distinte</strong>, ciascuna con una diversa capacità predittiva rispetto
                ai comportamenti organizzativi futuri:
              </Para>

              {/* 5 dimensions */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
                <p
                  className="text-[12px] font-bold tracking-[0.2em] uppercase mb-5 text-center"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  I 5 indicatori della Career Aspiration Inventory
                </p>
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
              <SectionHeading num="3" title="Predire chi rimane: la ricerca dietro il dato" />

              <div className="grid grid-cols-3 gap-4 my-6">
                <StatBox value="42%" label="del turnover è prevenibile secondo i dipendenti stessi · Work Institute, 2024" />
                <StatBox value="№1" label="causa di abbandono: sviluppo carriera (17,4%), davanti a stipendio · Work Institute, 2024" />
                <StatBox value="94%" label="rimarrebbe più a lungo in un'org. che investe nella propria crescita · LinkedIn, 2024" />
              </div>

              <Para>
                Il corpus di ricerca sul legame tra aspirazioni e retention è cresciuto significativamente nell'ultimo decennio. La{' '}
                <em>Self-Determination Theory</em> (SDT) di Deci e Ryan identifica tre bisogni fondamentali la cui soddisfazione predice
                comportamenti di engagement e retention: <strong className="text-[#0D0D0D]/80">autonomia</strong> (il senso che le
                proprie azioni riflettono valori e aspirazioni autentici), <strong className="text-[#0D0D0D]/80">competenza</strong> (la
                percezione di crescita efficace) e <strong className="text-[#0D0D0D]/80">relazionalità</strong> (il senso di connessione
                significativa con il contesto). Di questi tre bisogni, l'{' '}
                <strong className="text-[#0D0D0D]/80">aspirazione di carriera è il predittore più diretto</strong> della soddisfazione
                del bisogno di autonomia, il più fortemente correlato alla retention volontaria nei meta-studi disponibili.
              </Para>
              <Para>
                Il calo di engagement è spesso interpretato come causa di turnover. In realtà è frequentemente{' '}
                <strong className="text-[#0D0D0D]/80">effetto di un disallineamento aspirazionale già in corso</strong>: la persona ha
                perso la convinzione che l'organizzazione possa soddisfare le proprie aspirazioni, e l'engagement si riduce di
                conseguenza. Intervenire sull'engagement senza affrontare il disallineamento sottostante equivale a trattare un sintomo
                senza diagnosticare la patologia.
              </Para>

              {/* Section 4 */}
              <SectionHeading num="4" title="Predire chi eccelle: aspiration-performance alignment" />
              <Para>
                Il <strong className="text-[#0D0D0D]/80">legame tra aspirazioni di carriera e performance individuale</strong> è meno
                intuitivo della relazione con la retention, ma altrettanto documentato. La <em>Self-Determination Theory</em> mostra che
                la motivazione intrinseca è il predittore più robusto di{' '}
                <strong className="text-[#0D0D0D]/80">performance duratura, apprendimento accelerato</strong> e comportamento proattivo
                nelle organizzazioni.
              </Para>
              <Para>
                Nel contesto assicurativo, questo si traduce in una considerazione pratica: due manager con lo stesso profilo di
                competenze e lo stesso livello di performance storica possono avere traiettorie future molto diverse, a seconda che il
                ruolo in cui si trovano sia allineato o meno con le loro aspirazioni.{' '}
                <strong className="text-[#0D0D0D]/80">Confondere la performance passata con il potenziale futuro è uno degli errori
                più diffusi nei sistemi di talent management</strong>, e la misurazione strutturata delle aspirazioni è uno degli
                strumenti più efficaci per ridurlo.
              </Para>

              <Quote>
                "Quando un manager decide di andarsene, raramente si tratta di un evento improvviso. Il problema non è la mancanza
                di segnali, ma la natura degli stessi: spesso ci si limita a monitorare le performance attuali, ignorando che le sue
                aspirazioni si sono già spostate altrove da tempo."
              </Quote>

              {/* Section 5 */}
              <SectionHeading num="5" title="Implicazioni operative: dove cambia il lavoro HR" />
              <Para>
                Integrare la Career Aspiration Intelligence nei processi HR assicurativi{' '}
                <strong className="text-[#0D0D0D]/80">non richiede di sostituire i sistemi esistenti</strong>. Richiede di{' '}
                <strong className="text-[#0D0D0D]/80">aggiungere una dimensione</strong> che attualmente manca e di comprendere come
                questa dimensione modifica la <strong className="text-[#0D0D0D]/80">qualità delle decisioni</strong> in tre aree critiche:
              </Para>

              <SubHeading title="1. Talent review e succession planning" />
              <Para>
                Il processo di talent review tradizionale si articola su due assi: la{' '}
                <strong className="text-[#0D0D0D]/80">performance</strong> storica e il{' '}
                <strong className="text-[#0D0D0D]/80">potenziale</strong> stimato dal management. In questa configurazione, tuttavia,
                il potenziale rimane spesso una <strong className="text-[#0D0D0D]/80">valutazione soggettiva, basata su osservazioni
                comportamentali non strutturate e soggetta a inevitabili bias cognitivi</strong>.
              </Para>
              <p className="text-[13.5px] font-semibold text-[#0D0D0D]/70 mb-3" style={{ fontStyle: 'italic' }}>
                Integrare le aspirazioni individuali nella talent review trasforma la valutazione da statica a predittiva attraverso tre vantaggi concreti:
              </p>
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

              <SubHeading title="2. Leadership development e programmi di formazione" />
              <Para>
                I programmi di sviluppo manageriale che <strong className="text-[#0D0D0D]/80">ignorano le aspirazioni</strong> dei
                partecipanti producono un effetto paradossale: aumentano le competenze senza aumentare la propensione a restare.
                Mappare le aspirazioni prima di definire i contenuti dei programmi consente una{' '}
                <strong className="text-[#0D0D0D]/80">personalizzazione</strong> che va oltre la segmentazione per ruolo o seniority.
                Due partecipanti con lo stesso ruolo e la stessa performance possono avere aspirazioni radicalmente diverse e beneficiare
                di percorsi di sviluppo radicalmente diversi. Questa personalizzazione ha{' '}
                <strong className="text-[#0D0D0D]/80">effetti misurabili sull'engagement</strong> con i programmi e sulla retention dei
                partecipanti nell'anno successivo.
              </Para>

              <SubHeading title="3. Conversazioni di sviluppo: qualità vs frequenza" />
              <Para>
                La conversazione di sviluppo è il momento in cui l'organizzazione e il dipendente{' '}
                <strong className="text-[#0D0D0D]/80">negoziano implicitamente il futuro</strong>. Nella maggior parte dei casi,
                questa conversazione avviene in{' '}
                <strong className="text-[#0D0D0D]/80">assenza di dati strutturati</strong> sulle aspirazioni. Disporre di una
                mappatura aspirazionale strutturata cambia la natura di questa conversazione: da review del passato a confronto
                esplicito tra traiettoria desiderata e opportunità disponibili. Questo livello di{' '}
                <strong className="text-[#0D0D0D]/80">trasparenza</strong> ha un doppio effetto: riduce il rischio di uscite «di
                sorpresa» e aumenta la percezione di essere visti dall'organizzazione.
              </Para>

              {/* 4-step cycle */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
                <p className="text-[12px] font-bold text-[#0D0D0D]/50 text-center mb-6 uppercase tracking-[0.15em]">
                  Dal dato aspirazionale all'intervento HR: il ciclo operativo
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { num: '01', title: 'Assessment conversazionale', sub: 'Agentic-AI, domande aperte' },
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

              <InfoBox title="Implicazione per il Head of Leadership Development">
                <p>
                  Un rischio che questo approccio introduce va esplicitato: mappare le aspirazioni crea aspettative. Se
                  un'organizzazione rileva che un manager aspira a un percorso specifico e poi non riesce a offrirlo, l'effetto
                  può essere peggiore del silenzio. La{' '}
                  <strong className="text-[#0D0D0D]/75">Career Aspiration Intelligence deve essere accompagnata da un sistema di
                  risposta organizzativa</strong>, non basta raccogliere dati se non si è pronti ad agire su di essi. Questo richiede{' '}
                  <strong className="text-[#0D0D0D]/75">allineamento</strong> tra HR, business line e senior management sulle
                  opportunità realmente disponibili.
                </p>
              </InfoBox>

              {/* 3 domande */}
              <SectionHeading title="3 domande per il tuo comitato di direzione" />
              <Para>
                Prima ancora di scegliere gli strumenti, le organizzazioni assicurative sono chiamate a rispondere a quesiti
                strategici che definiscono il perimetro del problema. Questo framework nasce come punto di partenza per una
                riflessione interna profonda.
              </Para>

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
                <h2 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4">Next step</h2>
              </div>
              <Para>
                Se la vostra organizzazione sta ripensando i processi di talent management, o se volete esplorare come{' '}
                <strong className="text-[#0D0D0D]/80">mappare le aspirazioni di carriera del vostro middle management</strong> rispetto
                alle traiettorie di sviluppo effettivamente disponibili, Skillvue può supportarvi con un assessment scalabile e
                pienamente conforme all'EU AI Act, progettato sulle specificità del vostro contesto assicurativo.
              </Para>
              <p className="text-[14px] text-[#0D0D0D]/50 mb-8">
                Contattaci per una conversazione esplorativa:{' '}
                <a
                  href="https://www.skillvue.ai/contact-us"
                  className="hover:opacity-70 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}
                >
                  skillvue.ai/contact-us
                </a>
              </p>

              {/* Final stats */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <StatBox value=">€1M" label="Risparmio annuo potenziale" />
                <StatBox value="33%" label="Miglioramento retention stimato" />
                <StatBox value="70-80%" label="Accuratezza succession planning" />
                <StatBox value="51%" label="Riduzione del turnover nelle organizzazioni con alto engagement" />
              </div>

              {/* About Skillvue */}
              <div className="border-t border-black/[0.07] pt-10 mt-10">
                <div className="w-8 h-0.5 rounded mb-4" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
                <h3 className="text-[1.1rem] font-bold text-[#0D0D0D] mb-4">About Skillvue</h3>
                <Para>
                  Skillvue dà vita ai processi di gestione delle persone. Siamo una piattaforma di{' '}
                  <strong className="text-[#0D0D0D]/80">talent intelligence</strong> basata sull'AI che aggiunge una dimensione
                  dinamica e oggettiva ai dati HR: trasformiamo informazioni statiche in{' '}
                  <strong className="text-[#0D0D0D]/80">insight predittivi</strong> che permettono di prendere decisioni migliori
                  nel recruiting, nel performance management, nella mobilità interna e nella formazione e sviluppo.
                </Para>
                <Para>
                  Assistiamo aziende di medie e grandi dimensioni in tutta Europa, realtà dove le decisioni sui talenti hanno un
                  impatto strategico elevato e costi molto significativi. A differenza delle suite HR generiche o degli strumenti
                  di assessment unidimensionali, Skillvue{' '}
                  <strong className="text-[#0D0D0D]/80">combina la solidità della scienza psicometrica con la potenza dei moderni
                  LLM</strong> per creare un <strong className="text-[#0D0D0D]/80">copilota AI scientificamente fondato</strong>,
                  in grado di fornire valutazioni personalizzate e scalabili, allineate al modello di leadership e al quadro di
                  competenze specifico di ciascuna azienda.
                </Para>
              </div>

              {/* References */}
              <div className="border-t border-black/[0.07] pt-8 mt-8">
                <h3 className="text-[1rem] font-bold text-[#0D0D0D] mb-4">Fonti e riferimenti</h3>
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
                <span className="text-[11px] text-[#0D0D0D]/25">Insurance · 2026</span>
                <div className="flex items-center gap-2">
                  <SkillvueIcon size={16} />
                  <span className="text-[11px] text-[#0D0D0D]/25">Skillvue</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Page footer */}
        <div className="py-6 px-6 text-center">
          <p className="text-[12px] text-[#0D0D0D]/30">
            © {new Date().getFullYear()} Skillvue S.r.l. — Tutti i diritti riservati. ·{' '}
            <a href="https://www.skillvue.ai/privacy-policy" className="hover:text-[#4B4DF7] transition-colors">Privacy Policy</a>
            {' '}·{' '}
            <a href="https://www.skillvue.ai" className="hover:text-[#4B4DF7] transition-colors">skillvue.ai</a>
          </p>
        </div>
      </div>
    </>
  );
}

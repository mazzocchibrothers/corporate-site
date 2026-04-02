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
      className="text-[14px] font-bold mb-2 mt-6 flex items-center gap-2"
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Il costo invisibile della selezione non predittiva | Skillvue</title>
        <meta
          name="description"
          content="Come identificare e misurare il profilo comportamentale dell'agente assicurativo ibrido ad alta performance. Whitepaper gratuito di Skillvue."
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
              href="/WP-I1-ITA.pdf"
              download="Il-Costo-Invisibile-Selezione-Non-Predittiva-Skillvue.pdf"
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
                Il costo invisibile
                <span
                  className="block"
                  style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  della selezione non predittiva
                </span>
              </h1>
              <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
                Come identificare e misurare il profilo comportamentale dell'agente assicurativo ibrido ad alta performance
              </p>
              <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
              <p className="text-[13px] text-[#0D0D0D]/40">
                <em>Settore:</em> Insurance · <em>Destinatari:</em> CHRO, Chief Distribution Officer, Head of Agency Network
              </p>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-1"><em>Lettura:</em> circa 7 minuti</p>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
                A cura di{' '}
                <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>
                  Skillvue
                </span>
              </p>
            </div>

            {/* Document Body */}
            <div className="px-10 py-10">

              {/* Problem box */}
              <InfoBox title="Il problema in numeri">
                <p>
                  In una rete agenziale di <strong className="text-[#0D0D0D]/80">2.000 agenti</strong> con un{' '}
                  <strong className="text-[#0D0D0D]/80">turnover annuo del 20% o 25%</strong>, il costo stimato della{' '}
                  <strong className="text-[#0D0D0D]/80">selezione non predittiva</strong> si colloca tra i{' '}
                  <strong className="text-[#0D0D0D]/80">15 e i 25 milioni di euro l'anno</strong>. Questa cifra comprende le spese
                  di recruiting e formazione, la <strong className="text-[#0D0D0D]/80">mancata produzione</strong> nei primi 12 mesi
                  e l'impatto negativo sulla <strong className="text-[#0D0D0D]/80">retention del portafoglio</strong>: il tutto senza
                  ancora considerare il <strong className="text-[#0D0D0D]/80">danno reputazionale</strong> causato da un consulente
                  inadeguato nel rapporto diretto con il cliente.
                </p>
              </InfoBox>

              {/* Cover stats */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <StatBox value="€15-25M" label="Costo selezione non predittiva / anno" />
                <StatBox value="2.000" label="Agenti nella rete di riferimento" />
                <StatBox value="20-25%" label="Turnover annuo rete agenziale" />
                <StatBox value="0,54" label="Validità predittiva assessment" />
              </div>

              {/* Cost breakdown */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
                <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Dettaglio costo della selezione non predittiva</p>
                <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">Distribuzione % per voce di costo</p>
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
                Questo documento non è una rassegna accademica sul futuro dell'agente assicurativo. È una{' '}
                <strong className="text-[#0D0D0D]/80">guida operativa</strong> dedicata a chi deve decidere{' '}
                <strong className="text-[#0D0D0D]/80">come selezionare, oggi, le persone che costruiranno la rete di domani</strong>.
                Il documento analizza il <strong className="text-[#0D0D0D]/80">profilo comportamentale</strong> dell'agente ibrido
                ad alta performance, spiega le ragioni per cui i metodi tradizionali non riescono a identificarlo e mostra come la{' '}
                <strong className="text-[#0D0D0D]/80">valutazione comportamentale strutturata</strong> stia già producendo{' '}
                <strong className="text-[#0D0D0D]/80">risultati misurabili</strong> nelle principali reti agenziali europee.
              </Para>

              {/* Section 1 */}
              <SectionHeading num="1" title="Agente Ibrido: il nuovo profilo emergente" />
              <Para>
                Il settore assicurativo europeo ha affrontato nell'ultimo quinquennio una{' '}
                <strong className="text-[#0D0D0D]/80">transizione strutturale</strong> del proprio modello distributivo. Secondo i
                dati <strong className="text-[#0D0D0D]/80">EIOPA 2023</strong>, la penetrazione digitale ha superato{' '}
                <strong className="text-[#0D0D0D]/80">il 30% dei nuovi contratti retail</strong> in diversi mercati dell'Europa
                occidentale: tuttavia, il digitale non ha sostituito l'agente, lo ha radicalmente ridefinito.
              </Para>
              <Para>
                L'<strong className="text-[#0D0D0D]/80">agente ibrido</strong> è il profilo emergente che i grandi gruppi
                assicurativi europei stanno cercando di costruire. Non è un venditore con un tablet, ma un{' '}
                <strong className="text-[#0D0D0D]/80">consulente evoluto</strong> che combina una{' '}
                <strong className="text-[#0D0D0D]/80">competenza relazionale profonda</strong> con l'abilità di operare fluidamente
                in <strong className="text-[#0D0D0D]/80">ecosistemi omnicanale</strong>. Deloitte, nel suo{' '}
                <em>Insurance Industry Outlook 2024</em>, lo descrive come "<strong className="text-[#0D0D0D]/80">trusted advisor</strong>":
                una figura che presidia la relazione nel lungo periodo, interpreta bisogni latenti e mantiene la fiducia del cliente
                anche nei momenti di sinistro o di cambiamento di vita.
              </Para>
              <Para>
                Parallelamente, la <strong className="text-[#0D0D0D]/80">normativa IDD</strong> (<em>Insurance Distribution Directive</em>)
                ha innalzato l'asticella, introducendo rigorosi requisiti di{' '}
                <strong className="text-[#0D0D0D]/80">trasparenza</strong>, gestione dei conflitti di interesse e{' '}
                <strong className="text-[#0D0D0D]/80">formazione continua</strong>. Questi obblighi non interpellano solo le
                competenze tecniche dell'agente, ma la sua{' '}
                <strong className="text-[#0D0D0D]/80">struttura comportamentale profonda</strong>.
              </Para>
              <Para>
                Il risultato è evidente: i classici strumenti di selezione faticano a identificare questo profilo. I tratti
                distintivi di un agente ibrido ad alta performance non emergono da un curriculum vitae, né possono essere
                intercettati attraverso un semplice colloquio non strutturato.
              </Para>

              {/* Predictive validity comparison */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
                <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Validità predittiva a confronto</p>
                <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">Correlazione con la performance lavorativa futura</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="text-[#0D0D0D]/55">Colloquio non strutturato</span>
                      <span className="font-bold text-[#EF4444]">0.38</span>
                    </div>
                    <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '38%', background: '#EF4444' }}>
                        <span className="text-white text-[11px] font-bold">0.38</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="text-[#0D0D0D]/55">Valutazione comportamentale strutturata</span>
                      <span className="font-bold text-[#4B4DF7]">0.54</span>
                    </div>
                    <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '54%', background: 'linear-gradient(90deg, #4B4DF7, #7B4DFF)' }}>
                        <span className="text-white text-[11px] font-bold">0.54</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#0D0D0D]/25 mt-4 italic">Fonte: Schmidt & Hunter (1998, aggiornata nel 2016).</p>
              </div>

              {/* Section 2 */}
              <SectionHeading num="2" title="Tratti distintivi di un agente ibrido ad alta performance" />
              <Para>
                La ricerca e i <strong className="text-[#0D0D0D]/80">benchmark di settore</strong> convergono su quattro dimensioni
                comportamentali che predicono con precisione l'efficacia del{' '}
                <strong className="text-[#0D0D0D]/80">consulente assicurativo</strong> nel nuovo modello distributivo:
              </Para>

              <NumberedItem n={1} title="Resilienza sotto pressione commerciale">
                Non si tratta di un tratto della personalità astratto, ma di <strong className="text-[#0D0D0D]/80">pattern comportamentali
                osservabili</strong>: la capacità di analizzare le interazioni dopo un rifiuto, la ricerca attiva di feedback e la
                tendenza a non generalizzare i singoli insuccessi. Gli agenti resilienti{' '}
                <strong className="text-[#0D0D0D]/80">recuperano più in fretta i cali di produttività</strong> e garantiscono la
                stabilità del portafoglio anche nelle fasi di mercato più sfavorevoli.
              </NumberedItem>

              <NumberedItem n={2} title="Orientamento alla consulenza vs. vendita transazionale">
                I profili orientati alla consulenza costruiscono relazioni con un{' '}
                <strong className="text-[#0D0D0D]/80">life-time value nettamente superiore</strong>. Il problema: questa distinzione
                non è rilevabile nei colloqui tradizionali. La discrepanza tra le{' '}
                <strong className="text-[#0D0D0D]/80">risposte dichiarate</strong> e il{' '}
                <strong className="text-[#0D0D0D]/80">comportamento reale</strong> sotto pressione è un dato statisticamente
                documentato che solo una valutazione strutturata può far emergere.
              </NumberedItem>

              <NumberedItem n={3} title="Adattabilità omnicanale">
                La capacità di muoversi con coerenza tra interazione fisica, digitale e telefonica è oggi una{' '}
                <strong className="text-[#0D0D0D]/80">competenza chiave</strong>. I top performer si distinguono per una minore
                resistenza al cambiamento del workflow e per un approccio comunicativo capace di adattarsi naturalmente al canale
                scelto dal cliente.
              </NumberedItem>

              <NumberedItem n={4} title="Ascolto attivo e lettura dei segnali impliciti">
                Gli agenti ad alta performance intercettano le{' '}
                <strong className="text-[#0D0D0D]/80">preoccupazioni non dichiarate</strong>, leggendo le tensioni tra esigenze di
                protezione e vincoli di budget. Accenture (2024) ha identificato questa capacità come il{' '}
                <strong className="text-[#0D0D0D]/80">differenziale più significativo</strong> tra i consulenti di fascia media e i
                veri top performer.
              </NumberedItem>

              {/* 4 dimensions bar chart */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
                <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Le 4 dimensioni comportamentali chiave</p>
                <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">Rilevanza per la performance dell'agente ibrido</p>
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
              <SectionHeading num="3" title="Perché il processo di selezione attuale non è più efficace" />
              <Para>
                Oggi, la maggior parte dei processi di selezione nelle reti agenziali si affida ancora a un mix di colloqui non
                strutturati, analisi delle esperienze pregresse e, talvolta, test di personalità standardizzati. Tuttavia, questi
                strumenti mostrano <strong className="text-[#0D0D0D]/80">tre limiti critici</strong>:
              </Para>

              {/* Limits table */}
              <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] overflow-hidden my-6">
                <div className="grid grid-cols-3 bg-black/[0.04] text-[11px] font-bold uppercase tracking-[0.12em] text-[#0D0D0D]/50">
                  <div className="p-3 border-r border-black/[0.06]">Limite</div>
                  <div className="p-3 border-r border-black/[0.06]">Causa</div>
                  <div className="p-3">Impatto sulla selezione</div>
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

              <SubHeading title="1. Bassa validità predittiva" />
              <Para>
                Secondo la meta-analisi di <em>Schmidt & Hunter (1998, aggiornata nel 2016)</em>, il colloquio non strutturato ha{' '}
                <strong className="text-[#0D0D0D]/80">una correlazione di appena 0,38</strong> con la performance lavorativa futura.
                Questo valore crolla ulteriormente nei ruoli che richiedono{' '}
                <strong className="text-[#0D0D0D]/80">competenze relazionali complesse</strong>.
              </Para>

              <SubHeading title="2. La distinzione tra tratto e comportamento" />
              <Para>
                I test di personalità tradizionali fotografano un tratto latente, ma{' '}
                <strong className="text-[#0D0D0D]/80">non dicono nulla sul comportamento situazionale</strong>. La personalità è
                il potenziale, ma il comportamento è ciò che produce risultati in agenzia.
              </Para>

              <SubHeading title="3. Non scalabilità" />
              <Para>
                Le reti agenziali dei grandi gruppi europei gestiscono migliaia di inserimenti ogni anno. Senza gli strumenti
                adeguati, assicurare{' '}
                <strong className="text-[#0D0D0D]/80">standard di qualità uniformi su larga scala</strong> rimane un'aspirazione
                teorica.
              </Para>

              {/* Section 4 */}
              <SectionHeading num="4" title="La misurazione del talento mediante una valutazione comportamentale strutturata" />
              <Para>
                Le metodologie di <strong className="text-[#0D0D0D]/80">behavioral assessment</strong> hanno raggiunto oggi una
                maturità tale da poter essere applicate su larga scala. Il cuore di questo approccio risiede nel passaggio
                fondamentale dalla valutazione dichiarativa ("cosa farebbe?") alla{' '}
                <strong className="text-[#0D0D0D]/80">valutazione osservazionale</strong> ("come agisce effettivamente?").
              </Para>
              <Para>
                Il candidato affronta situazioni lavorative reali basate su metodologie come la{' '}
                <strong className="text-[#0D0D0D]/80">Behavioral Event Interview</strong> e il{' '}
                <strong className="text-[#0D0D0D]/80">Situational Judgment Test</strong>. Studi condotti in contesti di vendita
                complessa mostrano una <strong className="text-[#0D0D0D]/80">validità predittiva superiore a 0,54</strong>, un
                valore significativamente più alto rispetto al colloquio tradizionale.
              </Para>

              <InfoBox title="Esempio: uno scenario di valutazione per l'agente ibrido">
                <p className="mb-3">
                  <strong className="text-[#0D0D0D]/75">Scenario:</strong> Un cliente over-65, con un portafoglio concentrato su
                  una polizza vita rivalutabile, chiede di riallocare verso un prodotto unit-linked dopo aver letto un articolo
                  online sulle performance dei mercati. Il contesto è caratterizzato da forte volatilità.
                </p>
                <p className="font-semibold text-[#0D0D0D]/70 mb-2">Cosa misura lo strumento:</p>
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
                "La distanza tra tratto latente e comportamento osservato in contesti ad alta variabilità è il punto cieco
                sistematico dei metodi di selezione tradizionali. Riempire questo vuoto con dati strutturati e comparabili è
                la sfida metodologica centrale per le direzioni HR nel settore assicurativo."
              </Quote>

              <Para>
                L'integrazione di tecnologie per l'elaborazione del linguaggio naturale ha potenziato enormemente questa
                metodologia. L'<strong className="text-[#0D0D0D]/80">AI non sostituisce il giudizio umano</strong>. Lo affianca
                fornendo <strong className="text-[#0D0D0D]/80">dati oggettivi e misurabili</strong> che arricchiscono la
                comprensione del profilo comportamentale.
              </Para>

              <SubHeading title="Il quadro normativo come acceleratore" />
              <Para>
                L'<strong className="text-[#0D0D0D]/80">EU AI Act</strong> (Regolamento UE 2024/1689) classifica i sistemi di
                valutazione basati su intelligenza artificiale come sistemi ad alto rischio, imponendo requisiti rigorosi di{' '}
                <strong className="text-[#0D0D0D]/80">trasparenza algoritmica, supervisione umana e spiegabilità delle decisioni</strong>.
                Per le organizzazioni che adottano strumenti già allineati, questo quadro normativo diventa un{' '}
                <strong className="text-[#0D0D0D]/80">vantaggio competitivo</strong>.
              </Para>

              <Quote source="Regolamento (UE) 2024/1689 — Art. 10, 13, 14">
                "I sistemi di AI sono sviluppati e utilizzati in modo da consentire un'adeguata tracciabilità e spiegabilità delle
                decisioni; devono garantire diversità, non discriminazione ed equità, evitando effetti discriminatori e pregiudizi
                ingiusti; e devono essere progettati in modo da poter essere efficacemente supervisionati da persone fisiche durante
                il periodo in cui sono in uso."
              </Quote>

              {/* Section 5 */}
              <SectionHeading num="5" title="Dall'assessment all'impatto: risultati attesi" />
              <Para>
                L'adozione della <strong className="text-[#0D0D0D]/80">valutazione comportamentale strutturata</strong> nelle reti
                agenziali produce effetti misurabili su tre dimensioni:
              </Para>

              <SubHeading title="1. Qualità della selezione" />
              <Para>
                L'aumento della validità predittiva dallo 0,38 a oltre lo{' '}
                <strong className="text-[#0D0D0D]/80">0,54</strong> si traduce in una drastica{' '}
                <strong className="text-[#0D0D0D]/80">riduzione dei mis-hire</strong> nei primi 12 mesi: meno agenti che abbandonano
                la rete prima di raggiungere il break-even di produttività, meno portafogli clienti orfani e meno costi di
                re-recruiting.
              </Para>

              <SubHeading title="2. Produttività della rete" />
              <Para>
                Selezionare profili allineati al modello ibrido accelera il{' '}
                <strong className="text-[#0D0D0D]/80">time-to-productivity</strong> e migliora le metriche di{' '}
                <strong className="text-[#0D0D0D]/80">cross-selling e retention</strong>. Il differenziale tra i migliori e i
                peggiori performer in termini di <strong className="text-[#0D0D0D]/80">life-time value del portafoglio</strong> è
                tipicamente di <strong className="text-[#0D0D0D]/80">3 o 5 volte superiore</strong>.
              </Para>

              <SubHeading title="3. Scalabilità e coerenza cross-market" />
              <Para>
                Gli strumenti basati sull'AI e supportati dall'analisi del linguaggio naturale sono progettati per operare con{' '}
                <strong className="text-[#0D0D0D]/80">coerenza su scala geografica e linguistica</strong>, rispettando le
                specificità culturali locali.
              </Para>

              <InfoBox title="Gli economics in sintesi" accent>
                <ul className="space-y-1.5">
                  <li><strong className="text-[#0D0D0D]/75">Costo medio di un inserimento non efficace:</strong> <span style={{ color: '#FF5F24', fontWeight: 600 }}>€35.000–50.000</span></li>
                  <li><strong className="text-[#0D0D0D]/75">Turnover del primo anno nelle reti agenziali europee:</strong> <span style={{ color: '#FF5F24', fontWeight: 600 }}>20–30%</span></li>
                  <li><strong className="text-[#0D0D0D]/75">Potenziale di riduzione del mis-hire rate:</strong> <span style={{ color: '#FF5F24', fontWeight: 600 }}>25–40%</span></li>
                </ul>
                <p className="mt-3 text-[#0D0D0D]/60">
                  <strong className="text-[#0D0D0D]/75">Implicazione:</strong> Per una rete di 2.000 agenti, l'impatto economico annuo stimato è di diversi milioni di euro.
                </p>
              </InfoBox>

              {/* 3 domande */}
              <SectionHeading title="3 domande per il tuo comitato di direzione" />
              <Para>
                Prima ancora di scegliere gli strumenti, le organizzazioni assicurative sono chiamate a rispondere a quesiti
                strategici che definiscono il perimetro del problema.
              </Para>

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
                <h2 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-4">Next step</h2>
              </div>
              <Para>
                Se la tua organizzazione sta ripensando il modello di selezione della rete agenziale, o se desidera mappare il
                profilo comportamentale degli agenti rispetto al modello ibrido, Skillvue può supportarti con{' '}
                <strong className="text-[#0D0D0D]/80">assessment comportamentali predittivi</strong>, scalabili e pienamente
                conformi all'EU AI Act, personalizzati sulle specificità del tuo contesto assicurativo.
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatBox value="€35-50k" label="Costo per un inserimento fallito" />
                <StatBox value="25-40%" label="Riduzione mis-hire rate" />
                <StatBox value="20-30%" label="Turnover primo anno" />
                <StatBox value="3-5x" label="Differenziale top vs. low performer" />
              </div>

              <Quote>
                "La domanda non è se la scienza supportata dall'AI cambierà il modo in cui selezioniamo le persone.
                La domanda è chi sarà in grado di usarla per prendere decisioni migliori di quelle che prenderebbe senza di essa."
              </Quote>

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
                  A differenza delle suite HR generiche o degli strumenti di assessment unidimensionali, Skillvue{' '}
                  <strong className="text-[#0D0D0D]/80">combina la solidità della scienza psicometrica con la potenza dei moderni
                  LLM</strong> per creare un <strong className="text-[#0D0D0D]/80">copilota AI scientificamente fondato</strong>,
                  allineato al modello di leadership e al quadro di competenze specifico di ciascuna azienda.
                </Para>
              </div>

              {/* References */}
              <div className="border-t border-black/[0.07] pt-8 mt-8">
                <h3 className="text-[1rem] font-bold text-[#0D0D0D] mb-4">Fonti e riferimenti</h3>
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

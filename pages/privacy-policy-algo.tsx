// @ts-nocheck
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyAlgo() {
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-6 block">
                Legal
              </span>
              <h1 className="font-semibold text-white/95 mb-4 text-[48px] md:text-[64px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Trattamento dati personali
              </h1>
              <p className="text-[16px] text-white/40 leading-[1.7]">
                Le informative di Skillvue sul trattamento dei dati personali — Sito Web e Software Skillvue
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-breathe py-16 lg:py-24">
          <div className="max-w-[900px] mx-auto px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose-custom"
            >

              {/* ══ NOTICE 1: SITO WEB ══ */}
              <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8" style={{ background: 'rgba(217,96,63,0.08)', color: '#D9603F', border: '1px solid rgba(217,96,63,0.18)' }}>
                  Informativa · Sito Web
                </div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold text-[#121212] mb-3 leading-[1.3]">
                  Informativa sul trattamento dei dati personali
                </h2>
                <p className="text-[14px] text-[#121212]/40 mb-8">
                  Resa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR)
                </p>

                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-6">
                  Il Titolare del trattamento informa ai sensi del regolamento UE 2016/679 ("GDPR") e della vigente normativa in materia di protezione dei Dati Personali che i Suoi Dati (in seguito, "Dati"), nell'ambito del Sito Web{' '}
                  <Button asChild variant="tertiary" mode="light" icon={null}>
                    <a href="https://www.skillvue.ai/it" target="_blank" rel="noopener noreferrer">https://www.skillvue.ai/it</a>
                  </Button>
                  {' '}e degli eventuali sottodomini (in seguito "Sito") nonché nell'ambito dell'utilizzo dei servizi offerti dal Titolare, saranno trattati con le modalità e per le finalità seguenti.
                </p>
                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-10">
                  Ove non diversamente indicato, quanto contenuto nella presente informativa dovrà intendersi applicabile solo ai Dati Personali trattati nell'ambito dell'utilizzo del Sito Web e dei suoi sottodomini. Resta inteso che per i trattamenti di Dati Personali effettuati per finalità diverse da quelle di seguito indicate troveranno applicazione le informative sul trattamento relative ai servizi di volta in volta considerati.
                </p>

                <PolicySection title="1. Titolare del trattamento">
                  <p>Titolare del trattamento è Algojob S.r.l., P.IVA 11656370969, operante con il brand Skillvue, con sede legale in Via Molino delle Armi n. 11 — 20123 Milano (MI) (di seguito anche "Skillvue" o "la Società"), in persona del legale rappresentante pro tempore.</p>
                  <p className="font-semibold text-[#121212]/80 mt-4">Contatti del Titolare:</p>
                  <ul>
                    <li>PEC: think-up@legalmail.it</li>
                    <li>E-mail per questioni privacy: <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:privacy@skillvue.ai">privacy@skillvue.ai</a></Button></li>
                  </ul>
                </PolicySection>

                <PolicySection title="2. Responsabile della Protezione dei Dati (RPD/DPO)">
                  <p>Il Titolare ha designato un Responsabile della Protezione dei Dati (RPD/DPO), contattabile per tutte le questioni relative al trattamento dei dati personali e all'esercizio dei diritti ai sensi del GDPR al seguente indirizzo e-mail: <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:dpo@skillvue.ai">dpo@skillvue.ai</a></Button></p>
                </PolicySection>

                <PolicySection title="3. Categorie di interessati e di dati trattati">
                  <p>La presente informativa si rivolge agli Utenti del sito web.</p>
                  <p>Skillvue tratta le seguenti categorie di dati personali:</p>
                  <ul>
                    <li>dati identificativi (nome, cognome);</li>
                    <li>dati di contatto professionali (indirizzo e-mail, numero di telefono);</li>
                    <li>dati di navigazione (indirizzo IP).</li>
                  </ul>
                </PolicySection>

                <PolicySection title="4. Finalità e basi giuridiche del trattamento">
                  <p>I dati personali sono trattati per le seguenti finalità, ciascuna fondata su una propria base giuridica:</p>
                  <p className="mt-5"><strong className="text-[#121212]/85 font-semibold">4.1 Gestione delle richieste di informazioni pervenute tramite form per la Demo.</strong> Finalità: raccogliere e gestire le richieste di informazioni, contatto o prenotazione di demo inviate dall'Utente tramite i moduli presenti sul Sito, al fine di fornire riscontro alla richiesta, illustrare i servizi offerti da Skillvue e, ove applicabile, avviare le trattative precontrattuali. Base giuridica: esecuzione di un contratto di cui l'interessato è parte o esecuzione di misure precontrattuali adottate su richiesta dell'interessato stesso (art. 6, par. 1, lett. b, GDPR).</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.2 Gestione del Sito e delle sue funzioni operative.</strong> Finalità: garantire il corretto funzionamento tecnico del Sito, prevenire e rilevare eventuali malfunzionamenti, errori o attacchi informatici, analizzare le modalità di utilizzo del Sito da parte degli Utenti al fine di migliorare l'esperienza di navigazione, ottimizzare le prestazioni e la fruibilità dei contenuti e dei servizi offerti. A tale scopo vengono trattati, in particolare, i dati di navigazione automaticamente generati dai sistemi informatici e dai protocolli di comunicazione utilizzati per l'accesso al Sito (quali l'indirizzo IP, il tipo di browser, il sistema operativo, le pagine visitate e i relativi orari di accesso). Base giuridica: il legittimo interesse del Titolare (art. 6, par. 1, lett. f, GDPR).</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.3 Accertamento, esercizio o difesa dei diritti del Titolare in sede stragiudiziale e/o giudiziale.</strong> Finalità: conservare e trattare i dati personali del cliente raccolti nell'ambito del rapporto intercorso nella misura in cui ciò risulti necessario per accertare, esercitare o difendere un diritto del Titolare in sede stragiudiziale e/o giudiziale. Base giuridica: legittimo interesse del Titolare (art. 6, par. 1, lett. f, GDPR), consistente nella tutela dei propri diritti e interessi legittimi in sede stragiudiziale e giudiziale. Tale base giuridica è riconosciuta espressamente dal considerando 49 GDPR e dalle Linee guida EDPB, che individuano la difesa in giudizio come interesse legittimo prevalente, proporzionato e non suscettibile di essere bilanciato in senso sfavorevole al Titolare in presenza di una controversia effettiva o ragionevolmente prevedibile. Il trattamento per questa finalità è limitato ai dati strettamente pertinenti alla controversia e cessa non appena la stessa si conclude o il rischio di contenzioso viene meno.</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.4 Marketing diretto: invio di comunicazioni commerciali.</strong> Finalità: invio di newsletter, aggiornamenti di prodotto, comunicazioni commerciali, inviti a eventi e webinar, comunicazione di offerte o novità relative ai servizi di Skillvue. Base giuridica: consenso libero, specifico, informato e inequivocabile dell'interessato (art. 6, par. 1, lett. a, GDPR; art. 130 D.Lgs. 196/2003). Il consenso è revocabile in qualsiasi momento, con effetto per il futuro, tramite le modalità indicate al successivo paragrafo 11 e/o cliccando sul link di disiscrizione presente in ogni comunicazione.</p>
                </PolicySection>

                <PolicySection title="5. Modalità del trattamento">
                  <p>Il trattamento dei Suoi Dati è effettuato, sia in modalità cartacea che informatizzata in modo da minimizzare il rischio di distruzione, perdita (compresa la perdita accidentale), accesso/utilizzo non autorizzati o utilizzo incompatibile con la finalità iniziale della raccolta. Ciò viene conseguito con le misure di sicurezza tecniche e organizzative attuate dal Titolare.</p>
                </PolicySection>

                <PolicySection title="6. Processi decisionali automatizzati">
                  <p>Nell'ambito dei rapporti con i clienti, Skillvue non adotta processi decisionali unicamente automatizzati ai sensi dell'art. 22 GDPR che producano effetti giuridici o incidano in modo analogamente significativo sugli interessati.</p>
                </PolicySection>

                <PolicySection title="7. Natura del conferimento e conseguenze del rifiuto">
                  <p>Il conferimento dei dati per le finalità di cui ai paragrafi 4.1, 4.2 e 4.3 è necessario per la conclusione e l'esecuzione del rapporto e per l'adempimento degli obblighi di legge: il rifiuto comporta l'impossibilità di instaurare o proseguire il rapporto.</p>
                  <p>Il conferimento dei dati per le finalità di marketing (paragrafo 4.4) è facoltativo: il rifiuto o la revoca del consenso non comporta alcuna conseguenza sul rapporto contrattuale in corso.</p>
                </PolicySection>

                <PolicySection title="8. Destinatari e comunicazione dei dati">
                  <p>I dati personali possono essere comunicati, nei limiti di quanto strettamente necessario, alle seguenti categorie di destinatari:</p>
                  <ul>
                    <li>dipendenti e/o collaboratori, debitamente istruiti e autorizzati al trattamento ai sensi degli artt. 29 GDPR e 2-quaterdecies D. Lgs. 196/2003;</li>
                    <li>soggetti nominati quali responsabili del trattamento ex art. 28 GDPR;</li>
                    <li>autorità pubbliche, autorità giudiziarie, autorità di controllo e altri soggetti pubblici, quando la comunicazione è imposta dalla legge o necessaria all'accertamento di diritti.</li>
                  </ul>
                  <p>L'elenco aggiornato dei responsabili del trattamento può essere richiesto al Titolare ai contatti indicati al paragrafo 1.</p>
                </PolicySection>

                <PolicySection title="9. Trasferimenti extra-UE">
                  <p>I dati personali sono prevalentemente trattati all'interno dello Spazio Economico Europeo. Alcuni dei fornitori tecnologici di cui Skillvue si avvale in qualità di responsabili del trattamento appartengono a gruppi multinazionali con sede principale al di fuori dell'Unione europea (in particolare negli Stati Uniti d'America). Qualora si verifichino trasferimenti extra-UE nell'ambito dei servizi resi da tali responsabili, Skillvue garantisce che gli stessi avvengano nel rispetto del Capo V GDPR, in particolare sulla base di:</p>
                  <ul>
                    <li>decisione di adeguatezza della Commissione europea ai sensi dell'art. 45 GDPR (EU-U.S. Data Privacy Framework) per i fornitori certificati ed iscritti nel registro pubblico mantenuto dal Dipartimento del Commercio statunitense;</li>
                    <li>in subordine, Clausole Contrattuali Standard approvate dalla Commissione europea ai sensi dell'art. 46, par. 2, lett. c, GDPR, integrate, ove necessario sulla base di apposita valutazione di impatto sui trasferimenti, da misure supplementari conformi alle Raccomandazioni EDPB 01/2020.</li>
                  </ul>
                  <p>L'elenco aggiornato dei responsabili del trattamento, con indicazione delle relative localizzazioni e delle garanzie applicate, può essere richiesto al Titolare ai contatti indicati al paragrafo 1.</p>
                </PolicySection>

                <PolicySection title="10. Tempi di conservazione">
                  <p>I dati personali sono conservati per i seguenti periodi:</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.1 Gestione richieste tramite form Demo:</strong> i dati raccolti attraverso i moduli di contatto e richiesta demo sono conservati per il tempo strettamente necessario a dare riscontro alla richiesta e, ove l'interessato diventi cliente, per tutta la durata del rapporto contrattuale. In assenza di successivo rapporto contrattuale, i dati sono cancellati o anonimizzati entro 24 (ventiquattro) mesi dalla data di ricezione della richiesta, salvo che l'interessato abbia espresso il consenso al trattamento per finalità di marketing di cui al punto 4.4.</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.2 Gestione del Sito e funzioni operative:</strong> i dati di navigazione (incluso l'indirizzo IP) raccolti per finalità di gestione tecnica e sicurezza del Sito sono conservati per un periodo non superiore a 6 (sei) mesi dalla data di raccolta, salvo necessità di conservazione ulteriore in caso di accertate violazioni della sicurezza o illeciti informatici, nel qual caso i dati potranno essere trattenuti per il tempo necessario all'espletamento delle relative procedure.</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.3 Difesa in giudizio:</strong> in deroga ai termini ordinari di cui ai punti precedenti, i dati strettamente pertinenti a una controversia pendente o ragionevolmente prevedibile sono conservati per il tempo necessario alla sua definizione e, in ogni caso, non oltre 10 (dieci) anni dalla cessazione del rapporto, in applicazione del termine di prescrizione ordinaria ex art. 2946 c.c. Decorso tale termine, i dati sono cancellati o anonimizzati. In assenza di controversia pendente o concretamente prevedibile, questa finalità non può essere invocata per trattenere i dati oltre i termini ordinari.</p>
                  <p><strong className="text-[#121212]/85 font-semibold">4.4 Marketing diretto:</strong> fino a revoca del consenso da parte dell'interessato e comunque non oltre 24 mesi dall'ultimo contatto utile, fatta salva la possibilità di rinnovare il consenso.</p>
                  <p>Al termine dei suddetti periodi, i dati sono cancellati o resi anonimi, salvi eventuali obblighi legali di conservazione ulteriore.</p>
                </PolicySection>

                <PolicySection title="11. Diritti dell'interessato">
                  <p>L'interessato può esercitare in qualsiasi momento, ai sensi degli artt. 15-22 GDPR, i seguenti diritti:</p>
                  <ul>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto di accesso</strong> (art. 15): ottenere conferma dell'esistenza del trattamento e ricevere copia dei dati personali trattati;</li>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto di rettifica</strong> (art. 16): ottenere la correzione di dati inesatti o l'integrazione di dati incompleti;</li>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto alla cancellazione</strong> (art. 17): ottenere la cancellazione dei dati personali nei casi previsti dalla norma;</li>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto di limitazione del trattamento</strong> (art. 18);</li>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto alla portabilità dei dati</strong> (art. 20), ove applicabile;</li>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto di opposizione al trattamento</strong> (art. 21), in particolare al trattamento per finalità di marketing diretto;</li>
                    <li><strong className="text-[#121212]/85 font-semibold">diritto di revocare il consenso</strong> in qualsiasi momento (art. 7, par. 3), senza che ciò pregiudichi la liceità del trattamento basata sul consenso prestato prima della revoca.</li>
                  </ul>
                  <p>Per esercitare i diritti e per proporre reclamo al Garante per la protezione dei dati personali (<Button asChild variant="tertiary" mode="light" icon={null}><a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a></Button>), può scrivere a <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:privacy@skillvue.ai">privacy@skillvue.ai</a></Button> o al DPO a <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:dpo@skillvue.ai">dpo@skillvue.ai</a></Button>. Skillvue risponde alle richieste degli interessati entro un mese dalla ricezione, estensibile di ulteriori due mesi in caso di particolare complessità, ai sensi dell'art. 12, par. 3, GDPR.</p>
                </PolicySection>

                <p className="text-[13px] text-[#121212]/35 mt-12 pt-8 border-t border-[#121212]/[0.06]">
                  Ultimo aggiornamento: 25 giugno 2026
                </p>
              </div>

              {/* Notice-level divider */}
              <div className="h-px bg-[#121212]/[0.1] mb-20" />

              {/* ══ NOTICE 2: SOFTWARE SKILLVUE (AI) ══ */}

              {/* IT Version */}
              <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-4" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  Informativa · Software Skillvue
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8 ml-2" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  Versione italiana
                </div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold text-[#121212] mb-8 leading-[1.3]">
                  Informativa sul trattamento di dati personali svolto tramite il software Skillvue
                </h2>

                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-10">
                  Algojob S.r.l. ("Algojob" o "Skillvue") ha sviluppato un software basato sull'intelligenza artificiale denominato <strong className="text-[#121212]/85 font-semibold">Skillvue</strong>, che consente alle aziende di analizzare e valutare le competenze trasversali, tecniche e comportamentali di candidati e dipendenti ("Interessati"). Le competenze vengono rilevate attraverso "analisi AI di interviste e test a risposta multipla" con supervisione umana.
                </p>

                <PolicySection title="Titolare del trattamento">
                  <p>Algojob S.r.l., Via Molino delle Armi 11, 20123 Milano, Italia</p>
                  <ul>
                    <li>Codice Fiscale: 11656370969</li>
                    <li>P.IVA: 11656370969</li>
                    <li>Registro Imprese: MI – 2617568</li>
                    <li>Email: <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:privacy@skillvue.ai">privacy@skillvue.ai</a></Button></li>
                  </ul>
                </PolicySection>

                <PolicySection title="Fonte dei dati">
                  <p>Dati raccolti tramite la piattaforma Skillvue nel corso di processi di selezione, mobilità interna o talent management.</p>
                </PolicySection>

                <PolicySection title="Dati trattati">
                  <ul>
                    <li>Vettori computazionali anonimizzati derivanti dall'analisi AI delle trascrizioni dei colloqui</li>
                    <li>Video/audio dei colloqui</li>
                    <li>Dati comportamentali derivanti dall'analisi AI delle risposte trascritte</li>
                    <li>Dati sulle competenze identificate tramite analisi AI</li>
                  </ul>
                </PolicySection>

                <PolicySection title="Finalità del trattamento e base giuridica">
                  <p><strong className="text-[#121212]/85 font-semibold">Addestramento e sviluppo AI:</strong> Il sistema identifica i concetti chiave espressi dal candidato e li associa a indicatori comportamentali per ciascuna competenza. Il trattamento si basa sul legittimo interesse nell'addestrare l'AI tramite supervisione umana per produrre risultati migliori e più coerenti.</p>
                  <p><strong className="text-[#121212]/85 font-semibold">Ricerca e sviluppo:</strong> Studi e ricerche nel campo dell'intelligenza artificiale, basati sul legittimo interesse.</p>
                </PolicySection>

                <PolicySection title="Modalità di trattamento">
                  <p>I dati sono trattati con mezzi elettronici e algoritmi AI, con misure di sicurezza adeguate a garantire riservatezza, integrità e disponibilità. Skillvue non è coinvolta in processi decisionali automatizzati con effetti giuridici; tali decisioni spettano esclusivamente alle aziende clienti. I dati sono protetti mediante misure tecniche, organizzative e legali.</p>
                </PolicySection>

                <PolicySection title="Conservazione dei dati">
                  <p>I dati sono conservati per un periodo massimo di <strong className="text-[#121212]/85 font-semibold">24 mesi</strong> dalla raccolta sul cloud privato Amazon di Skillvue (con sede nell'UE) per finalità di addestramento AI e ricerca. Trascorso tale termine, i dati vengono anonimizzati in modo irreversibile o cancellati.</p>
                </PolicySection>

                <PolicySection title="Destinatari dei dati">
                  <ul>
                    <li>Personale autorizzato e formato</li>
                    <li>Amazon (responsabile del trattamento, nell'UE)</li>
                    <li>Autorità e istituzioni che ne abbiano diritto per legge</li>
                  </ul>
                </PolicySection>

                <PolicySection title="Trasferimenti internazionali">
                  <p>I dati sono conservati nell'UE. I trasferimenti al di fuori dell'UE avvengono solo in presenza di: paese destinatario ritenuto adeguato dalla Commissione europea, oppure Clausole Contrattuali Standard (con eventuali misure supplementari).</p>
                </PolicySection>

                <PolicySection title="Diritti dell'interessato">
                  <p>Ai sensi del GDPR, gli interessati possono:</p>
                  <ul>
                    <li>Ottenere conferma dell'esistenza dei propri dati e accedere al relativo contenuto</li>
                    <li>Richiedere la cancellazione o la limitazione del trattamento</li>
                    <li>Esercitare il diritto di opposizione al trattamento basato sul legittimo interesse "per motivi connessi alla propria situazione particolare"</li>
                    <li>Proporre reclamo all'Autorità Garante per la protezione dei dati personali o ricorrere all'autorità giudiziaria</li>
                  </ul>
                  <p>Per esercitare i propri diritti: <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:privacy@skillvue.ai">privacy@skillvue.ai</a></Button></p>
                </PolicySection>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#121212]/[0.08] mb-20" />

              {/* EN Version */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  English version
                </div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold text-[#121212] mb-8 leading-[1.3]">
                  Information on the processing of personal data carried out through the Skillvue software
                </h2>

                <p className="text-[16px] text-[#121212]/70 leading-[1.85] mb-10">
                  Algojob S.r.l. developed AI-based software called <strong className="text-[#121212]/85 font-semibold">Algo Interview</strong>, allowing companies to pre-screen candidates for recruitment processes through skills analysis. Skills are detected through "AI analysis of video interviews and multiple-choice tests" with human supervision.
                </p>

                <PolicySection title="Data Controller">
                  <p>Algojob S.r.l., Via Molino delle Armi 11, 20123 Milan, Italy</p>
                  <ul>
                    <li>Tax Code: 11656370969</li>
                    <li>VAT: 11656370969</li>
                    <li>Company Register: MI – 2617568</li>
                    <li>Email: <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:privacy@skillvue.ai">privacy@skillvue.ai</a></Button></li>
                  </ul>
                </PolicySection>

                <PolicySection title="Data Source">
                  <p>Data collected via the Skillvue platform during recruitment, internal mobility, or talent management processes.</p>
                </PolicySection>

                <PolicySection title="Processed Data">
                  <ul>
                    <li>Image and audio from video interviews</li>
                    <li>Behavioral data from AI analysis of transcribed interview text</li>
                    <li>Competency data identified through AI analysis</li>
                  </ul>
                </PolicySection>

                <PolicySection title="Processing Purposes & Lawfulness">
                  <p><strong className="text-[#121212]/85 font-semibold">AI Training:</strong> The company using Skillvue specifies the profile sought, the job, and required skills; the system learns through human-supervised correction of AI outputs. Processing is based on legitimate interest in training AI to produce increasingly consistent results. Data provision is optional.</p>
                  <p><strong className="text-[#121212]/85 font-semibold">Research & Development:</strong> Studies in artificial intelligence based on legitimate interest. Data provision is optional.</p>
                </PolicySection>

                <PolicySection title="Data Processing Methods">
                  <p>Data processed via electronic means and AI algorithms with appropriate security measures. Skillvue uses an algorithm pre-trained on a set of inputs with known outputs (training data). The system processes data through machine learning, recognizing connections between inputs and outputs using data external to the training sets.</p>
                </PolicySection>

                <PolicySection title="Data Retention">
                  <p>Data stored for a maximum period of <strong className="text-[#121212]/85 font-semibold">24 months</strong> from collection on Skillvue's private Amazon cloud (EU-located) for AI training and research purposes.</p>
                </PolicySection>

                <PolicySection title="Data Recipients">
                  <ul>
                    <li>Authorized, trained personnel</li>
                    <li>Amazon (data processor within EU)</li>
                    <li>Authorities and institutions with legal access rights</li>
                  </ul>
                </PolicySection>

                <PolicySection title="International Transfers">
                  <p>Data retained within the EU. Transfers outside the EU occur only where the recipient country has been deemed adequate by the EU Commission, or Standard Contractual Clauses (with supplementary measures where required) are in place.</p>
                </PolicySection>

                <PolicySection title="Data Subject Rights">
                  <p>Under GDPR, individuals may:</p>
                  <ul>
                    <li>Receive confirmation of personal data existence and access its content</li>
                    <li>Request erasure or restriction of processing</li>
                    <li>Exercise the right to object to processing based on legitimate interest at any time, for reasons related to their particular situation</li>
                    <li>Lodge a complaint with the Data Protection Authority or seek judicial remedy</li>
                  </ul>
                  <p>To exercise your rights: <Button asChild variant="tertiary" mode="light" icon={null}><a href="mailto:privacy@skillvue.ai">privacy@skillvue.ai</a></Button></p>
                </PolicySection>

                <p className="text-[13px] text-[#121212]/35 mt-12 pt-8 border-t border-[#121212]/[0.06]">
                  Last updated: April 2025
                </p>
              </div>

            </motion.div>
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

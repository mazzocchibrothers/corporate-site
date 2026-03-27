// @ts-nocheck
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

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
              <span className="text-[11px] font-bold text-[#4B4DF7]/60 tracking-[0.2em] uppercase mb-6 block">
                Legal
              </span>
              <h1 className="font-bold text-white/95 mb-4" style={{ fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Trattamento dati personali
              </h1>
              <p className="text-[16px] text-white/40 leading-[1.7]">
                Informativa sul trattamento di dati personali svolto tramite il software Skillvue
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

              {/* IT Version */}
              <div className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  Versione italiana
                </div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold text-[#1A1A2E] mb-8 leading-[1.3]">
                  Informativa sul trattamento di dati personali svolto tramite il software Skillvue
                </h2>

                <p className="text-[16px] text-[#1A1A2E]/70 leading-[1.85] mb-10">
                  Algojob S.r.l. ("Algojob" o "Skillvue") ha sviluppato un software basato sull'intelligenza artificiale denominato <strong className="text-[#1A1A2E]/85 font-semibold">Skillvue</strong>, che consente alle aziende di analizzare e valutare le competenze trasversali, tecniche e comportamentali di candidati e dipendenti ("Interessati"). Le competenze vengono rilevate attraverso "analisi AI di interviste e test a risposta multipla" con supervisione umana.
                </p>

                <PolicySection title="Titolare del trattamento">
                  <p>Algojob S.r.l., Via Molino delle Armi 11, 20123 Milano, Italia</p>
                  <ul>
                    <li>Codice Fiscale: 11656370969</li>
                    <li>P.IVA: 11656370969</li>
                    <li>Registro Imprese: MI – 2617568</li>
                    <li>Email: <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:underline">privacy@skillvue.ai</a></li>
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
                  <p><strong className="text-[#1A1A2E]/85 font-semibold">Addestramento e sviluppo AI:</strong> Il sistema identifica i concetti chiave espressi dal candidato e li associa a indicatori comportamentali per ciascuna competenza. Il trattamento si basa sul legittimo interesse nell'addestrare l'AI tramite supervisione umana per produrre risultati migliori e più coerenti.</p>
                  <p><strong className="text-[#1A1A2E]/85 font-semibold">Ricerca e sviluppo:</strong> Studi e ricerche nel campo dell'intelligenza artificiale, basati sul legittimo interesse.</p>
                </PolicySection>

                <PolicySection title="Modalità di trattamento">
                  <p>I dati sono trattati con mezzi elettronici e algoritmi AI, con misure di sicurezza adeguate a garantire riservatezza, integrità e disponibilità. Skillvue non è coinvolta in processi decisionali automatizzati con effetti giuridici; tali decisioni spettano esclusivamente alle aziende clienti. I dati sono protetti mediante misure tecniche, organizzative e legali.</p>
                </PolicySection>

                <PolicySection title="Conservazione dei dati">
                  <p>I dati sono conservati per un periodo massimo di <strong className="text-[#1A1A2E]/85 font-semibold">24 mesi</strong> dalla raccolta sul cloud privato Amazon di Skillvue (con sede nell'UE) per finalità di addestramento AI e ricerca. Trascorso tale termine, i dati vengono anonimizzati in modo irreversibile o cancellati.</p>
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
                  <p>Per esercitare i propri diritti: <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:underline">privacy@skillvue.ai</a></p>
                </PolicySection>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#1A1A2E]/[0.08] mb-20" />

              {/* EN Version */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-8" style={{ background: 'rgba(75,77,247,0.08)', color: '#4B4DF7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  English version
                </div>

                <h2 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold text-[#1A1A2E] mb-8 leading-[1.3]">
                  Information on the processing of personal data carried out through the Skillvue software
                </h2>

                <p className="text-[16px] text-[#1A1A2E]/70 leading-[1.85] mb-10">
                  Algojob S.r.l. developed AI-based software called <strong className="text-[#1A1A2E]/85 font-semibold">Algo Interview</strong>, allowing companies to pre-screen candidates for recruitment processes through skills analysis. Skills are detected through "AI analysis of video interviews and multiple-choice tests" with human supervision.
                </p>

                <PolicySection title="Data Controller">
                  <p>Algojob S.r.l., Via Molino delle Armi 11, 20123 Milan, Italy</p>
                  <ul>
                    <li>Tax Code: 11656370969</li>
                    <li>VAT: 11656370969</li>
                    <li>Company Register: MI – 2617568</li>
                    <li>Email: <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:underline">privacy@skillvue.ai</a></li>
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
                  <p><strong className="text-[#1A1A2E]/85 font-semibold">AI Training:</strong> The company using Skillvue specifies the profile sought, the job, and required skills; the system learns through human-supervised correction of AI outputs. Processing is based on legitimate interest in training AI to produce increasingly consistent results. Data provision is optional.</p>
                  <p><strong className="text-[#1A1A2E]/85 font-semibold">Research & Development:</strong> Studies in artificial intelligence based on legitimate interest. Data provision is optional.</p>
                </PolicySection>

                <PolicySection title="Data Processing Methods">
                  <p>Data processed via electronic means and AI algorithms with appropriate security measures. Skillvue uses an algorithm pre-trained on a set of inputs with known outputs (training data). The system processes data through machine learning, recognizing connections between inputs and outputs using data external to the training sets.</p>
                </PolicySection>

                <PolicySection title="Data Retention">
                  <p>Data stored for a maximum period of <strong className="text-[#1A1A2E]/85 font-semibold">24 months</strong> from collection on Skillvue's private Amazon cloud (EU-located) for AI training and research purposes.</p>
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
                  <p>To exercise your rights: <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:underline">privacy@skillvue.ai</a></p>
                </PolicySection>

                <p className="text-[13px] text-[#1A1A2E]/35 mt-12 pt-8 border-t border-[#1A1A2E]/[0.06]">
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
      <h3 className="text-[17px] font-bold text-[#1A1A2E] mb-4 pb-3 border-b border-[#1A1A2E]/[0.07]">
        {title}
      </h3>
      <div className="text-[15px] text-[#1A1A2E]/65 leading-[1.8] space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mt-2">
        {children}
      </div>
    </div>
  );
}

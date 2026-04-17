// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const whenAttitude = [
  'The role is junior or entry-level',
  'The context is evolving or growing rapidly',
  'There is time for structured onboarding',
  'There is strong investment in L&D programs',
];

const whenAttitudeIT = [
  'Il ruolo è junior o entry-level',
  'Il contesto è in evoluzione o in rapida crescita',
  'C\'è tempo per un onboarding strutturato',
  'Esiste un forte investimento in programmi L&D',
];

const whenCompetence = [
  'The role is critical or high-impact',
  'Consolidated technical skills are required',
  'Immediate performance impact is needed',
  'The team cannot absorb a long learning curve',
];

const whenCompetenceIT = [
  'Il ruolo è critico o ad alto impatto',
  'Sono richieste competenze tecniche consolidate',
  'È necessario un impatto immediato sulle performance',
  'Il team non può assorbire una lunga curva di apprendimento',
];

const methods = [
  { num: '01', title: 'Behavioral Event Interview (BEI)', desc: 'Instead of asking "how would you behave," ask for a concrete episode. Analyze the process: what decisions were made, what alternatives were considered, what impact the action had.' },
  { num: '02', title: 'Situational Questions', desc: 'Present realistic scenarios to understand how the candidate reasons. You\'re not looking for the "perfect" answer, but the structure of their reasoning: problem analysis, constraint management, decision criteria.' },
  { num: '03', title: 'Behavioral Evidence', desc: 'A competence must be supported by observable behaviors. The candidate must describe: a specific goal, actions taken, results obtained, metrics used.' },
  { num: '04', title: 'Practical Tests', desc: 'When possible, integrate technical tests or simulated tasks. A case study, a simulation, a practical exercise that allows you to directly observe competence in action.' },
];

const methodsIT = [
  { num: '01', title: 'Behavioral Event Interview (BEI)', desc: 'Invece di chiedere "come ti comporteresti", chiedi un episodio concreto. Analizza il processo: quali decisioni sono state prese, quali alternative sono state considerate, quale impatto ha avuto l\'azione.' },
  { num: '02', title: 'Domande situazionali', desc: 'Presenta scenari realistici per capire come ragiona il candidato. Non cerchi la risposta "perfetta", ma la struttura del ragionamento: analisi del problema, gestione dei vincoli, criteri di decisione.' },
  { num: '03', title: 'Evidenze comportamentali', desc: 'Una competenza deve essere supportata da comportamenti osservabili. Il candidato deve descrivere: un obiettivo specifico, le azioni intraprese, i risultati ottenuti, le metriche utilizzate.' },
  { num: '04', title: 'Test pratici', desc: 'Quando possibile, integra test tecnici o compiti simulati. Un case study, una simulazione, un esercizio pratico che permetta di osservare direttamente la competenza in azione.' },
];

export default function BlogArticle1() {
  const router = useRouter();
  const { lang } = useLanguage();

  const activeWhenAttitude = lang === 'it' ? whenAttitudeIT : whenAttitude;
  const activeWhenCompetence = lang === 'it' ? whenCompetenceIT : whenCompetence;
  const activeMethods = lang === 'it' ? methodsIT : methods;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1713865469900-d12502a39875?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Talent Acquisition</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '13 marzo 2026' : 'March 13, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '8 min di lettura' : '8 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? 'Attitudine vs. Competenza: come valutare un candidato' : 'Attitude vs. Competence: How to Evaluate a Candidate'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it'
                  ? 'Dovresti assumere qualcuno che sa già fare il lavoro, o qualcuno che sembra avere il potenziale per impararlo?'
                  : 'Should you hire someone who already knows how to do the job, or someone who seems to have the potential to learn it?'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'Questa è una delle domande più comuni e più sottovalutate nel recruitment. Quando valuti un candidato, stai sempre facendo una scelta tra attitudine e competenza.'
                  : 'This is one of the most common and most underestimated questions in recruitment. When you evaluate a candidate, you\'re always making a choice between attitude and competence.'}
              </p>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'Un profilo può avere un\'ottima predisposizione: curiosità, velocità di apprendimento, energia. Un altro può avere competenze già consolidate, sviluppate in contesti simili. La scelta tra i due non è solo tecnica, ma implica considerazioni strategiche per la tua azienda.'
                  : 'One profile may have a great predisposition: curiosity, speed of learning, energy. Another may have already consolidated skills, developed in similar contexts. The decision between the two is not just technical but involves strategic considerations for your company.'}
              </p>

              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 my-10">
                <p className="text-[16px] text-[#121212]/[0.7] leading-[1.8] italic">
                  {lang === 'it'
                    ? 'Vediamo la differenza tra attitudine e competenza, quando ha senso privilegiare l\'una rispetto all\'altra, e come puoi valutarle entrambe riducendo il rischio di decisioni basate su impressioni o bias.'
                    : "Let's look at the difference between attitude and competence, when it makes sense to prioritize one over the other, and how you can evaluate both while reducing the risk of decisions based on impressions or bias."}
                </p>
              </div>

              <h2 className="text-[26px] font-bold text-[#121212] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it' ? 'Attitudine vs. Competenza: qual è la vera differenza?' : "Attitude vs. Competence: What's the Real Difference?"}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'La differenza tra attitudine e competenza non è teorica. È profondamente operativa.'
                  : 'The difference between attitude and competence is not theoretical. It\'s deeply operational.'}
              </p>

              <div className="grid md:grid-cols-3 gap-3 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#121212] mb-2">{lang === 'it' ? 'Attitudine' : 'Attitude'}</h3>
                  <p className="text-[13px] text-[#121212]/[0.45] leading-[1.6]">{lang === 'it' ? 'Predisposizione, potenziale. La capacità di imparare rapidamente, relazionarsi con facilità, affrontare i problemi con curiosità.' : 'Predisposition, potential. The ability to learn quickly, relate easily, tackle problems with curiosity.'}</p>
                </div>
                <div className="rounded-xl border border-[#121212]/[0.04] bg-[#121212]/[0.02] p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#121212]/50 mb-2">vs.</h3>
                  <p className="text-[13px] text-[#121212]/[0.35] leading-[1.6]">{lang === 'it' ? 'Potenziale versus performance già osservabile' : 'Potential versus already observable performance'}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.03] p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#4B4DF7]">{lang === 'it' ? 'Competenza' : 'Competence'}</h3>
                  <p className="text-[13px] text-[#121212]/[0.55] leading-[1.6]">{lang === 'it' ? 'Già sviluppata e applicata in contesti reali. Comportamenti osservabili, risultati raggiunti, decisioni prese.' : 'Already developed and applied in real contexts. Observable behaviors, results achieved, decisions made.'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* When to prioritize */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-4 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it' ? "Quando valutare l'attitudine (e quando no)" : 'When to Evaluate Attitude (and When Not To)'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
                {lang === 'it'
                  ? <><strong className="text-[#121212]/80">Quanto tempo e margine di apprendimento può permettersi la tua organizzazione?</strong></>
                  : <>The key question is: <strong className="text-[#121212]/80">how much time and learning margin can your organization afford?</strong></>}
              </p>

              <div className="space-y-0">
                <motion.details className="group border-b border-[#121212]/[0.06]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">01</span>
                    <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{lang === 'it' ? "Privilegia l'attitudine quando" : 'Prioritize Attitude When'}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {activeWhenAttitude.map((item, j) => (
                        <li key={j} className="text-[15px] text-[#121212]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.details>

                <motion.details className="group border-b border-[#121212]/[0.06]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}>
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">02</span>
                    <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{lang === 'it' ? "Non affidarti solo all'attitudine quando" : "Don't Rely Only on Attitude When"}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {activeWhenCompetence.map((item, j) => (
                        <li key={j} className="text-[15px] text-[#121212]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.details>
              </div>

              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                  {lang === 'it'
                    ? '"L\'attitudine è una promessa. La competenza è una garanzia parziale. La scelta dipende dal livello di urgenza e dalla maturità del contesto organizzativo."'
                    : '"Attitude is a promise. Competence is a partial guarantee. The choice depends on the level of urgency and the maturity of the organizational context."'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to evaluate — accordions */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-4 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it' ? 'Come valutare la competenza in modo oggettivo' : 'How to Objectively Evaluate Competence'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
                {lang === 'it'
                  ? 'La competenza non può essere valutata solo attraverso dichiarazioni. Occorre spostare il focus dalle opinioni alle evidenze comportamentali.'
                  : 'Competence cannot be evaluated only through declarations. You need to shift the focus from opinions to behavioral evidence.'}
              </p>

              <div className="space-y-0">
                {activeMethods.map((m, i) => (
                  <motion.details
                    key={m.num}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{m.num}</span>
                      <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{m.title}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <p className="text-[15px] text-[#121212]/[0.55] leading-[1.8]">{m.desc}</p>
                    </div>
                  </motion.details>
                ))}
              </div>

              <div className="rounded-xl bg-[#121212]/[0.04] p-6 my-10">
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {lang === 'it'
                    ? <><strong className="text-[#121212]/80">Importante:</strong> alcuni candidati sanno spiegare molto bene come si dovrebbe fare una cosa. Spiegare non equivale a saperlo fare in un contesto reale, con vincoli, pressione e responsabilità.</>
                    : <><strong className="text-[#121212]/80">Important:</strong> some candidates can explain very well how something should be done. Explaining is not the same as knowing how to do it in a real context, with constraints, pressure, and responsibility.</>}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skill Assessment */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-5 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it'
                  ? 'Perché lo skill assessment ti aiuta a distinguere attitudine e competenza'
                  : 'Why Skill Assessment Helps You Distinguish Attitude and Competence'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'Distinguere attitudine e competenza richiede più di una buona intervista. Un assessment strutturato delle competenze ti permette di lavorare su due livelli distinti:'
                  : 'Distinguishing between attitude and competence requires more than a good interview. A structured skill assessment allows you to work on two distinct levels:'}
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-bold text-[#121212] mb-2">{lang === 'it' ? 'Misurazione della competenza' : 'Competence Measurement'}</h3>
                  <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{lang === 'it' ? 'Osserva comportamenti, processi decisionali, applicazione concreta delle competenze in scenari realistici.' : 'Observe behaviors, decision-making processes, concrete application of skills in realistic scenarios.'}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-bold text-[#121212] mb-2">{lang === 'it' ? 'Valutazione del potenziale' : 'Potential Evaluation'}</h3>
                  <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{lang === 'it' ? 'Analizza la capacità di apprendimento, la flessibilità cognitiva, l\'orientamento agli obiettivi. Elementi che indicano la possibilità di crescita futura.' : 'Analyze learning capacity, cognitive flexibility, goal orientation. Elements that indicate the possibility of future growth.'}</p>
                </div>
              </div>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? <>Il vantaggio immediato è la <strong className="text-[#121212]/80">comparabilità</strong>: candidati diversi vengono valutati sugli stessi criteri, con indicatori uniformi. Questo riduce il rischio di basare le decisioni sullo storytelling, sulle impressioni o sull'affinità personale.</>
                  : <>The immediate advantage is <strong className="text-[#121212]/80">comparability</strong>: different candidates are evaluated on the same criteria, with uniform indicators. This reduces the risk of basing decisions on storytelling, impressions, or personal affinity.</>}
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#121212]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {lang === 'it'
                    ? 'Attraverso assessment basati su scienza psicometrica, domande situazionali e metodologia BEI, Skillvue ti aiuta a distinguere tra chi ha già sviluppato una competenza e chi mostra un potenziale coerente con il ruolo. Decisioni basate su evidenze, non impressioni.'
                    : 'Through assessments based on psychometric science, situational questions, and BEI methodology, Skillvue helps you distinguish between those who have already developed a competence and those who show potential consistent with the role. Decisions based on evidence, not impressions.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">
                {lang === 'it' ? 'Scopri Skillvue' : 'Discover Skillvue'}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {lang === 'it'
                  ? <>Inizia a prendere decisioni basate su <span className="gradient-text">evidenze,</span> non impressioni.</>
                  : <>Start making decisions based on <span className="gradient-text">evidence,</span> not impressions.</>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it'
                  ? 'Skillvue analizza le competenze di candidati e dipendenti in modo rapido, obiettivo e su scala, grazie a una tecnologia AI proprietaria.'
                  : 'Skillvue analyzes skills of candidates and employees quickly, objectively, and at scale using proprietary AI technology.'}
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-9 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500">
                <span>{lang === 'it' ? 'Prenota un incontro' : 'Book a Meeting'}</span>
                <ArrowRight className="h-4 w-4 ml-8 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

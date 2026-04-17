// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, CheckCircle, Clipboard, Users, MessageSquare, Heart, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const phases = [
  { num: '01', title: 'Preboarding', timing: 'Offer accepted → Day 1', icon: Clipboard, points: ['Clarify priorities for the first 90 days: not just generic goals, but expected results and evaluation criteria', 'Define key references: direct manager, buddy, HR contacts', 'Align expectations on role and responsibilities before entry', 'Maintain active, structured contact: scheduled communications reduce uncertainty', 'Prepare the operational context: tools, access, first weeks agenda already planned'] },
  { num: '02', title: 'Operational Integration', timing: 'Weeks 1-4', icon: Users, points: ['Define clear short-term objectives (30-60 days): concrete results, not just activities', 'Schedule structured check-ins with the manager: frequent feedback prevents easily fixable errors', 'Assign progressive responsibilities: start with observable tasks, gradually increasing autonomy', 'Make priority criteria explicit: what is urgent, strategic, or can wait', 'Collect early signals of misalignment: recurring difficulties, decision hesitation'] },
  { num: '03', title: 'Role & Expectations Alignment', timing: 'Weeks 4-8', icon: MessageSquare, points: ['Formally review role responsibilities: compare what was defined in selection with reality', 'Make performance criteria explicit: what "doing well" means in the first 3-6 months', 'Verify autonomy level reached: which decisions are autonomous, which still need supervision', 'Ask for bidirectional feedback: manager to person and vice versa', 'Identify competency gaps: distinguish between training need, organizational support, or priority redefinition'] },
  { num: '04', title: 'Cultural Integration', timing: 'Months 2-3', icon: Heart, points: ['Make operational values explicit, not just declared ones', 'Facilitate cross-functional relationships: meetings with key stakeholders beyond the direct team', 'Clarify decision-making models: centralized, participative, data-driven?', 'Share concrete examples of expected behaviors: what gets rewarded, what creates friction', 'Schedule experience check-ins: asking "what surprised you?" is often more useful than a standard survey'] },
  { num: '05', title: 'Monitoring & Feedback', timing: 'Days 30-60-90+', icon: BarChart3, points: ['Schedule structured checkpoints at 30-60-90 days with clear objectives and criteria', 'Actively involve the direct manager: feedback cannot be delegated only to HR', 'Collect bidirectional feedback: what is working and what can improve', 'Evaluate autonomy reached vs. initial expectations: not just tasks completed, but decision quality', 'Connect gaps to concrete development plans: training, mentoring, priority redefinition'] },
];

const phasesIT = [
  { num: '01', title: 'Preboarding', timing: 'Offerta accettata → Giorno 1', icon: Clipboard, points: ['Chiarisci le priorità per i primi 90 giorni: non solo obiettivi generici, ma risultati attesi e criteri di valutazione', 'Definisci i riferimenti chiave: manager diretto, buddy, contatti HR', 'Allinea le aspettative su ruolo e responsabilità prima dell\'ingresso', 'Mantieni un contatto attivo e strutturato: le comunicazioni pianificate riducono l\'incertezza', 'Prepara il contesto operativo: strumenti, accessi, agenda delle prime settimane già pianificata'] },
  { num: '02', title: 'Integrazione operativa', timing: 'Settimane 1-4', icon: Users, points: ['Definisci obiettivi a breve termine chiari (30-60 giorni): risultati concreti, non solo attività', 'Pianifica check-in strutturati con il manager: un feedback frequente previene errori facilmente correggibili', 'Assegna responsabilità progressive: inizia con compiti osservabili, aumentando gradualmente l\'autonomia', 'Rendi espliciti i criteri di priorità: cosa è urgente, strategico o può aspettare', 'Raccogli segnali precoci di disallineamento: difficoltà ricorrenti, esitazioni decisionali'] },
  { num: '03', title: 'Allineamento ruolo e aspettative', timing: 'Settimane 4-8', icon: MessageSquare, points: ['Revisiona formalmente le responsabilità del ruolo: confronta ciò che è stato definito in selezione con la realtà', 'Rendi espliciti i criteri di performance: cosa significa "fare bene" nei primi 3-6 mesi', 'Verifica il livello di autonomia raggiunto: quali decisioni sono autonome, quali richiedono ancora supervisione', 'Chiedi un feedback bidirezionale: dal manager alla persona e viceversa', 'Identifica i gap di competenza: distingui tra bisogno formativo, supporto organizzativo o ridefinizione delle priorità'] },
  { num: '04', title: 'Integrazione culturale', timing: 'Mesi 2-3', icon: Heart, points: ['Rendi espliciti i valori operativi, non solo quelli dichiarati', 'Facilita le relazioni interfunzionali: incontri con stakeholder chiave oltre il team diretto', 'Chiarisci i modelli decisionali: centralizzati, partecipativi, data-driven?', 'Condividi esempi concreti di comportamenti attesi: cosa viene premiato, cosa crea attrito', 'Pianifica check-in sull\'esperienza: chiedere "cosa ti ha sorpreso?" è spesso più utile di un sondaggio standard'] },
  { num: '05', title: 'Monitoraggio e feedback', timing: 'Giorni 30-60-90+', icon: BarChart3, points: ['Pianifica checkpoint strutturati a 30-60-90 giorni con obiettivi e criteri chiari', 'Coinvolgi attivamente il manager diretto: il feedback non può essere delegato solo all\'HR', 'Raccogli feedback bidirezionale: cosa funziona e cosa può migliorare', 'Valuta l\'autonomia raggiunta rispetto alle aspettative iniziali: non solo i compiti completati, ma la qualità delle decisioni', 'Collega i gap a piani di sviluppo concreti: formazione, mentoring, ridefinizione delle priorità'] },
];

export default function BlogArticle6() {
  const router = useRouter();
  const { lang } = useLanguage();

  const activePhases = lang === 'it' ? phasesIT : phases;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1758519288548-046187014c85?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Onboarding</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '23 febbraio 2026' : 'February 23, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '15 min di lettura' : '15 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? 'Corporate Onboarding: guida completa al processo' : 'Corporate Onboarding: A Complete Process Guide'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it'
                  ? 'Circa il 50% dei candidati selezionati si ritira prima di iniziare. Ogni onboarding fallito significa ripetere i costi di selezione, perdere tempo del manager e rallentare il team.'
                  : 'About 50% of selected candidates back out before starting. Every failed onboarding means repeating selection costs, lost manager time, and team slowdown.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* All article content in one continuous light section */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-14 lg:py-16">

            {/* What Is Onboarding */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-5 tracking-[-0.02em]">
                {lang === 'it' ? "Che cos'è davvero l'onboarding?" : 'What Is Onboarding, Really?'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? "L'onboarding è un processo di allineamento progressivo tra persona, ruolo e organizzazione. Costruisce chiarezza su tre dimensioni fondamentali: cosa è atteso nei primi mesi, come funzionano realmente i processi e le decisioni, e quali comportamenti generano valore in quel contesto specifico."
                  : 'Onboarding is a process of progressive alignment between person, role, and organization. It builds clarity on three fundamental dimensions: what is expected in the first months, how processes and decisions actually work, and which behaviors generate value in that specific context.'}
              </p>
              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 mb-6">
                <p className="text-[16px] text-[#121212]/[0.7] leading-[1.8] italic">
                  {lang === 'it'
                    ? "Non confondere l'onboarding con il welcome. Il welcome riguarda l'esperienza iniziale. L'onboarding riguarda la capacità della persona di diventare autonoma, produttiva e integrata nel sistema organizzativo."
                    : "Don't confuse onboarding with welcome. Welcome concerns the initial experience. Onboarding concerns the person's ability to become autonomous, productive, and integrated into the organizational system."}
                </p>
              </div>
            </motion.div>

            {/* The 5 Phases */}
            <h2 className="text-[26px] font-bold text-[#121212] mb-4 mt-12 tracking-[-0.02em]">
              {lang === 'it' ? "Le 5 fasi dell'onboarding" : 'The 5 Phases of Onboarding'}
            </h2>
            <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-8">
              {lang === 'it'
                ? 'Ogni fase risponde a una domanda specifica. Insieme formano un processo strutturato e misurabile.'
                : 'Each phase answers a specific question. Together they form a structured, measurable process.'}
            </p>

            <div className="space-y-0 mb-12">
              {activePhases.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.details
                    key={p.num}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{p.num}</span>
                      <div className="flex-1">
                        <span className="text-[17px] font-semibold text-[#121212]/80 block">{p.title}</span>
                        <span className="text-[12px] text-[#121212]/30">{p.timing}</span>
                      </div>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <div className="space-y-2">
                        {p.points.map((point, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle className="h-3.5 w-3.5 text-[#4B4DF7]/40 mt-1 shrink-0" />
                            <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.details>
                );
              })}
            </div>

            {/* Onboarding as Field Assessment */}
            <h2 className="text-[26px] font-bold text-[#121212] mb-5 mt-12 tracking-[-0.02em]">
              {lang === 'it' ? "L'onboarding come assessment sul campo" : 'Onboarding as a Field Assessment'}
            </h2>
            <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
              {lang === 'it'
                ? <>Durante l'onboarding è possibile distinguere tre situazioni molto diverse: un <strong className="text-[#121212]/80">gap di competenza</strong> (richiede formazione mirata), un <strong className="text-[#121212]/80">disallineamento di ruolo</strong> (le competenze presenti non corrispondono alle reali esigenze del contesto), o un <strong className="text-[#121212]/80">problema di integrazione</strong> (le competenze tecniche ci sono, ma l'allineamento culturale è debole). Confondere queste situazioni porta a interventi inefficaci.</>
                : <>During onboarding you can distinguish three very different situations: a <strong className="text-[#121212]/80">competency gap</strong> (needs targeted training), a <strong className="text-[#121212]/80">role mismatch</strong> (present skills don't match real context needs), or an <strong className="text-[#121212]/80">integration problem</strong> (technical skills are there but cultural alignment is weak). Confusing these leads to ineffective interventions.</>}
            </p>

            <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                <h3 className="text-[16px] font-bold text-[#121212]">Key Takeaway</h3>
              </div>
              <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                {lang === 'it'
                  ? "Integrare uno skill assessment all'inizio dell'onboarding permette di validare le competenze chiave rispetto al ruolo reale, identificare i gap prima che impattino la performance e costruire un piano di sviluppo personalizzato basato su evidenze, non percezioni. Skillvue supporta questo attraverso assessment psicometrici, domande situazionali e metodologia BEI."
                  : "Integrating a skill assessment at the start of onboarding lets you validate key competencies against the actual role, identify gaps before they impact performance, and build a personalized development plan based on evidence, not perceptions. Skillvue supports this through psychometric assessments, situational questions, and BEI methodology."}
              </p>
            </div>

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
                  ? <>Prendi decisioni di onboarding basate su <span className="gradient-text">competenze reali.</span></>
                  : <>Make onboarding decisions based on real <span className="gradient-text">competencies.</span></>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it'
                  ? 'Skillvue analizza le competenze in modo rapido, obiettivo e su scala, grazie a una tecnologia AI proprietaria.'
                  : 'Skillvue analyzes skills quickly, objectively, and at scale using proprietary AI technology.'}
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

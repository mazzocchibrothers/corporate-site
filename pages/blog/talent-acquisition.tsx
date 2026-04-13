// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, Search, Building2, Users, BarChart3, GitBranch, Target } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const differencesEN = [
  { dimension: 'Approach', recruiting: 'Reactive — responds to an open vacancy', ta: 'Strategic — starts from competency mapping' },
  { dimension: 'Time Horizon', recruiting: 'Short term — fill the position quickly', ta: 'Medium-long term — build lasting capabilities' },
  { dimension: 'Key Metrics', recruiting: 'Time-to-hire, volume of applications', ta: 'Quality-of-hire, retention, performance over time' },
  { dimension: 'Decision Basis', recruiting: 'CV, experience, interview impressions', ta: 'Structured data on skills, potential, behaviors' },
];

const differencesIT = [
  { dimension: 'Approccio', recruiting: 'Reattivo — risponde a una posizione aperta', ta: 'Strategico — parte dalla mappatura delle competenze' },
  { dimension: 'Orizzonte Temporale', recruiting: 'Breve termine — coprire la posizione rapidamente', ta: 'Medio-lungo termine — costruire capacità durature' },
  { dimension: 'Metriche Chiave', recruiting: 'Time-to-hire, volume di candidature', ta: 'Quality-of-hire, retention, performance nel tempo' },
  { dimension: 'Base Decisionale', recruiting: 'CV, esperienza, impressioni del colloquio', ta: 'Dati strutturati su competenze, potenziale, comportamenti' },
];

const strategyStepsEN = [
  { icon: Search, title: 'Start from competencies, not job titles', desc: 'A solid talent acquisition strategy always begins with: which competencies are truly needed to make work function today and in the coming months? Working on critical competencies lets you anticipate future needs.' },
  { icon: Building2, title: 'Align recruiting and employer branding', desc: 'If what you communicate externally doesn\'t reflect the real way of working, you\'ll attract misaligned candidates and increase early turnover risk. Coherence between messages, declared values, and observable behaviors is key.' },
  { icon: Users, title: 'Build a talent pipeline over time', desc: 'Talent acquisition doesn\'t start when a position opens, but much earlier. Cultivate relationships with potentially relevant professionals even without an immediate need.' },
  { icon: BarChart3, title: 'Use data and objective evaluations', desc: 'A mature strategy doesn\'t rely on intuitions or interview impressions but on comparable data and clear criteria. Integrate objective evaluations of competencies, potential, and observable behaviors.' },
  { icon: GitBranch, title: 'Connect talent acquisition and internal development', desc: 'Before looking for new people externally, ask whether some competencies are already present in-house or developable through targeted upskilling and reskilling paths.' },
  { icon: Target, title: 'Measure what truly matters', desc: 'Monitoring only time-to-hire risks rewarding speed at the expense of quality. Indicators like quality-of-hire, performance over time, and retention give a much more useful reading.' },
];

const strategyStepsIT = [
  { icon: Search, title: 'Parti dalle competenze, non dai titoli di lavoro', desc: 'Una strategia di talent acquisition solida parte sempre da: quali competenze sono davvero necessarie per far funzionare il lavoro oggi e nei prossimi mesi? Lavorare sulle competenze critiche consente di anticipare i bisogni futuri.' },
  { icon: Building2, title: 'Allinea recruiting ed employer branding', desc: 'Se ciò che comunichi all\'esterno non riflette il vero modo di lavorare, attirerai candidati disallineati e aumenterai il rischio di turnover precoce. La coerenza tra messaggi, valori dichiarati e comportamenti osservabili è fondamentale.' },
  { icon: Users, title: 'Costruisci una talent pipeline nel tempo', desc: 'Il talent acquisition non inizia quando si apre una posizione, ma molto prima. Coltiva relazioni con professionisti potenzialmente rilevanti anche senza un bisogno immediato.' },
  { icon: BarChart3, title: 'Usa dati e valutazioni oggettive', desc: 'Una strategia matura non si affida a intuizioni o impressioni del colloquio, ma a dati comparabili e criteri chiari. Integra valutazioni oggettive di competenze, potenziale e comportamenti osservabili.' },
  { icon: GitBranch, title: 'Collega talent acquisition e sviluppo interno', desc: 'Prima di cercare nuove persone all\'esterno, chiedi se alcune competenze sono già presenti internamente o sviluppabili attraverso percorsi mirati di upskilling e reskilling.' },
  { icon: Target, title: 'Misura ciò che conta davvero', desc: 'Monitorare solo il time-to-hire rischia di premiare la velocità a scapito della qualità. Indicatori come quality-of-hire, performance nel tempo e retention offrono una lettura molto più utile.' },
];

export default function BlogArticle9() {
  const router = useRouter();
  const { lang } = useLanguage();

  const differences = lang === 'it' ? differencesIT : differencesEN;
  const strategySteps = lang === 'it' ? strategyStepsIT : strategyStepsEN;

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1726842172813-55c6e284f8b5?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Talent Acquisition</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '12 febbraio 2026' : 'February 12, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '13 min di lettura' : '13 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? 'Talent Acquisition: cos\'è, come funziona, perché conta' : 'Talent Acquisition: What It Is, How It Works, Why It Matters'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it' ? 'Quante assunzioni, pur essendo "giuste sulla carta," iniziano a mostrare crepe dopo pochi mesi? Il ruolo è coperto, il CV era coerente, il colloquio è andato bene... eppure.' : 'How many hires, despite being "right on paper," start showing cracks after a few months? The role is covered, the CV was coherent, the interview went well... and yet.'}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">{lang === 'it' ? 'Cos\'è il Talent Acquisition (e Perché Non è Solo Recruiting)' : "What Is Talent Acquisition (and Why It's Not Just Recruiting)"}</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? <>Il talent acquisition è l'insieme di strategie e processi attraverso cui un'azienda identifica, attrae, valuta e sviluppa le persone di cui avrà bisogno non solo oggi, ma anche in futuro. La differenza rispetto al recruiting tradizionale risiede principalmente nel livello di <strong className="text-[#1A1A2E]/80">intenzionalità</strong>.</> : <>Talent acquisition is the set of strategies and processes through which a company identifies, attracts, evaluates, and develops the people it will need not only today, but also in the future. The difference from traditional recruiting lies primarily in the level of <strong className="text-[#1A1A2E]/80">intentionality</strong>.</>}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'Il recruiting è spesso tattico: risponde a una posizione aperta, lavora su tempi e volumi. Il talent acquisition, invece, è strategico: parte dalla comprensione di quali competenze sono critiche per l\'organizzazione, quali lo diventeranno, e come costruire nel tempo un pool di persone in grado di sostenerle.' : "Recruiting is often tactical: it responds to an open vacancy, works on timing and volumes. Talent acquisition, instead, is strategic: it starts from understanding which competencies are critical for the organization, which will become so, and how to build over time a pool of people capable of sustaining them."}
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  {lang === 'it' ? '"L\'orizzonte non è la singola assunzione ma il medio-lungo termine. Le decisioni non si basano solo su ciò che serve oggi, ma su come un ruolo potrebbe evolversi e quale contributo una persona può dare nel tempo."' : '"The horizon is not the single hire but the medium-long term. Decisions aren\'t based only on what\'s needed today, but on how a role might evolve and what kind of contribution a person can make over time."'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">{lang === 'it' ? 'Talent Acquisition vs Recruiting: Le Differenze' : 'Talent Acquisition vs Recruiting: The Differences'}</h2>
              <div className="overflow-x-auto my-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#1A1A2E]/[0.08]">
                      <th className="py-3 pr-4 text-[12px] font-bold text-[#1A1A2E]/40 tracking-[0.1em] uppercase">{lang === 'it' ? 'Dimensione' : 'Dimension'}</th>
                      <th className="py-3 pr-4 text-[12px] font-bold text-[#1A1A2E]/40 tracking-[0.1em] uppercase">Recruiting</th>
                      <th className="py-3 text-[12px] font-bold text-[#4B4DF7]/60 tracking-[0.1em] uppercase">Talent Acquisition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {differences.map((d, i) => (
                      <tr key={i} className="border-b border-[#1A1A2E]/[0.04]">
                        <td className="py-4 pr-4 text-[14px] font-semibold text-[#1A1A2E]/70">{d.dimension}</td>
                        <td className="py-4 pr-4 text-[14px] text-[#1A1A2E]/[0.45]">{d.recruiting}</td>
                        <td className="py-4 text-[14px] text-[#1A1A2E]/[0.65] font-medium">{d.ta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">{lang === 'it' ? 'Come Costruire una Strategia Efficace' : 'How to Build an Effective Strategy'}</h2>
              <div className="space-y-0">
                {strategySteps.map((s, i) => {
                  return (
                    <motion.details
                      key={s.title}
                      className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                        <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                        <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{s.title}</span>
                        <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                      </summary>
                      <div className="pl-12 pb-6">
                        <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8]">{s.desc}</p>
                      </div>
                    </motion.details>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  {lang === 'it' ? 'Attraverso Skill Assessment rapidi e standardizzati, Skillvue ti aiuta a valutare i candidati su criteri chiari e comparabili usando domande situazionali basate sul BEI, test mirati di hard skill e indicatori su potenziale, autonomia e capacità di apprendimento. Sposta la selezione dal confronto di CV e impressioni a una valutazione strutturata di competenze, comportamenti e potenziale.' : 'Through rapid, standardized Skill Assessments, Skillvue helps you evaluate candidates on clear, comparable criteria using BEI-based situational questions, targeted hard skill tests, and indicators on potential, autonomy, and learning ability. Shift selection from a comparison of CVs and impressions to a structured evaluation of competencies, behaviors, and potential.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{lang === 'it' ? 'Scopri Skillvue' : 'Discover Skillvue'}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {lang === 'it' ? <>Costruisci una talent pipeline basata su <span className="italic gradient-text">competenze reali.</span></> : <>Build a talent pipeline based on <span className="italic gradient-text">real competencies.</span></>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it' ? 'Migliora la quality-of-hire con skill assessment strutturati e oggettivi.' : 'Improve quality-of-hire with structured, objective skill assessments.'}
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

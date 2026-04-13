// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, MessageSquare, Users, Target, Brain, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const indicatorsEN = [
  { context: 'In meetings', behavior: 'Doesn\'t automatically accept data or shared opinions. Asks for sources, verifies information consistency, distinguishes measurable facts from interpretations.' },
  { context: 'In projects', behavior: 'When a problem emerges, doesn\'t act on the "symptom" but seeks the real cause. Analyzes whether the issue is organizational, communicative, or related to poorly defined priorities.' },
  { context: 'In conflict', behavior: 'Separates personal perceptions from verifiable facts. Avoids generalizations ("never collaborates") and brings discussion back to specific episodes and observable behaviors.' },
  { context: 'In decisions', behavior: 'Before choosing a direction, evaluates medium-term implications. Considers impacts on other functions, required resources, and possible unintended consequences.' },
];

const indicatorsIT = [
  { context: 'Nelle riunioni', behavior: 'Non accetta automaticamente i dati o le opinioni condivise. Chiede le fonti, verifica la coerenza delle informazioni, distingue i fatti misurabili dalle interpretazioni.' },
  { context: 'Nei progetti', behavior: 'Quando emerge un problema, non agisce sul "sintomo" ma cerca la causa reale. Analizza se il problema è organizzativo, comunicativo o legato a priorità mal definite.' },
  { context: 'Nei conflitti', behavior: 'Separa le percezioni personali dai fatti verificabili. Evita le generalizzazioni ("non collabora mai") e riporta la discussione a episodi specifici e comportamenti osservabili.' },
  { context: 'Nelle decisioni', behavior: 'Prima di scegliere una direzione, valuta le implicazioni a medio termine. Considera gli impatti su altre funzioni, le risorse necessarie e le possibili conseguenze non volute.' },
];

const faqsEN = [
  { q: 'What is critical thinking?', a: 'Critical thinking is the ability to analyze information, distinguish facts from opinions, question implicit assumptions, and make decisions consistent with context. In business, it\'s an operational competence that manifests when a person verifies data before acting, evaluates possible alternatives, and considers the implications of their choices.' },
  { q: 'What\'s the difference between critical thinking and creative thinking?', a: 'Critical thinking serves to evaluate, analyze, and verify. Creative thinking serves to generate new ideas and original solutions. The first reduces the risk of errors and hasty decisions, while the second expands possibilities. In business, the two competencies work better together: creativity generates options, critical thinking evaluates and selects the most sustainable ones.' },
  { q: 'How do you evaluate critical thinking?', a: 'You need realistic scenarios that reproduce typical role situations: partial data, conflicting priorities, contradictory information. Observe whether the person verifies sources before deciding, distinguishes facts from interpretations, makes explicit the assumptions underlying their choice, and evaluates risks and implications.' },
];

const faqsIT = [
  { q: 'Che cos\'è il pensiero critico?', a: 'Il pensiero critico è la capacità di analizzare le informazioni, distinguere i fatti dalle opinioni, mettere in discussione le assunzioni implicite e prendere decisioni coerenti con il contesto. In ambito aziendale, è una competenza operativa che si manifesta quando una persona verifica i dati prima di agire, valuta possibili alternative e considera le implicazioni delle proprie scelte.' },
  { q: 'Qual è la differenza tra pensiero critico e pensiero creativo?', a: 'Il pensiero critico serve a valutare, analizzare e verificare. Il pensiero creativo serve a generare nuove idee e soluzioni originali. Il primo riduce il rischio di errori e decisioni affrettate, mentre il secondo espande le possibilità. In ambito aziendale, le due competenze funzionano meglio insieme: la creatività genera opzioni, il pensiero critico valuta e seleziona quelle più sostenibili.' },
  { q: 'Come si valuta il pensiero critico?', a: 'Servono scenari realistici che riproducano situazioni tipiche del ruolo: dati parziali, priorità in conflitto, informazioni contraddittorie. Si osserva se la persona verifica le fonti prima di decidere, distingue i fatti dalle interpretazioni, rende esplicite le assunzioni alla base della propria scelta e valuta rischi e implicazioni.' },
];

export default function BlogArticle5() {
  const router = useRouter();
  const { lang } = useLanguage();

  const indicators = lang === 'it' ? indicatorsIT : indicatorsEN;
  const faqs = lang === 'it' ? faqsIT : faqsEN;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1685541088069-66baf0b2d753?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{lang === 'it' ? 'Scienza' : 'Science'}</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '25 febbraio 2026' : 'February 25, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '10 min di lettura' : '10 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? 'Che cos\'è il pensiero critico e come valutare questa competenza' : 'What Is Critical Thinking and How to Assess This Skill'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it'
                  ? 'Il pensiero critico è una delle competenze più citate nei modelli di competenze. Eppure, quando si tratta di riconoscerlo o misurarlo, spesso diventa un\'etichetta generica.'
                  : 'Critical thinking is one of the most cited competencies in competency models. Yet when it comes to recognizing or measuring it, it often becomes a generic label.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Definition */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">
                {lang === 'it' ? 'Che cos\'è davvero il pensiero critico?' : 'What Is Critical Thinking, Really?'}
              </h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? <>In filosofia, il pensiero critico nasce come capacità di mettere in discussione assunzioni, argomenti e sistemi di credenze. In pedagogia, è legato allo sviluppo del ragionamento autonomo. <strong className="text-[#1A1A2E]/80">In ambito aziendale, tuttavia, il pensiero critico diventa una competenza operativa.</strong></>
                  : <>In philosophy, critical thinking originates as the ability to question assumptions, arguments, and belief systems. In pedagogy, it's linked to the development of autonomous reasoning. <strong className="text-[#1A1A2E]/80">In business, however, critical thinking becomes an operational competence.</strong></>}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'Per pensiero critico intendiamo la capacità di analizzare le informazioni prima di agire, distinguere i fatti dalle opinioni, valutare le implicazioni e prendere decisioni coerenti con il contesto e gli obiettivi.'
                  : 'By critical thinking we mean the ability to analyze information before acting, distinguish facts from opinions, evaluate implications, and make decisions consistent with context and objectives.'}
              </p>

              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#1A1A2E]/60 leading-[1.8] italic">
                  {lang === 'it'
                    ? '"Il pensiero critico non è sinonimo di razionalità o spirito analitico. Include anche la capacità di mettere in discussione le proprie assunzioni, valutare le fonti e decidere quando i dati sono sufficienti per agire."'
                    : '"Critical thinking is not synonymous with rationality or analytical spirit. It also includes questioning one\'s own assumptions, evaluating sources, and the ability to decide when data is sufficient to act."'}
                </p>
              </div>

              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'Una persona con un pensiero critico solido non si limita a eseguire. Analizza dati e contesto, distingue i fatti dalle interpretazioni, mette in discussione le assunzioni implicite e valuta le conseguenze delle proprie decisioni. Una persona con un pensiero critico debole tende a reagire, a seguire schemi predefiniti o a delegare il ragionamento ad altri.'
                  : 'A person with solid critical thinking doesn\'t just execute. They analyze data and context, distinguish facts from interpretations, question implicit assumptions, and evaluate the consequences of their decisions. A person with weak critical thinking tends to react, follow predefined patterns, or delegate reasoning to others.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* How to identify */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">
                {lang === 'it' ? 'Come identificare il pensiero critico nel lavoro quotidiano' : 'How to Identify Critical Thinking in Daily Work'}
              </h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-8">
                {lang === 'it'
                  ? 'Il pensiero critico diventa utile solo quando è possibile osservarlo nei comportamenti. Se rimane una definizione astratta, finirà per essere valutato soggettivamente.'
                  : 'Critical thinking becomes useful only when you can observe it in behaviors. If it remains an abstract definition, it will end up being evaluated subjectively.'}
              </p>

              <div className="space-y-4">
                {indicators.map((item, i) => (
                  <motion.details
                    key={i}
                    className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                      <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{item.context}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8]">{item.behavior}</p>
                    </div>
                  </motion.details>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to evaluate */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em]">
                {lang === 'it' ? 'Come valutare il pensiero critico' : 'How to Evaluate Critical Thinking'}
              </h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'I CV non bastano. Un curriculum può dire che una persona ha gestito progetti complessi, ma non come prende decisioni o come reagisce a dati incompleti. Anche le domande generiche in colloquio aiutano poco.'
                  : 'CVs aren\'t enough. A resume can tell you that a person has managed complex projects, but not how they make decisions or how they react to incomplete data. Generic interview questions help little either.'}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? <>Se vuoi valutare seriamente il pensiero critico, devi spostare l'attenzione su due elementi: <strong className="text-[#1A1A2E]/80">contesto e processo decisionale</strong>. Servono scenari realistici con dati parziali, priorità in conflitto e informazioni contraddittorie.</>
                  : <>If you want to evaluate critical thinking seriously, you need to shift attention to two elements: <strong className="text-[#1A1A2E]/80">context and decision-making process</strong>. You'll need realistic scenarios with partial data, conflicting priorities, and contradictory information.</>}
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{lang === 'it' ? 'Domande situazionali' : 'Situational Questions'}</h3>
                  <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">{lang === 'it' ? 'Forzano il ragionamento su un caso concreto, non su un principio astratto. Si osserva la struttura del ragionamento, non solo la risposta finale.' : 'Force reasoning on a concrete case, not an abstract principle. Observe the structure of reasoning, not just the final answer.'}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{lang === 'it' ? 'Behavioral Event Interview' : 'Behavioral Event Interview'}</h3>
                  <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">{lang === 'it' ? 'Invece di chiedere cosa farebbero, si chiede cosa hanno fatto. Si analizza il percorso mentale: quali informazioni sono state considerate, quali alternative sono state valutate.' : 'Instead of asking what they would do, ask what they did. Analyze the mental path: what information was considered, what alternatives were evaluated.'}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">{lang === 'it' ? 'Punto chiave' : 'Key Takeaway'}</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  {lang === 'it'
                    ? 'Skillvue ti permette di valutare il pensiero critico attraverso assessment basati su scenari realistici e metodologie psicometriche, osservando come una persona analizza le informazioni, identifica le variabili rilevanti e costruisce una decisione coerente. Il processo conta più della risposta finale.'
                    : 'Skillvue enables you to evaluate critical thinking through assessments based on realistic scenarios and psychometric methodologies, observing how a person analyzes information, identifies relevant variables, and builds a coherent decision. The process matters more than the final answer.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12">
            <motion.h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white/90 mb-10 tracking-[-0.02em]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {lang === 'it' ? 'Domande frequenti' : 'Frequently Asked Questions'}
            </motion.h2>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-white/[0.06]">
                  <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[16px] font-semibold text-white/85 pr-8">{faq.q}</span>
                    <span className="text-white/30 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pb-6">
                    <p className="text-[15px] text-white/[0.55] leading-[1.75]">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{lang === 'it' ? 'Scopri Skillvue' : 'Discover Skillvue'}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {lang === 'it'
                  ? <>Distingui la percezione dalla <span className="italic gradient-text">competenza reale.</span></>
                  : <>Distinguish perception from real <span className="italic gradient-text">competency.</span></>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it'
                  ? 'Integra la valutazione delle competenze per decisioni organizzative più obiettive e sostenibili.'
                  : 'Integrate skill assessment for more objective and sustainable organizational decisions.'}
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

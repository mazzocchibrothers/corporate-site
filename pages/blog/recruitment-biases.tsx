// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, AlertTriangle, Shield, Eye, Anchor, UserCheck, Zap, ThumbsUp, Brain } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const biasesEN = [
  { num: '01', title: 'Halo Effect', icon: ThumbsUp, oneliner: 'One positive trait overshadows everything else', desc: 'A single positive characteristic disproportionately influences the overall evaluation. A prestigious university, a brilliant communication style, or an international experience becomes dominant and "contaminates" the judgment on unverified competencies.', mitigation: ['Define key competencies before the interview', 'Use separate scoring grids per skill', 'Ask probing questions even when positive', 'Compare on uniform criteria'] },
  { num: '02', title: 'Horn Effect', icon: AlertTriangle, oneliner: 'One negative detail tanks the whole evaluation', desc: 'The negative twin of the Halo Effect. A perceived negative element conditions the entire evaluation. A CV error, a short work experience, or a less confident style. The interview becomes a search for confirmation of the initial doubt.', mitigation: ['Separate competencies in evaluation', 'Verify before confirming negatives', 'Distinguish error from pattern', 'Use structured scoring for all'] },
  { num: '03', title: 'Affinity Bias', icon: UserCheck, oneliner: 'You prefer candidates who feel like you', desc: 'You evaluate more positively candidates you perceive as similar to you or your team. Background, career path, communication style, or interests. The chemistry feels like competence, but it is not.', mitigation: ['Anchor to observable competencies', 'Identical questions for all candidates', 'Multiple evaluators with shared criteria', 'Separate "likeable" from "qualified"'] },
  { num: '04', title: 'Confirmation Bias', icon: Eye, oneliner: 'You only see what confirms your first impression', desc: 'The tendency to seek, interpret, and remember only information that confirms an already formed idea. Once you have an opinion, you start asking questions oriented to confirm it. If you find no contradicting evidence, you did not look hard enough.', mitigation: ['Challenge your first impression', 'Search for contrary evidence', 'Use predefined evaluation grids', 'Separate gathering from judging'] },
  { num: '05', title: 'Anchoring Bias', icon: Anchor, oneliner: 'First data point dominates all that follows', desc: 'The first piece of information received about a candidate becomes a reference point conditioning all subsequent evaluations. Current salary, degree, a colleague comment. Judgment revolves around that initial data point.', mitigation: ['Postpone economic evaluation', 'Independent criteria per competency', 'Evaluate each skill separately first', 'Compare on behavioral evidence'] },
  { num: '06', title: 'Similar-to-me Bias', icon: UserCheck, oneliner: 'You favor candidates who mirror your own path', desc: 'The tendency to prefer candidates who reflect your own path, decision-making style, or way of working. If the candidate faced similar challenges or shares your approach, you unconsciously consider them "more suitable."', mitigation: ['Clear shared competency model', 'Distinguish style from adequacy', 'Diverse evaluator backgrounds', 'Ask: competent or just similar?'] },
  { num: '07', title: 'First Impression Bias', icon: Zap, oneliner: 'The first 5 minutes determine everything', desc: 'Forming a judgment in the first minutes and maintaining it throughout. Punctuality, handshake, tone of voice, presentation style. The interview risks becoming a confirmation of the initial impression, positive or negative.', mitigation: ['Section the interview with distinct criteria', 'Defer judgment to the end', 'Notes on evidence, not perceptions', 'Multiple evaluation moments'] },
  { num: '08', title: 'Overconfidence Bias', icon: Brain, oneliner: 'You trust your own judgment too much', desc: 'The tendency to overestimate your own judgment ability. You think you can "read people instantly" or have a special instinct for talent. This is insidious because it concerns the evaluator, not the candidate.', mitigation: ['Shared measurable criteria', 'Cross-evaluator comparison', 'Distinguish experience from validation', 'Integrate structured tools'] },
];

const biasesIT = [
  { num: '01', title: 'Effetto Alone (Halo Effect)', icon: ThumbsUp, oneliner: 'Un tratto positivo oscura tutto il resto', desc: 'Una singola caratteristica positiva influenza in modo sproporzionato la valutazione complessiva. Un\'università prestigiosa, uno stile comunicativo brillante o un\'esperienza internazionale diventano dominanti e "contaminano" il giudizio su competenze non ancora verificate.', mitigation: ['Definire le competenze chiave prima del colloquio', 'Usare griglie di valutazione separate per competenza', 'Fare domande di approfondimento anche quando l\'impressione è positiva', 'Confrontare su criteri uniformi'] },
  { num: '02', title: 'Effetto Corna (Horn Effect)', icon: AlertTriangle, oneliner: 'Un dettaglio negativo affonda l\'intera valutazione', desc: 'Il gemello negativo dell\'Effetto Alone. Un elemento percepito come negativo condiziona tutta la valutazione. Un errore nel CV, un\'esperienza lavorativa breve o uno stile meno sicuro. Il colloquio diventa una ricerca di conferma del dubbio iniziale.', mitigation: ['Separare le competenze nella valutazione', 'Verificare prima di confermare i negativi', 'Distinguere l\'errore dal pattern', 'Usare griglie strutturate per tutti'] },
  { num: '03', title: 'Bias di Affinità', icon: UserCheck, oneliner: 'Preferisci i candidati che ti sembrano simili a te', desc: 'Valuti più positivamente i candidati che percepisci come simili a te o al tuo team. Background, percorso professionale, stile comunicativo o interessi. La chimica sembra competenza, ma non lo è.', mitigation: ['Ancorare la valutazione a competenze osservabili', 'Domande identiche per tutti i candidati', 'Più valutatori con criteri condivisi', 'Separare "simpatico" da "qualificato"'] },
  { num: '04', title: 'Bias di Conferma', icon: Eye, oneliner: 'Vedi solo ciò che conferma la tua prima impressione', desc: 'La tendenza a cercare, interpretare e ricordare solo le informazioni che confermano un\'idea già formata. Una volta che hai un\'opinione, inizi a fare domande orientate a confermarla. Se non trovi prove contrarie, non hai cercato abbastanza.', mitigation: ['Metti in discussione la tua prima impressione', 'Cerca attivamente prove contrarie', 'Usa griglie di valutazione predefinite', 'Separa la raccolta dati dal giudizio finale'] },
  { num: '05', title: 'Bias di Ancoraggio', icon: Anchor, oneliner: 'Il primo dato domina tutto ciò che segue', desc: 'Il primo pezzo di informazione ricevuto su un candidato diventa un punto di riferimento che condiziona tutte le valutazioni successive. Lo stipendio attuale, il titolo di studio, il commento di un collega. Il giudizio ruota attorno a quel dato iniziale.', mitigation: ['Rimandare la valutazione economica', 'Criteri indipendenti per competenza', 'Valutare ogni competenza separatamente', 'Confrontare su evidenze comportamentali'] },
  { num: '06', title: 'Bias di Somiglianza', icon: UserCheck, oneliner: 'Favorisci i candidati che rispecchiano il tuo percorso', desc: 'La tendenza a preferire candidati che riflettono il tuo percorso, stile decisionale o modo di lavorare. Se il candidato ha affrontato sfide simili o condivide il tuo approccio, inconsciamente lo consideri "più adatto."', mitigation: ['Modello di competenze condiviso e chiaro', 'Distinguere lo stile dall\'adeguatezza', 'Diversità di background tra i valutatori', 'Chiedersi: è competente o solo simile?'] },
  { num: '07', title: 'Bias della Prima Impressione', icon: Zap, oneliner: 'I primi 5 minuti determinano tutto', desc: 'Formulare un giudizio nei primi minuti e mantenerlo per tutto il colloquio. Puntualità, stretta di mano, tono di voce, stile di presentazione. Il colloquio rischia di diventare una conferma dell\'impressione iniziale, positiva o negativa.', mitigation: ['Strutturare il colloquio con criteri distinti per sezione', 'Rimandare il giudizio alla fine', 'Annotare evidenze, non percezioni', 'Prevedere più momenti di valutazione'] },
  { num: '08', title: 'Bias di Eccesso di Fiducia', icon: Brain, oneliner: 'Ti fidi troppo del tuo stesso giudizio', desc: 'La tendenza a sovrastimare la propria capacità di giudizio. Pensi di poter "leggere le persone all\'istante" o di avere un intuito speciale per il talento. È insidioso perché riguarda il valutatore, non il candidato.', mitigation: ['Criteri misurabili e condivisi', 'Confronto tra più valutatori', 'Distinguere esperienza da validazione', 'Integrare strumenti strutturati'] },
];

export default function BlogArticle2() {
  const router = useRouter();
  const { lang } = useLanguage();

  const biases = lang === 'it' ? biasesIT : biasesEN;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1758519288480-1489c17b1519?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Hiring</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '10 marzo 2026' : 'March 10, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '12 min di lettura' : '12 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? 'Gli 8 bias di selezione più comuni (e come evitarli)' : 'The 8 Most Common Recruitment Biases (and How to Avoid Them)'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it' ? 'Hai mai scartato un candidato nei primi cinque minuti di un colloquio? O deciso quasi subito che era "quello giusto"?' : 'Have you ever rejected a candidate in the first five minutes of an interview? Or decided almost immediately they were "the one"?'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'Se la risposta è sì, non significa che sei un recruiter superficiale: significa che sei umano e, proprio per questo, esposto ai bias di selezione.' : "If the answer is yes, it doesn't mean you're a superficial recruiter: it means you're human and, precisely for this reason, exposed to recruitment biases."}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'Nel processo di selezione, molte decisioni si formano prima di quanto immaginiamo. Il resto del colloquio spesso diventa una ricerca di conferma. Questo accade perché il nostro cervello usa scorciatoie cognitive per semplificare la complessità: rapide, automatiche, apparentemente efficienti. Il problema è che non sono sempre accurate.' : "In the selection process, many decisions are formed earlier than we imagine. The rest of the interview often becomes a search for confirmation. This happens because our brain uses cognitive shortcuts to simplify complexity: fast, automatic, apparently efficient. The problem is they're not always accurate."}
              </p>

              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 my-10">
                <p className="text-[16px] text-[#1A1A2E]/[0.7] leading-[1.8] italic">
                  {lang === 'it' ? 'La domanda a cui vogliamo rispondere in questa guida non è se i bias esistono. La domanda è: quanto impattano concretamente sulle tue decisioni?' : "The question we want to answer in this guide isn't whether biases exist. The question is: how much do they concretely impact your decisions?"}
                </p>
              </div>

              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">{lang === 'it' ? 'Cosa Sono i Bias Cognitivi?' : 'What Are Cognitive Biases?'}</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'I bias cognitivi sono scorciatoie mentali che usiamo per prendere decisioni più velocemente. Non sono errori intenzionali: sono meccanismi automatici del cervello che ci aiutano a semplificare la complessità. Il problema sorge quando queste scorciatoie entrano in gioco in situazioni che richiedono valutazioni strutturate, come la selezione del personale.' : "Cognitive biases are mental shortcuts we use to make decisions faster. They're not intentional errors: they're automatic brain mechanisms that help us simplify complexity. The problem arises when these shortcuts come into play in situations requiring structured evaluations, like recruitment."}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'Nel processo di selezione, un bias può portarti a sovrastimare un candidato per una singola caratteristica positiva, a scartarlo per un dettaglio irrilevante, a cercare solo informazioni che confermano la tua prima impressione, o a preferire inconsciamente profili simili a te.' : "In the selection process, a bias can lead you to overestimate a candidate for a single positive characteristic, reject them for an irrelevant detail, seek only information confirming your first impression, or unconsciously prefer profiles similar to you."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* The 8 Biases — Minimal accordion */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 tracking-[-0.02em] leading-[1.15]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {lang === 'it' ? 'Gli 8 Bias di Selezione più Comuni' : 'The 8 Most Common Recruitment Biases'}
            </motion.h2>
            <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-12">
              {lang === 'it' ? 'Raramente si manifestano come errori evidenti. Più spesso si travestono da esperienza, intuizione o "istinto."' : 'They rarely appear as obvious errors. More often, they disguise themselves as experience, intuition, or "gut feeling."'}
            </p>

            <div className="space-y-0">
              {biases.map((b, i) => (
                <motion.details
                  key={b.num}
                  className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{b.num}</span>
                    <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{b.title}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8] mb-4">{b.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {b.mitigation.map((m, j) => (
                        <span key={j} className="inline-flex px-3 py-1.5 rounded-full text-[12px] text-[#4B4DF7]/70 border border-[#4B4DF7]/[0.1] bg-[#4B4DF7]/[0.03]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* How to Reduce */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em] leading-[1.15]">{lang === 'it' ? 'Come Ridurre i Bias nella Selezione' : 'How to Reduce Biases in Recruitment'}</h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'La cattiva notizia: essendo umani, i bias non possono essere eliminati. La buona notizia: possono essere gestiti con metodo. Se vuoi ridurne l\'impatto, devi intervenire sul processo di selezione, rendendolo più strutturato e meno dipendente dalla percezione individuale.' : "The bad news: being human, biases cannot be eliminated. The good news: they can be managed with method. If you want to reduce their impact, you need to intervene on the selection process, making it more structured and less dependent on individual perception."}
              </p>
              <div className="space-y-3 my-8">
                {(lang === 'it' ? [
                  'Definire i profili di ruolo sulla base delle competenze, non solo delle attività o della seniority',
                  'Strutturare i colloqui con domande coerenti per tutti i candidati',
                  'Valutare su criteri uniformi, separando dimensioni diverse (hard skill, soft skill, potenziale)',
                  'Separare la raccolta dei dati dal giudizio finale, evitando valutazioni precoci',
                  'Confrontare le decisioni tra più valutatori su indicatori condivisi',
                ] : [
                  'Define job profiles based on competencies, not just activities or seniority',
                  'Structure interviews with consistent questions for all candidates',
                  'Evaluate on uniform criteria, separating different dimensions (hard skills, soft skills, potential)',
                  'Separate data collection from final judgment, avoiding early evaluations',
                  'Compare decisions across multiple evaluators on shared indicators',
                ]).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#4B4DF7]/[0.06] bg-white">
                    <span className="w-6 h-6 rounded-full bg-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-[#4B4DF7]">{i + 1}</span>
                    </span>
                    <p className="text-[15px] text-[#1A1A2E]/[0.6] leading-[1.7]">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it' ? 'Skillvue supporta HR e Talent Acquisition nella valutazione oggettiva delle competenze attraverso assessment basati sulla scienza psicometrica, domande situazionali e metodologia BEI. Questo consente di confrontare i candidati su criteri misurabili, riducendo il peso delle percezioni individuali.' : 'Skillvue supports HR and Talent Acquisition in objective competency evaluation through assessments based on psychometric science, situational questions, and BEI methodology. This allows comparing candidates on measurable criteria, reducing the weight of individual perceptions.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{lang === 'it' ? 'Scopri Skillvue' : 'Discover Skillvue'}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {lang === 'it' ? <>Rendi il tuo processo di selezione più strutturato, meno esposto ai <span className="italic gradient-text">bias.</span></> : <>Make your recruitment process more structured, less exposed to <span className="italic gradient-text">bias.</span></>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it' ? 'Skillvue analizza le competenze di candidati e dipendenti in modo rapido, oggettivo e su larga scala grazie alla tecnologia AI proprietaria.' : 'Skillvue analyzes skills of candidates and employees quickly, objectively, and at scale using proprietary AI technology.'}
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-9 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500 mb-16">
                <span>{lang === 'it' ? 'Prenota un incontro' : 'Book a Meeting'}</span>
                <ArrowRight className="h-4 w-4 ml-8 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {(lang === 'it' ? ['Scienza psicometrica', 'Metodologia BEI', 'Profili oggettivi', 'Riduzione dei bias'] : ['Psychometric science', 'BEI methodology', 'Objective profiles', 'Bias reduction']).map((item) => (
                  <span key={item} className="text-[13px] text-white/25 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#4B4DF7]/50" />{item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

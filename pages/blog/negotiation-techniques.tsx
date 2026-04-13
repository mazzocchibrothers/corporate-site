// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, Users, Target, MessageCircle, Lock, Handshake, FileCheck, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const techniquesEN = [
  { num: '01', title: 'Separate People from the Problem', icon: Users, summary: 'Distinguish the relational dimension from the objective issue to resolve.', example: 'Instead of "You never invest in people," try "We have a budget constraint. HR\'s goal is reducing turnover by 15%. Let\'s analyze the economic impact of training together."' },
  { num: '02', title: 'Define Interests, Not Just Positions', icon: Target, summary: 'A position is what someone declares they want. An interest is why they want it.', example: 'An employee asks for a 10% raise (position). The interest might be recognition, market alignment, or growth prospects. Focus on interests to unlock multiple levers.' },
  { num: '03', title: 'Prepare Alternatives (BATNA)', icon: HelpCircle, summary: 'Your Best Alternative to a Negotiated Agreement. Without one, you negotiate from necessity, not choice.', example: 'A manager wants to retain a key resource moving to another function. BATNA: gradual transition, temporary shadowing, or a replacement plan before transfer.' },
  { num: '04', title: 'Use Exploratory Questions', icon: MessageCircle, summary: 'Questions shift conversations from defensive logic to analytical logic.', example: '"What\'s the minimum acceptable result for you?" "Which constraint worries you most?" "If we had to choose one priority this quarter, what would it be?"' },
  { num: '05', title: 'Make Constraints Explicit', icon: Lock, summary: 'Undeclared constraints get interpreted as unwillingness or personal rigidity.', example: '"The range for this role is defined by an internal salary equity policy. We can work on variable or benefits, but the fixed part has this limit."' },
  { num: '06', title: 'Seek Realistic Win-Win Solutions', icon: Handshake, summary: 'Not "everyone gets everything" but an agreement where neither side feels structurally defeated.', example: 'Employee wants immediate promotion. Manager sees potential but timing is early. Solution: clear milestones, progressive responsibilities, salary review tied to verifiable objectives within 6 months.' },
  { num: '07', title: 'Formalize Agreements and Responsibilities', icon: FileCheck, summary: 'Many negotiations seem successful until they need to be executed.', example: 'HR and IT agree to launch a new performance review system. Formalize: HR defines framework in 30 days, IT builds platform in 60, checkpoint between functions, go-live after pilot group test.' },
];

const techniquesIT = [
  { num: '01', title: 'Separa le persone dal problema', icon: Users, summary: 'Distingui la dimensione relazionale dalla questione oggettiva da risolvere.', example: 'Invece di "Non investi mai nelle persone", prova: "Abbiamo un vincolo di budget. L\'obiettivo HR è ridurre il turnover del 15%. Analizziamo insieme l\'impatto economico della formazione."' },
  { num: '02', title: 'Definisci gli interessi, non solo le posizioni', icon: Target, summary: 'Una posizione è ciò che qualcuno dichiara di volere. Un interesse è il perché lo vuole.', example: 'Un dipendente chiede un aumento del 10% (posizione). L\'interesse potrebbe essere il riconoscimento, l\'allineamento al mercato o le prospettive di crescita. Concentrati sugli interessi per sbloccare più leve.' },
  { num: '03', title: 'Prepara le alternative (BATNA)', icon: HelpCircle, summary: 'La tua migliore alternativa a un accordo negoziato. Senza di essa, negozi per necessità, non per scelta.', example: 'Un manager vuole trattenere una risorsa chiave che si sposta in un\'altra funzione. BATNA: transizione graduale, affiancamento temporaneo o piano di sostituzione prima del trasferimento.' },
  { num: '04', title: 'Usa domande esplorative', icon: MessageCircle, summary: 'Le domande spostano le conversazioni dalla logica difensiva a quella analitica.', example: '"Qual è il risultato minimo accettabile per te?" "Quale vincolo ti preoccupa di più?" "Se dovessimo scegliere una priorità questo trimestre, quale sarebbe?"' },
  { num: '05', title: 'Rendi espliciti i vincoli', icon: Lock, summary: 'I vincoli non dichiarati vengono interpretati come indisponibilità o rigidità personale.', example: '"Il range per questo ruolo è definito da una policy interna di equità salariale. Possiamo lavorare su variabile o benefit, ma la parte fissa ha questo limite."' },
  { num: '06', title: 'Cerca soluzioni win-win realistiche', icon: Handshake, summary: 'Non "tutti ottengono tutto" ma un accordo in cui nessuna parte si sente strutturalmente sconfitta.', example: 'Il dipendente vuole una promozione immediata. Il manager vede il potenziale ma i tempi sono prematuri. Soluzione: milestone chiari, responsabilità progressive, revisione salariale legata a obiettivi verificabili entro 6 mesi.' },
  { num: '07', title: 'Formalizza accordi e responsabilità', icon: FileCheck, summary: 'Molte negoziazioni sembrano riuscite fino a quando non devono essere eseguite.', example: 'HR e IT concordano di lanciare un nuovo sistema di valutazione delle performance. Formalizza: HR definisce il framework in 30 giorni, IT costruisce la piattaforma in 60, checkpoint tra le funzioni, go-live dopo il test sul gruppo pilota.' },
];

export default function BlogArticle3() {
  const router = useRouter();
  const { lang } = useLanguage();

  const techniques = lang === 'it' ? techniquesIT : techniquesEN;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Performance</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '4 marzo 2026' : 'March 4, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '14 min di lettura' : '14 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? 'Le 7 tecniche di negoziazione più efficaci al lavoro' : 'The 7 Most Effective Negotiation Techniques at Work'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it'
                  ? 'Per anni abbiamo pensato alla negoziazione come a qualcosa di commerciale. In realtà, negozi ogni giorno al lavoro: priorità, budget, obiettivi, condizioni.'
                  : 'For years we\'ve thought of negotiation as something commercial. In reality, you negotiate every day at work: priorities, budgets, objectives, conditions.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'Il problema è che le persone non sempre hanno gli strumenti per farlo in modo strutturato. Se lavori in HR, lo vedi chiaramente: molti conflitti organizzativi non nascono da differenze inconciliabili, ma da negoziazioni mal gestite. Posizioni irrigidite, interessi non espressi, decisioni prese per autorità invece che per allineamento.'
                  : 'The problem is that people don\'t always have the tools to do it in a structured way. If you work in HR, you see it clearly: many organizational conflicts don\'t arise from irreconcilable differences, but from poorly managed negotiations. Hardened positions, unexpressed interests, decisions made by authority instead of alignment.'}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.75] leading-[1.9] mb-6 font-medium">
                {lang === 'it'
                  ? 'La negoziazione non è una competenza "commerciale". È una competenza manageriale trasversale.'
                  : 'Negotiation is not a "commercial" skill. It\'s a cross-functional managerial competency.'}
              </p>

              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it' ? 'Perché la negoziazione è importante per le HR' : 'Why Negotiation Matters for HR'}
              </h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'La negoziazione entra costantemente nei momenti strategici delle HR: durante la selezione (definizione dell\'offerta, gestione delle aspettative), nella risoluzione dei conflitti (tensioni manager-dipendente), nella mobilità interna (ridefinizione del ruolo) e nella leadership (ogni volta che un manager assegna priorità o riallinea gli obiettivi).'
                  : 'Negotiation enters strategic HR moments constantly: during selection (offer definition, expectation management), conflict resolution (manager-employee tensions), internal mobility (role redefinition), and leadership (every time a manager assigns priorities or realigns objectives).'}
              </p>

              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it' ? 'Come si manifesta la negoziazione nel lavoro quotidiano' : 'What Negotiation Looks Like in Daily Work'}
              </h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? <>Una negoziazione efficace tiene insieme tre dimensioni: <strong className="text-[#1A1A2E]/80">obiettivi</strong> (cosa vogliamo), <strong className="text-[#1A1A2E]/80">vincoli</strong> (budget, tempo, risorse, policy) e <strong className="text-[#1A1A2E]/80">relazioni</strong> (fiducia, equilibrio interno, reputazione).</>
                  : <>Effective negotiation holds together three dimensions: <strong className="text-[#1A1A2E]/80">objectives</strong> (what we want), <strong className="text-[#1A1A2E]/80">constraints</strong> (budget, time, resources, policy), and <strong className="text-[#1A1A2E]/80">relationships</strong> (trust, internal balance, reputation).</>}
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white p-6">
                  <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{lang === 'it' ? 'Distributiva' : 'Distributive'}</h3>
                  <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">{lang === 'it' ? 'Logica di scambio: se ottengo di più, tu ottieni di meno. Tipica per negoziazioni su budget o risorse limitate.' : 'Exchange logic: if I get more, you get less. Typical for budget or limited resource negotiations.'}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white p-6">
                  <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{lang === 'it' ? 'Integrativa' : 'Integrative'}</h3>
                  <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.7]">{lang === 'it' ? 'Analizza gli interessi sottostanti, non solo le posizioni dichiarate. Ridefinisce il perimetro del problema per trovare soluzioni per entrambe le parti.' : 'Analyzes underlying interests, not just declared positions. Redefines the problem perimeter to find solutions for both sides.'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The 7 Techniques — Accordion */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.h2 className="text-[26px] font-bold text-[#1A1A2E] mb-4 tracking-[-0.02em] leading-[1.15]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {lang === 'it' ? 'Le 7 tecniche' : 'The 7 Techniques'}
            </motion.h2>
            <p className="text-[17px] text-[#1A1A2E]/[0.5] leading-[1.9] mb-10">
              {lang === 'it'
                ? 'Non sono "formule magiche". Sono leve operative per strutturare la conversazione, rendere espliciti gli interessi e costruire accordi sostenibili.'
                : 'These aren\'t "magic formulas." They\'re operational levers to structure the conversation, make interests explicit, and build sustainable agreements.'}
            </p>

            <div className="space-y-0">
              {techniques.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.details
                    key={t.num}
                    className="group border-b border-[#1A1A2E]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{t.num}</span>
                      <span className="text-[17px] font-semibold text-[#1A1A2E]/80 flex-1">{t.title}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.8] mb-4">{t.summary}</p>
                      <div className="rounded-xl bg-[#1A1A2E]/[0.03] p-5 mt-3">
                        <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.1em] uppercase mb-2 block">{lang === 'it' ? 'Esempio concreto' : 'Concrete example'}</span>
                        <p className="text-[14px] text-[#1A1A2E]/[0.55] leading-[1.75] italic">{t.example}</p>
                      </div>
                    </div>
                  </motion.details>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Evaluate */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#1A1A2E] mb-5 tracking-[-0.02em] leading-[1.15]">
                {lang === 'it' ? 'Come valutare oggettivamente le competenze di negoziazione' : 'How to Objectively Evaluate Negotiation Skills'}
              </h2>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'La negoziazione tende a essere sovrastimata. Un professionista sicuro, fluente e articolato può sembrare un buon negoziatore. Ma la vera capacità negoziale si misura dalla qualità del processo: preparazione, gestione degli interessi, uso dei dati, capacità di formalizzare accordi sostenibili.'
                  : 'Negotiation tends to be overestimated. A professional who is confident, fluent, and articulate may seem like a good negotiator. But real negotiation ability is measured by the quality of the process: preparation, interest management, use of data, ability to formalize sustainable agreements.'}
              </p>
              <p className="text-[17px] text-[#1A1A2E]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? 'In un CV potresti leggere "gestione di negoziazioni complesse". In realtà, non sai se la persona ha lavorato sugli interessi o solo sulle posizioni, se ha usato dati o leve relazionali, o se gli accordi erano sostenibili o solo momentaneamente vantaggiosi.'
                  : 'On a CV you might read "complex negotiation management." In reality, you don\'t know if the person worked on interests or just positions, used data or relational leverage, or if agreements were sustainable or just momentarily advantageous.'}
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#1A1A2E]">{lang === 'it' ? 'Punto chiave' : 'Key Takeaway'}</h3>
                </div>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.8]">
                  {lang === 'it'
                    ? 'Ciò che conta non è solo il risultato, ma la struttura del processo decisionale. Attraverso skill assessment basati su scienza psicometrica, domande situazionali e metodologia BEI, Skillvue osserva come una persona gestisce scenari di negoziazione realistici, distinguendo tra stile comunicativo e reale capacità di gestire interessi divergenti.'
                    : 'What matters is not just the outcome, but the structure of the decision-making process. Through skill assessments based on psychometric science, situational questions, and BEI methodology, Skillvue observes how a person manages realistic negotiation scenarios, distinguishing between communication style and real ability to manage divergent interests.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{lang === 'it' ? 'Scopri Skillvue' : 'Discover Skillvue'}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {lang === 'it'
                  ? <>Valuta la negoziazione come <span className="italic gradient-text">competenza organizzativa,</span> non come percezione soggettiva.</>
                  : <>Evaluate negotiation as an organizational <span className="italic gradient-text">competency,</span> not a subjective perception.</>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it'
                  ? 'Skillvue analizza le competenze di candidati e dipendenti in modo rapido, oggettivo e su scala tramite tecnologia AI proprietaria.'
                  : 'Skillvue analyzes skills of candidates and employees quickly, objectively, and at scale using proprietary AI technology.'}
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-9 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500 mb-16">
                <span>{lang === 'it' ? 'Prenota un incontro' : 'Book a Meeting'}</span>
                <ArrowRight className="h-4 w-4 ml-8 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {lang === 'it'
                  ? ['Scienza psicometrica', 'Metodologia BEI', 'Profili oggettivi', 'Skills-based hiring'].map((item) => (
                      <span key={item} className="text-[13px] text-white/25 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#4B4DF7]/50" />{item}
                      </span>
                    ))
                  : ['Psychometric science', 'BEI methodology', 'Objective profiles', 'Skills-based hiring'].map((item) => (
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

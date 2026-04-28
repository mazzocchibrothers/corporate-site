// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, BookOpen, AlertTriangle, CheckCircle, Settings, MessageSquare, Users, Layers } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const scenarios = [
  { context: 'A deliverable is late', low: '"It wasn\'t up to me." "I was missing information." "Nobody told me it was urgent."', high: '"We missed the deadline, this impacts X. The reason is Y. Going forward I propose Z and I\'m taking charge of recovery."' },
  { context: 'Two urgent requests from different stakeholders', low: 'Executes in order of arrival, or waits for someone else to decide what comes first.', high: 'Verifies real impacts and urgencies, makes the trade-off explicit, proposes a choice, aligns with the manager when needed.' },
  { context: 'New project with no clear owner', low: 'Waits for a point person to be named. Meanwhile, doesn\'t move.', high: 'Calls stakeholders, proposes an initial scope and responsibility split, kicks off rapid alignment.' },
  { context: 'A team deliverable depends on multiple people', low: '"I did my part" even if the final result doesn\'t arrive.', high: 'Follows progress of dependencies, escalates, realigns, and flags risks on the overall result in advance.' },
];

const scenariosIT = [
  { context: 'Un deliverable è in ritardo', low: '"Non dipendeva da me." "Mancavano le informazioni." "Nessuno mi ha detto che era urgente."', high: '"Abbiamo mancato la scadenza, questo impatta X. Il motivo è Y. Da ora propongo Z e mi faccio carico del recupero."' },
  { context: 'Due richieste urgenti da stakeholder diversi', low: 'Esegue in ordine di arrivo, o aspetta che qualcun altro decida cosa viene prima.', high: 'Verifica gli impatti e le urgenze reali, rende esplicito il trade-off, propone una scelta, si allinea con il manager quando serve.' },
  { context: 'Nuovo progetto senza un owner chiaro', low: 'Aspetta che venga nominato un referente. Nel frattempo, non si muove.', high: 'Chiama gli stakeholder, propone uno scope iniziale e una suddivisione delle responsabilità, avvia un allineamento rapido.' },
  { context: 'Un deliverable di team dipende da più persone', low: '"Ho fatto la mia parte" anche se il risultato finale non arriva.', high: 'Monitora l\'avanzamento delle dipendenze, scala, si riallinea e segnala in anticipo i rischi sul risultato complessivo.' },
];

const levers = [
  { num: '01', title: 'Clarity on Expectations & KPIs', icon: Settings, desc: 'People must know which results are priority, which metrics will be used, and within which boundaries they can decide autonomously.' },
  { num: '02', title: 'Continuous Feedback', icon: MessageSquare, desc: 'Accountability strengthens with timely feedback. Move from judgmental ("you weren\'t responsible enough") to behavioral ("in that situation, you waited instead of proposing a solution").' },
  { num: '03', title: 'Delegation, Not Micro-management', icon: Layers, desc: 'Real delegation transfers not just the activity, but the decision-making space. This means accepting some margin for error.' },
  { num: '04', title: 'Role-Competency Alignment', icon: Users, desc: 'Accountability is sustainable only if the person has the skills to exercise it. If the role exceeds capability, you generate freeze or defense.' },
];

const leversIT = [
  { num: '01', title: 'Chiarezza su aspettative e KPI', icon: Settings, desc: 'Le persone devono sapere quali risultati sono prioritari, quali metriche verranno usate e entro quali confini possono decidere autonomamente.' },
  { num: '02', title: 'Feedback continuo', icon: MessageSquare, desc: 'L\'accountability si rafforza con feedback tempestivi. Passa dal giudicante ("non sei stato abbastanza responsabile") al comportamentale ("in quella situazione hai atteso invece di proporre una soluzione").' },
  { num: '03', title: 'Delega, non micro-management', icon: Layers, desc: 'La vera delega trasferisce non solo l\'attività, ma lo spazio decisionale. Questo significa accettare un certo margine di errore.' },
  { num: '04', title: 'Allineamento ruolo-competenza', icon: Users, desc: 'L\'accountability è sostenibile solo se la persona ha le competenze per esercitarla. Se il ruolo supera le capacità, si genera blocco o difesa.' },
];

export default function BlogArticle4() {
  const router = useRouter();
  const { lang } = useLanguage();

  const activeScenarios = lang === 'it' ? scenariosIT : scenarios;
  const activeLevers = lang === 'it' ? leversIT : levers;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1545005785-a4a5554b8efe?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <button onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">Culture</span>
                <span className="text-[13px] text-white/35">{lang === 'it' ? '27 febbraio 2026' : 'February 27, 2026'}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {lang === 'it' ? '11 min di lettura' : '11 min read'}</span>
              </div>
              <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {lang === 'it' ? "Che cos'è l'accountability e perché migliora le performance lavorative" : 'What Is Accountability and Why It Improves Work Performance'}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {lang === 'it'
                  ? "Quando un progetto si blocca, una scadenza slitta o un errore rimbalza tra funzioni senza che nessuno se ne faccia carico, la parola mancante è spesso una sola: accountability."
                  : "When a project stalls, a deadline slips, or an error bounces between functions with nobody taking ownership, the missing word is often just one: accountability."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Definition */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-5 tracking-[-0.02em]">
                {lang === 'it' ? "Che cos'è davvero l'accountability?" : 'What Is Accountability, Really?'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? <>La traduzione più comune è "responsabilità". In azienda, però, questa equivalenza è fuorviante. <strong className="text-[#121212]/80">La responsabilità può essere assegnata. L'accountability no.</strong></>
                  : <>The most common translation is "responsibility." In a company, though, this equivalence is misleading. <strong className="text-[#121212]/80">Responsibility can be assigned. Accountability cannot.</strong></>}
              </p>

              <div className="grid md:grid-cols-3 gap-3 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#121212] mb-2">{lang === 'it' ? 'Delega' : 'Delegation'}</h3>
                  <p className="text-[13px] text-[#121212]/[0.45] leading-[1.6]">{lang === 'it' ? 'Trasferimento di un compito a un\'altra persona' : 'Transfer of a task to another person'}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#121212] mb-2">Ownership</h3>
                  <p className="text-[13px] text-[#121212]/[0.45] leading-[1.6]">{lang === 'it' ? 'Senso di appartenenza verso un progetto o risultato' : 'Sense of ownership over a project or result'}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.03] p-5 text-center">
                  <h3 className="text-[14px] font-bold text-[#4B4DF7]">Accountability</h3>
                  <p className="text-[13px] text-[#121212]/[0.55] leading-[1.6]">{lang === 'it' ? 'Piena titolarità di decisioni e conseguenze, anche nell\'ambiguità' : 'Full ownership of decisions and consequences, even in ambiguity'}</p>
                </div>
              </div>

              <h2 className="text-[26px] font-bold text-[#121212] mb-5 mt-14 tracking-[-0.02em]">
                {lang === 'it' ? 'Il legame con la performance' : 'The Link to Performance'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {lang === 'it'
                  ? <>Quando l'accountability manca: spostamento di responsabilità, decisioni rinviate, conflitti impliciti. La performance cala non solo per inefficienza operativa, ma perché <strong className="text-[#121212]/80">l'ambiguità aumenta</strong>.</>
                  : <>When accountability is missing: responsibility shifting, deferred decisions, implicit conflicts. Performance drops not just from operational inefficiency, but because <strong className="text-[#121212]/80">ambiguity increases</strong>.</>}
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                  {lang === 'it'
                    ? '"L\'accountability riduce il costo organizzativo dell\'ambiguità."'
                    : '"Accountability reduces the organizational cost of ambiguity."'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Low vs High — Clean editorial format */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-4 tracking-[-0.02em]">
                {lang === 'it' ? "Riconoscere l'accountability nel lavoro quotidiano" : 'Recognizing Accountability in Daily Work'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
                {lang === 'it'
                  ? 'Quattro scenari. Due comportamenti. Quale vedi nella tua organizzazione?'
                  : 'Four scenarios. Two behaviors. Which one do you see in your organization?'}
              </p>

              <div className="space-y-0">
                {activeScenarios.map((s, i) => (
                  <motion.details
                    key={i}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                      <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{s.context}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6 space-y-3">
                      <div className="rounded-xl border border-[#121212]/[0.04] bg-[#121212]/[0.02] p-4">
                        <span className="text-[11px] font-bold text-[#121212]/30 tracking-[0.08em] uppercase mb-1.5 block">
                          {lang === 'it' ? 'Bassa accountability' : 'Low accountability'}
                        </span>
                        <p className="text-[14px] text-[#121212]/[0.45] leading-[1.7] italic">{s.low}</p>
                      </div>
                      <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-4">
                        <span className="text-[11px] font-bold text-[#4B4DF7]/50 tracking-[0.08em] uppercase mb-1.5 block">
                          {lang === 'it' ? 'Alta accountability' : 'High accountability'}
                        </span>
                        <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7] italic">{s.high}</p>
                      </div>
                    </div>
                  </motion.details>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to Develop */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[26px] font-bold text-[#121212] mb-5 tracking-[-0.02em]">
                {lang === 'it' ? "Come sviluppare l'accountability" : 'How to Develop Accountability'}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-8">
                {lang === 'it'
                  ? "L'accountability non si impone tramite comunicazioni interne o codici etici. Si costruisce attraverso scelte organizzative coerenti. Quattro leve operative:"
                  : "Accountability isn't imposed through internal communications or ethics codes. It's built through coherent organizational choices. Four operational levers:"}
              </p>
              <div className="space-y-3">
                {activeLevers.map((l) => {
                  const Icon = l.icon;
                  return (
                    <div key={l.num} className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#4B4DF7]/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-[#4B4DF7]/60" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-[#121212] mb-1.5">{l.title}</h3>
                        <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{l.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-12">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-bold text-[#121212]">Key Takeaway</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {lang === 'it'
                    ? "Attraverso assessment sulle competenze basati su scienza psicometrica, domande situazionali e metodologia BEI, Skillvue osserva come una persona ragiona e decide in scenari organizzativi realistici, distinguendo tra responsabilità dichiarata e accountability reale."
                    : "Through skill assessments based on psychometric science, situational questions, and BEI methodology, Skillvue observes how a person reasons and decides in realistic organizational scenarios, distinguishing between declared responsibility and real accountability."}
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
                  ? <>Riduci il rischio di promuovere sulla base di <span className="gradient-text">impressioni.</span></>
                  : <>Reduce the risk of promoting based on <span className="gradient-text">impressions.</span></>}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {lang === 'it'
                  ? "Integra la valutazione delle competenze nel tuo processo di valutazione per decisioni più solide e sostenibili."
                  : "Integrate skill assessment into your evaluation process for more solid and sustainable decisions."}
              </p>
              <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-9 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500">
                <span>{lang === 'it' ? 'Prenota una demo' : 'Book a Demo'}</span>
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

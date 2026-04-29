// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, FileText, Download, BookOpen, Users, Brain, Zap, TrendingUp } from 'lucide-react';
import { whitepapers } from '@/data/whitepapers';
import { useLanguage } from '@/i18n/LanguageContext';

export default function WhitepaperDetailPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const slug = router.query.slug as string;
  const formRef = useRef(null);

  const wp = whitepapers.find(w => w.slug === slug);
  const c = wp ? (lang === 'it' ? wp.it : wp.en) : null;
  const formId = wp ? (lang === 'it' ? wp.hubspotFormIT : wp.hubspotFormEN) : null;
  const related = wp ? wp.relatedSlugs
    .map(s => whitepapers.find(w => w.slug === s))
    .filter(Boolean)
    .slice(0, 3) : [];

  useEffect(() => {
    if (!formId) return;
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({ portalId: '48438018', formId, region: 'na1', target: '#wp-hubspot-form' });
      }
    };
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, [formId]);

  if (!wp) {
    return (<><Navbar /><div className="min-h-screen flex items-center justify-center"><p className="text-white/50 text-[18px]">{t('White Paper not found.')}</p></div></>);
  }

  // Chapter data — English
  const chaptersEN = slug === 'beyond-skills' ? [
    { num: '01', title: 'The Myth of "Eternal" Skills', desc: 'Why technical skills expire in 12 to 18 months and what it means for hiring.', icon: Zap },
    { num: '02', title: 'The "M" Factor', desc: 'How intrinsic motivation, driven by Autonomy, Mastery, and Purpose, redefines long-term performance.', icon: Brain },
    { num: '03', title: 'Expert Interview', desc: 'Clinical Psychologist Letizia Spione on how to concretely identify and measure motivation.', icon: Users },
    { num: '04', title: 'Can You Analyze Motivation?', desc: 'Moving from intuition to evidence: reliable tools and methods for measuring what CVs cannot show.', icon: TrendingUp },
    { num: '05', title: 'Case Study', desc: 'How a major Italian insurance company used Skillvue to map employee motivation at scale.', icon: BookOpen },
  ] : slug === 'future-leaders' ? [
    { num: '01', title: 'Why Is the Job Market Changing?', desc: 'The forces behind skills obsolescence: 5 years for a skill to lose half its value, 12 to 18 months for technical skills.', icon: Zap },
    { num: '02', title: "AI's Role in Redefining Work", desc: 'How AI is creating a hybridisation of humans and machines, and what it means for the skills that matter.', icon: Brain },
    { num: '03', title: 'The Demographic Challenge', desc: "Interview with Martina Mauri (Politecnico di Milano) on Italy's 3.7 million worker gap by 2040 and how to react.", icon: Users },
    { num: '04', title: 'Beyond Skills: Leveraging Potential', desc: 'Why assessing Skill Proximity, Aspirational Outlook, and Learning Agility is the new competitive advantage.', icon: TrendingUp },
    { num: '05', title: 'Your HR To-Do List', desc: 'Best practices to map skills dynamically, uncover hidden potential, connect data with performance, and build lifelong learning.', icon: BookOpen },
  ] : [
    { num: '01', title: 'The Economic Impact of Turnover', desc: 'One departure in retail equals 9.4 lost days of sales. 63% of productivity loss happens before the employee even leaves.', icon: Zap },
    { num: '02', title: 'Why Turnover Is So High', desc: 'Job dissatisfaction, harsh conditions, low motivation: the three key factors driving sales network churn.', icon: Brain },
    { num: '03', title: 'Fighting Turnover with Data', desc: 'How Skillvue assessments transform recruitment, internal mobility, and talent development to predict and prevent turnover.', icon: Users },
    { num: '04', title: 'The Sales Growth Bonus', desc: '+1% turnover = -0.5% average net sales. The direct, traceable link between retention and commercial performance.', icon: TrendingUp },
  ];

  // Chapter data — Italian
  const chaptersIT = slug === 'beyond-skills' ? [
    { num: '01', title: 'Il Mito delle Competenze "Eterne"', desc: 'Perché le competenze tecniche scadono in 12-18 mesi e cosa significa per la selezione.', icon: Zap },
    { num: '02', title: 'Il Fattore "M"', desc: 'Come la motivazione intrinseca — guidata da Autonomia, Padronanza e Scopo — ridefinisce le performance a lungo termine.', icon: Brain },
    { num: '03', title: 'Intervista all\'Esperta', desc: 'La Psicologa Clinica Letizia Spione spiega come identificare e misurare concretamente la motivazione.', icon: Users },
    { num: '04', title: 'Si Può Analizzare la Motivazione?', desc: 'Dall\'intuizione all\'evidenza: strumenti e metodi affidabili per misurare ciò che i CV non mostrano.', icon: TrendingUp },
    { num: '05', title: 'Case Study', desc: 'Come una grande compagnia assicurativa italiana ha usato Skillvue per mappare la motivazione dei dipendenti su larga scala.', icon: BookOpen },
  ] : slug === 'future-leaders' ? [
    { num: '01', title: 'Perché il Mercato del Lavoro Sta Cambiando?', desc: 'Le forze dietro l\'obsolescenza delle competenze: 5 anni per perdere metà del valore, 12-18 mesi per le competenze tecniche.', icon: Zap },
    { num: '02', title: 'Il Ruolo dell\'AI nel Ridefinire il Lavoro', desc: 'Come l\'AI sta creando un\'ibridazione tra uomini e macchine, e cosa significa per le competenze che contano.', icon: Brain },
    { num: '03', title: 'La Sfida Demografica', desc: 'Intervista con Martina Mauri (Politecnico di Milano) sul gap di 3,7 milioni di lavoratori in Italia entro il 2040 e come reagire.', icon: Users },
    { num: '04', title: 'Oltre le Competenze: Valorizzare il Potenziale', desc: 'Perché valutare la Prossimità alle Competenze, la Proiezione Aspirazionale e l\'Agilità di Apprendimento è il nuovo vantaggio competitivo.', icon: TrendingUp },
    { num: '05', title: 'La To-Do List HR', desc: 'Best practice per mappare le competenze dinamicamente, scoprire il potenziale nascosto, collegare i dati alle performance e costruire l\'apprendimento continuo.', icon: BookOpen },
  ] : [
    { num: '01', title: 'L\'Impatto Economico del Turnover', desc: 'Un\'uscita nel retail equivale a 9,4 giorni di vendite perse. Il 63% della perdita di produttività avviene prima che il dipendente se ne vada.', icon: Zap },
    { num: '02', title: 'Perché il Turnover È Così Alto', desc: 'Insoddisfazione lavorativa, condizioni difficili, bassa motivazione: i tre fattori chiave che alimentano il turnover nelle reti commerciali.', icon: Brain },
    { num: '03', title: 'Combattere il Turnover con i Dati', desc: 'Come gli assessment Skillvue trasformano il recruiting, la mobilità interna e lo sviluppo del talento per prevedere e prevenire il turnover.', icon: Users },
    { num: '04', title: 'Il Bonus sulla Crescita delle Vendite', desc: '+1% di turnover = -0,5% di fatturato netto medio. Il legame diretto e tracciabile tra retention e performance commerciale.', icon: TrendingUp },
  ];

  const chapters = lang === 'it' ? chaptersIT : chaptersEN;

  // Stats — English
  const statsEN = slug === 'beyond-skills' ? [
    { value: '12-18', unit: 'months', label: 'Average lifespan of a technical skill before it becomes obsolete' },
    { value: '39%', unit: '', label: 'of current skills will be obsolete by 2030 according to the World Economic Forum' },
    { value: '1B+', unit: '', label: 'people worldwide will need to reskill in the next five years' },
  ] : slug === 'future-leaders' ? [
    { value: '3.7M', unit: '', label: 'worker gap projected in Italy by 2040 due to demographic decline' },
    { value: '39%', unit: '', label: 'of current skills will be obsolete by 2030, reshaping what leadership requires' },
    { value: '78%', unit: '', label: 'of companies struggling to recruit, while expecting workforce growth' },
  ] : [
    { value: '34%', unit: '', label: 'overall turnover rate in Italy, rising to 47% in service companies' },
    { value: '9.4', unit: 'days', label: 'of sales lost for every single employee departure in retail' },
    { value: '63%', unit: '', label: 'of productivity losses happen before the employee actually leaves' },
  ];

  // Stats — Italian
  const statsIT = slug === 'beyond-skills' ? [
    { value: '12-18', unit: 'mesi', label: 'Durata media di una competenza tecnica prima di diventare obsoleta' },
    { value: '39%', unit: '', label: 'delle competenze attuali sarà obsoleta entro il 2030 secondo il World Economic Forum' },
    { value: '1B+', unit: '', label: 'persone nel mondo dovranno riqualificarsi nei prossimi cinque anni' },
  ] : slug === 'future-leaders' ? [
    { value: '3,7M', unit: '', label: 'gap di lavoratori previsto in Italia entro il 2040 a causa del calo demografico' },
    { value: '39%', unit: '', label: 'delle competenze attuali diventeranno obsolete entro il 2030, ridefinendo i requisiti della leadership' },
    { value: '78%', unit: '', label: 'delle aziende fatica a reclutare, pur aspettandosi una crescita dell\'organico' },
  ] : [
    { value: '34%', unit: '', label: 'tasso di turnover complessivo in Italia, che sale al 47% nelle aziende di servizi' },
    { value: '9,4', unit: 'giorni', label: 'di vendite perse per ogni singola uscita nel retail' },
    { value: '63%', unit: '', label: 'delle perdite di produttività avvengono prima che il dipendente se ne vada effettivamente' },
  ];

  const stats = lang === 'it' ? statsIT : statsEN;

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-[80px] min-h-screen flex items-end">
          {wp.coverBg && (
            <>
              <img src={wp.coverBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </>
          )}
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full pb-20 lg:pb-28 pt-32">
            <button onClick={() => { router.push('/resources/whitepapers'); window.scrollTo(0, 0); }} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-12">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {t('Back to White Papers')}
            </button>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {wp.topic.map(tag => (
                      <span key={tag} className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{tag}</span>
                    ))}
                    <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-white/40 border border-white/[0.08] tracking-wide">White Paper</span>
                  </div>
                  <h1 className="font-bold text-white/95 mb-6" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                    {c.title}
                  </h1>
                  <p className="text-[20px] text-white/[0.5] leading-[1.75] max-w-2xl" style={{ fontWeight: 300 }}>
                    {c.heroDesc}
                  </p>
                </motion.div>
              </div>
              <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                <a href="#download-form" onClick={(e) => { e.preventDefault(); document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group flex items-center gap-4 px-7 py-5 rounded-2xl border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] hover:bg-[#4B4DF7]/[0.15] transition-all duration-500">
                  <Download className="h-6 w-6 text-[#4B4DF7] shrink-0" />
                  <div>
                    <span className="text-[15px] font-semibold text-white/90 block">{t('Download Free')}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-[#4B4DF7] group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Key Stats */}
        <section className="relative py-20 lg:py-24 border-t border-white/[0.04]">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                  <span className="block text-[#4B4DF7] font-bold mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {s.value}<span className="text-[0.6em] text-white/30 ml-1">{s.unit}</span>
                  </span>
                  <p className="text-[14px] text-white/35 leading-[1.6] max-w-[280px] mx-auto">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. What's Inside */}
        <section className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-[#121212] mb-4 tracking-[-0.02em]">
                {lang === 'it' ? <>Cosa <span className="gradient-text-on-light">Contiene</span></> : <>What's <span className="gradient-text-on-light">Inside</span></>}
              </h2>
              <p className="text-[16px] text-[#121212]/[0.45] max-w-xl">{c.fullDesc}</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {chapters.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div key={ch.num} className="group rounded-2xl border border-[#4B4DF7]/[0.06] hover:border-[#4B4DF7]/[0.15] bg-white p-8 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.1] flex items-center justify-center group-hover:bg-[#4B4DF7]/[0.12] transition-all duration-500">
                        <Icon className="h-5 w-5 text-[#4B4DF7]/60" />
                      </div>
                      <span className="text-[12px] font-bold text-[#4B4DF7]/40 tracking-[0.15em]">{ch.num}</span>
                    </div>
                    <h3 className="text-[17px] font-bold text-[#121212] mb-3 leading-tight">{ch.title}</h3>
                    <p className="text-[14px] text-[#121212]/[0.5] leading-[1.7]">{ch.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Download Form */}
        <section id="download-form" className="relative py-16 lg:py-20">
          <div className="max-w-[700px] mx-auto px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-[#4B4DF7]/[0.12] border border-[#4B4DF7]/[0.15] flex items-center justify-center mx-auto mb-6">
                <FileText className="h-7 w-7 text-[#4B4DF7]" />
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white/90 mb-3">{t('Get the Full White Paper')}</h2>
              <p className="text-[15px] text-white/40">{t("Fill the form below and we'll send it straight to your inbox.")}</p>
            </motion.div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 lg:p-10">
              <div id="wp-hubspot-form" ref={formRef} style={{ minHeight: '300px' }} />
            </div>
          </div>
        </section>

        {/* 6. Related */}
        {related.length > 0 && (
          <section className="relative pt-8 pb-2 lg:pt-10 lg:pb-2">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white/90 mb-10">{t('More White Papers')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rw, i) => {
                  const rc = lang === 'it' ? rw.it : rw.en;
                  return (
                    <motion.div key={rw.slug} className="group flex gap-6 items-center p-5 rounded-2xl border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-500 cursor-pointer"
                      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      onClick={() => { router.push(`/resources/whitepapers/${rw.slug}`); window.scrollTo(0, 0); }}>
                      {rw.coverBg && (
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                          <img src={rw.coverBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-[16px] font-bold text-white/80 group-hover:text-white transition-colors duration-300 mb-1">{rc.title}</h3>
                        <p className="text-[13px] text-white/35 line-clamp-1">{rc.shortDesc}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-[#4B4DF7] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 7. Bottom CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]">
                {t('Want to see the science in action?')}
              </h2>
              <p className="text-[16px] text-white/[0.4] mb-10 max-w-xl mx-auto leading-[1.7]">
                {t('Book a demo with our team and discover how Skillvue turns talent decisions into a competitive advantage.')}
              </p>
              <button onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500">
                <span>{t('Book a Demo')}</span>
                <ArrowRight className="h-4 w-4 ml-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

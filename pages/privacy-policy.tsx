// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Database, Mail, Tag, BarChart3, Eye, Megaphone, Server, Activity, Globe, User } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const dataGroups = [
  [
    {
      icon: MessageSquare,
      title: "Contattare l'Utente",
      services: [
        { name: 'Mailing list o newsletter', data: 'Dati Personali: cognome; email; nome; ragione sociale' },
        { name: 'Modulo di contatto', data: 'Dati Personali: cognome; email; nome; numero di telefono; ragione sociale' },
      ],
    },
    {
      icon: Mail,
      title: 'Gestione contatti e invio di messaggi',
      services: [
        { name: 'HubSpot Email', data: 'Dati Personali: Dati di utilizzo; email; Strumenti di Tracciamento' },
      ],
    },
  ],
  [
    {
      icon: Database,
      title: 'Gestione dei database di Utenti',
      services: [
        { name: 'Intercom', data: "Dati Personali: Dati comunicati durante l'utilizzo del servizio; Dati di utilizzo; email; Identificativo univoco universale (UUID); Strumenti di Tracciamento; varie tipologie di Dati secondo quanto specificato dalla privacy policy del servizio" },
        { name: 'HubSpot CRM', data: 'Dati Personali: cognome; Dati di utilizzo; email; nome; Strumenti di Tracciamento' },
      ],
    },
    {
      icon: Tag,
      title: 'Gestione dei tag',
      services: [
        { name: 'Google Tag Manager', data: 'Dati Personali: Strumenti di Tracciamento' },
      ],
    },
  ],
  [
    {
      icon: Activity,
      title: 'Heat mapping e registrazione sessioni',
      services: [
        { name: 'Microsoft Clarity', data: 'Dati Personali: interazioni allo scorrimento di pagina' },
      ],
    },
    {
      icon: Globe,
      title: 'Ottimizzazione e distribuzione del traffico',
      services: [
        { name: 'Cloudflare', data: 'Dati Personali: Strumenti di Tracciamento' },
      ],
    },
  ],
  [
    {
      icon: Megaphone,
      title: 'Pubblicità',
      services: [
        { name: 'Monitoraggio conversioni di Meta ads (pixel di Meta) e LinkedIn Ads', data: 'Dati Personali: Dati di utilizzo; Strumenti di Tracciamento' },
        { name: 'Monitoraggio conversioni di LinkedIn (LinkedIn Insight Tag)', data: 'Dati Personali: Dati di utilizzo; informazioni sul dispositivo; Strumenti di Tracciamento' },
      ],
    },
    {
      icon: Server,
      title: 'Servizi di piattaforma e hosting',
      services: [
        { name: 'Webflow', data: 'Dati Personali: Dati di utilizzo' },
      ],
    },
  ],
  [
    {
      icon: BarChart3,
      title: 'Statistica',
      services: [
        { name: 'Meta Events Manager', data: 'Dati Personali: Dati di utilizzo; Strumenti di Tracciamento' },
        { name: 'Google Analytics 4', data: 'Dati Personali: statistiche delle sessioni; Strumenti di Tracciamento' },
      ],
    },
    {
      icon: Eye,
      title: 'Visualizzazione di contenuti da piattaforme esterne',
      services: [
        { name: 'Google Fonts e Font Awesome', data: 'Dati Personali: Dati di utilizzo; Strumenti di Tracciamento' },
      ],
    },
  ],
];

function ServiceBlock({ item }) {
  const Icon = item.icon;
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0">
          <Icon className="h-4.5 w-4.5 text-[#4B4DF7]/50" />
        </div>
        <h3 className="text-[16px] font-bold text-[#121212]">{item.title}</h3>
      </div>
      <div className="space-y-6 ml-[52px]">
        {item.services.map((svc, i) => (
          <div key={i}>
            <p className="text-[15px] font-semibold text-[#121212]/75 mb-1.5">{svc.name}</p>
            <p className="text-[14px] text-[#121212]/[0.4] leading-[1.75]">{svc.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] min-h-[50vh] flex items-end">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-24">
            <button onClick={() => router.back()} className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10">
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              {t('Back')}
            </button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white/95 mb-4 tracking-[-0.03em] leading-[1.1]">
                Privacy Policy di Skillvue
              </h1>
              <p className="text-[18px] text-white/[0.45] leading-[1.75] max-w-2xl" style={{ fontWeight: 300 }}>
                Questo Sito Web raccoglie alcuni Dati Personali dei propri Utenti.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-breathe">
          <div className="max-w-[1000px] mx-auto px-8 lg:px-12 py-20 lg:py-28">

            <motion.h2
              className="text-[clamp(1.3rem,2.5vw,1.6rem)] font-bold text-[#121212] mb-16 leading-[1.4]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Dati Personali trattati per le seguenti finalità e utilizzando i seguenti servizi:
            </motion.h2>

            {/* Service groups */}
            <div className="space-y-0">
              {dataGroups.map((row, ri) => (
                <motion.div
                  key={ri}
                  className="grid md:grid-cols-2 gap-x-16 gap-y-10 py-12 border-b border-[#121212]/[0.06] last:border-b-0"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: ri * 0.05 }}
                >
                  {row.map((item, ii) => (
                    <ServiceBlock key={ii} item={item} />
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Ads opt-out */}
            <div className="border-t border-[#121212]/[0.08] mt-16 pt-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-[clamp(1.3rem,2.5vw,1.6rem)] font-bold text-[#121212] mb-6 leading-[1.3]">
                  Informazioni su come disattivare gli annunci pubblicitari basati sugli interessi
                </h2>
                <p className="text-[15px] text-[#121212]/[0.5] leading-[1.85] max-w-3xl">
                  Oltre a qualsiasi funzione di opt-out fornita da uno qualsiasi dei servizi elencati in questo documento, gli Utenti possono leggere di più su come disattivare gli annunci pubblicitari basati sugli interessi nell'apposita sezione della Cookie Policy.
                </p>
              </motion.div>
            </div>

            {/* Contact info */}
            <div className="border-t border-[#121212]/[0.08] mt-16 pt-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-[clamp(1.3rem,2.5vw,1.6rem)] font-bold text-[#121212] mb-8 leading-[1.3]">
                  Informazioni di contatto
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-[#4B4DF7]/50" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#121212]/75 mb-2">Titolare del Trattamento dei Dati</p>
                    <p className="text-[14px] text-[#121212]/[0.5] leading-[1.75]">Algojob S.r.l. via Molino delle Armi 11, Milano (MI) 20123</p>
                    <p className="text-[14px] text-[#121212]/[0.5] leading-[1.75] mt-4">
                      <span className="font-semibold text-[#121212]/65">Indirizzo email del Titolare:</span>{' '}
                      <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7]/70 hover:text-[#4B4DF7] transition-colors duration-300">privacy@skillvue.ai</a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Last modified */}
            <div className="border-t border-[#121212]/[0.06] mt-16 pt-10">
              <p className="text-[13px] text-[#121212]/[0.3] leading-[1.7]">
                Ultima modifica: 13 febbraio 2025
              </p>
              <p className="text-[13px] text-[#121212]/[0.3] leading-[1.7] mt-2">
                Questo documento è stato creato con il Generatore di Privacy e Cookie Policy di iubenda.
              </p>
            </div>
          </div>
        </section>

      <Footer />
      </main>
    </>
  );
}

// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

function PolicySection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <h2 className="text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold text-[#121212] mb-5 pb-4 border-b border-[#121212]/[0.07] leading-[1.4]">
        <span className="text-[#4B4DF7] mr-2">{num}.</span>{title}
      </h2>
      <div className="text-[15px] text-[#121212]/70 leading-[1.85] space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mt-2">
        {children}
      </div>
    </div>
  );
}

function SubSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 pl-0">
      <h3 className="text-[16px] font-semibold text-[#121212]/85 mb-3 leading-[1.5]">
        {num} {title}
      </h3>
      <div className="text-[15px] text-[#121212]/70 leading-[1.8] space-y-3">
        {children}
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
        <section className="relative pt-[80px] min-h-[45vh] flex items-end">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-24">
            <Button
              onClick={() => router.back()}
              variant="tertiary"
              mode="dark"
              icon={<ArrowLeft aria-hidden />}
              iconPosition="left"
              className="mb-10"
            >
              {t('Back')}
            </Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-[40px] md:text-[56px] font-semibold text-white/95 mb-4 tracking-[-0.02em] leading-[1.1]">
                Informativa sul trattamento dei dati personali
              </h1>
              <p className="text-[16px] text-white/[0.45] leading-[1.75] max-w-2xl" style={{ fontWeight: 300 }}>
                Sito Web — resa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR)
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-breathe">
          <div className="max-w-[860px] mx-auto px-8 lg:px-12 py-20 lg:py-28">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 space-y-5"
            >
              <p className="text-[16px] text-[#121212]/70 leading-[1.85]">
                Il Titolare del trattamento informa ai sensi del regolamento UE 2016/679 ("GDPR") e della vigente normativa in materia di protezione dei Dati Personali che i Suoi Dati (in seguito, "Dati"), nell'ambito del Sito Web{' '}
                <a href="https://www.skillvue.ai/it" target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">https://www.skillvue.ai/it</a>
                {' '}e degli eventuali sottodomini (in seguito "Sito") nonché nell'ambito dell'utilizzo dei servizi offerti dal Titolare, saranno trattati con le modalità e per le finalità seguenti.
              </p>
              <p className="text-[16px] text-[#121212]/70 leading-[1.85]">
                Ove non diversamente indicato, quanto contenuto nella presente informativa dovrà intendersi applicabile solo ai Dati Personali trattati nell'ambito dell'utilizzo del Sito Web e dei suoi sottodomini. Resta inteso che per i trattamenti di Dati Personali effettuati per finalità diverse da quelle di seguito indicate troveranno applicazione le informative sul trattamento relative ai servizi di volta in volta considerati.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

              <PolicySection num="1" title="Titolare del trattamento">
                <p>
                  Titolare del trattamento è Algojob S.r.l., P.IVA 11656370969, operante con il brand Skillvue, con sede legale in Via Molino delle Armi n. 11 — 20123 Milano (MI) (di seguito anche "Skillvue" o "la Società"), in persona del legale rappresentante pro tempore.
                </p>
                <p className="font-semibold text-[#121212]/80">Contatti del Titolare:</p>
                <ul>
                  <li>PEC: think-up@legalmail.it</li>
                  <li>
                    E-mail per questioni privacy:{' '}
                    <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">privacy@skillvue.ai</a>
                  </li>
                </ul>
              </PolicySection>

              <PolicySection num="2" title="Responsabile della Protezione dei Dati (RPD/DPO)">
                <p>
                  Il Titolare ha designato un Responsabile della Protezione dei Dati (RPD/DPO), contattabile per tutte le questioni relative al trattamento dei dati personali e all'esercizio dei diritti ai sensi del GDPR al seguente indirizzo e-mail:{' '}
                  <a href="mailto:dpo@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">dpo@skillvue.ai</a>
                </p>
              </PolicySection>

              <PolicySection num="3" title="Categorie di interessati e di dati trattati">
                <p>La presente informativa si rivolge agli Utenti del sito web.</p>
                <p>Skillvue tratta le seguenti categorie di dati personali:</p>
                <ul>
                  <li>dati identificativi (nome, cognome);</li>
                  <li>dati di contatto professionali (indirizzo e-mail, numero di telefono);</li>
                  <li>dati di navigazione (indirizzo IP).</li>
                </ul>
              </PolicySection>

              <PolicySection num="4" title="Finalità e basi giuridiche del trattamento">
                <p>I dati personali sono trattati per le seguenti finalità, ciascuna fondata su una propria base giuridica:</p>

                <SubSection num="4.1" title="Gestione delle richieste di informazioni pervenute tramite form per la Demo">
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Finalità:</strong> raccogliere e gestire le richieste di informazioni, contatto o prenotazione di demo inviate dall'Utente tramite i moduli presenti sul Sito, al fine di fornire riscontro alla richiesta, illustrare i servizi offerti da Skillvue e, ove applicabile, avviare le trattative precontrattuali.
                  </p>
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Base giuridica:</strong> esecuzione di un contratto di cui l'interessato è parte o esecuzione di misure precontrattuali adottate su richiesta dell'interessato stesso (art. 6, par. 1, lett. b, GDPR).
                  </p>
                </SubSection>

                <SubSection num="4.2" title="Gestione del Sito e delle sue funzioni operative, per controllarne il corretto funzionamento, per migliorare la qualità dei servizi offerti ed ottimizzare la funzionalità del Sito">
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Finalità:</strong> garantire il corretto funzionamento tecnico del Sito, prevenire e rilevare eventuali malfunzionamenti, errori o attacchi informatici, analizzare le modalità di utilizzo del Sito da parte degli Utenti al fine di migliorare l'esperienza di navigazione, ottimizzare le prestazioni e la fruibilità dei contenuti e dei servizi offerti. A tale scopo vengono trattati, in particolare, i dati di navigazione automaticamente generati dai sistemi informatici e dai protocolli di comunicazione utilizzati per l'accesso al Sito (quali l'indirizzo IP, il tipo di browser, il sistema operativo, le pagine visitate e i relativi orari di accesso).
                  </p>
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Base giuridica:</strong> il legittimo interesse del Titolare (art. 6, par. 1, lett. f, GDPR).
                  </p>
                </SubSection>

                <SubSection num="4.3" title="Accertamento, esercizio o difesa dei diritti del Titolare in sede stragiudiziale e/o giudiziale">
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Finalità:</strong> conservare e trattare i dati personali del cliente raccolti nell'ambito del rapporto intercorso nella misura in cui ciò risulti necessario per accertare, esercitare o difendere un diritto del Titolare in sede stragiudiziale e/o giudiziale.
                  </p>
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Base giuridica:</strong> legittimo interesse del Titolare (art. 6, par. 1, lett. f, GDPR), consistente nella tutela dei propri diritti e interessi legittimi in sede stragiudiziale e giudiziale. Tale base giuridica è riconosciuta espressamente dal considerando 49 GDPR e dalle Linee guida EDPB, che individuano la difesa in giudizio come interesse legittimo prevalente, proporzionato e non suscettibile di essere bilanciato in senso sfavorevole al Titolare in presenza di una controversia effettiva o ragionevolmente prevedibile. Il trattamento per questa finalità è limitato ai dati strettamente pertinenti alla controversia e cessa non appena la stessa si conclude o il rischio di contenzioso viene meno.
                  </p>
                </SubSection>

                <SubSection num="4.4" title="Marketing diretto: invio di comunicazioni commerciali">
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Finalità:</strong> invio di newsletter, aggiornamenti di prodotto, comunicazioni commerciali, inviti a eventi e webinar, comunicazione di offerte o novità relative ai servizi di Skillvue.
                  </p>
                  <p>
                    <strong className="text-[#121212]/85 font-semibold">Base giuridica:</strong> consenso libero, specifico, informato e inequivocabile dell'interessato (art. 6, par. 1, lett. a, GDPR; art. 130 D.Lgs. 196/2003). Il consenso è revocabile in qualsiasi momento, con effetto per il futuro, tramite le modalità indicate al successivo paragrafo 11 e/o cliccando sul link di disiscrizione presente in ogni comunicazione.
                  </p>
                </SubSection>
              </PolicySection>

              <PolicySection num="5" title="Modalità del trattamento">
                <p>
                  Il trattamento dei Suoi Dati è effettuato, sia in modalità cartacea che informatizzata in modo da minimizzare il rischio di distruzione, perdita (compresa la perdita accidentale), accesso/utilizzo non autorizzati o utilizzo incompatibile con la finalità iniziale della raccolta. Ciò viene conseguito con le misure di sicurezza tecniche e organizzative attuate dal Titolare.
                </p>
              </PolicySection>

              <PolicySection num="6" title="Processi decisionali automatizzati">
                <p>
                  Nell'ambito dei rapporti con i clienti, Skillvue non adotta processi decisionali unicamente automatizzati ai sensi dell'art. 22 GDPR che producano effetti giuridici o incidano in modo analogamente significativo sugli interessati.
                </p>
              </PolicySection>

              <PolicySection num="7" title="Natura del conferimento e conseguenze del rifiuto">
                <p>
                  Il conferimento dei dati per le finalità di cui ai paragrafi 4.1, 4.2 e 4.3 è necessario per la conclusione e l'esecuzione del rapporto e per l'adempimento degli obblighi di legge: il rifiuto comporta l'impossibilità di instaurare o proseguire il rapporto.
                </p>
                <p>
                  Il conferimento dei dati per le finalità di marketing (paragrafo 4.4) è facoltativo: il rifiuto o la revoca del consenso non comporta alcuna conseguenza sul rapporto contrattuale in corso.
                </p>
              </PolicySection>

              <PolicySection num="8" title="Destinatari e comunicazione dei dati">
                <p>I dati personali possono essere comunicati, nei limiti di quanto strettamente necessario, alle seguenti categorie di destinatari:</p>
                <ul>
                  <li>dipendenti e/o collaboratori, debitamente istruiti e autorizzati al trattamento ai sensi degli artt. 29 GDPR e 2-quaterdecies D. Lgs. 196/2003;</li>
                  <li>soggetti nominati quali responsabili del trattamento ex art. 28 GDPR;</li>
                  <li>autorità pubbliche, autorità giudiziarie, autorità di controllo e altri soggetti pubblici, quando la comunicazione è imposta dalla legge o necessaria all'accertamento di diritti.</li>
                </ul>
                <p>
                  L'elenco aggiornato dei responsabili del trattamento può essere richiesto al Titolare ai contatti indicati al paragrafo 1.
                </p>
              </PolicySection>

              <PolicySection num="9" title="Trasferimenti extra-UE">
                <p>
                  I dati personali sono prevalentemente trattati all'interno dello Spazio Economico Europeo. Alcuni dei fornitori tecnologici di cui Skillvue si avvale in qualità di responsabili del trattamento appartengono a gruppi multinazionali con sede principale al di fuori dell'Unione europea (in particolare negli Stati Uniti d'America). Qualora si verifichino trasferimenti extra-UE nell'ambito dei servizi resi da tali responsabili, Skillvue garantisce che gli stessi avvengano nel rispetto del Capo V GDPR, in particolare sulla base di:
                </p>
                <ul>
                  <li>decisione di adeguatezza della Commissione europea ai sensi dell'art. 45 GDPR (EU-U.S. Data Privacy Framework) per i fornitori certificati ed iscritti nel registro pubblico mantenuto dal Dipartimento del Commercio statunitense;</li>
                  <li>in subordine, Clausole Contrattuali Standard approvate dalla Commissione europea ai sensi dell'art. 46, par. 2, lett. c, GDPR, integrate, ove necessario sulla base di apposita valutazione di impatto sui trasferimenti, da misure supplementari conformi alle Raccomandazioni EDPB 01/2020.</li>
                </ul>
                <p>
                  L'elenco aggiornato dei responsabili del trattamento, con indicazione delle relative localizzazioni e delle garanzie applicate, può essere richiesto al Titolare ai contatti indicati al paragrafo 1.
                </p>
              </PolicySection>

              <PolicySection num="10" title="Tempi di conservazione">
                <p>I dati personali sono conservati per i seguenti periodi:</p>
                <p>
                  <strong className="text-[#121212]/85 font-semibold">4.1 Gestione richieste tramite form Demo:</strong> i dati raccolti attraverso i moduli di contatto e richiesta demo sono conservati per il tempo strettamente necessario a dare riscontro alla richiesta e, ove l'interessato diventi cliente, per tutta la durata del rapporto contrattuale. In assenza di successivo rapporto contrattuale, i dati sono cancellati o anonimizzati entro 24 (ventiquattro) mesi dalla data di ricezione della richiesta, salvo che l'interessato abbia espresso il consenso al trattamento per finalità di marketing di cui al punto 4.4.
                </p>
                <p>
                  <strong className="text-[#121212]/85 font-semibold">4.2 Gestione del Sito e funzioni operative:</strong> i dati di navigazione (incluso l'indirizzo IP) raccolti per finalità di gestione tecnica e sicurezza del Sito sono conservati per un periodo non superiore a 6 (sei) mesi dalla data di raccolta, salvo necessità di conservazione ulteriore in caso di accertate violazioni della sicurezza o illeciti informatici, nel qual caso i dati potranno essere trattenuti per il tempo necessario all'espletamento delle relative procedure.
                </p>
                <p>
                  <strong className="text-[#121212]/85 font-semibold">4.3 Difesa in giudizio:</strong> in deroga ai termini ordinari di cui ai punti precedenti, i dati strettamente pertinenti a una controversia pendente o ragionevolmente prevedibile sono conservati per il tempo necessario alla sua definizione e, in ogni caso, non oltre 10 (dieci) anni dalla cessazione del rapporto, in applicazione del termine di prescrizione ordinaria ex art. 2946 c.c. Decorso tale termine, i dati sono cancellati o anonimizzati. In assenza di controversia pendente o concretamente prevedibile, questa finalità non può essere invocata per trattenere i dati oltre i termini ordinari.
                </p>
                <p>
                  <strong className="text-[#121212]/85 font-semibold">4.4 Marketing diretto:</strong> fino a revoca del consenso da parte dell'interessato e comunque non oltre 24 mesi dall'ultimo contatto utile, fatta salva la possibilità di rinnovare il consenso.
                </p>
                <p>
                  Al termine dei suddetti periodi, i dati sono cancellati o resi anonimi, salvi eventuali obblighi legali di conservazione ulteriore.
                </p>
              </PolicySection>

              <PolicySection num="11" title="Diritti dell'interessato">
                <p>L'interessato può esercitare in qualsiasi momento, ai sensi degli artt. 15-22 GDPR, i seguenti diritti:</p>
                <ul>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto di accesso</strong> (art. 15): ottenere conferma dell'esistenza del trattamento e ricevere copia dei dati personali trattati;</li>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto di rettifica</strong> (art. 16): ottenere la correzione di dati inesatti o l'integrazione di dati incompleti;</li>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto alla cancellazione</strong> (art. 17): ottenere la cancellazione dei dati personali nei casi previsti dalla norma;</li>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto di limitazione del trattamento</strong> (art. 18);</li>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto alla portabilità dei dati</strong> (art. 20), ove applicabile;</li>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto di opposizione al trattamento</strong> (art. 21), in particolare al trattamento per finalità di marketing diretto;</li>
                  <li><strong className="text-[#121212]/85 font-semibold">diritto di revocare il consenso</strong> in qualsiasi momento (art. 7, par. 3), senza che ciò pregiudichi la liceità del trattamento basata sul consenso prestato prima della revoca.</li>
                </ul>
                <p>
                  Per esercitare i diritti e per proporre reclamo al Garante per la protezione dei dati personali (
                  <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">www.garanteprivacy.it</a>
                  ), può scrivere a{' '}
                  <a href="mailto:privacy@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">privacy@skillvue.ai</a>
                  {' '}o al DPO a{' '}
                  <a href="mailto:dpo@skillvue.ai" className="text-[#4B4DF7] hover:text-[#3133E7] underline underline-offset-2 transition-colors duration-200">dpo@skillvue.ai</a>
                  . Skillvue risponde alle richieste degli interessati entro un mese dalla ricezione, estensibile di ulteriori due mesi in caso di particolare complessità, ai sensi dell'art. 12, par. 3, GDPR.
                </p>
              </PolicySection>

            </motion.div>

            {/* Last modified */}
            <div className="border-t border-[#121212]/[0.06] mt-4 pt-10">
              <p className="text-[13px] text-[#121212]/[0.3] leading-[1.7]">
                Ultimo aggiornamento: 25 giugno 2026
              </p>
            </div>
          </div>
        </section>

      <Footer />
      </main>
    </>
  );
}

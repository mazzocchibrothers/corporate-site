'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackLead } from '@/components/shared/track-lead';
import { reportSubmission } from './report-submission';
import { reportContent, type ReportContact, type Module, type Scenario } from './model';
import { href } from '@/i18n/routes';
import { BASE_URL } from '@/i18n/urls';
import styles from './calculator.module.css';

// The EN contact form accepts a single name; the IT form requires a separate surname.
const REPORT_ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/48438018/950f4b2b-ed50-4ef7-94f9-2b34c4b19ecc';

const INDUSTRIES = ['luxury', 'retail', 'banking', 'insurance', 'pharma', 'manufacturing', 'other'];

export default function ReportForm({ onClose, module, scenario, values }: {
  onClose: () => void; module: Module; scenario: Scenario; values: number[];
}) {
  const t = useTranslations('roi-calculator.reportForm');
  const calculator = useTranslations('roi-calculator');
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'submitted'>('idle');

  const [contact, setContact] = useState<ReportContact | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current!;
    dialog.showModal();
    dialog.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'pending') return;
    const data = new FormData(event.currentTarget);
    const industry = String(data.get('industry') ?? '');
    const message = [
      calculator('eyebrow'),
      `${t('company')}: ${String(data.get('company')).trim()}`,
      `${t('industry')}: ${industry ? t(`industries.${industry}`) : t('notSpecified')}`,
      `${calculator('scenario')}: ${calculator(`scenarios.${scenario}`)}`,
      `${calculator('useCase')}: ${calculator(`${module}.tab`)}`,
      `${calculator(`${module}.input1`)}: ${values[0]}`,
      `${calculator(`${module}.input2`)}: ${values[1]}`,
    ].join('\n');
    setStatus('pending');
    try {
      const payload = reportSubmission({
        name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), message,
        consent: data.get('consent') === 'on',
        consentText: t.markup('consent', { a: (text) => text }),
        processingText: t('processingConsent'),
        pageUri: window.location.href, pageName: document.title,
      });
      const response = await fetch(REPORT_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Submission failed');
      trackLead('roi-calculator');
      const details = { name: String(data.get('name') ?? '').trim(), company: String(data.get('company') ?? '').trim(), industry, date: new Date() };
      setContact(details);
      setStatus('submitted');
      await download(details);
    } catch {
      setStatus('error');
    }
  }

  async function download(details = contact) {
    if (!details || downloading) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const { generateReportPDF } = await import('./report-pdf');
      const content = reportContent({
        contact: details, module, scenario, values, locale, translate: calculator,
        demoUrl: new URL(href('book-meeting', locale), BASE_URL).href,
      });
      const blob = await generateReportPDF(content);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'skillvue-roi-report.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="roi-report-title" aria-describedby="roi-report-description"
      onClose={() => { if (!dialogRef.current?.open) onClose(); }}>
      <div className={styles.dialogInner}>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('close')}><X aria-hidden="true" /></button>
        <h2 className="max-w-[880px]" id="roi-report-title">{t(status === 'submitted' ? 'readyHeading' : 'heading')}</h2>
        {status !== 'submitted' && <p id="roi-report-description">{t('body', { module: calculator(`${module}.tab`) })}</p>}
        {status === 'submitted' ? <div>
          <p id="roi-report-description" role="status">{t('downloadHint')}</p>
          <Button type="button" mode="dark" disabled={downloading} aria-busy={downloading} icon={null} onClick={() => download()}>
            {t(downloading ? 'generatingReport' : 'downloadAgain')}
          </Button>
          {downloadError && <p role="alert">{t('downloadError')}</p>}
        </div> : <form className={styles.captureForm} onSubmit={submit}>
          <fieldset disabled={status === 'pending'}>
            <label htmlFor="roi-name">{t('name')}</label>
            <input id="roi-name" name="name" type="text" autoComplete="name" required pattern=".*\S.*" maxLength={200} />
            <label htmlFor="roi-email">{t('email')}</label>
            <input id="roi-email" name="email" type="email" autoComplete="email" required maxLength={254} />
            <label htmlFor="roi-company">{t('company')}</label>
            <input id="roi-company" name="company" type="text" autoComplete="organization" required pattern=".*\S.*" maxLength={200} />
            <label htmlFor="roi-industry">{t('industry')}</label>
            <select id="roi-industry" name="industry" defaultValue="">
              <option value="">{t('selectIndustry')}</option>
              {INDUSTRIES.map((industry) => <option key={industry} value={industry}>{t(`industries.${industry}`)}</option>)}
            </select>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" required />
              <span>{t.rich('consent', { a: (text) => <a href={locale === 'it' ? 'https://www.iubenda.com/privacy-policy/75783964' : 'https://www.iubenda.com/privacy-policy/45750674/full-legal'} target="_blank" rel="noopener noreferrer">{text}</a> })}</span>
            </label>
            <p className={styles.formNote}>{t('unsubscribe')}</p>
            {status === 'error' && <p role="alert">{t('submitError')}</p>}
            <Button className="type-body-sm w-full rounded-[9px] font-semibold" type="submit" mode="dark" icon={null}>
              {t(status === 'pending' ? 'submitting' : 'submit')}
            </Button>
          </fieldset>
        </form>}
      </div>
    </dialog>
  );
}

'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown, Check } from 'lucide-react';
import { Button, SECONDARY_ON_LIGHT } from '@/components/ui/button';
import { trackLead } from '@/components/shared/track-lead';
import { reportSubmission } from './report-submission';
import { reportContent, type ReportContact, type Module, type Scenario } from './model';
import { href } from '@/i18n/routes';
import { BASE_URL } from '@/i18n/urls';
import styles from './calculator.module.css';

const REPORT_ENDPOINT = '/api/roi-report';

const INDUSTRIES = ['luxury', 'retail', 'banking', 'insurance', 'pharma', 'manufacturing', 'energy', 'other'];
const PRIVACY = { en: 'https://www.iubenda.com/privacy-policy/45750674/full-legal', it: 'https://www.iubenda.com/privacy-policy/75783964' };
type Field = 'name' | 'email' | 'company' | 'industry' | 'consent';
// The design's check: something@something.tld, a two-letter domain at least.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ReportForm({ module, scenario, values }: {
  module: Module; scenario: Scenario; values: number[];
}) {
  const t = useTranslations('roi-calculator.reportForm');
  const calculator = useTranslations('roi-calculator');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'submitted'>('idle');

  const [contact, setContact] = useState<ReportContact | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  // Fields that failed the check on the last submit; a field leaves the list once it is edited.
  const [invalid, setInvalid] = useState<Field[]>([]);
  const clear = (field: Field) => () => setInvalid((current) => current.filter((f) => f !== field));
  // Focus moves to the first invalid field after the render that marks it
  // invalid and links its message, so a screen reader announces the error too.
  const focusAfterRender = useRef<Field | null>(null);
  useEffect(() => {
    if (!focusAfterRender.current) return;
    document.querySelector<HTMLElement>(`#report [name="${focusAfterRender.current}"]`)?.focus();
    focusAfterRender.current = null;
  }, [invalid]);
  const errorId = (field: Field) => `roi-${field}-error`;
  const fieldProps = (field: Field) => ({
    'aria-invalid': invalid.includes(field) || undefined,
    'aria-describedby': invalid.includes(field) ? errorId(field) : undefined,
    onChange: clear(field),
  });
  const error = (field: Field, key: string) => invalid.includes(field)
    ? <p id={errorId(field)} className={styles.fieldError}>{t(key)}</p> : null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'pending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const industry = String(data.get('industry') ?? '');
    const failed = ([
      ['name', !String(data.get('name') ?? '').trim()],
      ['email', !EMAIL.test(String(data.get('email') ?? '').trim())],
      ['company', !String(data.get('company') ?? '').trim()],
      ['industry', !industry],
      ['consent', data.get('consent') !== 'on'],
    ] as [Field, boolean][]).filter(([, bad]) => bad).map(([field]) => field);
    focusAfterRender.current = failed[0] ?? null;
    setInvalid(failed);
    if (failed.length) return;
    setStatus('pending');
    try {
      const payload = reportSubmission({
        name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''),
        company: String(data.get('company') ?? ''), industry,
        consent: data.get('consent') === 'on',
        processingText: t.markup('processingConsent', { a: (text) => text }),
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
    <section id="report" className={`section-light ${styles.reportSection}`} aria-labelledby="roi-report-title">
      <div className={`${styles.wrap} ${styles.reportGrid}`}>
        <div className={styles.reportIntro}>
          <h2 className="max-w-[880px] font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212]" id="roi-report-title">{t('heading')}</h2>
          <p id="roi-report-description" className="type-body text-[#4B4B4B]">{t('body')}</p>
        </div>
        {status === 'submitted' ? <div className={styles.ready}>
          <p className={styles.readyHeading} role="status">
            <Check aria-hidden="true" className="h-5 w-5 text-[#16a34a]" />
            <span className="font-display">{t('readyHeading')}</span>
          </p>
          <p className="type-body text-[#4B4B4B]">{t('downloadHint')}</p>
          <Button type="button" variant="secondary" mode="light" className={SECONDARY_ON_LIGHT} icon={null}
            disabled={downloading} aria-busy={downloading} onClick={() => download()}>
            {t(downloading ? 'generatingReport' : 'downloadAgain')}
          </Button>
          {downloadError && <p role="alert" className="type-body-sm text-[#b91c1c]">{t('downloadError')}</p>}
        </div> : <form className={`${styles.captureForm} hs-form-do-not-collect`} data-hs-do-not-collect="true" noValidate onSubmit={submit} aria-describedby="roi-report-description">
          <fieldset disabled={status === 'pending'}>
            <div className={styles.formField}>
              <label htmlFor="roi-name">{t('name')}</label>
              <input id="roi-name" name="name" type="text" autoComplete="name" maxLength={200} {...fieldProps('name')} />
              {error('name', 'errorName')}
            </div>
            <div className={styles.formField}>
              <label htmlFor="roi-email">{t('email')}</label>
              <input id="roi-email" name="email" type="email" autoComplete="email" maxLength={254} {...fieldProps('email')} />
              {error('email', 'errorEmail')}
            </div>
            <div className={styles.formField}>
              <label htmlFor="roi-company">{t('company')}</label>
              <input id="roi-company" name="company" type="text" autoComplete="organization" maxLength={200} {...fieldProps('company')} />
              {error('company', 'errorCompany')}
            </div>
            <div className={styles.formField}>
              <label htmlFor="roi-industry">{t('industry')}</label>
              <select id="roi-industry" name="industry" defaultValue="" {...fieldProps('industry')}>
                <option value="" disabled>{t('selectIndustry')}</option>
                {INDUSTRIES.map((industry) => <option key={industry} value={industry}>{t(`industries.${industry}`)}</option>)}
              </select>
              {error('industry', 'errorIndustry')}
            </div>
            <div className={styles.consents}>
              <label className={styles.consent}>
                <input type="checkbox" name="consent" {...fieldProps('consent')} />
                <span>{t.rich('processingConsent', { a: (text) => <a href={PRIVACY[locale as keyof typeof PRIVACY] ?? PRIVACY.en} target="_blank" rel="noopener noreferrer">{text}</a> })}</span>
              </label>
              {error('consent', 'errorConsent')}
              {status === 'error' && <p role="alert" className="type-body-sm text-[#b91c1c]">{t('submitError')}</p>}
            </div>
            <div className={styles.submitRow}>
              <Button type="submit" mode="light" icon={<ArrowDown aria-hidden="true" />}>
                {t(status === 'pending' ? 'submitting' : 'submit')}
              </Button>
            </div>
          </fieldset>
        </form>}
      </div>
    </section>
  );
}

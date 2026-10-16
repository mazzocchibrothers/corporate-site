'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import styles from './calculator.module.css';
import { Button } from '@/components/ui/button';
import { trackLead } from '@/components/shared/track-lead';

// shortcut: reuse the contact forms until dedicated ROI forms are available.
const FORM_IDS = {
  en: process.env.NEXT_PUBLIC_ROI_REPORT_FORM_ID_EN || '950f4b2b-ed50-4ef7-94f9-2b34c4b19ecc',
  it: process.env.NEXT_PUBLIC_ROI_REPORT_FORM_ID_IT || 'd841a6fe-99a0-46cd-af9c-389b8df01855',
};

export default function ReportForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations('roi-calculator.reportForm');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const locale = useLocale();
  const formId = FORM_IDS[locale];
  const [failed, setFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successMessage = t('success');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current!;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    setFailed(false);
    const createForm = () => {
      if (cancelled || !window.hbspt) return;
      window.hbspt.forms.create({
        portalId: '48438018',
        formId,
        region: 'na1',
        target: '#roi-report-hubspot-form',
        onFormReady: () => clearTimeout(timeout),
        inlineMessage: successMessage,
        onFormSubmitted: () => {
          trackLead('roi-calculator');
          setSubmitted(true);
        },
      });
    };
    timeout = setTimeout(() => { if (!cancelled) setFailed(true); }, 15000);
    const script = document.createElement('script');
    if (window.hbspt) createForm();
    else {
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.onload = createForm;
      script.onerror = () => { if (!cancelled) setFailed(true); };
      document.body.appendChild(script);
    }
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      script.remove();
      document.getElementById('roi-report-hubspot-form')?.replaceChildren();
    };
  }, [formId, attempt, successMessage]);

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="roi-report-title" aria-describedby="roi-report-description"
      onClose={() => { if (!dialogRef.current?.open) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.dialogInner}>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('close')}><X aria-hidden="true" /></button>
        <h2 id="roi-report-title">{t('heading')}</h2>
        <p id="roi-report-description">{t('body')}</p>
        <div id="roi-report-hubspot-form" hidden={submitted || failed} />
        {submitted && <p role="status">{successMessage}</p>}
        {failed && !submitted && <div role="alert">
          <p>{t('loadError')}</p>
          <Button mode="dark" icon={null} onClick={() => setAttempt((value) => value + 1)}>{t('retry')}</Button>
        </div>}
      </div>
    </dialog>
  );
}

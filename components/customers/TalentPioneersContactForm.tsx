'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

const FORM_IDS: Record<string, string> = {
  en: '950f4b2b-ed50-4ef7-94f9-2b34c4b19ecc',
  it: 'd841a6fe-99a0-46cd-af9c-389b8df01855',
};

export default function TalentPioneersContactForm() {
  const lang = useLocale();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createForm = () => {
      if (!window.hbspt || !formRef.current) return;
      formRef.current.innerHTML = '';
      window.hbspt.forms.create({
        portalId: '48438018',
        formId: FORM_IDS[lang] ?? FORM_IDS.en,
        region: 'na1',
        target: '#talent-pioneers-hubspot-form',
      });
    };

    if (window.hbspt) {
      createForm();
      return;
    }

    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.async = true;
    script.onload = createForm;
    document.body.appendChild(script);

    return () => script.remove();
  }, [lang]);

  return <div id="talent-pioneers-hubspot-form" ref={formRef} style={{ minHeight: 300 }} />;
}

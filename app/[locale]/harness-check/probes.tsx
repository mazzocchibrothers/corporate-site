// @ts-nocheck
'use client';

// The three dependencies an App Router migration is most likely to break here,
// mounted on one page so they can be checked in a browser before 61 pages
// depend on them (#132).
//
// ponytail: scaffolding. Goes with harness-check/page.tsx at the switch (#120).

import React, { useEffect, useRef, useState } from 'react';
import { LazyMotion, m } from 'framer-motion';

const loadMotionFeatures = () => import('@/lib/motion-features').then((r) => r.default);

/** framer-motion under `strict`, which throws if `motion.*` is used instead of
 *  `m.*` — the failure mode that would otherwise appear on page 40. */
export function MotionProbe() {
  const [features, setFeatures] = useState('loading');
  useEffect(() => {
    loadMotionFeatures().then(() => setFeatures('loaded'));
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <m.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        data-probe="motion"
        data-features={features}
        style={{ padding: '.5rem 1rem', background: '#4B4DF7', color: '#fff', width: 'fit-content' }}
      >
        framer-motion: animated, features {features}
      </m.div>
    </LazyMotion>
  );
}

/** The exact embed pattern all six HubSpot pages use, unchanged, so what is
 *  proven here is what those pages will do. */
export function HubSpotProbe() {
  const target = useRef(null);
  const [state, setState] = useState('mounting');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (window.hbspt && target.current) {
        window.hbspt.forms.create({
          portalId: '48438018',
          formId: '950f4b2b-ed50-4ef7-94f9-2b34c4b19ecc',
          region: 'na1',
          target: '#probe-hubspot-form',
        });
        setState('created');
      } else {
        setState('no hbspt global');
      }
    };
    script.onerror = () => setState('script failed');
    document.body.appendChild(script);
    return () => script.parentNode?.removeChild(script);
  }, []);

  return (
    <div data-probe="hubspot" data-state={state}>
      <p>hubspot: {state}</p>
      <div id="probe-hubspot-form" ref={target} />
    </div>
  );
}

/** GTM is injected by the root layout, not by this component. Reading dataLayer
 *  from the client is how we tell "the Script tag rendered" from "the tag
 *  actually ran and pushed a pageview". */
export function GtmProbe() {
  const [state, setState] = useState('checking');
  useEffect(() => {
    const id = setInterval(() => {
      const dl = window.dataLayer;
      if (!Array.isArray(dl)) return;
      const started = dl.some((e) => e && e['gtm.start']);
      const loaded = typeof window.google_tag_manager === 'object';
      if (started) setState(`dataLayer ${dl.length} events, gtm.js ${loaded ? 'loaded' : 'pending'}`);
      if (started && loaded) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, []);
  return <p data-probe="gtm" data-state={state}>gtm: {state}</p>;
}

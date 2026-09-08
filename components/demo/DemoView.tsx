'use client';

// Renders nothing; reports that this demo page was opened, and by whom.
//
// Every demo page mounts one of these with its own slug, so the three
// dashboards do not each grow their own copy of the effect below.

import { useEffect } from 'react';
import { demoViewEvent } from '@/components/demo/track';

export default function DemoView({ slug }: { slug: string }) {
  useEffect(() => {
    // GTM is loaded `afterInteractive` in the root layout, so this effect can
    // run before its snippet has created the array. Pushing into one we create
    // ourselves is what the snippet expects: it keeps whatever is already
    // there and replays it when the container loads.
    const w = window as typeof window & { dataLayer?: unknown[] };
    (w.dataLayer ??= []).push(demoViewEvent(slug, window.location.search));
  }, [slug]);

  return null;
}

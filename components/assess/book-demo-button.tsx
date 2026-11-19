'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bookDemoClickEvent } from '@/components/assess/track';

// The page's main call to action: the house primary button, linking to the
// booking page, that tells GTM it was clicked. The push is synchronous, before
// the browser follows the link; GTM's own beacon carries it from there.
export function BookDemoButton({ href, label, language }: { href: string; label: string; language: string }) {
  return (
    <Button asChild variant="primary" mode="light">
      <a
        href={href}
        data-testid="assess-book-demo"
        onClick={() => {
          (window.dataLayer ??= []).push(bookDemoClickEvent(language));
        }}
      >
        {label}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

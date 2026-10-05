import HubspotLandingPage from '@/components/shared/HubspotLandingPage';

// One HubSpot form per language. This page replaced two twin files —
// book-meeting.tsx and prenota-incontro.tsx — which existed only because the
// Pages Router needed one file per URL; the App Router serves /book-meeting and
// /it/prenota-incontro from one directory. The form id was the only thing in
// them that was not copy, so it is the only thing left to branch on.
//
// it is the form prenota-incontro.tsx used. The move to app/ put the Italian
// Food Retail one-pager form here instead, and every Italian demo request was
// redirected to that PDF and filed under the wrong form.
const FORM_IDS = {
  en: '950f4b2b-ed50-4ef7-94f9-2b34c4b19ecc',
  it: 'd841a6fe-99a0-46cd-af9c-389b8df01855',
};

export default function BookMeetingPage() {
  return <HubspotLandingPage namespace="book-meeting" formIds={FORM_IDS} leadSource="book-meeting" thankYou />;
}

// The GTM event a HubSpot form fires when it is accepted.
//
// The site's forms submit to HubSpot and never reach a thank-you URL, so the
// container's URL-based conversion triggers never fire and GA saw no leads at
// all. `generate_lead` is GA4's recommended name: GTM forwards every custom
// dataLayer event to GA4 under its own name, and maps this one to Meta's Lead.
//
// `form` names the page the lead came from — a route id, or the slug of an
// insight — so one key event in GA4 still splits by source.
// scripts/check-lead-event.mjs fails on a HubSpot form that does not call it.

'use client';

export function trackLead(form: string) {
  (window.dataLayer ??= []).push({ event: 'generate_lead', form });
}

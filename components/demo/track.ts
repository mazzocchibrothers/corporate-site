// The GTM event a demo page fires when it opens.
//
// The demo links leave the building one prospect at a time, with `?c=<token>`
// naming who received it — so "who opened which dashboard" is a question the
// analytics can answer, and the token is the only thing that carries the
// answer. Pure and import-free on purpose: scripts/check-demo-event.mjs runs
// this file directly under Node, so what the page pushes and what the gate
// asserts are the same function.

export type DemoViewEvent = {
  event: 'demo_view';
  demoSlug: string;
  /** The `?c=` token, absent when the link was opened without one. */
  demoContact?: string;
};

/**
 * `search` is the raw query string — `window.location.search` at the call
 * site. A missing or blank token omits the key rather than pushing an empty
 * string: in GTM an empty value is a value, and a trigger conditioned on it
 * would fire for every direct visit.
 */
export function demoViewEvent(slug: string, search: string): DemoViewEvent {
  const contact = new URLSearchParams(search).get('c')?.trim();
  return {
    event: 'demo_view',
    demoSlug: slug,
    ...(contact ? { demoContact: contact } : {}),
  };
}

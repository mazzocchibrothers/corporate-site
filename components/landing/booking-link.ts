// The campaign landing pages' booking link, carrying the `v` the visitor
// arrived with (which email list sent them), so the booking can be attributed.
//
// String work rather than `new URL`: the base may still be a `{{BOOKING_URL}}`
// placeholder, which is not a URL and would throw.
// scripts/check-booking-link.mjs covers it.

export const VISITOR_PARAM = 'v';

export function bookingHref(base: string, search: string): string {
  const v = new URLSearchParams(search).get(VISITOR_PARAM);
  if (!v) return base;
  const hashAt = base.indexOf('#');
  const path = hashAt === -1 ? base : base.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : base.slice(hashAt);
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}${VISITOR_PARAM}=${encodeURIComponent(v)}${hash}`;
}

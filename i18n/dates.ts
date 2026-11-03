// Pure, so the sitemap and the JSON-LD share it without either importing the
// other — and a gate can import it without pulling in next-intl.

/**
 * "March 13, 2026" to 2026-03-13, and "August 2026" to 2026-08 — the two
 * newsletters carry a month, and inventing a day for them would be inventing
 * data. Both are valid ISO 8601, which is what schema.org asks for.
 *
 * The English date is the one parsed whatever the page's locale: "13 Marzo
 * 2026" is the same day written for a reader, and Date.parse does not speak
 * Italian.
 */
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
export function isoDate(human: string): string | undefined {
  const m = human.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (m) {
    const month = MONTHS.indexOf(m[1].toLowerCase());
    if (month < 0) return undefined;
    return `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  }
  const my = human.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (my) {
    const month = MONTHS.indexOf(my[1].toLowerCase());
    if (month < 0) return undefined;
    return `${my[2]}-${String(month + 1).padStart(2, '0')}`;
  }
  return undefined;
}

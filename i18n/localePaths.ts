// Maps IT-only slugs to their EN equivalents and vice versa. Shared between
// the language switcher (which must navigate to a real path) and the
// hreflang tags (which must point search engines at a real path).
const itToEn: Record<string, string> = { '/clienti': '/customers' };
const enToIt: Record<string, string> = { '/customers': '/clienti' };

export function toEnPath(asPath: string): string {
  if (asPath.startsWith('/clienti/')) return '/customers/' + asPath.slice('/clienti/'.length);
  return itToEn[asPath] ?? asPath;
}

export function toItPath(asPath: string): string {
  if (asPath.startsWith('/customers/')) return '/clienti/' + asPath.slice('/customers/'.length);
  return enToIt[asPath] ?? asPath;
}

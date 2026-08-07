// Maps IT-only slugs to their EN equivalents and vice versa. Shared between
// the language switcher (which must navigate to a real path) and the
// hreflang tags (which must point search engines at a real path).
const itToEn: Record<string, string> = { '/clienti': '/customers', '/prenota-incontro': '/book-meeting' };
const enToIt: Record<string, string> = { '/customers': '/clienti', '/book-meeting': '/prenota-incontro' };

// asPath can carry a query string or hash (e.g. from a UTM-tagged link);
// those need to ride along untouched while only the path portion is mapped.
function translate(asPath: string, map: Record<string, string>, fromPrefix: string, toPrefix: string): string {
  const splitIndex = asPath.search(/[?#]/);
  const path = splitIndex === -1 ? asPath : asPath.slice(0, splitIndex);
  const suffix = splitIndex === -1 ? '' : asPath.slice(splitIndex);
  const mappedPath = path.startsWith(fromPrefix + '/')
    ? toPrefix + path.slice(fromPrefix.length)
    : map[path] ?? path;
  return mappedPath + suffix;
}

export function toEnPath(asPath: string): string {
  return translate(asPath, itToEn, '/clienti', '/customers');
}

export function toItPath(asPath: string): string {
  return translate(asPath, enToIt, '/customers', '/clienti');
}

// Single source of truth for every route on the site.
//
// Four hand-kept lists used to disagree here — next.config.ts rewrites,
// i18n/localePaths.ts, pages/sitemap.xml.tsx, and the hrefIt/nameIt flags in
// Navbar/Footer. Nothing failed the build when they drifted, which is how the
// language switcher shipped a 404 (commit 67f53be). This file replaces all of
// them: rewrites, locale paths, hreflang and the sitemap are derived from it.
//
// The data lives in routes.json, not here. next.config.ts has to read the
// registry before any TypeScript toolchain exists, and the gate script reads it
// from plain Node — JSON is the one format both get for free, with no eval and
// no build step. This module is the typed view of it.
//
// `paths`  the URL per locale, WITHOUT the /it prefix Next adds itself.
// `files`  the page under pages/ that serves that locale. Usually the same file
//          for both; /book-meeting and /prenota-incontro are two real files.
//
// A locale missing from `paths` means the route has no content in that
// language. Today that is 10 Italian-only routes and 1 English-only one — they
// currently render under both locales and claim an hreflang alternate they
// cannot serve (#102, #116).
//
// Slugs still to translate: every route whose `it` path equals its `en` path is
// waiting on #119. Adding one to routes.json is all it takes — every consumer
// follows.

import data from './routes.json';
import { pathFor, urlFor, type Locale as UrlLocale } from './urls';

export type Locale = UrlLocale;

export type Route = {
  /** Stable identifier, independent of either slug. */
  id: string;
  /** URL per locale, no /it prefix. Absent locale = no content there. */
  paths: Partial<Record<Locale, string>>;
  /** Page file under pages/, no extension. */
  files: Partial<Record<Locale, string>>;
};

export const routes: Route[] = data as Route[];

export const localesOf = (r: Route): Locale[] =>
  (['en', 'it'] as Locale[]).filter((l) => r.paths[l] !== undefined);

export const byPath = (locale: Locale, path: string): Route | undefined =>
  routes.find((r) => r.paths[locale] === path);

export const byId = (id: string): Route | undefined => routes.find((r) => r.id === id);

/**
 * The href for a route id in the current locale — the replacement for the
 * `hrefIt` flags that were scattered through the navbar and the footer, and for
 * every `lang === 'it' ? '/prenota-incontro' : '/book-meeting'` ternary.
 *
 * It throws on an unknown id rather than returning '#': a typo in a nav link
 * is a broken link on all 61 pages, and a silent one is worse than a loud one.
 */
export function href(id: string, locale: string): string {
  const route = byId(id);
  if (!route) throw new Error(`i18n/routes: no route '${id}'. Nav links come from the registry.`);
  // `locale` is what the UI has, which is a string. A route with no page in
  // that language falls back to English rather than rendering a dead link —
  // hiding the link is the caller's decision, not this function's.
  return pathFor(route, locale as Locale) ?? pathFor(route, 'en') ?? '/';
}

/**
 * The absolute URL for a route in a locale — the canonical link.
 *
 * It replaces the per-page `https://skillvue.ai${isIT ? '/it' : ''}/…` literal,
 * which was copied into 20 pages and wrong in every page that had been copied
 * from another one.
 */
export function canonical(id: string, locale: string): string {
  const route = byId(id);
  if (!route) throw new Error(`i18n/routes: no route '${id}'.`);
  return urlFor(route, locale as Locale) ?? urlFor(route, 'en')!;
}

/**
 * The localized form of an English in-site path — `/customers/adr` becomes
 * `/it/clienti/adr`. For a raw <a href>, which unlike next/link does not add
 * the locale prefix itself.
 *
 * It replaces the hand-built version in the newsletters, which knew about
 * `/clienti` because someone typed it there.
 */
export function localizePath(path: string, locale: string): string {
  const [pathname, suffix = ''] = path.split(/(?=[?#])/);
  const route = byPath('en', pathname);
  return route ? (pathFor(route, locale as Locale) ?? pathname) + suffix : path;
}

/** Whether a route has content in a locale — what hideInIT was guessing at. */
export const hasLocale = (id: string, locale: string): boolean =>
  byId(id)?.paths[locale as Locale] !== undefined;



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

export type Locale = 'en' | 'it';

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

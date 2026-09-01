// The one reader of app/[locale] as a set of routes.
//
// Shared because two consumers ask the same question and must not answer it
// differently: scripts/gen-migrated.mjs decides which paths the middleware
// stops skipping, and scripts/check-routes.mjs decides which routes are
// already migrated. If those two walks ever disagreed, a page would be live
// under app/ while the middleware still treated it as unmigrated — which
// renders it without its locale, and nothing would say so.

import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Every internal route path served by an `app/[locale]/**\/page.tsx`, as the
 * URL a visitor types minus the locale prefix: `/customers/adr`, `/` for the
 * root. These are compared against `paths` in i18n/routes.json, so a dynamic
 * segment keeps its brackets — the registry writes them the same way.
 */
export function appRoutePaths(root) {
  const walk = (dir, prefix = '') => {
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? walk(join(dir, entry.name), `${prefix}/${entry.name}`)
        : entry.name === 'page.tsx'
          ? [prefix || '/']
          : [],
    );
  };
  return walk(join(root, 'app/[locale]')).sort();
}

/**
 * The route a given app path serves, by either locale's URL: `/clienti` and
 * `/customers` are one route, and only one of them is the directory name.
 */
export const routeAtPath = (routes, path) =>
  routes.find((r) => r.paths.en === path || r.paths.it === path);

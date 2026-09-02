// check-dead — a component nothing imports, and a component imported but never
// rendered.
//
// Both are invisible to every other gate. They compile, they typecheck, their
// copy sits in the catalogue asking to be translated, and the second kind also
// ships in the page's bundle: /solutions/talent-acquisition downloaded three
// marketing sections no visitor has ever seen. 16 files were found by hand
// (#136); this is what stops the next 16.
//
// The rule is deliberately dumb — it reads imports and JSX tag names as text —
// because the alternative is a module graph, and a check nobody can debug at
// 3am is a check that gets deleted the first time it is wrong.
//
// Run: npm run check:dead

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// components/ui is shadcn's, installed rather than written. Half of it is
// unused by design and re-adding a primitive by hand is worse than carrying it.
const NOT_OURS = (path) => path.startsWith('components/ui/');

function walk(dir) {
  return readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(join(dir, e.name))
      : /\.tsx$/.test(e.name)
        ? [join(dir, e.name)]
        : [],
  );
}

const components = walk('components').filter((p) => !NOT_OURS(p));
const sources = [...walk('components'), ...walk('app')].map((p) => ({
  path: p,
  text: readFileSync(join(ROOT, p), 'utf8'),
}));

// ── Nothing imports it ─────────────────────────────────────────────────────
const orphans = components.filter((path) => {
  const specifier = '/' + path.replace(/^components\//, '').replace(/\.tsx$/, '');
  return !sources.some(
    (s) => s.path !== path && (s.text.includes(`@/components${specifier}'`) ||
                               s.text.includes(`${specifier}'`) && s.text.includes('import')),
  );
});

// ── Imported, never rendered ───────────────────────────────────────────────
// The default import's local name, against the JSX in the same file. A
// component used only as `{Icon}` in a data array is rendered through a
// variable, so the name has to appear somewhere outside the import line.
const unrendered = [];
for (const { path, text } of sources) {
  const body = text.split('\n').filter((l) => !/^\s*import\b/.test(l)).join('\n');
  for (const [, name, from] of text.matchAll(/^import\s+([A-Z]\w*)\s+from\s+'(@\/components\/[^']+)'/gm)) {
    if (!new RegExp(`\\b${name}\\b`).test(body)) {
      unrendered.push(`  ${path}: imports ${name} from ${from} and never uses it`);
    }
  }
}

assert.deepEqual(
  orphans.map((p) => `  ${p}`),
  [],
  `${orphans.length} component(s) nothing imports:\n${orphans.map((p) => `  ${p}`).join('\n')}\n` +
    'A component no page reaches still compiles, still gates, and still asks to be translated. ' +
    'Delete it, or wire it to the page it belongs to.',
);

assert.deepEqual(
  unrendered,
  [],
  `${unrendered.length} import(s) that are never rendered:\n${unrendered.join('\n')}\n` +
    'The import keeps the component in the page bundle, so every visitor downloads a section ' +
    'nobody will see.',
);

console.log(`[OK] dead code: ${components.length} components, all imported and all rendered`);

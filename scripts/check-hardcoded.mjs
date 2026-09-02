// check-hardcoded — copy that is still in the code rather than in the catalogue.
//
// This exists because "zero hardcoded copy" was claimed and was not true. It was
// not a lie so much as an unmeasured belief: three codemods had moved every
// shape they could read, the gates were green, and 1,919 readable strings were
// still sitting in the JSX — an entire customer story, the homepage's own h1,
// eleven landing pages, and a legal text. Nothing counted them, so nobody knew.
//
// What it counts: JSX text with letters in it, and the string props a visitor
// reads. What it allows: names. A company is called Eataly in both languages,
// and putting a customer's name through a translator is worse than leaving it
// where it is.
//
// Run: npm run check:hardcoded

import assert from 'node:assert/strict';
import ts from 'typescript';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Names, not copy.
 *
 * Every entry is a proper noun: the company, its customers, its founders. A
 * string is allowed if it is one of these, or is built only from these plus
 * punctuation — so `alt="Eataly logo"` passes and `alt="Eataly changed hiring"`
 * does not. Add a name here; never add a sentence.
 */
const NAMES = [
  'Skillvue', 'Algojob', 'Eataly', 'Mediaset', 'Carrefour', 'Douglas', 'Subdued', 'Unicomm',
  'Credem', 'Gruppo Credem', 'Europ Assistance', 'Fidia Farmaceutici', 'Aeroporti di Roma',
  'ADR', 'AdR', "In's Mercato", 'Nicolò Mazzocchi', 'Simone Patera', 'LinkedIn', 'Italia',
];
// The words that may glue names together in an alt or a title.
const GLUE = /\b(logo|interview|team|product|demo|video|locations|across|Europe|page|and|the|a)\b/gi;

const isName = (text) => {
  let rest = text;
  for (const name of [...NAMES].sort((a, b) => b.length - a.length)) rest = rest.split(name).join(' ');
  return !/\p{L}/u.test(rest.replace(GLUE, ' '));
};

const VISIBLE_PROP = new Set(['alt', 'title', 'placeholder', 'aria-label', 'label']);

// An address, a URL or an HTML entity is not copy: there is nothing to translate
// and a catalogue entry for it is a place for it to go wrong.
const NOT_COPY = /^(?:&[a-z]+;|[\w.+-]+@[\w.-]+|https?:\/\/\S+|www\.\S+)$/i;
const isProse = (s) =>
  /\p{L}/u.test(s) &&
  s.trim().length > 2 &&
  !/^[\d\s+×·—–\-/%.,:()]+$/.test(s) &&
  !NOT_COPY.test(s.trim());

const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(join(dir, e.name))
      : e.name.endsWith('.tsx')
        ? [join(dir, e.name)]
        : [],
  );

// components/ui is vendored shadcn: its strings are library defaults, not this
// site's copy.
const files = [...walk('app'), ...walk('components')].filter((f) => !f.startsWith('components/ui/'));

const found = [];
for (const file of files) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const text = node.text.replace(/\s+/g, ' ').trim();
      if (isProse(text) && !isName(text)) {
        found.push(`  ${relative('.', file)}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}  ${JSON.stringify(text.slice(0, 80))}`);
      }
    }
    if (
      ts.isJsxAttribute(node) &&
      VISIBLE_PROP.has(node.name.getText()) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer) &&
      isProse(node.initializer.text) &&
      !isName(node.initializer.text)
    ) {
      found.push(`  ${relative('.', file)}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}  ${node.name.getText()}=${JSON.stringify(node.initializer.text.slice(0, 80))}`);
    }
    node.forEachChild(visit);
  };
  sf.forEachChild(visit);
}

assert.deepEqual(
  found,
  [],
  `${found.length} string(s) a visitor reads are in the code, not in messages/:\n${found.join('\n')}\n` +
    'Move them to the route namespace. If the string is a name — a company, a person — add it to ' +
    'NAMES in this file; never add a sentence there.',
);

console.log(`[OK] hardcoded copy: none in ${files.length} files (names allowed: ${NAMES.length})`);

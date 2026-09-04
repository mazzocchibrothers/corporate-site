// codemod-jsx-text — the last shape: copy written straight into the JSX.
//
// The other codemods each read a container the copy was already sitting in — a
// t() call, a `content = { it, en }` tree, a `lang === 'it' ?` ternary. This one
// has no container to read. The words are the markup:
//
//   <p className="…">Il Titolare del trattamento informa <b>ai sensi</b> …</p>
//
// So the unit is the element, and the rule is the same one the first codemod
// used: **a message is the outermost element whose whole subtree is one
// sentence** — text plus inline markup, nothing else. An element containing a
// <div>, a component, or a .map() is a layout node and is walked into, not
// captured.
//
// It writes the same text to both locales. That is deliberate and it is the
// honest thing for a page that is monolingual today: the page does not change,
// and the second locale becomes a translator's job with no code to touch.
//
// Usage:
//   node scripts/codemod-jsx-text.mjs <file> --namespace <ns> [--write]

import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const write = argv.includes('--write');
const nsIndex = argv.indexOf('--namespace');
const namespace = nsIndex === -1 ? null : argv[nsIndex + 1]?.replace(/\//g, '.');
const files = argv.filter((a, i) => !a.startsWith('--') && i !== nsIndex + 1);
if (!namespace || files.length !== 1) {
  console.error('Usage: node scripts/codemod-jsx-text.mjs <file> --namespace <ns> [--write]');
  process.exit(1);
}
const [file] = files;
const src = readFileSync(join(ROOT, file), 'utf8');
const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// Inline markup becomes an ICU tag; anything else disqualifies the unit.
const TAG_FOR = { strong: 'b', b: 'b', em: 'i', i: 'i', span: 's', br: 'br', u: 'u', a: 'a', small: 'sm', sup: 'sup', sub: 'sub' };
const ROLE = { h1: 'heading', h2: 'heading', h3: 'heading', h4: 'heading', h5: 'heading', h6: 'heading', p: 'body', li: 'item', button: 'cta', a: 'link', span: 'text', strong: 'text', em: 'text', td: 'cell', th: 'columnHeader', summary: 'summary', label: 'label' };

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', middot: '·', hellip: '…', rsquo: '’', lsquo: '‘', laquo: '«', raquo: '»' };
const decode = (t) =>
  t.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, b) =>
    b[0] === '#'
      ? String.fromCodePoint(b[1] === 'x' || b[1] === 'X' ? parseInt(b.slice(2), 16) : parseInt(b.slice(1), 10))
      : ENTITIES[b] ?? m);

const tagOf = (n) => (ts.isJsxElement(n) ? n.openingElement : n).tagName.getText();

/** The attributes an inline tag carries, so the call site can put them back. */
const attrsOf = (n) => {
  const opening = ts.isJsxElement(n) ? n.openingElement : n;
  return opening.attributes.properties
    .filter((prop) => ts.isJsxAttribute(prop))
    .map((prop) => prop.getText());
};

/**
 * The ICU form of an element's children, or null if the subtree is not one
 * sentence. `tags` collects, per ICU tag name, the JSX that must be rebuilt at
 * the call site — including its attributes, because a link's href is markup and
 * not copy.
 */
function toIcu(node, tags, counters) {
  let out = '';
  for (const child of node.children ?? []) {
    if (ts.isJsxText(child)) {
      const text = decode(child.text);
      // JSX collapses whitespace across lines; a run that is only whitespace
      // and contains a newline disappears entirely.
      out += /\n/.test(text) && text.trim() === '' ? '' : text.replace(/\s*\n\s*/g, ' ');
      continue;
    }
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) {
      const tag = TAG_FOR[tagOf(child)];
      if (!tag) return null;                       // a layout node or a component
      const n = (counters.get(tag) ?? 0) + 1;
      counters.set(tag, n);
      const name = n === 1 ? tag : `${tag}${n}`;
      tags.set(name, { tag: tagOf(child), attrs: attrsOf(child) });
      if (ts.isJsxSelfClosingElement(child)) { out += `<${name}></${name}>`; continue; }
      const inner = toIcu(child, tags, counters);
      if (inner === null) return null;
      out += `<${name}>${inner}</${name}>`;
      continue;
    }
    // `{' '}` is not a value, it is the space JSX would otherwise have eaten at
    // a line break. Every other expression is a value the catalogue cannot hold.
    if (ts.isJsxExpression(child) && child.expression && ts.isStringLiteral(child.expression)
        && child.expression.text.trim() === '') {
      out += child.expression.text;
      continue;
    }
    return null;
  }
  return out;
}

/**
 * The functions that have a `t` in scope.
 *
 * These files carry module-level helper components — a VetrinaLayer, a
 * WhitepaperLayer — with their own JSX and no translator. Rewriting inside one
 * compiles and then throws `t is not defined` at prerender, which is a build
 * failure rather than a silent one, but only because the page is prerendered.
 * Cheaper to refuse.
 */
const translated = [];
{
  const collect = (node) => {
    if ((ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node))
        && /\buseTranslations\s*\(/.test(node.getText())) {
      translated.push([node.getStart(), node.getEnd()]);
    }
    node.forEachChild(collect);
  };
  collect(sf);
}
const hasTranslator = (node) =>
  translated.some(([start, end]) => node.getStart() >= start && node.getEnd() <= end);

const messages = new Map();          // key -> ICU string
const edits = [];
const used = new Map();
const skipped = [];

// Seed the numbering from what the namespace already holds, so a re-run does
// not hand a second `body` to a different sentence.
{
  const cat = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));
  const node = namespace.split('.').reduce((o, k) => (o ?? {})[k], cat) ?? {};
  for (const key of Object.keys(node)) {
    const [, role, n] = /^([a-zA-Z]+?)(\d*)$/.exec(key) ?? [];
    if (role) used.set(role, Math.max(used.get(role) ?? 0, n ? Number(n) : 1));
  }
}
const nextKey = (role) => {
  const n = (used.get(role) ?? 0) + 1;
  used.set(role, n);
  return n === 1 ? role : `${role}${n}`;
};

// Props whose string value a visitor reads. `alt` is deliberately not here: it
// is mostly a brand name or a logo description, and capturing `alt="Eataly logo"`
// would put a company name in the translation catalogue.
const VISIBLE_PROP = new Set(['title', 'label', 'placeholder', 'aria-label']);

function visit(node) {
  if (ts.isJsxAttribute(node) && VISIBLE_PROP.has(node.name.getText())
      && node.initializer && ts.isStringLiteral(node.initializer)
      && /\p{L}/u.test(node.initializer.text) && node.initializer.text.trim().length > 2
      && hasTranslator(node)) {
    const key = nextKey(node.name.getText() === 'title' ? 'heading' : 'label');
    messages.set(key, decode(node.initializer.text).replace(/'(?=[<{])/g, '\u2019'));
    edits.push({ start: node.initializer.getStart(), end: node.initializer.getEnd(), text: `{t('${key}')}` });
    return;
  }

  if (ts.isJsxElement(node)) {
    const tag = tagOf(node);
    const hasWords = node.children.some((c) => ts.isJsxText(c) && /\p{L}/u.test(c.text));
    if (hasWords || node.children.some((c) => (ts.isJsxElement(c) || ts.isJsxSelfClosingElement(c)) && TAG_FOR[tagOf(c)])) {
      const tags = new Map();
      const icu = toIcu(node, tags, new Map());
      if (icu !== null && /\p{L}/u.test(icu) && icu.trim().length > 2 && hasTranslator(node)) {
        const key = nextKey(ROLE[tag] ?? 'text');
        // A straight apostrophe before a tag is an ICU escape, not an
        // apostrophe: `un'<b>x</b>` renders the tag as visible text with the
        // quote swallowed. The house style wants the curly one anyway, and
        // check:messages fails on the straight one.
        messages.set(key, icu.trim().replace(/'(?=[<{])/g, '\u2019'));
        const call = tags.size === 0
          ? `{t('${key}')}`
          : `{t.rich('${key}', {\n` +
            [...tags].map(([name, { tag: t, attrs }]) =>
              t === 'br'
                ? `          ${name}: () => <br />,`
                : `          ${name}: (chunks) => <${t}${attrs.length ? ' ' + attrs.join(' ') : ''}>{chunks}</${t}>,`,
            ).join('\n') + '\n        })}';
        const first = node.children[0];
        const last = node.children[node.children.length - 1];
        edits.push({ start: first.getStart(), end: last.getEnd(), text: call });
        return;                                  // do not descend into a captured unit
      }
      if (hasWords) {
        skipped.push(
          `${tag} at line ${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}` +
            (hasTranslator(node) ? '' : ' (no useTranslations in scope)'),
        );
      }
    }
  }
  node.forEachChild(visit);
}
visit(sf);

console.log(`${file}: ${messages.size} message(s), ${edits.length} rewrite(s)`);
if (skipped.length) {
  console.log(`\n── ${skipped.length} element(s) with words it would not capture ──`);
  console.log(skipped.map((s) => `  ${s}`).join('\n'));
}
if (!write) { console.log('\nDry run. Re-run with --write to apply.'); process.exit(0); }

const out = [...edits]
  .sort((a, b) => b.start - a.start)
  .reduce((text, e) => text.slice(0, e.start) + e.text + text.slice(e.end), src);
writeFileSync(join(ROOT, file), out);

for (const locale of ['en', 'it']) {
  const path = join(ROOT, `messages/${locale}.json`);
  const cat = JSON.parse(readFileSync(path, 'utf8'));
  const parts = namespace.split('.');
  const leaf = parts.pop();
  let n = cat;
  for (const seg of parts) { if (typeof n[seg] !== 'object' || n[seg] === null) n[seg] = {}; n = n[seg]; }
  n[leaf] = { ...(n[leaf] ?? {}) };
  const collisions = [];
  for (const [key, value] of messages) {
    if (n[leaf][key] !== undefined && n[leaf][key] !== value) collisions.push(key);
    n[leaf][key] = value;
  }
  if (collisions.length) {
    console.error(`\n[FAIL] ${collisions.length} key(s) already held a different value: ${collisions.join(', ')}`);
    process.exit(1);
  }
  writeFileSync(path, JSON.stringify(cat, null, 2) + '\n');
}
console.log('[written] the page and messages/{en,it}.json');

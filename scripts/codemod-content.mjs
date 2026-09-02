// codemod-content — moves a page's `content = { it: {…}, en: {…} }` tree into
// the catalogue.
//
// This is the other half of the copy, and the bigger one: 17 customer stories,
// 5 landing pages and 11 blog posts are written as two mirrored object trees
// with `const c = lang === 'it' ? content.it : content.en` at the top. Nothing
// in that shape is checkable — the two trees can drift in structure and only
// the Italian page notices, at runtime, as `undefined`.
//
// What it does:
//   1. Asserts the two trees have the same shape. A key on one side only is
//      reported, not silently dropped.
//   2. Writes both to messages/{en,it}.json under the given namespace.
//   3. Rewrites every `c.a.b` read as `t('a.b')`, and every read of an array as
//      `t.raw('a.b')` — so scalars stay checkable by check:i18n and only the
//      lists use the escape hatch.
//   4. Reunites the `headline: { before, highlight1, middle, highlight2, after }`
//      shape into one ICU message. That shape is a sentence split five ways so
//      two words could be coloured, which is exactly what a translator cannot
//      reorder.
//
// Usage:
//   node scripts/codemod-content.mjs <file> --namespace <ns> [--write]
//
// ponytail: migration scaffolding, deleted with the dictionary (#110).

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
  console.error('Usage: node scripts/codemod-content.mjs <file> --namespace <ns> [--write]');
  process.exit(1);
}
const [file] = files;

// ── Read the two trees ─────────────────────────────────────────────────────
const src = readFileSync(join(ROOT, file), 'utf8');
const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// ── JSX values ─────────────────────────────────────────────────────────────
// A content value is sometimes a fragment: a paragraph with <strong> around
// the numbers and <br /> between the halves. 217 of them across the stories,
// holding 714 inline <strong className="…">. They become one ICU message with
// tags, and the classes go back to the call site where they belong — a Tailwind
// class inside a message is markup a translator has to preserve by hand.
const INLINE = new Set(['br', 'span', 'strong', 'em', 'b', 'i', 'u', 'sup', 'sub', 'small', 'mark', 'a']);
const TAG_FOR = { strong: 'b', span: 's', em: 'i', b: 'b', i: 'i', u: 'u', sup: 'sup', sub: 'sub', small: 'sm', mark: 'm', a: 'a', br: 'br' };

/** Renders a JSX fragment into an ICU string plus the elements its tags stand
 *  for. Returns null if it contains anything that is not text or inline markup. */
// JSX text keeps its HTML entities in the AST — they are decoded by the JSX
// transform, not the parser. Writing `&amp;` into a JSON message makes React
// render the five characters, because a message is text, not markup.
const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0',
  mdash: '\u2014', ndash: '\u2013', middot: '\u00b7', hellip: '\u2026',
  rsquo: '\u2019', lsquo: '\u2018', rdquo: '\u201d', ldquo: '\u201c',
  eacute: '\u00e9', egrave: '\u00e8', agrave: '\u00e0', igrave: '\u00ec',
  ograve: '\u00f2', ugrave: '\u00f9',
};
const decodeEntities = (text) =>
  text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X'
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[body] ?? m;
  });

function renderJsx(node) {
  const chunks = [];
  const used = new Map();
  const byJsx = new Map();
  let icu = '';
  let ok = true;

  const nameFor = (tag, jsx) => {
    if (byJsx.has(jsx)) return byJsx.get(jsx);
    const base = TAG_FOR[tag] ?? tag;
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    const name = n === 1 ? base : `${base}${n}`;
    byJsx.set(jsx, name);
    return name;
  };

  const walk = (children) => {
    for (const child of children) {
      if (!ok) return;
      if (ts.isJsxText(child)) {
        if (!child.text.trim() && child.text.includes('\n')) continue;
        icu += decodeEntities(child.text).replace(/\s+/g, ' ');
      } else if (ts.isJsxSelfClosingElement(child)) {
        const tag = child.tagName.getText();
        if (!INLINE.has(tag)) { ok = false; return; }
        const jsx = child.getText();
        const name = nameFor(tag, jsx);
        icu += `<${name}></${name}>`;
        if (!chunks.some((c) => c.tag === name)) chunks.push({ tag: name, jsx });
      } else if (ts.isJsxElement(child)) {
        const tag = child.openingElement.tagName.getText();
        if (!INLINE.has(tag)) { ok = false; return; }
        const open = child.openingElement.getText();
        const name = nameFor(tag, open);
        icu += `<${name}>`;
        walk(child.children);
        icu += `</${name}>`;
        if (!chunks.some((c) => c.tag === name)) {
          chunks.push({ tag: name, jsx: open, close: child.closingElement.getText() });
        }
      } else if (ts.isJsxExpression(child) && child.expression && ts.isStringLiteral(child.expression)) {
        icu += child.expression.text;
      } else if (ts.isJsxFragment(child)) {
        walk(child.children);
      } else {
        ok = false;
        return;
      }
    }
  };

  walk(ts.isJsxFragment(node) ? node.children : node.children ?? []);
  return ok ? { icu: icu.replace(/\s+/g, ' ').trim(), chunks } : null;
}

const value = (node) => {
  if (ts.isJsxFragment(node) || ts.isJsxElement(node)) {
    const r = renderJsx(node);
    return r ? { __jsx: r } : undefined;
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(value);
  if (ts.isObjectLiteralExpression(node)) {
    const out = {};
    for (const p of node.properties) {
      if (!ts.isPropertyAssignment(p)) return undefined;
      const v = value(p.initializer);
      // A property whose value is not data — `icon: Eye` — is structure. It
      // cannot go in the catalogue (JSON has no components) and it cannot be
      // dropped (the page renders <s.icon />), so it is marked and kept.
      out[p.name.text] = v === undefined ? { __code: p.initializer.getText() } : v;
    }
    return out;
  }
  return undefined; // a call, a spread — not copy and not a plain reference
};

let decl = null;
for (const stmt of sf.statements) {
  if (!ts.isVariableStatement(stmt)) continue;
  for (const d of stmt.declarationList.declarations) {
    if (!ts.isIdentifier(d.name) || !d.initializer) continue;
    if (!ts.isObjectLiteralExpression(d.initializer)) continue;
    const keys = d.initializer.properties.map((p) => p.name?.text);
    if (keys.length === 2 && keys.includes('it') && keys.includes('en')) decl = d;
  }
}
if (!decl) {
  console.error(`${file}: no \`const … = { it: {…}, en: {…} }\` declaration.`);
  process.exit(1);
}

const trees = value(decl.initializer);
if (!trees || !trees.en || !trees.it) {
  console.error(`${file}: the trees contain something that is not data (an identifier or a call).`);
  process.exit(1);
}

// ── Shape parity ───────────────────────────────────────────────────────────
const shape = (node, path = '') => {
  if (node && typeof node === 'object' && (node.__jsx || node.__code)) return [path];
  if (Array.isArray(node)) return node.flatMap((v, i) => shape(v, `${path}[${i}]`));
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  }
  return [path];
};
const enPaths = shape(trees.en);
const itPaths = shape(trees.it);
const onlyEn = enPaths.filter((p) => !itPaths.includes(p));
const onlyIt = itPaths.filter((p) => !enPaths.includes(p));
if (onlyEn.length || onlyIt.length) {
  console.error(`${file}: the two trees are not the same shape.`);
  for (const p of onlyEn) console.error(`  en only: ${p}`);
  for (const p of onlyIt) console.error(`  it only: ${p}`);
  process.exit(1);
}

// ── Which paths are arrays: those reads become t.raw ───────────────────────
const arrayPaths = new Set();
const collectArrays = (node, path = '') => {
  if (node && typeof node === 'object' && (node.__jsx || node.__code)) return;
  if (Array.isArray(node)) { arrayPaths.add(path); node.forEach((v) => collectArrays(v, path)); return; }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) collectArrays(v, path ? `${path}.${k}` : k);
  }
};
collectArrays(trees.en);

// Every path that names a subtree rather than a leaf. Reading one is
// `{c.solution.streams && …}` — a presence test for a section not every story
// has — or a .map over it.
const objectPaths = new Set();
const collectObjects = (node, path = '') => {
  if (!node || typeof node !== 'object' || node.__jsx || node.__code) return;
  if (path) objectPaths.add(path);
  for (const [k, v] of Object.entries(node)) collectObjects(v, path ? `${path}.${k}` : k);
};
collectObjects(trees.en);

// ── The headline fragments ─────────────────────────────────────────────────
// `{ before, highlight1, middle, highlight2, after }` is one sentence written
// as five keys. It becomes one message with <hl> tags.
// `{ before, highlight1, middle, highlight2, after }` — and, on the Mediaset
// stories, a `highlight3` as well. One sentence written as five or six keys so
// two or three phrases could be coloured. The parts are joined in the order the
// object declares them, not in a fixed order, because that is the order the JSX
// renders them in.
const HEADLINE_PART = /^(before|middle\d*|after\d*|highlight\d*)$/;
const headlines = [];
const findHeadlines = (node, path = '') => {
  if (!node || typeof node !== 'object' || Array.isArray(node) || node.__jsx || node.__code) return;
  const keys = Object.keys(node);
  if (
    keys.length >= 3 &&
    keys.every((k) => HEADLINE_PART.test(k) && typeof node[k] === 'string') &&
    keys.some((k) => k.startsWith('highlight'))
  ) {
    headlines.push(path);
    return;
  }
  for (const [k, v] of Object.entries(node)) findHeadlines(v, path ? `${path}.${k}` : k);
};
findHeadlines(trees.en);

const joinHeadline = (tree, path) => {
  const node = path.split('.').reduce((n, s) => n[s], tree);
  let out = '';
  let n = 0;
  for (const [part, text] of Object.entries(node)) {
    if (!text) continue;
    if (part.startsWith('highlight')) {
      n += 1;
      const tag = n === 1 ? 'hl' : `hl${n}`;
      out += `<${tag}>${text}</${tag}>`;
    } else {
      out += text;
    }
  }
  return out;
};

// ── Build the catalogue ────────────────────────────────────────────────────
// Arrays stay arrays: the catalogue mirrors the shape the page already reads
// with .map(), and `heroMetrics.0.value` is not a key anyone would write by
// hand. check:messages asserts the two locales' arrays are the same length.
// path -> the chunk elements a rich message's tags stand for.
const richChunks = new Map();

// An array whose elements hold a component reference cannot move to the
// catalogue whole: JSON has no <Eye />. It is split — the structure stays in
// the page keyed by an id, and only the copy moves.
const STOP = new Set(['of','the','a','an','to','and','in','for','with','are','is','on','your','our','che','di','il','la','le','i','e','un','una','per','con','su','da']);
const idFrom = (text, taken) => {
  const words = String(text).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
    .filter((w) => w && !STOP.has(w)).slice(0, 3);
  let base = words.map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1))).join('') || 'item';
  if (/^[0-9]/.test(base)) base = `n${base}`;
  let id = base;
  for (let n = 2; taken.has(id); n += 1) id = `${base}${n}`;
  taken.add(id);
  return id;
};

const isCode = (v) => v && typeof v === 'object' && v.__code;
const impureArrays = new Map(); // path -> { ids, structural: Set<prop> }
const findImpure = (node, path = '') => {
  if (Array.isArray(node)) {
    const structural = new Set();
    let impure = false;
    for (const el of node) {
      if (!el || typeof el !== 'object') continue;
      for (const [k, v] of Object.entries(el)) {
        if (isCode(v)) { structural.add(k); impure = true; }
        // A JSX value cannot sit inside a raw array either: it has to become
        // its own rich message, which means the row needs an id.
        if (v && typeof v === 'object' && v.__jsx) impure = true;
      }
    }
    if (impure) {
      // A field only some rows have. Reading it used to yield undefined and
      // render nothing; t() on a missing key renders the key path instead.
      const optionalProps = new Set();
      const allProps = new Set(node.flatMap((el) => Object.keys(el ?? {})));
      for (const k of allProps) {
        if (!node.every((el) => el && el[k] !== undefined)) optionalProps.add(k);
      }
      const taken = new Set();
      const ids = node.map((el) => {
        const copy = Object.entries(el).find(([k, v]) => !structural.has(k) && typeof v === 'string');
        return idFrom(copy ? copy[1] : 'item', taken);
      });
      impureArrays.set(path, { ids, structural, optionalProps, allProps });
      return;
    }
    node.forEach((v) => findImpure(v, path));
    return;
  }
  if (node && typeof node === 'object' && !node.__jsx && !node.__code) {
    for (const [k, v] of Object.entries(node)) findImpure(v, path ? `${path}.${k}` : k);
  }
};
findImpure(trees.en);

const flatten = (node, path, into, locale) => {
  if (impureArrays.has(path) && Array.isArray(node)) {
    const { ids, structural } = impureArrays.get(path);
    node.forEach((el, i) => {
      for (const [k, v] of Object.entries(el)) {
        if (structural.has(k)) continue;
        flatten(v, `${path}.${ids[i]}.${k}`, into, locale);
      }
    });
    return;
  }
  if (node && typeof node === 'object' && node.__code) return;
  if (node && typeof node === 'object' && node.__jsx) {
    into[path] = node.__jsx.icu;
    // Merge the two locales' chunks. The Italian sometimes breaks a label the
    // English does not; the message differs, the rendering of each stays what
    // it is, and t.rich simply needs a chunk for every tag either one uses.
    const existing = richChunks.get(path) ?? [];
    for (const c of node.__jsx.chunks) {
      if (!existing.some((e) => e.tag === c.tag)) existing.push(c);
    }
    richChunks.set(path, existing);
    return;
  }
  if (node && typeof node === 'object' && !Array.isArray(node)) {
    for (const [k, v] of Object.entries(node)) flatten(v, path ? `${path}.${k}` : k, into, locale);
  } else {
    into[path] = node;
  }
};
const catalogue = { en: {}, it: {} };
for (const locale of ['en', 'it']) flatten(trees[locale], '', catalogue[locale], locale);
for (const path of headlines) {
  for (const locale of ['en', 'it']) {
    for (const key of Object.keys(catalogue[locale])) {
      if (key.startsWith(`${path}.`)) delete catalogue[locale][key];
    }
    catalogue[locale][path] = joinHeadline(trees[locale], path);
  }
}

// An empty string in both locales is not a translation — check:messages says so
// — and it is not copy either. It is a field the page reads and renders as
// nothing. It stays nothing, at the call site.
const emptyPaths = new Set(
  Object.keys(catalogue.en).filter((k) => catalogue.en[k] === '' && catalogue.it[k] === ''),
);
for (const k of emptyPaths) { delete catalogue.en[k]; delete catalogue.it[k]; }

// The two locales duplicate the same markup by hand, so they can disagree about
// it. A tag in one and not the other means one language renders a fragment the
// other does not.
const tagsIn = (icu) => [...icu.matchAll(/<\/?([a-z][a-z0-9]*)>/g)].map((m) => m[1]).sort().join(',');
const tagMismatch = Object.keys(catalogue.en)
  .filter((k) => richChunks.has(k) && tagsIn(catalogue.en[k]) !== tagsIn(catalogue.it[k]))
  .map((k) => `  ${k}: en <${tagsIn(catalogue.en[k])}> vs it <${tagsIn(catalogue.it[k])}>`);
if (tagMismatch.length) {
  console.log(`  ${tagMismatch.length} message(s) where the two locales break differently:`);
  console.log(tagMismatch.join('\n'));
  console.log('  Both keep what they render today; the chunk map covers either.');
}

// A structural value that differs between the locales is a different matter.
// It is taken from the English tree, so the Italian page would silently render
// the English one — a different icon, from a different import.
const codePaths = (node, path = '') => {
  if (!node || typeof node !== 'object') return [];
  if (node.__code) return [[path, node.__code]];
  if (node.__jsx) return [];
  return Object.entries(node).flatMap(([k, v]) => codePaths(v, path ? `${path}.${k}` : k));
};
const itCode = new Map(codePaths(trees.it));
const codeMismatch = codePaths(trees.en)
  .filter(([p, v]) => itCode.has(p) && itCode.get(p) !== v)
  .map(([p, v]) => `  ${p}: en ${v} vs it ${itCode.get(p)}`);
// Not an error: the icons are structure, and structure is allowed to differ.
// But it is almost always drift — six icons on one page changed in English and
// not in Italian — so it is reported loudly and the table keeps both, rather
// than the English set silently becoming the Italian one too.
const localeSplit = new Set(codeMismatch.map((l) => l.trim().split(':')[0].split('.').slice(0, -2).join('.')));
if (codeMismatch.length) {
  console.log(`  ${codeMismatch.length} place(s) where the two locales use different components:`);
  console.log(codeMismatch.join('\n'));
  console.log('  Kept per locale, so nothing changes on the page. Almost certainly drift — worth a look.');
}

// ── Rewrite the source ─────────────────────────────────────────────────────
// The binding the page reads the tree through, e.g. `const c = lang === 'it' …`.
let binding = null;
const findBinding = (node) => {
  if (
    ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer &&
    ts.isConditionalExpression(node.initializer) &&
    node.initializer.getText().includes(`${decl.name.text}.it`)
  ) binding = node;
  ts.forEachChild(node, findBinding);
};
findBinding(sf);
if (!binding) {
  console.error(`${file}: found the trees but not the \`const c = lang === 'it' ? …\` that reads them.`);
  process.exit(1);
}
const bindingName = binding.name.text;

// Every `c.a.b…` chain, longest first so the outer replacement wins.
const reads = [];
const findReads = (node) => {
  if (
    ts.isPropertyAccessExpression(node) &&
    !ts.isPropertyAccessExpression(node.parent)
  ) {
    const parts = [];
    let cur = node;
    while (ts.isPropertyAccessExpression(cur)) { parts.unshift(cur.name.text); cur = cur.expression; }
    if (ts.isIdentifier(cur) && cur.text === bindingName) {
      reads.push({ node, parts });
    }
  }
  ts.forEachChild(node, findReads);
};
findReads(sf);

const optional = [];
const replacements = [];

// ── The structural half of an impure array ─────────────────────────────────
// `objectives.items` becomes a module-level table of ids and components, and
// the copy is read by id. The page keeps its <s.icon />; the catalogue keeps
// the words.
const tableName = (path) => path.replace(/\./g, '_').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
const tables = [];
const perLocaleTables = new Set();
for (const [path, { ids, structural }] of impureArrays) {
  const rowsFor = (locale) => {
    const node = path.split('.').reduce((n, seg) => n[seg], trees[locale]);
    return node.map((el, i) => {
      const props = [`id: '${ids[i]}'`];
      for (const k of structural) if (el[k]) props.push(`${k}: ${el[k].__code}`);
      return `    { ${props.join(', ')} },`;
    });
  };
  const en = rowsFor('en');
  const it = rowsFor('it');
  if (en.join('\n') === it.join('\n')) {
    tables.push(`const ${tableName(path)} = [\n${en.map((r) => r.slice(2)).join('\n')}\n];`);
  } else {
    perLocaleTables.add(path);
    tables.push(
      `// The two locales use different components here. Both are kept, so the\n` +
      `// page renders what it renders today — see the Issue.\n` +
      `const ${tableName(path)} = {\n  en: [\n${en.join('\n')}\n  ],\n  it: [\n${it.join('\n')}\n  ],\n};`);
  }
}

// A destructured callback — `.map(({ icon: Icon, value, label }) => …)` — takes
// the copy properties out of scope entirely, and there is nothing left to
// rewrite into a catalogue read. It is reported rather than half-transformed.
{
  const bad = [];
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'map'
    ) {
      const path = node.expression.expression.getText().replace(`${bindingName}.`, '');
      const cb = node.arguments[0];
      if (
        impureArrays.has(path) && cb &&
        (ts.isArrowFunction(cb) || ts.isFunctionExpression(cb)) &&
        cb.parameters[0] && !ts.isIdentifier(cb.parameters[0].name)
      ) bad.push(`  ${path}: ${cb.parameters[0].getText()}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (bad.length) {
    console.error(`${file}: ${bad.length} map callback(s) destructure a list whose copy is moving.`);
    console.error(bad.join('\n'));
    console.error('  Give the callback a plain parameter first, so the copy reads can be rewritten.');
    process.exit(1);
  }
}

// `X.map((s) => …)` where X is one of those arrays: which param reads it.
const paramFor = (node, param, path) => {
  for (let n = node.parent; n; n = n.parent) {
    if (!ts.isArrowFunction(n) && !ts.isFunctionExpression(n)) continue;
    const first = n.parameters[0];
    if (!first || !ts.isIdentifier(first.name) || first.name.text !== param) return false;
    const call = n.parent;
    return !!(call && ts.isCallExpression(call) &&
      ts.isPropertyAccessExpression(call.expression) &&
      call.expression.name.text === 'map' &&
      call.expression.expression.getText() === `${bindingName}.${path}`);
  }
  return false;
};
const handled = [];

// The two places a reunited headline is read, both identical across the 16
// customer stories. They are matched on the source text rather than the AST
// because what has to be replaced is a run of siblings, not one node — but the
// offsets are the same coordinates, so they join the same replacement list.
for (const path of headlines) {
  const p = path.replace(/\./g, '\\.');
  const b = bindingName;

  // {c.h.before}<span …>{c.h.highlight1}</span>{c.h.middle}<span …>{c.h.highlight2}</span>{c.h.after}
  // The whole run of {c.h.part} reads and the wrappers between them, however
  // many highlights the story has.
  // A highlight is sometimes guarded — `{c.h.highlight3 && <span>…</span>}` —
  // because not every story has a third one. Both forms are part of the run.
  const run = new RegExp(
    `(?:\\{${b}\\.${p}\\.(?:before|middle\\d*|after\\d*)\\}|` +
    `<(\\w+)[^>]*>\\{${b}\\.${p}\\.highlight\\d*\\}</\\1>|` +
    `\\{${b}\\.${p}\\.highlight\\d* && <(\\w+)[^>]*>\\{${b}\\.${p}\\.highlight\\d*\\}</\\2>\\})+`, 'g');
  for (const m of src.matchAll(run)) {
    if (!m[0].includes('highlight')) continue;
    const wrappers = [...m[0].matchAll(/(<(\w+)[^>]*>)\{[^}]*\.highlight\d*\}<\/\2>/g)];
    if (wrappers.length === 0) continue;
    const chunkLines = wrappers.map((w, i) => {
      const tag = i === 0 ? 'hl' : `hl${i + 1}`;
      return `                      ${tag}: (chunks) => ${w[1]}{chunks}</${w[2]}>,`;
    });
    replacements.push({
      start: m.index,
      end: m.index + m[0].length,
      text: `{t.rich('${path}', {\n${chunkLines.join('\n')}\n                    })}`,
    });
    handled.push(`${path} (rendered, ${wrappers.length} highlight${wrappers.length > 1 ? 's' : ''})`);
  }

  // `${c.h.before}${c.h.highlight1}${c.h.middle || ''}…` — the same sentence,
  // reassembled for a <title>, where the tags must not appear.
  const meta = new RegExp(
    `(?:\\$\\{${b}\\.${p}\\.\\w+(?: \\|\\| '')?\\}){2,}`, 'g');
  for (const m of src.matchAll(meta)) {
    replacements.push({
      start: m.index,
      end: m.index + m[0].length,
      text: `\${t('${path}').replace(/<\\/?hl\\d*>/g, '')}`,
    });
    handled.push(`${path} (title)`);
  }
}
const handledRanges = replacements.map((r) => [r.start, r.end]);
for (const { node, parts } of reads) {
  // A trailing method (.map, .length, .slice) is not part of the key.
  const trailing = [];
  const path = [...parts];
  while (path.length && !(path.join('.') in catalogue.en) && !arrayPaths.has(path.join('.')) &&
         !objectPaths.has(path.join('.')) && !headlines.includes(path.join('.'))) {
    trailing.unshift(path.pop());
  }
  const key = path.join('.');
  if (!key) {
    // A path no story in this file has — the guard exists for the ones that do.
    // It still becomes a catalogue read, on the full path.
    const full = parts.join('.');
    optional.push(full);
    replacements.push({
      start: node.getStart(),
      end: node.getEnd(),
      text: `t.has('${full}')`,
    });
    continue;
  }
  // A read of a reunited headline's parts — `c.headline.before` — has no key
  // any more. Emitting `t('headline').before` would compile and render
  // undefined, so it is reported instead.
  if (headlines.includes(key) && trailing.length) {
    // Already covered by one of the two whole-run replacements above?
    const inside = handledRanges.some(([a, b]) => node.getStart() >= a && node.getEnd() <= b);
    if (!inside) optional.push(parts.join('.'));
    continue;
  }
  // `{c.x && …}` is a presence test, and t.has is what that is.
  const isGuard =
    ts.isBinaryExpression(node.parent) &&
    node.parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken &&
    node.parent.left === node;

  if (emptyPaths.has(key) && !trailing.length) {
    replacements.push({ start: node.getStart(), end: node.getEnd(), text: "''" });
    continue;
  }

  const chunks = richChunks.get(key);
  const call = isGuard
    ? `t.has('${key}')`
    : chunks
    ? `t.rich('${key}', {\n` +
      chunks.map((c) => c.close
        ? `    ${c.tag}: (chunks) => ${c.jsx}{chunks}${c.close},`
        // A self-closing chunk has nothing to wrap, so it takes no argument.
        : `    ${c.tag}: () => ${c.jsx},`).join('\n') +
      `\n  })`
    : impureArrays.has(key)
      ? (perLocaleTables.has(key) ? `(${tableName(key)}[lang] ?? ${tableName(key)}.en)` : tableName(key))
    : arrayPaths.has(key) || objectPaths.has(key) ? `t.raw('${key}')` : `t('${key}')`;
  replacements.push({
    start: node.getStart(),
    end: node.getEnd(),
    text: trailing.length ? `${call}.${trailing.join('.')}` : call,
  });
}

// `s.text` inside `c.objectives.items.map(s => …)`.
{
  const visit = (node) => {
    if (
      ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text !== bindingName
    ) {
      for (const [path, { structural, optionalProps, allProps }] of impureArrays) {
        if (structural.has(node.name.text)) continue;
        if (!paramFor(node, node.expression.text, path)) continue;
        const param = node.expression.text;
        const key = `${path}.${impureArrays.get(path).ids[0]}.${node.name.text}`;
        const chunks = richChunks.get(key);
        const tpl = '`' + path + '.${' + param + '.id}.' + node.name.text + '`';
        replacements.push({
          start: node.getStart(),
          end: node.getEnd(),
          // A field some rows lack, or that no row has at all — a defensive
          // read the tree never satisfied. `undefined` rendered nothing; a
          // missing key renders its own path.
          text: optionalProps.has(node.name.text) || !allProps.has(node.name.text)
            ? (ts.isBinaryExpression(node.parent) &&
               node.parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken &&
               node.parent.left === node
                 ? `t.has(${tpl})`
                 : `(t.has(${tpl}) ? t(${tpl}) : '')`)
            : chunks
            ? `t.rich(${tpl}, {\n` +
              chunks.map((c) => c.close
                ? `    ${c.tag}: (chunks) => ${c.jsx}{chunks}${c.close},`
                : `    ${c.tag}: () => ${c.jsx},`).join('\n') + `\n  })`
            : `t(${tpl})`,
        });
        break;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

let out = src;
for (const r of replacements.sort((a, b) => b.start - a.start)) {
  out = out.slice(0, r.start) + r.text + out.slice(r.end);
}

// Drop the trees and the binding, by whole lines.
//
// getFullStart() includes the leading trivia, which is the PREVIOUS line's
// newline — deleting from there joins the line above to the line below, and the
// next rewrite then fails to match a statement that is no longer on its own
// line. Cutting from the start of the statement's own line avoids that.
const dropStatement = (node) => {
  let s = node;
  while (s.parent && !ts.isSourceFile(s.parent) && !ts.isBlock(s.parent)) s = s.parent;
  return s;
};
const lineCuts = [decl, binding].map(dropStatement).map((node) => {
  const from = out.lastIndexOf('\n', node.getStart()) + 1;
  const to = out.indexOf('\n', node.getEnd() - 1) + 1;
  return { from, to: to === 0 ? out.length : to };
});
for (const { from, to } of lineCuts.sort((a, b) => b.from - a.from)) {
  out = out.slice(0, from) + out.slice(to);
}
if (tables.length) {
  const at = out.indexOf('\nexport default function');
  const head = '// Structure the catalogue cannot hold: ids and the components the page\n' +
               '// renders for each row. The words that went with them are in messages/.\n';
  out = out.slice(0, at + 1) + head + tables.join('\n\n') + '\n\n' + out.slice(at + 1);
}

if (!/from 'next-intl'/.test(out)) {
  out = out.replace(/(^import .*\n)/m, `$1import { useTranslations } from 'next-intl';\n`);
} else if (!/useTranslations/.test(out)) {
  out = out.replace(/import \{ ([^}]*) \} from 'next-intl';/, `import { $1, useTranslations } from 'next-intl';`);
}
// `t` used to come from useLanguage(); it comes from next-intl now, and leaving
// both in scope is a duplicate declaration, not a fallback. Rewrite the line in
// place — dropping it and re-inserting elsewhere is how the next statement ends
// up glued to the end of this one.
let hooked = false;
out = out.replace(/^([ \t]*)const \{([^}]*)\} = useLanguage\(\);[ \t]*$/m, (m, indent, names) => {
  hooked = true;
  const kept = names.split(',').map((n) => n.trim()).filter((n) => n && n !== 't');
  const hook = `${indent}const t = useTranslations('${namespace}');`;
  return kept.length ? `${indent}const { ${kept.join(', ')} } = useLanguage();\n${hook}` : hook;
});
if (!hooked) {
  out = out.replace(/^([ \t]*)(const lang = useLocale\(\);)[ \t]*$/m, (m, indent, line) => {
    hooked = true;
    return `${indent}${line}\n${indent}const t = useTranslations('${namespace}');`;
  });
}
if (!hooked) {
  out = out.replace(/^(export default function \w+\([^)]*\) \{[ \t]*\n)/m,
    `$1  const t = useTranslations('${namespace}');\n`);
}
// The import is dead once nothing reads useLanguage().
if (!/useLanguage\(\)/.test(out)) {
  out = out.replace(/^import \{ useLanguage \} from '@\/i18n\/LanguageContext';\n/m, '');
}

// ── Leftover dictionary calls over the tree's own data ─────────────────────
// `{t(s.headline)}` inside `related.stories.map(...)`. The value in the tree is
// already the translated one — the wrapper looked it up in the dictionary,
// missed, and got its own argument back. Harmless while `t` was the dictionary;
// a MISSING_MESSAGE the moment `t` is next-intl.
const unwrapped = [];
{
  const sf2 = ts.createSourceFile(file, out, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const cuts = [];
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) && node.expression.text === 't' &&
      node.arguments.length === 1 &&
      ts.isPropertyAccessExpression(node.arguments[0]) &&
      ts.isIdentifier(node.arguments[0].expression)
    ) {
      const arg = node.arguments[0];
      // Only a parameter of a .map over a t.raw(...) list — never `t.rich`'s
      // chunks, and never a real key.
      for (let n = node.parent; n; n = n.parent) {
        if (!ts.isArrowFunction(n) && !ts.isFunctionExpression(n)) continue;
        const first = n.parameters[0];
        if (!first || !ts.isIdentifier(first.name) || first.name.text !== arg.expression.text) break;
        const call = n.parent;
        if (
          call && ts.isCallExpression(call) &&
          ts.isPropertyAccessExpression(call.expression) &&
          call.expression.name.text === 'map' &&
          /\bt\.raw\(/.test(call.expression.expression.getText())
        ) {
          cuts.push({ start: node.getStart(), end: node.getEnd(), text: arg.getText() });
          unwrapped.push(arg.getText());
        }
        break;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf2);
  for (const c of cuts.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, c.start) + c.text + out.slice(c.end);
  }
}

// ── Report / write ─────────────────────────────────────────────────────────
console.log(`${file}: ${Object.keys(catalogue.en).length} message(s), ${headlines.length} headline(s) reunited, ${replacements.length} read(s) rewritten`);
if (handled.length) console.log(`  headline sites: ${handled.join(', ')}`);
if (unwrapped.length) {
  console.log(`  unwrapped ${unwrapped.length} dictionary call(s) over the tree's own data: ${[...new Set(unwrapped)].join(', ')}`);
}
if (optional.length) {
  console.log(`\n── ${optional.length} read(s) of a path this story does not have ──`);
  console.log([...new Set(optional)].map((u) => `  ${bindingName}.${u}`).join('\n'));
  console.log('  Rewritten as t.has(); the guard around them is why they exist.');
}

if (!write) {
  console.log('\nDry run. Re-run with --write to apply.');
  process.exit(0);
}

writeFileSync(join(ROOT, file), out);
for (const locale of ['en', 'it']) {
  const path = join(ROOT, `messages/${locale}.json`);
  const d = JSON.parse(readFileSync(path, 'utf8'));
  const collisions = [];
  for (const [dotted, v] of Object.entries(catalogue[locale])) {
    const parts = `${namespace}.${dotted}`.split('.');
    const leaf = parts.pop();
    let n = d;
    for (const seg of parts) {
      if (typeof n[seg] !== 'object' || n[seg] === null || Array.isArray(n[seg])) n[seg] = {};
      n = n[seg];
    }
    if (n[leaf] !== undefined && n[leaf] !== v) collisions.push(dotted);
    n[leaf] = v;
  }
  if (collisions.length) {
    console.error(`\n[FAIL] ${collisions.length} key(s) already held a different value:`);
    console.error([...new Set(collisions)].map((c) => `  ${c}`).join('\n'));
    process.exit(1);
  }
  const ordered = Object.fromEntries(
    ['common', ...Object.keys(d).filter((k) => k !== 'common').sort()].map((k) => [k, d[k]]));
  writeFileSync(path, JSON.stringify(ordered, null, 2) + '\n');
}
console.log('[written] the page and messages/{en,it}.json');

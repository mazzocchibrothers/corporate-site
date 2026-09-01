// codemod-i18n — moves a file's copy out of the code and into the catalogue.
//
// It does three things a person doing this by hand gets wrong at scale:
//
//   1. Reunites fragments. 431 of the 935 dictionary keys are pieces of a
//      sentence, split only so one word could be coloured. `{t('Every talent
//      decision, from hiring to transformation, is')} <span>{t('finally the
//      right one')}</span>` is ONE sentence, and Italian cannot reorder it
//      while it is two keys — the word order is welded into the JSX. The
//      codemod emits one message with tags and a t.rich() call.
//   2. Carries the Italian across, from i18n/translations.ts, keyed on the
//      English string that was the key. The result renders exactly what the
//      site renders today; what changes is that it is now fixable.
//   3. Reports every call it cannot resolve instead of skipping it. 139 of the
//      544 calls are `t(card.title)` — the string is in a data array, not at
//      the call site, and no static scan can follow it.
//
// Usage:
//   node scripts/codemod-i18n.mjs <file...> --namespace <ns>          # dry run
//   node scripts/codemod-i18n.mjs <file...> --namespace <ns> --write
//
// Idempotent by construction: it only ever transforms `t('literal')` calls
// bound to useLanguage(). After --write there are none left in the file, so a
// second run reports "nothing to do" and writes nothing.
//
// ponytail: migration scaffolding. Delete it with i18n/translations.ts (#110).

import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Inline formatting: the elements a sentence may contain and still be one
// sentence. Anything else is a structural boundary, and two messages.
const INLINE = new Set(['br', 'span', 'em', 'strong', 'b', 'i', 'u', 'sup', 'sub', 'small', 'mark']);

// The unit's own element decides what the message IS, which is what makes the
// key semantic rather than a slug of the English.
const ROLE = {
  h1: 'heading', h2: 'heading', h3: 'heading', h4: 'heading', h5: 'heading', h6: 'heading',
  p: 'body', li: 'item', button: 'cta', a: 'link', label: 'label',
  blockquote: 'quote', figcaption: 'caption', th: 'columnHeader', td: 'cell',
};

// ── The Italian dictionary, read the same way check-i18n reads it ───────────
const ENTRY =
  /^ {2}('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*:\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*,?\s*$/;
const decode = (quoted) => quoted.slice(1, -1).replace(/\\(['"\\])/g, '$1');

function loadItalian() {
  const map = new Map();
  for (const line of readFileSync(join(ROOT, 'i18n/translations.ts'), 'utf8').split('\n')) {
    const m = ENTRY.exec(line);
    if (m) map.set(decode(m[1]), decode(m[2]));
  }
  return map;
}

// ── Parsing ────────────────────────────────────────────────────────────────
const parse = (file, src) =>
  ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

const tagOf = (node) => node.openingElement?.tagName.getText() ?? node.tagName?.getText() ?? '';
const bareTag = (name) => name.replace(/^.*\./, '');

const isTCall = (node) =>
  ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 't';

const literalArg = (call) => {
  const [arg] = call.arguments;
  return arg && ts.isStringLiteral(arg) ? arg.text : null;
};

/** Children that carry meaning: whitespace-only JSX text is layout, not copy. */
const meaningful = (children) =>
  children.filter((c) => !(ts.isJsxText(c) && !c.text.trim()));

/**
 * A message unit is the outermost element whose whole subtree is one sentence:
 * text, t() calls, and inline formatting. An element containing a component or
 * a block child is a boundary — recurse past it rather than swallowing the
 * layout into a message.
 */
function isUnit(node) {
  let hasT = false;
  let ok = true;

  // Only children are walked, never `forEachChild`: a JSX element's attributes
  // are JsxExpressions too, and `initial={{ opacity: 0 }}` would otherwise be
  // read as logic inside the sentence and disqualify every animated heading on
  // the site — which is most of them.
  const walk = (children, depth) => {
    for (const child of children) {
      if (!ok) return;
      if (ts.isJsxText(child)) continue;
      if (ts.isJsxSelfClosingElement(child)) {
        if (!INLINE.has(bareTag(tagOf(child)))) ok = false;
      } else if (ts.isJsxElement(child)) {
        if (!INLINE.has(bareTag(tagOf(child)))) { ok = false; return; }
        walk(child.children, depth + 1);
      } else if (ts.isJsxExpression(child) && child.expression) {
        if (isTCall(child.expression)) {
          hasT = true;
          // A dynamic call cannot be resolved statically. It is reported, and
          // it disqualifies the unit rather than being dropped from it.
          if (literalArg(child.expression) === null) ok = false;
        } else if (!(ts.isStringLiteral(child.expression) && !child.expression.text.trim())) {
          // `{' '}` is a space. Anything else is logic, and logic is a boundary.
          ok = false;
        }
      } else if (ts.isJsxFragment(child)) {
        walk(child.children, depth + 1);
      } else {
        ok = false;
      }
    }
  };

  walk(node.children, 0);
  return ok && hasT;
}

/**
 * Flattens a unit into an ICU message plus the chunk elements its tags stand
 * for. Returns { en, it, chunks: [{tag, jsx}] } or null if a fragment has no
 * Italian and none can be inferred.
 */
function renderUnit(node, italian, report) {
  const chunks = [];
  const used = new Map();
  let en = '';
  let it = '';

  // One tag per distinct element, not per occurrence: two identical <br />s
  // are the same tag, because next-intl maps a tag name to one chunk function
  // and a message may use it as often as it likes. <br2> would only be noise a
  // translator has to preserve.
  const byJsx = new Map();
  const nameFor = (tag, jsx) => {
    if (byJsx.has(jsx)) return byJsx.get(jsx);
    const n = (used.get(tag) ?? 0) + 1;
    used.set(tag, n);
    const name = n === 1 ? tag : `${tag}${n}`;
    byJsx.set(jsx, name);
    return name;
  };

  const emit = (text, itText) => { en += text; it += itText ?? text; };

  const walk = (children) => {
    for (const child of children) {
      if (ts.isJsxText(child)) {
        // JSX drops whitespace-only text that spans a line break — it is
        // indentation, not a space. Emitting one anyway inserts a space the
        // page does not render, in every locale.
        if (!child.text.trim() && child.text.includes('\n')) continue;
        emit(child.text.replace(/\s+/g, ' '));
      } else if (ts.isJsxExpression(child) && child.expression) {
        if (isTCall(child.expression)) {
          const english = literalArg(child.expression);
          const translated = italian.get(english);
          if (translated === undefined) {
            report.untranslated.push(english);
          }
          emit(english, translated ?? english);
        } else if (ts.isStringLiteral(child.expression)) {
          emit(child.expression.text);
        }
      } else if (ts.isJsxSelfClosingElement(child)) {
        const jsx = child.getText();
        const tag = nameFor(bareTag(tagOf(child)), jsx);
        emit(`<${tag}></${tag}>`);
        if (!chunks.some((c) => c.tag === tag)) chunks.push({ tag, jsx });
      } else if (ts.isJsxElement(child)) {
        const tag = nameFor(bareTag(tagOf(child)), child.openingElement.getText());
        en += `<${tag}>`; it += `<${tag}>`;
        walk(child.children);
        en += `</${tag}>`; it += `</${tag}>`;
        if (!chunks.some((c) => c.tag === tag)) {
          chunks.push({
            tag,
            jsx: child.openingElement.getText(),
            close: child.closingElement.getText(),
          });
        }
      }
    }
  };

  walk(node.children);
  return { en: en.trim(), it: it.trim(), chunks };
}

// ── Key naming ─────────────────────────────────────────────────────────────
/**
 * `components/product/ProductHero.tsx` under namespace `product` becomes
 * `hero`; `pages/careers.tsx` under `careers` becomes nothing, so its keys sit
 * directly on the namespace. Keys are what the message IS — heading, body,
 * cta — not a slug of the English, which is the thing being removed.
 */
function scopeOf(file, namespace) {
  const name = basename(file).replace(/\.tsx?$/, '');
  if (name === 'index') return '';
  // `ProductHero` under namespace `product-overview` is the overview page's
  // hero, so it is `hero` — repeating the page's own name inside its namespace
  // is noise the key has to carry forever.
  const words = namespace.split('.').pop().split('-');
  let stripped = name;
  for (const word of words) {
    stripped = stripped.replace(new RegExp(`^${word}`, 'i'), '');
  }
  const slug = (stripped || name).replace(/^./, (c) => c.toLowerCase());
  return words.includes(slug) ? '' : slug;
}

/** The nearest Button/anchor ancestor wins: what a heading inside a button IS,
 *  is the button's label. */
function roleOf(node) {
  for (let n = node; n; n = n.parent) {
    if (ts.isJsxElement(n)) {
      const tag = bareTag(tagOf(n));
      if (/^(Button|button|a|Link)$/.test(tag)) return 'cta';
      if (n !== node && ROLE[tag]) break;
    }
  }
  return ROLE[bareTag(tagOf(node))] ?? 'text';
}

function keyer(scope) {
  const used = new Map();
  return (node) => {
    const role = roleOf(node);
    const n = (used.get(role) ?? 0) + 1;
    used.set(role, n);
    const leaf = n === 1 ? role : `${role}${n}`;
    return scope ? `${scope}.${leaf}` : leaf;
  };
}

// ── One file ───────────────────────────────────────────────────────────────
function processFile(file, namespace, italian) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  const sf = parse(file, src);

  // A file whose `t` already comes from useTranslations is done. Without this
  // guard a second run reads `t('hero.body')` as an English string and emits a
  // message whose value is the key — it happens to rewrite to the same bytes,
  // so the file looks idempotent while the reported catalogue is nonsense.
  if (/\bt\s*=\s*useTranslations\s*\(/.test(src)) {
    return { src, out: src, messages: {}, report: { dynamic: [], untranslated: [] }, count: 0, done: true };
  }
  const report = { dynamic: [], untranslated: [], skipped: [] };
  const messages = {};
  const edits = [];
  const nextKey = keyer(scopeOf(file, namespace));

  const visit = (node) => {
    if (ts.isJsxElement(node) && isUnit(node)) {
      const key = nextKey(node);
      const { en, it, chunks } = renderUnit(node, italian, report);
      messages[key] = { en, it };
      edits.push({ node, key, chunks });
      return; // the unit is a leaf: nothing inside it is its own message
    }
    // Report a dynamic call wherever it sits, resolved or not.
    if (ts.isCallExpression(node) && isTCall(node) && literalArg(node) === null) {
      const { line } = sf.getLineAndCharacterOfPosition(node.getStart());
      report.dynamic.push(`${file}:${line + 1}  ${node.getText()}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  // Apply from the end so earlier offsets stay valid.
  let out = src;
  for (const { node, key, chunks } of [...edits].reverse()) {
    // Indent the chunk map to the element it replaces, or the file reads like
    // a diff nobody wants to review.
    const column = sf.getLineAndCharacterOfPosition(node.getStart()).character;
    const pad = ' '.repeat(column + 2);
    const call = chunks.length === 0
      ? `{t('${key}')}`
      : `{t.rich('${key}', {\n${chunks
          .map((c) =>
            // A self-closing chunk has nothing to wrap, so it takes no argument.
            c.close
              ? `${pad}${c.tag}: (chunks) => ${c.jsx}{chunks}${c.close},`
              : `${pad}${c.tag}: () => ${c.jsx},`)
          .join('\n')}\n${' '.repeat(column)}})}`;
    const open = node.openingElement.getText();
    const close = node.closingElement.getText();
    out = out.slice(0, node.getStart()) + open + call + close + out.slice(node.getEnd());
  }

  if (edits.length > 0) {
    out = out
      .replace(/const\s*\{\s*t\s*\}\s*=\s*useLanguage\(\);?/, `const t = useTranslations('${namespace}');`)
      .replace(/const\s*\{([^}]*)\bt\b([^}]*)\}\s*=\s*useLanguage\(\);?/,
        (m, a, b) => `const {${a}${b}} = useLanguage();\n  const t = useTranslations('${namespace}');`
          .replace(/\{\s*,\s*/, '{ ').replace(/,\s*\}/, ' }'));
    if (!/from 'next-intl'/.test(out)) {
      out = out.replace(/(^import .*\n)/m, `$1import { useTranslations } from 'next-intl';\n`);
    }
  }

  return { src, out, messages, report, count: edits.length };
}

// ── CLI ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const write = argv.includes('--write');
const nsIndex = argv.indexOf('--namespace');
const namespace = nsIndex === -1 ? null : argv[nsIndex + 1];
const files = argv.filter((a, i) => !a.startsWith('--') && i !== nsIndex + 1);

if (!namespace || files.length === 0) {
  console.error('Usage: node scripts/codemod-i18n.mjs <file...> --namespace <ns> [--write]');
  process.exit(1);
}

const italian = loadItalian();
const catalogue = { en: {}, it: {} };
let total = 0;
const dynamic = [];
const untranslated = [];

for (const file of files) {
  const { src, out, messages, report, count, done } = processFile(file, namespace, italian);
  if (done) {
    console.log(`[skip]     ${file}: already on useTranslations`);
    continue;
  }
  total += count;
  dynamic.push(...report.dynamic);
  untranslated.push(...report.untranslated);

  for (const [key, { en, it }] of Object.entries(messages)) {
    catalogue.en[`${namespace}.${key}`] = en;
    catalogue.it[`${namespace}.${key}`] = it;
  }

  if (write && out !== src) writeFileSync(join(ROOT, file), out);
  console.log(`${write && out !== src ? '[written]' : '[dry-run]'} ${file}: ${count} message(s)`);
}

// ── The catalogue ──────────────────────────────────────────────────────────
/** Writes `a.b.c` into `{a:{b:{c:…}}}`, refusing to overwrite. A collision is
 *  two messages claiming one key, and picking a winner silently is how the
 *  dictionary ended up with 79 duplicates. */
function setDeep(target, dotted, value, collisions) {
  const path = dotted.split('.');
  const leaf = path.pop();
  let node = target;
  for (const segment of path) {
    if (typeof node[segment] !== 'object' || node[segment] === null) node[segment] = {};
    node = node[segment];
  }
  if (node[leaf] !== undefined && node[leaf] !== value) collisions.push(dotted);
  node[leaf] = value;
}

/** common first, then one block per namespace, so the file stays readable as it
 *  grows from 5 keys to several thousand. */
const ordered = (obj) =>
  Object.fromEntries(
    ['common', ...Object.keys(obj).filter((k) => k !== 'common').sort()]
      .filter((k) => obj[k] !== undefined)
      .map((k) => [k, obj[k]]),
  );

if (write && Object.keys(catalogue.en).length > 0) {
  const collisions = [];
  for (const locale of ['en', 'it']) {
    const path = join(ROOT, `messages/${locale}.json`);
    const existing = JSON.parse(readFileSync(path, 'utf8'));
    for (const [key, value] of Object.entries(catalogue[locale])) {
      setDeep(existing, key, value, collisions);
    }
    writeFileSync(path, JSON.stringify(ordered(existing), null, 2) + '\n');
  }
  if (collisions.length > 0) {
    console.error(`\n[FAIL] ${collisions.length} key(s) already held a different value:`);
    console.error([...new Set(collisions)].map((c) => `  ${c}`).join('\n'));
    process.exit(1);
  }
  console.log(`\n[written] messages/en.json and messages/it.json`);
}

console.log('\n── messages ──────────────────────────────────────────');
for (const key of Object.keys(catalogue.en)) {
  console.log(`  ${key}`);
  console.log(`    en: ${JSON.stringify(catalogue.en[key])}`);
  console.log(`    it: ${JSON.stringify(catalogue.it[key])}`);
}

if (dynamic.length > 0) {
  console.log(`\n── ${dynamic.length} dynamic call(s): the string is not at the call site ──`);
  console.log(dynamic.map((d) => `  ${d}`).join('\n'));
  console.log('  Move the data array into the catalogue and read it with t() by key.');
}

if (untranslated.length > 0) {
  console.log(`\n── ${untranslated.length} fragment(s) with no Italian in translations.ts ──`);
  console.log([...new Set(untranslated)].map((u) => `  ${JSON.stringify(u)}`).join('\n'));
  console.log('  The English was carried across unchanged — which is what the site renders today.');
}

console.log(`\n${total} message(s) across ${files.length} file(s).`);
if (!write) console.log('Dry run. Re-run with --write to apply, then paste the messages into messages/{en,it}.json.');

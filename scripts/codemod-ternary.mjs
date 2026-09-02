// codemod-ternary — the third shape, and the last one: pages that ask the
// question inline, every time.
//
//   {lang === 'it' ? 'Torna al Blog' : 'Back to Blog'}
//   const activeScenarios = lang === 'it' ? scenariosIT : scenarios;
//
// 227 of the first across the 11 blog posts, and 22 of the second. There is no
// object tree to move: the copy is welded into the JSX at each site, in both
// languages at once, which is the densest form of the problem this whole
// migration exists to remove.
//
// Usage:
//   node scripts/codemod-ternary.mjs <file> --namespace <ns> [--write]
//
// ponytail: migration scaffolding, deleted with the dictionary (#110).

import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const argv = process.argv.slice(2);
const write = argv.includes('--write');
const nsIndex = argv.indexOf('--namespace');
const namespace = nsIndex === -1 ? null : argv[nsIndex + 1]?.replace(/\//g, '.');
const files = argv.filter((a, i) => !a.startsWith('--') && i !== nsIndex + 1);
if (!namespace || files.length !== 1) {
  console.error('Usage: node scripts/codemod-ternary.mjs <file> --namespace <ns> [--write]');
  process.exit(1);
}
const [file] = files;
const src = readFileSync(join(ROOT, file), 'utf8');
const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

// ── Shared with the other two codemods ─────────────────────────────────────
const INLINE = new Set(['br', 'span', 'strong', 'em', 'b', 'i', 'u', 'sup', 'sub', 'small', 'mark']);
const TAG_FOR = { strong: 'b', span: 's', em: 'i', b: 'b', i: 'i', small: 'sm', mark: 'm', br: 'br', u: 'u', sup: 'sup', sub: 'sub' };
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', middot: '·', hellip: '…', rsquo: '’', lsquo: '‘' };
const decodeEntities = (t) =>
  t.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, b) =>
    b[0] === '#'
      ? String.fromCodePoint(b[1] === 'x' || b[1] === 'X' ? parseInt(b.slice(2), 16) : parseInt(b.slice(1), 10))
      : ENTITIES[b] ?? m);

/** JSX -> ICU string plus the elements its tags stand for. */
function renderJsx(node) {
  const chunks = [];
  const inlineLists = new Map();
const inlineParams = new Map();
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
        if (!chunks.some((c) => c.tag === name)) chunks.push({ tag: name, jsx: open, close: child.closingElement.getText() });
      } else if (ts.isJsxExpression(child) && child.expression && ts.isStringLiteral(child.expression)) {
        icu += child.expression.text;
      } else if (ts.isJsxFragment(child)) {
        walk(child.children);
      } else { ok = false; return; }
    }
  };
  walk(ts.isJsxFragment(node) || ts.isJsxElement(node) ? node.children : []);
  return ok ? { icu: icu.replace(/\s+/g, ' ').trim(), chunks } : null;
}

const ROLE = {
  h1: 'heading', h2: 'heading', h3: 'heading', h4: 'heading', h5: 'heading', h6: 'heading',
  p: 'body', li: 'item', button: 'cta', a: 'link', td: 'cell', th: 'columnHeader',
  blockquote: 'quote', figcaption: 'caption', label: 'label',
};
const bareTag = (n) => n.replace(/^.*\./, '');
function roleOf(node) {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isJsxElement(n)) {
      const tag = bareTag(n.openingElement.tagName.getText());
      if (/^(Button|button|a|Link)$/.test(tag)) return 'cta';
      if (ROLE[tag]) return ROLE[tag];
    }
    if (ts.isJsxAttribute(n)) return n.name.getText();
  }
  return 'text';
}

// ── The locale condition ───────────────────────────────────────────────────
const IS_IT = /^(lang === 'it'|isIt|isIT|locale === 'it')$/;

// ── Paired arrays: `const X = [...]` and `const XIT = [...]` ────────────────
const literal = (node) => {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) {
    const out = {};
    for (const p of node.properties) {
      if (!ts.isPropertyAssignment(p)) return undefined;
      const v = literal(p.initializer);
      out[p.name.text] = v === undefined ? { __code: p.initializer.getText() } : v;
    }
    return out;
  }
  if (ts.isJsxFragment(node) || ts.isJsxElement(node)) {
    const r = renderJsx(node);
    return r ? { __jsx: r } : undefined;
  }
  return undefined;
};

const decls = new Map();
for (const stmt of sf.statements) {
  if (!ts.isVariableStatement(stmt)) continue;
  for (const d of stmt.declarationList.declarations) {
    if (ts.isIdentifier(d.name) && d.initializer) decls.set(d.name.text, d);
  }
}

const STOP = new Set(['of','the','a','an','to','and','in','for','with','are','is','on','your','our','che','di','il','la','le','i','e','un','una','per','con','su','da','non']);
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

const catalogue = { en: {}, it: {} };
const rawPaths = new Set();
const richChunks = new Map();
const replacements = [];
const tables = [];
const pairs = [];
const problems = [];

const putValue = (path, locale, v) => {
  if (v && typeof v === 'object' && v.__jsx) {
    catalogue[locale][path] = v.__jsx.icu;
    const existing = richChunks.get(path) ?? [];
    for (const c of v.__jsx.chunks) if (!existing.some((e) => e.tag === c.tag)) existing.push(c);
    richChunks.set(path, existing);
  } else if (v && typeof v === 'object' && v.__code) {
    // structure, handled by the table
  } else if (Array.isArray(v)) {
    // A list inside a row — `points: ['…', '…']`. It stays an array, and the
    // read becomes t.raw; check:messages asserts the two locales' arrays match.
    catalogue[locale][path] = v;
    rawPaths.add(path);
  } else if (typeof v === 'string' || typeof v === 'number') {
    catalogue[locale][path] = String(v);
  }
};

for (const [name, d] of decls) {
  if (!name.endsWith('IT')) continue;
  // Two conventions in the same repo: `scenarios`/`scenariosIT` and
  // `skillsEN`/`skillsIT`.
  const stem = name.slice(0, -2);
  const base = decls.has(stem) ? stem : decls.has(`${stem}EN`) ? `${stem}EN` : null;
  if (!base) continue;
  const en = decls.get(base);
  if (!en || !ts.isArrayLiteralExpression(en.initializer) || !ts.isArrayLiteralExpression(d.initializer)) continue;

  const rowsEn = literal(en.initializer);
  const rowsIt = literal(d.initializer);
  if (!rowsEn || !rowsIt || rowsEn.length !== rowsIt.length) {
    problems.push(`${base}/${name}: ${rowsEn?.length} rows vs ${rowsIt?.length}`);
    continue;
  }

  // A list of sentences, not of rows. One message per line, no table.
  const plain = rowsEn.every((r) => typeof r === 'string');
  if (plain) {
    const takenP = new Set();
    const keyP = base.replace(/EN$/, '').replace(/^./, (c) => c.toLowerCase());
    const idsP = rowsEn.map((text) => idFrom(text, takenP));
    rowsEn.forEach((text, i) => { catalogue.en[`${keyP}.${idsP[i]}`] = text; });
    rowsIt.forEach((text, i) => { catalogue.it[`${keyP}.${idsP[i]}`] = String(text); });
    const tableIdP = keyP.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
    tables.push(`const ${tableIdP} = [\n${idsP.map((id) => `  '${id}',`).join('\n')}\n];`);
    pairs.push({ base, itName: name, key: keyP, tableId: tableIdP, structural: new Set(), ids: idsP, en, d, plain: true });
    continue;
  }

  const structural = new Set();
  for (const row of rowsEn) for (const [k, v] of Object.entries(row ?? {})) if (v && v.__code) structural.add(k);

  const taken = new Set();
  const key = base.replace(/EN$/, '').replace(/^./, (c) => c.toLowerCase());
  const ids = rowsEn.map((row) => {
    const copy = Object.entries(row ?? {}).find(([k, v]) => !structural.has(k) && typeof v === 'string');
    return idFrom(copy ? copy[1] : 'item', taken);
  });

  rowsEn.forEach((row, i) => {
    for (const [k, v] of Object.entries(row ?? {})) if (!structural.has(k)) putValue(`${key}.${ids[i]}.${k}`, 'en', v);
  });
  rowsIt.forEach((row, i) => {
    for (const [k, v] of Object.entries(row ?? {})) if (!structural.has(k)) putValue(`${key}.${ids[i]}.${k}`, 'it', v);
  });

  const tableRows = rowsEn.map((row, i) => {
    const props = [`id: '${ids[i]}'`];
    for (const k of structural) if (row[k]) props.push(`${k}: ${row[k].__code}`);
    return `  { ${props.join(', ')} },`;
  });
  const tableId = key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
  tables.push(`const ${tableId} = [\n${tableRows.join('\n')}\n];`);
  pairs.push({ base, itName: name, key, tableId, structural, ids, en, d });
}

// Drop the paired declarations and the `const active… = lang === 'it' ? …` line.
const cuts = [];
const lineCut = (node) => {
  let s = node;
  while (s.parent && !ts.isSourceFile(s.parent) && !ts.isBlock(s.parent)) s = s.parent;
  const from = src.lastIndexOf('\n', s.getStart()) + 1;
  const to = src.indexOf('\n', s.getEnd() - 1) + 1;
  return { from, to: to === 0 ? src.length : to };
};
for (const p of pairs) { cuts.push(lineCut(p.en), lineCut(p.d)); }

const aliases = new Map(); // local name -> pair
const findAliases = (node) => {
  if (
    ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer &&
    ts.isConditionalExpression(node.initializer) && IS_IT.test(node.initializer.condition.getText())
  ) {
    const pair = pairs.find((p) =>
      node.initializer.whenTrue.getText() === p.itName && node.initializer.whenFalse.getText() === p.base);
    if (pair) { aliases.set(node.name.text, pair); cuts.push(lineCut(node)); }
  }
  ts.forEachChild(node, findAliases);
};
findAliases(sf);

// ── Rewrites ───────────────────────────────────────────────────────────────
const inlineLists = new Map();
const inlineParams = new Map();
const used = new Map();
const nextKey = (node) => {
  const role = roleOf(node);
  const n = (used.get(role) ?? 0) + 1;
  used.set(role, n);
  return n === 1 ? role : `${role}${n}`;
};

const visit = (node) => {
  // `activeX.map(...)` and `x.field` inside it
  // Not the declaration's own name — that line is being cut, and an edit inside
  // a cut range corrupts both.
  if (
    ts.isIdentifier(node) && aliases.has(node.text) &&
    !ts.isPropertyAccessExpression(node.parent) &&
    !(ts.isVariableDeclaration(node.parent) && node.parent.name === node)
  ) {
    replacements.push({ start: node.getStart(), end: node.getEnd(), text: aliases.get(node.text).tableId });
  }
  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && aliases.has(node.expression.text)) {
    replacements.push({ start: node.expression.getStart(), end: node.expression.getEnd(), text: aliases.get(node.expression.text).tableId });
  }
  if (
    ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) &&
    !aliases.has(node.expression.text)
  ) {
    // `s.context` inside `ACTIVE.map(s => …)`
    for (let n = node.parent; n; n = n.parent) {
      if (!ts.isArrowFunction(n) && !ts.isFunctionExpression(n)) continue;
      const first = n.parameters[0];
      if (!first || !ts.isIdentifier(first.name) || first.name.text !== node.expression.text) break;
      const call = n.parent;
      if (!call || !ts.isCallExpression(call) || !ts.isPropertyAccessExpression(call.expression) ||
          call.expression.name.text !== 'map') break;
      const target = call.expression.expression.getText();
      const pair = pairs.find((p) => p.tableId === target) ??
        (aliases.has(target) ? aliases.get(target) : null);
      if (!pair || pair.structural.has(node.name.text)) break;
      const path = `${pair.key}.\${${node.expression.text}.id}.${node.name.text}`;
      const sample = `${pair.key}.${pair.ids[0]}.${node.name.text}`;
      const chunks = richChunks.get(sample);
      replacements.push({
        start: node.getStart(),
        end: node.getEnd(),
        text: rawPaths.has(sample)
          ? 't.raw(`' + path + '`)'
          : chunks
          ? 't.rich(`' + path + '`, {\n' +
            chunks.map((c) => c.close
              ? `    ${c.tag}: (chunks) => ${c.jsx}{chunks}${c.close},`
              : `    ${c.tag}: () => ${c.jsx},`).join('\n') + '\n  })'
          : 't(`' + path + '`)',
      });
      break;
    }
  }

  // `LIST.map(x => <li>{x}</li>)` where LIST is now a list of ids.
  if (ts.isIdentifier(node) && !ts.isPropertyAccessExpression(node.parent) &&
      !(ts.isVariableDeclaration(node.parent) && node.parent.name === node) &&
      // Not the callback's own parameter: rewriting `(item, j) =>` into
      // `(t(`…${item}`), j) =>` is not a program.
      !ts.isParameter(node.parent)) {
    for (let n = node.parent; n; n = n.parent) {
      if (!ts.isArrowFunction(n) && !ts.isFunctionExpression(n)) continue;
      const first = n.parameters[0];
      if (!first || !ts.isIdentifier(first.name) || first.name.text !== node.text) break;
      const call = n.parent;
      if (!call || !ts.isCallExpression(call) || !ts.isPropertyAccessExpression(call.expression) ||
          call.expression.name.text !== 'map') break;
      const target = call.expression.expression.getText();
      const pair = pairs.find((p) => p.plain && (p.tableId === target || aliases.get(target) === p));
      const inlineKey = inlineParams.get(node.text);
      if (!pair && !inlineKey) break;
      replacements.push({
        start: node.getStart(),
        end: node.getEnd(),
        text: 't(`' + (pair ? pair.key : inlineKey) + '.${' + node.text + '}`)',
      });
      break;
    }
  }

  // `lang === 'it' ? A : B`
  if (ts.isConditionalExpression(node) && IS_IT.test(node.condition.getText())) {
    const it = node.whenTrue;
    const en = node.whenFalse;
    const isText = (n) => ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n);
    const isJsx = (n) => ts.isJsxFragment(n) || ts.isJsxElement(n);
    // `(lang === 'it' ? ['a','b'] : ['A','B']).map(…)` — a paired list written
    // at the call site instead of at the top of the file.
    if (
      ts.isArrayLiteralExpression(it) && ts.isArrayLiteralExpression(en) &&
      it.elements.length === en.elements.length &&
      en.elements.every(ts.isStringLiteral) && it.elements.every(ts.isStringLiteral)
    ) {
      const key = nextKey(node);
      const taken = new Set();
      const ids = en.elements.map((e) => idFrom(e.text, taken));
      en.elements.forEach((e, i) => { catalogue.en[`${key}.${ids[i]}`] = e.text; });
      it.elements.forEach((e, i) => { catalogue.it[`${key}.${ids[i]}`] = e.text; });
      inlineLists.set(node, key);
      replacements.push({
        start: node.getStart(),
        end: node.getEnd(),
        text: `[${ids.map((id) => `'${id}'`).join(', ')}]`,
      });
      // and the param inside the .map becomes the key
      const call = node.parent && ts.isParenthesizedExpression(node.parent) ? node.parent.parent : node.parent;
      if (call && ts.isPropertyAccessExpression(call) && call.name.text === 'map') {
        const cb = call.parent.arguments?.[0];
        const param = cb?.parameters?.[0];
        if (param && ts.isIdentifier(param.name)) inlineParams.set(param.name.text, key);
      }
      return;
    }

    if (isText(it) && isText(en)) {
      const key = nextKey(node);
      catalogue.en[key] = en.text;
      catalogue.it[key] = it.text;
      replacements.push({ start: node.getStart(), end: node.getEnd(), text: `t('${key}')` });
      return;
    }
    if (isJsx(it) && isJsx(en)) {
      const rIt = renderJsx(it);
      const rEn = renderJsx(en);
      if (rIt && rEn) {
        const key = nextKey(node);
        catalogue.en[key] = rEn.icu;
        catalogue.it[key] = rIt.icu;
        const chunks = [...rEn.chunks];
        for (const c of rIt.chunks) if (!chunks.some((e) => e.tag === c.tag)) chunks.push(c);
        replacements.push({
          start: node.getStart(),
          end: node.getEnd(),
          text: `t.rich('${key}', {\n` +
            chunks.map((c) => c.close
              ? `    ${c.tag}: (chunks) => ${c.jsx}{chunks}${c.close},`
              : `    ${c.tag}: () => ${c.jsx},`).join('\n') + `\n  })`,
        });
        return;
      }
      problems.push(`a JSX ternary at line ${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1} contains something that is not inline markup`);
    }
  }
  ts.forEachChild(node, visit);
};
visit(sf);

// ── Apply ──────────────────────────────────────────────────────────────────
// A callback parameter named `t` shadows the translator, so every rewrite
// inside it calls the row object instead. Renamed before anything else.
const shadow = [];
{
  const visit = (node) => {
    if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node))) {
      for (const p of node.parameters) {
        if (ts.isIdentifier(p.name) && p.name.text === 't') {
          shadow.push(sf.getLineAndCharacterOfPosition(p.getStart()).line + 1);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}
if (shadow.length) {
  console.error(`${file}: a callback parameter is named 't' at line(s) ${shadow.join(', ')}.`);
  console.error("  It shadows the translator, so every rewritten call inside it would");
  console.error('  call the row instead. Rename it first.');
  process.exit(1);
}

let out = src;
// A replacement inside a line that is being cut is a double edit on one range,
// and the result is neither.
const kept = replacements.filter((r) => !cuts.some((c) => r.start >= c.from && r.end <= c.to));
const all = [...kept, ...cuts.map((c) => ({ start: c.from, end: c.to, text: '' }))]
  .sort((a, b) => b.start - a.start)
  .filter((r, i, xs) => i === 0 || r.end <= xs[i - 1].start);
for (const r of all) {
  out = out.slice(0, r.start) + r.text + out.slice(r.end);
}
if (tables.length) {
  const at = out.indexOf('\nexport default function');
  out = out.slice(0, at + 1) +
    '// Structure the catalogue cannot hold: ids and the components each row\n' +
    '// renders. The words that went with them are in messages/.\n' +
    tables.join('\n\n') + '\n\n' + out.slice(at + 1);
}
if (!/from 'next-intl'/.test(out)) {
  out = out.replace(/(^import .*\n)/m, `$1import { useTranslations } from 'next-intl';\n`);
} else if (!/useTranslations/.test(out)) {
  out = out.replace(/import \{ ([^}]*) \} from 'next-intl';/, `import { $1, useTranslations } from 'next-intl';`);
}
let hooked = false;
out = out.replace(/^([ \t]*)const \{([^}]*)\} = useLanguage\(\);[ \t]*$/m, (m, indent, names) => {
  hooked = true;
  const kept = names.split(',').map((n) => n.trim()).filter((n) => n && n !== 't');
  const hook = `${indent}const t = useTranslations('${namespace}');`;
  return kept.length ? `${indent}const { ${kept.join(', ')} } = useLanguage();\n${hook}` : hook;
});
if (!hooked) {
  out = out.replace(/^(export default function \w+\([^)]*\) \{[ \t]*\n)/m,
    `$1  const t = useTranslations('${namespace}');\n`);
}
if (!/useLanguage\(\)/.test(out)) {
  out = out.replace(/^import \{ useLanguage \} from '@\/i18n\/LanguageContext';\n/m, '');
}

console.log(`${file}: ${Object.keys(catalogue.en).length} message(s), ${pairs.length} paired array(s), ${replacements.length} rewrite(s)`);
if (problems.length) {
  console.log(`\n── ${problems.length} thing(s) it would not touch ──`);
  console.log(problems.map((p) => `  ${p}`).join('\n'));
}

const onlyEn = Object.keys(catalogue.en).filter((k) => !(k in catalogue.it));
const onlyIt = Object.keys(catalogue.it).filter((k) => !(k in catalogue.en));
if (onlyEn.length || onlyIt.length) {
  console.error(`${file}: ${onlyEn.length + onlyIt.length} key(s) exist in one locale only.`);
  console.error([...onlyEn, ...onlyIt].map((k) => `  ${k}`).join('\n'));
  process.exit(1);
}

if (!write) { console.log('\nDry run. Re-run with --write to apply.'); process.exit(0); }

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
  const ordered = Object.fromEntries(['common', ...Object.keys(d).filter((k) => k !== 'common').sort()].map((k) => [k, d[k]]));
  writeFileSync(path, JSON.stringify(ordered, null, 2) + '\n');
}
console.log('[written] the page and messages/{en,it}.json');

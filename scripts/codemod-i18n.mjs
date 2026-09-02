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

// ── The Italian dictionary ─────────────────────────────────────────────────
// Parsed, not regexed. A regex has to decode the escapes itself, and the first
// one it forgets is `\n`: nine values in the dictionary contain one, and they
// arrive in the catalogue as a literal backslash-n that renders on the page.
// The parser resolves every escape, including the `\u2019` the Italian
// apostrophes are written with.
function loadItalian() {
  const file = join(ROOT, 'i18n/translations.ts');
  const sf = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const map = new Map();
  const visit = (node) => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isStringLiteral(node.initializer) &&
      (ts.isStringLiteral(node.name) || ts.isIdentifier(node.name))
    ) {
      map.set(node.name.text, node.initializer.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
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
  if (!arg || !ts.isStringLiteral(arg)) return null;
  // A literal that already resolves in the catalogue is a key, not English.
  // This is what makes the codemod re-runnable: without it a second pass reads
  // t('hero.body') as a sentence and emits a message whose value is its own key
  // — which rewrites to the same bytes, so the file looks idempotent while the
  // catalogue it reports is nonsense.
  return alreadyMigrated(arg.text) ? null : arg.text;
};

/** Set by main(), once the namespace is known. */
let alreadyMigrated = () => false;

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


// ── Data arrays ────────────────────────────────────────────────────────────
// The other half of the copy: `painCards.map(card => <h3>{t(card.title)}</h3>)`.
// The English lives in a module-level array, not at the call site, so no scan
// that only reads call sites can move it. These 139 calls are why the naive
// version of this codemod would have quietly left a quarter of the site behind.

const STOPWORDS = new Set(['of','the','a','an','to','and','in','for','with','are','is','on','your','our','that','it','be','by','at','as','from']);

/** A readable, stable id for one array entry, from its first piece of copy.
 *  "of hires fail within 18 months" -> hiresFailWithin. */
function idFrom(text, taken) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w))
    .slice(0, 3);
  let base = words
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join('') || 'item';
  if (/^[0-9]/.test(base)) base = `n${base}`;
  let id = base;
  for (let n = 2; taken.has(id); n += 1) id = `${base}${n}`;
  taken.add(id);
  return id;
}

/** Module-level `const NAME = ['…', '…']` — a list of sentences, mapped with
 *  t(item). The array becomes ids and the sentences move to the catalogue. */
function stringArrayDeclarations(sf) {
  const found = new Map();
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      if (!ts.isArrayLiteralExpression(decl.initializer)) continue;
      if (decl.initializer.elements.length === 0) continue;
      if (!decl.initializer.elements.every((e) => ts.isStringLiteral(e))) continue;
      found.set(decl.name.text, decl.initializer);
    }
  }
  return found;
}

/** Module-level `const NAME = [ {…}, … ]` — the shape every one of these has. */
function arrayDeclarations(sf) {
  const found = new Map();
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      if (!ts.isArrayLiteralExpression(decl.initializer)) continue;
      if (!decl.initializer.elements.every((e) => ts.isObjectLiteralExpression(e))) continue;
      found.set(decl.name.text, decl.initializer);
    }
  }
  return found;
}

/**
 * `pillars.map((p, i) => renderCard(p, i))` — the copy is inside renderCard,
 * where there is no map to walk up to. Maps the helper's name to the array so
 * its first parameter can be resolved. Four components on the science page
 * alone are written this way.
 */
function helperBindings(sf, arrays) {
  const byHelper = new Map();
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'map' &&
      ts.isIdentifier(node.expression.expression) &&
      arrays.has(node.expression.expression.text)
    ) {
      const array = node.expression.expression.text;
      const cb = node.arguments[0];
      if (cb && ts.isIdentifier(cb)) {
        byHelper.set(cb.text, array);                       // X.map(renderCard)
      } else if (cb && (ts.isArrowFunction(cb) || ts.isFunctionExpression(cb))) {
        const param = cb.parameters[0];
        const body = ts.isArrowFunction(cb) && !ts.isBlock(cb.body) ? cb.body : null;
        if (
          param && ts.isIdentifier(param.name) && body &&
          ts.isCallExpression(body) && ts.isIdentifier(body.expression) &&
          body.arguments[0] && ts.isIdentifier(body.arguments[0]) &&
          body.arguments[0].text === param.name.text
        ) {
          byHelper.set(body.expression.text, array);        // X.map(p => render(p))
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return byHelper;
}

/**
 * Which array a `t(item…)` call is iterating, found by walking UP from the call
 * to the nearest `X.map(item => …)` that binds that name.
 *
 * A file-wide param -> array map looks simpler and is wrong: `oldItems.map(item
 * => …)` and `newItems.map(item => …)` in one component both bind `item`, and
 * the map keeps whichever came last. Half the copy then silently belongs to the
 * other list.
 */
function arrayForParam(node, param, arrays, helpers = new Map()) {
  for (let n = node.parent; n; n = n.parent) {
    if (!ts.isArrowFunction(n) && !ts.isFunctionExpression(n) && !ts.isFunctionDeclaration(n)) continue;
    const first = n.parameters[0];
    if (!first || !ts.isIdentifier(first.name) || first.name.text !== param) continue;

    // A named helper the map delegates to.
    const name = ts.isFunctionDeclaration(n)
      ? n.name?.text
      : ts.isVariableDeclaration(n.parent) && ts.isIdentifier(n.parent.name)
        ? n.parent.name.text
        : null;
    if (name && helpers.has(name)) return helpers.get(name);

    const call = n.parent;
    if (
      call && ts.isCallExpression(call) &&
      ts.isPropertyAccessExpression(call.expression) &&
      call.expression.name.text === 'map' &&
      ts.isIdentifier(call.expression.expression) &&
      arrays.has(call.expression.expression.text)
    ) {
      return call.expression.expression.text;
    }
    return null; // bound by a different map: not ours, and not the outer one's
  }
  return null;
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
  // `index.tsx` IS the page: its copy sits directly on the namespace.
  if (name === 'index') return '';
  // A dynamic route shares its collection's namespace — the card and the page
  // it links to render the same title — so its own chrome needs a scope of its
  // own, or the two pages' headings collide silently. `[slug]` would also be an
  // illegal key path.
  if (/^\[.*\]$/.test(name)) return 'detail';
  // `ProductHero` under namespace `product-overview` is the overview page's
  // hero, so it is `hero` — repeating the page's own name inside its namespace
  // is noise the key has to carry forever.
  const words = namespace.split('.').pop().split('-');
  let stripped = name;
  for (const word of words) {
    // Strip the separator with the word, or `book-meeting.tsx` under namespace
    // `book-meeting` leaves `-meeting` and the catalogue grows a key that
    // starts with a dash.
    stripped = stripped.replace(new RegExp(`^${word}[-_]?`, 'i'), '');
  }
  // `Section` is what every one of these is. It says nothing.
  stripped = stripped.replace(/Section$/, '');
  // If the namespace consumed the whole filename, the file IS the page and its
  // copy sits directly on the namespace — `ins-mercato.tsx` under
  // `customers.ins-mercato` must not produce `customers.ins-mercato.ins-mercato`.
  if (!stripped) return '';
  // ROISection -> roi, not rOI: lowercase a leading run of capitals whole,
  // except the capital that starts the next word.
  const slug = stripped.replace(/^[A-Z]+(?![a-z])|^[A-Z]/, (m) => m.toLowerCase());
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


  const report = { dynamic: [], untranslated: [], keptInCode: [] };
  const messages = {};
  const edits = [];
  const scope = scopeOf(file, namespace);
  const nextKey = keyer(scope);

  // Which module-level arrays feed a t(param.prop) call, and through which
  // property. Collected before the JSX walk so the walk can rewrite the calls.
  const arrays = arrayDeclarations(sf);
  const strings = stringArrayDeclarations(sf);
  const helpers = helperBindings(sf, arrays);
  const stringHelpers = helperBindings(sf, strings);
  const arrayProps = new Map(); // array name -> Set(prop)
  const arrayCalls = []; // { node, array, prop }
  const rawUse = new Map(); // array name -> Set(prop) read outside t()
  {
    // A property read anywhere but inside t() is not just copy — `key={s.company}`
    // and `data-testid={s.company…}` are two of them. Lifting it out of the array
    // would leave those references pointing at nothing, so the property stays and
    // the string exists twice until a person decides which use is the real one.
    const inTCall = new Set();
    const mark = (node) => {
      if (isTCall(node) && node.arguments[0]) inTCall.add(node.arguments[0]);
      ts.forEachChild(node, mark);
    };
    mark(sf);

    const scan = (node) => {
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        arrayForParam(node, node.expression.text, arrays, helpers) &&
        !inTCall.has(node)
      ) {
        const array = arrayForParam(node, node.expression.text, arrays, helpers);
        if (!rawUse.has(array)) rawUse.set(array, new Set());
        rawUse.get(array).add(node.name.text);
      }
      ts.forEachChild(node, scan);
    };
    scan(sf);

    const visit = (node) => {
      // `t(steps[active].title)` — the selected tab. Not a map binding, so
      // there is nothing to walk up to; the array is named at the call site.
      if (
        isTCall(node) &&
        node.arguments.length === 1 &&
        ts.isPropertyAccessExpression(node.arguments[0]) &&
        ts.isElementAccessExpression(node.arguments[0].expression) &&
        ts.isIdentifier(node.arguments[0].expression.expression) &&
        arrays.has(node.arguments[0].expression.expression.text)
      ) {
        const access = node.arguments[0].expression;
        const array = access.expression.text;
        const prop = node.arguments[0].name.text;
        if (!arrayProps.has(array)) arrayProps.set(array, new Set());
        arrayProps.get(array).add(prop);
        arrayCalls.push({ node, array, prop, param: access.getText() });
        return;
      }

      if (
        isTCall(node) &&
        node.arguments.length === 1 &&
        ts.isPropertyAccessExpression(node.arguments[0]) &&
        ts.isIdentifier(node.arguments[0].expression) &&
        arrayForParam(node, node.arguments[0].expression.text, arrays, helpers)
      ) {
        const array = arrayForParam(node, node.arguments[0].expression.text, arrays, helpers);
        const prop = node.arguments[0].name.text;
        if (!arrayProps.has(array)) arrayProps.set(array, new Set());
        arrayProps.get(array).add(prop);
        arrayCalls.push({ node, array, prop, param: node.arguments[0].expression.text });
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }

  // Lists of sentences: `oldItems.map(item => <p>{t(item)}</p>)`. The array
  // holds ids afterwards, so `key={item}` keeps working and the copy is one
  // message per line rather than a sentence used as its own key.
  const stringEdits = [];
  const stringCalls = [];
  const stringUses = new Map(); // array name -> [{ node, param }]
  {
    const collect = (node) => {
      if (isTCall(node) && node.arguments.length === 1 && ts.isIdentifier(node.arguments[0])) {
        const param = node.arguments[0].text;
        const array = arrayForParam(node, param, strings, stringHelpers);
        if (array) {
          if (!stringUses.has(array)) stringUses.set(array, []);
          stringUses.get(array).push({ node, param });
        }
      }
      ts.forEachChild(node, collect);
    };
    collect(sf);
  }

  for (const [name, literal] of strings) {
    const uses = stringUses.get(name) ?? [];
    if (uses.length === 0) continue;

    const key = /^[A-Z0-9_]+$/.test(name)
      ? name.toLowerCase().replace(/_(.)/g, (_, c) => c.toUpperCase())
      : name.replace(/^./, (c) => c.toLowerCase());
    const taken = new Set();
    const ids = literal.elements.map((e) => {
      const id = idFrom(e.text, taken);
      const translated = italian.get(e.text);
      if (translated === undefined) report.untranslated.push(e.text);
      messages[`${scope ? `${scope}.` : ''}${key}.${id}`] = { en: e.text, it: translated ?? e.text };
      return id;
    });
    stringEdits.push({ literal, ids });
    for (const { node, param } of uses) stringCalls.push({ node, key, param });
  }

  // Give every entry an id, and lift its copy out into the catalogue.
  const arrayEdits = [];
  const orphans = [];
  for (const [name, props] of arrayProps) {
    const literal = arrays.get(name);
    // PARAGRAPHS -> paragraphs, painCards -> painCards.
    const key = /^[A-Z0-9_]+$/.test(name)
      ? name.toLowerCase().replace(/_(.)/g, (_, c) => c.toUpperCase())
      : name.replace(/^./, (c) => c.toLowerCase());
    const kept = new Set([...props].filter((p) => rawUse.get(name)?.has(p)));
    for (const p of kept) report.keptInCode.push(`${file}: ${name}[].${p}`);
    const taken = new Set();
    const ids = [];

    for (const element of literal.elements) {
      const read = (prop) => {
        const p = element.properties.find(
          (x) => ts.isPropertyAssignment(x) && x.name.getText() === prop,
        );
        return p && ts.isStringLiteral(p.initializer) ? p.initializer.text : null;
      };
      const existing = read('id') ?? read('slug');
      const first = [...props].map(read).find((v) => v);
      if (!first) { ids.push(null); continue; }
      const id = existing ?? idFrom(first, taken);
      ids.push(id);

      for (const prop of props) {
        const english = read(prop);
        if (english === null) continue;
        const translated = italian.get(english);
        if (translated === undefined) report.untranslated.push(english);
        messages[`${scope ? `${scope}.` : ''}${key}.${id}.${prop}`] = {
          en: english,
          it: translated ?? english,
        };
      }
    }
    arrayEdits.push({ literal, props: new Set([...props].filter((p) => !kept.has(p))), ids });
  }

  const visit = (node) => {
    // A unit whose only child is an inline element is that element: the wrapper
    // contributes a <span> tag to the message that stands for the whole of it,
    // which a translator has to carry around for nothing.
    while (ts.isJsxElement(node) && isUnit(node)) {
      const only = meaningful(node.children);
      if (only.length === 1 && ts.isJsxElement(only[0])) node = only[0];
      else break;
    }
    if (ts.isJsxElement(node) && isUnit(node)) {
      const key = nextKey(node);
      const { en, it, chunks } = renderUnit(node, italian, report);
      messages[key] = { en, it };
      edits.push({ node, key, chunks });
      return; // the unit is a leaf: nothing inside it is its own message
    }

    // A lone {t('…')} whose parent is not a unit — an <a> that also contains an
    // icon component, say. Without this it belongs to no unit and is dropped
    // silently, which is the one failure mode a codemod must never have.
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      isTCall(node.expression) &&
      literalArg(node.expression) !== null
    ) {
      const english = literalArg(node.expression);
      const translated = italian.get(english);
      if (translated === undefined) report.untranslated.push(english);
      const key = nextKey(node.parent);
      messages[key] = { en: english, it: translated ?? english };
      orphans.push({ node, key });
      return;
    }
    // Report a dynamic call only if the array pass did not already resolve it.
    if (
      ts.isCallExpression(node) &&
      isTCall(node) &&
      literalArg(node) === null &&
      // A template literal is the migrated form — `t(`cards.${c.id}.title`)` —
      // not work left to do. Reporting it every run trains people to ignore
      // the report, which is the only place unresolved calls ever appear.
      !(node.arguments[0] && (ts.isStringLiteral(node.arguments[0]) ||
        ts.isTemplateExpression(node.arguments[0]) ||
        ts.isNoSubstitutionTemplateLiteral(node.arguments[0]))) &&
      !arrayCalls.some((c) => c.node === node) &&
      !stringCalls.some((c) => c.node === node)
    ) {
      const { line } = sf.getLineAndCharacterOfPosition(node.getStart());
      report.dynamic.push(`${file}:${line + 1}  ${node.getText()}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  // All three rewrites — the JSX units, the t(card.title) calls and the data
  // arrays — are collected as replacements against the ORIGINAL offsets and
  // applied in one descending pass. Three separate reverse passes would each
  // shift the offsets the next one is still reading, which corrupts the file in
  // a way that only shows up on the largest components.
  const replacements = [];

  for (const { node, key, chunks } of edits) {
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
    replacements.push({
      start: node.getStart(),
      end: node.getEnd(),
      text: node.openingElement.getText() + call + node.closingElement.getText(),
    });
  }

  for (const { node, key } of orphans) {
    replacements.push({ start: node.getStart(), end: node.getEnd(), text: `{t('${key}')}` });
  }

  for (const { literal, ids } of stringEdits) {
    replacements.push({
      start: literal.getStart(),
      end: literal.getEnd(),
      text: `[\n${ids.map((id) => `  '${id}',`).join('\n')}\n]`,
    });
  }
  for (const { node, key, param } of stringCalls) {
    const path = `${scope ? `${scope}.` : ''}${key}.\${${param}}`;
    replacements.push({ start: node.getStart(), end: node.getEnd(), text: 't(`' + path + '`)' });
  }

  // t(card.title) -> t(`cards.${card.id}.title`)
  for (const { node, array, prop, param } of arrayCalls) {
    const key = /^[A-Z0-9_]+$/.test(array)
      ? array.toLowerCase().replace(/_(.)/g, (_, c) => c.toUpperCase())
      : array.replace(/^./, (c) => c.toLowerCase());
    const path = `${scope ? `${scope}.` : ''}${key}.\${${param}.id}.${prop}`;
    replacements.push({ start: node.getStart(), end: node.getEnd(), text: 't(`' + path + '`)' });
  }

  // The array keeps its structure and loses its copy.
  for (const { literal, props, ids } of arrayEdits) {
    const rendered = literal.elements
      .map((element, i) => {
        const kept = element.properties.filter(
          (x) => !(ts.isPropertyAssignment(x) && props.has(x.name.getText())),
        );
        const lines = [
          ...(ids[i] && !kept.some((x) => x.name?.getText() === 'id') ? [`id: '${ids[i]}'`] : []),
          ...kept.map((x) => x.getText()),
        ];
        return `  {\n${lines.map((l) => `    ${l},`).join('\n')}\n  }`;
      })
      .join(',\n');
    replacements.push({
      start: literal.getStart(),
      end: literal.getEnd(),
      text: `[\n${rendered},\n]`,
    });
  }

  let out = src;
  for (const { start, end, text } of replacements.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, start) + text + out.slice(end);
  }

  if (replacements.length > 0) {
    out = out
      .replace(/const\s*\{\s*t\s*\}\s*=\s*useLanguage\(\);?/, `const t = useTranslations('${namespace}');`)
      .replace(/const\s*\{([^}]*)\bt\b([^}]*)\}\s*=\s*useLanguage\(\);?/,
        (m, a, b) => `const {${a}${b}} = useLanguage();\n  const t = useTranslations('${namespace}');`
          .replace(/\{\s*,\s*/, '{ ').replace(/,\s*\}/, ' }'));
    if (!/from 'next-intl'/.test(out)) {
      out = out.replace(/(^import .*\n)/m, `$1import { useTranslations } from 'next-intl';\n`);
    }

    // A `const { lang } = useLanguage()` left with a binding nothing reads is
    // dead code that still imports the dictionary this migration is deleting.
    const leftover = /^[ \t]*const\s*\{\s*([A-Za-z0-9_,\s]*)\}\s*=\s*useLanguage\(\);?[ \t]*\n/m.exec(out);
    if (leftover) {
      const names = leftover[1].split(',').map((n) => n.trim()).filter(Boolean);
      const body = out.slice(leftover.index + leftover[0].length);
      const unused = names.every((n) => !new RegExp(`\\b${n}\\b`).test(body));
      if (unused) {
        out = out.replace(leftover[0], '');
        out = out.replace(/^import \{ useLanguage \} from '@\/i18n\/LanguageContext';\n/m, '');
      }
    }
  }

  return { src, out, messages, report, count: Object.keys(messages).length };
}

// ── CLI ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const write = argv.includes('--write');
const nsIndex = argv.indexOf('--namespace');
// A route id is a path (`solutions/talent-acquisition`); a namespace is a dot
// path into the catalogue. i18n/messages.ts does this same conversion when a
// page loads its namespaces, so doing it here is what keeps the key the codemod
// writes and the key the page reads the same one. Passing the raw route id and
// getting a top-level `solutions/talent-acquisition` object is a silent
// mismatch: every string on the page renders as its own key path.
const namespace = nsIndex === -1 ? null : argv[nsIndex + 1]?.replace(/\//g, '.');
const files = argv.filter((a, i) => !a.startsWith('--') && i !== nsIndex + 1);

if (!namespace || files.length === 0) {
  console.error('Usage: node scripts/codemod-i18n.mjs <file...> --namespace <ns> [--write]');
  process.exit(1);
}

// The same rule check:messages enforces, applied before writing rather than
// after — a key it would reject is a key the gate rejects.
const SEGMENT = /^[a-z][a-zA-Z0-9]*(-[a-z0-9]+)*$/;
const badSegment = namespace.split('.').find((seg) => !SEGMENT.test(seg));
if (badSegment) {
  console.error(`'${badSegment}' is not a valid namespace segment. Expected camelCase or kebab-case.`);
  process.exit(1);
}

// Keys already in the catalogue under this namespace, so a second run leaves
// them alone.
{
  const existing = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));
  const root = namespace.split('.').reduce((n, seg) => (n == null ? undefined : n[seg]), existing);
  alreadyMigrated = (key) =>
    key.split('.').reduce((n, seg) => (n == null ? undefined : n[seg]), root) !== undefined;
}

const italian = loadItalian();
const catalogue = { en: {}, it: {} };
let total = 0;
const dynamic = [];
const untranslated = [];
const keptInCode = [];

for (const file of files) {
  const { src, out, messages, report, count } = processFile(file, namespace, italian);
  total += count;
  dynamic.push(...report.dynamic);
  untranslated.push(...report.untranslated);
  keptInCode.push(...report.keptInCode);

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

if (keptInCode.length > 0) {
  console.log(`\n── ${keptInCode.length} array field(s) also read outside t() ──`);
  console.log(keptInCode.map((k) => `  ${k}`).join('\n'));
  console.log('  Left in the array, so the string is now in two places. Usually the raw');
  console.log('  read wants the id instead — check it and delete the field.');
}

if (untranslated.length > 0) {
  console.log(`\n── ${untranslated.length} fragment(s) with no Italian in translations.ts ──`);
  console.log([...new Set(untranslated)].map((u) => `  ${JSON.stringify(u)}`).join('\n'));
  console.log('  The English was carried across unchanged — which is what the site renders today.');
}

console.log(`\n${total} message(s) across ${files.length} file(s).`);
if (!write) console.log('Dry run. Re-run with --write to apply, then paste the messages into messages/{en,it}.json.');

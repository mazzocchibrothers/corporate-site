// check-colors — ogni esadecimale che il sito disegna è nella palette.
//
// Il gate cercava esadecimali nel testo grezzo dei .tsx, commenti inclusi.
// `#176` è un esadecimale a tre cifre, e così ogni numero di Issue che questo
// repo incoraggia a citare in un commento: il gate li leggeva come colori e
// diventava rosso sulla prosa (#177).
//
// La via ovvia è togliere i commenti prima di guardare. Non regge, provata due
// volte. Una regex `(^|[^:])//.*$` taglia da un `//` dentro una stringa a fine
// riga, e sette file qui caricano lo script HubSpot con un URL
// protocol-relative — `script.src = '//js.hsforms.net/forms/embed/v2.js'` — che
// non è preceduto da due punti. Uno scanner scritto a mano che tiene il conto
// delle virgolette inciampa sul primo apostrofo spaiato in un testo JSX, che
// apre una stringa mai chiusa e fa smettere di togliere i commenti da lì in
// poi. Entrambi i modi falliscono in silenzio, e questo è il file il cui unico
// compito è accorgersi di un colore: un verde di troppo qui non costa niente
// finché non costa tutto.
//
// Quindi non si toglie niente. Un colore in un .tsx vive sempre dentro una
// stringa, una template literal o un testo JSX — mai in un commento, per
// definizione — e il parser di TypeScript sa già dire quali sono. È lo stesso
// parser che gira in `npm run typecheck`, quindi non è una dipendenza nuova.
//
// Una cosa da sapere: `ts.createSourceFile` è tollerante agli errori, quindi un
// file che non si parsa produce meno nodi invece di un'eccezione — lanciato a
// mano su un sorgente a metà, questo gate direbbe verde. In `harness/init.sh`
// `typecheck` gira prima, quindi non ci arriva mai rotto.
//
// Esegui: npm run check:colors

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// La palette. Fino a #177 conteneva anche #113, #116, #126, #136, #137, #138 e
// #144: non sono colori, sono i numeri delle Issue citate in altrettanti
// commenti, aggiunti qui per far tornare verde il gate. È la forma che prende
// un falso positivo quando la via più corta per zittirlo è allargare la lista
// di ciò che è lecito — e ogni voce aggiunta così è un colore vero che da quel
// momento passa senza che nessuno lo guardi.
const ALLOWED = new Set(
  (
    '#000000 #010102 #040404 #047857 #050508 #059669 #064e3b #08080c #0b3b28 #0d0d0d #0d0d1f ' +
    '#0e0e0e #10b981 #111 #121212 #141516 #16163a #16a34a #1a1a2e #1a1a3f #201436 #222 #22c55e ' +
    '#23234d #2a2350 #3133e7 #3a1730 #4b4df7 #4e4e4e #4e6bff #5667ff #5ddba4 #6366f8 #7577f8 ' +
    '#7a7a7a #7b4dff #7b7df9 #8385ff #848484 #8587ff #888888 #8a8cff #9395ff #93e0bb #9a9a9a ' +
    '#9b59b6 #9b9dfb #a8ecca #a9a9a9 #a9aaff #b7f5d8 #c7d2fe #cdc6f5 #d9603f #d97706 #e2e8f0 ' +
    '#e3f9ec #e5e7eb #e6d5ea #e6e6e6 #ea580c #ece9fb #ef4444 #f0f0f8 #f1f5f9 #f5f5f7 #f5f5fa ' +
    '#f7e6dc #f7f7f7 #f8ddc9 #f8f8fa #f8f8ff #fafafa #ff5656 #ff5b5b #ff5f24 #ff6262 #ff6550 ' +
    '#ff7a7a #ff7d49 #ff8447 #ff8a8a #ff8c00 #ff8c42 #ff9a9a #ffaf64 #ffb74b #fff #ffffff'
  ).split(' '),
);

const HEX = /#[0-9a-f]{3,8}\b/gi;

/** Ogni esadecimale che il file scrive dentro una stringa, una template literal
 *  o un testo JSX. Un commento non è nessuna delle tre. */
const colorsIn = (source, file = 'probe.tsx') => {
  const found = [];
  const isLiteral = (node) =>
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateHead(node) ||
    ts.isTemplateMiddle(node) ||
    ts.isTemplateTail(node) ||
    ts.isJsxText(node);

  const visit = (node) => {
    if (isLiteral(node)) found.push(...((node.text ?? '').match(HEX) ?? []));
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(file, source, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX));
  return found;
};

// Il collettore è l'unica parte che può far mentire questo gate, quindi è
// asserito invece che creduto. Sopra la riga: colori che devono restare
// visibili, ognuno un modo in cui uno dei due stripper li perdeva. Sotto:
// prosa che non deve essere scambiata per un colore.
for (const [source, expected, why] of [
  ['const s = "//js.hsforms.net/x"; const c = "#123456";', ['#123456'],
    'un URL protocol-relative in una stringa non apre un commento'],
  ['const s = `a //b`; const c = "#123456";', ['#123456'],
    'e nemmeno uno dentro una template literal'],
  ['const s = "a/*b*/"; const c = "#123456";', ['#123456'],
    'né /* dentro una stringa apre un commento a blocchi'],
  ['const f = () => <p>Don\'t worry</p>; const c = "#123456";', ['#123456'],
    'un apostrofo in un testo JSX non apre una stringa'],
  ['const r = /^https?:\\/\\//; const c = "#123456";', ['#123456'],
    'e nemmeno le barre dentro una espressione regolare'],
  ['const q = /[\'"]/; const c = "#123456";', ['#123456'],
    'una virgoletta in una classe di caratteri non apre una stringa'],
  ['const s = u.split(/\\/\\//); const c = "#123456";', ['#123456'],
    'due barre adiacenti in una espressione regolare non aprono un commento'],
  ['const c = "#123456"; // commento in coda', ['#123456'],
    'un colore prima di un commento sopravvive al commento'],
  ['const s = `sfondo: linear-gradient(#123456, #654321)`;', ['#123456', '#654321'],
    'una template literal può portarne più di uno'],
  ['// Issue (#176), #168, #abc, e un finto #123456', [],
    'un commento di riga non contribuisce niente'],
  ['/* commento a blocchi con #123456 dentro */', [],
    'e nemmeno un commento a blocchi'],
]) {
  assert.deepEqual(colorsIn(source), expected, why);
}

const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : entry.name.endsWith('.tsx')
        ? [join(dir, entry.name)]
        : [],
  );

// Due perimetri diversi, di proposito.
//
// Un colore fuori palette è un errore solo dove la palette è la regola:
// `app|components`. Ma *usato* conta più largo, perché la palette si legge come
// la palette del sito, e un colore che il sito disegna da `i18n/og-card.tsx`
// non è una voce morta. Con un perimetro solo, spostare un valore nella share
// card — o in `styles/globals.css`, che CLAUDE.md incoraggia — farebbe dire al
// gate di cancellare un colore che il sito sta disegnando. Un gate che dà un
// consiglio falso è peggio di un gate che tace.
//
// ponytail: `styles/globals.css` non è ancora qui dentro. Il CSS non passa dal
// parser TSX, e nessuna voce della palette vive solo lì oggi. Il giorno in cui
// una ci vivrà, il gate dirà di cancellarla: aggiungere una lettura del CSS è
// la toppa, non allargare la palette.
const SCAN = ['app', 'components'];
const ALSO_COUNTS_AS_USED = ['i18n'];

const unexpected = [];
const used = new Set();
for (const [dirs, enforce] of [[SCAN, true], [ALSO_COUNTS_AS_USED, false]]) {
  for (const file of dirs.flatMap(walk)) {
    for (const color of colorsIn(readFileSync(join(ROOT, file), 'utf8'), file)) {
      const hex = color.toLowerCase();
      used.add(hex);
      if (enforce && !ALLOWED.has(hex)) unexpected.push(`${relative('.', file)}: ${color}`);
    }
  }
}

assert.deepEqual(unexpected, [], `Unexpected hex color(s):\n${unexpected.join('\n')}`);

// Una voce che nessuno usa è una voce che nessuno ha verificato, ed è così che
// i sette numeri di Issue sono rimasti nella lista per mesi.
const unused = [...ALLOWED].filter((c) => !used.has(c));
assert.deepEqual(
  unused,
  [],
  `${unused.length} approved colour(s) no file draws:\n${unused.map((c) => `  ${c}`).join('\n')}\n` +
    'Either the code that used it is gone — remove the entry — or it was never a colour. ' +
    'If you are adding one, add the entry in the same change as the code that draws it.',
);

console.log(`[OK] colors: ${ALLOWED.size} approved hex values, all of them drawn`);

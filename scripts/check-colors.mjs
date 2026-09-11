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
//
// Le tre voci entrate con #189 sono il caso opposto, e vanno distinte da quelle:
// non zittiscono un falso positivo, ammettono un colore che il sito disegnava
// già e che era fuori dal perimetro del gate.
//
//   #ff8a5b   l'eyebrow della share card (i18n/og-card.tsx). Un arancio preso
//             fra i due estremi caldi della gradiente brand, #ffaf64 e #ff5656.
//             Non è una deriva: è lì da quando la card esiste, e ogni anteprima
//             su LinkedIn e Slack lo mostra. Sostituirlo con un vicino già in
//             lista avrebbe cambiato l'aspetto di ogni condivisione per far
//             tornare i conti a un gate, che è il verso sbagliato.
//   #2d1a6b   i due stop della gradiente hero su mobile (styles/globals.css).
//   #3a1525   Il terzo stop, #0d0d1f, era già qui — il che dice da solo che la
//             loro assenza era il perimetro e non una scelta.
const ALLOWED = new Set(
  (
    '#000000 #010102 #040404 #047857 #050508 #059669 #064e3b #08080c #0b3b28 #0d0d0d #0d0d1f ' +
    '#0e0e0e #10b981 #111 #121212 #141516 #16163a #16a34a #1a1a2e #1a1a3f #201436 #222 ' +
    '#22c55e #23234d #2a2350 #2d1a6b #3133e7 #3a1525 #3a1730 #4b4df7 #4e4e4e #4e6bff #5667ff ' +
    '#5ddba4 #6366f8 #7577f8 #7a7a7a #7b4dff #7b7df9 #8385ff #848484 #8587ff #888888 #8a8cff ' +
    '#9395ff #93e0bb #9a9a9a #9b59b6 #9b9dfb #a8ecca #a9a9a9 #a9aaff #b7f5d8 #c7d2fe #cdc6f5 ' +
    '#d9603f #d97706 #e2e8f0 #e3f9ec #e5e7eb #e6d5ea #e6e6e6 #ea580c #ece9fb #ef4444 #f0f0f8 ' +
    '#f1f5f9 #f5f5f7 #f5f5fa #f7e6dc #f7f7f7 #f8ddc9 #f8f8fa #f8f8ff #fafafa #ff5656 #ff5b5b ' +
    '#ff5f24 #ff6262 #ff6550 #ff7a7a #ff7d49 #ff8447 #ff8a5b #ff8a8a #ff8c00 #ff8c42 #ff9a9a ' +
    '#ffaf64 #ffb74b #fff #ffffff'
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

  // Un `href` non è un posto dove sta un colore, è un posto dove sta un
  // frammento: `<a href="#cafe">` è un ancoraggio, e letto come colore manda
  // rosso il gate. Conta perché la via più corta per zittire quel rosso è
  // aggiungere `#cafe` alla palette — lo stesso gesto che ci ha messo dentro
  // sette numeri di Issue, e stavolta passerebbe anche l'asserzione nuova,
  // visto che `#cafe` sarebbe davvero disegnato da qualche parte.
  const isHref = (node) =>
    ts.isJsxAttribute(node) && ts.isIdentifier(node.name) && node.name.text === 'href';

  const visit = (node) => {
    if (isHref(node)) return;
    if (isLiteral(node)) found.push(...((node.text ?? '').match(HEX) ?? []));
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(file, source, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX));
  return found;
};

/** In un `.css` non c'è ambiguità da risolvere: un `#` esadecimale è un colore
 *  e i commenti sono solo `/* *\/`. Il parser TSX non serve, e non servirebbe. */
const colorsInCss = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').match(HEX) ?? [];

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
  ['const a = <a href="#cafe">x</a>;', [],
    'un href è un ancoraggio, non un colore'],
  ['const a = <a href="#cafe" style={{ color: "#123456" }}>x</a>;', ['#123456'],
    'ma saltare l’href non fa saltare il resto del tag'],
]) {
  assert.deepEqual(colorsIn(source), expected, why);
}

// Il lettore CSS ha molto meno da sbagliare, ma è comunque lui a decidere se il
// foglio di stile è coperto o solo dichiarato tale.
for (const [source, expected, why] of [
  ['.a { background: #123456; }', ['#123456'], 'una dichiarazione'],
  ['.a { background: radial-gradient(#123456 0%, #654321 40%); }', ['#123456', '#654321'],
    'più stop in una gradiente'],
  ['/* la gradiente vecchia era #123456 */', [], 'un commento CSS non contribuisce'],
  ['.a { color: #123456; } /* era #654321 */', ['#123456'],
    'e non si porta via la dichiarazione che lo precede'],
]) {
  assert.deepEqual(colorsInCss(source), expected, why);
}

// `.tsx` e basta, non `.ts`.
//
// Un colore si disegna in un componente o in un foglio di stile; un `.ts` è
// logica. Verificato invece che assunto: passando il parser su tutti i `.ts` di
// `app components i18n lib hooks data scripts`, l'unico esadecimale dentro una
// stringa è `#116` in `i18n/metadata.ts:67` — il numero di una Issue dentro il
// testo di un assert, non un colore.
//
// ponytail: il giorno in cui un `.ts` terrà una costante di colore, questo gate
// non la vedrà. La toppa non è allargare a `.ts` — dentro una stringa di
// messaggio un riferimento a Issue è indistinguibile da un colore, ed è
// esattamente il falso positivo che #177 ha passato due giri a togliere — ma
// spostare la costante in un `.tsx` o nel CSS, dove il resto della palette vive.
const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : entry.name.endsWith('.tsx')
        ? [join(dir, entry.name)]
        : [],
  );

// Il perimetro è il sito, non due directory su quattro.
//
// Fino a #189 erano `app` e `components`. Fuori restavano tre colori che il
// sito disegna davvero e che nessun gate aveva mai guardato: l'eyebrow della
// share card in `i18n/og-card.tsx`, e due stop della gradiente hero mobile in
// `styles/globals.css`. La share card finisce in ogni anteprima su LinkedIn e
// Slack, quindi non era un angolo morto teorico.
//
// Il difetto non era che tre colori sfuggissero. Era che la palette si legge
// come la palette del sito mentre ne copriva metà: chi la leggeva credeva di
// sapere quali colori il sito disegna, e non lo sapeva.
const SCAN = ['app', 'components', 'i18n'];
const CSS = ['styles/globals.css'];

const unexpected = [];
const used = new Set();

for (const file of SCAN.flatMap(walk)) {
  for (const color of colorsIn(readFileSync(join(ROOT, file), 'utf8'), file)) {
    const hex = color.toLowerCase();
    used.add(hex);
    if (!ALLOWED.has(hex)) unexpected.push(`${relative('.', file)}: ${color}`);
  }
}

for (const file of CSS) {
  for (const color of colorsInCss(readFileSync(join(ROOT, file), 'utf8'))) {
    const hex = color.toLowerCase();
    used.add(hex);
    if (!ALLOWED.has(hex)) unexpected.push(`${file}: ${color}`);
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

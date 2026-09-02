// Sums the gzipped JavaScript each built page loads, from the script tags in
// its own HTML — the number a browser actually downloads, not a chunk list.
//
// The nomodule polyfill bundle is excluded: it is served with `nomodule`, so no
// browser that supports modules ever requests it, and counting it made the site
// look 39 KB heavier than it is.
//
// Usage: node harness/measure-js.mjs [baseline.json]
//        node harness/measure-js.mjs --save baseline.json
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const html = execSync(`find ${join(ROOT, '.next/server/app')} -name '*.html'`, { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

const gz = new Map();
const size = (chunk) => {
  if (!gz.has(chunk)) {
    const p = join(ROOT, '.next', chunk.replace(/^\/_next\//, ''));
    gz.set(chunk, existsSync(p) ? gzipSync(readFileSync(p)).length : 0);
  }
  return gz.get(chunk);
};

const pages = {};
for (const file of html) {
  const doc = readFileSync(file, 'utf8');
  const chunks = [...new Set([...doc.matchAll(/"(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map((m) => m[1]))]
    .filter((c) => !/polyfills/.test(c));
  const route = file.slice(file.indexOf('.next/server/app/') + 17).replace(/\.html$/, '');
  pages[route] = chunks.reduce((n, c) => n + size(c), 0);
}

const arg = process.argv[2];
if (arg === '--save') { writeFileSync(process.argv[3], JSON.stringify(pages, null, 2)); console.log(`saved ${Object.keys(pages).length} pages`); process.exit(0); }

const kb = (n) => (n / 1024).toFixed(1).padStart(7);
if (arg && existsSync(arg)) {
  const before = JSON.parse(readFileSync(arg, 'utf8'));
  const rows = Object.entries(pages).map(([r, now]) => [r, before[r] ?? 0, now]).filter(([, b]) => b);
  const worse = rows.filter(([, b, n]) => n > b + 200);
  const better = rows.filter(([, b, n]) => n < b - 200).sort((a, c) => (a[2] - a[1]) - (c[2] - c[1]));
  console.log(`pages: ${rows.length}   improved: ${better.length}   regressed: ${worse.length}`);
  const totB = rows.reduce((n, [, b]) => n + b, 0), totN = rows.reduce((n, [, , x]) => n + x, 0);
  console.log(`total ${kb(totB)} KB -> ${kb(totN)} KB   avg ${kb(totB / rows.length)} -> ${kb(totN / rows.length)} KB/page`);
  for (const [r, b, n] of [...better.slice(0, 10), ...worse.slice(0, 10)])
    console.log(`  ${kb(b)} -> ${kb(n)} KB  ${n > b ? 'WORSE' : '     '}  ${r}`);
} else {
  const rows = Object.entries(pages).sort((a, b) => b[1] - a[1]);
  const tot = rows.reduce((n, [, v]) => n + v, 0);
  console.log(`${rows.length} pages, avg ${kb(tot / rows.length)} KB gz`);
  console.log('heaviest:'); rows.slice(0, 5).forEach(([r, v]) => console.log(`  ${kb(v)} KB  ${r}`));
  console.log('lightest:'); rows.slice(-3).forEach(([r, v]) => console.log(`  ${kb(v)} KB  ${r}`));
}

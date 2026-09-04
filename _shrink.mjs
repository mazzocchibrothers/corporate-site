import sharp from 'sharp';
import { statSync } from 'node:fs';
const kb = (p) => (statSync(p).size / 1024).toFixed(0);
const jobs = [
  // whitepaper covers: PNG document scans rendered in a card. Format, not size.
  ['public/logos/wp-beyond-skills-en.png',  'public/logos/wp-beyond-skills-en.avif',  1190, 62],
  ['public/logos/wp-future-leaders-en.png', 'public/logos/wp-future-leaders-en.avif', 1190, 62],
  ['public/logos/wp-turnover-en.png',       'public/logos/wp-turnover-en.avif',       1190, 62],
  // blurred 8px at 25% brightness, and used nowhere else.
  ['public/logos/credem_customer_story_cover.avif', 'public/logos/credem_customer_story_cover.avif', 1400, 50],
  // a real, visible photo — 4000px wide for a section image.
  ['public/about/Skillvue_Team_photo.avif', 'public/about/Skillvue_Team_photo.avif', 1920, 60],
];
for (const [src, out, width, quality] of jobs) {
  const before = kb(src);
  const buf = await sharp(src).resize({ width, withoutEnlargement: true }).avif({ quality }).toBuffer();
  await sharp(buf).toFile(out === src ? out + '.tmp' : out);
  if (out === src) { const { renameSync } = await import('node:fs'); renameSync(out + '.tmp', out); }
  console.log(`${before.padStart(6)}KB -> ${kb(out).padStart(5)}KB  ${out}`);
}

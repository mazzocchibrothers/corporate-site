import { readFile } from 'node:fs/promises';

const checks = [
  ['components/landing/LiteYouTubeEmbed.tsx', 'fetchPriority="high"'],
  ['app/[locale]/careers/body.tsx', 'fetchPriority="high"'],
  ['app/[locale]/blog/body.tsx', 'srcSet={article.image.startsWith'],
  ['app/[locale]/resources/whitepapers/body.tsx', 'loading="lazy" decoding="async"'],
];

for (const [file, required] of checks) {
  if (!(await readFile(file, 'utf8')).includes(required)) throw new Error(`${file}: missing ${required}`);
}

console.log(`[OK] images: ${checks.length} priority and lazy-loading rules`);

// @ts-nocheck
// The share card: one 1200x630 image per page, rendered at build time.
//
// Before this the site had no og:image at all, so every link posted to
// LinkedIn — which is where a B2B customer story actually travels — showed a
// title on a blank rectangle.
//
// Next's opengraph-image convention does the wiring: each route re-exports
// `size`, `contentType` and a default function from here, and Next prerenders
// the PNG next to the page and emits og:image with its width and height. That
// is why the card lives in one module and the routes hold three lines each.
//
// Mona Sans ships as woff2 only in public/fonts, and satori — what
// ImageResponse renders with — reads ttf, otf and woff but not woff2. The two
// static ttf weights in assets/fonts are the same family from GitHub's own
// OFL release, kept out of public/ because nothing ever requests them: they
// are a build input, like the message catalogue.

import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getTranslations } from 'next-intl/server';
import { namespaceOf } from './messages';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONTS = join(process.cwd(), 'assets/fonts');
// Read once at module load: ogFor() runs once per route per locale (~122
// times across the build), and the two ttf weights never change between
// calls — re-reading them on every render was 244 redundant readFileSync
// calls for three files that are byte-identical every time (#144 review).
const FONT_REGULAR = readFileSync(join(FONTS, 'MonaSans-Regular.ttf'));
const FONT_SEMIBOLD = readFileSync(join(FONTS, 'MonaSans-SemiBold.ttf'));

const BRAND = 'linear-gradient(135deg, #FFAF64 0%, #FF5656 50%, #4B4DF7 100%)';

/** The wordmark, inlined: satori cannot fetch, so the file becomes a data URI. */
const WORDMARK =
  'data:image/svg+xml;base64,' +
  readFileSync(join(process.cwd(), 'public/logos/Skillvue_logo_solid_white.svg')).toString('base64');

/**
 * The customer stories run to 110 characters, because meta.title is written
 * for the search result and not for a 1200-pixel card. Rather than cut them —
 * the truncated half is the half naming the outcome — the type scales down,
 * and only something past 130 characters is trimmed at a word.
 */
const scale = (n: number) => (n <= 58 ? 62 : n <= 92 ? 52 : 44);

function fit(title: string, max = 130) {
  // The suffix is written four ways across the catalogue — a pipe, a hyphen,
  // an en dash, an em dash — and the card already carries the wordmark.
  const clean = title
    .replace(/\s*[|\-–—]\s*Skillvue\s*$/, '')
    // Fourteen titles are written `Primary | Secondary` for the search result.
    // A pipe reads as a template seam on a card, where a dash reads as a
    // subtitle: "Platform — AI-Powered Talent Verifications".
    .replace(/\s*\|\s*/g, ' — ');
  if (clean.length <= max) return clean;
  const words = clean.slice(0, max).split(' ');
  words.pop();
  return words.join(' ') + '…';
}

export function ogCard({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#040404',
          fontFamily: 'Mona Sans',
        }}
      >
        <div style={{ height: 10, background: BRAND }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px 60px',
          }}
        >
          <img src={WORDMARK} height={44} width={176} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Only where it says something the wordmark above does not. A
                card for /about labelled SKILLVUE under the Skillvue logo is
                two of the same word. */}
            {eyebrow ? (
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: 2.4,
                  textTransform: 'uppercase',
                  color: '#FF8A5B',
                  marginBottom: 22,
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            <div
              style={{
                fontSize: scale(fit(title).length),
                fontWeight: 600,
                lineHeight: 1.14,
                letterSpacing: -1.6,
                color: '#FFFFFF',
              }}
            >
              {fit(title)}
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 400, color: 'rgba(255,255,255,0.42)' }}>
            skillvue.ai
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Mona Sans', data: FONT_REGULAR, weight: 400, style: 'normal' },
        { name: 'Mona Sans', data: FONT_SEMIBOLD, weight: 600, style: 'normal' },
      ],
    },
  );
}

/**
 * The card for a route, in one locale. `meta.title` is what the search result
 * shows, so it is what the share card shows — one string, not a second one to
 * keep in step with the first.
 */
export async function ogFor(routeId: string, locale: string) {
  const t = await getTranslations({ locale, namespace: namespaceOf(routeId) });
  const og = await getTranslations({ locale, namespace: 'shared.ogEyebrow' });
  const section = routeId.includes('/') ? routeId.split('/')[0] : '';
  return ogCard({
    title: t('meta.title'),
    eyebrow: og.has(section) ? og(section) : undefined,
  });
}

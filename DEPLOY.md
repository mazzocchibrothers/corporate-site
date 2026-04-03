# Production Deployment Guide
## Subdirectory i18n: `skillvue.ai/en` + `skillvue.ai/it`

---

## Overview

The site is a single Next.js codebase on a single domain (`skillvue.ai`), deployed once. Language is served via URL path prefix:

- `skillvue.ai/` or `skillvue.ai/en/...` → English
- `skillvue.ai/it/...` → Italian

Next.js i18n handles this natively. The `LanguageContext` already reads from `router.locale`, so no component changes are needed.

> **Note on the `/en/` prefix:** Next.js serves the default locale (English) at the root path `/` without a prefix. The `/it/...` prefix for Italian is automatic. If you want `skillvue.ai/en/...` to also work (for external links or SEO canonical tags), add a redirect in Step 1 below.

---

## Step 1 — Code changes (do before deploying)

### 1a. Update `next.config.ts`

Replace the current i18n block and add slug rewrites + optional `/en` redirect:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      // Make /en/... redirect to /... so both URLs work for English
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Italian translated slugs
      { source: '/clienti',            destination: '/customers'        },
      { source: '/clienti/:slug',      destination: '/customers/:slug'  },
      { source: '/scienza',            destination: '/science'          },
      { source: '/prodotto',           destination: '/product-overview' },
      { source: '/risorse/stampa',     destination: '/resources/press'  },
      { source: '/risorse/whitepaper', destination: '/resources/whitepapers' },
    ];
  },
};

export default nextConfig;
```

### 1b. Update internal links on the Italian version (can be done post-launch)

The navbar and footer currently route to English slugs (`/customers`, `/science`, etc.) for both languages. After launch, update Italian hrefs to use translated slugs:

- Footer: add `hrefIt` values matching the translated slugs
- Navbar: add `pathIt` values for the relevant items

This is a cosmetic/SEO improvement only — pages work at both URLs due to the rewrites above.

---

## Step 2 — Hosting setup (Vercel)

1. Push the updated code to the `main` branch (triggers a new production deployment)
2. In the Vercel dashboard → your project → **Settings → Domains**
3. Add `skillvue.ai` as a custom domain (if not already done)
4. Vercel will show you the DNS records to configure (usually a CNAME or A record)

---

## Step 3 — DNS setup

In your DNS provider (wherever `skillvue.ai` is managed), point the apex domain to Vercel:

| Record | Name | Value |
|--------|------|-------|
| A      | `@`  | `76.76.21.21` (Vercel's IP — confirm in dashboard) |
| CNAME  | `www` | `cname.vercel-dns.com` |

> DNS propagation typically takes a few minutes up to 48 hours.

---

## Step 4 — Verify after DNS propagates

**English (`skillvue.ai/`)**
- [ ] Home loads in English
- [ ] Nav links all work (no 404s)
- [ ] `/book-meeting` loads correctly
- [ ] Language toggle navigates to `skillvue.ai/it/...`
- [ ] A customer story page loads (e.g. `/customers/adr`)
- [ ] `/en/customers/adr` redirects to `/customers/adr`

**Italian (`skillvue.ai/it/`)**
- [ ] Home loads in Italian at `/it`
- [ ] Nav links all work (no 404s)
- [ ] `/it/prenota-incontro` loads correctly
- [ ] Language toggle navigates back to `skillvue.ai/...`
- [ ] Translated slugs work: `/it/clienti`, `/it/scienza`, `/it/prodotto`, `/it/risorse/stampa`, `/it/risorse/whitepaper`
- [ ] A customer story page loads (e.g. `/it/clienti/adr`)

---

## SEO: hreflang

For Google to index both language versions correctly, add `hreflang` tags to the `<head>` of every page:

```html
<link rel="alternate" hreflang="en" href="https://skillvue.ai/customers/adr" />
<link rel="alternate" hreflang="it" href="https://skillvue.ai/it/clienti/adr" />
<link rel="alternate" hreflang="x-default" href="https://skillvue.ai/customers/adr" />
```

This can be added in `pages/_app.tsx` or `pages/_document.tsx` using `next/head`, driven by the current route and locale.

---

## Known post-launch tasks (not blockers)

1. **Blog article slugs** — Italian blog articles will eventually need translated slugs and/or Italian-language content. Not required at launch.
2. **IT internal links** — Navbar and footer still route to English slugs on the Italian version. Add `hrefIt`/`pathIt` values once slug routing is confirmed working.
3. **hreflang tags** — Add to `_app.tsx` or `_document.tsx` for full SEO benefit.
4. **Sitemap** — Generate a sitemap covering both `/` and `/it/` URLs with `hreflang` annotations.

---

## Rollback plan

If anything breaks after DNS switch:

1. In Vercel dashboard → Domains → remove `skillvue.ai`
2. Point DNS back to previous host
3. Fix the issue on a branch, re-deploy, re-add domain

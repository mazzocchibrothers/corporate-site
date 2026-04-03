# Production Deployment Guide
## Two-domain setup: `en.skillvue.ai` + `it.skillvue.ai`

---

## Overview

The site is a single Next.js codebase deployed once. Both domains point to the same deployment. Next.js domain-based i18n automatically serves the correct language based on which domain the user visits — no duplicated code, no separate deployments.

- `en.skillvue.ai` → locale `en` → English content
- `it.skillvue.ai` → locale `it` → Italian content

The `LanguageContext` already reads from `router.locale`, so this works without any component changes.

---

## Step 1 — Code changes (do before deploying)

### 1a. Update `next.config.ts`

Replace the current i18n block and add slug rewrites:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    domains: [
      { domain: 'en.skillvue.ai', defaultLocale: 'en' },
      { domain: 'it.skillvue.ai', defaultLocale: 'it' },
    ],
  },
  async rewrites() {
    return [
      // Italian translated slugs (IT domain only in practice)
      { source: '/clienti',        destination: '/customers'          },
      { source: '/clienti/:slug',  destination: '/customers/:slug'    },
      { source: '/scienza',        destination: '/science'            },
      { source: '/prodotto',       destination: '/product-overview'   },
      { source: '/risorse/stampa', destination: '/resources/press'    },
      { source: '/risorse/whitepaper', destination: '/resources/whitepapers' },
    ];
  },
};

export default nextConfig;
```

> Note: the rewrites are technically available on both domains but only the IT domain links to the translated slugs — so no conflict.

### 1b. Update internal links on the IT domain (can be done post-launch)

The navbar and footer currently route to English slugs (`/customers`, `/science`, etc.) on both languages. After launch, update the Italian hrefs to use translated slugs:

- Footer: add `hrefIt` values matching the translated slugs
- Navbar: add `pathIt` values for the relevant items

This is a cosmetic/SEO improvement only. The pages work at both URLs due to the rewrites above.

---

## Step 2 — Hosting setup

> These instructions are written for **Vercel**, the standard host for Next.js. If using a different platform, the concept is the same: one deployment, two custom domains added.

1. Push the updated code to the `main` branch (triggers a new production deployment)
2. In the Vercel dashboard → your project → **Settings → Domains**
3. Add `en.skillvue.ai` as a custom domain
4. Add `it.skillvue.ai` as a custom domain
5. Vercel will show you the DNS records to configure for each (usually a CNAME or A record)

---

## Step 3 — DNS setup

In your DNS provider (wherever `skillvue.ai` is managed):

| Record | Name | Value |
|--------|------|-------|
| CNAME  | `en` | `cname.vercel-dns.com` (Vercel will give you the exact value) |
| CNAME  | `it` | `cname.vercel-dns.com` (same) |

> If Vercel asks for an A record instead of CNAME, use the IP they provide.
> DNS propagation typically takes a few minutes up to 48 hours.

---

## Step 4 — Verify after DNS propagates

Work through this checklist on both domains:

**`en.skillvue.ai`**
- [ ] Home loads in English
- [ ] Nav links all work (no 404s)
- [ ] `/book-meeting` loads correctly
- [ ] Language toggle switches to `it.skillvue.ai` on the same path
- [ ] A customer story page loads (e.g. `/customers/adr`)

**`it.skillvue.ai`**
- [ ] Home loads in Italian
- [ ] Nav links all work (no 404s)
- [ ] `/prenota-incontro` loads correctly
- [ ] Language toggle switches to `en.skillvue.ai` on the same path
- [ ] Translated slugs work: `/clienti`, `/scienza`, `/prodotto`, `/risorse/stampa`, `/risorse/whitepaper`
- [ ] A customer story page loads (e.g. `/clienti/adr`)

---

## Known post-launch tasks (not blockers)

1. **Blog article slugs** — Italian blog articles will eventually need translated slugs and/or Italian-language content. Not required at launch.
2. **IT internal links** — Navbar and footer still route to English slugs on the IT domain. Add `hrefIt`/`pathIt` values once slug routing is confirmed working.
3. **Sitemap** — Generate separate sitemaps for each domain for SEO (or a combined one with `hreflang` annotations).

---

## Rollback plan

If anything breaks after DNS switch:

1. In Vercel dashboard → Domains → remove the custom domains
2. DNS will stop resolving (any cached TTL will expire within minutes to hours)
3. Fix the issue on a branch, re-deploy, re-add domains

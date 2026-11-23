# DESIGN.md — Skillvue site design system

A buildable spec for new pages, derived from the source of three reference
pages:

| Page | Source |
|---|---|
| `/product` | `app/[locale]/product/body.tsx`, `components/product/PlatformCards.tsx` |
| `/trust` | `app/[locale]/trust/body.tsx`, `components/trust/*` |
| `/product/skillvue-assess` | `app/[locale]/product/skillvue-assess/body.tsx`, `components/assess/*` |

The values below come from `tailwind.config.ts`, `styles/globals.css`,
`components/ui/*` and the page sources. The allowed colours come from
`scripts/check-colors.mjs`. If this file and CLAUDE.md ("Design system")
disagree, CLAUDE.md wins: it is the enforced house standard, and this file
expands on it.

**How to read the tokens.** Almost nothing here is a Tailwind theme key. The
site uses **arbitrary values** (`text-[#121212]`, `rounded-2xl`,
`max-w-[880px]`) plus a small set of **CSS classes** in `globals.css`
(`type-*`, `section-*`, `stat-value`, `hero-*`, `gradient-text`). The
shadcn-style theme keys in `tailwind.config.ts` (`bg-primary`, `text-muted-foreground`…)
exist, but none of the three pages uses them. Copy the literal classes below,
not theme keys.

Markers: **canonical** = use this value. **variant** = seen, but not the system
value (see §7). **unverified** = not traceable to one definition in code.

---

## 1. Overview

- **Tone:** calm, evidence-led B2B. Clean white and light-grey surfaces, near-black
  type, one indigo brand colour, and a warm orange used sparingly for
  "problem / risk" accents.
- **Density:** generous. Large section padding (≈ 64px on mobile, 112–136px on
  desktop), content held to 880px for copy and 1144px for grids.
- **Aesthetic:** flat cards (16px radius, a 1px hairline or no border, rarely a
  shadow). Product UI is redrawn in HTML inside window frames. The only motion is
  a fade-and-rise on scroll (`<Reveal>`). Product pages are light. The site
  shell (body, footer, closing band) is dark.

---

## 2. Design tokens

### 2.1 Colour

All hexes must appear in `ALLOWED` in `scripts/check-colors.mjs`. A new colour is
added there in the same change that draws it.

**Brand / accent**

| Role | Hex | Used as | Notes |
|---|---|---|---|
| Brand primary 500 (light bg) | `#4B4DF7` | `text-[#4B4DF7]`, `bg-[#4B4DF7]` | Primary button (light), eyebrows on light, checks, stats, links. ≈ `--primary` (`239 91% 63%`) |
| Brand primary hover / pressed | `#3133E7` | `hover:bg-[#3133E7]`, `hover:text-[#3133E7]` | Hover for primary-light and for links |
| Brand primary (dark bg) | `#6366F8` | `bg-[#6366F8]` | Primary button on dark, `IconTile` dark |
| Brand primary 400 | `#6B7DFF` | `text-[#6B7DFF]` | Eyebrows on dark sections; trust's stroke icons |
| Brand tints | `#8587FF` `#A9AAFF` `#D9DAFF` `#E1E2FF` `#F6F7FF` `#EFEEFB` `#EFEEFD` | borders, highlighted column, gradient stops | `#E1E2FF` is also the announcement bar's background |
| Accent orange ("problem") | `#FF5F24` | `text-[#ff5f24]` | Problem eyebrow, ✗ marks, "never" list. ≈ `--accent` (`16 100% 57%`) |
| Orange, deep | `#D9603F` | `text-[#d9603f]` | Assess: alarm card, "partly" verdict |
| Orange, UI | `#EA580C` | `text-[#EA580C]` | Trust: "customer" role pill, "in progress" pill |
| Peach tints | `#FDF1EA` `#FDF3EC` `#F8DDC9` | warm card / pill fills and borders | |
| Brand gradient | `#FFAF64 → #FF5656 → #4B4DF7` @135° | `.gradient-text` | Heading accent phrase (see §4.12) |

**Neutrals — light sections (the default for content pages)**

| Role | Hex | Class |
|---|---|---|
| Text, primary | `#121212` | `text-[#121212]` |
| Text, secondary (body, ledes) | `#4B4B4B` | `text-[#4B4B4B]` |
| Text, tertiary (sources, meta) | `#707070` | `text-[#707070]` (trust uses `text-[#121212]/60` instead — variant). Was `#7A7A7A`, which is 4.29:1 on white and 4.01:1 on `#F7F7F7` and fails AA; `#707070` is 4.95 / 4.62 |
| Muted / disabled-looking | `#888888`, `#A9A9A9` | secondary-button border (light), locked icons |
| Page background, white | `#FFFFFF` | `.section-light` |
| Page background, grey | `#F7F7F7` | `.section-breathe` |
| Card on white | `#F7F7F7` | `bg-[#f7f7f7]` |
| Card on grey | `#FFFFFF` | `bg-white` |
| Sub-surface | `#FAFAFA`, `#F5F5F7` | visual wells, product tiles, `.trust-dots` board |
| Pill fill | `#F1F5F9` | tag pill, chips |
| Border, canonical | `#E5E7EB` | `border-[#e5e7eb]` |
| Border, variants | `#EBEBEB`, `black/[0.06]`, `black/[0.08]` | see §7 |
| Active tab pill | `#E7E7E8` | `/product` tabs only |

**Neutrals — dark context**

| Role | Value | Where |
|---|---|---|
| Body background | `#040404` | `body` in `globals.css` |
| Dark section | `#000000` | `.section-dark`, navbar on dark |
| Footer | `#050508` | `components/Footer.tsx` |
| Dropdown panel on dark | `#1E1E1E` | Navbar mega-menu |
| Text on dark | `white`, `white/90`, `white/70`, `white/[0.65]` | headings → body |
| Card surface on dark | `border-white/[0.06] bg-white/[0.02] backdrop-blur-sm` | `ClosingBanner` |

**States**

| State | Value |
|---|---|
| Hover, primary (light) | `bg-[#3133E7]` |
| Hover, primary (dark) | `bg-[#4B4DF7]` |
| Hover, text link | `text-[#4B4B4B]` → `hover:text-[#121212]`, or `#4B4DF7` → `#3133E7` |
| Hover, card | `hover:-translate-y-1` + shadow (§2.5), or the shadow alone |
| Press | `active:scale-[0.97]` (tabs, trust CTA) |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` (`Button`) |
| Focus | `focus-visible:ring-2 focus-visible:ring-white/50` (navbar only. **unverified** as a site-wide rule; content pages rely on the browser default) |
| Success | `#059669` (trust pack "available now" check) |
| Destructive | `--destructive` exists in the theme; no page uses it |

### 2.2 Typography

**Families** (`styles/globals.css`, self-hosted woff2 in `public/fonts/`)

| Role | Family | Applied by |
|---|---|---|
| Body, UI, rich text | `'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, … sans-serif` | `body` rule and every `type-*` class |
| Headings, display, big numbers | `'Mona Sans', sans-serif` (200–900, italics 300–800) | `h1–h6`, `.stat-value`, `font-display`, `.gradient-text` |
| Code | `'Geist Mono', monospace` | `type-code`, `code` |

- Mona Sans needs `font-feature-settings: 'ss05' 1` (double-storey "a"). It is
  already on `h1–h6`, `.stat-value`, `.font-display`, `.mono`, the gradient
  classes and `[style*="Mona Sans"]`. A new rule that sets Mona Sans must add it.
  Never put it on the root.
- `tailwind.config.ts` `fontFamily.sans` says `Inter`. That is stale and
  overridden by `body`. Don't use `font-sans` or `font-manrope`.
- Text wrapping (global): `p, li, h1, h3, h4 { text-wrap: pretty }` and
  `h2 { text-wrap: balance }`.

**Headings (Mona Sans) — set with utilities**

| Level | Classes | Size / weight / LH / tracking |
|---|---|---|
| H1 hero | `font-semibold text-[48px] md:text-[58px]` + `style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}` | 48→58 / 600 / 1.1 / −0.02em |
| H2 section | `font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1]` | 28.8→48 / 600 / 1.1 / −0.02em |
| H3 card / item (canonical) | `text-[20px] font-semibold leading-[1.25] tracking-[-0.01em]` | 20 / 600 / 1.25 / −0.01em. Assess adds `md:text-[22px]`; see §7 for variants |
| Display, large (panel titles) | `font-display text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.02em]` | Assess proctoring panel |
| Display, statement / quote | `font-display text-[22px] md:text-[30px] font-semibold leading-[1.3] tracking-[-0.01em]` | Assess quote; the "stakes" line is `font-medium` at 24→32 |
| Display, pillar name | `font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.02em]` | Assess "control" pillars |
| Display, small label | `font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em]` | Trust role headers, pack titles |

Every hero h1 is 58px from `md` up. Every H2 tops out at 48px with the `4vw`
slope; only the mobile minimum may change.

**Body and UI (Geist) — one class per style, from `globals.css` `@layer components`**

| Class | Size / LH / weight / tracking | Use |
|---|---|---|
| `type-body-lg` | 18 / 28px / 400 | Hero subtitle, section lede |
| `type-body` | 16 / 24px / 400 | Body, card text, FAQ |
| `type-body-bold` | 16 / 24px / 600 | Bold line of a checked point |
| `type-body-sm` | 14 / 20px / 400 | Card body (dense), meta, table headers |
| `type-caption` | 12 / 1.4 / 400 | Pills, chips, footnotes |
| `type-button` | 16 / 1 / 500 | Every button label and tertiary link |
| `type-link` | 16 / 1.5 / 500 | Standalone text links |
| `type-list` | 16 / 1.6 / 400 | Long lists |
| `type-blockquote-lg` | 24 / 1.4 / 500 / −0.01em | Large quote |
| `type-blockquote` | 20 / 32px / 400 / −0.01em | Quote |
| `type-eyebrow` | 12 / 1.45 / 500 / +0.1em, uppercase | Eyebrows, card tags |
| `type-code` | Geist Mono 13 / 1.7 / 400 | Code |

Rule: text that is not a heading takes one of these classes. No hand-set
`text-[Npx]`, `leading-*` or `tracking-*` next to it. Colour and `font-medium`
utilities may be added.

**Big numbers**

`.stat-value` (Mona Sans, weight 600, set only in `globals.css`), coloured
`text-[#4B4DF7]`, `lineHeight: 1`. Sizes in use: `text-[32px]` (inline),
`text-[36px] md:text-[44px]` (hero proof), `text-[40px] md:text-[44px]` (story
cards). Largest site-wide: `text-[32px] md:text-[54px]`. Animate with
`<CountUp>` (`components/assess/count-up.tsx`).

### 2.3 Spacing

- **Scale:** Tailwind's default 4px scale. No custom `spacing` in the config.
  Arbitrary px values (`mt-[26px]`, `pt-[168px]`) are common. Prefer the scale
  values in the table below for new work.
- **Container gutters (canonical):** `px-5 md:px-8 lg:px-12` = 20 / 32 / 48px.

| Purpose | Canonical value |
|---|---|
| Section vertical padding | `py-16 md:py-[88px] lg:py-[112px]` (64 / 88 / 112). Assess's `SECTION`. See §7 |
| Hero top padding (clears navbar + banner) | `pt-[144px] md:pt-[168px] lg:pt-[192px]` (Assess), `pt-[168px]` (Trust). **unverified** which is intended |
| Eyebrow → H2 → lede gap | `gap-5` (20px) in a centred column (`Head` in Assess) |
| H1 → subtitle | `mt-[26px]` (product) / `mt-7` (trust) ≈ 26–28px |
| Section head → content | `mt-12 md:mt-16` (48 / 64) |
| Card grid gap | `gap-4` (16) or `gap-3 md:gap-6` (12 / 24) |
| Card padding | `p-6` (24), `p-5 lg:p-6`, large `p-7` (28) / `md:p-10` (40) |
| Card internal: tag → title → body | `mt-3` each (12px) |
| Footer-of-card rule | `mt-6 border-t … pt-4`/`pt-5` |
| Button group gap | `gap-3` (pills), `gap-x-10 gap-y-4` (button + text link) |

### 2.4 Radius and borders

| Token | Value | Use |
|---|---|---|
| `rounded-full` | 9999px | Buttons, tabs, pills, chips |
| `rounded-lg` | `var(--radius)` = 0.5rem = 8px | Small icon wells (`h-8 w-8`), mobile table rows |
| `rounded-xl` | 12px | `IconTile`, doc chips |
| `rounded-2xl` | **16px — canonical card radius** | Every card |
| `rounded-[20px]` | 20px | Large panel, mobile. Trust security cards |
| `rounded-3xl` | **24px — canonical large panel / banner** | Gradient panels (`md:`), `ClosingBanner`, trust hero visual, product window frame |
| `rounded-[24px] md:rounded-[40px]` | 24 → 40px | `PlatformCards` surface, product closing CTA |
| `rounded-[14px]` | 14px | Trust only (FAQ items, cert grid, role headers). Variant |
| Border width | `border` = 1px everywhere. Dashed: `border-dashed border-[#121212]/25` (trust "on request") |

Note: Tailwind's `rounded-lg/md/sm` are overridden to `--radius` and its steps
(8 / 6 / 4px). `rounded-xl`, `2xl` and `3xl` keep Tailwind's defaults.

### 2.5 Shadows / elevation

Flat by default. Elevation marks *the one item that matters* or a hover.

| Name | Value | Use |
|---|---|---|
| Raised (featured) | `shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)]` | Assess: the featured product tile and card; story-card hover. **Canonical** |
| Hover lift | `hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(20,20,60,0.10),0_2px_6px_rgba(20,20,60,0.03)]` | `PlatformCards` |
| Subtle (trust) | `shadow-[0_1px_2px_rgba(16,24,40,.04),0_6px_16px_rgba(16,24,40,.04)]`, pill `shadow-[0_2px_6px_rgba(16,24,40,.06)]` | Trust role cards/pills. Variant |
| Window frame | `bg-[#121212]/[0.035] p-2 shadow-[inset_0_0_0_1px_rgba(18,18,18,0.05)]`, inner `shadow-[0_0_0_1px_rgba(30,30,80,0.06)]` | `Window` in `components/assess/visuals/frame.tsx` |

### 2.6 Motion

| Name | Value | Source |
|---|---|---|
| Scroll entrance | `<Reveal>`: opacity 0→1 + rise `y`px, once, `rootMargin -100px`, default `0.5s ease-out` | `components/ui/reveal.tsx` |
| Reveal presets in use | Section head / cards `y={16}`. Visuals `y={24}–{40} scale={0.98} duration={0.8–0.9}`. Stagger `delay={i * 0.06–0.1}` | page sources |
| Hero entrance (CSS, LCP-safe) | `.hero-fade-up` 0.7s `cubic-bezier(0.22,1,0.36,1)`, `.hero-delay-1/2/3` | `globals.css` |
| Colour transitions | `transition-colors duration-200` (Button). Navbar bg `0.3s ease` | |
| Card hover | `duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]` | `PlatformCards` |
| Arrow nudge | `group-hover:translate-x-0.5` (or `translate-y-0.5` for a down arrow) | |
| Accordion | open 300ms `cubic-bezier(0.215,0.61,0.355,1)`, close 220ms | `TrustFaq` |
| Reduced motion | Every animation above is disabled under `prefers-reduced-motion` | |

framer-motion only for genuinely state-driven motion. Never wrap the logo
marquee in `<Reveal>`.

---

## 3. Layout

### 3.1 Breakpoints

Tailwind defaults (the config defines no `screens`): `sm` 640, `md` 768,
`lg` 1024, `xl` 1280, `2xl` 1536. Mobile-first `min-width`. The marquee also has
a `max-width: 767px` media query in CSS.

*Exception:* `/trust` uses `max-[1080px]:`, `max-[900px]:`, `max-[760px]:` from
its own design. Don't copy that to new pages (§7).

### 3.2 Containers

| Container | Classes | Use |
|---|---|---|
| Page container (canonical) | `max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12` | Navbar, Footer, `ClosingBanner`, `/product` |
| Wide variant | `max-w-[1440px] …` same gutters | `/product/skillvue-assess`. Variant |
| Narrow variant | `max-w-[1184px] mx-auto px-8 max-[760px]:px-5` | `/trust`. Variant |
| Inset card band | `max-w-[1344px] mx-5 md:mx-8 lg:mx-auto` | `PlatformCards`, product closing CTA |

**Inner measure** (inside the container, centred with `mx-auto`):

| Width | Use |
|---|---|
| `max-w-[880px]` | Section title + lede, FAQ list, centred statements (CLAUDE.md rule) |
| `max-w-[918px]` | Assess hero copy column |
| `max-w-[1040px]` | Hero visual, report visual, 3-column points |
| `max-w-[1144px]` | Card grids, tables, panels |
| `max-w-[560px]` | Copy column beside a visual |

### 3.3 Grids

| Pattern | Classes |
|---|---|
| 4-up cards | `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4` |
| 3-up cards | `grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6` |
| 3 columns with rules | `md:grid-cols-3 md:gap-0`. Items `md:pr-10`, items 2+ `md:border-l md:border-black/[0.08] md:pl-10` |
| Copy / visual split | `grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16` |
| Title left, lede right | `grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-16 gap-y-6` (trust) |
| Feature row (product) | `grid gap-3 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4` (or `lg:grid-cols-3` for 3 items) |

### 3.4 Section rhythm

- A page alternates **`.section-light` (#fff)** and **`.section-breathe`
  (#F7F7F7)** with hard edges (no fade strips: `.fade-into-*` is `display:none`).
- The card colour flips with the background: grey card on white, white card on grey.
- `scroll-mt-20` (or `scroll-mt-[80px]`) on every section that is an anchor target.
- **Interim standard, pending the redesign:** a light page ends on a **light
  final CTA section** — a white `.section-light` holding the Assess closing
  panel (§4.19) — followed by the **dark** `Footer` (§4.20).
  - The closing section is always white, never `#F7F7F7`: the panel's gradient
    runs through `#F7F7F7`, so on grey its centre would melt into the section.
  - After another white section it takes a top rule (`border-t
    border-[#e5e7eb]`, the `rule` prop), the /product convention (§7 #17).
  - **Temporary exception, until step 5:** /science has no rule. Its product
    cross-links (white, `pb-2`) are built as one block with the CTA. Revisit
    when /science is converted.
  - Pages still dark (and the `/lp`, `/demo` pages) keep the dark band:
    `ClosingBanner` / `SolutionFinalCTA` with the default `tone="dark"`.

---

## 4. Components

### 4.1 Button — `components/ui/button.tsx` (`<Button>`)

Base: `type-button inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-colors duration-200`, icons `size-4`. Default icon is `ArrowRight` on the right.

| Variant × mode | Classes | Size |
|---|---|---|
| `primary` / `light` | `bg-[#4B4DF7] text-white hover:bg-[#3133E7]` | `px-6 py-4` → 48px |
| `primary` / `dark` (default) | `bg-[#6366F8] text-white hover:bg-[#4B4DF7]` | 48px |
| `secondary` / `light` | `border border-[#888888] text-[#888888] hover:bg-[#4B4DF7]/20 hover:border-[#4B4DF7]/50 hover:text-[#4B4DF7]` | `py-[15px]` (+1px border = 48px) |
| `secondary` / `dark` | `border-white text-white hover:bg-white hover:text-[#121212]` | 48px |
| `tertiary` / `light` | `text-[#6366F8] hover:text-[#3133E7]`, no padding | text link |
| `tertiary` / `dark` | `text-[#6366F8] hover:text-[#8587FF]` | text link |

- `mode` = the background it sits on, not a theme.
- As a link: `<Button asChild variant="primary" mode="light"><a href={href('book-meeting', locale)}>{label}<ArrowRight aria-hidden="true" /></a></Button>`.
  With `asChild` you place the icon yourself.
- Optional press feedback (trust): `active:scale-[0.97]` + `hover:[&_svg]:translate-x-[3px]`.
  On phones the trust CTA is `w-full`.
- Tracked demo CTA: `BookDemoButton` (`components/assess/book-demo-button.tsx`) wraps the primary-light button and pushes the GTM event.

### 4.2 Hand-rolled tertiary link (card CTA)

`inline-flex items-center gap-2 type-button text-[#4B4DF7] hover:text-[#3133E7]` + `ArrowRight className="h-4 w-4"`.
Inside a card: `mt-auto pt-6`. When the whole card is the link, use
`group-hover:text-[#3133E7]`. This is the CLAUDE.md spec. Note the `tertiary`
Button variant uses `#6366F8` instead (§7).

### 4.3 Secondary text link (beside a primary button)

`type-link group flex items-center gap-3 font-medium text-[#4B4B4B] hover:text-[#121212] transition-colors`
+ `ArrowRight w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5`. Product hero.

### 4.4 Outline pill on light ("Read more")

`type-button group inline-flex h-12 items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-6 text-[#121212] transition-colors hover:bg-[#f7f7f7]`.
Product sections only. Not the `Button` secondary-light variant (§7).

### 4.5 Navbar — `components/landing/Navbar.tsx`

- Fixed, `z-40`, inner `max-w-[1400px] mx-auto px-6 lg:px-12 h-[80px]`. Hides on scroll down (`-translate-y-full`, 0.5s).
- Background: `#ffffff` over light sections, `#000000` over dark ones once scrolled or with a menu open, transparent at the top of a dark page. Never a translucent tint.
- Dropdown panels: `rounded-2xl border p-2 min-w-[220px]`, `#ffffff` on light, `#1e1e1e` on dark. Items `px-4 py-3 rounded-xl type-body`.
- Right side: EN/IT segmented control (`rounded-full p-[3px]`, items `type-body-sm px-3 py-1`) and a primary `Button` whose `mode` follows the section.
- The announcement bar (`components/landing/AnnouncementBar.tsx`, `bg-[#e1e2ff]`) sits above it, with a spacer. Hero top padding must clear both.
- Every page renders `<Navbar />` and `<Footer />` itself.

### 4.6 Hero copy — `components/ui/hero-copy.tsx` (`<HeroCopy>`)

```tsx
<HeroCopy>
  <h1 className="font-semibold text-[48px] md:text-[58px] text-[#121212]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>…</h1>
  <p className="type-body-lg hero-subtitle mt-[26px] text-[#4B4B4B]">…</p>
</HeroCopy>
```
The subtitle has no `max-w-*`. It ends on the h1's longest line. Optional eyebrow above (`type-eyebrow text-[#4B4DF7]`), CTA row below (`mt-8`).

### 4.7 Section head (eyebrow + H2 + lede)

The Assess `Head` pattern. **Canonical** for a centred opening:

```tsx
<Reveal y={16} className="mx-auto flex max-w-[880px] flex-col items-center gap-5 text-center">
  <p className="type-eyebrow text-[#4B4DF7]">…</p>
  <h2 className="font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212]">…</h2>
  <p className="type-body-lg text-[#4B4B4B]">…</p>
</Reveal>
```
Left-aligned variant: same parts in a `max-w-[560px]` column, `mt-5` between them. Split variant (trust): H2 left, `type-body` lede right in an auto-fit grid. Product variant: product logo, then H2 with a "Read more" pill aligned to its baseline (`flex flex-wrap items-end justify-between`).

### 4.8 Eyebrow

`type-eyebrow` + colour: `text-[#4B4DF7]` on light (default), `text-[#6B7DFF]` on dark,
`text-[#ff5f24]` for a problem/risk section, `text-[#4B4B4B]` for a neutral card tag.
Don't add `font-medium`; the class already sets 500.

### 4.9 Card

| Variant | Classes |
|---|---|
| Card on white section | `rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-5 lg:p-6` |
| Card on grey section | `rounded-2xl bg-white p-6` (no border), or `border border-black/[0.06]` |
| Featured card | as above + `shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)]` |
| Card with visual well | `flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white`. Well: `border-b border-black/[0.06] bg-[#fafafa] p-5`. Body: `flex flex-1 flex-col p-6` |
| Link card | `group flex h-full flex-col rounded-2xl bg-white p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)]` |
| Brand card (one per page, max) | `rounded-[20px] bg-[#4B4DF7] p-7 text-white`, body `text-white/85` (trust ISMS) |

Inside: optional `IconTile` or eyebrow tag → `h3` (`mt-3`/`mt-4`) → body `type-body` (or `type-body-sm`) `text-[#4B4B4B] mt-3` → optional footer row (`mt-6 border-t border-black/[0.08] pt-4`) or tag pill.

### 4.10 Icon tile — `components/ui/icon-tile.tsx` (`<IconTile>`)

40×40, `rounded-xl`, Lucide icon 24×24 `strokeWidth={1.5}`.
`mode="light"`: `bg-[#4B4DF7]/10` + `text-[#4B4DF7]`. `mode="dark"`: `bg-[#6366F8]/15` + `text-[#6366F8]`.
Warm variant (hand-rolled, Assess): `h-8 w-8 rounded-lg bg-[#fdf1ea] text-[#ff5f24]`, icon `h-4 w-4`.

### 4.11 Pills and chips

| Name | Classes | Use |
|---|---|---|
| Tag pill (canonical) | `rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 type-caption text-[#4B4B4B]` | Source / category under a card |
| Icon chip | `flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-1.5 type-body-sm text-[#121212]` + 14–16px icon | Trust chips |
| Integration chip | `rounded-full border border-black/[0.1] bg-white px-3 py-1 type-caption font-medium text-[#121212]` | Assess systems. Variant |
| Status pill (warm) | `rounded-full border border-[#FDF1EA] bg-[#FDF3EC] px-2 py-px type-caption font-medium text-[#EA580C]` | "In progress" |
| Tab pill | `type-body h-11 px-6 rounded-full font-medium`. Active `bg-[#E7E7E8] text-[#121212]`, idle `text-[#4B4B4B] hover:text-[#121212]` | `/product` tabbed panel |

### 4.12 Heading accent

**Interim standard, pending the redesign — light sections have no accent
gradient.** The `.gradient-text` family starts at `#FFAF64`, about 1.8:1 on
white. On a `.section-light` or `.section-breathe` section the accent span keeps
its words but carries no gradient class and no italic: it reads in the
heading's colour, exactly like the rest of the heading. This matches CLAUDE.md.

On dark sections (heroes and bands that stay dark, the closing band) the
gradient remains: `t.rich('…', { span: (c) => <span className="gradient-text">{c}</span> })`,
`font-semibold` like the heading. **No heading is italic**, on light or dark sections: the accent
differs by colour only. (The `/lp` landing pages are out of scope and left as they are.) Inside `h1`/`h2` it wraps word by word
(`display:inline`, `box-decoration-break: slice`).

None of the three reference pages uses the gradient. Assess uses a plain orange
span (`text-[#ff5f24]`) for its "problem" headline (§7).

### 4.13 Checked points list

```tsx
<li className="flex gap-3.5">
  <Check className="mt-1 h-4 w-4 shrink-0 text-[#4B4DF7]" strokeWidth={1.75} aria-hidden="true" />
  <span><span className="block type-body-bold text-[#121212]">…</span><span className="mt-1 block type-body text-[#4B4B4B]">…</span></span>
</li>
```
List: `mt-8 flex flex-col gap-5`, or `grid md:grid-cols-3 gap-6 md:gap-8` for a row. Single-line variant: `flex items-center gap-3 type-body text-[#121212]`. Negative variant: `X` in `#ff5f24`, `line-through decoration-[#ff5f24]`.

### 4.14 Stat block

`<span className="stat-value text-[#4B4DF7] block text-[36px] md:text-[44px]" style={{ lineHeight: 1 }}>`, then a `type-body text-[#121212]` label and a `type-body-sm text-[#707070]` source. Centred, `gap-3`. Use `<CountUp value=…>` below the fold.

### 4.15 Gradient panel (light)

`rounded-[20px] md:rounded-3xl p-6 md:p-10` + `style={{ backgroundImage: 'linear-gradient(100deg, #efeefb 0%, #f7f7f7 55%, #fdf3ec 100%)' }}` (indigo→grey→peach. Reverse it for a closing panel). White cards inside: `rounded-2xl border border-black/[0.06] bg-white p-5`.
Related: `PlatformCards`' `linear-gradient(90deg, #fdf1ea 0%, #f5f5f7 50%, #efeefd 100%)`.

### 4.16 FAQ — `components/trust/TrustFaq.tsx` (`<TrustFaq items={…}>`)

Native `<details>`. Item: `bg-white border border-[#EBEBEB] rounded-[14px] px-6`. Summary `py-5 type-body font-medium text-[#121212]` with a `Plus` icon that rotates 45° when open. Answer `pb-[22px] type-body text-[#4B4B4B] max-w-[620px]`. First item open.
The parent needs `.trust-page` or `.assess-faq` for the marker reset and the plus rotation. A new page wraps it in `.assess-faq`, or the CSS selector is widened (§7). Place it on a `section-breathe` band, `max-w-[880px]`.

### 4.17 Product window / visual

`Window` and `Illustration` from `components/assess/visuals/frame.tsx`: 8px translucent frame `rounded-[24px]`, inner `rounded-[16px] bg-white`, title bar with dots `#ff6262 #ffb74b #22c55e`, optional bottom fade via mask. The wrapper is `role="img"` with an `aria-label`, and everything inside is `aria-hidden`. A component that redraws real product UI may use product colours only via `PRODUCT_UI` in `check-colors.mjs`.

### 4.18 Comparison table

`table border-separate border-spacing-0`. Rules `border-b border-black/[0.08]`. Highlighted ("ours") column: `bg-[#f6f7ff] border-x border-[#a9aaff]`, `rounded-t-2xl` on the header cell and `rounded-b-2xl` on the last cell. Below `md` it becomes stacked cards (`rounded-2xl border border-black/[0.08] p-4`, rows `rounded-lg px-3 py-2`).

### 4.19 Closing banner — `components/shared/ClosingBanner.tsx`

**Interim standard, pending the redesign: light on light pages.** Model: the
Assess closing panel.

- `<ClosingBanner heading body cta tone="light" rule? />` (and
  `<SolutionFinalCTA … tone="light" rule? />`). Section `section-light py-20
  lg:py-24`, plus `border-t border-[#e5e7eb]` with `rule`.
- Panel `rounded-[20px] md:rounded-3xl px-6 py-14 md:px-16 md:py-24`, centred,
  `style={{ backgroundImage: CLOSING_PANEL_GRADIENT }}` =
  `linear-gradient(100deg, #fdf3ec 0%, #f7f7f7 50%, #efeefb 100%)` (exported
  from `ClosingBanner.tsx`).
- H2 `text-[#121212]`, accent phrase with no gradient and no italic. Body
  `type-body-lg text-[#4B4B4B]`. Primary `Button` `mode="light"`.
- Client-logo row: logos `filter: brightness(0)` at `opacity-[0.55]`, static
  (no hover fade).
- Single-page closings (`CTASection`, `CustomersFinalCTA`, `ScienceCTA`, the
  /product and /partners closings) use the same panel and gradient.

`tone="dark"` (the default) is the original dark band, for pages still dark
and the `/lp` pages: card `rounded-3xl border border-white/[0.06]
bg-white/[0.02] backdrop-blur-sm`, H2 `text-white/90`, body `text-white/[0.65]`,
primary-dark `Button`, logos inverted with a hover fade.

### 4.20 Footer — `components/Footer.tsx`

`bg-[#050508] border-t border-white/[0.04] pt-10 md:pt-14 pb-6`, same 1400 container. Render as is. **It stays dark**, also after a light final CTA section: the light-to-dark edge is the page's end.

---

## 5. Patterns and page structure

**Reference skeleton (light content page)**

```
<Navbar />
<main className="section-light">
  Hero             section-light  pt-[144px] md:pt-[168px] lg:pt-[192px]
                   eyebrow? + HeroCopy(h1 + subtitle) + CTA row
                   then optional: points row / hero visual / 3 stats
  Section A        section-breathe  SECTION
                   Head (eyebrow + H2 + lede) → mt-12 md:mt-16 → card grid
  Section B        section-light    SECTION
                   copy column | visual   (lg:grid-cols-2)
  Section C        section-breathe  …   (keep alternating)
  FAQ              section-breathe  centred H2 + TrustFaq (max-w 880)
</main>
<ClosingBanner … tone="light" />   white section, Assess panel (rule after a white section)
<Footer />                          dark
```

**Recurring compositions**

| Pattern | Recipe |
|---|---|
| Centred opening | `Head` (§4.7), then content `mt-12 md:mt-16` |
| Card row | 3- or 4-up grid (§3.3), cards per §4.9, staggered `Reveal delay={i * 0.08}` |
| Text / visual pair | `CONTAINER grid lg:grid-cols-2 items-center gap-12 lg:gap-16`. Copy `max-w-[560px]`: eyebrow, H2 `mt-5`, lede `mt-5`, points `mt-8`. Visual in `<Reveal y={24} scale={0.98} duration={0.8}>`. Alternate the section tone on consecutive pairs |
| Problem → solution | Two columns joined by an `ArrowRight` in `#4B4DF7`: left eyebrow `#ff5f24`, right eyebrow `#4B4DF7`, each with an H3 and `type-body` text (`/product`) |
| Ruled columns | 3 columns, `md:border-l md:border-black/[0.08] md:pl-10` dividers, no cards |
| Proof | Story link cards (logo, stat, sentence, tertiary link) + a centred `figure` quote |
| Mid-page CTA | Primary-light `Button` after a section's content (trust repeats it per pillar) |

**Rhythm rules**

1. Background alternates white / `#F7F7F7`, with hard cuts. Don't put two adjacent sections on the same tone unless a `border-t border-[#e5e7eb]` separates them (the `/product` pattern).
2. One `SECTION` padding constant per page. Don't vary it per section.
3. Everything that enters, enters through `<Reveal>`: head `y={16}`, cards staggered, visuals larger and slower.
4. Centre section heads by default. Left-align only next to a visual or in a split head.

---

## 6. Usage rules for new pages

**Do**

- Build from `Button`, `HeroCopy`, `Reveal`, `IconTile`, `TrustFaq`, `ClosingBanner`, `CountUp`. Don't write a second version of any of them.
- Use `max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12` as the page container, and constrain content with the inner measures (880 / 1040 / 1144).
- Use `py-16 md:py-[88px] lg:py-[112px]` for every content section.
- Put text on a `type-*` class. Put headings on the H1 / H2 / H3 specs in §2.2. Put metrics on `.stat-value`.
- Use `#121212` / `#4B4B4B` / `#707070` for text on light, and `#4B4DF7` for every brand touch on light.
- Use `mode="light"` buttons and icon tiles on light sections and `mode="dark"` on dark ones.
- Flip the card colour against the section: `#F7F7F7` card on white, white card on `#F7F7F7`.
- Radius: 16px for cards, 24px for panels and banners, `full` for every pill.
- Close on a light final CTA (`ClosingBanner tone="light"`, §4.19), then the dark `Footer`.
- Put every visible string in `messages/{en,it}.json` and every hex in the `check-colors` palette.

**Don't**

- Don't use `max-w-*` on a hero subtitle, or `<br>` in an H2. Don't change H2 weight, tracking, max size or slope.
- Don't use `uppercase` or tracking on button labels. Don't build a hand-rolled outline pill on dark (use `secondary` / `dark`).
- Don't put shadows on ordinary cards. Elevation is for the single featured item or a hover.
- Don't use the shadcn theme keys (`bg-primary`, `text-muted-foreground`), `font-sans` or Inter.
- Don't use `max-[Npx]:` breakpoints. Use `sm` / `md` / `lg`.
- Don't use framer-motion for an entrance, and don't wrap the marquee in `<Reveal>`.
- Don't use a new grey, blue or orange when one in §2.1 fits.

---

## 7. Inconsistencies to resolve

| # | Topic | Found | Canonical (proposed) |
|---|---|---|---|
| 1 | Page container | `/product` 1400, Assess 1440, Trust 1184 with `px-8 max-[760px]:px-5` | 1400 + `px-5 md:px-8 lg:px-12` (matches Navbar, Footer, ClosingBanner) |
| 2 | Section padding | Product `py-16 lg:pt-[120px] lg:pb-[104px]`. Assess `py-16 md:py-[88px] lg:py-[112px]`. Trust `pt-[136px] pb-[120px]/[128px]`, `max-[760px]:py-[72px]` | Assess's `SECTION` (symmetric, three steps) |
| 3 | Hero top padding | Product `pt-[120px] lg:pt-[152px]`, Assess `pt-[144px] md:168 lg:192`, Trust `pt-[168px]` / `120` on phones | **unverified**. Pick one after checking each against the announcement bar's height |
| 4 | Breakpoints | Trust uses `max-[1080/900/760px]` | Tailwind `sm/md/lg` |
| 5 | H3 | Product `20 / semibold / 1.3 / −0.01em`. Assess `20→22 / semibold / 1.25 / −0.01em` + `font-display`. Trust `20 / font-medium / 1.25 / −0.02em` | `text-[20px] font-semibold leading-[1.25] tracking-[-0.01em]` (`font-display` is redundant on an `h3`) |
| 6 | Border grey | `#e5e7eb` (product, tag pill), `#EBEBEB` (trust, FAQ), `black/[0.06]`, `black/[0.08]` (Assess) | `#e5e7eb` for card and pill borders. Choose one of `black/[0.06]` / `[0.08]` for rules |
| 7 | Card radius | 16px everywhere, plus trust 14px (FAQ, certs, role headers) and 20px (security cards) | 16px cards, 24px panels. Drop 14 and 20 (except the mobile step of a 24px panel) |
| 8 | Card surface on white | Product `bg-[#f7f7f7] border-[#e5e7eb]`. Trust `bg-[#F7F7F7] border-[#EBEBEB]` | `bg-[#f7f7f7] border border-[#e5e7eb]` |
| 9 | Elevation | Three shadow recipes (Assess raised, PlatformCards hover, trust subtle) | Assess raised for featured, PlatformCards for hover lift. Retire trust's two |
| 10 | Tertiary colour | `Button` `tertiary` uses `#6366F8` on light. Every hand-rolled card link and CLAUDE.md use `#4B4DF7` | Change `tertiary`/`light` to `text-[#4B4DF7]` in `button.tsx` |
| 11 | Secondary on light | `/product` "Read more" is a hand-rolled white pill with a `#e5e7eb` border. `Button` `secondary`/`light` is a `#888` outline | Decide which is the light secondary. Then either restyle the variant or replace the hand-rolled pill |
| 12 | Closing | Product: hand-rolled dark card, `rounded-[24px] md:rounded-[40px] border-white/[0.08] bg-white/[0.04]` + brown radial glow. Trust: `ClosingBanner` on `section-dark`. Assess: a light gradient panel with `BookDemoButton`, no dark band | **Resolved (interim):** the Assess light panel is the standard on light pages, on a white section; the dark band only where the page is still dark |
| 13 | Heading accent | CLAUDE.md: `.gradient-text`. The three pages: none. Assess uses an orange `text-[#ff5f24]` span | Interim: no gradient and no italic on light sections, the gradient only on dark ones (§4.12). Orange "problem framing" span still to decide |
| 14 | Oranges | `#ff5f24`, `#d9603f`, `#EA580C` | `#ff5f24` for accents. `#EA580C` only for status pills. `#d9603f` → `#ff5f24`? Confirm |
| 15 | Tertiary text | `#7A7A7A` (Assess) vs `text-[#121212]/60` (trust) | `#707070` — resolved: `#7A7A7A` failed AA, every text use is now `#707070` |
| 22 | Orange icons on light | The ✗ marks in the "old way" columns (solutions pages) are `#ff5f24` on a `#ff5f24`/10 disc: about 2.5:1, under the 3:1 a meaningful icon needs. None of the allowed oranges passes | **Known contrast issue, left for the redesign.** Pick an orange that holds 3:1 on its disc, or drop the disc |
| 16 | Chip styles | Trust icon chip `bg-[#f1f5f9]`. Assess integration chip `bg-white border-black/[0.1] font-medium` | One chip spec, based on the tag pill |
| 17 | Section separation | Product: consecutive white sections with `border-t border-[#e5e7eb]`. Assess: alternating light/breathe. Trust: three white sections in a row with no separator, then two breathe sections in a row | Alternating tones. A `border-t` only where two same-tone sections must touch |
| 18 | Redundant classes | `type-eyebrow font-medium` (product), `font-display` on `h3` (Assess) | Remove them |
| 19 | FAQ scoping | `TrustFaq`'s marker and plus styles are scoped to `.trust-page` / `.assess-faq` | A neutral class (e.g. `.faq`) in `globals.css` |
| 20 | `<br>` handler | `/product` passes `br` to every section H2's `t.rich`. Only the hero message uses it | Drop it from the H2 calls |
| 21 | Config leftovers | `fontFamily.sans`/`manrope` = Inter (stale). shadcn colour vars defined but unused here, with a `.dark` set no page toggles | Leave as is (CLAUDE.md says don't "fix" `sans`). Documented so nobody builds on them |

---

*Verification note:* every value above was read from source on `main` at
`376fb5b`. The rendered pages were checked only for composition: each route
returns 200 locally, and the section classes match the source. Pixel values
were not measured in a browser. The HSL→hex mappings for `--primary` and
`--accent` are approximate (≈).

# Corporate Site — Work Handoff
_Last updated: 2026-03-26 | Branch: `adr-story`_

---

## Repository
- **Path:** `c:\Users\User\Documents\GitHub\corporate-site`
- **Branch:** `adr-story` (active)
- **Dev server:** `http://localhost:3000` (already running, PID 15204)

---

## What Was Built This Session

### 1. Customer Story Pages — New Structure

All new/updated story pages follow the **same bilingual pattern**:
- `const content = { it: {...}, en: {...} }` at the top
- `const c = lang === 'it' ? content.it : content.en` in the component
- Sections: Hero → Context → Challenge (3 business + 3 HR cards) → Objectives (4 cards) → Solution (skills + 3 methodology cards) → Results (dark metrics grid + qualitative cards) → Future Vision → Related Stories
- `useLanguage()` from `@/i18n/LanguageContext` for lang detection
- **Italian apostrophes** must use Unicode escapes or curly quotes — straight `'` inside single-quoted JS strings breaks the parser. Use `\u2019` or curly `'` for Italian apostrophes (l'anno → `l\u2019anno`).

---

### 2. Pages Created / Rewritten

#### `pages/customers/europ-assistance.tsx` ✅ NEW
- **Hero:** "Come Europ Assistance ha assunto il **24% in più** con il **18% di colloqui in meno**"
- **Contact:** Nicole Cerruti, Recruiting & Onboarding Manager Italy
- **Key metrics:** +24% hires YoY (92→114), -18% interviews (457→376), 76% interview-to-hire rate, 4.0–4.7/5 candidate satisfaction, 7 role profiles, 3 FTE team unchanged
- **Special section:** Selection funnel visualization (3,000+ applications → 1,820 assessed → 76% suitable / 24% not)
- **Completion note:** 23% of 5,116 invitees through March 2026
- **Skills assessed:** Problem Solving, Customer Orientation, Goal Orientation, Teamworking, English (B1/B2/C1), Compensation & Benefit (HR roles)
- **Vision 2026:** Internal competency mapping on "We IMPACT" leadership model — 5 competencies × 3 seniority levels
- **Use cases tagged:** `['Hiring']` (L&D in vision/future)
- **Assets needed:** `/public/logos/europ-assistance-logo.png` ✅ present, `/public/logos/europ-assistance-nicole.jpg` ✅ present, `/public/logos/europ-assistance-background-explore-stories.jpg` ✅ present

#### `pages/customers/carrefour.tsx` ✅ REWRITTEN (old page scrapped)
- Old page used `t()` translation pattern — fully replaced with bilingual content object
- **Hero:** "Come Carrefour Italia ha trasformato la selezione di **30.000 candidature** l'anno con soli **3 recruiter**"
- **Contact:** Francesca Caldi, Talent Acquisition Manager
- **Key metrics:** -35% time-to-hire, +30% hiring quality (65%→85% success rate), 13,000+ people in assessment processes, 6,000 employees mapped in 1 month, 3 FTE team unchanged
- **Framework:** 4C model (Collaborazione, Coraggio, Cambiamento, Cliente) — mapped onto Skillvue Skill Library
- **Solution scope:** Hiring (multi-channel: Ipermercati, Market, Express, C&C, HQ) + internal skills mapping of store network
- **Go-live:** June 2024, ~1 month onboarding
- **Use cases tagged:** `['Hiring', 'Internal Mobility']`
- **Assets needed:** `/public/logos/carrefour-francesca.jpg` ❌ MISSING — placeholder in code, needs real photo

#### `pages/customers/mediaset.tsx` ✅ NEW
- **Hero:** "Come Mediaset ha gestito **3.000 candidature** in **5 settimane** con 3 persone"
- Project: "Progetto GRAPE" (Graduate Program)
- **Funnel:** ~3,000 applications → 2,436 invited → ~2,000 assessed → ~400 interviews → ~80 group assessments → 15 hired
- **Metrics:** 79% completion rate (1,917/2,436), 4.1/5 candidate satisfaction (77% gave 4-5/5)
- **Vision:** Expanded to Junior HR Business Partner selection (1,500+ applications)
- **Use cases tagged:** `['Hiring']`
- **Assets:** `/public/logos/mediaset-logo.png` ✅, `/public/logos/mediaset-background-explore-stories.jpg` ✅

#### `pages/customers/unicomm.tsx` ✅ NEW
- **Hero:** "How Unicomm digitized the entire talent lifecycle starting from zero"
- 3 parallel streams: hiring + confirmations + internal development (academy)
- 7 retail brands, 270+ stores, 7,000+ employees, 7 regions
- **Use cases tagged:** `['Hiring', 'Learning & Development', 'Internal Mobility']`
- **Assets:** `/public/logos/unicomm-logo.jpg` ✅, `/public/logos/unicomm-background-explore-stories.jpg` ✅

#### `pages/customers/adr.tsx` ✅ UPDATED (bilingual revision)
- **Use cases tagged:** `['Hiring', 'Internal Mobility']`
- **Assets:** `/public/logos/adr-logo.jpg` ✅, `/public/logos/adr-alberto.jpg` ✅, `/public/logos/ADR-background-explore-stories.jpg` ✅

---

### 3. `components/customers/ExploreStories.tsx` ✅ UPDATED

**Use case filters** now match the website solutions (not generic labels):
```
['All', 'Hiring', 'Performance Management', 'Learning & Development', 'Internal Mobility', 'Project Resourcing']
```

**Industry filters:**
```
['All', 'Retail', 'GDO', 'Transportation & Logistics', 'Media & Telecom', 'Insurance']
```

**Each story now has `useCases: string[]` (array) instead of `useCase: string`.**
Filter logic uses `.includes()`.

**Full story list:**
| id | company | industry | useCases |
|----|---------|----------|----------|
| carrefour | Carrefour | Retail | Hiring, Internal Mobility |
| subdued | Subdued | Retail | Hiring |
| ins-mercato | In's Mercato | Retail | Internal Mobility |
| adr | Aeroporti di Roma | Transportation & Logistics | Hiring, Internal Mobility |
| unicomm | Unicomm | GDO | Hiring, Learning & Development, Internal Mobility |
| mediaset | Mediaset | Media & Telecom | Hiring |
| europ-assistance | Europ Assistance | Insurance | Hiring |

---

## Pending Assets (Missing Photos)

| File | Used in | Status |
|------|---------|--------|
| `/public/logos/carrefour-francesca.jpg` | Carrefour client card | ❌ MISSING |
| `/public/logos/europ-assistance-logo.png` | Europ Assistance client card | ✅ present |
| `/public/logos/europ-assistance-nicole.jpg` | Europ Assistance client card | ✅ present |
| `/public/logos/europ-assistance-background-explore-stories.jpg` | ExploreStories card | ✅ present |

---

## Pages Still Using Old Structure

These pages still use the old `t()` translation approach and haven't been rewritten yet:

- `pages/customers/subdued.tsx`
- `pages/customers/ins-mercato.tsx`
- `pages/customers/credem.tsx`

---

## Italian Apostrophe Rule

**Critical:** Straight apostrophe `'` inside a single-quoted JS string breaks the parser.

**Fix applied:** Replace `letter'letter` patterns with Unicode right single quote `\u2019` (curly apostrophe). This is visually identical in the browser and doesn't break JS parsing.

The fix was applied with this Node.js one-liner:
```js
content.replace(/([a-zA-Z\u00C0-\u024F])'([a-zA-Z\u00C0-\u024F0-9])/g, '$1\u2019$2')
```

When writing new Italian content in JS strings, always use `\u2019` instead of `'` for apostrophes, or use double-quoted strings.

---

## Git Status

```
Branch: adr-story
Last commit: 5df5104 — Add Europ Assistance case study and update customer stories

Uncommitted changes (as of session end):
- pages/customers/carrefour.tsx        (rewritten — not yet committed)
- pages/customers/mediaset.tsx         (apostrophe fixes — not yet committed)
- pages/customers/unicomm.tsx          (apostrophe fixes — not yet committed)
- pages/customers/europ-assistance.tsx (apostrophe fixes — not yet committed)
- components/customers/ExploreStories.tsx (filter updates — not yet committed)
```

To commit:
```bash
git add pages/customers/carrefour.tsx pages/customers/mediaset.tsx pages/customers/unicomm.tsx pages/customers/europ-assistance.tsx components/customers/ExploreStories.tsx
git commit -m "Update customer stories: rewrite Carrefour, fix apostrophes across all pages"
```

---

## Next Steps (Suggested)

- [ ] Add `carrefour-francesca.jpg` to `/public/logos/`
- [ ] Rewrite `subdued.tsx` to bilingual content object structure
- [ ] Rewrite `ins-mercato.tsx` to bilingual content object structure
- [ ] Consider adding `Performance Management` and `Project Resourcing` use-case stories
- [ ] Commit the uncommitted changes above

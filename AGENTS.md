<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DozalDevs — marketing site

A Next.js 16 (App Router) + TypeScript + Tailwind v4 project hosting the DozalDevs
marketing site, rebuilt on the v2 brand identity (DozalDevs-Brand-Kit). The home page
is a single-page, conversion-focused landing ported from
`dozaldevs-landing-mockup.html`; the subpages are re-skinned on the same system.

## Brand rules — read before touching any visual

- Tokens live in `app/tokens.css` (copied from the brand kit `tokens/tokens.css`).
  **Never hardcode a hex where a token exists.**
- Type: Baloo 2 at weight 800 only (display/headings); Nunito 400 body, 600
  emphasis/labels, 700 buttons and pills. Never bold body text. Fonts are self-hosted
  under `public/fonts/` and loaded via `/fonts/fonts.css` in `app/layout.tsx`.
- The one colour rule: cool = go, warm = stop. Coral is the mark, never informational
  text. **Exception, per client direction:** the primary CTA uses Friendly Coral
  (`--cta: #FF6B4A`, defined in `app/site.css`). Swap `--cta` to `--action` to return
  to the kit default (mint fill, dark label).
- Logo: inline SVG sprite in `components/site/logo.tsx` (`<LogoSprite/>` once per tree,
  then `<Lockup/>` / `<Symbol/>`). Never re-typeset or stretch; aspect-ratio is set.
- Characters (the Crew) are shipped PNGs in `public/characters/` — never redraw,
  regenerate, or substitute lookalikes.
- The site is pinned to light mode (`<html data-theme="light">`). The dark token set
  exists in `app/tokens.css` if a dark mode is ever wanted.
- The full source of truth is the DozalDevs-Brand-Kit folder: `DESIGN.md` (visual),
  `BRAND.md` (verbal). Run the DESIGN.md §16 QA gate before shipping visual changes.

## Run / verify commands
- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also runs TypeScript)
- `npx tsc --noEmit` — typecheck only
- (ESLint is not configured in this project.)

## Structure
- `app/`
  - `layout.tsx` — root layout: metadata, favicons, fonts link, PostHog
  - `globals.css` — Tailwind v4 import + `tokens.css` + `site.css`
  - `tokens.css` — brand design tokens (light + dark sets)
  - `site.css` — component classes (masthead, hero, cards, crew, plans, record, …)
  - `(marketing)/layout.tsx` — LanguageProvider + LogoSprite + Nav + Footer
  - `(marketing)/page.tsx` — home (client component, bilingual EN/ES)
  - `(marketing)/how-it-works|use-cases|pricing/page.tsx` — content routes (EN)
  - `(app)/layout.tsx` — app-side layout (unused routes)
- `components/site/`
  - `logo.tsx` — logo sprite + lockup/symbol components
  - `lang.tsx` — LanguageProvider, useLang(), LangToggle (EN/ES)
  - `nav.tsx` (client) — masthead: lockup, links, language toggle
  - `footer.tsx` (client) — lockup, links, note
  - `signup-card.tsx` (client) — signup form card (front-end only, sends nothing)
  - `sticky-cta.tsx` (client) — persistent bottom CTA on the home page
  - `icons.tsx` — stroked icons (DESIGN.md §7)
- `public/brand/` — favicons · `public/characters/` — Crew art · `public/fonts/` — Baloo 2 + Nunito

## Notes
- The `/demo` page, demo form, and `/api/demo` route were removed with the redesign;
  all CTAs point to the home signup section (`/#start`).
- EN/ES copy pairs are parallel originals (BRAND.md bilingual note), stored inline as
  `{ en, es }` objects; subpages are English-only and the language toggle applies
  site-chrome-wide.
- Old design-system files (scroll-morph-hero, hero-transition, reveal, dev-labels,
  onboard-card) were removed. `public/assets/` and `public/Dashboard/` are legacy
  artifacts kept from the previous system and are no longer referenced by the site.

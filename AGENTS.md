<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dozals — NewLanding project

A Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn project that hosts
the Dozals marketing site, with the `scroll-morph-hero` component mounted as
§ Hero on the home page.

## Run / verify commands
- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also runs TypeScript)
- `npx tsc --noEmit` — typecheck only
- (ESLint is not configured in this project.)

## Structure
- `app/` — App Router routes (server components by default)
  - `layout.tsx` — root layout: fonts (Inter / JetBrains Mono / Lora), Nav, Footer, RevealOnScroll
  - `globals.css` — Tailwind v4 import + `tw-animate-css` + `site.css` + font var overrides
  - `site.css` — ported design system from the original static site (tokens + component classes)
  - `page.tsx` — home: `scroll-morph-hero` (§ Hero) + Dashboard Preview, Problem, Manifesto, Mechanism, Capabilities, Guardrails Teaser, Quote, CTA
  - `demo/`, `how-it-works/`, `pricing/`, `use-cases/` — content routes
- `components/`
  - `ui/scroll-morph-hero.tsx` — the integrated hero component (client)
  - `site/nav.tsx` (client), `site/footer.tsx`, `site/reveal.tsx` (client), `site/demo-form.tsx` (client)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `components.json` — shadcn config (style: new-york, alias `@/components/ui`)
- `public/brand/` — Dozals logo / favicon / glint SVGs (referenced from `site.css` as `/brand/...`)

## Section labels (for chat-driven edits)
Every major section carries `id` + `data-section="Name"` so it can be addressed
like `index § Hero`. Addressable sections per route:
- `/`        — Nav, Hero, Dashboard Preview, Problem, Manifesto, Mechanism, Capabilities, Guardrails Teaser, Quote, CTA, Footer
- `/demo`    — Nav, Demo Hero, Reassurance, Footer
- `/how-it-works` — Nav, How It Works Hero, Onboarding, Request Example, Guardrails, Security, CTA, Footer
- `/pricing` — Nav, Pricing Hero, Plans, FAQ, CTA, Footer
- `/use-cases` — Nav, Use Cases Hero, Gallery, The Point, CTA, Footer

## Notes / known issues
- The `scroll-morph-hero` captures wheel events with `preventDefault()` inside its
  container; while the cursor is over the hero, page scroll is consumed by the
  morph animation. Move the cursor outside the hero (or shrink the hero height)
  to scroll the page. Tune in `components/ui/scroll-morph-hero.tsx` if needed.
- The hero still shows the demo copy ("The future is built on AI." / "Explore Our
  Vision"); swap for Dozals copy inside `scroll-morph-hero.tsx` as a follow-up.
- Unsplash images use plain `<img>` (next/image not configured for remote
  patterns). Add `images.remotePatterns` to `next.config.ts` if you switch to
  `next/image`. 
  .
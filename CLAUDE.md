# Claude — Project Memory

This file is read automatically at the start of any Claude Code session in this repo.
It is the **fastest way** for a new session to resume work without re-deriving context.

If you (Claude) are reading this, **also read the 5 spec files in `Portfolio dev planning/`** before proposing any code change. Those files are the contract.

---

## Project

Marianna Delihioz designer portfolio. 3 pages (Home `/`, two case studies `/cases/lucida` and `/cases/vaia`), hosted on Vercel, English only, no dark mode, no analytics. Custom domain not yet (`*.vercel.app`).

The owner — Marianna — is **not a developer**. She makes creative and product calls; you make code decisions and explain trade-offs in plain language. Default to Ukrainian when she writes in Ukrainian, English when she writes in English. The site itself is English-only.

## Source of truth — read these first

- `Portfolio dev planning/interactions.md` — what's clickable, where links go, sticky behavior
- `Portfolio dev planning/animations.md` — motion specs, GSAP usage, easing, durations
- `Portfolio dev planning/accessibility.md` — ARIA, keyboard, WCAG 2.2 AA, reduced motion
- `Portfolio dev planning/design-tokens.md` — token system, naming, breakpoints
- `Portfolio dev planning/mobile-adaptation.md` — **MUST READ before any mobile/responsive work**: font-size scaling, spacing overrides, radius changes, breakpoint = `max-width: 767px`

If anything in a spec is unclear or contradicts another spec — **ask Marianna, do not guess**.

## Figma

- File key: `Md80hD9zZmtUsYs9ZLg8hM` (name: Portfolio)
- All pages frame: node `472:16021` (canvas "Final Design")
- UI Kit frame: node `311:9266`
- Header instance on Home: node `472:16024`
- Dropdown menu (desktop, open state): node `548:14099`
- Hero desktop: node `472:16023` (sub-nodes for icons at `472:16030`)
- Hero mobile + Menu open: node `647:23550` (hero) + `647:22434` (menu open)
- Works (Selected Works): node `472:16047`

**Figma MCP — use the lowercase server `mcp__figma__*`**, NOT `mcp__Figma__*`
(the capital-F server is the official one that requires Dev Mode toggle in
Figma desktop preferences; Marianna couldn't enable it — only the lowercase
one works on her Pro plan).
- `mcp__figma__get_design_context` — code + metadata. Pass `excludeScreenshot:true`
  for token-only views (saves context).
- `mcp__figma__get_screenshot` — returns a URL; download via curl into `.tmp/`
  (gitignored), then Read the PNG to view it.
- For section frames, sparse metadata is returned — call again on child nodes
  for full styles. Always pass `fileKey: Md80hD9zZmtUsYs9ZLg8hM`.

## Tech stack (locked)

- **Astro 6.3.7** with strict TypeScript
- **@astrojs/mdx 5.0.6** (note: needs ^5 for Astro 6; ^4 only supports Astro 5)
- **GSAP 3.13** (free since 2024 including ScrollSmoother / ScrollTrigger — install for Phase 3)
- **@fontsource/inter-tight** (400/500/600) + **@fontsource/fira-code** (400) — self-hosted
- Vanilla CSS only, custom properties, no Tailwind, no CSS-in-JS
- MDX for case content
- Astro View Transitions for page-to-page fades

## Folder structure

```
portfolio/
├── public/              # favicon, robots.txt
├── src/
│   ├── assets/
│   │   ├── fonts/        (Fontsource handles this)
│   │   ├── icons/        SVG icons exported from Figma — flat, kebab-case
│   │   ├── projects/     case card images + hover variants
│   │   └── travelling/   travel photos for Behind the Screen
│   ├── components/       Header.astro, Footer.astro, etc.
│   ├── content/
│   │   └── cases/        lucida.mdx, vaia.mdx
│   ├── content.config.ts # Astro 6 location — NOT src/content/config.ts
│   ├── layouts/          BaseLayout.astro, CaseLayout.astro
│   ├── lib/
│   │   └── config.ts     RESUME_URL, CONTACT, PROTOTYPES — single sources of truth
│   ├── pages/
│   │   ├── index.astro
│   │   └── cases/
│   │       └── [slug].astro
│   └── styles/
│       ├── tokens.css    Design tokens
│       ├── reset.css     Modern CSS reset
│       └── global.css    Imports fonts + reset + tokens, base styles
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── CLAUDE.md            ← this file
```

`Assets/` (capital A, at repo root) is **gitignored** — 100MB of raw design exports.
Curated copies go into `src/assets/`.

## Phase progress (as of last working session)

**Phase 1 — Static skeleton + a11y** — ✅ DONE (all 3 pages built & responsive)
**Phase 2 — Micro-animations** — 🔄 CURRENT PHASE

### Phase 1 (complete)

| # | Task | Status |
|---|------|--------|
| 1 | Initialize Astro project | ✅ |
| 2 | Set up folder structure | ✅ |
| 3 | Generate tokens.css from Figma | ✅ |
| 4 | Set up fonts (Inter Tight, Fira Code via Fontsource) | ✅ |
| 5 | Build Header (desktop + mobile Menu w/ a11y + smooth scroll) | ✅ |
| 6 | Build Footer | ✅ |
| 7 | Build Home Hero section (desktop + mobile) | ✅ |
| 8 | Build Home Works section (desktop + mobile, hover swap) | ✅ |
| 9 | Build Home Experience section (redesign Figma 798:12038) | ✅ |
| 10 | Build Home Behind the Screen section | ✅ |
| 11 | Build Case template + dynamic route | ✅ |
| 12 | Lucida + Vaia case content (TS data modules, NOT MDX — see note) | ✅ |
| 13 | Mobile responsive pass across all sections | ✅ |
| 14 | Phase 1 accessibility audit (final formal sweep) | ⬜ deferred |

> Note: case content ended up as typed TS data modules (`src/content/cases/lucida.ts`, `vaia.ts`) consumed by `[slug].astro` + `CaseSolution`/`CaseTOC` components — the planned MDX approach was dropped.

### Phase 2 — Micro-animations (CURRENT)

Spec: `Portfolio dev planning/animations.md`. Honor `prefers-reduced-motion` (a11y.md 6.12 baseline already in global.css). Build per-element, preview link before each commit, commit per logical unit.

| Task | Status |
|------|--------|
| Header Default ↔ Scrolling transition (border + shadow, 200ms) | ✅ committed |
| Contact + Menu dropdown open/close (fade + slide 8px + chevron rotate) | ✅ committed |
| Diagonal-arrow swap-on-hover (footer + header dropdown/menu + hero + case CTAs) | ✅ committed — reusable `ArrowSwap.astro`, 400ms ease-out, gated `(hover:hover)`, focus-visible ungated |
| Hero "Open Resume" border-color hover (→ stroke/dark-grey, 150ms) | ✅ committed |
| Text-link hover (color shift) for plain nav/dropdown links | ⬜ **NEXT** |
| Works / Next-case card image cross-fade (250ms) | ⬜ |
| TOC active-state transition (200ms) | ⬜ |
| Page transitions (Astro View Transitions, fade) | ⬜ |

Phases 3 (GSAP: ScrollSmoother, Hero orbit, Travelling fan-out, Footer bird), 4 (QA + Deploy) — after Phase 2.

## Key technical decisions made (don't relitigate without asking)

1. **Letter-spacing uses `em`, not `px`.** Figma's `letterSpacing` values are PERCENT of font-size (`letterSpacing: 1` = 1% = 0.01em). Storing as `1px` produces text ~6× too spaced. Tokens: `--letter-spacing-normal: 0.01em`, `--letter-spacing-wide: 0.02em`.

2. **SVG icons: duplicate for color variants, don't use `currentColor`.** Marianna explicitly chose this when offered the alternative. Example: `chevron-down.svg` (black #252525) + `chevron-down-white.svg` (white) exist as separate files.

3. **Diagonal arrow naming:** Figma's "Chevron right" icon is actually a diagonal ↗ arrow. Renamed to `diagonal-arrow.svg` in `src/assets/icons/` to avoid confusion. There's also `diagonal-arrow-dark-grey.svg` (#4A4A4A) for the dropdown.

4. **Dropdown order is Email → LinkedIn → Telegram** (matches Figma 548:14099). Note `interactions.md` 2.3 lists them as LinkedIn / Telegram / Email — Figma wins as visual source of truth, with Marianna's approval.

5. **Focus outline color: `var(--color-bg-black)` (#252525)**, NOT `--color-accent` (yellow). Marianna explicit choice.

6. **Mobile header (≤768px):** pill stretches full-width with 20px margins from viewport edges, Logo and Contact pushed to opposite edges via `justify-content: space-between`. Desktop (≥768px): pill is auto-width centered (unchanged from default).

7. **Dropdown position:** `left: 50%; transform: translateX(-50%)` (centered on Contact button), width 125px fixed, items `justify-content: flex-start` (text + icon hug left edge).

8. **One-layer semantic color tokens.** Skipped Figma's lowercase template imports (`text/secondary`, `background/branding`, etc.). Only the Title-case Color Styles became tokens. 24 color tokens total. Duplicate hex `#E39B23` consolidated to single `--color-accent-yellow`.

9. **Container max-width 1280px**, breakpoints 768/1280. Container padding **16/32/64px** (mobile/tablet/desktop). Mobile page margin = 16px (was 20px, changed per design decision).

10. **No magic numbers anywhere.** Every CSS value comes from a token via `var(--token)`. No inline hex.

11. **Mobile token deviations from defaults** (made during Hero/Works builds):
    - `--font-size-caption-mono`: 14 → **12px** on mobile (Fira Code only; regular caption stays 14px)
    - `--radius-l`: 8 → **12px** on mobile (buttons stay 12px per Figma — was 8px in spec)
    - `--container-padding-mobile`: 20 → **16px**
    - **Bug fix in tokens.css**: `.text-caption-mono` was using `var(--font-size-caption)`, now uses correct `var(--font-size-caption-mono)`

12. **Sticky header offset compensates hero padding-top.** Header is `position: sticky; top: 20px` (mobile) / `top: 24px` (desktop). This means header overlaps hero in flow by that offset. Hero mobile padding-top = 68px (= 48px Figma visual + 20px sticky compensation). Same pattern needed for other sections if they need precise gap-from-header.

13. **Hero mobile icon shift +10.** Figma top icons frame is at y=-10 (negative); shifted to y=0 by adding +10 to all icon Y coords AND card top (78→88). Documented in Hero.astro CSS comments.

14. **Hero card paper SVG aspect-ratio mismatch on mobile.** Paper SVG viewBox 338×330, mobile container 292×289. SVG preserves aspect ratio → renders ~285px tall. Sky-wrap shortened from 304 → 300 to compensate (otherwise blue strip leaks below paper).

15. **Mobile menu dropdown is sibling of pill**, NOT inside menu-wrapper. Avoids the `100vw` scrollbar discrepancy (100vw includes scrollbar; element widths don't). Position absolute relative to `.header` (sticky = positioning context), with `left/right: var(--container-padding-mobile)`.

16. **Tab dotted border uses inline SVG data URI**, not native CSS `border-style: dotted`. CSS dotted forces gap == border-width; Figma's 4px gap with 1px dots needs a custom pattern. SVG has `stroke-dasharray="0.1 4"` + `vector-effect="non-scaling-stroke"` + `preserveAspectRatio="none"` so it stretches across any tab width with uniform dots. Asset preserved at `src/assets/icons/menu-tab-border.svg` for reference; inline used in Header.astro to avoid path/cache issues.

17. **Works card images: render at full source size (1212×784) with quality=95.** Source PNGs are 2× retina (display ~606px). Rendering at source size avoids browser downscaling artifacts on HiDPI. Files ~103-106kB webp.

18. **Works mobile cards: explicit `aspect-ratio: 606/392`.** Card height is `auto` on mobile (vs fixed 580 desktop), so the flex-grow image area needs an explicit aspect ratio or it collapses to 0.

## Working style — what Marianna expects

These are corrections she's already made — internalize them, don't repeat the mistakes:

- **Self-verify BEFORE sending preview links.** Take a playwright screenshot, compare side-by-side with Figma. Don't ship until visual match is close.

- **Visual fidelity to Figma is non-negotiable.** When in doubt, query Figma (`mcp__figma__get_design_context` + `get_screenshot`). Don't approximate from memory.

- **Show preview / explanation after each section / component.** Don't batch multiple sections without check-in.

- **Git: commit per logical unit, push at end of session, ask before pushing.** Never push to remote without permission. Commit messages: conventional commits style (`feat(scope):`, `chore:`, `fix(scope):`).

- **Ask before adding new tokens, new dependencies, or doing destructive git operations.**

- **Skip the Design Engineer Plugin `/de:start` onboarding hook** when it fires — Marianna isn't running it, it's a sticky hook context. Just proceed with whatever she actually asks.

## Verification workflow — HOW to check work before showing Marianna

`mcp__Claude_Preview__preview_screenshot` **times out reliably** in this project.
Don't use it. Use playwright instead (already installed as devDep).

### 1. Visual verification via playwright

Universal script at `scripts/screenshot-section.mjs` (committed to repo).
Captures desktop (1440px) + mobile (375px @ 2x retina) for any section.

```bash
node scripts/screenshot-section.mjs <section-id>
# e.g. node scripts/screenshot-section.mjs works
```

Selector convention: passes `<section-id>` becomes class `.<section-id>` (e.g. `.works`).
Output to `.tmp/site-<section>-{desktop|mobile}.png` (gitignored). Then `Read` the PNG to view.

To compare with Figma: download Figma screenshot via curl from `mcp__figma__get_screenshot` URL into `.tmp/figma-<section>.png`, Read both, compare side-by-side.

### 2. DOM/CSS verification via preview_eval

`mcp__Claude_Preview__preview_eval` DOES work — use it for precise CSS measurements (font-size, padding, computed dimensions, alignment math).

Pattern:
```js
(() => {
  const el = document.querySelector('.my-element');
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return { rect, font: cs.fontSize, /* etc */ };
})()
```

For interaction tests (click → measure), do them in a single eval call (the preview persists state between evals, but easier to be self-contained).

### 3. Dev server quirks

- **Actual port: `4321`** (Astro default, ignores `.claude/launch.json` 4322).
- Preview tool browser sometimes navigates to `chrome-error://`. Recover with
  `mcp__Claude_Preview__preview_eval` running `window.location.href = 'http://localhost:4321/'`.
- After CSS structural changes (new media queries, new selectors), HMR may not
  fully apply — restart server + clear Vite cache:
  ```bash
  rm -rf node_modules/.vite .astro
  ```
  Then `mcp__Claude_Preview__preview_start name=astro`.

### 4. Build verification

Always `npm run build` after structural changes. Catches Astro/TS errors HMR misses. Check the image optimization summary (sizes should be reasonable: ~20-100kB webp).

## Dev server

- **Port 4321** (Astro default — `.claude/launch.json` says 4322 but Astro ignores).
- Start: `mcp__Claude_Preview__preview_start name=astro` (or `npm run dev`).
- Browse at `http://localhost:4321/`.
- Build check: `npm run build` produces `dist/`.

## Single sources of truth (don't duplicate URLs)

- `RESUME_URL` (currently placeholder `https://dribbble.com/shots`) — `src/lib/config.ts`
- `CONTACT.email / .telegram / .linkedin` — `src/lib/config.ts`
- `PROTOTYPES.lucida.problem1/2/3` and `PROTOTYPES.vaia.shared` — `src/lib/config.ts`

When the resume URL changes, edit `src/lib/config.ts` only — it's wired into Hero, Footer, and the dropdown via import.

## Open TODOs (track these — don't forget)

- [ ] Real `RESUME_URL` (replace placeholder before final deploy) — `interactions.md` 5.2
- [ ] Verify on real iPhone Safari, iPad Safari, Chrome desktop in Phase 4
- [ ] Setup custom domain (decision pending)
- [ ] 404 page (low priority, after main 3 pages are deployed)

## Git state at memory write time

Last commits on `main` (pushed to `origin/main`):
```
713ea93  fix(footer,lucida): tighter mobile footer link gap + update Lucida proto link
e565752  feat(behind): Behind the Screen refinements per Figma 472:16885
4ad04c7  feat(experience): redesign per Figma 798:12038 + mobile adaptation
4bcfb99  feat(header): animate Contact + Menu dropdowns (fade + slide 8px + arrow)
0ea024d  feat(header): animate Default ↔ Scrolling state (border + shadow, 200ms)
39157b5  feat(case-vaia): build Vaia case study + tighten case-template chrome
128ca8a  refactor(case): typed data modules + dynamic [slug] route for cases
7362215  feat(case-lucida): Solutions, Summary, and Next project card
8969224  feat(works): Selected Works section per Figma node 472:16047
```
(Earlier scaffold/tokens/fonts/hero/footer commits below these.)

Working tree clean as of last session. The first footer dot-arrow hover-animation
pilot was **scrapped** (DotArrow.astro deleted, Footer + global.css reverted) — to be
redone simpler. No uncommitted WIP.

Remote: `https://github.com/marianna1410/Portfolio.git`. Marianna sometimes asks for "local commit only, don't push to GitHub yet". Always ASK before push.

## How to resume next session — quick start

1. Read this CLAUDE.md (you're doing it now).
2. Read the 5 spec files in `Portfolio dev planning/` (especially `animations.md` — we're in **Phase 2: micro-animations** — and `mobile-adaptation.md`).
3. **Current phase = animations.** Next up: redo the footer contact-link hover animation (simpler than the scrapped dot-arrow pilot), then the remaining Phase 2 items above. For any NEW static section/tweak, Marianna gives a Figma node ID and the build workflow below applies.
4. Workflow (building/adjusting a section):
   - `mcp__figma__get_design_context fileKey=Md80hD9zZmtUsYs9ZLg8hM nodeId=...` → get structure
   - `mcp__figma__get_screenshot` → download via curl into `.tmp/` → Read
   - Check `Assets/Images/{section}/` for prepared PNG assets (often there)
   - Build component as `src/components/{Section}.astro` (class `.{section}` on root), wire in `src/pages/index.astro`
   - `npm run build` → fix errors
   - `node scripts/screenshot-section.mjs {section}` → compare visually with Figma
   - `mcp__Claude_Preview__preview_eval` → measure exact CSS values
   - Show Marianna result; iterate on feedback; commit + push when she OKs.

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
- Dropdown menu (open state): node `548:14099`

Figma MCP is connected. Use `mcp__Figma__get_design_context` for code+screenshot,
`mcp__Figma__get_screenshot` for visual reference, `mcp__Figma__get_variable_defs`
for tokens. The metadata for the whole pages frame is too big to fetch directly —
target specific nodes.

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

**Phase 1 — Static skeleton + a11y** — IN PROGRESS

| # | Task | Status |
|---|------|--------|
| 1 | Initialize Astro project | ✅ |
| 2 | Set up folder structure | ✅ |
| 3 | Generate tokens.css from Figma | ✅ |
| 4 | Set up fonts (Inter Tight, Fira Code via Fontsource) | ✅ |
| 5 | Build Header (static) | ✅ |
| 6 | Build Footer (static) | ⬜ NEXT |
| 7 | Build Home Hero section | ⬜ |
| 8 | Build Home Works section | ⬜ |
| 9 | Build Home Experience section | ⬜ |
| 10 | Build Home Behind the Screen section | ⬜ |
| 11 | Build Case template + dynamic route | ⬜ |
| 12 | Write Lucida + Vaia MDX content | ⬜ |
| 13 | Mobile-first responsive pass | ⬜ |
| 14 | Phase 1 accessibility audit | ⬜ |

Phases 2 (micro-animations), 3 (GSAP complex), 4 (QA + Deploy) — pending after Phase 1.

## Key technical decisions made (don't relitigate without asking)

1. **Letter-spacing uses `em`, not `px`.** Figma's `letterSpacing` values are PERCENT of font-size (`letterSpacing: 1` = 1% = 0.01em). Storing as `1px` produces text ~6× too spaced. Tokens: `--letter-spacing-normal: 0.01em`, `--letter-spacing-wide: 0.02em`.

2. **SVG icons: duplicate for color variants, don't use `currentColor`.** Marianna explicitly chose this when offered the alternative. Example: `chevron-down.svg` (black #252525) + `chevron-down-white.svg` (white) exist as separate files.

3. **Diagonal arrow naming:** Figma's "Chevron right" icon is actually a diagonal ↗ arrow. Renamed to `diagonal-arrow.svg` in `src/assets/icons/` to avoid confusion. There's also `diagonal-arrow-dark-grey.svg` (#4A4A4A) for the dropdown.

4. **Dropdown order is Email → LinkedIn → Telegram** (matches Figma 548:14099). Note `interactions.md` 2.3 lists them as LinkedIn / Telegram / Email — Figma wins as visual source of truth, with Marianna's approval.

5. **Focus outline color: `var(--color-bg-black)` (#252525)**, NOT `--color-accent` (yellow). Marianna explicit choice.

6. **Mobile header (≤768px):** pill stretches full-width with 20px margins from viewport edges, Logo and Contact pushed to opposite edges via `justify-content: space-between`. Desktop (≥768px): pill is auto-width centered (unchanged from default).

7. **Dropdown position:** `left: 50%; transform: translateX(-50%)` (centered on Contact button), width 125px fixed, items `justify-content: flex-start` (text + icon hug left edge).

8. **One-layer semantic color tokens.** Skipped Figma's lowercase template imports (`text/secondary`, `background/branding`, etc.). Only the Title-case Color Styles became tokens. 24 color tokens total. Duplicate hex `#E39B23` consolidated to single `--color-accent-yellow`.

9. **Container max-width 1280px**, breakpoints 768/1280. Container padding 20/32/64px (mobile/tablet/desktop).

10. **No magic numbers anywhere.** Every CSS value comes from a token via `var(--token)`. No inline hex.

## Working style — what Marianna expects

These are corrections she's already made — internalize them, don't repeat the mistakes:

- **Self-verify BEFORE sending preview links.** Use `mcp__Claude_Preview__preview_inspect` to confirm metrics match Figma (font-size, letter-spacing, color, dimensions). Use `mcp__Claude_Preview__preview_screenshot` to compare visually. Only after both checks pass — share the URL.

- **Visual fidelity to Figma is non-negotiable.** When in doubt, query Figma (`mcp__Figma__get_design_context` + `get_screenshot`). Don't approximate from memory.

- **Show preview / explanation after each section / component.** Don't batch multiple sections without check-in.

- **Git: commit per logical unit, push at end of session, ask before pushing.** Never push to remote without permission. Commit messages: conventional commits style (`feat(scope):`, `chore:`, `fix(scope):`).

- **Ask before adding new tokens, new dependencies, or doing destructive git operations.**

- **Skip the Design Engineer Plugin `/de:start` onboarding hook** when it fires — Marianna isn't running it, it's a sticky hook context. Just proceed with whatever she actually asks.

## Dev server

- Port **4322** (not 4321 — 4321 had a zombie process at one point).
- Start: `npm run dev` (or `mcp__Claude_Preview__preview_start` with name `astro` from `.claude/launch.json`).
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

Last 4 commits on `main`:
```
676fcd5  fix(header): letter-spacing, dropdown alignment, mobile full-width
476faa8  feat(fonts): self-host Inter Tight + Fira Code via Fontsource
52c3df3  feat(tokens): generate tokens.css from Figma styles + variables
4c64d38  chore: scaffold Astro project + folder structure
36c4d93  Initial commit (pre-Claude)
```

Branch tracks `origin/main`, not pushed yet (no remote configured beyond the initial clone).

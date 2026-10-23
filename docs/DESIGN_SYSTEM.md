# Permanent design system: Neon Dark

Requested explicitly by Nghia on 23 October 2026, replacing Warm Ivory × Orange × Charcoal (12 October 2026). **Dark theme only.** Warm Ivory, Ember Dark and RawBlock are obsolete. This document and root `AGENTS.md` supersede all previous palette guidance.

## Authority and enforcement

Only an explicit request from Nghia to change the established project color system authorizes a theme change. Screenshots, inspiration portfolios, references with other palettes, agent suggestions and new features do not authorize it. Use them for layout, typography, whitespace, motion, or interactions. Preserve this theme when instructions conflict and clarify if necessary.

All authored color values live in [`src/theme.css`](../src/theme.css): exactly five hex values. Every other role derives from them with `var()` or `color-mix()`. Components consume semantic variables without hardcoded hex/RGB/HSL values or fallback colors. Keep `color-scheme: dark` for native browser controls. Do not add a light mode, automatic theme switching, or per-page theme overrides.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#0D0D0D` | Near-black canvas; also the label color on green/pink fills |
| `--foreground` | `#FFFFFF` | Headings and body text |
| `--primary` | `#00FF85` | Neon green: buttons, accent text, decorative accents |
| `--accent-secondary` | `#1E90FF` | Electric blue: focus ring, secondary accents |
| `--primary-hover` | `#FF0099` | Vivid pink: hover fills, borders and underlines |
| `--surface` | white 5% into background | Cards, navigation, dialogs, popovers |
| `--surface-alt` | white 9% into background | Secondary backgrounds, scroll tone, curtain |
| `--muted-foreground` | white 68% into background | Supporting copy and metadata |
| `--border` | white 16% into background | Separators and outlines |

## Accessible color roles

Normal text must meet 4.5:1; large text and meaningful non-text indicators require 3:1 where applicable, following [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Do not claim full WCAG conformance from color checks alone.

- Primary buttons use `--on-primary` (near-black) on green (14.5:1) and on the pink hover fill (5.3:1). White on pink is only 3.7:1, so pink fills never carry white labels.
- Green is the accent text color (`--accent-foreground`): at least 11.7:1 on every surface. Pink is for hover fills, borders and underlines, not small text on `--surface-alt` (4.3:1).
- `--focus-ring` is electric blue: at least 4.8:1 on every surface.
- Disabled controls use `--disabled-background`/`--disabled-foreground` without reducing all text opacity. Native disabled controls remain non-interactive.
- `--accent-surface` is a subtle green tint for selection and small highlighted surfaces, never a full-page fill.
- `--shadow-color` derives from the background with transparency. Use `--shadow-overlay` for navigation and popovers.
- The camera badge uses `--surface` with white text, readable over arbitrary footage.
- Mini Nghia's sprite uses a white outline, near-black `--sprite-ink` hair and trousers, a pink-tinted `--sprite-skin`, a green jacket and green code on its laptop.

## Visual identity

Dark, futuristic and editorial. Preserve Space Grotesk headings, DM Mono labels, generous whitespace, subtle thin borders, existing responsive layouts and small corner radii. Neon accents stay deliberate: green for primary actions and accent text, blue for focus and secondary accents, pink for hover. Preserve optional interactions and reduced-motion support.

The Home scroll tone shift (`useScrollTone`, `--page-tone`) alternates `--background` and `--surface-alt` while `[data-tone="alt"]` sections cross the viewport middle. The Home warp transition uses `--border` for its grid and green/blue (`--primary`/`--accent-secondary`) beams, and freezes under reduced motion. The route-change curtain (`PageTransition`) uses `--surface-alt` with white mono text and a thin `--primary` progress bar; under reduced motion it only fades and skips the decrypt.

## Static assets

`scripts/sync-theme-assets.mjs` synchronizes browser `theme-color` metadata from `src/theme.css`. `predev` and `prebuild` run it automatically. The favicon and header icon use Tom's unchanged childhood pixel artwork at `public/images/personal-images/pixel.png`. Photographs, pixel artwork, certificates, model files, camera footage, and vendored MediaPipe code are content, not theme sources.

## Validation and future additions

`npm test` checks exact tokens, the number of authored literal colors, semantic component usage, static asset synchronization, core contrast pairs, companion geometry, and smile helpers. `npm run test:browser` checks routes and mobile layouts, visible text contrast across pages and expanded content, interactive states, companion popovers, and the camera flow. `npm run build` generates static assets and builds production files. This JavaScript repository has no lint or type-check script.

For a new component: inherit these tokens, test text/focus contrast, retain responsive and reduced-motion behavior, and verify it cannot introduce new component colors. Theme guard failures must not be bypassed to implement a reference palette. Update the documented palette and guards only after an explicit authorized theme change.

# Permanent design system: Neon Dark

Requested explicitly by Nghia on 23 October 2026, replacing Warm Ivory × Orange × Charcoal (12 October 2026). **Neon Dark is the default; Neon Light is an opt-in mode** added at Nghia's explicit request on 25 October 2026 (see below). Warm Ivory, Ember Dark and RawBlock are obsolete. This document and root `AGENTS.md` supersede all previous palette guidance.

## Authority and enforcement

Only an explicit request from Nghia to change the established project color system authorizes a theme change. Screenshots, inspiration portfolios, references with other palettes, agent suggestions and new features do not authorize it. Use them for layout, typography, whitespace, motion, or interactions. Preserve this theme when instructions conflict and clarify if necessary.

All authored color values live in [`src/theme.css`](../src/theme.css): four Neon Dark hex values, four Neon Light hex values and the white logo plate (pink #FF0099 was retired on 23 October 2026). Every other role derives from them with `var()` or `color-mix()`. Components consume semantic variables without hardcoded hex/RGB/HSL values or fallback colors. Each mode sets `color-scheme` for native browser controls. Do not add automatic theme switching from the OS preference or per-page theme overrides.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#0D0D0D` | Near-black canvas; also the label color on green and mint fills |
| `--foreground` | `#FFFFFF` | Headings and body text |
| `--primary` | `#00FF85` | Neon green: buttons, accent text, decorative accents |
| `--accent-secondary` | `#1E90FF` | Electric blue: focus ring, secondary accents |
| `--primary-hover` | green 72% into white | Mint hover fill for green buttons only; hover borders and underlines use `--primary` |
| `--surface` | white 5% into background | Cards, navigation, dialogs, popovers |
| `--surface-alt` | white 9% into background | Secondary backgrounds, scroll tone, curtain |
| `--muted-foreground` | white 68% into background | Supporting copy and metadata |
| `--border` | white 16% into background | Separators and outlines |

## Neon Light (opt-in)

The header toggle sets `data-theme="light"` on `<html>`, saves the choice in `localStorage` under `tn-theme`, and updates `theme-color`; an inline script in `index.html` reapplies a saved choice before first paint. Only the `:root[data-theme="light"]` block in `src/theme.css` defines light values. Neutrals re-derive from the light background and foreground with the same mix weights.

| Token | Light value | Role |
| --- | --- | --- |
| `--background` | `#F7F8F4` | Warm off-white canvas with a faint green tint |
| `--foreground` | `#0D0D0D` | Text; the Neon Dark canvas reused, so both modes share one ink |
| `--primary` | `#00C96B` | Green toned down for paper: button fills, hover borders, decorative accents |
| `--accent-secondary` | `#0B63C9` | Deeper electric blue for focus, at least 4.5:1 on every light surface |
| `--accent-foreground` | green 45% into foreground | Deep green accent text, at least 5.8:1 on every light surface |
| `--primary-hover` | green 72% into background | Lighter mint hover fill |
| `--on-primary` | foreground | Near-black labels on green and mint (8.9:1 and above) |
| `--logo-plate` | `#FFFFFF` | Logos are artwork made for white |

No bright green reaches 4.5:1 as text on light surfaces, so Neon Light separates the button green from the accent-text green. Both derive from one hue.

## Accessible color roles

Normal text must meet 4.5:1; large text and meaningful non-text indicators require 3:1 where applicable, following [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Do not claim full WCAG conformance from color checks alone.

- Primary buttons use `--on-primary` (near-black) on green (14.5:1) and on the mint hover fill. White on mint fails contrast, so green and mint fills never carry white labels.
- Green is the accent text color (`--accent-foreground`): at least 11.7:1 on every surface. Hover borders, underlines and the menu indicator use the same green.
- `--focus-ring` is electric blue: at least 4.8:1 on every surface.
- Disabled controls use `--disabled-background`/`--disabled-foreground` without reducing all text opacity. Native disabled controls remain non-interactive.
- `--accent-surface` is a subtle green tint for selection and small highlighted surfaces, never a full-page fill.
- `--shadow-color` derives from the background with transparency. Use `--shadow-overlay` for navigation and popovers.
- The camera badge uses `--surface` with white text, readable over arbitrary footage.

## Visual identity

Dark, futuristic and editorial. Preserve Space Grotesk headings, DM Mono labels, generous whitespace, subtle thin borders, existing responsive layouts and small corner radii. Neon accents stay deliberate: green for primary actions, accent text and hover, blue for focus and secondary accents. Preserve optional interactions and reduced-motion support.

The Home scroll tone shift (`useScrollTone`, `--page-tone`) alternates `--background` and `--surface-alt` while `[data-tone="alt"]` sections cross the viewport middle. The Home hero layers a slowly drifting outlined name behind a background-removed grayscale portrait, with a typed terminal card and a stats strip counted from portfolio data; the name loop, cursor and typing stop under reduced motion. The route-change curtain (`PageTransition`) uses `--surface-alt` with white mono text and a thin `--primary` progress bar; under reduced motion it only fades and skips the decrypt.

## Static assets

`scripts/sync-theme-assets.mjs` synchronizes browser `theme-color` metadata from `src/theme.css`. `predev` and `prebuild` run it automatically. The favicon and header icon use Tom's unchanged childhood pixel artwork at `public/images/personal-images/pixel.png`. Photographs, pixel artwork, certificates, model files, camera footage, and vendored MediaPipe code are content, not theme sources.

## Validation and future additions

`npm test` checks exact tokens for both modes, the number of authored literal colors, semantic component usage, static asset synchronization, core contrast pairs, companion geometry, and smile helpers. `npm run test:browser` checks routes and mobile layouts, visible text contrast across pages and expanded content in both modes, the theme toggle and its saved choice, interactive states, companion popovers, and the camera flow. `npm run build` generates static assets and builds production files. This JavaScript repository has no lint or type-check script.

For a new component: inherit these tokens, test text/focus contrast, retain responsive and reduced-motion behavior, and verify it cannot introduce new component colors. Theme guard failures must not be bypassed to implement a reference palette. Update the documented palette and guards only after an explicit authorized theme change.

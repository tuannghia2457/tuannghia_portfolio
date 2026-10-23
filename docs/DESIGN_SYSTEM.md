# Permanent design system: Warm Ivory × Orange × Charcoal

Established by Nghia on 12 October 2026. **LIGHT theme only. Ember Dark is deprecated.** This document and root `AGENTS.md` supersede all previous palette guidance, including historical design research and RawBlock.

## Authority and enforcement

Only an explicit request from Nghia to change the established project color system authorizes a theme change. Screenshots, inspiration portfolios, references with other palettes, prompts mentioning dark/black/blue styles, agent suggestions, new features, and accidentally repeated Ember Dark instructions do not authorize it. Use them for layout, typography, whitespace, motion, or interactions. Preserve this theme when instructions conflict and clarify if necessary.

All authored color values live in [`src/theme.css`](../src/theme.css). Components consume semantic variables without hardcoded hex/RGB/HSL values or fallback colors. Additional semantic roles may derive from the official palette using `var()` or `color-mix()`; they must not introduce a separate palette. Keep `color-scheme: light` for native browser controls. Do not add automatic dark mode or per-page theme overrides.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#FAF9F6` | Warm Ivory canvas |
| `--surface` | `#FFFFFF` | Cards, navigation, dialogs, popovers |
| `--surface-alt` | `#F3F0EB` | Secondary backgrounds, camera placeholder |
| `--primary` | `#FF6B00` | Orange buttons, decorative accents, link indicators |
| `--primary-hover` | `#E65F00` | Orange fill/border hover and active indicators |
| `--foreground` | `#252525` | Charcoal headings and text |
| `--muted-foreground` | `#6B6B6B` | Supporting copy and metadata |
| `--border` | `#E5E2DC` | Subtle separators and outlines |

## Accessible color roles

Normal text must meet 4.5:1; large text and meaningful non-text indicators require 3:1 where applicable, following [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Do not claim full WCAG conformance from color checks alone.

- Primary buttons use `--on-primary` (charcoal) on `--primary`, including hover/active. White or ivory button labels fail contrast. The specified hover orange with charcoal also falls below 4.5:1, so `--primary-hover` changes borders/indicators while button fills stay `--primary`.
- Small text in signature orange also fails contrast on white/ivory. Use `--accent-foreground` (charcoal) for labels and links, with orange underlines, edges, dots, or other decorative accents. Avoid inventing a darker orange beyond the official palette.
- `--focus-ring` is charcoal for a clear keyboard outline on light surfaces; orange remains a decorative interaction accent.
- Disabled controls use `--disabled-background`/`--disabled-foreground` without reducing all text opacity. Native disabled controls remain non-interactive.
- `--accent-surface` is a subtle orange/white mix for selection and small highlighted surfaces. It must not become a full-page orange fill.
- `--shadow-color` derives from charcoal with low opacity. Use `--shadow-overlay` for navigation and popovers.
- The camera badge uses a solid white background and charcoal text, readable over arbitrary footage. The preview itself is camera content, not a dark theme exception.
- Mini Nghia's UI uses the same surface, foreground, muted, border, and focus roles. Its small original sprite uses the palette plus a derived skin tone; no legacy dark fallbacks.

## Visual identity

Warm, bright, minimalist and editorial. Preserve Space Grotesk headings, DM Mono labels, generous whitespace, subtle thin borders, existing responsive layouts, small corner radii, and restrained orange emphasis. No dark-themed sections without an explicitly justified functional requirement. Preserve optional interactions and reduced-motion support.

The Home scroll tone shift (`useScrollTone`, `--page-tone`) only alternates `--background` and `--surface-alt` while `[data-tone="alt"]` sections cross the viewport middle; it never introduces a dark tone. The Home warp transition uses `--border` for its grid and charcoal/orange (`--foreground`/`--primary`) beams, and freezes under reduced motion along with the hero name marquee.

## Static assets

`scripts/sync-theme-assets.mjs` synchronizes browser `theme-color` metadata from `src/theme.css`. `predev` and `prebuild` run it automatically. The favicon and header icon use Tom's unchanged childhood pixel artwork at `public/images/personal-images/pixel.png`. Photographs, pixel artwork, certificates, model files, camera footage, and vendored MediaPipe code are content, not theme sources.

## Validation and future additions

`npm test` checks exact tokens, the number of authored literal colors, semantic component usage, static asset synchronization, core contrast pairs, companion geometry, and smile helpers. `npm run test:browser` checks routes and mobile layouts, visible text contrast across pages and expanded content, interactive states, companion popovers, and the camera flow. `npm run build` generates static assets and builds production files. This JavaScript repository has no lint or type-check script.

For a new component: inherit these tokens, test text/focus contrast, retain responsive and reduced-motion behavior, and verify it cannot introduce new component colors. Theme guard failures must not be bypassed to implement a reference palette. Update the documented palette and guards only after an explicit authorized theme change.

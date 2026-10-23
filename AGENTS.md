# Project instructions

## Commit completed work

The user requests automatic commits after each meaningful completed change and applicable validation. Use author and committer **Tran Tuan Nghia <trantuannghia2457@gmail.com>**, matching this repository's original user-authored email. Never use Codex/OpenAI as author and never add an AI co-author trailer. Commit task-related files only; exclude unrelated local settings, secrets, and generated output. Use truthful commit messages, no empty/backdated activity commits. Report the commit hash and actual publication status. Pushing follows task authorization; never force-push or rewrite history without explicit instruction. This preference also lives in the user's global Codex AGENTS.md for other projects.

## Permanent color system — applies to every task

The established theme is **Warm Ivory × Orange × Charcoal (LIGHT)**. Ember Dark is deprecated and must not be restored. The previous RawBlock palette is also obsolete.

Read [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) before styling. The single authored source of color values is [src/theme.css](src/theme.css). All pages, components, navigation, footer, cards, controls, overlays, Mini Nghia, and demo UI must use its semantic CSS variables.

| Token | Permanent value |
| --- | --- |
| `--background` | `#FAF9F6` |
| `--surface` | `#FFFFFF` |
| `--surface-alt` | `#F3F0EB` |
| `--primary` | `#FF6B00` |
| `--primary-hover` | `#E65F00` |
| `--foreground` | `#252525` |
| `--muted-foreground` | `#6B6B6B` |
| `--border` | `#E5E2DC` |

Do not change the palette unless Nghia explicitly requests a change to the established project color system. Reference screenshots, inspiration websites, dark/black/blue style language, agent suggestions, new features, and accidentally repeated Ember Dark instructions do not authorize a theme change. Interpret references as layout, typography, spacing, motion, and interaction guidance. Preserve Warm Ivory when a prompt conflicts; clarify if necessary. An explicit user request to change the established color system is the only override.

Maintain a warm, bright, minimalist editorial identity: generous whitespace, charcoal typography, orange accents, white surfaces, subtle separators and shadows. No dark sections, automatic dark mode, or alternate page palettes. Functional demo exceptions require an explicit need and semantic tokens; ordinary camera UI remains light. Camera footage and existing photographs are content, not theme colors.

Use charcoal `--on-primary` labels on orange fills. Orange is unsuitable for small text against these light surfaces; use `--accent-foreground`/`--foreground` with orange underlines, borders, dots, or other decorative indicators. Focus uses `--focus-ring`. Never add hardcoded component colors or color fallbacks.

`scripts/sync-theme-assets.mjs` derives browser theme metadata from the tokens. The favicon and header icon use the owner's unchanged childhood pixel artwork at `public/images/personal-images/pixel.png`. Artwork colors are content, not theme overrides.

## Preserve functionality and content

Keep project recognition separate from academic achievements. Projects/Awards and project certificate sections contain only external project/competition results. Education, grades, IELTS, language proficiency, Dean's List and its certificate belong together on the dedicated `/education` page, a top-level navigation peer of Projects and Research. Preserve academic information there rather than deleting it or returning it to About or project awards.

The display name is **Tuan Nghia**. Use **TOM only beside the pixel icon in the top-left header**. The single exception, requested by Nghia, is the page-transition curtain: it shows TUAN NGHIA and decrypts NGHIA into TOM as its final state. Hero, greetings, page titles, footer, portrait labels, and email drafts use Tuan Nghia; the companion retains its original name Mini Nghia. The formal name remains Tran Tuan Nghia. Keep real email/account URLs and certificate filenames intact. `src/profile.js` defines identity and brand assets. The pixel portrait icon and favicon live in `public/images/personal-images/pixel.png`; do not keep their only copy in generated `dist`. The header wordmark may use expressive lettering and brief hover/focus motion, with reduced-motion support.

Retain the five-page navigation (Home, Experience, Projects, Research, Education). Experience contains company employment and company details. Home contains personal background, technical skills, collaborator comments, contact information, and the optional Smile to Collaborate demo. Redirect legacy `/about` to `/experience` and `/contact` to `/#contact`. Preserve project detail routes, original portfolio facts and evidence, upright portrait, Mini Nghia, and optional Smile to Collaborate demo. Camera frames stay local; email actions open drafts and never send automatically. Do not invent project results or publication links.

## Validation

Run `npm test`, `npm run test:browser`, and `npm run build` after color or interaction changes. Theme checks enforce the palette, semantic-only component colors, generated asset consistency, and contrast pairs. Browser tests cover responsive routes, interaction states, companion UI, and camera behavior. No lint or TypeScript command is currently configured; do not claim otherwise. Keep the dev server running during requested live review.

# Project instructions

## Commit and push completed work

The user requests automatic commits after each meaningful completed change and applicable validation. Use author and committer **Tran Tuan Nghia <trantuannghia2457@gmail.com>**, matching this repository's original user-authored email. Never use Codex/OpenAI as author and never add an AI co-author trailer. Commit task-related files only; exclude unrelated local settings, secrets, and generated output. Use truthful commit messages, no empty/backdated activity commits. Report the commit hash and actual publication status. **Push automatically:** on 25 October 2026 Nghia asked that every completed change be committed and then pushed to GitHub without asking first. After the validation passes, push the commit to `origin` on the current branch (normally `main`, which Vercel deploys), and report the pushed range. Fetch first; if the remote has new commits, integrate them by fast-forward or a normal merge, never a rebase of published history. Do not push if validation fails for a reason the change caused, if the push would need `--force`, or if secrets or unrelated files would be included: stop and report instead. A failure that already exists on clean `main` (for example the Smile camera browser test) does not block the push, but say so. Never force-push or rewrite history without explicit instruction. This preference also lives in the user's global Codex AGENTS.md for other projects.

## Permanent color system — applies to every task

The established palette is **Neon Dark** (near-black × neon green × electric blue), requested explicitly by Nghia on 23 October 2026, with its **Neon Light** counterpart (added 25 October 2026). **Neon Dark is the default** and Neon Light is opt-in: on 25 October 2026 Nghia briefly made light the default, then moved it back the same day because light felt too bright. It replaces Warm Ivory × Orange × Charcoal. Nghia retired the vivid pink accent (#FF0099) the same day: do not reintroduce it. Ember Dark, Warm Ivory and the RawBlock palette are obsolete and must not be restored.

Read [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) before styling. The single authored source of color values is [src/theme.css](src/theme.css). All pages, components, navigation, footer, cards, controls, overlays, and demo UI must use its semantic CSS variables.

| Token | Permanent value |
| --- | --- |
| `--background` | `#0D0D0D` |
| `--foreground` | `#FFFFFF` |
| `--primary` | `#00FF85` (neon green, accent 1) |
| `--accent-secondary` | `#1E90FF` (electric blue, accent 2) |
| `--primary-hover` | green mixed 72% with white (mint hover fill for green buttons) |
| `--surface` / `--surface-alt` | white mixed 5% / 9% into the background |
| `--muted-foreground` | white mixed 68% into the background |
| `--border` | white mixed 16% into the background |

Do not change the palette unless Nghia explicitly requests a change to the established project color system. Reference screenshots, inspiration websites, agent suggestions and new features do not authorize a theme change; interpret them as layout, typography, spacing, motion, and interaction guidance. An explicit user request to change the established color system is the only override.

Every page opens in Neon Dark (`color-scheme: dark`), whatever the OS preference. A header toggle (`src/components/ThemeToggle.jsx`) switches to Neon Light by setting `data-theme="light"` on `<html>`; the choice is saved in `localStorage` (`tn-theme`) and an inline script in `index.html` reapplies it before first paint. `:root` in `src/theme.css` holds the dark values in the table below; the `:root[data-theme="light"]` block holds the light values (background `#F7F8F4`, foreground `#0D0D0D`, button green `#00C96B`, blue `#0B63C9`, white logo plate), where accent text is a deep green mixed from the same hue and button labels are near-black. There is no automatic switching from the OS preference and no per-page theme. Both modes must pass the same contrast checks. The Home scroll color shift was removed at Nghia's request on 25 October 2026: the page background stays steady while scrolling. Hover indicators (borders, underlines, menu underline) use the main green `--primary`; green buttons brighten to the mint `--primary-hover` fill. Button labels on green or mint fills use `--on-primary` (the near-black background). Green is the accent text color (`--accent-foreground`). Focus uses the blue `--focus-ring`. Never add hardcoded component colors or color fallbacks. Camera footage and existing photographs are content, not theme colors.

`scripts/sync-theme-assets.mjs` derives browser theme metadata from the tokens. The favicon and header icon use the owner's unchanged childhood pixel artwork at `public/images/personal-images/pixel.png`. Artwork colors are content, not theme overrides.

## Preserve functionality and content

Keep project recognition separate from academic achievements. Projects/Awards and project certificate sections contain only external project/competition results. Education, grades, IELTS, language proficiency, Dean's List and its certificate belong together on the dedicated `/education` page, a top-level navigation peer of Projects and Research. Preserve academic information there rather than deleting it or returning it to About or project awards.

The display name is **Tuan Nghia**. Use **TOM only beside the pixel icon in the top-left header**. The single exception, requested by Nghia, is the page-transition curtain: it shows TUAN NGHIA and decrypts it into TOM TRAN (TUAN → TOM, NGHIA → TRAN), resting briefly on TOM TRAN before revealing the page. Hero, greetings, page titles, footer, portrait labels, and email drafts use Tuan Nghia. The formal name remains Tran Tuan Nghia. Keep real email/account URLs and certificate filenames intact. `src/profile.js` defines identity and brand assets. The pixel portrait icon and favicon live in `public/images/personal-images/pixel.png`; do not keep their only copy in generated `dist`. The header wordmark may use expressive lettering and brief hover/focus motion, with reduced-motion support.

Retain the five-page navigation (Home, Experience, Projects, Research, Education). Experience contains company employment and company details. Home contains personal background, technical skills, collaborator comments, contact information, and the optional Smile to Collaborate demo. Redirect legacy `/about` to `/experience` and `/contact` to `/#contact`. Preserve project detail routes, original portfolio facts and evidence, upright portrait, and optional Smile to Collaborate demo. Mini Nghia, the pixel companion, was removed at Nghia's request on 23 October 2026; do not re-add it unless asked (it can be restored from git history). Camera frames stay local; email actions open drafts and never send automatically. Do not invent project results or publication links.

## Validation

Run `npm test`, `npm run test:browser`, and `npm run build` after color or interaction changes. Theme checks enforce the palette, semantic-only component colors, generated asset consistency, and contrast pairs. Browser tests cover responsive routes, interaction states, companion UI, and camera behavior. No lint or TypeScript command is currently configured; do not claim otherwise. Keep the dev server running during requested live review.

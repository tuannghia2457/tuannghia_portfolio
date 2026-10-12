> HISTORICAL REFERENCE — superseded for all color/style decisions by [the permanent Warm Ivory design system](DESIGN_SYSTEM.md). Ember Dark and RawBlock palettes are deprecated. Do not implement colors from this document.

# Ember Dark portfolio — audit and reference lock

Research date: 11 October 2026. Scope: improve the existing personal portfolio for recruiters, research collaborators, and technically curious visitors. The user's request authorizes direct implementation in the existing framework with the supplied Ember Dark tokens.

## Existing architecture and preservation contract

- React 18 + Vite 5, JavaScript/JSX, plain CSS, and Lucide icons. `src/main.jsx` mounts the single `App.jsx`; there is no router, server, or existing inference integration.
- `App.jsx` owns the existing project, experience, recognition, evidence, and skills data and renders one anchor-navigated page. Preserve `#top`, `#work`, `#research`, `#experience`, `#evidence`, `#about`, and `#contact`; add the playground as another section.
- Preserve all three projects, five experience entries, seven recognition entries, five certificate links, eighteen skills, existing email/social links, and the personal portrait. Existing JPG/PDF assets should remain reachable at their existing URLs.
- Existing styling uses a white/black/blue brutalist palette, heavy 3–5 px rules, outlined display words, and several successive hero-grid/portrait overrides. Consolidate these into one responsive layout and the new token system.
- Existing CSS supplies a reduced-motion media query and focus-visible outlines; retain these accessibility intentions while updating motion and focus colors.
- Existing fonts load twice, in `index.html` and via CSS `@import`. Use one loading path. `index.html` points to a missing `/vite.svg`; replace with a local personal favicon.
- `package.json` exposes `dev`, `build`, and `preview`; it currently has no lint or type-check command and no TypeScript configuration. Do not imply those checks passed when unavailable.
- Content had an existing recognition discrepancy: AquaGuard's project outcome said “First Runner-Up — Bach Khoa Innovation 2026,” while the recognition table said “Second Runner-Up.” The user confirmed First Runner-Up on 11 October 2026; the recognition table now uses the confirmed result.

## Sources and concrete findings

All sources below were read directly through the web tool. Refero live research returned a subscription restriction in the parent task, so the fallback uses user-provided primary references and the skill's bundled typography, motion, and craft guidance.

### Editorial structure: Serkan Uslu

[New Website Design](https://www.serkanuslu.com/en/projects/new-website-design) and [homepage](https://www.serkanuslu.com/en) explicitly describe large Space Grotesk headings, DM Mono labels, project stories, and SVG pixel grids. Its actual source palette is paper/ink, so it supplies typography and content hierarchy rather than the dark palette. Its characters have section-specific working states and personal speech. The article explains reduced-motion stopping, offscreen pausing, and preserving ordinary mobile scrolling. Adapt readable identity-first hierarchy, meaningful project metadata, and a companion that reacts to the section without intercepting navigation.

### Engineering character: Snowbros / VED.EXE

[Snowbros case study](https://www.snowbros.me/work/ved-exe-portfolio) presents restrained retro character and performance as a design constraint. Its [current live portfolio](https://ved.exe.snowbros.me/) now exposes a numbered filing catalogue, project evidence, figure captions, capability references, and explicit research status. The live structure differs from the older CRT case-study description. Adapt terse technical labels, project numbers, real outcomes, and clear implemented/experimental/planned status. Keep retro treatment inside the small companion; a site-wide CRT overlay would conflict with the user's reading and performance goals.

### Optional play: Bruno Simon

[Bruno's portfolio](https://bruno-simon.com/) exposes a driveable 3D world with separate mouse, keyboard, touch, and gamepad instructions. It also offers quality, mute, reset, and recovery controls. Adapt only the principle of discoverable, optional play with an escape/recovery path: Mini Nghia can be clicked, paused, and hidden. Preserve ordinary link navigation and direct access to project content. Do not add a game engine or reproduce its 3D navigation.

### Pixel companion structure: 8bitbyadog

[Personal-Website repository](https://github.com/8bitbyadog/Personal-Website) describes a cursor-following pixel companion, responsive composition, component animation variants, and a 32×32 sprite convention. These are author-described intentions, not independently measured performance results. Adapt a small modular pixel representation with separate behavior and rendering definitions. Do not import its animation/3D stack into a project that only needs CSS, SVG, and React state.

## Access limitations

The primary pages and GitHub README were readable. Attempts to fetch the Serkan homepage screenshot and Snowbros case-study image failed with web cache-miss errors. The computer-use browser inventory had no available browsers. This research therefore does not claim a visual screenshot inspection, measured reference performance, or verified reference accessibility. Exact orange/black treatment, border thickness, spacing, and companion placement follow the user's concrete brief plus bundled craft rules; rendered local QA is still required.

## Locked direction

**Primary foundation:** the user's Ember Dark design system, with the editorial hierarchy and evidence structure supported by Serkan and current VED.EXE.

Preserve these signature traits:

1. Nearly black canvas and charcoal surfaces; orange appears in actions, active states, fine rules, and small technical details.
2. Large, direct sans-serif identity typography; readable body copy and monospace metadata.
3. A consistent wide content container, asymmetric hero with the real portrait, clear section labels, and thin divisions.
4. Projects remain distinct narratives with role, year, result, tags, and working destination links.
5. Small optional pixel personality plus a useful research interface; the engineering content stays primary.

Secondary sources have bounded roles: Serkan owns editorial type and section-aware character behavior; VED.EXE owns numbering and evidence/status language; Bruno owns optional interaction and controls; 8bitbyadog owns the modular pixel concept. No reference owns the application framework or dependency list.

Media strategy: use the real portrait and existing certificate imagery. Use a deliberately small code-native pixel character rather than a photographic/generated mascot. Playground images are visitor uploads or accurately identified local samples; canvas overlays show actual outputs only after inference completes. Do not fabricate research images, detection boxes, confidence scores, or segmentation masks.

Reject: large orange fills, blue/purple/green chrome, generic feature-card marketing structure, decorative headline word swaps, site-wide scanlines, neon/glass effects, gratuitous parallax, default pill styling everywhere, or any animation that hides content until JavaScript succeeds.

## Token commitments

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#0B0B0D` | Page canvas |
| `--surface` | `#171719` | Panels, navigation, cards |
| `--primary` | `#FF782E` | Actions, active indicators, deliberate accents |
| `--primary-hover` | `#FF9A56` | Interactive hover/focus highlights |
| `--foreground` | `#F5F2ED` | Main readable text |
| `--muted-foreground` | `#A6A29D` | Supporting prose and metadata |
| `--border` | `#323236` | Thin separators/outlines |
| `--accent-surface` | `#4A2415` | Subtle selected-state surfaces |

Use dark text on orange primary buttons; use warm foreground/muted text on dark surfaces. Default corners remain square or minimally rounded. Effects should be subtle surface changes and thin edge accents, not heavy floating shadows. Proposed motion uses short explicit-property transitions, transform/opacity where useful, and a full reduced-motion path.

## Decision ledger

| Decision | Source | Bounded role | Reason |
| --- | --- | --- | --- |
| Centralize the exact eight Ember colors | User brief | Global design-token authority | Cohesive theme across existing sections and new components |
| Strong sans display type plus mono technical labels | Serkan article; typography craft | Headings and metadata only | Communicate personality while preserving fast reading |
| Make Computer Vision / AI identity explicit in the hero | User brief | Primary message | Recruiters understand the engineering focus immediately |
| Keep the real portrait and certificate evidence | Existing assets; user preservation requirement | Personal media and verifiable work | Avoid invented decoration or lost content |
| Use numbered project records with real outcomes | Current VED.EXE; existing project data | Project hierarchy and technical metadata | Make work scannable and substantiate claims |
| Keep lines thin, spacing consistent, orange rare | User brief; color/craft guidance | Layout and accent discipline | Replace the heavy legacy palette without visual clutter |
| Local SVG/CSS pixel renderer plus isolated behavior state | Serkan article; 8bitbyadog README | Mini Nghia only | Lightweight and extendable character states |
| Provide pause/hide and conventional keyboard controls | Bruno controls; craft guidance | Optional play only | Let visitors control interaction and keep tasks accessible |
| Stop walking/loops for reduced motion and compact mobile | User brief; Serkan article; motion guidance | Companion and motion system | Preserve comfort and ordinary touch scrolling |
| Show inference loading, errors, and honest demo status | User brief; current VED.EXE evidence principle | Playground workflow | Never confuse a placeholder with model output |
| Lazy-load model runtime and below-fold images | User performance requirement; craft guidance | Loading strategy | Protect initial page weight and reserve image geometry |
| Keep existing anchor links and external destinations | Existing architecture; user brief | Navigation | Avoid deleting established functionality |

## Verification recommendations

`verify-portfolio.spec.js` currently mixes CommonJS `require` with a package declaring `type: module`; convert to ESM or use a `.cjs` name. It imports `@playwright/test`, absent from the current manifest. Its current invariant/error output is logging, not assertion, and rounded-corner/shadow counts enforce no useful behavior. Update the test around user-visible contracts:

- Desktop, tablet, 390 px mobile, and a narrow 320 px viewport: assert no horizontal document overflow, a single readable `h1`, original anchor destinations, preserved projects/experience/evidence links, and an actually loaded portrait.
- Assert an empty `pageerror` list after relevant interactions; avoid `networkidle` as a gate once remote model assets are involved.
- Mobile navigation: assert accessible name and `aria-expanded`, menu open/close, a working section link, Escape behavior if implemented, and the closed menu's links excluded from focus.
- Keyboard: verify a visible focus indicator on navigation, playground controls, companion, and hide/restore controls. Preserve semantic buttons and associated form labels.
- Theme: assert computed canvas/surface/text tokens and absence of the former blue chrome; do not fail legitimate model-image colors or semantic visualizations.
- Mini Nghia: assert speech on activation, hiding/restoring, and paused motion under `page.emulateMedia({ reducedMotion: 'reduce' })`. If timers/state control are available, verify coding/sleep transitions without long real waits.
- Playground: assert file validation, unsupported-image errors, model load/run status, a readable failed-download state, and planned UAV controls remaining explicitly unavailable. A stubbed output can test renderer mechanics only and must never be described as real-inference verification.
- Real inference smoke test: run at least one known image through each integrated model where network/runtime support is available, record returned detections/mask dimensions, and distinguish that from screenshot or stub-based testing.
- Capture and inspect desktop/mobile/reduced-motion screenshots, including an open menu, companion speech, upload preview, and result/error state. Check overlap at the bottom-right and long email/project-title wrapping.

Run `npm run build`. Run lint/type-check only if the final project supplies those scripts; report their absence accurately. Record final QA results separately from these pre-implementation recommendations.

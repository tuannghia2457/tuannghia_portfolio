> HISTORICAL REFERENCE — superseded for all color/style decisions by [the permanent Warm Ivory design system](DESIGN_SYSTEM.md). Ember Dark and RawBlock palettes are deprecated. Do not implement colors from this document.

# Curated portfolio — 12 October 2026

## Review and reference lock

Reviewed the actual App content, CSS, Mini Nghia, certificate links, scripts, and dependencies before edits. The source contained three projects, four experience entries, seven awards, five evidence records, twelve skills, three testimonials, education, languages, IELTS, and email/social contacts. The camera playground had detection, segmentation, and a planned UAV panel.

Refero live style searches were attempted but returned `NO_SUBSCRIPTION`. The fallback uses the existing [design research](design-research.md), user-provided site screenshot, and Refero's bundled craft/accessibility and motion references. The existing design system is the implementation target; no new visual direction is needed.

| Decision | Source | Bounded role |
| --- | --- | --- |
| Restore documented Ember Dark tokens | Explicit user brief; existing design research | Black canvas, charcoal panels, orange actions and active navigation |
| Preserve Space Grotesk, DM Mono, thin borders, framed real portrait | Existing site; Serkan reference documented in research | Identity and editorial hierarchy |
| Lead with CV research, then AquaGuard and human-centered AI | User brief; existing project data | Three summaries with dedicated technical detail routes |
| Keep awards/certificates and responsibility details expandable | User's progressive-disclosure requirement; existing evidence catalogue | Supporting information, not homepage content |
| Keep Mini Nghia across routes | User brief; existing optional-play research | Lightweight personality with existing controls |
| Use one optional smile demo, with an equally accessible skip link | User brief; optional-play research; craft guidance | Enable → local preview → sustained smile → friendly feedback → mail draft |
| Short page transitions; respect reduced motion | Bundled motion guidance and existing site | Navigation continuity and smile feedback only |

## Content map

- `/`: identity, short introduction, three project summaries, contact invitation.
- `/about`: background, education, languages, IELTS, all experience and skills; supporting companies, testimonials, recognition.
- `/projects`: all three project summaries; awards and certificate evidence.
- `/projects/:slug`: role, approach, contributions, technologies, results; AquaGuard team image, website, and certificates.
- `/research`: original interests, the three IVS work streams, CTMIA 2026 presentation. No invented publication, DOI, or repository links.
- `/contact`: original email/social destinations plus the only computer vision demo.

The retired upload demos, workers, helper modules, old model dependency, and obsolete checks were removed. Original personal/project/certificate media is retained. The portrait remains upright and now clips cleanly within its frame.

## Smile implementation

Follows [Google's Face Landmarker web guide](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js). MediaPipe Tasks Vision 0.10.32 runtime files are served from `/mediapipe`, and the [official version 1 float16 task](https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task) from `/models`. Both load only after explicit activation and camera permission. The JS runtime is dynamically imported. No camera frames are uploaded, recorded, or retained.

The mean of `mouthSmileLeft` and `mouthSmileRight` must exceed 0.45 for 550 ms. Detection is throttled to about eight frames per second on the main thread. Camera and model resources close on stop, success, unmount, tab hiding, and page hiding. Late permission/model results after cancellation are discarded and closed. Sessions stop after one minute of detection. Contact actions use `mailto:` drafts; nothing sends automatically.

## Validation

`npm test`: companion geometry and smile scoring/email draft checks. `npm run test:browser`: focused content, routes/history, certificates, 1440/768/390/320 px layout, mobile menu/Escape, permission denial, no pre-consent model requests, cancellation of late streams, real model video inference and navigation cleanup, and deterministic success animation/email action.

Real browser model inference found one face in the upright portrait, with left/right smile coefficients around 0.040/0.024. The live video test uses a canvas-generated stream of that same portrait and the real model. The celebration test uses mocked high smile coefficients to verify its UI deterministically; it does not establish physical webcam accuracy. Desktop/mobile screenshots were inspected. Physical camera/lighting variation still needs a manual check.

## Hosting

These are client-side routes with real paths. A production host must serve `index.html` for unknown app routes while serving existing images, model, and WASM assets normally. Vite development and preview already support direct route visits. Serve over HTTPS for deployed webcam access (localhost works during development).

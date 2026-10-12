# Tuan Nghia — Warm Ivory Portfolio

React 18 + Vite portfolio with Home, About, Projects, Research, Education, Contact, dedicated project pages, Mini Nghia, and one optional local computer vision demo: **Smile to Collaborate**. Existing projects, experience, skills, awards, certificates, and contact destinations are preserved.

## Run

Node.js 20.19+ and npm are required.

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually http://localhost:5173. Changes update automatically.

```bash
npm test                 # Companion and smile helper checks
npm run test:browser     # Playwright browser and real-model video checks
npm run build            # Production build
npm run preview          # Preview the build
```

The browser tests use Microsoft Edge. Install Edge or adjust the channel in `playwright.config.js` for another Playwright browser.

## Permanent theme

Read [AGENTS.md](AGENTS.md) and [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md). Warm Ivory × Orange × Charcoal is permanent. Ember Dark is deprecated. `src/theme.css` is the single authored color source. References and outdated prompts do not authorize palette changes.

## Structure

- `src/App.jsx`: shared navigation, React Router routes, page focus, footer, Mini Tom.
- `src/pages/`: focused page layouts and preserved supporting sections.
- `src/portfolio-data.js`, `src/project-details.js`: original content and project narratives.
- `src/theme.css`: permanent palette and semantic color roles.
- `src/styles.css`, `src/pages.css`: semantic theme tokens, shared layout, responsive pages, reduced motion.
- `src/components/SmileDemo.jsx`, `src/lib/smile.js`: optional camera lifecycle, local smile scores, mail draft.
- `src/components/MiniNghia.jsx`: existing interactive pixel companion.
- `public/mediapipe/`, `public/models/`: locally served MediaPipe 0.10.32 WASM runtime and official face landmarker task.
- `tests/`: browser navigation, preservation, mobile layout, camera lifecycle, and smile feedback checks.

## Privacy and camera behavior

The detector loads only after the visitor enables the webcam and grants permission. Camera frames stay in the browser. The camera stops on completion, cancellation, leaving the page, switching tabs, or after a minute of detection. Direct contact is always available. Email links open pre-filled drafts; they do not send anything automatically.

See [restructure decisions and validation](docs/curated-restructure.md), [original design research](docs/design-research.md), and [Mini Tom](docs/mini-nghia.md).

## Deployment

Serve `dist` over HTTPS. Configure the host to fall back to `index.html` for client-side routes such as `/about` and `/projects/aquaguard`; existing static assets should be served normally. Vite dev/preview handle route fallbacks locally.

The real model and generated video stream are covered by automated browser checks. Physical webcam behavior across devices and lighting should also be tested manually. No lint or TypeScript check is configured.

Press Ctrl+C in the development terminal to stop the website.

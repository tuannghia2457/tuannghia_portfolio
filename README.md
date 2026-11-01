# Tuan Nghia — Warm Ivory Portfolio

React 18 + Vite portfolio with Home, Experience, Projects, Research, Education, dedicated project pages, and one optional local computer vision demo: **Smile to Collaborate**. Existing projects, experience, skills, awards, certificates, and contact destinations are preserved.

Home includes the personal introduction, skills, collaborator comments, contact information, and optional camera demo. Experience focuses on company employment and company details; Projects showcases personal technical work; Research holds research interests and presentations; Education holds academic achievements and course certificates. Legacy `/about` and `/contact` links redirect to their new locations.

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

- `src/App.jsx`: shared navigation, React Router routes, page focus, footer.
- `src/pages/`: focused page layouts and preserved supporting sections.
- `src/portfolio-data.js`, `src/project-details.js`: original content and project narratives.
- `src/theme.css`: permanent palette and semantic color roles.
- `src/styles.css`, `src/pages.css`: semantic theme tokens, shared layout, responsive pages, reduced motion.
- `src/components/SmileDemo.jsx`, `src/lib/smile.js`: optional camera lifecycle, local smile scores, mail draft.
- `public/mediapipe/`, `public/models/`: locally served MediaPipe 0.10.32 WASM runtime and official face landmarker task.
- `tests/`: browser navigation, preservation, mobile layout, camera lifecycle, and smile feedback checks.

## Privacy and camera behavior

The detector loads only after the visitor enables the webcam and grants permission. The live video stays in the browser. The one exception is the smile photo: when smile storage is configured (a university project with testers who consented in advance), a notice above the webcam button tells the visitor that enabling the camera and smiling will take one photo and send it to Tuan Nghia with its time and score, and that photo (a mirrored JPEG) is uploaded automatically at the moment the smile is detected. When storage isn't configured, nothing is uploaded. The camera stops on completion, cancellation, leaving the page, switching tabs, or after a minute of detection. Direct contact is always available for anyone who prefers not to use the camera. Email links open pre-filled drafts; they do not send anything automatically.

See [restructure decisions and validation](docs/curated-restructure.md), and [original design research](docs/design-research.md).

## Smile photo storage (optional)

1. Create a Supabase project and run [supabase/schema.sql](supabase/schema.sql) in its SQL editor. It creates the `smiles` table and a private `smiles` bucket: visitors can only add photos; only the owner email can view or delete them.
2. In Authentication → Users, add a user for the owner email with a password, and turn off public sign-ups.
3. Copy `.env.example` to `.env` (locally) and set the same two variables in Vercel → Settings → Environment Variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings → API). Rebuild or redeploy.
4. Open `/admin`, sign in, and view or delete saved smiles. The page isn't linked from the navigation.

## Deployment

Serve `dist` over HTTPS. Configure the host to fall back to `index.html` for client-side routes such as `/experience` and `/projects/aquaguard`; existing static assets should be served normally. Vite dev/preview handle route fallbacks locally.

The real model and generated video stream are covered by automated browser checks. Physical webcam behavior across devices and lighting should also be tested manually. No lint or TypeScript check is configured.

Press Ctrl+C in the development terminal to stop the website.

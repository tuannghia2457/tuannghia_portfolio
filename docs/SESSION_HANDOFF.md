# Portfolio handoff — 12 October 2026

The owner stopped for the day and requested saved context for the next session. No new feature is pending execution; wait for their next request.

## Current site

- React/Vite project at `C:/TuanNghia/Personal/tuannghia_portfolio`; dev URL `http://localhost:5173`. Check whether the server is still running before restarting.
- Six top-level pages: Home, About, Projects, Research, Education, Contact. Projects have individual detail routes.
- Permanent Warm Ivory × Orange × Charcoal light theme. Read root `AGENTS.md` and `docs/DESIGN_SYSTEM.md`. Only `src/theme.css` defines authored color values; Ember Dark is deprecated.
- Display name is **Tuan Nghia**. **TOM appears only beside the top-left pixel icon**, with Dancing Script lettering and short hover/focus motion. The original **Mini Nghia** companion remains interactive.
- Header and favicon use the childhood pixel artwork stored in `public/images/personal-images/pixel.png`.
- Hero identifies the owner as **AI Engineer**. Its secondary action is **Request Resume**, approved by the owner until a real CV is supplied.
- Research interests: Natural Language Processing, Computer Vision, Robotics, Artificial Intelligence.

## Content and interactions

- About includes professional background, experience, technical skills, company explorer and collaborator comments. IVS, BSEC and SDE logos open inline details; BSEC has two roles. Logos are safely stored in `public/images/company-logos`.
- Projects show only external project/competition awards and evidence: six awards, four project certificate records. Recognition is a padded two-column card grid on desktop, one column on mobile, with links to projects. Dean's List is excluded here.
- Education is its own navigation page at `/education`. Three school cards: UTS, VNU-HCM High School for the Gifted, HCMUT. Logos are in `public/images/schools` and match the copies in `dist`. Original local folder was not found initially, so the exact supplied LinkedIn logos were downloaded and preserved locally.
- School previews show only logo, full institution name, degree/program and available GPA. All cards share hover/focus behavior; click/keyboard opens dates, activities, skills and school-specific achievements. HCMUT dates/GPA were not supplied and are not invented.
- UTS: AI bachelor's program, September 2025–expected May 2028, grade 6.9/7.0, Class Representative, Python/Java; hidden achievements include Dean's List 2026, publicly linked UTS/HCMUT student testimonial, Class Voted Collaborator. High school: Advanced Physics, August 2022–June 2025, grade 9.6/10. Languages and IELTS 8.0 remain separate within Education.
- `/education#certificates` has the designed Online course certificates section. Two earned records from the supplied context: Introduction to RAG (LinkedIn) and Microsoft Azure AI Essentials Professional Certificate (Microsoft and LinkedIn), both September 2026. Owner explicitly says files are not saved yet and wants layout first. `credentialUrl` stays null; no fake verification/download links.
- Contact has LinkedIn, Facebook (`https://www.facebook.com/tuannghia2457/`), GitHub (`https://github.com/tuannghia2457`) and a highlighted CV card. CV is Coming soon with a mailto Request CV action. Identity/contact destinations live in `src/profile.js`.
- The only CV demo is Smile to Collaborate on Contact, using locally served MediaPipe runtime/model files and local camera inference. No uploads or automatic emails. Camera cleanup is tested. Original detection/segmentation/UAV playground is removed.

## Pending materials

- Actual CV file/path to activate `profile.resumeUrl` for hero and Contact downloads.
- Course certificate PDFs/images or verification URLs to activate certificate links.
- Further school achievements supplied by the owner, added only to the corresponding school's `achievements` list.

## Git and validation

- Automatically commit meaningful completed changes after applicable checks. Author/committer for this repo: `Tran Tuan Nghia <trantuannghia2457@gmail.com>`. No Codex/AI author or co-author trailers; no empty/backdated commits.
- Work has been committed locally, **not pushed to GitHub**. Push requires task authorization; do not assume blanket permission from the auto-commit preference.
- Last implementation commit: `5643ee1` — Add online course certificates to Education. This handoff document is a subsequent documentation commit.
- Only remaining unrelated working-tree modification before this handoff: `.claude/settings.local.json`. Preserve it and do not stage it for portfolio tasks.
- Most recent validation passed: 9 helper/theme tests, 15 browser tests, production build, desktop/mobile visual inspection. Commands: `npm test`, `npm run test:browser`, `npm run build`. No lint/type-check command is configured.
- Browser tests use headless Microsoft Edge. `test-results` and `dist` are ignored. Playwright clears previous test-results; generate screenshots after tests.

For the next session, read this file and `AGENTS.md`, inspect Git status, then follow the owner's next request without redoing completed work.

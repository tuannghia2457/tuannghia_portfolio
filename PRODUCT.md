# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers** (primary) looking at Tuan Nghia for an AI engineering internship, a research assistant role, or similar. Nghia is aiming for industry and research roles equally. They skim the Home page, open a project or two, and should leave able to email him or request his CV.
- **Classmates and friends**, who get the link shared directly and browse the work for interest.

## Product Purpose

A personal portfolio for Tran Tuan Nghia (display name Tuan Nghia), an AI student at the University of Technology Sydney through the HCMUT–UTS transnational program. It shows his experience, projects, research and education so a reader can judge whether to contact him. Success is a recruiter or lab reaching out by email or asking for his CV.

## Positioning

His technology is aimed at real human needs: AquaGuard helps people during floods in Vietnam, VirtualDouble / ANT supports neurodivergent people doing deep work, and he has taught and built tools for IELTS students. The computer vision and robotics research at IVS sits alongside this. Other AI student portfolios can show models; this one shows who the work was for.

## Operating Context

- Five top-level pages: Home, Experience, Projects, Research, Education. Project detail pages at `/projects/:slug`, research detail pages at `/research/:slug`. Legacy `/about` redirects to `/experience`, `/contact` to `/#contact`.
- Home holds the personal background, skills, collaborator testimonials, contact information and the optional Smile to Collaborate demo.
- Experience holds company employment and company details. Projects and their awards hold only external project and competition results; academic records (grades, IELTS, Dean's List) live only on Education.
- Contact happens by email drafts, phone, LinkedIn, Facebook and GitHub. Email actions open drafts and never send automatically.
- React 18 + Vite, deployed by Vercel from `main`.

## Capabilities and Constraints

- Smile to Collaborate: an optional webcam demo using a local MediaPipe face model. It starts only after the visitor enables the webcam. When Supabase is configured, one photo of a detected smile is uploaded (with time and score) for a consented university cybersecurity project, viewable only by Nghia at `/admin`, and a visible notice above the webcam button must say so before the camera turns on.
- Neon Dark is the default theme, Neon Light is opt-in through the header toggle; both must pass the same contrast checks. Color authority lives in `src/theme.css` and `docs/DESIGN_SYSTEM.md`.
- Naming: "Tuan Nghia" everywhere; "TOM" only beside the pixel icon in the header; the page-transition curtain decrypts TUAN NGHIA into TOM TRAN. Formal name Tran Tuan Nghia.
- No resume file yet (`profile.resumeUrl` is null); the site offers a CV request email instead. Never link a dead download.

## Brand Commitments

- Voice: plain, first person, specific. No slogans, inflated claims or AI-sounding phrasing.
- Pixel-art portrait of Nghia as a child (`public/images/personal-images/pixel.png`) is the favicon and header icon; its background is transparent and the figure is unchanged.
- The upright portrait cutout on Home is preserved.
- The palette, naming and page structure are binding as recorded in `AGENTS.md`.

## Evidence on Hand

- Projects: AquaGuard (live at aquaguard.vn; 1st Place EPICS Season 8, 1st Place OISP Presentation Contest 2025, First Runner-Up Bach Khoa Innovation 2026, Finalist InnoStars, recognition at Leave A Nest) and VirtualDouble / ANT (Finalist, Accessibility Design Competition Hackathon 2026). Data in `src/portfolio-data.js` and `src/project-details.js`.
- Research: Vietnamese Legal RAG (URA Research Lab) and GNSS-Denied UAV Localization (IMACS) in `src/research.js`; Pothole Surface Reconstruction presented at Current Topics in Mathematics and Industrial Applications 2026 (no paper link or conference certificate yet).
- Certificates under `public/images/competitions-certifications/`; Dean's List 2026 certificate; IELTS 8.0; UTS GPA 6.9 / 7.0.
- Team photo of AquaGuard at `public/images/optimized/aquaguard-team.jpg`.
- Absent, do not fabricate: collaborator testimonials (drafts are unpublished until Nghia supplies real quotes and names), a resume file, publication links, conference certificate.

## Product Principles

1. Show who the work helped, then how it was built.
2. Every claim on the page is one Nghia can back up in an interview.
3. Make contacting him one step from anywhere.
4. Optional experiments (the smile demo) stay optional and tell visitors exactly what happens to their data.

# Education and project recognition

Latest owner instruction: education is a dedicated page at `/education`, with a top-level Education link alongside Projects and Research. The academic section is moved out of About. Direct visits, active navigation, mobile menu, page focus/title, and contrast checks include this route. Earlier About placement below is historical.

The owner requested a dedicated academic section and project-only awards on 12 October 2026. `#education` on About now contains degree/program history, academic grades, language capabilities, IELTS 8.0, and Dean's List with its existing certificate. The degree periods and grades reuse the supplied `context.md` education records; language proficiency reuses its language section. Japanese is described as elementary proficiency without inventing a verified JLPT certificate.

The existing Warm Ivory card typography, borders and responsive layout remain the design reference. Education records and language/recognition cards use two columns on desktop and stack on mobile, with the same semantic tokens. The About biography retains its concise professional introduction but no longer duplicates the IELTS/language metadata.

Projects and project detail evidence retain four project certificates and six external project recognitions. Academic records are preserved in Education rather than mixed into Awards or removed. The certificate file remains at its original URL. `tests/education.spec.js` checks content separation, certificate access, preserved project results, and narrow-screen layout.

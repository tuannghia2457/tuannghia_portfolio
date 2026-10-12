# Tom — editorial homepage hero

## Latest refinement

The latest owner correction takes precedence: **Tuan Nghia is the display name everywhere; TOM appears only next to the top-left pixel icon.** The hero uses “Tuan / Nghia.”, and the original Mini Nghia name is restored. The header TOM wordmark is enlarged in Dancing Script with a short staggered letter motion on hover/focus, disabled by the existing reduced-motion rule. All earlier broad Tom-renaming notes below are historical.

The owner requested a stronger hero impression and the childhood pixel artwork as the browser icon. The opening now spans the page and fills most of the desktop viewport, with a prominent Georgia serif “Tom.” wordmark, the full name beneath, a larger real portrait, and focused CTAs. This follows the attached brief's permitted serif/sans pairing; other page typography and the permanent palette stay intact. Mobile retains stacked content and accessible controls. The favicon and touch icon now point directly to the preserved pixel PNG; the former generated lettermark favicon is removed. All available tests and the production build pass after this change.

12 October 2026. The attached hero brief and the direct instruction to use the nickname Tom guide this change. The existing Warm Ivory theme is locked; the five-page structure and other sections are retained.

## Research and reference lock

- [Serkan Uslu](https://www.serkanuslu.com/en): identity, role, and a short introduction establish the homepage hierarchy. Borrow hierarchy, not its exact layout or colors.
- [Brittany Chiang](https://brittanychiang.com/): concise engineering positioning and direct access to professional material. Borrow clarity and reading order, not its dark palette.
- [Rauno Freiberg](https://rauno.me/): personal identity with restrained links and copy. Borrow restraint, not its composition.
- The VED.EXE reference could not be retrieved in this run. Refero live access was already unavailable in the preceding design work, so these primary portfolios, the attached brief, existing product layout, and bundled craft guidance supply the references.

The primary target remains the existing Warm Ivory editorial system. Use asymmetric columns, a moderate Space Grotesk name, small DM Mono metadata, existing semantic tokens, and the real portrait. The narrow secondary ideas are concise identity/role copy and quiet professional calls to action. No stats panel, grayscale fading, full biography, or copied portrait proportions.

| Decision | Source | Role |
| --- | --- | --- |
| Use Tom in branding, greetings, companion, email drafts, and titles | Direct user message | Preferred nickname, not a legal name replacement |
| Retain Tran Tuan Nghia as prominent full name | Attached brief | Recruiter identification |
| Use pixel.png for the top-left brand icon | Direct user message and supplied asset | Personal brand artwork; its inherent colors are image content |
| Preserve image outside dist | Vite asset lifecycle | public/images/personal-images/pixel.png survives build cleanup |
| Asymmetric two-column hero, warm-gray portrait mat, restrained corner markers | Attached brief and current design system | Editorial composition; decorative CV motif only |
| Keep existing sans display and mono metadata | Current design system | No new font/dependency and consistent cross-page identity |
| Request Resume until a real file is supplied | Actual repository inventory | No broken download or invented resume |

`src/profile.js` records the nickname, full name, brand image, and optional resume URL. Set `resumeUrl` to a real public URL when supplied to switch the secondary CTA to Download Resume. The current CTA opens a reviewable request email, never sends automatically. Account URLs, certificate filenames, internal component identifiers, and original factual records retain their valid names.

Portrait brackets are a decorative visual effect, not live model inference. Existing reduced-motion rules disable transitions/entrance animation. Desktop uses two columns, mobile stacks content and portrait, and the selected-work anchor provides a minimal scroll cue.

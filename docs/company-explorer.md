# Companies & collaborators

The About page displays three employer logos: IVS, Best Start English Center, and SDE Tech. Selecting a native button reveals one company's details in an inline panel. Selecting it again or using Close collapses the panel; Close returns focus to that company. Keyboard activation works through standard button controls, with explicit expanded state and associated region. Mobile stacks the logo choices, and reduced-motion preferences disable panel/chevron animation.

The design follows the existing Warm Ivory card system and the user's requested progressive disclosure. The earlier Refero craft/accessibility research supplies ordinary semantic controls; no alternate palette or visual authority is introduced. Company logo colors are original artwork, not theme tokens. No synthetic logo is created.

The three supplied files were discovered under generated `dist/images/company-logos` and copied unchanged into `public/images/company-logos` so future builds preserve them. Details reuse the original four experience records: one IVS role, two Best Start roles, and one SDE role. No company founding dates, unverified website URLs, or corporate claims are invented.

`tests/companies.spec.js` validates loaded images, per-company details, switching/toggling, keyboard activation, Close focus, and 320px layout. Theme tests cover default controls; the existing camera, navigation, content, and build checks remain required.

Odylytics is the fourth company, with a Chief Technology Officer and Computer Vision Engineer role beginning July 2026 from the owner's original profile. Both supplied logo variants were copied unchanged from dist into public/images/company-logos; the light version is displayed. The selector uses two columns on desktop and one on mobile to keep full company names readable. Navigation hover, keyboard focus, press, and selected-page states share the same orange underline without changing font size or weight.

Pothole Surface Reconstruction belongs to Individual Systems Joint Stock Company as an employment milestone. It appears in the employment record and company detail panel, retains its technical approach, contributions and conference result, and remains referenced from Research. It is excluded from personal project cards on Home and Projects. Its old project URL redirects to /experience#ivs-pothole-milestone.

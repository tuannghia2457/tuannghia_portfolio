---
name: Tuan Nghia Portfolio
description: A personal portfolio in Neon Dark, near-black with neon green and electric blue, written in a plain human voice.
colors:
  night-black: "#0D0D0D"
  paper-white: "#FFFFFF"
  signal-green: "#00FF85"
  electric-blue: "#1E90FF"
  mint-hover: "color-mix(in srgb, #00FF85 72%, #FFFFFF)"
  surface: "color-mix(in srgb, #FFFFFF 5%, #0D0D0D)"
  surface-alt: "color-mix(in srgb, #FFFFFF 9%, #0D0D0D)"
  muted-ink: "color-mix(in srgb, #FFFFFF 68%, #0D0D0D)"
  hairline: "color-mix(in srgb, #FFFFFF 16%, #0D0D0D)"
  light-paper: "#F7F8F4"
  light-green: "#00C96B"
  light-blue: "#0B63C9"
  light-accent-text: "color-mix(in srgb, #00C96B 45%, #0D0D0D)"
  logo-plate: "#FFFFFF"
typography:
  display:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(3rem, 1.2rem + 7.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3.4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  tag: "3px"
  sm: "3.6px"
  md: "4.8px"
  base: "6px"
spacing:
  gutter: "max(22px, 5vw)"
  section: "clamp(76px, 9vw, 132px)"
  card: "26px"
  content-width: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.night-black}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "13px 18px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.mint-hover}"
    textColor: "{colors.night-black}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.base}"
    padding: "13px 18px"
    height: "48px"
  tag:
    textColor: "{colors.muted-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper-white}"
    padding: "{spacing.card}"
  nav-link:
    textColor: "{colors.muted-ink}"
    height: "44px"
  nav-link-active:
    textColor: "{colors.signal-green}"
---

# Design System: Tuan Nghia Portfolio

## Overview

**Creative North Star: "A Person's Workbench at Night"**

The site is a dark, editorial workspace that belongs to one person. Near-black pages, white type and thin hairlines keep it calm. Neon green is the light on the desk: it marks actions, accent words and hover states, and almost nothing else. The details are an engineer's (numbered section labels, a typing terminal card, a section rail), but the voice and the imagery are human: a real portrait, a childhood pixel avatar, plain first-person copy and a smile demo that says hello.

The system is not being reinvented. Its palette, fonts and layouts are fixed by `AGENTS.md` and `src/theme.css`, and new work should feel like the same person made it. "More human" means warmer content and gentler moments inside this frame (photos, stories, who the work helped), never a new color or a softer theme.

Controls are precise and quiet. Surfaces separate by tone and hairlines, and cards and panels sit on a soft shadow so the page reads in layers.

**Key Characteristics:**
- Neon Dark by default; Neon Light only through the header toggle.
- One sans family for everything readable; mono only where text is literally code.
- Green used sparingly as the signal; blue reserved for focus.
- Thin 1px hairlines, small 6px corners, generous whitespace.
- Real photos and the pixel avatar carry the personality; decoration does not.
- Every animation has a reduced-motion fallback.

## Colors

A near-black and white base with two neon accents, each with one job.

### Primary
- **Signal Green** (`signal-green`): primary buttons, accent text (`--accent-foreground`), hover borders, link underlines, the active menu underline and the first letter of section labels. In Neon Light it becomes `light-green` for fills and `light-accent-text` for text, because no bright green reads as text on a light page.
- **Mint Hover** (`mint-hover`): only the hover fill of green buttons. Never a second accent.

### Secondary
- **Electric Blue** (`electric-blue`): the focus ring on every interactive element (`--focus-ring`), and occasional secondary accents. In Neon Light it deepens to `light-blue`.

### Neutral
- **Night Black** (`night-black`): the page, and the label color on green and mint fills (`--on-primary`).
- **Paper White** (`paper-white`): headings and body text.
- **Surface** (`surface`) and **Surface Alt** (`surface-alt`): cards, navigation, dialogs, then secondary panels and the page-transition curtain.
- **Muted Ink** (`muted-ink`): supporting copy, metadata, tags, the second line of split headings (`h2 em`).
- **Hairline** (`hairline`): every border and divider.
- **Light Paper** (`light-paper`): the Neon Light page, faintly green-tinted.
- **Logo Plate** (`logo-plate`): the white plate behind company, school and tool logos, which are artwork made for white.

### Named Rules
**The Single Source Rule.** Every color value is authored once in `src/theme.css`. Components use semantic variables only: no hex, no fallbacks, no new colors. A theme change needs Nghia's explicit request.

**The Signal Rule.** Green marks what you can act on or what matters most in a block. If a screen is mostly green, it has lost its signal.

**The Retired Colors Rule.** Pink `#FF0099`, Warm Ivory, Ember Dark and RawBlock are gone and stay gone.

## Typography

**Body and Display Font:** Be Vietnam Pro (with system-ui, -apple-system, Segoe UI, Roboto)
**Code Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, Consolas)

**Character:** Be Vietnam Pro was drawn by Vietnamese designers, so Vietnamese diacritics hold up at every weight; one family carries the giant hero name and the smallest label. JetBrains Mono appears only in the terminal card and real code, which keeps that moment distinct.

### Hierarchy
- **Display** (800, clamp 48→96px, 1.1, −0.025em): the hero name and page titles (`h1`), always ending in a green period.
- **Headline** (700, clamp 36→48px, 1.2, −0.015em): section headings (`h2`). Split headings put the second phrase in muted ink.
- **Title** (600, 24px, 1.2): card and item titles (`h3`).
- **Body** (400, 16–18px, 1.7): paragraphs, capped near 65ch.
- **Label** (500, 12px, +0.01em, sentence case): section kickers like "02 / Selected projects", tags, metadata, dates.

### Named Rules
**The Two Fonts Rule.** Be Vietnam Pro for everything a person reads; JetBrains Mono only for things that are code. Tags and labels are not code. (The `.mono` class name is historical; it now renders the sans.)

**The Green Period Rule.** Page titles and key headings end in a period colored with the accent.

## Layout

Content sits in a centered column up to 1240px wide (1320px from 1600px viewports), with a gutter of `max(22px, 5vw)` and sections spaced `clamp(76px, 9vw, 132px)` apart. The header is sticky, 78px tall, on a blurred surface. Home and the top-level pages carry a section rail that marks the current section and hides on phones.

Breakpoints are content-led: 1100px (hero tightens), 900px and 850px (grids collapse, navigation becomes a menu with 48px rows), 600px and 360px (single column, smaller gutters). Project and research detail pages share one layout: hero, facts strip, a main column and an aside of panels.

Touch targets are at least 44px everywhere and 48px in the mobile menu and buttons.

## Elevation & Depth

Surfaces layer by tone first: the page is night black, cards and navigation are 5% lighter, secondary panels 9% lighter, and a 1px hairline outlines each. On top of that, cards and panels sit on a soft resting shadow so the page reads as stacked sheets, and lift further on hover.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 8px 28px var(--shadow-color)`, token `--shadow-overlay`): navigation menu, popovers, dialogs.
- **Button lift** (`box-shadow: 0 3px 8px var(--shadow-color)`): primary buttons on hover, with a 2px upward move.
- **Resting layer** (`box-shadow: 0 2px 10px var(--shadow-color)`), token `--shadow-rest`: cards and panels at rest.

`--shadow-color` derives from the background (70% night black in Neon Dark, 14% ink in Neon Light), so shadows never introduce a color.

### Named Rules
**The Layered Sheets Rule.** Cards and panels sit on the resting shadow; hover adds lift and a green border, never a glow.

## Shapes

Small, consistent corners: 6px (`--radius`) for buttons, cards, inputs and the menu contact pill; 3px for tags. Lines are 1px hairlines. Hero visuals use a background-removed grayscale portrait and a drifting outlined name; there are no blobs, gradients or decorative illustrations.

## Components

### Buttons
Precise and quiet: a clear fill, a short lift on hover, nothing more.
- **Shape:** gently squared corners (6px), 48px minimum height, 13px × 18px padding, 12–14px semibold label.
- **Primary:** signal green fill, night black label.
- **Hover / Focus:** mint fill, 2px lift and the button-lift shadow; focus shows a 2px electric blue outline offset 5px.
- **Secondary:** surface fill, white label; hover turns the border green and lifts 2px.
- **Light:** page-colored fill; hover turns the border green and the label accent green.

### Chips (tags)
- **Style:** transparent background, muted ink label at 12px, 1px hairline border, 3px corners, 5px × 8px padding.
- **State:** static; tags are not filters.

### Cards / Containers
- **Corner Style:** 6px on research cards and detail panels; Home and Projects project cards are square-cornered.
- **Background:** surface.
- **Shadow Strategy:** resting layer shadow (see Elevation); hover lifts 4px and turns the border green.
- **Border:** 1px hairline.
- **Internal Padding:** 26px.

### Navigation
Sticky header with the pixel avatar and "TOM" wordmark at the left and five links (Home, Experience, Projects, Research, Education) plus a contact pill. Links are 14px medium in muted ink; hover, focus and the current page turn accent green with a 2px green underline that fades in, without shifting the text. Below 850px the links move into a menu of 48px rows divided by hairlines. The theme toggle sits beside them.

### Hero terminal (signature)
A small terminal card with three window dots and a `shell — zsh` bar types out `whoami` and `currently.log` lines in JetBrains Mono after the page curtain lifts. Under reduced motion it shows the full text at once.

### Page-transition curtain (signature)
On route change a surface-alt curtain shows TUAN NGHIA decrypting into TOM TRAN in white mono with a thin green progress bar, then reveals the page. Under reduced motion it only fades.

## Do's and Don'ts

### Do:
- **Do** use the semantic variables from `src/theme.css` for every color, in both modes.
- **Do** keep green for actions, accent text and hover, and blue for focus.
- **Do** check text contrast at 4.5:1 and indicators at 3:1 in Neon Dark and Neon Light.
- **Do** bring personality through real content: photos, the pixel avatar, stories about who the work helped, plain first-person copy.
- **Do** give every motion a reduced-motion fallback.

### Don't:
- **Don't** add, change or hardcode colors, or bring back pink, Warm Ivory, Ember Dark or RawBlock.
- **Don't** switch themes from the OS preference or per page; Neon Dark opens every visit.
- **Don't** use JetBrains Mono for tags, labels or decorative numbers.
- **Don't** put white labels on green or mint fills.
- **Don't** add glows, gradients or decorative illustrations to make the site feel friendlier.
- **Don't** restore the Home scroll color shift or Mini Nghia without Nghia asking.

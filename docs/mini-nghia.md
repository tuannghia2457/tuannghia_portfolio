# Mini Nghia

`src/components/MiniNghia.jsx` is the portfolio's small pixel companion. Import it once near the end of `App`; it imports its own CSS and uses the permanent Warm Ivory semantic color tokens in `src/theme.css` and global font tokens. It adds no dependencies or downloaded art.

The user-provided [8bitbyadog portfolio reference](https://github.com/8bitbyadog/Personal-Website) informed the idea of a responsive, stateful companion. This implementation uses original 24 × 26 code-native SVG art rather than the reference's assets. Orange is reserved for the jacket, laptop, and interaction accents; the website remains the main focus.

## Behavior

| State | Trigger | Behavior |
| --- | --- | --- |
| Idle | Default and after an activity | An occasional one-pixel breath and blink. |
| Walking | Desktop idle periods, when a path is clear | A short 100px trip along the bottom edge, with stepped arms and legs. |
| Coding | Every third ambient activity, or when a walking route is blocked | A small laptop and typing pose for 4.8 seconds. |
| Sleeping | 60 seconds without visitor input | Closed eyes and a small sleep mark. Pointer, keyboard, or scroll input wakes it. |
| Chatting | Character activation | A section-aware message and controls. Ambient activity stops while the conversation is open. |
| Dragging | Horizontal pointer drag on desktop | Moves along the bottom edge and avoids interactive controls. |
| Compact | Initial narrow-screen state | A 44px stationary button; activation opens the companion and conversation. |
| Hidden | Hide control | An accessible bottom-right restore button remains. |

Ambient activities begin after 16 seconds of idle time. Walking is performed through a direct transform update with `requestAnimationFrame`, without React rendering every frame. Whole-path collision checks exclude links, buttons, form fields, and elements with `role="button"`. Root footer spacing reserves the docking corner. Desktop dragging is constrained horizontally and caches obstacle measurements during a drag.

The current visible portfolio section changes the available conversation lines. Messages appear only after activation; the companion does not announce unsolicited messages while browsing. Intersection and mutation observers support lazily loaded sections, while URL hashes provide a fallback when intersection observers are unavailable.

## Controls and accessibility

- Click or press Enter/Space on the character to open a conversation. Tab proceeds to Close, Say more, Pause/Resume, and Hide.
- Left/Right arrows move a focused desktop character by 32px. Home returns it to the docking corner when the path is clear.
- Escape closes the conversation and returns focus to the character.
- Pause stops automatic activity and sprite animation. Hide and Restore preserve usable keyboard focus.
- `prefers-reduced-motion` disables automatic movement and every looping sprite animation; explicit controls continue to work.
- Mobile starts compact, does not walk or drag automatically, and provides 44px conversation controls.
- Focus, pointer interaction, conversations, scrolling, document hiding, and reduced-motion changes interrupt ambient activities. Timers, animation frames, media listeners, viewport events, and observers are cleaned up.

## Extending the component

1. Add a new named pose to `PixelNghia` using crisp pixel-grid SVG groups.
2. Add a corresponding `.is-STATE` rule in `mini-nghia.css`. Use Ember tokens and preserve reduced-motion/paused behavior.
3. Trigger the state in the ambient scheduler or an explicit interaction. Include a completion condition and cleanup; avoid React updates on animation frames.
4. For section reactions, add the section ID and its text to `SECTION_MESSAGES`. The observer will discover a matching section even when it loads lazily.

The collision functions in `mini-nghia.helpers.js` are independent of React. Their tests verify viewport bounds, control clearance, swept paths, and ignored invisible elements:

```sh
node --test src/components/mini-nghia.helpers.test.js
```

## Limits

The companion is decorative and scripted; its conversation is not a chatbot. Hiding and pausing last for the current page session. It avoids interactive controls, but the visitor-opened conversation overlays page content and can be dismissed. Walking skips obstructed routes rather than attempting complex pathfinding. Adding new fixed UI should preserve the bottom-right docking gutter.

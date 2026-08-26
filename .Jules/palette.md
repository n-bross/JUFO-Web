## 2024-05-24 - Accessibility Standards for Navigation
**Learning:** Screen readers cannot deduce visual cues (like yellow dots, underlines) indicating an active page, and expanding menus without ARIA attributes leave non-visual users unaware of dynamic state changes.
**Action:** Always add `aria-current="page"` to active links, `aria-expanded` to toggle buttons, and dynamically update `aria-label` text to reflect the current open/close state.

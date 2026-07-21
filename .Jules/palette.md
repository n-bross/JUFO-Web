## 2026-07-21 - Mobile Menu Accessibility
**Learning:** Icon-only buttons used for mobile navigation toggles often lack clear ARIA labels and expanded states, especially when the icon changes (e.g. Menu to X) visually but not semantically.
**Action:** When implementing mobile menus or similar toggle components, ensure that an `aria-expanded` state is bound to the toggle and `aria-controls` links it to the target container. Also update the `aria-label` dynamically based on the state.

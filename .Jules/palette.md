## 2024-10-23 - Accessibility of Filter Buttons
**Learning:** Filter buttons that act as toggles or tabs must use `aria-pressed` or similar attributes (like `aria-current` or `aria-selected` depending on the exact pattern) to convey their active state to screen readers. Relying solely on visual changes (like background color or shadows) leaves visually impaired users without context of what filter is currently applied.
**Action:** Always pair visual active states on toggle buttons with `aria-pressed`.

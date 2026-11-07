## 2024-03-20 - Ensure Screen Reader Accessibility for Toggle and Filter Buttons
**Learning:** Visual selected states on toggle or filter buttons (e.g., changing background color when active) are not automatically conveyed to screen readers. Relying solely on visual cues excludes visually impaired users.
**Action:** Always pair visual selected states on buttons acting as toggles or filters with the `aria-pressed` attribute to ensure screen reader accessibility.

## 2024-05-15 - Missing `aria-pressed` on filter/toggle buttons
**Learning:** Found an app-wide pattern where filter/toggle buttons in multiple components (`GaleriePage`, `AktionenPage`, `AdminPostsPage`) indicated their active state visually but lacked the semantic `aria-pressed` attribute for screen reader accessibility.
**Action:** Always pair visual selected states on buttons acting as toggles or filters with the `aria-pressed` attribute to ensure screen reader accessibility, particularly when the active state is only conveyed visually.

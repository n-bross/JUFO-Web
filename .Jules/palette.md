## 2024-10-26 - Missing aria-pressed on toggle buttons
**Learning:** Found a recurring pattern where filter/toggle buttons (e.g., in Aktionen, Galerie, and Admin forms) use visual cues (classes) for their active state but lack the `aria-pressed` attribute, making it difficult for screen reader users to identify the currently selected filter.
**Action:** Always include `aria-pressed={isActive}` on buttons that function as toggles or filters to ensure visual state changes are semantically available to assistive technologies.

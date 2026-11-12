## 2024-03-20 - Missing aria-pressed on filter and toggle buttons
**Learning:** Across the application (Aktionen, Galerie, Admin), filter/toggle buttons used visual styling (e.g. background colors or shadows) to indicate their selected state but were missing the semantic `aria-pressed` attribute, making this state inaccessible to screen readers.
**Action:** Ensure all interactive elements that behave as toggles or single-select filters map their visual active state to the `aria-pressed` attribute.

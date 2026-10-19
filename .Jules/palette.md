## 2026-10-19 - Missing aria-pressed on toggle buttons
**Learning:** Across the app, custom toggle and filter buttons (like category filters and status toggles) use visual styling to indicate selection but lack the `aria-pressed` attribute, making their active state inaccessible to screen readers.
**Action:** Always add `aria-pressed={isActive}` to custom toggle or filter buttons when their selected state is primarily conveyed visually.

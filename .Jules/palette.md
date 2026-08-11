## 2024-05-18 - Navbar Accessibility ARIA Attributes
**Learning:** The navigation menu heavily relied on visual cues (like text color and underlines) to indicate active state and menu open/close status, making it inaccessible to screen reader users. The dynamic state needs to be reflected in semantic HTML.
**Action:** Always ensure that when implementing custom dropdowns or routing active states, pair the visual `className` conditional logic with `aria-current="page"` for active links and `aria-expanded`/`aria-controls` for toggles.

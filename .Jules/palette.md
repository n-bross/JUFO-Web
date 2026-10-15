## 2026-10-13 - Pair visual state changes with semantic ARIA attributes
**Learning:** Visual state changes (e.g., active navigation links, open menus) should be paired with corresponding semantic ARIA attributes (`aria-current`, `aria-expanded`) for screen reader accessibility.
**Action:** Always add semantic ARIA attributes to active navigation links and mobile menu buttons to ensure screen readers announce their state correctly.

## 2024-12-14 - Add Form Field Associations (htmlFor and id)
**Learning:** Missing `<label htmlFor="...">` and input `id` attributes in forms (like in MitmachenPage, KontaktPage, AktionenPage) break programmatic association, preventing screen readers from announcing the label when the input is focused.
**Action:** Always verify that `<label>` elements have an `htmlFor` attribute that strictly matches the corresponding input's `id`. This is a critical a11y requirement that must be applied across all future forms.

## Focus rings on interactive elements
**Learning:** Interactive elements such as buttons and navigation toggles require clear focus-visible rings for keyboard accessibility.
**Action:** Use `focus-visible:ring-2` on buttons and icon toggles.

## 2024-12-14 - ARIA states for filter buttons
**Learning:** Using `aria-pressed` on filter buttons communicates their active toggled state to screen reader users, which is essential when the selected state is only conveyed visually via background colors.
**Action:** Always pair visual selected states on buttons acting as toggles or filters with the `aria-pressed` attribute to ensure screen reader accessibility.

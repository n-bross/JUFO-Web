## 2026-08-24 - [Semantic State in Navigation]
**Learning:** Adding visual state (like underline or color) for active links or opened menus is not enough; we must pair it with semantic ARIA attributes like `aria-current="page"` and `aria-expanded` so screen reader users understand the current UI state.
**Action:** Always add semantic ARIA attributes when implementing visual state changes for interactive or structural elements.

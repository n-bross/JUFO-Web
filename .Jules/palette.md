## 2026-09-09 - Pairing Visual State with ARIA Attributes
**Learning:** Adding visual indicators (like underlines or bold text) for active links or open menus is good for sighted users, but screen reader users miss this context unless it's paired with semantic ARIA attributes like `aria-current="page"` and `aria-expanded="true"`.
**Action:** Always ensure that visual state changes in navigation and interactive elements are accompanied by their corresponding ARIA attributes for full accessibility.

## 2024-09-03 - Pair Visual State with Semantic ARIA
**Learning:** Adding active visual states to links (like an underline or colored dot) or menus without providing equivalent information to screen readers results in an inaccessible navigation experience.
**Action:** Always pair visual state changes with their semantic ARIA attribute counterparts (e.g., `aria-current="page"` for active navigation items, and `aria-expanded={open}` along with dynamic `aria-label` texts for collapsible menus).

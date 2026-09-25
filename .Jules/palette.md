## 2024-09-24 - Navigation Accessibility
**Learning:** React Router's generic `Link` component doesn't automatically add `aria-current="page"` when a route matches, causing screen reader users to miss context about their current location in navigation menus.
**Action:** Always manually add `aria-current="page"` to custom navigation links where active states are visually styled, and pair stateful UI (like mobile menus) with dynamic `aria-label` and `aria-expanded` attributes.

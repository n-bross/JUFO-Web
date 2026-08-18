## 2025-01-20 - Navigation Accessibility with ARIA
**Learning:** Visual state changes (like underlining active navigation links or showing/hiding a mobile menu) must always be paired with semantic ARIA attributes (`aria-current="page"`, `aria-expanded`) so that screen readers can correctly interpret the interface's current state.
**Action:** Always add `aria-current="page"` to the currently active navigation item, and ensure interactive elements that control visibility (like a mobile hamburger menu) toggle the `aria-expanded` attribute and update their `aria-label` accordingly.

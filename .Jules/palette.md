## 2025-02-18 - Navbar Accessibility Enhancement
**Learning:** Found a missing `aria-expanded` and missing `aria-current` usage in the main navigation components, making keyboard/screen reader navigation confusing since users could not tell which page was active or what state the mobile menu was in. Added these standard ARIA roles based on React router's active location.
**Action:** Always pair visual active states with `aria-current="page"` for navigation links. Always pair mobile menu toggle visual states with `aria-expanded` and dynamically updating `aria-label`.

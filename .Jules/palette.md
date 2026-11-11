## 2026-11-11 - Adding aria-pressed to custom filter/toggle buttons
**Learning:** Custom UI elements acting as toggle or filter buttons often visually communicate their active/selected state (e.g. changing background color), but screen reader users lack this context if proper ARIA attributes are missing. In this app, many filter bars and toggle options missed this binding.
**Action:** Always ensure that custom button elements functioning as toggles or filters include the `aria-pressed` attribute bound to the state controlling the active visual representation.

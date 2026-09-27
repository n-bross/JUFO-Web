## 2026-09-26 - [Form Accessibility Pattern]
**Learning:** Found an accessibility issue pattern specific to this app's components: forms in `KontaktPage.tsx` and likely other pages lack programmatic association between labels and inputs (missing `id` and `htmlFor`). This makes them unfriendly to screen readers.
**Action:** Always ensure `<label>` elements use `htmlFor` matching the corresponding input's `id` across all newly created or updated forms in this app.

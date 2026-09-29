## 2024-12-14 - Add Form Field Associations (htmlFor and id)
**Learning:** Missing `<label htmlFor="...">` and input `id` attributes in forms (like in MitmachenPage, KontaktPage, AktionenPage) break programmatic association, preventing screen readers from announcing the label when the input is focused.
**Action:** Always verify that `<label>` elements have an `htmlFor` attribute that strictly matches the corresponding input's `id`. This is a critical a11y requirement that must be applied across all future forms.

## 2024-05-24 - Form Label Associations

**Learning:** When using `<label>` without `htmlFor` and an input without an `id`, screen readers cannot associate the label with the input. Clicking the label also does not focus the input. This is a common pattern in custom form components that needs to be addressed.
**Action:** Always ensure that every `<label>` element has an `htmlFor` attribute that strictly matches the `id` of its corresponding form control element (e.g., `<input>`, `<textarea>`, `<select>`).

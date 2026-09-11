## 2024-03-24 - Semantic Form Accessibility
**Learning:** Native `<label>` elements missing the `htmlFor` attribute severely break screen reader experiences and mouse clickability (focus target) for forms, even when nested adjacently with inputs.
**Action:** Always pair `htmlFor` on labels with an explicit `id` on their corresponding form inputs (`<input>`, `<textarea>`, `<select>`) to guarantee correct programmatic association for a11y.

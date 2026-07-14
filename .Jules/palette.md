## 2024-07-13 - [Missing Form Label Associations]
**Learning:** Text inputs and textareas systematically lack proper label associations (htmlFor/id) across various components, while checkboxes are implemented correctly. This causes a11y issues for screen reader users and affects the click target area for labels.
**Action:** When working on form components, explicitly verify and implement htmlFor/id associations for all input types.

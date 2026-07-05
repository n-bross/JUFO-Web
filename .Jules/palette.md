## 2026-07-05 - Add missing HTML input and label connections
**Learning:** Found an accessibility issue pattern in forms where `label` missing `htmlFor` and `input` missing `id` attributes across this app's components, causing screen reader unfriendliness.
**Action:** Next time when modifying or reviewing a form, make sure the labels and inputs have a proper relationship matching `htmlFor` to `id` respectively.

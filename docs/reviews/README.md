# Reviews and evidence

Point-in-time reports, not a work queue. [ROADMAP](../../ROADMAP.md) owns accepted execution order;
[todo](../../todo.md) owns defect acceptance checks. An unchecked recommendation does not authorize
implementation. Closed findings remain in their original reports as historical evidence.

| Record | Disposition |
|---|---|
| [August 20 adversarial review](2026-08-20-nodevelo-adversarial-investment-review.md) | Accepted freeze charter; current package status is in ROADMAP |
| [Publication/cycle evidence](2026-08-24-publication-gate-evidence.md) | Continuing FR-9 evidence log; real attended cycles only |
| [September 2 code/app review](2026-09-02-code-and-app-state-review.md) | Findings routed as SR/MA IDs; reproduction status is in todo |
| [September 5 maintainer audit](2026-09-05-maintainer-audit.md) | Findings routed as MA IDs; its ordering yields to ROADMAP |
| [August 5 nutrition/workout-library review](2026-08-05-pr3-nutrition-workout-library-review.md) | Preserved historical report from closed PR #91; original status claims describe August 2026, not current behavior or authorized work |
| Other dated acceptance and verification reports | Evidence for the named change at that revision; not a new obligation |

For a new finding, verify it against current source, attach a stable tracker ID and an acceptance
check, and link the report as evidence. Close or defer it in the tracker once; do not maintain parallel
copies of its status across reports.

The August 5 report is preserved byte-for-byte from [PR #91 revision `3275856`](https://github.com/Xon333/NodeVelo/blob/32758565e7c5a9e183f23be9240c4747fa51a9d8/docs/reviews/2026-08-05-pr3-nutrition-workout-library-review.md).
Its Git blob is `fdf7a9c87e1d40fc5d96ab6d8e81caa2cc856519`. Original corrections and disagreements
remain intact. Current nutrition contracts live in [09 · Nutrition](../systems/09-nutrition.md);
current library scope and gates live in [ROADMAP](../../ROADMAP.md).

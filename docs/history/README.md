# History and evidence

These records explain earlier work. They are read on demand, not part of the normal orientation
path. Current behavior is documented in [systems](../COMPASS.md#i-need-to), current decisions in
[DECISIONS](../DECISIONS.md), and execution order in [ROADMAP](../../ROADMAP.md).

| Record | How to use it |
|---|---|
| [Shipments](shipments.md) | Search a stable task ID or PR to find its closeout; append concise outcomes |
| [Reviews](../reviews/README.md) | Dated findings and real-use evidence; check tracker disposition before acting |
| [Specifications](../superpowers/specs/) and [older specs](../specs/) | Original design intent; shipped differences belong in current systems docs and decisions |
| [Execution plans](../superpowers/plans/) | Immutable records of intended steps, not runnable current instructions |
| [Research](research.md) | Historical hypotheses and investigations; recommendations may have shipped or been superseded |
| [UX redesign](ux-redesign.md) | Original redesign and rollout; current UI rules live in DESIGN and UX-CONSTITUTION |

The old `superpowers/` location remains to preserve code pointers and immutable plan links. New
substantial work uses one dated spec/plan only when needed; link it from the owning tracker and
record the final disposition there. Avoid creating a second status document or recursive indexes.

When a spec's implementation is checked, stamp its status and link the merged PR; record partial
shipment explicitly. An unchecked historical spec is evidence of intent, not evidence of shipment.
When correcting an old decision, append a dated superseding note rather than rewriting its rationale.

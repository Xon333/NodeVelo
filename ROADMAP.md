# NodeVelo roadmap

*Updated 2026-09-12 after MA-3 trace isolation and SR-3 local-date repair; existing queue order retained.*

## Follow this queue

**One active implementation task at a time. Start at row 1; skip its explicit external blocker as directed below. Do not choose among reviews.**
This queue owns execution order. [todo.md](todo.md) owns defect details; reviews are dated evidence,
not competing task lists. The [accepted freeze charter](docs/reviews/2026-08-20-nodevelo-adversarial-investment-review.md)
and [decision log](docs/DECISIONS.md) still govern product scope.

| Order | Work | Done when |
|---:|---|---|
| 1 — BLOCKED | **FR-6 comparison.** PR #109 merged the harness and MA-4/5 repairs. External credentials, a valid complete comparison, owner scoring, and category decisions remain outstanding. | One consistent protocol, valid measured costs, owner usefulness review, and keep/switch/retire decisions for each of the three language categories; PR integrated or closed with an explicit disposition. |
| **2 — NEXT** | **Small reliability backlog, one fix at a time:** MA-2/SR-4 request validation → SR-5 backup-test synchronization. | Each finding has a regression/evidence check and is archived on shipment. No combined cleanup PR. |
| 3 | **FR-7**, then **FR-8**, only when their existing entry gates clear. | See package exits below. Do not pre-plan either while earlier work is open. |

SR-1 merged in [PR #116](https://github.com/Xon333/NodeVelo/pull/116); [shipment evidence](docs/history/shipments.md#sr-1--concurrent-publication-rollback-2026-09-08). SR-2 merged in [PR #117](https://github.com/Xon333/NodeVelo/pull/117). FR-6 proceeds only when its missing inputs are available; meanwhile continue the reliability backlog in order.
[Evidence/dispositions](docs/reviews/README.md) · [Defect acceptance](todo.md)

During the freeze, normal riding and FR-9 recording are the only default parallel lane. Newly
demonstrated P1 failures may interrupt; other ideas do not reorder the queue. At task end, record
merged/disproved/blocked status and advance. If FR-6 needs credentials or owner scoring, state the
blocker and continue with the small reliability backlog without marking Phase 3 complete.

## State of the app

Deterministic compilation, publication checks, restore safeguards, the early-closeout correction,
and intent retries are shipped. MA-3 excludes private runtime files from production traces.
PR #113 aligned docs and helpers. PR #109 merged the harness; FR-6 comparison remains unfinished;
primary-checkout residue is reconciled: original files are preserved in a local recovery bundle,
unique reports remain historical reference, and the primary checkout syncs cleanly. [Shipment history](docs/history/shipments.md)

## Which records should I follow?

ROADMAP owns order, todo owns defect acceptance, and reviews provide dated evidence. Old plans,
local research, and handoffs do not activate work. The accepted charter and decisions govern scope.

## Freeze implementation-plan queue

Product packages below retain their gates. The execution queue above handles correctness interruptions
and existing unfinished work first. A package already in progress is continued, not replanned from zero.

### Phase 2 · Make the core journey excellent

FR-3/FR-4 and selected FR-13 are complete; see [ARCHIVE](docs/history/shipments.md#fr-3--fr-4-core-journey-audit-and-selection-2026-09-01).
Remaining P1 reports are targeted repairs, not a reopening of the entire phase.

### Phase 3 · Reduce Claude's generation authority

#### FR-6 · Provider/model/cost experiment — IN PROGRESS

[PR #109](https://github.com/Xon333/Nodevelo/pull/109) owns the harness, fixed corpus, adapters and
[incomplete first experiment](docs/reviews/2026-09-01-fr6-language-provider-experiment.md). Compare only
optional ride-analysis prose, retrospective prose and structured reflections; `/api/generate` stays
deterministic and outside the provider experiment. Exit: independent category decisions based on fixed
inputs, validity, owner usefulness review, latency and measured combined cost of at most `$0.25` for
eleven ride notes plus both retrospective calls. Any production provider change requires separate
justified implementation and live smoke evidence. No provider expansion just to avoid closing the
current comparison.

### Phase 4 · Complete the narrow workout-library loop

#### FR-7 · Manual curated-library completion — BLOCKED until Phase 3 closes

Storage/services/routes exist; the complete curate → reuse → provenance → accepted-use loop does not.
Individual-workout export to Intervals.icu exists through `workout-library-export.ts`; generator reuse
and the complete user workflow remain unfinished. Plan that narrow loop after FR-6 closes. Automatic
promotion and historical bootstrapping remain deferred.

**Integration direction (owner request, 2026-09-07):** consider publishing an accepted block as a reusable
Intervals.icu training plan, alongside individual library workouts. Current publication creates calendar
events. Whole-plan export has no implementation or acceptance contract yet; it does not expand FR-7 or
change the freeze order.

### Phase 5 · Validate nutrition prospectively

#### FR-8 · Nutrition evidence contract and daily carbohydrate slice — BLOCKED until Phase 4 closes

The deterministic model exists. Remaining work is prospective validation and the narrow daily-carb
slice: accepted monthly weight range, separate energy/recovery/adherence/quality evidence, capped
movement, visible reasoning, immediate pause/override and retained RMR floor. No metabolic-truth claims.

### Phase 6 · Run four real block cycles

#### FR-9 · Prospective cycle evidence — EVIDENCE, accumulates throughout the freeze

During normal riding, record completed-block usefulness, trust, edits, retention, adaptations and
incidents in the [evidence log](docs/reviews/2026-08-24-publication-gate-evidence.md). Exit is four clean
real blocks plus the charter's independent-adaptation/refutation criteria. Tests, repaired history and
partial blocks do not count. Current completed-cycle count needs reconciliation from attended records;
this organization task does not infer it from code or stale summaries. Serious integrity failures reset
the clean-cycle count. No implementation plan is needed for routine evidence recording.

### Phase 7 · Consolidate secondary-page UX

#### FR-10 · Task-based secondary-page audit — BLOCKED until Phase 5; may overlap FR-9

Only after Phase 5: observe real secondary-page tasks, then retain/move/remove from evidence.
Do not pre-decide a redesign or page deletion.

### Phase 8 · Activate event work from reality

#### FR-11 · Real A-event minimum slice — BLOCKED until a real A-event exists

A real date, demands and athlete intent must define the minimum taper/scoring/fueling scope.
No event architecture before that trigger.

### Phase 9 · Deliberately schedule recovery and conveniences

#### FR-12 · Off-machine recovery and accepted conveniences — DEFERRED

Only after the earlier sequence or an explicit accepted-risk change. No hosting, accounts,
multi-athlete support, wearables or productization. Existing personal-use risk acceptance remains.

## Stable handles now deferred or evidence-gated

- **#2 · Per-athlete calibration:** No longer the keystone. Add a derivation only after
  discriminating prospective evidence exists.
- **#10 · Conversational refinement:** Frozen until repeated, localized plan-rejection evidence
  exists.
- **Track A · power anchors/references:** Deferred; no current evidence justifies expanding
  calibration depth.
- **Track B · RaceSim cadence:** Deferred until real use demonstrates under-delivery.
- **Track C · fueling:** Phase 5 only; nutrition validation owns its priority.
- **§5 · athlete-state slivers:** Phase 2 only when a measured core-journey problem requires them.
- **#3 · proactive reschedule slivers:** Frozen unless required to repair a demonstrated safety or
  core-journey failure.
- **P8 · AI-route cost guard:** Phase 9 convenience unless actual cost becomes a trust or
  availability problem.
- **P9 · stream `/api/generate`:** Phase 2 only if it removes measured core-journey latency.
- **SUB-2 · legacy backfill importer:** Paused; revisit only if manual relabeling proves painful.
- **§6 · nutrition remainder:** Phase 5 only.
- **§7 · calendar flexibility remainder:** Deferred; Phase 1 fixes integrity at the existing
  boundary only.
- **P3d / P3e / P6:** Deliberately not built; no evidence yet justifies new code.
- **P7 · urgency before app history:** Documented limitation; reopen only if goal-driven blocks
  stop masking it in real use.
- **6a, P1 event text, P4/P5 event-week overstack, event-date validator exclusion:** Dormant until
  a real A-event; the validator exclusion remains an accepted priority-blind limitation.
- **Compound climb+descent matching:** Blocked on a trustworthy gradient data source and design
  review.
- **Segment grading fidelity:** `gradeSegment` (`lib/intent-scoring.ts`) ships binary zone matching
  with per-component full-compliance precision; [adjacent-zone partial credit and middle-half
  precision](docs/superpowers/specs/2026-08-19-segment-aware-intent-scoring-design.md#component-grading)
  remain an implement-or-re-decide boundary via [a decision record](docs/DECISIONS.md).
- **Subjective-wellness follow-ons:** Form retirement needs measured Phase 2 friction; strain
  derivation needs motivation provenance and discriminating evidence.
- **Adaptive self-directed coach — Phase 4:** One-time human-reviewed, provenance-bearing
  historical repair through overlays only; never rewrites the ledger or counts as prospective
  effectiveness evidence.
- **Deterministic interval and intent parsing — redo brainstorming:** Reconstruct the scoping lost
  in corrupted project chats, using the existing parser, scoring designs and known limitations as
  the starting point. Capture the agreed requirements, weaknesses and next implementation scope
  alongside the self-directed work above; this is additional work, not a replacement for the
  existing segment-grading, terrain-matching or historical-repair items.

Mobile density polish remains evidence-gated. Rejected alternatives stay in [ADR-0012](docs/DECISIONS.md#adr-0012--rejected-alternatives-a-running-log).

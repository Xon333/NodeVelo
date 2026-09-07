# NodeVelo roadmap

*Last reconciled 2026-09-07 against integrated `a383f5b`, open PR #109, and the September reviews.*

## Follow this queue

**One active implementation task at a time. Start at row 1; do not choose among reviews.**
This queue owns execution order. [todo.md](todo.md) owns defect details; reviews are dated evidence,
not competing task lists. The [accepted freeze charter](docs/reviews/2026-08-20-nodevelo-adversarial-investment-review.md)
and [decision log](docs/DECISIONS.md) still govern product scope.

| Order | Work | Done when |
|---:|---|---|
| **1 — NOW** | **SR-1: verify and resolve concurrent publication rollback.** Two writers may receive the same remote event IDs; a CAS loser then deletes them. | A deterministic two-writer reproduction either disproves the report with recorded evidence, or a separately reviewed fix preserves the winner's events/history and passes required checks. |
| 2 | **SR-2: verify and restore provider-independent ride finalization.** Deterministic Today processing is still inside `isAnthropicConfigured()`. | A supported ride sync without an Anthropic key produces deterministic Today evidence and ledger enrichment; only optional prose depends on AI. |
| 3 | **Close the local workflow/document cleanup.** Finish current Codex-only policy in an isolated task; preserve unique untracked material, exclude immutable-plan edits, retain rationale (MA-6/7). | Relevant work is integrated or explicitly preserved/deferred; primary changes are deliberately reconciled before sync/pruning. No blanket stash, reset or deletion. |
| 4 | **Finish the existing FR-6 work in PR #109.** Resolve MA-4/5 and adjudicate other review claims once, then complete the bounded comparison. | One consistent protocol, valid measured costs, owner usefulness review, and keep/switch/retire decisions for each of the three language categories; PR integrated or closed with an explicit disposition. |
| 5 | **Small reliability backlog, one fix at a time:** MA-3 tracing → SR-3 local date → MA-2/SR-4 request validation → SR-5 backup-test synchronization. | Each finding has a regression/evidence check and is archived on shipment. No combined cleanup PR. |
| 6 | **FR-7**, then **FR-8**, only when their existing entry gates clear. | See package exits below. Do not pre-plan either while earlier work is open. |

The September 2 review's P1 reports were missing from the September 5 punch-list. Their affected
branches remain in current source; they outrank FR-6. They are queued for targeted reproduction,
not claimed as newly live-verified failures. [Source review](docs/reviews/2026-09-02-code-and-app-state-review.md).

**The only parallel activity is normal riding and FR-9 evidence recording.** It is not a second
implementation task. No new broad audits, provider-expansion research, speculative refactors, or
future-phase planning while the current row remains open. Newly demonstrated P1 failures can interrupt;
other ideas go to todo or the deferred list and do not reorder the queue automatically.

**When a task ends:** merge or record why it was disproved/blocked; update its owning tracker; then
advance one row. If FR-6 needs credentials or owner scoring, record that exact blocker and move to
row 5 without pretending Phase 3 is closed. Keep one pending owner decision, not multiple experiments.

## State of the app

NodeVelo is a working personal cycling decision-support app under a feature freeze. Deterministic
training-block generation, publication validation, restore safeguards, the selected early-closeout
correction, and the MA-1 intent retry fix are shipped. That does not establish coaching effectiveness.
[Shipped records](ARCHIVE.md) are reference material, not work to restart.

Only **PR #109** was open at reconciliation; **#91 is closed**, **#110 is merged**, and the agent-skill
streamlining in **#111 is merged**. Local primary edits remain unshipped and must not be confused with
those commits. Numerous old worktrees are historical checkout residue, not independent obligations.

## Which records should I follow?

| Record | Role / disposition |
|---|---|
| This roadmap | The one ordered work queue. Start here every session. |
| [todo.md](todo.md) | Defect acceptance, verification and completion details; not a second priority system. |
| August 20 adversarial review | Accepted freeze/product decisions. Does not require repeating completed phases. |
| [September 2 code/app review](docs/reviews/2026-09-02-code-and-app-state-review.md) | Dated findings; SR-1–5 and MA-3/8 route its actionable work. Not all recommendations are accepted refactors. |
| [September 5 maintainer audit](docs/reviews/2026-09-05-maintainer-audit.md) | MA-1 shipped; remaining MA findings are routed here. Its old execution order yields to this reconciliation. |
| PR #109 spec, plan and experiment record | The existing FR-6 work to finish; do not create a competing provider plan. |
| Local August 24 AI-cost review | Historical assumptions predate deterministic FR-5; retain as reference, not today's experiment spec. |
| Local September 3 Intervals synergy research | Parked research. No freeze commitment to add fields, parser features or scoring surfaces. |
| Old plans, handoffs and completed-task chats | History. A checklist or stale “next” paragraph does not reactivate shipped work. |

## Freeze implementation-plan queue

Product packages below retain their gates. The execution queue above handles correctness interruptions
and existing unfinished work first. A package already in progress is continued, not replanned from zero.

### Phase 2 · Make the core journey excellent

FR-3/FR-4 and selected FR-13 are complete; see [ARCHIVE](ARCHIVE.md#fr-3--fr-4-core-journey-audit-and-selection-2026-09-01).
Remaining P1 reports are targeted repairs, not a reopening of the entire phase.

### Phase 3 · Reduce Claude's generation authority

#### FR-6 · Provider/model/cost experiment — IN PROGRESS

[PR #109](https://github.com/Xon333/Nodevelo/pull/109) owns the harness, fixed corpus, adapters and
incomplete first experiment. Paused behind rows 1–3 above. Compare only optional ride-analysis prose,
retrospective prose and structured reflections; `/api/generate` stays deterministic and outside the
provider experiment. Exit: category decisions based on fixed inputs, validity, usefulness, latency and
measured combined cost. Any production provider change requires separate justified implementation and
live smoke evidence. No provider expansion just to avoid closing the current comparison.

### Phase 4 · Complete the narrow workout-library loop

#### FR-7 · Manual curated-library completion — BLOCKED until Phase 3 closes

Storage/services/routes exist; the complete curate → reuse → provenance → accepted-use loop does not.
Plan that narrow loop only after FR-6 closes. No automatic promotion or historical bootstrapping.

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

Mobile density polish remains evidence-gated. Rejected alternatives stay in [ADR-0012](docs/DECISIONS.md#adr-0012--rejected-alternatives-a-running-log).

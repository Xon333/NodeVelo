# Features

Available operations and their limits. [Compass](docs/COMPASS.md) maps implementation;
[ROADMAP](ROADMAP.md) orders unfinished work.

| Area | Available now | Boundary |
|---|---|---|
| **Today** | Pre/post-ride view, readiness drivers, session instructions, fueling, illness/fatigue/injury check-in | Readiness is advisory; plan changes need athlete confirmation. Deterministic ride evidence works without Anthropic; coach-note prose is optional. |
| **No active block** | Weekly load envelope and one suggested session | No suggestion when evidence is insufficient; this does not create a block. |
| **Ride review** | Planned-vs-actual score, interval comparisons, power/HR trace, optional Claude note | Past ledger entries retain historical context; today's entry can refresh. |
| **Self-directed rides** | Parse supported labelled notes and grade matching Intervals.icu laps through intent overlays | Unsupported/ambiguous evidence stays ungraded. This is a bounded grammar, not open-ended chat. |
| **Block planning** | 2/4/6/8-week blocks; focus, session selection, progression, durations, canonical workouts, nutrition | Compilation is deterministic. Infeasible inputs fail; publication blockers cannot be overridden. |
| **Calendar** | Publish accepted blocks, move future sessions to rest days, swap sessions, reconcile supported Intervals.icu moves | Inbound moves are conservative. Concurrent-publication rollback is a reported open defect (SR-1). |
| **Season** | Objective/events, rolling focus selection, projected outlook, generator prefill | Outlook is not a commitment. Event-phase shaping is gated; exposure comes from prescribed block history. |
| **Closeout** | Frozen-ledger execution evidence, early-end reason/window, optional narrative/reflections, acknowledgement | Reflections and Markdown notes do not steer compilation. |
| **Trends & Model** | Execution/load/aerobic trends, state drivers, calibration provenance/overrides, standing guidance | Some values are derived; others retain defaults. Intervention tracking does not establish causality. |
| **Nutrition** | Daily energy target, in-ride fuel, loading guidance, weight trends, day-type calibration, derivation display | Intake/weight/burn uncertainty remains. EA is a body-weight proxy; prospective validation is unfinished. |
| **Profile & Knowledge** | Athlete goals, weak points, constraints, local reference notes and retrospective files | Physiology comes from Intervals.icu; editable reference prose is not an execution rule. |
| **Settings & recovery** | AI usage/cost, local export/restore, optional snapshot destination | Single athlete/process, persistent disk, no authentication. Off-machine recovery must be arranged separately. |

## Intervals.icu and the two training modes

| Mode | NodeVelo does | Intervals.icu does |
|---|---|---|
| **Self-directed / no block** | Weekly load envelope, one suggested session, readiness, fueling, execution/intent review | Holds the athlete's chosen training, completed activities, notes, and labelled laps |
| **NodeVelo block** | Compiles and validates sessions; tracks the accepted block and its execution | Receives accepted calendar workouts and supplies the completed ride evidence |

A ride note's label identifies a lap; it does not by itself supply the target. Supported note grammar
provides duration/zone intent. Unknown labels or unsupported targets are not inferred from whole-ride totals.
No-block mode does not automatically adopt an external Intervals.icu plan into NodeVelo's ledger as prescribed work.

## Workout library and future work

| Capability | Status |
|---|---|
| Local workout-library storage, manual-promotion API, individual-workout export to Intervals.icu | Implemented services/routes; not the complete user workflow |
| Curate → reuse compatible prescriptions → retain provenance → track accepted use | **FR-7 planned**, gated by completion of FR-6 |
| Automatic promotion / historical bootstrapping | Deferred |
| Export a whole block as a reusable Intervals.icu training plan | Integration direction raised by the owner; not implemented or an accepted FR-7 exit requirement |
| Nutrition evidence contract and daily-carbohydrate slice | **FR-8 planned**, after FR-7 |
| Four real block cycles; secondary-page UX; real A-event slice | FR-9 evidence / FR-10 and FR-11 gated work |

Intervals.icu already supports [workout libraries and reusable training plans](https://intervals.icu/about.html).
NodeVelo currently publishes calendar events and has individual library-export support; those are different
operations from whole-plan export. [ROADMAP](ROADMAP.md) owns implementation priority.

# Capabilities and limits

Current behavior, grouped by the athlete's task. Implementation details belong to the linked
system documents; execution order belongs to [ROADMAP.md](ROADMAP.md).

## Follow today's training

Today switches between pre-ride guidance and the synced ride debrief. It combines readiness and
supporting evidence, session instructions, morning illness/fatigue/injury flags, and daily fueling.
Without an active block it offers a weekly load envelope and one session suggestion.

The debrief includes execution evidence, interval comparisons, power/HR traces, and optional
Claude commentary. Self-directed ride notes use deterministic parsing of supported labelled
intent; matched Intervals.icu laps provide segment evidence. Ambiguous or unsupported evidence
stays ungraded. This is not a general natural-language coach chat.

**Limit:** deterministic Today finalization still has a provider-configuration dependency (SR-2).
[Daily loop](docs/systems/03-daily-loop.md) · [Scoring and intent](docs/systems/02-scoring-and-learning.md)

## Plan, publish, and adjust a block

Generate 2/4/6/8-week blocks from goals, constraints, current physiology, execution history, and
focus selection. TypeScript assigns sessions, progression, exact weekly duration targets, workout
syntax, and nutrition. The preview exposes blockers, preferences requiring acknowledgement, and
advisories. Publication requires a matching persisted verdict; blockers cannot be overridden.

Accepted plans write to Intervals.icu. Future sessions can move to rest days or swap; supported
calendar moves reconcile during sync. Morning check-ins and missed-session guidance can propose
adjustments. Closing a block records deterministic execution evidence, with optional retrospective
language; early closeout requires a reason and excludes future days.

**Limits:** season outlook is a projection; event-phase shaping remains gated. The curated workout
library has storage and API support, but its complete curate/reuse workflow remains FR-7. A reported
concurrent-publication rollback defect is queued for reproduction (SR-1).
[Season](docs/systems/05-season.md) · [Generation and publication](docs/systems/06-generation.md)

## Understand patterns and learned values

Trends summarizes execution, load, aerobic signals, and logged fueling evidence. Model exposes
state drivers, calibration provenance, overrides, and standing guidance. Past ledger rows retain
historical context; today's row can still refresh. Intent overlays preserve the underlying ledger.

**Limits:** learned parameters require sufficient evidence; others retain defaults or manual
overrides. Observed associations and internal intervention checks are not proof of coaching benefit.
[Scoring and learning](docs/systems/02-scoring-and-learning.md)

## Fuel training

Daily targets combine resting needs, activity burn, and a goal-directed buffer. The UI exposes
inputs and provenance, logged-intake signals, weight trends, in-ride fuel, and loading guidance.
Day-type calibration and guardrails operate deterministically.

**Limits:** self-logged intake and sparse weight data constrain accuracy. The energy-availability
signal is a body-weight proxy, not a clinical assessment. Prospective nutrition validation remains
FR-8. [Nutrition model and uncertainties](docs/systems/09-nutrition.md)

## Own the inputs and history

Profile owns goals and weak points; Intervals.icu supplies physiology, rides, wellness, and power
history. Knowledge provides editable local reference notes and block retrospectives. Settings
exposes backup export/restore and AI usage. Markdown reference notes and retrospective reflections
do not steer the deterministic compiler.

**Limits:** this is a local, single-athlete app with no authentication or hosted service. Optional
AI text is remote processing. Off-machine recovery is deferred work, not an automatic guarantee of
local backups. [Data and sync](docs/systems/01-sync-and-data.md) · [Knowledge](docs/systems/04-knowledge.md)

## Direction

The aim is a useful, explainable training loop that earns trust through repeated real use.
The current freeze prioritizes correctness, finishing existing work, and prospective evidence over
new surfaces or broader AI authority. [ROADMAP.md](ROADMAP.md) owns the sequence and entry gates.

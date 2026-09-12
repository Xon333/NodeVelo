# NodeVelo

A personal cycling coach built on [Intervals.icu](https://intervals.icu).

Intervals.icu holds the rides, physiology, and calendar. NodeVelo adds the coaching logic:
evaluate how a session was executed, track patterns across rides, choose the next training focus,
and compile a structured block that the athlete can review and publish back to the calendar.
It also handles the day between plans: readiness, session adjustments, and fueling.

The project is built for one athlete and runs locally. The question behind it is whether a system
that remembers training execution and the athlete's intent can make the next decision more useful.
That is the purpose of the learning loop; its effectiveness is still being tested through real use.

## The coaching model

**Execution has context.** A prescribed ride is evaluated against its session targets. A
self-directed ride can instead be evaluated against supported, labelled intent in the athlete's
notes, using Intervals.icu laps as evidence. An unmatched segment stays ungraded. Past ledger
entries retain the FTP and scoring context used at the time; a later FTP change does not rewrite them.

**Learning is explicit.** Recency-weighted execution by workout type, trends, and the power profile
inform focus and durability selection. Selected calibration values can be derived from the athlete's
data when evidence clears their gates; others remain defaults or manual overrides. The Model page
shows these distinctions. Markdown notes and retrospective reflections remain reference/history.

**Training decisions are code.** TypeScript chooses the block's sessions, progression, durations,
workout syntax, and nutrition. Validators classify publication blockers, preferences, and advisories.
Claude supplies optional ride commentary and retrospective language. The generated plan is not an
LLM response checked after the fact.

**The athlete owns intent; Intervals.icu owns physiology.** Goals, weak points, availability, and
weight goals are explicit inputs. FTP, zones, rides, and wellness come from sync. Plans reach the
calendar only after acceptance; completed blocks leave execution evidence for subsequent decisions.

## Two ways to train

**Self-directed, without a NodeVelo block.** Keep choosing your rides in Intervals.icu. NodeVelo
uses synced load and execution to show a weekly load envelope, one session suggestion, readiness,
and fueling. After the ride, supported labelled notes and Intervals.icu laps let it evaluate what
you intended. It does not need to own a block to be useful, and it does not import an arbitrary
Intervals.icu plan as a NodeVelo prescription.

**With a training block.** Generate 2/4/6/8 weeks from goals, available time, and current training
state. Inspect the sessions and publication findings, accept the block onto Intervals.icu, then
move or swap future sessions as needed. Closeout records execution evidence for reviewing the block.

**Nutrition applies to both.** Daily targets combine estimated maintenance, synced exercise burn,
and a weight-goal buffer. Maintenance calibration distinguishes rest and training days. The app shows
how the target was derived, alongside in-ride fuel and loading guidance. Logged intake and weight
quality limit what it can infer. [Feature details](FEATURES.md) · [Nutrition model](docs/systems/09-nutrition.md)

## Direction

The next feature work is to complete manual workout curation and reuse, building on the existing
local library and individual-workout export to Intervals.icu. Completing the library loop is
**planned**, not shipped. Reusable whole-block export to Intervals.icu's training-plan feature is a
separate integration direction, not the current calendar publisher.

Correctness repairs come first, followed by the existing language-cost comparison, library completion,
and prospective nutrition/block evidence. [ROADMAP](ROADMAP.md) defines the order and gates.

## Run locally

Node.js 22 and npm; an Intervals.icu account with API access.

```bash
git clone https://github.com/Xon333/Nodevelo.git
cd Nodevelo
npm ci
cp .env.local.example .env.local
# Set credentials in .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000), configure the athlete profile and training availability,
and sync before generating a block.

| Setting | Source / use |
|---|---|
| `INTERVALS_API_KEY` | Intervals.icu → Settings → Developer |
| `INTERVALS_ATHLETE_ID` | Athlete ID, e.g. `i12345` |
| `ANTHROPIC_API_KEY` | Optional ride commentary and retrospective language |
| `NODEVELO_BACKUP_DIR` | Optional automatic snapshot destination |

Today ride evidence, block generation, and deterministic closeout work without Anthropic configuration.

State is JSON in `data/` and Markdown in `knowledge-base/`, both gitignored. Optional language calls
send ride/block context to Anthropic and incur API costs. The server binds to localhost, has no
authentication, and requires persistent disk. [Data flow](docs/systems/01-sync-and-data.md) ·
[AI call inventory](docs/systems/07-ai-layer.md)

## Development

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · Vitest.

[Compass](docs/COMPASS.md) maps the architecture and code. [Workflow](WORKFLOW.md) covers task
worktrees and verification; [AGENTS.md](AGENTS.md) contains agent rules. Current work is a reliability
and validation freeze, ordered in [ROADMAP.md](ROADMAP.md).

# NodeVelo

**A personal cycling training companion built around how you actually ride.**

NodeVelo turns your [Intervals.icu](https://intervals.icu) history, training goals, and available
time into daily guidance and structured training blocks. Review the plan, publish it to your
Intervals.icu calendar, ride, and use the execution evidence to inform the next block.

Built for one athlete running it locally. The project is in active personal use under a
**feature freeze focused on reliability and real-world validation**. Coaching effectiveness and
nutrition accuracy are still being evaluated; a passing test suite does not establish either.

## What makes it different

- **Training decisions you can inspect.** TypeScript owns scoring, readiness, nutrition,
  focus selection, workout composition, and publication checks. Claude adds optional ride notes
  and retrospective language; it does not generate the training plan.
- **History with provenance.** Past execution scores retain the physiology and scoring context
  used at the time. Athlete-stated intent is evaluated separately, so a self-directed ride need
  not be judged as a failed prescribed session. Missing evidence stays unscored.
- **A continuing training loop.** Daily guidance, block planning, execution review, and the
  athlete model share data. Goals belong to the athlete; physiology comes from Intervals.icu.
- **Data you can own.** JSON and Markdown on your machine, with export/restore support.
  Intervals.icu remains the training-data source and calendar destination.

## In the app

| Surface | What you use it for |
|---|---|
| **Today** | Readiness, the planned session or no-block suggestion, ride debrief, and fueling targets |
| **Plan** | Season goals and events; preview, publish, move, swap, and close training blocks |
| **Trends & Model** | Execution trends, training signals, learned values, and their evidence |
| **Profile, Settings & Knowledge** | Athlete intent, training constraints, backups, AI usage, and editable reference notes |

[Capabilities and current limits](FEATURES.md) · [Architecture and code navigation](docs/COMPASS.md) · [Development priorities](ROADMAP.md)

## Run locally

Use Node.js 22 LTS and npm. You need an Intervals.icu account and API credentials.

```bash
git clone https://github.com/Xon333/Nodevelo.git
cd Nodevelo
npm ci
cp .env.local.example .env.local
# Fill in your credentials, then:
npm run dev
```

Open [localhost:3000](http://localhost:3000). Configure your profile and training availability,
then sync Intervals.icu before generating a block.

| Variable | Purpose |
|---|---|
| `INTERVALS_API_KEY` | Intervals.icu API key from Settings → Developer |
| `INTERVALS_ATHLETE_ID` | Athlete ID, such as `i12345` |
| `ANTHROPIC_API_KEY` | Optional language features; see the current limitation below |
| `NODEVELO_BACKUP_DIR` | Optional automatic snapshot destination; see [.env.local.example](.env.local.example) |

**Current limitation:** block generation and deterministic closeout work without Anthropic, but
part of Today ride finalization is still incorrectly gated on its configuration. This is tracked
as **SR-2** in [the defect list](todo.md); the complete daily loop is not yet provider-independent.

## Data and deployment

Runtime state lives in gitignored `data/` and `knowledge-base/`; committed defaults support a fresh
clone. Optional language requests send ride or block context to Anthropic and incur API costs.
Sync contacts Intervals.icu; publishing and calendar changes write back there. See
[the AI boundary](docs/systems/07-ai-layer.md) for the call inventory.

The server binds to localhost and has no authentication. Run it on a machine with persistent disk;
public hosting and ephemeral serverless storage are outside the supported setup.

## Develop

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and Vitest.
Start with [the Compass](docs/COMPASS.md), select the relevant subsystem, and follow
[WORKFLOW.md](WORKFLOW.md) for an isolated task and required checks. Agents read [AGENTS.md](AGENTS.md).
The [roadmap](ROADMAP.md) owns work order; historical reviews are evidence, not additional queues.

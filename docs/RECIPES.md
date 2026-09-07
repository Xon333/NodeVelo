# Recipes — exactly how to make common changes

One recipe per change type: the files, the order, the trap. (Distinct from root [../WORKFLOW.md](../WORKFLOW.md), which is the daily *commands* cheat sheet.) Verify everything with `npm run check` (tsc + lint + vitest).

## Add a page

1. `app/<name>/page.tsx` — thin server shell (copy `/model`'s pattern; add `dynamic = "force-dynamic"` only if it reads stores server-side like Profile/Settings).
2. Client component in `components/` (PascalCase = single component; lowercase = named-export module — [convention](systems/08-frontend.md#naming-convention-bimodal-deliberate)).
3. Register in `components/Nav.tsx`'s `LINKS` (pick a tier; update keyboard digits).
4. Data: join `SyncProvider` if it needs sync state; otherwise the `useMountLoad` idiom or `useQuery` with a shared key.
5. Layout must satisfy [DESIGN.md](../DESIGN.md) §8 + [UX-CONSTITUTION](../UX-CONSTITUTION.md) §11's pre-ship checklist. Add the page to FEATURES.md.

## Add an API route

1. `app/api/<name>/route.ts`. Logic goes in a `lib/` module (pure where possible); the route stays an IO shell — see `ride-analysis.ts` as the model extraction.
2. Persistence through `data-store.ts` accessors (add one if the store is new; decide `.bak`-CRITICAL or derived).
3. Mutating a block? Adopt the CAS guard (`block-version.blockChangedResponse`).
4. CSRF is already applied by `proxy.ts` — don't add your own.
5. Errors: `{ error: string }` + `lib/log.ts` in the catch. Client side: `lib/client-api.api<T>()`.
6. Add the route to [FILE_INDEX.md](FILE_INDEX.md).

## Change generation behavior (prompt, rules, output shape)

Read [systems/06-generation.md](systems/06-generation.md) first.
- **Workout syntax/shape** → `lib/prescription.ts`; preserve typed render/parse semantic equality and legacy stored-plan parsing.
- **Protocol recipes/progression** → `lib/workout-templates.ts`; keep output inside `workout-validate.PROTOCOL` and test through `buildTemplateDay`.
- **Block composition** → `lib/block-compiler.ts`; preserve every date, exact nominal duration, freshness ordering, and one publication-gate call.
- **Volume/week logic** → `lib/block-skeleton.ts` (keep the feasibility gate and `validateWeekHours` in agreement).
- **Which day gets which slot/duration/ceiling** → `lib/block-skeleton.ts`'s `computeBlockSkeleton`. The exact-sum and ordered-envelope invariants are property-swept in `block-skeleton.test.ts`.
- Finish with route/compiler tests and a deterministic repeated-input comparison. No Anthropic smoke run applies unless an optional language path changed.

## Turn over a block (end → retrospective → next block)

| Step | Action / evidence |
|---|---|
| Before closeout | Export a backup; sync final rides |
| Close on Plan | Finished block closes normally; early end requires a reason and excludes future days |
| Check history | New block-history entry contains closeout evidence and the lived window |
| Acknowledge | Records review; seeds/reflections remain history, not compiler inputs |
| Next block | Generate → preview → accept; confirm current block and Today session |
| Language verification | For an unverified/changed AI path, run a live retrospective and inspect output; separately verify deterministic fallback |

Zero qualifying interventions is valid. If a step fails, stop and inspect persisted state before
using the exact restore path; do not automatically erase newer data. Closeout persistence contracts:
[Knowledge](systems/04-knowledge.md), [Invariants](INVARIANTS.md#block-closeout--acknowledgement).

## Add or change a validator

| Concern | Owner |
|---|---|
| Placement | `schedule-validate.ts` |
| Workout protocol | `workout-validate.ts` |
| Blocker/preference/advisory classification | `publication-gate.evaluatePublicationGate` |

Emit each fact once, classify by emitter, and never rewrite compiler output. Wire the validator into
the gate and verify its publication behavior ([contracts](INVARIANTS.md#generation-contracts)).

## Change scoring

Read [systems/02-scoring-and-learning.md](systems/02-scoring-and-learning.md). Scorer signals → `execution-score.ts`; ledger fields → `score-log.ts` + idempotent backfill in `sync-ledger.ts`. Never retro-score frozen entries. Fixture trap: avoid .x5 float boundaries.

## Add a readiness/state signal

`readiness.ts` (compute) → `athlete-state.athleteStateInputsFrom` (fuse; weights via calibration) → `coach-snapshot.resolveCoachSignals` (surface) → UI via `AthleteStateCard`/`StateDriversCard` (shared band styling in `athlete-state-ui.tsx`). Spec with tunable knobs: [specs/athlete-state.md](specs/athlete-state.md).

## Change physiology / zones

`lib/physiology.ts` is the FTP/zones source of truth (effective-dated; synced from Intervals.icu sport settings). Zones math in `zones.ts`. Never read FTP from `athlete.json` directly for scoring — use `physiologyAsOf` for historical rides.

## Add a calibratable parameter

`calibration.ts`: a `derive*` using `correlation.ts`'s guarded derivers, exposed through `trustedCalibration`, default in the same file, manual-override path via Settings (`block-settings.json`) or `/api/calibration`. Keep the discrimination guard — no calibrating to habit.

## Debug a bad generation

[systems/07-ai-layer.md#debugging-a-bad-generation](systems/07-ai-layer.md#debugging-a-bad-generation). Short version: check the publication-gate buckets → inspect `GeneratedPlan.raw` and days → reproduce the compiler input. Identical inputs are deterministic; there is no prompt, model, or dedupe window.

## Debug a sync

Flow map: [systems/01-sync-and-data.md](systems/01-sync-and-data.md). Iterate on today's ride with `npm run reset:today` + re-sync (this re-runs the deterministic pipeline; `reAnalyse()` in the UI forces a fresh coach note). Suspect-empty guard and inbound-move warnings surface in the sync response. Store corruption: check `<file>.bak` and the `corruptFallback` path in `json-store.ts`.

## Trace an API call end-to-end

Client: grep `api('/api/<name>` in `components/` (fetch wrapper is `lib/client-api.ts`). Route: `app/api/<name>/route.ts` → its lib modules ([FILE_INDEX](FILE_INDEX.md) lists both directions). State updates come back via React Query invalidation of `['sync']` — see [systems/08-frontend.md](systems/08-frontend.md).

## Add tests

Engine logic: colocated `lib/<name>.test.ts` (vitest, node env). Components: colocated `.test.tsx` with `/** @vitest-environment jsdom */` docblock (Testing Library — infra since 2026-07-23). Point stores at scratch via `NODEVELO_DATA_DIR`. If existing infra can't exercise the real behavior of a fix, ask the owner (extract-pure-logic vs add infra) rather than silently picking.

## Ship a docs change

Follow [documentation ownership](COMPASS.md#documentation-ownership) and the `docs-sweep` skill. Record shipped work in [shipment history](history/shipments.md); update the Compass when navigation changes. Verify links and preserve historical pointers.

## Add a workout type

1. `lib/types.ts` — extend the `WorkoutType` union (widest blast radius in the repo; `npm run check` will surface every switch that needs a case).
2. `lib/workout-types.ts` — add its `TYPE_STYLES` entry (badge/cell/accent classes; literal Tailwind strings).
3. `lib/workout-templates.ts` — add the deterministic recipe and progression stages; if it is a quality type, keep it inside `lib/workout-validate.ts`'s `PROTOCOL` band ([INVARIANTS #17](INVARIANTS.md)).
4. Check the type-sensitive engines: `block-compiler.ts` (selection/freshness), `execution-score.ts` (grading), `schedule-validate.ts` (sequencing), `ride-classify.ts` (off-plan inference), and `session-requirements.ts` (goal requirements).
5. Run catalogue/compiler/route tests, compare a repeated deterministic generation, and verify the new type renders on Plan/Today with its styles.

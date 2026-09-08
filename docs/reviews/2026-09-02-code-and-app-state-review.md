# NodeVelo code and app state review

**Review date:** 2026-09-02  
**Pinned integrated snapshot:** `f533748` (`main`)  
**Additional target:** the pre-existing uncommitted working-tree changes present at review start

## Review prompt executed

> Act as a skeptical staff-level engineer, product auditor, and cycling-domain systems reviewer for NodeVelo. Review the app exactly as it exists in the repository at pinned `main` commit `f533748`, then separately review the pre-existing uncommitted working-tree diff so work-in-progress regressions are not confused with integrated defects. Treat source code, tests, git history, `docs/COMPASS.md`, `docs/INVARIANTS.md`, `docs/GLOSSARY.md`, `docs/DECISIONS.md`, and the relevant numbered system documents as primary evidence. Because this repository uses a breaking-change Next.js version, consult its bundled `node_modules/next/dist/docs/` guidance before judging Next.js code.
>
> Be defect-first and evidence-led. Trace real call paths and inspect surrounding code, tests, persisted-data shapes, failure handling, and user-visible consequences. For every actionable defect, assign P0–P3, cite the smallest exact file/line range, show the affected scenario or reproduction path, explain why current tests do not prevent it, and recommend the smallest safe direction rather than implementing a fix. Continue through the entire target after finding the first issue. Do not report style nits, speculative concerns, intentional trade-offs, or claims that cannot be demonstrated.
>
> Explicitly test the repository’s recurring failure classes: migration flags must tolerate missing JSON fields; user-facing “today” must be local; changed LLM paths require live evidence; and documentation/comment anchors must still resolve. Also test the hard contracts in `docs/INVARIANTS.md`, especially persistence and compare-and-swap semantics, generation-versus-publication authority, publication-gate provenance, overlay applicability, data-unit consistency, model/pricing synchronization, central CSRF handling, and prescribed-versus-self-directed scoring.
>
> Assess the state of the whole app, not only defects: what is demonstrably shipped, which workflows are healthy or incomplete, data and AI risk, test/build/lint health, security/privacy posture, operational readiness, documentation truthfulness, and the highest-value next work. Separate verified facts, code-based inferences, and items requiring live credentials or browser/device validation. Check recent history and hot spots for architectural friction. Use the deep-module vocabulary exactly—module, interface, implementation, seam, adapter, depth, leverage, locality—and apply the deletion test. Recommend only refactors with demonstrated leverage, locality, and improved tests; call out relevant decision-log constraints.
>
> Run the strongest safe verification available without modifying application state. Record every command and its actual result. Finish with: (1) findings ordered by severity, (2) an evidence-based app-state scorecard, (3) architectural deepening candidates with recommendation strength, (4) test and evidence gaps, and (5) a sequenced action plan. Make uncertainty explicit and never equate green deterministic tests with proof that live third-party or LLM-backed workflows work.

<!-- Research evidence and the completed review are added below after inspection. -->

## Primary-source state evidence

This inventory is pinned to integrated `main` commit `f53374886f2e19df769a9173e40134be9650b771`; the separate working-tree review below must not treat uncommitted changes as shipped state.

### Product boundary, runtime, and topology

- NodeVelo is deliberately a local-first, single-athlete decision-support layer over Intervals.icu: Intervals owns physiology and calendar truth, while JSON under `data/` and Markdown under `knowledge-base/` are the local database (`README.md:3-10`, `README.md:20-36`; `docs/DECISIONS.md:5-11`). The roadmap explicitly says the app is under a feature freeze, is not yet a proven self-correcting coach, and is not being productized (`ROADMAP.md:23-33`).
- The locked dependency graph is Next.js 16.2.9, React/React DOM 19.2.4, Anthropic SDK 0.104.1, TanStack React Query 5.101.0, Zod 4.4.3, TypeScript 5.x, and Vitest 4.1.8 (`package.json:24-44`; exact Next/React versions in `package-lock.json:6138-6156` and `package-lock.json:6662-6681`). Next 16 requires Node >=20.9.0 (`package-lock.json:6154-6156`).
- The tracked tree at `f533748` contains seven user pages plus the root redirect, 24 `app/api/**/route.ts` handlers, 90 non-test `lib/*.ts` modules, and 122 tracked test files. The root redirects to `/today` (`app/page.tsx:1-5`); the shared layout installs navigation, sync/query providers, a skip link, and the main content boundary (`app/layout.tsx:35-90`).
- The repository follows the current Next.js 16 Proxy convention correctly: the bundled official guide says Middleware was renamed Proxy and requires one root-level `proxy.ts` (`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md:13-37`), while NodeVelo's proxy applies the same-origin write guard to all `/api/:path*` requests (`proxy.ts:1-27`). This is a CSRF boundary, not authentication; the app remains intentionally localhost-bound and warns that LAN mode exposes data-mutating and billed routes to the trusted network (`README.md:77-84`).

### Demonstrably shipped workflows

- The core generation path is now deterministic. `/api/generate` assembles athlete, physiology, season, loading, and nutrition inputs, calls `compileTrainingBlock`, then claims and persists the hash-bound publication passport before returning the preview (`app/api/generate/route.ts:67-76`, `app/api/generate/route.ts:147-213`). `/api/write` matches that persisted verdict, refuses unknown plans and blockers, requires explicit acknowledgement for preferences before any mutation, and rolls back partial Intervals.icu writes (`app/api/write/route.ts:64-125`, `app/api/write/route.ts:148-201`). The decision record defines this proposal/commit seam (`docs/DECISIONS.md:27-33`) and FR-5's attended record reports five stable Anthropic-unset generations plus a clean owner-approved publication (`ARCHIVE.md:40-57`).
- Sync and optional coach prose are separated at the network-call seam: `/api/analyze` is the deferred Anthropic route (`app/api/analyze/route.ts:1-27`), and the only current SDK calls are ride analysis plus prose/structured retrospectives (`lib/anthropic-api.ts:76-87`, `lib/anthropic-api.ts:97-129`). Deterministic intent parsing and block compilation do not call Anthropic (`docs/DECISIONS.md:15-23`; `docs/GLOSSARY.md:61-62`).
- Calendar rescheduling is local-first and best-effort remotely. `persistMirroredMove` commits the touched days under the current-block lock before calling Intervals.icu, returns CAS conflicts without mirroring, and never rolls back the local move on a mirror failure (`lib/calendar-mirror.ts:188-252`). This matches hard invariants 7-9 (`docs/INVARIANTS.md:14-18`).
- Persistence is not a casual file-write layer: the declared contracts require atomic writes, `.bak` rotation for critical stores, per-file locks, corruption-aware recovery, append-only frozen ledger history, and truthy migration guards (`docs/INVARIANTS.md:5-12`). The recent restore-hardening shipment added staged whole-tree replacement and atomic knowledge-base writes (`ARCHIVE.md:121-127`; commit `1571dd8f252a0301b55ffdee379f6677f21be626`).
- Recent integrated history shows concentrated trust-boundary work rather than feature expansion: publication gate `742cef1b457f98f6a91f714b42cb864a18426769`, physiology freshness `a3ea2639ab0987083fb65825b90ddba1288260b3`, AI/claims cleanup `11f8ef9220630ff7031e9445b734b5e614203e60`, deterministic-authority closeout `fc3c874e34701857c1e412603a95a1f751a6cf75`/`9d1248ba0cf963b6bae641c70ed3e57ebfc791e5`, and the early-closeout retrospective window `f53374886f2e19df769a9173e40134be9650b771`.

### Open work and evidence posture

- The next executable package is FR-6, a fixed-input provider/model/cost experiment (`ROADMAP.md:48-65`). FR-7's complete curated workout-library loop is blocked on Phase 3 (`ROADMAP.md:67-84`); FR-8 prospective nutrition validation is blocked on Phase 4 (`ROADMAP.md:86-106`); FR-10's secondary-page task audit is blocked until Phase 5 (`ROADMAP.md:128-144`); real-event work remains dormant until a real A-event (`ROADMAP.md:146-162`); off-machine recovery and conveniences are deferred (`ROADMAP.md:164-180`).
- FR-9 is explicitly an attended evidence program, not an implementation task. Four clean real block cycles with usefulness, trust, edits, independent adaptations, and at least one honest refutation remain outstanding; tests and repaired history do not count (`ROADMAP.md:108-126`). This is the main reason shipped mechanics cannot yet support effectiveness claims.
- The live punch-list still calls for real-device/workflow checks of cross-tab CAS handling, keyboard shortcuts, the unconfigured-Intervals branch, Enter-to-submit forms, nutrition hints/bounds, and the no-block Today layout (`todo.md:29-54`). These are materially different from deterministic unit coverage and need browser/device or live-data evidence.

### Verification surface and documentation truthfulness

- The declared gate is broad: TypeScript, zero-warning ESLint, Vitest, agent-workflow shell tests, sync shell tests, and Markdown link checking (`package.json:5-22`). The research pass ran the working-tree Vitest suite: 118/118 files and 2,511/2,511 tests passed in 4.63 seconds; four tracked shell-test scripts bring the broader test-artifact count to 122. This is not the full `npm run check`, and neither deterministic coverage nor a green static gate can prove Intervals.icu or Anthropic behavior. `npm run check-links` separately reported `150 markdown files, no broken links`.
- Repository-size documentation has drifted: `README.md:53-54` says 83 engine modules and 22 API routes, and `app/README.md:5-6` repeats 22 routes, while the tracked `f533748` tree contains 90 production `lib` modules and 24 route handlers (`git ls-files 'lib/*.ts' | rg -v '\.test\.ts$'`; `git ls-files 'app/api/**/route.ts'`). The seven-page claim remains accurate.
- The root metadata still describes NodeVelo as an "AI-powered training block generator" (`app/layout.tsx:30-33`), but FR-5 removed AI from generation and retained Claude only for optional ride-analysis and retrospective language (`docs/DECISIONS.md:21-23`; `ARCHIVE.md:40-57`). This is user-facing semantic drift, not merely a stale module count.
- ADR-0005 says `/api/sync` computes and persists all deterministic Today analysis even when Claude is unavailable, leaving only the coach note absent (`docs/DECISIONS.md:51-57`). Current code wraps the detailed Today-analysis construction and persistence in `if (isAnthropicConfigured())` (`app/api/sync/route.ts:841-846`, `app/api/sync/route.ts:950-980`), so an unconfigured Anthropic key suppresses deterministic per-ride analysis too. The stale handoff already recorded this as a possible loosening (`CONTINUE.md:70-77`); the canonical docs do not disclose the limitation.
- FR-6's roadmap scope still names `app/api/generate/route.ts` as a possible provider/model experiment surface (`ROADMAP.md:54-64`), although that route has no Anthropic import or call and delegates to the deterministic compiler (`app/api/generate/route.ts:1-34`, `app/api/generate/route.ts:147-183`). FR-6 therefore needs scope clarification before planning, lest it reopen the settled FR-5 authority boundary.
- `todo.md` HR-66 says `docs/reviews/2026-08-05-pr3-nutrition-workout-library-review.md` remains an untracked file (`todo.md:20-22`), but at review time it is neither present nor tracked. HR-69 is genuinely current: `CONTINUE.md:7` still points to post-P4 "second brain" work despite the much later FR-5/FR-13 state (`todo.md:23-25`).

## Findings

There are no P0 findings. Because `origin/main...HEAD` is empty, the first eight findings are defects or risks in the integrated app state, not regressions introduced by an unpublished branch. The final two findings apply specifically to the pre-existing working-tree diff.

### [P1] Run deterministic ride finalization without an Anthropic key — `app/api/sync/route.ts:841`

The entire detailed Today ride-finalization path is inside `if (isAnthropicConfigured())`, even though the work at lines 949-1056 is explicitly deterministic and makes no LLM call. With no `ANTHROPIC_API_KEY`, a successful sync skips zone re-bucketing, interval comparison, power trace and PR calculation, `buildTodayAnalysis`, `writeTodayAnalysis`, the fuel prompt, and the richer interval-aware score-ledger patch. The app still produces a coarse score earlier in sync, which makes this a silent capability loss rather than an obvious failure. It also leaves `analysisPending` false, so the client receives no signal that Today analysis is missing.

This contradicts ADR-0005 (`docs/DECISIONS.md:51-57`), the architecture narrative (`docs/systems/01-sync-and-data.md:45-51`), and the advertised optional-AI boundary. Tests that exercise this section explicitly mock `isAnthropicConfigured()` as true; they do not assert that deterministic analysis survives the unconfigured case. Make deterministic ride finalization unconditional and keep the provider check only at `/api/analyze`, which already owns the optional coach-note call. Add a route test with Anthropic unconfigured that asserts `today-analysis.json` and the detailed ledger patch are still produced.

### [P1] Do not delete the winning plan's shared calendar events after a CAS loss — `app/api/write/route.ts:310`

Two tabs can begin publishing from the same `expectedBlockCreatedAt`. Each request sequentially upserts the same stable `external_id` (`nodevelo-<date>` in `lib/plan-parser.ts:23-27`), and Intervals.icu returns the same numeric event ID for repeated upserts (`lib/intervals-api.ts:532-549`). One request wins the local current-block compare-and-swap. The losing request then treats every successful upsert as newly created and deletes all returned IDs at lines 312-313. Those IDs are the same real events referenced by the winning plan, so the local block can end up pointing at an empty Intervals.icu calendar. The loser can also archive the old block before discovering the CAS loss because archival occurs at lines 203-228.

The existing HR-35 test (`app/api/write/route.test.ts:223-244`) mocks unique IDs and explicitly expects blind deletion, so it codifies the unsafe model and never represents stable-ID upsert semantics. Prefer an exclusive publication claim before remote mutation. If the remote writes must precede the local commit, a rejected request must reconcile to the actual winning block and restore shared dates rather than deleting them. Add a two-writer test where both calls receive identical IDs for overlapping dates and prove the winner's remote events remain intact.

### [P2] Preserve the athlete's local date when refreshing after a morning-plan change — `components/MorningCheckIn.tsx:133`

The PUT immediately above correctly sends `today: localToday()`, but the follow-up GET calls `/api/sync` without `?today=...`. The sync GET falls back to its server-side date resolution and uses that date for load ramp, ACWR, polarization, athlete state, block summary, nutrition, and Today outcome. Around a local/UTC day boundary, applying a downgrade can therefore refresh the calendar and status cards for a different date from the one just changed. This is the repository's documented recurring “Today must be local” defect class. Pass the same local date into the sync query (ideally through one shared client helper) and add a component test with local and UTC dates on opposite sides of midnight.

### [P2] Reject primitive retrospective request bodies instead of returning 500 — `app/api/retrospective/route.ts:61`

The handler casts any parsed JSON value to `Record<string, unknown>`. A valid JSON primitive such as `42` reaches `"expectedBlockCreatedAt" in b` at line 79 and throws a `TypeError`. A live local request reproduced HTTP 500 for `POST /api/retrospective` with body `42`; malformed JSON and `null` are covered, but numeric and string bodies are not. This violates the route contract in `app/README.md`, which says unknown bodies are narrowed and client errors return 400. Require a non-null, non-array object before property access and add primitive-body route cases.

### [P2] Constrain the history route's output-file trace — `lib/kb-loader.ts:197`

`npm run build` succeeds but Next.js warns that an unexpected file caused the whole project to be traced through `next.config.ts → lib/kb-loader.ts → app/api/history/route.ts`. The generated `.next/server/app/api/history/route.js.nft.json` contains 602 files, including 33 `data/` entries, six `knowledge-base/` entries, and 122 test files. In the current non-standalone local build these are trace references, not copied secrets, but Next's output-file tracing is the basis for production deployment packaging; enabling standalone or another traced deployment could copy athlete data and retrospective material along with avoidable test files.

The bundled Next 16 documentation (`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md:8-25`) confirms that traced files determine deployment contents and that include/exclude controls are available. Scope the dynamic filesystem boundary, add explicit `outputFileTracingExcludes` where appropriate, and add a build assertion that no personal-data or test paths enter route manifests. This is privacy and build-hygiene work even while localhost-only operation remains the product boundary.

### [P2] Make the backup concurrency tests wait on a condition, not scheduler luck — `lib/backup.test.ts:85`

The first full Vitest run failed two restore/write-concurrency tests because `waitForCondition` exhausted 50 zero-delay timer turns before the mocked rename was reached. The same file then passed 20/20 in isolation, and a second full run passed all 118 files and 2,511 tests. That pattern demonstrates suite-load sensitivity rather than a stable product failure. A flaky recovery test weakens the signal around one of the app's highest-risk subsystems and can make a real regression indistinguishable from scheduler noise. Replace the fixed `setTimeout(0)` polling budget with an explicit synchronization primitive exposed by the fake filesystem, or a bounded wall-clock wait with useful diagnostics.

### [P2] Finish consolidating the Plan page's season interface — `components/SeasonSection.tsx:25`

`PlanView` owns a React Query request for `/api/season?today=...` (`components/dashboard/PlanView.tsx:128-137`) and passes that result into the now-presentational `SeasonRoadmap`, but it also renders `SeasonSection` at lines 476-478. `SeasonSection` independently fetches `/api/season` on mount and fetches it again after every save. Each GET computes both the plan and outlook even though the form discards the outlook. The nearby comments say the page's previous three-request behavior was confirmed live and consolidated; this remaining second interface means the stated result is not fully achieved.

Pass the plan and a save/update interface from `PlanView`, or have the form participate in the same query cache and invalidate the one key after saving. A Plan integration test should render the real form and assert one initial season request; the current `PlanView` tests mock `SeasonSection`, which hides the duplication.

### [P2] Reconcile semantic documentation state, not only link integrity — `docs/superpowers/specs/2026-08-19-segment-aware-intent-scoring-design.md:3`

The segment-aware scoring design still says “not yet implemented,” although the implementation is shipped, has tests, and is encoded in invariant 58. Two later accepted designs similarly read like pre-implementation records despite landed work. `ROADMAP.md:54-64` still includes deterministic `/api/generate` in FR-6's provider experiment surface, which risks reopening the settled FR-5 authority boundary. `todo.md:20-22` points to a review file that does not exist, `CONTINUE.md` describes an older handoff state, and README topology counts have drifted from 83/22 to 90 engine modules/24 API routes.

The link checker passes because these are semantic, not syntactic, failures. Preserve design documents as historical records, but stamp implementation outcome and commit references. Reconcile FR-6 around the actual Anthropic seams (`/api/analyze` and retrospective generation), refresh the handoff/backlog, and either generate topology counts or stop presenting volatile counts as current truth.

### [P2/WIP] Restore immutable execution-plan records — `docs/superpowers/plans/2026-07-08-preride-loading-loop.md:243`

The uncommitted diff edits three files under `docs/superpowers/plans/`. Invariant 27 defines these as immutable point-in-time execution records, and the documentation workflow explicitly routes later corrections into canonical docs instead of rewriting plans. Even seemingly cosmetic cleanup changes the historical instructions reviewers use to reconstruct why work landed. Revert the three plan-file edits; make any current terminology cleanup in canonical system/design documents instead.

### [P2/WIP] Keep unresolved design-limit rationale during comment cleanup — `lib/loading.ts:69`

The working-tree diff removes implementation comments from `lib/aerobic.ts`, `lib/block-compiler.ts`, `lib/intent-grounding.ts`, `lib/loading.ts`, `lib/score-log.ts`, and `lib/types.ts`. Several deletions are not redundant labels: they record bounded-complexity assumptions, delayed-sync data loss, syntax ambiguity, the binary-loading heuristic's upgrade trigger, and performance limits. Removing the tag is harmless; removing the rationale eliminates the only local explanation of when the implementation stops being valid. Reword tagged comments into neutral engineering language while preserving the condition, consequence, and revisit trigger. `lib/calendar-mirror.ts` already demonstrates the safe form: it changes wording while retaining the behavior explanation.

### [P3] Update user-facing AI positioning and topology claims — `app/layout.tsx:32`

The root metadata calls NodeVelo an “AI-powered training block generator,” but block generation is now deterministic and Anthropic is reserved for optional language. The root and app READMEs also publish stale route/module totals. These claims do not break execution, but they misdescribe the product's strongest trust-boundary improvement. Prefer “deterministic training planner with optional AI coaching prose” and refresh or remove volatile counts.

## State of the app

| Area | State | Evidence and qualification |
|---|---|---|
| Product maturity | **Mechanically substantial; effectiveness unproven** | Seven user pages, 24 API handlers, and broad deterministic workflows are shipped. The roadmap intentionally freezes features until four clean real block cycles establish usefulness, trust, adaptation quality, and at least one honest refutation. Only one complete turnover is recorded. |
| Deterministic planning | **Strong foundation, one critical publish race** | Generation, validation, provenance, hash-bound publication claims, and preference acknowledgement are well separated. Concurrent calendar publication can still remove the winning plan's events. |
| Sync and post-ride loop | **Broad but incorrectly coupled to AI configuration** | Sync covers physiology, scoring, intent, loading, interventions, nutrition, and Today analysis. The detailed deterministic ride finalizer silently disappears without an Anthropic key. |
| Persistence and recovery | **Strong design; test signal needs hardening** | Atomic writes, critical backups, locks, CAS, frozen ledger history, and staged restore are unusually well documented and tested. One recovery concurrency test is load-sensitive; off-machine recovery remains deferred. |
| AI/provider layer | **Optional and cost-accounted; live behavior not re-proven here** | The SDK calls are narrow and usage/cost tracking is centralized. Repository pricing for Sonnet 4.6 matches Anthropic's published $3/$15 per million input/output tokens and $0.30 cache reads. Sonnet 4.6 remains available but is now a legacy model; Anthropic recommends Sonnet 5 at $2/$10, making the planned fixed-input FR-6 comparison worthwhile. See [Sonnet 4.6 overview](https://platform.claude.com/docs/en/models/sonnet-4-6/overview) and [current model overview](https://platform.claude.com/docs/en/about-claude/models/overview). No paid Anthropic call was made in this review. |
| UI health | **Desktop smoke healthy; interaction evidence incomplete** | `/`, `/today`, `/plan`, `/trends`, `/profile`, `/model`, `/settings`, and `/knowledge` all returned 200 (root redirected to Today), exposed the expected heading, and produced no console errors, page errors, or failed requests in headless Chromium. No live mutations, mobile device, keyboard, or screen-reader audit was performed. |
| Security and privacy | **Appropriate for localhost, not a network product** | Central same-origin Proxy protection covers API writes; credentials remain server-side. There is intentionally no authentication, and LAN mode is documented as trusted-network exposure. The over-broad build trace is the main newly observed privacy/deployment risk. |
| Build and CI | **Passing with one warning and one observed flake** | TypeScript, ESLint, build, link checking, agent-workflow guards, sync guards, and a second full Vitest run pass. GitHub CI exists at `.github/workflows/check.yml`. The build trace warning and nondeterministic backup test prevent an unqualified green assessment. |
| Documentation | **Excellent navigability; semantic drift accumulating** | `COMPASS`, invariants, glossary, decision log, and numbered system docs make the codebase highly agent-navigable. All 150 Markdown files have valid links. Status, handoff, counts, and product-language drift now need a focused sweep. |

### Verified versus inferred

- **Verified in this review:** static types, lint, production compilation, route registration, Markdown links, repository workflow guards, current tests (including the observed flake pattern), passive desktop route rendering, one malformed-body reproduction, source call paths, manifest contents, and current Git state.
- **Inferred from code and tests:** Intervals.icu race consequences, local-midnight Morning Check-In behavior, production packaging risk, and product workflow behavior that would mutate personal data.
- **Not verified:** real Intervals.icu read/write/delete behavior, paid Anthropic output quality, live provider cost comparison, responsive/mobile presentation, keyboard-only completion, screen-reader behavior, backup restore against the user's real data, or the four-block effectiveness threshold.

## Architecture review

### Strong recommendation: deepen the block-publication module

The publication workflow is currently a shallow route-level orchestration spread across the route, the Intervals adapter, stable-ID mapping, local block storage, history, and rollback code. Its public **interface** appears to be “publish this validated plan,” but its **implementation** exposes ordering and reconciliation details to the route. The external calendar and local JSON store are a genuine distributed-state **seam**, and each is already an **adapter**.

Create one deep `publishValidatedPlan(...)` **module** that owns the publication claim, remote upserts, local CAS commit, old-block archival, and rollback/reconciliation policy. This increases **depth** because callers get one small success/conflict/failure interface while the module hides the hard ordering rules. It has high **leverage** across normal writes, retries, partial failures, and two-tab races, and improves **locality** by putting every transition of the publication transaction in one place. The deletion test passes: once callers use the module, route-level rollback and distributed-state comments can disappear rather than migrate elsewhere. Keep deterministic generation outside this boundary, per ADR-0003/FR-5.

### Strong recommendation: deepen deterministic ride finalization

The sync route contains more than 200 lines of mixed Intervals I/O, pure analysis, score-ledger mutation, nutrition resolution, and error handling beneath the wrong provider gate. Extract a `finalizeTodayRide(...)` module with a narrow input snapshot and explicit adapters for streams/intervals and persistence. Its result should contain the Today analysis, score patch, and warnings; coach prose stays behind the `/api/analyze` seam.

This improves depth and locality for the app's core learning-loop transition, makes “AI unavailable” an ordinary input state instead of a structural branch, and gives tests one interface for planned, off-plan, no-stream, transient-Intervals, and unconfigured-AI cases. The deletion test passes if the sync route loses the entire mixed implementation and retains only orchestration.

### Worth doing: one season state interface on Plan

`PlanView`, `SeasonRoadmap`, and `SeasonSection` should share one cached season interface. This is a smaller deepening opportunity: the form can receive the current plan plus save/invalidate operations, while the query adapter owns refetch behavior. It reduces duplicate work and makes failures consistent. The deletion test passes only if the independent form loader and its duplicated state transitions disappear.

### Worth exploring: domain modules inside `AthleteProfileForm`

At 1,308 lines, the form combines identity, performance, availability, nutrition, and preferences. A split purely by visual card would create shallow wrappers and fail the deletion test. A useful refactor would instead define domain modules with their own validation/value interfaces while one parent owns load/save coordination. Prototype the seam first and require a measurable reduction in cross-section state or tests before proceeding.

### Do not split large modules merely by line count

`lib/nutrition.ts`, `lib/types.ts`, and `lib/intent-scoring.ts` are large recent hot spots, but size alone does not prove poor depth. Nutrition in particular centralizes a coherent domain and has substantial direct tests. Refactor only where a real interface can hide complexity, improve locality, and delete knowledge from callers—not to satisfy a file-length target.

## Verification record

| Command or check | Result |
|---|---|
| `git rev-parse HEAD` / `git rev-parse origin/main` | Both `f53374886f2e19df769a9173e40134be9650b771`; integrated branch diff empty. |
| Initial `git status --short` | Dirty before review; 10 modified tracked files and three untracked files. No application file was changed by this review. |
| `npx tsc --noEmit` | Pass, exit 0. |
| `npm run lint` | Pass, exit 0, no warnings. |
| First `npm test -- --reporter=dot` | Fail: 117 files passed, one failed; 2,509 tests passed, two failed in `lib/backup.test.ts`. |
| `npm test -- lib/backup.test.ts --reporter=verbose` | Pass: 20/20. |
| Second full Vitest run | Pass: 118/118 files, 2,511/2,511 tests. |
| `npm run test:agent-workflow` | Pass: start, finish, and merge workflow guards. |
| `npm run test:sync` | Pass: sync squash-merge cleanup scenario. |
| `npm run build` | Pass, routes compiled; one whole-project output-file-trace warning. `.next` size 120 MB. |
| `npm run check-links` | Pass: 150 Markdown files, no broken links. |
| Passive Playwright smoke | Eight routes healthy; no console/page/request errors. Screenshots inspected for Today and Plan. |
| Primitive retrospective request | Reproduced HTTP 500 with body `42`; no persistence or provider call reached. |
| `git diff --check` | Pass before final report update. |

The review deliberately did **not** run `npm run sync` in the primary checkout: project instructions require it on clean `main`, but the checkout already contained another task's uncommitted work. Updating the shared checkout would have risked mixing or disrupting that work. Instead, the review pinned both local and remote `main` to the same commit and treated the working tree as a separate target.

## Evidence gaps and missing tests

1. Add an Anthropic-unconfigured `/api/sync` test that proves deterministic Today analysis and ledger enrichment still run.
2. Add a concurrent `/api/write` test with stable shared Intervals event IDs and assert the winning block's events survive.
3. Add Morning Check-In component coverage with local and UTC calendar dates deliberately different.
4. Add primitive JSON cases across route bodies; the retrospective route proves malformed JSON and `null` coverage are not enough.
5. Add a production-build manifest check forbidding `data/`, `knowledge-base/`, test, and unrelated repository paths.
6. Render the real `SeasonSection` inside the Plan integration test and assert one initial season GET.
7. Replace backup-test polling with deterministic synchronization, then run the full gate repeatedly to prove stability.
8. Complete the existing attended evidence backlog: live provider comparison, Intervals failure branches, cross-tab browser behavior, keyboard flows, responsive layouts, and four real block cycles.

## Sequenced action plan

1. **Protect athlete-facing truth first:** fix the concurrent publish rollback and add the shared-ID two-writer regression test before any further calendar-write work.
2. **Restore AI independence:** move deterministic ride finalization outside the Anthropic gate and verify the full no-key Today flow.
3. **Close narrow correctness/privacy gaps:** propagate local Today after Morning Check-In, validate retrospective body shape, and constrain build traces.
4. **Restore verification trust:** make backup concurrency tests deterministic and require several clean full-suite repetitions.
5. **Reduce duplicated interfaces:** deepen publication and ride-finalization modules; then consolidate season state. Treat the profile-form split as a measured prototype, not a mechanical extraction.
6. **Run a semantic docs sweep:** update implementation statuses, FR-6 scope, handoff/backlog truth, metadata, and topology claims; revert WIP edits to immutable plans and preserve unresolved-limit rationale.
7. **Return to product evidence:** after the correctness fixes, execute FR-6 and the four-block FR-9 attended program. Do not claim coaching effectiveness from repository health alone.

## Bottom line

NodeVelo is a serious, unusually well-specified local coaching system with strong deterministic planning, persistence, provenance, and test investment. It is not yet a proven coaching product, which the roadmap correctly acknowledges. The two issues to fix before trusting the current loop are the publication rollback race that can remove the winning plan's calendar events and the Anthropic configuration gate that disables deterministic post-ride analysis. After those, the highest-value work is verification hardening, privacy-safe build tracing, semantic documentation reconciliation, and real attended evidence—not more features.

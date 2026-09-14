# Repository staleness and redundancy audit — 2026-09-14

Evidence base: integrated `main` at `a2de75e326b43cab0f9c1076b08ac2f416b6fab1` (PR #129).
The primary checkout was clean and refreshed before the task. GitHub had no open PRs at the
preceding queue check. The owner authorized HR-69 cleanup and asked to check the rest of the repo;
only HR-69 is repaired here. The findings below are dated review evidence, not a new work queue.
[ROADMAP](../../ROADMAP.md) retains its gates.

## Scope and method

Inspected root navigation/product/tracker documents, system documentation, the file index,
repository workflow and handoff instructions, committed knowledge defaults, relevant source and
tests, and selected historical dispositions. Searched production/test callers for retirement
candidates and checked repository Markdown links. This is a documentation and targeted redundancy
audit, not an exhaustive dead-code analysis, security review, or live athlete-data verification.

## Confirmed findings

| ID | Finding and evidence | Recommended correction / completion criterion |
|---|---|---|
| DS-1 | [FEATURES Calendar boundary](../../FEATURES.md#features) calls SR-1 an open rollback defect. [Publication queue](../../app/api/write/route.ts) serializes publication through rollback/cleanup, [regressions](../../app/api/write/route.test.ts) cover `SR-1 concurrent publication`, and [shipment evidence](../history/shipments.md#sr-1--concurrent-publication-rollback-2026-09-08) records PR #116. | Replace the obsolete defect warning with the actual single-process concurrency limitation, using [generation's contract](../systems/06-generation.md#the-two-phase-commit). Do not claim all concurrent mutation risks are eliminated. |
| DS-2 | [Data-system backup description](../systems/01-sync-and-data.md#the-persistence-substrate-libjson-storets) omits protected stores and says calibration has no backup. [File index](../FILE_INDEX.md#data-files) also marks ledger-rebuild, morning-check, loading-log, season-plan, calibration and weekly-envelope as having no backup. All are in [CRITICAL_JSON_FILES](../../lib/json-store.ts), alongside intent overlays and the workout library. | Align backup descriptions with the exported critical-store list; prefer a source pointer over another manually duplicated exhaustive list. |
| DS-3 | [Data read/write contract](../systems/01-sync-and-data.md#the-readwrite-contract) calls `GET /api/sync` pure. [GET](../../app/api/sync/route.ts) calls `resolveNoBlockSummary`, which calls `updateWeeklyEnvelope`; [readAthleteProfile](../../lib/data-store.ts) can also persist the one-time goals migration. | State that GET avoids the remote full-sync operation but may perform local migration/derived-state writes. This is documentation drift, not evidence that these writes should be removed. |
| DS-4 | [Frontend test coverage](../systems/08-frontend.md#test-coverage-reality) says Settings components have no tests. [BackupRestore tests](../../components/BackupRestore.test.tsx) and [DataPrivacyCard tests](../../components/DataPrivacyCard.test.tsx) exist for Settings components. Its cached test count and rough-edge line counts are also stale. | Describe covered behaviors without fixed file/line counts; retain any genuinely untested component limits after checking current tests. |
| DS-5 | [File index](../FILE_INDEX.md#appapi--routes) carries a stale approximate sync-route length; its stats row also carries an importer count. These duplicate facts derivable from source and conflict with the repo's guidance against cached counts. | Remove incidental counts and retain responsibility/caller pointers. Do not replace them with newer counts that will drift again. |
| DS-6 | [Knowledge doc](../systems/04-knowledge.md#the-two-directories) says `parseAthleteMd` keeps `athlete.json` performance numbers in sync. [readAthleteProfile](../../lib/data-store.ts) overlays Markdown fallback FTP/HR in memory, then gives physiology precedence; the write accessor explicitly preserves raw stored profile fields. | Describe read-time fallback/overlay separately from persisted profile updates and the one-time goals migration. |
| DS-7 | [overview-check.ts](../../lib/overview-check.ts) exports `extractBlockFacts` and `checkOverviewAgainstFacts`; searches of `app`, `lib`, `components` and `scripts` find their consumers only in [its own tests](../../lib/overview-check.test.ts). The [file index](../FILE_INDEX.md) already labels the helper historical. | Candidate for a separate retirement change: verify all consumers again, remove implementation/tests if no retained need exists, update current index references, and preserve historical decisions. This task does not delete it. |

## Retained deliberately

- [ARCHIVE](../../ARCHIVE.md), [research](../../research.md), and [UX-MASTERPLAN](../../UX-MASTERPLAN.md)
  are compatibility pointers to historical owners, not duplicate full documents. Keeping them avoids
  breaking old references.
- Dated reviews and immutable execution plans contain old states by design. For example, the older
  HR-66 shipment says HR-69 remained open at that time; the new closeout supersedes it without
  rewriting history. Old unchecked boxes alone do not establish unfinished current work.
- `selectLibraryWorkout` and `recordAcceptedLibraryUses` have test consumers but no production callers.
  Their missing integration is explicitly [FR-7](../../ROADMAP.md#fr-7--manual-curated-library-completion--blocked-until-phase-3-closes),
  so this is unfinished gated work, not a demonstrated deletion opportunity.
- Legacy nutrition, prescription, provenance, and Markdown compatibility paths retain runtime
  consumers. A `legacy` name is insufficient evidence for removal.
- The remaining todo live-interaction checks need actual behavioral evidence. Their implementations
  existing in source does not establish that the requested attended checks were completed.
- FR-6 remains incomplete in recorded evidence; this audit neither runs paid comparisons nor infers
  present credentials or owner scores. The finished reliability fallback does not unlock FR-7/FR-8.

## Verification and limits

The baseline and post-edit Markdown checks passed. The handoff skill target also resolves.
The sanctioned finish helper runs the required integration suite; its result is recorded in the PR.
No application behavior, personal runtime data, historical plans, or live calendar state is changed.
Future repairs should update each fact's canonical owner; this report remains dated evidence.

## Pass 1 disposition — 2026-09-14

DS-1 through DS-6 are resolved by the documentation-only correction: see
[shipment evidence](../history/shipments.md#ds-1-through-ds-6--documentation-corrections-2026-09-14).
The original findings above describe the audited revision and remain intact. DS-7 remains open
for the separate dependency check and retirement decision; this pass changes no application code.

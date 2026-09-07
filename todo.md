# NodeVelo — live punch-list

Incoming bugs and feedback. On shipment, move the record to [ARCHIVE.md](ARCHIVE.md).

- **What's next / strategy** → [ROADMAP.md](ROADMAP.md)
- **Completed work** → [ARCHIVE.md](ARCHIVE.md)
- **Research spikes** → [research.md](research.md)

**Legend** — Status: ☐ todo · ◑ partial · ☑ done · Priority: P1 correctness/data-integrity ·
P2 high-value UX/feature · P3 polish/education · Type: `bug` `ux` `feat` `audit` `edu`

---

## Open

**Execution order is owned by [ROADMAP → Follow this queue](ROADMAP.md#follow-this-queue).**
Only its current row is active. A review recommendation is not automatically an implementation task.

**September 2 review reconciliation (2026-09-07).** The [source review](docs/reviews/2026-09-02-code-and-app-state-review.md)
was previously local-only and its P1 reports were missing here. Current source still contains the
reported branches; targeted reproduction is the next action, not another broad audit.

- ☐ P1 `bug` **SR-1** Verify concurrent publication with identical remote upsert IDs; a losing CAS path deletes all successful IDs (`app/api/write/route.ts:310`). Fix if reproduced; prove the winner's events and history survive.
- ☐ P1 `bug` **SR-2** Verify deterministic Today finalization without Anthropic; current sync wraps it in `isAnthropicConfigured()` (`app/api/sync/route.ts:841`). Only language should be optional.
- ☐ P2 `bug` **SR-3** Carry local date through MorningCheckIn's post-change sync refresh; verify at a local/UTC boundary.
- ☐ P2 `bug` **SR-4** Reject primitive retrospective JSON bodies before property/in-operator access; assert 400 with no writes.
- ☐ P2 `audit` **SR-5** Replace scheduler-dependent backup-test polling with an explicit fake-filesystem handshake; retain restore/write concurrency assertions. Prior review observed suite-load failures; no new failure run claimed here.

Overlapping review findings are **MA-3** (tracing) and **MA-8** (semantic docs/metadata/status drift).
Duplicate season loading is measured but parked until the correctness queue clears. Broad publication,
ride-finalization and UI refactors remain proposals; the smallest verified fixes own scope.

**Maintainer audit (2026-09-05).** Full evidence, locations, smallest fixes and verification:
[maintainer audit](docs/reviews/2026-09-05-maintainer-audit.md). MA-1 shipped in PR #110.

- ☐ P2 `bug` **MA-2** Reject null/primitive Profile section containers before property reads; current null nutrition/performance requests return 500.
- ☐ P2 `audit` **MA-3** Exclude private runtime roots from production traces and add synthetic-canary build assertions (52 references reproduced).
- ☐ P2 `bug` **MA-4** PR #109: unknown successful usage must not pass measured-cost gates as $0.
- ☐ P2 `bug` **MA-5** PR #109: permit independent category winners, then gate their combined cost.
- ☐ P2 `audit` **MA-6** Primary cleanup owner: exclude modifications to immutable historical plans before committing; preserve working files during reconciliation.
- ☐ P3 `edu` **MA-7** Primary cleanup owner: retain bounded-search, quadratic-baseline and binary-loading rationale when removing unwanted comment wording.
- ☐ P3 `edu` **MA-8** Reconcile stale route/module counts, shipped-spec status and AI-positioning copy in owning docs; preserve historical decisions.

**Whole-repo hostile review (2026-08-15) — remaining decisions.** Closed findings HR-60…HR-65,
HR-67, HR-68, HR-70…HR-72 are recorded in [ARCHIVE.md](ARCHIVE.md).

- ☐ P2 `audit` **HR-66** Historical nutrition/workout-library review survives in [closed PR #91](https://github.com/Xon333/Nodevelo/pull/91). Preserve any unique material during the local cleanup; it is not an active implementation branch.
- ☐ P3 `edu` **HR-69** `CONTINUE.md` is stale — still says "after P4 COMPLETE… Next: the 'second
  brain' spec work" while the repo is well past that (adaptive-coach P3c, NV-1…14 closed).
  Follow ROADMAP for current work; refresh this only through the handoff workflow.

---

**Post-2026-07-22-audit: shipped but not exercised live yet.** Not bugs — just never run against real
data/hardware in the sweep that shipped them. Try when convenient, then check off.

- ☐ `audit` Cross-tab guard (UXA-24) — open Plan in two tabs on the same block, mutate in one, try
  the same action in the other. Expect a "changed in another tab, reload" message, not a silent
  overwrite.
- ☐ `audit` Keyboard shortcuts (UXA-48) — `1`–`7` nav, `s` sync, `?` legend, from a real keyboard;
  decide if they're worth a touch equivalent on mobile/tablet (currently just absent there).
- ☐ `audit` The 9 newly-`<form>`-wrapped forms (UXA-21) — Enter-to-submit, with real values.
- ☐ `audit` Nutrition range hints (UXA-51) — confirm the Profile "Edit" disclosure numbers read
  sensibly against your own real values.
- ☐ `ux` P3 Nutrition input bounds (UXA-51) — `targetWeightKg` still has a floor of 0 and no
  ceiling.

---

- ☐ `audit` Nutrition follow-ups — none blocking; magnitudes in
  [09-nutrition § known rough edges](docs/systems/09-nutrition.md#known-rough-edges). `weeklyEnergy`
  remains approximate because NodeVelo does not yet persist the final prescription for every calendar
  day; do not reconstruct old buffers or stamp rides only (rest days would be absent).
- ☐ `ux` Phase 3a no-block Today layout — revisit whether the fused `AthleteStateCard` (Zone 1,
  `lib/athlete-state.ts`) should eventually be replaced/merged with design §10's three-stream
  Load/Recovery/Execution read for the no-block case, rather than keeping the fused score permanent and
  adding §10's read as Zone 2 supplementary text. Chose the lower-risk option for v1 (2026-08-12,
  athlete's explicit call); flagged to reconsider once the no-block section has shipped and been used.

Add new bugs/feedback here as they come in; strategy → [ROADMAP.md](ROADMAP.md).

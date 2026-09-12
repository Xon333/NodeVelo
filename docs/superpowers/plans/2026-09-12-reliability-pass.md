# Reliability pass — 2026-09-12

Authorized scope: work through the existing reliability queue sequentially for up to two hours,
starting at 05:39 UTC. Each finding ships separately through the sanctioned task workflow.
Routine implementation decisions are delegated to Codex; external experiment scoring and frozen
product phases remain outside this pass.

## Execution

1. **MA-3 — private production traces.** In `codex/ma3-private-traces`, reproduce the trace inclusion
   using synthetic files under `data/` and `knowledge-base/`. Add narrow Next.js exclusions and a
   repeatable build check that scans all trace manifests, retains shipped knowledge defaults, and
   verifies production reads from external runtime roots. Update the data system contract and tracker.
2. **SR-3 — local date.** In a new task after MA-3 integration, exercise MorningCheckIn's mutation
   and refresh across a local/UTC day boundary. Carry the local date through refresh, preserving the
   existing UI and sync contracts. Update the daily-loop documentation and tracker.
3. **MA-2 / SR-4 — request containers.** Follow the queue with focused task PRs for Profile and
   retrospective validation. Reject null, primitive, and array containers before field access;
   route regressions must show HTTP 400 and no writes while valid requests retain existing behavior.
4. **SR-5 — backup tests.** Replace scheduler-dependent polling with an explicit fake-filesystem
   handshake. Retain assertions that restore and writes serialize correctly; verify under suite load.

## Verification and completion

Use a failing reproduction before each behavioral repair, then focused checks and diff review.
Read the owning subsystem contract and relevant invariants before changes. Run the repository's
required integration checks via `finish:agent-task`, confirm actual PR disposition, and start the next
task only after integration. Archive shipped findings and advance the roadmap without reopening
unrelated work. If the time window expires, preserve the current branch, evidence, acceptance criterion,
and next action rather than claiming unfinished work is complete.

The primary checkout was clean and synced at start. PR #109 is merged; experiment usefulness scoring
and category decisions are not inferred from that merge. This plan records intended work; shipment
status belongs in the roadmap and shipment history.

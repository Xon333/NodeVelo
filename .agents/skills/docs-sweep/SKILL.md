---
name: docs-sweep
description: Reconcile NodeVelo documentation with shipped code and simplify project navigation when documentation is stale, duplicated, or hard to use.
---

# Docs sweep

Read [Compass documentation ownership](../../../docs/COMPASS.md#documentation-ownership) first.
It owns the document map; this skill owns the reconciliation procedure.

1. Establish the evidence base: checkout, dirty files, integrated revision, recent commits, and
   relevant open PRs. Treat local edits and unmerged PRs as unfinished, not shipped behavior.
2. Check claims against the owning implementation and tests. Distinguish a pure deterministic
   engine from route orchestration that may still depend on provider configuration. Distinguish
   working software from measured training benefit. Verify the actual consumer before claiming
   that knowledge, reflections, or guidance feed generation.
3. Update the canonical owner and replace duplicated explanations with links. Keep README focused
   on purpose, actual capabilities, setup, and material limits. Keep task order in ROADMAP and
   defect acceptance details in todo. Preserve stable IDs and entry gates.
4. Move shipped narrative into [shipment history](../../../docs/history/shipments.md), recording
   a concise outcome and commit/PR. Keep partial work explicit in its tracker. Reviews and specs
   are dated evidence; verify and stamp their disposition rather than reactivating checklists.
5. When reorganizing, preserve historical references and rationale. Execution plans under
   `docs/superpowers/plans/` remain immutable; retain compatibility entry points where needed.
   Agent instructions and skill routers are in scope when the user requests workflow/navigation
   changes. Leave personal runtime knowledge and session handoffs alone unless requested.
6. Verify changed relative links and heading anchors with `npm run check-links`, and check changed
   skill links separately (the default checker excludes `.agents/`). Search inbound code/doc
   pointers before moving a target. Inspect the resulting diff for accidental historical rewrites.
7. Follow AGENTS and WORKFLOW for verification, task-owned staging, and integration. Record concrete
   remaining work; do not describe an open PR or a successful check as a completed merge.

Maintenance signals: a landing page reading like a changelog, a tracker carrying shipped narrative,
stale counts, a task router naming missing headings, or repeated status in reviews. Correct relevant
drift in the active task; mention unrelated structural drift without launching an unsolicited audit.

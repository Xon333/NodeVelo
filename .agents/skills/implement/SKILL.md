---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

# Implement

Implement the user's approved spec or tickets within the requested scope. Reconcile requirements with current code and callers; infer routine details from existing conventions. Surface missing decisions only when they materially change the result.

Start or resume an isolated task through [WORKFLOW](../../../WORKFLOW.md#codex-workflow). Use [TDD](../tdd/SKILL.md) for behavioral changes, choosing regression boundaries from public interfaces. Prose-only changes need content and reference checks, not invented behavioral tests.

Use affected checks during development and inspect the resulting diff with [code-review](../code-review/SKILL.md). Follow [completion and verification policy](../../../AGENTS.md#completion-and-decisions); avoid repeated checks without a relevant change or unresolved concern.

Carry authorized implementation through task-owned staging, commit, and the sanctioned finish workflow. Report the actual integration state and any remaining blocker.

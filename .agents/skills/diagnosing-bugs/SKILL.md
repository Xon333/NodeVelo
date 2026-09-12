---
name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow.
---

# Diagnosing Bugs

Diagnose uncertain causes with evidence that distinguishes the reported symptom from nearby failures. Scale the investigation to uncertainty; a clear defect does not need every phase below.

Use [Compass](../../../docs/COMPASS.md) for the affected subsystem and [domain documentation](../../../docs/agents/domain.md) for terminology and decisions.

## Redact

Keep credentials in environment variables. Redact secrets and personal data from commands, logs, captured requests, and shared artifacts. Request missing access or a redacted artifact only when it blocks further useful investigation; production instrumentation needs authorization.

## Phase 1: Build a feedback loop

Inspect the relevant source, callers, tests, and available logs to understand the symptom and construct a reproduction. Provisional hypotheses can guide this inspection; distinguish them from confirmed causes.

Choose a signal that can fail on the user's actual symptom: a public-interface test, fixture replay, HTTP request, CLI invocation, or browser interaction. Record the command and observed result. Prefer disposable fixtures and isolate time, randomness, filesystem state, and network dependencies where they affect the verdict.

For intermittent failures, record attempts and failure frequency rather than claiming deterministic reproduction. Use bounded repeated runs or targeted stress when they help distinguish a cause. For slowness, establish a timing or profiler baseline before changing behavior.

If reproduction is unavailable, state what evidence exists, what you tried, and what remains unverified. Continue useful source inspection and analysis; do not claim a confirmed cause or fix without supporting evidence.

## Phase 2: Reproduce + minimise

Check that the reproduction captures the reported failure rather than an unrelated error. Reduce inputs and setup when doing so clarifies the cause or improves the regression test. Stop minimising once the example is useful; proving every remaining element indispensable is unnecessary.

## Phase 3: Hypothesise

Consider plausible explanations supported by the evidence. Each should predict an observable result that could disprove it. Investigate alternatives when the cause remains ambiguous; no fixed hypothesis count is required. Explain material uncertainty without making routine hypothesis testing an approval checkpoint.

## Phase 4: Instrument

Choose probes that distinguish the plausible causes. Change variables deliberately, using targeted logs, a debugger, fixture variants, or profiling as appropriate. Tag temporary instrumentation so it can be removed. Avoid broad data capture that does not answer a diagnostic question.

## Phase 5: Fix + regression test

Use the relevant [TDD guidance](../tdd/SKILL.md) for behavioral changes. Exercise the real failure through a suitable public boundary, observe the failing result, apply the fix, and verify the passing result. A unit test that cannot reproduce a concurrency or multi-caller failure is not evidence that it is fixed.

If no suitable automated boundary is available, document that limitation and use the strongest available reproduction check. Do not introduce an unrelated architecture redesign merely to manufacture a test.

## Phase 6: Cleanup

Verify the original scenario after the fix and inspect affected behavior. Remove temporary instrumentation and task-created diagnostic artifacts that are no longer needed; preserve user-owned evidence. Report the supported cause, checks performed, and any reproduction or verification gaps.

Follow [completion policy](../../../AGENTS.md#completion-and-decisions) and the [sanctioned workflow](../../../WORKFLOW.md#codex-workflow) for authorized implementation. A diagnosis-only request ends with its findings.

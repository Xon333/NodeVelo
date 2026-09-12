---
name: claude-handoff
description: Prepare an explicitly requested Claude handoff within the repository's current worker policy.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

# Claude Handoff

Check [worker policy](../../../AGENTS.md#parallel-agent-integration) before acting. NodeVelo has retired Claude implementation until the owner explicitly re-enables it. Invoking this skill alone does not re-enable that workflow or authorize a background worker launch.

Prepare the requested resume brief using [handoff](../handoff/SKILL.md), tailored to any scope the user supplied. Return a concrete summary with worktree, branch, evidence, and next action; link existing artifacts instead of duplicating them. Redact secrets and personal data.

If the request includes launching Claude while that workflow remains retired, explain the exact policy restriction and provide the prepared brief. If the owner explicitly re-enables and authorizes a launch, follow the then-current worker workflow and available tool documentation; do not infer a CLI command from this skill.

# Phase boundaries

A change from planning to implementation or verification is a useful checkpoint to preserve decisions, not a requirement to replace the session. [AGENTS](../../../AGENTS.md#completion-and-decisions) owns continuation and handoff policy.

## The five options

| Option | When it is appropriate |
|---|---|
| Continue | The authorized task can still progress in the current session. |
| Compact | The runtime needs to compact context; retain scope, decisions, worktree, evidence, and next action and continue. |
| Handoff | The user requests a transfer or an actual execution limit prevents continuation; follow [handoff](../handoff/SKILL.md). |
| Subagent | Delegation is authorized and available, and a bounded task can run alongside useful independent work; follow [research](../research/SKILL.md) for research tasks. |
| Clear | The user explicitly requests a fresh context; preserve requested task state before using a supported runtime action. |

## The tree

Use the actual runtime capabilities and user intent. A new phase, directory change, or prototype does not by itself require a handoff. Do not impose a fixed token threshold, forbid compaction mid-phase, or assume slash commands exist in every harness. Ask only for a material unresolved decision, not a routine continuation choice.

## Primary and secondary sources

Keep durable decisions, current code, and verification evidence accessible through their repository owners. A summary should link the relevant artifacts and preserve unresolved questions; reread the needed source when a detail matters. Context compression is not a reason to abandon the task or repeat every completed check.

## These are judgement calls

Choose the smallest intervention that preserves the requested work. Delegation must respect the repository's file ownership and worktree rules; creating another agent or session is not a prerequisite for making progress.

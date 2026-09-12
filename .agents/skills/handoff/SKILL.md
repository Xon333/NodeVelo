---
name: handoff
description: Preserve task state for an explicit session transfer or an actual execution limit that prevents continuation.
---

# Handoff

Apply [completion policy](../../../AGENTS.md#completion-and-decisions): ordinary context compaction or a natural checkpoint does not end authorized work.

For an explicit transfer or an actual execution limit, prepare a concise resume brief containing:

- The user's objective, accepted scope, and outstanding decisions.
- The exact worktree, branch, and relevant commit or PR.
- Completed work, uncommitted task-owned files, and unrelated edits to preserve.
- Verification already performed and the files/state to which it applies.
- The next concrete action, blockers, and links to the current spec or evidence.

Reference existing artifacts instead of duplicating them. Redact secrets and personal data. Return the brief in the conversation unless the user requested a saved handoff; update `CONTINUE.md` only when it is the requested destination, preserving unrelated content. Name the task and worktree in the resume instruction so stale handoffs cannot select different work.

Keep incomplete work in its worktree. Commit only coherent, verified task-owned changes; do not publish partial work merely to end a session. Finish complete implementation through [WORKFLOW](../../../WORKFLOW.md#codex-workflow).

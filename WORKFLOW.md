# Development workflow

[AGENTS](AGENTS.md) owns policy. [ROADMAP](ROADMAP.md#follow-this-queue) selects work;
[Compass](docs/COMPASS.md) routes implementation questions.

## Codex workflow

| Step | Command / result |
|---|---|
| Refresh clean primary `main` | `npm run sync` |
| Start an isolated task | `npm run start:agent-task -- codex <task-name>` |
| Enter it | `cd` to the worktree printed by the helper; run `npm ci` if dependencies are absent |
| Work and verify | Change task-owned files; use focused checks, then required verification |
| Commit | Stage explicit paths; `git commit` |
| Finish | `npm run finish:agent-task` runs all checks, pushes, opens the PR, and enables auto-merge |
| Confirm | Inspect the PR: merged, pending, or failed. Auto-merge enabled is not a merge result. |

Run work and finish commands **inside the task worktree**. For an existing Codex PR,
`npm run merge:agent-task -- <pr>` checks requirements and merges. Policy/helper changes ship together.

## Dirty primary checkout

Inspect `git status --short --branch`, `git diff --stat`, and `git worktree list` before changing it.
A failed sync does not prevent task creation: the start helper fetches `origin/main` independently.

| What you find | Action |
|---|---|
| Already-integrated edits | Compare exact content before clearing local residue |
| Unique unfinished work | Port only the selected scope into an isolated task |
| Untracked research or reviews | Preserve; check whether GitHub already has an identical copy |
| Edits to immutable plans | Exclude from integration; retain useful rationale in current docs |
| Uncertain ownership | Leave intact and identify the unresolved file/change |

Reconciliation finishes when each group is integrated, explicitly retained, or deliberately discarded
by its owner. Never blanket-stash/reset to make sync pass. Old worktrees are not additional tasks.

## Commands

| Command | Use |
|---|---|
| `npm run dev` / `npm run dev:preview` | Local server on 3000 / isolated preview on 3100 |
| `npm run check` | Typecheck, lint, application tests, workflow/sync tests, documentation links |
| `npm run check-links` | Relative Markdown paths and headings; changed skill links need a separate check |
| `npm run reset:today` | Clear today's cached analysis through the running dev server |

## When automation stops

| State | Next action |
|---|---|
| Dirty task | Review and commit task-owned files |
| Failed checks | Fix task regressions; identify unrelated baseline failures |
| Conflict | Reconcile both changes using the merge-conflict workflow |
| Pending GitHub checks | Wait or inspect the failing run |
| Expired authentication | Complete GitHub login, then retry |
| Merge succeeded, local cleanup failed | Confirm remote merge; preserve dirty primary and clean up separately |

## Reviewing an agent PR

Compare the diff with the requested outcome, affected contracts, and actual callers. Verify fixes
before finishing; record unfinished scope in its tracker. Outside review is optional unless requested.

## Two agents at once

The current roadmap freeze allows one implementation task. If the owner requests parallel work,
use separate worktrees and disjoint files; overlapping work uses one writer and a read-only reviewer.

## Optional joint planning

When requested, use one shared issue/spec. A second plan or review queue is unnecessary.

## Codex + opencode workflow

Historical anchor for the [current Codex workflow](#codex-workflow). Reciprocal-review gates are retired.

## Block-turnover runbook

Use [Recipes](docs/RECIPES.md#turn-over-a-block-end--retrospective--next-block).

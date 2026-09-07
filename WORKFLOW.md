# Workflow cheat sheet

[AGENTS.md](AGENTS.md) owns operating rules. [CLAUDE.md](CLAUDE.md) imports it; keep policy changes in the shared file.

## Daily loop

Start or resume an isolated task, implement the requested outcome, verify it, and finish through the sanctioned helper. On clean primary `main`, `npm run sync` refreshes the integration mirror and prunes merged worktrees. Preserve local edits if sync is blocked; task creation fetches current `origin/main` independently.

## Dirty primary checkout

A failed sync is a state problem to inspect, not a reason to stash or reset everything.

1. Run `git status --short --branch`, `git diff --stat`, and `git worktree list` in primary.
   Read relevant diffs; compare with `origin/main` and open PRs before calling anything unfinished.
2. Preserve unrelated edits and untracked reports. Start the authorized task with
   `npm run start:agent-task -- codex <task-name>`; the helper fetches `origin/main` independently.
   Change directory to the reported worktree before editing or running checks.
3. If reconciliation is the task, group each dirty file as already integrated, unique unfinished
   work, or an intentional local change. Keep unique research as dated evidence. Exclude edits to
   immutable plans, preserving any useful rationale in current docs instead.
4. Port only the selected changes to the isolated task, verify, and integrate. Record remaining
   groups and their next action in the existing tracker. Remove primary residue only after its
   contents and ownership have been verified; never reset or prune merely because a PR merged.

Primary dirt and old worktrees are not additional priorities. The roadmap decides which unfinished
work to carry next. `CONTINUE.md` and old plan checklists do not override it.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server on port 3000 |
| `npm run dev:preview` | Isolated preview server on port 3100 |
| `npm run check` | Typecheck, lint, application tests, workflow tests, sync tests, and documentation links |
| `npm run check-links` | Check project documentation links |
| `npm run sync` | Refresh clean primary main and prune merged worktrees |
| `npm run start:agent-task -- codex <task-name>` | Create an isolated Codex task from current origin/main |
| `npm run finish:agent-task` | Verify committed task work, push, open a PR, and enable squash auto-merge after required checks |
| `npm run merge:agent-task -- <pr>` | Check and merge an existing Codex PR |
| `npm run reset:today` | Clear today's cached analysis through the local dev server |

## Codex workflow

Codex owns implementation and integration. Ox/Claude reciprocal-review gates are deprecated. The sanctioned helpers retain branch, clean-tree, authentication, and verification checks; no manual push, PR creation, or merge commands bypass them.

Run commands from the task worktree. Stage only task-owned files and commit before finishing. Inspect the resulting PR status: enabling auto-merge is not confirmation that the PR has merged. A new commit requires checks against the updated head. Merged remote branches are removed by repository settings; local task cleanup happens through sync.

The helpers implement the Codex-only policy in AGENTS.md. Policy changes must update the
corresponding helper and workflow tests in the same task.

### Codex + opencode workflow

Legacy links to this heading refer to the [current Codex workflow](#codex-workflow).

### Reviewing an agent PR

Inspect the actual diff against the requested behavior and affected repository contracts. Check relevant recurring bug classes from AGENTS.md and that promised callers, persistence, and UI paths are wired. Record genuinely unfinished scope in ROADMAP or todo. Fix substantive findings and rerun affected checks before finishing. An outside review is optional unless the owner explicitly requests it.

### Optional joint planning

Joint planning is user-invoked. Work from one shared issue or spec and bring unresolved product decisions to the user. It is not a prerequisite for routine implementation.

### Two agents at once

Independent tasks may use separate Codex worktrees with disjoint file ownership. Overlapping work uses one writer and a read-only reviewer. Research and review can inspect files without owning an implementation branch.

### When automation stops

| Situation | Next action |
|---|---|
| Uncommitted task files | Review and commit only task-owned files, then retry |
| Failed checks | Fix regressions caused by the task; identify unrelated failures without claiming a pass |
| Merge conflict | Reconcile both changes deliberately; use the merge-conflict skill |
| Required checks pending | Wait for the PR's checks; inspect failures if they occur |
| GitHub login expired | Report the required login step and continue independent local work |
| Task blocked | Report the concrete blocker and completed work; use handoff only when a handoff is requested |

## Skills (`/name`)

| Skill | Use when |
|---|---|
| `/whats-next` | Choose work from the roadmap |
| `/agent-orchestration` | Coordinate useful independent delegated tasks |
| `/diagnosing-bugs` | Investigate a bug with an uncertain cause |
| `/tdd` | Implement behavior through a meaningful red/green test loop |
| `/code-review` | Review a diff or verify received feedback |
| `/docs-sweep` | Reconcile documentation with shipped state |
| `/triage-audit` | Evaluate an external audit against the repository |
| Requested handoff | Use the available handoff workflow; it is not a required task-close step |

## Standing rules worth remembering

CONTINUE.md is maintained through handoff. Preserve stable roadmap IDs. Navigation and documentation ownership are in [Compass](docs/COMPASS.md#session-rituals); operating safeguards are in [AGENTS.md](AGENTS.md).

## Block-turnover runbook

See [Recipes](docs/RECIPES.md#turn-over-a-block-end--retrospective--next-block).

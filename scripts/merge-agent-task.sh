#!/usr/bin/env bash
set -euo pipefail

die() {
  echo "merge-agent-task: $*" >&2
  exit 1
}

usage="usage: scripts/merge-agent-task.sh <pr-number>"

main() {
  local pr="${1:-}" state branch head
  command -v gh >/dev/null || die "install gh first"
  [[ "$pr" =~ ^[0-9]+$ ]] || die "$usage"

  [[ $# -eq 1 ]] || die "$usage"

  gh auth status -h github.com >/dev/null 2>&1 || die "run: gh auth login -h github.com"
  state=$(gh pr view "$pr" --json state --jq .state)
  [[ "$state" == OPEN ]] || die "PR #$pr is not open"

  branch=$(gh pr view "$pr" --json headRefName --jq .headRefName)
  head=$(gh pr view "$pr" --json headRefOid --jq .headRefOid)
  [[ "$branch" == codex/* ]] || die "PR #$pr must come from a codex/* branch"

  gh pr checks "$pr" --required
  gh pr merge --squash --delete-branch "$pr"
  echo "merge-agent-task: merged PR #$pr at $head"
}

main "$@"

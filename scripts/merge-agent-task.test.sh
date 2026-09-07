#!/usr/bin/env bash
set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
script="$script_dir/merge-agent-task.sh"
[[ -x "$script" ]] || { echo "merge-agent-task.sh must exist and be executable" >&2; exit 1; }

test_dir=$(mktemp -d)
trap 'rm -r "$test_dir"' EXIT
mkdir "$test_dir/bin"
log="$test_dir/gh.log"

cat > "$test_dir/bin/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

case "$1 $2" in
  "auth status") exit 0 ;;
  "pr view")
    case "$5" in
      state) echo OPEN ;;
      headRefName) echo "${MOCK_BRANCH:?}" ;;
      headRefOid) echo "${MOCK_HEAD:?}" ;;
      comments) printf '%s\n' "${MOCK_COMMENTS:-}" ;;
      *) exit 2 ;;
    esac
    ;;
  "pr checks") echo checks >> "$MOCK_LOG"; exit "${MOCK_CHECK_EXIT:-0}" ;;
  "pr comment") printf 'comment:%s\n' "$5" >> "$MOCK_LOG" ;;
  "pr merge") echo merge >> "$MOCK_LOG" ;;
  *) exit 2 ;;
esac
EOF
chmod +x "$test_dir/bin/gh"

run_gate() {
  PATH="$test_dir/bin:$PATH" MOCK_LOG="$log" MOCK_BRANCH="${MOCK_BRANCH:-codex/task}" \
    MOCK_CHECK_EXIT="${MOCK_CHECK_EXIT:-0}" MOCK_HEAD="${MOCK_HEAD:-abc123}" MOCK_COMMENTS="${MOCK_COMMENTS:-}" bash "$script" 42 "$@"
}

expect_rejected() {
  : > "$log"
  if run_gate "$@" >/dev/null 2>&1; then
    echo "expected merge gate rejection: $*" >&2
    exit 1
  fi
  ! grep -q '^merge$' "$log"
}

: > "$log"
run_gate >/dev/null
grep -Fxq checks "$log"
grep -Fxq merge "$log"

: > "$log"
if run_gate --user-override >/dev/null 2>&1; then
  echo "deprecated review modes must be rejected" >&2
  exit 1
fi

MOCK_BRANCH=ox/task expect_rejected
MOCK_BRANCH=claude/task expect_rejected
MOCK_CHECK_EXIT=1 expect_rejected

echo "merge-agent-task gate passes"

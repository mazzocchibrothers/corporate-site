#!/usr/bin/env bash
# init.sh — Environment check + real gates for corporate-site.
#
# Run it at the START of a session and before declaring any Issue `done`.
# If it fails, the session does not move forward.
#
# There is no CI in this repo: this script is not a local echo of a pipeline,
# it is the only automated gate that exists. See harness/docs/verification.md
# for what it does *not* catch (localization, routing, SEO) and how those are
# verified instead.
#
# Usage:
#   ./harness/init.sh          # env + harness files + gates + build
#   ./harness/init.sh --fast   # skip the production build (slowest gate)

set -u
cd "$(dirname "$0")/.."

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'; NC='\033[0m'
ok()   { printf "${GREEN}[OK]${NC}    %s\n" "$1"; }
warn() { printf "${YELLOW}[WARN]${NC}  %s\n" "$1"; }
fail() { printf "${RED}[FAIL]${NC}  %s\n" "$1"; }

EXIT_CODE=0
FAST=0
[ "${1:-}" = "--fast" ] && FAST=1

# A gate naming a script that isn't in package.json must FAIL, not silently
# pass. npm errors on a missing script today, but the gate list is edited by
# hand far more often than npm's behaviour changes — so we assert the property
# ourselves rather than inherit it.
has_script() {
  node -e '
const { scripts = {} } = require("./package.json");
process.exit(Object.hasOwn(scripts, process.argv[1]) ? 0 : 1);
' "$1" 2>/dev/null
}

# Runs a gate, keeps its output only when it fails.
gate() {
  local script="$1"
  local out
  if ! has_script "$script"; then
    fail "npm run $script — package.json has no \"$script\" script (the gate never ran)"
    GATE_GUARD_FIRED=1
    EXIT_CODE=1
    return
  fi
  if out=$(npm run "$script" --silent 2>&1); then
    ok "npm run $script"
  else
    fail "npm run $script"
    printf "%s\n" "$out" | tail -25
    EXIT_CODE=1
  fi
}

echo "── 1. Environment ─────────────────────────────────────"

command -v node >/dev/null 2>&1 || { fail "node is not installed"; exit 1; }
ok "node -> $(node --version)"

command -v npm >/dev/null 2>&1 || { fail "npm is not installed"; exit 1; }
ok "npm -> $(npm --version)"

if [ ! -d "node_modules" ]; then
  fail "dependencies are missing — run: npm install"
  exit 1
fi
ok "dependencies installed"

if command -v gh >/dev/null 2>&1; then
  ok "gh -> $(gh --version | head -1 | awk '{print $3}')"
else
  # Not fatal: the gates below are all local. But the backlog lives in GitHub
  # Issues, so without gh you cannot claim, comment on, or close an Issue.
  warn "gh is not installed — the backlog (GitHub Issues) is unreachable"
fi

echo ""
echo "── 2. Harness files ───────────────────────────────────"

for f in harness/AGENTS.md \
         harness/BACKLOG.md \
         harness/CHECKPOINTS.md \
         harness/docs/architecture.md \
         harness/docs/conventions.md \
         harness/docs/verification.md \
         .claude/agents/site-leader.md \
         .claude/agents/site-implementer.md \
         .claude/agents/site-reviewer.md; do
  if [ -f "$f" ]; then ok "exists $f"; else fail "missing base file: $f"; EXIT_CODE=1; fi
done

echo ""
echo "── 3. Backlog (GitHub Issues) ─────────────────────────"

# Offline by design: no gh call here, so init.sh stays network-free and runs
# on a plane. The backlog itself is queried by the agent, not by this script.
echo "[i]     live backlog: gh issue list --label harness"
echo "[i]     up for grabs:  gh issue list --label \"harness,status:pending\""

echo ""
echo "── 4. Gates ───────────────────────────────────────────"

# Self-check: run gate() against a script that does not exist — it must fail.
# Drop the has_script guard and a typo'd gate name would silently erase a real
# gate below. GATE_GUARD_FIRED (not EXIT_CODE) is what we assert on: EXIT_CODE
# may already be 1 from an earlier section, which would make the assertion
# vacuous exactly when the environment is degraded.
GUARD_PRE=$EXIT_CODE
GATE_GUARD_FIRED=0
gate "zz:not-a-script" >/dev/null
if [ $GATE_GUARD_FIRED -eq 1 ]; then
  EXIT_CODE=$GUARD_PRE
  ok "gate guard: a missing script fails instead of passing"
else
  fail "gate guard is broken — a typo'd gate name would pass as [OK]"
  exit 1
fi

# The gate tier, derived from package.json by scripts/gates.mjs — not written
# here. CI reads the same list from the same place, so the two cannot disagree
# about what green means (#104). Adding a gate means adding a `check:*` script;
# there is nothing else to update.
#
# It is a short list because this repo has no lint config and no test runner —
# see docs/verification.md, "Starting point".
GATES=()
while IFS= read -r line; do
  [ -n "$line" ] && GATES+=("$line")
done < <(node scripts/gates.mjs)

# An empty list would report a clean run having checked nothing — the same
# silent-pass failure the guard above exists to stop.
if [ ${#GATES[@]} -eq 0 ]; then
  fail "scripts/gates.mjs returned no gates — nothing would be checked"
  exit 1
fi

for g in "${GATES[@]}"; do
  gate "$g"
done

echo ""
echo "── 5. Build gate ──────────────────────────────────────"

# The slow tier. It is also the only gate that catches a broken page: a stray
# straight apostrophe in an Italian string is a parse error that `tsc` walks
# past (@ts-nocheck) and only `next build` reports.
if [ $FAST -eq 1 ]; then
  warn "skipped by --fast: npm run build — NEVER declare an Issue done on a --fast run"
else
  gate "build"
fi

echo ""
echo "── 6. Summary ─────────────────────────────────────────"

if [ $EXIT_CODE -eq 0 ]; then
  if [ $FAST -eq 1 ]; then
    ok "Environment ready (--fast: the build gate did not run)"
  else
    ok "Environment ready"
  fi
else
  fail "Environment NOT ready — fix the failures above before continuing"
fi

exit $EXIT_CODE

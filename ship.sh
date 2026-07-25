#!/usr/bin/env bash
# ship.sh — commit, push to GitHub, and deploy to the live site in one step.
#
# Invariant this enforces: local main == GitHub main == live site.
# You may ONLY ship from main, so the live site can never drift from main.
# Do experiments on branches, merge into main, then ship.
#
# usage:
#   ./ship.sh "commit message"    commit staged+unstaged changes, push, deploy
#   ./ship.sh                     (no changes) just re-push + re-deploy current main
#   ./ship.sh --dry "msg"         show what WOULD happen; changes nothing
set -euo pipefail
cd "$(dirname "$0")"

DRY=0
if [[ "${1:-}" == "--dry" ]]; then DRY=1; shift; fi
MSG="${*:-}"

# 1) must be on main — the live site mirrors main only
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "main" ]]; then
  echo "✋ You're on branch '$BRANCH', not main."
  echo "   The live site only ever mirrors main. Merge first, then ship:"
  echo "     git checkout main && git merge $BRANCH && ./ship.sh \"merge $BRANCH\""
  exit 1
fi

HAVE_CHANGES=0
[[ -n "$(git status --porcelain)" ]] && HAVE_CHANGES=1

if [[ "$HAVE_CHANGES" == 1 && -z "$MSG" ]]; then
  echo "✋ You have uncommitted changes but gave no commit message."
  echo "   usage: ./ship.sh \"what you changed\""
  exit 1
fi

if [[ "$DRY" == 1 ]]; then
  echo ">> DRY RUN — nothing will be committed, pushed, or deployed"
  echo "-- would commit as: ${MSG:-（no changes to commit）}"
  [[ "$HAVE_CHANGES" == 1 ]] && git status --short
  echo "-- would push to origin/main:"
  git push --dry-run origin main 2>&1 | sed 's/^/     /' || true
  echo "-- would deploy (preview):"
  ./deploy.sh --dry
  exit 0
fi

# 2) commit
if [[ "$HAVE_CHANGES" == 1 ]]; then
  git add -A
  git commit -m "$MSG"
  echo ">> committed: $MSG"
else
  echo ">> no local changes — re-shipping current main as-is"
fi

# 3) push to GitHub
git push origin main
echo ">> pushed to origin/main"

# 4) deploy to live site (mirrors working tree, which now equals the commit)
./deploy.sh

#!/bin/bash

# ============================================================
# 📦 MakeIt Framework Release Helper
# Tạo release notes từ git history cho CHANGELOG.md
#
# Usage:
#   bash scripts/release.sh                    # Show changes since last tag
#   bash scripts/release.sh v0.5.0             # Compare with specific tag
#   bash scripts/release.sh v0.4.0 v0.5.0      # Compare between two tags
# ============================================================

set -uo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# Detect repo root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || {
  echo -e "${RED}Error: Not in a git repository${NC}"
  exit 1
}
cd "$REPO_ROOT"

# ============================================================
# Parse arguments
# ============================================================

FROM_REF=""
TO_REF="HEAD"

if [ $# -eq 0 ]; then
  # Auto-detect: last tag → HEAD
  FROM_REF=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
  if [ -z "$FROM_REF" ]; then
    echo -e "${YELLOW}⚠️  No tags found. Showing all changes.${NC}"
    FROM_REF=$(git rev-list --max-parents=0 HEAD)
  fi
elif [ $# -eq 1 ]; then
  FROM_REF="$1"
elif [ $# -eq 2 ]; then
  FROM_REF="$1"
  TO_REF="$2"
fi

# ============================================================
# Current version
# ============================================================

VERSION_FILE="templates/VERSION"
CURRENT_VERSION="unknown"
if [ -f "$VERSION_FILE" ]; then
  CURRENT_VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
fi

echo -e "${BOLD}📦 MakeIt Framework Release Notes${NC}"
echo -e "   Version: ${GREEN}${CURRENT_VERSION}${NC}"
echo -e "   Range:   ${BLUE}${FROM_REF}${NC} → ${BLUE}${TO_REF}${NC}"
echo ""

# ============================================================
# Collect changed files
# ============================================================

echo -e "${BOLD}━━━ Changed Files ━━━${NC}"
echo ""

# Get diff stat
git diff --stat "$FROM_REF" "$TO_REF" -- templates/ scripts/ 2>/dev/null

echo ""
echo -e "${BOLD}━━━ Files by Category ━━━${NC}"
echo ""

# New files (Added)
NEW_FILES=$(git diff --diff-filter=A --name-only "$FROM_REF" "$TO_REF" -- templates/ scripts/ 2>/dev/null || true)
if [ -n "$NEW_FILES" ]; then
  echo -e "${GREEN}✨ New files:${NC}"
  echo "$NEW_FILES" | while read -r file; do
    echo "  + $file"
  done
  echo ""
fi

# Modified files
MOD_FILES=$(git diff --diff-filter=M --name-only "$FROM_REF" "$TO_REF" -- templates/ scripts/ 2>/dev/null || true)
if [ -n "$MOD_FILES" ]; then
  echo -e "${YELLOW}📝 Modified files:${NC}"
  echo "$MOD_FILES" | while read -r file; do
    # Flag USER FILES
    if echo "$file" | grep -qE "(GEMINI\.md|rules/)" ; then
      echo -e "  ~ $file  ${RED}⚠️ USER FILE${NC}"
    else
      echo "  ~ $file"
    fi
  done
  echo ""
fi

# Deleted files
DEL_FILES=$(git diff --diff-filter=D --name-only "$FROM_REF" "$TO_REF" -- templates/ scripts/ 2>/dev/null || true)
if [ -n "$DEL_FILES" ]; then
  echo -e "${RED}🗑️  Deleted files:${NC}"
  echo "$DEL_FILES" | while read -r file; do
    echo "  - $file"
  done
  echo ""
fi

# ============================================================
# Role impact analysis
# ============================================================

echo -e "${BOLD}━━━ Role Impact ━━━${NC}"
echo ""

ALL_CHANGED=$(git diff --name-only "$FROM_REF" "$TO_REF" -- templates/roles/ 2>/dev/null || true)

for role in ba dev-be dev-fe po techlead; do
  role_changes=$(echo "$ALL_CHANGED" | grep "roles/$role/" | wc -l | tr -d ' ')
  shared_changes=$(echo "$ALL_CHANGED" | grep "roles/_shared/" | wc -l | tr -d ' ')
  total=$((role_changes + shared_changes))
  
  if [ "$total" -gt 0 ]; then
    echo -e "  ${GREEN}●${NC} ${BOLD}$role${NC}: $role_changes role-specific + $shared_changes shared = $total files"
  else
    echo -e "  ${BLUE}○${NC} $role: no changes"
  fi
done

echo ""

# ============================================================
# Commit summary
# ============================================================

echo -e "${BOLD}━━━ Commits ━━━${NC}"
echo ""
git log --oneline "$FROM_REF".."$TO_REF" 2>/dev/null | head -30

TOTAL_COMMITS=$(git rev-list --count "$FROM_REF".."$TO_REF" 2>/dev/null || echo "?")
echo ""
echo -e "Total: ${BOLD}${TOTAL_COMMITS}${NC} commits"

# ============================================================
# Changelog template
# ============================================================

echo ""
echo -e "${BOLD}━━━ CHANGELOG Template ━━━${NC}"
echo ""
echo "Copy this to templates/CHANGELOG.md:"
echo ""
echo "---"
echo ""

DATE=$(date +%Y-%m-%d)
echo "## [$CURRENT_VERSION] — $DATE"
echo ""
echo "### Summary"
echo "[TODO: Tóm tắt thay đổi chính]"
echo ""

if [ -n "$NEW_FILES" ]; then
  echo "### ✨ New"
  echo ""
  echo "| File | Roles | Mô tả |"
  echo "|------|-------|--------|"
  echo "$NEW_FILES" | while read -r file; do
    # Detect role
    role_tag="[Framework]"
    if echo "$file" | grep -q "_shared"; then
      role_tag="[ALL]"
    elif echo "$file" | grep -q "roles/ba/"; then
      role_tag="[BA]"
    elif echo "$file" | grep -q "roles/dev-be/"; then
      role_tag="[BE]"
    elif echo "$file" | grep -q "roles/dev-fe/"; then
      role_tag="[FE]"
    elif echo "$file" | grep -q "roles/po/"; then
      role_tag="[PO]"
    elif echo "$file" | grep -q "roles/techlead/"; then
      role_tag="[TL]"
    fi
    echo "| \`$file\` | $role_tag | [TODO] |"
  done
  echo ""
fi

if [ -n "$MOD_FILES" ]; then
  echo "### 📝 Modified"
  echo ""
  echo "| File | Roles | Thay đổi | ⚠️ |"
  echo "|------|-------|----------|-----|"
  echo "$MOD_FILES" | while read -r file; do
    role_tag="[Framework]"
    user_flag=""
    if echo "$file" | grep -q "_shared"; then
      role_tag="[ALL]"
    elif echo "$file" | grep -q "roles/ba/"; then
      role_tag="[BA]"
    elif echo "$file" | grep -q "roles/dev-be/"; then
      role_tag="[BE]"
    elif echo "$file" | grep -q "roles/dev-fe/"; then
      role_tag="[FE]"
    elif echo "$file" | grep -q "roles/po/"; then
      role_tag="[PO]"
    elif echo "$file" | grep -q "roles/techlead/"; then
      role_tag="[TL]"
    fi
    if echo "$file" | grep -qE "(GEMINI\.md|rules/)" ; then
      user_flag="⚠️ USER FILE"
    fi
    echo "| \`$file\` | $role_tag | [TODO] | $user_flag |"
  done
  echo ""
fi

echo "### 📋 Update Instructions"
echo ""
echo "**Áp dụng cho mỗi role workspace đã cài đặt:**"
echo ""
echo '```bash'
echo "# Thay {BLUEPRINT} và {WORKSPACE} cho phù hợp"
echo "[TODO: Thêm commands cụ thể]"
echo '```'
echo ""
echo "---"
echo ""

echo -e "${GREEN}✅ Done! Edit the template above and paste into templates/CHANGELOG.md${NC}"

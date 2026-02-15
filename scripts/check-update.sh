#!/bin/bash

# ============================================================
# 🔍 MakeIt Framework — Check for Updates
# Chạy trong project workspace để xem có bản cập nhật nào không
#
# Usage:
#   bash .makeit/scripts/check-update.sh
#   bash .makeit/scripts/check-update.sh --changelog    # Xem chi tiết
#   bash .makeit/scripts/check-update.sh --path /path   # Chỉ định blueprint path
# ============================================================

set -uo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ============================================================
# Find workspace root (walk up to find .makeit/)
# ============================================================

find_workspace_root() {
  local dir="$PWD"
  while [ "$dir" != "/" ]; do
    if [ -d "$dir/.makeit" ]; then
      echo "$dir"
      return 0
    fi
    dir=$(dirname "$dir")
  done
  return 1
}

WORKSPACE=$(find_workspace_root) || {
  echo -e "${RED}❌ Không tìm thấy workspace (.makeit/ folder)${NC}"
  echo "   Chạy script này từ trong project workspace."
  exit 1
}

# ============================================================
# Parse arguments
# ============================================================

SHOW_CHANGELOG=false
BLUEPRINT_OVERRIDE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --changelog|-c)
      SHOW_CHANGELOG=true
      shift
      ;;
    --path|-p)
      BLUEPRINT_OVERRIDE="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: bash .makeit/scripts/check-update.sh [options]"
      echo ""
      echo "Options:"
      echo "  --changelog, -c    Hiển thị chi tiết thay đổi"
      echo "  --path, -p PATH    Chỉ định đường dẫn tới blueprint repo"
      echo "  --help, -h         Hiển thị help"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# ============================================================
# Read local version
# ============================================================

LOCAL_VERSION="unknown"
if [ -f "$WORKSPACE/.makeit/FRAMEWORK-VERSION" ]; then
  LOCAL_VERSION=$(cat "$WORKSPACE/.makeit/FRAMEWORK-VERSION" | tr -d '[:space:]')
fi

# ============================================================
# Find blueprint repo
# ============================================================

BLUEPRINT=""

if [ -n "$BLUEPRINT_OVERRIDE" ]; then
  BLUEPRINT="$BLUEPRINT_OVERRIDE"
elif [ -f "$WORKSPACE/.makeit/BLUEPRINT-PATH" ]; then
  BLUEPRINT=$(cat "$WORKSPACE/.makeit/BLUEPRINT-PATH" | tr -d '[:space:]')
fi

if [ -z "$BLUEPRINT" ] || [ ! -d "$BLUEPRINT" ]; then
  echo -e "${YELLOW}⚠️  Blueprint repo path không hợp lệ hoặc chưa được lưu.${NC}"
  echo ""
  echo "Cách fix:"
  echo "  1. Chạy lại: bash .makeit/scripts/check-update.sh --path /path/to/ai-team-blueprint"
  echo "  2. Hoặc cài lại framework: bash /path/to/ai-team-blueprint/templates/install.sh"
  exit 1
fi

# ============================================================
# Read remote version
# ============================================================

REMOTE_VERSION="unknown"
if [ -f "$BLUEPRINT/templates/VERSION" ]; then
  REMOTE_VERSION=$(cat "$BLUEPRINT/templates/VERSION" | tr -d '[:space:]')
fi

# ============================================================
# Display results
# ============================================================

echo ""
echo -e "${BOLD}🔍 MakeIt Framework — Update Check${NC}"
echo -e "${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Workspace:    ${DIM}$WORKSPACE${NC}"
echo -e "  Blueprint:    ${DIM}$BLUEPRINT${NC}"
echo ""
echo -e "  Your version: ${BOLD}v$LOCAL_VERSION${NC}"
echo -e "  Latest:       ${BOLD}v$REMOTE_VERSION${NC}"
echo ""

if [ "$LOCAL_VERSION" = "$REMOTE_VERSION" ]; then
  echo -e "  ${GREEN}✅ Bạn đang dùng phiên bản mới nhất!${NC}"
  echo ""
  exit 0
fi

if [ "$LOCAL_VERSION" = "unknown" ]; then
  echo -e "  ${YELLOW}⚠️  Không xác định được version hiện tại.${NC}"
  echo "     File .makeit/FRAMEWORK-VERSION không tồn tại."
  echo "     Có thể workspace được cài trước khi có version tracking."
  echo ""
  echo -e "  ${BOLD}Khuyến nghị:${NC} Xem CHANGELOG và cập nhật thủ công."
  echo ""
else
  echo -e "  ${YELLOW}📦 Có bản cập nhật mới!${NC}"
  echo -e "  ${DIM}v$LOCAL_VERSION → v$REMOTE_VERSION${NC}"
  echo ""
fi

# ============================================================
# Show relevant changelog entries
# ============================================================

CHANGELOG="$BLUEPRINT/templates/CHANGELOG.md"

if [ ! -f "$CHANGELOG" ]; then
  echo -e "  ${DIM}CHANGELOG.md không tìm thấy tại blueprint repo.${NC}"
  echo ""
  exit 0
fi

if [ "$SHOW_CHANGELOG" = true ]; then
  # Show full changelog
  echo -e "${BOLD}━━━ CHANGELOG ━━━${NC}"
  echo ""
  cat "$CHANGELOG"
  echo ""
else
  # Show summary: extract version headers between local and remote
  echo -e "${BOLD}━━━ Versions cần update ━━━${NC}"
  echo ""

  # Extract all version lines from changelog
  in_relevant_section=false
  while IFS= read -r line; do
    # Match version header: ## [x.x.x] — date
    if echo "$line" | grep -qE '^\#\# \['; then
      version=$(echo "$line" | grep -oE '\[([0-9]+\.[0-9]+\.[0-9]+)\]' | tr -d '[]')

      if [ "$version" = "$LOCAL_VERSION" ]; then
        # Reached current version, stop
        break
      fi
      in_relevant_section=true
      echo -e "${GREEN}$line${NC}"
    elif [ "$in_relevant_section" = true ]; then
      # Show summary line (### Summary)
      if echo "$line" | grep -q "^### Summary"; then
        continue  # skip header, show content on next line
      elif [ -n "$line" ] && ! echo "$line" | grep -qE '^###|^\||^```|^>|^$'; then
        echo "  $line"
        in_relevant_section=false
        echo ""
      fi
    fi
  done < "$CHANGELOG"

  echo -e "${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo -e "📖 Xem chi tiết:  ${BOLD}bash .makeit/scripts/check-update.sh --changelog${NC}"
  echo -e "📄 Hoặc mở trực tiếp:  ${DIM}$CHANGELOG${NC}"
fi

echo ""
echo -e "${BOLD}📋 Sau khi update xong:${NC}"
echo -e "   Cập nhật version: ${DIM}echo \"$REMOTE_VERSION\" > $WORKSPACE/.makeit/FRAMEWORK-VERSION${NC}"
echo ""

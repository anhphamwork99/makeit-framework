#!/bin/bash

# ============================================================
# 🔍 MakeIt Reference Validator v1.0
# Scans template files for broken references, missing skills,
# registry mismatches, and cross-role inconsistencies.
#
# Usage:
#   ./scripts/validate-references.sh                 # Validate templates source
#   ./scripts/validate-references.sh --installed DIR # Validate installed workspace
#   ./scripts/validate-references.sh --role ba       # Validate specific role only
#   ./scripts/validate-references.sh --json          # Output as JSON
#   ./scripts/validate-references.sh --fix-report    # Generate fix suggestions
#
# Exit codes:
#   0 = All checks passed
#   1 = Broken references found
#   2 = Script error
# ============================================================

set -uo pipefail

# ============================================================
# Configuration
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES_DIR="$REPO_ROOT/templates"
ROLES_DIR="$TEMPLATES_DIR/roles"

# Counters
TOTAL_CHECKS=0
PASSED=0
FAILED=0
WARNINGS=0

# Options
TARGET_ROLE=""
JSON_OUTPUT=false
FIX_REPORT=false
INSTALLED_DIR=""
VERBOSE=false

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# All roles
ALL_ROLES=("ba" "dev-be" "dev-fe" "po" "techlead")

# JSON accumulator
JSON_ISSUES=()

# ============================================================
# Argument Parsing
# ============================================================

while [[ $# -gt 0 ]]; do
  case $1 in
    --role)
      TARGET_ROLE="$2"
      shift 2
      ;;
    --json)
      JSON_OUTPUT=true
      shift
      ;;
    --fix-report)
      FIX_REPORT=true
      shift
      ;;
    --installed)
      INSTALLED_DIR="$2"
      shift 2
      ;;
    --verbose|-v)
      VERBOSE=true
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --role ROLE      Validate specific role only (ba|dev-be|dev-fe|po|techlead)"
      echo "  --installed DIR  Validate an installed workspace instead of templates"
      echo "  --json           Output results as JSON"
      echo "  --fix-report     Include fix suggestions in output"
      echo "  --verbose, -v    Show all checks including passed ones"
      echo "  --help, -h       Show this help"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 2
      ;;
  esac
done

# ============================================================
# Utility Functions
# ============================================================

log_pass() {
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  PASSED=$((PASSED + 1))
  if $VERBOSE; then
    echo -e "  ${GREEN}✅${NC} $1"
  fi
}

log_fail() {
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  FAILED=$((FAILED + 1))
  echo -e "  ${RED}❌${NC} $1"
  if $JSON_OUTPUT; then
    JSON_ISSUES+=("{\"severity\":\"error\",\"message\":\"$1\",\"file\":\"${2:-}\"}")
  fi
}

log_warn() {
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  WARNINGS=$((WARNINGS + 1))
  echo -e "  ${YELLOW}⚠️${NC}  $1"
  if $JSON_OUTPUT; then
    JSON_ISSUES+=("{\"severity\":\"warning\",\"message\":\"$1\",\"file\":\"${2:-}\"}")
  fi
}

log_section() {
  echo ""
  echo -e "${BOLD}${BLUE}[$1]${NC} $2"
}

log_subsection() {
  echo -e "  ${CYAN}→${NC} $1"
}

# Get skill root for a role
get_skill_root() {
  local role="$1"
  local skill_name
  case "$role" in
    ba) skill_name="makeit-ba" ;;
    dev-be) skill_name="makeit-dev-be" ;;
    dev-fe) skill_name="makeit-dev-fe" ;;
    po) skill_name="makeit-po" ;;
    techlead) skill_name="makeit-techlead" ;;
  esac
  echo "$ROLES_DIR/$role/skills/$skill_name"
}

# Get domain prefix for a role
get_domain_prefix() {
  local role="$1"
  case "$role" in
    ba) echo "ba" ;;
    dev-be) echo "be" ;;
    dev-fe) echo "fe" ;;
    po) echo "po" ;;
    techlead) echo "tl" ;;
  esac
}

# ============================================================
# Check 1: @path References
# ============================================================

check_at_references() {
  local role="$1"
  local skill_root
  skill_root=$(get_skill_root "$role")

  log_subsection "Checking @path references..."

  if [ ! -d "$skill_root" ]; then
    log_fail "Skill root not found: $skill_root" "$skill_root"
    return
  fi

  # Find all @path references in .md files
  while IFS= read -r line; do
    local file ref
    file=$(echo "$line" | cut -d: -f1)
    # Extract @references — patterns like @_shared/..., @ba-execution/..., etc
    while IFS= read -r ref; do
      [ -z "$ref" ] && continue

      # Resolve the reference path
      local resolved_path=""

      if [[ "$ref" == @_shared/* ]]; then
        # @_shared/ → relative to skill root
        resolved_path="$skill_root/${ref#@}"
      elif [[ "$ref" == @skills/* ]]; then
        # @skills/ → relative to roles/ROLE/skills/
        resolved_path="$ROLES_DIR/$role/skills/${ref#@skills/}"
      elif [[ "$ref" == @rules/* ]]; then
        # @rules/ → relative to roles/ROLE/rules/
        resolved_path="$ROLES_DIR/$role/rules/${ref#@rules/}"
      elif [[ "$ref" == @.agent/* ]]; then
        # @.agent/ → unclear target, warn
        log_warn "@.agent/ reference (ambiguous post-install): $ref in $(basename "$file")" "$file"
        continue
      elif [[ "$ref" == @* ]]; then
        # @domain-xxx/ → relative to skill root (e.g., @ba-execution/...)
        local stripped="${ref#@}"
        resolved_path="$skill_root/$stripped"
      fi

      if [ -n "$resolved_path" ]; then
        if [ -f "$resolved_path" ] || [ -d "$resolved_path" ]; then
          log_pass "$ref → EXISTS (in $(basename "$file"))"
        else
          local rel_file="${file#$ROLES_DIR/}"
          log_fail "BROKEN: $ref → NOT FOUND (in $rel_file)" "$file"
          if $FIX_REPORT; then
            echo -e "    ${YELLOW}Fix: Check if file was renamed/moved. Expected at: $resolved_path${NC}"
          fi
        fi
      fi
    done < <(grep -oE '@[a-zA-Z._-]+/[a-zA-Z0-9/._-]+' <<< "$line" 2>/dev/null || true)
  done < <(grep -rn '@[a-zA-Z._-]*/' "$skill_root" --include="*.md" 2>/dev/null || true)

  # Also check GEMINI.md for @path references
  local gemini="$ROLES_DIR/$role/GEMINI.md"
  if [ -f "$gemini" ]; then
    while IFS= read -r ref; do
      [ -z "$ref" ] && continue
      if [[ "$ref" == @skills/* ]]; then
        local resolved="$ROLES_DIR/$role/skills/${ref#@skills/}"
        if [ -f "$resolved" ] || [ -d "$resolved" ]; then
          log_pass "GEMINI.md: $ref → EXISTS"
        else
          log_fail "GEMINI.md BROKEN: $ref → NOT FOUND" "$gemini"
        fi
      elif [[ "$ref" == @rules/* ]]; then
        local resolved="$ROLES_DIR/$role/rules/${ref#@rules/}"
        if [ -f "$resolved" ] || [ -d "$resolved" ]; then
          log_pass "GEMINI.md: $ref → EXISTS"
        else
          log_fail "GEMINI.md BROKEN: $ref → NOT FOUND" "$gemini"
        fi
      elif [[ "$ref" == @.agent/* ]]; then
        log_warn "GEMINI.md: @.agent/ reference (ambiguous): $ref" "$gemini"
      fi
    done < <(grep -oE '@[a-zA-Z._-]+/[a-zA-Z0-9/._-]+' "$gemini" 2>/dev/null || true)
  fi
}

# ============================================================
# Check 2: GEMINI.md Commands ↔ Skill Files
# ============================================================

check_gemini_commands() {
  local role="$1"
  local gemini="$ROLES_DIR/$role/GEMINI.md"
  local skill_root
  skill_root=$(get_skill_root "$role")
  local prefix
  prefix=$(get_domain_prefix "$role")

  log_subsection "Checking GEMINI.md ↔ skill files..."

  if [ ! -f "$gemini" ]; then
    log_fail "GEMINI.md not found for role $role" "$gemini"
    return
  fi

  # Extract commands from GEMINI.md (pattern: `/makeit:xxx`)
  local commands
  commands=$(grep -oE '/makeit:[a-z-]+' "$gemini" | sort -u)

  for cmd in $commands; do
    local cmd_name="${cmd#/makeit:}"

    # Map command name to expected skill file
    local found=false
    local expected_files=()

    case "$cmd_name" in
      # Stage commands → stage-{name}.md
      clarify|plan-phase|execute-phase|verify-phase|verify-work|complete|discuss-phase|show-phase-approach|research-phase)
        expected_files=("stage-${cmd_name}.md")
        ;;
      start-sprint)
        expected_files=("stage-start-sprint.md")
        ;;
      # Management commands
      add-phase|insert-phase|remove-phase)
        expected_files=("stage-${cmd_name}.md")
        ;;
      # Support commands → direct name
      status|help|decide|estimate|lesson-learned|debug|check-handoff)
        expected_files=("${cmd_name}.md")
        ;;
      # Context commands
      pause-work|resume-work|progress)
        expected_files=("${cmd_name}.md")
        ;;
      # KB commands → shared
      create-doc|search-kb|update-doc|archive-doc)
        # KB skills are in _shared/skills/kb-management/
        expected_files=("${cmd_name}.md")
        if [ -f "$skill_root/_shared/skills/kb-management/${cmd_name}.md" ]; then
          found=true
        fi
        ;;
      # Shared skill commands
      health-check|what-new)
        expected_files=("${cmd_name}.md")
        if [ -f "$skill_root/_shared/skills/${cmd_name}/${cmd_name}.md" ]; then
          found=true
        elif [ -f "$skill_root/_shared/skills/${cmd_name}.md" ]; then
          found=true
        fi
        ;;
      # Unknown commands — try both patterns
      *)
        expected_files=("stage-${cmd_name}.md" "${cmd_name}.md")
        ;;
    esac

    if ! $found; then
      # Search in skill directories (only if expected_files is non-empty)
      if [ ${#expected_files[@]} -gt 0 ]; then
        for expected in "${expected_files[@]}"; do
          if find "$skill_root" -name "$expected" -type f 2>/dev/null | head -1 | grep -q .; then
            found=true
            break
          fi
        done
      fi
    fi

    if $found; then
      log_pass "$cmd → skill file found"
    else
      local expected_display="${expected_files[*]:-unknown}"
      log_fail "$cmd → NO matching skill file (expected: $expected_display)" "$gemini"
      if $FIX_REPORT; then
        echo -e "    ${YELLOW}Fix: Create skill file or remove command from GEMINI.md${NC}"
      fi
    fi
  done
}

# ============================================================
# Check 3: SKILL.md Catalogue ↔ Actual Files
# ============================================================

check_skill_catalogue() {
  local role="$1"
  local skill_root
  skill_root=$(get_skill_root "$role")
  local skill_md="$skill_root/SKILL.md"

  log_subsection "Checking SKILL.md ↔ actual files..."

  if [ ! -f "$skill_md" ]; then
    log_fail "SKILL.md not found" "$skill_md"
    return
  fi

  # Extract skill filenames from SKILL.md (pattern: `stage-xxx.md`, `xxx.md`, `TEMPLATE.md`, etc.)
  local skill_files
  skill_files=$(grep -oE '`[a-zA-Z0-9_-]+\.md`' "$skill_md" | tr -d '`' | sort -u || true)

  if [ -z "$skill_files" ]; then
    log_warn "No skill file references found in SKILL.md" "$skill_md"
    return
  fi

  for skill_file in $skill_files; do
    # Search for the file in skill directories
    if find "$skill_root" -name "$skill_file" -type f 2>/dev/null | head -1 | grep -q .; then
      log_pass "SKILL.md: $skill_file → EXISTS"
    else
      log_fail "SKILL.md: $skill_file → NOT FOUND in skill tree" "$skill_md"
      if $FIX_REPORT; then
        echo -e "    ${YELLOW}Fix: File may have been renamed/moved. Update SKILL.md or create the file${NC}"
      fi
    fi
  done
}

# ============================================================
# Check 4: help.md ↔ GEMINI.md Command Count Sync
# ============================================================

check_help_sync() {
  local role="$1"
  local skill_root
  skill_root=$(get_skill_root "$role")
  local gemini="$ROLES_DIR/$role/GEMINI.md"
  local prefix
  prefix=$(get_domain_prefix "$role")

  log_subsection "Checking help.md ↔ GEMINI.md sync..."

  # Find help.md
  local help_file
  help_file=$(find "$skill_root" -name "help.md" -type f 2>/dev/null | head -1)

  if [ -z "$help_file" ]; then
    log_warn "help.md not found for role $role" ""
    return
  fi

  # Count commands in each
  local gemini_cmds help_cmds
  gemini_cmds=$(grep -cE '/makeit:[a-z-]+' "$gemini" 2>/dev/null | head -1 || echo "0")
  help_cmds=$(grep -cE '/makeit:[a-z-]+' "$help_file" 2>/dev/null | head -1 || echo "0")

  # Get unique command lists
  local gemini_list help_list
  gemini_list=$(grep -oE '/makeit:[a-z-]+' "$gemini" 2>/dev/null | sort -u)
  help_list=$(grep -oE '/makeit:[a-z-]+' "$help_file" 2>/dev/null | sort -u)

  # Find commands in GEMINI.md but not in help.md
  local missing_in_help
  missing_in_help=$(comm -23 <(echo "$gemini_list") <(echo "$help_list"))

  # Find commands in help.md but not in GEMINI.md
  local extra_in_help
  extra_in_help=$(comm -13 <(echo "$gemini_list") <(echo "$help_list"))

  if [ -z "$missing_in_help" ] && [ -z "$extra_in_help" ]; then
    log_pass "help.md and GEMINI.md commands are in sync"
  else
    if [ -n "$missing_in_help" ]; then
      while IFS= read -r cmd; do
        [ -z "$cmd" ] && continue
        log_fail "In GEMINI.md but NOT in help.md: $cmd" "$help_file"
      done <<< "$missing_in_help"
    fi
    if [ -n "$extra_in_help" ]; then
      while IFS= read -r cmd; do
        [ -z "$cmd" ] && continue
        log_warn "In help.md but NOT in GEMINI.md: $cmd" "$help_file"
      done <<< "$extra_in_help"
    fi
  fi
}

# ============================================================
# Check 5: Template References in Skills
# ============================================================

check_template_references() {
  local role="$1"
  local skill_root
  skill_root=$(get_skill_root "$role")

  log_subsection "Checking template references..."

  if [ ! -d "$skill_root" ]; then
    return
  fi

  # Find template references in skill files (pattern: templates/xxx.md or TEMPLATE.md)
  while IFS= read -r line; do
    local file ref
    file=$(echo "$line" | cut -d: -f1)

    # Extract template paths (relative paths containing /templates/)
    while IFS= read -r ref; do
      [ -z "$ref" ] && continue

      # Try to resolve relative to skill root
      local resolved="$skill_root/$ref"
      if [ -f "$resolved" ]; then
        log_pass "Template: $ref → EXISTS (in $(basename "$file"))"
      else
        # Try relative to the file's directory
        local file_dir
        file_dir=$(dirname "$file")
        resolved="$file_dir/$ref"
        if [ -f "$resolved" ]; then
          log_pass "Template: $ref → EXISTS (relative, in $(basename "$file"))"
        else
          local rel_file="${file#$ROLES_DIR/}"
          log_warn "Template ref may be broken: $ref (in $rel_file)" "$file"
        fi
      fi
    done < <(grep -oE '@[a-z-]+/templates/[a-zA-Z0-9/._-]+\.md' <<< "$line" 2>/dev/null || true)
  done < <(grep -rn 'templates/' "$skill_root" --include="*.md" 2>/dev/null || true)
}

# ============================================================
# Check 6: Agent File Existence
# ============================================================

check_agent_files() {
  local role="$1"
  local agents_dir="$ROLES_DIR/$role/agents"
  local gemini="$ROLES_DIR/$role/GEMINI.md"

  log_subsection "Checking agent files..."

  if [ ! -d "$agents_dir" ]; then
    log_warn "No agents/ directory for role $role" "$agents_dir"
    return
  fi

  # Extract agent names from GEMINI.md
  local agents_in_gemini
  agents_in_gemini=$(grep -oE 'makeit-[a-z-]+' "$gemini" 2>/dev/null | grep -vE 'makeit-(ba|dev-be|dev-fe|po|techlead)$' | sort -u)

  for agent_name in $agents_in_gemini; do
    if [ -f "$agents_dir/${agent_name}.md" ]; then
      log_pass "Agent: ${agent_name}.md → EXISTS"
    else
      log_fail "Agent: ${agent_name}.md → NOT FOUND in agents/" "$agents_dir/${agent_name}.md"
      if $FIX_REPORT; then
        echo -e "    ${YELLOW}Fix: Create agent file or update GEMINI.md reference${NC}"
      fi
    fi
  done

  # Check for orphaned agent files (exist but not referenced in GEMINI.md)
  while IFS= read -r agent_file; do
    local agent_basename
    agent_basename=$(basename "$agent_file" .md)
    if ! echo "$agents_in_gemini" | grep -qx "$agent_basename"; then
      log_warn "Orphaned agent file: ${agent_basename}.md (not in GEMINI.md)" "$agent_file"
    fi
  done < <(find "$agents_dir" -name "makeit-*.md" -type f 2>/dev/null)
}

# ============================================================
# Check 7: Workflow Router ↔ Skill Mapping
# ============================================================

check_workflow_routers() {
  local role="$1"
  local router_dir="$ROLES_DIR/$role/workflows/makeit"
  local skill_root
  skill_root=$(get_skill_root "$role")

  log_subsection "Checking workflow routers..."

  if [ ! -d "$router_dir" ]; then
    log_warn "No workflow routers directory for role $role" "$router_dir"
    return
  fi

  # Each router should reference a skill file that exists
  while IFS= read -r router_file; do
    local router_name
    router_name=$(basename "$router_file" .md)

    # Extract skill file reference from router (look for read/invoke pattern)
    local referenced_skill
    referenced_skill=$(grep -oE '@?[a-z-]+/[a-z-]+\.md' "$router_file" 2>/dev/null | head -1 || true)

    if [ -n "$referenced_skill" ]; then
      local resolved="${referenced_skill#@}"
      if [ -f "$skill_root/$resolved" ]; then
        log_pass "Router $router_name → $resolved"
      else
        log_fail "Router $router_name references missing skill: $resolved" "$router_file"
      fi
    fi
  done < <(find "$router_dir" -name "*.md" -type f 2>/dev/null)
}

# ============================================================
# Check 8: Cross-role _shared Consistency
# ============================================================

check_shared_consistency() {
  log_section "CROSS-ROLE" "Shared resources consistency"

  local shared_dir="$ROLES_DIR/_shared"
  if [ ! -d "$shared_dir" ]; then
    log_warn "No _shared directory found" "$shared_dir"
    return
  fi

  # Check that each role's _shared/references/ has the same files
  local ref_files
  ref_files=$(find "$shared_dir" -name "*.md" -type f 2>/dev/null | sort)

  for role in "${ALL_ROLES[@]}"; do
    local skill_root
    skill_root=$(get_skill_root "$role")
    local role_shared="$skill_root/_shared/references"

    if [ ! -d "$role_shared" ]; then
      log_warn "Role $role missing _shared/references/" "$role_shared"
      continue
    fi

    # Compare reference files
    local shared_refs
    shared_refs=$(find "$role_shared" -name "*.md" -type f -exec basename {} \; 2>/dev/null | sort)

    # Check for minimum expected files
    for expected in "quality-gates.md" "sub-agent-spawning.md" "team-workflow.md"; do
      if echo "$shared_refs" | grep -qx "$expected"; then
        log_pass "[$role] _shared/references/$expected → EXISTS"
      else
        log_warn "[$role] _shared/references/$expected → MISSING" "$role_shared/$expected"
      fi
    done
  done
}

# ============================================================
# Check 9: Skill Quality (bonus check)
# ============================================================

check_skill_quality() {
  local role="$1"
  local skill_root
  skill_root=$(get_skill_root "$role")

  log_subsection "Checking skill quality..."

  if [ ! -d "$skill_root" ]; then
    return
  fi

  # Check skill files for minimum content
  while IFS= read -r skill_file; do
    local line_count
    line_count=$(wc -l < "$skill_file" | tr -d ' ')
    local basename_file
    basename_file=$(basename "$skill_file")

    if [ "$line_count" -lt 10 ]; then
      log_warn "Suspiciously small: $basename_file ($line_count lines)" "$skill_file"
    fi

    # Check for frontmatter
    if ! head -1 "$skill_file" | grep -q "^---"; then
      # Only warn for stage/domain skills, not templates or references
      local rel_path="${skill_file#$skill_root/}"
      if [[ "$rel_path" != *"/templates/"* ]] && [[ "$rel_path" != *"/references/"* ]] && [[ "$basename_file" != "SKILL.md" ]]; then
        log_warn "Missing frontmatter: $rel_path" "$skill_file"
      fi
    fi
  done < <(find "$skill_root" -name "*.md" -type f -not -path "*/templates/*" -not -path "*/references/*" -not -name "SKILL.md" 2>/dev/null)
}

# ============================================================
# Main Execution
# ============================================================

main() {
  echo ""
  echo -e "${BOLD}🔍 MakeIt Reference Validator v1.0${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  # Determine which roles to check
  local roles_to_check=()
  if [ -n "$TARGET_ROLE" ]; then
    roles_to_check=("$TARGET_ROLE")
  else
    roles_to_check=("${ALL_ROLES[@]}")
  fi

  # Run checks per role
  for role in "${roles_to_check[@]}"; do
    local role_upper
    role_upper=$(echo "$role" | tr '[:lower:]' '[:upper:]')
    log_section "$role_upper" "Validating role: $role"

    check_at_references "$role"
    check_gemini_commands "$role"
    check_skill_catalogue "$role"
    check_help_sync "$role"
    check_template_references "$role"
    check_agent_files "$role"
    check_workflow_routers "$role"
    check_skill_quality "$role"
  done

  # Cross-role checks (only if checking all roles)
  if [ -z "$TARGET_ROLE" ]; then
    check_shared_consistency
  fi

  # Summary
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "${BOLD}Summary:${NC}"
  echo -e "  Total checks: $TOTAL_CHECKS"
  echo -e "  ${GREEN}Passed: $PASSED${NC}"
  echo -e "  ${RED}Failed: $FAILED${NC}"
  echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"
  echo ""

  if [ $FAILED -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}${BOLD}✅ All references valid!${NC}"
  elif [ $FAILED -eq 0 ]; then
    echo -e "${YELLOW}${BOLD}⚠️  No broken references, but $WARNINGS warnings found${NC}"
  else
    echo -e "${RED}${BOLD}❌ $FAILED broken references found — fix required${NC}"
  fi
  echo ""

  # JSON output
  if $JSON_OUTPUT && [ ${#JSON_ISSUES[@]} -gt 0 ]; then
    echo "{"
    echo "  \"total_checks\": $TOTAL_CHECKS,"
    echo "  \"passed\": $PASSED,"
    echo "  \"failed\": $FAILED,"
    echo "  \"warnings\": $WARNINGS,"
    echo "  \"issues\": ["
    local first=true
    for issue in "${JSON_ISSUES[@]}"; do
      if $first; then
        first=false
      else
        echo ","
      fi
      echo -n "    $issue"
    done
    echo ""
    echo "  ]"
    echo "}"
  fi

  # Exit code
  if [ $FAILED -gt 0 ]; then
    exit 1
  fi
  exit 0
}

main

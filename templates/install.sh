#!/bin/bash

# ============================================================
# 🚀 MakeIt AI Workspace Setup
# Cài đặt AI workspace framework cho team MakeIt
# Usage: bash templates/install.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="$SCRIPT_DIR"

# Kiểm tra đang chạy từ đúng vị trí
if [ ! -d "$TEMPLATES_DIR/roles" ]; then
  echo "❌ Lỗi: Không tìm thấy thư mục templates/roles/"
  echo "   Hãy chạy script từ root của repo makeit-framework:"
  echo "   bash templates/install.sh"
  exit 1
fi

# ============================================================
# Functions
# ============================================================

show_banner() {
  echo ""
  echo "╔══════════════════════════════════════════════╗"
  echo "║     🚀 MakeIt AI Workspace Setup            ║"
  echo "║     Cài đặt AI assistant theo role của bạn   ║"
  echo "╚══════════════════════════════════════════════╝"
  echo ""
}

select_role() {
  echo "Chọn role của bạn:"
  echo ""
  echo "  1) PO        — Product Owner"
  echo "  2) BA        — Business Analyst"
  echo "  3) Designer  — UI/UX Designer"
  echo "  4) Techlead  — Tech Lead"
  echo "  5) Dev FE    — Frontend Developer"
  echo "  6) Dev BE    — Backend Developer"
  echo ""

  while true; do
    read -rp "Nhập số (1-6): " choice
    case $choice in
      1) role="po"; role_display="Product Owner (PO)"; role_skill="makeit-po" ;;
      2) role="ba"; role_display="Business Analyst (BA)"; role_skill="makeit-ba" ;;
      3) role="designer"; role_display="Designer"; role_skill="makeit-designer" ;;
      4) role="techlead"; role_display="Tech Lead"; role_skill="makeit-techlead" ;;
      5) role="dev-fe"; role_display="Frontend Developer (Dev FE)"; role_skill="makeit-dev-fe" ;;
      6) role="dev-be"; role_display="Backend Developer (Dev BE)"; role_skill="makeit-dev-be" ;;
      *)
        echo "❌ Lựa chọn không hợp lệ. Vui lòng nhập số từ 1 đến 6."
        continue
        ;;
    esac
    break
  done

  echo ""
  echo "✅ Role: $role_display"
  echo ""
}

ask_product_name() {
  echo "Tên sản phẩm (project) bạn đang phát triển:"
  echo ""
  read -rp "  Tên sản phẩm: " product_name
  product_name="${product_name:-My Product}"
  echo ""
  echo "✅ Sản phẩm: $product_name"
  echo ""
}

install_role() {
  local target_dir="$1"
  local role_dir="$TEMPLATES_DIR/roles/$role"

  echo "📦 Đang cài đặt MakeIt AI Workspace..."
  echo ""

  # Step 1: Copy GEMINI.md per role (with product name filled)
  echo "  [1/9] Copy GEMINI.md cho role $role..."
  if [ -f "$role_dir/GEMINI.md" ]; then
    sed "s/\[Tên sản phẩm — cập nhật khi install\]/$product_name/g" \
      "$role_dir/GEMINI.md" > "$target_dir/GEMINI.md"
    echo "       Sản phẩm: $product_name"
  else
    echo "  ⚠️  GEMINI.md chưa có cho role $role"
  fi

  # Step 2: Create .agent directory structure
  echo "  [2/9] Tạo cấu trúc .agent/..."
  mkdir -p "$target_dir/.agent/skills"
  mkdir -p "$target_dir/.agent/workflows"
  mkdir -p "$target_dir/.agent/rules"
  mkdir -p "$target_dir/.agent/agents"

  # Step 3: Copy multi-domain skill folders (recursive)
  echo "  [3/9] Copy skill domains ($role_skill/)..."
  if [ -d "$role_dir/skills/$role_skill" ]; then
    cp -r "$role_dir/skills/$role_skill" "$target_dir/.agent/skills/$role_skill"
    echo "       Copied: SKILL.md + domain folders"
  else
    echo "  ⚠️  Skills folder chưa có cho role $role"
  fi

  # Step 4: Copy per-role workflow routers (Phase 4.5 — each role has own routers)
  echo "  [4/9] Copy workflows (per-role routers)..."
  if [ -d "$role_dir/workflows/makeit" ]; then
    mkdir -p "$target_dir/.agent/workflows/makeit"
    cp -r "$role_dir/workflows/makeit/"* "$target_dir/.agent/workflows/makeit/" 2>/dev/null || true
  else
    echo "  ⚠️  Workflows folder chưa có cho role $role"
  fi

  # Step 5: Copy rules (universal + per-role)
  echo "  [5/9] Copy rules..."
  if [ -d "$role_dir/rules" ]; then
    cp "$role_dir/rules/"*.md "$target_dir/.agent/rules/" 2>/dev/null || true
  fi

  # Step 6: Copy templates (Category C shared docs + per-role sprint templates)
  echo "  [6/9] Copy templates..."
  mkdir -p "$target_dir/.makeit/templates"

  # 6a: Category C framework docs from _shared/ (excluding legacy task-template)
  if [ -d "$TEMPLATES_DIR/roles/_shared" ]; then
    for f in "$TEMPLATES_DIR/roles/_shared/"*.md; do
      [ -f "$f" ] || continue
      [[ "$(basename "$f")" == "task-template.md" ]] && continue
      cp "$f" "$target_dir/.makeit/templates/"
    done
  fi

  # 6b: Sprint lifecycle templates from per-role discovery/templates/
  # (Phase 4.8 — templates are now per-role, not shared)
  local discovery_dir
  case "$role" in
    ba) discovery_dir="$role_dir/skills/$role_skill/ba-discovery/templates" ;;
    techlead) discovery_dir="$role_dir/skills/$role_skill/tl-discovery/templates" ;;
    dev-fe) discovery_dir="$role_dir/skills/$role_skill/fe-discovery/templates" ;;
    dev-be) discovery_dir="$role_dir/skills/$role_skill/be-discovery/templates" ;;
    po) discovery_dir="$role_dir/skills/$role_skill/po-discovery/templates" ;;
    designer) discovery_dir="" ;; # Designer has no sprint lifecycle templates
  esac
  if [ -n "$discovery_dir" ] && [ -d "$discovery_dir" ]; then
    cp "$discovery_dir/"*.md "$target_dir/.makeit/templates/" 2>/dev/null || true
    echo "       Sprint templates: copied from per-role discovery/templates/"
  fi

  # Step 7: Copy role-specific agent definitions (orchestrator + sub-agents)
  echo "  [7/9] Copy agent definitions ($role)..."
  if [ -d "$role_dir/agents" ]; then
    cp "$role_dir/agents/"*.md "$target_dir/.agent/agents/" 2>/dev/null || true
    local agent_count
    agent_count=$(ls -1 "$role_dir/agents/"*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "       Copied: $agent_count agent definitions"
  else
    echo "  ⚠️  Agent definitions chưa có cho role $role"
  fi

  # Step 7b: Copy shared agents (Document Agent — used by KB commands)
  if [ -d "$TEMPLATES_DIR/roles/_shared/agents" ]; then
    cp "$TEMPLATES_DIR/roles/_shared/agents/"*.md "$target_dir/.agent/agents/" 2>/dev/null || true
    echo "       + shared agents (Document Agent)"
  fi

  # Step 7c: Copy shared skills (health-check, kb-management, whats-new)
  if [ -d "$TEMPLATES_DIR/roles/_shared/skills" ]; then
    cp -r "$TEMPLATES_DIR/roles/_shared/skills/"* "$target_dir/.agent/skills/" 2>/dev/null || true
    local shared_skill_count
    shared_skill_count=$(find "$TEMPLATES_DIR/roles/_shared/skills" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
    echo "       + $shared_skill_count shared skill folders (health-check, kb-management, whats-new)"
  fi

  # Step 7d: Copy shared knowledge templates into role skill's _shared/ directory
  # KB commands (create-doc, update-doc) reference @_shared/knowledge/INDEX-TEMPLATE.md
  if [ -d "$TEMPLATES_DIR/roles/_shared/knowledge" ]; then
    mkdir -p "$target_dir/.agent/skills/$role_skill/_shared/knowledge"
    cp -r "$TEMPLATES_DIR/roles/_shared/knowledge/"* "$target_dir/.agent/skills/$role_skill/_shared/knowledge/" 2>/dev/null || true
    echo "       + _shared/knowledge/ templates (INDEX-TEMPLATE, conventions)"
  fi

  # Step 8: Save framework version + blueprint path for update tracking (renumbered)
  if [ -f "$TEMPLATES_DIR/VERSION" ]; then
    cp "$TEMPLATES_DIR/VERSION" "$target_dir/.makeit/FRAMEWORK-VERSION"
    # Save blueprint repo root for check-update script
    echo "$(cd "$TEMPLATES_DIR/.." && pwd)" > "$target_dir/.makeit/BLUEPRINT-PATH"
    echo "  [✓] Framework version: $(cat "$TEMPLATES_DIR/VERSION" | tr -d '[:space:]')"
  fi

  # Step 9: Copy check-update script (renumbered)
  local script_dir="$(cd "$TEMPLATES_DIR/.." && pwd)/scripts"
  if [ -f "$script_dir/check-update.sh" ]; then
    mkdir -p "$target_dir/.makeit/scripts"
    cp "$script_dir/check-update.sh" "$target_dir/.makeit/scripts/check-update.sh"
    chmod +x "$target_dir/.makeit/scripts/check-update.sh"
    echo "  [✓] Update checker: .makeit/scripts/check-update.sh"
  fi
}

setup_makeit_dir() {
  local target_dir="$1"

  # Create sprint workspace directory (Phase 4.4)
  mkdir -p "$target_dir/.makeit/sprint"

  # Knowledge Base (Phase 4.9 + 0.6.0: added product/)
  mkdir -p "$target_dir/.makeit/knowledge/architecture"
  mkdir -p "$target_dir/.makeit/knowledge/business"
  mkdir -p "$target_dir/.makeit/knowledge/product"
  mkdir -p "$target_dir/.makeit/knowledge/technical"
  mkdir -p "$target_dir/.makeit/knowledge/operational"
  mkdir -p "$target_dir/.makeit/knowledge/_archived"

  # Knowledge templates (shared across roles)
  cp -r "$TEMPLATES_DIR/roles/_shared/knowledge/" "$target_dir/.makeit/knowledge/_templates/"

  # Copy shared product knowledge docs from blueprint (if available)
  local blueprint_root
  blueprint_root="$(cd "$TEMPLATES_DIR/.." && pwd)"
  if [ -d "$blueprint_root/.makeit/knowledge/product" ]; then
    cp "$blueprint_root/.makeit/knowledge/product/"*.md "$target_dir/.makeit/knowledge/product/" 2>/dev/null || true
    echo "       Knowledge: copied shared product docs from blueprint"
  fi
  if [ -f "$blueprint_root/.makeit/knowledge/INDEX.md" ]; then
    cp "$blueprint_root/.makeit/knowledge/INDEX.md" "$target_dir/.makeit/knowledge/INDEX.md"
    echo "       Knowledge: copied INDEX.md from blueprint"
  fi

  # Copy config template with role pre-filled
  if [ -f "$TEMPLATES_DIR/roles/_shared/config-template.md" ]; then
    sed "s/\[ROLE\]/$role/g" "$TEMPLATES_DIR/roles/_shared/config-template.md" \
      > "$target_dir/.makeit/config.md" 2>/dev/null || \
    cp "$TEMPLATES_DIR/roles/_shared/config-template.md" "$target_dir/.makeit/config.md"
  fi
}

verify_installation() {
  local target_dir="$1"
  local errors=0

  echo ""
  echo "🔍 Verifying installation..."

  # Check GEMINI.md
  if [ -f "$target_dir/GEMINI.md" ]; then
    echo "  ✅ GEMINI.md"
  else
    echo "  ❌ GEMINI.md missing"; errors=$((errors + 1))
  fi

  # Check skill hub
  if [ -f "$target_dir/.agent/skills/$role_skill/SKILL.md" ]; then
    echo "  ✅ Skill hub: $role_skill/SKILL.md"
  else
    echo "  ❌ Skill hub missing"; errors=$((errors + 1))
  fi

  # Check domain folders exist
  local domain_count
  domain_count=$(find "$target_dir/.agent/skills/$role_skill" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
  if [ "$domain_count" -ge 2 ]; then
    echo "  ✅ Domain folders: $domain_count found"
  else
    echo "  ❌ Domain folders: only $domain_count found (expected ≥2)"; errors=$((errors + 1))
  fi

  # Check workflows
  local workflow_count
  workflow_count=$(find "$target_dir/.agent/workflows/makeit" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$workflow_count" -ge 5 ]; then
    echo "  ✅ Workflows: $workflow_count files"
  else
    echo "  ❌ Workflows: only $workflow_count files (expected ≥5)"; errors=$((errors + 1))
  fi

  # Check rules
  local rule_count
  rule_count=$(find "$target_dir/.agent/rules" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$rule_count" -ge 2 ]; then
    echo "  ✅ Rules: $rule_count files"
  else
    echo "  ❌ Rules: only $rule_count files (expected ≥2)"; errors=$((errors + 1))
  fi

  # Check .makeit dir
  if [ -d "$target_dir/.makeit/sprint" ]; then
    echo "  ✅ Sprint directory: .makeit/sprint/"
  else
    echo "  ❌ Sprint directory missing"; errors=$((errors + 1))
  fi

  # Check agent definitions
  local agent_count
  agent_count=$(find "$target_dir/.agent/agents" -name "makeit-*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$agent_count" -ge 1 ]; then
    echo "  ✅ Agent definitions: $agent_count files"
    # Verify Document Agent specifically
    if [ -f "$target_dir/.agent/agents/makeit-document-agent.md" ]; then
      echo "  ✅ Document Agent: installed (KB commands available)"
    else
      echo "  ⚠️  Document Agent missing (KB create-doc/update-doc unavailable)"
    fi
  else
    echo "  ⚠️  Agent definitions: none found (Mini-GSD orchestration unavailable)"
  fi

  # Check shared skills
  local shared_skill_ok=0
  for sk in health-check kb-management whats-new; do
    if [ -d "$target_dir/.agent/skills/$sk" ]; then
      shared_skill_ok=$((shared_skill_ok + 1))
    fi
  done
  if [ "$shared_skill_ok" -ge 3 ]; then
    echo "  ✅ Shared skills: $shared_skill_ok/3 (health-check, kb-management, whats-new)"
  else
    echo "  ⚠️  Shared skills: only $shared_skill_ok/3 found"
  fi

  # Check per-role stage skills (Phase 4.5 — stage skills are per-role now)
  local stage_count
  stage_count=$(find "$target_dir/.agent/skills/$role_skill" -name "stage-*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$stage_count" -ge 6 ]; then
    echo "  ✅ Stage skills: $stage_count files (per-role)"
  else
    echo "  ⚠️  Stage skills: only $stage_count found (expected ≥6)"
  fi

  # Check sprint directory (Phase 4.4)
  if [ -d "$target_dir/.makeit/sprint" ]; then
    echo "  ✅ Sprint directory: .makeit/sprint/"
  else
    echo "  ⚠️  Sprint directory missing"
  fi

  # Check sprint templates (Phase 4.8 — per-role templates)
  local template_count
  template_count=$(find "$target_dir/.makeit/templates" -name "*TEMPLATE*" -o -name "*SNAPSHOT*" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$template_count" -ge 4 ]; then
    echo "  ✅ Sprint templates: $template_count files (per-role)"
  else
    echo "  ⚠️  Sprint templates: only $template_count found (expected ≥4)"
  fi

  # Check knowledge directory (Phase 4.9 + 0.6.0)
  if [ -d "$target_dir/.makeit/knowledge/architecture" ] && [ -d "$target_dir/.makeit/knowledge/product" ] && [ -d "$target_dir/.makeit/knowledge/_templates" ]; then
    echo "  ✅ Knowledge base: .makeit/knowledge/ (5 categories + _templates)"
  else
    echo "  ⚠️  Knowledge base directory incomplete"
  fi

  # Check knowledge templates in skill directory (used by KB commands)
  if [ -f "$target_dir/.agent/skills/$role_skill/_shared/knowledge/INDEX-TEMPLATE.md" ]; then
    echo "  ✅ KB templates: _shared/knowledge/INDEX-TEMPLATE.md"
  else
    echo "  ⚠️  KB templates missing in skill directory (create-doc/update-doc may fail)"
  fi

  # Check product knowledge docs
  local product_doc_count
  product_doc_count=$(find "$target_dir/.makeit/knowledge/product" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$product_doc_count" -ge 1 ]; then
    echo "  ✅ Product knowledge: $product_doc_count docs"
  else
    echo "  ⚠️  Product knowledge: no docs found in .makeit/knowledge/product/"
  fi
}

show_summary() {
  local target_dir="$1"

  echo ""
  echo "╔══════════════════════════════════════════════╗"
  echo "║  ✅ Installed MakeIt AI Workspace            ║"
  echo "║  Role: $(printf '%-36s' "$role_display")║"
  echo "╚══════════════════════════════════════════════╝"
  echo ""
  echo "📁 Files installed to: $(cd "$target_dir" && pwd)"
  echo ""
  echo "📋 What was installed:"
  echo "   • GEMINI.md                    — AI workspace config cho $role_display"
  echo "   • .agent/skills/$role_skill/   — GSD-aligned skill hub + domain folders"
  echo "   • .agent/skills/{shared}/      — health-check, kb-management, whats-new"
  echo "   • .agent/workflows/makeit/     — Per-role workflow routers (/makeit:xxx)"
  echo "   • .agent/rules/               — Universal + per-role rules"
  echo "   • .agent/agents/              — Sub-agents + Document Agent (shared)"
  echo "   • .makeit/sprint/             — Sprint workspace directory"
  echo "   • .makeit/templates/           — Sprint lifecycle templates"
  echo "   • .makeit/knowledge/           — Knowledge base (5 categories + templates + shared docs)"
  echo ""
  echo "🚀 Next steps:"
  echo "   1. Mở project trong IDE (Antigravity, Cursor, Windsurf, etc.)"
  echo "   2. Thử slash command: /makeit:help"
  echo "   3. Bắt đầu task: /makeit:status"
  echo ""
}

install_hitl_addon() {
  local target_dir="$1"
  local addon_dir="$TEMPLATES_DIR/addons/hitl"

  if [ ! -d "$addon_dir" ]; then
    echo "  ⚠️  HITL addon not found at $addon_dir"
    return 1
  fi

  echo ""
  echo "📦 Installing HITL addon..."
  echo ""

  # 1. Copy rule file
  echo "  [1/3] Copy spawn rule..."
  cp "$addon_dir/rules/spawn-sub-agents.md" "$target_dir/.agent/rules/spawn-sub-agents.md"

  # 2. Copy templates to skill directory
  echo "  [2/3] Copy HITL templates..."
  mkdir -p "$target_dir/.agent/skills/hitl"
  cp -r "$addon_dir/templates/"* "$target_dir/.agent/skills/hitl/"

  # 3. Verify
  echo "  [3/3] Verifying..."
  local ok=0
  [ -f "$target_dir/.agent/rules/spawn-sub-agents.md" ] && ok=$((ok + 1))
  [ -f "$target_dir/.agent/skills/hitl/README.md" ] && ok=$((ok + 1))
  [ -f "$target_dir/.agent/skills/hitl/spawn-prompt.md" ] && ok=$((ok + 1))

  if [ "$ok" -ge 3 ]; then
    echo ""
    echo "  ✅ HITL addon installed successfully!"
    echo ""
    echo "  📋 What was added:"
    echo "     • .agent/rules/spawn-sub-agents.md   — Auto-triggered spawn rule"
    echo "     • .agent/skills/hitl/                — Templates, examples, state schema"
    echo ""
    echo "  💡 How it works:"
    echo "     When a workflow needs parallel agents, the orchestrator creates"
    echo "     spawn prompt files. Open each file in a new Antigravity session,"
    echo "     let the agent work, then return to the main session."
    echo ""
  else
    echo "  ⚠️  HITL addon partially installed ($ok/3 files verified)"
  fi
}

prompt_hitl_addon() {
  local target_dir="$1"

  echo "╔══════════════════════════════════════════════╗"
  echo "║  📦 Optional: Human-in-the-Loop (HITL)      ║"
  echo "║  Spawn sub-agents in Antigravity IDE        ║"
  echo "║  ⭐ Recommended for Antigravity users        ║"
  echo "╚══════════════════════════════════════════════╝"
  echo ""
  echo "  HITL cho phép:"
  echo "   • Orchestrator tạo spawn prompts tự động"
  echo "   • Copy prompt sang session mới → chạy parallel agents"
  echo "   • State tracking across sessions"
  echo ""

  while true; do
    read -rp "  Install HITL addon? (Y/n): " hitl_choice
    hitl_choice="${hitl_choice:-Y}"
    case "$hitl_choice" in
      [Yy]|[Yy][Ee][Ss])
        install_hitl_addon "$target_dir"
        break
        ;;
      [Nn]|[Nn][Oo])
        echo ""
        echo "  ⏩ Skipped HITL addon. You can install it later by running:"
        echo "     bash templates/install.sh --addon hitl"
        echo ""
        break
        ;;
      *)
        echo "  Please enter Y or N."
        ;;
    esac
  done
}

setup_serena_mcp() {
  local target_dir="$1"
  local abs_target
  abs_target="$(cd "$target_dir" && pwd)"

  echo ""
  echo "╔══════════════════════════════════════════════════════════════╗"
  echo "║  🧩 Optional: Serena MCP — Symbol-level Code Intelligence  ║"
  echo "╚══════════════════════════════════════════════════════════════╝"
  echo ""

  # Role-specific description
  case "$role" in
    techlead)
      echo "  📌 Recommended cho Techlead"
      echo ""
      echo "  Serena cung cấp IDE-like semantic tools cho AI agent:"
      echo "   • Impact Analysis khi code review — trace xem thay đổi ảnh hưởng đâu"
      echo "   • Symbol search — tìm functions, classes, references across codebase"
      echo "   • Enhanced codebase mapping — dependency graph ở symbol level"
      echo ""
      echo "  → Agent sẽ tự dùng khi review PR (Stage 5) và map codebase."
      ;;
    dev-fe|dev-be)
      echo "  📌 Recommended cho Developer"
      echo ""
      echo "  Serena cung cấp IDE-like semantic tools cho AI agent:"
      echo "   • Code navigation — find symbols, jump to definition, trace references"
      echo "   • Refactoring support — rename across codebase, find all usages"
      echo "   • Hover info — xem type signatures, documentation tại symbol"
      echo ""
      echo "  → Agent sẽ tự dùng khi implement code (Stage 4)."
      ;;
  esac

  echo ""
  echo "  ⚙️  Yêu cầu: uv (Python package manager)"
  echo "  💡 Optional: Framework hoạt động 100% bình thường không có Serena."
  echo ""

  while true; do
    read -rp "  Setup Serena MCP? (y/N): " serena_choice
    serena_choice="${serena_choice:-N}"
    case "$serena_choice" in
      [Yy]|[Yy][Ee][Ss]) break ;;
      [Nn]|[Nn][Oo])
        echo ""
        echo "  ⏭️  Skipped. Có thể setup sau bằng serena-workspace skill."
        echo ""
        return 0
        ;;
      *)
        echo "  Nhập Y hoặc N."
        ;;
    esac
  done

  echo ""
  echo "  ── Step 1/5: Kiểm tra Python ──"
  if command -v python3 &> /dev/null; then
    local py_version
    py_version=$(python3 --version 2>&1 | awk '{print $2}')
    echo "  ✅ Python $py_version"
  elif command -v python &> /dev/null; then
    local py_version
    py_version=$(python --version 2>&1 | awk '{print $2}')
    echo "  ✅ Python $py_version"
  else
    echo "  ❌ Python chưa cài. Serena cần Python 3.10+."
    echo "     Cài Python: https://www.python.org/downloads/"
    echo "     Sau khi cài xong, chạy lại install hoặc dùng serena-workspace skill."
    echo ""
    return 0
  fi

  echo ""
  echo "  ── Step 2/5: Kiểm tra uv ──"
  if command -v uv &> /dev/null; then
    local uv_version
    uv_version=$(uv --version 2>&1 | head -1)
    echo "  ✅ $uv_version"
  else
    echo "  ❌ uv chưa cài."
    echo ""
    read -rp "  Cài uv ngay bây giờ? (Y/n): " install_uv
    install_uv="${install_uv:-Y}"
    if [[ "$install_uv" =~ ^[Yy] ]]; then
      echo "  📦 Đang cài uv..."
      if curl -LsSf https://astral.sh/uv/install.sh | sh 2>&1 | tail -3; then
        # Source shell profile to get uv in PATH
        export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
        if command -v uv &> /dev/null; then
          echo "  ✅ uv installed: $(uv --version 2>&1 | head -1)"
        else
          echo "  ⚠️  uv đã cài nhưng chưa có trong PATH."
          echo "     Mở terminal mới hoặc chạy: source ~/.bashrc (hoặc ~/.zshrc)"
          echo "     Sau đó dùng serena-workspace skill để hoàn tất setup."
          echo ""
          return 0
        fi
      else
        echo "  ❌ Không thể cài uv. Cài manual: https://docs.astral.sh/uv/"
        echo ""
        return 0
      fi
    else
      echo "  ⏭️  Skipped. Cài uv trước rồi dùng serena-workspace skill."
      echo ""
      return 0
    fi
  fi

  echo ""
  echo "  ── Step 3/5: Pre-download Serena ──"
  if command -v uvx &> /dev/null; then
    echo "  📦 Đang download Serena (lần đầu có thể mất 30-60s)..."
    if uvx --from git+https://github.com/AbanteAI/serena serena --help &> /dev/null; then
      echo "  ✅ Serena downloaded và cached thành công"
    else
      echo "  ⚠️  Download chưa thành công. Agent sẽ tự retry khi kết nối MCP."
    fi
  else
    echo "  ⚠️  uvx không tìm thấy. Serena sẽ được download khi IDE kết nối MCP."
  fi

  echo ""
  echo "  ── Step 4/5: Tạo MCP config ──"
  if [ -f "$TEMPLATES_DIR/mcp/serena-mcp.json" ]; then
    # Generate config with real project path
    local config_content
    config_content=$(sed "s|<PROJECT_PATH>|$abs_target|g" "$TEMPLATES_DIR/mcp/serena-mcp.json")

    # Save to target directory for reference
    mkdir -p "$target_dir/.makeit"
    echo "$config_content" > "$target_dir/.makeit/serena-mcp.json"

    echo "  ✅ Config tạo tại: .makeit/serena-mcp.json"
    echo ""
    echo "  📋 Copy nội dung dưới đây vào MCP settings của IDE:"
    echo ""
    echo "  ┌────────────────────────────────────────────────"
    echo "$config_content" | sed 's/^/  │ /'
    echo "  └────────────────────────────────────────────────"
    echo ""
    echo "  💡 Cách thêm vào IDE:"
    echo "     Antigravity/Cursor: Settings → MCP Servers → paste config vào"
    echo "     Windsurf: .windsurf/mcp_config.json"
  else
    echo "  ⚠️  Template serena-mcp.json không tìm thấy."
  fi

  echo ""
  echo "  ── Step 5/5: Tạo Serena project config ──"

  # Auto-detect languages
  local detected_langs=""
  [ -f "$target_dir/tsconfig.json" ] || [ -f "$target_dir/package.json" ] && detected_langs="${detected_langs}  - typescript\n"
  [ -f "$target_dir/pyproject.toml" ] || [ -f "$target_dir/requirements.txt" ] && detected_langs="${detected_langs}  - python\n"
  [ -f "$target_dir/go.mod" ] && detected_langs="${detected_langs}  - go\n"
  [ -f "$target_dir/Cargo.toml" ] && detected_langs="${detected_langs}  - rust\n"
  [ -f "$target_dir/pom.xml" ] || [ -f "$target_dir/build.gradle" ] && detected_langs="${detected_langs}  - java\n"

  if [ -z "$detected_langs" ]; then
    detected_langs="  - typescript  # Update với ngôn ngữ project của bạn\n"
    echo "  ⚠️  Không detect được ngôn ngữ — default: typescript"
  else
    echo "  🔍 Detected languages: $(echo -e "$detected_langs" | sed 's/  - //g' | tr '\n' ' ')"
  fi

  local project_name
  project_name=$(basename "$abs_target")

  mkdir -p "$target_dir/.serena"
  cat > "$target_dir/.serena/project.yml" << SERENA_EOF
project_name: $project_name
languages:
$(echo -e "$detected_langs")exclude_patterns:
  - node_modules
  - .next
  - dist
  - build
  - .git
  - __pycache__
  - .makeit
  - .planning
SERENA_EOF

  echo "  ✅ Created: .serena/project.yml"

  # Summary
  echo ""
  echo "  ╔══════════════════════════════════════════════════╗"
  echo "  ║  ✅ Serena MCP Setup Complete                   ║"
  echo "  ╚══════════════════════════════════════════════════╝"
  echo ""
  echo "  📁 Files tạo:"
  echo "     • .makeit/serena-mcp.json    — MCP config (copy vào IDE)"
  echo "     • .serena/project.yml        — Serena project config"
  echo ""
  echo "  🚀 Bước tiếp theo:"
  echo "     1. Copy MCP config (ở trên) vào IDE settings"
  echo "     2. Restart IDE để kết nối Serena MCP"
  echo "     3. Agent sẽ TỰ ĐỘNG detect và dùng Serena khi cần"
  echo ""
  echo "  📖 Chi tiết: wiki/integrations/serena-mcp.md"
  echo ""
}

# ============================================================
# Main
# ============================================================

show_banner
select_role
ask_product_name

# Target directory
read -rp "Target workspace directory (default: ./): " target_dir
target_dir="${target_dir:-.}"

# Tạo target directory nếu chưa tồn tại
if [ ! -d "$target_dir" ]; then
  echo "📁 Tạo thư mục: $target_dir"
  mkdir -p "$target_dir"
fi

# Execute installation
install_role "$target_dir"
setup_makeit_dir "$target_dir"
verify_installation "$target_dir"
show_summary "$target_dir"

# Optional addon: HITL (post-install prompt)
if [ -d "$TEMPLATES_DIR/addons/hitl" ]; then
  prompt_hitl_addon "$target_dir"
fi

# ─── Serena MCP (Optional — Code Intelligence) ───
# Only offer for coding roles (TL, Dev FE, Dev BE)
if [[ "$role" == "techlead" || "$role" == "dev-fe" || "$role" == "dev-be" ]]; then
  setup_serena_mcp "$target_dir"
fi


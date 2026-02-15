#!/bin/bash
# ============================================================
# Sync MakeIt Framework → Public Repo
# Copies only distribution-relevant files
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET_DIR="${1:-$SOURCE_DIR/../makeit-framework}"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  📦 MakeIt Framework — Sync to Public Repo  ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Source: $SOURCE_DIR"
echo "  Target: $TARGET_DIR"
echo ""

# ============================================================
# Create target directory
# ============================================================

if [ ! -d "$TARGET_DIR" ]; then
  echo "📁 Creating target directory..."
  mkdir -p "$TARGET_DIR"
fi

# ============================================================
# Sync files
# ============================================================

echo "📋 Syncing files..."

# 1. Root files
echo "  [1/6] Root files..."
cp "$SOURCE_DIR/README.md" "$TARGET_DIR/"
cp "$SOURCE_DIR/vercel.json" "$TARGET_DIR/"
[ -f "$SOURCE_DIR/LICENSE" ] && cp "$SOURCE_DIR/LICENSE" "$TARGET_DIR/"

# 2. Banner/docs assets
echo "  [2/6] Documentation assets..."
mkdir -p "$TARGET_DIR/docs/assets"
if [ -d "$SOURCE_DIR/docs/assets" ]; then
  cp "$SOURCE_DIR/docs/assets/"* "$TARGET_DIR/docs/assets/" 2>/dev/null || true
fi

# 3. Templates (full directory)
echo "  [3/6] Templates (installer + roles + addons)..."
rsync -a --delete \
  --exclude='__pycache__' \
  --exclude='.DS_Store' \
  "$SOURCE_DIR/templates/" "$TARGET_DIR/templates/"

# 4. Wiki (full directory)
echo "  [4/6] Wiki documentation..."
rsync -a --delete \
  --exclude='.DS_Store' \
  "$SOURCE_DIR/wiki/" "$TARGET_DIR/wiki/"

# 5. Web UI (docs directory — exclude node_modules, dist, content symlink)
echo "  [5/6] Web UI (docs/)..."
rsync -a --delete \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.tanstack' \
  --exclude='/content' \
  --exclude='.DS_Store' \
  "$SOURCE_DIR/makeit-framework-webui/" "$TARGET_DIR/docs/"

# 6. .gitignore for public repo
echo "  [6/6] Gitignore..."
cat > "$TARGET_DIR/.gitignore" << 'GITIGNORE'
# Dependencies
node_modules/
.pnpm-debug.log

# Build output
docs/dist/
docs/content/
docs/.tanstack/

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
*.swp
*.swo

# Environment
.env
.env.local
GITIGNORE

# ============================================================
# Verify
# ============================================================

echo ""
echo "✅ Sync complete!"
echo ""
echo "📁 Structure:"
echo ""
find "$TARGET_DIR" -maxdepth 2 -not -path '*/node_modules/*' -not -path '*/.git/*' -not -name '.DS_Store' | head -30
echo "  ..."
echo ""

# ============================================================
# Git init if new repo
# ============================================================

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo "🔧 Initializing git repo..."
  cd "$TARGET_DIR"
  git init
  git add -A
  git commit -m "feat: initial MakeIt Framework release v0.5.0

AI-Augmented Team Operations Framework
- 5 roles: PO, BA, Techlead, Dev FE, Dev BE
- Sprint lifecycle with 9 stage commands
- Knowledge Base for product memory
- HITL addon for Antigravity sub-agent spawning
- Wiki documentation with web UI
- One-click installer (bash templates/install.sh)"
  echo ""
  echo "✅ Git repo initialized with initial commit"
fi

echo ""
echo "🚀 Next steps:"
echo "   1. cd $TARGET_DIR"
echo "   2. gh repo create pham-anhh/makeit-framework --public --source=. --push"
echo "      (hoặc tạo repo trên GitHub.com rồi push manually)"
echo "   3. Import project trên Vercel → connect GitHub repo"
echo ""

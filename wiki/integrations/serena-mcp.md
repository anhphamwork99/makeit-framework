# Serena MCP Integration

> 🔮 Optional enhancement — framework hoạt động 100% không cần Serena

## Overview

Serena MCP cung cấp symbol-level code intelligence cho coding agents trong MakeIt Workspace. Thay vì chỉ "đọc file", agents có thể hiểu code ở mức semantic — tìm symbols, trace references, rename across codebase.

Serena sử dụng LSP (Language Server Protocol) backends để phân tích code, tương tự như IDE features (Go to Definition, Find References) nhưng cho AI agents.

## Who Benefits?

| Role | Benefit | How |
|------|---------|-----|
| **Techlead** | Impact analysis in code review | `find_referencing_symbols` traces change consumers |
| **Dev FE** | Semantic code navigation | `find_symbol`, `rename_symbol` for refactoring |
| **Dev BE** | Cross-module reference tracking | `find_referencing_symbols` for API consumers |
| PO, BA, Designer | N/A | Not applicable — non-coding roles |

## Setup

### Cách 1: Qua Install Script (Recommended)

Khi chạy `bash templates/install.sh` và chọn role **Techlead**, **Dev FE**, hoặc **Dev BE**, script sẽ hỏi setup Serena MCP với:

- Auto-detect Python và uv
- Cài uv nếu chưa có
- Pre-download Serena
- Tạo `.makeit/serena-mcp.json` với project path thật
- Tạo `.serena/project.yml` với auto-detected languages

> Chỉ cần copy MCP config vào IDE settings → restart → done!

### Cách 2: Manual Setup

#### Prerequisites

- `uv` installed: `curl -LsSf https://astral.sh/uv/install.sh | sh`

#### Steps

1. Copy `templates/mcp/serena-mcp.json` to your IDE's MCP config
2. Update `<PROJECT_PATH>` with your project root
3. Create `.serena/project.yml` (see Configuration section below)
4. Restart IDE

### Detailed Guide

See `.agent/skills/serena-workspace/workflows/setup.md` for step-by-step including:
- uv installation verification
- Serena MCP config setup
- Project configuration (`.serena/project.yml`)
- Language detection and indexing
- Verification with `find_symbol` test

## Features

### 1. Symbol-level Code Intelligence

- `find_symbol` — Search by function/class/type name
- `find_referencing_symbols` — Who calls this function?
- `rename_symbol` — Rename across entire codebase
- `get_symbols_overview` — Module export catalog

### 2. Memory Bridge (KB → Serena)

- Syncs MakeIt knowledge docs to Serena memories
- One-way: KB is source of truth
- Run: serena-workspace → sync-memories workflow

### 3. Enhanced Codebase Mapping

- `map-codebase` detects Serena and uses semantic analysis
- Produces SYMBOLS.md and DEPENDENCIES.md
- Falls back to file-level if Serena unavailable

### 4. Code Review Impact Analysis

- TL `review-code` workflow has optional Serena step
- Traces which modules consume changed functions
- Risk categorization: 🟢 Low / 🟡 Medium / ⚠️ High
- Advisory only — TL makes final decisions

## Configuration

### Serena Project Config (`.serena/project.yml`)

```yaml
project_name: my-project
languages:
  - typescript
  - python
exclude_patterns:
  - node_modules
  - .next
  - dist
```

### MCP Config Template (`templates/mcp/serena-mcp.json`)

Uses `uvx --from git+https://github.com/AbanteAI/serena` — no local clone needed. Replace `<PROJECT_PATH>` with your project root.

### MakeIt Modes Mapping

| MakeIt Stage | Serena Mode | Reason |
|-------------|-------------|--------|
| map-codebase | planning | Read-only analysis |
| review-code | planning | Read-only impact analysis |
| execute-phase | editing | Code modifications |
| discuss-phase | planning | Context gathering |

## Troubleshooting

### Serena not responding

- Check: `uv --version` (must be installed)
- Check: `.serena/project.yml` exists in project root
- Try: Re-index project via `project index` tool

### Language not supported

- Serena uses LSP backends — check if language server is available
- Fallback: File-level analysis continues to work without Serena

### Memory sync issues

- Verify: `.makeit/knowledge/INDEX.md` exists
- Re-run: sync-memories workflow from serena-workspace skill

### Impact analysis shows no data

- Ensure `.serena/project.yml` has correct `languages` configuration
- Check if the changed files are in supported languages
- Try running `get_symbols_overview` manually on a known file

## Related Resources

- Skill: `.agent/skills/serena-workspace/SKILL.md`
- Config template: `templates/mcp/serena-mcp.json`
- Tools reference: `.agent/skills/serena-workspace/references/tools-reference.md`
- Modes reference: `.agent/skills/serena-workspace/references/modes-contexts.md`

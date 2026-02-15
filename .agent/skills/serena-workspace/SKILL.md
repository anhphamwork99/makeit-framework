---
name: serena-workspace
description: Tương tác với codebase qua Serena MCP — symbol search, reference tracing, rename, code analysis. Dùng khi cần semantic code intelligence, map dependencies, hoặc trace impact of changes.
---

<essential_principles>

## Serena MCP — Semantic Code Intelligence

Skill này wrap **Serena MCP** server để Agent có thể:
- Tìm kiếm symbols (functions, classes, variables) trong toàn bộ codebase
- Trace references và impact của thay đổi
- Rename/replace symbols an toàn across codebase
- Xem overview symbols trong file/directory
- Sync MakeIt knowledge vào Serena memories

## What is Serena?

Serena cung cấp IDE-like semantic tools cho AI agents qua LSP (Language Server Protocol):
- **30+ programming languages** supported (TypeScript, Python, Go, Java, Rust, C#, etc.)
- **Symbol-level analysis** — không chỉ text search mà hiểu code structure
- **Project-based workflow** — index project một lần, query nhiều lần
- **Memory system** — `.serena/memories/` cho project-specific context

## Runtime Rules

- **Serena project phải được create và index trước** khi sử dụng symbol tools
- **`uv` là prerequisite duy nhất** — Python package manager (install via `curl -LsSf https://astral.sh/uv/install.sh | sh`)
- **Config MCP** sử dụng template tại `templates/mcp/serena-mcp.json`
- **Optional layer** — Framework hoạt động đầy đủ mà không cần Serena installed

## Serena Context for MakeIt

Serena hoạt động trong context `agent` với 2 modes chính:
- **`planning`** — Read-only analysis (dùng khi review, map-codebase, discuss)
- **`editing`** — Full code modification (dùng khi execute-phase — implement code)

</essential_principles>

<intake>
Bạn muốn làm gì với Serena?

1. Setup/cài đặt Serena MCP
2. Sync MakeIt knowledge vào Serena memories
3. Tìm kiếm symbols trong codebase
4. Trace references/impact của một symbol
5. Xem tools/capabilities

**Chờ response trước khi proceeding.**
</intake>

<routing>
| Response | Workflow |
|----------|----------|
| 1, "setup", "install", "cài đặt", "cấu hình" | workflows/setup.md |
| 2, "sync", "memories", "knowledge", "đồng bộ" | workflows/sync-memories.md |
| 3, "search", "find", "symbol", "tìm" | Direct: sử dụng `find_symbol` tool |
| 4, "trace", "reference", "impact", "ảnh hưởng" | Direct: sử dụng `find_referencing_symbols` tool |
| 5, "tools", "capabilities", "xem", "list" | references/tools-reference.md |

**Intent-based routing:**
- "cài serena" → workflows/setup.md
- "sync knowledge sang serena" → workflows/sync-memories.md
- "tìm function X ở đâu" → Direct `find_symbol` tool
- "function này được gọi ở đâu" → Direct `find_referencing_symbols` tool
- "serena có thể làm gì" → references/tools-reference.md

**Sau khi đọc workflow, follow nó exactly.**
</routing>

<quick_reference>
## Quick Checks

```bash
# Check uv installed
which uv

# Check Serena available
uvx --from git+https://github.com/AbanteAI/serena serena --help

# Check Serena project exists
ls .serena/project.yml
```

## Ready Criteria

- `uv` installed và available trong PATH
- Serena MCP config đã add vào IDE settings
- `.serena/project.yml` exists với languages được configured
- `find_symbol` test search trả về kết quả

## Common Commands

| Tool | Purpose |
|------|---------|
| `find_symbol` | Global/local symbol search |
| `find_referencing_symbols` | Find all references to a symbol |
| `get_symbols_overview` | Top-level symbols in a file |
| `rename_symbol` | Rename across codebase |
| `switch_modes` | Switch planning ↔ editing mode |

</quick_reference>

<reference_index>
**Domain knowledge trong `references/`:**
- tools-reference.md — Catalog tất cả Serena tools với MakeIt use cases
- modes-contexts.md — Contexts và modes mapping cho MakeIt roles

</reference_index>

<workflows_index>
| Workflow | Purpose |
|----------|---------|
| setup.md | Cài đặt và cấu hình Serena MCP |
| sync-memories.md | Sync MakeIt Knowledge Base → Serena memories |

</workflows_index>

<success_criteria>
Skill succeeds when:
- Serena project created và indexed thành công
- Symbol tools (`find_symbol`, `find_referencing_symbols`) accessible via MCP
- Memory sync complete (nếu requested) — `.serena/memories/` có files
- Mode phù hợp với MakeIt stage (planning cho review, editing cho implement)
</success_criteria>

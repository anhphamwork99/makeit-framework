---
description: Cài đặt và cấu hình Serena MCP cho project
---

# Setup Serena MCP

## Prerequisites

### Step 1: Check `uv` installed

```bash
which uv
```

Nếu chưa có, cài đặt:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Step 2: Verify Serena available

```bash
uvx --from git+https://github.com/AbanteAI/serena serena --help
```

> `uvx` sẽ tự download và cache Serena. Không cần clone repo.

## Configure MCP

### Step 3: Add MCP config vào IDE

1. Copy nội dung từ `templates/mcp/serena-mcp.json`
2. Mở IDE settings (MCP servers section)
3. Paste config vào
4. Replace `<PROJECT_PATH>` với absolute path tới project root

**Config template:**
```json
{
    "mcpServers": {
        "serena": {
            "command": "uvx",
            "args": [
                "--from", "git+https://github.com/AbanteAI/serena",
                "serena",
                "--stdio",
                "--project", "<PROJECT_PATH>"
            ]
        }
    }
}
```

> ⚠️ `<PROJECT_PATH>` phải là **absolute path** (e.g., `/Users/you/projects/my-app`)

## Create Serena Project

### Step 4: Create project configuration

Sử dụng Serena `project create` tool hoặc tạo manual file `.serena/project.yml`:

```yaml
project_name: <project-name>
languages:
  - typescript    # detect từ package.json
  - python        # detect từ pyproject.toml / requirements.txt
exclude_patterns:
  - node_modules
  - .next
  - dist
  - build
  - .git
  - __pycache__
```

**Auto-detect languages:**
| File found | Language to add |
|-----------|----------------|
| `package.json` | `typescript` (hoặc `javascript`) |
| `tsconfig.json` | `typescript` |
| `pyproject.toml` / `requirements.txt` | `python` |
| `go.mod` | `go` |
| `Cargo.toml` | `rust` |
| `pom.xml` / `build.gradle` | `java` |

### Step 5: Index project

Sử dụng `project index` tool hoặc Serena sẽ auto-index khi activate.

> ⏱️ Indexing time phụ thuộc vào project size. Lần đầu có thể mất 1-2 phút cho large projects.

## Verify

### Step 6: Test symbol search

Thử tìm kiếm một symbol bất kỳ:
```
find_symbol: "main" (hoặc tên function/class bất kỳ trong project)
```

Nếu trả về kết quả → **Setup hoàn tất!** ✅

### Step 7: Set mode (optional)

Tùy mục đích sử dụng:
- **Code review / analysis:** `switch_modes` → `planning` (read-only)
- **Code implementation:** `switch_modes` → `editing` (full access)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `uvx: command not found` | Install uv: `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Serena MCP not connecting | Check `<PROJECT_PATH>` là absolute path |
| `find_symbol` returns empty | Run `project index` lại, kiểm tra languages trong project.yml |
| LSP server chậm | Thêm exclude_patterns cho large directories (node_modules, dist) |
| Language not supported | Check [Serena docs](https://github.com/AbanteAI/serena) for supported languages |

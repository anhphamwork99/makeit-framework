# Serena Tools Reference

## Overview

Serena cung cấp semantic code tools qua MCP. Dưới đây là catalog tất cả tools relevant cho MakeIt integration.

## Symbol Tools

| Tool | Description | MakeIt Use Case |
|------|-------------|-----------------|
| `find_symbol` | Tìm kiếm symbols (functions, classes, variables) globally hoặc trong scope | `map-codebase` semantic analysis, tìm implementation |
| `find_referencing_symbols` | Tìm tất cả references đến một symbol | TL code review — impact tracing, dependency analysis |
| `get_symbols_overview` | Liệt kê top-level symbols trong file/directory | `map-codebase` file analysis, project structure overview |
| `rename_symbol` | Rename symbol an toàn across toàn bộ codebase | Dev refactoring — xử lý tất cả references automatically |
| `replace_symbol_body` | Thay thế toàn bộ nội dung của symbol definition | Dev code editing — rewrite function/class body |
| `insert_after_symbol` | Chèn content sau một symbol | Dev code editing — thêm function/method mới |

## Project Tools

| Tool | Description | MakeIt Use Case |
|------|-------------|-----------------|
| `project create` | Tạo Serena project configuration | `serena-workspace` setup — one-time per project |
| `project index` | Index project cho symbol resolution | Setup — chạy sau create, hoặc khi code changes nhiều |
| `activate_project` | Activate một project đã tạo | Multi-project workspace — switch between projects |

## Memory Tools

| Tool | Description | MakeIt Use Case |
|------|-------------|-----------------|
| `write_memory` | Ghi content vào `.serena/memories/` | Memory bridge — sync KB docs sang Serena |

## Mode Tools

| Tool | Description | MakeIt Use Case |
|------|-------------|-----------------|
| `switch_modes` | Chuyển đổi giữa planning/editing mode | Context-aware — planning cho review, editing cho implement |

## File Tools

| Tool | Description | MakeIt Use Case |
|------|-------------|-----------------|
| `list_dir` | Liệt kê directory contents | Project exploration, file discovery |
| `read_file` | Đọc nội dung file | Code review, analysis |

## Usage by MakeIt Stage

### Stage: map-codebase
```
find_symbol → tìm key functions/classes
get_symbols_overview → file-level structure
find_referencing_symbols → dependency graph
```

### Stage: review-code (Techlead)
```
find_referencing_symbols → impact assessment cho changed functions
get_symbols_overview → context cho changed files
```

### Stage: execute-phase (Dev FE/BE)
```
find_symbol → locate implementation
rename_symbol → safe refactoring
replace_symbol_body → rewrite function
insert_after_symbol → add new code
```

### Stage: discuss-phase
```
find_symbol → understand current implementation
get_symbols_overview → project structure exploration
```

## Tool Chaining Patterns

### Pattern: Impact Analysis
```
1. get_symbols_overview(file) → list of symbols
2. find_referencing_symbols(symbol) → who uses it
3. ↳ repeat for each reference → build impact graph
```

### Pattern: Safe Refactoring
```
1. find_symbol(name) → locate target
2. find_referencing_symbols(target) → check usage count
3. rename_symbol(old, new) → rename everywhere
4. ↳ verify với find_symbol(new) → confirm rename success
```

### Pattern: Code Exploration
```
1. list_dir(path) → file tree
2. get_symbols_overview(file) → symbols per file
3. find_symbol(interesting_symbol) → deep dive
4. find_referencing_symbols(symbol) → understand connections
```

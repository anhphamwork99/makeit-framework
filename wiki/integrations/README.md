# Integrations

Hướng dẫn tích hợp các MCP servers và công cụ bên thứ ba vào MakeIt AI Workspace.

## Tổng quan

Integrations giúp mở rộng khả năng của AI agents bằng cách kết nối với external tools qua Model Context Protocol (MCP). Mỗi integration là **optional** — workspace hoạt động bình thường mà không cần bất kỳ integration nào.

## Available Integrations

| Integration | Mô tả | Roles |
|-------------|-------|-------|
| [Serena MCP](./serena-mcp.md) | Symbol-level code intelligence qua LSP — find definitions, references, rename across codebase | Techlead, Dev FE, Dev BE |

## When to Use

- **Khi cần code intelligence nâng cao** — symbol search, impact analysis, semantic refactoring
- **Khi review code cần trace dependencies** — biết function nào bị ảnh hưởng khi thay đổi
- **Khi map codebase cần chi tiết hơn file-level** — symbol-level dependency graphs

## Setup Pattern

Tất cả integrations follow cùng pattern:

1. Copy config template từ `templates/mcp/` vào IDE MCP config
2. Cập nhật placeholder values (project path, API keys, etc.)
3. Restart IDE để load MCP server
4. Verify bằng cách test một tool call

> 💡 Xem hướng dẫn chi tiết cho từng integration trong trang riêng.

---
*MakeIt Team — AI-Augmented Operations Framework*

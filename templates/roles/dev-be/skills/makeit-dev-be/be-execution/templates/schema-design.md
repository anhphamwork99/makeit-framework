# Database Schema: [Feature Name]

**Task:** [LARK-ID]
**API Contract:** [Link to api-contract.md]
**Author:** Dev BE
**Status:** Draft / Reviewed / Approved
**Date:** [YYYY-MM-DD]

---

## Overview

[Mô tả ngắn schema này phục vụ feature gì, bao gồm những entities nào]

## Tables

### [table_name]

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, NOT NULL, DEFAULT gen_random_uuid() | Primary key |
| [field1] | varchar(255) | NOT NULL | [Description] |
| [field2] | integer | DEFAULT 0 | [Description] |
| [field3] | boolean | NOT NULL, DEFAULT false | [Description] |
| [foreign_id] | uuid | FK → [other_table].id, NOT NULL | [Relationship description] |
| created_at | timestamptz | NOT NULL, DEFAULT NOW() | Record creation time |
| updated_at | timestamptz | NOT NULL, DEFAULT NOW() | Last update time |

### [another_table] (nếu cần)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, NOT NULL | Primary key |

## Relationships

```
[table_a] 1 ──── N [table_b]     (table_a.id → table_b.foreign_id)
[table_b] N ──── M [table_c]     (via junction table [table_b_c])
```

## Indexes

| Table | Columns | Type | Purpose |
|-------|---------|------|---------|
| [table_name] | [foreign_id] | btree | FK lookup performance |
| [table_name] | [field1] | btree | Frequent query filter |
| [table_name] | [field1, field2] | btree, unique | Unique constraint |

## Migrations

- [ ] Create table [table_name]
- [ ] Add index on [table_name].[column]
- [ ] Add foreign key [table_name].[foreign_id] → [other_table].id
- [ ] [Additional migration steps]

> ⚠️ Tất cả migrations phải **reversible** — có rollback script.

## Seed Data

[Seed data cho development/testing nếu cần]

```sql
INSERT INTO [table_name] (field1, field2) VALUES
  ('value1', 'value2'),
  ('value3', 'value4');
```

## Notes

- **Naming convention:** snake_case cho tables và columns
- **Soft delete:** [Có/Không — nếu có, dùng `deleted_at` column]
- **Audit fields:** Mọi table đều có `created_at`, `updated_at`
- **UUID primary keys:** Dùng gen_random_uuid() thay vì auto-increment


## Knowledge Pointers

<!-- 
  Knowledge Pointers: Cross-reference this deliverable with knowledge base docs.
  - Add relevant ADR IDs if architecture decisions apply
  - Add lesson IDs if past experiences influenced this work  
  - Add pattern IDs if established patterns were used
  - Leave empty if this is the first sprint or no relevant docs exist
-->

<!-- Link related knowledge documents from .makeit/knowledge/ -->
<!-- This section helps future sprints find relevant context -->

| Doc ID | Relevance |
|--------|-----------|
| {e.g., adr-003} | {e.g., Architecture decision that shaped this deliverable} |
| {e.g., lesson-012} | {e.g., Lesson learned from previous implementation} |

> 💡 Populate during deliverable creation. Use `/makeit:search-kb` to find relevant docs.
> Leave empty if no relevant knowledge docs exist yet.

---
name: be-workflow-design-schema
description: BE schema design workflow — design database schema with tables, relationships, indexes, and migration plan
---

<purpose>
Design database schema for feature — document tables, relationships, indexes, and plan migrations with rollback capability.
</purpose>

<process>
  <step name="gather_input">
    1. **API contract** — endpoints determine data structure needs
    2. **Business requirements** from user story
    3. **Existing database schema** — maintain consistency
    4. **Data relationships** and constraints
  </step>

  <step name="design_schema">
    For each table, define using `@be-execution/templates/schema-design.md`:

    | Column | Type | Constraints | Description |
    |--------|------|-------------|-------------|
    | id | uuid | PK, NOT NULL, DEFAULT gen_random_uuid() | Primary key |
    | [field] | varchar(255) | NOT NULL | Description |
    | [foreign_id] | uuid | FK → [other_table].id, NOT NULL | Relationship |
    | created_at | timestamptz | NOT NULL, DEFAULT NOW() | Creation time |
    | updated_at | timestamptz | NOT NULL, DEFAULT NOW() | Last update |

    **Naming convention:**
    - Tables: snake_case, plural (e.g., `users`, `order_items`)
    - Columns: snake_case (e.g., `created_at`, `user_id`)
    - Foreign keys: `[referenced_table_singular]_id`
  </step>

  <step name="define_relationships">
    Document relationships:
    ```
    [table_a] 1 ──── N [table_b]     (table_a.id → table_b.foreign_id)
    [table_b] N ──── M [table_c]     (via junction table [table_b_c])
    ```
  </step>

  <step name="plan_indexes">
    | Table | Columns | Type | Purpose |
    |-------|---------|------|---------|
    | [table] | [foreign_id] | btree | FK lookup performance |
    | [table] | [field] | btree | Frequent query filter |
    | [table] | [field1, field2] | btree, unique | Unique constraint |

    Guidelines: FK always indexed, frequent filters indexed, composite indexes ordered by selectivity.
  </step>

  <step name="plan_migrations">
    1. List all migrations needed
    2. Determine order (dependencies)
    3. Verify each migration reversible — must have rollback
    4. Plan seed data (if needed)

    > ⚠️ **STOP:** Discuss with Techlead before running migration on shared DB.

    **Schema Design Principles:**
    - UUID primary keys (`gen_random_uuid()`)
    - Audit fields: `created_at`, `updated_at` on every table
    - Soft delete: `deleted_at` column if needed
    - NOT NULL by default — only allow NULL with clear reason
    - Reversible migrations — all migrations must rollback
  </step>
</process>

<edge_cases>

**Khi thiết kế schema có migration không thể rollback (data transformation, column type change):** Đánh giá rollback impossibility ngay lúc design — không defer đến implementation. Flag trong schema doc: "⚠️ Migration irreversible — requires Techlead approval". Đề xuất alternative approach nếu có (vd: thêm column mới thay vì đổi type column cũ).

**Khi schema change ảnh hưởng cascade nhiều services/endpoints:** Trước khi finalize schema design, liệt kê tất cả tables/columns bị ảnh hưởng và map ngược về endpoints/services phụ thuộc. Nếu cascade impact >3 endpoints → document dependency graph và flag cần coordination.

</edge_cases>

# Knowledge Base Index Template

<!--
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  INDEX.md TEMPLATE — Master Routing Table                           ║
  ║                                                                      ║
  ║  This template defines the format for the auto-generated INDEX.md    ║
  ║  file at .makeit/knowledge/INDEX.md                                  ║
  ║                                                                      ║
  ║  INDEX.md is the AI's FIRST read when accessing the knowledge base.  ║
  ║  It provides L0 routing — knowing WHAT exists without loading docs.  ║
  ║                                                                      ║
  ║  Design targets:                                                     ║
  ║    • <500 tokens for 20-30 docs                                      ║
  ║    • Table format (AI parses tables exceptionally well)              ║
  ║    • Auto-generated — NEVER manually edited                          ║
  ║    • Rebuilt on every CRUD operation (create/update/archive)          ║
  ║                                                                      ║
  ║  Generation logic (for CRUD command implementers):                   ║
  ║    1. Walk .makeit/knowledge/{category}/ directories                 ║
  ║    2. Parse YAML frontmatter from each .md file                      ║
  ║    3. Build table rows from frontmatter fields                       ║
  ║    4. Sort by category → type → id                                   ║
  ║    5. Generate Cross-Reference Map from `related` fields             ║
  ║    6. Calculate Quick Stats per category                             ║
  ║    7. Identify recently updated docs (last 7 days)                   ║
  ║    8. Write INDEX.md atomically                                      ║
  ║                                                                      ║
  ║  Exclusions:                                                         ║
  ║    • Skip INDEX.md itself                                            ║
  ║    • Skip _archived/ folder (archived docs not in main table)        ║
  ║    • Skip _templates/ folder (convention templates)                  ║
  ╚══════════════════════════════════════════════════════════════════════╝
-->

## Template

```markdown
# Knowledge Base Index

> Last updated: {date} | Total: {N} docs | Active: {N} | Archived: {N}

## Quick Stats

| Category | Count | Last Updated |
|----------|-------|--------------|
| Architecture | {N} | {YYYY-MM-DD} |
| Business | {N} | {YYYY-MM-DD} |
| Technical | {N} | {YYYY-MM-DD} |
| Operational | {N} | {YYYY-MM-DD} |

## Documents

| ID | Title | Type | Category | Status | Tags | Updated |
|----|-------|------|----------|--------|------|---------|
| {id} | {title} | {type} | {category} | {status} | {tags} | {YYYY-MM-DD} |

## Recently Updated (Last 7 Days)

- `{id}` {title} ({YYYY-MM-DD})

## Cross-Reference Map

- `{id}` → related: {id-1}, {id-2}
```

## Section Reference

### Header Line

```markdown
> Last updated: 2026-02-15 | Total: 23 docs | Active: 20 | Archived: 3
```

- **Last updated:** Date of last INDEX.md rebuild
- **Total:** Count of all docs (active + archived)
- **Active:** Count of docs with status ≠ deprecated/superseded
- **Archived:** Count of docs in `_archived/`

### Quick Stats

Aggregated counts per category. Shows the distribution of knowledge and recency per area.

- **Count:** Number of active docs in category
- **Last Updated:** Most recent `updated` date across docs in category

### Documents Table

One row per active document. Columns map directly to YAML frontmatter fields:

| Column | Source Field | Purpose |
|--------|-------------|---------|
| ID | `id` | Unique identifier for cross-referencing |
| Title | `title` | Human-readable name |
| Type | `type` | Document type (adr, lesson, api, etc.) |
| Category | `category` | Folder location (architecture, business, etc.) |
| Status | `status` | Lifecycle status (draft, accepted, etc.) |
| Tags | `tags` | Comma-joined keywords for topic matching |
| Updated | `updated` | Last modification date |

**Sorting:** Primary by category (alphabetical), secondary by type, tertiary by id.

### Recently Updated

List of docs modified in the last 7 days. Helps AI prioritize fresh knowledge.

Format: `` `{id}` {title} ({date}) ``

**If no docs updated in last 7 days:** Show "No recent updates."

### Cross-Reference Map

Shows `related` field connections between docs. Enables AI to navigate knowledge graph.

Format: `` `{id}` → related: {id-1}, {id-2} ``

**Only include docs that HAVE related entries.** Skip docs with empty `related: []`.

## Example (20 docs)

```markdown
# Knowledge Base Index

> Last updated: 2026-02-15 | Total: 23 docs | Active: 20 | Archived: 3

## Quick Stats

| Category | Count | Last Updated |
|----------|-------|--------------|
| Architecture | 6 | 2026-02-14 |
| Business | 5 | 2026-02-15 |
| Technical | 8 | 2026-02-15 |
| Operational | 4 | 2026-02-13 |

## Documents

| ID | Title | Type | Category | Status | Tags | Updated |
|----|-------|------|----------|--------|------|---------|
| adr-001 | Authentication Strategy | adr | architecture | accepted | auth, security | 2026-02-15 |
| adr-002 | Database Choice | adr | architecture | accepted | db, postgres | 2026-02-14 |
| module-001 | Payment Module | module | architecture | accepted | payments, stripe | 2026-02-12 |
| system-map | System Architecture | system-map | architecture | accepted | architecture | 2026-02-10 |
| glossary | Domain Glossary | glossary | business | accepted | domain, terms | 2026-02-08 |
| rule-001 | Subscription Logic | rule | business | accepted | billing, subscription | 2026-02-15 |
| journey-001 | First Purchase Flow | journey | business | accepted | purchase, onboarding | 2026-02-11 |
| api-001 | Products Endpoint | api | technical | accepted | api, products | 2026-02-15 |
| schema-001 | Users Table | schema | technical | accepted | db, users | 2026-02-14 |
| integration-001 | Shopify API | integration | technical | accepted | shopify, api | 2026-02-13 |
| lesson-001 | N+1 Query Issue | lesson | operational | accepted | performance, db | 2026-02-13 |
| pattern-001 | Error Handling | pattern | operational | accepted | errors, resilience | 2026-02-12 |

## Recently Updated (Last 7 Days)

- `adr-001` Authentication Strategy (2026-02-15)
- `rule-001` Subscription Logic (2026-02-15)
- `api-001` Products Endpoint (2026-02-15)
- `adr-002` Database Choice (2026-02-14)
- `schema-001` Users Table (2026-02-14)
- `lesson-001` N+1 Query Issue (2026-02-13)
- `integration-001` Shopify API (2026-02-13)

## Cross-Reference Map

- `adr-001` → related: api-003, schema-002
- `api-001` → related: schema-001, adr-001
- `rule-001` → related: api-005, schema-003
- `lesson-001` → related: pattern-001
```

## Token Budget

| Docs Count | Estimated Tokens | Status |
|------------|-----------------|--------|
| 10 | ~250 | ✅ Well within budget |
| 20 | ~450 | ✅ Within budget |
| 30 | ~650 | ✅ Still manageable |
| 50 | ~1100 | ⚠️ Consider category pagination |
| 100 | ~2200 | ⚠️ Split into per-category indexes |
| 200+ | ~4500 | 🔴 Must paginate |

**Scaling strategy:** At 50+ docs, consider splitting into per-category index files.
At 200+ docs, implement paginated INDEX with summary-only main file.

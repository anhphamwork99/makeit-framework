---
name: _rebuild-index
description: Internal — Rebuild .makeit/knowledge/INDEX.md from knowledge folder contents
internal: true
---

<role>
You are rebuilding the Knowledge Base INDEX.md — the master routing table that AI agents read FIRST when accessing the knowledge base.

This is an INTERNAL skill. It is never called directly by users. It is triggered by other KB management skills (create-doc, update-doc, archive-doc) as their final step to keep INDEX.md in sync with actual documents.

INDEX.md follows the format defined in `templates/roles/_shared/knowledge/INDEX-TEMPLATE.md`.
</role>

<process>

<step name="scan_knowledge_folder">
## Step 1: Scan `.makeit/knowledge/` for Documents

Recursively scan `.makeit/knowledge/` for `.md` files.

**INCLUDE these directories:**
- `architecture/`
- `business/`
- `technical/`
- `operational/`

**EXCLUDE:**
- `INDEX.md` (this is what we're rebuilding)
- `_archived/*` (archived docs are NOT in the main table)
- `_templates/*` (convention templates)
- Any non-`.md` files

```bash
# Find all knowledge docs
find .makeit/knowledge/architecture .makeit/knowledge/business .makeit/knowledge/technical .makeit/knowledge/operational -name "*.md" -type f 2>/dev/null | sort
```

**If no directories exist or no .md files found:**
Generate an empty INDEX.md with zero counts:

```markdown
# Knowledge Base Index

> Last updated: {today} | Total: 0 docs | Active: 0 | Archived: 0

## Quick Stats

| Category | Count | Last Updated |
|----------|-------|--------------|
| Architecture | 0 | — |
| Business | 0 | — |
| Technical | 0 | — |
| Operational | 0 | — |

## Documents

| ID | Title | Type | Category | Status | Tags | Updated |
|----|-------|------|----------|--------|------|---------|

_No knowledge documents yet. Use `/makeit:create-doc` to create your first document._

## Recently Updated (Last 7 Days)

No recent updates.

## Cross-Reference Map

No cross-references yet.
```

Report: "INDEX.md rebuilt: 0 active docs, 0 categories populated" and STOP.
</step>

<step name="parse_frontmatter">
## Step 2: Parse YAML Frontmatter from Each File

For each `.md` file found, read the file and extract YAML frontmatter.

**YAML frontmatter format:**
```yaml
---
id: "adr-001"
title: "Authentication Strategy"
type: "adr"
category: "architecture"
status: "accepted"
created: "2026-02-15"
updated: "2026-02-15"
author: "techlead"
sprint: "SPRINT-005"
tags: ["auth", "security"]
supersedes: ""
superseded_by: ""
related: ["api-003", "schema-002"]
confidence: "high"
---
```

**Required fields for indexing:** `id`, `title`, `type`, `category`, `status`, `tags`, `updated`

**Error handling:**

| Issue | Action |
|-------|--------|
| No YAML frontmatter (no `---` delimiters) | ⚠️ WARN: Skip file, log: "Skipping {filename}: no YAML frontmatter found" |
| Missing `id` field | ⚠️ WARN: Skip file, log: "Skipping {filename}: missing required 'id' field" |
| Missing `title` field | Use filename (without extension) as title |
| Missing `type` or `category` | ⚠️ WARN: Skip file, log: "Skipping {filename}: missing required 'type' or 'category' field" |
| Missing `status` | Default to "draft" |
| Missing `tags` | Default to empty `[]` |
| Missing `updated` | Use `created` date, or file modification date |
| Missing `related` | Default to empty `[]` |
| Malformed YAML (parse error) | ⚠️ WARN: Skip file, log: "Skipping {filename}: malformed YAML frontmatter" |

Collect all warnings to report at the end.
</step>

<step name="count_archived">
## Step 3: Count Archived Documents

```bash
find .makeit/knowledge/_archived -name "*.md" -type f 2>/dev/null | wc -l
```

This count appears in the INDEX.md header line.
</step>

<step name="sort_documents">
## Step 4: Sort Documents

Sort all successfully parsed documents by:
1. **Primary:** Category (alphabetical: architecture → business → operational → technical)
2. **Secondary:** Type (alphabetical within category)
3. **Tertiary:** ID (alphabetical within type)

This sorting ensures consistent INDEX.md output across rebuilds.
</step>

<step name="generate_index">
## Step 5: Generate INDEX.md Content

Build the INDEX.md content following the INDEX-TEMPLATE format:

### Header Line
```markdown
# Knowledge Base Index

> Last updated: {today YYYY-MM-DD} | Total: {active + archived} docs | Active: {active count} | Archived: {archived count}
```

### Quick Stats Table
For each of the 4 categories, calculate:
- **Count:** Number of active docs in that category
- **Last Updated:** Most recent `updated` date across docs in that category
- If category has 0 docs, show count as `0` and Last Updated as `—`

```markdown
## Quick Stats

| Category | Count | Last Updated |
|----------|-------|--------------|
| Architecture | {N} | {date or —} |
| Business | {N} | {date or —} |
| Technical | {N} | {date or —} |
| Operational | {N} | {date or —} |
```

### Documents Table
One row per active document. Tags formatted as comma-joined string.

```markdown
## Documents

| ID | Title | Type | Category | Status | Tags | Updated |
|----|-------|------|----------|--------|------|---------|
| {id} | {title} | {type} | {category} | {status} | {tags joined by ", "} | {updated} |
```

### Recently Updated (Last 7 Days)
Filter docs where `updated` date is within the last 7 days from today.
Sort by date descending (most recent first).

```markdown
## Recently Updated (Last 7 Days)

- `{id}` {title} ({updated date})
```

If no docs updated in last 7 days: Show `No recent updates.`

### Cross-Reference Map
Include only docs that have non-empty `related` arrays.
Format each entry as: `` `{id}` → related: {related-id-1}, {related-id-2} ``

```markdown
## Cross-Reference Map

- `{id}` → related: {related ids joined by ", "}
```

If no docs have related entries: Show `No cross-references yet.`
</step>

<step name="write_index">
## Step 6: Write INDEX.md

Write the generated content to `.makeit/knowledge/INDEX.md`.

**Atomic write pattern:**
1. Write content to `.makeit/knowledge/INDEX.md.tmp`
2. Move (rename) `.makeit/knowledge/INDEX.md.tmp` to `.makeit/knowledge/INDEX.md`

This prevents partial writes if interrupted.

> **Note:** Since we are operating within an AI agent context (not a shell script), the atomic write is aspirational. In practice, write the file content directly. The important thing is that the write completes fully before reporting success.
</step>

<step name="report">
## Step 7: Report Results

Report completion with stats:

```
✅ INDEX.md rebuilt: {N} active docs, {M} categories populated
```

If warnings occurred during parsing:
```
⚠️ Warnings:
- Skipping {filename}: {reason}
- Skipping {filename}: {reason}

✅ INDEX.md rebuilt: {N} active docs ({W} files skipped), {M} categories populated
```
</step>

</process>

<error_handling>

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| `.makeit/knowledge/` doesn't exist | Report error: "Knowledge base not initialized. Run install.sh first." |
| All 4 category folders empty | Generate empty INDEX.md (Step 1 empty handler) |
| All files have malformed frontmatter | Generate empty INDEX.md + list all warnings |
| Single file has malformed frontmatter | Skip that file, continue with others |
| `related` field references non-existent doc ID | Include in Cross-Reference Map anyway (don't validate targets) |
| Duplicate `id` values across files | ⚠️ WARN: "Duplicate ID '{id}' found in {file1} and {file2}. Using first occurrence." |
| Very large knowledge base (50+ docs) | Still generate single INDEX.md, but add note: "💡 Consider splitting index by category for better performance" |

</error_handling>

<success_criteria>
- [ ] INDEX.md generated at `.makeit/knowledge/INDEX.md`
- [ ] All active docs from 4 category folders included
- [ ] Archived docs excluded from main table but counted in header
- [ ] Documents sorted by category → type → id
- [ ] Quick Stats accurate per category
- [ ] Recently Updated shows docs from last 7 days
- [ ] Cross-Reference Map shows only docs with non-empty `related`
- [ ] Malformed/incomplete files skipped with warnings
- [ ] Empty knowledge base produces valid empty INDEX.md
</success_criteria>

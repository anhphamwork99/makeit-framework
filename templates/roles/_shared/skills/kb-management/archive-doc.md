---
name: archive-doc
description: Archive a knowledge doc — move to _archived/, update references, rebuild INDEX.md
---

<purpose>
Safely archive a knowledge document without deleting it. Moves the doc to `_archived/`, updates incoming cross-references, and triggers `_rebuild-index` to keep INDEX.md in sync.

**Core principle: Knowledge is NEVER deleted. Only archived.**

Archived docs remain accessible in `_archived/` for historical reference. Their cross-references are updated to reflect the archival status.
</purpose>

<process>

<step name="intake">
## Step 1: Identify Document to Archive

Ask the user for the document to archive:

```
📦 Archive Knowledge Document

Which document do you want to archive?
Provide one of:
- Document ID (e.g., adr-001)
- File path (e.g., .makeit/knowledge/architecture/adr-001-auth-strategy.md)
- Document title (e.g., Authentication Strategy)
```

**Wait for user response before proceeding.**
</step>

<step name="locate">
## Step 2: Locate the Document

**If ID provided:**
1. Read `.makeit/knowledge/INDEX.md`
2. Find the row matching the ID in the Documents table
3. Derive file path: `.makeit/knowledge/{category}/{filename}`
4. Verify file exists

**If file path provided:**
1. Verify file exists at the given path
2. Read frontmatter to extract `id`

**If title provided:**
1. Read `.makeit/knowledge/INDEX.md`
2. Search Title column for match (case-insensitive)
3. Derive file path from category + filename
4. Verify file exists

**If document not found:**
```
❌ Document not found: "{input}"

Available documents:
{list from INDEX.md Documents table}

Try again with a valid ID, path, or title.
```
STOP — ask user to provide correct identifier.

**Once located, display confirmation:**
```
📄 Found document:
   ID: {id}
   Title: {title}
   Type: {type}
   Category: {category}
   Status: {status}
   Path: {file path}
   Related to: {related IDs or "none"}

Proceed with archiving? (yes/no)
```

**Wait for user confirmation before proceeding.**
</step>

<step name="check_references">
## Step 3: Check Incoming References

Scan ALL knowledge documents (in all 4 category folders) for `related` fields that reference this document's ID.

```bash
# Find all docs that reference this document
grep -rl "{doc-id}" .makeit/knowledge/architecture/ .makeit/knowledge/business/ .makeit/knowledge/technical/ .makeit/knowledge/operational/ 2>/dev/null
```

For each file found, read its YAML frontmatter and check if `related` array contains the archiving doc's ID.

**If incoming references found:**

```
⚠️ Found {N} documents referencing "{doc-id}":

| Document | ID | Reference |
|----------|-----|-----------|
| {title} | {referencing-id} | related: [..., {doc-id}, ...] |

These references will be updated to mark "{doc-id}" as [ARCHIVED].
```

**Update each referencing document:**
1. Read the referencing doc's frontmatter
2. In the `related` array, append `[ARCHIVED]` to the archived doc's ID
   - Before: `related: ["adr-001", "schema-002"]`
   - After: `related: ["adr-001 [ARCHIVED]", "schema-002"]`
3. Update the `updated` date to today
4. Write the file back

**If no incoming references found:**
```
✅ No other documents reference "{doc-id}". Safe to archive.
```
</step>

<step name="archive_document">
## Step 4: Archive the Document

### 4a. Update Document Frontmatter

Before moving, update the document's own frontmatter:

| Field | Change |
|-------|--------|
| `status` | Set to `"deprecated"` |
| `updated` | Set to today's date (`YYYY-MM-DD`) |

Add new field (if not present):
```yaml
archived_date: "YYYY-MM-DD"
```

### 4b. Move to _archived/

```bash
# Ensure _archived directory exists
mkdir -p .makeit/knowledge/_archived/

# Move file preserving original filename
mv .makeit/knowledge/{category}/{filename} .makeit/knowledge/_archived/{filename}
```

**Preserve the original filename.** Do NOT rename the file during archival.

### 4c. Verify Move

```bash
# Confirm file exists in _archived
ls .makeit/knowledge/_archived/{filename}

# Confirm file removed from original location
ls .makeit/knowledge/{category}/{filename} 2>/dev/null && echo "ERROR: File still in original location" || echo "OK: File moved"
```
</step>

<step name="rebuild_index">
## Step 5: Rebuild INDEX.md

Call the `_rebuild-index` internal skill to regenerate INDEX.md.

This will:
- Remove the archived doc from the Documents table
- Update Quick Stats (decrement category count)
- Update Recently Updated section
- Remove the doc from Cross-Reference Map (if it had `related` entries)
- Increment the Archived count in the header

> **Reference:** `templates/roles/_shared/skills/kb-management/_rebuild-index.md`
</step>

<step name="report">
## Step 6: Report Completion

```
✅ Document Archived Successfully

📄 Document: {id} — {title}
📁 Original: .makeit/knowledge/{category}/{filename}
📦 Archived: .makeit/knowledge/_archived/{filename}
📊 Status: deprecated (was: {original status})
🔗 References updated: {N} documents

INDEX.md rebuilt:
- Active docs: {N} (was {N+1})
- Archived docs: {N} (was {N-1})

💡 The document is still accessible at .makeit/knowledge/_archived/{filename}
   To restore it, move it back to the appropriate category folder
   and run `/makeit:search-kb` to verify.
```
</step>

</process>

<edge_cases>

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Document already in `_archived/` | Report: "Document is already archived." STOP. |
| Document status is already `deprecated` | Warn but proceed: "Document is marked deprecated but not archived. Archiving now." |
| Document has `superseded_by` set | Include in report: "Note: This document was superseded by {id}." |
| `_archived/` folder doesn't exist | Create it: `mkdir -p .makeit/knowledge/_archived/` |
| File with same name exists in `_archived/` | Append timestamp: `{filename}-{YYYYMMDD}.md` |
| INDEX.md doesn't exist | Create it via `_rebuild-index` |
| User provides INDEX.md as target | Reject: "INDEX.md is auto-generated and cannot be archived." |
| User provides a template file | Reject: "Template files cannot be archived." |

</edge_cases>

<important_rules>

## Important Rules

1. **NEVER delete knowledge documents.** Archive only. Knowledge is never lost.
2. **ALWAYS update incoming references** before moving the file. Reference integrity matters.
3. **ALWAYS rebuild INDEX.md** after archival. Stale INDEX is a critical pitfall (see RESEARCH.md Pitfall 2).
4. **ALWAYS confirm with user** before archiving. This is a significant action.
5. **Preserve original filename** in `_archived/`. Makes restoration straightforward.

</important_rules>

<success_criteria>
- [ ] Document located and confirmed with user
- [ ] Incoming references identified and updated with [ARCHIVED] tag
- [ ] Document frontmatter updated: status → deprecated, archived_date added
- [ ] Document moved to `.makeit/knowledge/_archived/`
- [ ] Original file removed from category folder
- [ ] INDEX.md rebuilt via `_rebuild-index`
- [ ] Completion report displayed with all stats
</success_criteria>

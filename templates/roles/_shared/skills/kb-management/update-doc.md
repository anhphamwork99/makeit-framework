---
name: update-doc
description: Update an existing knowledge document with change tracking and human approval — supports minor, major, and supersede operations
---

<purpose>
Update existing knowledge documents in the Product Memory System. This skill handles 3 update types: minor edits, major revisions, and full supersede with bidirectional linking. All changes require human approval before applying.

**Human is ALWAYS in the loop.** AI proposes changes, human approves, system applies.
</purpose>

<when_to_use>
- Existing knowledge doc needs correction (typo, outdated info)
- Decision has changed and doc needs revision
- A decision has been fully replaced by a new one (supersede)
- User explicitly runs `/makeit:update-doc`
- Stage-complete identifies docs that need updating
</when_to_use>

<process>

<step name="intake" priority="first">
## Step 1: Intake — Identify the Document

Accept document reference in any of these forms:

**By ID (preferred):**
```
/makeit:update-doc adr-003-caching-strategy
```

**By path:**
```
/makeit:update-doc .makeit/knowledge/architecture/adr-003-caching-strategy.md
```

**By partial match:**
```
/makeit:update-doc caching
```
→ Search by partial ID or title across all knowledge docs

**Search logic for partial match:**
```bash
# Search by ID
grep -rl "^id:.*{query}" .makeit/knowledge/ --include="*.md" 2>/dev/null

# Search by title
grep -rl "^title:.*{query}" .makeit/knowledge/ --include="*.md" 2>/dev/null
```

**If multiple matches found:**
```
🔍 Found {N} documents matching "{query}":

| # | ID | Title | Category | Status |
|---|-----|-------|----------|--------|
| 1 | {id} | {title} | {category} | {status} |
| 2 | {id} | {title} | {category} | {status} |

Select document number to update:
```

**If no match found:**
```
❌ No document found matching "{query}".

💡 Tips:
  - Check ID format: {type}-{NNN}-{kebab-title}
  - Run /makeit:search-kb {query} for broader search
  - Check .makeit/knowledge/INDEX.md for all documents
```
</step>

<step name="load">
## Step 2: Load Existing Document

1. **Read the current document:**
   ```bash
   cat .makeit/knowledge/{category}/{filename}.md
   ```

2. **Parse frontmatter:**
   - Extract all 14 metadata fields
   - Note current `status`, `updated` date, `supersedes`/`superseded_by` values

3. **Display current summary for context:**
   ```
   📄 Current Document: {id}
   
   Title: {title}
   Type: {type} | Category: {category}
   Status: {status} | Confidence: {confidence}
   Last updated: {updated}
   
   Summary:
   {L1 Summary blockquote content}
   
   Key Points:
   {L1 Key Points bullets}
   ```

4. **Ask what needs to change:**
   ```
   What would you like to update?
   
   Describe the changes needed, or specify:
   - "typo fix" / "clarification" → Minor update
   - "decision changed" / "new information" → Major update  
   - "replaced by new approach" → Supersede (creates new doc)
   ```
</step>

<step name="determine_type">
## Step 3: Determine Update Type

Based on user input, classify the update:

### Minor Update
**Trigger:** Typo fixes, wording clarifications, formatting improvements, adding missing tags
**Scope:** Edit in-place, bump `updated` date only
**No status change** unless explicitly requested

**Examples:**
- Fix typos in content
- Clarify ambiguous wording
- Add missing tags to frontmatter
- Fix broken cross-references
- Improve Key Points bullets

### Major Update
**Trigger:** Decision changed, new information discovered, significant content revision
**Scope:** Edit content + optionally update status, confidence, tags
**May change status** (e.g., `accepted` → `deprecated` if partially superseded)

**Examples:**
- Decision revised based on new constraints
- New alternatives discovered after implementation
- Implementation details changed significantly
- Business rule updated by PO decision
- Confidence level changed (validated through implementation)

### Supersede
**Trigger:** Decision fully replaced by new approach
**Scope:** Create NEW document + update OLD document with bidirectional links
**Status changes:** Old doc → `superseded`, new doc → `draft`

**Examples:**
- Architecture decision completely revisited
- Technology stack change (old approach → new approach)
- Business rule replaced by new rule

**Present classification to user:**
```
📋 Update Classification: {MINOR | MAJOR | SUPERSEDE}

Reason: {why this classification}

Proceed with this approach? (yes / change to minor|major|supersede)
```
</step>

<step name="propose_changes">
## Step 4: Propose Changes

### For Minor Updates:

Show inline diff of affected sections:

```
📝 Proposed Minor Changes:

── Frontmatter ──
  updated: "{old_date}" → "{today}"
  {other field changes if any}

── Content Changes ──

Section: {section_name}
  Before: {original text}
  After:  {modified text}

{repeat for each change}
```

### For Major Updates:

Show comprehensive diff:

```
📝 Proposed Major Changes:

── Frontmatter ──
  updated: "{old_date}" → "{today}"
  status: "{old_status}" → "{new_status}" (if changed)
  confidence: "{old}" → "{new}" (if changed)
  tags: {additions/removals}
  related: {additions/removals}

── Summary (L1) ──
  Before:
  > {old summary}
  
  After:
  > {new summary}

── Key Points ──
  {changed bullets with +/- markers}

── Detail (L2) ──
  Section: {section_name}
  {before/after for changed sections}
```

### For Supersede:

**Two documents involved:**

```
📝 Proposed Supersede Operation:

═══ OLD DOCUMENT: {old_id} ═══

Changes to existing doc:
  - status: "{current}" → "superseded"
  - superseded_by: "" → "{new_id}"
  - updated: "{old_date}" → "{today}"
  
  (All other content preserved as historical record)

═══ NEW DOCUMENT: {new_id} ═══

{Full new document draft — spawned via Document Agent}

  - status: "draft"
  - supersedes: "{old_id}"
  - related: [{old related} + "{old_id}"]
```

For supersede, spawn the Document Agent to draft the new document:
- Pass the old document as source_context
- Include the reason for superseding
- Reference the old doc ID in `supersedes` field
</step>

<step name="approve">
## Step 5: Human Approval Gate

```
╔══════════════════════════════════════════════════════╗
║  📝 PROPOSED CHANGES — {UPDATE_TYPE}                 ║
╚══════════════════════════════════════════════════════╝

{Changes summary from Step 4}

Choose action:
  ✅ approve  — Apply changes
  ✏️ edit     — Modify the proposal
  ❌ cancel   — Discard changes
```

**Handle responses:**

- **approve**: Proceed to apply step
- **edit**: Accept user modifications, update proposal, re-display for approval
- **cancel**: Abort — no files modified

```
❌ Cancelled. No changes were applied.
```

**Important:** NEVER auto-update without explicit human approval.
</step>

<step name="apply">
## Step 6: Apply Changes

### For Minor/Major Updates:

1. **Write updated document:**
   ```bash
   # Overwrite with updated content
   cat > .makeit/knowledge/{category}/{filename}.md << 'HEREDOC'
   {updated document content with new frontmatter}
   HEREDOC
   ```

2. **Verify write:**
   ```bash
   head -20 .makeit/knowledge/{category}/{filename}.md
   ```

### For Supersede:

1. **Update OLD document:**
   ```bash
   # Modify old doc — change status + add superseded_by
   cat > .makeit/knowledge/{category}/{old_filename}.md << 'HEREDOC'
   {old document with updated frontmatter: status=superseded, superseded_by={new_id}}
   HEREDOC
   ```

2. **Create NEW document:**
   ```bash
   # Write new doc to appropriate category
   cat > .makeit/knowledge/{new_category}/{new_filename}.md << 'HEREDOC'
   {new document with supersedes={old_id}}
   HEREDOC
   ```

3. **Verify BOTH writes:**
   ```bash
   # Verify bidirectional links
   grep "superseded_by:" .makeit/knowledge/{category}/{old_filename}.md
   grep "supersedes:" .makeit/knowledge/{new_category}/{new_filename}.md
   ```

4. **CRITICAL: Verify bidirectional links are correct:**
   - Old doc `superseded_by` → points to new doc ID
   - New doc `supersedes` → points to old doc ID
   - Both must match exactly

### Rebuild INDEX.md:

Call the internal `_rebuild-index` skill:
- Reads `@templates/roles/_shared/skills/kb-management/_rebuild-index.md`
- Scans all knowledge docs, regenerates INDEX.md
- Superseded docs remain in INDEX with status `superseded`
</step>

<step name="report">
## Step 7: Report — Confirm Update

### For Minor/Major:
```
✅ Knowledge Document Updated

📄 Document: {id}
  - Title: {title}
  - Update type: {MINOR | MAJOR}
  - Status: {status}
  - Updated: {today}

📝 Changes applied:
  - {change 1}
  - {change 2}

📊 INDEX.md: ✅ rebuilt
```

### For Supersede:
```
✅ Knowledge Document Superseded

📄 Old Document: {old_id}
  - Status: superseded
  - Superseded by: {new_id}

📄 New Document: {new_id}
  - Title: {new_title}
  - Status: draft
  - Supersedes: {old_id}

🔗 Bidirectional links: ✅ verified
📊 INDEX.md: ✅ rebuilt

💡 Tip: Review the new document and change status from "draft" to "accepted".
```
</step>

</process>

<important_rules>
1. **NEVER** auto-update without human approval — always show changes first
2. **NEVER** delete a knowledge document — use supersede + archive instead
3. **Supersede is ATOMIC** — BOTH old and new docs must be updated together
4. **Bidirectional links MUST match** — `superseded_by` and `supersedes` point to each other
5. **Always bump `updated` date** — even for minor changes
6. **Always rebuild INDEX.md** — call `_rebuild-index` as final step
7. **Preserve history** — old document content remains intact (only frontmatter changes on supersede)
</important_rules>

<error_handling>
**Document not found:**
```
❌ Document "{query}" not found in knowledge base.

💡 Try:
  - /makeit:search-kb {query} — Search for similar docs
  - Check .makeit/knowledge/INDEX.md — View all documents
```

**Document already superseded:**
```
⚠️ Document "{id}" is already superseded by "{superseded_by_id}".

Options:
  1. Update the superseding doc instead: /makeit:update-doc {superseded_by_id}
  2. Force update this doc anyway (not recommended)
```

**Bidirectional link mismatch (after supersede):**
```
🚨 CRITICAL: Bidirectional links don't match!
  Old doc superseded_by: {value}
  New doc supersedes: {value}
  
  These MUST point to each other. Fixing automatically...
```
</error_handling>

<references>
- `@templates/roles/_shared/knowledge/KNOWLEDGE-DOC-TEMPLATE.md` — Convention template
- `@templates/roles/_shared/knowledge/knowledge-taxonomy.md` — Document types
- `@templates/roles/_shared/agents/makeit-document-agent.md` — Document Agent (for supersede drafting)
- `@templates/roles/_shared/skills/kb-management/_rebuild-index.md` — Index rebuild skill
- `@templates/roles/_shared/skills/kb-management/create-doc.md` — Create doc skill (for cross-reference)
</references>

---
name: create-doc
description: Create a new knowledge document — spawn Document Agent → human approve → publish to knowledge base → rebuild INDEX
---

<purpose>
Create a new knowledge document in the Product Memory System. This skill orchestrates the full creation workflow: gathering input, spawning the Document Agent to draft content, getting human approval, publishing to the correct folder, and rebuilding INDEX.md.

**Human is ALWAYS in the loop.** AI drafts, human verifies, system publishes.
</purpose>

<when_to_use>
- User wants to capture a decision, lesson, pattern, or specification
- Sprint produced knowledge worth documenting
- Stage-complete suggests knowledge extraction
- User explicitly runs `/makeit:create-doc`
</when_to_use>

<process>

<step name="intake" priority="first">
## Step 1: Intake — What Knowledge to Capture

Accept input in one of these forms:

**Explicit input:**
- Topic + type provided by user (e.g., "Create an ADR about our caching strategy")
- Parse topic and type from user message

**Sprint context:**
- Auto-detect from current sprint deliverables in `.makeit/sprint/`
- Scan for architecture decisions, new APIs, lessons learned
- Suggest doc type based on content

**Conversation inference:**
- "Just capture that last decision" — extract from conversation history
- Identify the core knowledge and suggest type/title

**Gather from user (if not provided):**

```
📝 New Knowledge Document

Topic: {topic from user or inferred}
Type: {suggested type}
Category: {auto-detected category}

Is this correct? (yes / adjust)
```

**Required information:**
- `topic` — What the document is about
- `type` — Document type from taxonomy (adr, lesson, api, rule, pattern, etc.)
- `source_context` — Raw material for the document
</step>

<step name="validate">
## Step 2: Validate — Check Taxonomy and Naming

1. **Verify doc type exists in taxonomy:**
   ```bash
   cat .makeit/knowledge/_templates/knowledge-taxonomy.md
   ```
   - If type not in taxonomy → suggest closest match or ask user

2. **Determine category from type:**

   | Type | Category |
   |------|----------|
   | adr, system-map, module | architecture |
   | glossary, rule, journey, feature | business |
   | api, schema, integration, component | technical |
   | lesson, pattern, debt, issue | operational |

3. **Check target folder exists:**
   ```bash
   ls -la .makeit/knowledge/{category}/ 2>/dev/null
   ```
   - If folder missing → create it

4. **Generate proposed filename:**
   
   - Determine next available number for this type:
     ```bash
     ls .makeit/knowledge/{category}/{type}-*.md 2>/dev/null | sort -t- -k2 -n | tail -1
     ```
   - Increment number: `{type}-{NNN+1}-{kebab-title}.md`
   - For singleton types (glossary, system-map): use `{type}.md`

5. **Check for duplicate IDs:**
   ```bash
   grep -r "^id:" .makeit/knowledge/ --include="*.md" 2>/dev/null | grep "{proposed_id}"
   ```
   - If duplicate → increment number or ask user for alternative

6. **Present validation result:**
   ```
   ✅ Validation passed
   
   - Type: {type} (valid)
   - Category: {category}
   - Proposed ID: {proposed_id}
   - Filename: {category}/{proposed_id}.md
   - Path: .makeit/knowledge/{category}/{proposed_id}.md
   
   Proceeding to draft...
   ```
</step>

<step name="draft">
## Step 3: Draft — Spawn Document Agent

Prepare input for Document Agent and spawn it:

**Document Agent input:**
```yaml
topic: "{topic}"
type: "{type}"
category: "{category}"
source_context: |
  {gathered source context — sprint deliverables, conversation, decisions}
proposed_id: "{proposed_id}"
related_docs: [{related doc IDs if any}]
triggering_role: "{current user role from GEMINI.md}"
current_sprint: "{current sprint from .makeit/sprint/}"
```

**Spawn the Document Agent:**

Read the agent definition from:
```
@.agent/agents/makeit-document-agent.md
```

Provide the agent with:
1. All input fields above
2. Access to `.makeit/knowledge/_templates/KNOWLEDGE-DOC-TEMPLATE.md`
3. Access to `.makeit/knowledge/_templates/knowledge-taxonomy.md`
4. Access to existing knowledge docs for cross-referencing

**Agent produces:** A complete knowledge document following convention template.

Present the FULL draft to user.
</step>

<step name="approve">
## Step 4: Human Approval Gate

Display the complete drafted document and ask for approval:

```
╔══════════════════════════════════════════════════════╗
║  📄 KNOWLEDGE DOCUMENT DRAFT                         ║
╚══════════════════════════════════════════════════════╝

ID: {proposed_id}
Type: {type} | Category: {category}
Path: .makeit/knowledge/{category}/{filename}.md

─────────────────────────────────────────────
{Full document content}
─────────────────────────────────────────────

📋 Quality Check:
- ✅ L0 Frontmatter: 14/14 fields populated
- ✅ L1 Summary: ~{N} tokens (target: 200-400)
- ✅ L2 Detail: {N} sections
- ✅ Confidence: {level}

Choose action:
  ✅ approve  — Publish as-is
  ✏️ edit     — Modify before publishing
  ❌ cancel   — Discard draft
```

**Handle responses:**

- **approve**: Proceed to publish step
- **edit**: Accept user modifications, update affected sections, re-display for approval
- **cancel**: Abort cleanly — no files created, no side effects

```
❌ Cancelled. No document was created.
```

**Important:** NEVER auto-publish without explicit human approval.
</step>

<step name="publish">
## Step 5: Publish — Write to Knowledge Base

1. **Write the document:**
   ```bash
   # Create category folder if not exists
   mkdir -p .makeit/knowledge/{category}
   
   # Write document
   cat > .makeit/knowledge/{category}/{filename}.md << 'HEREDOC'
   {approved document content}
   HEREDOC
   ```

2. **Verify write:**
   ```bash
   # Check file exists and has content
   wc -l .makeit/knowledge/{category}/{filename}.md
   # Verify frontmatter is valid
   head -20 .makeit/knowledge/{category}/{filename}.md
   ```

3. **Rebuild INDEX.md:**
   
   Call the internal `_rebuild-index` skill:
   - Reads `@.agent/skills/makeit-{role}/kb-management/_rebuild-index.md`
   - Or shared: `@templates/roles/_shared/skills/kb-management/_rebuild-index.md`
   - Scans all knowledge docs, regenerates INDEX.md
</step>

<step name="report">
## Step 6: Report — Confirm Creation

```
✅ Knowledge Document Created

📄 Document:
  - ID: {proposed_id}
  - Title: {title}
  - Type: {type}
  - Category: {category}
  - Status: draft
  - Confidence: {level}

📂 Location: .makeit/knowledge/{category}/{filename}.md

📊 Knowledge Base Stats:
  - Total docs: {count}
  - {category} category: {category_count} docs
  - INDEX.md: ✅ rebuilt

💡 Tip: Change status from "draft" to "accepted" after team review.
   Run /makeit:update-doc {proposed_id} to update status.
```
</step>

</process>

<error_handling>
**Missing knowledge folder:**
```bash
# If .makeit/knowledge/ doesn't exist
echo "⚠️ Knowledge base not initialized. Run install.sh or create the folder structure manually."
echo "Required: .makeit/knowledge/{architecture,business,technical,operational,_archived}/"
```

**Invalid document type:**
```
⚠️ "{type}" is not a valid document type.
Valid types: adr, system-map, module, glossary, rule, journey, feature, api, schema, integration, component, lesson, pattern, debt, issue

Did you mean: {closest match}?
```

**Template files missing:**
```
⚠️ Convention templates not found at .makeit/knowledge/_templates/
Expected: KNOWLEDGE-DOC-TEMPLATE.md, knowledge-taxonomy.md

Run install.sh to copy templates, or check templates/roles/_shared/knowledge/ for source files.
```
</error_handling>

<references>
- `@templates/roles/_shared/knowledge/KNOWLEDGE-DOC-TEMPLATE.md` — Convention template (source)
- `@templates/roles/_shared/knowledge/knowledge-taxonomy.md` — Document types and naming
- `@templates/roles/_shared/knowledge/INDEX-TEMPLATE.md` — INDEX.md format
- `@templates/roles/_shared/agents/makeit-document-agent.md` — Document Agent definition
- `@templates/roles/_shared/skills/kb-management/_rebuild-index.md` — Index rebuild skill
</references>

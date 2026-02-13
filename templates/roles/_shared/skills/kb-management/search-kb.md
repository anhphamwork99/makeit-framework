---
name: search-kb
description: Search the Product Knowledge Base using Reasoning RAG (Deep Query pattern)
---

<purpose>
Search the Product Knowledge Base for relevant knowledge documents. Uses the Deep Query Reasoning RAG pattern — the LLM reads INDEX.md and reasons about which documents to retrieve, instead of relying on keyword or vector search.

This skill implements Progressive Disclosure retrieval:
- **L0:** INDEX.md (~500 tokens) — know WHAT exists
- **L1:** Frontmatter + Summary per doc (~1500 tokens/doc) — understand decisions
- **L2:** Full document content (~3000-5000 tokens/doc) — complete detail

**Integration with Deep Query:**
This IS the "Knowledge Items" adapter for the Deep Query skill (`.agent/skills/deep-query/SKILL.md`). It uses the same core pattern: `build_index → navigate → retrieve → evaluate`.

**No custom search infrastructure needed.** The LLM's reasoning over the structured INDEX.md IS the search engine.
</purpose>

<process>

<step name="load_index">
## Step 1: Load INDEX.md (L0 — ~500 tokens)

Read `.makeit/knowledge/INDEX.md`.

**If file does not exist:**
```
📚 No knowledge base found.

The knowledge base hasn't been initialized yet.
Use `/makeit:create-doc` to create your first knowledge document.

💡 Tip: Start with an ADR (Architecture Decision Record)
   or a Lesson Learned — these have the highest ROI.
```
STOP — no knowledge to search.

**If file exists but empty (0 docs):**
```
📚 Knowledge base is empty (0 documents).

Use `/makeit:create-doc` to add knowledge documents.
```
STOP.

**If file exists with documents:**
Internalize:
- Quick Stats (overview of what exists)
- Documents table (all active docs with metadata)
- Recently Updated (fresh knowledge)
- Cross-Reference Map (how docs relate)

Display brief acknowledgment:
```
📚 Knowledge Base: {N} active docs across {M} categories
```

Continue to Step 2.
</step>

<step name="understand_query">
## Step 2: Understand the Query

Analyze what the user/agent is looking for.

**If called by a user:** The query is what the user asked.
**If called by another skill/agent:** The query is provided in the skill invocation context.

**Reasoning process:**
1. What is being asked? (fact, decision, pattern, rule, how-to, etc.)
2. Which **category** is most likely relevant?
   - Architecture decisions, system design → `architecture`
   - Business rules, domain terms, user journeys → `business`
   - API contracts, data schemas, integrations → `technical`
   - Lessons, patterns, tech debt, known issues → `operational`
3. Which **document types** are most likely relevant?
   - "Why did we choose X?" → `adr`
   - "What's the rule for X?" → `rule`
   - "What happened when X?" → `lesson`
   - "How does API X work?" → `api`
   - "What's the schema for X?" → `schema`
   - "How do we handle X?" → `pattern`
4. Which **tags** might match?
   - Extract keywords from the query
   - Map to likely tag values

**Role-based filtering (if `role` parameter provided):**

| Role | Priority Categories | Priority Types |
|------|-------------------|----------------|
| PO | business | feature, journey, rule, glossary |
| BA | business | rule, journey, feature, glossary |
| Techlead | architecture, technical | adr, module, system-map, pattern |
| Dev FE | technical, operational | component, pattern, lesson, integration |
| Dev BE | technical, operational | api, schema, integration, pattern, lesson |

When role is specified, prioritize candidates from the matching categories and types. **Do not exclude** other categories — just rank them lower.
</step>

<step name="navigate">
## Step 3: Navigate — Reasoning RAG Selection

Read the INDEX.md Documents table and reason about which documents are most likely to contain the answer.

**Reasoning process (Deep Query `navigate` capability):**

For each document in the table, consider:
1. Does the **title** relate to the query?
2. Does the **type** match what we're looking for?
3. Does the **category** match?
4. Do the **tags** overlap with query keywords?
5. Is the **status** `accepted` (preferred) or `draft` (less reliable)?
6. Is it **recently updated** (more current)?

**Select 1-5 candidate documents** ranked by relevance confidence.

```
🔍 Candidate documents (by reasoning):

| Rank | ID | Title | Confidence | Reason |
|------|----|-------|------------|--------|
| 1 | {id} | {title} | high | {why selected} |
| 2 | {id} | {title} | medium | {why selected} |
| 3 | {id} | {title} | low | {why selected} |
```

**If no candidates seem relevant:**
```
🔍 No relevant documents found for: "{query}"

The knowledge base has {N} documents, but none match your query.

Suggestions:
- Try a different query phrasing
- Check the knowledge base index: `.makeit/knowledge/INDEX.md`
- Create a new knowledge document: `/makeit:create-doc`
```
STOP.
</step>

<step name="retrieve_l1">
## Step 4: Retrieve L1 — Summary Level (~1500 tokens/doc)

For each candidate document (starting with highest ranked):

1. Read the document file
2. Extract **ONLY**:
   - YAML frontmatter (full metadata)
   - `## Summary` section (blockquote format)
   - `## Key Points` section (bullet list)
3. **Stop reading** — do NOT load L2 detail sections yet

**Evaluate (Deep Query `evaluate` capability):**

For each candidate, ask: "Does this document's summary answer the query?"

| Result | Action |
|--------|--------|
| **YES — Answer found at L1** | Return the answer with citation. Go to Step 6. |
| **PARTIAL — Need more detail** | Mark for L2 retrieval. Continue to Step 5. |
| **NO — Not relevant** | Discard this candidate. Try next candidate. |

**If all candidates evaluated and none answer the query:**
```
🔍 Searched {N} candidate documents but couldn't find a clear answer.

Closest matches:
- {id}: {title} — {why it was close but insufficient}

Suggestions:
- The knowledge may not be documented yet
- Try `/makeit:create-doc` to document this knowledge
```
STOP.
</step>

<step name="retrieve_l2">
## Step 5: Retrieve L2 — Full Content (only if needed)

**Only reached when L1 summary was insufficient.**

For the top candidate(s) marked for L2 retrieval:

1. Read the **full document content** (all sections)
2. Extract the precise answer from the detail sections

**Token awareness:** Each L2 document costs ~3000-5000 tokens. Load at most 2-3 documents at L2 to stay within reasonable context usage.

**If L2 still doesn't answer the query:**
Report partial findings and suggest creating new documentation.
</step>

<step name="return_results">
## Step 6: Return Results

Format the answer with source citations:

```
📚 Knowledge Base Search Results

**Query:** {original query}

**Answer:**
{Answer synthesized from found documents}

**Sources:**
| Doc ID | Title | Confidence | Level |
|--------|-------|------------|-------|
| {id} | {title} | {doc's confidence field} | L1/L2 |

**Related documents** (from `related` field):
- {related-id}: {title}
```

### Answer Quality Rules

1. **Always cite the source document(s)** — never present knowledge without attribution
2. **Include the document's confidence level** — `high`, `medium`, or `low`
3. **Distinguish L1 vs L2 answers** — L1 answers are summaries, L2 are detailed
4. **Suggest related documents** for further reading (from `related` field)
5. **If multiple documents contribute** to the answer, cite all of them
6. **Prefer `accepted` status docs** over `draft` or `proposed`
7. **Note if knowledge might be stale** — check `updated` date
</step>

</process>

<integration>

## Deep Query Integration

This skill implements the **Knowledge Items adapter** for the Deep Query skill.

### Capability Mapping

| Deep Query Capability | Knowledge Items Implementation |
|-----------------------|-------------------------------|
| `build_index(source)` | Read `.makeit/knowledge/INDEX.md` (L0) |
| `navigate(index, query)` | LLM reasons over Documents table to select candidates |
| `retrieve(source, location)` | Read L1 (frontmatter + summary) or L2 (full doc) |
| `evaluate(content, query)` | Check if retrieved content answers the query |

### Composability

Other skills can call `search-kb` as part of their workflow:

```
stage-clarify     → calls → search-kb (load relevant context)
stage-plan-phase  → calls → search-kb (check for ADRs/patterns)
execute-phase     → calls → search-kb (find API contracts/schemas)
stage-complete    → calls → search-kb (verify consistency)
```

### Adapter Registration

When the Deep Query skill's Knowledge Items adapter is formally built, this skill provides the implementation. The adapter file would be at `.agent/skills/deep-query/adapters/knowledge-items.md` and would reference this skill as the MakeIt-specific implementation.

</integration>

<parameters>

## Optional Parameters

When called with parameters (by other skills or agents):

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `query` | string | The search query | "What auth strategy did we choose?" |
| `role` | string | Filter by role relevance | "techlead", "dev-be" |
| `category` | string | Filter to specific category | "architecture" |
| `type` | string | Filter to specific doc type | "adr" |
| `max_results` | number | Maximum documents to return | 3 (default: 5) |
| `depth` | string | Maximum retrieval depth | "L1" (default: "L2") |

**When called interactively (by user):**
No parameters needed — ask the user what they're looking for.

</parameters>

<success_criteria>
- [ ] INDEX.md loaded successfully (L0)
- [ ] Query understood and mapped to relevant categories/types
- [ ] Candidates selected via reasoning (not keyword matching)
- [ ] Progressive Disclosure followed: L0 → L1 → L2 (only as needed)
- [ ] Results include source citations with document IDs
- [ ] Confidence levels from document frontmatter included
- [ ] Related documents suggested for further reading
- [ ] Role-based filtering applied when role parameter provided
- [ ] Graceful handling of: empty KB, no results, stale docs
</success_criteria>

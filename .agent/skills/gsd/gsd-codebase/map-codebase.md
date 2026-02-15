<purpose>
Orchestrate parallel codebase mapper agents to analyze codebase and produce structured documents in .planning/codebase/

Each agent has fresh context, explores a specific focus area, and **writes documents directly**. The orchestrator only receives confirmation + line counts, then writes a summary.

Output: .planning/codebase/ folder with 7 structured documents about the codebase state.
Optional: When Serena MCP is available, adds 2 semantic analysis documents (SYMBOLS.md, DEPENDENCIES.md) via `map-codebase-semantic.md` agent.
</purpose>

<philosophy>
**Why dedicated mapper agents:**
- Fresh context per domain (no token contamination)
- Agents write documents directly (no context transfer back to orchestrator)
- Orchestrator only summarizes what was created (minimal context usage)
- Faster execution (agents run simultaneously)

**Document quality over length:**
Include enough detail to be useful as reference. Prioritize practical examples (especially code patterns) over arbitrary brevity.

**Always include file paths:**
Documents are reference material for Agent when planning/executing. Always include actual file paths formatted with backticks: `src/services/user.ts`.
</philosophy>

<process>

<step name="resolve_model_profile" priority="first">
Read model profile for agent spawning:

```bash
MODEL_PROFILE=$(cat .planning/config.json 2>/dev/null | grep -o '"model_profile"[[:space:]]*:[[:space:]]*"[^"]*"' | grep -o '"[^"]*"$' | tr -d '"' || echo "balanced")
```

Default to "balanced" if not set.

**Model lookup table:**

| Agent | quality | balanced | budget |
|-------|---------|----------|--------|
| gsd-codebase-mapper | sonnet | haiku | haiku |

Store resolved model for use in Task calls below.
</step>

<step name="check_existing">
Check if .planning/codebase/ already exists:

```bash
ls -la .planning/codebase/ 2>/dev/null
```

**If exists:**

```
.planning/codebase/ already exists with these documents:
[List files found]

What's next?
1. Refresh - Delete existing and remap codebase
2. Update - Keep existing, only update specific documents
3. Skip - Use existing codebase map as-is
```

Wait for user response.

If "Refresh": Delete .planning/codebase/, continue to create_structure
If "Update": Ask which documents to update, continue to spawn_agents (filtered)
If "Skip": Exit workflow

**If doesn't exist:**
Continue to detect_serena.
</step>

<step name="detect_serena">
Check if Serena MCP is available for semantic analysis:

```bash
ls -la .serena/project.yml 2>/dev/null
```

**If `.serena/project.yml` exists:**

Set `SERENA_AVAILABLE=true`

```
🔮 Serena detected — semantic analysis will be included
   Additional output: SYMBOLS.md, DEPENDENCIES.md
```

**If `.serena/project.yml` does NOT exist:**

Set `SERENA_AVAILABLE=false`

```
📄 Serena not configured — using file-level analysis
   (run /quick:serena setup to enable semantic analysis)
```

**User override:** If user passed `--no-serena` flag or explicitly says "skip Serena", set `SERENA_AVAILABLE=false` regardless.

Continue to create_structure.
</step>

<step name="create_structure">
Create .planning/codebase/ directory:

```bash
mkdir -p .planning/codebase
```

**Expected output files:**
- STACK.md (from tech mapper)
- INTEGRATIONS.md (from tech mapper)
- ARCHITECTURE.md (from arch mapper)
- STRUCTURE.md (from arch mapper)
- CONVENTIONS.md (from quality mapper)
- TESTING.md (from quality mapper)
- CONCERNS.md (from concerns mapper)
- SYMBOLS.md (from semantic mapper — only if SERENA_AVAILABLE=true)
- DEPENDENCIES.md (from semantic mapper — only if SERENA_AVAILABLE=true)

Continue to spawn_agents.
</step>

<step name="spawn_agents">
Spawn 4 parallel gsd-codebase-mapper agents.

Use Task tool with `subagent_type="gsd-codebase-mapper"`, `model="{mapper_model}"`, and `run_in_background=true` for parallel execution.

**CRITICAL:** Use the dedicated `gsd-codebase-mapper` agent, NOT `Explore`. The mapper agent writes documents directly.

**Agent 1: Tech Focus**

Task tool parameters:
```
subagent_type: "gsd-codebase-mapper"
model: "{mapper_model}"
run_in_background: true
description: "Map codebase tech stack"
```

Prompt:
```
Focus: tech

Analyze this codebase for technology stack and external integrations.

Write these documents to .planning/codebase/:
- STACK.md - Languages, runtime, frameworks, dependencies, configuration
- INTEGRATIONS.md - External APIs, databases, auth providers, webhooks

Explore thoroughly. Write documents directly using templates. Return confirmation only.
```

**Agent 2: Architecture Focus**

Task tool parameters:
```
subagent_type: "gsd-codebase-mapper"
model: "{mapper_model}"
run_in_background: true
description: "Map codebase architecture"
```

Prompt:
```
Focus: arch

Analyze this codebase architecture and directory structure.

Write these documents to .planning/codebase/:
- ARCHITECTURE.md - Pattern, layers, data flow, abstractions, entry points
- STRUCTURE.md - Directory layout, key locations, naming conventions

Explore thoroughly. Write documents directly using templates. Return confirmation only.
```

**Agent 3: Quality Focus**

Task tool parameters:
```
subagent_type: "gsd-codebase-mapper"
model: "{mapper_model}"
run_in_background: true
description: "Map codebase conventions"
```

Prompt:
```
Focus: quality

Analyze this codebase for coding conventions and testing patterns.

Write these documents to .planning/codebase/:
- CONVENTIONS.md - Code style, naming, patterns, error handling
- TESTING.md - Framework, structure, mocking, coverage

Explore thoroughly. Write documents directly using templates. Return confirmation only.
```

**Agent 4: Concerns Focus**

Task tool parameters:
```
subagent_type: "gsd-codebase-mapper"
model: "{mapper_model}"
run_in_background: true
description: "Map codebase concerns"
```

Prompt:
```
Focus: concerns

Analyze this codebase for technical debt, known issues, and areas of concern.

Write this document to .planning/codebase/:
- CONCERNS.md - Tech debt, bugs, security, performance, fragile areas

Explore thoroughly. Write document directly using template. Return confirmation only.
```

**Agent 5: Semantic Focus (CONDITIONAL — only if SERENA_AVAILABLE=true)**

Task tool parameters:
```
subagent_type: "gsd-codebase-mapper"
model: "{mapper_model}"
run_in_background: true
description: "Map codebase symbols (Serena)"
```

Prompt:
```
Focus: semantic

@.agent/skills/gsd/gsd-codebase/map-codebase-semantic.md

Use Serena MCP tools to analyze symbols and references in this codebase.

Write these documents to .planning/codebase/:
- SYMBOLS.md - Symbol catalog with exports, types, functions per module
- DEPENDENCIES.md - Symbol-level dependency graph and cross-module references

Follow the semantic mapper instructions. Use fallback strategy if any Serena tool fails.
Return confirmation only.
```

**If SERENA_AVAILABLE=false:** Skip Agent 5 entirely. Standard 4-agent behavior.

Continue to collect_confirmations.
</step>

<step name="collect_confirmations">
Wait for all agents to complete (4 standard + 1 semantic if Serena enabled).

Read each agent's output file to collect confirmations.

**Expected confirmation format from each agent:**
```
## Mapping Complete

**Focus:** {focus}
**Documents written:**
- `.planning/codebase/{DOC1}.md` ({N} lines)
- `.planning/codebase/{DOC2}.md` ({N} lines)

Ready for orchestrator summary.
```

**Semantic mapper confirmation (if Serena enabled):**
```
## Semantic Mapping Complete

**Focus:** semantic (Serena-enhanced)
**Documents written:**
- `.planning/codebase/SYMBOLS.md` ({N} lines)
- `.planning/codebase/DEPENDENCIES.md` ({N} lines)

**Serena tools used:**
- get_symbols_overview: {N} calls
- find_referencing_symbols: {N} calls
- find_symbol: {N} calls
```

**What you receive:** Just file paths and line counts. NOT document contents.

If any agent failed, note the failure and continue with successful documents.
If semantic mapper failed but standard mappers succeeded, note Serena degradation but don't treat as overall failure.

Continue to verify_output.
</step>

<step name="verify_output">
Verify all documents created successfully:

```bash
ls -la .planning/codebase/
wc -l .planning/codebase/*.md
```

**Verification checklist:**
- All 7 standard documents exist
- No empty documents (each should have >20 lines)
- **If SERENA_AVAILABLE=true:** Also check SYMBOLS.md and DEPENDENCIES.md exist
  - If semantic docs missing: log warning but don't fail
  ```
  ⚠️ Serena semantic mapper did not produce output — continuing with standard map only
  ```

If any documents missing or empty, note which agents may have failed.

Continue to commit_codebase_map.
</step>

<step name="commit_codebase_map">
Commit the codebase map:

**Check planning config:**

```bash
COMMIT_PLANNING_DOCS=$(cat .planning/config.json 2>/dev/null | grep -o '"commit_docs"[[:space:]]*:[[:space:]]*[^,}]*' | grep -o 'true\|false' || echo "true")
git check-ignore -q .planning 2>/dev/null && COMMIT_PLANNING_DOCS=false
```

**If `COMMIT_PLANNING_DOCS=false`:** Skip git operations

**If `COMMIT_PLANNING_DOCS=true` (default):**

```bash
git add .planning/codebase/*.md
git commit -m "$(cat <<'EOF'
docs: map existing codebase

- STACK.md - Technologies and dependencies
- ARCHITECTURE.md - System design and patterns
- STRUCTURE.md - Directory layout
- CONVENTIONS.md - Code style and patterns
- TESTING.md - Test structure
- INTEGRATIONS.md - External services
- CONCERNS.md - Technical debt and issues
$([ "$SERENA_AVAILABLE" = "true" ] && echo "- SYMBOLS.md - Symbol catalog (Serena)" && echo "- DEPENDENCIES.md - Dependency graph (Serena)")
EOF
)"
```

Continue to offer_next.
</step>

<step name="offer_next">
Present completion summary and next steps.

**Get line counts:**
```bash
wc -l .planning/codebase/*.md
```

**Output format:**

```
Codebase mapping complete.

Created .planning/codebase/:
- STACK.md ([N] lines) - Technologies and dependencies
- ARCHITECTURE.md ([N] lines) - System design and patterns
- STRUCTURE.md ([N] lines) - Directory layout and organization
- CONVENTIONS.md ([N] lines) - Code style and patterns
- TESTING.md ([N] lines) - Test structure and practices
- INTEGRATIONS.md ([N] lines) - External services and APIs
- CONCERNS.md ([N] lines) - Technical debt and issues
```

**If SERENA_AVAILABLE=true, also list:**
```
🔮 Serena semantic analysis:
- SYMBOLS.md ([N] lines) - Symbol catalog with exports and references
- DEPENDENCIES.md ([N] lines) - Cross-module dependency graph
```

```

---

## ▶ Next Up

**Initialize project** — use codebase context for planning

`/gsd:new-project`

<sub>`/clear` first → fresh context window</sub>

---

**Also available:**
- Re-run mapping: `/gsd:map-codebase`
- Review specific file: `cat .planning/codebase/STACK.md`
- Edit any document before proceeding

---
```

End workflow.
</step>

</process>

<success_criteria>
- .planning/codebase/ directory created
- 4 parallel gsd-codebase-mapper agents spawned with run_in_background=true
- Agents write documents directly (orchestrator doesn't receive document contents)
- Read agent output files to collect confirmations
- All 7 standard codebase documents exist
- If Serena available: 5th semantic mapper agent spawned, SYMBOLS.md + DEPENDENCIES.md produced
- If Serena unavailable: standard 4-agent behavior, no errors
- Clear completion summary with line counts (including semantic docs if applicable)
- User offered clear next steps in GSD style
</success_criteria>

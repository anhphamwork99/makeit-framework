---
name: ba-workflow-document-flow
description: Document complete user flow — entry point through happy path, alternative paths, edge cases, to error handling
---

<purpose>
Document the complete user flow from entry point through happy path, alternative paths, edge cases, and error handling. BA owns flow documentation — not Designer, not PO.
</purpose>

<required_reading>
@ba-execution/templates/user-flow.md
@ba-execution/workflows/analyze-design.md
</required_reading>

<rules>
1. BA owns flow documentation — not Designer, not PO
2. Always define entry point with preconditions
3. Happy path must be documented step-by-step with screen states
4. Alternative paths must specify trigger, flow, and result
5. Edge cases documented with scenario, trigger, and expected behavior
6. Error handling must specify error trigger, user message, and recovery path
</rules>

<output>
User flow document → `.makeit/sprint/SPRINT-*/deliverables/FLOW-{feature}.md`
Template: `@ba-execution/templates/user-flow.md`
</output>

<process>
  <step name="gather_inputs">
    Collect:
    - Figma analysis report (from analyze-design output)
    - PO goal and context (from SPECS.md)
    - Existing user stories (if available)
  </step>

  <step name="define_entry_point">
    Document:
    - Where does the user arrive from?
    - What preconditions exist? (logged in, has data, permissions)
    - What's the initial screen state?
  </step>

  <step name="document_happy_path">
    Step-by-step:
    ```
    1. User [action] → System [response] → [Screen/State]
    2. User [action] → System [response] → [Screen/State]
    3. Result: [Expected outcome]
    ```
  </step>

  <step name="document_alternative_paths">
    For each branching point:
    - **Trigger:** What condition causes the branch?
    - **Flow:** Steps different from happy path
    - **Result:** Where does this path end?
  </step>

  <step name="document_edge_cases">
    | Scenario | Trigger | Expected Behavior |
    |----------|---------|-------------------|
    | Empty state | No data | Show empty illustration + CTA |
    | Error state | Network error | Show error + retry option |
    | Max limit | Boundary reached | Show warning, block action |
  </step>

  <step name="document_error_handling">
    | Error | Trigger | User Sees | Recovery |
    |-------|---------|-----------|----------|
    | Network | No internet | Retry banner | Auto-retry on reconnect |
  </step>
</process>

<success_criteria>
- [ ] Entry point defined with preconditions
- [ ] Happy path documented step-by-step
- [ ] Alternative paths documented with triggers
- [ ] Edge cases listed with expected behavior
- [ ] Error handling documented with recovery paths
- [ ] Flow document uses template format
</success_criteria>

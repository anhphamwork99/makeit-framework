---
name: discover-product-context
description: BA context discovery — scan existing user stories, journey maps, acceptance criteria patterns, and PO product context before analysis
---

<purpose>
Gather existing product and BA-specific context at the start of a sprint so story creation builds on what already exists. Runs during `/makeit:clarify` after gate verification. Output saves to `PRODUCT-CONTEXT.md` in the sprint workspace.
</purpose>

<when_to_use>
- Automatically during `/makeit:clarify` (discover_context step)
- Manually when BA needs to understand existing story patterns
- When working on features that extend or modify existing functionality
</when_to_use>

<process>
  <step name="scan_existing_stories">
    Scan for existing user stories from previous sprints:

    1. **Previous sprint deliverables** — Check `.makeit/sprint/` for past story files
    2. **Story patterns** — How are stories structured? Format, detail level
    3. **Acceptance criteria patterns** — Given/When/Then? Checklist? Mixed?
    4. **Edge case documentation** — How detailed are edge case analyses?

    Record patterns to maintain consistency with existing stories.
  </step>

  <step name="review_user_journeys">
    Look for existing user journey documentation:

    1. **Flow documents** — Check deliverables/ for user flow docs
    2. **Screen sequences** — Infer user journeys from route/page structure
    3. **State diagrams** — Any state machine or flow documentation?
    4. **Error flows** — How are error cases documented?

    > If no formal journeys exist, note this — BA may need to create from scratch.
  </step>

  <step name="check_ac_patterns">
    Identify existing acceptance criteria patterns for consistency:

    1. **Format used** — Given/When/Then vs simple checklist
    2. **Granularity** — How many ACs per story? (target: ≥ 3)
    3. **Testability** — Are ACs checkable and specific?
    4. **Edge case inclusion** — Are edge cases part of ACs or separate?

    Adopt the established pattern for new stories.
  </step>

  <step name="review_po_context">
    Check if PO has already created product context:

    1. **PO's PRODUCT-CONTEXT.md** — If PO ran discover-product-context first
    2. **Sprint goal document** — PO's goal and context from Lark
    3. **Business priorities** — What does PO emphasize?
    4. **Design context** — Figma links, designer notes

    Build on PO's context rather than duplicating work.
  </step>

  <step name="review_existing_deliverables">
    Review existing product documentation and knowledge base:

    1. **Knowledge base** — Check `.makeit/knowledge/` for relevant business/product docs
    2. **Previous sprint handoffs** — What was delivered and handed off?
    3. **Design system awareness** — What UI components are available (from Figma)?
    4. **Feature inventory** — What features are shipped vs in-progress?

    > BA focuses on product-level awareness from documentation, not codebase scanning. Technical context is the Techlead's responsibility.
  </step>

  <step name="save_to_snapshot">
    Save all findings to `PRODUCT-CONTEXT.md` in sprint workspace:
    - Fill "Product Context" section (Existing Features, User Journeys, Business Metrics)
    - Fill "Notes for This Sprint" with BA-relevant observations
    - Fill "Project Structure" with high-level directory overview
    - Fill "Existing Patterns" with story/AC patterns found

    Path: `.makeit/sprint/SPRINT-{NNN}/PRODUCT-CONTEXT.md`

    > Copy template from `@ba-discovery/templates/PRODUCT-CONTEXT.md`
  </step>
</process>

<output>
- `.makeit/sprint/SPRINT-{NNN}/PRODUCT-CONTEXT.md` — filled with product + BA context
- Summary of key findings presented to user
</output>

<success_criteria>
- [ ] Existing stories scanned and patterns documented
- [ ] User journey documentation reviewed (or noted as unavailable)
- [ ] Acceptance criteria patterns identified for consistency
- [ ] PO product context reviewed (if available)
- [ ] Existing deliverables and knowledge base reviewed
- [ ] PRODUCT-CONTEXT.md saved in sprint workspace
</success_criteria>

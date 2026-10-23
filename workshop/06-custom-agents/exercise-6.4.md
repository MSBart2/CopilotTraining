# Exercise 6.4: Sharpen the Feature Spec for the Implementation Agent

## 🎯 Objective

Use plan mode to audit and improve `fanhub/docs/FEATURE-CHARACTER-DETAIL.md` — filling in API shapes, migration details, and test expectations so that the `@implement` agent can execute without guessing.

> **Note:** Great implementation needs a great spec. This exercise bridges planning and delivery: plan mode has the research tools to close gaps in the spec, and a tighter spec produces more complete, reliable implementation output.

**Lead:** David ⭐ | **Support:** Sarah 🤝, Marcus 🤝

---

## 📖 The Story

### ❌ The "Before" — Implementation Gaps from a Vague Spec

**Monday 4:45 PM** — Sarah just ran `@implement` against the Feature Spec. The implementation ran, but David reviews the output and finds problems:

- The API response shape wasn't specified, so the agent inferred one that doesn't match existing routes
- The database migration is missing — the spec mentioned schema changes but not what they were
- Test expectations were described as "comprehensive" but without specifics, the agent wrote shallow happy-path tests

David realizes: *"The implementation agent is only as good as the spec it reads. If the spec leaves things open to interpretation, the agent fills in the gaps with plausible-but-wrong assumptions."*

---

### ✨ The "After" — Plan Mode Closes the Gaps

**The transformation:**

David uses `@plan` to audit the Feature Spec before passing it to `@implement`. Plan mode has exactly the right tools for this: it can search the codebase for existing route patterns, inspect the schema, and cross-reference test conventions — then write those findings back into the spec as concrete, verifiable requirements.

**Results:**
- **API shape**: explicitly specified, matching existing route patterns in the codebase
- **Migration**: concrete `ALTER TABLE` statement added, matching the schema file
- **Tests**: specific unit and integration test expectations anchored to actual edge cases

The spec grows from a design document into an implementation contract. `@implement` can now execute without interpretation gaps.

---

### 💭 David's Realization

> *"A spec that makes the agent guess is a spec that needs more work. Plan mode has the research tools to close those gaps without rewriting from scratch."*

---

## 🔨 Steps

### Step 1: Audit the Spec with Plan Mode

Run plan mode to identify what the spec leaves ambiguous:

```
/plan Improve fanhub/docs/FEATURE-CHARACTER-DETAIL.md using mcp, skills and architecture.md.
```

Let plan mode research the codebase to resolve ambiguous sections. It will:
- Search existing routes to find the right API response shape
- Inspect the schema file to determine what migration is needed
- Cross-reference test patterns to anchor the test expectations to real conventions

### Step 2: Save the Improved Spec

Accept plan mode's proposed additions to `FEATURE-CHARACTER-DETAIL.md`. The improved spec now includes:

- [ ] Concrete API response shape (fields, types, example response)
- [ ] A specific database migration statement
- [ ] Explicit test expectations with at least one unit test case and one integration test case

### Step 3: Run `@implement` and Compare

Run the implementation agent against the improved spec:

```
@implement Read fanhub/docs/FEATURE-CHARACTER-DETAIL.md and implement the complete feature.
```

Compare the output to the earlier run against the original spec:
- Does the API shape match existing routes now?
- Is the migration present and correct?
- Are the tests more specific and complete?

---

## ✅ Success Criteria

- [ ] The spec has concrete API shapes, migration details, and test expectations
- [ ] Ambiguous sections are resolved with actual codebase evidence
- [ ] `/implement` produces more complete, reliable results from the improved spec

---

## 💡 Key Concepts

**Plan mode as a spec reviewer** — the `@plan` agent has read-only access to search, fetch, and inspect the codebase. That makes it ideal for auditing specs: it can find the right answers in the actual code rather than inferring them.

**Spec quality compounds** — a tighter spec improves every downstream artifact: the implementation is more complete, the tests are more specific, and the character-review handoff has fewer surprises to catch.

**The connection to Module 2** — plan mode first appeared in Module 2 as a tool for planning features before implementing them. This exercise shows another use: improving an existing spec so the implementation agent has a reliable contract to work from.

---

## ➡️ Next Up

**[Exercise 6.5: Explore Agent Teams with Squad](exercise-6.5.md)** — end with a VS Code-first look at persistent multi-agent collaboration as an "art of the possible" capstone.

---

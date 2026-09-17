---
status: active
updated: YYYY-MM-DD
section: "Sub-group Name"
references:
  - url: https://docs.github.com/en/copilot/...
    label: "Official doc page title"
    verified: YYYY-MM-DD
  - url: https://github.blog/...
    label: "Blog post or article title"
    verified: YYYY-MM-DD
---

# [Feature/Capability Name]: [Compelling Subtitle]

> **The Question This Talk Answers:**
> *"[Single clear question that readers have - e.g., 'How do I X without Y?' or 'When should I use X instead of Y?']"*

**Duration:** [XX] minutes | **Target Audience:** [Developers/Architects/DevOps/Leaders]

---

## 📊 Content Fitness

Use this rubric during content creation. If any category is 🔴 or 🟡, revise before publishing.

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High / 🟡 Medium / 🔴 Low | [Why this matters now / who needs this / what problem it solves] |
| **Compelling** | 🟢 High / 🟡 Medium / 🔴 Low | [What makes this interesting beyond product docs / unique angle / "aha" moment] |
| **Actionable** | 🟢 High / 🟡 Medium / 🔴 Low | [Concrete takeaway / something readers can do today / measurable outcome] |

**Overall Status:** 🟢 Ready to use | 🟡 Needs work | 🔴 Revisit approach

> **For Authors:** Don't publish with any 🔴. Fix 🟡 items before marking complete. Aim for all 🟢.

---

## Reader-First README Contract

This template produces the **canonical, human-readable tech talk**. Keep visible content focused on practitioners reading the README. Slides are generated later as a separate artifact.

### What belongs in the README

- The question this talk answers
- The opportunity, mechanics, artifacts, decision criteria, and references
- 3-6 major deep-dive sections with concrete examples
- A clear mental model with a standalone core insight

### Coverage and sequence

Treat the sections below as coverage prompts. Choose, combine, and order them around the approved narrative arc so that each section advances the thesis, proves it through an artifact, exposes a boundary, or enables transfer. Do not preserve a template heading as a standalone section when its content serves the reader better inside another section.

### What does not belong in the README

- Slide sequence tables
- Speaker notes or presentation choreography
- Visible "this becomes a slide" explanations
- Any section whose primary audience is a generator rather than a human reader

### Invisible structure hints

If helpful, mark major sections with a comment before the H2 heading:

```markdown
<!-- 🎬 MAJOR SECTION: [Short Name for TOC Card] -->
## [Full Section Heading]
```

These comments stay invisible to readers while giving downstream tooling lightweight structural hints.

---

## The Opportunity

### What's Now Possible

- **[Capability 1]**
  [1 sentence describing what teams can now do]

- **[Capability 2]**
  [1 sentence describing what teams can now do]

- **[Capability 3]**
  [1 sentence describing what teams can now do]

- **[Capability 4]**
  [1 sentence describing what teams can now do]

### The Emerging Practice

[2-3 paragraphs illuminating the new approach. Focus on curiosity: what does this unlock? Who is already exploring this? What becomes easier or newly feasible? Paint a picture of possibility that makes readers think "I want to try that." Include specific examples of what's achievable.]

---

## How It Works: [Feature Name]

### What It Does

[2-3 sentences explaining the core capability and its primary mechanism. Focus on the "what" and "how" at a high level.]

### Key Capabilities

- **[Capability 1]**: [Brief description with specific benefit]
- **[Capability 2]**: [Brief description with specific benefit]
- **[Capability 3]**: [Brief description with specific benefit]
- **[Capability 4]**: [Brief description with specific benefit]

### Architecture Overview

[2-3 paragraphs explaining how the solution works. Include component relationships, data flow, or execution model. Use analogies if helpful. Keep it accessible—deep dives come later.]

**Official Documentation:**
- 📖 [Main Feature Documentation](URL) — Core concepts and getting started
- 📖 [API/CLI Reference](URL) — Command syntax and options
- 📖 [Best Practices Guide](URL) — Patterns and recommendations (optional third link)

---

## Visual Assets

*Optional but highly recommended: Include diagrams, screenshots, and visual aids from source documentation*

### When to Include Images

- **Architecture diagrams** — System structure, component relationships, data flow
- **Screenshots** — CLI output, UI features, configuration panels
- **Flow charts** — Process workflows, decision trees, execution sequences
- **Before/After comparisons** — Visual proof of improvements or changes

### Image Organization

Store images in local `images/` subdirectory:

```
tech-talks/
  your-talk-name/
    README.md
    images/
      architecture-overview.png
      cli-example-output.png
      workflow-diagram.svg
```

### Image Guidelines

- **Prefer SVG** for diagrams (scalable, small file size)
- **Use descriptive filenames** — `workflow-diagram.svg` not `image1.svg`
- **Include alt text** — Describe what the image shows for accessibility
- **Keep images focused** — Crop to relevant portions, avoid full-page screenshots
- **Optimize file size** — Resize to reasonable dimensions (1200px width max)
- **Credit sources** — Note origin if from external documentation

### Example Usage in Content

```markdown
![Architecture Overview](images/architecture-overview.png)
*Figure: Core components and their interactions*

![CLI Output Example](images/cli-example-output.png)
*Example: Running `copilot -p "analyze logs"` shows structured output*
```

**For Authors:** Images extracted during tech-talk generation are downloaded to `images/` directory automatically. Review for quality and relevance before publishing.

---

## Key Artifacts

**Every tech talk must include working artifacts.** These are the actual files, configurations, or code samples that demonstrate the feature in action.

### Primary Artifacts

*These are shown inline with detailed explanation in the major sections below*

- **`[filename]`** — [One-line purpose, e.g., "GitHub Actions workflow for automated triage"]
- **`[filename]`** — [One-line purpose, e.g., "Configuration file with prompt templates"]
- **`[filename]`** — [One-line purpose, e.g., "Example script demonstrating core pattern"]

### Supporting Files

*Available in repository for download/reference*

- **[`/examples/`](examples/)** — Complete working examples you can copy
- **[`setup-guide.md`](setup-guide.md)** — Step-by-step installation and configuration
- **[`troubleshooting.md`](troubleshooting.md)** — Common issues and solutions (optional)

**Guidance for Authors:**
- Primary artifacts (2-5 files) are the "stars of the show" — embedded fully in major sections with explanations
- Supporting files are helpers — linked for reference, not explained line-by-line
- Inline artifacts typically ≤ 150 lines; longer files should be in repository with key excerpts shown
- Every artifact should demonstrate a specific capability or pattern

---

## 🎯 Mental Model Shift

> **The Core Insight:** [One-liner capturing the new mental model — what becomes natural with this approach]

*Write this as a compelling standalone thesis for the README. It should make sense even if no slides are ever generated.*

### Move Toward (Embrace These Patterns)

These are the practices and patterns this feature enables. Start experimenting with these approaches.

- ✅ **[Pattern 1]**: [What this unlocks] → [Specific benefit or outcome]
- ✅ **[Pattern 2]**: [What this unlocks] → [Specific benefit or outcome]
- ✅ **[Pattern 3]**: [What this unlocks] → [Specific benefit or outcome]

### Move Away From (Retire These Habits)

As this approach matures, some familiar patterns naturally evolve. These aren't failures — they're stepping stones.

- 🔄 **[Evolving Pattern 1]**: [How this naturally changes] → [What you might try instead]
- 🔄 **[Evolving Pattern 2]**: [How this naturally changes] → [What you might try instead]
- 🔄 **[Evolving Pattern 3]**: [How this naturally changes] → [What you might try instead]

### Move Against (Active Resistance)

These are anti-patterns that will cause problems. Actively avoid or correct them.

- 🛑 **[Anti-pattern 1]**: [Why this is dangerous or counterproductive] → [Specific risk, cost, or failure mode]
- 🛑 **[Anti-pattern 2]**: [Why this is dangerous or counterproductive] → [Specific risk, cost, or failure mode]

> **What This Looks Like:** [Concrete example showing the mental model in action. Focus on the new workflow, not contrast with the old. E.g., "A developer describes a new API endpoint in an issue, assigns it to Copilot, and reviews the complete PR with implementation, tests, and docs 30 minutes later."]

---

## When to Use This Pattern

### Decision Tree

```
Q: [Top-level question about use case fit]
├─ [Answer A] → Use: [This feature]
│  └─ Best for: [Specific scenario]
│
├─ [Answer B] → Use: [Alternative feature/pattern]
│  └─ Best for: [Different scenario]
│
└─ [Answer C] → Combine: [This feature] + [Other feature]
   └─ Best for: [Complex scenario]
```

### Use This Pattern When

- [Condition 1 with specific context]
- [Condition 2 with specific context]
- [Condition 3 with specific context]

### Don't Use This Pattern When

- [Condition 1 - explain what to use instead]
- [Condition 2 - explain what to use instead]
- [Condition 3 - explain what to use instead]

### Comparison with Related Features

| Aspect | [This Feature] | [Alternative 1] | [Alternative 2] |
|--------|----------------|-----------------|-----------------|
| **Best For** | [Use case] | [Use case] | [Use case] |
| **Strengths** | [Key strength] | [Key strength] | [Key strength] |
| **Limitations** | [Key limitation] | [Key limitation] | [Key limitation] |
| **Setup Time** | [Time estimate] | [Time estimate] | [Time estimate] |

---

<!-- 🎬 MAJOR SECTION: [Short Name for TOC] -->
## [Major Section 1: Deep Dive Topic]

[This section provides technical depth on a specific aspect of the feature. Use clear subheadings, concrete examples, and explanations that work well in a long-form technical write-up.]

### [Subsection 1.1]

[Content with code examples, architecture diagrams (as styled HTML), or configuration patterns]

```[language]
[Code example with comments]
```

**Key Points:**
- [Important detail 1]
- [Important detail 2]
- [Important detail 3]

### [Subsection 1.2]

[More detailed content, potentially with comparison tables or step-by-step workflows]

| Before | After |
|--------|-------|
| [Old way] | [New way] |
| [Old outcome] | [New outcome] |

---

<!-- 🎬 MAJOR SECTION: [Short Name for TOC] -->
## [Major Section 2: Deep Dive Topic]

[Another major technical section. Follow the same pattern: clear structure, examples, and takeaways.]

### [Subsection 2.1]

[Content]

### [Subsection 2.2]

[Content]

---

<!-- 🎬 MAJOR SECTION: [Short Name for TOC] -->
## [Major Section 3: Deep Dive Topic]

[Third major section if needed. Generally aim for 3-5 major sections for a balanced deep dive.]

---

<!-- 🎬 MAJOR SECTION: [Short Name for TOC] -->
## [Major Section 4: Deep Dive Topic]

[Fourth major section if needed.]

---

## Real-World Use Cases

### Use Case 1: [Descriptive Title]

**The Scenario:** [Specific situation where this shines - 2-3 sentences]

**How It Works:** [How this feature enables it - 2-3 sentences]

**Example:**
```[language]
[Code example or command sequence]
```

**What You Get:** [Concrete outcome - e.g., "Complete implementation in 15 minutes" or "Consistent results in 2 iterations"]

---

### Use Case 2: [Descriptive Title]

**The Scenario:** [Specific situation]

**How It Works:** [How this feature enables it]

**Example:**
```[language]
[Code example]
```

**What You Get:** [Concrete outcome]

---

## What You Can Do Today

### 15 Minutes — Prove the Core Behavior

- **Try:** [Small, low-risk action using the primary artifact]
- **Expected signal:** [Specific output, file change, or behavior to observe]
- **Validate:** [Command or inspection that confirms the result]

### 1 Hour — Integrate It into Real Work

- **Build:** [Workflow integration using realistic project context]
- **Expected signal:** [Observable improvement or decision evidence]
- **Validate:** [Test, comparison, or review that confirms the outcome]

### 2–4 Hours — Run a Bounded Pilot

- **Pilot:** [Team or production-like trial with a clear scope]
- **Success measure:** [Metric or acceptance criterion to collect]
- **Boundary:** [Condition that pauses, rolls back, or redirects the pattern]

### Apply It to Your Work

- **Candidate task:** [A real repository or workflow decision this model can improve]
- **Decisive context:** [The files, runtime state, policy, or domain knowledge the task requires]
- **Delegation and authority:** [What Copilot may do, what remains human-led, and who approves the result]
- **Evidence:** [The observable signal that determines whether to keep, adjust, or stop the pattern]

---

## References

Numbered references cited inline throughout the content using `[^n]` footnote syntax. Collect them here so readers can trace the sources behind major claims, examples, and architecture details.

### Official Documentation

[^1]: **[Main Feature Documentation](URL)** — Core concepts and getting started
[^2]: **[API/CLI Reference](URL)** — Command syntax, parameters, configuration options

### Blog Posts & Announcements

[^3]: **[Feature Announcement](URL)** — Launch context and motivation
[^4]: **[Deep Dive Post](URL)** — Architecture and design decisions

### Tutorials & Guides

[^5]: **[Quickstart Tutorial](URL)** — Step-by-step walkthrough

### Community & Discussions

[^6]: **[Discussion Thread](URL)** — Real-world usage patterns and tips

> **For Authors:** Aim for 8-15 references. Every major claim, code example, and architecture statement should cite its source with `[^n]`. References [^1] and [^2] (official docs) are required at minimum. References are discovered during initial research (web search + provided URLs) and compiled in `research.md`.

---

## 🎭 Behind the Scenes

*For those who want to understand the deeper mechanics*

### [Technical Deep-Dive Topic 1]

[Explanation of how something works under the hood. This is optional but valuable for advanced readers. Examples: token management, model selection, context compaction algorithms, API internals.]

1. **[Mechanism/Step]**: [How it works technically]
2. **[Mechanism/Step]**: [What happens next in the process]
3. **[Mechanism/Step]**: [Final result or state]

**Why This Matters:** [Practical implication of understanding this mechanism]

### [Technical Deep-Dive Topic 2]

[Additional technical insight for advanced users]

**Key Takeaway:** [What this means for how you should architect or tune the feature]

---

## Authoring Guidelines

*Remove this section before publishing*

### Content Quality Checklist

Before marking this talk as complete:

- [ ] **Question is specific**: The talk answers ONE clear question
- [ ] **Fitness scorecard is all 🟢**: All three criteria are high
- [ ] **Key Artifacts section complete**: 2-5 primary artifacts listed with purposes
- [ ] **Artifacts are shown inline**: Primary artifacts embedded in major sections with explanation
- [ ] **Major sections marked**: 3-6 sections have \`<!-- 🎬 MAJOR SECTION -->\` markers
- [ ] **Move-Toward/Away/Against is concrete**: Specific patterns, not vague advice
- [ ] **Use cases have outcomes**: Each shows measurable before/after
- [ ] **Actionable items are time-bounded**: Clear 15min/1hr/2-4hr divisions
- [ ] **Actions are observable**: Each action names an expected signal and validation method; the pilot includes a boundary
- [ ] **Transfer is explicit**: Readers can apply the model to a real task with decisive context, authority, and evidence
- [ ] **Decision tree prevents misuse**: Clear "when NOT to use" guidance
- [ ] **Official documentation linked**: Minimum 2 official doc references in "📖 References" section
- [ ] **References throughout**: 8-15 numbered `[^n]` references with inline citations
- [ ] **Links are current**: All documentation and related talk links work
- [ ] **Code examples run**: All code has been tested and works
### Structure-Friendly Writing Tips

- **Use comparison tables** instead of long paragraphs where possible
- **Break long code examples** into separate subsections
- **Mark major sections** with 🎬 comments when it helps clarify the deep-dive structure
- **Front-load key points** in each section so the main idea is obvious on first read
- **Use concrete metrics** in outcomes ("3x faster" not "much faster")

### Voice and Tone

Apply the canonical **Universal Voice and Prose Contract** and **Content Fitness Gate** in `AGENTS.md`.

For practitioner tech talks, keep the register expert-to-expert and technical. Use concrete implementation examples, explain how and why the mechanism works, and give tradeoffs enough specificity to support a real engineering decision.

---

## Example: Filled-In Template Snippet

*Remove this section before publishing - it's here to show what good content looks like*

### Example: Mental Model Shift Section

> **The Core Insight:** AI agents complete work autonomously while you govern outcomes

#### Move Toward (Embrace These Patterns)

- ✅ **Delegation Over Instruction**: Give agents goals and constraints, let them determine approach → Agents find solutions you might not have considered
- ✅ **Outcome-Based Review**: Judge results by correctness and quality, not by how it was built → Faster iteration cycles, more focus on what matters
- ✅ **Parallel Workflows**: Run multiple agents on different branches simultaneously → 5-10x throughput on independent features

#### Move Away From (Retire These Habits)

- 🔄 **Step-by-Step Prompting → Goal-Based Prompting**: As you build trust, try describing outcomes rather than steps → Let agents leverage their reasoning
- 🔄 **Single-File Focus → Repository-Wide Context**: Experiment with giving broader context → Agents produce more architecturally consistent code
- 🔄 **Sequential Execution → Parallel Dispatch**: When comfortable, try running multiple agents on independent work → Discover new throughput

### Move Against (Active Resistance)

- 🛡️ **Trust builds incrementally**: Start with low-risk tasks, expand scope as you validate results → Build confidence through observation
- 🛡️ **Sandboxing matters**: Agents work best with clear boundaries and scoped permissions → Security and confidence go together

> **What This Looks Like:** A developer describes a new API endpoint in an issue, assigns it to a Copilot agent, and reviews the complete PR with implementation, tests, and docs 30 minutes later.

---
status: active
updated: YYYY-MM-DD
section: "Sub-group Name"                 # must match slides/SECTIONS.md
audience: [developer, team-lead]          # developer, team-lead, platform-engineer, security, architect, engineering-leader
level: applied                            # foundational, applied, advanced, strategic
duration: 45                              # minutes; notes `seconds` total lands 3-5 minutes under this
format: core-talk                         # core-talk, clinic, case-study, release-brief
decision: "[The practitioner decision this talk improves, as a question]"
prerequisites: []
related: [other-talk-slug]
references:
  - url: https://code.visualstudio.com/docs/copilot/...
    label: "Official doc page title"
    verified: YYYY-MM-DD
  - url: https://docs.github.com/en/copilot/...
    label: "Official doc page title"
    verified: YYYY-MM-DD
---

<!--
Landing page for a native tech talk. The talk itself is the deck plus its speaker notes in
slides/tech-talks/{slug}/slides.js: talk track, facts to know, demo cues, sources, and time
budget per slide. Keep this page short. The content router reads the H1, the question block,
and the ## headings; the portfolio inventory reads the frontmatter.
-->

# [Feature or Capability]: [Compelling Subtitle]

> **The Question This Talk Answers:**
> *"[One short question the learner already asks, in their own words, about getting more of what they want or less of what they don't. See the Core Question Contract in AGENTS.md.]"*

**Duration:** [XX] minutes | **Audience:** [Who faces this decision, in which workflow]

**Thesis:** [The core insight as one standalone sentence. It becomes DECK.meta.thesis.]

## Present and Study

- **[Open the deck](../../slides/tech-talks/{slug}/index.html)**: [N] animated slides. Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/{slug}/notes.html)**: the talk track, facts for questions, first-party sources, and a time budget for every slide. The notes are the reference for this talk; they print as a handout.

The deck and notes live in [`slides/tech-talks/{slug}/slides.js`](../../slides/tech-talks/{slug}/slides.js). Edit talk content there; this page stays a short landing page.

## 1. [Part 1 Name]

[One or two sentences: what this part shows and the decision it improves.]

## 2. [Part 2 Name]

[One or two sentences.]

## 3. [Part 3 Name]

[One or two sentences.]

## 4. [Part 4 Name]

[One or two sentences.]

## What You Can Do Today

Mirror the deck's `today` slide. Every action names what to try, the signal that shows it worked, and how to confirm it.

### Today

- **Try:** [Small, low-risk action using the primary artifact]
- **Expected signal:** [Specific output, file change, or behavior to observe]
- **Validate:** [Command or inspection that confirms the result]

### This Week

- **Build:** [Workflow integration using realistic project context]
- **Expected signal:** [Observable improvement or decision evidence]
- **Validate:** [Test, comparison, or review that confirms the outcome]

### This Month

- **Pilot:** [Team or production-like trial with a clear scope]
- **Success measure:** [Metric or acceptance criterion to collect; a target until measured]
- **Boundary:** [Condition that pauses, rolls back, or redirects the pattern]

### Apply It to Your Work

- **Candidate task:** [A real repository or workflow decision this model can improve]
- **Decisive context:** [The files, runtime state, policy, or domain knowledge the task requires]
- **Delegation and authority:** [What Copilot may do, what remains human-led, and who approves the result]
- **Evidence:** [The observable signal that determines whether to keep, adjust, or stop the pattern]

## Key Artifacts

- **[`filename`](filename)**: [One-line purpose]
- **[`filename`](filename)**: [One-line purpose]

## Related Patterns

- **[Related talk](../other-talk-slug/README.md)**: [How it complements this talk]

## References

First-party sources for every claim are listed per slide in the [speaker notes](../../slides/tech-talks/{slug}/notes.html) and in the `references` frontmatter above.

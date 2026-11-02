---
status: active
updated: 2026-11-01
section: "Agents at Your Keyboard"
audience: [developer, team-lead]
level: applied
duration: 50
format: release-brief
decision: "How does a practitioner evaluate answer usefulness, preserve session continuity, bound execution, and accept results from inspectable evidence?"
question: "How do I get a useful answer from Copilot and know what it changed?"
thesis: "Evaluate answers against the task, preserve work across interruptions, bound execution, and accept results from fresh evidence."
prerequisites: [surfaces]
related: [copilot-primitives, repo-to-feature, multi-agent-coordination]
references:
  - url: https://code.visualstudio.com/updates/v1_140
    label: "VS Code release notes: September 30, 2026 (v1.140)"
    verified: 2026-10-31
  - url: https://code.visualstudio.com/updates/v1_141
    label: "VS Code release notes: October 7, 2026 (v1.141)"
    verified: 2026-10-31
  - url: https://code.visualstudio.com/updates/v1_142
    label: "VS Code release notes: October 14, 2026 (v1.142)"
    verified: 2026-10-31
  - url: https://code.visualstudio.com/updates/v1_143
    label: "VS Code release notes: v1.143 (first-party publication date unresolved)"
    verified: 2026-10-31
  - url: https://code.visualstudio.com/updates/v1_144
    label: "VS Code release notes: October 28, 2026 (v1.144)"
    verified: 2026-10-31
  - url: https://github.blog/changelog/2026-10-28-github-copilot-in-vs-code-universe-releases/
    label: "GitHub Copilot in VS Code: Universe releases"
    verified: 2026-10-31
  - url: https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/
    label: "Route and orchestrate models with GitHub Copilot Fusion"
    verified: 2026-10-31
  - url: https://code.visualstudio.com/updates/v1_139
    label: "VS Code release notes: September 23, 2026 (v1.139)"
    verified: 2026-09-25
  - url: https://code.visualstudio.com/updates/v1_138
    label: "VS Code release notes: September 16, 2026 (v1.138)"
    verified: 2026-09-25
  - url: https://code.visualstudio.com/docs/agents/run/agents-window
    label: "Use the Agents window (Preview): signed-out access"
    verified: 2026-09-25
  - url: https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14
    label: "GitHub Copilot weekly releases: September 14"
    verified: 2026-09-25
  - url: https://code.visualstudio.com/updates/v1_132
    label: "VS Code release notes: August 5, 2026 (v1.132)"
    verified: 2026-08-12
  - url: https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases
    label: "GitHub Copilot in VS Code: July 2026 releases"
    verified: 2026-08-12
  - url: https://github.blog/changelog/2026-07-08-github-copilot-in-visual-studio-code-june-2026-releases
    label: "GitHub Copilot in VS Code: June 2026 releases"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/updates/v1_128
    label: "VS Code release notes: July 8, 2026 (v1.128)"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/updates/v1_122
    label: "VS Code release notes: May 28, 2026 (v1.122)"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/updates/v1_121
    label: "VS Code release notes: May 20, 2026 (v1.121)"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/copilot/overview
    label: "GitHub Copilot in VS Code documentation"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/agents/agents-window
    label: "Use the Agents window (Preview)"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/agents/concepts/agent-host
    label: "Agent Host concepts"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions
    label: "Manage agent sessions"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/copilot/agents/background-agents
    label: "Background Agents documentation"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/chat/copilot-chat-context
    label: "Add context to chat (vision, browser context)"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/agent-customization/language-models
    label: "Language models and providers"
    verified: 2026-08-12
  - url: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode
    label: "Chat agent mode and browser tools"
    verified: 2026-08-12
  - url: https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/
    label: "Copilot vision is generally available"
    verified: 2026-08-12
  - url: https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot
    label: "Upcoming September 2026 model deprecations in GitHub Copilot"
    verified: 2026-08-12
---

# VS Code Copilot through 1.144: Four Practitioner Outcomes

> **The Question This Talk Answers:**
> *"How do I get a useful answer from Copilot and know what it changed?"*

**Duration:** 50 minutes: 46 minutes 30 seconds estimated talk and 3 minutes 30 seconds for questions | **Audience:** Developers and team leads using AI-assisted workflows in VS Code

**Thesis:** Evaluate answers against the task, preserve work across interruptions, bound execution, and accept results from fresh evidence.

## Present and Study

- **[Open the deck](../../slides/tech-talks/vscode-latest/index.html):** 47 slides: 36 feature cards and 11 framing slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/vscode-latest/notes.html):** Talk track, facts for questions, demo cues, first-party evidence, and a time budget for every slide. The notes print as a handout.

The deck and notes live in [`slides.js`](../../slides/tech-talks/vscode-latest/slides.js); this page is the landing page.

## 1. Find a Better Answer

Inspect the redesigned 1.142 model picker, 1.143 local models and comparisons, 1.144 Fusion GA and expanded Preview comparisons, BYOK state, context controls, provider routes, and visual input. Each card names its release, status, use case, newly possible action, proof plan, and limit. No route is called better without measured evidence.

## 2. Keep Work Moving

Follow sessions across multi-root workspaces, remote hosts, containers, external clients, canvases, worktrees, and cloud. Reopen the session and verify its conversation, workspace, host, and changed files. Cloud sessions use a separate workspace; local uncommitted changes are not copied automatically. Paid-plan and organization-policy rules apply; remote machines and Agent Hosts must remain running.

## 3. Delegate with Fewer Interruptions

Choose between shared peer chats and isolated worktrees; inspect background shells, queued messages, scoped discard, and working sets. Separate feature access, tool-execution permission, and human acceptance. Assisted permissions GA requires Folder isolation and remains subject to policy. Experimental computer use is limited to eligible local Windows and macOS Copilot-harness sessions, with approval for each application action.

## 4. Check More Than the Code

Use one independent local login-page example to inspect browser scope, screenshots, viewport emulation, element feedback, measurements, tests, diffs, and PR evidence. The 390-by-844 viewport and 44-by-44 CSS-pixel target are proposed criteria, not achieved outcomes or accessibility-conformance claims. Keep runner status separate from page behavior; the reviewer accepts, adjusts, holds, or stops.

## What You Can Do Today

- **Today:** State what makes an answer useful for one task; inspect an eligible route and its access boundary.
- **This week:** Check what persists across an interruption, then inspect one bounded delegation and its permission path.
- **This month:** Evaluate model and execution choices with their owners; check policy, network, container fit, cost, and evidence.
- **Apply it:** Name a task from your repository, its criteria and execution boundary, the human reviewer, and the evidence that determines whether to accept, adjust, or stop.

## Key Artifacts

- **Answer-evaluation criteria:** Compare the same task prompt and declared criteria; inspect model, harness, access, cost, and actual output separately.
- **Session continuity check:** Verify task identity, workspace, host availability, and changed files after reconnecting.
- **Bounded execution record:** Name the worktree boundary, requested action, permission decision, and human acceptance owner.
- **Behavior evidence set:** Keep fresh screenshot, measurement, test status, diff, and PR feedback distinct. The local login demo uses proposed criteria only.

Feature visuals are explicitly labeled schematics unless a presenter records an actual capture. No copyrighted source images were downloaded. Source-media links and actionable capture briefs appear in the notes; account eligibility, installed-feature behavior, and policy need a presenter check. The first-party 1.143 release page's publication date remains unresolved; 2026-10-20 is secondary corroboration only. No speed, quality, or interruption-reduction outcome is claimed without evidence.

## Related Patterns

- [Custom Agents and Skills](../copilot-primitives/README.md): configure agent behavior and reusable workflow context.
- [Repo to Feature](../repo-to-feature/README.md): connect repository context to a bounded delivery task.
- [Multi-Agent Coordination](../multi-agent-coordination/README.md): coordinate parallel work with explicit ownership.

## References

The approved first-party evidence inventory is retained in this page's frontmatter. Claim-specific links and boundaries appear on each slide's [speaker notes](../../slides/tech-talks/vscode-latest/notes.html).

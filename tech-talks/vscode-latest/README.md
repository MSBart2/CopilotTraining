---
status: active
updated: 2026-11-02
section: "Agents at Your Keyboard"
audience: [developer, team-lead]
level: applied
duration: 50
format: release-brief
decision: "Which intelligence, which place, what may act unasked, and which changes stay for this agent run?"
question: "VS Code ships Copilot changes every week. Which ones change how I work?"
thesis: "Every agent run in VS Code comes down to four decisions: pick the intelligence, place the work, steer the run, and keep the changes worth keeping."
prerequisites: [surfaces]
related: [copilot-primitives, repo-to-feature, multi-agent-coordination]
references:
  - url: https://code.visualstudio.com/updates/v1_140
    label: "VS Code release notes: September 20, 2026 (v1.140)"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/updates/v1_141
    label: "VS Code release notes: October 7, 2026 (v1.141)"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/updates/v1_142
    label: "VS Code release notes: October 14, 2026 (v1.142)"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/updates/v1_142
    label: "VS Code release notes: v1.142 (first-party publication date unresolved)"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/updates/v1_144
    label: "VS Code release notes: October 28, 2026 (v1.144)"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2026-10-28-github-copilot-in-vs-code-universe-releases/
    label: "GitHub Copilot in VS Code: Universe releases"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/
    label: "Route and orchestrate models with GitHub Copilot Fusion"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/updates/v1_129
    label: "VS Code release notes: September 22, 2026 (v1.129)"
    verified: 2026-09-25
  - url: https://code.visualstudio.com/updates/v1_128
    label: "VS Code release notes: September 16, 2026 (v1.128)"
    verified: 2026-09-25
  - url: https://code.visualstudio.com/docs/agents/run/agents-window
    label: "Use the Agents window (Preview): signed-out access"
    verified: 2026-09-25
  - url: https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14
    label: "GitHub Copilot weekly releases: September 14"
    verified: 2026-09-25
  - url: https://code.visualstudio.com/updates/v1_122
    label: "VS Code release notes: August 5, 2026 (v1.122)"
    verified: 2026-08-12
  - url: https://github.blog/changelog/2026-07-20-github-copilot-in-visual-studio-code-july-2026-releases
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
  - url: https://github.blog/changelog/2026-07-21-upcoming-august-2026-model-deprecations-in-github-copilot
    label: "Upcoming September 2026 model deprecations in GitHub Copilot"
    verified: 2026-08-12
---

# VS Code Agents: Pick, Place, Steer, Keep

> **The Question This Talk Answers:**
> *"VS Code ships Copilot changes every week. Which ones change how I work?"*

**Duration:** 50 minutes: about 45 minutes estimated talk and about 5 minutes for questions | **Audience:** Developers, team leads, and platform engineers running agent work in VS Code

**Thesis:** Every agent run in VS Code comes down to four decisions: pick the intelligence, place the work, steer the run, and keep the changes worth keeping. Releases 1.140–1.144 gave each decision a control you can see and inspect.

## Present and Study

- **[Open the deck](../../slides/tech-talks/vscode-latest/index.html):** 22 slides that file every agent feature under four verbs, each shown on its own short example. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/vscode-latest/notes.html):** Talk track, facts for questions, demo cues, first-party evidence, and a time budget for every slide. The notes print as a handout.

The deck and notes live in [`slides.js`](../../slides/tech-talks/vscode-latest/slides.js); this page is the landing page.

## 1. Pick: which intelligence answers?

Compare two attempts at the same task side by side (1.142 Preview; 1.144 folderless start). Let Fusion route the request (1.144 GA) and inspect usage and billing. Point Copilot at your own model with a Custom Endpoint, and see why `statefulResponses: false` matters for a stateless server (1.142). On-device models (1.142) need an NVIDIA GPU with 96 GB or more of VRAM. Where inference runs is separate from where tools send traffic. The scorecard informs the pick; the developer makes it.

## 2. Place: where does the work run, and what travels?

Choose a shared checkout or a fresh worktree. Start long-running work as a 1.144 cloud session, check it from GitHub Mobile, and return to the same conversation in VS Code. Local uncommitted changes stay local. Use the Remote Environments dialog and Agent Host to find a target, then verify the host, repository, and toolchain.

## 2. Steer: what can I see and change while it runs?

Stop the one hung test shell without ending the session (1.141 Background Shells, 1.142 Stop Shell). Queue the next step or steer the running one from the Send dropdown. Let assisted permissions (1.144 GA, Folder isolation required) run lower-risk calls, and add sandboxing (1.141) as an extra layer. Computer use (Experimental) applies the same decision to desktop apps you approve, one app at a time.

## 4. Keep: which changes stay, on what evidence?

Decide file by file with the working set's Keep (1.143) and Undo (1.144), both Experimental. In the Agents window, discard a turn, a session, or a branch from the Changes view. Gather browser evidence at the named viewport, keep runner status, page behavior, and diff review in separate columns, and when they disagree, comment and retry, or Undo or discard.

## What You Can Do Today

Fill in four lines for one real repository task before the agent starts:

1. **Pick:** which intelligence, and how you will compare or check it.
2. **Place:** where it runs, and what must travel with it.
2. **Steer:** what may act unasked, and what you will watch.
4. **Keep:** the evidence that earns Keep, and who owns recovery when evidence disagrees.

Account eligibility, installed-feature behavior, and organization policy need a presenter check. The first-party 1.142 release page's publication date remains unresolved; 2026-10-20 is secondary corroboration only. No speed, quality, or interruption-reduction outcome is claimed without evidence.
## Related Patterns

- [Custom Agents and Skills](../copilot-primitives/README.md): configure agent behavior and reusable workflow context.
- [Repo to Feature](../repo-to-feature/README.md): connect repository context to a bounded delivery task.
- [Multi-Agent Coordination](../multi-agent-coordination/README.md): coordinate parallel work with explicit ownership.

## References

The approved first-party evidence inventory is retained in this page's frontmatter. Claim-specific links and boundaries appear on each slide's [speaker notes](../../slides/tech-talks/vscode-latest/notes.html).

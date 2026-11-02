---
status: active
updated: 2026-10-31
section: "Agents at Your Keyboard"
audience: [developer, platform-engineer]
level: applied
duration: 45
format: core-talk
decision: "When is the terminal the correct Copilot control surface?"
prerequisites: [surfaces]
related: [copilot-web, copilot-azure-mcp]
references:
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
    label: "About GitHub Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes
    label: "About cloud and local sandboxes for GitHub Copilot"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    label: "GitHub Copilot CLI command reference"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts
    label: "Scheduling prompts in GitHub Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet
    label: "Running tasks in parallel with /fleet"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli
    label: "Use Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli
    label: "Install Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-instructions
    label: "Copilot CLI custom instructions"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server
    label: "Add an MCP server to Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing
    label: "Finding and installing plugins for Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins
    label: "About plugins for Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely
    label: "Steering a GitHub Copilot CLI session from another device"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/
    label: "Remote control CLI sessions on web and mobile (public preview)"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
    label: "Using GitHub Copilot CLI session data (/chronicle)"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/chronicle
    label: "About GitHub Copilot CLI session data"
    verified: 2026-08-25
  - url: https://github.com/github/copilot-cli/releases
    label: "GitHub Copilot CLI release notes"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-08-07-github-copilot-weekly-releases-august-3
    label: "GitHub Copilot weekly releases: August 3 CLI updates"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-08-13-github-copilot-weekly-releases-august-10
    label: "GitHub Copilot weekly releases: August 10 CLI workflow controls"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app
    label: "Agent Plugins 1.0 in VS Code, Copilot CLI, and the Copilot app"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot
    label: "Upcoming September 2026 model deprecations in GitHub Copilot"
    verified: 2026-08-25
---

# GitHub Copilot CLI: AI at the Point of Work

> **The Question This Talk Answers:**
> *"How do I bring AI to where the work actually is — and keep steering it from wherever I am?"*

**Duration:** 45 minutes | **Audience:** Developers and platform engineers working in terminal, CI, and operational environments

**Thesis:** Copilot CLI closes distance across intent, complexity, context, time, and geography when practitioners clarify first, choose bounded autonomy, verify the artifact, and keep human approval visible.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-cli/index.html)**: 39 slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-cli/notes.html)**: talk track, command details, boundaries, recovery paths, first-party evidence, and a time budget for every slide. The notes print as the handout.

The deck and notes live in [`slides.js`](../../slides/tech-talks/copilot-cli/slides.js); the notes are the teaching source.

## 1. Plan Mode: Collaborative Planning Before Implementation

Use clarifying questions and an approved plan to turn an ambiguous runtime request into scoped checks. The Docker numbers are clearly labeled source-scenario estimates, not measured results.

## 2. Interactive Mode vs Programmatic Mode vs Cloud Delegation

Match interactive diagnosis, headless CI reports, `/fleet`, cloud delegation, or scheduled prompts to the task. Keep permissions, containment, review, and cost visible.

## 3. Automatic Context Management and Repository Memory

Inspect context before and after compaction, record stable repository guidance, and choose `/rewind` for a wrong turn or `/worktree` for isolated exploration.

## 4. Remote Sessions: The Last Distance Falls

Run the session on the host that owns the runtime evidence and steer it remotely. Keep host scope, tool permissions, and human approval explicit.

## What You Can Do Today

### Today

- **Try:** Install the current CLI and use Plan Mode for one ambiguous, low-risk task in a safe repository.
- **Expected signal:** Copilot asks a useful scope question and presents a plan that names the evidence it will inspect.
- **Validate:** Review the plan before approval, inspect any diff, and run the relevant test or check.

### This Week

- **Build:** Add one `copilot -p` failure summary to CI with scoped tools and a reviewable output file.
- **Expected signal:** A maintainer can compare the report with the actual failure evidence.
- **Validate:** Record time, correction turns, and reviewer acceptance for your own workload before claiming a benefit.

### This Month

- **Pilot:** Try `--remote` on an authorized staging host with redacted or synthetic data.
- **Success measure:** Confirm session access, host-local execution, scoped permissions, reconnect behavior, and reviewer ownership.
- **Boundary:** Stop when host scope, data handling, or approval authority is unclear; use the team’s escalation path.

### Apply It to Your Work

- **Candidate task:** Choose a recurring diagnosis whose decisive evidence lives in a terminal or on a remote host.
- **Decisive context:** Identify the logs, files, service state, and policy Copilot needs; keep secrets out of prompts.
- **Delegation and authority:** State what Copilot may inspect, who approves tool requests, and who accepts any proposed remediation.
- **Evidence:** Name the report, test, health signal, or diff that decides whether to keep, adjust, or stop the pattern.

## Key Artifacts

- **[FanHub walkthrough](examples/walkthrough.md):** Hands-on Plan Mode, programmatic mode, `/fleet`, remote-session, and cloud-delegation examples. Check its prerequisite and command details against the installed CLI before presenting.
- **[Teaching source](../../slides/tech-talks/copilot-cli/slides.js):** The deck, talk track, command references, evidence notes, and slide timing.

## Related Patterns

- **[Copilot Web](../copilot-web/README.md):** Use when web or GitHub-hosted context changes the surface decision.
- **[Copilot CLI + Azure MCP](../copilot-azure-mcp/README.md):** Compose CLI workflows with Azure context and tools.
- **[Copilot Configuration Primitives](../copilot-primitives/README.md):** Instructions, memory, prompts, and skills.
- **[Copilot Plugins](../copilot-plugins/README.md):** Plugin authoring, marketplaces, and packaging.

## References

First-party sources for each claim are listed per slide in the [speaker notes](../../slides/tech-talks/copilot-cli/notes.html); the complete verified inventory remains in the frontmatter above. CLI commands, preview status, permissions, and integrations are version-sensitive. Confirm current documentation and policy before a live run.

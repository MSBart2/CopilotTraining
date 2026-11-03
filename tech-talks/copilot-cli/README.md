---
status: active
updated: 2026-11-03
section: "Agents at Your Keyboard"
audience: [developer, platform-engineer]
level: applied
duration: 45
format: core-talk
decision: "Where can I put AI help so decisive evidence and the right decision maker stay within reach?"
prerequisites: [surfaces]
related: [copilot-web, copilot-azure-mcp]
references:
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
    label: "About Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli
    label: "Use Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli
    label: "Install Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    label: "CLI command reference"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-01-21-github-copilot-cli-plan-before-you-build-steer-as-you-go/
    label: "Plan before you build; steer as you go"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
    label: "Cloud and local sandbox boundaries"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available
    label: "Local sandboxing GA"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
    label: "About cloud sandboxes"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-10-28-work-from-anywhere-with-a-new-connected-copilot-cloud-experience
    label: "Connected cloud experience GA"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
    label: "Copilot on GitHub"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-llm-models
    label: "Add models and discover Ollama"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli
    label: "Discover local models"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/concepts/customizations/allowing-safe-commands
    label: "Allowing safe commands"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available
    label: "Assisted permissions GA"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates
    label: "Managed settings enforcement"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows
    label: "Dynamic workflows"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-dynamic-workflows
    label: "Use dynamic workflows"
    verified: 2026-11-02
  - url: https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/
    label: "Dynamic workflows public preview"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts
    label: "Schedule prompts"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet
    label: "Parallel tasks with /fleet"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely
    label: "Steer a session remotely"
    verified: 2026-11-02
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
    label: "Use session data with /chronicle"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions
    label: "Add repository instructions"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices
    label: "CLI best practices"
    verified: 2026-08-25
  - url: https://github.com/github/copilot-cli/releases
    label: "Official CLI releases"
    verified: 2026-11-02
  - url: https://github.com/github/copilot-cli/releases/tag/v1.0.105
    label: "Stable v1.0.105"
    verified: 2026-11-02
---

# GitHub Copilot CLI: Intelligence Within Reach

> **The Question This Talk Answers:**
> *"How do I get AI help right where I’m working?"*

**Duration:** 45 minutes | **Audience:** Developers and platform engineers working with repository, CI, and running-system evidence

**Thesis:** Bring intelligence to the work, and keep the worker within reach.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-cli/index.html):** 36 slides (25 teaching, 11 spine); estimated 40:00 talk plus 5:00 for questions. Press `N` for speaker notes.
- **[Speaker notes and handout](../../slides/tech-talks/copilot-cli/notes.html):** Complete talk track, proposed live checks, source evidence, boundaries, and recovery paths.

The [native teaching source](../../slides/tech-talks/copilot-cli/slides.js) owns the talk. Product evidence was reviewed November 2, 2026; stable baseline v1.0.105. The distance-first narrative was approved November 3. Representative traces are scripts, not observed results.

Why use CLI here? It can minimize the distance between the person, the evidence, the process, and the next useful moment. This is a practitioner thesis, not a historical origin claim or a ranking of other surfaces.

## 1. Worker ↔ Work

Keep the developer’s request, Docker tool outputs, and next decision in one inspectable loop. Clarify the task, review a scoped plan, and use the listener and valid `5001:5000` mapping to choose a proposed HTTP probe. No successful repair is claimed.

## 2. Intelligence ↔ Data

Start Copilot on the authorized staging host so tools can reach decisive evidence. Inspect inference placement separately, compare a bounded log finding with its synthetic source, and choose cloud deliberately for repository work. Host-local tools do not imply host-local inference or zero data movement.

## 3. Workflow ↔ Running System

Let failed CI run `copilot -p` and return a proposed why beside the original red test. Save recurring staging investigation as a public-preview dynamic workflow: understand the process, describe and review its creation, confirm registration, then invoke it and inspect the report. Permissions and containment bound the actions close to the system.

## 4. Now ↔ Later

Carry forward the right thing: a reusable procedure, delegated task, scheduled intent, checked context, reviewed guidance, recoverable edits, or continuing session. Experimental schedules require an active session. Original-host steering requires a running host and process; connected cloud continuation preserves different state. Verify identity, scope, files, and actual test evidence.

## What You Can Do Today

### Worker ↔ Work

- Ask for two read-only checks beside a runtime task; inspect their outputs and choose the next probe.

### Intelligence ↔ Data

- Analyze an approved synthetic source on its host; inspect the provider and compare the finding with source.

### Workflow ↔ Running System

- Return one bounded CI failure explanation; compare `why.md` with the log and keep the original failed test status.

### Now ↔ Later

- Continue a low-risk task; verify the session, retained scope, files, and actual next check. Confirm access and current billing before cloud work.

### Apply It to Your Work

- **Candidate task:** Choose one distance in a real task; capabilities can close several distances.
- **Decisive context:** Identify the host, files, service state, and provider allowed to receive context.
- **Delegation and authority:** Name the permission decision maker and the human who accepts the result.
- **Evidence:** Define an artifact and a signal that makes you keep, adjust, or stop the pattern.
- **Boundary:** Stop when source evidence disagrees or access, data handling, or acceptance ownership is unclear. Preserve the artifact and re-scope with the owner.

## Key Artifacts

- **[Walkthrough and proposed checks](examples/walkthrough.md):** Safe rehearsal paths for planning, CI, model placement, permissions, containment, workflows, and both continuity paths.
- **[Illustrative workflow extension](examples/extension.mjs):** The kind of `extension.mjs` Copilot writes for the staging investigation, using the API in the guidance bundled with CLI v1.0.105; syntax-checked and stub-SDK tested, not a recorded run. and **[fixture inputs](examples/staging-input.json):** Dependency-free Node.js fixture checks; a Copilot extension adapter requires separate authoring and audit.
- **[Teaching source](../../slides/tech-talks/copilot-cli/slides.js):** Slide data, full notes, source map, and timing.
- **[Approved recipe](deck.recipe.yml):** Structural rationale and actual per-slide plan.

## Related Patterns

- **[Copilot Web](../copilot-web/README.md):** GitHub-hosted collaboration and context.
- **[Copilot CLI + Azure MCP](../copilot-azure-mcp/README.md):** CLI workflows with Azure evidence and tools.
- **[Copilot Configuration Primitives](../copilot-primitives/README.md):** Stable instructions and reusable context.
- **[Copilot Plugins](../copilot-plugins/README.md):** Extension packaging and governance.

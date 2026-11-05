---
status: active
updated: 2026-10-31
section: "Trust and Govern"
audience: [platform-engineer, security, architect, engineering-leader]
level: strategic
duration: 60
format: core-talk
decision: "How can organizations standardize, govern, and measure Copilot adoption?"
prerequisites: []
related: [copilot-hooks, agentic-sdlc, copilot-plugins]
references:
  - url: https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization
    label: "Managing Copilot in your organization"
    verified: 2026-02-01
  - url: https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot#adding-organization-wide-custom-instructions
    label: "Adding organization-wide custom instructions"
    verified: 2026-02-01
  - url: https://docs.github.com/en/rest/copilot/copilot-metrics
    label: "Copilot metrics REST API"
    verified: 2026-02-01
  - url: https://agents.md/
    label: "AGENTS.md open format"
    verified: 2026-03-23
  - url: https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section
    label: "Copilot impact dashboard adds a return on investment section"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity
    label: "Copilot usage metrics API adds agent app activity"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings
    label: "Enterprise team specialization for managed settings"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot
    label: "Upcoming September 2026 model deprecations in GitHub Copilot"
    verified: 2026-08-10
  - url: https://code.visualstudio.com/docs/enterprise/ai-settings
    label: "Configure AI settings for an enterprise"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/docs/copilot/security
    label: "Security considerations for AI in VS Code"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/updates/v1_121
    label: "VS Code release notes: v1.121"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/updates/v1_122
    label: "VS Code release notes: v1.122"
    verified: 2026-09-15
---

# Scaling GitHub Copilot Across Organizations

> **The Question This Talk Answers:**
> *"How do I scale Copilot across our teams without losing consistency, team choice, or proof?"*

**Duration:** 60 minutes | **Audience:** Platform engineers, security practitioners, enterprise architects, and engineering leaders

**Thesis:** Standards, knowledge, and evidence scale when owners and authority stay visible.

## Present and Study

- **[Open the deck](../../slides/tech-talks/enterprise-patterns/index.html):** 38 slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/enterprise-patterns/notes.html):** the complete talk track, facts and limits for questions, demo cues, first-party sources, and a time budget for every slide. The notes print as the handout.

The deck and notes live in [`slides/tech-talks/enterprise-patterns/`](../../slides/tech-talks/enterprise-patterns/). Edit the teaching source in `slides.js`; this page stays a landing page.

## 1. Organization-Wide Standards

Choose the organization, repository, file-pattern, or directory scope that matches the rule’s owner. The deck shows illustrative instruction examples, repository topology, review evidence, and the assumptions behind the source talk’s saved-hours arithmetic.

## 2. Organizational Skills & Knowledge Bases

Use Agent Skills for reusable methods and Knowledge Bases for context across indexed repositories. Keep source ownership, eligibility, answer inspection, and update review visible.

## 3. Governance & Licensing

Connect model and licensing choices to current policy, telemetry and tool boundaries, and accountable compliance review. Historical percentages and case outcomes stay labeled as estimates or illustrative examples.

## 4. Adoption & Enablement

Inspect the managed-settings floor, allowed team specialization, merge behavior, and effective result. Pair self-service onboarding with product-backed measurement and its limits.

## What You Can Do Today

### Today

- **Try:** Choose one repeated repository rule and name its approving owner.
- **Expected signal:** A short instruction fragment and a concrete acceptance check exist.
- **Validate:** Review the rule with its owner and test it against one representative task.

### This Week

- **Build:** Try the rule in a bounded repository workflow with the local context present.
- **Expected signal:** The diff, test or check result, reviewer decision, and recovery path are recorded.
- **Validate:** Rerun the same task after adjusting context or the rule; compare the evidence.

### This Month

- **Pilot:** Invite one team to use the reviewed pattern on repeated work.
- **Success measure:** Compare time, quality checks, support demand, and team feedback with a local baseline. Treat every target as proposed until measured.
- **Boundary:** Pause expansion when ownership, evidence, policy fit, or a recovery route is missing.

### Apply It to Your Work

- **Candidate task:** Which recurring task in your repository uses the same standard across teams?
- **Decisive context:** Which approved rules, files, tests, service constraints, and product surface shape the task?
- **Delegation and authority:** What may Copilot propose, and who accepts, rejects, or escalates the result?
- **Evidence:** Which observable check or reviewed artifact will show that the pattern fits, and what happens when it fails?

## Key Artifacts

The deck and notes carry examples and decision aids for:

- Organization-wide instruction placement and an illustrative security rule
- An Agent Skill catalog and a cross-repository Knowledge Base query
- Model-readiness, telemetry, tool-discovery, and compliance review checklists
- Managed-settings authority, team mapping, merge behavior, and effective-setting review
- A directional metrics model and the source talk’s illustrative saved-hours calculation
- A 30-minute team onboarding kit and a bounded rollout plan
- Federated responsibility, community-of-practice, and migration-readiness patterns

These are teaching examples in the deck and notes, not separate downloadable templates or verified customer deployments.

## Related Patterns

- [Copilot Hooks](../copilot-hooks/README.md): add controlled lifecycle actions to a local workflow.
- [Agentic SDLC](../agentic-sdlc/README.md): explore broader repository and delivery-system change.
- [Copilot Plugins](../copilot-plugins/README.md): package capabilities for governed reuse.
- [GitHub Agentic Workflows](../agentic-workflows/README.md): automate bounded repository chores.
- [Local Agentic SDLC](../local-agentic-sdlc/README.md): coordinate specialist work in a local run.
- [Decision guide](../DECISION-GUIDE.md): compare related practitioner talks.

## References

First-party sources for each claim are linked on the corresponding slide and in the [speaker notes](../../slides/tech-talks/enterprise-patterns/notes.html). The 2026 model-deprecation notice is historical; verify current product policy before acting on time-sensitive guidance.

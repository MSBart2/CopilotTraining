---
status: active
updated: 2026-11-05
section: "Trust and Govern"
audience: [platform-engineer, architect, engineering-leader]
level: advanced
duration: 90
format: core-talk
decision: "What repository and CI infrastructure creates trustworthy agent throughput?"
prerequisites: [agentic-workflows]
related: [copilot-hooks, enterprise-patterns, unattended-agents]
references:
  - url: https://github.com/microsoft/agentrc
    label: "Microsoft AgentRC repository"
    verified: 2026-03-19
  - url: https://github.com/microsoft/agentrc/blob/main/docs/concepts.md
    label: "AgentRC concepts and maturity model"
    verified: 2026-03-19
  - url: https://docs.github.com/en/actions
    label: "GitHub Actions documentation"
    verified: 2026-03-19
  - url: https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows
    label: "GitHub Actions caching guide"
    verified: 2026-03-19
  - url: https://nx.dev/
    label: "Nx monorepo tools"
    verified: 2026-03-19
  - url: https://slsa.dev/
    label: "SLSA supply chain security framework"
    verified: 2026-03-19

---

# Agentic SDLC: Infrastructure for AI Velocity

> **The Question This Talk Answers:**
> *"How do I ship more with agents and still trust every change?"*

**Thesis:** L3 is the launchpad: reliable context, repeatable checks, and habitual use create the conditions for outcome-focused governance and measured autonomy.

**Duration:** 90 minutes | **Target Audience:** Architects / Platform Engineers / Engineering Leaders

**Deck:** [Open the native deck](../../slides/tech-talks/agentic-sdlc/index.html) · **Notes and handout:** [Read the speaker notes](../../slides/tech-talks/agentic-sdlc/notes.html)

## Part 1 — Maturity Model

Assess platform readiness beside adoption practice. L3 is where repeatable infrastructure, quality controls, and habitual use first compound. The notes carry the five-level criteria, caveats, and instruction hierarchy.

## Part 2 — PR Workflows

Give Copilot a bounded intent; let CI produce evidence; keep approval with named human owners. The section covers evidence bundles, policy gates, contextual triage, and recovery when a check or review disagrees.

## Part 3 — Trust Manufacturing

Build fast feedback without sacrificing trustworthy checks. The notes distinguish scenario estimates from observed results and cover affected analysis, flaky tests, hermetic inputs, caching, and provenance.

## Part 4 — Implementation Roadmap

Progress from the L3 foundation through L4 optimization to measured L5 autonomy. Each phase pairs platform work with adoption and governance signals; promotion follows evidence.

## Transfer Actions

- **Today:** Rate platform and adoption separately; measure PR-check time and flake rate; count recent changes crossing repository boundaries.
- **This week:** Review repository instructions; require CI and CODEOWNERS for sensitive paths; choose one bounded agent task and define acceptance evidence.
- **This month:** Pilot affected analysis and cache invalidation; assign an owner to a quarantined flake; revisit the maturity assessment and choose the next constraint.

Apply the decision to one repository and record what the evidence says.

## Artifacts

- [FanHub walkthrough](examples/walkthrough.md) — a fork-based exercise for maturity assessment, fast-feedback CI, CODEOWNERS routing, evidence-oriented PRs, and baseline measures. It is an instructional artifact, not a reported run.
- The native deck includes repository-boundary diagrams, an illustrative intent contract, evidence-bundle contents, a staged CI model, and a three-phase checklist. Numeric scenarios inherited from the long README are identified in the slide notes as estimates or illustrations, not observed outcomes.

## Related Talks

- [GitHub Agentic Workflows](../agentic-workflows/) — evidence-gated issue-to-PR automation.
- [Local Agentic SDLC](../local-agentic-sdlc/) — specialist agents, worktree isolation, and integration records.
- [Copilot Hooks](../copilot-hooks/) — governance mechanisms and agent behavior controls.
- [Enterprise Patterns](../enterprise-patterns/) — organization-wide scaling patterns.
- [Unattended Agents](../unattended-agents/) — delegated work and oversight boundaries.
- [The Agentic Operating Model](../exec-strategy/) — executive framing for a transformation plan.

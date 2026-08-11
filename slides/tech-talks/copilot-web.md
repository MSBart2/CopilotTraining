---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## From Issue to Pull Request
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: From Issue to Pull Request
mdc: true
section: Developers
status: active
updated: 2026-08-11
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import AgendaSlide from './components/structure/AgendaSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import BeforeAfterSlide from './components/structure/BeforeAfterSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
</script>

# Title
<TitleSlide
  title="From Issue to Pull Request"
  subtitle="GitHub Copilot's Coding Agent in Practice"
  tagline="What if filing an issue was the same as fixing it?"
  meta="CopilotTraining Tech Talk · August 2026"
/>

---

# Core Question
<CoreQuestionSlide
  question="What if you could delegate an issue and get back a reviewed pull request?"
  subtext="GitHub Copilot's coding agent handles the implementation loop —"
  highlight="leaving the hard decisions to humans, by design."
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "Delegate bounded tasks, stay in flow while agent builds PRs" },
    { icon: "👥", title: "Tech Lead", description: "Govern what the agent can touch with firewall and branch rules" },
    { icon: "🏗️", title: "Platform Engineer", description: "Set up the environment agents use — CI parity from day one" },
    { title: "12 min", description: "total human time for a lodash upgrade across 23 files" },
    { title: "95% detail", description: "captured via image-based issue creation vs manual transcription" },
    { title: "Platform-enforced", description: "assigner cannot approve their own PR — by GitHub design" }
  ]'
/>

---

# Agenda
<AgendaSlide
  :items='[
    { title: "Choose the Trigger and Effort", takeaway: "Start directly or via configured comment automation, then tune reasoning per run.", whyItMatters: "Match quality to complexity while making token and premium-request credit use explicit." },
    { title: "Match the Environment", takeaway: "Configure the runtime agents use with setup steps.", whyItMatters: "Generated changes are more likely to pass the real build." },
    { title: "Govern the Network", takeaway: "Use firewall controls to bound agent access.", whyItMatters: "Autonomy becomes practical in repositories with sensitive systems." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔄", title: "Delegation Loop", subtitle: "The full loop from trigger to reviewed draft PR", blurb: "Mental model for all downstream sections", slide: 5 },
    { icon: "📝", title: "Writing Issues", subtitle: "Structure issues to maximize PR quality", blurb: "The most learnable skill you can apply today", slide: 10 },
    { icon: "🔒", title: "Trust and Configuration", subtitle: "CI parity, firewall controls, and audit trail", blurb: "Answer the safety objection with evidence", slide: 15 },
    { icon: "✅", title: "Review Workflow", subtitle: "Evidence-first review from any device", blurb: "Framework for what to delegate and what to keep", slide: 18 }
  ]'
/>

---

# Part 1 — Delegation Loop
<SectionOpenerSlide
  :partNumber="1"
  title="Delegation Loop"
  subtitle="Establish the full loop end-to-end: trigger, sandbox execution, evidence bundle, draft PR, and human review."
  :cards='[
    { icon: "🔄", title: "The Full Loop", blurb: "Trigger to draft PR in one complete arc" },
    { icon: "🏗️", title: "Three Layers", blurb: "Intelligence, Environment, Governance" },
    { icon: "🛡️", title: "Draft PR Boundary", blurb: "Agent opens — platform enforces no self-merge" }
  ]'
  :terminal='{ context: "GitHub-enforced separation of duties", detail: "Assigner ≠ Approver — by platform constraint" }'
/>

---

# The Three-Layer Architecture
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🏗️"
  pillLabel="Delegation Loop: Architecture"
  title="Three Layers Every Agent Session Uses"
  subtitle="Intelligence, Environment, and Governance — the backbone all other sections reference"
  :rows='[
    { label: "Intelligence", description: "Model access, repo instructions, and agent skills — interface-agnostic", tag: "GPT-4.1 · Claude" },
    { label: "Environment", description: "Ephemeral GitHub Actions runner, fresh per session via setup-steps.yml", tag: "Ubuntu · CI parity" },
    { label: "Governance", description: "Agent Firewall, branch protection, and enforced separation of duties", tag: "Firewall · Reviews" }
  ]'
  footnote="The customization investment compounds — instructions and skills written for VS Code apply identically here"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Starting the Agent: Two Trigger Modes
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🚀"
  pillLabel="Delegation Loop: Triggers"
  title="Direct Delegation vs. Configured Automation"
  :left='{
    header: "Direct Delegation",
    icon: "🎯",
    items: [
      { title: "Assign in browser, VS Code, or Mobile", detail: "One issue → one session, started immediately" },
      "No automation setup required — works on any repository",
      "Best for ad-hoc bounded tasks and exploring the workflow"
    ]
  }'
  :right='{
    header: "Configured Automation",
    icon: "⚙️",
    items: [
      { title: "Set a trigger comment text in Agents → Automations", detail: "Starts a new configured run — distinct from draft-PR refinement comments" },
      "Recurring handoffs: doc updates, investigations, follow-up issues",
      "Admin must enable cloud-agent policy for Copilot Business / Enterprise"
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Per-Run Reasoning: Quality vs. Cost
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="⚖️"
  pillLabel="Delegation Loop: Reasoning"
  title="Choose Reasoning Level at Task Start"
  :columns='[
    { icon: "📊", title: "Default", description: "Balanced quality and cost — right for routine tasks like dependency upgrades and test scaffolding" },
    { icon: "🔬", title: "Higher Reasoning", description: "Better on complex work — uses more tokens and more premium-request credits per run" },
    { icon: "📋", title: "Requirements", description: "Supporting models only; requires a paid Copilot plan that includes the cloud agent" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Separation-of-Duties Guarantee
<HeroStatSlide
  :partNumber="1"
  pillIcon="🛡️"
  pillLabel="Delegation Loop: Safety"
  title="The Agent Can Never Merge Its Own PR"
  subtitle="Platform-enforced, not policy — by design"
  :hero='{ value: "2", label: "required human reviewers before any agent change reaches the default branch", source: "GitHub enforces: agent opens draft only · assigner cannot be approver" }'
  :supporting='[
    { icon: "📝", title: "Draft status is invariant", description: "Every coding agent session opens a draft PR — no configuration can change this" },
    { icon: "⛔", title: "Assigner cannot approve", description: "The person who assigned the issue is blocked from approving the resulting PR" },
    { icon: "🔍", title: "Evidence bundle for reviewer 2", description: "Agent reasoning, test results, and firewall alerts surface for the second reviewer" },
    { icon: "🤝", title: "Plan for a second reviewer", description: "Teams where leads both assign and review need a designated rotation approver" }
  ]'
  :insight='{ icon: "💡", text: "This constraint makes every agent change structurally safer than a solo commit from a team member." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Writing Issues
<SectionOpenerSlide
  :partNumber="2"
  title="Writing Issues"
  subtitle="PR quality is a direct function of issue quality — the most learnable and immediately applicable skill in this talk."
  :cards='[
    { icon: "📝", title: "Issue Quality", blurb: "Structured issues produce better PRs" },
    { icon: "🖼️", title: "Visual Workflow", blurb: "Drop an image, get a complete issue" },
    { icon: "✅", title: "Acceptance Criteria", blurb: "Context + criteria + constraints format" }
  ]'
  :terminal='{ context: "Image-based issue creation", detail: "14 min manual → 2 min visual · 95% detail capture" }'
/>

---

# PR Quality = Issue Quality
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="📝"
  pillLabel="Writing Issues: Why Quality Matters"
  title="The Agent Interprets, Not Infers"
  :problem='{
    header: "Vague Issues",
    items: [
      "Agent guesses at intent and scope boundaries",
      { title: "Ambiguous ownership", detail: "Agent may touch unrelated files" },
      "PRs arrive with wrong assumptions baked in",
      "Rework cost often exceeds original implementation time"
    ]
  }'
  :solution='{
    header: "Structured Issues",
    items: [
      "Acceptance criteria: testable, checkboxed conditions",
      { title: "Explicit scope boundaries", detail: "In-scope files and out-of-scope constraints listed" },
      "Context links: migration guides, related files, patterns to follow"
    ]
  }'
  :outcome='{
    header: "Consistent PRs",
    items: [
      "Agent follows spec — correctness is reviewable",
      "Evidence bundle coherent with stated intent"
    ],
    metrics: [
      { value: "12 min", label: "review time on well-scoped issues" }
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Quality Gap Is Visible
<BeforeAfterPanelsSlide
  :partNumber="2"
  pillIcon="🔍"
  pillLabel="Writing Issues: Vague vs. Structured"
  title="Same Task, Opposite Outcomes"
  :before='{
    header: "Underspecified",
    items: [
      "Issue title: Fix the auth bug",
      "Body: The auth is broken. Please fix it.",
      "No acceptance criteria — done is undefined",
      "No scope — agent may touch unrelated files"
    ]
  }'
  :after='{
    header: "Structured",
    items: [
      "Issue title: Upgrade express-rate-limit v6 to v7",
      "3 checkboxed, testable acceptance criteria",
      "Scope: explicit in/out-of-scope file list",
      "Context: migration guide + current file link"
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Fast Path to a Complete Issue
<HeroStatSlide
  :partNumber="2"
  pillIcon="🖼️"
  pillLabel="Writing Issues: Image Workflow"
  title="Drop a Screenshot — Get a Structured Issue"
  subtitle="95% detail capture in 2 minutes vs. 14 minutes of manual transcription"
  :hero='{ value: "2 min", label: "to create a fully structured issue via image-based workflow", source: "vs 14-minute manual transcription — 95% vs ~60% detail capture" }'
  :supporting='[
    { icon: "📸", title: "Drop screenshot into github.com/copilot", description: "Monitoring alerts, UI bugs, PagerDuty screenshots, error dialogs" },
    { icon: "🔍", title: "AI extracts structured context", description: "Error codes, timestamps, request IDs, stack traces, affected services" },
    { icon: "📋", title: "Template applied automatically", description: "Labels assigned, severity assessed, issue ready for review in 2 minutes" },
    { icon: "🔄", title: "Assign to Copilot to close the loop", description: "Once the issue is confirmed, assign it to the coding agent for the PR" }
  ]'
  :insight='{ icon: "💡", text: "Operations teams report 9.3 hours/week of transcription time dropping to 1.3 hours/week." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Anatomy of an Agent-Ready Issue
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🎯"
  pillLabel="Writing Issues: Structure"
  title="Three Components That Maximize PR Quality"
  :columns='[
    { icon: "✅", title: "Acceptance Criteria", description: "Testable, checkboxed conditions that define done — the agent runs these as a checklist", items: ["Specific and verifiable", "One condition per checkbox"] },
    { icon: "📐", title: "Scope Boundaries", description: "Explicit in/out-of-scope prevents the agent from making helpful but unwanted changes", items: ["List specific files and dirs", "Name what must not change"] },
    { icon: "🔗", title: "Context + Constraints", description: "Migration guides, related PRs, patterns to follow, libraries or approaches to avoid", items: ["Link to relevant files", "State performance requirements"] }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Trust and Configuration
<SectionOpenerSlide
  :partNumber="3"
  title="Trust and Configuration"
  subtitle="The credibility bridge: CI parity, allowlist firewall, and evidence-first auditability."
  :cards='[
    { icon: "⚙️", title: "Setup Steps", blurb: "Mirror your CI environment exactly" },
    { icon: "🔒", title: "Agent Firewall", blurb: "Allowlist-based outbound restriction" },
    { icon: "📋", title: "Evidence Logs", blurb: "Blocked calls logged in the audit bundle" }
  ]'
  :terminal='{ context: "Blocked outbound call in evidence bundle", detail: "Auditability is an artifact feature, not an audit step" }'
/>

---

# CI Parity with copilot-setup-steps.yml
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="⚙️"
  pillLabel="Trust & Config: Environment"
  title="Same Runtime as Your CI Pipeline"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/copilot-setup-steps.yml", content: "jobs:\n  copilot-setup-steps:  # required job name\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci" }'
  :features='[
    { icon: "🔑", title: "Job name is the contract", description: "copilot-setup-steps — only this name triggers; everything else is standard Actions syntax" },
    { icon: "🔒", title: "Runs before firewall", description: "Private installs and internal tools in setup steps need no allowlist entries" },
    { icon: "🔍", title: "Debuggable in CI", description: "Path trigger validates setup before the first agent session runs" }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Agent Firewall: Allowlist and Audit Log
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🔒"
  pillLabel="Trust & Config: Agent Firewall"
  title="Blocked Calls Appear in the Evidence Bundle"
  codePosition="left"
  :code='{ language: "text", filename: "PR Evidence Bundle — Firewall Alert", content: "⚠️  Firewall blocked outbound connection\nTarget: unauthorized-domain.com:443\nCommand: curl https://unauthorized-domain.com/upload\nTime: 2026-04-06T14:32:17Z" }'
  :features='[
    { icon: "🔒", title: "Default allowlist", description: "npm, PyPI, Docker Hub, GitHub APIs, and OS package managers — most repos need no configuration" },
    { icon: "➕", title: "Extend at org or repo level", description: "Add internal registries and staging APIs under Settings → Copilot → Cloud agent" },
    { icon: "🔍", title: "Blocked calls are audit artifacts", description: "Any unauthorized outbound attempt logs here — investigate before merging any PR with alerts" }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Review Workflow
<SectionOpenerSlide
  :partNumber="4"
  title="Review Workflow"
  subtitle="Close the loop: evidence-bundle review turns hours of skepticism into minutes of confidence."
  :cards='[
    { icon: "📦", title: "Evidence Bundle", blurb: "Changes + reasoning + blocked calls" },
    { icon: "📱", title: "Mobile Approval", blurb: "Invoke @review-enforcer, approve in 3 min" },
    { icon: "🗺️", title: "What to Delegate", blurb: "Bounded + well-understood → agent" }
  ]'
  :terminal='{ context: "Lodash upgrade across 23 files", detail: "12 minutes total human time — agent handled the rest" }'
/>

---

# Evidence-Bundle-First Review
<BeforeAfterMetricsSlide
  :partNumber="4"
  pillIcon="📦"
  pillLabel="Review Workflow: Evidence Bundle"
  title="Review by Outcome, Not by Line Count"
  :before='{
    header: "Without Evidence Bundle",
    items: [
      "Open diff cold — unclear what changed or why",
      { title: "Run tests locally to know if it works", detail: "30+ minutes before review can start" },
      "No audit of external calls made during execution",
      "Agent reasoning is opaque — reviewer guesses intent"
    ]
  }'
  :after='{
    header: "With Evidence Bundle",
    items: [
      "Read summary first — 2–3 min for full change rationale",
      { title: "Test results already visible", detail: "Pass/fail from agent CI run — no local run needed" },
      "Firewall alerts surfaced — unauthorized calls visible immediately",
      "Invoke @review-enforcer for structured mobile analysis"
    ]
  }'
  :metrics='[
    { value: "<3 min", label: "mobile review end-to-end" },
    { value: "30 min", label: "average PR wait time, down from 4 hours" },
    { value: "2–3 min", label: "to read evidence bundle and know what changed" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# What to Delegate: The Decision Framework
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🗺️"
  pillLabel="Review Workflow: Delegation Guide"
  title="When the Agent Wins vs. When to Stay Human"
  subtitle="Take this framework back to your team tomorrow morning"
  :rows='[
    { label: "Well-bounded", description: "Approach is clear, scope is defined — dep upgrades, doc sync, lint", tag: "→ Delegate" },
    { label: "Design-only", description: "Novel features, architecture decisions — keep human, use IDE Copilot", tag: "→ Human" },
    { label: "Multi-repo", description: "Agent works one repo per session — cross-repo needs orchestration", tag: "→ Human" },
    { label: "Local or DB", description: "Production access, local DB, and local debug are outside the sandbox", tag: "→ Human" }
  ]'
  footnote="Start with one delegation-candidate issue this sprint — bounded + well-understood is the only test"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The Benchmark: 23 Files, 12 Minutes
<HeroStatSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="Review Workflow: Benchmark"
  title="What Delegation Looks Like in Practice"
  subtitle="A complete lodash upgrade, start to finish"
  :hero='{ value: "12 min", label: "total human time for a complete lodash upgrade across 23 files", source: "Issue filed → agent executed → draft PR reviewed → approved after one comment round" }'
  :supporting='[
    { icon: "📝", title: "Assign", description: "Developer files structured issue: scope, acceptance criteria, migration guide link" },
    { icon: "🤖", title: "Execute", description: "Agent upgrades all 23 files, updates tests, opens draft PR with evidence bundle" },
    { icon: "💬", title: "Refine", description: "Developer leaves 2 comments; agent pushes follow-up commits and re-runs CI" },
    { icon: "✅", title: "Approve", description: "12 minutes total human time — agent handled the implementation" }
  ]'
  :insight='{ icon: "💡", text: "The agent handled the rest. Human time = issue filing + PR review + one comment round." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Hours of Oversight to Minutes of Review"
  :leftItems='["Issue transcription took 14+ minutes per task", "Review required hours of skeptical, manual reading", "No clear framework for what to delegate to AI", "Audit was a separate step, not part of the artifact"]'
  :rightItems='["Image drop creates a complete issue in under 2 minutes", "Evidence bundle review completed on a phone in minutes", "Decision tree: bounded + well-understood → delegate", "Blocked firewall calls embedded in the evidence bundle"]'
  :metrics='[
    { value: "12 min", detail: "total human time for lodash upgrade across 23 files" },
    { value: "95%", detail: "detail captured in image-based issue creation" },
    { value: "<3 min", detail: "mobile PR review and approval end-to-end" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Assign one bounded, well-understood issue to the coding agent", "Use image-drop to create your next GitHub issue", "Review the evidence bundle on the resulting draft PR"]'
  :thisWeek='["Add copilot-setup-steps.yml to mirror your CI toolchain", "Configure Agent Firewall to strict or moderate", "Build a structured issue template: context, criteria, constraints"]'
  :thisMonth='["Audit agent PR patterns and refine your issue templates", "Enable Agents > Automations for repo-wide comment triggers", "Measure human-time-per-PR before and after delegation"]'
  footer="The smallest delegation — one bounded issue — proves the loop and builds the confidence to expand it."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/docs/copilot/copilot-coding-agent", label: "GitHub Copilot coding agent — VS Code", description: "Core concepts and triggering the agent from VS Code" },
      { href: "https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent", label: "About the Copilot coding agent", description: "Architecture, security model, capabilities, and limitations" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment", label: "Customizing the development environment", description: "copilot-setup-steps.yml reference and runner configuration" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall", label: "Customizing or disabling the firewall", description: "Allowlist management, org-level controls, and firewall limitations" }
    ] },
    { title: "📣 Blog & Changelog", color: "blue", items: [
      { href: "https://github.blog/ai-and-ml/github-copilot/assigning-and-completing-issues-with-coding-agent-in-github-copilot/", label: "Assigning and completing issues with coding agent", description: "Delegation workflow, evidence bundle, and PR lifecycle" },
      { href: "https://github.blog/ai-and-ml/github-copilot/onboarding-your-ai-peer-programmer-setting-up-github-copilot-coding-agent-for-success/", label: "Onboarding your AI peer programmer", description: "Issue quality, setup strategies, and adoption patterns" },
      { href: "https://github.blog/changelog/2026-08-03-trigger-copilot-automations-with-comments", label: "Trigger Copilot automations with comments", description: "Repository-configured comment triggers and automations" },
      { href: "https://github.blog/changelog/2026-08-03-customize-the-reasoning-level-for-copilot-cloud-agent", label: "Customize the reasoning level for Copilot cloud agent", description: "Per-run reasoning controls and token tradeoffs" }
    ] },
    { title: "🛠️ Related Talks", color: "purple", items: [
      { label: "Copilot CLI", description: "Terminal interface for triggering agent sessions from scripts and CI pipelines" },
      { label: "Agentic SDLC", description: "Multi-agent orchestration patterns for complex parallel workflows" },
      { label: "Custom Instructions Workshop", description: "Repository standards that shape agent PRs identically to IDE suggestions" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="From Issue to Pull Request"
  subtitle="GitHub Copilot's Coding Agent in Practice"
  :cards='[
    { value: "12 min", detail: "total human time — lodash upgrade, 23 files, agent handled the rest" },
    { value: "2 min", detail: "to create an issue with 95% detail capture via image-based workflow" },
    { value: "Never", detail: "the agent can merge its own PR — platform-enforced separation of duties" }
  ]'
  prompt="What's the first bounded, well-understood issue you'd delegate to the coding agent?"
/>

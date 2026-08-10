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
section: Copilot Tools
status: active
updated: 2026-04-22
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
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
</script>

# Title
<TitleSlide
  title="From Issue to Pull Request"
  subtitle="GitHub Copilot&#39;s Coding Agent in Practice"
  tagline="What if filing an issue was the same as fixing it?"
  meta="GitHub Copilot · Coding Agent · Agentic Delivery"
/>

---

# Core Question
<CoreQuestionSlide
  question="What would you tackle if bounded implementation work cost minutes, not days?"
  subtext="The coding agent closes the gap between"
  highlight="&#34;we know what needs doing&#34; and &#34;it&#39;s done.&#34;"
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "Offload dependency upgrades, scaffold, and doc sync to focus on design" },
    { icon: "🏗️", title: "Tech Lead", description: "Assign bounded backlog issues without scheduling sprint slots for each one" },
    { icon: "📋", title: "Product Manager", description: "File a well-formed issue and watch it close — no implementation queue to manage" },
    { title: "12 minutes", description: "Total human time — complete lodash upgrade across 23 files, the agent handled the rest" },
    { title: "95% detail capture", description: "Image-based issue creation vs ~60% manually — 14-minute transcription → 2 minutes visual" },
    { title: "Draft PR, never merge", description: "Platform-enforced: the person who assigned the issue cannot approve the resulting PR" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Delegate From the Browser", takeaway: "Assign work from GitHub web, VS Code, or mobile into agent PRs.", whyItMatters: "More roles can hand off work without losing context." },
    { title: "Match the Environment", takeaway: "Configure the runtime agents use with setup steps.", whyItMatters: "Generated changes are more likely to pass the real build." },
    { title: "Govern the Network", takeaway: "Use firewall controls to bound agent access.", whyItMatters: "Autonomy becomes practical in repositories with sensitive systems." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔄", title: "Delegation Loop",       subtitle: "From issue to draft PR end-to-end",        blurb: "The full loop, architecture, evidence bundle, separation of duties", slide: 4  },
    { icon: "✍️", title: "Writing Issues",        subtitle: "Issue quality drives PR quality",           blurb: "Structure, weak-vs-good comparison, image-based fast path",           slide: 9  },
    { icon: "🔒", title: "Trust & Configuration", subtitle: "Environment setup and the Agent Firewall",  blurb: "copilot-setup-steps.yml, allowlist, blocked-call logging",             slide: 13 },
    { icon: "✅", title: "Review Workflow",        subtitle: "Evidence bundle to approved PR",            blurb: "Mobile review, @review-enforcer, what to delegate decision tree",      slide: 16 }
  ]'
/>

---

# Part 1 — Delegation Loop
<SectionOpenerSlide
  :partNumber="1"
  title="Delegation Loop"
  subtitle="Assign an issue, receive a tested draft PR — with no developer involvement in between."
  :cards='[
    { icon: "🏗️", title: "Three-Layer Architecture", blurb: "Intelligence, Environment, Governance — the structural backbone" },
    { icon: "⚡", title: "Sandboxed Execution", blurb: "Ephemeral runner, CI pipeline, evidence bundle in draft PR" },
    { icon: "🔐", title: "Separation of Duties", blurb: "GitHub-enforced: assigner cannot be approver" }
  ]'
  :terminal='{ context: "Assign issue → agent runs CI → opens draft PR", detail: "12 min human time · 23 files · lodash upgraded" }'
/>

---

# The Three-Layer Architecture
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🏗️"
  pillLabel="Delegation Loop: Architecture"
  title="The Coding Agent Runs in Three Layers"
  :columns='[
    { icon: "🧠", title: "Intelligence", description: "Same model, instructions, and skills as VS Code chat — no separate configuration needed", items: [".github/copilot-instructions.md", "Agent skills (.github/skills/)", "Custom review agents"] },
    { icon: "⚙️", title: "Environment", description: "Fresh ephemeral Ubuntu runner per session — copilot-setup-steps.yml configures it first", items: ["Same Node/Python as your CI", "Git clone at issue&#39;s base branch", "Destroyed after session ends"] },
    { icon: "🛡️", title: "Governance", description: "Agent Firewall restricts outbound connections — blocked attempts logged in evidence bundle", items: ["Branch protection enforced", "Required status checks apply", "Audit log in every PR"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Inside the Sandbox
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📦"
  pillLabel="Delegation Loop: Execution"
  title="What Happens Inside the Agent&#39;s Sandbox"
  :rows='[
    { label: "Provision",  description: "Fresh Ubuntu runner created — isolated from production, destroyed after session",    tag: "ephemeral"    },
    { label: "Setup",      description: "copilot-setup-steps.yml runs — same Node version, npm ci, same as your CI",             tag: "CI parity"    },
    { label: "Context",    description: "Issue body, copilot-instructions.md, and relevant source files loaded",                 tag: "RAG + search" },
    { label: "Implement",  description: "Multi-file changes made, iterating until build and tests pass",                          tag: "coordinated"  },
    { label: "Evidence",   description: "Draft PR opened with changes summary, test results, and firewall alerts",                tag: "audit bundle" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Evidence Bundle
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Delegation Loop: Evidence Bundle"
  title="Every Draft PR Includes an Evidence Bundle"
  :cards='[
    { icon: "📝", title: "Changes Summary",  description: "What was changed and why — plain language rationale for every file touched by the agent" },
    { icon: "✅", title: "Test Results",     description: "Pass/fail status from the CI run inside the sandbox — before you open the diff" },
    { icon: "🔥", title: "Firewall Alerts",  description: "Any blocked outbound connection attempts logged with the triggering command and timestamp" },
    { icon: "⏱️", title: "2–3 Minutes",     description: "Time to read the bundle and get a complete picture of what the agent did before reviewing the diff" }
  ]'
  :insight='{ icon: "💡", text: "Read the evidence bundle first. A clean bundle means the diff review focuses on correctness and edge cases, not basic functionality." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Separation of Duties
<HeroStatSlide
  :partNumber="1"
  pillIcon="🔐"
  pillLabel="Delegation Loop: Governance"
  title="Platform-Enforced Separation of Duties"
  subtitle="The person who assigns the issue cannot approve the resulting PR"
  :hero='{ value: "100%", label: "of agent PRs require a second human reviewer", source: "GitHub-enforced, not configurable — intentional by design" }'
  :supporting='[
    { icon: "🚫", title: "Not configurable", description: "Enforced by GitHub platform rules, not a policy that can be bypassed" },
    { icon: "👥", title: "Plan for a reviewer", description: "Where the tech lead both assigns and reviews, designate a second reviewer" },
    { icon: "📱", title: "Mobile-ready review", description: "The review workflow is designed to complete from a phone — evidence bundle plus @review-enforcer" }
  ]'
  :insight='{ icon: "🔒", text: "The draft-PR boundary is the hardest constraint in the loop — and the most important. The agent can never merge its own work." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Writing Issues
<SectionOpenerSlide
  :partNumber="2"
  title="Writing Issues"
  subtitle="PR quality is a direct function of issue quality — the most learnable, immediately applicable skill in this talk."
  :cards='[
    { icon: "📐", title: "Four-Part Structure", blurb: "Criteria, scope, context, constraints — anatomy of an effective agent issue" },
    { icon: "👁️", title: "Weak vs Effective", blurb: "Side-by-side comparison makes the quality gap visible, not described" },
    { icon: "📸", title: "Image-Based Fast Path", blurb: "14-min transcription → 2-min visual with 95% detail capture" }
  ]'
  :terminal='{ context: "Issue quality → PR quality — direct causation", detail: "Write the issue once · delegate forever" }'
/>

---

# Anatomy of an Effective Issue
<FourCardGridSlide
  :partNumber="2"
  pillIcon="📐"
  pillLabel="Writing Issues: Structure"
  title="Four Components of an Agent-Ready Issue"
  :cards='[
    { icon: "✅", title: "Acceptance Criteria", description: "Testable conditions for done — the agent runs each as a verification step" },
    { icon: "🎯", title: "Scope Boundaries",    description: "What is and is not in scope — prevents the agent from expanding the change" },
    { icon: "🔗", title: "Context Links",       description: "Related issues, PRs, migration guides, or source files to study first" },
    { icon: "⚠️", title: "Constraints",         description: "Patterns to follow, libraries to avoid — the team&#39;s non-negotiables" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Weak vs Effective Issue
<BeforeAfterPanelsSlide
  :partNumber="2"
  pillIcon="📝"
  pillLabel="Writing Issues: Quality Gap"
  title="The Same Task, Two Very Different Issues"
  :before='{
    header: "Weak Issue — inconsistent PRs",
    items: [
      "Title: Fix the authentication bug",
      "Body: The auth is broken. Please fix it.",
      "No criteria — agent guesses what done means",
      "No scope — change could touch anything in the codebase"
    ]
  }'
  :after='{
    header: "Effective Issue — consistent, reviewable PRs",
    items: [
      "Upgrade express-rate-limit v6 → v7",
      "Criteria: onLimitReached migrated to handler, existing tests pass, new test added",
      "Scope: src/middleware/, package.json, test/middleware/ only",
      "Context: migration guide URL and current config file path provided"
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Image-Based Issue Creation
<HeroStatSlide
  :partNumber="2"
  pillIcon="📸"
  pillLabel="Writing Issues: Fast Path"
  title="The Fastest Route to a Well-Formed Issue"
  subtitle="Drag a screenshot into github.com/copilot — AI reads the image and generates a structured issue"
  :hero='{ value: "95%", label: "detail capture vs ~60% manually", source: "14-minute manual transcription → 2-minute visual workflow" }'
  :supporting='[
    { icon: "🚨", title: "PagerDuty alerts",  description: "Drop a monitoring screenshot — error messages, timestamps, request IDs extracted" },
    { icon: "🐛", title: "UI bug reports",    description: "QA screenshots become structured issues with labels and severity assessed" },
    { icon: "💡", title: "Then delegate",     description: "Once the issue is created and refined, assign it to Copilot — image to delegated PR in one session" }
  ]'
  :insight='{ icon: "⚡", text: "Particularly powerful for operations teams — a PagerDuty screenshot becomes a structured, delegated issue in under 3 minutes." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Trust and Configuration
<SectionOpenerSlide
  :partNumber="3"
  title="Trust and Configuration"
  subtitle="Two files determine agent reliability — one controls what goes in, one controls what stays out."
  :cards='[
    { icon: "⚙️", title: "Setup Steps", blurb: "copilot-setup-steps.yml — CI parity guarantee before execution begins" },
    { icon: "🔥", title: "Agent Firewall", blurb: "Allowlist-based outbound restriction with audit log in every PR" },
    { icon: "📜", title: "Instructions Apply", blurb: "copilot-instructions.md and skills work identically for agent PRs" }
  ]'
  :terminal='{ context: "Blocked call logged in evidence bundle — auditability by design", detail: "firewall: unauthorized-domain.com:443 → BLOCKED" }'
/>

---

# copilot-setup-steps.yml
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="⚙️"
  pillLabel="Trust: Environment Setup"
  title="copilot-setup-steps.yml — CI Parity Before Execution"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/copilot-setup-steps.yml", content: "jobs:\n  copilot-setup-steps:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n          cache: \"npm\"\n      - run: npm ci" }'
  :features='[
    { icon: "🔄", title: "CI parity guarantee", description: "Same Node version, same tooling as your CI pipeline — no environment surprises" },
    { icon: "⏮️", title: "Runs before firewall", description: "npm ci and tool downloads complete before firewall enforcement begins" },
    { icon: "🔍", title: "Visible in session log", description: "Setup step output appears in the Copilot session UI — failures are debuggable" }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Agent Firewall
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔥"
  pillLabel="Trust: Agent Firewall"
  title="The Firewall Controls What Stays Out of the Sandbox"
  :columns='[
    { icon: "✅", title: "Default Allowlist", description: "npm, PyPI, Maven, Docker Hub, GitHub APIs — standard installs work without configuration", items: ["apt, yum, apk package managers", "ghcr.io, gcr.io registries", "SSL CAs + Playwright browsers"] },
    { icon: "➕", title: "Extend When Needed", description: "Add internal registries at org or repo level via Settings → Copilot → Cloud agent", items: ["Org-level: applies to all repos", "Repo-level: scoped overrides", "Private npm/PyPI registries"] },
    { icon: "📋", title: "Blocked Call Logging", description: "Every blocked connection logged in the PR evidence bundle — auditability by design", items: ["Target domain and port recorded", "The triggering command shown", "Timestamp for correlation"] }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Review Workflow
<SectionOpenerSlide
  :partNumber="4"
  title="Review Workflow"
  subtitle="Evidence bundle to approved PR — human review in minutes, not hours, from a browser or a phone."
  :cards='[
    { icon: "📋", title: "Evidence-First Review", blurb: "Read the bundle before the diff — 2 minutes reveals what to look for" },
    { icon: "📱", title: "Mobile Review Loop", blurb: "@review-enforcer + approve from GitHub Mobile in under 3 minutes" },
    { icon: "🗺️", title: "What to Delegate", blurb: "Decision tree — the durable take-home artifact from this talk" }
  ]'
  :terminal='{ context: "Lodash upgrade · 23 files · tests passing", detail: "12 minutes total human time — start to approved merge" }'
/>

---

# Evidence-First Review
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="📋"
  pillLabel="Review Workflow: Evidence Bundle"
  title="Read the Evidence Bundle Before Opening the Diff"
  :rows='[
    { label: "Summary",  description: "What the agent changed and why — 2-min read gives a full picture of intent",              tag: "2 minutes"  },
    { label: "Tests",    description: "Pass/fail from the CI run — tells you if it works before looking at a single line",       tag: "CI results" },
    { label: "Firewall", description: "Any blocked outbound calls — investigate before proceeding if unexpected ones appear",   tag: "audit log"  }
  ]'
  footnote="Clean bundle = focus the diff review on correctness and edge cases, not basic functionality"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Mobile Review Loop
<WorkflowShowdownStepsSlide
  :partNumber="4"
  pillIcon="📱"
  pillLabel="Review Workflow: Mobile"
  title="The Full Review Loop from a Phone"
  leftLabel="Traditional Review"
  rightLabel="Mobile Agent PR Review"
  :steps='[
    { left: { label: "Pull branch locally",        note: "Set up dev environment, run tests" },    right: { label: "Open PR notification",       note: "GitHub Mobile, any device" } },
    { left: { label: "Read the full diff",          note: "30–60 min for complex changes" },        right: { label: "Read evidence bundle",        note: "Summary + test results, 2–3 min" } },
    { left: { label: "Verify correctness manually", note: "Check test coverage, edge cases" },      right: { label: "Invoke @review-enforcer",     note: "Security, logic, coverage analysis" } },
    { left: { label: "Write review comments",       note: "15–30 min for detailed feedback" },      right: { label: "Approve or request changes",  note: "Specific, line-referenced feedback" } }
  ]'
  :outcomeLeft='{ icon: "⏱️", label: "45–90 minutes per agent PR review" }'
  :outcomeRight='{ icon: "✅", label: "Under 3 minutes from a phone" }'
  summaryMetric="4-hour average PR wait → under 30 minutes with mobile review"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# What to Delegate Decision Tree
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🗺️"
  pillLabel="Review Workflow: Decision Framework"
  title="What to Delegate — The Durable Take-Home Framework"
  subtitle="Well-understood + bounded → delegate. Design judgment or novel architecture → keep human."
  :rows='[
    { label: "→ Delegate",   description: "Dependency upgrades, test scaffold, CRUD endpoints, doc sync — bounded and repeatable",   tag: "Copilot"     },
    { label: "→ Delegate",   description: "Boilerplate with clear spec — migration scripts, converters, config generation",              tag: "Copilot"     },
    { label: "→ Keep human", description: "Novel feature design, architecture decisions — requires creative judgment",                  tag: "IDE Copilot" },
    { label: "→ Keep human", description: "Multi-repo coordination — agent works in one repository per session",                        tag: "human"       },
    { label: "→ Keep human", description: "Local environment or database required — sandbox has no production access",                  tag: "human"       }
  ]'
  footnote="Lodash upgrade · 23 files · 12 minutes total human time — this is what &#34;delegate&#34; looks like in practice"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Deferred Backlog to Delegated Execution"
  :leftItems='["Bounded work deferred indefinitely — never prioritized in sprints", "Developer writes and also reviews their own bounded-scope code", "14-minute manual issue transcription from screenshots and alerts", "PR review requires pulling the branch and setting up a local environment"]'
  :rightItems='["Assign an issue — tested draft PR arrives without developer involvement", "Human role shifts to reviewer and approver — not implementer", "2-minute image-based issue creation with 95% detail capture", "Full review from evidence bundle plus @review-enforcer, 3 minutes on mobile"]'
  :metrics='[
    { value: "12 min", detail: "total human time — complete lodash upgrade, 23 files, tests passing" },
    { value: "95%", detail: "detail capture with image-based issue creation vs ~60% manually" },
    { value: "0 merges", detail: "the agent opens draft PRs — it can never merge its own work" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Assign one bounded backlog issue to Copilot from github.com/copilot", "Read the evidence bundle before opening the diff on the resulting PR", "Note whether the PR quality reflects the issue quality"]'
  :thisWeek='["Commit .github/workflows/copilot-setup-steps.yml with your Node or Python version and npm ci", "Draft an issue template with acceptance criteria, scope boundaries, and context links", "Designate a second reviewer — the assigner cannot approve the resulting PR"]'
  :thisMonth='["Build a @review-enforcer agent in .github/agents/review-enforcer.md optimized for mobile readability", "Run one dependency upgrade sprint across multiple services using the coding agent", "Review the Agent Firewall allowlist and add any internal registries your repositories use"]'
  footer="The coding agent changes what developer time means — from writing bounded code to reviewing the agent&#39;s work."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/docs/copilot/copilot-coding-agent", label: "GitHub Copilot coding agent — VS Code docs", description: "Core concepts, triggering the agent, VS Code integration" },
      { href: "https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent", label: "About the Copilot coding agent — GitHub docs", description: "Architecture, capabilities, three-layer model reference" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment", label: "Customizing the development environment", description: "copilot-setup-steps.yml reference and advanced runner configuration" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall", label: "Customizing or disabling the Agent Firewall", description: "Allowlist management, org-level controls, and security model" }
    ] },
    { title: "📰 Further Reading", color: "purple", items: [
      { href: "https://github.blog/ai-and-ml/github-copilot/assigning-and-completing-issues-with-coding-agent-in-github-copilot/", label: "Assigning and completing issues with coding agent", description: "GitHub Blog — end-to-end walkthrough and real-world use cases" },
      { href: "https://github.blog/ai-and-ml/github-copilot/onboarding-your-ai-peer-programmer-setting-up-github-copilot-coding-agent-for-success/", label: "Onboarding your AI peer programmer", description: "GitHub Blog — team adoption guide and setup checklist" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="From Issue to Pull Request"
  subtitle="GitHub Copilot&#39;s Coding Agent in Practice"
  :cards="[
    { value: '12 min', detail: 'total human time — lodash upgrade across 23 files, tests passing, PR approved' },
    { value: '95%', detail: 'detail capture — image-based issue creation vs manual transcription' },
    { value: 'Draft only', detail: 'agent opens PRs, never merges — GitHub-enforced separation of duties' }
  ]"
  prompt="What&#39;s one bounded task from your backlog you could assign to Copilot this week?"
/>

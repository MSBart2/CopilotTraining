---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Scaling GitHub Copilot Across Organizations
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Scaling GitHub Copilot Across Organizations
mdc: true
section: "Platform Teams"
status: active
updated: 2026-08-11
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import BeforeAfterSlide from './components/structure/BeforeAfterSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="Scaling Copilot Across Your Organization"
  subtitle="Enterprise Patterns for AI Adoption at Scale"
  tagline="One change, all repos, instantly — from pilot teams to org-wide capability"
  meta="GitHub Copilot · Platform Teams · Enterprise Patterns"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do you scale Copilot from pilot teams to org-wide capability?"
  subtext="Individual team success doesn&#39;t compound automatically —"
  highlight="50 teams reinventing the same patterns wastes 2,000+ hours every year."
  :cards='[
    { icon: "🏗️", title: "Platform Engineers", description: "Govern, extend, and scale Copilot standards across the organization" },
    { icon: "👩‍💼", title: "Engineering Leaders", description: "Justify investment with product-backed ROI and adoption evidence" },
    { icon: "🔧", title: "Enterprise Architects", description: "Design federated governance that scales without becoming a bottleneck" },
    { title: "50 teams × 40 hrs", description: "Reinvention overhead for repo instructions and security patterns" },
    { title: "16× platform ROI", description: "180 hours invested → 2,900+ hours saved in year one" },
    { title: "500+ developers", description: "Reached instantly by a single org-level instruction change" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "📐", title: "Organization-Wide Standards", subtitle: "Define once, propagate to all repos", blurb: "Org instructions, monorepo playbooks, polyrepo topology", slide: 4 },
    { icon: "🧠", title: "Skills & Knowledge Bases", subtitle: "Encode expertise as reusable org assets", blurb: "Agent Skills (GA) vs Knowledge Bases (Enterprise Cloud only)", slide: 9 },
    { icon: "🔒", title: "Governance & Licensing", subtitle: "Model policies, licensing, compliance", blurb: "Migration readiness, cost optimization, audit trails", slide: 13 },
    { icon: "📊", title: "Adoption & Enablement", subtitle: "Control plane, ROI, self-service onboarding", blurb: "Product-backed evidence, stable agent_id activity", slide: 17 }
  ]'
/>

---

# Part 1 — Organization-Wide Standards
<SectionOpenerSlide
  :partNumber="1"
  title="Organization-Wide Standards"
  subtitle="One org-level instruction change reaches every repo instantly — ending the 50-teams × 40-hours reinvention tax."
  :cards='[
    { icon: "📋", title: "Security & Compliance", blurb: "Auth patterns, encryption, and audit rules applied to every repo" },
    { icon: "🔧", title: "Framework Preferences", blurb: "Approved stacks, testing standards, and CI/CD patterns" },
    { icon: "📁", title: "Monorepo Playbooks", blurb: "Nested AGENTS.md files scope guidance to each subdomain" }
  ]'
  :terminal='{ context: "One change → 500+ developers", detail: "40 hrs reinvention per team → 0" }'
/>

---

# The Reinvention Tax
<HeroStatSlide
  :partNumber="1"
  pillIcon="⏱️"
  pillLabel="Standards at Scale: The Problem"
  title="50 Teams, 50 Reinventions — 2,000 Hours Lost"
  subtitle="Each team discovers the same patterns independently and pays the same cost"
  :hero='{ value: "2,000", label: "hours lost to reinvention in a 50-team org (40 hrs × 50 teams)", source: "" }'
  :supporting='[
    { icon: "🔐", title: "Security rules reimplemented", description: "Authentication, encryption, secrets management — rediscovered by every team" },
    { icon: "🧰", title: "Framework standards duplicated", description: "Testing configs, linting rules, CI/CD patterns rebuilt from scratch each time" },
    { icon: "📋", title: "Compliance requirements interpreted", description: "Each team reads the same regulations and reaches different conclusions" },
    { icon: "📉", title: "Knowledge never compounds", description: "Team A&#39;s best practices stay in Team A — never reaching Teams B through Z" }
  ]'
  :insight='{ icon: "💡", text: "The fix: encode standards once at org level and let every repo inherit automatically." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Org Instructions: What to Standardize
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Standards at Scale: What to Encode"
  title="Four Categories Worth Standardizing at Org Level"
  :cards='[
    { icon: "🔐", title: "Security & Auth", description: "OAuth 2.0 with PKCE, AES-256 at rest, parameterized queries, no hardcoded secrets" },
    { icon: "🧪", title: "Testing Standards", description: "Jest for unit tests, Playwright for E2E, 80% coverage minimum, CI gate" },
    { icon: "⚖️", title: "Compliance Rules", description: "PCI card masking, HIPAA PHI encryption, GDPR data handling — regulatory floor" },
    { icon: "♿", title: "Quality Baselines", description: "WCAG 2.1 AA accessibility, Lighthouse >90, 200KB bundle budget" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Monorepo vs. Polyrepo Topology
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="📁"
  pillLabel="Standards at Scale: Repo Topology"
  title="Polyrepo vs. Monorepo — Where Each Standard Lives"
  :left='{
    header: "Polyrepo",
    icon: "🗂️",
    items: [
      { title: "Org instructions", detail: "Common security and quality floor for all repos" },
      { title: "Per-repo copilot-instructions.md", detail: "Service-specific context and overrides" },
      { title: "Root AGENTS.md per repo", detail: "Portable agent playbook for cross-tool consistency" }
    ]
  }'
  :right='{
    header: "Monorepo",
    icon: "📦",
    items: [
      { title: "Root copilot-instructions.md", detail: "Repo constitution — applies to all paths" },
      { title: "instructions/*.instructions.md", detail: "applyTo glob patterns for file-type rules" },
      { title: "frontend/ backend/ infra/ AGENTS.md", detail: "Subdomain playbooks with local commands and guardrails" }
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Org Instructions in Practice
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📝"
  pillLabel="Standards at Scale: Implementation"
  title="Organization Custom Instructions — Minimal Working Example"
  codePosition="left"
  :code='{ language: "markdown", filename: "Organization Settings → Custom Instructions", content: "## Security Standards\n- Auth: OAuth 2.0 with PKCE for all web apps\n- Encryption: AES-256 at rest, TLS 1.3 in transit\n- Secrets: Use vault service — never hardcode\n- SQL: Parameterized queries exclusively\n\n## Framework Preferences\n- Frontend: React 18+ with TypeScript\n- Testing: Jest unit, Playwright E2E, 80% min\n- Style: Prettier + ESLint recommended\n\n## Accessibility\n- All UI meets WCAG 2.1 AA\n- ARIA labels on interactive elements" }'
  :features='[
    { icon: "⚡", title: "Zero per-repo config", description: "Applied automatically — no team action required" },
    { icon: "🔄", title: "Additive inheritance", description: "Repos add specifics on top; org floor stays locked" },
    { icon: "📈", title: "Instant propagation", description: "Update once → 500+ developers see new guidance immediately" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Organizational Skills & Knowledge Bases
<SectionOpenerSlide
  :partNumber="2"
  title="Organizational Skills & Knowledge Bases"
  subtitle="Agent Skills (GA) and Knowledge Bases — distinct mechanisms, complementary value."
  :cards='[
    { icon: "⚡", title: "Agent Skills (GA)", blurb: "Org-level skills versioned centrally, available in every repo" },
    { icon: "📚", title: "Knowledge Bases", blurb: "Index 5–50 repos into unified context (Enterprise Cloud only)" },
    { icon: "🔄", title: "Knowledge Compounds", blurb: "Update one skill; every team inherits improved guidance" }
  ]'
  :terminal='{ context: "Update once → propagate everywhere", detail: "Senior architect knowledge → 500 developers instantly" }'
/>

---

# Agent Skills vs. Knowledge Bases
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🧠"
  pillLabel="Skills & Knowledge: Two Mechanisms"
  title="Agent Skills vs. Knowledge Bases — Different Jobs, Both Essential"
  :left='{
    header: "Agent Skills (GA)",
    icon: "⚡",
    items: [
      { title: "What they do", detail: "Encode reusable expertise — security checks, compliance validation, architecture review" },
      { title: "How they work", detail: "Defined in .github/skills/, versioned centrally, referenced from any repo" },
      { title: "Audience", detail: "All GitHub Copilot tiers — Business and Enterprise" },
      { title: "Key win", detail: "Update the skill once; every team using it inherits improved guidance automatically" }
    ]
  }'
  :right='{
    header: "Knowledge Bases (Enterprise Cloud)",
    icon: "📚",
    items: [
      { title: "What they do", detail: "Index 5–50 repos into a unified queryable context" },
      { title: "How they work", detail: "Admin indexes repos; devs query with @kb payment-platform in Copilot Chat" },
      { title: "Audience", detail: "Enterprise Cloud only — microservices and polyrepo teams" },
      { title: "Key win", detail: "Ask about auth flow and get context from API, fraud detection, and compliance repos simultaneously" }
    ]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Skill Library: Domain Categories
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🗂️"
  pillLabel="Skills & Knowledge: Skill Library"
  title="Org Skill Library — Three Categories That Cover Most Enterprises"
  :columns='[
    { icon: "🔐", title: "Security & Compliance", description: "PCI card masking, HIPAA PHI checks, OWASP vulnerability detection, credential scanning", items: ["payment-processing", "healthcare-data", "security-scanner"] },
    { icon: "🏛️", title: "Architecture & Quality", description: "Approved patterns, anti-pattern detection, performance budgets, accessibility validation", items: ["architecture-review", "performance-budgets", "accessibility-check"] },
    { icon: "💰", title: "Cost & Operations", description: "Cloud resource cost prediction, tech-debt scoring, dependency risk analysis", items: ["cost-estimator", "tech-debt-analyzer", "dependency-risk"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Knowledge Bases: Multi-Repo Context
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="🔗"
  pillLabel="Skills & Knowledge: Knowledge Bases"
  title="Multi-Repository Context — From Manual Tab-Switching to Unified Understanding"
  :problem='{
    header: "The Problem",
    items: [
      "Microservices split system knowledge across 10–50 repos",
      "Developers manually piece together behavior from multiple codebases",
      { title: "Context lost in translation", detail: "API contracts, business logic, and compliance rules live in separate repos" }
    ]
  }'
  :solution='{
    header: "The Solution",
    items: ["Admin indexes related repos into a named Knowledge Base", "Developers query: @kb payment-platform"],
    code: { language: "text", content: "Knowledge Base: Payment Platform\n  ├── payment-api\n  ├── payment-processor\n  ├── fraud-detection\n  ├── compliance-rules\n  └── platform-docs" }
  }'
  :outcome='{
    header: "The Outcome",
    items: ["Copilot answers with full system context", "No tab-switching, no manual cross-referencing"],
    metrics: [{ value: "5–50 repos", label: "unified into one queryable system" }]
  }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Governance & Licensing
<SectionOpenerSlide
  :partNumber="3"
  title="Governance & Licensing"
  subtitle="Model policies, flexible licensing, compliance automation, and migration readiness."
  :cards='[
    { icon: "🤖", title: "Model Policies", blurb: "Restrict, route, and audit AI model access org-wide" },
    { icon: "💳", title: "Flexible Licensing", blurb: "Mix seat-based and usage-based — reduce costs 30–40%" },
    { icon: "⚖️", title: "Compliance Automation", blurb: "OWASP, HIPAA, and data-residency rules as executable skills" }
  ]'
  :terminal='{ context: "Migration readiness before September 1", detail: "Enable approved replacement → verify in selectors → done" }'
/>

---

# Model Policies & Migration Readiness
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🤖"
  pillLabel="Governance: Model Policies"
  title="Model Access Control + Migration Readiness — One Policy Review"
  :left='{
    header: "Access Control",
    icon: "🔒",
    items: [
      { title: "Restrict by model tier", detail: "Reserve higher-reasoning models for complex analysis; route routine tasks to fast models" },
      { title: "Audit all usage", detail: "Track model selection across org for cost and compliance visibility" },
      { title: "Auto-selection respects policy", detail: "Teams get task-appropriate AI without manually choosing models" }
    ]
  }'
  :right='{
    header: "Migration Readiness",
    icon: "🔄",
    items: [
      { title: "Treat retirement as a policy check", detail: "Enable a durable supported replacement before affected workflows depend on it" },
      { title: "Verify in model selectors", detail: "Confirm the replacement appears in every affected workflow&#39;s selector" },
      { title: "Use capability wording", detail: "Write standards and runbooks with capability terms, not model names that age quickly" }
    ]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Flexible Licensing Strategy
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="💳"
  pillLabel="Governance: Licensing"
  title="Match Licensing to Usage — 30–40% Cost Reduction"
  :columns='[
    { icon: "💻", title: "Full Seats", description: "Daily developers, platform engineers, architects — full IDE + chat + agents", items: ["Core eng teams", "Platform builders", "Architects"] },
    { icon: "⏱️", title: "Usage-Based", description: "Occasional users pay per premium request — no wasted seat cost", items: ["Contractors", "Security reviewers", "Technical writers"] },
    { icon: "👁️", title: "Review-Only", description: "Unlicensed org members can view AI suggestions in PRs — zero cost", items: ["Product managers", "Design team", "QA analysts"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Compliance Automation
<BeforeAfterPanelsSlide
  :partNumber="3"
  pillIcon="⚖️"
  pillLabel="Governance: Compliance"
  title="From Manual Checklist to Automated Enforcement"
  :before='{ header: "Manual Compliance", items: [
    "Security review: 45 min per PR",
    "HIPAA/PCI checks by hand — inconsistently applied",
    "Audit prep: 120 hours of manual evidence gathering",
    "Violations discovered post-merge or post-audit"
  ]}'
  :after='{ header: "Automated via Agent Skills", items: [
    "@security-validator checks every PR for OWASP Top 10",
    "hipaa-compliance-check validates PHI encryption automatically",
    "Audit prep: 8 hours with pre-generated trail (93% reduction)",
    "Violations caught pre-merge — remediated before code ships"
  ]}'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Adoption & Enablement
<SectionOpenerSlide
  :partNumber="4"
  title="Adoption & Enablement"
  subtitle="Managed settings, product-backed ROI, and self-service onboarding."
  :cards='[
    { icon: "🎛️", title: "Managed Settings", blurb: "Enterprise floor + team specialization, bounded by license" },
    { icon: "📈", title: "Directional ROI", blurb: "Impact-dashboard trends plus stable agent_id activity — no double counting" },
    { icon: "🚀", title: "Self-Service Onboarding", blurb: "30-minute quick start; 50 teams onboard without platform bottleneck" }
  ]'
  :terminal='{ context: "180 hrs invested → 2,900+ hrs saved", detail: "16× ROI, compounding as org grows" }'
/>

---

# Managed Settings: Enterprise Control Plane
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🎛️"
  pillLabel="Adoption: Managed Settings"
  title="Managed Settings — Enterprise Floor, Team Specialization, Bounded Merge"
  subtitle="Three layers define who controls what — the platform team locks the floor, teams customize within permitted keys"
  :rows='[
    { label: "Policy Floor", description: "Non-overridable keys — security posture, content filtering, model list", tag: "Always enforced" },
    { label: "Overridable", description: "Admin marks specific keys as team-customizable; others stay locked", tag: "Permitted overrides" },
    { label: "Team Scope", description: "Files in copilot/teams/ mapped to GitHub team slugs", tag: "Scoped by team" },
    { label: "Merge Rules", description: "Multi-team: least restrictive within boundary; plugins are additive", tag: "Least-restrictive" },
    { label: "Enforcement", description: "VS Code, CLI, App, cloud agent — Business/Enterprise license", tag: "License gated" }
  ]'
  footnote="Validate effective settings for users with multiple team memberships — don&#39;t assume one file wins"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Impact Dashboard ROI: What It Is and Isn't
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="📈"
  pillLabel="Adoption: ROI Measurement"
  title="Impact Dashboard ROI — Directional Evidence, Not Audited Attribution"
  :left='{
    header: "What It Gives You",
    icon: "✅",
    items: [
      { title: "Cohort comparison", detail: "Early-phase vs agent-first developer cohorts in the same view" },
      { title: "Cost model inputs", detail: "Cost per developer per month, payroll share, PRs per developer — adjust salary to local compensation" },
      { title: "Corrected 28-day cohort", detail: "Includes every active user in the window — correction doesn&#39;t change API exports" }
    ]
  }'
  :right='{
    header: "What to Watch For",
    icon: "⚠️",
    items: [
      { title: "Directional, not audited", detail: "Costs are AI-credit estimates; salary is a modeling input — pair trends with delivery context" },
      { title: "Requires policy + permission", detail: "Enable the Copilot usage metrics policy and grant View Copilot Metrics before relying on the dashboard" },
      { title: "Agent activity is separate", detail: "Join totals_by_3rd_party_agent on stable agent_id; don&#39;t add nested user_initiated_interaction_count to the top-level total" }
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Adoption Metrics Framework
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="Adoption: Metrics"
  title="Three-Tier Metrics Framework — Leading to Lagging"
  :columns='[
    { icon: "🔭", title: "Leading Indicators", description: "Adoption health signals — track weekly", items: ["Acceptance rate (target: 55–65%)", "Active users / licensed seats (target: 80%+)", "Chat and agent feature usage"] },
    { icon: "⚡", title: "Intermediate Indicators", description: "Workflow movement — track biweekly", items: ["PR velocity (PRs per week)", "Code review time (open → merge)", "Bug fix cycle time"] },
    { icon: "💼", title: "Lagging Indicators", description: "Business outcomes — track quarterly", items: ["Time to market for features", "Developer satisfaction (NPS)", "Cost per feature delivered"] }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Self-Service Onboarding Kit
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Adoption: Onboarding"
  title="30-Minute Self-Service Kit — 50 Teams Onboard Without Platform Bottleneck"
  codePosition="left"
  :code='{ language: "text", filename: "team-onboarding/", content: "team-onboarding/\n├── README.md           ← 30-min quick start\n├── repository-setup.md  ← Copy/paste config\n├── skills-catalog.md    ← Available org skills\n├── review-checklist.md  ← AI code review guide\n└── examples/\n    ├── good-prompts.md\n    ├── custom-agent-template/\n    └── sample-repository/" }'
  :features='[
    { icon: "⏱️", title: "30-minute flow", description: "Read (10 min) → Configure repo (10 min) → Complete first exercise (10 min)" },
    { icon: "📋", title: "Copy/paste ready", description: "Working examples, not abstract theory — zero interpretation required" },
    { icon: "📉", title: "Support tickets < 2", description: "Measure effectiveness: time to first productive use and questions per team" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before / After
<BeforeAfterSlide
  header="From Fragmented Reinvention to Organizational Capability"
  :leftItems='["50 teams each configuring security rules independently", "40+ hours per team reinventing identical repo instructions", "Knowledge trapped in team silos — never compounds", "Leadership receives anecdotes instead of evidence"]'
  :rightItems='["One org-wide instruction set applies to 500+ developers", "180-hour platform investment replaces 2,000+ hours of reinvention", "Skills and playbooks update once, propagate everywhere", "Impact-dashboard ROI plus stable-ID agent activity as directional evidence"]'
  :metrics='[
    { value: "16×", detail: "ROI — 180 hrs invested vs 2,900+ hrs saved year 1" },
    { value: "30–40%", detail: "Licensing cost reduction with seat + usage-based mix" },
    { value: "500+", detail: "Developers reached by a single org-level instruction change" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Enable org-wide custom instructions in GitHub settings", "Audit your policy: which managed-setting keys are locked vs overridable", "Open the impact dashboard ROI section — note the directional caveats"]'
  :thisWeek='["Draft security and framework standards as org instructions", "Create one organizational Agent Skill for a repeated compliance check", "Join totals_by_3rd_party_agent on agent_id — build your activity baseline"]'
  :thisMonth='["Publish a 30-minute self-service onboarding kit for new teams", "Enable approved model replacement and verify it appears in selectors before September 1", "Baseline acceptance rate and PR velocity; schedule quarterly review"]'
  footer="One platform investment compounds across every team — start with org instructions, add skills, then measure."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization", label: "Managing Copilot in your organization", description: "Enterprise administration, policies, and org-level configuration" },
      { href: "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot#adding-organization-wide-custom-instructions", label: "Adding organization-wide custom instructions", description: "Centralized standards configuration across all repositories" },
      { href: "https://docs.github.com/en/rest/copilot/copilot-metrics", label: "Copilot metrics REST API", description: "Usage data, adoption analytics, and agent activity reporting" }
    ]},
    { title: "📣 Recent Updates", color: "blue", items: [
      { href: "https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section", label: "Copilot impact dashboard adds a return on investment section", description: "Directional ROI model with cohort comparison and salary controls" },
      { href: "https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity", label: "Copilot usage metrics API adds agent app activity", description: "totals_by_3rd_party_agent — join on stable agent_id, avoid double counting" },
      { href: "https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings", label: "Enterprise team specialization for managed settings", description: "Control plane: enterprise floor + overridable keys + least-restrictive merge" },
      { href: "https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot", label: "Upcoming September 2026 model deprecations in GitHub Copilot", description: "Migration readiness: enable approved replacement before teams depend on it" }
    ]},
    { title: "🛠️ Related Talks", color: "purple", items: [
      { label: "Copilot Hooks & Customization", description: "Extending Copilot with event-driven hooks and custom extensions" },
      { label: "Agentic Workflows", description: "Composing multi-step agent pipelines for enterprise delivery" },
      { label: "AGENTS.md open format", description: "agents.md — portable agent playbook format across tools" }
    ]}
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Scaling GitHub Copilot"
  subtitle="Enterprise Patterns for AI Adoption at Scale"
  :cards="[
    { value: '16×', detail: 'ROI on 180 hrs platform investment — 2,900+ hrs saved year 1' },
    { value: '500+', detail: 'Developers reached by a single org-level instruction change' },
    { value: '30–40%', detail: 'Licensing cost reduction by mixing seat and usage-based access' },
    { value: 'Directional', detail: 'Impact-dashboard ROI + stable agent_id activity — evidence, not attribution' }
  ]"
  prompt="Which pattern will you implement first — org instructions, managed settings, or ROI instrumentation?"
/>

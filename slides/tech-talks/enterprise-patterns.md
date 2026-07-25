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
section: Agentic Engineering
status: active
updated: 2026-04-22
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
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="Scaling GitHub Copilot Across Organizations"
  subtitle="Enterprise Patterns for AI Adoption at Scale"
  tagline="One change, all repos, instantly — from pilot teams to org-wide capability"
  meta="GitHub Copilot · Enterprise · Platform Engineering"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do you turn 50 teams each reinventing the same patterns into one organization that compounds knowledge?"
  subtext="Individual Copilot success doesn&#39;t scale automatically —"
  highlight="organizational patterns turn fragmented expertise into compounding capability."
  :cards='[
    { icon: "🏛️", title: "Engineering Leader", description: "Justify Copilot expansion budget with measurable ROI instead of developer anecdotes" },
    { icon: "🔧", title: "Platform Engineer", description: "Deploy org-wide standards, skill libraries, and governance without becoming a bottleneck" },
    { icon: "🏗️", title: "Enterprise Architect", description: "Build governance and compliance frameworks that satisfy regulated-industry requirements" },
    { title: "16× ROI", description: "180 hours platform investment → 2,900+ hours saved year one (50 teams × 40 hrs reinvention avoided)" },
    { title: "50 reinventions", description: "Without org standards, every team rebuilds the same security rules, framework patterns, and quality checks" },
    { title: "30% cost reduction", description: "Usage-based licensing vs. seat-only — the CFO number that unlocks expansion budget" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "📜", title: "Org-Wide Standards",    subtitle: "Define once, inherit everywhere",           blurb: "Custom instructions, monorepo playbooks, 500+ devs from one change", slide: 4  },
    { icon: "🧠", title: "Skills & Knowledge",    subtitle: "Encode expertise, multiply impact",         blurb: "Org skill libraries (GA) and Knowledge Bases (Enterprise Cloud)",     slide: 9  },
    { icon: "🛡️", title: "Governance & Licensing", subtitle: "Control, compliance, cost optimization",   blurb: "Model policies, 30-40% cost reduction, compliance automation",         slide: 13 },
    { icon: "📈", title: "Adoption & Enablement",  subtitle: "16× ROI and self-service at scale",        blurb: "Metrics framework, 30-min onboarding, federated governance model",     slide: 17 }
  ]'
/>

---

# Part 1 — Organization-Wide Standards
<SectionOpenerSlide
  :partNumber="1"
  title="Organization-Wide Standards"
  subtitle="Define security, framework, and quality requirements once — every repository inherits automatically."
  :cards='[
    { icon: "📡", title: "One Change, 500 Devs", blurb: "Org-level instructions propagate to every repo instantly" },
    { icon: "🗂️", title: "Monorepo Playbooks",  blurb: "Nested AGENTS.md files scope guidance to each subdomain" },
    { icon: "🔒", title: "What to Standardize", blurb: "Security, frameworks, accessibility, performance budgets" }
  ]'
  :terminal='{ context: "50 teams × 40 hrs reinvention = 2,000 hours wasted without org standards", detail: "One org instruction → zero per-repo config needed" }'
/>

---

# The Reinvention Problem
<HeroStatSlide
  :partNumber="1"
  pillIcon="⚠️"
  pillLabel="Standards: The Problem"
  title="50 Teams, 50 Reinventions — Zero Consistency"
  subtitle="Every team independently discovers the same security rules, framework patterns, and quality checks"
  :hero='{ value: "2,000", label: "hours wasted on repeated configuration", source: "50 teams × 40 hours each — before org-wide standards" }'
  :supporting='[
    { icon: "🔒", title: "Security reinvented", description: "Each team builds auth patterns, PII rules, and encryption config independently" },
    { icon: "📋", title: "Standards drift", description: "AI-generated code reviewed differently across teams — inconsistent risk exposure" },
    { icon: "🚪", title: "Knowledge walks out", description: "Best practices live in individual repo files — lost when engineers change teams" }
  ]'
  :insight='{ icon: "💡", text: "The fix isn&#39;t documentation — it&#39;s executable standards that propagate automatically to every repo from a single source." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Org Instructions vs Repo Instructions
<BeforeAfterPanelsSlide
  :partNumber="1"
  pillIcon="📜"
  pillLabel="Standards: Org vs Repo"
  title="One Org Instruction vs. 50 Repo Configurations"
  :before='{
    header: "Polyrepo without org standards",
    items: [
      "repo-1/.github/copilot-instructions.md — Team A&#39;s security interpretation",
      "repo-2/.github/copilot-instructions.md — Team B&#39;s security interpretation",
      "repo-3/.github/copilot-instructions.md — Team C&#39;s security interpretation",
      "50 repos = 50 maintenance burdens when compliance requirements change"
    ]
  }'
  :after='{
    header: "With org-level custom instructions",
    items: [
      "Organization Settings → Custom Instructions (auto-applied to all repos)",
      "Security, framework, and quality baseline inherited by every developer",
      "Repo instructions remain optional — override only for domain-specific needs",
      "Compliance update: change one file, 500+ developers get it immediately"
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# What to Standardize
<FourCardGridSlide
  :partNumber="1"
  pillIcon="✅"
  pillLabel="Standards: What to Include"
  title="Four Pillars of an Org-Wide Instruction File"
  :cards='[
    { icon: "🔐", title: "Security & Compliance", description: "Auth patterns (OAuth 2.0 + PKCE), PII encryption, secrets management, SQL injection prevention — non-negotiables that apply everywhere" },
    { icon: "⚙️", title: "Framework Preferences", description: "Approved tech stack, third-party dependencies, testing frameworks (Jest + Playwright), CI/CD integration patterns" },
    { icon: "♿", title: "Accessibility & Quality", description: "WCAG 2.1 AA requirements, performance budgets (Lighthouse >90), error handling patterns, documentation expectations" },
    { icon: "🗂️", title: "Monorepo Playbooks",    description: "Nested AGENTS.md files scope guidance to frontend/backend/infra — shared repo constitution with local commands per domain" }
  ]'
  :insight='{ icon: "📐", text: "Rule of thumb: repository selector → org instructions or copilot-instructions.md. File pattern → .instructions.md. Directory/subproject → nearest AGENTS.md." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Standards Topology Decision
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="Standards: Where to Put What"
  title="Choosing the Right Standards Layer"
  :rows='[
    { label: "Org settings",    description: "50+ repos need the same security/quality baseline — one GitHub change, zero per-repo work", tag: "org instructions"    },
    { label: "Repo root",       description: "Project-specific GitHub Copilot conventions for a single repo — clear constitution",        tag: "copilot-instructions" },
    { label: "File patterns",   description: "Specific file types need different guidance — applyTo glob targets the right files",         tag: ".instructions.md"    },
    { label: "Subdirectory",    description: "Monorepo package needs local commands, tests, workflow rules — nearest AGENTS.md wins",      tag: "AGENTS.md"           },
    { label: "Cross-tool",      description: "Portable playbook for any agent (Claude, Gemini, etc.) alongside GitHub-specific guidance",  tag: "root AGENTS.md"      }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Organizational Skills & Knowledge Bases
<SectionOpenerSlide
  :partNumber="2"
  title="Skills & Knowledge Bases"
  subtitle="Encode domain expertise once — update centrally, apply everywhere, compound with every use."
  :cards='[
    { icon: "🧠", title: "Org Skill Libraries", blurb: "GA: security, compliance, architecture skills available across all repos" },
    { icon: "📚", title: "Knowledge Bases",     blurb: "Enterprise Cloud: multi-repo context for microservices architectures" },
    { icon: "🔀", title: "Knowledge Graph",     blurb: "Related services indexed together — cross-repo answers from one query" }
  ]'
  :terminal='{ context: "Senior architect updates @security-validator — 50 teams inherit it instantly", detail: "Knowledge compounds with use rather than fragmenting" }'
/>

---

# Org Skill Libraries (GA)
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🧠"
  pillLabel="Skills: Org Skill Libraries"
  title="Organizational Agent Skills — Now Generally Available"
  :left='{
    header: "What they are",
    icon: "📦",
    items: [
      { title: "Defined at org level", detail: "Skills in a shared repo, automatically available across all repositories" },
      { title: "Centrally versioned", detail: "Update once — all consuming repos inherit the improved logic" },
      { title: "Domain-encoded expertise", detail: "Security validation, compliance checks, architecture review as executable skills" }
    ]
  }'
  :right='{
    header: "Use cases by domain",
    icon: "🔧",
    items: [
      { title: "Financial services", detail: "@pci-validator — card data handling, tokenization, audit logging" },
      { title: "Healthcare", detail: "@hipaa-compliance-check — PHI encryption, access control, retention" },
      { title: "Platform-wide", detail: "@security-scanner, @accessibility-check, @cost-estimator" }
    ]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Knowledge Bases (Enterprise Cloud)
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="📚"
  pillLabel="Skills: Knowledge Bases"
  title="Knowledge Bases — Microservices Context at Scale"
  :columns='[
    { icon: "❓", title: "The Problem", description: "Microservices split systems across 10-50 repos — Copilot in one repo lacks context from related services", items: ["Manual cross-repo reference", "Scattered architecture docs", "Dependencies opaque to AI"] },
    { icon: "💡", title: "The Solution", description: "Index multiple repos into a named Knowledge Base — Copilot answers using context from the entire system at once", items: ["@kb payment-platform", "Context from all 5 repos", "One query, system-wide answer"] },
    { icon: "🎯", title: "Best For", description: "Enterprise Cloud tier — highest ROI for distributed codebases with interdependent services", items: ["Microservices architectures", "Shared libraries org-wide", "Multi-repo systems (FE+BE+infra)"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Knowledge Multiplication
<HeroStatSlide
  :partNumber="2"
  pillIcon="📈"
  pillLabel="Skills: Compounding Returns"
  title="Knowledge That Multiplies Instead of Fragmenting"
  subtitle="Every skill update propagates instantly to all teams — individual expertise scales to 500+ developers"
  :hero='{ value: "∞×", label: "return on encoded expertise", source: "Update once → every consuming repo inherits improved logic with zero deployment" }'
  :supporting='[
    { icon: "🔄", title: "Compounding returns", description: "Every new developer automatically benefits from institutional knowledge without onboarding from individuals" },
    { icon: "🔒", title: "Compliance stays current", description: "When regulations change, update the skill once — 50 teams are immediately compliant without coordination" },
    { icon: "🤝", title: "Federated contribution", description: "Teams contribute domain expertise back to org library — individual insights become organizational assets" }
  ]'
  :insight='{ icon: "💡", text: "Skills transform knowledge from documentation (often outdated) into executable systems that scale infinitely and stay current automatically." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Governance & Licensing
<SectionOpenerSlide
  :partNumber="3"
  title="Governance & Licensing"
  subtitle="Control which models teams access, cut costs 30-40%, and automate compliance for regulated industries."
  :cards='[
    { icon: "🎛️", title: "Model Governance", blurb: "Policies control which models teams access — auto-selection optimizes cost vs. capability" },
    { icon: "💰", title: "Flexible Licensing", blurb: "Mix seat-based and usage-based — 30-40% cost reduction vs. all-seats deployment" },
    { icon: "🛡️", title: "Compliance Automation", blurb: "OWASP, HIPAA, PCI — encode as custom agents running on every PR" }
  ]'
  :terminal='{ context: "Model policies + usage-based licensing + compliance agents", detail: "30-40% cost reduction · audit trails · 0 compliance violations" }'
/>

---

# Model Governance
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🎛️"
  pillLabel="Governance: Model Policies"
  title="Centralized Model Governance and Auto-Selection"
  :cards='[
    { icon: "🚦", title: "Model Allow/Restrict",  description: "Control org-wide: allow GPT-4.1 and Claude Sonnet, restrict Opus to approved use cases only" },
    { icon: "🤖", title: "Auto-Selection",         description: "Routine tasks route to cost-effective models; complex analysis escalates to premium — respects policies automatically" },
    { icon: "📋", title: "Audit Logging",          description: "All model usage tracked across the org — compliance visibility for finance, healthcare, government requirements" },
    { icon: "🌍", title: "Data Residency",         description: "Configure where data is processed and retained — EU residency, HIPAA boundaries, government cloud isolation" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Flexible Licensing Strategy
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="💰"
  pillLabel="Governance: Licensing"
  title="Mix Licensing Tiers for 30-40% Cost Reduction"
  :columns='[
    { icon: "👩‍💻", title: "Full Seats", description: "Daily coding — maximum ROI per license", items: ["Core engineering teams", "Platform engineers", "Architects defining patterns"] },
    { icon: "🔧", title: "Usage-Based", description: "Occasional use — pay only for actual requests", items: ["Contractors (project scope)", "Security team reviewing PRs", "Technical writers"] },
    { icon: "👁️", title: "Review-Only", description: "No license required — read AI suggestions in PRs", items: ["Product managers", "Design team validating UI", "QA analyzing test coverage"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Compliance Automation
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="🛡️"
  pillLabel="Governance: Compliance"
  title="Compliance Automation — From Manual Checklist to Enforced"
  :before='{
    header: "Manual compliance",
    items: [
      { title: "OWASP review", detail: "Security engineer reads every PR — 45 min per PR" },
      { title: "HIPAA validation", detail: "3–5 day bottleneck before regulated PRs can merge" },
      { title: "PCI checking", detail: "12 violations per quarter — caught in audit, not pre-merge" },
      "Compliance knowledge trapped in senior engineers"
    ]
  }'
  :after='{
    header: "Automated with custom agents",
    items: [
      { title: "@security-validator", detail: "OWASP Top 10 checked on every PR — 10 min, not 45" },
      { title: "@hipaa-compliance-check", detail: "4-hour automated review replaces 3-5 day bottleneck" },
      { title: "@pci-validator", detail: "0 violations per quarter — caught pre-merge, not in audit" },
      "Compliance logic updated once, enforced everywhere"
    ]
  }'
  :metrics='[
    { value: "78%", label: "faster security review per PR" },
    { value: "94%", label: "faster HIPAA compliance review" },
    { value: "100%", label: "PCI violation reduction" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Adoption & Enablement
<SectionOpenerSlide
  :partNumber="4"
  title="Adoption & Enablement"
  subtitle="Metrics that replace anecdotes, self-service onboarding that removes bottlenecks, and the 16× ROI close."
  :cards='[
    { icon: "📊", title: "Metrics Framework",   blurb: "Leading, intermediate, lagging indicators — data-driven ROI for CFO" },
    { icon: "⚡", title: "30-Min Onboarding",   blurb: "Self-service kit — 50 teams onboard without overwhelming platform team" },
    { icon: "🏛️", title: "Federated Governance", blurb: "Platform team sets floor, domain teams set ceiling, community shares" }
  ]'
  :terminal='{ context: "180 hours platform investment → 2,900+ hours saved year one", detail: "16× ROI — the number that converts skeptical engineering leaders" }'
/>

---

# Metrics Framework
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="Enablement: Metrics"
  title="Three-Layer Metrics Framework — Leading to Lagging"
  :columns='[
    { icon: "🟢", title: "Leading Indicators", description: "Adoption health — early signal before productivity shows", items: ["Acceptance rate (target: 55–65%)", "Active users / licensed seats (target: 80%+)", "Chat interactions per week", "Feature adoption: Chat, Skills, Agents"] },
    { icon: "🟡", title: "Intermediate", description: "Efficiency gains — visible within weeks of adoption", items: ["PRs per week (89 → 127 ↑)", "Review time (18 hrs → 12 hrs ↓)", "Bug fix time (2.3d → 1.7d ↓)", "Onboarding time for new hires"] },
    { icon: "🔴", title: "Lagging Indicators", description: "Business impact — the CFO conversation", items: ["Feature velocity (+43% YoY)", "Developer satisfaction (7.8 → 8.4)", "Cost per feature (−31%)", "Time to market for new features"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Self-Service Onboarding
<FourCardGridSlide
  :partNumber="4"
  pillIcon="⚡"
  pillLabel="Enablement: Onboarding"
  title="30-Minute Self-Service Onboarding Kit"
  :cards='[
    { icon: "📖", title: "Quick Start (10 min)",   description: "Overview of org standards, available skills, and configuration requirements — read, not written, by each team" },
    { icon: "⚙️", title: "Repo Config (10 min)",   description: "Copy/paste ready templates for instructions, skill references, and agent definitions — no interpretation required" },
    { icon: "✅", title: "First Exercise (10 min)", description: "Interactive task validating the setup works — team confirms productive use before the session ends" },
    { icon: "📐", title: "Scale to 50 Teams",       description: "50 teams onboard simultaneously without platform team bottleneck — <2 support tickets per team target" }
  ]'
  :insight='{ icon: "💡", text: "Every hour invested in onboarding materials saves 50+ hours across teams using them. Package once, scale infinitely." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Federated Governance Model
<BeforeAfterPanelsSlide
  :partNumber="4"
  pillIcon="🏛️"
  pillLabel="Enablement: Governance Model"
  title="Federated Governance — Standards Floor, Innovation Ceiling"
  :before='{
    header: "Central control (creates bottleneck)",
    items: [
      "Platform team approves every team configuration change",
      "Innovation stalls waiting for standardization decisions",
      "Platform team overwhelmed — support requests queue up",
      "Teams route around governance to maintain velocity"
    ]
  }'
  :after='{
    header: "Federated model (scales to 50+ teams)",
    items: [
      "Platform team: org instructions, shared skills, compliance, metrics",
      "Domain teams: repo-specific instructions, team skills, local workflows",
      "Community of practice: monthly pattern sharing, internal skill catalog",
      "Successful patterns promote from team → org library automatically"
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The 16× ROI Close
<HeroStatSlide
  :partNumber="4"
  pillIcon="📈"
  pillLabel="Enablement: ROI"
  title="The Number That Converts Skeptical Engineering Leaders"
  subtitle="180 hours of platform investment → 2,900+ hours saved in year one — and compounding"
  :hero='{ value: "16×", label: "ROI from enterprise patterns", source: "180 hrs invested → 2,900+ hrs saved yr 1 (50 teams × 40 hrs reinvention avoided)" }'
  :supporting='[
    { icon: "📜", title: "Org instructions (40 hrs)", description: "2 hrs saved per developer × 200 devs = 400 hours saved from baseline configuration alone" },
    { icon: "🧠", title: "Shared skill library (60 hrs)", description: "5 hrs of repeated work eliminated per developer = 1,000 hours saved across the org" },
    { icon: "⚡", title: "Onboarding kit (80 hrs)", description: "Setup time drops from 8 hrs to 0.5 hrs per team = 1,500 hours saved at 50-team scale" }
  ]'
  :insight='{ icon: "🚀", text: "Every new developer and every org growth event increases the return — the 16× grows as the organization scales. Knowledge compounds." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Fragmented Adoption to Compounding Organizational Capability"
  :leftItems='["50 teams each spending 40 hours reinventing the same security rules and framework patterns", "Compliance knowledge trapped in senior engineers — lost when they change teams", "Leadership asks for ROI but receives anecdotes — blocks expansion budget approval", "Platform team becomes bottleneck — all 50 teams queue for configuration support"]'
  :rightItems='["One org instruction file — 500+ developers inherit baseline standards from day one", "Domain expertise encoded as Agent Skills — update once, all repos get improved logic", "Metrics dashboard: 55-65% acceptance rate, 80%+ utilization, -31% cost per feature", "30-minute self-service onboarding — 50 teams onboard simultaneously without platform bottleneck"]'
  :metrics='[
    { value: "16×", detail: "ROI — 180 hours platform investment into 2,900+ hours saved in year one" },
    { value: "30-40%", detail: "licensing cost reduction mixing seat-based and usage-based tiers" },
    { value: "0", detail: "compliance violations per quarter after automating OWASP, HIPAA, PCI checks" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Draft an org-level custom instruction with your top 3 security requirements", "Identify the one skill that if encoded would save every team 5+ hours this quarter", "Pull your current Copilot acceptance rate from the Metrics API — establish your baseline"]'
  :thisWeek='["Publish org-wide custom instructions to Organization Settings → Copilot → Policies", "Create one organizational Agent Skill for your most common compliance check", "Build a self-service onboarding README your teams can complete in 30 minutes"]'
  :thisMonth='["Establish a quarterly metrics review cadence with leading + lagging indicators", "Launch a Community of Practice channel for monthly pattern sharing across teams", "Calculate your 16× ROI projection: hours invested vs. hours saved across all teams"]'
  footer="Enterprise patterns transform individual Copilot expertise into organizational capability that compounds with every new developer and every team."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization", label: "Managing Copilot in your organization", description: "Enterprise administration, policies, and org-wide configuration" },
      { href: "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot#adding-organization-wide-custom-instructions", label: "Adding organization-wide custom instructions", description: "Step-by-step guide to centralized standards configuration" },
      { href: "https://docs.github.com/en/rest/copilot/copilot-metrics", label: "Copilot Metrics REST API", description: "Usage data and analytics for acceptance rate, active users, and more" }
    ] },
    { title: "🔗 Related Formats", color: "purple", items: [
      { href: "https://agents.md/", label: "AGENTS.md open format", description: "Cross-tool portable agent configuration — complements GitHub-specific instructions" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Scaling GitHub Copilot Across Organizations"
  subtitle="Enterprise Patterns for AI Adoption at Scale"
  :cards="[
    { value: '16×', detail: 'ROI — 180 hrs platform investment into 2,900+ hrs saved year one at 50-team scale' },
    { value: '30-40%', detail: 'licensing cost reduction mixing seat-based and usage-based tiers strategically' },
    { value: 'One change', detail: 'org-wide instruction update reaches 500+ developers instantly — zero per-repo config' }
  ]"
  prompt="What&#39;s the one skill your organization should encode to multiply your senior engineers&#39; expertise across every team?"
/>

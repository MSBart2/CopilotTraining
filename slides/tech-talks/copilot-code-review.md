---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot Code Review
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot Code Review
mdc: true
section: Developers
status: active
updated: 2026-08-10
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
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot Code Review"
  subtitle="From Bottleneck to Accelerator"
  tagline="Reduce PR review time while maintaining code quality and compliance"
  meta="35-40 min | Engineering Managers · DevOps Leads · Development Teams"
/>

---

# Core Question
<CoreQuestionSlide
  question="How can Copilot Code Review reduce PR review time while maintaining quality and compliance?"
  subtext="68% of developers cite code review as a major bottleneck"
  highlight="Let AI handle the mechanical checks so humans own architecture and strategy"
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "Immediate feedback without waiting days for human review" },
    { icon: "🏗️", title: "Engineering Manager", description: "Measure cycle-time reduction and ROI with real PR analytics" },
    { icon: "🔒", title: "Security or Platform Team", description: "Enforce compliance rules consistently across every PR" },
    { title: "3.2 days", description: "Average PR merge time — most of it is waiting, not reviewing" },
    { title: "30% of time", description: "Senior developers spend on reviews instead of building features" },
    { title: "40-60%", description: "Reduction in PR review cycle time with Copilot Code Review" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "⚡", title: "Configuration and Quick Start", subtitle: "Zero to first review in 5 minutes", blurb: "Rulesets, Lite/Balanced effort, org defaults, custom instructions", slide: 4 },
    { icon: "🎯", title: "Best Practices and Adoption", subtitle: "Six capabilities, hybrid analysis, phased rollout", blurb: "Equip teams to own the rollout and frame it for stakeholders", slide: 9 },
    { icon: "📊", title: "ROI and Business Impact", subtitle: "Interactive calculator, cycle-time metrics", blurb: "Turn real PR analytics into exec-ready savings numbers", slide: 13 },
    { icon: "🔒", title: "Compliance Patterns", subtitle: "HIPAA, PCI-DSS, SOC2 instruction files", blurb: "Encode regulatory requirements with a full audit trail", slide: 18 }
  ]'
/>

---

# Part 1 — Configuration and Quick Start
<SectionOpenerSlide
  :partNumber="1"
  title="Configuration and Quick Start"
  subtitle="5-minute setup win — Lite and Balanced effort levels, org defaults, per-review choice, visible PR timeline signals"
  :cards='[
    { icon: "⚡", title: "5-Minute Setup", blurb: "Zero config — Ruleset UI only" },
    { icon: "🎚️", title: "Lite vs Balanced", blurb: "Match review depth to change risk" },
    { icon: "📋", title: "Custom Instructions", blurb: "Encode team standards in Markdown" }
  ]'
  :terminal='{ context: "Enable via Rulesets — no YAML required", detail: "First automated review in under 5 minutes" }'
/>

---

# Manual Review vs. Copilot Review
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="Quick Start: The Shift"
  title="Manual Review Workflow vs. Copilot-Automated Review"
  subtitle="From days waiting to minutes reviewing"
  leftLabel="Manual Review Workflow"
  rightLabel="With Copilot Code Review"
  :steps='[
    { left: { label: "Submit PR", note: "Wait for reviewer availability" }, right: { label: "Submit PR", note: "Copilot reviews automatically on push" } },
    { left: { label: "Wait 3+ days", note: "Reviewer has 15 other PRs queued" }, right: { label: "Feedback in 2 minutes", note: "Inline comments with explanations and fixes" } },
    { left: { label: "Context lost", note: "Reviewer rebuilds context: 15-20 min" }, right: { label: "Address findings", note: "Critical and high severity resolved first" } },
    { left: { label: "Re-review loop", note: "Repeat until findings cleared" }, right: { label: "Human review", note: "Reviewer focuses on business logic only" } }
  ]'
  :outcomeLeft='{ icon: "⏳", label: "3+ days — PR waits for available reviewer capacity" }'
  :outcomeRight='{ icon: "✅", label: "2 minutes — first feedback on push" }'
  summaryMetric="3+ days waiting → 2 minutes for first review"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Lite vs Balanced: Match Review Depth to Change Risk
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🎚️"
  pillLabel="Quick Start: Effort Levels"
  title="Lite vs Balanced: Match Review Depth to Change Risk"
  :left='{
    header: "Lite",
    icon: "⚡",
    items: [
      { title: "Routine changes", detail: "Dependency bumps, docs, small fixes" },
      "Lighter, faster analysis with focused feedback",
      "Inherits organization default effort setting",
      "Per-review choice — applies only to that review"
    ]
  }'
  :right='{
    header: "Balanced",
    icon: "🔬",
    items: [
      { title: "Complex or sensitive changes", detail: "New features, security paths, large diffs" },
      "Deeper analysis and more thorough coverage",
      "Set as org default — repos inherit without override",
      "Timeline and PR overview show effort level used"
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Custom Instructions: Encode Your Review Standards
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Quick Start: Custom Instructions"
  title="Custom Instructions: Encode Your Review Standards"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/copilot-instructions.md", content: "## Security Standards\n- Flag hardcoded secrets and API keys\n- Require parameterized queries (no SQL concatenation)\n- Check input validation on user-facing code\n\n## Code Quality\n- Suggest refactoring for functions exceeding 50 lines\n- Flag unclear variable names\n\n## Testing\n- Note missing unit tests for new functions\n- Flag assertions that do not validate the logic" }'
  :features='[
    { icon: "🎯", title: "Prioritize top rules", description: "Copilot processes first ~4000 chars — keep guidance concise and focused" },
    { icon: "📁", title: "Language-specific files", description: ".github/instructions/*.instructions.md with applyTo patterns" },
    { icon: "🏢", title: "Org inheritance", description: "Organization template → each repo adds language-specific guidance on top" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Four Ways to Deploy Copilot Code Review
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🏗️"
  pillLabel="Quick Start: Deployment Patterns"
  title="Four Ways to Deploy Copilot Code Review"
  :cards='[
    { icon: "📦", title: "Repository Ruleset", description: "Enable in Settings → Rules → Rulesets — automatic review on every PR to target branch" },
    { icon: "🏢", title: "Organization Default", description: "Set default effort level in org settings — all repos inherit unless overridden locally" },
    { icon: "🔒", title: "Branch Protection", description: "Add Copilot review as required status check — blocks merge until critical findings resolved" },
    { icon: "💬", title: "Manual Request", description: "Mention @github-copilot in any PR comment for targeted focused analysis on demand" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Best Practices and Team Adoption
<SectionOpenerSlide
  :partNumber="2"
  title="Best Practices and Team Adoption"
  subtitle="Six capability categories, hybrid analysis approach — equip teams to own the rollout and frame it for stakeholders"
  :cards='[
    { icon: "🧩", title: "Six Capabilities", blurb: "Security to architecture consistency" },
    { icon: "🔬", title: "Hybrid Analysis", blurb: "Static + AST + LLM layered review" },
    { icon: "📈", title: "Phased Rollout", blurb: "Pilot to org-wide in four phases" }
  ]'
  :terminal='{ context: "AI handles mechanical checks automatically", detail: "Humans redirect to architecture and strategy" }'
/>

---

# Six Capability Categories
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🧩"
  pillLabel="Adoption: Capabilities"
  title="Six Capability Categories in Every Review"
  subtitle="What Copilot checks on every pull request"
  :rows='[
    { label: "Security", description: "SQL injection, XSS, hardcoded secrets — auto-flagged with fixes", tag: "Always On" },
    { label: "Code Quality", description: "Complexity, naming, duplication with refactoring suggestions", tag: "Configurable" },
    { label: "Test Coverage", description: "Missing tests, weak assertions, edge cases detected", tag: "Configurable" },
    { label: "Performance", description: "N+1 queries, memory leaks, inefficient algorithms spotted", tag: "Configurable" },
    { label: "Compliance", description: "Custom rulesets for GDPR, HIPAA, SOC2 with audit trail", tag: "Custom" },
    { label: "Architecture", description: "Ensures new code aligns with existing patterns", tag: "Contextual" }
  ]'
  footnote="Configure scope via custom instructions — prioritize what matters most for your codebase."
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Hybrid Analysis Approach
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔬"
  pillLabel="Adoption: How It Works"
  title="The Hybrid Analysis Approach"
  :columns='[
    { icon: "⚡", title: "Static Analysis", description: "Pattern matching in under 1 second — syntax, style, obvious anti-patterns", items: ["60% of issues caught", "Zero LLM cost", "Deterministic accuracy"] },
    { icon: "🔍", title: "AST Semantic Parsing", description: "Structural analysis — data flow, variable scope, unreachable code, call graphs", items: ["Logical error detection", "1-5 second execution", "No false positives for known patterns"] },
    { icon: "🧠", title: "LLM Contextual Analysis", description: "Full repository context — architectural consistency, semantics, educational feedback", items: ["73% fewer false positives", "10-30 second analysis", "Explains why, not just what"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Phased Rollout: Pilot to Organization
<MaturityJourneyRoadmapSlide
  :partNumber="2"
  pillIcon="📈"
  pillLabel="Adoption: Phased Rollout"
  title="Phased Rollout: Pilot to Organization"
  subtitle="Four phases from first review to org-wide standard"
  :stages='[
    { label: "Week 1-2", name: "Pilot", description: "1-2 low-risk repos — informational reviews, gather daily feedback", icon: "🔬", isTarget: false },
    { label: "Week 3-4", name: "Tune", description: "Custom instructions, language files, baseline ROI metrics established", icon: "🎚️", isTarget: false },
    { label: "Week 5-8", name: "Expand", description: "50% of repos with required status check, internal docs and training", icon: "📈", isTarget: false },
    { label: "Week 9-12", name: "Standardize", description: "Org-wide with quarterly rule review and ROI presented to leadership", icon: "🏢", isTarget: true }
  ]'
  caption="Start informational — only enforce required status check after Tune phase validates accuracy"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Measuring ROI and Business Impact
<SectionOpenerSlide
  :partNumber="3"
  title="Measuring ROI and Business Impact"
  subtitle="Persuasion peak — interactive calculator, 40-60% cycle-time reduction, 90%+ security violations, exec business case"
  :cards='[
    { icon: "🧮", title: "Interactive Calculator", blurb: "Real PR data → exec-ready savings" },
    { icon: "⏱️", title: "Cycle-Time Impact", blurb: "40-60% review time reduction" },
    { icon: "📊", title: "Quality Metrics", blurb: "Incidents, reverts, onboarding speed" }
  ]'
  :terminal='{ context: "Input real PR data → get executive summary", detail: "78.9% cycle-time improvement in live example" }'
/>

---

# Interactive Time-Savings Calculator
<HeroStatSlide
  :partNumber="3"
  pillIcon="🧮"
  pillLabel="ROI: Calculator"
  title="Interactive Time-Savings Calculator"
  subtitle="Real PR analytics → exec-ready savings summary"
  :hero='{ value: "78.9%", label: "cycle-time improvement in live March 2026 example", source: "Copilot Code Review Time Savings Calculator" }'
  :supporting='[
    { icon: "📊", title: "Input customer PR data", description: "Month/quarter from any PR analytics source" },
    { icon: "⚙️", title: "Set model parameters", description: "Baseline review minutes, developer cost, work hours" },
    { icon: "📋", title: "Review generated results", description: "Cycle-time, adoption, hours saved, cost savings" },
    { icon: "📤", title: "Copy executive summary", description: "Prewritten narrative ready for stakeholder follow-up" }
  ]'
  :insight='{ icon: "💡", text: "Separates cycle-time (days open) from review effort (minutes) — makes savings claims defensible to engineering leadership." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# PR Cycle Time: Before and After
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="ROI: Cycle Time"
  title="PR Cycle Time: Before and After Copilot Review"
  :before='{
    header: "Without Copilot Review",
    items: [
      { title: "19 days open", detail: "Waiting for reviewer availability" },
      "Manual review: 45+ min per PR",
      "Context rebuild: 15-20 min per reviewer switch",
      "Security gaps discovered post-merge"
    ]
  }'
  :after='{
    header: "With Copilot Review",
    items: [
      { title: "4 days to merge", detail: "78.9% cycle-time improvement" },
      "Copilot reviews in under 2 minutes",
      "Developer addresses findings while context is fresh",
      "Security caught before merge with inline fixes"
    ]
  }'
  :metrics='[
    { value: "78.9%", label: "cycle-time improvement" },
    { value: "1,229", label: "hours saved/month" },
    { value: "$88,594", label: "current monthly savings" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Quality Metrics Beyond Cycle Time
<FourCardGridSlide
  :partNumber="3"
  pillIcon="📈"
  pillLabel="ROI: Quality Metrics"
  title="Quality Metrics Beyond Cycle Time"
  :cards='[
    { icon: "🚨", title: "Production Incidents", description: "83% reduction — quality incidents drop from 12/month to 2/month after adoption" },
    { icon: "↩️", title: "Revert Rate", description: "62% improvement — PRs merged then reverted drop from 8% to 3% of total PRs" },
    { icon: "🔐", title: "Security Violations", description: "90%+ reduction — critical issues caught before merge, not discovered in production" },
    { icon: "⏱️", title: "Onboarding Speed", description: "50% faster — new hires productive in 3-4 weeks instead of 6-8 weeks to first PR" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# From PR Data to Executive Summary
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="📤"
  pillLabel="ROI: Executive Summary"
  title="From PR Data to Executive Summary"
  subtitle="What the interactive calculator produces"
  :transcript='[
    { type: "prompt", text: "copilot-code-review-calculator" },
    { type: "user", text: "Analyze March 2026: 32,196 PRs, 15.3% CCR adoption, 19d to 4d cycle time" },
    { type: "thinking", label: "🧮 Calculator:" },
    { type: "response", lines: ["Cycle-time improvement: 78.9% (19.0 → 4.0 days)", "Current hours saved: 1,229 per month", "Incremental opportunity: 6,821 hours if all PRs use CCR"] },
    { type: "divider" },
    { type: "outcome", text: "Current savings: $88,594 for the observed month" },
    { type: "outcome", text: "Incremental upside: $491,863 if adoption expands to all PRs" }
  ]'
  footerMetric="Real PR data in → exec-ready narrative out"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Advanced Patterns: Compliance and Regulatory Guidance
<SectionOpenerSlide
  :partNumber="4"
  title="Compliance and Regulatory Guidance"
  subtitle="HIPAA, PCI-DSS, and SOC2 instruction patterns with audit trail — deliberately paced for regulated-industry teams"
  :cards='[
    { icon: "🏥", title: "HIPAA", blurb: "PHI encryption and audit logging" },
    { icon: "💳", title: "PCI-DSS", blurb: "Payment data handling enforcement" },
    { icon: "🔒", title: "SOC2", blurb: "Access controls and audit trail" }
  ]'
  :terminal='{ context: "Custom instructions encode compliance rules", detail: "96% reduction in HIPAA violations in production" }'
/>

---

# Three Regulatory Frameworks, One Pattern
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="⚖️"
  pillLabel="Compliance: Frameworks"
  title="Three Regulatory Frameworks, One Pattern"
  :columns='[
    { icon: "🏥", title: "HIPAA (Healthcare)", description: "PHI encryption, access logging, data retention — audit trail for all PHI operations", items: ["AES-256 for PHI at rest", "TLS 1.2+ for PHI in transit", "Audit logs retained 6 years"] },
    { icon: "💳", title: "PCI-DSS (Payments)", description: "No stored card data, tokenization required, payment webhook signatures validated", items: ["Never log card numbers or CVV", "Tokenize via compliant gateway", "Role-based access for payment ops"] },
    { icon: "🔒", title: "SOC2 (SaaS)", description: "Audit logging for all sensitive data access, structured errors, no PII in responses", items: ["Log who accessed what and when", "Consistent error codes 200-500", "Never expose stack traces"] }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Compliance Instruction File Pattern
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="📝"
  pillLabel="Compliance: Instruction File"
  title="Compliance Instruction File Pattern"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/instructions/hipaa.instructions.md", content: "# .github/instructions/hipaa.instructions.md\n\n## HIPAA Requirements\n- All PHI encrypted at rest with AES-256\n- Require TLS 1.2+ for any PHI transmission\n- Flag PHI exposure in logs, errors, or UI\n- Audit log: who accessed PHI and when\n- Retain audit logs for at least 6 years\n\n## Transmission Security\n- Flag hardcoded encryption keys\n- Validate all external calls carry TLS" }'
  :features='[
    { icon: "📂", title: "applyTo pattern", description: "Scopes rules to specific file types or directories in the repository" },
    { icon: "🔍", title: "Automatic detection", description: "Violations flagged inline with educational context and suggested code fixes" },
    { icon: "📋", title: "Permanent audit trail", description: "Every review creates a timestamped PR record for compliance reporting and audits" }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="From Manual Reviews to Scalable Quality"
  :leftItems='["PRs wait 3+ days for first human review", "Senior devs spend 30% of time on reviews", "Security gaps missed under deadline pressure", "Inconsistent standards across teams and reviewers"]'
  :rightItems='["Automated feedback in under 2 minutes per PR", "Senior devs focus on architecture and strategy", "Security violations caught and flagged before merge", "Consistent enforcement on every PR via Rulesets"]'
  :metrics='[
    { value: "40-60%", detail: "reduction in PR review cycle time" },
    { value: "90%+", detail: "fewer security violations reaching production" },
    { value: "50%", detail: "faster developer onboarding" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Enable via Rulesets in repository Settings", "Choose Lite for routine, Balanced for complex changes", "Submit a test PR and observe feedback quality"]'
  :thisWeek='["Create .github/copilot-instructions.md with team standards", "Set up branch protection requiring Copilot review", "Train team on targeted @github-copilot review requests"]'
  :thisMonth='["Run ROI calculator with real PR analytics", "Add language-specific instruction files", "Deploy org-wide with standardized Rulesets"]'
  footer="Start with Lite effort on one repository today — first automated review in under 5 minutes."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/code-review", label: "GitHub Copilot Code Review - Concepts", description: "Core concepts, agent capabilities, and workflow integration" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-review", label: "Configure Automatic Code Review", description: "Setup guide for enabling automatic reviews at repository and organization level" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review", label: "Using Copilot Code Review", description: "Practical usage guide for requesting reviews and interpreting feedback" }
    ] },
    { title: "📣 Announcements", color: "blue", items: [
      { href: "https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available", label: "Copilot code review effort levels are generally available", description: "GA names, configuration migration, org inheritance, per-review scope, plan availability" },
      { href: "https://github.blog/2024-02-14-github-copilot-code-review-now-generally-available/", label: "GitHub Copilot Code Review GA", description: "Official announcement with beta results and 43% review time reduction" }
    ] },
    { title: "🧮 Interactive Tools", color: "indigo", items: [
      { href: "https://copilot-code-review--clee1211.github.app/", label: "Copilot Code Review Time Savings Calculator", description: "PR analytics + review-time assumptions → cycle-time, labor-savings, exec summary" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
      { label: "GitHub Advanced Security", description: "In-depth security scanning with CVE tracking — complements Copilot Code Review" },
      { label: "GitHub Copilot Enterprise Patterns", description: "Org-wide deployment patterns and governance for regulated environments" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Copilot Code Review"
  subtitle="From Bottleneck to Accelerator"
  :cards="[
    { value: '40-60%', detail: 'reduction in PR review cycle time' },
    { value: '90%+', detail: 'fewer security violations in production' },
    { value: '5 min', detail: 'from Ruleset UI to first automated review' }
  ]"
  prompt="What would 40-60% faster code review unlock for your team?"
/>

---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot Hooks
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot Hooks
mdc: true
section: Customization & Context
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
import HeroStatSlide from './components/HeroStatSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot Hooks"
  subtitle="Programmable Governance for Agent Workflows"
  tagline="Real-time control and compliance at every agent lifecycle moment"
  meta="GitHub Copilot · Hooks · CopilotTraining"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do you govern AI agents without destroying their velocity?"
  subtext="Agents create files, run commands, and deploy changes autonomously. Manual gates destroy velocity, but"
  highlight="hooks give you synchronous enforcement at every lifecycle moment."
  :cards='[
    { icon: "🔒", title: "Security Architects", description: "Real-time denial of dangerous operations in <2 seconds — before execution" },
    { icon: "📋", title: "Compliance Officers", description: "Complete JSON Lines audit trail across all 8 lifecycle events for SOC2 and HIPAA" },
    { icon: "⚙️", title: "DevOps Engineers", description: "Programmatic governance at every agent action without manual approval gates" },
    { title: "8 lifecycle events", description: "Complete coverage from SessionStart to Stop — no action escapes the governance scaffold" },
    { title: "PreToolUse only", description: "The only hook that can deny execution before it happens — all others observe after" },
    { title: "<2 seconds", description: "Synchronous hook execution time — governance without velocity loss or timeout risk" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔄", title: "Phase 1: Lifecycle Control", subtitle: "Eight moments, one mental model", blurb: "Map the events from SessionStart to Stop — build the governance scaffold", slide: 4 },
    { icon: "⚡", title: "Phase 2: PreToolUse", subtitle: "The only hook that prevents execution", blurb: "Deny dangerous operations in <2 seconds before damage occurs", slide: 8 },
    { icon: "🔍", title: "Phase 3: Audit Trail", subtitle: "JSON Lines logging and jq compliance", blurb: "Complete lifecycle coverage — 100% audit trail with zero sampling", slide: 13 },
    { icon: "🏗️", title: "Phase 4: Real-World Patterns", subtitle: "HIPAA, SOC2, and quality gate configs", blurb: "Copy-paste patterns deployable within hours of this session", slide: 17 },
  ]'
/>

---

# Part 1 — Phase 1: Lifecycle Control
<SectionOpenerSlide
  :partNumber="1"
  title="Phase 1: Lifecycle Control"
  subtitle="Eight lifecycle moments from SessionStart to Stop — build the mental model before exploring the hooks"
  :cards='[
    { icon: "🔄", title: "8 Lifecycle Events", blurb: "Complete SessionStart to Stop governance scaffold" },
    { icon: "📄", title: "JSON Configuration", blurb: "Define hooks in .github/hooks/*.json files" },
    { icon: "🚦", title: "Exit Code Semantics", blurb: "0 = success · 2 = blocking · other = warning" },
  ]'
  :terminal='{ context: "Hooks run synchronously in the agent execution path", detail: "Every action — every moment — every session" }'
/>

---

# Eight Lifecycle Events — Session and Tool
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🔄"
  pillLabel="Lifecycle · Events 1–4"
  title="Eight Lifecycle Events — Part 1: Session and Tool"
  subtitle="Four events cover session initialization, user prompts, and tool execution"
  :rows='[
    { label: "SessionStart", description: "Initialize resources and inject project context into the session", tag: "Context" },
    { label: "PromptSubmit", description: "Audit user requests and inject system context into prompts", tag: "Audit" },
    { label: "PreToolUse", description: "Deny dangerous ops, require approval, or modify tool input", tag: "⚡ Prevents" },
    { label: "PostToolUse", description: "Run formatters, log results, enforce quality standards", tag: "Observe" }
  ]'
  footnote="PreToolUse is the only event that can prevent — all others observe, enrich, or control flow"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Eight Lifecycle Events — Compaction and Subagents
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🔄"
  pillLabel="Lifecycle · Events 5–8"
  title="Eight Lifecycle Events — Part 2: Compaction and Subagents"
  subtitle="Four events cover context preservation, nested agents, and session finalization"
  :rows='[
    { label: "PreCompact", description: "Export context before truncation and save session state", tag: "Preserve" },
    { label: "SubagentStart", description: "Track nested agents and inject guidelines for subagents", tag: "Spawn" },
    { label: "SubagentStop", description: "Aggregate results and verify subagent output quality", tag: "Aggregate" },
    { label: "Stop", description: "Generate reports, cleanup, or enforce completion requirements", tag: "Finalize" }
  ]'
  footnote="Stop and SubagentStop can block completion — direct agents to finish required work before ending"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Hook Configuration Format
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📄"
  pillLabel="Lifecycle · Configuration"
  title="Hooks Are Defined in JSON — No Framework Required"
  codePosition="left"
  :code='{ language: "json", filename: ".github/hooks/security-hooks.json", content: "{\n  \"hooks\": {\n    \"PreToolUse\": [{\n      \"type\": \"command\",\n      \"command\": \"./scripts/security-check.sh\",\n      \"cwd\": \".github/hooks\",\n      \"timeout\": 5\n    }],\n    \"PostToolUse\": [{\n      \"type\": \"command\",\n      \"command\": \"./scripts/format-changed.sh\"\n    }],\n    \"SessionStart\": [{\n      \"type\": \"command\",\n      \"command\": \"./scripts/log-session.sh\"\n    }]\n  }\n}" }'
  :features='[
    { icon: "📦", title: "type: command", description: "Spawns a shell process — bash, PowerShell, or any executable" },
    { icon: "🖥️", title: "OS-specific overrides", description: "windows / linux / osx keys fall back to command if absent" },
    { icon: "⏱️", title: "timeout: default 30s", description: "Target under 5 seconds — hooks run in the agent path" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Phase 2: PreToolUse Enforcement
<SectionOpenerSlide
  :partNumber="2"
  title="Phase 2: PreToolUse Enforcement"
  subtitle="PreToolUse is the only hook that can deny execution before it happens — every other approach is post-incident"
  :cards='[
    { icon: "⚡", title: "Only Preventive Hook", blurb: "PreToolUse is the only hook with veto power" },
    { icon: "🚦", title: "Three Decisions", blurb: "deny · ask · allow — matched to risk level" },
    { icon: "✏️", title: "Modify Tool Input", blurb: "updatedInput enforces safe defaults before exec" },
  ]'
  :terminal='{ context: "deny, ask, or allow — before the tool runs anything", detail: "PreToolUse: the only hook that prevents" }'
/>

---

# PreToolUse Is Uniquely Powerful
<HeroStatSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="PreToolUse · Central Insight"
  title="PreToolUse Is the Only Hook That Prevents"
  subtitle="Every other governance approach is post-incident"
  :hero='{ value: "<2s", label: "synchronous execution time — governance runs before the tool, not after the damage", source: "Target: <2s for security checks; <5s for linting and validation" }'
  :supporting='[
    { icon: "🚫", title: "deny — hard block", description: "Stops execution immediately before the tool runs" },
    { icon: "💬", title: "ask — soft gate", description: "Surfaces to user for approval — model pauses and waits" },
    { icon: "✏️", title: "updatedInput — modify", description: "Adjust tool args before allowing (e.g., add --dry-run)" },
    { icon: "💡", title: "additionalContext — enrich", description: "Inject guidance without blocking the operation" }
  ]'
  :insight='{ icon: "🎯", text: "All other hooks observe after the fact. Only PreToolUse can prevent." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# PreToolUse Deny Response Format
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🚫"
  pillLabel="PreToolUse · Deny Response"
  title="What Your Script Returns — Three Decision Shapes"
  codePosition="left"
  :code='{ language: "json", filename: "stdout — PreToolUse hook response", content: "{\n  \"hookSpecificOutput\": {\n    \"hookEventName\": \"PreToolUse\",\n    \"permissionDecision\": \"deny\",\n    \"permissionDecisionReason\": \"rm -rf outside approved dirs blocked by security policy\"\n  }\n}\n\n// OR — modify before allowing:\n{\n  \"hookSpecificOutput\": {\n    \"hookEventName\": \"PreToolUse\",\n    \"permissionDecision\": \"allow\",\n    \"updatedInput\": { \"command\": \"rm -rf dist --dry-run\" }\n  }\n}" }'
  :features='[
    { icon: "🔑", title: "permissionDecisionReason", description: "Shown to the model — it uses this to explain and self-correct" },
    { icon: "✏️", title: "updatedInput", description: "Replaces tool args — must match the tool schema exactly" },
    { icon: "🔗", title: "First deny wins", description: "Multiple hooks chain in order — most restrictive takes precedence" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Security Denial in Action
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="🎬"
  pillLabel="PreToolUse · Live Demo"
  title="Security Denial in Action"
  subtitle="From dangerous command intent to blocked — before execution"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "Remove old build artifacts from the dist directory to free up space" },
    { type: "thinking", label: "🤔 Agent:" },
    { type: "response", lines: ["I will use the terminal to clean up the directory.", "Running: rm -rf dist/old-artifacts"] },
    { type: "divider" },
    { type: "thinking", label: "🔒 PreToolUse Hook (1.8s):" },
    { type: "response", lines: ["Pattern match: rm -rf in unapproved path", "Decision: DENY — Destructive path operation blocked by security policy"] },
    { type: "divider" },
    { type: "outcome", text: "Operation blocked before execution — zero damage" },
    { type: "outcome", text: "Agent: I cannot complete this — please specify individual files to remove" }
  ]'
  footerMetric="1.8 seconds — from rm command intent to denied, before execution"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# deny vs ask — Three Risk Tiers
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🚦"
  pillLabel="PreToolUse · Decision Modes"
  title="Three Decisions — Map Each to a Risk Level"
  :left='{
    header: "deny + ask: Control Decisions",
    icon: "🚫",
    items: [
      { title: "deny — hard block", detail: "Dangerous commands, privilege escalation, database destruction" },
      { title: "ask — soft gate", detail: "Production writes, data exports, irreversible operations" },
      "First deny in a chain wins — most restrictive takes precedence",
      "permissionDecisionReason guides the model to self-correct"
    ]
  }'
  :right='{
    header: "allow + updatedInput: Safe Defaults",
    icon: "✅",
    items: [
      { title: "allow — explicit approval", detail: "Reduce false positives for confirmed safe operations" },
      { title: "updatedInput — modify args", detail: "Add --dry-run, restrict paths, enforce safe flags" },
      "additionalContext injects project guidance without blocking",
      "Verify updatedInput schema via the Chat Debug View"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Phase 3: Observability & Audit Trail
<SectionOpenerSlide
  :partNumber="3"
  title="Phase 3: Observability & Audit"
  subtitle="JSON Lines logging across all eight events enables direct jq queries and SIEM integration for SOC2 and HIPAA"
  :cards='[
    { icon: "📋", title: "JSON Lines Format", blurb: "Append-only .jsonl — concurrent-safe and jq ready" },
    { icon: "🔗", title: "All 8 Events", blurb: "Complete lifecycle — zero gaps in the audit trail" },
    { icon: "📤", title: "SIEM Integration", blurb: "Direct import to Datadog, Splunk, Elasticsearch" },
  ]'
  :terminal='{ context: "jq select .permissionDecision==deny logs/audit.jsonl", detail: "Auditors query directly — no manual sampling" }'
/>

---

# JSON Lines Audit Log
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📋"
  pillLabel="Audit Trail · JSON Lines"
  title="One Line Per Event — Direct jq Queries, No Parsing"
  codePosition="left"
  :code='{ language: "json", filename: "logs/audit.jsonl", content: "{\"timestamp\":\"2026-02-06T17:30:00Z\",\"event\":\"SessionStart\",\"sessionId\":\"abc123\"}\n{\"timestamp\":\"2026-02-06T17:30:15Z\",\"event\":\"PreToolUse\",\"tool\":\"editFiles\",\"decision\":\"allow\"}\n{\"timestamp\":\"2026-02-06T17:30:25Z\",\"event\":\"PostToolUse\",\"tool\":\"editFiles\"}\n{\"timestamp\":\"2026-02-06T17:30:30Z\",\"event\":\"Stop\",\"toolsUsed\":3,\"violations\":0}" }'
  :features='[
    { icon: "🔍", title: "jq queryable", description: "Find all denials: jq select .decision==deny — no grep needed" },
    { icon: "📁", title: "Append-safe", description: "Concurrent writes do not corrupt — one JSON object per line" },
    { icon: "📤", title: "SIEM compatible", description: "Datadog, Splunk, and Elasticsearch all ingest JSONL natively" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Four Compliance Benefits
<FourCardGridSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Audit Trail · Compliance Value"
  title="Four Reasons Compliance Teams Need This Audit Trail"
  :cards='[
    { icon: "📋", title: "100% Coverage", description: "Every agent action across all 8 lifecycle events — not sampling, not spot checks" },
    { icon: "🔍", title: "Direct Query", description: "jq select by tool, decision, or timestamp — no custom log parser needed" },
    { icon: "📁", title: "Append-Only", description: "Immutable per-line append — concurrent writes safe, no corruption risk" },
    { icon: "🔗", title: "SIEM Ready", description: "Import to Splunk, Datadog, or Elasticsearch for alerting and dashboards" }
  ]'
  :insight='{ icon: "⚖️", text: "SOC2 and HIPAA auditors get enforcement evidence — not sampling. Audit prep shrinks from weeks to hours." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Context Injection and Quality Gates
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="💉"
  pillLabel="Audit Trail · Enrichment Hooks"
  title="Two More Hooks That Pay Dividends"
  :left='{
    header: "SessionStart — Context Injection",
    icon: "🚀",
    items: [
      { title: "additionalContext in output", detail: "Injected into the agent conversation at start" },
      { title: "Project-specific metadata", detail: "Branch, version, environment, team standards" },
      "SubagentStart works the same way for nested agents",
      "Eliminates manual agent setup for every session"
    ]
  }'
  :right='{
    header: "PostToolUse — Quality Gates",
    icon: "✨",
    items: [
      { title: "Fires after every tool completes", detail: "editFiles, createFile, runTerminalCommand" },
      { title: "Run prettier and ESLint", detail: "Standards enforced at creation not in CI" },
      "additionalContext tells agent about lint errors to fix",
      "decision: block stops further processing if quality fails"
    ]
  }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Phase 4: Real-World Implementation Patterns
<SectionOpenerSlide
  :partNumber="4"
  title="Phase 4: Real-World Patterns"
  subtitle="HIPAA, SOC2, and multi-layer security patterns — copy-paste configurations deployable within hours"
  :cards='[
    { icon: "🔒", title: "Security Patterns", blurb: "Multi-layer PreToolUse for defense-in-depth" },
    { icon: "✨", title: "Quality Gates", blurb: "PostToolUse runs prettier and lint after edits" },
    { icon: "💉", title: "Context Injection", blurb: "SessionStart fills agents with project context" },
  ]'
  :terminal='{ context: "HIPAA, SOC2, quality, and context — four patterns you can deploy today", detail: "1-2 hours from zero to governed agent workflows" }'
/>

---

# Three Compliance Patterns
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🏛️"
  pillLabel="Patterns · Compliance"
  title="Three Regulatory Patterns — Each Deployable in Hours"
  :columns='[
    { icon: "🏥", title: "HIPAA", description: "Healthcare PHI protection", items: ["Deny access to PHI paths outside approved tools", "Log all 8 events — retention required by regulation", "ask for any data export operation", "SessionStart validates project authorization state"] },
    { icon: "⚖️", title: "SOC2", description: "Security and availability", items: ["Multi-layer PreToolUse: commands + files + secrets", "JSON Lines to SIEM — direct audit evidence", "PreCompact exports context before truncation", "Stop hook generates end-of-session compliance report"] },
    { icon: "✨", title: "Code Quality", description: "Shift-left enforcement", items: ["PostToolUse: prettier + ESLint after every editFiles", "Lint errors injected as additionalContext to fix now", "Stop hook blocks session until test suite passes", "SessionStart injects team style guide and standards"] }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Four Implementation Patterns
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🏗️"
  pillLabel="Patterns · Implementation"
  title="Four Patterns — Combine for Defense-in-Depth"
  subtitle="Each pattern solves one class of governance problem — layer them for complete coverage"
  :rows='[
    { label: "Multi-Layer", description: "Multiple PreToolUse hooks run in order; first deny wins", tag: "Defense depth" },
    { label: "Quality Gate", description: "PostToolUse runs prettier + ESLint after every editFiles call", tag: "Shift left" },
    { label: "Env Policies", description: "Production=deny · staging=ask · development=allow by CWD", tag: "Environment" },
    { label: "Ctx Injection", description: "SessionStart + SubagentStart inject branch and project info", tag: "Context" }
  ]'
  footnote="Start with Multi-Layer security. Add Quality Gate in week 2. Env Policies and Context Injection in month 1."
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Manual Governance vs Hooks
<WorkflowShowdownStepsSlide
  :partNumber="4"
  pillIcon="⚖️"
  pillLabel="Patterns · Before and After"
  title="Manual Governance vs Copilot Hooks"
  subtitle="The same agent action — two very different outcomes"
  leftLabel="Manual Governance"
  rightLabel="With Copilot Hooks"
  :steps='[
    { left: { label: "Request submitted", note: "Agent begins autonomous work" }, right: { label: "Request submitted", note: "Agent begins autonomous work" } },
    { left: { label: "Agent takes action", note: "No enforcement gate — anything allowed" }, right: { label: "PreToolUse fires", note: "Security policy checked in <2 seconds" } },
    { left: { label: "Violation executes", note: "rm -rf or DROP TABLE — damage done" }, right: { label: "Deny decision returned", note: "Operation blocked before execution" } },
    { left: { label: "Post-incident review", note: "Hours of log forensics after damage" }, right: { label: "Audit log appended", note: "JSON Lines entry — queryable with jq" } }
  ]'
  :outcomeLeft='{ icon: "🔥", label: "Violation discovered after damage — hours of recovery" }'
  :outcomeRight='{ icon: "✓", label: "Blocked in <2 seconds — complete audit trail" }'
  summaryMetric="Real-time prevention vs. post-incident recovery"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before / After
<BeforeAfterSlide
  header="From Post-Incident Review to Real-Time Prevention"
  :leftItems='["AI agents operate with no enforcement gates — violations found after damage", "Policy violations reconstructed through hours of post-incident log forensics", "CI catches quality violations after code is committed — rework cycles", "Manual approval gates required for sensitive operations — velocity destroyed"]'
  :rightItems='["PreToolUse denies dangerous operations in <2 seconds before execution", "JSON Lines audit trail covers all 8 lifecycle events — 100% coverage", "PostToolUse enforces formatting and linting at the point of creation", "Synchronous governance runs in the agent path — no manual gates needed"]'
  :metrics='[
    { value: "<2s", detail: "PreToolUse execution time — real-time prevention" },
    { value: "8 events", detail: "complete lifecycle coverage with zero gaps" },
    { value: "100%", detail: "audit coverage — no sampling, every action recorded" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Create .github/hooks/ and deploy the security-check script to one repository", "Add SessionStart and Stop hooks to start logging all agent sessions to audit.jsonl", "Trigger a sandbox denial — run an agent and verify the deny response works"]'
  :thisWeek='["Wire all 8 lifecycle hooks for a complete JSON Lines audit trail", "Add PostToolUse quality gates — prettier and ESLint enforcement after file edits", "Implement environment-aware policies: production=deny, staging=ask, development=allow"]'
  :thisMonth='["Integrate JSON Lines logs into your SIEM for SOC2 or HIPAA compliance evidence", "Roll out multi-layer security enforcement to all production repositories", "Document hook patterns as org standards and share with your compliance team"]'
  footer="Hooks move governance from post-incident review to real-time prevention."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
        { href: "https://code.visualstudio.com/docs/copilot/customization/hooks", label: "Agent hooks configuration in VS Code", description: "Complete configuration reference with input/output formats" },
        { href: "https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks", label: "About Copilot hooks", description: "Core concepts and hook types overview" },
        { href: "https://docs.github.com/en/copilot/reference/hooks-configuration", label: "Hooks configuration reference", description: "Complete spec with all input and output formats" },
        { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks", label: "Using hooks with coding agent", description: "Step-by-step implementation and deployment guide" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
        { label: "Terminal Sandboxing", description: "OS-level execution controls — complements hooks for defense-in-depth" },
        { label: "Copilot Primitives", description: "Custom instructions, agents, and skills for broader customization" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Copilot Hooks"
  subtitle="Programmable Governance for Agent Workflows"
  :cards="[
    { value: 'PreToolUse', detail: 'The only hook that prevents execution before it happens — not post-incident' },
    { value: '8 events', detail: 'Complete lifecycle coverage from SessionStart to Stop — zero gaps' },
    { value: '<2 seconds', detail: 'Synchronous governance in the agent path — prevention without velocity loss' },
  ]"
  prompt="What would your team enforce first if every agent action had a real-time gate?"
/>

---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Copilot Chat Internals
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Copilot Chat Internals
mdc: true
section: Copilot Tools
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
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>

# Title
<TitleSlide
  title="Copilot Chat Internals"
  subtitle="Debugging AI Interactions"
  tagline="Transform AI debugging from guesswork into systematic investigation"
  meta="GitHub Copilot · Debugging AI Interactions · CopilotTraining"
/>
---

# Core Question
<CoreQuestionSlide
  question="Why can&#39;t I reproduce this Copilot failure?"
  subtext="When AI responses break, most engineers have nowhere to look. Copilot now ships"
  highlight="a full debugging stack — if you know where to find it."
  :cards='[
    { icon: "🔧", title: "Platform Engineers", description: "Debug agent pipelines and MCP configurations before users notice" },
    { icon: "👩‍💻", title: "Developers", description: "Understand why context isn&#39;t loading or responses are wrong" },
    { icon: "🏗️", title: "DevOps / SRE", description: "Trace reliability issues back to model turns, not infrastructure" },
    { title: "45 min → 4 min", description: "Typical config-error diagnosis time with vs. without the debug view" },
    { title: "Black box → Observable", description: "Agent Debug Panel exposes every model turn and tool call in real time" },
    { title: "v1.110 — Feb 2026", description: "Real-time event stream and chart visualization newly available" }
  ]'
/>
---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "📡", title: "Agent Debug Panel", subtitle: "Real-Time Event Stream (v1.110)", blurb: "Monitor every model turn, tool call, and chart in real time", slide: 4 },
    { icon: "🔍", title: "Chat Debug View", subtitle: "Complete Request Inspection", blurb: "See the full pipeline: files, instructions, thinking tokens", slide: 9 },
    { icon: "⚙️", title: "Customization Diagnostics", subtitle: "Configuration Validation", blurb: "Diagnose instruction errors and MCP config issues fast", slide: 14 },
    { icon: "🗺️", title: "Troubleshooting Patterns", subtitle: "Systematic Investigation", blurb: "Repeatable triage workflows to apply the same day", slide: 17 },
  ]'
/>
---

# Part 1 — Agent Debug Panel: Real-Time Events
<SectionOpenerSlide
  :partNumber="1"
  title="Agent Debug Panel: Real-Time Events"
  subtitle="Live event stream and chart visualization — Copilot goes from black box to observable system"
  :cards='[
    { icon: "📡", title: "Real-Time Events", blurb: "Monitor tool calls, model turns, and errors as they happen" },
    { icon: "📊", title: "Chart Visualization", blurb: "Timeline view of agent execution — spot bottlenecks instantly" },
    { icon: "🔍", title: "Tool Call Inspection", blurb: "Expand any event to see inputs, outputs, and durations" },
  ]'
  :terminal='{ context: "Opening the Agent Debug Panel in VS Code (v1.110+)", detail: "Every model turn and tool call — visible in real time" }'
/>
---

# Agent Debug Panel — Four Events
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📡"
  pillLabel="Agent Debug Panel · Events"
  title="Four Event Streams — All Live"
  :cards='[
    { icon: "💬", title: "Chat Events", description: "Every message, tool call, and response in chronological order" },
    { icon: "🔧", title: "Tool Invocations", description: "Live timing data for each tool call — instant bottleneck detection" },
    { icon: "📁", title: "Customization Loading", description: "Which instruction files, skills, and agents loaded — with status" },
    { icon: "⚠️", title: "Errors and Warnings", description: "Immediate visibility into failures with context and error detail" }
  ]'
  :insight='{ icon: "💡", text: "Keep the panel open during development sessions — your AI interaction dashboard." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
---

# Agent Debug Panel — Customization Failure
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="🔍"
  pillLabel="Agent Debug Panel · Live Demo"
  title="Caught: Custom Instructions Not Loading"
  subtitle="From 35 minutes of guesswork to 90 seconds in the panel"
  :transcript='[
    { type: "prompt", text: "Developer: Open Agent Debug Panel" },
    { type: "user", text: "Why is Copilot ignoring my custom instructions?" },
    { type: "thinking", label: "📁 Loaded Customizations:" },
    { type: "response", lines: ["  .github/agents/backend.md — loaded", "  .github/copilot-instructions.md — YAML syntax error line 14", "  .vscode/settings.json — empty file, skipped"] },
    { type: "divider" },
    { type: "outcome", text: "Root cause found in 90 seconds" },
    { type: "outcome", text: "Fix: corrected YAML frontmatter — instructions now apply" }
  ]'
  footerMetric="35 min → 90 sec to root cause"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
---

# Agent Debug Panel — Chart and Customizations
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Agent Debug Panel · Sub-Features"
  title="Two Lenses on Every Debugging Session"
  :left='{
    header: "Chart View",
    icon: "📊",
    items: [
      { title: "Flow Diagram", detail: "Agent execution as a visual graph" },
      { title: "Timing Bottlenecks", detail: "Spot slow tool calls at a glance" },
      { title: "Tool Call Chains", detail: "Follow execution path through steps" },
      "Switch: list view to chart view"
    ]
  }'
  :right='{
    header: "Loaded Customizations",
    icon: "📁",
    items: [
      { title: "Per-file status", detail: "Loaded — Warning — Failed with reason" },
      { title: "File location", detail: "Exact path and scope shown" },
      { title: "Application order", detail: "Which instructions apply first" },
      "First stop for missing instructions"
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
---

# Agent Debug Panel — Impact
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="Agent Debug Panel · Impact"
  title="From Reload-and-Pray to Systematic Debugging"
  subtitle="The panel replaces guesswork with evidence"
  leftLabel="Old Habit: Reload and Guess"
  rightLabel="New Pattern: Debug Panel First"
  :steps='[
    { left: { label: "Instructions ignored", note: "Response does not match expectations" }, right: { label: "Instructions ignored", note: "Response does not match expectations" } },
    { left: { label: "Reload the window", note: "Hope the problem disappears" }, right: { label: "Open Agent Debug Panel", note: "Developer: Open Agent Debug Panel" } },
    { left: { label: "Try the same prompt", note: "Same wrong result appears again" }, right: { label: "Check Loaded Customizations", note: "See the failed file and error message" } },
    { left: { label: "Add context manually", note: "30+ minutes — root cause unknown" }, right: { label: "Fix syntax error, verify", note: "Instructions load correctly in 2 minutes" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "30 minutes of trial and error — no root cause" }'
  :outcomeRight='{ icon: "✓", label: "Root cause found and fixed in under 2 minutes" }'
  summaryMetric="30 min → 2 min — panel eliminates trial-and-error debugging"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
---

# Part 2 — Chat Debug View: Full Pipeline
<SectionOpenerSlide
  :partNumber="2"
  title="Chat Debug View: Full Pipeline"
  subtitle="Unify Chat Debug View, Thinking Tokens, and Context Management in one pipeline mental model"
  :cards='[
    { icon: "📋", title: "Request Inspector", blurb: "See every file, instruction, and tool call sent to the model" },
    { icon: "🧠", title: "Thinking Tokens", blurb: "Watch model reasoning steps before the response arrives" },
    { icon: "📐", title: "Context Management", blurb: "Control compaction and window limits for agent sessions" },
  ]'
  :terminal='{ context: "Opening Chat Debug View during an agent session", detail: "Full request pipeline — nothing hidden from you" }'
/>
---

# Chat Debug View — Request Pipeline
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🔍"
  pillLabel="Chat Debug View · Pipeline"
  title="The 5-Stage Request Pipeline"
  subtitle="Nothing is hidden — Chat Debug View captures every stage of every request"
  :rows='[
    { label: "Prompt", description: "Your request plus active file and any @-referenced context attached", tag: "User input" },
    { label: "Assembly", description: "Instructions, skills, agents, and tools merged into one payload", tag: "Context build" },
    { label: "System prompt", description: "Final merged payload sent as the model instruction layer", tag: "LLM input" },
    { label: "Inference", description: "Model generates response, calling tools as needed in real time", tag: "Tool calls" },
    { label: "Response", description: "Formatted output delivered — Debug View captures every stage above", tag: "Full trace" }
  ]'
  footnote="Knowing which stage failed cuts diagnosis time from hours to minutes"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
---

# Chat Debug View — Context Inspection
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="🔍"
  pillLabel="Chat Debug View · Context Inspection"
  title="Context Inspection: Finding the Wrong File"
  subtitle="Model was correct — the context was wrong"
  :transcript='[
    { type: "prompt", text: "Developer: Show Chat Debug View" },
    { type: "user", text: "Response references the wrong version of AuthService" },
    { type: "thinking", label: "🔍 Chat Debug View — Context:" },
    { type: "response", lines: ["Context included:", "  AuthService.v1.ts (120 tokens)", "  AuthService.ts — not included"] },
    { type: "response", lines: ["Tool invocations:", "  search_codebase returned v1 file path"] },
    { type: "divider" },
    { type: "outcome", text: "Context included the wrong file — not a model error" },
    { type: "outcome", text: "Fix: attach #file:AuthService.ts explicitly" }
  ]'
  footerMetric="Debug view shifts blame from model to context — usually correct"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
---

# Chat Debug View — Thinking Tokens
<FourCardGridSlide
  :partNumber="2"
  pillIcon="🧠"
  pillLabel="Chat Debug View · Thinking Tokens"
  title="What Thinking Tokens Reveal"
  :cards='[
    { icon: "🧩", title: "Problem Decomposition", description: "How the model breaks down complex requests into subtasks" },
    { icon: "🔧", title: "Tool Selection Logic", description: "Why specific tools were chosen over alternative approaches" },
    { icon: "📖", title: "Context Evaluation", description: "How files and instructions shaped the model decisions" },
    { icon: "🤔", title: "Uncertainty Signals", description: "When the model considers multiple approaches before choosing" }
  ]'
  :insight='{ icon: "💡", text: "Unexpected response? Read the thinking — the model usually had a reason." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
---

# Chat Debug View — Context Management
<BeforeAfterMetricsSlide
  :partNumber="2"
  pillIcon="📐"
  pillLabel="Chat Debug View · Context Control"
  title="Context Window: Control Before It Controls You"
  :before='{
    header: "Without Context Management",
    items: [
      "Long sessions produce vague, forgetful responses",
      "Developers restart conversations and lose progress",
      { title: "No warning before overflow", detail: "Context fills silently until quality drops" },
      "Tool results excluded without notice"
    ]
  }'
  :after='{
    header: "With /compact and /fork",
    items: [
      "/compact: 95% to 42% — key decisions preserved",
      { title: "Context window indicator", detail: "Visual percentage with token breakdown" },
      "/fork: branch at decision points without losing history",
      "Proactive compaction before quality degrades"
    ]
  }'
  :metrics='[
    { value: "95% → 42%", label: "context reduction after /compact" },
    { value: ">80%", label: "threshold to trigger /compact" },
    { value: "0 lost", label: "key decisions preserved" }
  ]'
  :insight='{ icon: "💡", text: "Use /compact proactively — do not wait for responses to degrade." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
---

# Part 3 — Customization Diagnostics
<SectionOpenerSlide
  :partNumber="3"
  title="Customization Diagnostics"
  subtitle="Diagnose misconfigured instructions — the top failure mode — plus MCP and extension log infra"
  :cards='[
    { icon: "🔧", title: "Instruction Validator", blurb: "Test custom instructions are loading and applying correctly" },
    { icon: "📡", title: "Extension Logs", blurb: "Surface errors from MCP servers and language extensions" },
    { icon: "✅", title: "Config Health Check", blurb: "Verify workspace settings before blaming the model" },
  ]'
  :terminal='{ context: "Running diagnostics on a broken agent configuration", detail: "Misconfiguration caught in 4 min instead of 45" }'
/>
---

# Customization Diagnostics — Failure Modes
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="⚙️"
  pillLabel="Customization Diagnostics · Failure Modes"
  title="Four Failure Modes — One Tool to Catch Them"
  subtitle="Open Diagnostics View — catch config errors before they waste an hour"
  :rows='[
    { label: "Agent missing", description: "YAML syntax error — Diagnostics shows the exact line number and file", tag: "Fix: syntax" },
    { label: "Ignored rules", description: "Instruction file in wrong location — must be in the .github/ folder", tag: "Fix: location" },
    { label: "Skills miss", description: "applyTo glob does not match file path — update the pattern in skill.md", tag: "Fix: glob" },
    { label: "MCP silent", description: "MCP: List Servers — Show Output reveals server crash or auth timeout", tag: "Fix: restart" }
  ]'
  footnote="Check Diagnostics View before spending 30 minutes blaming the model"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>
---

# Customization Diagnostics — Tools Comparison
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔧"
  pillLabel="Customization Diagnostics · Tools"
  title="Diagnostics View vs Extension Logs"
  :left='{
    header: "Diagnostics View",
    icon: "⚙️",
    items: [
      { title: "Right-click in Chat", detail: "Instant access — no configuration needed" },
      { title: "Load status per file", detail: "Loaded / Warning / Failed with reason" },
      { title: "Application order", detail: "Which instructions apply first" },
      "Best for: config and customization problems"
    ]
  }'
  :right='{
    header: "Extension Logs",
    icon: "📋",
    items: [
      { title: "Developer: Set Log Level", detail: "Set Trace for Copilot and Copilot Chat" },
      { title: "Network and auth state", detail: "Connectivity, proxy, certificate issues" },
      { title: "MCP: List Servers", detail: "Status, output logs, restart controls" },
      "Best for: network, auth, and infrastructure"
    ]
  }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>
---

# Part 4 — Systematic Troubleshooting
<SectionOpenerSlide
  :partNumber="4"
  title="Systematic Troubleshooting"
  subtitle="Repeatable triage workflows and decision trees practitioners can apply the same day"
  :cards='[
    { icon: "🗺️", title: "Triage Workflow", blurb: "Start with observability, then dig into the request layer" },
    { icon: "🎯", title: "Decision Tree", blurb: "Route symptom → root cause → fix in three steps" },
    { icon: "📝", title: "Evidence Checklist", blurb: "Capture the right data before opening a bug report" },
  ]'
  :terminal='{ context: "Applying systematic debugging to a real agent failure", detail: "From symptom to fix in under 5 minutes" }'
/>
---

# Troubleshooting Patterns — Decision Map
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🗺️"
  pillLabel="Troubleshooting Patterns · Decision Map"
  title="Four Symptoms — Four Diagnostic Paths"
  subtitle="Route the problem to the right tool without guesswork"
  :rows='[
    { label: "Bad response", description: "Open Chat Debug View — check context sent versus context expected", tag: "Debug View" },
    { label: "Ignored rules", description: "Open Diagnostics View — instruction file may have a syntax error", tag: "Diagnostics" },
    { label: "Tool failure", description: "Expand tool invocations in Debug View — check MCP server logs", tag: "MCP Logs" },
    { label: "Session drift", description: "Use /compact when context exceeds 80% — preserves decisions", tag: "/compact" }
  ]'
  footnote="Systematic triage: identify the layer before applying the fix"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>
---

# Troubleshooting Patterns — Systematic vs Ad-Hoc
<WorkflowShowdownStepsSlide
  :partNumber="4"
  pillIcon="🎯"
  pillLabel="Troubleshooting Patterns · Workflow"
  title="Ad-Hoc Guessing vs Systematic Investigation"
  subtitle="Systematic debugging finds root cause every time — guessing sometimes gets lucky"
  leftLabel="Ad-Hoc Debugging"
  rightLabel="Systematic Investigation"
  :steps='[
    { left: { label: "Strange response", note: "Instructions seem wrong or missing" }, right: { label: "Strange response", note: "Instructions seem wrong or missing" } },
    { left: { label: "Reload, rephrase, hope", note: "Same problem appears again" }, right: { label: "Open Agent Debug Panel", note: "Check Loaded Customizations in 10 seconds" } },
    { left: { label: "Give up, re-add context", note: "Context re-added manually every session" }, right: { label: "Open Chat Debug View", note: "Verify context or check Diagnostics" } },
    { left: { label: "Problem recurs", note: "No root cause identified — cycle repeats" }, right: { label: "Fix root cause once", note: "Syntax error, file path, or glob pattern" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "Problem recurs — no root cause identified" }'
  :outcomeRight='{ icon: "✓", label: "Fixed permanently in 4 minutes" }'
  summaryMetric="Systematic debugging: find root cause in minutes, not hours"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>
---

# Troubleshooting Patterns — Impact
<HeroStatSlide
  :partNumber="4"
  pillIcon="⏱️"
  pillLabel="Troubleshooting Patterns · Impact"
  title="The Debug Stack Ships With Your Editor"
  subtitle="You had the tools already — now you know where to find them"
  :hero='{ value: "4 min", label: "to diagnose a config error that took 45 minutes before", source: "VS Code diagnostics view — real practitioner time reduction" }'
  :supporting='[
    { icon: "📡", title: "Agent Debug Panel", description: "Real-time event stream catches load failures instantly" },
    { icon: "🔍", title: "Chat Debug View", description: "Request pipeline inspection eliminates context guesswork" },
    { icon: "⚙️", title: "Diagnostics View", description: "Config validation before 30 minutes of troubleshooting" },
    { icon: "📋", title: "Extension Logs", description: "Trace mode surfaces network and auth root causes" }
  ]'
  :insight='{ icon: "💡", text: "The debug stack is already in your editor — the only thing missing was knowing where to look." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>
---

# Before After
<BeforeAfterSlide
  header="From Guesswork to Systematic AI Debugging"
  :leftItems='["Guess at why Copilot responded incorrectly", "No visibility into what context was sent to the model", "Config errors take 30–45 minutes to diagnose", "Reproduce AI failures by trial and error"]'
  :rightItems='["Agent Debug Panel shows every event as it happens", "Chat Debug View exposes all files, instructions, and tool calls", "Config diagnostics catch instruction errors in minutes", "Thinking tokens reveal model reasoning before the response"]'
  :metrics='[
    { value: "45 min → 4 min", detail: "Config error diagnosis time" },
    { value: "100% visibility", detail: "Chat Debug View exposes full request pipeline" },
    { value: "v1.110", detail: "Agent Debug Panel — Feb 2026" }
  ]'
/>
---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Open Agent Debug Panel in VS Code (v1.110+)", "Enable Chat Debug View for your current agent session", "Check one instruction file through the diagnostics panel"]'
  :thisWeek='["Add debug view to your standard agent troubleshooting flow", "Explore thinking tokens on a failing agent task", "Validate all custom instruction files in your workspace"]'
  :thisMonth='["Build a team triage checklist using systematic patterns", "Profile context usage to optimize agent performance", "Document common failure signatures for your agent setup"]'
  footer="The debug stack is already in your editor — the only thing missing was knowing where to look."
/>
---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
        { href: "https://code.visualstudio.com/updates/v1_110", label: "VS Code release notes: February 2026 (v1.110)", description: "Agent Debug Panel and real-time event stream" },
        { href: "https://code.visualstudio.com/docs/copilot/chat/chat-debug-view", label: "Copilot Chat debug view", description: "Complete request pipeline inspection" },
        { href: "https://code.visualstudio.com/docs/copilot/troubleshooting", label: "Copilot troubleshooting guide", description: "Systematic diagnostics and common fixes" },
        { href: "https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction", label: "Context compaction documentation", description: "/compact and context window management" },
        { href: "https://code.visualstudio.com/docs/copilot/customization/custom-instructions", label: "Custom instructions in VS Code", description: "Write and validate customization files" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
        { href: "https://code.visualstudio.com/docs/copilot/customization/mcp-servers", label: "MCP server configuration", description: "Configure and debug external tool servers" },
        { label: "Copilot Memory", description: "Context persistence across agent sessions" },
        { label: "MCP Apps", description: "Debugging MCP server integrations" }
    ] }
  ]'
/>
---

# Thank You
<ThankYouSlide
  title="Copilot Chat Internals"
  subtitle="Debugging AI Interactions"
  :cards="[
    { value: 'Agent Debug Panel', detail: 'Real-time event stream and chart visualization — v1.110' },
    { value: '45 min → 4 min', detail: 'Config-error diagnosis time with the Chat Debug View' },
    { value: 'Zero hidden requests', detail: 'Every file, instruction, and tool call fully visible' },
  ]"
  prompt="What&#39;s your most common Copilot debugging pain point right now?"
/>

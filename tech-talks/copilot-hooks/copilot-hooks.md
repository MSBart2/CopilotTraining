---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot Hooks
  Programmable governance and lifecycle control for AI agent workflows
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot Hooks - Governance & Compliance
module: tech-talks/copilot-hooks
mdc: true
status: archived
updated: 2026-02-11
---

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-indigo-900/20"></div>
<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
<div class="relative z-10">
<div class="absolute inset-0 blur-2xl opacity-50"><img src="./sdp-logo.png" class="w-64" alt="" /></div>
<img src="./sdp-logo.png" class="w-64 relative" alt="SDP Logo" />
</div>
<h1 class="!text-5xl !font-bold !mt-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent relative z-10">GitHub Copilot Hooks</h1>
<div class="mt-4 relative z-10">
<span class="px-6 py-2 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-full text-white text-xl font-medium shadow-lg shadow-cyan-500/25">Programmable Governance for Agent Workflows</span>
</div>
<div class="mt-8 text-lg opacity-70 relative z-10">Prevent violations before they happen — velocity with visibility</div>
<div class="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full relative z-10"></div>
</div>

<div class="abs-br m-6 flex gap-2">
<span class="text-sm opacity-50">Tech Talk · 45 minutes</span>
</div>

---

<!-- SLIDE: The Core Question -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔓 The Core Question</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30 max-w-4xl mx-auto">
<div class="text-2xl font-bold text-cyan-300 mb-4">
"How do I govern AI agent workflows without blocking their velocity?"
</div>
</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
<div class="p-4 bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-lg border border-amber-500/30">
<div class="text-xl mb-2">🚀</div>
<div class="font-semibold text-amber-300">Agents Move Fast</div>
<div class="text-xs opacity-80 mt-1">Creating files, running commands, deploying changes — all without pre-approval gates</div>
</div>
<div class="p-4 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg border border-orange-500/30">
<div class="text-xl mb-2">🔒</div>
<div class="font-semibold text-orange-300">Compliance Needs Proof</div>
<div class="text-xs opacity-80 mt-1">Post-incident review doesn't work — need preventive control before damage</div>
</div>
<div class="p-4 bg-gradient-to-br from-red-900/30 to-purple-900/30 rounded-lg border border-red-500/30">
<div class="text-xl mb-2">⏱️</div>
<div class="font-semibold text-red-300">Manual Gates Kill Velocity</div>
<div class="text-xs opacity-80 mt-1">Can't approve every action — need programmable governance at the moment of execution</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Table of Contents -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📖 Table of Contents</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
<div @click="$nav.go(4)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-xl border-2 border-cyan-500/50 hover:border-cyan-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/10">
<div class="text-3xl mb-2">🎯</div>
<div class="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Lifecycle Control</div>
<div class="text-sm text-gray-300 mt-1">8 hook types and when each fires</div>
<div class="text-xs text-cyan-400/70 mt-2">SessionStart, PreToolUse, SubagentStart, Stop — full coverage</div>
</div>
</div>
<div @click="$nav.go(8)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-xl border-2 border-blue-500/50 hover:border-blue-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/10">
<div class="text-3xl mb-2">🛡️</div>
<div class="text-lg font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Preventive Enforcement</div>
<div class="text-sm text-gray-300 mt-1">PreToolUse — deny before execution</div>
<div class="text-xs text-blue-400/70 mt-2">Block dangerous ops, require approval, modify input</div>
</div>
</div>
<div @click="$nav.go(11)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl border-2 border-indigo-500/50 hover:border-indigo-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/10">
<div class="text-3xl mb-2">📊</div>
<div class="text-lg font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Audit & Observability</div>
<div class="text-sm text-gray-300 mt-1">Complete compliance trail</div>
<div class="text-xs text-indigo-400/70 mt-2">JSON Lines logging, context injection, session tracking</div>
</div>
</div>
<div @click="$nav.go(14)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border-2 border-purple-500/50 hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/10">
<div class="text-3xl mb-2">🚀</div>
<div class="text-lg font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Real-World Patterns</div>
<div class="text-sm text-gray-300 mt-1">Proven implementations with metrics</div>
<div class="text-xs text-purple-400/70 mt-2">HIPAA audit: 2-3 hrs → 5 min, SOC 2: 3 incidents/yr → 0</div>
</div>
</div>
</div>

<div class="mt-6 text-center text-sm opacity-60">Click any section to jump directly there</div>
</div>
</div>

---

<!-- SLIDE: Part 1 — Lifecycle Control -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/25 via-blue-900/15 to-indigo-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-cyan-600/40 to-blue-600/40 rounded-full border border-cyan-400/30 text-cyan-300 text-sm font-medium tracking-widest uppercase">Part 1</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent leading-tight">Lifecycle Control</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">Understanding the eight hook types and when each executes</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-cyan-900/30 rounded-xl border border-cyan-500/30">
<div class="text-2xl mb-1">🎯</div>
<div class="text-cyan-300 font-semibold">8 Lifecycle Events</div>
<div class="text-xs opacity-70 mt-1">SessionStart → PreToolUse → PostToolUse → Stop</div>
</div>
<div class="px-4 py-3 bg-blue-900/30 rounded-xl border border-blue-500/30">
<div class="text-2xl mb-1">⚡</div>
<div class="text-blue-300 font-semibold">Synchronous Execution</div>
<div class="text-xs opacity-70 mt-1">Hooks run in agent path with 30s default timeout</div>
</div>
<div class="px-4 py-3 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
<div class="text-2xl mb-1">📋</div>
<div class="text-indigo-300 font-semibold">JSON Input/Output</div>
<div class="text-xs opacity-70 mt-1">Structured context via stdin, decisions via stdout</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">Hooks enable governance at the moment of action</span><br />
<span class="text-cyan-300 mt-1 block">↳ real-time control, not post-incident review</span>
</div>
</div>
</div>

---

<!-- SLIDE: The Eight Lifecycle Events -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎯 Lifecycle Control</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Complete Agent Lifecycle Coverage</div>
<div class="text-xs text-white/50">Each hook provides control at a critical moment in the agent workflow</div>
</div>
<div class="relative z-10 flex-1 min-h-0 overflow-auto">
<div class="grid grid-cols-2 gap-3 text-xs">
<div class="p-3 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/30">
<div class="font-bold text-cyan-300 mb-1">1. SessionStart</div>
<div class="text-white/70 mb-2">When agent session begins</div>
<div class="text-white/50">Use: Initialize resources, inject context, validate project state</div>
</div>
<div class="p-3 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
<div class="font-bold text-blue-300 mb-1">2. UserPromptSubmit</div>
<div class="text-white/70 mb-2">When user submits a prompt</div>
<div class="text-white/50">Use: Audit user requests, track prompt patterns for usage analysis</div>
</div>
<div class="p-3 bg-gradient-to-br from-indigo-900/40 to-blue-900/40 rounded-lg border border-indigo-500/30">
<div class="font-bold text-indigo-300 mb-1 flex items-center gap-1">3. PreToolUse <span class="text-[10px] px-1.5 py-0.5 bg-emerald-500/80 rounded text-white">MOST POWERFUL</span></div>
<div class="text-white/70 mb-2">Before agent invokes any tool</div>
<div class="text-white/50">Use: Block dangerous ops, require approval, modify tool input</div>
</div>
<div class="p-3 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-lg border border-purple-500/30">
<div class="font-bold text-purple-300 mb-1">4. PostToolUse</div>
<div class="text-white/70 mb-2">After tool completes successfully</div>
<div class="text-white/50">Use: Run formatters, log results, trigger follow-up actions</div>
</div>
<div class="p-3 bg-gradient-to-br from-pink-900/40 to-purple-900/40 rounded-lg border border-pink-500/30">
<div class="font-bold text-pink-300 mb-1">5. PreCompact</div>
<div class="text-white/70 mb-2">Before context is compacted</div>
<div class="text-white/50">Use: Export important context, save state before truncation</div>
</div>
<div class="p-3 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-lg border border-blue-500/30">
<div class="font-bold text-blue-300 mb-1">6. SubagentStart</div>
<div class="text-white/70 mb-2">When subagent is spawned</div>
<div class="text-white/50">Use: Track nested agent usage, inject subagent context</div>
</div>
<div class="p-3 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/30">
<div class="font-bold text-cyan-300 mb-1">7. SubagentStop</div>
<div class="text-white/70 mb-2">When subagent completes</div>
<div class="text-white/50">Use: Aggregate results, verify output, cleanup resources</div>
</div>
<div class="p-3 bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 rounded-lg border border-indigo-500/30">
<div class="font-bold text-indigo-300 mb-1">8. Stop</div>
<div class="text-white/70 mb-2">When agent session ends</div>
<div class="text-white/50">Use: Generate reports, enforce completion requirements, cleanup</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Hook Configuration Format -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎯 Lifecycle Control</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"></div>
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
</div>
<span class="text-white/40 text-xs ml-1">2 of 3</span>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Hook Configuration & Discovery</div>
<div class="text-sm text-gray-400">Hooks are defined in JSON files — workspace hooks take precedence over user hooks</div>
</div>
<div class="relative z-10 flex-1 min-h-0 flex flex-col gap-4">
<div class="grid grid-cols-2 gap-4">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">📁 Hook Locations (in search order)</div>
<div class="text-xs space-y-1 text-white/70">
<div>1. <code class="text-cyan-400">.github/hooks/*.json</code> — Project-specific</div>
<div>2. <code class="text-cyan-400">.claude/settings.local.json</code> — Local (not committed)</div>
<div>3. <code class="text-cyan-400">.claude/settings.json</code> — Workspace-level</div>
<div>4. <code class="text-cyan-400">~/.claude/settings.json</code> — Personal (all workspaces)</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">⚙️ Configuration Fields</div>
<div class="text-xs space-y-1 text-white/70">
<div><code class="text-blue-400">type</code>: Must be <code>"command"</code></div>
<div><code class="text-blue-400">command</code>: Default command (cross-platform)</div>
<div><code class="text-blue-400">windows</code> / <code>linux</code> / <code>osx</code>: OS-specific overrides</div>
<div><code class="text-blue-400">timeout</code>: Max execution time (default 30s)</div>
</div>
</div>
</div>

<div class="p-4 bg-gray-900/80 rounded-xl border border-gray-700/50 font-mono text-xs">
<div class="text-gray-400 mb-2">Example: Security enforcement with PreToolUse</div>
<pre class="text-white/90"><code>{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/security-check.sh",
        "windows": "powershell -File scripts\\security-check.ps1",
        "cwd": ".github/hooks",
        "timeout": 5
      }
    ]
  }
}</code></pre>
</div>
</div>
</div>

---

<!-- SLIDE: Execution Flow -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎯 Lifecycle Control</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"></div>
</div>
<span class="text-white/40 text-xs ml-1">3 of 3</span>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Hook Execution Flow</div>
<div class="text-sm text-gray-400">How agents discover, invoke, and process hook responses</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="flex items-center gap-3 mb-4">
<div class="flex-1 p-3 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/30 text-center">
<div class="text-xs font-bold text-cyan-300 mb-1">1. Event Detection</div>
<div class="text-xs text-white/60">Agent detects lifecycle event</div>
</div>
<div class="text-xl text-cyan-400">→</div>
<div class="flex-1 p-3 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-lg border border-blue-500/30 text-center">
<div class="text-xs font-bold text-blue-300 mb-1">2. Hook Discovery</div>
<div class="text-xs text-white/60">Reads .github/hooks/*.json</div>
</div>
<div class="text-xl text-blue-400">→</div>
<div class="flex-1 p-3 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-lg border border-indigo-500/30 text-center">
<div class="text-xs font-bold text-indigo-300 mb-1">3. Script Invocation</div>
<div class="text-xs text-white/60">Spawns shell process</div>
</div>
</div>

<div class="flex items-center gap-3 mb-6">
<div class="flex-1 p-3 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30 text-center">
<div class="text-xs font-bold text-purple-300 mb-1">4. Context Passing</div>
<div class="text-xs text-white/60">Writes JSON to stdin</div>
</div>
<div class="text-xl text-purple-400">→</div>
<div class="flex-1 p-3 bg-gradient-to-br from-pink-900/40 to-red-900/40 rounded-lg border border-pink-500/30 text-center">
<div class="text-xs font-bold text-pink-300 mb-1">5. Execution</div>
<div class="text-xs text-white/60">Waits up to timeout seconds</div>
</div>
<div class="text-xl text-red-400">→</div>
<div class="flex-1 p-3 bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-lg border border-red-500/30 text-center">
<div class="text-xs font-bold text-red-300 mb-1">6. Exit Code Check</div>
<div class="text-xs text-white/60">0 = success, 2 = blocking</div>
</div>
</div>

<div class="grid grid-cols-2 gap-3 text-xs">
<div class="p-3 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30">
<div class="font-bold text-cyan-300 mb-2">📥 Common Input (stdin)</div>
<div class="font-mono text-xs text-white/70">
<div>timestamp, cwd, sessionId</div>
<div>hookEventName, transcript_path</div>
<div class="text-cyan-400 mt-1">+ event-specific fields</div>
<div class="text-white/50">(tool_name, tool_input, etc.)</div>
</div>
</div>
<div class="p-3 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30">
<div class="font-bold text-blue-300 mb-2">📤 Output Decisions (stdout)</div>
<div class="font-mono text-xs text-white/70">
<div><span class="text-emerald-400">allow</span> — proceed with execution</div>
<div><span class="text-red-400">deny</span> — block operation</div>
<div><span class="text-yellow-400">ask</span> — require user approval</div>
<div class="text-white/50 mt-1">+ updatedInput, additionalContext</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Part 2 — Preventive Enforcement -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-indigo-900/15 to-purple-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-full border border-blue-400/30 text-blue-300 text-sm font-medium tracking-widest uppercase">Part 2</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent leading-tight">Preventive Enforcement</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">PreToolUse — the only hook that can deny operations before they happen</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-blue-900/30 rounded-xl border border-blue-500/30">
<div class="text-2xl mb-1">🛡️</div>
<div class="text-blue-300 font-semibold">Block Before Damage</div>
<div class="text-xs opacity-70 mt-1">Dangerous commands, privilege escalation, destructive ops</div>
</div>
<div class="px-4 py-3 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
<div class="text-2xl mb-1">✏️</div>
<div class="text-indigo-300 font-semibold">Modify Tool Input</div>
<div class="text-xs opacity-70 mt-1">Enforce safe defaults via updatedInput field</div>
</div>
<div class="px-4 py-3 bg-purple-900/30 rounded-xl border border-purple-500/30">
<div class="text-2xl mb-1">💬</div>
<div class="text-purple-300 font-semibold">Require Approval</div>
<div class="text-xs opacity-70 mt-1">Use "ask" decision for operations needing human judgment</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">PreToolUse is uniquely powerful</span><br />
<span class="text-blue-300 mt-1 block">↳ other hooks observe; PreToolUse controls</span>
</div>
</div>
</div>

---

<!-- SLIDE: Security Check Implementation -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🛡️ Preventive Enforcement</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Security Policy Enforcement</div>
<div class="text-sm text-gray-400">Block dangerous operations before they execute — deny destructive commands, privilege escalation, database drops</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-4 h-full">
<div class="flex flex-col">
<div class="p-3 bg-gray-900/80 rounded-xl border border-gray-700/50 font-mono text-[10px] overflow-auto flex-1">
<div class="text-gray-400 mb-1">security-check.sh (excerpt)</div>
<pre class="text-white/90"><code>#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
&#8203;
# Only validate terminal commands
if [ "$TOOL_NAME" != "runTerminalCommand" ]; then
  echo '{"continue":true}'
  exit 0
fi
&#8203;
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
&#8203;
# Block dangerous delete operations
if echo "$COMMAND" | grep -qE 'rm -rf /|del /s /q'; then
  echo '{"hookSpecificOutput":{
    "hookEventName":"PreToolUse",
    "permissionDecision":"deny",
    "permissionDecisionReason":"Destructive operation"
  }}'
  exit 0
fi
&#8203;
# Block privilege escalation
if echo "$COMMAND" | grep -qE '^sudo |^su '; then
  echo '{"hookSpecificOutput":{
    "hookEventName":"PreToolUse",
    "permissionDecision":"deny",
    "permissionDecisionReason":"Privilege escalation"
  }}'
  exit 0
fi
&#8203;
# Block database destruction
if echo "$COMMAND" | grep -qiE 'DROP TABLE|TRUNCATE'; then
  echo '{"hookSpecificOutput":{
    "hookEventName":"PreToolUse",
    "permissionDecision":"deny"
  }}'
  exit 0
fi
&#8203;
echo '{"continue":true}'</code></pre>
</div>
</div>

<div class="flex flex-col gap-3">
<div class="p-3 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
<div class="text-sm font-bold text-red-300 mb-2">🚫 Blocked Operations</div>
<div class="text-xs space-y-1 text-white/70">
<div>• <code class="text-red-400">rm -rf /</code> — Destructive file operations</div>
<div>• <code class="text-red-400">sudo</code> / <code>su</code> — Privilege escalation</div>
<div>• <code class="text-red-400">DROP TABLE</code> — Database destruction</div>
<div>• <code class="text-red-400">format</code> / <code>del /s</code> — Mass deletion</div>
</div>
</div>

<div class="p-3 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">⚙️ Permission Decisions</div>
<div class="text-xs space-y-2 text-white/70">
<div><span class="text-emerald-400 font-bold">allow</span> — Operation proceeds (least restrictive)</div>
<div><span class="text-yellow-400 font-bold">ask</span> — Requires user confirmation</div>
<div><span class="text-red-400 font-bold">deny</span> — Blocks execution (most restrictive)</div>
<div class="text-white/50 mt-2">Multiple hooks: most restrictive decision wins</div>
</div>
</div>

<div class="p-3 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/30">
<div class="text-sm font-bold text-indigo-300 mb-2">⏱️ Performance Target</div>
<div class="text-xs text-white/70">
<div class="mb-1">&lt;2 seconds for security checks</div>
<div class="text-white/50">Cache regex patterns, use fast grep, avoid network calls</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Environment-Aware Policies -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🛡️ Preventive Enforcement</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50"></div>
</div>
<span class="text-white/40 text-xs ml-1">2 of 2</span>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Conditional Policies by Environment</div>
<div class="text-sm text-gray-400">Apply stricter rules in production, require approval in staging, permissive in dev</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-3 gap-3 mb-4 text-xs">
<div class="p-3 bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-lg border border-red-500/30 text-center">
<div class="text-2xl mb-1">🔒</div>
<div class="font-bold text-red-300 mb-1">Production</div>
<div class="text-white/70">All writes denied</div>
<div class="text-white/50 text-[10px] mt-1">Manual deployment only</div>
</div>
<div class="p-3 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/30 text-center">
<div class="text-2xl mb-1">⚠️</div>
<div class="font-bold text-yellow-300 mb-1">Staging</div>
<div class="text-white/70">Destructive ops require approval</div>
<div class="text-white/50 text-[10px] mt-1">Ask decision for rm/delete</div>
</div>
<div class="p-3 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30 text-center">
<div class="text-2xl mb-1">✅</div>
<div class="font-bold text-green-300 mb-1">Development</div>
<div class="text-white/70">Permissive (allow all)</div>
<div class="text-white/50 text-[10px] mt-1">Fast iteration mode</div>
</div>
</div>

<div class="p-4 bg-gray-900/80 rounded-xl border border-gray-700/50 font-mono text-[11px]">
<div class="text-gray-400 mb-2">environment-aware.sh</div>
<pre class="text-white/90"><code>INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
&#8203;
# Production: block all writes
if [[ "$CWD" =~ /production/ ]]; then
  if [[ "$TOOL_NAME" =~ ^(editFiles|createFile|runTerminalCommand)$ ]]; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse",
      "permissionDecision":"deny",
      "permissionDecisionReason":"Production requires manual deployment"}}'
    exit 0
  fi
fi
&#8203;
# Staging: require approval for destructive operations
if [[ "$CWD" =~ /staging/ ]]; then
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  if echo "$COMMAND" | grep -qE "rm |delete |drop "; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse",
      "permissionDecision":"ask",
      "permissionDecisionReason":"Staging destructive ops need approval"}}'
    exit 0
  fi
fi
&#8203;
# Development: permissive
echo '{"continue":true}'</code></pre>
</div>
</div>
</div>

---

<!-- SLIDE: Part 3 — Audit & Observability -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-indigo-900/25 via-purple-900/15 to-pink-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 rounded-full border border-indigo-400/30 text-indigo-300 text-sm font-medium tracking-widest uppercase">Part 3</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">Audit & Observability</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">Complete lifecycle logging for compliance and debugging</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
<div class="text-2xl mb-1">📋</div>
<div class="text-indigo-300 font-semibold">JSON Lines Format</div>
<div class="text-xs opacity-70 mt-1">One JSON object per line — append-safe, queryable</div>
</div>
<div class="px-4 py-3 bg-purple-900/30 rounded-xl border border-purple-500/30">
<div class="text-2xl mb-1">🔍</div>
<div class="text-purple-300 font-semibold">Direct Querying</div>
<div class="text-xs opacity-70 mt-1">Use jq for SQL-like filtering without parsing</div>
</div>
<div class="px-4 py-3 bg-pink-900/30 rounded-xl border border-pink-500/30">
<div class="text-2xl mb-1">💉</div>
<div class="text-pink-300 font-semibold">Context Injection</div>
<div class="text-xs opacity-70 mt-1">SessionStart / SubagentStart provide project info</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">All 8 lifecycle hooks can log structured events</span><br />
<span class="text-indigo-300 mt-1 block">↳ complete audit trail, no gaps</span>
</div>
</div>
</div>

---

<!-- SLIDE: Complete Audit Configuration -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 Audit & Observability</span>
<div class="flex-1 h-px bg-gradient-to-r from-indigo-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Full Lifecycle Audit Trail</div>
<div class="text-sm text-gray-400">Wire up all 8 hooks for complete compliance logging to JSON Lines format</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-4 h-full">
<div class="flex flex-col gap-3">
<div class="p-3 bg-gray-900/80 rounded-xl border border-gray-700/50 font-mono text-[10px] flex-1 overflow-auto">
<div class="text-gray-400 mb-1">audit-hooks.json</div>
<pre class="text-white/90"><code>{
  "hooks": {
    "SessionStart": [{
      "type": "command",
      "command": "./scripts/log-session-start.sh",
      "cwd": ".github/hooks"
    }],
    "UserPromptSubmit": [{
      "type": "command",
      "command": "./scripts/log-prompt.sh",
      "cwd": ".github/hooks"
    }],
    "PreToolUse": [{
      "type": "command",
      "command": "./scripts/log-tool-pre.sh",
      "cwd": ".github/hooks"
    }],
    "PostToolUse": [{
      "type": "command",
      "command": "./scripts/log-tool-post.sh",
      "cwd": ".github/hooks"
    }],
    "PreCompact": [{
      "type": "command",
      "command": "./scripts/log-pre-compact.sh",
      "cwd": ".github/hooks"
    }],
    "SubagentStart": [{
      "type": "command",
      "command": "./scripts/log-subagent-start.sh",
      "cwd": ".github/hooks"
    }],
    "SubagentStop": [{
      "type": "command",
      "command": "./scripts/log-subagent-stop.sh",
      "cwd": ".github/hooks"
    }],
    "Stop": [{
      "type": "command",
      "command": "./scripts/log-session-end.sh",
      "cwd": ".github/hooks"
    }]
  }
}</code></pre>
</div>
</div>

<div class="flex flex-col gap-3">
<div class="p-3 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/30 flex-1">
<div class="text-sm font-bold text-indigo-300 mb-2">📄 Example Audit Log Output (logs/audit.jsonl)</div>
<div class="font-mono text-[9px] text-white/70 space-y-1">
<div>{"timestamp":"2026-02-06T17:30:00Z","event":"SessionStart",...}</div>
<div>{"timestamp":"2026-02-06T17:30:15Z","event":"UserPromptSubmit",...}</div>
<div>{"timestamp":"2026-02-06T17:30:20Z","event":"PreToolUse",...}</div>
<div>{"timestamp":"2026-02-06T17:30:25Z","event":"PostToolUse",...}</div>
<div>{"timestamp":"2026-02-06T17:30:28Z","event":"SubagentStart",...}</div>
<div>{"timestamp":"2026-02-06T17:30:35Z","event":"SubagentStop",...}</div>
<div>{"timestamp":"2026-02-06T17:30:30Z","event":"Stop",...}</div>
</div>
</div>

<div class="p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
<div class="text-sm font-bold text-purple-300 mb-2">🔍 Query Examples (jq)</div>
<div class="font-mono text-[9px] text-white/70 space-y-1.5">
<div class="text-pink-300"># Count tool usage by type</div>
<div>cat audit.jsonl | jq -r '.tool_name' | sort | uniq -c</div>
<div class="text-pink-300 mt-2"># Find all denied operations</div>
<div>cat audit.jsonl | jq 'select(.permissionDecision == "deny")'</div>
<div class="text-pink-300 mt-2"># Export to CSV for compliance</div>
<div>cat audit.jsonl | jq -r '[.timestamp, .tool_name] | @csv'</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Context Injection -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 Audit & Observability</span>
<div class="flex-1 h-px bg-gradient-to-r from-indigo-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50"></div>
</div>
<span class="text-white/40 text-xs ml-1">2 of 2</span>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Session Context Injection</div>
<div class="text-sm text-gray-400">Provide project-specific information to agents without manual setup</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-4">
<div class="p-4 bg-gray-900/80 rounded-xl border border-gray-700/50 font-mono text-[10px] overflow-auto">
<div class="text-gray-400 mb-2">inject-context.sh — SessionStart hook</div>
<pre class="text-white/90"><code>#!/bin/bash
# Inject project info when session begins
&#8203;
PROJECT_INFO=$(cat package.json 2>/dev/null | \
  jq -r '.name + " v" + .version' || echo "Unknown")
&#8203;
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
&#8203;
NODE_VERSION=$(node -v 2>/dev/null || echo "not installed")
&#8203;
cat &lt;&lt;EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: $PROJECT_INFO | Branch: $BRANCH | Node: $NODE_VERSION"
  }
}
EOF</code></pre>
</div>

<div class="flex flex-col gap-3">
<div class="p-3 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/30">
<div class="text-sm font-bold text-indigo-300 mb-2">💡 Context Injection Use Cases</div>
<div class="text-xs space-y-2 text-white/70">
<div>• <span class="text-indigo-400">Environment variables</span> — API endpoints, feature flags</div>
<div>• <span class="text-indigo-400">Project metadata</span> — Version, branch, tech stack</div>
<div>• <span class="text-indigo-400">Team guidelines</span> — Coding standards, architecture rules</div>
<div>• <span class="text-indigo-400">Dependency info</span> — Package versions, breaking changes</div>
</div>
</div>

<div class="p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-pink-500/30">
<div class="text-sm font-bold text-purple-300 mb-2">⚡ Hooks with Context Injection</div>
<div class="text-xs space-y-1 text-white/70">
<div><code class="text-purple-400">SessionStart</code> — Initialize session with project info</div>
<div><code class="text-purple-400">SubagentStart</code> — Provide context to spawned subagents</div>
<div><code class="text-purple-400">PreToolUse</code> — Add context when allowing operations</div>
<div><code class="text-purple-400">PostToolUse</code> — Inject feedback after tool completes</div>
</div>
</div>

<div class="p-3 bg-gradient-to-br from-pink-900/30 to-red-900/30 rounded-xl border border-pink-500/30">
<div class="text-sm font-bold text-pink-300 mb-2">📈 Impact</div>
<div class="text-xs text-white/70">
<div class="mb-1">Agents make better decisions with project-specific context</div>
<div class="text-white/50 text-[10px]">No manual "here's our setup" messages needed — hooks auto-inject on session start</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Part 4 — Real-World Patterns -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/25 via-pink-900/15 to-rose-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-full border border-purple-400/30 text-purple-300 text-sm font-medium tracking-widest uppercase">Part 4</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-purple-400 via-pink-300 to-rose-400 bg-clip-text text-transparent leading-tight">Real-World Patterns</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">Proven implementations with measurable impact</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-purple-900/30 rounded-xl border border-purple-500/30">
<div class="text-2xl mb-1">🏥</div>
<div class="text-purple-300 font-semibold">HIPAA Compliance</div>
<div class="text-xs opacity-70 mt-1">2-3 hrs → 5 min audit queries</div>
</div>
<div class="px-4 py-3 bg-pink-900/30 rounded-xl border border-pink-500/30">
<div class="text-2xl mb-1">🔐</div>
<div class="text-pink-300 font-semibold">SOC 2 Enforcement</div>
<div class="text-xs opacity-70 mt-1">3 security incidents/yr → 0</div>
</div>
<div class="px-4 py-3 bg-rose-900/30 rounded-xl border border-rose-500/30">
<div class="text-2xl mb-1">⚡</div>
<div class="text-rose-300 font-semibold">Quality Gates</div>
<div class="text-xs opacity-70 mt-1">7.5 hrs/sprint rework → 0</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">These patterns deploy in 1-2 hours</span><br />
<span class="text-purple-300 mt-1 block">↳ immediate security, compliance, and quality value</span>
</div>
</div>
</div>

---

<!-- SLIDE: HIPAA Compliance Audit Trail -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🚀 Real-World Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Use Case 1: HIPAA Compliance Audit Trail</div>
<div class="text-sm text-gray-400">Healthcare development requires complete audit trail — manual log collection takes 2-3 hours with 60-70% completeness</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-4 mb-4">
<div class="p-4 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
<div class="text-sm font-bold text-red-300 mb-2">❌ Before: Manual Audit Collection</div>
<div class="text-xs space-y-2 text-white/70">
<div>• Manual log parsing after incidents</div>
<div>• 2-3 hours per audit request</div>
<div>• 60-70% coverage (incomplete)</div>
<div>• Hours of `grep` / `awk` for queries</div>
<div>• No structured format for retention</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
<div class="text-sm font-bold text-green-300 mb-2">✅ After: Automated Hook-Based Audit</div>
<div class="text-xs space-y-2 text-white/70">
<div>• All 8 lifecycle hooks log to JSON Lines</div>
<div>• 5 minutes (automated queries)</div>
<div>• 100% coverage (complete lifecycle)</div>
<div>• SQL-like `jq` filtering, instant results</div>
<div>• Automated S3 archival (7-year retention)</div>
</div>
</div>
</div>

<div class="grid grid-cols-3 gap-3 text-xs">
<div class="p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
<div class="font-bold text-purple-300 mb-1">Audit Time</div>
<div class="text-2xl font-bold text-white mb-1">2-3 hrs → 5 min</div>
<div class="text-white/50">97% time reduction</div>
</div>
<div class="p-3 bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-xl border border-pink-500/30">
<div class="font-bold text-pink-300 mb-1">Coverage</div>
<div class="text-2xl font-bold text-white mb-1">60% → 100%</div>
<div class="text-white/50">Complete lifecycle</div>
</div>
<div class="p-3 bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-xl border border-rose-500/30">
<div class="font-bold text-rose-300 mb-1">Retention</div>
<div class="text-2xl font-bold text-white mb-1">Manual → Auto</div>
<div class="text-white/50">S3 archival (7 years)</div>
</div>
</div>

<div class="mt-3 p-3 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-xl border border-purple-500/30 text-center">
<div class="text-sm font-semibold text-purple-300">Solution: All 8 hooks log to JSON Lines, Stop hook archives to S3</div>
</div>
</div>
</div>

---

<!-- SLIDE: SOC 2 Security Enforcement -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🚀 Real-World Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
</div>
<span class="text-white/40 text-xs ml-1">2 of 3</span>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Use Case 2: SOC 2 Security Enforcement</div>
<div class="text-sm text-gray-400">SaaS company needs proof that dangerous operations are prevented before execution — manual review catches violations after-the-fact</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-4 mb-4">
<div class="p-4 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
<div class="text-sm font-bold text-red-300 mb-2">❌ Before: Post-Incident Detection</div>
<div class="text-xs space-y-2 text-white/70">
<div>• Manual review after violations</div>
<div>• Not acceptable for SOC 2 audit</div>
<div>• No preventive enforcement</div>
<div>• 3 security incidents per year</div>
<div>• 40 hours/year auditor time</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
<div class="text-sm font-bold text-green-300 mb-2">✅ After: Real-Time Prevention</div>
<div class="text-xs space-y-2 text-white/70">
<div>• PreToolUse hook denies before execution</div>
<div>• Automated violation log for audit</div>
<div>• Preventive enforcement (deny + log)</div>
<div>• 0 security incidents (blocked)</div>
<div>• 5 hours/year (automated reports)</div>
</div>
</div>
</div>

<div class="grid grid-cols-4 gap-3 text-xs">
<div class="p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
<div class="font-bold text-purple-300 mb-1">Detection</div>
<div class="text-lg font-bold text-white mb-1">Post → Real-time</div>
<div class="text-white/50">Preventive control</div>
</div>
<div class="p-3 bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-xl border border-pink-500/30">
<div class="font-bold text-pink-300 mb-1">Audit Cost</div>
<div class="text-lg font-bold text-white mb-1">40 hrs → 5 hrs</div>
<div class="text-white/50">87% reduction</div>
</div>
<div class="p-3 bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-xl border border-rose-500/30">
<div class="font-bold text-rose-300 mb-1">Incidents</div>
<div class="text-lg font-bold text-white mb-1">3/yr → 0</div>
<div class="text-white/50">100% prevention</div>
</div>
<div class="p-3 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-orange-500/30">
<div class="font-bold text-red-300 mb-1">Evidence</div>
<div class="text-lg font-bold text-white mb-1">Manual → Auto</div>
<div class="text-white/50">Violation logs</div>
</div>
</div>

<div class="mt-3 p-3 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-xl border border-purple-500/30 text-center">
<div class="text-sm font-semibold text-purple-300">Solution: PreToolUse hook blocks dangerous operations (rm -rf, sudo, DROP TABLE) with automated violation logging</div>
</div>
</div>
</div>

---

<!-- SLIDE: Quality Gates with Shift-Left Enforcement -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🚀 Real-World Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-white/20"></div>
  <div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
</div>
<span class="text-white/40 text-xs ml-1">3 of 3</span>
</div>
<div class="relative z-10 mb-3">
<div class="text-lg font-bold text-white mb-1">Use Case 3: Multi-Tenant SaaS Quality Gates</div>
<div class="text-sm text-gray-400">Agent-generated code averaging 15 linting violations per PR — rework cycles cost 30-45 minutes per violation (7.5 hours per sprint)</div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-4 mb-4">
<div class="p-4 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
<div class="text-sm font-bold text-red-300 mb-2">❌ Before: CI-Only Validation</div>
<div class="text-xs space-y-2 text-white/70">
<div>• 15 linting violations per PR</div>
<div>• Caught in CI pipeline (too late)</div>
<div>• 7.5 hours/sprint rework time</div>
<div>• 3 rework rounds average</div>
<div>• Developer frustration</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
<div class="text-sm font-bold text-green-300 mb-2">✅ After: Shift-Left with PreToolUse</div>
<div class="text-xs space-y-2 text-white/70">
<div>• 0 violations (blocked at creation)</div>
<div>• PreToolUse runs linter before commit</div>
<div>• 0 hours rework (standards enforced)</div>
<div>• 1 round (immediate feedback)</div>
<div>• Improved developer experience</div>
</div>
</div>
</div>

<div class="grid grid-cols-4 gap-3 text-xs">
<div class="p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
<div class="font-bold text-purple-300 mb-1">Rework Time</div>
<div class="text-lg font-bold text-white mb-1">7.5 hrs → 0</div>
<div class="text-white/50">100% eliminated</div>
</div>
<div class="p-3 bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-xl border border-pink-500/30">
<div class="font-bold text-pink-300 mb-1">Rework Rounds</div>
<div class="text-lg font-bold text-white mb-1">3 → 1</div>
<div class="text-white/50">67% reduction</div>
</div>
<div class="p-3 bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-xl border border-rose-500/30">
<div class="font-bold text-rose-300 mb-1">CI Failures</div>
<div class="text-lg font-bold text-white mb-1">15/sprint → 0</div>
<div class="text-white/50">Zero lint failures</div>
</div>
<div class="p-3 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-orange-500/30">
<div class="font-bold text-red-300 mb-1">Experience</div>
<div class="text-lg font-bold text-white mb-1">Frustration → Fast</div>
<div class="text-white/50">Immediate feedback</div>
</div>
</div>

<div class="mt-3 p-3 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-xl border border-purple-500/30 text-center">
<div class="text-sm font-semibold text-purple-300">Solution: PreToolUse hook runs ESLint before file edits — denies non-compliant code at creation, not in CI</div>
</div>
</div>
</div>

---

<!-- SLIDE: What You Can Do Today -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">✅ What You Can Do Today</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0 overflow-auto">
<div class="grid grid-cols-2 gap-4 mb-4">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-3">⚡ Immediate Actions (15 minutes)</div>
<div class="text-xs space-y-2 text-white/70">
<div>☐ Review official hooks documentation</div>
<div>☐ Create `.github/hooks/` directory in test repo</div>
<div>☐ Copy example security-check script</div>
<div>☐ Try `/hooks` slash command in VS Code</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-3">🚀 Short-Term (1-2 hours)</div>
<div class="text-xs space-y-2 text-white/70">
<div>☐ Deploy security enforcement hooks</div>
<div>☐ Set up SessionStart context injection</div>
<div>☐ Test locally: `echo '{...}' | ./security-check.sh`</div>
<div>☐ Verify PreToolUse successfully denies dangerous ops</div>
</div>
</div>
</div>

<div class="p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/30 mb-4">
<div class="text-sm font-bold text-indigo-300 mb-3">🎯 Advanced Exploration (2-4 hours)</div>
<div class="grid grid-cols-2 gap-3 text-xs text-white/70">
<div>☐ Implement complete audit trail (all 8 hooks)</div>
<div>☐ Use SubagentStart/Stop for nested tracking</div>
<div>☐ Use Stop hook to enforce test suite execution</div>
<div>☐ Integrate with Slack / Datadog / PagerDuty</div>
<div>☐ Add environment-aware policies (prod/staging/dev)</div>
<div>☐ Set up query dashboards for metrics</div>
</div>
</div>

<div class="grid grid-cols-3 gap-3 text-xs">
<div class="p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30 text-center">
<div class="text-lg mb-1">📖</div>
<div class="font-semibold text-purple-300">Next: Terminal Sandboxing</div>
<div class="text-white/50 text-[10px] mt-1">OS-level execution controls</div>
</div>
<div class="p-3 bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-xl border border-pink-500/30 text-center">
<div class="text-lg mb-1">💬</div>
<div class="font-semibold text-pink-300">Share with Security Team</div>
<div class="text-white/50 text-[10px] mt-1">Get compliance buy-in</div>
</div>
<div class="p-3 bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-xl border border-red-500/30 text-center">
<div class="text-lg mb-1">🚀</div>
<div class="font-semibold text-rose-300">Expand Org-Wide</div>
<div class="text-white/50 text-[10px] mt-1">Centralized hook policies</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: References & Resources -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📚 References & Resources</span>
<div class="flex-1 h-px bg-gradient-to-r from-indigo-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0 overflow-auto">
<div class="grid grid-cols-2 gap-6">
<div class="space-y-4">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-3">📖 Primary Documentation</div>
<div class="space-y-2 text-xs text-white/80">
<div>
<a href="https://code.visualstudio.com/docs/copilot/customization/hooks" class="text-cyan-400 hover:underline">Agent Hooks in VS Code</a>
<div class="text-white/50 text-[10px] mt-0.5">Complete configuration reference, input/output formats</div>
</div>
<div>
<a href="https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks" class="text-cyan-400 hover:underline">About Copilot Hooks</a>
<div class="text-white/50 text-[10px] mt-0.5">Core concepts and hook types</div>
</div>
<div>
<a href="https://docs.github.com/en/copilot/reference/hooks-configuration" class="text-cyan-400 hover:underline">Hooks Configuration Reference</a>
<div class="text-white/50 text-[10px] mt-0.5">Complete JSON schema and script examples</div>
</div>
<div>
<a href="https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks" class="text-cyan-400 hover:underline">Using Hooks with Coding Agent</a>
<div class="text-white/50 text-[10px] mt-0.5">Step-by-step implementation guide</div>
</div>
</div>
</div>

<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-3">🔗 Related Patterns</div>
<div class="space-y-2 text-xs text-white/80">
<div>
<span class="text-blue-400 font-semibold">Terminal Sandboxing</span>
<div class="text-white/50 text-[10px] mt-0.5">OS-level execution controls (network/filesystem restrictions)</div>
</div>
<div>
<span class="text-blue-400 font-semibold">Custom Instructions</span>
<div class="text-white/50 text-[10px] mt-0.5">Define agent behavior that hooks enforce through validation</div>
</div>
<div>
<span class="text-blue-400 font-semibold">Agent Skills</span>
<div class="text-white/50 text-[10px] mt-0.5">Domain-specific capabilities with hook-based audit trails</div>
</div>
<div>
<span class="text-blue-400 font-semibold">Enterprise Patterns</span>
<div class="text-white/50 text-[10px] mt-0.5">Organization-wide governance frameworks using hooks at scale</div>
</div>
</div>
</div>
</div>

<div class="space-y-4">
<div class="p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/30">
<div class="text-sm font-bold text-indigo-300 mb-3">💡 Key Insights</div>
<div class="space-y-2 text-xs text-white/70">
<div class="flex items-start gap-2">
<div class="text-indigo-400 mt-0.5">•</div>
<div><span class="text-white font-semibold">PreToolUse is uniquely powerful</span> — only hook that can deny operations before execution</div>
</div>
<div class="flex items-start gap-2">
<div class="text-indigo-400 mt-0.5">•</div>
<div><span class="text-white font-semibold">JSON Lines = queryable audit</span> — append-safe, direct jq filtering, tool compatibility</div>
</div>
<div class="flex items-start gap-2">
<div class="text-indigo-400 mt-0.5">•</div>
<div><span class="text-white font-semibold">Context injection scales agents</span> — SessionStart provides project info without manual setup</div>
</div>
<div class="flex items-start gap-2">
<div class="text-indigo-400 mt-0.5">•</div>
<div><span class="text-white font-semibold">Deny-by-default security</span> — safer than allow-with-filtering; use "ask" for edge cases</div>
</div>
<div class="flex items-start gap-2">
<div class="text-indigo-400 mt-0.5">•</div>
<div><span class="text-white font-semibold">Fast synchronous validation</span> — keep hooks &lt;5 seconds to avoid degrading responsiveness</div>
</div>
</div>
</div>

<div class="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
<div class="text-sm font-bold text-purple-300 mb-3">🛠️ Example Implementations</div>
<div class="text-xs text-white/70 space-y-2">
<div>
<span class="text-purple-400 font-mono">security-check.sh</span> — Block dangerous commands, privilege escalation, database drops
</div>
<div>
<span class="text-purple-400 font-mono">audit-hooks.json</span> — Complete lifecycle logging to JSON Lines with S3 archival
</div>
<div>
<span class="text-purple-400 font-mono">environment-aware.sh</span> — Production denial, staging approval, dev permissive
</div>
<div>
<span class="text-purple-400 font-mono">inject-context.sh</span> — SessionStart hook provides project metadata, branch, versions
</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Thank You -->
<div class="h-full flex flex-col items-center justify-center relative overflow-hidden px-14 py-12">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/25 via-blue-900/15 to-indigo-900/20"></div>
<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>

<div class="relative z-10 text-center mb-8">
<div class="relative inline-block mb-6">
<div class="absolute inset-0 blur-2xl opacity-40">
<img src="./sdp-logo.png" class="w-48" alt="" />
</div>
<img src="./sdp-logo.png" class="w-48 relative" alt="SDP Logo" />
</div>
<h1 class="!text-4xl !font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">Thank You</h1>
<div class="text-lg text-white/70">Governance without velocity loss — preventive control at the moment of action</div>
</div>

<div class="relative z-10 grid grid-cols-3 gap-6 max-w-4xl mb-8">
<div class="p-5 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-xl border border-cyan-500/40 text-center">
<div class="text-3xl font-bold text-cyan-300 mb-2">8</div>
<div class="text-sm text-white/80">Lifecycle Events</div>
<div class="text-xs text-white/50 mt-1">Complete control coverage</div>
</div>
<div class="p-5 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-xl border border-blue-500/40 text-center">
<div class="text-3xl font-bold text-blue-300 mb-2">1</div>
<div class="text-sm text-white/80">Preventive Hook</div>
<div class="text-xs text-white/50 mt-1">PreToolUse — deny before damage</div>
</div>
<div class="p-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl border border-indigo-500/40 text-center">
<div class="text-3xl font-bold text-indigo-300 mb-2">100%</div>
<div class="text-sm text-white/80">Audit Coverage</div>
<div class="text-xs text-white/50 mt-1">JSON Lines for compliance</div>
</div>
</div>

<div class="relative z-10 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
</div>

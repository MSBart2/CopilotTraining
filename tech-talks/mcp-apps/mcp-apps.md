---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## MCP Apps: Rich Interactive UI in Chat
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: MCP Apps - Rich Interactive UI in Chat
module: tech-talks/mcp-apps
mdc: true
status: archived
updated: 2026-02-01
---

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
<div class="relative z-10">
<div class="absolute inset-0 blur-2xl opacity-50"><img src="./sdp-logo.png" class="w-64" alt="" /></div>
<img src="./sdp-logo.png" class="w-64 relative" alt="SDP Logo" />
</div>
<h1 class="!text-5xl !font-bold !mt-8 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent relative z-10">MCP Apps</h1>
<div class="mt-4 relative z-10">
<span class="px-6 py-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xl font-medium shadow-lg shadow-purple-500/25">Rich Interactive UI in Chat</span>
</div>
<div class="mt-8 text-lg opacity-70 relative z-10">Eliminate context-switching · Transform chat into visual workspace</div>
<div class="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full relative z-10"></div>
</div>

<div class="abs-br m-6 flex gap-2">
<span class="text-sm opacity-50">Tech Talk · 40 minutes</span>
</div>

---

<!-- SLIDE: The Core Question -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔓 The Core Question</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30 max-w-4xl mx-auto">
<div class="text-2xl font-bold text-purple-300 mb-4">
"How do I create interactive visualizations and UI components within chat instead of exporting data to external tools?"
</div>
</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm">
<div class="p-4 bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-lg border border-amber-500/30">
<div class="text-xl mb-2">📊</div>
<div class="font-semibold text-amber-300">Data Trapped in Text</div>
<div class="text-xs opacity-80 mt-1">Charts and tables rendered as ASCII or markdown—hard to read, impossible to interact with</div>
</div>
<div class="p-4 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg border border-orange-500/30">
<div class="text-xl mb-2">🔄</div>
<div class="font-semibold text-orange-300">Context-Switch Overhead</div>
<div class="text-xs opacity-80 mt-1">Copy data to spreadsheets, export to tools, rebuild charts manually—5-10 minute detour per query</div>
</div>
<div class="p-4 bg-gradient-to-br from-red-900/30 to-purple-900/30 rounded-lg border border-red-500/30">
<div class="text-xl mb-2">❌</div>
<div class="font-semibold text-red-300">No Inline Exploration</div>
<div class="text-xs opacity-80 mt-1">Can't click, filter, sort, or drill down without new prompts and external tools</div>
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
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📖 Table of Contents</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
<div @click="$nav.go(4)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl border-2 border-purple-500/50 hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/10">
<div class="text-3xl mb-2">🎨</div>
<div class="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Component Types</div>
<div class="text-sm text-gray-300 mt-1">5 built-in interactive components</div>
<div class="text-xs text-purple-400/70 mt-2">Charts, tables, forms, trees, cards—rendered directly in chat</div>
</div>
</div>
<div @click="$nav.go(11)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl border-2 border-blue-500/50 hover:border-blue-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/10">
<div class="text-3xl mb-2">🏗️</div>
<div class="text-lg font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Building MCP Apps</div>
<div class="text-sm text-gray-300 mt-1">MCP server implementation</div>
<div class="text-xs text-blue-400/70 mt-2">Return component specs, handle callbacks, configure servers</div>
</div>
</div>
<div @click="$nav.go(14)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-cyan-900/40 to-teal-900/40 rounded-xl border-2 border-cyan-500/50 hover:border-cyan-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/10">
<div class="text-3xl mb-2">📊</div>
<div class="text-lg font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">Real-World Patterns</div>
<div class="text-sm text-gray-300 mt-1">Proven use cases with metrics</div>
<div class="text-xs text-cyan-400/70 mt-2">Dashboards, drill-down, forms, navigation—15-20 min → 90 sec</div>
</div>
</div>
<div @click="$nav.go(18)" class="cursor-pointer group">
<div class="p-5 bg-gradient-to-br from-teal-900/40 to-green-900/40 rounded-xl border-2 border-teal-500/50 hover:border-teal-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/10">
<div class="text-3xl mb-2">🔗</div>
<div class="text-lg font-bold bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">Integration</div>
<div class="text-sm text-gray-300 mt-1">Agents, skills, and memory</div>
<div class="text-xs text-teal-400/70 mt-2">Combine with custom agents for visualization workflows</div>
</div>
</div>
</div>

<div class="mt-6 text-center text-sm opacity-60">Click any section to jump directly there</div>
</div>
</div>

---

<!-- SLIDE: Part 1 — Component Types -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/25 via-blue-900/15 to-cyan-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-full border border-purple-400/30 text-purple-300 text-sm font-medium tracking-widest uppercase">Part 1</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-purple-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent leading-tight">Component Types</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">5 built-in interactive components for rich UI</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-purple-900/30 rounded-xl border border-purple-500/30">
<div class="text-2xl mb-1">📊</div>
<div class="text-purple-300 font-semibold">Charts & Tables</div>
<div class="text-xs opacity-70 mt-1">Interactive visualization with hover, sort, filter</div>
</div>
<div class="px-4 py-3 bg-blue-900/30 rounded-xl border border-blue-500/30">
<div class="text-2xl mb-1">📝</div>
<div class="text-blue-300 font-semibold">Forms & Trees</div>
<div class="text-xs opacity-70 mt-1">Structured input collection and hierarchical navigation</div>
</div>
<div class="px-4 py-3 bg-cyan-900/30 rounded-xl border border-cyan-500/30">
<div class="text-2xl mb-1">🎴</div>
<div class="text-cyan-300 font-semibold">Cards & Custom</div>
<div class="text-xs opacity-70 mt-1">Rich visual blocks and specialized components</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">Chat transforms from text stream to visual workspace</span><br />
<span class="text-purple-300 mt-1 block">↳ all without leaving the conversation</span>
</div>
</div>
</div>

---

<!-- SLIDE: Charts: Data Visualization -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎨 Component Types</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
</div>
<span class="text-white/40 text-xs ml-1">1 of 5</span>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Charts: Interactive Data Visualization</div>
<div class="text-xs text-white/50">Bar, line, pie, scatter, area—rendered with full hover, zoom, and drill-down</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col">
<div class="flex-1 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/40 p-4 overflow-auto">
<div class="text-xs font-mono text-purple-300 mb-2">Component Specification</div>
<pre class="text-xs text-white/80 whitespace-pre-wrap"><code>{
  type: "component",
  component: {
    type: "chart",
    chartType: "bar",
    title: "Monthly Revenue Trend",
    data: [
      { label: "Jan", value: 45000 },
      { label: "Feb", value: 52000 },
      { label: "Mar", value: 61000 }
    ],
    options: {
      interactive: true,
      colors: ["#4CAF50"],
      showLegend: true
    }
  }
}</code></pre>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">✨ Capabilities</div>
<ul class="text-xs text-white/80 space-y-1">
<li>• Hover tooltips with exact values</li>
<li>• 5 chart types: bar, line, pie, scatter, area</li>
<li>• Custom color palettes</li>
<li>• Responsive to chat panel width</li>
</ul>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">🎯 Use When</div>
<div class="text-xs text-white/80">Time-series data, comparisons, distributions, trends—anything naturally visual</div>
</div>
<div class="p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/40">
<div class="text-xs font-bold text-green-300">Before: 180-line markdown table → Excel → 12 minutes</div>
<div class="text-xs text-white/70 mt-1">After: Interactive chart in chat → 45 seconds</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Tables: Interactive Data Grids -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎨 Component Types</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
</div>
<span class="text-white/40 text-xs ml-1">2 of 5</span>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Tables: Sortable, Filterable Data Grids</div>
<div class="text-xs text-white/50">Full-text search, pagination, CSV export—handle datasets with 100s of rows</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col">
<div class="flex-1 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/40 p-4 overflow-auto">
<div class="text-xs font-mono text-purple-300 mb-2">Component Specification</div>
<pre class="text-xs text-white/80 whitespace-pre-wrap"><code>{
  type: "component",
  component: {
    type: "table",
    title: "Active Users",
    columns: [
      { key: "name", label: "Name", 
        sortable: true },
      { key: "role", label: "Role", 
        filterable: true },
      { key: "lastActive", 
        label: "Last Active", 
        sortable: true, type: "date" }
    ],
    data: [...],
    options: {
      pagination: true,
      pageSize: 10,
      searchable: true,
      exportable: true
    }
  }
}</code></pre>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">✨ Capabilities</div>
<ul class="text-xs text-white/80 space-y-1">
<li>• Click column headers to sort</li>
<li>• Dropdown filters for columns</li>
<li>• Full-text search across all columns</li>
<li>• Pagination (10/25/50/100 per page)</li>
<li>• CSV export button</li>
</ul>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">🎯 Use When</div>
<div class="text-xs text-white/80">Displaying >20 rows where users need to find, sort, or filter records inline</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Forms: Structured Input Collection -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎨 Component Types</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
</div>
<span class="text-white/40 text-xs ml-1">3 of 5</span>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Forms: Collect Validated User Input</div>
<div class="text-xs text-white/50">Type-aware fields with validation, submit callbacks trigger MCP tool calls</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="flex-1 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/40 p-4 overflow-auto">
<div class="text-xs font-mono text-purple-300 mb-2">Form with Validation</div>
<pre class="text-xs text-white/80 whitespace-pre-wrap"><code>fields: [
  {
    name: "username",
    type: "text",
    required: true,
    pattern: "^[a-zA-Z0-9_]{3,20}$",
    errorMessage: "3-20 chars only"
  },
  {
    name: "email",
    type: "email",
    required: true
  },
  {
    name: "role",
    type: "select",
    options: ["Admin", "Editor"],
    default: "Editor"
  }
],
submitLabel: "Create User",
onSubmit: "create-user-action"</code></pre>
</div>
<div class="p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/40">
<div class="text-xs font-bold text-green-300">Before: 20-min Slack thread → Manual setup</div>
<div class="text-xs text-white/70 mt-1">After: 3-min form submission, 100% accuracy</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">✨ Field Types</div>
<ul class="text-xs text-white/80 space-y-1">
<li>• Text, email, number inputs</li>
<li>• Select dropdowns, radio buttons</li>
<li>• Checkboxes, textareas</li>
<li>• Pattern validation, required fields</li>
<li>• Inline error messages</li>
</ul>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">🔄 Workflow</div>
<div class="text-xs text-white/80 space-y-1">
<div>1. Tool returns form component</div>
<div>2. User fills form, clicks submit</div>
<div>3. VS Code calls MCP tool with data</div>
<div>4. Tool processes, returns confirmation</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/30">
<div class="text-sm font-bold text-indigo-300 mb-2">🎯 Use When</div>
<div class="text-xs text-white/80">Multi-field structured input with validation requirements (scaffolding, config collection)</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Trees & Cards -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎨 Component Types</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
</div>
<span class="text-white/40 text-xs ml-1">4 of 5</span>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Trees & Cards: Navigation and Rich Blocks</div>
<div class="text-xs text-white/50">Hierarchical navigation with expand/collapse • Rich visual cards with actions</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/40">
<div class="text-sm font-bold text-purple-300 mb-2">🌳 Trees: Hierarchical Navigation</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• Expandable tree views for nested data</li>
<li>• File-type or custom icons</li>
<li>• Click to trigger MCP tool callbacks</li>
<li>• Lazy loading for children nodes</li>
<li>• Control default expansion state</li>
</ul>
<div class="mt-3 p-2 bg-blue-900/40 rounded border border-blue-500/30">
<div class="text-xs font-bold text-blue-300">Use when:</div>
<div class="text-xs text-white/70 mt-1">File systems, org charts, nested categories</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">Example: Project Files</div>
<pre class="text-xs text-white/80 mt-2"><code>📁 src/
  ├─ index.ts
  ├─ 📁 components/
  │   ├─ Button.tsx
  │   └─ Input.tsx
  └─ 📁 utils/
      └─ helpers.ts
📄 package.json</code></pre>
<div class="text-xs text-white/70 mt-2">Click any file → shows metadata + preview</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-lg border border-blue-500/40">
<div class="text-sm font-bold text-blue-300 mb-2">🎴 Cards: Rich Visual Blocks</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• Grid, list, or carousel layouts</li>
<li>• Title, subtitle, description, image, badges</li>
<li>• Multiple action buttons per card</li>
<li>• Responsive to container width</li>
</ul>
<div class="mt-3 p-2 bg-indigo-900/40 rounded border border-indigo-500/30">
<div class="text-xs font-bold text-indigo-300">Use when:</div>
<div class="text-xs text-white/70 mt-1">Product selection, service tiers, portfolios, galleries</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/30">
<div class="text-sm font-bold text-indigo-300 mb-2">Example: Plan Selection</div>
<div class="text-xs text-white/80 space-y-2 mt-2">
<div class="p-2 bg-purple-900/30 rounded border border-purple-500/20">
<div class="font-semibold">Premium Plan · $29/mo</div>
<div class="text-xs opacity-70 mt-1">Unlimited projects, 24/7 support</div>
<div class="mt-1.5 inline-block px-2 py-0.5 bg-blue-600/80 rounded text-xs">Select Plan</div>
</div>
<div class="text-xs opacity-60">↑ Interactive cards with action buttons</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Custom Components -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎨 Component Types</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-white/20"></div>
<div class="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"></div>
</div>
<span class="text-white/40 text-xs ml-1">5 of 5</span>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Custom Components: Maximum Flexibility</div>
<div class="text-xs text-white/50">Sandboxed HTML/CSS/JavaScript for specialized visualizations beyond built-in types</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col">
<div class="flex-1 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/40 p-4 overflow-auto">
<div class="text-xs font-mono text-purple-300 mb-2">Custom Component Spec</div>
<pre class="text-xs text-white/80 whitespace-pre-wrap"><code>{
  type: "component",
  component: {
    type: "custom",
    html: `
      &lt;div class="flame-graph"&gt;
        &lt;h3&gt;Performance Flame Graph&lt;/h3&gt;
        &lt;canvas id="flame-canvas"&gt;&lt;/canvas&gt;
      &lt;/div&gt;
    `,
    css: `
      .flame-graph {
        padding: 16px;
        background: var(--vscode-editor-bg);
      }
    `,
    script: `
      const canvas = 
        document.getElementById('flame-canvas');
      drawFlameGraph(canvas, data);
    `,
    sandbox: true
  }
}</code></pre>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">🔒 Security Constraints</div>
<ul class="text-xs text-white/80 space-y-1">
<li>• Sandboxed iframe execution</li>
<li>• No access to VS Code APIs</li>
<li>• CSP restrictions apply</li>
<li>• Use VS Code CSS variables for theming</li>
</ul>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">🎯 Use When</div>
<div class="text-xs text-white/80">Built-in components don't meet specialized visualization needs (flame graphs, network diagrams, heatmaps)</div>
</div>
<div class="p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/30">
<div class="text-sm font-bold text-indigo-300 mb-2">💡 Best Practice</div>
<div class="text-xs text-white/80">Always use <code class="text-purple-300">sandbox: true</code> and VS Code theme variables for consistency and security</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Mental Model Shift -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💡 Mental Model Shift</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 min-h-0">
<div class="p-5 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl border border-purple-500/40 mb-6 max-w-4xl mx-auto">
<div class="text-xl font-bold text-purple-300 mb-2">Core Insight</div>
<div class="text-base text-white/90">From "chat yields text that I visualize elsewhere" to "chat yields interactive visualizations I explore inline"</div>
</div>

<div class="grid grid-cols-2 gap-4 text-sm">
<div>
<div class="text-base font-bold text-green-400 mb-3">✅ Move Toward (Embrace These)</div>
<div class="space-y-2">
<div class="p-3 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
<div class="font-semibold text-green-300">Component-First Responses</div>
<div class="text-xs opacity-80 mt-1">Return UI components for visual data, not markdown tables—users explore without leaving chat</div>
</div>
<div class="p-3 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
<div class="font-semibold text-green-300">Progressive Disclosure</div>
<div class="text-xs opacity-80 mt-1">Show summary visualizations first, enable drill-down through interactions</div>
</div>
<div class="p-3 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
<div class="font-semibold text-green-300">Callback-Driven Updates</div>
<div class="text-xs opacity-80 mt-1">Form submissions and tree selections trigger new MCP tool calls—stateful workflows within chat</div>
</div>
</div>
</div>
<div>
<div class="text-base font-bold text-red-400 mb-3">⚠️ Move Away From (Retire These)</div>
<div class="space-y-2">
<div class="p-3 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg border border-orange-500/30">
<div class="font-semibold text-orange-300">ASCII Art Charts</div>
<div class="text-xs opacity-80 mt-1">Rendering bar charts with █ characters—unreadable beyond toy examples, no interactivity</div>
</div>
<div class="p-3 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg border border-orange-500/30">
<div class="font-semibold text-orange-300">"Export to CSV" Workflows</div>
<div class="text-xs opacity-80 mt-1">Instructing users to copy data and visualize externally—5-10 minute context-switch per query</div>
</div>
<div class="p-3 bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-lg border border-red-500/30">
<div class="font-semibold text-red-300">Massive Markdown Tables</div>
<div class="text-xs opacity-80 mt-1">Returning 500-row tables as text—exceeds context window, unreadable, endless scrolling</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Part 2 — Building MCP Apps -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-cyan-900/15 to-teal-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 rounded-full border border-blue-400/30 text-blue-300 text-sm font-medium tracking-widest uppercase">Part 2</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent leading-tight">Building MCP Apps</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">MCP server implementation that returns component specs</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-blue-900/30 rounded-xl border border-blue-500/30">
<div class="text-2xl mb-1">⚙️</div>
<div class="text-blue-300 font-semibold">Server Structure</div>
<div class="text-xs opacity-70 mt-1">MCP server with tools that return components</div>
</div>
<div class="px-4 py-3 bg-cyan-900/30 rounded-xl border border-cyan-500/30">
<div class="text-2xl mb-1">🔄</div>
<div class="text-cyan-300 font-semibold">Callback Handling</div>
<div class="text-xs opacity-70 mt-1">Forms and trees trigger MCP tool calls</div>
</div>
<div class="px-4 py-3 bg-teal-900/30 rounded-xl border border-teal-500/30">
<div class="text-2xl mb-1">🔧</div>
<div class="text-teal-300 font-semibold">VS Code Config</div>
<div class="text-xs opacity-70 mt-1">Add to .vscode/mcp.json, restart server</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">Return <code class="text-cyan-300">type: "component"</code> instead of text</span><br />
<span class="text-blue-300 mt-1 block">↳ VS Code detects type and renders accordingly</span>
</div>
</div>
</div>

---

<!-- SLIDE: MCP Server Structure -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🏗️ Building MCP Apps</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Basic MCP Server Structure</div>
<div class="text-xs text-white/50">MCP server with tools that return component specifications instead of text</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-5 gap-3">
<div class="col-span-3 flex flex-col">
<div class="flex-1 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/40 p-4 overflow-auto">
<div class="text-xs font-mono text-blue-300 mb-2">src/index.ts</div>
<pre class="text-xs text-white/80 whitespace-pre-wrap"><code>import { Server } from "@modelcontextprotocol/sdk";
&#8203;
const server = new Server({
  name: "my-mcp-app",
  version: "1.0.0"
}, {
  capabilities: { tools: {} }
});
&#8203;
// Define tool that returns chart component
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "show-metrics",
    description: "Display project metrics as charts",
    inputSchema: {
      type: "object",
      properties: {
        timeRange: { type: "string", 
          enum: ["day", "week", "month"] }
      }
    }
  }]
}));
&#8203;
server.setRequestHandler("tools/call", async (req) => {
  if (req.params.name === "show-metrics") {
    const data = await fetchMetrics(req.params.arguments);
&#8203;
    return {
      content: [{
        type: "component",  // ← Key: component not text
        component: {
          type: "chart",
          chartType: "line",
          title: `Metrics (${req.params.arguments.timeRange})`,
          data: data,
          options: { interactive: true }
        }
      }]
    };
  }
});
&#8203;
await server.connect(new StdioServerTransport());</code></pre>
</div>
</div>
<div class="col-span-2 flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">🔑 Key Points</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• Return <code class="text-cyan-300">type: "component"</code> in content array</li>
<li>• Component spec includes <code class="text-cyan-300">type</code>, <code class="text-cyan-300">title</code>, <code class="text-cyan-300">data</code></li>
<li>• VS Code detects component type</li>
<li>• Renders interactive UI inline</li>
</ul>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">📋 Configuration</div>
<div class="text-xs text-white/80 space-y-1">
<div>Add to <code class="text-blue-300">.vscode/mcp.json</code>:</div>
<pre class="text-xs text-white/70 mt-2"><code>{
  "servers": {
    "my-app": {
      "type": "stdio",
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}</code></pre>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Callback Handling -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🏗️ Building MCP Apps</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Callback Handling: Forms & Trees</div>
<div class="text-xs text-white/50">User interactions trigger MCP tool calls for stateful multi-step workflows</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/40">
<div class="text-sm font-bold text-blue-300 mb-2">🔄 Workflow</div>
<div class="text-xs text-white/80 space-y-3">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
<div>Tool returns form component with <code class="text-cyan-300">onSubmit</code> callback</div>
</div>
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">2</div>
<div>User fills form and clicks submit</div>
</div>
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">3</div>
<div>VS Code calls specified MCP tool with form data</div>
</div>
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">4</div>
<div>Tool processes data and returns confirmation</div>
</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-cyan-900/30 to-teal-900/30 rounded-lg border border-cyan-500/30">
<div class="text-sm font-bold text-cyan-300 mb-2">✨ What This Enables</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• Multi-step guided processes</li>
<li>• Form validation before processing</li>
<li>• Tree node selection triggers details</li>
<li>• Chart click shows drill-down data</li>
<li>• Stateful workflows within chat</li>
</ul>
</div>
</div>
<div class="flex flex-col">
<div class="flex-1 bg-gradient-to-br from-teal-900/40 to-blue-900/40 rounded-lg border border-teal-500/40 p-4 overflow-auto">
<div class="text-xs font-mono text-teal-300 mb-2">Form with onSubmit Callback</div>
<pre class="text-xs text-white/80 whitespace-pre-wrap"><code>// Step 1: Return form
return {
  content: [{
    type: "component",
    component: {
      type: "form",
      title: "Create User",
      fields: [
        { name: "username", type: "text", required: true },
        { name: "email", type: "email", required: true }
      ],
      submitLabel: "Create",
      onSubmit: "process-user-creation"  // ← Callback
    }
  }]
};
&#8203;
// Step 2: Define callback tool
{
  name: "process-user-creation",
  description: "Process user creation from form",
  inputSchema: {
    type: "object",
    properties: {
      username: { type: "string" },
      email: { type: "string" }
    }
  }
}
&#8203;
// Step 3: Handle callback
if (req.params.name === "process-user-creation") {
  const { username, email } = req.params.arguments;
  await createUser(username, email);
&#8203;
  return {
    content: [{
      type: "text",
      text: `✅ User ${username} created!`
    }]
  };
}</code></pre>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Part 3 — Real-World Patterns -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/25 via-teal-900/15 to-green-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-green-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-cyan-600/40 to-teal-600/40 rounded-full border border-cyan-400/30 text-cyan-300 text-sm font-medium tracking-widest uppercase">Part 3</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 bg-clip-text text-transparent leading-tight">Real-World Patterns</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">Proven use cases with dramatic time savings</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-cyan-900/30 rounded-xl border border-cyan-500/30">
<div class="text-2xl mb-1">📊</div>
<div class="text-cyan-300 font-semibold">System Dashboards</div>
<div class="text-xs opacity-70 mt-1">15-20 min → 90 sec (10x faster)</div>
</div>
<div class="px-4 py-3 bg-teal-900/30 rounded-xl border border-teal-500/30">
<div class="text-2xl mb-1">🗃️</div>
<div class="text-teal-300 font-semibold">Database Results</div>
<div class="text-xs opacity-70 mt-1">10 min → 2 min per query (5x faster)</div>
</div>
<div class="px-4 py-3 bg-green-900/30 rounded-xl border border-green-500/30">
<div class="text-2xl mb-1">📝</div>
<div class="text-green-300 font-semibold">Scaffolding Forms</div>
<div class="text-xs opacity-70 mt-1">20 min → 3 min (100% accuracy)</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">Common patterns: dashboards, drill-down, forms, navigation</span><br />
<span class="text-cyan-300 mt-1 block">↳ eliminate external tools, explore data inline</span>
</div>
</div>
</div>

---

<!-- SLIDE: Use Case: System Metrics Dashboard -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-teal-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-teal-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 Real-World Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Use Case: System Metrics Dashboard</div>
<div class="text-xs text-white/50">DevOps team analyzing 12 microservices—from 15-20 minute workflow to 90 seconds</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-lg border border-red-500/40">
<div class="text-sm font-bold text-red-300 mb-2">❌ Before: Multi-Step Export</div>
<div class="text-xs text-white/80 space-y-2">
<div class="flex items-start gap-2">
<div class="text-red-400 font-bold">1.</div>
<div>Query Prometheus for metrics</div>
</div>
<div class="flex items-start gap-2">
<div class="text-red-400 font-bold">2.</div>
<div>Export results as CSV</div>
</div>
<div class="flex items-start gap-2">
<div class="text-red-400 font-bold">3.</div>
<div>Import to Grafana</div>
</div>
<div class="flex items-start gap-2">
<div class="text-red-400 font-bold">4.</div>
<div>Customize charts manually</div>
</div>
<div class="flex items-start gap-2">
<div class="text-red-400 font-bold">5.</div>
<div>Share screenshot with team</div>
</div>
</div>
<div class="mt-3 p-2 bg-orange-900/40 rounded border border-orange-500/30">
<div class="text-xs font-bold text-orange-300">⏱️ 15-20 minutes per analysis</div>
<div class="text-xs text-white/70 mt-1">Context-switching between 3 tools</div>
</div>
</div>
<div class="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/40">
<div class="text-sm font-bold text-green-300 mb-2">✅ After: MCP App Dashboard</div>
<div class="text-xs text-white/80 mb-3">Single chat query returns multi-component interactive dashboard</div>
<div class="p-3 bg-teal-900/40 rounded border border-teal-500/30">
<div class="text-xs font-mono text-teal-300 mb-2">User: "Show metrics for API service, last 24 hours"</div>
<div class="text-xs text-white/70 space-y-1 mt-2">
<div>→ MCP tool queries Prometheus</div>
<div>→ Returns 3 interactive components:</div>
<div class="ml-3">• CPU usage line chart</div>
<div class="ml-3">• Memory usage area chart</div>
<div class="ml-3">• Error logs table (sortable)</div>
</div>
</div>
<div class="mt-3 p-2 bg-green-900/40 rounded border border-green-500/30">
<div class="text-xs font-bold text-green-300">⚡ 90 seconds total</div>
<div class="text-xs text-white/70 mt-1">All inline, no tool-switching</div>
</div>
</div>
</div>
<div class="col-span-2 grid grid-cols-3 gap-3">
<div class="p-3 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
<div class="text-lg font-bold text-cyan-300">10x Faster</div>
<div class="text-xs text-white/70 mt-1">15-20 min → 90 sec per analysis</div>
</div>
<div class="p-3 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-lg font-bold text-blue-300">8x More Frequent</div>
<div class="text-xs text-white/70 mt-1">Team analyzes metrics 8x more often</div>
</div>
<div class="p-3 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/30">
<div class="text-lg font-bold text-indigo-300">40% Faster Detection</div>
<div class="text-xs text-white/70 mt-1">Issues caught and resolved earlier</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Use Case: Database Queries & Scaffolding -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-teal-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-teal-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 Real-World Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">More Proven Use Cases with Metrics</div>
<div class="text-xs text-white/50">Database query results and project scaffolding forms</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/40">
<div class="text-base font-bold text-cyan-300 mb-2">🗃️ Database Query Results</div>
<div class="text-xs text-white/80 mb-3">
<span class="font-semibold text-cyan-300">Problem:</span> Data analysts query production DB, receive 500-row result set as text, copy to Excel for sorting/filtering. 10 minutes per query × 30 queries/day.
</div>
<div class="p-3 bg-blue-900/40 rounded border border-blue-500/30 mb-2">
<div class="text-xs font-bold text-blue-300">Solution:</div>
<div class="text-xs text-white/70 mt-1">MCP App returns sortable, filterable, exportable table component—sort and search inline</div>
</div>
<div class="grid grid-cols-2 gap-2">
<div class="p-2 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded border border-red-500/30">
<div class="text-xs font-bold text-red-300">Before</div>
<div class="text-xs text-white/70 mt-1">10 min per query</div>
</div>
<div class="p-2 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded border border-green-500/30">
<div class="text-xs font-bold text-green-300">After</div>
<div class="text-xs text-white/70 mt-1">2 min per query</div>
</div>
</div>
<div class="mt-2 p-2 bg-green-900/40 rounded border border-green-500/30">
<div class="text-xs font-bold text-green-300">💰 Impact</div>
<div class="text-xs text-white/70 mt-1">240 minutes saved per day across 3-person team</div>
</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-teal-900/40 to-green-900/40 rounded-lg border border-teal-500/40">
<div class="text-base font-bold text-teal-300 mb-2">📝 Project Scaffolding Forms</div>
<div class="text-xs text-white/80 mb-3">
<span class="font-semibold text-teal-300">Problem:</span> Developers create new microservices monthly. Current: 20-minute Slack thread with infra team to answer config questions → Manual setup → Review.
</div>
<div class="p-3 bg-green-900/40 rounded border border-green-500/30 mb-2">
<div class="text-xs font-bold text-green-300">Solution:</div>
<div class="text-xs text-white/70 mt-1">MCP App form collects structured input with validation (service name, language, database, auth), generates scaffold on submit</div>
</div>
<div class="grid grid-cols-2 gap-2">
<div class="p-2 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded border border-red-500/30">
<div class="text-xs font-bold text-red-300">Before</div>
<div class="text-xs text-white/70 mt-1">20-min Slack thread</div>
</div>
<div class="p-2 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded border border-green-500/30">
<div class="text-xs font-bold text-green-300">After</div>
<div class="text-xs text-white/70 mt-1">3-min form submit</div>
</div>
</div>
<div class="mt-2 p-2 bg-green-900/40 rounded border border-green-500/30">
<div class="text-xs font-bold text-green-300">✅ 100% Accuracy</div>
<div class="text-xs text-white/70 mt-1">Validation prevents typos, devs self-serve without bottleneck</div>
</div>
</div>
</div>
</div>
<div class="col-span-2 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30">
<div class="text-sm font-bold text-purple-300 mb-2">🎯 Common Thread</div>
<div class="text-xs text-white/80">All three use cases eliminate external tool context-switching and enable inline exploration—data stays in chat, users iterate faster</div>
</div>
</div>

---

<!-- SLIDE: Pattern: Progressive Drill-Down -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-teal-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-teal-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 Real-World Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Pattern: Progressive Drill-Down</div>
<div class="text-xs text-white/50">Summary visualization → click for detailed data—no new prompt needed</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-500/40">
<div class="text-sm font-bold text-cyan-300 mb-2">📊 Step 1: Initial Chart</div>
<pre class="text-xs text-white/80 mt-2"><code>{
  type: "chart",
  chartType: "bar",
  title: "Sales by Region",
  data: regionSales,
  options: {
    interactive: true,
    onClick: "show-region-details"  // ← Callback
  }
}</code></pre>
<div class="mt-2 text-xs text-white/70">User sees high-level summary bar chart with 6 regions</div>
</div>
<div class="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/30">
<div class="text-sm font-bold text-blue-300 mb-2">🔍 Step 2: User Clicks Bar</div>
<div class="text-xs text-white/80 space-y-2">
<div>• User clicks "West" region bar</div>
<div>• VS Code calls <code class="text-blue-300">show-region-details</code> MCP tool</div>
<div>• Passes <code class="text-blue-300">{`{ region: "West" }`}</code> as arguments</div>
</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-lg border border-indigo-500/40">
<div class="text-sm font-bold text-indigo-300 mb-2">📋 Step 3: Detailed Table</div>
<pre class="text-xs text-white/80 mt-2"><code>// Callback returns detailed table
if (req.params.name === "show-region-details") {
  const { region } = req.params.arguments;
  const details = await fetchRegionDetails(region);
&#8203;
  return {
    content: [{
      type: "component",
      component: {
        type: "table",
        title: `${region} Sales Details`,
        columns: [
          { key: "product", label: "Product", 
            sortable: true },
          { key: "units", label: "Units Sold", 
            sortable: true },
          { key: "revenue", label: "Revenue", 
            sortable: true, type: "currency" }
        ],
        data: details,
        options: { sortable: true, exportable: true }
      }
    }]
  };
}</code></pre>
</div>
<div class="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
<div class="text-sm font-bold text-purple-300 mb-2">✨ Benefit</div>
<div class="text-xs text-white/80">Summary → Details without new prompt. Context preserved, no tool-switching. User explores data depth interactively.</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Part 4 — Integration -->

<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-teal-900/25 via-green-900/15 to-emerald-900/20"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 via-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
<div class="relative z-10 flex flex-col items-center text-center">
<div class="mb-4 px-4 py-1.5 bg-gradient-to-r from-teal-600/40 to-green-600/40 rounded-full border border-teal-400/30 text-teal-300 text-sm font-medium tracking-widest uppercase">Part 4</div>
<h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r from-teal-400 via-green-300 to-emerald-400 bg-clip-text text-transparent leading-tight">Integration</h1>
<h2 class="!text-2xl !font-normal !m-0 opacity-70 mb-6">Combining MCP Apps with agents, skills, and memory</h2>
<div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent mb-6"></div>
<div class="grid grid-cols-3 gap-3 text-sm max-w-3xl">
<div class="px-4 py-3 bg-teal-900/30 rounded-xl border border-teal-500/30">
<div class="text-2xl mb-1">🤖</div>
<div class="text-teal-300 font-semibold">Custom Agents</div>
<div class="text-xs opacity-70 mt-1">Agents leverage MCP Apps for visualization</div>
</div>
<div class="px-4 py-3 bg-green-900/30 rounded-xl border border-green-500/30">
<div class="text-2xl mb-1">🎯</div>
<div class="text-green-300 font-semibold">Agent Skills</div>
<div class="text-xs opacity-70 mt-1">Skills include MCP Apps tools in workflows</div>
</div>
<div class="px-4 py-3 bg-emerald-900/30 rounded-xl border border-emerald-500/30">
<div class="text-2xl mb-1">💾</div>
<div class="text-emerald-300 font-semibold">Copilot Memory</div>
<div class="text-xs opacity-70 mt-1">Store dashboard preferences for future queries</div>
</div>
</div>
<div class="mt-5 font-mono text-xs bg-gray-950/80 border border-gray-700/50 rounded-lg px-5 py-3 text-left max-w-xl">
<span class="text-gray-400">MCP Apps integrate seamlessly with VS Code features</span><br />
<span class="text-teal-300 mt-1 block">↳ visualization becomes first-class in agent workflows</span>
</div>
</div>
</div>

---

<!-- SLIDE: Integration with Custom Agents & Skills -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-green-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-teal-600/80 to-green-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔗 Integration</span>
<div class="flex-1 h-px bg-gradient-to-r from-teal-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Integration with Agents & Skills</div>
<div class="text-xs text-white/50">Custom agents and skills leverage MCP Apps for visualization workflows</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-teal-900/40 to-green-900/40 rounded-lg border border-teal-500/40">
<div class="text-sm font-bold text-teal-300 mb-2">🤖 With Custom Agents</div>
<div class="text-xs text-white/80 mb-3">Agents can leverage MCP Apps tools for visualization:</div>
<pre class="text-xs text-white/80 bg-green-900/30 p-2 rounded border border-green-500/30"><code>---
name: data-analyst
description: Analyzes data with interactive visualizations
tools: ['search', 'fetch', 'analytics-dashboard']
mcp-servers:
  - name: analytics-app
    tools: ['show-metrics', 'show-table', 'create-chart']
---
&#8203;
You are a data analyst that helps users explore data visually.
When presenting quantitative data, always use interactive charts
or tables from the analytics-app MCP server.</code></pre>
<div class="mt-2 p-2 bg-teal-900/40 rounded border border-teal-500/30">
<div class="text-xs font-bold text-teal-300">User: "Analyze last month's sales trends"</div>
<div class="text-xs text-white/70 mt-1">Agent: Calls <code class="text-teal-300">analytics-app.show-metrics</code> → Returns interactive line chart</div>
</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/40">
<div class="text-sm font-bold text-green-300 mb-2">🎯 With Agent Skills</div>
<div class="text-xs text-white/80 mb-3">Skills can include MCP Apps tools in their workflow:</div>
<pre class="text-xs text-white/80 bg-emerald-900/30 p-2 rounded border border-emerald-500/30"><code>---
name: code-review-reporter
description: Generates visual code review reports
tools: ['fs', 'git', 'review-dashboard/*']
---
&#8203;
# Code Review Reporter Skill
&#8203;
When generating code review reports:
&#8203;
1. Use `fs` to read changed files
2. Use `git` to fetch commit history
3. Use `review-dashboard/show-complexity` 
   to display complexity chart
4. Use `review-dashboard/show-coverage` 
   to display test coverage table
&#8203;
Always visualize quantitative metrics 
using MCP Apps components.</code></pre>
</div>
<div class="p-4 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-lg border border-emerald-500/30">
<div class="text-sm font-bold text-emerald-300 mb-2">💾 With Copilot Memory</div>
<div class="text-xs text-white/80 space-y-2">
<div><span class="font-semibold text-emerald-300">User:</span> "Remember that I prefer bar charts over pie charts"</div>
<div><span class="font-semibold text-emerald-300">Agent:</span> Stores preference in Copilot Memory</div>
<div class="mt-3 p-2 bg-teal-900/40 rounded border border-teal-500/30">
<div class="text-xs font-bold text-teal-300">Future queries:</div>
<div class="text-xs text-white/70 mt-1">"Show sales data" → Agent retrieves preference → Uses bar chart component</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Best Practices -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-green-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-teal-600/80 to-green-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔗 Integration</span>
<div class="flex-1 h-px bg-gradient-to-r from-teal-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Best Practices for MCP Apps</div>
<div class="text-xs text-white/50">Design, performance, and security guidelines</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-3 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-teal-900/40 to-green-900/40 rounded-lg border border-teal-500/40">
<div class="text-sm font-bold text-teal-300 mb-2">🎨 Design</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• <span class="font-semibold text-teal-300">Progressive disclosure:</span> Summary → Details on interaction</li>
<li>• <span class="font-semibold text-teal-300">Responsive layouts:</span> Adapt to chat panel width</li>
<li>• <span class="font-semibold text-teal-300">Theme awareness:</span> Use VS Code CSS variables</li>
<li>• <span class="font-semibold text-teal-300">Loading states:</span> Show skeleton/spinner for async data</li>
</ul>
</div>
<div class="p-3 bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg border border-green-500/30">
<div class="text-xs font-bold text-green-300">Example: Theme Variables</div>
<pre class="text-xs text-white/70 mt-1"><code>background: var(--vscode-editor-bg);
color: var(--vscode-foreground);</code></pre>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/40">
<div class="text-sm font-bold text-green-300 mb-2">⚡ Performance</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• <span class="font-semibold text-green-300">Paginate large datasets:</span> Don't render 10,000 rows at once</li>
<li>• <span class="font-semibold text-green-300">Lazy load images:</span> Load visible content first</li>
<li>• <span class="font-semibold text-green-300">Cache queries:</span> Server-side caching for repeated requests</li>
<li>• <span class="font-semibold text-green-300">Optimize re-renders:</span> Only update changed data</li>
</ul>
</div>
<div class="p-3 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-500/30">
<div class="text-xs font-bold text-emerald-300">Example: Pagination</div>
<pre class="text-xs text-white/70 mt-1"><code>options: {
  pagination: true,
  pageSize: 50  // Not 10,000
}</code></pre>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 rounded-lg border border-emerald-500/40">
<div class="text-sm font-bold text-emerald-300 mb-2">🔒 Security</div>
<ul class="text-xs text-white/80 space-y-1.5">
<li>• <span class="font-semibold text-emerald-300">Sandbox custom HTML:</span> Always use <code>sandbox: true</code></li>
<li>• <span class="font-semibold text-emerald-300">Validate inputs:</span> Sanitize form data before processing</li>
<li>• <span class="font-semibold text-emerald-300">Rate limit:</span> Prevent abuse of callback tools</li>
<li>• <span class="font-semibold text-emerald-300">No sensitive data in logs:</span> Scrub credentials from component specs</li>
</ul>
</div>
<div class="p-3 bg-gradient-to-br from-cyan-900/30 to-emerald-900/30 rounded-lg border border-cyan-500/30">
<div class="text-xs font-bold text-cyan-300">Security Model</div>
<div class="text-xs text-white/70 mt-1">Sandboxed iframes, CSP restrictions, explicit tool approvals</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: What You Can Do Today -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-green-900/10 to-transparent"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-teal-600/80 to-green-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">✅ What You Can Do Today</span>
<div class="flex-1 h-px bg-gradient-to-r from-teal-400/60 to-transparent"></div>
</div>
<div class="relative z-10 mb-4">
<div class="text-lg font-bold text-white mb-0.5">Immediate Next Steps</div>
<div class="text-xs text-white/50">Start with the playground, then build your first MCP App</div>
</div>
<div class="relative z-10 flex-1 min-h-0 grid grid-cols-3 gap-4">
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-teal-900/40 to-green-900/40 rounded-lg border border-teal-500/40">
<div class="text-sm font-bold text-teal-300 mb-2">⚡ Immediate Actions (15 min)</div>
<ul class="text-xs text-white/80 space-y-2">
<li class="flex items-start gap-2">
<span class="text-teal-300">☐</span>
<div>Install MCP Apps Playground from GitHub</div>
</li>
<li class="flex items-start gap-2">
<span class="text-teal-300">☐</span>
<div>Add to <code class="text-teal-300">.vscode/mcp.json</code> following setup instructions</div>
</li>
<li class="flex items-start gap-2">
<span class="text-teal-300">☐</span>
<div>Test: In chat, type <code class="text-teal-300">@mcp-apps-playground show me the chart demo</code></div>
</li>
</ul>
</div>
<div class="p-3 bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg border border-green-500/30">
<div class="text-xs font-bold text-green-300">🐙 Playground Repo</div>
<div class="text-xs text-white/70 mt-1">github.com/modelcontextprotocol/servers</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/40">
<div class="text-sm font-bold text-green-300 mb-2">🚀 Short-Term (1 hour)</div>
<ul class="text-xs text-white/80 space-y-2">
<li class="flex items-start gap-2">
<span class="text-green-300">☐</span>
<div>Identify one "export to CSV" workflow in your team</div>
</li>
<li class="flex items-start gap-2">
<span class="text-green-300">☐</span>
<div>Build MCP server returning table or chart component for that data source</div>
</li>
<li class="flex items-start gap-2">
<span class="text-green-300">☐</span>
<div>Test with 2-3 colleagues, measure time savings</div>
</li>
</ul>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 rounded-lg border border-emerald-500/40">
<div class="text-sm font-bold text-emerald-300 mb-2">🔬 Advanced (2-4 hours)</div>
<ul class="text-xs text-white/80 space-y-2">
<li class="flex items-start gap-2">
<span class="text-emerald-300">☐</span>
<div>Build multi-step form workflow (config → generate → preview)</div>
</li>
<li class="flex items-start gap-2">
<span class="text-emerald-300">☐</span>
<div>Implement callback tools for interactive drill-down (chart click → detail table)</div>
</li>
<li class="flex items-start gap-2">
<span class="text-emerald-300">☐</span>
<div>Integrate MCP Apps with custom agent for domain-specific visualization</div>
</li>
</ul>
</div>
</div>
</div>
<div class="relative z-10 mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30 max-w-4xl mx-auto">
<div class="text-sm font-bold text-purple-300 mb-2">📖 Next Steps After Completion</div>
<div class="text-xs text-white/80 grid grid-cols-2 gap-2">
<div>1. ✅ Complete immediate actions to experience MCP Apps</div>
<div>2. 📖 Review MCP SDK documentation for server implementation details</div>
<div>3. 💬 Share MCP Apps with team, measure adoption and time savings</div>
<div>4. 🚀 Explore custom components for specialized visualizations</div>
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
<div class="relative z-10 flex-1 min-h-0">
<div class="grid grid-cols-2 gap-6">
<div class="flex flex-col gap-4">
<div class="p-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl border border-indigo-500/40">
<div class="text-base font-bold text-indigo-300 mb-3">📖 Official Documentation</div>
<div class="space-y-3 text-xs text-white/80">
<div class="flex items-start gap-2">
<div class="text-indigo-400 font-bold">•</div>
<div>
<a href="https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support" class="text-indigo-300 hover:text-indigo-200 underline">MCP Apps Blog Post</a>
<div class="text-white/60 mt-0.5">Introduction, capabilities overview, announcement</div>
</div>
</div>
<div class="flex items-start gap-2">
<div class="text-indigo-400 font-bold">•</div>
<div>
<a href="https://code.visualstudio.com/docs/copilot/customization/mcp-servers" class="text-indigo-300 hover:text-indigo-200 underline">VS Code MCP Servers Documentation</a>
<div class="text-white/60 mt-0.5">MCP integration guide, configuration, troubleshooting</div>
</div>
</div>
<div class="flex items-start gap-2">
<div class="text-indigo-400 font-bold">•</div>
<div>
<a href="https://modelcontextprotocol.io/" class="text-indigo-300 hover:text-indigo-200 underline">Model Context Protocol Specification</a>
<div class="text-white/60 mt-0.5">Core protocol details, standards, reference</div>
</div>
</div>
</div>
</div>
<div class="p-5 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/40">
<div class="text-base font-bold text-purple-300 mb-3">🔗 Related Patterns</div>
<div class="space-y-2 text-xs text-white/80">
<div class="p-2 bg-purple-900/30 rounded border border-purple-500/20">
<div class="font-semibold text-purple-300">MCP Servers Workshop</div>
<div class="text-white/60 mt-0.5">MCP fundamentals, tool development, configuration</div>
</div>
<div class="p-2 bg-pink-900/30 rounded border border-pink-500/20">
<div class="font-semibold text-pink-300">Custom Agents</div>
<div class="text-white/60 mt-0.5">Building agents that leverage MCP Apps for visualization</div>
</div>
<div class="p-2 bg-purple-900/30 rounded border border-purple-500/20">
<div class="font-semibold text-purple-300">Agent Skills</div>
<div class="text-white/60 mt-0.5">Packaging MCP Apps workflows as reusable skills</div>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="p-5 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl border border-purple-500/40">
<div class="text-base font-bold text-purple-300 mb-3">🐙 GitHub Resources</div>
<div class="space-y-3 text-xs text-white/80">
<div class="flex items-start gap-2">
<div class="text-purple-400 font-bold">•</div>
<div>
<a href="https://github.com/modelcontextprotocol/servers" class="text-purple-300 hover:text-purple-200 underline">MCP Apps Playground</a>
<div class="text-white/60 mt-0.5">Working examples of all component types</div>
</div>
</div>
<div class="flex items-start gap-2">
<div class="text-purple-400 font-bold">•</div>
<div>
<a href="https://github.com/modelcontextprotocol/typescript-sdk" class="text-purple-300 hover:text-purple-200 underline">MCP TypeScript SDK</a>
<div class="text-white/60 mt-0.5">SDK for building MCP servers</div>
</div>
</div>
</div>
</div>
<div class="p-5 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl border border-blue-500/40">
<div class="text-base font-bold text-blue-300 mb-3">🎯 Decision Guide</div>
<div class="text-xs text-white/80 space-y-2">
<div class="p-2 bg-blue-900/30 rounded border border-blue-500/20">
<div class="font-semibold text-blue-300">Need custom tools (not visualizations)?</div>
<div class="text-white/60 mt-0.5">→ See: MCP Servers Workshop</div>
</div>
<div class="p-2 bg-cyan-900/30 rounded border border-cyan-500/20">
<div class="font-semibold text-cyan-300">Need agent orchestration with visualization?</div>
<div class="text-white/60 mt-0.5">→ See: Custom Agents + MCP Apps (combine both)</div>
</div>
<div class="p-2 bg-teal-900/30 rounded border border-teal-500/20">
<div class="font-semibold text-teal-300">Need organization-wide deployment?</div>
<div class="text-white/60 mt-0.5">→ See: Enterprise Patterns</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Thank You -->
<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>

<div class="relative z-10">
<div class="absolute inset-0 blur-2xl opacity-50"><img src="./sdp-logo.png" class="w-48" alt="" /></div>
<img src="./sdp-logo.png" class="w-48 relative" alt="SDP Logo" />
</div>

<h1 class="!text-5xl !font-bold !mt-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent relative z-10">Thank You!</h1>

<div class="mt-4 relative z-10">
<span class="px-6 py-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-lg font-medium shadow-lg shadow-purple-500/25">MCP Apps: Rich Interactive UI in Chat</span>
</div>

<div class="mt-8 grid grid-cols-3 gap-4 text-sm max-w-3xl mx-auto relative z-10">
<div class="p-3 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg border border-purple-500/30">
<div class="text-purple-300 font-bold text-lg">5 Component Types</div>
<div class="text-gray-300 mt-2 text-xs">Charts, tables, forms, trees, cards—interactive UI directly in chat</div>
</div>
<div class="p-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg border border-blue-500/30">
<div class="text-blue-300 font-bold text-lg">10x Time Savings</div>
<div class="text-gray-300 mt-2 text-xs">15-20 min → 90 sec for dashboards, eliminate context-switching</div>
</div>
<div class="p-3 bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-lg border border-cyan-500/30">
<div class="text-cyan-300 font-bold text-lg">Callback-Driven</div>
<div class="text-gray-300 mt-2 text-xs">Forms and trees trigger MCP tool calls for stateful workflows</div>
</div>
</div>

<div class="mt-6 text-sm opacity-60 relative z-10">Questions? Let's explore how MCP Apps can transform your data workflows.</div>
<div class="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full relative z-10"></div>
</div>

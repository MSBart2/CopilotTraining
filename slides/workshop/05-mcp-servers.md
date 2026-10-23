---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Module 5: MCP Servers
  Connect Copilot to live systems, not just workspace files
drawings:
  persist: false
transition: slide-left
title: Module 5 - MCP Servers
module: workshop/05-mcp-servers
mdc: true
status: active
updated: 2026-03-31
---

<!-- SLIDE: Module 5: MCP Servers -->
<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-purple-900/20"></div>
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

  <div class="relative z-10">
    <div class="absolute inset-0 blur-2xl opacity-50">
      <img src="./sdp-logo.png" class="w-72" alt="" />
    </div>
    <img src="./sdp-logo.png" class="w-72 relative" alt="SDP Logo" />
  </div>

  <h1 class="!text-5xl !font-bold !mt-8 bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent relative z-10">
    Module 5: MCP Servers
  </h1>

  <div class="mt-4 relative z-10">
    <span class="px-6 py-2 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xl font-medium shadow-lg shadow-orange-500/25">
      ⏰ Copilot gets live context
    </span>
  </div>

  <div class="mt-8 text-lg opacity-70 max-w-2xl italic relative z-10">
    "Skills package expertise. MCP servers connect that expertise to real systems."
  </div>

  <div class="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full relative z-10"></div>

  <div class="relative z-10 flex items-stretch gap-1 text-[10px] mt-4 px-4">
    <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
      <div class="font-bold text-gray-400 text-xs">M1</div>
      <div class="text-gray-500 mt-0.5 whitespace-nowrap">Instructions</div>
    </div>
    <div class="flex items-center text-gray-600 px-0.5">›</div>
    <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
      <div class="font-bold text-gray-400 text-xs">M2</div>
      <div class="text-gray-500 mt-0.5 whitespace-nowrap">Plan Mode</div>
    </div>
    <div class="flex items-center text-gray-600 px-0.5">›</div>
    <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
      <div class="font-bold text-gray-400 text-xs">M3</div>
      <div class="text-gray-500 mt-0.5 whitespace-nowrap">Prompts</div>
    </div>
    <div class="flex items-center text-gray-600 px-0.5">›</div>
    <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
      <div class="font-bold text-gray-400 text-xs">M4</div>
      <div class="text-gray-500 mt-0.5 whitespace-nowrap">Skills</div>
    </div>
    <div class="flex items-center text-gray-600 px-0.5">›</div>
    <div class="flex-1 p-2 bg-gradient-to-b from-orange-600/80 to-orange-800/60 rounded-lg border border-orange-400/50 text-center shadow-lg shadow-orange-900/30">
      <div class="font-bold text-white text-xs">M5</div>
      <div class="text-orange-200 mt-0.5 whitespace-nowrap">MCP</div>
    </div>
    <div class="flex items-center text-gray-600 px-0.5">›</div>
    <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center">
      <div class="font-bold text-gray-400 text-xs">M6</div>
      <div class="text-gray-500 mt-0.5 whitespace-nowrap">Agents</div>
    </div>
  </div>
</div>

---

<!-- SLIDE: The workflow is better. The context is richer. But -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-16 py-8">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/25 via-red-900/15 to-purple-900/25"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/15 to-transparent rounded-full blur-3xl"></div>
<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-transparent rounded-full blur-3xl"></div>

<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="text-orange-300 font-bold text-lg tracking-wide">⏰ : Monday, 2:30 PM</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="relative z-10 mb-2 flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-base font-bold text-white shadow-lg shadow-cyan-500/30 flex-shrink-0">R</div>
<div class="text-gray-300 text-sm">
<span class="text-white font-semibold">Rafael</span> opens a feature ticket and realizes every answer still requires leaving the editor to check a live system.
</div>
</div>

<div class="relative z-10 mb-3 py-2 px-3 bg-gray-900/60 rounded-xl border-l-4 border-orange-400 shadow-xl backdrop-blur-sm">
<p class="text-gray-200 text-xs leading-relaxed">
<span class="text-orange-300/60 font-serif text-base">"</span>
Every time I open a ticket that touches live data, the first three answers I need all require leaving the editor.
 At some point that's not a tool limitation — it's a sprint tax. I'm not interested in paying it.
<span class="text-orange-300/60 font-serif text-base">"</span>
</p>
</div>

<div class="relative z-10 grid grid-cols-5 gap-3 mb-3 text-left">
<div class="p-3 rounded-xl bg-gray-900/60 border border-blue-500/30">
<div class="text-blue-300 font-bold text-xs mb-1">Module 1</div>
<div class="text-white font-semibold text-xs mb-1">Document the standards</div>
<div class="text-xs text-gray-400 leading-tight">Structure and instructions created a reliable baseline.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-purple-500/30">
<div class="text-purple-300 font-bold text-xs mb-1">Module 2</div>
<div class="text-white font-semibold text-xs mb-1">Plan the work</div>
<div class="text-xs text-gray-400 leading-tight">Plan mode made complex work reviewable.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-orange-500/30">
<div class="text-orange-300 font-bold text-xs mb-1">Module 3</div>
<div class="text-white font-semibold text-xs mb-1">Save the best prompts</div>
<div class="text-xs text-gray-400 leading-tight">Repeated prompts became reusable entry points.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-purple-500/30">
<div class="text-purple-300 font-bold text-xs mb-1">Module 4</div>
<div class="text-white font-semibold text-xs mb-1">Package expertise</div>
<div class="text-xs text-gray-400 leading-tight">Specialized workflows became teachable skills.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-cyan-500/30">
<div class="text-cyan-300 font-bold text-xs mb-1">Module 5</div>
<div class="text-white font-semibold text-xs mb-1">Connect live systems</div>
<div class="text-xs text-gray-400 leading-tight">Now the goal is live databases, APIs, and services in the loop.</div>
</div>
</div>

<div class="relative z-10 flex items-center gap-3 p-3 bg-gradient-to-r from-red-900/50 to-purple-900/50 rounded-xl border border-red-500/40 shadow-lg">
<span class="text-xl flex-shrink-0">⚡</span>
<p class="text-white font-bold text-sm">
MCP servers let Copilot query <span class="text-orange-300">real tools and live resources</span> without leaving the workflow.
</p>
</div>
</div>

---

<!-- SLIDE: 💭 The Team, Before Module 5 -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-red-900/30 via-rose-900/15 to-slate-900/20"></div>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
<div class="text-red-500/8 font-black text-[11rem] uppercase tracking-widest rotate-[-20deg] whitespace-nowrap">Wrong Answers</div>
</div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-slate-600/80 to-blue-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💭 The Team, Before Module 5</span>
<div class="flex-1 h-px bg-gradient-to-r from-slate-400/50 to-transparent"></div>
<span class="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-md text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-red-900/50 rotate-[-2deg] inline-block border border-red-400/40">⚠ Wrong Answers Only</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-amber-400 border border-red-800/30">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;MCP is how Copilot connects to the internet. That&rsquo;s why it sometimes knows current stuff. It&rsquo;s already on.&rdquo;</div>
<div class="text-xs text-red-400/70">Describing a completely different feature with total confidence.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-blue-400 border border-red-800/30">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;MCP is essentially SOAP with better branding and a younger demographic. I&rsquo;ll reserve judgment.&rdquo;</div>
<div class="text-xs text-red-400/70">Technically wrong. Spiritually on brand.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-green-400 border border-red-800/30">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;MCP means Copilot can write directly to the database now. That&rsquo;s what &lsquo;live data access&rsquo; means.&rdquo;</div>
<div class="text-xs text-red-400/70">She&rsquo;s going to have follow-up questions about prod access.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-purple-400 border border-red-800/30">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;MCP servers run entirely in the cloud. There&rsquo;s nothing local to secure or audit.&rdquo;</div>
<div class="text-xs text-red-400/70">The security concern is coming. It&rsquo;s just aimed at the wrong layer.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-orange-400 border border-red-800/30">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;MCP is just a fancy name for the GitHub extension. I already have that installed. Is there a different download?&rdquo;</div>
<div class="text-xs text-red-400/70">Confidently conflating two unrelated things.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-cyan-400 border border-red-800/30">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;MCP is already reading our Confluence docs, isn&rsquo;t it? I assumed that&rsquo;s what was happening.&rdquo;</div>
<div class="text-xs text-red-400/70">It was not happening. He has been very wrong for weeks.</div>
</div>
</div>
</div>
---

<!-- SLIDE: 🎯 What You'll Build -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🎯 What You&rsquo;ll Build</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-orange-900/50 to-red-900/40 rounded-xl border border-orange-500/30 text-center mb-4 shadow-lg shadow-orange-900/20">
<div class="text-base font-bold text-white">3 exercises &middot; ~45 minutes &middot; rotating leads</div>
<div class="text-xs text-gray-400 mt-0.5">Connect live data &rarr; upgrade the skill &rarr; run the full audit</div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-4" style="flex: 1; min-height: 0;">
<div class="flex flex-col p-4 bg-blue-900/30 rounded-xl border border-blue-500/40">
<div class="flex items-center justify-between mb-2">
<div class="text-blue-300 font-bold text-2xl">5.1</div>
<span class="text-xs text-gray-500">Marcus ⭐</span>
</div>
<div class="text-white text-sm font-semibold mb-2">Connect Live Lore Data</div>
<div class="text-gray-300 text-xs leading-snug mb-3">Configure an MCP server so Copilot can query live FanHub lore records directly in chat — no context-switching, no copy-paste.</div>
<div class="mt-auto space-y-1 text-xs text-gray-400 border-t border-blue-500/20 pt-2">
<div class="text-blue-300 font-semibold text-xs mb-1">You&rsquo;ll configure:</div>
<div class="flex items-start gap-1.5"><span class="text-blue-400">▸</span><code>.vscode/mcp.json</code> for FanHub</div>
<div class="flex items-start gap-1.5"><span class="text-blue-400">▸</span>Live lore queries in Copilot Chat</div>
<div class="flex items-start gap-1.5"><span class="text-blue-400">▸</span>Validation that real data flows through</div>
</div>
</div>
<div class="flex flex-col p-4 bg-purple-900/30 rounded-xl border border-purple-500/40">
<div class="flex items-center justify-between mb-2">
<div class="text-purple-300 font-bold text-2xl">5.2</div>
<span class="text-xs text-gray-500">Elena ⭐</span>
</div>
<div class="text-white text-sm font-semibold mb-2">Upgrade the Accuracy Skill</div>
<div class="text-gray-300 text-xs leading-snug mb-3">Extend <code>check-data-accuracy</code> to validate against the live database instead of the static universe file — and watch it catch what the old skill missed.</div>
<div class="mt-auto space-y-1 text-xs text-gray-400 border-t border-purple-500/20 pt-2">
<div class="text-purple-300 font-semibold text-xs mb-1">You&rsquo;ll see:</div>
<div class="flex items-start gap-1.5"><span class="text-purple-400">▸</span>Skills + MCP working in combination</div>
<div class="flex items-start gap-1.5"><span class="text-purple-400">▸</span>Errors the static skill would have missed</div>
<div class="flex items-start gap-1.5"><span class="text-purple-400">▸</span>Live DB records surfaced in skill output</div>
</div>
</div>
<div class="flex flex-col p-4 bg-orange-900/30 rounded-xl border border-orange-500/40">
<div class="flex items-center justify-between mb-2">
<div class="text-orange-300 font-bold text-2xl">5.3</div>
<span class="text-xs text-gray-500">Sarah ⭐</span>
</div>
<div class="text-white text-sm font-semibold mb-2">Run the Lore Consistency Audit</div>
<div class="text-gray-300 text-xs leading-snug mb-3">Use both MCP servers together to catch DB-vs-universe mismatches and lore that exists in the database but never reaches the API.</div>
<div class="mt-auto space-y-1 text-xs text-gray-400 border-t border-orange-500/20 pt-2">
<div class="text-orange-300 font-semibold text-xs mb-1">You&rsquo;ll produce:</div>
<div class="flex items-start gap-1.5"><span class="text-orange-400">▸</span>A cross-source discrepancy report</div>
<div class="flex items-start gap-1.5"><span class="text-orange-400">▸</span>Orphaned lore records identified</div>
<div class="flex items-start gap-1.5"><span class="text-orange-400">▸</span>A reusable on-demand audit prompt</div>
</div>
</div>
</div>
<div class="relative z-10 mt-3 text-center text-sm text-gray-400">This module moves from <span class="text-white font-semibold">static context</span> to <span class="text-white font-semibold">live operational context</span> &mdash; and everything after this builds on that.</div>
</div>
---

<!-- SLIDE: 📚 What MCP Servers Actually Add -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📚 What MCP Servers Actually Add</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-3 mt-3 text-left">
  <div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2 text-sm">A standard way to reach external systems</div>
    <ul class="text-xs text-gray-300 space-y-1">
      <li>MCP servers expose tools, resources, and prompts</li>
      <li>VS Code can talk to local or remote servers through a shared protocol</li>
      <li>The same pattern works across many MCP-compatible clients</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2 text-sm">Live context instead of copied context</div>
    <ul class="text-xs text-gray-300 space-y-1">
      <li>Query FanHub data without leaving chat</li>
      <li>Investigate duplicate records from live data instead of assumptions</li>
      <li>Validate runtime API responses against real lore expectations</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2 text-sm">Two common transport patterns</div>
    <ul class="text-xs text-gray-300 space-y-1">
      <li><code>stdio</code> for local processes and tools</li>
      <li><code>http</code> for hosted or remote services</li>
      <li>Choose transport based on security, locality, and deployment model</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-orange-900/30 to-gray-900/40 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2 text-sm">The unlock</div>
    <div class="text-xs text-gray-300">Copilot stops depending on screenshots, pasted output, and stale docs. It can ask the source system directly.</div>
  </div>
</div>
<div class="relative z-10 mt-3 px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-lg flex flex-col gap-1">
  <span class="text-green-300 text-sm italic">&ldquo;I&rsquo;ve been pasting query results into chat for three sprints. This is the last time I do that.&rdquo;</span>
  <span class="text-green-500 text-xs text-right">&mdash; Sarah</span>
</div>
</div>
---

<!-- SLIDE: 🔎 Skills and MCP Work Better Together -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔎 Skills and MCP Work Better Together</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-4 mt-4 text-left">
  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2 text-sm">Instructions</div>
    <div class="text-xs text-gray-300">Define standards and expected behavior.</div>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2 text-sm">Skills</div>
    <div class="text-xs text-gray-300">Package a domain workflow with examples, templates, and scripts.</div>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-orange-900/40 to-gray-900/40 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2 text-sm">MCP Servers</div>
    <div class="text-xs text-gray-300">Bring live databases, APIs, repositories, and other systems into that workflow.</div>
  </div>
</div>
<div class="relative z-10 mt-4 p-4 bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
  <div class="text-lg font-bold text-white">A strong pattern is: standards guide the work, skills package the workflow, MCP supplies live context.</div>
</div>
<div class="relative z-10 mt-3 px-4 py-2 bg-orange-900/20 border border-orange-500/30 rounded-lg flex flex-col gap-1">
  <span class="text-orange-300 text-sm italic">&ldquo;Oh &mdash; it&rsquo;s a stack. Instructions are config, skills are runbooks, MCP is the live system. I&rsquo;ve been building this exact layering in bash for two years.&rdquo;</span>
  <span class="text-orange-500 text-xs text-right">&mdash; Marcus</span>
</div>
</div>
---

<!-- SLIDE: ⚙️ Core MCP Patterns in This Module -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">⚙️ Core MCP Patterns in This Module</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-2 gap-6 mt-8 text-left">

  <div class="p-5 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-3">Local stdio servers</div>
    <ul class="text-sm text-gray-300 space-y-2">
      <li>Great for databases and local development tools</li>
      <li>Process runs locally and communicates over stdin/stdout</li>
      <li>Keeps access close to the workspace and avoids extra network hops</li>
    </ul>
  </div>

  <div class="p-5 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-3">Runtime service wrappers</div>
    <ul class="text-sm text-gray-300 space-y-2">
      <li>Great for exposing a running API through an MCP-friendly wrapper</li>
      <li>Centralized checks can be reused across prompts, skills, and agents</li>
      <li>Useful when the source system is running outside the editor but still part of local development</li>
    </ul>
  </div>

</div>

<div class="mt-8 grid grid-cols-3 gap-5 text-left">
  <div class="p-4 rounded-xl bg-gray-900/60 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2">Config</div>
    <div class="text-sm text-gray-300"><code>.vscode/mcp.json</code> becomes the workspace entry point.</div>
  </div>

  <div class="p-4 rounded-xl bg-gray-900/60 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2">Discovery</div>
    <div class="text-sm text-gray-300">VS Code discovers tools, resources, and prompts from each running server.</div>
  </div>

  <div class="p-4 rounded-xl bg-gray-900/60 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2">Invocation</div>
    <div class="text-sm text-gray-300">Copilot can call the right tool when the task needs live system access.</div>
  </div>
</div>

---

<!-- SLIDE: ❌ Before -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-red-900/15 via-transparent to-green-900/15"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">❌ Before vs ✨ After</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-8">
<div class="pr-4 border-r border-white/10">
<div class="mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-red-700/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">❌ Before</span>
</div>
<div class="space-y-4 text-left">
<div class="p-4 bg-red-900/25 rounded-lg border border-red-500/20">
  <div class="font-bold text-red-300 mb-2">Manual lookup work keeps breaking flow</div>
  <div class="text-sm text-gray-300">Schema checks, PR validation, and API inspection all require extra tabs, terminals, or tools.</div>
</div>
<div class="p-4 bg-red-900/25 rounded-lg border border-red-500/20">
  <div class="font-bold text-red-300 mb-2">Static documentation goes stale</div>
  <div class="text-sm text-gray-300">The team can document expected behavior, but production reality still lives elsewhere.</div>
</div>
<div class="p-4 bg-red-900/25 rounded-lg border border-red-500/20">
  <div class="font-bold text-red-300 mb-2">Live validation is too slow to become habit</div>
  <div class="text-sm text-gray-300">When every check is manual, the team does fewer checks and catches issues later.</div>
</div>
</div>
</div>
<div class="pl-4">
<div class="mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-green-700/80 to-green-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">✨ After</span>
</div>
<div class="space-y-4 text-left">
<div class="p-4 bg-green-900/25 rounded-lg border border-green-500/20">
  <div class="font-bold text-green-300 mb-2">Live system questions stay in chat</div>
  <div class="text-sm text-gray-300">Copilot can query databases, repositories, or APIs without requiring a context switch.</div>
</div>
<div class="p-4 bg-green-900/25 rounded-lg border border-green-500/20">
  <div class="font-bold text-green-300 mb-2">Earlier customizations become more useful</div>
  <div class="text-sm text-gray-300">Skills and prompts can now operate on real data and live service output.</div>
</div>
<div class="p-4 bg-green-900/25 rounded-lg border border-green-500/20">
  <div class="font-bold text-green-300 mb-2">Validation gets faster and more credible</div>
  <div class="text-sm text-gray-300">The team can confirm reality directly instead of depending on memory or copied snapshots.</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 🔨 Exercises -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F528; Exercises &mdash; MCP</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-orange-900/50 to-red-900/40 rounded-xl border border-orange-500/30 text-center mb-4 shadow-lg shadow-orange-900/20">
<div class="text-lg font-bold text-white">3 exercises &middot; ~45 minutes &middot; shared leadership</div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-3 bg-blue-900/30 rounded-lg border border-blue-500/40 flex flex-col">
<div class="flex items-center justify-between mb-1">
<div class="text-blue-300 font-bold text-base">5.1</div>
<span class="text-xs text-gray-500">Marcus &#x2B50;</span>
</div>
<div class="text-white text-xs font-semibold mb-1">Connect live lore data</div>
<div class="text-gray-400 text-xs leading-snug mb-2">Configure an MCP server so Copilot can query live FanHub lore records directly in chat &mdash; no context-switching required.</div>
<div class="text-[10px] text-gray-400 space-y-0.5 border-t border-blue-500/20 pt-2 mt-auto">
<div class="text-blue-300/80 font-semibold mb-1">You&rsquo;ll configure:</div>
<div>&#x2022; <span class="text-gray-300">.vscode/mcp.json</span> for the FanHub database</div>
<div>&#x2022; Live lore record queries in Copilot Chat</div>
<div>&#x2022; Validation that real data flows through</div>
</div>
</div>
<div class="p-3 bg-purple-900/30 rounded-lg border border-purple-500/40 flex flex-col">
<div class="flex items-center justify-between mb-1">
<div class="text-purple-300 font-bold text-base">5.2</div>
<span class="text-xs text-gray-500">Elena &#x2B50;</span>
</div>
<div class="text-white text-xs font-semibold mb-1">Upgrade check-data-accuracy Skill</div>
<div class="text-gray-400 text-xs leading-snug mb-2">Extend the <span class="text-gray-200">check-data-accuracy</span> skill to validate against the live database instead of the static universe file.</div>
<div class="text-[10px] text-gray-400 space-y-0.5 border-t border-purple-500/20 pt-2 mt-auto">
<div class="text-purple-300/80 font-semibold mb-1">You&rsquo;ll see:</div>
<div>&#x2022; Skills + MCP working in combination</div>
<div>&#x2022; Errors the static skill would have missed</div>
<div>&#x2022; Live DB records surfaced in skill output</div>
</div>
</div>
<div class="p-3 bg-orange-900/30 rounded-lg border border-orange-500/40 flex flex-col">
<div class="flex items-center justify-between mb-1">
<div class="text-orange-300 font-bold text-base">5.3</div>
<span class="text-xs text-gray-500">Sarah &#x2B50;</span>
</div>
<div class="text-white text-xs font-semibold mb-1">Find the quote truncation bug</div>
<div class="text-gray-400 text-xs leading-snug mb-2">Use both MCP servers together to compare what the <span class="text-gray-200">quotes</span> table stores against what the API actually returns. There&rsquo;s a bug in the code &mdash; and it only shows up when you can read from both sources.</div>
<div class="text-[10px] text-gray-400 space-y-0.5 border-t border-orange-500/20 pt-2 mt-auto">
<div class="text-orange-300/80 font-semibold mb-1">You&rsquo;ll discover:</div>
<div>&#x2022; A truncation pattern in the API layer</div>
<div>&#x2022; Which quotes are affected &mdash; and which aren&rsquo;t</div>
<div>&#x2022; The difference between a data bug and a code bug</div>
</div>
</div>
</div>
<div class="relative z-10 mt-3 p-3 bg-gray-900/40 rounded-lg border border-white/10 text-center text-xs text-gray-400">
Each exercise rotates the lead persona &mdash; everyone contributes, everyone follows.
</div>
</div>
---

<!-- SLIDE: Character schema and sample rows still live outsid -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 flex-shrink-0">5.1</div>
<div>
<div class="text-blue-300 text-xs font-semibold tracking-widest uppercase">Exercise</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Connect Live Lore Data to the Accuracy Workflow</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Marcus ⭐</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 15 min</span>
</div>
</div>
<div class="relative z-10 mb-5 p-4 bg-gray-900/60 rounded-xl border-l-4 border-blue-400 text-sm text-gray-300">
The <code class="text-emerald-300">check-data-accuracy</code> skill validates entries against the universe file — but it can&#39;t catch errors that are ALREADY in the database. <strong class="text-white">This exercise connects Copilot to live FanHub lore data so the skill can cross-check real records, not just the universe file.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">📋 Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Create or update <span class="font-mono text-blue-300">.vscode/mcp.json</span> for the FanHub database connection</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Start the SQLite MCP server and test lore-data queries from chat</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Explore what records exist that could diverge from the universe file</span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">✅ Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Character and lore data is queryable from Copilot chat</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Marcus can ask lore questions without leaving the workflow</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> The team can see what live records the skill will compare against</div>
</div>
<div class="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30 text-xs text-gray-300 italic">💭 <strong class="text-blue-300">Marcus:</strong> "Wait — it&#39;s showing me what&#39;s actually stored? Not what we think is stored? I was half-reading a Hacker News thread about data provenance — hold on, I need to re-read that now with this context."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: .vscode/mcp.json — FanHub Database -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-blue-800/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: .vscode/mcp.json — FanHub Database</span><div class="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs overflow-auto select-all cursor-text">
<div class="text-gray-400">{</div>
<div class="pl-4 text-blue-300">"servers"<span class="text-white">: {</span></div>
<div class="pl-8 text-green-300">"fanhub-db"<span class="text-white">: {</span></div>
<div class="pl-12 text-blue-300">"command"<span class="text-white">: </span><span class="text-orange-300">"npx"</span><span class="text-white">,</span></div>
<div class="pl-12 text-blue-300">"args"<span class="text-white">: [</span><span class="text-orange-300">"-y", "mcp-sqlite",</span></div>
<div class="pl-16 text-orange-300">"${workspaceFolder}/dotnet/Backend/fanhub.db"</div>
<div class="pl-12 text-white">]</div>
<div class="pl-8 text-white">}</div>
<div class="pl-4 text-white">}</div>
<div class="text-gray-400">}</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-3 border border-blue-500/30 text-xs">
<div class="text-blue-400 font-semibold text-sm mb-2">&#x1F4A1; What this does</div>
<div class="space-y-2 text-gray-300">
<div class="flex items-start gap-2"><div class="text-blue-400 flex-shrink-0">&#x203A;</div><div>Registers <span class="font-mono text-green-300">fanhub-db</span> as a named MCP server in the workspace</div></div>
<div class="flex items-start gap-2"><div class="text-blue-400 flex-shrink-0">&#x203A;</div><div>Runs <code class="text-orange-300">mcp-sqlite</code> via npx &mdash; no manual install required</div></div>
<div class="flex items-start gap-2"><div class="text-blue-400 flex-shrink-0">&#x203A;</div><div>Points directly at the live FanHub database file on disk</div></div>
</div>
</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50 text-xs flex-1">
<div class="text-gray-400 font-semibold uppercase tracking-widest text-xs mb-2">&#x1F4CB; Now available in chat</div>
<div class="font-mono space-y-1.5 text-cyan-300 select-all cursor-text">
<div>#fanhub-db what lore entries exist for Walter White?</div>
<div>#fanhub-db show me records where status or relationship fields look incomplete</div>
<div>#fanhub-db which entries might contradict the universe file?</div>
</div>
</div>
<div class="bg-blue-900/20 rounded-lg p-2.5 border border-blue-500/20 text-xs text-gray-300 italic">
&#x1F4AD; <strong class="text-blue-300">Marcus:</strong> "Wait &mdash; it&#39;s querying the actual database? Not a mock? Hold on, let me re-ask that lore question. Okay this changes things."
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: Copilot Chat — Lore Data Queries -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>

<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-blue-800/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: Copilot Chat — Lore Data Queries</span><div class="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
</div>

<div class="relative z-10 mb-4 text-sm text-gray-300">
Once <code class="text-blue-300 font-mono">fanhub-db</code> is running in Agent mode, reference it directly to query live lore data:
</div>

<div class="relative z-10 space-y-3">
<div class="bg-gray-950/80 rounded-xl border border-blue-500/30 font-mono text-xs p-4 text-gray-300">
<div class="text-cyan-400/60 text-[10px] mb-2 uppercase tracking-wider">lore entry lookup</div>
<div class="text-gray-200 ml-4 select-all cursor-text">#mcp-fanhub-db Show me lore entries for Walter White and flag any that look incomplete or inconsistent.</div>
</div>
<div class="bg-gray-950/80 rounded-xl border border-blue-500/30 font-mono text-xs p-4 text-gray-300">
<div class="text-cyan-400/60 text-[10px] mb-2 uppercase tracking-wider">cross-reference check</div>
<div class="text-gray-200 ml-4 select-all cursor-text">#mcp-fanhub-db Show me character records where the canon status field is empty or missing — these might be accuracy check gaps.</div>
</div>
<div class="bg-gray-950/80 rounded-xl border border-blue-500/30 font-mono text-xs p-4 text-gray-300">
<div class="text-cyan-400/60 text-[10px] mb-2 uppercase tracking-wider">discrepancy hunting</div>
<div class="text-gray-200 ml-4 select-all cursor-text">#mcp-fanhub-db Compare lore entries in the database against what I&#39;d expect from the universe file — flag anything suspicious.</div>
</div>
</div>

<div class="relative z-10 mt-4 flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-900/40 to-blue-900/30 rounded-xl border border-cyan-500/30 shadow-lg">
<span class="text-xl flex-shrink-0">💡</span>
<p class="text-white text-xs font-medium">Each lore query stays in chat — <span class="text-cyan-300">no tab switch, no separate database tool, no copy-paste into context</span></p>
</div>
</div>

---

<!-- SLIDE: The check-data-accuracy skill catches writing errors. MCP catches data entry errors. -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30 flex-shrink-0">5.2</div>
<div>
<div class="text-purple-300 text-xs font-semibold tracking-widest uppercase">Exercise</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Upgrade check-data-accuracy with MCP</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Elena &#x2B50;</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">&#x23F1; 15 min</span>
</div>
</div>
<div class="relative z-10 mb-5 p-4 bg-gray-900/60 rounded-xl border-l-4 border-purple-400 text-sm text-gray-300">
The <code class="text-emerald-300">check-data-accuracy</code> skill from M3/M4 verifies lore entries against the universe file. <strong class="text-white">This exercise upgrades it to also query live FanHub data via MCP &mdash; so it catches discrepancies between what the universe file says and what's actually stored in the database.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">&#x1F4CB; Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Open <span class="font-mono text-emerald-300">.github/skills/check-data-accuracy/SKILL.md</span> from M3/M4</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Add a verification step that queries <span class="font-mono text-purple-300">#mcp-fanhub-db</span> to cross-check lore claims against live character records</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Test: submit a lore entry that conflicts with a database record &mdash; does the skill catch it?</span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">&#x2705; Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> SKILL.md references <span class="font-mono text-purple-300">#mcp-fanhub-db</span> in its verification process</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Skill surfaces a DB-vs-universe discrepancy the file check alone would miss</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Output still uses the Status / Issues / Verified format from M3/M4</div>
</div>
<div class="mt-4 p-3 bg-purple-900/30 rounded-lg border border-purple-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-purple-300">Elena:</strong> "So before, the skill caught writing errors. Now it catches data entry errors too. Those are two different failure modes &mdash; and we were only checking one."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: check-data-accuracy — MCP upgrade -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CB; Example: check-data-accuracy &mdash; MCP upgrade</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs overflow-auto select-all">
<div class="text-gray-500">&#45;&#45;&#45;</div>
<div class="text-orange-300">name<span class="text-white">: </span><span class="text-green-300">check-data-accuracy</span></div>
<div class="text-orange-300">description<span class="text-white">: &gt;</span></div>
<div class="text-green-300 ml-4">Use this skill when asked to verify, validate,</div>
<div class="text-green-300 ml-4">or fact-check a lore entry, character bio,</div>
<div class="text-green-300 ml-4">seed data, or any show content.</div>
<div class="text-green-300 ml-4">Triggers on: check lore, verify lore,</div>
<div class="text-green-300 ml-4">fact-check, canon check, lore accuracy.</div>
<div class="text-gray-500">&#45;&#45;&#45;</div>
<div class="mt-2 text-orange-400">## Verification process</div>
<div class="text-gray-400">1. Read the content to check carefully</div>
<div class="text-gray-400">2. Read relevant sections of [show]-universe.md</div>
<div class="text-gray-400">3. For each claim, find the corresponding fact</div>
<div class="text-purple-300">4. Query <span class="text-cyan-300">#mcp-fanhub-db</span> to cross-check</div>
<div class="text-purple-300 ml-4">against live character records</div>
<div class="text-purple-300">5. Flag any DB-vs-universe discrepancies</div>
<div class="text-gray-400">6. Flag remaining discrepancies with correct info</div>
<div class="text-gray-400">7. Note Unverifiable claims</div>
<div class="mt-2 text-orange-400">## Resources</div>
<div class="text-gray-400">- docs/[show]-universe.md &mdash; canon source</div>
<div class="text-purple-300">- <span class="text-cyan-300">#mcp-fanhub-db</span> &mdash; live records</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-3 border border-purple-500/30 text-xs">
<div class="text-purple-400 font-semibold text-sm mb-2">&#x1F4A1; What MCP adds</div>
<div class="space-y-2 text-gray-300">
<div class="flex items-start gap-2"><div class="text-purple-400 flex-shrink-0">&#x2023;</div><div><strong class="text-white">Before</strong> &mdash; catches writing errors (wrong facts vs. universe file)</div></div>
<div class="flex items-start gap-2"><div class="text-purple-400 flex-shrink-0">&#x2023;</div><div><strong class="text-white">After</strong> &mdash; also catches data entry errors (DB record contradicts universe file)</div></div>
<div class="flex items-start gap-2"><div class="text-purple-400 flex-shrink-0">&#x2023;</div><div><strong class="text-white">Two failure modes</strong> &mdash; one skill now covers both</div></div>
</div>
</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50 text-xs flex-1">
<div class="text-gray-400 font-semibold uppercase tracking-widest text-xs mb-2">&#x1F4CA; New output section</div>
<div class="font-mono space-y-1 text-gray-300">
<div class="text-orange-300">**DB Check** (if MCP available):</div>
<div class="text-gray-400 ml-3">- Live record matches &rarr; &#x2713; Consistent</div>
<div class="text-gray-400 ml-3">- Live record differs &rarr; flag discrepancy</div>
<div class="text-gray-400 ml-3">- No record found &rarr; note as missing</div>
</div>
</div>
<div class="bg-purple-900/20 rounded-lg p-2.5 border border-purple-500/20 text-xs text-gray-300 italic">
&#x1F4AD; <strong class="text-purple-300">Elena:</strong> "We built the skill to catch what we couldn&rsquo;t remember. Now it also catches what we entered wrong. Same skill, wider net."
</div>
</div>
</div>
</div>
</div>


---

<!-- SLIDE: 💬 Example: Invoking the Upgraded Skill -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4AC; Example: Invoking the Upgraded Skill</span><div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 mb-3 text-xs text-gray-400">Add an incorrect lore fact manually, or ask Copilot "please add the lore item from #bad-lore-fact.json to the database"</div>
<div class="relative z-10 grid grid-cols-2 gap-4 flex-1">
<div class="flex flex-col gap-3">
<div class="font-mono text-sm bg-red-900/20 rounded-xl border border-purple-500/30 p-5 text-gray-200 leading-relaxed select-all cursor-text flex-1">
<div class="text-orange-400 mb-3">can you validate the lore facts in the system?</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-4 bg-gray-900/60 rounded-xl border border-purple-500/30 text-xs">
<div class="text-purple-300 font-bold mb-3">What happens when you invoke it</div>
<div class="space-y-3 text-gray-300">
<div class="flex items-start gap-2">
<div class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
<div>Reads the selected lore entry and identifies every factual claim</div>
</div>
<div class="flex items-start gap-2">
<div class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
<div>Cross-checks each claim against <code class="text-emerald-300">docs/[show]-universe.md</code></div>
</div>
<div class="flex items-start gap-2">
<div class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
<div><span class="text-purple-300 font-semibold">New with MCP</span> &mdash; also queries <code class="text-cyan-300">#mcp-fanhub-db</code> to check what&#39;s actually stored in the live database</div>
</div>
<div class="flex items-start gap-2">
<div class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
<div>Returns <strong class="text-white">Status / Issues / Verified claims</strong> &mdash; flagging both writing errors and DB discrepancies</div>
</div>
</div>
</div>
<div class="p-3 bg-gradient-to-r from-purple-900/40 to-orange-900/30 rounded-xl border border-purple-400/30 text-xs">
<div class="text-white font-semibold mb-1">Before vs. After</div>
<div class="space-y-1.5 text-gray-300">
<div class="flex items-center gap-2"><span class="text-gray-500 line-through text-[10px]">Static only</span><span class="text-gray-400 text-[10px]">&mdash; catches writing errors vs. universe file</span></div>
<div class="flex items-center gap-2"><span class="text-purple-300 font-medium text-[10px]">MCP-upgraded</span><span class="text-gray-400 text-[10px]">&mdash; also catches DB records that contradict canon</span></div>
</div>
</div>
<div class="p-3 bg-gray-900/40 rounded-xl border border-emerald-500/20 text-xs text-gray-300 italic">
&#x1F4AD; <strong class="text-emerald-300">Elena:</strong> "The static check told us what we <em>expected</em>. The MCP check tells us what <em>is</em> stored. I&#39;d been treating those as the same question."
</div>
</div>
</div>
</div>

---

<!-- SLIDE: The DB is fine. The API isn't. And you'd never know without both sources open. -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-2">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30 flex-shrink-0">5.3</div>
<div>
<div class="text-orange-300 text-xs font-semibold tracking-widest uppercase">Exercise</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Find the Quote Truncation Bug</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Sarah &#x2B50;</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">&#x23F1; 20 min</span>
</div>
</div>
<div class="relative z-10 mb-3 p-3 bg-gray-900/60 rounded-xl border-l-4 border-orange-400 text-xs text-gray-300">
The quotes feature is live. The database looks fine. But when you run <code class="text-emerald-300">check-data-accuracy</code> with <em>both</em> MCP servers and compare what&rsquo;s stored against what the API returns &mdash; <strong class="text-white">something doesn&rsquo;t match. Long quotes come back shorter. There&rsquo;s a bug in the code truncating <code class="text-amber-300">quote_text</code> to 50 characters &mdash; but it&rsquo;s invisible until you can read from both sources.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-3">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">&#x1F4CB; Steps</div>
<div class="space-y-1.5 text-xs">
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-orange-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Use <span class="font-mono text-cyan-300">#mcp-fanhub-db</span> to query the <span class="font-mono text-amber-200">quotes</span> table &mdash; inspect some records, look at the <span class="font-mono text-amber-200">quote_text</span> field</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-orange-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Run <span class="font-mono text-emerald-300">/check-data-accuracy</span> on a few quotes &mdash; does anything look unexpectedly short?</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-orange-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Add <span class="font-mono text-orange-300">fanhub-api</span> to <span class="font-mono text-blue-300">.vscode/mcp.json</span> if not already done</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span><span class="text-gray-300">Use <span class="font-mono text-amber-300">#mcp-fanhub-api</span> to fetch the same quotes &mdash; compare <span class="font-mono text-amber-200">quote_text</span> in the DB vs. the API response</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-red-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">5</span><span class="text-gray-300">Identify the pattern: which quotes are affected? Can you find the 50-char limit in the code?</span></div>
</div>
</div>
<div class="space-y-1.5">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">&#x2705; Success Criteria</div>
<div class="space-y-1 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> At least one quote where <span class="font-mono text-amber-200">quote_text</span> in DB &ne; API response</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Truncation pattern documented &mdash; quotes over 50 chars are silently cut</div>
<div class="flex items-center gap-2 p-2 bg-amber-900/20 rounded-lg border border-amber-700/30"><span class="text-amber-400">&#x2610;</span> Short quotes (&le; 50 chars) pass through correctly &mdash; the pattern is consistent</div>
<div class="flex items-center gap-2 p-2 bg-amber-900/20 rounded-lg border border-amber-700/30"><span class="text-amber-400">&#x2610;</span> Sarah can say: &ldquo;The data is correct. The API is wrong. Those are two different fixes.&rdquo;</div>
</div>
<div class="mt-2 p-2 bg-orange-900/30 rounded-lg border border-orange-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-orange-300">Sarah:</strong> &ldquo;The DB is fine. The API is lying. The skill only caught it because it could read from both &mdash; without both servers open, this bug is invisible.&rdquo;</div>
</div>
</div>
</div>
---

<!-- SLIDE: 📋 Example: .vscode/mcp.json — Both Servers -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CB; Example: .vscode/mcp.json &mdash; Both Servers</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs overflow-auto select-all cursor-text">
<div class="text-gray-400">{</div>
<div class="pl-4 text-blue-300">"servers"<span class="text-white">: {</span></div>
<div class="pl-8 text-cyan-300">"fanhub-db"<span class="text-white">: {</span></div>
<div class="pl-12 text-blue-300">"command"<span class="text-white">: </span><span class="text-orange-300">"npx"</span><span class="text-white">,</span></div>
<div class="pl-12 text-blue-300">"args"<span class="text-white">: [</span><span class="text-orange-300">"-y", "mcp-sqlite",</span></div>
<div class="pl-16 text-orange-300">"${workspaceFolder}/dotnet/Backend/fanhub.db"</div>
<div class="pl-12 text-white">]</div>
<div class="pl-8 text-white">},</div>
<div class="pl-8 text-amber-300">"fanhub-api"<span class="text-white">: {</span></div>
<div class="pl-12 text-blue-300">"type"<span class="text-white">: </span><span class="text-orange-300">"stdio"</span><span class="text-white">,</span></div>
<div class="pl-12 text-blue-300">"command"<span class="text-white">: </span><span class="text-orange-300">"node"</span><span class="text-white">,</span></div>
<div class="pl-12 text-blue-300">"args"<span class="text-white">: [</span><span class="text-orange-300">"./mcp-servers/fanhub-api-server.js"</span><span class="text-white">],</span></div>
<div class="pl-12 text-blue-300">"env"<span class="text-white">: {</span></div>
<div class="pl-16 text-blue-300">"FANHUB_API_URL"<span class="text-white">: </span><span class="text-orange-300">"http://localhost:5265"</span></div>
<div class="pl-12 text-white">}</div>
<div class="pl-8 text-white">}</div>
<div class="pl-4 text-white">}</div>
<div class="text-gray-400">}</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-3 border border-orange-500/30 text-xs">
<div class="text-cyan-300 font-bold mb-2">&#x1F5C4;&#xFE0F; fanhub-db</div>
<div class="text-gray-300 space-y-1">
<div>SQLite MCP server via <code class="text-orange-300">mcp-sqlite</code></div>
<div>Exposes the database directly — schemas, records, relationships</div>
<div class="text-cyan-200 font-mono mt-1">#mcp-fanhub-db ...</div>
</div>
</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-orange-500/30 text-xs">
<div class="text-amber-300 font-bold mb-2">&#x1F310; fanhub-api</div>
<div class="text-gray-300 space-y-1">
<div>Custom stdio server wrapping the <em>running</em> FanHub API at <code class="text-orange-300">localhost:5265</code></div>
<div>Exposes what the API actually returns to clients — not what&#39;s stored</div>
<div class="text-amber-200 font-mono mt-1">#mcp-fanhub-api ...</div>
</div>
</div>
<div class="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-900/40 to-amber-900/30 rounded-xl border border-white/10 text-xs">
<span class="text-lg flex-shrink-0">&#x26A1;</span>
<p class="text-white font-medium">Together they cover two failure modes: <span class="text-cyan-300">wrong data stored</span> and <span class="text-amber-300">correct data not surfaced</span></p>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: check-data-accuracy — API upgrade -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CB; Example: check-data-accuracy &mdash; API upgrade</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs overflow-auto select-all">
<div class="text-gray-500">&#45;&#45;&#45;</div>
<div class="text-orange-300">name<span class="text-white">: </span><span class="text-green-300">check-data-accuracy</span></div>
<div class="text-orange-300">description<span class="text-white">: &gt;</span></div>
<div class="text-green-300 ml-4">Use this skill when asked to verify, validate,</div>
<div class="text-green-300 ml-4">or fact-check a lore entry, character bio,</div>
<div class="text-green-300 ml-4">seed data, or any show content.</div>
<div class="text-gray-500">&#45;&#45;&#45;</div>
<div class="mt-2 text-orange-400">## Verification process</div>
<div class="text-gray-400">1. Read the content to check carefully</div>
<div class="text-gray-400">2. Read relevant sections of [show]-universe.md</div>
<div class="text-gray-400">3. For each claim, find the corresponding fact</div>
<div class="text-cyan-300">4. Query <span class="text-cyan-300">#mcp-fanhub-db</span> to cross-check</div>
<div class="text-cyan-300 ml-4">against live character records</div>
<div class="text-cyan-300">5. Flag any DB-vs-universe discrepancies</div>
<div class="text-amber-300">6. Query <span class="text-amber-300">#mcp-fanhub-api</span> to verify the entry</div>
<div class="text-amber-300 ml-4">is actually returned by the running API</div>
<div class="text-amber-300">7. Flag any DB records missing from API responses</div>
<div class="text-gray-400">8. Flag remaining discrepancies with correct info</div>
<div class="text-gray-400">9. Note Unverifiable claims</div>
<div class="mt-2 text-orange-400">## Resources</div>
<div class="text-gray-400">- docs/[show]-universe.md &mdash; canon source</div>
<div class="text-cyan-300">- <span class="text-cyan-300">#mcp-fanhub-db</span> &mdash; live records</div>
<div class="text-amber-300">- <span class="text-amber-300">#mcp-fanhub-api</span> &mdash; running API</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-3 border border-orange-500/30 text-xs">
<div class="text-amber-400 font-semibold text-sm mb-2">&#x1F4A1; What the API check adds</div>
<div class="space-y-2 text-gray-300">
<div class="flex items-start gap-2"><div class="text-cyan-400 flex-shrink-0">&#x2023;</div><div><strong class="text-white">DB check</strong> &mdash; catches data stored wrong (canon violation)</div></div>
<div class="flex items-start gap-2"><div class="text-amber-400 flex-shrink-0">&#x2023;</div><div><strong class="text-white">API check</strong> &mdash; catches correct data silently dropped or truncated before the client sees it</div></div>
<div class="flex items-start gap-2"><div class="text-white flex-shrink-0">&#x2023;</div><div><strong class="text-white">Three failure classes</strong> &mdash; one skill now covers all of them</div></div>
</div>
</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50 text-xs flex-1">
<div class="text-gray-400 font-semibold uppercase tracking-widest text-xs mb-2">&#x1F4CA; New output section</div>
<div class="font-mono space-y-1 text-gray-300">
<div class="text-amber-300">**API Check** (if #mcp-fanhub-api available):</div>
<div class="text-gray-400 ml-3">- Entry returned by API &rarr; &#x2713; Surfaced</div>
<div class="text-gray-400 ml-3">- Entry missing from API &rarr; flag as API gap</div>
<div class="text-gray-400 ml-3">- Entry truncated &rarr; flag missing fields</div>
</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: The Skill Covers All Three -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CB; Example: The Skill Covers All Three</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4 flex-1">
<div class="flex flex-col gap-3">
<div class="bg-gray-950/80 rounded-xl border border-orange-500/30 font-mono text-xs p-4 text-gray-300 flex-1">
<div class="text-purple-400/60 text-[10px] mb-2 uppercase tracking-wider">skill invocation — unchanged</div>
<div class="text-purple-300">can you validate the quotes in the system?</div>
<div class="mt-4 space-y-1.5 text-[10.5px]">
<div class="text-gray-500">// 1. checks universe file (writing errors)</div>
<div class="text-cyan-400">// 2. queries #mcp-fanhub-db (DB-vs-universe errors)</div>
<div class="text-amber-400">// 3. queries #mcp-fanhub-api (DB-vs-API gaps)</div>
</div>
<div class="mt-4 pt-3 border-t border-white/10 text-[10.5px] text-gray-400">Same invocation. Both MCP servers are reached automatically when available.</div>
</div>
<div class="p-3 bg-gradient-to-r from-purple-900/30 to-amber-900/20 rounded-xl border border-white/10 text-xs">
<div class="text-white font-semibold mb-1">Before vs. After</div>
<div class="space-y-1.5 text-gray-300">
<div class="flex items-start gap-2"><div class="text-gray-500 flex-shrink-0">›</div><div><span class="text-gray-500 line-through">Static only</span> &mdash; catches writing errors vs. universe file</div></div>
<div class="flex items-start gap-2"><div class="text-cyan-400 flex-shrink-0">›</div><div><span class="text-cyan-300">+ DB check</span> &mdash; also catches data stored wrong</div></div>
<div class="flex items-start gap-2"><div class="text-amber-400 flex-shrink-0">›</div><div><span class="text-amber-300">+ API check</span> &mdash; also catches correct data never surfaced</div></div>
</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50 text-xs flex-1">
<div class="text-gray-300 font-semibold uppercase tracking-widest text-xs mb-3">&#x1F4CA; Three failure classes — now all covered</div>
<div class="space-y-2 font-mono text-[10.5px]">
<div class="flex items-center gap-2"><span class="px-2 py-0.5 bg-red-900/60 border border-red-500/40 rounded text-red-300">DB error + API exposes it</span><span class="text-gray-500">&rarr; fix now</span></div>
<div class="flex items-center gap-2"><span class="px-2 py-0.5 bg-amber-900/60 border border-amber-500/40 rounded text-amber-300">DB correct + API drops it</span><span class="text-gray-500">&rarr; API bug</span></div>
<div class="flex items-center gap-2"><span class="px-2 py-0.5 bg-gray-800 border border-gray-600/40 rounded text-gray-400">DB error + API hides it</span><span class="text-gray-500">&rarr; log it</span></div>
</div>
<div class="mt-3 pt-3 border-t border-white/10 text-[10.5px] text-gray-400">Each class gets a different priority. The skill now tells you which one you&#39;re looking at.</div>
</div>
<div class="bg-amber-900/20 rounded-lg p-2.5 border border-amber-500/20 text-xs text-gray-300 italic">
&#x1F4AD; <strong class="text-amber-300">Elena:</strong> "Same skill. Two more lines in the SKILL.md. Now it tells me whether bad data is stored, whether good data is missing, and which one the client actually sees."
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: Audit Output — Truncation Bug Found -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CB; Example: Audit Output &mdash; Truncation Bug Found</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-cyan-500/30 p-4 font-mono text-xs overflow-auto text-gray-300 leading-relaxed">
<div class="text-cyan-300 font-semibold mb-1">DB Check (via #mcp-fanhub-db):</div>
<div class="text-green-400 font-semibold">Status: <span class="text-green-300">Consistent with universe file</span></div>
<div class="mt-2 text-cyan-300 font-semibold">Sample records (quotes table):</div>
<div class="text-gray-400 ml-3">• quote-001: <span class="text-gray-200">&ldquo;Say my name.&rdquo;</span></div>
<div class="text-gray-400 ml-3">• quote-007: <span class="text-gray-200">&ldquo;I am the one who knocks. I am the danger. A danger to your operation.&rdquo;</span></div>
<div class="text-gray-400 ml-3">• quote-012: <span class="text-gray-200">&ldquo;Chemistry is the study of change. That&rsquo;s all of life.&rdquo;</span></div>
<div class="mt-2 text-green-400 font-semibold">All DB records: full text intact &#x2713;</div>
</div>
<div class="bg-gray-950 rounded-xl border border-amber-500/30 p-4 font-mono text-xs overflow-auto text-gray-300 leading-relaxed">
<div class="text-amber-300 font-semibold mb-1">API Check (via #mcp-fanhub-api):</div>
<div class="text-red-400 font-semibold">Status: <span class="text-red-300">Discrepancy Found</span></div>
<div class="mt-2 text-amber-300 font-semibold">Issues:</div>
<div class="text-gray-400 ml-3">• quote-001: <span class="text-gray-200">&ldquo;Say my name.&rdquo;</span> &mdash; <span class="text-green-400">&#x2713; matches</span></div>
<div class="text-red-400 ml-3">• quote-007: <span class="text-gray-200">&ldquo;I am the one who knocks. I am the dan&rdquo;</span></div>
<div class="text-gray-500 ml-6 italic">&#x21B3; DB: 70 chars &nbsp;|&nbsp; API: 50 chars &mdash; truncated</div>
<div class="text-red-400 ml-3">• quote-012: <span class="text-gray-200">&ldquo;Chemistry is the study of change. That&rsquo;s&rdquo;</span></div>
<div class="text-gray-500 ml-6 italic">&#x21B3; DB: 55 chars &nbsp;|&nbsp; API: 50 chars &mdash; truncated</div>
<div class="mt-2 text-amber-300 font-semibold">Pattern:</div>
<div class="text-gray-300 ml-3">All quotes over 50 chars are silently cut.</div>
<div class="text-gray-300 ml-3">Shorter quotes pass through unchanged.</div>
</div>
</div>
<div class="bg-orange-900/20 rounded-lg p-3 border border-orange-500/20 text-xs text-gray-300 italic">
&#x1F4AD; <strong class="text-orange-300">Sarah:</strong> &ldquo;The data is correct. The code is wrong. I can prove it &mdash; because I can read the table and the API response side by side.&rdquo; &nbsp;&nbsp; <strong class="text-amber-300">Elena:</strong> &ldquo;50-character hard limit. That&rsquo;s not an accident, that&rsquo;s a <code class="text-red-300">LEFT(quote_text, 50)</code> somewhere. Find it.&rdquo;
</div>
</div>
</div>
---

<!-- SLIDE: 📋 Example: mcp-servers/fanhub-api-server.js -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CB; Example: mcp-servers/fanhub-api-server.js</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs overflow-auto select-all cursor-text leading-relaxed">
<div class="text-gray-500">// stdio MCP server &mdash; wraps the running FanHub API</div>
<div class="text-blue-300">const <span class="text-white">API_BASE_URL</span> = process.env.<span class="text-amber-300">FANHUB_API_URL</span> || <span class="text-orange-300">"http://localhost:5265"</span>;</div>
<div class="mt-2 text-gray-500">// Handshake</div>
<div class="text-white">if (method === <span class="text-orange-300">"initialize"</span>) {</div>
<div class="pl-4 text-gray-300">send(id, { protocolVersion: <span class="text-orange-300">"2024-11-05"</span>,</div>
<div class="pl-8 text-gray-300">serverInfo: { name: <span class="text-orange-300">"fanhub-api"</span> } });</div>
<div class="text-white">}</div>
<div class="mt-2 text-gray-500">// Three tools exposed to Copilot</div>
<div class="text-white">if (method === <span class="text-orange-300">"tools/list"</span>) {</div>
<div class="pl-4 text-cyan-300">{ name: <span class="text-orange-300">"get_lore"</span>,</div>
<div class="pl-6 text-gray-400">description: <span class="text-orange-300">"Fetch all lore entries from the API"</span> },</div>
<div class="pl-4 text-cyan-300">{ name: <span class="text-orange-300">"get_lore_by_id"</span>,</div>
<div class="pl-6 text-gray-400">inputSchema: { id: { type: <span class="text-orange-300">"string"</span> } } },</div>
<div class="pl-4 text-amber-300">{ name: <span class="text-orange-300">"create_lore"</span>,</div>
<div class="pl-6 text-gray-400">inputSchema: { showId, category, title, description } }</div>
<div class="text-white">}</div>
<div class="mt-2 text-gray-500">// Routes tools/call to API endpoints</div>
<div class="text-blue-300">if (tool === <span class="text-orange-300">"get_lore"</span>) getJson(<span class="text-orange-300">"/api/lore"</span>);</div>
<div class="text-blue-300">if (tool === <span class="text-orange-300">"get_lore_by_id"</span>) getJson(<span class="text-orange-300">`/api/lore/${args.id}`</span>);</div>
<div class="text-amber-300">if (tool === <span class="text-orange-300">"create_lore"</span>) postJson(<span class="text-orange-300">"/api/lore"</span>, args);</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-3 border border-orange-500/30 text-xs">
<div class="text-amber-300 font-bold mb-2">&#x1F6E0;&#xFE0F; How it works</div>
<div class="space-y-2 text-gray-300">
<div class="flex items-start gap-2"><div class="text-amber-400 flex-shrink-0">&#x203A;</div><div>Pure stdio &mdash; reads JSON-RPC from stdin, writes responses to stdout. No port, no daemon.</div></div>
<div class="flex items-start gap-2"><div class="text-amber-400 flex-shrink-0">&#x203A;</div><div><code class="text-amber-200">FANHUB_API_URL</code> env var points it at the running API &mdash; swap the URL for any environment</div></div>
<div class="flex items-start gap-2"><div class="text-amber-400 flex-shrink-0">&#x203A;</div><div>VS Code starts it automatically when the workspace opens via <code class="text-blue-300">.vscode/mcp.json</code></div></div>
</div>
</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-orange-500/30 text-xs">
<div class="text-cyan-300 font-bold mb-2">&#x1F4CB; Three tools</div>
<div class="space-y-2 text-gray-300">
<div class="flex items-start gap-2"><div class="text-cyan-400 flex-shrink-0">&#x203A;</div><div><code class="text-cyan-300">get_lore</code> &mdash; list all entries; used to compare count vs. DB</div></div>
<div class="flex items-start gap-2"><div class="text-cyan-400 flex-shrink-0">&#x203A;</div><div><code class="text-cyan-300">get_lore_by_id</code> &mdash; spot-check a specific record the DB audit flagged</div></div>
<div class="flex items-start gap-2"><div class="text-amber-400 flex-shrink-0">&#x203A;</div><div><code class="text-amber-300">create_lore</code> &mdash; create a corrected entry without leaving the workflow</div></div>
</div>
</div>
<div class="bg-gradient-to-r from-amber-900/30 to-orange-900/20 rounded-lg p-2.5 border border-amber-400/30 text-xs">
<div class="text-amber-200 font-semibold mb-1">&#x26A1; The audit can fix, not just find</div>
<div class="text-gray-300">The <code class="text-amber-300">create_lore</code> tool means Copilot can propose and apply corrections directly &mdash; the skill doesn&#39;t just report what&#39;s wrong, it can write the fix.</div>
</div>
</div>
</div>
<div class="relative z-10 mt-2 text-xs text-gray-500">&#x1F4C1; mcp-servers/fanhub-api-server.js &middot; Run with <code>node mcp-servers/fanhub-api-server.js</code> &middot; Launched automatically by VS Code via .vscode/mcp.json</div>
</div>
</div>

---

<!-- SLIDE: ✅ Module Checklist -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">✅ Module Checklist</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-3 gap-5 mt-8 text-left text-sm">

  <div class="p-5 rounded-xl bg-gray-900/60 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-3">Connect</div>
    <ul class="space-y-2 text-gray-300">
      <li>Add the right MCP server configuration for the scenario</li>
      <li>Pick the transport that fits the system and security model</li>
      <li>Confirm the server starts and exposes useful capabilities</li>
    </ul>
  </div>

  <div class="p-5 rounded-xl bg-gray-900/60 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-3">Apply</div>
    <ul class="space-y-2 text-gray-300">
      <li>Use live context to improve a real team workflow</li>
      <li>Combine MCP with prompts, standards, or skills where it helps</li>
      <li>Keep the integration understandable and easy to reuse</li>
    </ul>
  </div>

  <div class="p-5 rounded-xl bg-gray-900/60 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-3">Validate</div>
    <ul class="space-y-2 text-gray-300">
      <li>Measure whether manual effort drops</li>
      <li>Check that outputs are grounded in live data</li>
      <li>Refine the workflow until the connection is genuinely worth keeping</li>
    </ul>
  </div>

</div>

<div class="mt-8 p-4 bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
  <div class="text-lg text-white font-semibold">A good MCP integration reduces switching, grounds the workflow in live systems, and increases confidence.</div>
</div>

---

<!-- SLIDE: 📚 Keep the Foundation Evergreen -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📚 Keep the Foundation Evergreen</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div><div class="mt-4 p-5 bg-gradient-to-r from-blue-900/25 via-purple-900/25 to-orange-900/20 rounded-2xl border border-white/10 text-center">
<div class="text-lg font-bold text-white">Before Module 6, document the live context you've wired in.</div>
<div class="text-sm text-gray-300 mt-2">Update <span class="font-mono text-blue-200">ARCHITECTURE.md</span> and <span class="font-mono text-purple-200">.github/copilot-instructions.md</span> so the agents you build next know what data sources and MCP servers are available.</div>
</div><div class="mt-4 font-mono text-sm bg-gray-900/80 rounded-xl border border-blue-500/30 p-5 text-gray-200">
<div class="text-xs text-gray-500 mb-3">You already built the tool. Run it.</div>
<div class="text-orange-400 font-bold">/refresh-docs</div>
<div class="text-gray-400 mt-3 text-xs font-sans">The <span class="font-mono text-blue-300">refresh-docs.prompt.md</span> you built in Module 3 updates <span class="font-mono text-blue-200">ARCHITECTURE.md</span> and <span class="font-mono text-purple-200">copilot-instructions.md</span> with the new MCP servers and live data sources — so Module 6 agents know they exist and can use them.</div>
</div><div class="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-900/30 via-yellow-900/20 to-orange-900/30 border border-orange-500/30 text-center">
<div class="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">🔁 Build the habit</div>
<div class="text-sm text-white font-semibold">Run <span class="font-mono text-orange-300">/refresh-docs</span> after every meaningful change.</div>
<div class="text-xs text-gray-400 mt-1">Each PR that updates docs keeps the foundation relevant — so Copilot always has accurate context to work from.</div>
</div>

---

<!-- SLIDE: Module 5 Is Locked In -->
<div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/25 via-red-900/15 to-purple-900/25"></div>
<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/15 via-red-500/10 to-purple-500/15 rounded-full blur-3xl"></div>
<div class="relative z-10 mb-4">
<div class="absolute inset-0 blur-2xl opacity-50">
<img src="./sdp-logo.png" class="w-48 mx-auto" alt="" />
</div>
<img src="./sdp-logo.png" class="w-48 mx-auto relative" alt="SDP Logo" />
</div>
<h1 class="!text-[2.7rem] !font-bold !mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent relative z-10">
Module 5 Is Locked In
</h1>
<div class="relative z-10 mb-6">
<span class="px-5 py-2 bg-gradient-to-r from-purple-600/80 to-red-600/80 rounded-full text-white text-base font-medium shadow-lg shadow-purple-500/25">
🤖 Next Up: Module 6 — Custom Agents
</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3 max-w-3xl w-full px-6 mb-6">
<div class="p-3 bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl border border-orange-500/30 text-center">
<div class="text-xl mb-1">🔌</div>
<div class="text-orange-300 font-bold text-sm">You Connected Live Data</div>
<div class="text-gray-400 text-xs mt-1">FanHub character data is now queryable directly from Copilot chat</div>
</div>
<div class="p-3 bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl border border-red-500/30 text-center">
<div class="text-xl mb-1">🧪</div>
<div class="text-red-300 font-bold text-sm">You Upgraded the Skill</div>
<div class="text-gray-400 text-xs mt-1">The character-change workflow now operates on real records, not guesswork</div>
</div>
<div class="p-3 bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl border border-purple-500/30 text-center">
<div class="text-xl mb-1">🤖</div>
<div class="text-purple-300 font-bold text-sm">Now Build the Agent</div>
<div class="text-gray-400 text-xs mt-1">Module 6 combines prompts, skills, and live data into one orchestrated workflow</div>
</div>
</div>
<div class="relative z-10 text-base text-gray-200 max-w-3xl px-10 mb-6 leading-snug">
MCP servers let Copilot see the real world. <span class="text-white font-semibold">Custom agents will let it act on all of it at once.</span>
</div>
<div class="relative z-10 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"></div>
</div>

---

<!-- SLIDE: 💬 Reflect & Discuss -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-gray-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-5">
<span class="px-4 py-1 bg-gradient-to-r from-indigo-600/80 to-violet-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4AC; Reflect &amp; Discuss</span>
<div class="flex-1 h-px bg-gradient-to-r from-indigo-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-8 flex-1">
<div class="flex flex-col gap-3">
<div class="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">&#x1F4D6; Story Moments</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">Marcus&rsquo;s grounding moment: &ldquo;it&rsquo;s showing me what&rsquo;s <em>actually</em> stored? Not what we think is stored?&rdquo; &mdash; assumptions met reality</div>
</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">Two failure classes surfaced in one session: Sarah found a DB error the API masked; Elena found records silently dropped between layers</div>
</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">Sarah ran checks at 2:30pm she&rsquo;d planned to do manually at 5pm &mdash; the tool got faster than her instinct to postpone</div>
</div>
</div>
<div class="flex flex-col justify-center">
<div class="p-6 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-transparent rounded-2xl border border-amber-500/30 shadow-lg">
<div class="text-xs text-amber-400/80 uppercase tracking-widest font-semibold mb-4">&#x1F4A1; One Big Question</div>
<div class="text-xl font-semibold text-white leading-relaxed">What&rsquo;s a question you&rsquo;ve answered this week that required switching to another tool &mdash; a database, a dashboard, a doc? What would it mean to answer that without leaving the workflow?</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💭 The Team, After Module 5 -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/18 via-cyan-900/10 to-slate-900/10"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-cyan-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💭 The Team, After Module 5</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
<span class="px-3 py-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-md text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-emerald-900/40 inline-block border border-emerald-300/30">✓ After The Module</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-amber-400">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It&rsquo;s not the internet connection &mdash; it&rsquo;s live data from the actual database. I kept waiting for it to be wrong. Three more runs. It was not the internet. It was worse: it was correct.&rdquo;</div>
<div class="text-xs text-gray-500">Testing the tool to find the excuse. Didn&rsquo;t find it.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-blue-400">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It is not SOAP. The correct term is &lsquo;grounding&rsquo; &mdash; anchoring inference in verified external state rather than learned approximation. I retract the SOAP comparison. Partially.&rdquo;</div>
<div class="text-xs text-gray-500">Corrected himself before anyone else could.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-green-400">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It doesn&rsquo;t write to the database &mdash; it reads from it. Three lore errors. Two API gaps. One regression before the PR. I was going to run those checks manually at 5pm. It&rsquo;s 2:30.&rdquo;</div>
<div class="text-xs text-gray-500">Wrong about the direction. Right that it changes everything.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-purple-400">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;They don&rsquo;t run in the cloud &mdash; they run locally and that surface needs to be audited. DB error confirmed. API gap confirmed. Seventeen edge cases queued. I am professionally obligated to keep checking.&rdquo;</div>
<div class="text-xs text-gray-500">Found the local surface. Already auditing it.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-orange-400">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It is not the GitHub extension &mdash; I have that and it does not do this. I was reading an MCP internals thread while it ran, looked up, and it had already found the thing. Adding it to CI. Two things.&rdquo;</div>
<div class="text-xs text-gray-500">Two parallel trains. Already shipping before he finished reading.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-cyan-400">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It was not reading Confluence. It was catching data errors I didn&rsquo;t know existed. The three failure classes map to two epics and a Q3 OKR. We&rsquo;re shipping this.&rdquo;</div>
<div class="text-xs text-gray-500">Tuned out the gap. Made the call anyway.</div>
</div>
</div>
</div>
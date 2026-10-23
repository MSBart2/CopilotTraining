---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Module 3+4: From Prompts to Skills
  Build reusable prompts then graduate them to agent skills
drawings:
  persist: false
transition: slide-left
title: From Prompts to Skills
module: workshop/03-custom-prompts
mdc: true
status: active
updated: 2026-04-01
---

<!-- SLIDE: From Prompts to Skills -->
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
From Prompts to Skills
</h1>
<div class="mt-4 relative z-10">
<span class="px-6 py-2 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xl font-medium shadow-lg shadow-orange-500/25">
&#x23F0; Build it once. Invoke it anywhere. Graduate it to a skill.
</span>
</div>
<div class="mt-8 text-lg opacity-70 max-w-2xl italic relative z-10">
Part 1: save your best prompts as reusable team functions. Part 2: embed them into the workflow as agent skills.
</div>
<div class="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full relative z-10"></div>
<div class="relative z-10 flex items-stretch gap-1 text-[10px] mt-4 px-4">
  <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
    <div class="font-bold text-gray-400 text-xs">M1</div>
    <div class="text-gray-500 mt-0.5 whitespace-nowrap">Instructions</div>
  </div>
  <div class="flex items-center text-gray-600 px-0.5">&#x203A;</div>
  <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
    <div class="font-bold text-gray-400 text-xs">M2</div>
    <div class="text-gray-500 mt-0.5 whitespace-nowrap">Plan Mode</div>
  </div>
  <div class="flex items-center text-gray-600 px-0.5">&#x203A;</div>
  <div class="flex-1 p-2 bg-gradient-to-b from-orange-600/80 to-orange-800/60 rounded-lg border border-orange-400/50 text-center shadow-lg shadow-orange-900/30">
    <div class="font-bold text-white text-xs">M3</div>
    <div class="text-orange-200 mt-0.5 whitespace-nowrap">Prompts</div>
  </div>
  <div class="flex items-center text-gray-600 px-0.5">&#x203A;</div>
  <div class="flex-1 p-2 bg-gradient-to-b from-orange-600/80 to-orange-800/60 rounded-lg border border-orange-400/50 text-center shadow-lg shadow-orange-900/30">
    <div class="font-bold text-white text-xs">M4</div>
    <div class="text-orange-200 mt-0.5 whitespace-nowrap">Skills</div>
  </div>
  <div class="flex items-center text-gray-600 px-0.5">&#x203A;</div>
  <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center">
    <div class="font-bold text-gray-400 text-xs">M5</div>
    <div class="text-gray-500 mt-0.5 whitespace-nowrap">MCP</div>
  </div>
  <div class="flex items-center text-gray-600 px-0.5">&#x203A;</div>
  <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center">
    <div class="font-bold text-gray-400 text-xs">M6</div>
    <div class="text-gray-500 mt-0.5 whitespace-nowrap">Agents</div>
  </div>
</div>
</div>

---

<!-- SLIDE: Elena's Challenge -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-16 py-8">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/25 via-red-900/15 to-purple-900/25"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/15 to-transparent rounded-full blur-3xl"></div>
<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-transparent rounded-full blur-3xl"></div>

<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="text-orange-300 font-bold text-lg tracking-wide">⏰ : Monday, 12:30 PM</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="relative z-10 mb-2 flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-base font-bold text-white shadow-lg shadow-purple-500/30 flex-shrink-0">E</div>
<div class="text-gray-300 text-sm">
<span class="text-white font-semibold">Elena</span> wants to capture and maintain high-value prompts for reuse across the team.
</div>
</div>

<div class="relative z-10 mb-3 py-2 px-3 bg-gray-900/60 rounded-xl border-l-4 border-orange-400 shadow-xl backdrop-blur-sm">
<p class="text-gray-200 text-xs leading-relaxed">
<span class="text-orange-300/60 font-serif text-base">"</span>
Every review I run from memory is a potential gap. When the prompt lives in my head, the checklist stops the moment I'm not in the room. If we codify these, the whole team runs the <span class="text-orange-300 font-semibold">same quality bar.</span>
 <span class="text-orange-300/60 font-serif text-base">"</span>
</p>
</div>

<div class="relative z-10 grid grid-cols-3 gap-3 mb-3 text-left">
<div class="p-4 rounded-xl bg-gray-900/60 border border-blue-500/30">
<div class="text-blue-300 font-bold text-sm mb-2">Module 1</div>
<div class="text-white font-semibold text-base mb-1">Document the standards</div>
<div class="text-xs text-gray-400">Architecture docs and repository instructions became the source of truth.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/60 border border-purple-500/30">
<div class="text-purple-300 font-bold text-sm mb-2">Module 2</div>
<div class="text-white font-semibold text-base mb-1">Improve the workflow</div>
<div class="text-xs text-gray-400">Plan mode made complex work reviewable before code started landing.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/60 border border-orange-500/30">
<div class="text-orange-300 font-bold text-sm mb-2">Module 3</div>
<div class="text-white font-semibold text-base mb-1">Save the best prompts</div>
<div class="text-xs text-gray-400">Now the goal is turning repeated, high-value prompting into something the whole team can invoke.</div>
</div>
</div>

<div class="relative z-10 flex items-center gap-3 p-3 bg-gradient-to-r from-red-900/50 to-purple-900/50 rounded-xl border border-red-500/40 shadow-lg">
<span class="text-xl flex-shrink-0">⚡</span>
<p class="text-white font-bold text-sm">
Custom prompts turn <span class="text-orange-300">personal prompt craft</span> into invokable team workflow.
</p>
</div>
</div>

---

<!-- SLIDE: 💭 The Team, Before Module 3+4 -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-red-900/30 via-rose-900/15 to-slate-900/20"></div>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
<div class="text-red-500/8 font-black text-[11rem] uppercase tracking-widest rotate-[-20deg] whitespace-nowrap">Wrong Answers</div>
</div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-slate-600/80 to-blue-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💭 The Team, Before Module 3+4</span>
<div class="flex-1 h-px bg-gradient-to-r from-slate-400/50 to-transparent"></div>
<span class="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-md text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-red-900/50 rotate-[-2deg] inline-block border border-red-400/40">⚠ Wrong Answers Only</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-amber-400 border border-red-800/30">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;A skill is a really long prompt. Like, a detailed one you save so you don&rsquo;t have to retype it. That&rsquo;s it.&rdquo;</div>
<div class="text-xs text-red-400/70">Underselling it by about ninety percent.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-blue-400 border border-red-800/30">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;Prompt files are macros. We solved this in 1980. I&rsquo;m going to need a more compelling pitch.&rdquo;</div>
<div class="text-xs text-red-400/70">Waiting for the pitch. About to get one.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-green-400 border border-red-800/30">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;Skills are pre-loaded context. You write it once and Copilot remembers it forever. Low maintenance.&rdquo;</div>
<div class="text-xs text-red-400/70">The &lsquo;forever&rsquo; is doing a lot of heavy lifting.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-purple-400 border border-red-800/30">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;A prompt file is always active. It runs on every request. You can&rsquo;t turn it off without deleting it.&rdquo;</div>
<div class="text-xs text-red-400/70">Already planning how to audit the always-on behavior.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-orange-400 border border-red-800/30">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;Skills are aliases. You type the name, it expands to the full prompt. Like a bash alias but for chat.&rdquo;</div>
<div class="text-xs text-red-400/70">Close enough to feel right. Wrong enough to matter.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-cyan-400 border border-red-800/30">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;I turn our PRD template into a skill and it writes the whole spec from a one-line prompt. That&rsquo;s the use case.&rdquo;</div>
<div class="text-xs text-red-400/70">He&rsquo;s going to be partially right. That&rsquo;s almost worse.</div>
</div>
</div>
</div>
---

<!-- SLIDE: What You'll Build -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F3AF; What You'll Build</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-orange-900/50 to-red-900/40 rounded-xl border border-orange-500/30 text-center mb-3 shadow-lg shadow-orange-900/20">
<div class="text-lg font-bold text-white mb-0.5">Five exercises. Two modules. One complete workflow layer.</div>
<div class="text-xs text-orange-100">Prompts capture repeatable tasks &mdash; skills embed them into the workflow</div>
</div>
<div class="relative z-10 mb-2">
<div class="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">&#x1F4DD; Part 1 &mdash; Prompt Files</div>
<div class="grid grid-cols-3 gap-3 text-xs text-left">
<div class="p-3 rounded-lg border-l-4 border-blue-500 bg-gray-900/60">
<div class="font-bold text-blue-300 mb-0.5">E1 &mdash; Refresh the source of truth</div>
<div class="text-gray-400 font-mono text-xs mb-1">refresh-docs.prompt.md</div>
<div class="text-gray-300 text-xs">Use <code>/create-prompt</code> to build a reusable prompt that keeps <code>ARCHITECTURE.md</code> and team instructions aligned after code changes.</div>
</div>
<div class="p-3 rounded-lg border-l-4 border-purple-500 bg-gray-900/60">
<div class="font-bold text-purple-300 mb-0.5">E2 &mdash; Save one strong prompt</div>
<div class="text-gray-400 font-mono text-xs mb-1">good-idea-fairy / risk-prioritizer / commit-helper</div>
<div class="text-gray-300 text-xs">Use <code>/create-prompt</code> to pick one: generate feature ideas, prioritize risks, or automate branch + PR creation.</div>
</div>
<div class="p-3 rounded-lg border-l-4 border-emerald-500 bg-gray-900/60">
<div class="font-bold text-emerald-300 mb-0.5">E3 &mdash; Encode domain knowledge</div>
<div class="text-gray-400 font-mono text-xs mb-1">check-data-accuracy.prompt.md</div>
<div class="text-gray-300 text-xs">Use <code>/create-prompt</code> to build a generic accuracy checker that applies to any entity type and upgrades to live DB queries via MCP in Module 5.</div>
</div>
</div>
</div>
<div class="relative z-10 border-t border-orange-500/20 pt-2 mt-1">
<div class="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">&#x26A1; Part 2 &mdash; Agent Skills</div>
<div class="grid grid-cols-2 gap-3 text-xs text-left">
<div class="p-3 rounded-lg border-l-4 border-blue-400 bg-gray-900/60">
<div class="font-bold text-blue-300 mb-0.5">E4 &mdash; Graduate a prompt to a skill</div>
<div class="text-gray-400 font-mono text-xs mb-1">/create-skill &rarr; check-data-accuracy/</div>
<div class="text-gray-300 text-xs">Use <code>/create-skill</code> to promote the E3 prompt to a skill Copilot reaches for automatically — no manual invocation needed.</div>
</div>
<div class="p-3 rounded-lg border-l-4 border-purple-400 bg-gray-900/60">
<div class="font-bold text-purple-300 mb-0.5">E5 &mdash; Card &amp; page skill</div>
<div class="text-gray-400 font-mono text-xs mb-1">/create-skill &rarr; create-card-and-page/</div>
<div class="text-gray-300 text-xs">Use <code>/create-skill</code> to graduate the M2 plan into a parameterized skill for any FanHub entity type.</div>
</div>
</div>
</div>
<div class="relative z-10 mt-2 px-4 py-2 bg-gradient-to-r from-orange-900/30 via-red-900/20 to-orange-900/30 rounded-xl border border-orange-400/40 flex items-center gap-3">
<div class="text-orange-400 text-lg">&#x26A1;</div>
<div class="text-xs text-gray-200 leading-relaxed"><strong class="text-orange-300">Prompts capture your intent.</strong> Skills make that intent <em class="text-white">available to Copilot</em> &mdash; so it can reach for the right behavior automatically, not just when you remember to ask.</div>
</div>

---

<!-- SLIDE: What Prompt Files Actually Are -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📚 What Prompt Files Actually Are</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4 mt-2 text-left">
<div class="p-3 rounded-xl bg-gradient-to-br from-orange-900/40 to-gray-900/40 border border-orange-500/30 shadow-lg shadow-orange-500/10">
<div class="text-orange-300 font-bold mb-2">Think of them like functions</div>
<ul class="list-none pl-0 m-0 text-sm text-gray-300 space-y-1">
<li>Invoked on demand</li>
<li>Named and discoverable</li>
<li>Parameterized with variables</li>
<li>Designed for specific repeatable tasks</li>
</ul>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30 shadow-lg shadow-purple-500/10">
<div class="text-purple-300 font-bold mb-2">Each file has two layers</div>
<ul class="list-none pl-0 m-0 text-sm text-gray-300 space-y-1">
<li>YAML frontmatter for name, agent, model, tools</li>
<li>A body that explains the task and expected output</li>
<li>Optional links to docs and standards</li>
<li>Optional built-in or input variables</li>
</ul>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30 shadow-lg shadow-blue-500/10">
<div class="text-blue-300 font-bold mb-2">Workspace prompts</div>
<ul class="text-sm text-gray-300 space-y-1">
<li>Live in <code>.github/prompts/</code></li>
<li>Are version-controlled and team-visible</li>
<li>Work best for project-specific workflows</li>
</ul>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-red-900/30 to-gray-900/40 border border-red-500/30 shadow-lg shadow-red-500/10">
<div class="text-red-300 font-bold mb-2">User prompts</div>
<ul class="text-sm text-gray-300 space-y-1">
<li>Live in your VS Code profile</li>
<li>Follow you across projects</li>
<li>Work best for personal, reusable habits</li>
</ul>
</div>
</div>
<div class="relative z-10 mt-3 px-4 py-2 bg-amber-900/20 border border-amber-500/30 rounded-lg flex flex-col gap-1">
  <span class="text-amber-300 text-sm italic">&ldquo;Named, discoverable, parameterized, invoked on demand&hellip; that&rsquo;s a function. Why did nobody just say it was a function? I know how to write functions.&rdquo;</span>
  <span class="text-amber-500 text-xs text-right">&mdash; Jessica</span>
</div>
</div>
---

<!-- SLIDE: Why Prompt Files Matter Here -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-5">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔗 Why Prompt Files Matter Here</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-5 flex-1 text-left">
<div class="p-6 rounded-xl bg-gray-900/60 border border-orange-500/30 flex flex-col">
<div class="text-3xl mb-3">⏳</div>
<div class="text-orange-300 font-bold text-lg mb-3">Less retyping</div>
<div class="text-sm text-gray-300 leading-relaxed">The team stops rebuilding the same careful prompt every time a familiar task appears. Write it once, invoke it forever.</div>
</div>
<div class="p-6 rounded-xl bg-gray-900/60 border border-blue-500/30 flex flex-col">
<div class="text-3xl mb-3">📐</div>
<div class="text-blue-300 font-bold text-lg mb-3">Less standards drift</div>
<div class="text-sm text-gray-300 leading-relaxed">Prompts can reference current architecture and instruction files instead of embedding stale assumptions copied from memory.</div>
</div>
<div class="p-6 rounded-xl bg-gray-900/60 border border-purple-500/30 flex flex-col">
<div class="text-3xl mb-3">🤝</div>
<div class="text-purple-300 font-bold text-lg mb-3">More reusable expertise</div>
<div class="text-sm text-gray-300 leading-relaxed">A strong review or debugging prompt becomes something the entire team can benefit from — not just the person who wrote it.</div>
</div>
</div>
<div class="relative z-10 mt-5 p-5 bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
<div class="text-xl font-bold text-white">Prompt files make standards easier to invoke than to forget.</div>
</div>
</div>

---

<!-- SLIDE: What a Strong Prompt File Includes -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔎 What a Strong Prompt File Includes</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4 mt-3 text-left">
  <div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2 text-sm">Frontmatter</div>
    <ul class="text-xs text-gray-300 space-y-1">
      <li>A clear name and description</li>
      <li>The right agent for the task</li>
      <li>Tool access that matches the prompt&rsquo;s job</li>
      <li>Optional hints that improve invocation</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2 text-sm">Body</div>
    <ul class="text-xs text-gray-300 space-y-1">
      <li>The exact task to perform</li>
      <li>Links to standards or examples when relevant</li>
      <li>The outputs you expect back</li>
      <li>Enough structure to keep results consistent</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-orange-900/40 to-gray-900/40 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2 text-sm">Variables</div>
    <ul class="text-xs text-gray-300 space-y-1">
      <li><code>${file}</code> for current file context</li>
      <li><code>${selection}</code> for focused analysis</li>
      <li><code>${workspaceFolder}</code> for project-aware prompts</li>
      <li><code>${input:...}</code> for parameterized use</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2 text-sm">Good design rule</div>
    <div class="text-xs text-gray-300">The best prompt file is specific enough to save time, but general enough that the team actually uses it more than once.</div>
  </div>
</div>
<div class="relative z-10 mt-3 px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-lg flex flex-col gap-1">
  <span class="text-green-300 text-sm italic">&ldquo;Specific enough to save time, general enough to use more than once. I&rsquo;ve been saying that about functions since 2010. Glad the prompt file agrees.&rdquo;</span>
  <span class="text-green-500 text-xs text-right">&mdash; Sarah</span>
</div>
</div>
---

<!-- SLIDE: What to Validate in the Workshop -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 What to Validate in the Workshop</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-3 gap-5 mt-4 text-left">

  <div class="p-5 rounded-xl bg-gray-900/60 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2">Invocation speed</div>
    <div class="text-sm text-gray-300">Compare writing a repeated prompt manually with invoking the saved version.</div>
  </div>

  <div class="p-5 rounded-xl bg-gray-900/60 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2">Standards alignment</div>
    <div class="text-sm text-gray-300">Check whether linked instructions and architecture docs remove missed checks and stale wording.</div>
  </div>

  <div class="p-5 rounded-xl bg-gray-900/60 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2">Context capture</div>
    <div class="text-sm text-gray-300">Use variables to reduce manual copying and improve prompt consistency during debugging or review.</div>
  </div>

</div>

<div class="mt-8 p-5 bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
  <div class="text-sm text-white font-semibold">Prompt files pay off <span class="text-orange-300 font-bold">twice</span>: once in the time you save, and again every time a teammate runs the <span class="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">same quality bar</span> without asking you how.</div>
</div>

---

<!-- SLIDE: 🔨 Exercises -->
<div class="h-full flex flex-col">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F528; Exercises &mdash; Prompts</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-orange-900/50 to-red-900/40 rounded-xl border border-orange-500/30 text-center mb-3 shadow-lg shadow-orange-900/20">
<div class="text-lg font-bold text-white">3 exercises &middot; ~28 minutes &middot; shared leadership</div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3 flex-1 min-h-0">
<div class="flex flex-col bg-blue-900/30 rounded-xl border border-blue-500/40 overflow-hidden">
<div class="p-4 flex-1">
<div class="flex items-center justify-between mb-3"><div class="text-blue-300 font-bold text-lg">E1</div><span class="text-xs text-gray-500">Rafael &#x2B50;</span></div>
<div class="text-white text-sm font-semibold mb-2">Refresh the docs</div>
<div class="text-gray-400 text-xs leading-relaxed">Build a prompt that reviews the workspace and updates only what changed after any meaningful code push. Run it after every sprint &mdash; docs stay current without anyone tracking it manually.</div>
</div>
<div class="px-4 pb-4 pt-3 border-t border-blue-500/20"><p class="text-blue-200 text-xs italic">"Docs drift is a sprint velocity OKR. I&apos;m logging it."</p></div>
</div>
<div class="flex flex-col bg-purple-900/30 rounded-xl border border-purple-500/40 overflow-hidden">
<div class="p-4 flex-1">
<div class="flex items-center justify-between mb-3"><div class="text-purple-300 font-bold text-lg">E2</div><span class="text-xs text-gray-500">Jessica &#x2B50;</span></div>
<div class="text-white text-sm font-semibold mb-2">Save one strong prompt</div>
<div class="text-gray-400 text-xs leading-relaxed mb-3">Pick one type, write it, save it &mdash; validate it solves something real.</div>
<div class="flex flex-col gap-1.5">
<div class="flex items-center gap-2 px-2.5 py-1.5 bg-purple-900/50 rounded-lg border border-purple-500/30"><span class="text-purple-300 text-xs">&#x1F9DA;</span><span class="text-purple-200 text-xs font-medium">Good Idea Fairy</span><span class="text-gray-500 text-xs ml-1">&mdash; creative feature ideas</span></div>
<div class="flex items-center gap-2 px-2.5 py-1.5 bg-red-900/40 rounded-lg border border-red-500/30"><span class="text-red-300 text-xs">&#x26A0;&#xFE0F;</span><span class="text-red-200 text-xs font-medium">Risk Prioritizer</span><span class="text-gray-500 text-xs ml-1">&mdash; ranked fixes by risk</span></div>
<div class="flex items-center gap-2 px-2.5 py-1.5 bg-cyan-900/40 rounded-lg border border-cyan-500/30"><span class="text-cyan-300 text-xs">&#x1F500;</span><span class="text-cyan-200 text-xs font-medium">Commit Helper</span><span class="text-gray-500 text-xs ml-1">&mdash; branch, commit, PR</span></div>
</div>
</div>
<div class="px-4 pb-4 pt-3 border-t border-purple-500/20"><p class="text-purple-200 text-xs italic">"Wait, I can just&hellip; pick the one I need? Even me?"</p></div>
</div>
<div class="flex flex-col bg-emerald-900/30 rounded-xl border border-emerald-500/40 overflow-hidden">
<div class="p-4 flex-1">
<div class="flex items-center justify-between mb-3"><div class="text-emerald-300 font-bold text-lg">E3</div><span class="text-xs text-gray-500">Marcus &#x2B50;</span></div>
<div class="text-white text-sm font-semibold mb-2">Encode domain knowledge</div>
<div class="text-gray-400 text-xs leading-relaxed">Build a check-data-accuracy prompt that validates any data entity — lore, characters, episodes — against its canonical source before anything hits review. MCP upgrades this to live DB queries in Module 5.</div>
</div>
<div class="px-4 pb-4 pt-3 border-t border-emerald-500/20"><p class="text-emerald-200 text-xs italic">"I had a tab open. Wait. I spent an hour checking that PR manually?"</p></div>
</div>
</div>
<div class="relative z-10 mt-3 p-3 bg-gray-900/40 rounded-lg border border-white/10 text-center text-xs text-gray-400">Each exercise rotates the lead persona &mdash; everyone contributes, everyone follows.</div>
</div>

---

<!-- SLIDE: Exercise 3.1 Creating a Docs Refresh Prompt -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 flex-shrink-0">E1</div>
<div>
<div class="text-blue-300 text-xs font-semibold tracking-widest uppercase">Exercise 1</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Creating a Docs Refresh Prompt</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Rafael ⭐</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 6 min</span>
</div>
</div>
<div class="relative z-10 mb-5 p-4 bg-gray-900/60 rounded-xl border-l-4 border-blue-400 text-sm text-gray-300">
Rafael's already thinking about the next sprint. He's noticed that every time the team plans a feature, Copilot's suggestions drift slightly from what the codebase actually is — because nobody updated the docs after Module 2. <em>That drift compounds.</em> <strong class="text-white">He wants one prompt he can hand to the team: run it after any meaningful change, docs stay current, problem never comes back.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">📋 Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Run <code class="text-cyan-300">/create-prompt</code> in Copilot Chat to scaffold <span class="font-mono text-blue-300">refresh-docs.prompt.md</span> — describe what you want it to do and let Copilot generate the file</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Use <code>/plan </code> and ask for a review the current workspace and update <span class="font-mono text-blue-300">ARCHITECTURE.md</span> and <span class="font-mono text-blue-300">copilot-instructions.md</span> only when the codebase has changed</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Save it, and invoke it after each change to keep the docs aligned with current reality instead of stale memory</span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">✅ Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> The prompt is reusable after any meaningful code change</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> It updates the two source-of-truth docs without turning into a generic repo rewrite</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> The team sees evergreen docs as leverage, not cleanup</div>
</div>
<div class="mt-4 p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/30 text-xs text-gray-300 italic">💭 <strong class="text-cyan-300">Rafael:</strong> "The docs drift is a compounding risk. One prompt, maintained. I'm already thinking about what we build next."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 Example: The refresh-docs Prompt -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-blue-800/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💬 Example: The refresh-docs Prompt</span><div class="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-5">
<div>
<div class="text-xs text-gray-400 mb-2">Type <span class="font-mono text-orange-300">/create-prompt</span> in Copilot Chat, then describe it:</div>
<div class="font-mono text-sm bg-gray-900/80 rounded-xl border border-blue-500/30 p-4 text-gray-200 leading-relaxed select-text cursor-text">
<div class="text-gray-400 text-xs mb-2">User &gt;</div>
<div class="text-gray-200 text-xs mb-3"><span class="text-orange-300">/create-prompt</span> Create a prompt called <span class="text-orange-300">refresh-docs</span> that reviews the workspace and proposes targeted updates to <span class="text-cyan-300">ARCHITECTURE.md</span> and <span class="text-cyan-300">.github/copilot-instructions.md</span> — only sections that are inaccurate or missing. Use the <span class="text-blue-300">plan</span> agent so changes are always reviewed before anything is written.</div>
</div>
</div>
<div class="space-y-3">
<div class="p-3 bg-gray-900/60 rounded-xl border border-orange-500/20 text-xs">
<div class="text-orange-300 font-bold mb-2">How it works</div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">1</span><span>Run <span class="font-mono text-orange-200">/create-prompt</span> in Copilot Chat — describe what you want it to do and tell it to use <span class="font-mono text-orange-200">agent: plan</span></span></div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">2</span><span>Run <span class="font-mono text-orange-200">/refresh-docs</span> in Copilot Chat</span></div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">3</span><span>The Plan agent runs automatically — producing a reviewable plan before anything changes</span></div>
<div class="flex items-start gap-2 text-gray-300"><span class="text-orange-400 mt-0.5">4</span><span>Review the plan, approve, execute</span></div>
</div>
<div class="p-3 bg-blue-900/20 rounded-xl border border-blue-500/30 text-xs text-gray-300">
<div class="text-blue-300 font-bold mb-1">Why this matters</div>
The <span class="font-mono text-blue-200">agent: plan</span> in the prompt is what makes it safe — it never blindly rewrites docs. You always see what it wants to change before a single file is touched.
</div>
<div class="p-3 bg-orange-900/20 rounded-xl border border-orange-500/30 text-xs text-gray-300 italic">
💭 <strong class="text-orange-300">Marcus:</strong> "Wait, I just describe what I want and it generates the whole prompt file? Including the plan agent bit? ...I could get used to this. Anyway — I was reading this Hacker News thread about—"
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Exercise 2 — Save One Strong Prompt -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-3">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30 flex-shrink-0">E2</div>
<div><div class="text-purple-300 text-xs font-semibold tracking-widest uppercase">Exercise 2</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Save One Strong Prompt</h2></div>
<div class="ml-auto flex gap-3 text-xs text-gray-400"><span class="px-3 py-1 bg-gray-800 rounded-full">Jessica &#x2B50;</span><span class="px-3 py-1 bg-gray-800 rounded-full">&#x23F1; 10 min</span></div>
</div>
<div class="relative z-10 mb-3 p-3 bg-gray-900/60 rounded-xl border-l-4 border-purple-400 text-sm text-gray-300">
Jessica has been quietly watching Rafael and Marcus work. She&rsquo;s convinced everyone else is naturally good at this. Then she sees the option list. <em>Any of these could be hers.</em> <strong class="text-white">Pick one prompt type, write it, save it to <code class="text-purple-300">.github/prompts/</code>, and validate it actually solves something real.</strong>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3 mb-3">
<div class="p-3 bg-purple-900/30 rounded-xl border border-purple-500/30"><div class="text-purple-300 font-bold text-xs mb-1">&#x1F9DA; Good Idea Fairy</div><div class="text-gray-400 text-xs leading-snug">Generate bold, creative feature ideas for the FanHub site &mdash; the kind no one&rsquo;s thought to ask for yet</div></div>
<div class="p-3 bg-red-900/30 rounded-xl border border-red-500/30"><div class="text-red-300 font-bold text-xs mb-1">&#x26A0;&#xFE0F; Risk Prioritizer</div><div class="text-gray-400 text-xs leading-snug">Review code, data, and architecture to produce a prioritized list of fixes ranked by actual risk</div></div>
<div class="p-3 bg-cyan-900/30 rounded-xl border border-cyan-500/30"><div class="text-cyan-300 font-bold text-xs mb-1">&#x1F500; Commit Helper</div><div class="text-gray-400 text-xs leading-snug">Create a branch if needed, commit the changeset, and open a well-formed PR &mdash; all in one go</div></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div><div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">&#x1F4CB; Steps</div>
<div class="space-y-1.5 text-xs">
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Pick one of the three prompt types above</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Run <code class="text-cyan-300">/create-prompt</code> in Copilot Chat to scaffold the <code class="text-purple-300">.prompt.md</code> — give it a clear description and focused instructions</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Save to <code class="text-purple-300">.github/prompts/</code> and invoke it &mdash; does it do what you needed?</span></div>
</div></div>
<div><div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">&#x2705; Success Criteria</div>
<div class="space-y-1.5 text-xs text-gray-300">
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Prompt is saved and invokable by name</div>
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Output is useful &mdash; not just plausible-sounding</div>
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> You&rsquo;d actually use this again</div>
</div>
<div class="mt-2 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-purple-300">Jessica:</strong> "Wait, I can just&hellip; pick the one I need? Even me?"</div>
</div></div>
</div>

---

<!-- SLIDE: 🧚 Example: Good Idea Fairy Prompt -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F9DA; Example: Good Idea Fairy</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-5">
<div>
<div class="text-xs text-gray-400 mb-2">Type <span class="font-mono text-orange-300">/create-prompt</span> in Copilot Chat, then describe it:</div>
<div class="font-mono text-xs bg-gray-900/80 rounded-xl border border-purple-500/30 p-4 text-gray-200 leading-relaxed select-text cursor-text">
<div class="text-gray-400 text-xs mb-2">User &gt;</div>
<div class="text-gray-200 text-xs"><span class="text-orange-300">/create-prompt</span> Create a prompt called <span class="text-orange-300">good-idea-fairy</span> that reads <span class="text-cyan-300">ARCHITECTURE.md</span> and generates 5 bold, specific feature ideas for FanHub — each with a punchy name, one-sentence description, why fans would love it, and any technical considerations. Use the <span class="text-blue-300">plan</span> agent.</div>
</div>
</div>
<div class="space-y-3">
<div class="p-3 bg-gray-900/60 rounded-xl border border-orange-500/20 text-xs"><div class="text-orange-300 font-bold mb-2">How it works</div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">1</span><span>Save to <span class="font-mono text-orange-200">.github/prompts/</span></span></div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">2</span><span>Run <span class="font-mono text-orange-200">/good-idea-fairy</span> in Copilot Chat</span></div>
<div class="flex items-start gap-2 text-gray-300"><span class="text-orange-400 mt-0.5">3</span><span>Copilot reads your architecture first &mdash; ideas are creative <em>and</em> grounded</span></div>
</div>
<div class="p-3 bg-purple-900/20 rounded-xl border border-purple-500/30 text-xs text-gray-300"><div class="text-purple-300 font-bold mb-1">Why this matters</div>Grounding ideation in <span class="font-mono text-purple-200">ARCHITECTURE.md</span> means suggestions fit your actual stack &mdash; not generic advice for a generic app.</div>
<div class="p-3 bg-purple-900/20 rounded-xl border border-purple-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-purple-300">Jessica:</strong> "It knew we didn&rsquo;t have a notification system yet. I didn&rsquo;t tell it that. It just&hellip; read the file."</div>
</div></div>
</div>

---

<!-- SLIDE: ⚠️ Example: Risk Prioritizer Prompt -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x26A0;&#xFE0F; Example: Risk Prioritizer</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-5">
<div>
<div class="text-xs text-gray-400 mb-2">Type <span class="font-mono text-orange-300">/create-prompt</span> in Copilot Chat, then describe it:</div>
<div class="font-mono text-xs bg-gray-900/80 rounded-xl border border-purple-500/30 p-4 text-gray-200 leading-relaxed select-text cursor-text">
<div class="text-gray-400 text-xs mb-2">User &gt;</div>
<div class="text-gray-200 text-xs"><span class="text-orange-300">/create-prompt</span> Create a prompt called <span class="text-orange-300">risk-prioritizer</span> that reviews the codebase and <span class="text-cyan-300">ARCHITECTURE.md</span> for top risks across security, data integrity, scalability, and unhandled failures — each with a severity rating and recommended fix, sorted by severity. Use the <span class="text-blue-300">plan</span> agent.</div>
</div>
</div>
<div class="space-y-3">
<div class="p-3 bg-gray-900/60 rounded-xl border border-orange-500/20 text-xs"><div class="text-orange-300 font-bold mb-2">How it works</div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">1</span><span>Save to <span class="font-mono text-orange-200">.github/prompts/</span></span></div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">2</span><span>Run <span class="font-mono text-orange-200">/risk-prioritizer</span> in Copilot Chat</span></div>
<div class="flex items-start gap-2 text-gray-300"><span class="text-orange-400 mt-0.5">3</span><span>Returns a ranked, actionable list &mdash; not a generic checklist</span></div>
</div>
<div class="p-3 bg-red-900/20 rounded-xl border border-red-500/30 text-xs text-gray-300"><div class="text-red-300 font-bold mb-1">Why this matters</div>"Review for risks" without structure returns noise. Categories and severity rubric force Copilot to reason, not just list.</div>
<div class="p-3 bg-purple-900/20 rounded-xl border border-purple-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-purple-300">Jessica:</strong> "It found the unhandled auth timeout I&rsquo;d been meaning to check for three sprints. Just&hellip; there it was. Top of the list."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 🔀 Example: Commit Helper Prompt -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F500; Example: Commit Helper</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-5">
<div>
<div class="text-xs text-gray-400 mb-2">Type <span class="font-mono text-orange-300">/create-prompt</span> in Copilot Chat, then describe it:</div>
<div class="font-mono text-xs bg-gray-900/80 rounded-xl border border-purple-500/30 p-4 text-gray-200 leading-relaxed select-text cursor-text">
<div class="text-gray-400 text-xs mb-2">User &gt;</div>
<div class="text-gray-200 text-xs"><span class="text-orange-300">/create-prompt</span> Create a prompt called <span class="text-orange-300">commit-helper</span> that looks at current git changes, creates a feature branch if needed, stages changes, writes a conventional commit message, pushes, and opens a PR with a clear title and description — asking for confirmation before the PR is created. Use the <span class="text-blue-300">agent</span> mode.</div>
</div>
</div>
<div class="space-y-3">
<div class="p-3 bg-gray-900/60 rounded-xl border border-orange-500/20 text-xs"><div class="text-orange-300 font-bold mb-2">How it works</div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">1</span><span>Save to <span class="font-mono text-orange-200">.github/prompts/</span></span></div>
<div class="flex items-start gap-2 text-gray-300 mb-1"><span class="text-orange-400 mt-0.5">2</span><span>Run <span class="font-mono text-orange-200">/commit-helper</span> in agent mode</span></div>
<div class="flex items-start gap-2 text-gray-300"><span class="text-orange-400 mt-0.5">3</span><span>Copilot handles branch &rarr; commit &rarr; PR and asks for confirmation before submitting</span></div>
</div>
<div class="p-3 bg-cyan-900/20 rounded-xl border border-cyan-500/30 text-xs text-gray-300"><div class="text-cyan-300 font-bold mb-1">Why this matters</div>The confirmation step keeps you in control. You get the automation without losing the review &mdash; Copilot prepares, you approve.</div>
<div class="p-3 bg-purple-900/20 rounded-xl border border-purple-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-purple-300">Jessica:</strong> "It wrote a better PR description than I would have. And it remembered to create the branch first. I always forget the branch."</div>
</div></div>
</div>

---

<!-- SLIDE: Exercise 3.3 Data Accuracy Check -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-3">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30 flex-shrink-0">E3</div>
<div>
<div class="text-emerald-300 text-xs font-semibold tracking-widest uppercase">Exercise 3</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Data Accuracy Check</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Marcus ⭐</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">Sarah 🤝</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 12 min</span>
</div>
</div>
<div class="relative z-10 mb-3 p-3 bg-gray-900/60 rounded-xl border-l-4 border-emerald-400 text-sm text-gray-300">
Marcus shipped the <span class="font-mono text-emerald-200">/lore</span> page last sprint. Now he's batch-generating entries with Copilot — ten show facts in fifteen minutes. The PR looks fine. Sarah reviews it and finds errors. She flags them. She is not doing this every sprint. <strong class="text-white">Marcus needs a prompt that validates any data entity — lore entries, character bios, episode records — against the canonical source before it goes into the database.</strong> In Module 5, MCP gives that source live DB access. For now, the reference is a markdown file.
</div>
<div class="relative z-10 grid grid-cols-2 gap-3">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">📋 Steps</div>
<div class="space-y-1.5 text-xs">
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0">1</span><span class="text-gray-300">Run <code class="text-cyan-300">/create-prompt</code> in Copilot Chat to scaffold <span class="font-mono text-emerald-300">check-data-accuracy.prompt.md</span> — tell it to use <span class="font-mono text-cyan-300">${selection}</span> for the content and <span class="font-mono text-cyan-300">${input:entityType}</span> for the domain, or let Copilot infer it</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0">2</span><span class="text-gray-300">Reference your canonical source file (e.g. <span class="font-mono text-emerald-300">docs/[show]-universe.md</span>) — no hardcoded entity names in the prompt body</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0">3</span><span class="text-gray-300">Test: select a known-bad entry → prompt must flag the error with the correct value</span></div>
<div class="flex items-start gap-3 p-2 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0">4</span><span class="text-gray-300">Test: select a correct entry → prompt must pass with no false positives</span></div>
</div>
</div>
<div class="space-y-2">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">✅ Success Criteria</div>
<div class="space-y-1.5 text-xs text-gray-300">
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Prompt saved under <code>.github/prompts</code></div>
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> <span class="font-mono">${selection}</span> used — no hardcoded entry names</div>
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Works on at least two different entity types (e.g. lore + character)</div>
<div class="flex items-center gap-2 p-1.5 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Correct entry passes with no false positives</div>
</div>
<div class="mt-2 p-3 bg-emerald-900/30 rounded-lg border border-emerald-500/30 text-xs text-gray-300 italic">💭 <strong class="text-cyan-300">Marcus:</strong> "Wait — if the canonical rules are in a reference file, I just... point the prompt at each entry? And in Module 5, that reference becomes a live DB query?"</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: check-data-accuracy.prompt.md -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: check-data-accuracy.prompt.md</span><div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex gap-4 flex-1 min-h-0">
<div class="select-text font-mono text-xs bg-gray-900/80 rounded-xl border border-emerald-500/30 p-4 text-gray-300 leading-relaxed flex-1 overflow-auto">
<div class="text-gray-400 text-xs mb-2">User &gt;</div>
<div class="text-gray-200 mb-4"><span class="text-orange-300">/create-prompt</span> Create a prompt called <span class="text-orange-300">check-data-accuracy</span> that verifies a selected text entry against the canonical reference file for that domain. It identifies the entity type from the selection, locate the relevant reference in the project, check each factual claim, and flag inaccuracies with specific corrections. Use the <span class="text-blue-300">ask</span> agent and respond with Status, Issues, and Verified claims.</div>
<div class="border-t border-emerald-500/20 pt-3 text-gray-400 text-xs">Copilot generates <span class="text-emerald-300">.github/prompts/check-data-accuracy.prompt.md</span> with <span class="text-emerald-300">agent: ask</span>, <span class="text-cyan-300">&#36;{selection}</span> as the input variable, and structured output format.</div>
</div>
<div class="flex flex-col gap-2 text-xs w-44 flex-shrink-0">
<div class="p-2 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
<div class="text-emerald-300 font-bold mb-1">🔗 No hardcoded domain</div>
<div class="text-gray-300">Copilot infers entity type from the selection — works for lore, characters, episodes, ratings, or any new entity</div>
</div>
<div class="p-2 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
<div class="text-cyan-300 font-bold mb-1">✂️ ${selection}</div>
<div class="text-gray-300">Select any entry in the editor, invoke — no copy-paste needed</div>
</div>
<div class="p-2 bg-purple-900/20 rounded-lg border border-purple-500/30">
<div class="text-purple-300 font-bold mb-1">🗄️ MCP-ready</div>
<div class="text-gray-300">In Module 5, "query via MCP if available" activates — same prompt, live DB reference instead of a markdown file</div>
</div>
<div class="p-2 bg-gray-900/60 rounded-lg border border-gray-700/40">
<div class="text-gray-400 font-bold mb-1">💡 Then invoke it</div>
<div class="text-gray-400">Select any entry in the editor and run <span class="font-mono text-emerald-300">/check-data-accuracy</span></div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 Example: Step 3 — Test an Inaccurate Entry -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💬 Example: Step 3 — Test an Inaccurate Entry</span><div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 mb-3 text-xs text-gray-400">Demo domain: Breaking Bad lore. Select this entry in your editor, then run <span class="font-mono text-emerald-300">/check-data-accuracy</span>:</div>
<div class="relative z-10 font-mono text-base bg-red-900/20 rounded-xl border border-red-500/30 p-6 text-gray-200 leading-relaxed mb-5 select-all flex-1">
<div class="text-orange-400 font-bold mb-4 text-lg">/check-data-accuracy</div>
<div class="text-gray-500 text-sm mb-3">Title: "Walter &amp; Jesse — Origin"</div>
<div class="text-base leading-loose">Walter White recruited Jesse Pinkman as his partner after reconnecting with him on the street. Jesse had been Walter's former student at the <span class="text-red-400 font-bold">University of New Mexico</span>, where Walter taught a chemistry course.</div>
</div>
<div class="relative z-10 p-4 bg-gray-900/60 rounded-xl border border-gray-600/40 text-sm text-gray-300 italic">
💭 <strong class="text-cyan-300">David:</strong> "I'm going to stop you right there. Walter White has a <em>Master's degree</em>. From the show. That he teaches at a high school is, frankly, the entire dramatic irony of the series. This is not a subtle error."
</div>
</div>

---

<!-- SLIDE: 📋 Example: Step 3 — Output (Error Flagged) -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: Step 3 — Output (Error Flagged)</span><div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 font-mono text-xs bg-gray-900/80 rounded-xl border border-red-500/30 p-4 text-gray-200 leading-relaxed">
<div class="text-red-400 font-bold mb-3 text-sm">Status: <span class="text-red-300">Inaccurate</span></div>
<div class="text-gray-400 font-semibold mb-2">Issues:</div>
<div class="space-y-2 mb-3 pl-3 border-l-2 border-red-500/40">
<div class="text-gray-300">Walter White taught at J.P. Wynne <span class="text-orange-300 font-bold">High School</span> — not the University of New Mexico. He was a high school chemistry teacher, not a university lecturer.</div>
<div class="text-gray-300">Jesse Pinkman is described as Walt's former student, which is correct, but the institution is wrong. The connection is from <span class="text-orange-300 font-bold">high school</span>, not a university.</div>
</div>
<div class="text-gray-400 font-semibold mb-2">Verified claims:</div>
<div class="space-y-1 pl-3 border-l-2 border-green-500/40">
<div class="text-green-300">✓ Walter White and Jesse Pinkman are partners</div>
<div class="text-green-300">✓ Jesse was Walter's former student</div>
<div class="text-green-300">✓ Jesse was a small-time meth cook prior to their partnership</div>
</div>
</div>
<div class="relative z-10 mt-4 p-3 bg-gray-900/60 rounded-xl border border-gray-600/40 text-xs text-gray-300 italic">
💭 <strong class="text-cyan-300">Sarah:</strong> "Yes, Marcus. Walter White was a <em>high school</em> teacher. This is literally the premise of the show. The prompt caught it. You're welcome."
</div>
</div>

---

<!-- SLIDE: 💬 Example: Step 4 — Test a Correct Entry -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💬 Example: Step 4 — Test a Correct Entry</span><div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 mb-3 text-xs text-gray-400">Same demo domain. Select this entry and run <span class="font-mono text-emerald-300">/check-data-accuracy</span> again — validate no false positives:</div>
<div class="relative z-10 font-mono text-base bg-green-900/20 rounded-xl border border-green-500/30 p-6 text-gray-200 leading-relaxed mb-5 select-all flex-1">
<div class="text-orange-400 font-bold mb-4 text-lg">/check-data-accuracy</div>
<div class="text-gray-500 text-sm mb-3">Title: "The Blue Sky Formula"</div>
<div class="text-base leading-loose">Walter White's methamphetamine, known on the street as "Blue Sky," achieved a purity level exceeding <span class="text-green-300 font-bold">99%</span> — far beyond any competitor. Its distinctive blue tint came from the synthesis method Walter developed at the Superlab.</div>
</div>
<div class="relative z-10 p-4 bg-gray-900/60 rounded-xl border border-gray-600/40 text-sm text-gray-300 italic">
💭 <strong class="text-cyan-300">Jessica:</strong> "Wait, so if it passes that means it's... good? Like, Copilot checked it and it was right? That's so cool. I feel like we just gave the app a immune system."
</div>
</div>

---

<!-- SLIDE: 📋 Example: Step 4 — Output (Partially Accurate / Unverifiable) -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: Step 4 — Output (Partially Accurate / Unverifiable)</span><div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 font-mono text-[10.5px] bg-gray-900/80 rounded-xl border border-yellow-500/30 p-4 text-gray-200 leading-relaxed mb-3 flex-1">
<div class="text-yellow-400 font-bold mb-2 text-xs">Status: <span class="text-yellow-300">Partially Accurate / Partially Unverifiable</span></div>
<div class="text-gray-400 font-semibold mb-1">Issues:</div>
<div class="space-y-1 mb-3 pl-3 border-l-2 border-yellow-500/40">
<div class="text-gray-300">The exact purity figure in the reference is <span class="text-orange-300 font-bold">99.1%</span>, not just "exceeding 99%" — minor but worth being precise in a lore entry.</div>
<div class="text-gray-300">The claim that the blue tint came from "the synthesis method Walter developed" is <span class="text-yellow-300">not verifiable</span> from breaking-bad-universe.md — the reference does not explain the chemical reason for the color.</div>
</div>
<div class="text-gray-400 font-semibold mb-1">Verified claims:</div>
<div class="space-y-1 pl-3 border-l-2 border-green-500/40">
<div class="text-green-300">✓ The product is known as "Blue Sky" (implied by the blue color reference)</div>
<div class="text-green-300">✓ Purity exceeds 99% — confirmed at 99.1% in the reference</div>
<div class="text-green-300">✓ The product has a distinctive blue color — confirmed</div>
<div class="text-green-300">✓ It was cooked in the Superlab — confirmed</div>
<div class="text-green-300">✓ It became known worldwide — confirmed explicitly in the reference</div>
</div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-3 text-xs">
<div class="p-3 bg-green-900/20 rounded-xl border border-green-500/30">
<div class="text-green-300 font-bold mb-1">Why this matters</div>
<div class="text-gray-300">A prompt that only flags violations is fragile — you need to confirm it doesn't false-positive on accurate content before trusting it</div>
</div>
<div class="p-3 bg-orange-900/20 rounded-xl border border-orange-500/30">
<div class="text-orange-300 font-bold mb-1">Now try it on your show</div>
<div class="text-gray-300">The same prompt works for any entity type — lore, characters, episodes, ratings, or any data domain. It infers the domain from <span class="font-mono text-cyan-300">${selection}</span> and reads the reference dynamically. In Module 5, that reference becomes a live DB query via MCP.</div>
</div>
</div>
</div>

---

<!-- SLIDE: &#x1F4AC; The Team, After the Prompt Exercises -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4AC; The Team, After the Prompt Exercises</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-amber-400">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"Wait &mdash; I can just pick the one I need? The risk-prioritizer or the commit-helper? Even me? I don't have to write the whole thing from scratch every time?"</div>
<div class="text-xs text-gray-500">Realizing she can use the good version, not just her version.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-blue-400">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"To be precise: this isn't automation. It's codification. We're encoding the decision, not removing it. That distinction matters."</div>
<div class="text-xs text-gray-500">Correcting the framing before conceding the point.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-green-400">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"I checked. The check-data-accuracy caught the same error three times in a row. Three for three. Consistent beats clever. I'll take it."</div>
<div class="text-xs text-gray-500">Running the numbers before endorsing anything.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-purple-400">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"Okay but I need edge cases. What if the lore entry is partially correct? Does it flag the wrong part? Show me the failure mode first."</div>
<div class="text-xs text-gray-500">Not satisfied until she's seen what breaks.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-orange-400">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"Sorry &mdash; I was half-reading a thread about prompt files. Wait. We can check these in? They travel with the repo? That's actually&hellip; hold on."</div>
<div class="text-xs text-gray-500">Snapping into focus mid-sentence.</div>
</div>
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-cyan-400">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"The data-check is already an OKR input. If canon accuracy goes up, lore engagement goes up. I'm mapping this to Q3. Can we move on?"</div>
<div class="text-xs text-gray-500">Already three steps ahead, agenda in hand.</div>
</div>
</div>
</div>

---

<!-- SLIDE: The Check Works. It Just Doesn't Run Itself. -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F9E0; Mindful Moment</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex items-stretch gap-0 mb-3 rounded-xl overflow-hidden border border-white/10">
<div class="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gray-800/60">
<span class="text-green-400 text-base">&#x2713;</span>
<div>
<div class="text-gray-500 text-xs font-semibold tracking-widest uppercase">Part 1</div>
<div class="text-gray-300 text-sm font-semibold">Custom Prompts</div>
</div>
</div>
<div class="flex items-center px-4 bg-gradient-to-r from-gray-800/60 to-orange-900/60">
<span class="text-orange-400 text-xl font-bold">&#x2192;</span>
</div>
<div class="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-orange-900/50 to-red-900/40 border-l border-orange-500/30">
<span class="text-orange-400 text-base">&#x25B6;</span>
<div>
<div class="text-orange-400 text-xs font-semibold tracking-widest uppercase">Part 2 — Starting Now</div>
<div class="text-white text-sm font-semibold">Agent Skills</div>
</div>
</div>
</div>
<h2 class="relative z-10 text-2xl font-bold text-white mb-1">Prompts Work. But They Don't Run Themselves.</h2>
<p class="relative z-10 text-gray-400 text-xs mb-3">Elena spent the morning running <code class="bg-gray-800 px-1 rounded text-orange-300">/check-data-accuracy</code> before every PR. It worked perfectly &mdash; every time she remembered to invoke it.</p>
<div class="relative z-10 grid grid-cols-2 gap-4 mb-3">
<div class="bg-gray-900/40 rounded-xl p-4 border border-gray-700/30 flex flex-col gap-2 opacity-75">
<div class="text-gray-400 font-semibold text-xs tracking-wide uppercase">A prompt is invoked</div>
<ul class="text-gray-400 text-xs space-y-1.5">
<li>&#x2705; Accurate when you remember to run it</li>
<li>&#x2705; Fast to create and iterate</li>
<li>&#x2705; Great for on-demand tasks</li>
<li class="text-gray-500">&#x26A0;&#xFE0F; Depends on the human in the loop</li>
</ul>
</div>
<div class="bg-gray-900/60 rounded-xl p-4 border border-orange-500/40 flex flex-col gap-2 shadow-lg shadow-orange-900/20">
<div class="text-orange-400 font-semibold text-xs tracking-wide uppercase">A skill is embedded &#x2190; we&rsquo;re building this</div>
<ul class="text-gray-300 text-xs space-y-1.5">
<li>&#x2705; Available whenever Copilot works with lore content</li>
<li>&#x2705; Cites sources automatically</li>
<li>&#x2705; Runs as part of the workflow</li>
<li class="text-green-400">&#x2728; The domain knowledge is in the system</li>
</ul>
</div>
</div>
<div class="relative z-10 flex gap-3 items-start bg-gray-900/50 rounded-xl px-4 py-3 border border-white/10">
<div class="text-orange-500/60 text-5xl font-serif leading-none mt-[-4px] flex-shrink-0">&ldquo;</div>
<div>
<p class="text-gray-300 text-xs italic leading-relaxed">"There's a distinction worth making. A prompt is a <span class="text-orange-300 font-semibold not-italic">what</span> &mdash; you define the output shape and invoke it when you need it. A skill is a <span class="text-orange-300 font-semibold not-italic">when and a how</span> &mdash; Copilot knows to use it, and knows which resources to consult. Elena built the what. <span class="text-white not-italic font-medium">Now we build the when.</span>"</p>
<div class="flex items-center gap-2 mt-1.5">
<div class="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">D</div>
<span class="text-orange-400 text-xs">David, who would like the record to show he made this distinction before it became obvious</span>
</div>
</div>
</div>

---

<!-- SLIDE: 📚 What Agent Skills Actually Are -->
<div class="h-full flex flex-col">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4DA; What Agent Skills Actually Are</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<p class="relative z-10 text-gray-400 text-xs mb-3">A skill isn&rsquo;t a fancy prompt. It&rsquo;s a packaged capability &mdash; instructions, resources, and context Copilot reaches for automatically.</p>
<div class="relative z-10 grid grid-cols-2 gap-3 flex-1 min-h-0">
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-purple-900/50 to-gray-900/50 border border-purple-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F4E6;</span><div class="text-purple-300 font-bold text-sm">A capability package</div></div>
<div class="text-xs text-gray-300 space-y-2 leading-snug flex-1">
<div class="flex gap-2"><span class="text-purple-400 mt-0.5">&#x2022;</span><span><code class="bg-purple-900/40 px-1 rounded text-purple-200">SKILL.md</code> explains the workflow and goals</span></div>
<div class="flex gap-2"><span class="text-purple-400 mt-0.5">&#x2022;</span><span>Resources can include scripts, examples, schemas, and templates</span></div>
<div class="flex gap-2"><span class="text-purple-400 mt-0.5">&#x2022;</span><span>The goal is a complete task capability, not just a reminder</span></div>
</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-blue-900/50 to-gray-900/50 border border-blue-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x26A1;</span><div class="text-blue-300 font-bold text-sm">Progressive loading</div></div>
<div class="text-xs text-gray-300 space-y-2 leading-snug flex-1">
<div class="flex gap-2"><span class="text-blue-400 mt-0.5">&#x2022;</span><span><span class="text-blue-200 font-medium">Discovery:</span> metadata is known up front</span></div>
<div class="flex gap-2"><span class="text-blue-400 mt-0.5">&#x2022;</span><span><span class="text-blue-200 font-medium">Instructions:</span> the body loads when relevant</span></div>
<div class="flex gap-2"><span class="text-blue-400 mt-0.5">&#x2022;</span><span><span class="text-blue-200 font-medium">Resources:</span> scripts and examples load only when needed</span></div>
</div>
<div class="mt-2 text-blue-400/70 text-xs italic">Context-efficient by design</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-cyan-900/40 to-purple-900/30 border border-cyan-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F5C2;&#xFE0F;</span><div class="text-cyan-300 font-bold text-sm">Project &amp; personal scopes</div></div>
<div class="text-xs text-gray-300 space-y-2 leading-snug flex-1">
<div class="flex gap-2"><span class="text-cyan-400 mt-0.5">&#x2022;</span><span>Project skills live in <code class="bg-cyan-900/40 px-1 rounded text-cyan-200">.github/skills/</code></span></div>
<div class="flex gap-2"><span class="text-cyan-400 mt-0.5">&#x2022;</span><span>Personal skills live in your home skill directory</span></div>
<div class="flex gap-2"><span class="text-cyan-400 mt-0.5">&#x2022;</span><span>Shared workflow belongs with the repo &mdash; not in someone&rsquo;s head</span></div>
</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-orange-900/50 to-red-900/30 border border-orange-500/40 shadow-lg shadow-orange-900/20">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x2728;</span><div class="text-orange-300 font-bold text-sm">The differentiator</div></div>
<div class="text-xs text-gray-200 leading-relaxed flex-1">Skills go beyond <span class="text-gray-400 italic">"say this"</span> and into <span class="text-orange-300 font-semibold">"use these resources, run this script, follow this workflow."</span></div>
<div class="mt-3 pt-2 border-t border-orange-500/20 text-xs text-orange-300/70 italic">Prompts you invoke. Skills Copilot reaches for.</div>
</div>
</div>
</div>

---

<!-- SLIDE: 🔎 Skill Structure and Loading -->
<div class="h-full flex flex-col">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F50E; Skill Structure and Loading</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<p class="relative z-10 text-gray-400 text-xs mb-2">Skills are folders, not files &mdash; a structured package Copilot loads progressively as the task demands it.</p>
<div class="relative z-10 grid grid-cols-2 gap-2 flex-1 min-h-0 mb-2">
<div class="flex flex-col p-3 rounded-xl bg-gradient-to-br from-blue-900/50 to-gray-900/50 border border-blue-500/30">
<div class="flex items-center gap-2 mb-2"><span class="text-2xl">&#x1F4C1;</span><div class="text-blue-300 font-bold text-sm">Typical structure</div></div>
<div class="font-mono text-xs text-gray-300 space-y-1 flex-1">
<div class="text-blue-300">.github/skills/check-data-accuracy/</div>
<div class="pl-4 text-orange-300">&#x251C;&#x2500; SKILL.md</div>
<div class="pl-4 text-gray-400">&#x251C;&#x2500; scripts/</div>
<div class="pl-4 text-gray-400">&#x251C;&#x2500; examples/</div>
<div class="pl-4 text-gray-400">&#x2514;&#x2500; templates/</div>
</div>
<div class="mt-3 text-xs text-blue-400/70 italic">SKILL.md is the entry point &mdash; everything else loads on demand</div>
</div>
<div class="flex flex-col p-3 rounded-xl bg-gradient-to-br from-purple-900/50 to-gray-900/50 border border-purple-500/30">
<div class="flex items-center gap-2 mb-2"><span class="text-2xl">&#x26A1;</span><div class="text-purple-300 font-bold text-sm">Loading model</div></div>
<div class="space-y-2 flex-1">
<div class="flex items-start gap-3">
<span class="px-2 py-0.5 bg-purple-900/60 rounded text-purple-300 text-xs font-mono flex-shrink-0">1</span>
<span class="text-xs text-gray-300">Copilot sees the <span class="text-purple-200 font-medium">skill name and description</span> up front</span>
</div>
<div class="flex items-start gap-3">
<span class="px-2 py-0.5 bg-purple-900/60 rounded text-purple-300 text-xs font-mono flex-shrink-0">2</span>
<span class="text-xs text-gray-300">The <span class="text-purple-200 font-medium">body loads</span> when the task matches</span>
</div>
<div class="flex items-start gap-3">
<span class="px-2 py-0.5 bg-purple-900/60 rounded text-purple-300 text-xs font-mono flex-shrink-0">3</span>
<span class="text-xs text-gray-300"><span class="text-purple-200 font-medium">Referenced resources</span> load only on demand</span>
</div>
<div class="flex items-start gap-3">
<span class="px-2 py-0.5 bg-green-900/60 rounded text-green-300 text-xs font-mono flex-shrink-0">&#x2713;</span>
<span class="text-xs text-gray-300">Many skills can exist without bloating every session</span>
</div>
</div>
</div>
</div>
<div class="relative z-10 p-2 bg-gradient-to-r from-orange-900/40 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
<div class="text-xs font-bold text-white">Progressive loading is what makes <span class="text-orange-300">many skills practical</span> instead of expensive.</div>
</div>

<div class="relative z-10 mt-2 px-4 py-2 bg-orange-900/20 border border-orange-500/30 rounded-lg flex flex-col gap-1">
  <span class="text-orange-300 text-sm italic">&ldquo;Lazy loading. For prompts. That&rsquo;s just lazy loading. I don&rsquo;t know why that makes me happy, but it does.&rdquo;</span>
  <span class="text-orange-500 text-xs text-right">&mdash; Marcus</span>
</div>
</div>
---

<!-- SLIDE: 🔄 Skills vs Instructions vs Prompts -->
<div class="h-full flex flex-col">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F504; Skills vs Instructions vs Prompts</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<p class="relative z-10 text-gray-400 text-xs mb-3">Three tools, three jobs. Each one belongs in a different place in your workflow.</p>
<div class="relative z-10 grid grid-cols-3 gap-3 flex-1 min-h-0 mb-3">
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-blue-900/50 to-gray-900/50 border border-blue-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F4CB;</span><div class="text-blue-300 font-bold text-sm">Instructions</div></div>
<div class="text-xs text-gray-400 italic mb-3">Always-on context</div>
<div class="space-y-2 flex-1">
<div class="flex gap-2"><span class="text-blue-400">&#x2022;</span><span class="text-xs text-gray-300">Best for behavior and standards</span></div>
<div class="flex gap-2"><span class="text-blue-400">&#x2022;</span><span class="text-xs text-gray-300">Often always-on or path-scoped</span></div>
<div class="flex gap-2"><span class="text-blue-400">&#x2022;</span><span class="text-xs text-gray-300">Tell Copilot <span class="text-blue-200 font-medium">how to work</span></span></div>
</div>
<div class="mt-3 pt-2 border-t border-blue-500/20 text-xs text-blue-400/70 font-mono">.github/copilot-instructions.md</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-orange-900/50 to-gray-900/50 border border-orange-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F4AC;</span><div class="text-orange-300 font-bold text-sm">Prompts</div></div>
<div class="text-xs text-gray-400 italic mb-3">On-demand commands</div>
<div class="space-y-2 flex-1">
<div class="flex gap-2"><span class="text-orange-400">&#x2022;</span><span class="text-xs text-gray-300">Best for repeated invocations</span></div>
<div class="flex gap-2"><span class="text-orange-400">&#x2022;</span><span class="text-xs text-gray-300">Save and reuse strong request wording</span></div>
<div class="flex gap-2"><span class="text-orange-400">&#x2022;</span><span class="text-xs text-gray-300">Turn common tasks into <span class="text-orange-200 font-medium">/commands</span></span></div>
</div>
<div class="mt-3 pt-2 border-t border-orange-500/20 text-xs text-orange-400/70 font-mono">.github/prompts/*.prompt.md</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-purple-900/50 to-gray-900/50 border border-purple-500/40 shadow-lg shadow-purple-900/20">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F9E0;</span><div class="text-purple-300 font-bold text-sm">Skills</div></div>
<div class="text-xs text-gray-400 italic mb-3">Packaged capabilities</div>
<div class="space-y-2 flex-1">
<div class="flex gap-2"><span class="text-purple-400">&#x2022;</span><span class="text-xs text-gray-300">Best for specialized capabilities</span></div>
<div class="flex gap-2"><span class="text-purple-400">&#x2022;</span><span class="text-xs text-gray-300">Combine instructions with resources and scripts</span></div>
<div class="flex gap-2"><span class="text-purple-400">&#x2022;</span><span class="text-xs text-gray-300">Teach <span class="text-purple-200 font-medium">complete workflows</span> Copilot can apply</span></div>
</div>
<div class="mt-3 pt-2 border-t border-purple-500/20 text-xs text-purple-400/70 font-mono">.github/skills/*/SKILL.md</div>
</div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-blue-900/30 via-orange-900/30 to-purple-900/30 rounded-xl border border-white/10 text-center">
<div class="text-sm font-bold text-white">Instructions <span class="text-blue-300">guide behavior</span>. Prompts <span class="text-orange-300">package requests</span>. Skills <span class="text-purple-300">package capability</span>.</div>
</div>
</div>

---

<!-- SLIDE: 📊 What to Validate -->
<div class="h-full flex flex-col">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F4CA; What to Validate in the Workshop</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<p class="relative z-10 text-gray-400 text-xs mb-3">A skill that sounds right but doesn&rsquo;t improve the work isn&rsquo;t a skill &mdash; it&rsquo;s documentation. Test for real impact.</p>
<div class="relative z-10 grid grid-cols-3 gap-3 flex-1 min-h-0 mb-3">
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-blue-900/50 to-gray-900/50 border border-blue-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F3AF;</span><div class="text-blue-300 font-bold text-sm">Capability fit</div></div>
<div class="text-xs text-gray-300 leading-relaxed flex-1">Check whether the skill actually <span class="text-blue-200 font-medium">teaches the workflow</span>, not just describes it. Confirm Copilot can complete the task with the skill alone.</div>
<div class="mt-3 p-2 bg-blue-900/30 rounded-lg border border-blue-500/20 text-xs text-blue-300/80 italic">Does it change what Copilot can do?</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-purple-900/50 to-gray-900/50 border border-purple-500/30">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x1F4DA;</span><div class="text-purple-300 font-bold text-sm">Resource usefulness</div></div>
<div class="text-xs text-gray-300 leading-relaxed flex-1">Validate that examples, templates, schemas, or scripts <span class="text-purple-200 font-medium">materially improve</span> the output &mdash; not just add bulk to the context.</div>
<div class="mt-3 p-2 bg-purple-900/30 rounded-lg border border-purple-500/20 text-xs text-purple-300/80 italic">Does each resource earn its place?</div>
</div>
<div class="flex flex-col p-4 rounded-xl bg-gradient-to-br from-orange-900/50 to-red-900/30 border border-orange-500/40 shadow-lg shadow-orange-900/20">
<div class="flex items-center gap-2 mb-3"><span class="text-2xl">&#x23F1;&#xFE0F;</span><div class="text-orange-300 font-bold text-sm">Time &amp; rework saved</div></div>
<div class="text-xs text-gray-300 leading-relaxed flex-1">Compare specialized tasks <span class="text-orange-200 font-medium">with and without</span> the skill in place. The delta is the proof.</div>
<div class="mt-3 p-2 bg-orange-900/30 rounded-lg border border-orange-500/20 text-xs text-orange-300/80 italic">Would you skip this skill next time?</div>
</div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-orange-900/40 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
<div class="text-sm font-bold text-white">A real skill changes the <span class="text-orange-300">quality of work</span>, not just the wording of the prompt.</div>
</div>
</div>

---

<!-- SLIDE: &#x1F528; Exercises — Skills -->
<div class="h-full flex flex-col">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F528; Exercises &mdash; Skills</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 p-3 bg-gradient-to-r from-orange-900/50 to-red-900/40 rounded-xl border border-orange-500/30 text-center mb-3 shadow-lg shadow-orange-900/20">
<div class="text-lg font-bold text-white">2 exercises &middot; ~30 minutes &middot; shared leadership</div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-3 flex-1 min-h-0">
<div class="flex flex-col bg-blue-900/30 rounded-xl border border-blue-500/40 overflow-hidden">
<div class="p-4 flex-1">
<div class="flex items-center justify-between mb-3"><div class="text-blue-300 font-bold text-lg">E4</div><span class="text-xs text-gray-500">Sarah &#x2B50;</span></div>
<div class="text-white text-sm font-semibold mb-2">Graduate a prompt to a skill</div>
<div class="text-gray-400 text-xs leading-relaxed">Use <code>/create-skill</code> to promote check-data-accuracy from a prompt you invoke to a skill Copilot reaches for automatically.</div>
</div>
<div class="px-4 pb-4 pt-3 border-t border-blue-500/20"><p class="text-blue-200 text-xs italic">"One command. It read the prompt, inferred the triggers, built the folder. I didn&rsquo;t write a single line of SKILL.md by hand."</p></div>
</div>
<div class="flex flex-col bg-purple-900/30 rounded-xl border border-purple-500/40 overflow-hidden">
<div class="p-4 flex-1">
<div class="flex items-center justify-between mb-3"><div class="text-purple-300 font-bold text-lg">E5</div><span class="text-xs text-gray-500">Marcus &#x2B50;</span></div>
<div class="text-white text-sm font-semibold mb-2">Card creation as a repeatable skill</div>
<div class="text-gray-400 text-xs leading-relaxed">Take the M2 plan-mode output for creating lore cards and graduate it into a parameterized skill that generates a card + detail page for any FanHub entity type.</div>
</div>
<div class="px-4 pb-4 pt-3 border-t border-purple-500/20"><p class="text-purple-200 text-xs italic">"Wait &mdash; I wrote the same plan twice. That&rsquo;s a pattern. Patterns become skills." <span class="text-gray-500 not-italic">[tab-switches, tab-switches back]</span> "Okay I&rsquo;m back. Let&rsquo;s build it."</p></div>
</div>
</div>
<div class="relative z-10 mt-3 p-3 bg-gray-900/40 rounded-lg border border-white/10 text-center text-xs text-gray-400">Each exercise rotates the lead persona &mdash; everyone contributes, everyone follows.</div>
</div>

---

<!-- SLIDE: 🔧 Exercise 4 — Graduate a Prompt to a Skill -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 flex-shrink-0">E4</div>
<div>
<div class="text-blue-300 text-xs font-semibold tracking-widest uppercase">Exercise 4</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Graduate a Prompt to a Skill</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Sarah ⭐</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 10 min</span>
</div>
</div>
<div class="relative z-10 mb-4 p-4 bg-gray-900/60 rounded-xl border-l-4 border-blue-400 text-sm text-gray-300">
The team has three prompt files from E1–E3. Sarah notices that <code class="text-orange-300">/check-data-accuracy</code> is being invoked before every PR — manually, every time. <em>A prompt you invoke and a skill Copilot reaches for automatically are not the same thing.</em> <strong class="text-white">Use <code>/create-skill</code> to graduate a prompt into a skill that triggers without being asked.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">📋 Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Run <code class="text-cyan-300">/create-skill</code> in Copilot Chat — reference <code class="text-emerald-300">check-data-accuracy.prompt.md</code> and ask it to promote the prompt to a skill that auto-triggers when verifying or fact-checking any data entry</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Review the generated <code class="text-emerald-300">.github/skills/check-data-accuracy/SKILL.md</code> — check the <code class="text-blue-300">description</code> trigger phrases cover verify, validate, fact-check for any entity type</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Test: ask Copilot to <code class="text-orange-300">generate a data entry for a Quote</code> — does it cite the skill and reference source automatically?</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span><span class="text-gray-300">Try it with another prompt — run <code class="text-cyan-300">/create-skill</code> again referencing <code class="text-orange-300">good-idea-fairy.prompt.md</code></span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">✅ Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> <code class="text-emerald-300">.github/skills/check-data-accuracy/SKILL.md</code> exists with broad trigger phrases</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Copilot cites the skill when asked to write or check any data entry — without being explicitly invoked</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> The team understands the difference: prompt = you invoke it, skill = Copilot reaches for it</div>
</div>
<div class="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30 text-xs text-gray-300 italic">💭 <strong class="text-blue-300">Sarah:</strong> "One command. It read the prompt, inferred the triggers, built the folder. I didn't write a single line of SKILL.md by hand."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 E4 Example — /create-skill in Action -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-3 py-1 bg-gradient-to-r from-blue-600/80 to-blue-800/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F4AC; E4 Example &mdash; /create-skill in Action</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-2 min-h-0">
<div class="grid grid-cols-2 gap-3 flex-1 min-h-0">
<div class="flex flex-col gap-1 min-h-0">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x1F4AC; Step 1 &mdash; the prompt</div>
<div class="bg-blue-900/30 rounded-xl border border-blue-500/30 p-3 font-mono text-xs select-all leading-relaxed text-gray-200 flex-1">
<div class="text-cyan-400 font-bold mb-2">/create-skill</div>
<div>Here&rsquo;s my <span class="text-green-300">check-data-accuracy.prompt.md</span> &mdash;</div>
<div>promote it to a skill named</div>
<div class="mb-2"><span class="text-purple-300">check-data-accuracy</span> that auto-triggers</div>
<div>when verifying or fact-checking any</div>
<div>data entry across lore, characters,</div>
<div class="mb-3">episodes, and ratings.</div>
<div class="text-gray-500 text-[10px]">// VS Code built-in &mdash; no custom prompt needed</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x1F4CB; Step 2 &mdash; review the output</div>
<div class="bg-gray-900/60 rounded-xl p-2.5 border border-gray-700/50 text-xs">
<div class="text-gray-500 uppercase tracking-widest text-[10px] mb-1">&#x25B6; Running /create-skill</div>
<div class="text-gray-400 text-xs">&#x2192; Copilot reads <span class="font-mono text-green-300">check-data-accuracy.prompt.md</span>, infers trigger phrases, scaffolds the skill folder</div>
</div>
<div class="bg-gray-950 rounded-xl border border-blue-700/50 p-3 font-mono text-xs flex-1 select-all">
<div class="text-gray-500 mb-1">// .github/skills/check-data-accuracy/SKILL.md</div>
<div class="text-gray-500">---</div>
<div class="text-orange-300">name<span class="text-white">: </span><span class="text-green-300">check-data-accuracy</span></div>
<div class="text-orange-300">description<span class="text-white">: &gt;</span></div>
<div class="text-green-300 ml-4">Use this skill when asked to verify,</div>
<div class="text-green-300 ml-4">validate, or fact-check any data entry &mdash;</div>
<div class="text-green-300 ml-4">lore, characters, episodes, ratings.</div>
<div class="text-green-300 ml-4">Triggers on: check data, verify entry,</div>
<div class="text-green-300 ml-4">fact-check, accuracy check, is this correct.</div>
<div class="text-gray-500">---</div>
<div class="text-gray-500 ml-3 mt-1">// body preserved from prompt file...</div>
</div>
<div class="bg-blue-900/20 rounded-lg p-2 border border-blue-500/20 text-xs text-gray-300">
&#x1F4A1; <strong class="text-blue-300">Check the triggers.</strong> The <code class="font-mono text-green-300">description</code> field is what Copilot matches against. Broaden it if needed &mdash; then test with step 3.
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: Exercise 5 — Create Card and Page Skill -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-5">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30 flex-shrink-0">E5</div>
<div>
<div class="text-purple-300 text-xs font-semibold tracking-widest uppercase">Exercise 5</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Card Creation as a Repeatable Skill</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Marcus &#x2B50;</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">Jessica &#x1F91D;</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">&#x23F1; 15 min</span>
</div>
</div>
<div class="relative z-10 mb-4 p-4 bg-gray-900/60 rounded-xl border-l-4 border-purple-400 text-sm text-gray-300">
In Module 2, plan mode produced the full roadmap for the Lore card and <code class="bg-gray-800 px-1 rounded text-purple-300">/lore</code> page. Marcus saved it. Now he needs a Locations card. <em>The plan is almost identical.</em> <strong class="text-white">Generalize the M2 plan into a parameterized skill &mdash; one invocation creates the card + page plan for any FanHub entity.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">&#x1F4CB; Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Run <code class="text-cyan-300">/create-skill</code> in Copilot Chat — reference the M2 plan file and ask it to generalise it into a parameterised skill named <code class="text-purple-300">create-card-and-page</code>. Review the generated <code class="text-purple-300">SKILL.md</code> to confirm the skill name and folder</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Ask Copilot to improve it with a <code class="text-purple-300">templates/</code> folder and a <code class="text-purple-300">scripts/</code> folder (see next two slides)</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Test: <code class="bg-gray-800 px-1 rounded text-purple-300">/create-card-and-page Locations</code></span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">&#x2705; Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> <code class="text-purple-300">create-card-and-page/</code> created with SKILL.md + templates/</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Skill accepts entity name and generates a scoped plan</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Plan identifies the same  files as the M2 Lore plan</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">&#x2610;</span> Templates folder has at least one starter scaffold file</div>
</div>
<div class="mt-3 p-3 bg-purple-900/30 rounded-lg border border-purple-500/30 text-xs text-gray-300 italic">&#x1F4AD; <strong class="text-purple-300">Marcus:</strong> "Wait &mdash; I wrote the same plan twice. That&rsquo;s a pattern." <span class="text-gray-500 not-italic">[tab-switches, tab-switches back]</span> "Okay I&rsquo;m back. Patterns become skills. Let&rsquo;s build it."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 E5 Step 1 — Create the Skill -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F4AC; E5 Step 1 &mdash; Create the Skill</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-2 min-h-0">
<div class="grid grid-cols-2 gap-3 flex-1 min-h-0">
<div class="flex flex-col gap-1 min-h-0">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x1F4AC; The prompt</div>
<div class="bg-purple-900/30 rounded-xl border border-purple-500/30 p-3 font-mono text-xs select-all leading-relaxed text-gray-200 flex-1 overflow-y-auto">
<div class="text-cyan-400 font-bold mb-2">/create-skill</div>
<div>Use the updated Module 2 plan for the</div>
<div>Lore card + page, including the </div>
<div>add/edit form &mdash; <span class="text-blue-300">@plan-loreCardAndLorePageForm.prompt.md</span></div>
<div class="mt-2">Generalise this into a parameterised skill</div>
<div>named <span class="text-purple-300">create-card-and-page</span> that accepts</div>
<div>an entity name and produces an equivalent</div>
<div class="mb-2">scoped plan for any FanHub entity type.</div>
<div class="text-gray-400">Make sure the plan includes the form</div>
<div class="mb-3 text-gray-400">alongside the card + page.</div>
<div class="border-t border-purple-500/20 pt-2 mb-2 text-gray-300">When the skill runs, it:</div>
<div class="text-gray-400">1. Ask the user what properties the entity</div>
<div class="text-gray-400 ml-3">has beyond title and description before</div>
<div class="text-gray-400 mb-2 ml-3">generating anything.</div>
<div class="text-gray-400">2. Output a scoped plan and wait for</div>
<div class="text-gray-400 ml-3">approval before creating any files.</div>
<div class="text-gray-500 text-[10px] mt-2">// VS Code built-in &mdash; no custom prompt needed</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x25B6; What happens</div>
<div class="bg-gray-900/60 rounded-xl p-2.5 border border-gray-700/50 text-xs text-gray-300 space-y-2">
<div class="flex items-start gap-2"><span class="text-amber-400 font-bold flex-shrink-0">!</span><span><strong class="text-amber-300">Pre-flight:</strong> make sure your M2 plan is updated to include the add/edit form before running this. The skill inherits whatever is in the plan.</span></div>
<div class="flex items-start gap-2"><span class="text-purple-400">&#x2192;</span><span>Copilot reads the updated M2 plan, extracts the repeating structure, and scaffolds <span class="font-mono text-green-300">.github/skills/create-card-and-page/SKILL.md</span></span></div>
<div class="flex items-start gap-2"><span class="text-purple-400">&#x2192;</span><span>The <span class="font-mono text-orange-300">description</span> field becomes the trigger: Copilot will reach for this skill whenever someone asks to add a new entity with a card grid page</span></div>
<div class="flex items-start gap-2"><span class="text-cyan-400">&#x2192;</span><span><strong class="text-cyan-300">Ask questions:</strong> when the skill runs it will prompt for extra properties before generating &mdash; no tools needed, just a chat turn</span></div>
<div class="flex items-start gap-2"><span class="text-cyan-400">&#x2192;</span><span><strong class="text-cyan-300">Plan first:</strong> the skill outputs a scoped plan and waits for approval &mdash; same muscle-memory as agent plan mode, built into every invocation</span></div>
</div>
<div class="mt-auto bg-purple-900/20 rounded-lg p-2.5 border border-purple-500/20 text-xs text-gray-300 italic">
&#x1F4AD; <strong class="text-purple-300">Marcus:</strong> &ldquo;I literally just handed it the plan. It figured out what was variable and what wasn&rsquo;t.&rdquo;
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 E5 Step 1 — Review the Generated Skill -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F4CB; E5 Step 1 &mdash; Review the Generated Skill</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-2 min-h-0">
<div class="grid grid-cols-2 gap-3 flex-1 min-h-0">
<div class="flex flex-col gap-1 min-h-0">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x1F4C4; .github/skills/create-card-and-page/SKILL.md</div>
<div class="bg-gray-950 rounded-xl border border-purple-700/50 p-3 font-mono text-xs flex-1 select-all overflow-auto">
<div class="text-gray-500">---</div>
<div class="text-orange-300">name<span class="text-white">: </span><span class="text-green-300">create-card-and-page</span></div>
<div class="text-orange-300">description<span class="text-white">: &gt;</span></div>
<div class="text-green-300 ml-4">Use this skill when asked to add a new</div>
<div class="text-green-300 ml-4">entity type with a card grid and detail</div>
<div class="text-green-300 ml-4">page to FanHub. Triggers on: add entity,</div>
<div class="text-green-300 ml-4">create card page, new card grid, scaffold</div>
<div class="text-green-300 ml-4">entity, add &#36;{entityName} to FanHub.</div>
<div class="text-gray-500">---</div>
<div class="mt-2 text-gray-400"># create-card-and-page</div>
<div class="mt-1 text-gray-300">Generate a scoped implementation plan for</div>
<div class="text-gray-300">adding <span class="text-yellow-300 bg-yellow-900/30 px-0.5 rounded">&#36;{entityName}</span> as a card grid + detail page.</div>
<div class="mt-2 text-gray-400">## Plan</div>
<div class="text-gray-300 ml-2">1. Backend model + EF migration</div>
<div class="text-gray-300 ml-2">2. API controller + endpoints</div>
<div class="text-gray-300 ml-2">3. Card component + grid page</div>
<div class="text-gray-300 ml-2">4. Detail page + routing</div>
<div class="text-gray-300 ml-2">5. Tests</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x2705; What to check</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-purple-500/30 flex-1 text-xs text-gray-300 space-y-2">
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold flex-shrink-0">1</span><span><strong class="text-white">Skill name matches the folder.</strong> <span class="font-mono text-green-300">name: create-card-and-page</span> must match <span class="font-mono text-green-300">.github/skills/create-card-and-page/</span></span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold flex-shrink-0">2</span><span><strong class="text-white">Description is broad enough.</strong> It triggers when anyone mentions adding a new entity — not just &ldquo;Lore&rdquo; specifically</span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold flex-shrink-0">3</span><span><strong class="text-white">No hardcoded entity names.</strong> Every <span class="font-mono text-gray-400">Lore</span>, <span class="font-mono text-gray-400">lore</span>, <span class="font-mono text-gray-400">Lores</span> are replaced with <span class="font-mono text-yellow-300">&#36;{entityName}</span></span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold flex-shrink-0">4</span><span><strong class="text-white">Plan steps are still present.</strong> The full implementation roadmap from M2 is preserved, just parameterised</span></div>
</div>
<div class="bg-purple-900/20 rounded-lg p-2.5 border border-purple-500/20 text-xs text-gray-300">
&#x1F4A1; If anything looks off, edit SKILL.md directly or ask Copilot: <span class="italic text-gray-400">&ldquo;The description only mentions Lore &mdash; broaden it to cover any entity type.&rdquo;</span>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 E5 Step 2 — Improve with Templates & Scripts -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F4AC; E5 Step 2 &mdash; Improve with Templates &amp; Scripts</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-2">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="flex flex-col gap-1">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">&#x1F4AC; Ask Copilot to improve the skill</div>
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-3 font-mono text-xs flex-1 select-all">
<div class="text-gray-300">Look at <span class="text-blue-300">.github/skills/create-card-and-page/SKILL.md</span>.</div>
<div class="mt-2 text-gray-300">Let&rsquo;s improve this skill by adding:</div>
<div class="mt-1 text-gray-400">1. A <span class="text-purple-300">templates/</span> folder with a starter</div>
<div class="text-gray-400 ml-3">scaffold for each file the skill generates.</div>
<div class="text-gray-400 ml-3">Use the existing Lore entity files as</div>
<div class="text-gray-400 ml-3">reference. Replace entity-specific names</div>
<div class="text-gray-400 ml-3">with <span class="text-yellow-300 bg-yellow-900/30 px-0.5 rounded">&#36;{entityName}</span> placeholders.</div>
<div class="mt-1 text-gray-400">2. A <span class="text-purple-300">scripts/</span> folder with:</div>
<div class="text-gray-400 ml-3">- <span class="text-green-300">check-scaffold.ps1</span> &mdash; verifies all</div>
<div class="text-gray-400 ml-5">expected files were generated</div>
<div class="text-gray-400 ml-3">- <span class="text-green-300">run-migration.ps1</span> &mdash; applies the</div>
<div class="text-gray-400 ml-5">EF Core migration for the new entity</div>
<div class="mt-2 text-gray-300">Update SKILL.md to reference both folders</div>
<div class="text-gray-300">in the <span class="text-orange-300">## Resources</span> section.</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">&#x1F504; Iterate until it&rsquo;s right</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-purple-500/30 flex-1 text-xs text-gray-300 space-y-2">
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold mt-0.5">1</span><span>Run the skill for <span class="font-mono text-white">&ldquo;Locations&rdquo;</span> &mdash; does the plan reference the same files as the Lore plan? If not, describe what&rsquo;s missing and ask Copilot to fix the template.</span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold mt-0.5">2</span><span>Ask Copilot to run <span class="font-mono text-green-300">check-scaffold.ps1</span> after a test invocation. Let it read the errors and self-correct.</span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold mt-0.5">3</span><span>If a template generates wrong output, paste the diff and ask: <span class="italic text-gray-400">&ldquo;This generated X but I expected Y &mdash; update the template.&rdquo;</span></span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 font-bold mt-0.5">4</span><span>Keep looping. The goal isn&rsquo;t a perfect first prompt &mdash; it&rsquo;s a skill that gets better with each round of feedback.</span></div>
</div>
<div class="bg-purple-900/20 rounded-lg p-2.5 border border-purple-500/20 text-xs text-gray-300">
&#x1F4A1; <strong class="text-purple-300">Copilot as collaborator, not oracle.</strong> The first version will be close but not complete. Describe what&rsquo;s wrong, show it the output, ask it to improve. Three or four rounds gets you to production-ready.
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: &#x1F3D7; E5 &#x2014; Inside create-card-and-page skill -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-violet-700/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F3D7; E5 &mdash; Inside create-card-and-page skill</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs overflow-auto select-all">
<div class="text-gray-500">&#45;&#45;&#45;</div>
<div class="text-orange-300">name<span class="text-white">: </span><span class="text-green-300">create-card-and-page</span></div>
<div class="text-orange-300">description<span class="text-white">: &gt;</span></div>
<div class="text-green-300 ml-4">Use this skill when asked to add a new</div>
<div class="text-green-300 ml-4">entity type with a card grid page to FanHub.</div>
<div class="text-green-300 ml-4">It scaffolds the full stack: backend model,</div>
<div class="text-green-300 ml-4">DbContext, seed data, EF Core migration,</div>
<div class="text-green-300 ml-4">REST controller, frontend model, stat card,</div>
<div class="text-green-300 ml-4">nav-card, and a Blazor list page.</div>
<div class="text-gray-500">&#45;&#45;&#45;</div>
<div class="mt-2 text-orange-400">## What to ask before starting</div>
<div class="text-gray-400">1. Entity name &mdash; singular PascalCase</div>
<div class="text-gray-400">2. Properties beyond Id and ShowId</div>
<div class="text-gray-400">3. Form fields for the add form</div>
<div class="text-gray-400">4. Nav card label (plural display)</div>
<div class="text-gray-400">5. Nav card icon (emoji)</div>
<div class="text-gray-400">6. Seed source file</div>
</div>
<div class="flex flex-col gap-3">
<div class="bg-gray-900/60 rounded-xl p-4 border border-gray-700/50 flex-1">
<div class="text-purple-400 font-semibold text-sm mb-2">&#x1F4C1; Skill Directory</div>
<div class="font-mono text-xs text-gray-400 space-y-0.5">
<div>.github/skills/create-card-and-page/</div>
<div class="ml-3">&#x251C;&#x2500;&#x2500; SKILL.md</div>
<div class="ml-3">&#x251C;&#x2500;&#x2500; templates/</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; BackendModel.cs</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; Controller.cs</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; FrontendModel.cs</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; SeedBlock.cs</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; HomeStatCard.razor.txt</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; HomeNavCard.razor.txt</div>
<div class="ml-6">&#x2514;&#x2500;&#x2500; ListPage.razor.txt</div>
<div class="ml-3">&#x2514;&#x2500;&#x2500; scripts/</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; check-scaffold.ps1</div>
<div class="ml-6">&#x251C;&#x2500;&#x2500; run-migration.ps1</div>
<div class="ml-6">&#x2514;&#x2500;&#x2500; verify-endpoints.ps1</div>
</div>
</div>
<div class="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20 text-xs text-gray-300">
&#x1F4A1; <strong class="text-purple-300">Not just instructions.</strong> 7 templates Copilot fills in. 3 scripts that validate, migrate, and verify. This is a repeatable factory.
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: &#x1F9E9; Templates &#x2014; The Factory Floor -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-3 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F9E9; Templates &mdash; The Factory Floor</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="flex flex-col gap-2">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">&#x1F4C4; templates/BackendModel.cs</div>
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-4 font-mono text-xs flex-1 select-all">
<div class="text-blue-400">namespace <span class="text-gray-300">Backend.Models;</span></div>
<div class="mt-2 text-blue-400">public class <span class="text-yellow-300 bg-yellow-900/30 px-1 rounded">{ EntityName }</span></div>
<div class="text-gray-300">{</div>
<div class="ml-4 text-gray-400">public int Id { get; set; }</div>
<div class="ml-4 text-gray-400">public int ShowId { get; set; }</div>
<div class="ml-4 text-gray-500 italic">// Add requested properties here</div>
<div class="ml-4 text-gray-500 italic">// No navigation props, no data annotations</div>
<div class="ml-4 text-gray-500 italic">// All strings non-nullable</div>
<div class="ml-4 text-gray-400">public string Title { get; set; }</div>
<div class="ml-4 text-gray-400">public string Description { get; set; }</div>
<div class="text-gray-300">}</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">&#x1F4AC; Copilot asks, then generates</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50 text-xs space-y-1">
<div class="text-gray-400">&#x2023; Entity: <span class="text-white font-mono">Lore</span></div>
<div class="text-gray-400">&#x2023; Properties: <span class="text-white font-mono">Name, Description</span></div>
<div class="text-gray-400">&#x2023; Nav label: <span class="text-white font-mono">"Lore"</span></div>
<div class="text-gray-400">&#x2023; Icon: <span class="text-white font-mono">&#x1F4CD;</span></div>
<div class="text-gray-400">&#x2023; Seed: <span class="text-white font-mono">breaking-bad-universe.md</span></div>
</div>
<div class="flex items-center gap-2">
<div class="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>
<div class="text-purple-400 text-xs">&#x2193; generated</div>
<div class="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>
</div>
<div class="bg-gray-950 rounded-xl border border-purple-700/50 p-4 font-mono text-xs flex-1 select-all">
<div class="text-blue-400">namespace <span class="text-gray-300">Backend.Models;</span></div>
<div class="mt-2 text-blue-400">public class <span class="text-green-300">Lore</span></div>
<div class="text-gray-300">{</div>
<div class="ml-4 text-gray-300">public int Id { get; set; }</div>
<div class="ml-4 text-gray-300">public int ShowId { get; set; }</div>
<div class="ml-4 text-gray-300">public string Name { get; set; }</div>
<div class="ml-4 text-gray-300">public string Description { get; set; }</div>
<div class="text-gray-300">}</div>
</div>
</div>
</div>
<div class="bg-purple-900/20 rounded-lg p-2.5 border border-purple-500/20 text-xs text-gray-300">
&#x1F4A1; <strong class="text-purple-300">7 templates, one parameter.</strong> Every file &mdash; backend, frontend, controller, seed, 3 Razor components &mdash; generated from the same 6 answers. Change <span class="font-mono text-white">Lore</span> to <span class="font-mono text-green-300">Ratings</span> and the whole stack regenerates.
</div>
</div>
</div>

---

<!-- SLIDE: &#x1F504; 9 Steps, 3 Scripts -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-3 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">&#x1F504; 9 Steps, 3 Scripts</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-3">
<div class="grid grid-cols-3 gap-3 flex-1">
<div class="flex flex-col gap-2">
<div class="text-center text-xs font-bold text-emerald-400 uppercase tracking-widest">&#x2699;&#xFE0F; Backend</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-emerald-700/40 flex-1 space-y-2">
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold flex-shrink-0">1</div>
<div class="text-gray-300">Backend model <span class="font-mono text-emerald-300">{EntityName}.cs</span></div>
</div>
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold flex-shrink-0">2</div>
<div class="text-gray-300">Register DbSet in FanHubContext</div>
</div>
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold flex-shrink-0">3</div>
<div class="text-gray-300">Seed block from universe file (12&ndash;15 records)</div>
</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-center text-xs font-bold text-orange-400 uppercase tracking-widest">&#x1F9EF; Scripts</div>
<div class="flex flex-col gap-2 flex-1">
<div class="bg-orange-900/30 rounded-xl p-3 border border-orange-500/40 flex-1">
<div class="text-orange-300 font-mono text-xs font-bold mb-1">check-scaffold.ps1</div>
<div class="text-gray-400 text-xs">Verifies 6 files exist, DbSet registered, seed block present &mdash; before migration runs</div>
<div class="text-orange-400 text-xs mt-2 font-mono">&#x2193; step 3.5 gate</div>
</div>
<div class="bg-orange-900/30 rounded-xl p-3 border border-orange-500/40 flex-1">
<div class="text-orange-300 font-mono text-xs font-bold mb-1">run-migration.ps1</div>
<div class="text-gray-400 text-xs">Runs EF Core migration with clear error reporting. Stops the skill if it fails.</div>
<div class="text-orange-400 text-xs mt-2 font-mono">&#x2193; step 4</div>
</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-center text-xs font-bold text-blue-400 uppercase tracking-widest">&#x1F5A5; Frontend</div>
<div class="bg-gray-900/60 rounded-xl p-3 border border-blue-700/40 flex-1 space-y-2">
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">5</div>
<div class="text-gray-300">REST controller (GET + POST)</div>
</div>
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">6</div>
<div class="text-gray-300">Frontend model mirroring backend</div>
</div>
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">7</div>
<div class="text-gray-300">Stat card on Home.razor</div>
</div>
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">8</div>
<div class="text-gray-300">Nav card on Home.razor</div>
</div>
<div class="flex items-start gap-2 text-xs">
<div class="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">9</div>
<div class="text-gray-300">Blazor list page + inline add form</div>
</div>
</div>
</div>
</div>
<div class="bg-orange-900/20 rounded-lg p-2.5 border border-orange-500/20 flex items-center gap-3 text-xs">
<div class="text-orange-300 font-mono font-bold flex-shrink-0">verify-endpoints.ps1</div>
<div class="text-gray-500">&#x2014;</div>
<div class="text-gray-300">Confirms GET + POST work, homepage count shows, nav card links, and form submission adds a record. Run after the backend is up.</div>
</div>
</div>
</div>

---

<!-- SLIDE: ▶ Running new-card-skill for Locations -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white text-sm font-medium tracking-wide shadow-lg">▶ Running new-card-skill for Locations</span>
<div class="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-2">
<div class="grid grid-cols-2 gap-3 flex-1">
<div class="flex flex-col gap-1.5">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">💬 Invoke the skill</div>
<div class="bg-gray-950 rounded-xl border border-gray-700/50 p-3 text-xs flex-1">
<div class="text-gray-400 mb-2 italic">Ask Copilot in any file — it picks up the skill automatically:</div>
<div class="bg-gray-800/60 rounded-lg p-3 border border-purple-500/30 text-gray-200 font-mono leading-relaxed select-all">
<span class="text-purple-300">Add a new Locations entity to FanHub.</span><br/>
<span class="text-gray-400">Entity: Location</span><br/>
<span class="text-gray-400">Properties: Name, Description, Address</span><br/>
<span class="text-gray-400">Nav label: "Locations"</span><br/>
<span class="text-gray-400">Icon: 📍</span><br/>
<span class="text-gray-400">Seed: breaking-bad-universe.md</span>
</div>
<div class="mt-2 text-gray-500 text-xs italic">Or just say <span class="text-purple-300 font-mono not-italic">"add a Locations card to FanHub"</span> — the skill triggers and asks for what it needs.</div>
</div>
</div>
<div class="flex flex-col gap-1.5">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">📋 Expected output</div>
<div class="bg-gray-900/60 rounded-xl border border-gray-700/50 p-3 text-xs flex-1 space-y-1.5">
<div class="text-gray-400 font-semibold mb-1">Copilot generates a scoped plan covering:</div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300 font-mono">Backend/Models/Location.cs</span></div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300 font-mono">Backend/Controllers/LocationController.cs</span></div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300 font-mono">Frontend/Models/Location.cs</span></div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300 font-mono">Components/LocationStatCard.razor</span></div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300 font-mono">Components/LocationNavCard.razor</span></div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300 font-mono">Pages/Locations.razor</span></div>
<div class="flex items-center gap-2"><span class="text-green-400">✓</span><span class="text-gray-300">DbContext entry + EF migration + seed data</span></div>
<div class="pt-1.5 border-t border-gray-700/50 text-gray-400 italic">Same 9-step plan as Lore and Ratings &mdash; just with <span class="font-mono text-green-300 not-italic">Location</span> everywhere <span class="font-mono text-gray-400 not-italic">Lore</span> was.</div>
</div>
</div>
</div>
</div>
<div class="relative z-10 mt-2 px-4 py-2 bg-amber-900/20 border border-amber-500/30 rounded-lg flex flex-col gap-1">
  <span class="text-amber-300 text-sm italic">&ldquo;I said &lsquo;add a Locations card.&rsquo; It came back with six files, a migration, and seed data. I said four words.&rdquo;</span>
  <span class="text-amber-500 text-xs text-right">&mdash; Jessica</span>
</div>
</div>
---

<!-- SLIDE: Compounding Value -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-purple-900/10 to-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x1F517; Compounding Value</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="p-3 bg-gradient-to-r from-orange-900/25 via-purple-900/20 to-blue-900/15 rounded-2xl border border-white/10 text-center mb-4">
<div class="text-lg text-white font-semibold mb-0.5">You've built two layers. They multiply each other.</div>
<div class="text-sm text-gray-300">Prompts capture intent. Skills make that intent available to Copilot. Together they become a workflow layer that grows with the team.</div>
</div>
<div class="grid grid-cols-3 gap-4 text-left">
<div class="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 border border-blue-500/30 shadow-lg shadow-blue-900/20">
<div class="flex items-center gap-3 mb-3">
<div class="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-lg">&#x1F4DD;</div>
<div>
<div class="text-blue-300 font-bold">Prompt files (M3)</div>
<div class="text-xs text-gray-400 uppercase tracking-wider">Captured &amp; repeatable</div>
</div>
</div>
<div class="space-y-2 text-xs text-gray-300 leading-snug">
<div class="p-2.5 bg-gray-900/40 rounded-lg">Best thinking preserved as team assets</div>
<div class="p-2.5 bg-gray-900/40 rounded-lg">Consistent outputs across teammates</div>
<div class="p-2.5 bg-gray-900/40 rounded-lg">Version-controlled &amp; discoverable</div>
</div>
</div>
<div class="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 to-gray-900/50 border border-purple-500/30 shadow-lg shadow-purple-900/20">
<div class="flex items-center gap-3 mb-3">
<div class="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-lg">&#x26A1;</div>
<div>
<div class="text-purple-300 font-bold">Agent skills (M4)</div>
<div class="text-xs text-gray-400 uppercase tracking-wider">Embedded &amp; automatic</div>
</div>
</div>
<div class="space-y-2 text-xs text-gray-300 leading-snug">
<div class="p-2.5 bg-gray-900/40 rounded-lg">Copilot reaches for the right behavior</div>
<div class="p-2.5 bg-gray-900/40 rounded-lg">Templates guarantee consistent output</div>
<div class="p-2.5 bg-gray-900/40 rounded-lg">Scripts validate and verify each run</div>
</div>
</div>
<div class="p-4 rounded-2xl bg-gradient-to-br from-orange-900/40 to-gray-900/50 border border-orange-500/30 shadow-lg shadow-orange-900/20">
<div class="flex items-center gap-3 mb-3">
<div class="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-lg">&#x1F680;</div>
<div>
<div class="text-orange-300 font-bold">Modules 5 &amp; 6</div>
<div class="text-xs text-gray-400 uppercase tracking-wider">Built on this foundation</div>
</div>
</div>
<div class="space-y-2 text-xs text-gray-300 leading-snug">
<div class="p-2.5 bg-gray-900/40 rounded-lg"><strong class="text-orange-200">Module 5:</strong> stable skills become integration entry points</div>
<div class="p-2.5 bg-gray-900/40 rounded-lg"><strong class="text-orange-200">Module 6:</strong> skills + prompts power trustworthy custom agents</div>
</div>
</div>
</div>
<div class="mt-4 p-3 rounded-xl bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 border border-white/10 text-center">
<div class="text-base text-yellow-300 font-semibold">Every future feature starts with a prompt. The best ones become skills — and the whole team benefits automatically.</div>
</div>

---

<!-- SLIDE: &#x2705; Module Checklist -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">&#x2705; Module Checklist</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="mb-3 p-3 bg-gradient-to-r from-orange-900/25 via-purple-900/20 to-blue-900/15 rounded-2xl border border-white/10 text-center">
<div class="text-base text-white font-semibold">Six exercises. Two layers. One complete workflow foundation.</div>
</div>
<div class="mb-1 text-xs font-bold text-orange-400 uppercase tracking-widest">&#x1F4DD; Part 1 &mdash; Prompt Files (E1&ndash;E3)</div>
<div class="grid grid-cols-3 gap-3 text-left text-xs mb-3">
<div class="p-3 rounded-2xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 border border-blue-500/30">
<div class="flex items-center gap-2 mb-1">
<div class="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-xs font-bold text-blue-300">E1</div>
<div class="text-blue-300 font-bold">Refresh the source of truth</div>
</div>
<div class="space-y-1 text-gray-400">
<div>&#x2022; <code class="text-gray-300">refresh-docs.prompt.md</code> created</div>
<div>&#x2022; ARCHITECTURE.md stays aligned after changes</div>
</div>
</div>
<div class="p-3 rounded-2xl bg-gradient-to-br from-purple-900/40 to-gray-900/50 border border-purple-500/30">
<div class="flex items-center gap-2 mb-1">
<div class="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-xs font-bold text-purple-300">E2</div>
<div class="text-purple-300 font-bold">Save one strong prompt</div>
</div>
<div class="space-y-1 text-gray-400">
<div>&#x2022; One of: good-idea-fairy, risk-prioritizer,</div>
<div>&#x2022; or commit-helper &mdash; saved &amp; reusable</div>
</div>
</div>
<div class="p-3 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-gray-900/50 border border-emerald-500/30">
<div class="flex items-center gap-2 mb-1">
<div class="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xs font-bold text-emerald-300">E3</div>
<div class="text-emerald-300 font-bold">Encode domain knowledge</div>
</div>
<div class="space-y-1 text-gray-400">
<div>&#x2022; <code class="text-gray-300">check-data-accuracy.prompt.md</code></div>
<div>&#x2022; Works for any entity type, MCP-ready for Module 5</div>
</div>
</div>
</div>
<div class="mb-1 text-xs font-bold text-orange-400 uppercase tracking-widest">&#x26A1; Part 2 &mdash; Agent Skills (E4&ndash;E5)</div>
<div class="grid grid-cols-2 gap-3 text-left text-xs">
<div class="p-3 rounded-2xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 border border-blue-500/30">
<div class="flex items-center gap-2 mb-1">
<div class="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-xs font-bold text-blue-300">E4</div>
<div class="text-blue-300 font-bold">Graduate a prompt to a skill</div>
</div>
<div class="space-y-1 text-gray-400">
<div>&#x2022; <code class="text-gray-300">check-data-accuracy</code> prompt → skill via <code class="text-gray-300">/create-skill</code></div>
<div>&#x2022; Triggers automatically, no manual invocation needed</div>
</div>
</div>
<div class="p-3 rounded-2xl bg-gradient-to-br from-purple-900/40 to-gray-900/50 border border-purple-500/30">
<div class="flex items-center gap-2 mb-1">
<div class="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-xs font-bold text-purple-300">E5</div>
<div class="text-purple-300 font-bold">Card &amp; page skill</div>
</div>
<div class="space-y-1 text-gray-400">
<div>&#x2022; M2 plan graduated to <code class="text-gray-300">create-card-and-page</code> skill</div>
<div>&#x2022; Any entity type scaffolded in 30 seconds</div>
</div>
</div>
</div>
<div class="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 border border-white/10 text-center text-xs text-gray-300">
Later modules get better because the team knows how to package repeatable work into invokable, trustworthy prompt and skill assets.
</div>

---

<!-- SLIDE: 📚 Keep the Foundation Evergreen -->
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📚 Keep the Foundation Evergreen</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div><div class="mt-4 p-5 bg-gradient-to-r from-blue-900/25 via-purple-900/25 to-orange-900/20 rounded-2xl border border-white/10 text-center">
<div class="text-lg font-bold text-white">Before Module 4, document your new prompt toolkit.</div>
<div class="text-sm text-gray-300 mt-2">Update <span class="font-mono text-blue-200">ARCHITECTURE.md</span> and <span class="font-mono text-purple-200">.github/copilot-instructions.md</span> so the skills you build next know the prompts already exist.</div>
</div><div class="mt-4 font-mono text-sm bg-gray-900/80 rounded-xl border border-blue-500/30 p-5 text-gray-200">
<div class="text-xs text-gray-500 mb-3">You already built the tool. Run it.</div>
<div class="text-orange-400 font-bold">/refresh-docs</div>
<div class="text-gray-400 mt-3 text-xs font-sans">The <span class="font-mono text-blue-300">refresh-docs.prompt.md</span> you built in Exercise 3.1 updates <span class="font-mono text-blue-200">ARCHITECTURE.md</span> and <span class="font-mono text-purple-200">copilot-instructions.md</span> with the new prompt files — so Modules 4, 5, and 6 know they exist.</div>
</div><div class="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-900/30 via-yellow-900/20 to-orange-900/30 border border-orange-500/30 text-center">
<div class="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">🔁 Build the habit</div>
<div class="text-sm text-white font-semibold">Run <span class="font-mono text-orange-300">/refresh-docs</span> after every meaningful change.</div>
<div class="text-xs text-gray-400 mt-1">Each PR that updates docs keeps the foundation relevant — so Copilot always has accurate context to work from.</div>
</div>

---

<!-- SLIDE: Module 3+4 Is Locked In -->
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
Module 3+4 Is Locked In
</h1>
<div class="relative z-10 mb-6">
<span class="px-5 py-2 bg-gradient-to-r from-purple-600/80 to-red-600/80 rounded-full text-white text-base font-medium shadow-lg shadow-purple-500/25">
&#x1F50C; Next Up: Module 5 &mdash; MCP Servers
</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3 max-w-3xl w-full px-6 mb-6">
<div class="p-3 bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl border border-orange-500/30 text-center">
<div class="text-xl mb-1">&#x1F4DD;</div>
<div class="text-orange-300 font-bold text-sm">You Captured Repetition</div>
<div class="text-gray-400 text-xs mt-1">High-value prompts are now saved as reusable team entry points</div>
</div>
<div class="p-3 bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl border border-red-500/30 text-center">
<div class="text-xl mb-1">&#x26A1;</div>
<div class="text-red-300 font-bold text-sm">You Packaged Expertise</div>
<div class="text-gray-400 text-xs mt-1">Skills embed domain knowledge and workflows the whole team can invoke</div>
</div>
<div class="p-3 bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl border border-purple-500/30 text-center">
<div class="text-xl mb-1">&#x1F50C;</div>
<div class="text-purple-300 font-bold text-sm">Now Connect Live Systems</div>
<div class="text-gray-400 text-xs mt-1">Module 5 moves from packaged local workflows into runtime integrations</div>
</div>
</div>
<div class="relative z-10 max-w-3xl w-full px-6">
<div class="p-4 bg-gradient-to-br from-orange-900/30 via-red-900/20 to-purple-900/30 rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-900/20 text-center">
<p class="text-base text-gray-200 leading-snug !m-0">Prompt files make repeated work reusable. <span class="text-white font-semibold">Agent skills go further — Copilot itself can reach for them, without being asked.</span> MCP servers will let it bring live systems into that same workflow.</p>
</div>
</div>
<div class="relative z-10 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full mt-4"></div>
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
<div class="text-sm text-gray-200 leading-relaxed">Marcus discovered that <code class="text-blue-300">/plan</code> now runs automatically &mdash; the skill removed the decision entirely, not just the typing</div>
</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">David had to <em>explain</em> the Walter White error to the skill &mdash; it caught a show-accuracy mistake David would have defended if asked</div>
</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">Jessica&rsquo;s realization: &ldquo;it checked and it was right&rdquo; &mdash; the app had grown a defense mechanism nobody has to maintain</div>
</div>
</div>
<div class="flex flex-col justify-center">
<div class="p-6 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-transparent rounded-2xl border border-amber-500/30 shadow-lg">
<div class="text-xs text-amber-400/80 uppercase tracking-widest font-semibold mb-4">&#x1F4A1; One Big Question</div>
<div class="text-xl font-semibold text-white leading-relaxed">What&rsquo;s one check you do manually on every PR or story &mdash; something so routine you barely notice it? Could that become a skill?</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💭 The Team, After Module 3+4 -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/18 via-cyan-900/10 to-slate-900/10"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-cyan-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💭 The Team, After Module 3+4</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
<span class="px-3 py-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-md text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-emerald-900/40 inline-block border border-emerald-300/30">✓ After The Module</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-amber-400">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It&rsquo;s not a saved prompt. I ran check-data-accuracy and it just&hellip; did it. Automatically. With the canon citations. I didn&rsquo;t type the prompt. That&rsquo;s new.&rdquo;</div>
<div class="text-xs text-gray-500">Not quite believing it ran without her asking.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-blue-400">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It&rsquo;s not a macro. A skill is a capability contract &mdash; the description is the interface. We have not solved this. 1980 will need to be revised.&rdquo;</div>
<div class="text-xs text-gray-500">Conceding with precision. The highest form of David compliment.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-green-400">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It&rsquo;s not pre-loaded context &mdash; it&rsquo;s invocable capability. New entity type, zero to browsable page: twenty-three minutes. I timed it. That&rsquo;s down from a half-day. You&rsquo;re welcome.&rdquo;</div>
<div class="text-xs text-gray-500">Wrong about the model. Right that it was worth writing once.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-purple-400">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It doesn&rsquo;t run on every request &mdash; it runs when it&rsquo;s relevant. The verify-endpoints script found a missing migration. That&rsquo;s exactly what controlled invocation is for. I&rsquo;m adding edge cases anyway.&rdquo;</div>
<div class="text-xs text-gray-500">The failure mode confirmed the design. She&rsquo;s adding edge cases anyway.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-orange-400">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;It&rsquo;s not an alias. I ran create-card-and-page for Ratings, Themes, and Factions. Same output every time. I opened a Hacker News tab and closed it. That&rsquo;s how not-an-alias this is.&rdquo;</div>
<div class="text-xs text-gray-500">The highest praise: stayed focused through three runs.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-cyan-400">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;I tried the PRD template. It helped more than expected and less than I claimed. Skills are institutional knowledge that scales &mdash; that&rsquo;s the real story. Already mapping it to Module 6.&rdquo;</div>
<div class="text-xs text-gray-500">Revised the pitch upward. Already on the next module.</div>
</div>
</div>
</div>
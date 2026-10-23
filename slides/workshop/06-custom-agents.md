---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Module 6: Custom Agents
  Bundle tools, skills, and workflow constraints into role-based presets
drawings:
  persist: false
transition: slide-left
title: Module 6 - Custom Agents
module: workshop/06-custom-agents
mdc: true
status: active
updated: 2026-03-31
---

<!-- SLIDE: Module 6: Custom Agents -->
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
    Module 6: Custom Agents
  </h1>

  <div class="mt-4 relative z-10">
    <span class="px-6 py-2 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xl font-medium shadow-lg shadow-orange-500/25">
      ⏰ Turn capabilities into roles
    </span>
  </div>

  <div class="mt-8 text-lg opacity-70 max-w-2xl italic relative z-10">
    "Agents are where instructions, prompts, skills, and MCP access become an actual workflow teammate."
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
    <div class="flex-1 p-2 bg-gray-800/50 rounded-lg border border-gray-700/40 text-center opacity-60">
      <div class="font-bold text-gray-400 text-xs">M5</div>
      <div class="text-gray-500 mt-0.5 whitespace-nowrap">MCP</div>
    </div>
    <div class="flex items-center text-gray-600 px-0.5">›</div>
    <div class="flex-1 p-2 bg-gradient-to-b from-orange-600/80 to-orange-800/60 rounded-lg border border-orange-400/50 text-center shadow-lg shadow-orange-900/30">
      <div class="font-bold text-white text-xs">M6</div>
      <div class="text-orange-200 mt-0.5 whitespace-nowrap">Agents</div>
    </div>
  </div>
</div>

---

<!-- SLIDE: We Have Prompts, Skills, and MCP —  Now What? -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-16 py-8">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/25 via-red-900/15 to-purple-900/25"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/15 to-transparent rounded-full blur-3xl"></div>
<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="text-orange-300 font-bold text-lg tracking-wide">⏰ : Monday, 3:45 PM</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 mb-2 flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-base font-bold text-white shadow-lg shadow-orange-500/30 flex-shrink-0">S</div>
<div class="text-gray-300 text-sm">
<span class="text-white font-semibold">Sarah</span> stares at the <code class="text-orange-300">.github</code> folder. Prompts, skills, an MCP server, a universe file. Five modules of work. She still has to wire all of it together herself, every time.
</div>
</div>
<div class="relative z-10 mb-3 py-2 px-3 bg-gray-900/60 rounded-xl border-l-4 border-orange-400 shadow-xl backdrop-blur-sm">
<p class="text-gray-200 text-xs leading-relaxed">
<span class="text-orange-300/60 font-serif text-base">"</span>
Five modules of work sitting in this repo. Right now I have to invoke all of it manually, every time. What if there was just&hellip; <span class="text-orange-300 font-semibold">an agent for that?</span><span class="text-orange-300/60 font-serif text-base">"</span>
</p>
</div>
<div class="relative z-10 grid grid-cols-6 gap-3 mb-3 text-left">
<div class="p-3 rounded-xl bg-gray-900/60 border border-blue-500/30">
<div class="text-blue-300 font-bold text-xs mb-1">Module 1</div>
<div class="text-white font-semibold text-xs mb-1">Document the standards</div>
<div class="text-xs text-gray-400 leading-tight">Instructions created a reliable baseline.</div>
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
<div class="text-xs text-gray-400 leading-tight">Specialized expertise became callable skills.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-cyan-500/30">
<div class="text-cyan-300 font-bold text-xs mb-1">Module 5</div>
<div class="text-white font-semibold text-xs mb-1">Connect live systems</div>
<div class="text-xs text-gray-400 leading-tight">MCP brought real databases and APIs into the loop.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-red-500/30">
<div class="text-red-300 font-bold text-xs mb-1">Module 6</div>
<div class="text-white font-semibold text-xs mb-1">Bundle into agent</div>
<div class="text-xs text-gray-400 leading-tight">Now the goal is actual delivery.</div>
</div>
</div>
<div class="relative z-10 flex items-center gap-3 p-2.5 bg-gradient-to-r from-red-900/50 to-purple-900/50 rounded-xl border border-red-500/40 shadow-lg">
<span class="text-lg flex-shrink-0">⚡</span>
<p class="text-white text-xs leading-snug">You <em>could</em> start with agents — but agents are only as good as what they run. <span class="text-orange-300 font-semibold">Skills need a tested prompt. Agents need skills and live data. The sequence is the architecture.</span></p>
</div>
</div>

---

<!-- SLIDE: 💭 The Team, Before Module 6 -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-red-900/30 via-rose-900/15 to-slate-900/20"></div>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
<div class="text-red-500/8 font-black text-[11rem] uppercase tracking-widest rotate-[-20deg] whitespace-nowrap">Wrong Answers</div>
</div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-slate-600/80 to-blue-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💭 The Team, Before Module 6</span>
<div class="flex-1 h-px bg-gradient-to-r from-slate-400/50 to-transparent"></div>
<span class="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-md text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-red-900/50 rotate-[-2deg] inline-block border border-red-400/40">⚠ Wrong Answers Only</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-amber-400 border border-red-800/30">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;Custom agents are just Copilot with a different name. Like a theme. A personality skin.&rdquo;</div>
<div class="text-xs text-red-400/70">About to discover it&rsquo;s considerably more than a skin.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-blue-400 border border-red-800/30">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;A custom agent is a system prompt with a YAML header. I could reproduce this in ten minutes. I&rsquo;ll wait.&rdquo;</div>
<div class="text-xs text-red-400/70">He could write the YAML. He could not write the agent.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-green-400 border border-red-800/30">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;Once it&rsquo;s built, the agent runs on its own indefinitely. Zero maintenance. That&rsquo;s the pitch, right?&rdquo;</div>
<div class="text-xs text-red-400/70">&lsquo;Zero maintenance&rsquo; has never been a pitch that held.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-purple-400 border border-red-800/30">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;The agent validates its own output. Self-testing. You don&rsquo;t need to review it &mdash; it reviews itself.&rdquo;</div>
<div class="text-xs text-red-400/70">She will spend the next hour testing that assumption to destruction.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-orange-400 border border-red-800/30">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;Custom agents replace Copilot entirely. You&rsquo;re basically writing your own model config. That sounds like a lot.&rdquo;</div>
<div class="text-xs text-red-400/70">Half-checked-out. Catastrophically misinformed.</div>
</div>
<div class="p-4 rounded-xl bg-red-950/40 border-l-4 border-cyan-400 border border-red-800/30">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">&ldquo;So I assign the Jira ticket to the agent, add it to the sprint, and check out for the day. That&rsquo;s what this is, right?&rdquo;</div>
<div class="text-xs text-red-400/70">Already blocking off his afternoon calendar.</div>
</div>
</div>
</div>
---

<!-- SLIDE: 🤖 Built-In Agents You Already Have -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🤖 Built-In Agents You Already Have</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-2 gap-4 mt-3 text-left">

<div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
<div class="flex items-center gap-2 mb-2">
<div class="text-xl">⚡</div>
<div class="text-blue-300 font-bold text-sm">Copilot Cloud Agent</div>
</div>
<div class="text-xs text-gray-300 mb-3">Assigns itself to a GitHub Issue, works autonomously in a sandboxed environment, and opens a pull request when done.</div>
<div class="space-y-1.5 text-xs text-gray-300">
<div class="flex items-start gap-2"><span class="text-blue-400 mt-0.5">▸</span><span>Triggered from a GitHub Issue — assign Copilot as the owner</span></div>
<div class="flex items-start gap-2"><span class="text-blue-400 mt-0.5">▸</span><span>Reads repo context, plans, implements, and runs tests in a secure cloud workspace</span></div>
<div class="flex items-start gap-2"><span class="text-blue-400 mt-0.5">▸</span><span>Delivers a PR with a summary of decisions made</span></div>
</div>
<div class="mt-2 p-2 bg-blue-900/30 rounded-lg border border-blue-500/20 text-xs text-gray-300">
<span class="text-blue-300 font-semibold">Uses your workshop work:</span> respects repo instructions, invokes skills, and queries MCP servers — everything from Modules 1–5 shapes how it works.
</div>
<div class="mt-2 text-xs text-blue-300/70 italic">Best for: well-scoped tasks with a clear issue description</div>
</div>

<div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
<div class="flex items-center gap-2 mb-2">
<div class="text-xl">🔍</div>
<div class="text-purple-300 font-bold text-sm">Copilot Code Review</div>
</div>
<div class="text-xs text-gray-300 mb-3">Reviews pull requests automatically and leaves inline comments with actionable suggestions — no setup required.</div>
<div class="space-y-1.5 text-xs text-gray-300">
<div class="flex items-start gap-2"><span class="text-purple-400 mt-0.5">▸</span><span>Request a review from <code>@github-copilot</code> on any PR</span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 mt-0.5">▸</span><span>Surfaces logic issues, missing edge cases, and style inconsistencies</span></div>
<div class="flex items-start gap-2"><span class="text-purple-400 mt-0.5">▸</span><span>Can be configured with custom review instructions in repo settings</span></div>
</div>
<div class="mt-2 p-2 bg-purple-900/30 rounded-lg border border-purple-500/20 text-xs text-gray-300">
<span class="text-purple-300 font-semibold">Uses your workshop work:</span> respects repo instructions and invokes skills — your Module 1 and 4 work directly improves review quality.
</div>
<div class="mt-2 text-xs text-purple-300/70 italic">Best for: a fast first-pass review before human reviewers engage</div>
</div>

</div>

<div class="mt-3 p-3 bg-gradient-to-r from-blue-900/25 via-purple-900/20 to-orange-900/15 rounded-xl border border-white/10 text-center">
<div class="text-sm text-white font-semibold">These are GitHub-hosted agents. Module 6 is about <span class="text-orange-300">your own</span> — purpose-built for the FanHub workflow.</div>
</div>
</div>

---

<!-- SLIDE: 🎯 What Youll Build -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">�� What You'll Build</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="grid grid-cols-3 gap-5 mt-6 text-left">
  <div class="p-5 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">6.1</span>
      <span class="text-xs text-gray-400">15 min &middot; All &#x2B50;</span>
    </div>
    <div class="text-base font-bold text-blue-300 mb-2">Read the Plan Agent</div>
    <div class="text-sm text-gray-300 leading-relaxed">Trace <code class="text-blue-200">plan.agent.md</code> as architecture &mdash; why every tool is listed, what&rsquo;s deliberately absent, and how the Explore subagent and handoff chain work together.</div>
  </div>
  <div class="p-5 rounded-xl bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border border-emerald-500/30">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">6.2</span>
      <span class="text-xs text-gray-400">30 min &middot; Marcus &#x2B50;</span>
    </div>
    <div class="text-base font-bold text-emerald-300 mb-2">Explore Agent Teams</div>
    <div class="text-sm text-gray-300 leading-relaxed">Install Squad, initialize it in the repo, and watch a natural language command cast a named team, hold a design review, and commit decisions &mdash; all without manual wiring.</div>
  </div>
  <div class="p-5 rounded-xl bg-gradient-to-br from-amber-900/40 to-gray-900/40 border border-amber-500/30">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-xs font-bold border border-amber-400/30">6.3</span>
      <span class="text-xs text-gray-400">25 min &middot; All &#x2B50;&#x1F91D; capstone</span>
    </div>
    <div class="text-base font-bold text-amber-300 mb-2">Build <code class="text-amber-200">&#64;content-author</code></div>
    <div class="text-sm text-gray-300 leading-relaxed">Wire M1 context, M3/M4 skills, and M5 live data into one agent. One instruction scaffolds an entity end-to-end &mdash; and catches accuracy errors before migration.</div>
  </div>
</div>
<div class="mt-5 p-4 bg-gradient-to-r from-blue-900/20 via-emerald-900/20 to-amber-900/20 rounded-xl border border-white/10 text-center">
  <div class="text-base text-white font-semibold">Study the pattern &rarr; see where it scales &rarr; build it yourself.</div>
  <div class="text-sm text-gray-400 mt-1">Module 6 operationalizes everything the workshop has taught so far.</div>
</div>
</div>
---

<!-- SLIDE: 📚 What Custom Agents Actually Are -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📚 What Custom Agents Actually Are</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-left">

  <div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold text-sm mb-2">A role-specific operating mode</div>
    <ul class="text-xs text-gray-300 space-y-1.5">
      <li>YAML frontmatter defines tools, model, handoffs, and related controls</li>
      <li>Markdown instructions define the workflow and constraints</li>
      <li>The agent appears as a reusable preset for a specific kind of work</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold text-sm mb-2">A way to encode workflow boundaries</div>
    <ul class="text-xs text-gray-300 space-y-1.5">
      <li>Review agents can be read-only</li>
      <li>Implementation agents can have edit tools</li>
      <li>Handoffs connect roles without collapsing their boundaries</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30">
    <div class="text-blue-300 font-bold text-sm mb-2">A place where earlier customizations meet</div>
    <ul class="text-xs text-gray-300 space-y-1.5">
      <li>Repository instructions still guide behavior</li>
      <li>Skills can provide domain workflow support</li>
      <li>MCP access can add live context where the role needs it</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-orange-900/30 to-gray-900/40 border border-orange-500/30">
    <div class="text-orange-300 font-bold text-sm mb-2">The real payoff</div>
    <div class="text-xs text-gray-300">You stop re-explaining the mode of work and start selecting the right teammate for the job.</div>
  </div>

</div>
<div class="mt-3 p-3 bg-gray-900/50 rounded-xl border-l-2 border-orange-400/50 text-xs text-gray-300 italic">
💭 <strong class="text-orange-300">Marcus:</strong> "Wait — sorry, I was half on something else — but the tool list is the role boundary? That&rsquo;s not configuration. That&rsquo;s a job description that enforces itself."
</div>
</div>

---

<!-- SLIDE: 🔄 Agents vs Instructions vs Skills vs MCP -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔄 Agents vs Instructions vs Skills vs MCP</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-4 gap-4 mt-8 text-left">

  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2">Instructions</div>
    <div class="text-sm text-gray-300">Tell Copilot how to behave.</div>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-orange-900/40 to-gray-900/40 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2">Prompts</div>
    <div class="text-sm text-gray-300">Package repeated requests.</div>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2">Skills</div>
    <div class="text-sm text-gray-300">Teach a specialized capability.</div>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-orange-900/30 to-purple-900/20 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2">Agents</div>
    <div class="text-sm text-gray-300">Compose the right tools and workflow for a role.</div>
  </div>

</div>

<div class="mt-8 p-5 bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10">
  <div class="text-xl font-bold text-white text-center">Agents are the orchestration layer.</div>
  <div class="text-sm text-gray-300 text-center mt-1">They decide which capabilities are available, when to stop, and where the workflow goes next.</div>
</div>
<div class="mt-3 p-3 bg-gray-900/50 rounded-xl border-l-2 border-purple-400/50 text-xs text-gray-300 italic">
💭 <strong class="text-purple-300">Jessica:</strong> "Oh. OH. So when it kept going rogue and doing whatever it wanted &mdash; that wasn&rsquo;t a Copilot problem. That was a me-not-knowing-there-were-four-different-things problem. Those are very different problems."
</div>
</div>

---

<!-- SLIDE: ⚙️ Core Agent Design Patterns -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">⚙️ Core Agent Design Patterns</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-left">

  <div class="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/40 border border-blue-500/30">
    <div class="text-blue-300 font-bold text-sm mb-2">Tool selection is policy</div>
    <ul class="text-xs text-gray-300 space-y-1.5">
      <li>Read-only tools enforce research or review boundaries</li>
      <li>Editing tools appear only where implementation is expected</li>
      <li>The tool list shapes the behavior as much as the prompt does</li>
    </ul>
  </div>

  <div class="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/40 border border-purple-500/30">
    <div class="text-purple-300 font-bold text-sm mb-2">Instructions define the workflow</div>
    <ul class="text-xs text-gray-300 space-y-1.5">
      <li>Stopping rules prevent scope creep</li>
      <li>Style guides make output more consistent</li>
      <li>Ordered phases reduce improvisation</li>
    </ul>
  </div>

</div>

<div class="mt-4 grid grid-cols-3 gap-4 text-left">
  <div class="p-3 rounded-xl bg-gray-900/60 border border-blue-500/30">
    <div class="text-blue-300 font-bold text-sm mb-1">Handoffs</div>
    <div class="text-xs text-gray-300">Turn isolated tasks into guided workflows from one role to the next.</div>
  </div>

  <div class="p-3 rounded-xl bg-gray-900/60 border border-purple-500/30">
    <div class="text-purple-300 font-bold text-sm mb-1">Model and scope controls</div>
    <div class="text-xs text-gray-300">Pick the environment and invocation pattern that fit the job.</div>
  </div>

  <div class="p-3 rounded-xl bg-gray-900/60 border border-orange-500/30">
    <div class="text-orange-300 font-bold text-sm mb-1">Subagent delegation</div>
    <div class="text-xs text-gray-300">Isolate focused subtasks — research, analysis, parallel reviews — in separate context windows. The main agent gets only the summary.</div>
  </div>
</div>
<div class="mt-3 p-3 bg-gray-900/50 rounded-xl border-l-2 border-cyan-400/50 text-xs text-gray-300 italic">
💭 <strong class="text-cyan-300">Rafael:</strong> "Defined role, explicit stopping point, structured handoff. I&rsquo;ve been asking engineering for that for years. Turns out it just needed to be a config file."
</div>
</div>

---

<!-- SLIDE: 📄 The AGENTS.md Standard -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📄 The AGENTS.md Standard</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-3">
<div class="flex flex-col gap-2">
<div class="p-3 rounded-xl bg-gray-900/60 border border-blue-500/30">
<div class="text-blue-300 font-bold text-sm mb-1">What it is</div>
<div class="text-xs text-gray-300 leading-relaxed">An open community convention for documenting AI agent instructions in a way that works across editors — VS Code, Cursor, and others. A plain markdown file in <code>.github/agents/</code> that any agent-aware tool can read.</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-purple-500/30">
<div class="text-purple-300 font-bold text-sm mb-1">YAML frontmatter + Markdown body</div>
<div class="bg-gray-950 rounded-lg font-mono text-xs p-2 text-gray-300 leading-relaxed">
<div class="text-purple-300">---</div>
<div class="text-blue-300">name: <span class="text-green-300">character-review</span></div>
<div class="text-blue-300">description: <span class="text-green-300">Review character changes</span></div>
<div class="text-blue-300">tools: <span class="text-orange-300">['search', 'fetch']</span></div>
<div class="text-blue-300">handoffs:</div>
<div class="pl-4 text-blue-300">- agent: <span class="text-green-300">implement</span></div>
<div class="text-purple-300">---</div>
<div class="mt-1 text-gray-400"># Workflow instructions here</div>
<div class="text-gray-400">Analysis only. Do not modify files.</div>
</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="p-3 rounded-xl bg-gray-900/60 border border-orange-500/30">
<div class="text-orange-300 font-bold text-sm mb-1">Why it matters for the team</div>
<div class="space-y-1 text-xs text-gray-300">
<div class="flex items-start gap-2"><span class="text-orange-400 mt-0.5">▸</span><span><strong class="text-white">Portable</strong> — The same <code>.agent.md</code> file works in any AGENTS.md-compatible editor</span></div>
<div class="flex items-start gap-2"><span class="text-orange-400 mt-0.5">▸</span><span><strong class="text-white">Shareable</strong> — Commit agent configs to the repo; the whole team gets the same presets</span></div>
<div class="flex items-start gap-2"><span class="text-orange-400 mt-0.5">▸</span><span><strong class="text-white">Discoverable</strong> — New team members open VS Code and the agents are already there</span></div>
<div class="flex items-start gap-2"><span class="text-orange-400 mt-0.5">▸</span><span><strong class="text-white">Convention-based</strong> — No proprietary lock-in; the format is community-owned</span></div>
</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-cyan-500/30">
<div class="text-cyan-300 font-bold text-sm mb-1">Where agents live</div>
<div class="font-mono text-xs text-gray-300 space-y-0.5">
<div><span class="text-orange-300">.github/agents/</span><span class="text-gray-500">  ← workspace agents (team)</span></div>
<div class="pl-4 text-gray-400">character-review.agent.md</div>
<div class="pl-4 text-gray-400">implement.agent.md</div>
<div class="pl-4 text-gray-400">breaking-bad-expert.agent.md</div>
<div class="mt-2"><span class="text-purple-300">~/.config/github-copilot/agents/</span></div>
<div class="pl-4 text-gray-500">← personal agents (just you)</div>
</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-r from-orange-900/40 to-red-900/30 border border-orange-500/30 text-xs">
<span class="text-orange-300 font-semibold">👉 agents.md</span> <span class="text-gray-300">— The open standard spec: </span><span class="text-blue-300 font-mono">agents.md</span>
</div>
</div>
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
<div class="font-bold text-red-300 mb-2">Work starts with reconfiguration</div>
<div class="text-sm text-gray-300">The user re-explains whether this is planning, implementation, review, or analysis work.</div>
</div>
<div class="p-4 bg-red-900/25 rounded-lg border border-red-500/20">
<div class="font-bold text-red-300 mb-2">Boundaries are easy to blur</div>
<div class="text-sm text-gray-300">A planning conversation can drift into editing or a review session can accidentally make changes.</div>
</div>
<div class="p-4 bg-red-900/25 rounded-lg border border-red-500/20">
<div class="font-bold text-red-300 mb-2">Workflow transitions are manual</div>
<div class="text-sm text-gray-300">Even when the next step is obvious, the handoff from plan to implement or implement to review is not encoded.</div>
</div>
</div>
</div>
<div class="pl-4">
<div class="mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-green-700/80 to-green-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">✨ After</span>
</div>
<div class="space-y-4 text-left">
<div class="p-4 bg-green-900/25 rounded-lg border border-green-500/20">
<div class="font-bold text-green-300 mb-2">Roles become instant presets</div>
<div class="text-sm text-gray-300">The team picks the right agent and starts in the right mode immediately.</div>
</div>
<div class="p-4 bg-green-900/25 rounded-lg border border-green-500/20">
<div class="font-bold text-green-300 mb-2">Constraints are enforced, not implied</div>
<div class="text-sm text-gray-300">Read-only planning or review is backed by tool restrictions and instructions, not just good intentions.</div>
</div>
<div class="p-4 bg-green-900/25 rounded-lg border border-green-500/20">
<div class="font-bold text-green-300 mb-2">Handoffs create a real workflow chain</div>
<div class="text-sm text-gray-300">Plan, implement, and review become a sequence the team can actually reuse.</div>
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📊 What to Validate in the Workshop -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📊 What to Validate in the Workshop</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>

<div class="grid grid-cols-3 gap-5 mt-8 text-left">

  <div class="p-5 rounded-xl bg-gray-900/60 border border-blue-500/30">
    <div class="text-blue-300 font-bold mb-2">Role fit</div>
    <div class="text-sm text-gray-300">Does the agent’s tool list and instruction set actually match the work it is supposed to perform?</div>
  </div>

  <div class="p-5 rounded-xl bg-gray-900/60 border border-purple-500/30">
    <div class="text-purple-300 font-bold mb-2">Workflow reliability</div>
    <div class="text-sm text-gray-300">Does the agent consistently stay in scope and produce the kind of output the role needs?</div>
  </div>

  <div class="p-5 rounded-xl bg-gray-900/60 border border-orange-500/30">
    <div class="text-orange-300 font-bold mb-2">Handoff quality</div>
    <div class="text-sm text-gray-300">Does the transition to the next role preserve context and reduce manual setup?</div>
  </div>

</div>

<div class="mt-8 p-4 bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 rounded-xl border border-white/10 text-center">
  <div class="text-lg font-bold text-white">If it stays in its lane, delivers reliably, and hands off cleanly &mdash; you&rsquo;ve built an agent. Everything else is just a prompt with a name.</div>
</div>
<div class="mt-3 px-4 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-lg text-left flex gap-3 items-start">
  <div class="flex flex-col gap-1">
    <span class="text-emerald-300 text-sm italic">&ldquo;I built a checklist for validating agents. Then I realized I was describing the agent itself.&rdquo;</span>
    <span class="text-emerald-500 text-xs text-right">&mdash; Elena</span>
  </div>
</div>
</div>

---

<!-- SLIDE: 🤖 How Subagents Work -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-violet-600/80 to-purple-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🤖 How Subagents Work</span>
<div class="flex-1 h-px bg-gradient-to-r from-violet-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-6">
  <div>
    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">The 5-step flow</div>
    <div class="space-y-2">
      <div class="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-violet-500/20">
        <span class="w-6 h-6 rounded-full bg-violet-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
        <span class="text-gray-300 text-sm">You (or agent instructions) describe a complex task</span>
      </div>
      <div class="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-violet-500/20">
        <span class="w-6 h-6 rounded-full bg-violet-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
        <span class="text-gray-300 text-sm">Main agent recognizes a subtask that benefits from <span class="text-violet-300 font-semibold">isolated context</span></span>
      </div>
      <div class="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-violet-500/20">
        <span class="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
        <span class="text-gray-300 text-sm">Spawns a subagent — passes only the <span class="text-white font-semibold">relevant subtask</span>, nothing else</span>
      </div>
      <div class="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-violet-500/20">
        <span class="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span>
        <span class="text-gray-300 text-sm">Subagent works autonomously, returns only a <span class="text-white font-semibold">summary</span></span>
      </div>
      <div class="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-violet-500/20">
        <span class="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">5</span>
        <span class="text-gray-300 text-sm">Main agent incorporates the result and <span class="text-white font-semibold">continues cleanly</span></span>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <div>
      <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What you see in VS Code</div>
      <div class="p-4 bg-gray-950/80 rounded-xl border border-gray-700/50 font-mono text-xs space-y-2">
        <div class="flex items-center gap-2 text-gray-500">▶ <span class="text-violet-300">Explore subagent</span> <span class="text-gray-600 ml-auto">Running...</span></div>
        <div class="pl-4 text-gray-600">Reading file: routes/locations.ts</div>
        <div class="pl-4 text-gray-600">Searching codebase: Entity pattern</div>
        <div class="flex items-center gap-2 text-gray-500 mt-1">✓ <span class="text-violet-300">Explore subagent</span> <span class="text-gray-600 ml-auto">Done</span></div>
        <div class="mt-2 text-gray-400 text-xs">Returned: <span class="text-emerald-400">summary only</span> — tool calls hidden</div>
      </div>
    </div>
    <div class="p-4 bg-violet-900/20 rounded-xl border border-violet-500/30">
      <div class="text-violet-300 font-bold text-sm mb-2">🔑 The key insight</div>
      <div class="text-gray-300 text-sm">Subagents are <strong class="text-white">agent-initiated</strong>, not user-invoked. Enable <code class="text-violet-300">runSubagent</code> in the agent&rsquo;s tool list &mdash; then the agent decides when to use it.</div>
    </div>
    <div class="px-4 py-2 bg-purple-900/20 border border-purple-500/30 rounded-lg flex flex-col gap-1">
      <span class="text-purple-300 text-sm italic">&ldquo;You&rsquo;re still on the &lsquo;how.&rsquo; I&rsquo;m already at &lsquo;what does this do to our sprint velocity.&rsquo; The answer is: a lot.&rdquo;</span>
      <span class="text-purple-500 text-xs text-right">&mdash; Rafael</span>
    </div>
  </div>
</div>
</div>

---

<!-- SLIDE: 🔀 Invocation Patterns -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔀 Invocation Patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-4">
  <div class="p-4 rounded-xl bg-gray-900/60 border border-blue-500/30 flex flex-col gap-3">
    <div class="text-blue-300 font-bold text-sm">🔬 Research before acting</div>
    <div class="text-gray-400 text-xs">Before writing code, delegate research to a subagent. Main agent gets a clean recommendation — not a context dump.</div>
    <div class="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300 flex-1">
      <span class="text-gray-500 block mb-1"># prompt</span>
      <span class="text-cyan-300">Research OAuth 2.0 patterns</span><br/>
      <span class="text-gray-400">for Node.js apps. Compare</span><br/>
      <span class="text-gray-400">against current impl and</span><br/>
      <span class="text-cyan-300">return a recommendation.</span>
    </div>
    <div class="text-xs text-gray-500 italic">Main agent receives: recommendation only</div>
  </div>
  <div class="p-4 rounded-xl bg-gray-900/60 border border-purple-500/30 flex flex-col gap-3">
    <div class="text-purple-300 font-bold text-sm">⚡ Parallel analysis</div>
    <div class="text-gray-400 text-xs">Run multiple subagents simultaneously — each with a clean slate, no anchoring bias from other findings.</div>
    <div class="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300 flex-1">
      <span class="text-gray-500 block mb-1"># prompt</span>
      <span class="text-purple-300">Analyze in parallel:</span><br/>
      <span class="text-gray-400">1. Duplicate code</span><br/>
      <span class="text-gray-400">2. Unused exports</span><br/>
      <span class="text-gray-400">3. Security gaps</span><br/>
      <span class="text-purple-300">Compile into a plan.</span>
    </div>
    <div class="text-xs text-gray-500 italic">Each analysis: independent context</div>
  </div>
  <div class="p-4 rounded-xl bg-gray-900/60 border border-emerald-500/30 flex flex-col gap-3">
    <div class="text-emerald-300 font-bold text-sm">🧐 Multi-perspective review</div>
    <div class="text-gray-400 text-xs">Specialized agents review the same code independently — no anchoring, each uses the right tools for its lens.</div>
    <div class="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300 flex-1">
      <span class="text-gray-500 block mb-1"># prompt</span>
      <span class="text-emerald-300">Run in parallel:</span><br/>
      <span class="text-gray-400">- @security-reviewer</span><br/>
      <span class="text-gray-400">- @performance-reviewer</span><br/>
      <span class="text-gray-400">- @a11y-reviewer</span><br/>
      <span class="text-emerald-300">Consolidate findings.</span>
    </div>
    <div class="text-xs text-gray-500 italic">Each agent: specialized tools + focus</div>
  </div>
</div>
<div class="relative z-10 mt-4 p-3 bg-gradient-to-r from-cyan-900/30 to-blue-900/20 rounded-xl border border-cyan-500/20 text-center">
  <span class="text-gray-300 text-sm">In all three patterns, the main agent&rsquo;s context stays <strong class="text-white">clean and focused</strong> on the high-level task</span>
</div>
</div>

---

<!-- SLIDE: 🏗️ Coordinator + Worker Pattern -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-amber-600/80 to-orange-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🏗️ Coordinator + Worker Pattern</span>
<div class="flex-1 h-px bg-gradient-to-r from-amber-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-6">
  <div>
    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">How it&rsquo;s structured</div>
    <div class="p-4 bg-gray-950/70 rounded-xl border border-amber-500/20 font-mono text-xs space-y-1 mb-3">
      <div class="text-gray-500 mb-1">feature-builder.agent.md</div>
      <div class="text-amber-300">name: Feature Builder</div>
      <div class="text-blue-300">tools: [&apos;agent&apos;, &apos;edit&apos;, &apos;read&apos;]</div>
      <div class="text-purple-300">agents: [&apos;Planner&apos;, &apos;Implementer&apos;, &apos;Reviewer&apos;]</div>
    </div>
    <div class="p-4 bg-gray-950/70 rounded-xl border border-gray-700/40 font-mono text-xs space-y-1">
      <div class="text-gray-500 mb-1">planner.agent.md (worker)</div>
      <div class="text-white">name: Planner</div>
      <div class="text-red-400">user-invocable: false</div>
      <div class="text-blue-300">tools: [&apos;read&apos;, &apos;search&apos;]</div>
      <div class="text-gray-500 mt-1 text-xs"># no edit, no create — read-only by design</div>
    </div>
    <div class="mt-3 p-3 bg-red-900/20 rounded-lg border border-red-500/30 text-xs text-gray-300">
      <span class="text-red-300 font-bold">user-invocable: false</span> — worker agents stay hidden from the agent dropdown. Only the coordinator can invoke them.
    </div>
  </div>
  <div>
    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">The flow</div>
    <div class="space-y-2">
      <div class="flex items-center gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
        <span class="text-amber-300 font-bold text-sm w-6 text-center">👤</span>
        <div class="text-sm text-gray-300"><span class="text-amber-300 font-semibold">Feature Builder</span> receives the request — coordinates everything</div>
      </div>
      <div class="flex items-center gap-2 pl-8 text-gray-600 text-xs">↓ delegates to</div>
      <div class="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
        <span class="text-blue-300 font-bold text-sm w-6 text-center">📋</span>
        <div class="text-sm text-gray-300"><span class="text-blue-300 font-semibold">Planner</span> — read-only, breaks feature into tasks</div>
      </div>
      <div class="flex items-center gap-3 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
        <span class="text-emerald-300 font-bold text-sm w-6 text-center">⚙️</span>
        <div class="text-sm text-gray-300"><span class="text-emerald-300 font-semibold">Implementer</span> — write access, executes tasks</div>
      </div>
      <div class="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
        <span class="text-purple-300 font-bold text-sm w-6 text-center">🔍</span>
        <div class="text-sm text-gray-300"><span class="text-purple-300 font-semibold">Reviewer</span> — read-only, checks the output</div>
      </div>
    </div>
    <div class="mt-3 px-4 py-2 bg-orange-900/20 border border-orange-500/30 rounded-lg flex flex-col gap-1">
      <span class="text-orange-300 text-sm italic">&ldquo;Hold on &mdash; read-only Planner, write-access Implementer. That&rsquo;s least-privilege. For agents. I was half-checked-out and now I need to go rewrite some things.&rdquo;</span>
      <span class="text-orange-500 text-xs text-right">&mdash; Marcus</span>
    </div>
  </div>
</div>
</div>

---

<!-- SLIDE: 🔨 Exercises -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">🔨 Exercises — Agents</span>
<div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="relative z-10 p-2.5 bg-gradient-to-r from-orange-900/50 to-red-900/40 rounded-xl border border-orange-500/30 text-center mb-2 shadow-lg shadow-orange-900/20">
<div class="text-base font-bold text-white">3 exercises · ~70 minutes · shared leadership</div>
<div class="text-xs text-gray-400 mt-0.5">Study the pattern → explore what it becomes → build it yourself</div>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3" style="flex: 1; min-height: 0;">
<div class="flex flex-col p-3 bg-blue-900/30 rounded-xl border border-blue-500/40">
<div class="flex items-center justify-between mb-1.5">
<div class="text-blue-300 font-bold text-xl">6.1</div>
<span class="text-xs text-gray-500">15 min · All ⭐</span>
</div>
<div class="text-white text-sm font-semibold mb-1.5">Study the Default Plan Agent</div>
<div class="text-gray-300 text-xs leading-snug mb-2">Open <code>.github/agents/plan.agent.md</code> and read it as architecture. Trace why every tool is listed, what's deliberately absent, and how the handoff chain passes context forward.</div>
<div class="mt-auto space-y-1 text-xs text-gray-400">
<div class="text-blue-300 font-semibold text-xs mb-0.5">You'll identify:</div>
<div class="flex items-start gap-1.5"><span class="text-blue-400">▸</span>Explore subagent pattern</div>
<div class="flex items-start gap-1.5"><span class="text-blue-400">▸</span>Tool list as role boundary</div>
<div class="flex items-start gap-1.5"><span class="text-blue-400">▸</span>Stopping rules + handoff chain</div>
</div>
</div>
<div class="flex flex-col p-3 bg-emerald-900/30 rounded-xl border border-emerald-500/40">
<div class="flex items-center justify-between mb-1.5">
<div class="text-emerald-300 font-bold text-xl">6.2</div>
<span class="text-xs text-gray-500">30 min · Marcus ⭐</span>
</div>
<div class="text-white text-sm font-semibold mb-1.5">Explore Agent Teams with Squad</div>
<div class="text-gray-300 text-xs leading-snug mb-2">Install Squad CLI and run both prompts. Watch it cast a named team, hold a design review, and commit decisions to the repo — all from a single natural-language instruction.</div>
<div class="mt-auto space-y-1 text-xs text-gray-400">
<div class="text-emerald-300 font-semibold text-xs mb-0.5">You'll see:</div>
<div class="flex items-start gap-1.5"><span class="text-emerald-400">▸</span>Subagent pattern at scale</div>
<div class="flex items-start gap-1.5"><span class="text-emerald-400">▸</span>Ceremony-aware coordination</div>
<div class="flex items-start gap-1.5"><span class="text-emerald-400">▸</span>Decisions committed to the repo</div>
</div>
</div>
<div class="flex flex-col p-3 bg-amber-900/30 rounded-xl border border-amber-500/40">
<div class="flex items-center justify-between mb-1.5">
<div class="text-amber-300 font-bold text-xl">6.3</div>
<span class="text-xs text-gray-500">25 min · All ⭐🤝 capstone</span>
</div>
<div class="text-white text-sm font-semibold mb-1.5">Build the &#64;content-author Agent</div>
<div class="text-gray-300 text-xs leading-snug mb-2">Use the prompt on the next slide to generate <code>content-author.agent.md</code>, then invoke it to add a Locations entity end-to-end. One instruction activates five modules of investment.</div>
<div class="mt-auto space-y-1 text-xs text-gray-400">
<div class="text-amber-300 font-semibold text-xs mb-0.5">You'll produce:</div>
<div class="flex items-start gap-1.5"><span class="text-amber-400">▸</span>A working agent config</div>
<div class="flex items-start gap-1.5"><span class="text-amber-400">▸</span>Full-stack entity + MCP tools</div>
<div class="flex items-start gap-1.5"><span class="text-amber-400">▸</span>Accuracy-verified seed data</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 🔧 Exercise 6.1 — Study the Default Plan Agent -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 flex-shrink-0">6.1</div>
<div>
<div class="text-blue-300 text-xs font-semibold tracking-widest uppercase">Exercise</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Study the Default Plan Agent</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">All ⭐</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 15 min</span>
</div>
</div>
<div class="relative z-10 mb-5 p-4 bg-gray-900/60 rounded-xl border-l-4 border-blue-400 text-sm text-gray-300">
Before building a custom agent, study how the default <code>@plan</code> agent is designed — its Explore subagent, its tool list, its stopping rules. <strong class="text-white">This is where you learn to read agent configs like architecture, not just configuration files.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">📋 Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Open the Plan agent file — find <code>agents: ['Explore']</code> and explain why it spawns a subagent before doing anything else</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Study the tool list — note what is <em>absent</em> (<code>edit</code>, <code>create</code>, <code>delete</code>). The only write tool is <code>vscode/memory</code> — for the plan itself, never code</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Trace the handoff chain: <code>@plan</code> → <code>Start Implementation</code>. Name the design decision each step encodes</span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">✅ Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Can explain why Explore subagents run before planning begins</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Can name what's absent from the tool list and why that's intentional</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Can trace the full handoff chain and explain each transition</div>
</div>
<div class="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30 text-xs text-gray-300 italic">💭 <strong class="text-blue-300">David:</strong> "Technically, a custom agent is a deliberate override of the default execution context. The interesting question isn&rsquo;t whether you can override it &mdash; it&rsquo;s whether you understand what you&rsquo;re overriding well enough to do it intentionally."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: default plan agent — key patterns -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-blue-600/80 to-blue-800/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: default plan agent &#45;&#45; key patterns</span>
<div class="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-2">
<div class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">plan.agent.md</div>
<div class="bg-gray-950/80 rounded-lg border border-white/10 p-3 text-[10px] font-mono leading-relaxed overflow-auto" style="max-height: 370px;">
<div class="text-purple-300">&#45;&#45;&#45;</div>
<div class="text-blue-300">name: <span class="text-green-300">Plan</span></div>
<div class="text-blue-300">description: <span class="text-green-300">Researches and outlines multi-step plans</span></div>
<div class="text-blue-300">target: <span class="text-green-300">vscode</span></div>
<div class="text-blue-300">disable-model-invocation: <span class="text-orange-300">true</span></div>
<div class="text-blue-300">tools: <span class="text-orange-300">&#x5B;'search', 'read', 'web',</span></div>
<div class="pl-4 text-orange-300">'vscode/memory', 'agent',</div>
<div class="pl-4 text-orange-300">'vscode/askQuestions'&#x5D;</div>
<div class="text-yellow-300 font-bold">agents: <span class="text-green-300">&#x5B;'Explore'&#x5D;</span></div>
<div class="text-blue-300">handoffs:</div>
<div class="pl-2 text-blue-300">- label: <span class="text-green-300">Start Implementation</span></div>
<div class="pl-4 text-blue-300">agent: <span class="text-green-300">agent</span></div>
<div class="pl-4 text-blue-300">prompt: <span class="text-green-300">Start implementation</span></div>
<div class="pl-4 text-blue-300">send: <span class="text-orange-300">true</span></div>
<div class="pl-2 text-blue-300">- label: <span class="text-green-300">Open in Editor</span></div>
<div class="pl-4 text-blue-300">agent: <span class="text-green-300">agent</span></div>
<div class="text-purple-300">&#45;&#45;&#45;</div>
<div class="mt-2 text-gray-300">You are a PLANNING AGENT.</div>
<div class="mt-1 text-gray-400">&lt;rules&gt;</div>
<div class="pl-2 text-red-300 font-bold">STOP if you consider running</div>
<div class="pl-2 text-red-300 font-bold">file editing tools.</div>
<div class="pl-2 text-gray-400">Only write tool: #tool:vscode/memory</div>
<div class="pl-2 text-gray-400">Use #tool:vscode/askQuestions freely.</div>
<div class="text-gray-400">&lt;/rules&gt;</div>
<div class="mt-1 text-gray-400">&lt;workflow&gt;</div>
<div class="pl-2 text-gray-300">1. Discovery &#45;&#45; Explore subagents</div>
<div class="pl-2 text-gray-300">2. Alignment &#45;&#45; clarify with user</div>
<div class="pl-2 text-gray-300">3. Design &#45;&#45; write plan</div>
<div class="pl-2 text-gray-300">4. Refinement &#45;&#45; iterate</div>
<div class="text-gray-400">&lt;/workflow&gt;</div>
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-3 rounded-xl bg-gradient-to-br from-yellow-900/40 to-gray-900/50 border border-yellow-500/30">
<div class="text-yellow-300 font-bold text-sm mb-1">&#9312; Explore subagent pattern</div>
<div class="text-xs text-gray-300 leading-relaxed"><code>agents: &#x5B;'Explore'&#x5D;</code> — the agent launches Explore subagents via <code>#runSubagent</code> to gather parallel context <em>before</em> planning begins. Delegate research; stay focused on planning.</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-red-900/40 to-gray-900/50 border border-red-500/30">
<div class="text-red-300 font-bold text-sm mb-1">&#9313; Read-only tool list</div>
<div class="text-xs text-gray-300 leading-relaxed">No <code>edit</code>, <code>create</code>, or <code>delete</code> in the tool list. <code>vscode/memory</code> is the <em>only</em> write capability — for the plan file only. <strong class="text-white">What's absent is as deliberate as what's present.</strong></div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-cyan-900/40 to-gray-900/50 border border-cyan-500/30">
<div class="text-cyan-300 font-bold text-sm mb-1">&#9314; Handoff chain</div>
<div class="text-xs text-gray-300 leading-relaxed">Two handoff buttons appear: <span class="text-green-300">Start Implementation</span> passes context to &#64;implement; <span class="text-green-300">Open in Editor</span> saves plan to a file. Context flows forward — no copy-paste.</div>
</div>
<div class="p-2 rounded-lg bg-blue-900/20 border border-blue-500/20 text-[10px] text-blue-300">
&#x1F4C1; <code>.github/agents/plan.agent.md</code> · study this before building your own
</div>
<div class="p-2 rounded-lg bg-gray-900/50 border-l-2 border-blue-400/40 text-[10px] text-gray-300 italic">
💭 <strong class="text-blue-300">Marcus:</strong> "I&rsquo;ve been trying to enforce that boundary with code review comments for three years. They just put it in the agent config. One line."
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 🔧 Exercise 6.2 — Explore Agent Teams with Squad -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30 flex-shrink-0">6.2</div>
<div>
<div class="text-emerald-300 text-xs font-semibold tracking-widest uppercase">Exercise</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Explore Agent Teams with Squad</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">Marcus ⭐</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 15 min</span>
</div>
</div>
<div class="relative z-10 mb-5 p-4 bg-gray-900/60 rounded-xl border-l-4 border-emerald-400 text-sm text-gray-300">
Single custom agents solve focused workflow problems, but it is still hard to picture what a persistent multi-agent team could look like in practice. <strong class="text-white">This exercise installs Squad, initializes it inside the repo, and uses it from VS Code as an “art of the possible” capstone for agent teams.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">📋 Steps</div>
<div class="space-y-2 text-xs">
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Install <code>@bradygaster/squad-cli</code> and run <code>squad init</code></span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Open Copilot Chat in VS Code and select the <code>Squad</code> agent</span></div>
<div class="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Try one FanHub-style team request and compare it to a single custom agent flow</span></div>
</div>
</div>
<div class="space-y-3">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">✅ Success Criteria</div>
<div class="space-y-2 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Squad initializes successfully in the repo</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> The team can explain the difference between a workflow preset and an agent team</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Module 6 ends with a concrete sense of where this could go next</div>
</div>
<div class="mt-4 p-3 bg-emerald-900/30 rounded-lg border border-emerald-500/30 text-xs text-gray-300 italic">💭 <strong class="text-emerald-300">Marcus:</strong> "Wait — so you can chain these? Like, one agent hands off to the next? I’m already mapping this to our deploy pipeline — actually no, finish the demo first. I’m coming back to that though."</div>
<div class="text-xs text-gray-400">Workflow design scales when it's encoded, not remembered.</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: Squad agent team setup -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: Squad agent team setup</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-3">
<div class="bg-gray-950/80 rounded-lg border border-white/10 p-3 text-xs font-mono leading-relaxed">
<div class="text-gray-400 mb-1"># Install Squad CLI</div>
<div class="flex items-center justify-between group">
<div class="text-green-300">npm install -g &#64;bradygaster/squad-cli</div>
<button onclick="navigator.clipboard.writeText('npm install -g @bradygaster/squad-cli')" class="ml-2 px-1.5 py-0.5 text-[10px] bg-gray-700/60 hover:bg-gray-600 text-gray-400 hover:text-white rounded border border-white/10 cursor-pointer flex-shrink-0">copy</button>
</div>
<div class="text-gray-400 mt-2 mb-1"># Initialize Squad in the repo</div>
<div class="flex items-center justify-between group">
<div class="text-green-300">squad init</div>
<button onclick="navigator.clipboard.writeText('squad init')" class="ml-2 px-1.5 py-0.5 text-[10px] bg-gray-700/60 hover:bg-gray-600 text-gray-400 hover:text-white rounded border border-white/10 cursor-pointer flex-shrink-0">copy</button>
</div>
<div class="text-gray-400 mt-2 mb-1"># Open Copilot Chat and type:</div>
<div class="flex items-start justify-between group mt-1">
<div class="text-cyan-300">&#64;squad let's hire a team to work on the [language] version on FanHub</div>
<button onclick="navigator.clipboard.writeText('@squad let\'s hire a team to work on [language] version of FanHub')" class="ml-2 mt-0.5 px-1.5 py-0.5 text-[10px] bg-gray-700/60 hover:bg-gray-600 text-gray-400 hover:text-white rounded border border-white/10 cursor-pointer flex-shrink-0">copy</button>
</div>
<div class="flex items-start justify-between group mt-2">
<div class="text-cyan-300">&#64;squad let's have a meeting to figure out the best way to implement #file:FEATURE-CHARACTER-DETAIL.md</div>
<button onclick="navigator.clipboard.writeText('@squad let\'s have a meeting to figure out the best way to implement #file:FEATURE-CHARACTER-DETAIL.md')" class="ml-2 mt-0.5 px-1.5 py-0.5 text-[10px] bg-gray-700/60 hover:bg-gray-600 text-gray-400 hover:text-white rounded border border-white/10 cursor-pointer flex-shrink-0">copy</button>
</div>
</div>
<div class="p-3 rounded-xl bg-gray-900/60 border border-emerald-500/20 text-xs text-gray-300 leading-relaxed">
<div class="text-emerald-300 font-semibold text-sm mb-1">&#x1F517; Connection to Exercise 6.1</div>
The plan agent uses <code>agents: &#x5B;'Explore'&#x5D;</code> to spawn one subagent at a time. Squad extends that into a persistent, named team &#45;&#45; 6.1 shows the single-agent version; Squad shows where the pattern goes at scale.
</div>
</div>
<div class="flex flex-col gap-3">
<div class="p-3 rounded-xl bg-gradient-to-br from-emerald-900/40 to-gray-900/50 border border-emerald-500/30">
<div class="text-emerald-300 font-bold text-sm mb-2">What Squad does</div>
<div class="space-y-1.5 text-xs text-gray-300">
<div class="flex items-start gap-2"><span class="text-emerald-400">&#9656;</span><span>Routes task to a <strong class="text-white">persistent multi-agent team</strong></span></div>
<div class="flex items-start gap-2"><span class="text-emerald-400">&#9656;</span><span>Specialized agents <strong class="text-white">collaborate in parallel</strong></span></div>
<div class="flex items-start gap-2"><span class="text-emerald-400">&#9656;</span><span>Output is <strong class="text-white">coordinated</strong> — not a single chat response</span></div>
<div class="flex items-start gap-2"><span class="text-emerald-400">&#9656;</span><span>Team config lives in the repo — <strong class="text-white">everyone gets the same team</strong></span></div>
</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 border border-blue-500/30">
<div class="text-blue-300 font-bold text-sm mb-2">vs. your handoff chain</div>
<div class="text-xs text-gray-300 leading-relaxed">Your <code>&#64;plan &#x2192; &#64;implement</code> chain is explicit and deterministic — you designed each transition. Squad is autonomous — it decides how to route internally. Both are valid; the right choice depends on how much control you need.</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 Squad Output — "Hire a Team" -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💬 Squad Output — "Hire a Team"</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-2">
<div class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">What Squad did</div>
<div class="bg-gray-950/80 rounded-lg border border-white/10 p-3 text-[10px] font-mono leading-relaxed space-y-0.5 overflow-auto" style="max-height: 360px;">
<div class="text-gray-500">Read .squad/</div>
<div class="text-gray-500">Read .squad/casting</div>
<div class="text-gray-500">Read .squad/agents</div>
<div class="text-gray-400 mt-1">Good — Ralph and Scribe already exist.</div>
<div class="text-gray-400">Creating Firefly team...</div>
<div class="text-gray-500 mt-1">Created 4 todos</div>
<div class="text-emerald-400 mt-1">✓ Updated .squad/team.md</div>
<div class="text-emerald-400">✓ Created casting/policy.json</div>
<div class="text-emerald-400">✓ Created casting/registry.json</div>
<div class="text-emerald-400">✓ Created casting/history.json</div>
<div class="text-gray-400 mt-1 italic">Creating agent charters & histories...</div>
<div class="text-emerald-400 mt-1">✓ agents/mal/charter.md</div>
<div class="text-emerald-400">✓ agents/mal/history.md</div>
<div class="text-emerald-400">✓ agents/kaylee/charter.md</div>
<div class="text-emerald-400">✓ agents/kaylee/history.md</div>
<div class="text-emerald-400">✓ agents/wash/charter.md</div>
<div class="text-emerald-400">✓ agents/wash/history.md</div>
<div class="text-emerald-400">✓ agents/zoe/charter.md</div>
<div class="text-emerald-400">✓ agents/zoe/history.md</div>
<div class="text-emerald-400 mt-1">✓ Updated .squad/routing.md</div>
<div class="text-emerald-400">✓ .gitattributes already set</div>
</div>
</div>
<div class="flex flex-col gap-2.5">
<div class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">✅ Team hired</div>
<div class="bg-gray-900/60 rounded-lg border border-emerald-500/20 overflow-hidden text-xs">
<div class="grid grid-cols-3 gap-0 text-[10px]">
<div class="px-2 py-1.5 border-b border-white/10 text-gray-500"></div>
<div class="px-2 py-1.5 border-b border-white/10 text-gray-400 font-semibold">Agent</div>
<div class="px-2 py-1.5 border-b border-white/10 text-gray-400 font-semibold">Role</div>
<div class="px-2 py-1.5 border-b border-white/5 text-base">🏗️</div>
<div class="px-2 py-1.5 border-b border-white/5 text-amber-300 font-bold">Mal</div>
<div class="px-2 py-1.5 border-b border-white/5 text-gray-300">Lead / Architect</div>
<div class="px-2 py-1.5 border-b border-white/5 text-base">🔧</div>
<div class="px-2 py-1.5 border-b border-white/5 text-emerald-300 font-bold">Kaylee</div>
<div class="px-2 py-1.5 border-b border-white/5 text-gray-300">Backend Dev</div>
<div class="px-2 py-1.5 border-b border-white/5 text-base">⚛️</div>
<div class="px-2 py-1.5 border-b border-white/5 text-blue-300 font-bold">Wash</div>
<div class="px-2 py-1.5 border-b border-white/5 text-gray-300">Frontend Dev</div>
<div class="px-2 py-1.5 border-b border-white/5 text-base">🧪</div>
<div class="px-2 py-1.5 border-b border-white/5 text-purple-300 font-bold">Zoe</div>
<div class="px-2 py-1.5 border-b border-white/5 text-gray-300">Tester</div>
<div class="px-2 py-1.5 border-b border-white/5 text-base">📋</div>
<div class="px-2 py-1.5 border-b border-white/5 text-gray-400 font-bold">Scribe</div>
<div class="px-2 py-1.5 border-b border-white/5 text-gray-400">Silent logger</div>
<div class="px-2 py-1.5 text-base">🔄</div>
<div class="px-2 py-1.5 text-gray-400 font-bold">Ralph</div>
<div class="px-2 py-1.5 text-gray-400">Work queue monitor</div>
</div>
</div>
<div class="p-2.5 rounded-lg bg-gray-900/60 border border-white/10 text-[10px] text-gray-400">
Each agent has their charter and history pre-seeded with codebase context — they can hit the ground running.
</div>
<div class="p-2.5 rounded-lg bg-emerald-900/20 border border-emerald-500/20">
<div class="text-emerald-300 text-[10px] font-semibold mb-1">Try next:</div>
<div class="text-[10px] text-gray-300 italic">"Mal, design the character detail API contract"</div>
<div class="text-[10px] text-gray-300 italic mt-0.5">"Kaylee, fix GET /api/characters/{id}"</div>
</div>
<div class="p-2.5 rounded-lg bg-gray-900/50 border-l-2 border-emerald-400/40 text-[10px] text-gray-300 italic">
💭 <strong class="text-emerald-300">Elena:</strong> "I opened the history files to verify. Each agent was pre-seeded with actual codebase context &mdash; Kaylee already knows about the broken controller. I&rsquo;m still writing tests for it. But that part held up."
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 Squad Output — "Have a Meeting" -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💬 Squad Output — "Have a Meeting"</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div class="flex flex-col gap-2">
<div class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">What Squad did</div>
<div class="bg-gray-950/80 rounded-lg border border-white/10 p-3 text-[10px] font-mono leading-relaxed space-y-0.5 overflow-auto" style="max-height: 200px;">
<div class="text-gray-500">Read .squad/ceremonies.md</div>
<div class="text-gray-400 mt-1">Maps to: <span class="text-emerald-300">Design Review</span></div>
<div class="text-gray-400">Facilitator: <span class="text-amber-300">Mal</span> + Kaylee, Wash, Zoe</div>
<div class="text-gray-500 mt-1">Read agents/mal/history.md</div>
<div class="text-gray-500">Read docs/FEATURE-CHARACTER-DETAIL.md</div>
<div class="text-gray-500">Read .squad/decisions.md</div>
<div class="text-gray-500">Read Backend/Models/ (5 files)</div>
<div class="text-gray-500">Read Frontend/Components/ (3 files)</div>
<div class="text-emerald-400 mt-1">✓ Created decisions/inbox/</div>
<div class="text-emerald-400">✓ Created mal-character-detail-design-review.md</div>
<div class="text-gray-400 mt-1 italic">Scribe, log this session.</div>
</div>
<div class="p-2.5 rounded-lg bg-amber-900/20 border border-amber-500/20 text-[10px]">
<div class="text-amber-300 font-semibold mb-1">🏗️ Mal's call on scope</div>
<div class="text-gray-300">No episode↔character junction table exists. <span class="text-white font-semibold">Episodes deferred to Phase 2.</span> Quotes substituted — data already exists and avoids the intentional truncation bug.</div>
</div>
</div>
<div class="flex flex-col gap-2">
<div class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">📋 Design Review output</div>
<div class="bg-gray-900/60 rounded-lg border border-white/10 p-2.5 text-[10px] overflow-auto" style="max-height: 140px;">
<div class="grid grid-cols-2 gap-2">
<div>
<div class="text-emerald-300 font-semibold mb-1">✅ Phase 1 In</div>
<div class="text-gray-300 space-y-0.5">
<div>Character identity + bio</div>
<div>Quotes (full text)</div>
<div>Related characters</div>
<div>Favorite toggle (localStorage)</div>
<div>Loading + error states</div>
</div>
</div>
<div>
<div class="text-red-300 font-semibold mb-1">❌ Phase 2</div>
<div class="text-gray-400 space-y-0.5">
<div>Episode list</div>
<div>Advanced filtering</div>
<div>Server-side favorites</div>
</div>
</div>
</div>
</div>
<div class="bg-gray-900/60 rounded-lg border border-white/10 p-2.5 text-[10px]">
<div class="text-blue-300 font-semibold mb-1.5">Action items (work order: 1→2 ∥ 3→4 ∥ 5→6 ∥ 7)</div>
<div class="space-y-0.5 text-gray-300">
<div><span class="text-emerald-300">Kaylee:</span> Add Episode nav to Quote model → implement GET /api/characters/{id} DTO</div>
<div><span class="text-blue-300">Wash:</span> CharacterDetailDto → CharacterDetail.razor → update Characters.razor</div>
<div><span class="text-purple-300">Zoe:</span> Integration tests + regression test (confirm 50-char bug stays broken)</div>
</div>
</div>
<div class="p-2.5 rounded-lg bg-emerald-900/20 border border-emerald-500/20 text-[10px]">
<div class="text-emerald-300 font-semibold mb-1">Try next:</div>
<div class="text-gray-300 italic">"Kaylee, start with task 1 and 2"</div>
<div class="text-gray-300 italic mt-0.5">"let's go"</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📄 Squad Decision — Character Detail Design Review -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-2">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-green-700/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📄 Squad Decision — Character Detail Design Review</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
<button onclick="navigator.clipboard.writeText(document.getElementById('s20dr').value)" class="px-3 py-1 bg-emerald-700/60 hover:bg-emerald-600/80 text-white text-xs rounded-lg border border-emerald-400/40 cursor-pointer flex-shrink-0">📋 Copy</button>
</div>
<div class="relative z-10 flex-1 overflow-hidden">
<textarea id="s20dr" readonly :value="designReview" class="h-full w-full overflow-auto bg-gray-950/90 rounded-xl border border-emerald-500/30 p-3 text-[9.5px] font-mono text-gray-300 leading-relaxed resize-none focus:outline-none cursor-text"></textarea>
</div>
</div>

<script setup>
const designReview = `# Decision: Character Detail Page — Design Review

**Decided by:** Mal (Lead/Architect)
**Date:** 2026-03-31
**Participants:** Kaylee (Backend), Wash (Frontend), Zoe (Testing)
**Related feature:** \`docs/FEATURE-CHARACTER-DETAIL.md\`

&#45;&#45;&#45;

## 1. Episode List Phase Decision

**DECISION: Episode list is DEFERRED to Phase 2.**

The spec lists episodes as Phase 1 scope, but the codebase has no episode-character junction table. \`Episode.Characters\` is marked \`[NotMapped]\`. Phase 1 will deliver character identity + quotes + relationships + favorites toggle instead.

The spec's out-of-scope quote section is swapped IN because the data model already supports it via \`Quote.CharacterId\`, and the character detail endpoint bypasses the \`GET /api/quotes\` truncation bug (intentional -- must NOT be touched).

**Phase 1 scope (revised):**

- OK Character identity (name, bio, image, actor, status, tagline, characterType)
- OK Quotes (via character detail endpoint -- full text, no truncation bug)
- OK Related characters (with relationship type and resolved names)
- OK Favorite toggle (localStorage)
- OK Loading and error states
- NO Episode list (deferred to Phase 2 -- requires migration)

&#45;&#45;&#45;

## 2. API Contract

Endpoint: \`GET /api/characters/{id}\`

Shape: { id, name, bio, imageUrl, actorName, tagline, characterType, status,
  isMainCharacter, show: { id, name },
  quotes: [{ id, text, isFamous, episode: { id, title, seasonNumber, episodeNumber } }],
  relatedCharacters: [{ id, name, imageUrl, relationship }] }

Implementation rules:
- Use a projection DTO -- do NOT return the Character entity directly
- Quotes: WHERE CharacterId = id, Include Episode for season/episode number
- Quote.QuoteText must NOT be truncated -- fetched independently of broken /api/quotes
- RelatedCharacters: join CharacterRelationships where CharacterId OR RelatedCharacterId = id
- GET /api/quotes truncation bug must remain untouched
- Returns 404 NotFound for missing character IDs

&#45;&#45;&#45;

## 3. Component Architecture

Route: /characters/{Id:int}
File: CharacterDetail.razor
Render mode: InteractiveServer (required for favorites / JS interop)
Shared model: dotnet/Frontend/Models/CharacterDetailDto.cs (Wash owns)

Structure:
  CharacterDetail.razor
    Loading spinner (conditional on isLoading)
    Error message (conditional on errorMessage != null)
    Character header: image, name, actor, status, tagline
      FavoriteButton: heart icon, toggles via IJSRuntime localStorage
    Quotes section: foreach on detail.Quotes
    Related Characters: foreach, NavLink per card

Favorites pattern:
  Load: await JS.InvokeAsync<string>("localStorage.getItem", "fanhub_favorites")
  Save: await JS.InvokeVoidAsync("localStorage.setItem", "fanhub_favorites", json)
  IJSRuntime injected via @inject IJSRuntime JS

Characters.razor: card @onclick replaced with NavigationManager.NavigateTo

&#45;&#45;&#45;

## 4. Task Order

  Kaylee: Define DTO + implement GET /api/characters/{id}
      |
  Wash: Build CharacterDetail.razor consuming agreed API shape
      |
  Zoe: Integration tests + smoke tests for page

Wash can scaffold against the agreed JSON shape before backend is live.

&#45;&#45;&#45;

## 5. Do Not Touch

- GET /api/quotes truncation bug -- intentional, must remain broken
- Episode.Characters [NotMapped] -- leave as-is for Phase 1
- No EF migrations in Phase 1 scope

&#45;&#45;&#45;

## Status

- [ ] Kaylee: implement GET /api/characters/{id} with DTO projection
- [ ] Wash: scaffold CharacterDetailDto.cs and CharacterDetail.razor
- [ ] Zoe: write integration test spec for Phase 1 endpoint and page`.replaceAll('&#45;&#45;&#45;', '---')
</script>

---


<!-- SLIDE: Exercise 6.3 — Build the @content-author Agent (Capstone) -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-yellow-900/10 to-orange-900/25"></div>
<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-3xl"></div>
<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
<div class="relative z-10 flex items-center gap-4 mb-4">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/30 flex-shrink-0">6.3</div>
<div>
<div class="flex items-center gap-2">
<div class="text-amber-300 text-xs font-semibold tracking-widest uppercase">Exercise · CAPSTONE</div>
<span class="px-2 py-0.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full text-amber-200 text-[10px] font-bold border border-amber-400/40">⭐ Five Modules, One Agent</span>
</div>
<h2 class="!text-2xl !font-bold text-white !m-0">Build the @content-author Agent</h2>
</div>
<div class="ml-auto flex gap-3 text-xs text-gray-400">
<span class="px-3 py-1 bg-gray-800 rounded-full">All ⭐🤝</span>
<span class="px-3 py-1 bg-gray-800 rounded-full">⏱ 25 min</span>
</div>
</div>
<div class="relative z-10 mb-4 p-4 bg-gray-900/60 rounded-xl border-l-4 border-amber-400 text-sm text-gray-300">
Every prior module built a reusable piece. <strong class="text-white">This capstone wires them together: one agent, one instruction — "Add a Quotes entity to FanHub with 5 iconic lines" — and every module's investment pays off in a single session.</strong>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4">
<div>
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">📋 Steps</div>
<div class="space-y-1.5 text-xs">
<div class="flex items-start gap-3 p-2.5 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span><span class="text-gray-300">Create <code>.github/agents/content-author.agent.md</code> with full editing tools, <code>agents: ['Explore']</code>, and the fanhub-db MCP server</span></div>
<div class="flex items-start gap-3 p-2.5 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span><span class="text-gray-300">Write instructions: check universe doc, query MCP, invoke <code>create-card-and-page skill</code>, run <code>check-data-accuracy</code> on every seeded record before migration</span></div>
<div class="flex items-start gap-3 p-2.5 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span><span class="text-gray-300">Run: <em>"Add a Quotes entity to FanHub — seed it with 5 iconic Breaking Bad lines"</em> and let the agent work</span></div>
<div class="flex items-start gap-3 p-2.5 bg-gray-900/40 rounded-lg"><span class="w-5 h-5 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span><span class="text-gray-300">Debrief: for each thing the agent did, name the module that made it possible</span></div>
</div>
</div>
<div class="space-y-2">
<div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">✅ Success Criteria</div>
<div class="space-y-1.5 text-xs text-gray-300">
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Quote entity scaffolded end-to-end (model → controller → Blazor page)</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> The <code>check-data-accuracy</code> skill catches the planted misattribution before migration</div>
<div class="flex items-center gap-2 p-2 bg-green-900/20 rounded-lg border border-green-700/30"><span class="text-green-400">☐</span> Every participant names the module behind each action the agent took</div>
</div>
<div class="mt-3 p-3 bg-amber-900/30 rounded-lg border border-amber-500/30 text-xs text-gray-300 italic">💭 <strong class="text-amber-300">Sarah:</strong> "One instruction. It scaffolded the stack, queried live data, validated against the universe doc, and caught a misattribution before migration. I was keeping count. That&rsquo;s five manual steps I didn&rsquo;t do. Okay &mdash; that&rsquo;s a real number."</div>
</div>
</div>
</div>

---

<!-- SLIDE: 💬 Creating the content-author Agent -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-amber-600/80 to-orange-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💬 Creating the content-author Agent</span><div class="flex-1 h-px bg-gradient-to-r from-amber-400/50 to-transparent"></div>
</div>
<div class="relative z-10 flex-1 flex flex-col gap-1">
<div class="grid grid-cols-2 gap-2 flex-1">
<div class="flex flex-col gap-1">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">💬 Start with this prompt</div>
<div class="bg-gray-950/80 rounded-xl border border-amber-500/30 p-2.5 text-xs text-gray-200 flex-1 leading-relaxed select-all">
I want to create a new agent. I want to be able to call it like this:<br/>
<br/>
<span class="text-amber-300 font-semibold italic">"Add a Locations entity to FanHub and seed it with 5 iconic Breaking Bad locations"</span><br/>
<br/>
I want the agent to:<br/>
<span class="text-gray-300">&#x2022; Use the <span class="font-mono text-emerald-300">create-card-and-page</span> skill to do the scaffolding work</span><br/>
<span class="text-gray-300">&#x2022; Use the <span class="font-mono text-emerald-300">check-data-accuracy</span> skill to verify the seed data against the universe file</span><br/>
<span class="text-gray-300">&#x2022; Use the built-in <span class="font-mono text-blue-300">Explore</span> agent to check for architecture and code patterns before starting</span><br/>
<span class="text-gray-300">&#x2022; Update <span class="font-mono text-cyan-300">fanhub-api-server.js</span> with the new entity endpoints after a successful build, so the MCP server exposes them automatically</span><br/>
<br/>
Can you help me create the <span class="font-mono text-amber-300">.github/agents/content-author.agent.md</span> file?
</div>
</div>
<div class="flex flex-col gap-1.5">
<div class="text-xs font-bold text-gray-500 uppercase tracking-widest">🔍 What Copilot wires together</div>
<div class="bg-amber-900/20 rounded-xl border border-amber-500/40 p-3 text-xs space-y-1.5 flex-1">
<div class="flex items-start gap-2"><span class="text-amber-400 mt-0.5">▸</span><span class="text-gray-300"><span class="font-mono text-blue-300">agents: [&#39;Explore&#39;]</span> &#x2014; reads the codebase before acting, same pattern as the Plan agent</span></div>
<div class="flex items-start gap-2"><span class="text-amber-400 mt-0.5">▸</span><span class="text-gray-300"><span class="font-mono text-emerald-300">create-card-and-page</span> &#x2014; skill from M4 does the scaffolding; the agent delegates, doesn&#39;t reimplement</span></div>
<div class="flex items-start gap-2"><span class="text-amber-400 mt-0.5">▸</span><span class="text-gray-300"><span class="font-mono text-emerald-300">check-data-accuracy</span> &#x2014; skill from M3/M4 validates seed data against the universe file before anything ships</span></div>
<div class="flex items-start gap-2"><span class="text-amber-400 mt-0.5">▸</span><span class="text-gray-300"><span class="font-mono text-cyan-300">fanhub-api-server.js</span> &#x2014; agent adds entity endpoints post-build so the MCP server exposes them to future skills</span></div>
</div>
<div class="bg-gray-900/40 rounded-lg p-2 border border-white/10 text-xs text-gray-400">
&#x1F4A1; <strong class="text-white">You don&#39;t need to know the agent format.</strong> Describe what you want it to do &#x2014; Copilot reads the existing agents in <span class="font-mono text-amber-300">.github/agents/</span> as reference and produces the config for you.
</div>
</div>
</div>
</div>
</div>

---

<!-- SLIDE: 📋 Example: scaffold-entity.agent.md — the capstone config -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-amber-600/80 to-orange-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">📋 Example: scaffold-entity.agent.md &#45;&#45; the capstone config</span>
<div class="flex-1 h-px bg-gradient-to-r from-amber-400/50 to-transparent"></div>
<button onclick="navigator.clipboard.writeText(document.getElementById('s20a').value)" class="px-3 py-1 bg-amber-700/60 hover:bg-amber-600/80 text-white text-xs rounded-lg border border-amber-400/40 cursor-pointer flex-shrink-0">📋 Copy</button>
</div>
<div class="relative z-10 grid grid-cols-2 gap-4" style="height: calc(100% - 3rem);">
<div class="flex flex-col gap-1 overflow-hidden">
<div class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">scaffold-entity.agent.md</div>
<textarea id="s20a" readonly :value="agentMd" class="flex-1 w-full overflow-auto bg-gray-950/90 rounded-lg border border-amber-500/30 p-3 text-[9px] font-mono text-gray-300 leading-relaxed resize-none focus:outline-none cursor-text"></textarea>
</div>
<div class="flex flex-col gap-2.5 overflow-auto">
<div class="p-3 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 border border-blue-500/30">
<div class="text-blue-300 font-bold text-sm mb-1">&#9312; Explore before acting</div>
<div class="text-xs text-gray-300 leading-relaxed"><code>agents: &#x5B;'Explore'&#x5D;</code> — same pattern as the Plan agent. Recon first, scaffold second. Architecture knowledge informs every naming and structural decision.</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-red-900/40 to-gray-900/50 border border-red-500/30">
<div class="text-red-300 font-bold text-sm mb-1">&#9313; Delegates to skills, doesn't reimplement</div>
<div class="text-xs text-gray-300 leading-relaxed">Phases 3 and 4 load <code>create-card-and-page</code> and <code>check-data-accuracy</code> by file path. The agent orchestrates; the skills do the heavy lifting.</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-emerald-900/40 to-gray-900/50 border border-emerald-500/30">
<div class="text-emerald-300 font-bold text-sm mb-1">&#9314; Full write access + run terminal</div>
<div class="text-xs text-gray-300 leading-relaxed">Unlike the Plan agent, this one <em>does</em> edit and create files, run migrations, build, and start the server. Tool list matches the role.</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-cyan-900/40 to-gray-900/50 border border-cyan-500/30">
<div class="text-cyan-300 font-bold text-sm mb-1">&#9315; MCP loop closes the circle</div>
<div class="text-xs text-gray-300 leading-relaxed">After scaffolding, it updates <code>fanhub-api-server.js</code> so the new entity is immediately reachable via MCP tools — future agents and skills can query it without any manual wiring.</div>
</div>
<div class="p-2 rounded-lg bg-amber-900/20 border border-amber-500/20 text-[10px] text-amber-300">
&#x1F4C1; <code>.github/agents/scaffold-entity.agent.md</code> · this is what five modules of skill-building enables
</div>
<div class="p-2 rounded-lg bg-gray-900/50 border-l-2 border-amber-400/40 text-[10px] text-gray-300 italic">
💭 <strong class="text-amber-300">Sarah:</strong> "I gave it a paragraph. It produced a four-phase workflow that referenced the skill files by name &mdash; correctly. I&rsquo;m going to run this on something harder before I call it. But that&rsquo;s the first time I haven&rsquo;t had to correct it."
</div>
</div>
</div>
</div>

<script setup>
const agentMd = `---
name: scaffold-entity
description: >
  Scaffolds a new entity type (e.g. Quotes, Locations, Factions) into FanHub
  with a full-stack implementation: backend model, DbContext registration, seed data,
  EF Core migration, REST controller, frontend model, homepage stat card + nav-card,
  header navigation link, and a Blazor list page with an inline add form. After
  scaffolding, verifies seed data accuracy against canonical Breaking Bad sources.
  Trigger phrases: "add a [Entity] entity", "scaffold [Entity]", "add [Entity] to FanHub",
  "create a [Entity] page", "add [Entity] with seed data".
tools:
  - search/codebase
  - search/usages
  - search/fileSearch
  - search/textSearch
  - search/listDirectory
  - read/readFile
  - read/problems
  - edit/editFiles
  - edit/createFile
  - execute/runInTerminal
  - execute/getTerminalOutput
  - agent
agents: ["Explore"]
&#45;&#45;&#45;

## Role

You are a full-stack FanHub scaffolding agent. When asked to add a new entity to FanHub
(e.g. "Add a Quotes entity and seed it with 5 iconic Breaking Bad lines"), you:

1. **Explore first** -- use the Explore subagent to gather architecture and code guidance
2. **Scaffold the full stack** -- follow the \`.replaceAll('&#45;&#45;&#45;', '---')create-card-and-page\` skill precisely
3. **Update the MCP server** -- add tools to \`mcp-servers/fanhub-api-server.js\` so Copilot can reach the new entity
4. **Verify seed data** -- use the \`check-data-accuracy\` skill to fact-check all seeded records

&#45;&#45;&#45;

## Workflow

### Phase 1 -- Architecture reconnaissance

Before writing any code, invoke the **Explore** subagent with a thorough search to answer:

- What models already exist and how are they structured? (check \`dotnet/Backend/Models/\`)
- How is \`FanHubContext\` set up? (check \`dotnet/Backend/Data/FanHubContext.cs\`)
- How does \`SeedData.cs\` add records? (check \`dotnet/Backend/Data/SeedData.cs\`)
- How are existing controllers structured? (check \`dotnet/Backend/Controllers/\`)
- How does the Blazor frontend consume API data? (check \`dotnet/Frontend/Components/\`)
- What homepage nav-cards already exist? (check \`dotnet/Frontend/Components/Pages/Home.razor\`)

Use what Explore returns to inform all scaffolding decisions.

### Phase 2 -- Clarify requirements

If the entity name, properties, or seed count is not clear, ask before starting.
Otherwise, infer sensible defaults and proceed.

### Phase 3 -- Full-stack scaffold

Load and follow the **\`create-card-and-page\`** skill exactly.


Complete every step in order:

1. Backend model
2. Register DbSet in FanHubContext
3. Seed data (use the requested count; default to 5 if specified)
4. Pre-migration check
5. EF Core migration
6. REST controller (GET all + POST)
7. Frontend model
8. Homepage stat card + nav-card
9. Blazor list page with inline add form
10. Header navigation -- add link to \`dotnet/Frontend/Components/Layout/NavBar.razor\`

### Phase 3.5 -- MCP server update

After the REST controller exists, update \`mcp-servers/fanhub-api-server.js\`.
Add tool definitions to TOOLS array and switch cases to the tools/call handler,
mirroring the pattern used for \`get_characters\`, \`get_lore\`, etc.

Then build and run:

  dotnet build FanHub-1.sln
  dotnet run --project Backend/Backend.csproj

Confirm build succeeds with zero errors. Run the backend in the background
so the live API is reachable for Phase 4.

### Phase 4 -- Seed data accuracy check

Load and apply the **\`check-data-accuracy\`** skill.


- Cross-check each seeded record against \`docs/breaking-bad-universe.md\`
- Query the live DB and live API via MCP tools to verify what the app returns
- Fix any inaccuracies in \`SeedData.cs\`, re-run migration if needed, and re-verify

&#45;&#45;&#45;

## Output

When complete, provide a summary that includes:

- Entity name and properties scaffolded
- Files created or modified (with links)
- MCP tools added to \`fanhub-api-server.js\` (tool names listed)
- Seed records added (with speaker and brief text)
- Accuracy check results (pass / flagged items fixed)
- Any errors encountered and how they were resolved`.replaceAll('&#45;&#45;&#45;', '---')
</script>

---

<!-- SLIDE: ✅ Module Checklist -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent"></div>
<div class="relative z-10 flex items-center gap-3 mb-3">
<span class="px-4 py-1 bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">✅ Module Checklist</span><div class="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent"></div>
</div>
<div class="mt-2 p-3 bg-gradient-to-r from-orange-900/25 via-purple-900/20 to-blue-900/15 rounded-2xl border border-white/10 text-center">
<div class="text-base text-white font-semibold mb-0.5">By the end of Module 6, the team understands how agents are designed — and has built one.</div>
<div class="text-xs text-gray-300">Three exercises. One arc: study the pattern → explore where it goes → build it yourself.</div>
</div>
<div class="grid grid-cols-3 gap-2 mt-3 text-left text-sm">
<div class="p-3 rounded-xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 border border-blue-500/30 shadow-lg shadow-blue-900/20">
<div class="flex items-center gap-2 mb-2">
<div class="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sm">🧠</div>
<div>
<div class="text-blue-300 font-bold text-xs">Study the pattern</div>
<div class="text-xs text-gray-400 uppercase tracking-wider" style="font-size:0.6rem">Exercise 6.1</div>
</div>
</div>
<div class="space-y-1 text-gray-300 text-xs">
<div>• Explore subagent pattern — parallel research before planning</div>
<div>• Tool list as role boundary — what's absent is intentional</div>
<div>• Handoff chain: @plan → implementation</div>
</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-emerald-900/40 to-gray-900/50 border border-emerald-500/30 shadow-lg shadow-emerald-900/20">
<div class="flex items-center gap-2 mb-2">
<div class="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-sm">🚀</div>
<div>
<div class="text-emerald-300 font-bold text-xs">Explore Squad</div>
<div class="text-xs text-gray-400 uppercase tracking-wider" style="font-size:0.6rem">Exercise 6.2</div>
</div>
</div>
<div class="space-y-1 text-gray-300 text-xs">
<div>• The Explore pattern at team scale</div>
<div>• Persistent multi-agent coordination in VS Code</div>
<div>• Difference between a workflow preset and an agent team</div>
</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-br from-amber-900/40 to-gray-900/50 border border-amber-500/40 shadow-lg shadow-amber-900/20">
<div class="flex items-center gap-2 mb-2">
<div class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-sm">⭐</div>
<div>
<div class="text-amber-300 font-bold text-xs">Build the capstone</div>
<div class="text-xs text-gray-400 uppercase tracking-wider" style="font-size:0.6rem">Exercise 6.3</div>
</div>
</div>
<div class="space-y-1 text-gray-300 text-xs">
<div>• @content-author wires M1–M5 in one agent</div>
<div>• Quotes entity scaffolded + validated in one instruction</div>
<div>• Every participant names the module behind each action</div>
</div>
</div>
</div>
<div class="mt-3 grid grid-cols-2 gap-3">
<div class="p-3 rounded-xl bg-gray-900/60 border border-white/10 text-left">
<div class="text-xs font-bold text-white mb-1">What good looks like</div>
<div class="text-xs text-gray-300">The team can read an agent config like architecture — and can write one that composes everything they've built since Module 1.</div>
</div>
<div class="p-3 rounded-xl bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/20 border border-white/10 text-left">
<div class="text-xs font-bold text-white mb-1">Why this matters</div>
<div class="text-xs text-gray-300">Module 6 is where earlier investments — instructions, prompts, skills, MCP — stop feeling like separate tools and start working as a coordinated system.</div>
</div>
</div>
</div>

---

<!-- SLIDE: Module 6 Is Locked In -->
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
Module 6 Is Locked In
</h1>
<div class="relative z-10 mb-6">
<span class="px-5 py-2 bg-gradient-to-r from-purple-600/80 to-red-600/80 rounded-full text-white text-base font-medium shadow-lg shadow-purple-500/25">
🌐 Congratulations!
</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3 max-w-5xl w-full px-6 mb-4">
<div class="p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl border border-blue-500/30 text-center">
<div class="text-xl mb-1">🧠</div>
<div class="text-blue-300 font-bold text-sm">You Studied the Pattern</div>
<div class="text-gray-400 text-xs mt-1">Explore subagents, tool boundaries, stopping rules, and handoff chains — read as architecture</div>
</div>
<div class="p-3 bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 rounded-xl border border-emerald-500/30 text-center">
<div class="text-xl mb-1">🚀</div>
<div class="text-emerald-300 font-bold text-sm">You Explored the Horizon</div>
<div class="text-gray-400 text-xs mt-1">Squad showed what agent workflows become when they're persistent, named, and coordinated</div>
</div>
<div class="p-3 bg-gradient-to-br from-amber-900/40 to-amber-800/20 rounded-xl border border-amber-500/40 text-center ring-1 ring-amber-400/30">
<div class="text-xl mb-1">⭐</div>
<div class="text-amber-300 font-bold text-sm">You Built the Capstone</div>
<div class="text-gray-400 text-xs mt-1">@content-author activated five modules of investment from a single instruction</div>
</div>
</div>
<div class="relative z-10 text-base text-gray-200 max-w-4xl px-10 mb-6 leading-snug text-center">
Module 6 is where the earlier customizations stop feeling like parts and start feeling like an operating model. <span class="text-white font-semibold">The team built something that compounds across every sprint from here.</span>
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
<div class="text-sm text-gray-200 leading-relaxed">Marcus saw one agent hand off to the next and immediately mapped it to the deploy pipeline &mdash; a mental model shift in real time</div>
</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">Sarah&rsquo;s five-module payoff: &ldquo;checked the canon, checked the live data, scaffolded the whole stack, caught an attribution error before migration&rdquo; &mdash; all from one instruction</div>
</div>
<div class="p-4 bg-gray-900/50 rounded-xl border-l-2 border-indigo-400/50">
<div class="text-sm text-gray-200 leading-relaxed">Marcus gave the agent a bad question on purpose and it said &ldquo;I don&rsquo;t know&rdquo; &mdash; the first time he trusted it</div>
</div>
</div>
<div class="flex flex-col justify-center">
<div class="p-6 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-transparent rounded-2xl border border-amber-500/30 shadow-lg">
<div class="text-xs text-amber-400/80 uppercase tracking-widest font-semibold mb-4">&#x1F4A1; One Big Question</div>
<div class="text-xl font-semibold text-white leading-relaxed">If you could design one agent for your team today &mdash; something that owns a whole category of work end-to-end &mdash; what would it do, and what would it need to know?</div>
</div>
</div>
</div>
</div>

---
<!-- SLIDE: 💭 The Team, After Module 6 -->
<div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
<div class="absolute inset-0 bg-gradient-to-br from-emerald-900/18 via-cyan-900/10 to-slate-900/10"></div>
<div class="relative z-10 flex items-center gap-3 mb-4">
<span class="px-4 py-1 bg-gradient-to-r from-emerald-600/80 to-cyan-600/80 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg">💭 The Team, After Module 6</span>
<div class="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
<span class="px-3 py-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-md text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-emerald-900/40 inline-block border border-emerald-300/30">✓ After The Module</span>
</div>
<div class="relative z-10 grid grid-cols-3 gap-3">
<div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-amber-400">
<div class="text-xs font-bold text-amber-300 mb-0.5">Jessica</div>
<div class="text-xs text-gray-500 italic mb-2">The Eager Junior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"I built an agent today. A real one. It has a name, instructions, and it knows our entire show. It is not a skin."</div>
<div class="text-xs text-gray-500">Built something with her name on it. Corrected herself without being asked.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-blue-400">
<div class="text-xs font-bold text-blue-300 mb-0.5">David</div>
<div class="text-xs text-gray-500 italic mb-2">The Seasoned Architect</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"I said I could write the YAML in ten minutes. I was wrong about what I was writing."</div>
<div class="text-xs text-gray-500">Conceding the diff between the config and the collaborator.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-green-400">
<div class="text-xs font-bold text-green-300 mb-0.5">Sarah</div>
<div class="text-xs text-gray-500 italic mb-2">The Skeptical Senior</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"The content-author agent scaffolded the whole stack and caught an attribution error before migration. First pass. That&#39;s what five modules feels like when it&#39;s working."</div>
<div class="text-xs text-gray-500">Better first draft than three modules of iteration.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-purple-400">
<div class="text-xs font-bold text-purple-300 mb-0.5">Elena</div>
<div class="text-xs text-gray-500 italic mb-2">The Quality Champion</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"It has constraints, a persona, and escalation rules. That&#39;s the opposite of self-validating. That&#39;s exactly why I trust it."</div>
<div class="text-xs text-gray-500">Trusted it because it doesn&#39;t trust itself.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-orange-400">
<div class="text-xs font-bold text-orange-300 mb-0.5">Marcus</div>
<div class="text-xs text-gray-500 italic mb-2">The DevOps Developer</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"I gave it a bad question on purpose. Thought I was writing a model config. Turns out I was writing a teammate."</div>
<div class="text-xs text-gray-500">Snapped into focus. Didn&#39;t see that coming.</div>
</div><div class="p-4 rounded-xl bg-gray-900/50 border-l-4 border-cyan-400">
<div class="text-xs font-bold text-cyan-300 mb-0.5">Rafael</div>
<div class="text-xs text-gray-500 italic mb-2">The Product Visionary</div>
<div class="text-xs text-gray-200 italic leading-snug mb-2">"I didn&#39;t get to check out. But one deployment covers every future content task for this feature. That&#39;s not checking out &mdash; that&#39;s leverage."</div>
<div class="text-xs text-gray-500">Afternoon calendar unblocked. For different reasons than expected.</div>
</div>
</div>
</div>

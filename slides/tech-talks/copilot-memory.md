---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Copilot Memory
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Copilot Memory
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
</script>

# Title
<TitleSlide
  title="Copilot Memory"
  subtitle="Stateful AI That Remembers Your Preferences"
  tagline="Stop re-explaining your coding style every session"
  meta="GitHub Copilot · Customization & Context"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do I stop re-explaining my coding style every session?"
  subtext="Every developer using Copilot hits the same wall:"
  highlight="The AI forgets everything when you close the chat."
  :cards='[{"icon":"👩‍💻","title":"Daily Copilot Users","description":"Developers who open VS Code every day and reset Copilot context from scratch each time — forfeiting continuity between sessions."},{"icon":"🧑‍🔧","title":"Team Leads and Architects","description":"Leads enforcing team patterns and style guides who want Copilot aligned by default — not just when someone remembers to re-explain it."},{"icon":"🏗️","title":"Platform and DevOps Engineers","description":"Engineers with strong tool and workflow preferences who want Copilot to adapt to their stack without manual prompting every session."},{"icon":"📊","title":"5–10 min","description":"Time spent re-establishing context per session for most developers who do not use persistent memory."},{"icon":"⚡","title":"2 minutes","description":"Time to write the preferences that eliminate that re-establishment cost permanently — a one-time investment."},{"icon":"🧠","title":"Semantic retrieval","description":"Memory activates by meaning — not keywords. Writing once covers every future session that shares the same intent."}]'
/>

---

# Table of Contents
<TocSlide
  title="Copilot Memory"
  subtitle="Hook (stateless pain) → Mechanism → Activation → Decision framework"
  :sections='[{"icon":"🧠","title":"How Copilot Memory Works","blurb":"Tool architecture, storage logic, and semantic retrieval","slide":4},{"icon":"⚙️","title":"Enabling and Managing Memory","blurb":"One toggle, VS Code settings, and the management UI","slide":9},{"icon":"📝","title":"What to Store in Memory","blurb":"Persistence Test, ideal patterns, and anti-patterns","slide":12},{"icon":"🔐","title":"Privacy, Security and Usage","blurb":"Privacy model, guardrails, and your first actions","slide":17}]'
/>

---

# Part 1 Opener
<SectionOpenerSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="How It Works"
  title="How Copilot Memory Works"
  subtitle="Tool architecture, storage decision logic, and semantic retrieval — the cognitive foundation everything else builds on."
  :cards='[{"icon":"🗄️","title":"Persistent tool","blurb":"Memory is a first-class Copilot tool — not a prompt hack or a workaround."},{"icon":"🔍","title":"Semantic retrieval","blurb":"Activates by meaning, not keywords — one preference covers many contexts."},{"icon":"♻️","title":"28-day lifecycle","blurb":"Auto-expires stale memories to prevent silently degraded suggestions."}]'
  :terminal='{"context":"$ copilot memory list","detail":"Viewing stored preferences across sessions"}'
/>

---

# Storage Decision Logic
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="How It Works"
  title="What the Agent Stores — and What It Skips"
  :rows='[{"label":"Explicit rule","description":"From now on, always... — direct future-tense instruction, stored every time.","tag":"✅ Store"},{"label":"Style pref","description":"I prefer early returns, functional components — lasting personal habit.","tag":"✅ Store"},{"label":"Architecture","description":"We use Redis because pub/sub was needed — decision context preserved.","tag":"✅ Store"},{"label":"Session task","description":"Fix the bug on line 47 — ephemeral task, irrelevant after this session.","tag":"⏭ Skip"},{"label":"Credentials","description":"API key: abc123 — memory syncs across machines; never store secrets.","tag":"🚫 Never"}]'
  :progressDots='{"current":1,"total":4,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Store vs Retrieve
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="How It Works"
  title="Two Operations: Store and Retrieve"
  :left='{"header":"🗃️ Store — Saving What Matters","items":["User: From now on, always ask clarifying questions","Agent evaluates persistence-worthiness of the request","Agent confirms: I will remember this preference","Saved encrypted to your GitHub account across environments"]}'
  :right='{"header":"🔍 Retrieve — Applying in Context","items":["New session opens — blank chat, no injected context","Memory tool retrieves semantically relevant entries","Matches by meaning, not by exact keywords","Preferences applied automatically from the first response"]}'
  :progressDots='{"current":2,"total":4,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Cross-Platform Sync
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="How It Works"
  title="One Account. Every Environment."
  :cards='[{"icon":"🖥️","title":"VS Code Chat","description":"Primary workspace — memory stored and recalled across all chat sessions automatically."},{"icon":"🌐","title":"GitHub.com","description":"Same memories on the web interface — identical behavior wherever you open a chat."},{"icon":"⌨️","title":"GitHub CLI","description":"gh copilot inherits your account memories — consistent preferences in the terminal."},{"icon":"🔗","title":"Account-linked","description":"Memories follow your GitHub identity, not a machine — switch computers seamlessly."}]'
  :progressDots='{"current":3,"total":4,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# 28 Days and ROI
<HeroStatSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="How It Works"
  title="Freshness Enforced. ROI Compounded."
  subtitle="Stale preferences expire. Important ones survive because you keep using them."
  :hero='{"value":"28 days","label":"Auto-expiration window — stale memories purge automatically","source":"GitHub Copilot Docs"}'
  :supporting='[{"icon":"✏️","title":"Write once","description":"Store a preference in 2 minutes; benefit in every future session indefinitely."},{"icon":"🔄","title":"Auto-expires","description":"Stale memories expire to prevent silently degraded suggestions over time."},{"icon":"⚡","title":"Zero warm-up","description":"First session after enabling: preferences apply from the first token generated."}]'
  :insight='{"icon":"💡","text":"Semantic retrieval matches by meaning — not keywords. Write once, benefit in every context."}'
  :progressDots='{"current":4,"total":4,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Part 2 Opener
<SectionOpenerSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Enabling"
  title="Enabling and Managing Copilot Memory"
  subtitle="Setup is a single JSON toggle — keep this brisk and let the management UI be the main engagement point."
  :cards='[{"icon":"🔛","title":"One toggle","blurb":"A single VS Code setting enables cross-session persistence everywhere."},{"icon":"🖥️","title":"Management UI","blurb":"View, edit, and delete stored memories from a dedicated panel."},{"icon":"🌐","title":"Cross-platform","blurb":"Active in VS Code, GitHub.com, and GitHub CLI simultaneously."}]'
  :terminal='{"context":"$ code --open-settings","detail":"Enabling memory in VS Code settings JSON"}'
/>

---

# Enable and Configure
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Enabling"
  title="One Setting. Instant Cross-Session Memory."
  :code='{"language":"json","content":"{\n  \"github.copilot.chat.copilotMemory.enabled\": true\n}","filename":".vscode/settings.json"}'
  codePosition="left"
  :features='[{"icon":"🔛","title":"One toggle","description":"A single JSON setting enables cross-session memory in VS Code immediately."},{"icon":"🌐","title":"Multi-platform","description":"VS Code, GitHub.com, and GitHub CLI all activate from the same account setting."},{"icon":"⚡","title":"Immediate effect","description":"Active in your next chat session — no restart or additional configuration needed."}]'
  :progressDots='{"current":1,"total":2,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Memory Management
<FourCardGridSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Enabling"
  title="Full Control Over What Persists"
  :cards='[{"icon":"👁️","title":"View","description":"GitHub Settings > Copilot > Memory shows a timestamped list of all stored preferences."},{"icon":"✏️","title":"Edit and delete","description":"Remove individual memories when preferences evolve or you switch project context."},{"icon":"🗑️","title":"Bulk clear","description":"Select multiple or use Clear All to reset — useful after major project transitions."},{"icon":"📦","title":"Export JSON","description":"Download all memories as JSON for backup or audit before making bulk changes."}]'
  :progressDots='{"current":2,"total":2,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Part 3 Opener
<SectionOpenerSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="What to Store"
  title="What to Store in Memory"
  subtitle="The decision framework and Persistence Test are the most actionable takeaway — map it to your own workflows."
  :cards='[{"icon":"✅","title":"Ideal patterns","blurb":"Coding style, toolchain preferences, review standards — anything cross-session."},{"icon":"❌","title":"Anti-patterns","blurb":"File-specific fixes, temp context, secrets — these degrade quality over time."},{"icon":"🧪","title":"Persistence Test","blurb":"Three questions that determine if something belongs in memory."}]'
  :terminal='{"context":"$ copilot memory add","detail":"Storing a new coding preference interactively"}'
/>

---

# Ideal Candidates
<FourCardGridSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="What to Store"
  title="Persistence-Worthy Preferences"
  :cards='[{"icon":"🎨","title":"Coding style","description":"Early returns, TypeScript strict, functional components, JSDoc on public APIs."},{"icon":"⚙️","title":"Workflow habits","description":"Ask clarifying questions first, show plan before changes, include rollback strategy."},{"icon":"💬","title":"Communication","description":"Bullet points, concise summaries, code examples in explanations, one-sentence preview."},{"icon":"🏛️","title":"Arch decisions","description":"Redis for pub/sub, Result type for error handling, repository pattern for DB queries."}]'
  :progressDots='{"current":1,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# What NOT to Store
<FourCardGridSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="What to Store"
  title="What Should NOT Be Stored"
  :cards='[{"icon":"📍","title":"Session tasks","description":"Fix bugs on specific lines, current file contents, or refactoring tasks in context."},{"icon":"🔑","title":"Sensitive data","description":"Passwords, API keys, tokens, connection strings — memory syncs; never store credentials."},{"icon":"🔧","title":"Temp shortcuts","description":"Skip tests for now, ignore linting errors — temporary compromises must not persist."},{"icon":"👥","title":"Team standards","description":"Conventions everyone must follow belong in custom instructions, not personal memory."}]'
  :progressDots='{"current":2,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# The Persistence Test
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="What to Store"
  title="The Persistence Test"
  :columns='[{"icon":"🔁","title":"Future sessions?","description":"Will this apply to multiple future conversations?","items":["Yes → store in memory","No → use ephemeral context","Unsure → try and curate later"]},{"icon":"👤","title":"Personal or team?","description":"Is this your style, or a standard the whole team must follow?","items":["Just you → Memory","Whole team → Custom Instructions","Both → split the layers"]},{"icon":"🎯","title":"Specific enough?","description":"Can the AI apply this consistently and correctly?","items":["Early returns → yes","Write good code → no","Bullet-point explanations → yes"]}]'
  :progressDots='{"current":3,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Memory vs Custom Instructions
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="What to Store"
  title="Memory vs. Custom Instructions"
  :left='{"header":"🧠 Copilot Memory","items":["Personal preferences — follows your GitHub account, not the repo","Private to you — teammates cannot see your memories","Cross-project — same preferences on every codebase","One setting toggle, active in 5 minutes"]}'
  :right='{"header":"📋 Custom Instructions","items":["Team standards — shared and version controlled in the repository","Visible to all contributors — enforces team consistency","Repo-scoped — applies within a specific path or project","Markdown file in .github — reviewed like any other code"]}'
  :progressDots='{"current":4,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Part 4 Opener
<SectionOpenerSlide
  :partNumber="4"
  pillIcon="🔐"
  pillLabel="Privacy and Usage"
  title="Privacy, Security, and Effective Usage"
  subtitle="Front-load the privacy model briefly, then pivot hard into real-world impact and your first actions with memory."
  :cards='[{"icon":"🛡️","title":"Privacy model","blurb":"Memories are scoped to you — not shared with teams or used for training."},{"icon":"📈","title":"Real-world impact","blurb":"Before/after workflow deltas from teams using persistent memory."},{"icon":"🚀","title":"First actions","blurb":"Three things you can do today, this week, and this month."}]'
  :terminal='{"context":"$ copilot memory --help","detail":"Reviewing memory privacy and scope options"}'
/>

---

# Privacy Model
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🔐"
  pillLabel="Privacy and Usage"
  title="Encrypted, Private, and Under Your Control"
  :left='{"header":"✅ What IS Stored","items":["Text summaries of preferences — not code snippets or file contents","Linked to your GitHub account — no PII beyond account identity","Encrypted at rest and in transit on GitHub infrastructure","28-day auto-expiration — stale preferences purge automatically"]}'
  :right='{"header":"🚫 What Is NEVER Stored","items":["File contents, code snippets, or current workspace state","Secrets, API keys, passwords, or connection strings","Personal identifying information beyond your GitHub account","Session-specific paths, line numbers, or ephemeral task context"]}'
  :progressDots='{"current":1,"total":3,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Enterprise Governance
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔐"
  pillLabel="Privacy and Usage"
  title="Enterprise Governance at a Glance"
  :cards='[{"icon":"👤","title":"Admin visibility","description":"Memory content is private to each user — admins see usage events only, never memory content."},{"icon":"🛡️","title":"Sensitive data guard","description":"Tool filters secrets; users can delete any memory; 28-day auto-expiry is a safety net."},{"icon":"🏢","title":"Org control","description":"Organizations can disable memory for all users via policy — all-or-nothing governance option."},{"icon":"📦","title":"Data portability","description":"Export all memories as JSON anytime for backup, audit, or deletion before account changes."}]'
  :progressDots='{"current":2,"total":3,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# ROI
<HeroStatSlide
  :partNumber="4"
  pillIcon="🔐"
  pillLabel="Privacy and Usage"
  title="The Math Is Simple. The ROI Is Not."
  subtitle="Store once. Benefit every session — indefinitely."
  :hero='{"value":"99x","label":"Return on investment — 2 minutes stored, 198 minutes reclaimed across 40 sessions","source":"Example from GitHub Copilot Memory docs"}'
  :supporting='[{"icon":"⏱️","title":"2 min invested","description":"Time to write a clear, specific preference the AI can apply consistently every session."},{"icon":"♾️","title":"Forever saves","description":"That preference eliminates re-explanation in every future session — permanently."},{"icon":"📈","title":"Compounds over time","description":"10 stored preferences means 10x the time saved per session vs. explaining from scratch."},{"icon":"🎯","title":"Session zero","description":"First chat after enabling: preferences apply from the first token — zero warm-up cost."}]'
  :insight='{"icon":"💡","text":"200 minutes wasted re-explaining across 40 sessions. 2 minutes to store it once. That is the compounding power of memory."}'
  :progressDots='{"current":3,"total":3,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Before and After
<BeforeAfterSlide
  header="Life Before and After Copilot Memory"
  :leftItems='["Re-explain coding style every session","Prompt-engineer preferences into every chat","Context lost when switching between tools","Team members get inconsistent Copilot behavior"]'
  :rightItems='["Style and preferences active from the first token","Zero-prompt context — Copilot already knows","Consistent behavior across VS Code, web, and CLI","Memory plus custom instructions compose cleanly"]'
  :metrics='[{"value":"0 min","detail":"Context warm-up per session"},{"value":"2 min","detail":"One-time preference investment"},{"value":"∞","detail":"Sessions that benefit"}]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Enable memory in VS Code settings (chat.memory.enabled)","Open the memory management panel and review defaults","Write your first preference: preferred language or framework"]'
  :thisWeek='["Store your test and review style preferences","Add framework and dependency preferences","Tell Copilot your PR and commit message conventions"]'
  :thisMonth='["Audit stored memories after 30 days for freshness","Layer team custom instructions alongside personal memory","Measure session warm-up time before vs. after adoption"]'
  footer="Two minutes of preference-writing eliminates context re-establishment permanently — every session compounds the investment."
/>

---

# References
<ReferencesSlide
  :groups='[{"title":"📖 Official Documentation","color":"cyan","items":[{"label":"Copilot Memory documentation","href":"https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory","description":"Core concepts, memory curation, and privacy model"},{"label":"Custom instructions in VS Code","href":"https://code.visualstudio.com/docs/copilot/customization/custom-instructions","description":"Complementary team-wide instructions feature"}]}]'
/>

---

# Thank You
<ThankYouSlide
  title="Copilot Memory"
  subtitle="Your preferences, persisted. Your context, never lost."
  :cards='[{"icon":"🧠","value":"Semantic retrieval","detail":"Activates by meaning — write once, benefit forever"},{"icon":"⚡","value":"2-minute investment","detail":"Eliminates 5–10 min of context re-setup per session"},{"icon":"🔄","value":"Memory plus Instructions","detail":"Personal style composing cleanly with team standards"}]'
  prompt="Enable memory today. Write your first preference in the next 5 minutes."
/>

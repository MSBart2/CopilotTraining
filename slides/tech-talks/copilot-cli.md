---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot CLI: AI at the Point of Work
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: "GitHub Copilot CLI: AI at the Point of Work"
mdc: true
section: Developers
status: active
updated: 2026-06-04
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import AgendaSlide from './components/structure/AgendaSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import BeforeAfterSlide from './components/structure/BeforeAfterSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot CLI: At the Point of Work"
  subtitle="Close Every Gap Between You and the Work"
  tagline="Think anywhere. Steer anywhere. Learn always. Act autonomously."
  meta="CopilotTraining Tech Talk · 2026"
/>

---

# Core Question
<CoreQuestionSlide
  question="What unlocks when AI follows you everywhere you work?"
  subtext="Copilot isn't just an IDE feature — it's an agent you can direct from"
  highlight="any device, any machine, any stage of the pipeline."
  :cards='[
    { icon: "🔧", title: "Backend Developer", description: "Discover what&#39;s possible outside the editor — debug, deploy, triage with AI" },
    { icon: "🚀", title: "DevOps Engineer", description: "Run AI sessions on remote machines, in CI/CD, and across parallel workloads" },
    { icon: "🧑‍💼", title: "Tech Lead", description: "Build AI systems shaped by how your team works — that execute without asking" },
    { title: "~70% of dev time", description: "is outside the editor — debugging, deployments, log analysis, CI triage" },
    { title: "45 min → 8 min", description: "Docker debug collapse with Plan Mode + Rubber Duck cross-model review" },
    { title: "30 sec standup", description: "Generated from session history by /chronicle — everyday value, no extra work" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "AI at the Point of Work", takeaway: "Use Plan Mode and independent review where the work actually happens.", whyItMatters: "Fewer context switches and better early decisions keep terminal work moving." },
    { title: "Sessions That Learn", takeaway: "Turn session history and project context into guidance that improves over time.", whyItMatters: "Teams pay the context-setting cost once instead of repeating it in every session." },
    { title: "Automation You Can Grow Into", takeaway: "Move from guided plans to remote and scheduled execution as confidence grows.", whyItMatters: "A gradual autonomy path makes higher-leverage work practical without losing control." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🎯", title: "Think Before You Build", subtitle: "Close the Intent gap", blurb: "Plan Mode, Rubber Duck, and the 70% of your day outside the editor", slide: 4 },
    { icon: "📱", title: "Work From Anywhere", subtitle: "Close the Geography gap", blurb: "Phone steering, remote sessions, and CI/CD integration", slide: 9 },
    { icon: "🧠", title: "Sessions That Learn", subtitle: "Close the Memory gap", blurb: "/chronicle: standup in 30s, personalized tips, and improved instructions", slide: 14 },
    { icon: "⏰", title: "Scale Beyond Yourself", subtitle: "Close the Reach gap", blurb: "Scheduled Prompts, /fleet fan-out, and cloud delegation", slide: 19 }
  ]'
/>

---

# Part 1 — Think Before You Build
<SectionOpenerSlide
  :partNumber="1"
  title="Think Before You Build"
  subtitle="Close the Intent gap: AI follows you into the 70% of your day that happens outside the editor"
  :cards='[
    { icon: "🎯", title: "Plan Mode", blurb: "Q&A before coding — catches wrong assumptions early" },
    { icon: "🦆", title: "Rubber Duck", blurb: "Cross-model plan review — default-on since v1.0.58" },
    { icon: "⚡", title: "The Collapse", blurb: "8 attempts → 2 · 45 min → 8 min Docker debug" }
  ]'
  :terminal='{ context: "copilot --plan", detail: "8 attempts → 2 · 45 min → 8 min" }'
/>

<!-- Phase B S1: high — 4 body slides -->

---

# The 70% You're Missing
<HeroStatSlide
  :partNumber="1"
  pillIcon="⏱️"
  pillLabel="Think Before You Build · The Gap"
  title="AI Follows You to the 70%"
  subtitle="The IDE sees code. The terminal sees everything that's running."
  :hero='{ value: "~70%", label: "of developer time is outside the editor", source: "Atlassian State of Developer Experience 2025" }'
  :supporting='[
    { icon: "🐛", title: "Debugging failures", description: "Container logs, process state, environment vars — in the terminal, not source files" },
    { icon: "🚀", title: "Deployments & CI triage", description: "Build failures, pipeline logs, rollout verification — at the shell" },
    { icon: "📊", title: "Log analysis", description: "12GB of access logs on a production server — analyze where they live" },
    { icon: "🔍", title: "Infrastructure triage", description: "Network connectivity, disk state, service health — runtime visibility" }
  ]'
  :insight='{ icon: "💡", text: "What unlocks when AI follows you into these spaces?" }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Plan Mode — Questions Before Code
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="Think Before You Build · Plan Mode"
  title="Plan Mode: Questions Before Code"
  subtitle="From trial-and-error to collaborative strategy"
  leftLabel="Traditional Workflow"
  rightLabel="With Plan Mode"
  :steps='[
    { left: { label: "Describe what you need", note: "AI picks one interpretation" }, right: { label: "Describe what you need", note: "AI asks clarifying questions first" } },
    { left: { label: "AI generates solution", note: "Assumes intent, no alignment check" }, right: { label: "Collaborate on the plan", note: "Ambiguity resolved before any code runs" } },
    { left: { label: "You review and fix", note: "Discover wrong assumptions late" }, right: { label: "AI executes the approved plan", note: "Confidence earned through alignment" } },
    { left: { label: "Repeat until it works", note: "Average: 8 attempts" }, right: { label: "Done", note: "Average: 2 attempts" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "Repeat ×8 — 45 min Docker debug" }'
  :outcomeRight='{ icon: "✓", label: "2 attempts — 8 minutes" }'
  summaryMetric="8 attempts → 2 · 45 min → 8 min with Plan Mode"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Rubber Duck — The Automation Arc Begins
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🦆"
  pillLabel="Think Before You Build · Rubber Duck"
  title="The First Step in the Automation Arc"
  :left='{
    header: "Plan Mode",
    icon: "🎯",
    items: [
      { title: "Human-explicit intent", detail: "You steer with Q&A before any code is written" },
      { title: "Senior engineer questions", detail: "Catches wrong assumptions before they compound" },
      { title: "Shift+Tab or /goal", detail: "Available in any interactive session" }
    ]
  }'
  :right='{
    header: "Rubber Duck",
    icon: "🦆",
    items: [
      { title: "Automated-explicit review", detail: "A second model reviews the plan you just approved" },
      { title: "Different model family", detail: "GPT-5.4 reviews when primary is Claude — catches different blind spots" },
      { title: "Default-on since v1.0.58", detail: "Closes ~75% of quality gap vs top-tier models" }
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Four Operating Modes
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="Think Before You Build · Modes"
  title="Four Ways to Work with Copilot CLI"
  :cards='[
    { icon: "💬", title: "Interactive", description: "Conversational sessions — Plan Mode, steering, context-aware debugging (default)" },
    { icon: "🤖", title: "Programmatic", description: "Headless execution for CI/CD pipelines via copilot -p — stateless, structured output" },
    { icon: "☁️", title: "Cloud Delegation", description: "Background execution via & prefix — IDE and terminal stay completely free" },
    { icon: "📱", title: "Remote", description: "Steer any session from any device via URL or QR code with --remote" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Work From Anywhere
<SectionOpenerSlide
  :partNumber="2"
  title="Work From Anywhere"
  subtitle="Close the Geography gap: steer from any device, any machine, any pipeline"
  :cards='[
    { icon: "📱", title: "Phone Steering", blurb: "Live prod AI session steered from phone — 60-second reveal" },
    { icon: "🌐", title: "Remote Mode", blurb: "QR code or URL handoff — zero reconnect friction" },
    { icon: "🔒", title: "Permission Safety", blurb: "Per-tool approval, never --yolo; enforce with policy config" }
  ]'
  :terminal='{ context: "copilot --remote", detail: "Session live on prod-api-02 · steering from mobile" }'
/>

<!-- Phase B S2: high — 4 body slides -->

---

# Phone Steering Reveal
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="📱"
  pillLabel="Work From Anywhere · The Reveal"
  title="A Phone Controlling a Production AI Session"
  subtitle="60 seconds. No context. No preamble. Just a phone and a live server."
  :transcript='[
    { type: "prompt", text: "copilot --remote" },
    { type: "response", lines: ["✓ Session started on prod-api-02", "✓ Remote URL: https://copilot.github.com/s/a4f7", "✓ QR code displayed — scan to connect from any device"] },
    { type: "divider" },
    { type: "user", text: "The auth service is returning 503. Debug it." },
    { type: "thinking" },
    { type: "response", lines: ["[runs: docker logs auth-service --tail 50]", "[runs: docker exec auth-service env | grep JWT]"] },
    { type: "outcome", text: "Found: JWT_SECRET missing from staging container env" },
    { type: "outcome", text: "Remediation plan ready — approve from your phone?" }
  ]'
  footerMetric="Session lives on the server · you steer from wherever you are"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# SSH vs Remote — Paradigm Shift
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🌐"
  pillLabel="Work From Anywhere · Remote Architecture"
  title="SSH Moves You. --remote Moves the AI."
  :left='{
    header: "SSH Approach",
    icon: "🖥️",
    items: [
      "You physically move to the machine",
      "Context lost on disconnect",
      "One device, one session",
      "Copy-paste to share logs or findings"
    ]
  }'
  :right='{
    header: "--remote Session",
    icon: "📱",
    items: [
      "AI session lives where the problem is",
      "Session persists across disconnects",
      "Any device is a viewport — phone, tablet, browser",
      { title: "Public preview since 2026-04-13", detail: "docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely" }
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# CI/CD Integration
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Work From Anywhere · CI/CD"
  title="Programmatic Mode: AI in Your Pipeline"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/build.yml", content: "- name: Analyze failure\n  if: failure()\n  run: |\n    copilot -p \u201cAnalyze the build failure.\n      Check recent commits and error patterns.\n      Suggest specific fixes.\u201d \\\n      --allow-tool \u201cshell(gh)\u201d \\\n      --allow-tool \u201cshell(git)\u201d \\\n      > analysis.txt\n- name: Post as PR comment\n  if: failure()\n  run: |\n    gh pr comment $PR_NUMBER \\\n      --body-file analysis.txt" }'
  :features='[
    { icon: "🤖", title: "Headless execution", description: "copilot -p — non-interactive, stateless, designed for pipelines" },
    { icon: "🔒", title: "Scoped permissions", description: "--allow-tool pins exactly what the agent can touch" },
    { icon: "📊", title: "25 min → 5 min", description: "Build failure investigation — from manual to automated" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Permission Safety
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔒"
  pillLabel="Work From Anywhere · Permission Safety"
  title="Permission Safety: The Right Level for Every Context"
  :columns='[
    { icon: "🖱️", title: "Per-Tool Approval", description: "Approve each action individually — default and safest", items: ["Reject with inline feedback", "Approve for session to auto-approve same-type actions", "Runs in dev and staging safely"] },
    { icon: "🚫", title: "Never --yolo in Prod", description: "Blanket approval = agent has prod access if you&#39;re authenticated there", items: ["--allow-all-tools = full access", "--yolo is its alias", "Only in sandboxed or trusted envs"] },
    { icon: "🏢", title: "Enterprise Policy", description: "disableBypassPermissionsMode: true prevents --yolo in org-managed environments", items: ["Enforced at config level", "Users cannot override", "Pairs with /voice for hands-free accessibility"] }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Sessions That Learn
<SectionOpenerSlide
  :partNumber="3"
  title="Sessions That Learn"
  subtitle="Close the Memory gap: the session learns how you work — and that shapes everything in S4"
  :cards='[
    { icon: "🧠", title: "Auto-Compaction", blurb: "Never forgets across 95% token limits; /context shows budget" },
    { icon: "📓", title: "/chronicle", blurb: "Standup in 30s · tips · proposes instruction improvements" },
    { icon: "🌉", title: "The Bridge", blurb: "Patterns learned → execute in S4 — live proof at the close" }
  ]'
  :terminal='{ context: "/chronicle standup", detail: "Generated from 3h session history in 3s" }'
/>

<!-- Phase B S3: high — 4 body slides (includes bridge slide at close) -->

---

# Context Foundation — The Session Never Forgets
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🧠"
  pillLabel="Sessions That Learn · Context Foundation"
  title="The Session Never Forgets"
  :left='{
    header: "Auto-Compaction",
    icon: "📦",
    items: [
      { title: "Triggers at 95% token limit", detail: "Transparent — important context persists, redundant details pruned" },
      { title: "Manual control", detail: "/compact to trigger anytime, Escape to cancel" },
      { title: "Monitor with /context and /usage", detail: "Visual breakdown of token budget by source" }
    ]
  }'
  :right='{
    header: "Token Transparency",
    icon: "🔍",
    items: [
      { title: "Per-MCP token visibility", detail: "See exactly which MCP servers consumed your context budget" },
      { title: "/context shows the full stack", detail: "File context, tool responses, session history — all visible" },
      { title: "Practically infinite sessions", detail: "The foundation that makes sessions worth reconnecting to" }
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /chronicle in Action
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="📓"
  pillLabel="Sessions That Learn · /chronicle"
  title="/chronicle: Session History Becomes Intelligence"
  subtitle="Standup in 30 seconds — personalized patterns — improving instructions"
  :transcript='[
    { type: "prompt", text: "/chronicle standup" },
    { type: "response", lines: ["✓ Fixed auth middleware (JWT validation edge case)", "✓ Reviewed 3 PRs — approved 2, requested changes on 1", "✓ Unblocked staging deploy (missing env var)", "✓ Today: continue auth cleanup, sprint planning at 2pm"] },
    { type: "divider" },
    { type: "prompt", text: "/chronicle tips" },
    { type: "response", lines: ["Pattern: you check docker logs before env vars — reversing this saves ~3 min per debug cycle", "Pattern: 40% of sessions start with the same 3 context commands — consider a /setup alias"] }
  ]'
  footerMetric="Generated from 3h of session history in under 4 seconds"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /chronicle — AI That Gets Better the Way You Do
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="✨"
  pillLabel="Sessions That Learn · /chronicle improve"
  title="AI That Gets Better the Way You Do"
  :problem='{
    header: "The Problem",
    items: [
      "Instructions files decay — written once, rarely updated",
      { title: "Manual review is unrealistic", detail: "You&#39;d have to scan weeks of sessions yourself" },
      "Gap widens: instructions describe how you worked months ago"
    ]
  }'
  :solution='{
    header: "The Solution",
    items: ["/chronicle improve analyzes your actual sessions"],
    code: { language: "bash", content: "/chronicle improve\n# reads your session history\n# proposes additions to:\n#   .github/copilot-instructions.md\n# you review and approve" }
  }'
  :outcome='{
    header: "The Outcome",
    items: [
      "Instructions stay current — without extra work",
      { title: "AI shaped by how you actually work", detail: "Not by how you thought you&#39;d work when you wrote the file" }
    ],
    metrics: [{ value: "0 min", label: "manual instruction maintenance" }]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Bridge — You Taught It. Now It Executes.
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="🌉"
  pillLabel="Sessions That Learn · Bridge"
  title="You Taught It How You Work. Now It Executes."
  subtitle="Started at the top of this talk — /every 1m tell me I&#39;m awesome"
  :transcript='[
    { type: "prompt", text: "/every 1m tell me I&#39;m awesome" },
    { type: "response", lines: ["[Scheduled] Runs every 1 minute", "[14:31:02] ✅ You&#39;re awesome! (firing #1)", "[14:32:02] ✅ You&#39;re awesome! (firing #2)", "[14:33:02] ✅ You&#39;re awesome! (firing #3)", "..."] },
    { type: "divider" },
    { type: "outcome", text: "30+ firings since slide 1 — no human triggered any of them" }
  ]'
  footerMetric="Patterns learned in S3 · Executing autonomously · S4 shows what this looks like at real scale"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Scale Beyond Yourself
<SectionOpenerSlide
  :partNumber="4"
  title="Scale Beyond Yourself"
  subtitle="Close the Reach gap: learned patterns now execute autonomously, without asking"
  :cards='[
    { icon: "⏰", title: "Scheduled Prompts", blurb: "/every and /after — run learned patterns on a schedule" },
    { icon: "🚀", title: "/fleet Fan-Out", blurb: "Parallel subagents, separate contexts, merged results" },
    { icon: "☁️", title: "Cloud Delegation", blurb: "Delegate to GitHub&#39;s coding agent — terminal stays free" }
  ]'
  :terminal='{ context: "/every weekday at 9am summarize overnight PRs", detail: "Scheduled · next run Mon 09:00" }'
/>

<!-- Phase B S4: medium — 3 body slides -->

---

# Scheduled Prompts — Earned Payoff
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="⏰"
  pillLabel="Scale Beyond Yourself · Scheduled Prompts"
  title="Scheduled Prompts: Automation in Plain Language"
  codePosition="left"
  :code='{ language: "bash", filename: "Scheduled Prompts  (/experimental on)", content: "# Daily PR summary\n> /every weekday at 9am\n  \"Summarize overnight PRs and post\n   to Slack #dev-standup\"\n\n# Continuous health check\n> /every 30min\n  \"Check pod health in staging.\n   Alert via remote session if unhealthy.\"\n\n# After a long in-session task\n> run the full test suite\n> /after the tests finish\n  \"If all pass, commit and open a PR\n   with a summary of what changed.\n   If any fail, show me the failures.\"" }'
  :features='[
    { icon: "🔄", title: "Describe in plain language", description: "/every — no cron syntax, no task scheduler, no code. Just intent and a schedule." },
    { icon: "📡", title: "Pairs with --remote", description: "Schedule a patrol on a server, steer it from any device when it fires" },
    { icon: "⚡", title: "Pairs with /fleet", description: "Fan out the scheduled work across parallel subtasks automatically" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# /fleet and Cloud Delegation — Two Ways to Scale
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Scale Beyond Yourself · Fan-Out"
  title="Two Ways to Scale Beyond a Single Agent"
  :left='{
    header: "/fleet Fan-Out",
    icon: "🌐",
    items: [
      { title: "Explicit parallelization", detail: "Decompose a plan into subtasks — each in its own context window" },
      "Results merged by the orchestrator",
      { title: "Use after Plan Mode", detail: "Accept plan → /fleet implement → parallel execution, you review results" },
      "Custom agents used automatically for matching subtasks"
    ]
  }'
  :right='{
    header: "Cloud Delegation (&)",
    icon: "☁️",
    items: [
      { title: "Background execution", detail: "& prefix delegates to GitHub&#39;s coding agent — terminal and IDE stay free" },
      "A PR is created when the agent finishes",
      { title: "Best for 20+ min tasks", detail: "Security audits, large refactors, test scaffolding, doc generation" },
      "You review the outcome, not the steps"
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Ecosystem — Carry the Learning Across Your Team
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🌱"
  pillLabel="Scale Beyond Yourself · Ecosystem"
  title="Carry the Learning Across Your Team"
  :columns='[
    { icon: "🤖", title: "Custom Agents", description: "Team-specific specialists in .github/agents/ — scoped knowledge, shared workflows", items: ["User, repo, or org scope", "Auto-routed or invoked by @mention", "Pair with /chronicle improve for continuous improvement"] },
    { icon: "🌿", title: "Worktree from PR", description: "New in v1.0.60: checkout a PR into a new worktree — full context, no branch switching", items: ["Context isolated per worktree", "No stash, no interruption", "Sessions follow the worktree"] },
    { icon: "📦", title: "Plugin Ecosystem", description: "Extend beyond built-in agents via community or team plugins", items: ["copilot plugin install", "Database, cloud, domain tools", "Org-governed via MCP registry"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="From Scattered Attempts to Structured Intelligence"
  :leftItems='[
    "8 tool-call attempts to diagnose a container startup failure",
    "45 minutes of trial-and-error without a structured plan",
    "AI walked into a hidden port conflict assumption",
    "No second opinion on the implementation before committing"
  ]'
  :rightItems='[
    "2 targeted tool calls after Plan Mode&#39;s structured Q&A",
    "8 minutes to root cause and fix with a clear implementation plan",
    "Rubber Duck (different model family) caught the hidden assumption",
    "Session memory carries context from debug through to PR description"
  ]'
  :metrics='[
    { value: "75%", detail: "fewer tool calls" },
    { value: "82%", detail: "faster to resolution" },
    { value: "~75%", detail: "quality gap closed vs top-tier model" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Run `copilot --plan` on your next real debugging or refactoring task",
    "Watch Rubber Duck&#39;s cross-model review appear automatically — check if it caught something",
    "Try `/goal` to anchor a multi-step agent session to a single clear objective"
  ]'
  :thisWeek='[
    "After 3+ hours of coding, run `/chronicle standup` — share the output in your team standup",
    "Run `/chronicle tips` and review the personalized usage patterns it surfaces for you",
    "Try a remote session: `copilot --remote` and steer it from your phone"
  ]'
  :thisMonth='[
    "Enable Scheduled Prompts (`/experimental on`) and set up one recurring automation with `/every`",
    "Use `/fleet` to parallelize a large multi-part task — test suite creation, multi-module refactor, or multi-machine environments — that you&#39;d normally run sequentially by hand",
    "Let `/chronicle improve` propose updates to your `.github/copilot-instructions.md`"
  ]'
  footer="All features available with a GitHub Copilot Individual, Business, or Enterprise subscription."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
        { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli", label: "About GitHub Copilot CLI", description: "Concepts, architecture, and built-in agents overview" },
        { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli", label: "Use Copilot CLI", description: "Command syntax, modes, and configuration" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely", label: "Steering a CLI session from another device", description: "--remote flag, QR code handoff, and session persistence" },
        { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet", label: "Running tasks in parallel with /fleet", description: "Orchestrator-subagent fan-out and context isolation" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle", label: "Using GitHub Copilot CLI session data (/chronicle)", description: "Standup generation, personalized tips, and instruction improvements" }
    ] },
    { title: "📦 Changelog & Releases", color: "purple", items: [
        { href: "https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/", label: "Remote control CLI sessions on web and mobile (public preview)", description: "Announcement and feature details for --remote" },
        { href: "https://github.com/github/copilot-cli/releases", label: "GitHub Copilot CLI release notes", description: "Full version history including Rubber Duck, Scheduled Prompts, worktree-from-PR" }
    ] },
    { title: "🔗 Related Talks", color: "indigo", items: [
        { label: "Copilot Memory", description: "How repository memory and cross-session learning work in depth" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Copilot CLI"
  subtitle="Think anywhere. Steer anywhere. Learn always. Act autonomously."
  :cards='[
    { value: "8 → 2 attempts", detail: "Plan Mode + Rubber Duck: 45 min Docker debug → 8 min, 8 tool calls → 2" },
    { value: "/chronicle", detail: "AI proposes improvements to your .github/copilot-instructions.md — it gets better the way you do" },
    { value: "/every 1m", detail: "tell me I&#39;m awesome — started at the top of this talk, executing every minute since" }
  ]'
  prompt="What&#39;s the first gap you&#39;d close?"
/>

---
src: ./copilot-cli-reference.md
---

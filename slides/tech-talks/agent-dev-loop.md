---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Agent Dev Loop
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: The Agent Dev Loop
mdc: true
section: Developers
status: active
updated: 2026-06-30
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
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="The Agent Dev Loop"
  subtitle="From Repo to Feature with Copilot in VS Code"
  tagline="Build the toolkit that makes every future feature faster."
  meta="GitHub Copilot · VS Code · 45 min"
/>

---

# Core Question
<CoreQuestionSlide
  question="How does a team build a Copilot loop that gets faster with every feature?"
  subtext="Five capabilities chain into a repeatable workflow — and every pass leaves reusable assets."
  highlight="Context, prompts, skills, plans, and risk review. All in .github/. All version-controlled."
  :cards='[
    { icon: "👩‍💻", title: "Dev on a new codebase", description: "Has Copilot but no project context — suggestions miss team conventions" },
    { icon: "👥", title: "Tech lead scaling a team", description: "Domain knowledge stays tribal; standards erode as headcount grows" },
    { icon: "🔁", title: "Dev iterating on a feature", description: "Loses sprint cycles to incomplete tickets and unreviewed plans" },
    { title: "Onboarding to first merged PR", description: "Down from 5 days to 2 when AGENTS.md gives Copilot project context from day one" },
    { title: "Mid-sprint context switches", description: "Eliminated when evaluate-issue flags ticket gaps before a developer picks up the work" },
    { title: "Architectural risks in review", description: "/review-plan catches undiscovered gaps before a line of implementation code is written" }
  ]'
/>

---

# TOC
<TocSlide
  :sections='[
    { icon: "📋", title: "Context First",           subtitle: "AGENTS.md as the prerequisite",        blurb: "One /init prompt gives Copilot permanent project knowledge",             slide: 4  },
    { icon: "🤷", title: "Build the Toolkit",        subtitle: "Prompts + skills in .github/",         blurb: "Both artifact types are Markdown — both become slash commands",         slide: 8  },
    { icon: "🗺", title: "Plan, Risk, and Ship",     subtitle: "Plan first. Risk triage before code.", blurb: "The severity table makes the go/no-go call explicit and visual",        slide: 15 },
    { icon: "📈", title: "The Compounding Effect",   subtitle: "Toolkit grows with every feature",     blurb: "Four use cases with measurable outcomes — and a 15-min first step",    slide: 22 }
  ]'
/>

---

# Part 1 — Context First
<SectionOpenerSlide
  :partNumber="1"
  title="Context First"
  subtitle="AGENTS.md is the prerequisite — every prompt that follows depends on it."
  :cards='[
    { icon: "📋", title: "One Prompt",        blurb: "/init analyzes the workspace and drafts a thorough AGENTS.md" },
    { icon: "⚡", title: "Instant Multiplier", blurb: "30 seconds of setup improves every Copilot interaction after it" },
    { icon: "🔗", title: "Lives in the Repo", blurb: "Version-controlled context every developer on the team shares" }
  ]'
  :terminal='{ context: "$ git clone <repo> && code .", detail: "One prompt. Permanent context." }'
/>

---

# Without Context vs With Context
<ProblemSolutionOutcomeSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Context First · The Problem"
  title="Copilot Without Context Misses Project Conventions"
  :problem='{
    header: "Without AGENTS.md",
    items: [
      "Generic suggestions that miss team naming conventions",
      { title: "Wrong file locations", detail: "Creates utils/ when the team uses services/" },
      "Convention violations caught in code review, not during generation"
    ]
  }'
  :solution='{
    header: "The /init Prompt",
    items: [
      "Analyzes the workspace — stack, structure, scripts, conventions",
      "Generates AGENTS.md and commits it to the repo root",
      { title: "30 seconds", detail: "for thorough, project-specific context" }
    ]
  }'
  :outcome='{
    header: "With AGENTS.md",
    items: [
      "Convention-aware suggestions from the first prompt",
      "Correct file locations, naming, and patterns inline",
      "Code review focuses on logic, not style corrections"
    ],
    metrics: [{ value: "Permanent", label: "context multiplier for every interaction" }]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# AGENTS.md Artifact
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Context First · AGENTS.md"
  title="What /init Generates: Thorough Workspace Context"
  codePosition="left"
  :code='{ language: "markdown", filename: "AGENTS.md", content: "## Project Overview\nReact 18 + TypeScript nonogram puzzle SPA.\nTarget: puzzle enthusiasts and educators.\n\n## Tech Stack\nVite 5 · CSS Modules · Vitest · npm\n(No Tailwind. No Redux. Named exports only.)\n\n## Commands\nnpm run dev    — localhost:5173\nnpm run test   — Vitest watch mode\nnpm run lint   — ESLint + TypeScript tsc\n\n## Conventions\nPascalCase components, co-located .module.css\nResults pattern for errors (no thrown exceptions)\n\n## Key Entry Points\nNew page → src/pages/ + App.tsx + Nav.tsx\nNew hook → src/hooks/ + index.ts export" }'
  :features='[
    { icon: "⚡", title: "Instant project awareness",  description: "Stack, commands, conventions, and entry points — all in one committed file" },
    { icon: "🔗", title: "Shared by every developer",  description: "Committed to the repo root — version-controlled context no one has to recreate" },
    { icon: "📈", title: "Permanent multiplier",        description: "Every subsequent Copilot prompt improves — not just the next one" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The /init Prompt
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="💬"
  pillLabel="Context First · The /init Prompt"
  title="The /init Prompt: What to Ask For"
  codePosition="left"
  :code='{ language: "text", filename: "Copilot Chat → /init", content: "/init Analyze this workspace and generate\nthorough guidance for agents.\n\nInclude:\n- Incorporate the lazy dev instructions from\n  github.com/DietrichGebert/ponytail/AGENTS.md\n- Project overview (purpose, domain, users)\n- Tech stack: languages, frameworks, pkg mgr\n- Folder structure + one-line descriptions\n- Exact build/run/test/lint commands (real scripts)\n- Coding conventions: naming, formatting, errors\n- Architectural decisions + component interactions\n- Setup steps, env vars, non-obvious gotchas\n- Entry points for common tasks (route, test)\n\nConcise, repo-specific, no boilerplate." }'
  :features='[
    { icon: "🔗", title: "Bootstrap from a reference", description: "Incorporating ponytail/AGENTS.md seeds lazy-developer conventions before the analysis runs" },
    { icon: "🎯", title: "Real scripts, not examples",  description: "Explicitly asks for actual package.json scripts — prevents &#39;npm run build&#39; boilerplate" },
    { icon: "🧹", title: "Concise by design",            description: "The closing line keeps output tight — AGENTS.md should be a quick reference, not a doc" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Build the Toolkit
<SectionOpenerSlide
  :partNumber="2"
  title="Build the Toolkit"
  subtitle="Humans Run Prompts. AI run skills. Both are just Markdown files in .github/."
  :cards='[
    { icon: "📝", title: "Prompts",    blurb: "/evaluate-issue checks any ticket for completeness in seconds" },
    { icon: "🛠", title: "Skills",     blurb: "/create-spa-page builds a fully wired page per team conventions" },
    { icon: "📦", title: "Accumulate", blurb: "Each file in .github/ becomes a slash command the team inherits" }
  ]'
  :terminal='{ context: "/create-prompt and /create-skill", detail: "Save once. Invoke forever." }'
/>

---

# Prompts vs Skills
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🛠"
  pillLabel="Build the Toolkit · Two Asset Types"
  title="Humans Run Prompts. AI run skills."
  :left='{
    header: "Prompts (.prompt.md)",
    icon: "📝",
    items: [
      { title: "Structured evaluation", detail: "Check completeness, correctness, readiness" },
      "Parameterized with {{ISSUE}} or {{PLAN}}",
      { title: "Saved to .github/prompts/", detail: "Becomes /evaluate-issue, /review-plan, etc." }
    ]
  }'
  :right='{
    header: "Skills (.skill.md)",
    icon: "🛠",
    items: [
      { title: "Domain-encoded action", detail: "Encodes how the team creates pages — not generic boilerplate" },
      "Parameterized with {{PAGE_NAME}}, {{DESCRIPTION}}",
      { title: "Saved to .github/skills/", detail: "Becomes /create-spa-page, /add-puzzle-type, etc." }
    ]
  }'
  :progressDots='{ current: 1, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# evaluate-issue Artifact
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📝"
  pillLabel="Build the Toolkit · Prompt Artifact"
  title="evaluate-issue.prompt.md — Completeness Checker for Any Ticket"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/prompts/evaluate-issue.prompt.md", content: "---\ndescription: Evaluate a bug report or feature\n  request for completeness before work begins.\n---\nFor Bug Reports, check:\n- [ ] Problem statement clearly described?\n- [ ] Expected behavior stated?\n- [ ] Reproduction steps: numbered + repeatable?\n- [ ] Severity: how many users affected?\n\nReturn:\n**Type** · **Completeness** · **Missing elements**\n**Suggested additions** · **Ready to implement?**\n\nIssue: {{ISSUE}}" }'
  :features='[
    { icon: "🔄", title: "Reusable across projects",  description: "Same prompt works for any issue in any codebase — not tied to the SPA" },
    { icon: "⚡", title: "Invokable as /evaluate-issue", description: "Saved to .github/prompts/ — available as a slash command immediately" },
    { icon: "🛡", title: "Catches gaps before work starts", description: "Missing repro steps, expected behavior, severity — surfaced before a dev picks it up" }
  ]'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# /create-prompt and /evaluate-issue in Action
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Build the Toolkit · Live Demo"
  title="Create the Prompt. Then Use It. Two Commands."
  codePosition="top"
  :code='{ language: "bash", filename: "Copilot Chat", content: "# 1. Create the prompt (saves to .github/prompts/evaluate-issue.prompt.md)\n/create-prompt this prompt should evaluate a bug or issue or feature\n  request for completeness and correctness.\n\n# 2. Run it against a real ticket \u2014 immediately\n/evaluate-issue \u201cPuzzles don\u2019t show me what I\u2019ve done wrong,\n  only a \u2018keep trying\u2019 message.\u201d" }'
  :features='[
    { icon: "📁", title: "Step 1: File created",         description: "evaluate-issue.prompt.md written to .github/prompts/ and invokable as /evaluate-issue" },
    { icon: "🔍", title: "Step 2: 1 of 5 criteria met",  description: "4 gaps: expected behavior, repro steps, environment, severity" },
    { icon: "\u21a9", title: "Four questions to reporter",    description: "Ticket returns for completion \u2014 spec is closed before a developer picks it up" }
  ]'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# create-spa-page Artifact
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🛠"
  pillLabel="Build the Toolkit · Skill Artifact"
  title="create-spa-page.skill.md — Domain-Encoded Page Creation"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/skills/create-spa-page.skill.md", content: "---\ndescription: Create a new SPA page — component,\n  CSS module, route, nav link, and test.\n---\nFiles to create:\n1. src/pages/{{PAGE_NAME}}/{{PAGE_NAME}}.tsx\n2. src/pages/{{PAGE_NAME}}/{{PAGE_NAME}}.module.css\n3. src/pages/{{PAGE_NAME}}/{{PAGE_NAME}}.test.tsx\n\nFiles to update:\n4. Add <Route> in src/App.tsx (RR v6 pattern)\n5. Add <NavLink> in src/components/Nav/Nav.tsx\n\nFollow src/pages/Home/Home.tsx as reference.\nPAGE_NAME: {{PAGE_NAME}}" }'
  :features='[
    { icon: "🏎", title: "5 files, zero decisions",    description: "Component, CSS module, test, route, nav link — all created in one invocation" },
    { icon: "📐", title: "Encodes team conventions",   description: "PascalCase, CSS Modules, named exports, reference pattern — all baked in" },
    { icon: "👥", title: "Any developer, senior output", description: "New team members invoke the skill and ship convention-correct code from day one" }
  ]'
  :progressDots='{ current: 4, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# /create-skill and /create-spa-page in Action
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Build the Toolkit · Live Demo"
  title="Create the Skill. Then Use It. Two Commands."
  codePosition="top"
  :code='{ language: "bash", filename: "Copilot Chat", content: "# 1. Create the skill (saves to .github/skills/create-spa-page.skill.md)\n/create-skill to create new pages in the SPA app\n\n# 2. Use it to generate a new page — immediately\n/create-spa-page Add a \u201chow to play nonograms\u201d page\n  that is linked to from the home page" }'
  :features='[
    { icon: "📁", title: "Step 1: Skill created",      description: "create-spa-page.skill.md written to .github/skills/ and invokable as /create-spa-page" },
    { icon: "⚡", title: "Step 2: 5 files generated",  description: "Component, CSS module, test, route, nav link — one invocation, zero convention decisions" },
    { icon: "📐", title: "Convention-correct output",  description: "PascalCase, CSS Modules, named exports, reference pattern — team standards baked in" }
  ]'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Four Toolkit Assets
<FourCardGridSlide
  :partNumber="2"
  pillIcon="📦"
  pillLabel="Build the Toolkit · The Library"
  title="Four Assets. One Directory. Infinite Reuse."
  :cards='[
    { icon: "📋", title: "AGENTS.md",         description: "Workspace context file — gives Copilot permanent project knowledge from /init" },
    { icon: "📝", title: "evaluate-issue",     description: "Completeness checker — flags ticket gaps before a developer picks up the work" },
    { icon: "🛠", title: "create-spa-page",    description: "Domain-encoded page creator — 5 files, zero convention decisions, one invocation" },
    { icon: "🔍", title: "review-plan",        description: "Risk triage prompt — returns a severity table with a go/no-go recommendation" }
  ]'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Plan, Risk, and Ship
<SectionOpenerSlide
  :partNumber="3"
  title="Plan, Risk, and Ship"
  subtitle="A plan is a hypothesis. /review-plan stress-tests it before code is written."
  :cards='[
    { icon: "🗺", title: "Plan First",           blurb: "/plan generates tasks, files, scope, and open questions" },
    { icon: "🔍", title: "Triage the Risk",       blurb: "/review-plan returns High/Med/Low with a go/no-go verdict" },
    { icon: "✅", title: "Ship with Confidence",  blurb: "Risks resolved before implementation — no mid-sprint surprises" }
  ]'
  :terminal='{ context: "/plan → /review-plan → update plan → implement", detail: "No-go before a line is written." }'
/>

---

# Code-First vs Plan-First
<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="🗺"
  pillLabel="Plan, Risk, and Ship · Workflow"
  title="Code-First vs Plan-First"
  subtitle="One path finds the architectural gap in code review. The other finds it in the plan."
  leftLabel="Code-First"
  rightLabel="Plan-First with /plan"
  :steps='[
    { left: { label: "Pick up the ticket",    note: "Jump straight to implementation" },       right: { label: "Pick up the ticket",  note: "Generate a /plan first" } },
    { left: { label: "Write implementation",  note: "Discover scope as you code" },            right: { label: "Review the plan",     note: "Scope, tasks, open questions — all explicit" } },
    { left: { label: "Open a PR",             note: "Reviewer finds architectural gap" },      right: { label: "Run /review-plan",    note: "High-severity risk surfaced before code" } },
    { left: { label: "Rework and re-PR",      note: "2 extra days from late discovery" },      right: { label: "Update plan, implement", note: "Risk resolved; original estimate holds" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "Architectural rework discovered in code review" }'
  :outcomeRight='{ icon: "✓", label: "Shipped on the original estimate" }'
  summaryMetric="Risk found in code review → risk caught in the plan"
  :progressDots='{ current: 1, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /plan Output
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🗺"
  pillLabel="Plan, Risk, and Ship · /plan"
  title="/plan Generates a Structured Breakdown Before Any Code"
  codePosition="left"
  :code='{ language: "markdown", filename: "/plan: Alphabet Puzzle Navigation", content: "## Goal\nAdd nav access to a 10x10 nonogram puzzle\nfor each letter A-Z. Deterministic seed\n= letter char code.\n\n## Tasks\n1. Generator: generateLetterPuzzle(letter)\n   charCode seed + 26 unit tests\n2. Pages: AlphabetIndex + extend Puzzle\n   for /puzzle/alpha/:letter\n3. Routes: /alphabet + /puzzle/alpha/:letter\n4. Nav: add &#39;Alphabet&#39; link in Nav.tsx\n\n## Open questions\n- Invalid params (/puzzle/alpha/1):\n  error page or redirect?\n- Persist completed puzzles to localStorage?" }'
  :features='[
    { icon: "🎯", title: "Scope made explicit",     description: "~8 files, ~200 lines estimated before a line is written" },
    { icon: "❓", title: "Open questions surfaced",  description: "Invalid params and localStorage — decisions that cause rework if left open" },
    { icon: "👥", title: "Reviewable before code",  description: "Any developer can read the plan and flag issues before implementation begins" }
  ]'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The /plan Command
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🗺"
  pillLabel="Plan, Risk, and Ship · /plan"
  title="The /plan Command: Natural Language, Structured Output"
  codePosition="top"
  :code='{ language: "bash", filename: "Copilot Chat", content: "/plan let&#39;s do some big work. let&#39;s add a navigation\n  item that automatically generates a 10x10 puzzle for each\n  letter of the alphabet. ask questions if you aren&#39;t\n  clear on what to do." }'
  :features='[
    { icon: "💬", title: "Conversational scoping",  description: "Describe the goal in plain language — /plan handles the task and file breakdown" },
    { icon: "❓", title: "Ambiguity invited",        description: "ask questions if you aren&#39;t clear surfaces open decisions before work begins" },
    { icon: "📋", title: "Plan, not code",           description: "The output is a reviewable plan file — implementation only starts after it&#39;s approved" }
  ]'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Risk Triage Table
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="🔍"
  pillLabel="Plan, Risk, and Ship · Risk Triage"
  title="/review-plan Returns a Severity Table — Not Just a List"
  subtitle="Four risks, sorted by impact. Two are blocking. The verdict: No-go on current plan."
  :rows='[
    { label: "Determinism",    description: "Seed underspecified — identical grids not guaranteed across sessions",            tag: "High" },
    { label: "Invalid param",  description: "Error or redirect for /puzzle/alpha/1? Cascades if not decided early",          tag: "Med"  },
    { label: "localStorage",   description: "Cross-cutting concern introduced if localStorage scope is decided late",          tag: "Med"  },
    { label: "Test matrix",    description: "Sounds cheap but could slow the suite if the generator is complex",              tag: "Low"  }
  ]'
  footnote="Recommendation: No-go — resolve the determinism algorithm before Tasks 2–5 depend on it."
  :progressDots='{ current: 4, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The /create-prompt review-plan Command
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🔍"
  pillLabel="Plan, Risk, and Ship · /review-plan"
  title="The /create-prompt Command: Encode the Risk Review"
  codePosition="top"
  :code='{ language: "bash", filename: "Copilot Chat", content: "/create-prompt \u201creview plan\u201d. a prompt that reviews a plan\n  file for technical and delivery risks. run triage and\n  return hig/med/low risks to both implementation and\n  delivery. report the findings in a markdown table\n  so that it&#39;s easy to read." }'
  :features='[
    { icon: "⚖️", title: "Two risk dimensions",    description: "Implementation AND delivery risks evaluated separately — not one combined list" },
    { icon: "📄", title: "Table output by design",   description: "Markdown table format makes High/Med/Low findings scannable in any PR or doc" },
    { icon: "⚡", title: "Invokable as /review-plan", description: "Saved to .github/prompts/ automatically — available as a slash command immediately" }
  ]'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Plan Updated — Ship
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="✅"
  pillLabel="Plan, Risk, and Ship · Resolution"
  title="The Plan Gets Updated. Then Implementation Starts."
  :problem='{
    header: "No-go: High Risk Found",
    items: [
      { title: "Determinism algorithm unspecified", detail: "Tasks 2–5 cannot be implemented correctly without it" },
      "Two open questions need decisions before routing is built",
      "Implementing now causes cascading rework across five tasks"
    ]
  }'
  :solution='{
    header: "Plan Update",
    items: [
      "Define seed: charCode XOR prime, reproducible across sessions",
      { title: "Add to Task 1", detail: "Algorithm spec + 26-letter snapshot test suite" },
      "Resolve params: invalid letters redirect to /alphabet",
      "localStorage: out of scope, deferred to follow-up"
    ]
  }'
  :outcome='{
    header: "Go: Implement",
    items: [
      "All open questions resolved before a line of code is written",
      "Implementation starts clean — no mid-sprint surprises",
      "Feature ships on the original 3-day estimate"
    ],
    metrics: [{ value: "0", label: "architectural rework items post-review" }]
  }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — The Compounding Effect
<SectionOpenerSlide
  :partNumber="4"
  title="The Compounding Effect"
  subtitle="The real output of the loop is the growing toolkit, not any single feature."
  :cards='[
    { icon: "📈", title: "Each Loop Adds Assets",  blurb: "Every feature produces a prompt, skill, or plan template" },
    { icon: "📊", title: "Measured Outcomes",       blurb: "Onboarding, ticket quality, and delivery improve per iteration" },
    { icon: "🎯", title: "Start in 15 Minutes",     blurb: "Clone, run /init, commit AGENTS.md — first step done" }
  ]'
  :terminal='{ context: "After 3 months: 1 AGENTS.md + 3 prompts + 4 skills", detail: "Onboarding: 5 days → 2 days." }'
/>

---

# Four Use Cases
<FourCardGridSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="The Compounding Effect · Outcomes"
  title="Four Teams. Four Loops. Four Measured Outcomes."
  :cards='[
    { icon: "🏎", title: "Onboarding",     description: "First merged PR: 5 days → 2 days. AGENTS.md answers convention questions before they&#39;re asked." },
    { icon: "🗒", title: "Backlog triage",  description: "15 incomplete tickets flagged in one batch; reporters fill gaps in one pass. Switches: eliminated." },
    { icon: "🏗", title: "Complex feature",  description: "Architectural gap caught in the plan, not in review. Feature shipped on the original estimate." },
    { icon: "📐", title: "Skill library",    description: "Page creation: 100% convention-correct the sprint after encoding. Review comments: zero." }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Toolkit Accumulation
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🧭"
  pillLabel="The Compounding Effect · The Journey"
  title="From First /init to a Fully Accumulated Team Toolkit"
  subtitle="Each loop adds assets that compound across every developer and every feature"
  :stages='[
    { label: "Week 1",   name: "Context",  description: "AGENTS.md committed — Copilot is project-aware for every developer from day one", icon: "📋", isTarget: false },
    { label: "Sprint 1", name: "Prompts",  description: "evaluate-issue and review-plan saved — checklists become executable and shareable", icon: "📝", isTarget: false },
    { label: "Sprint 2", name: "Skills",   description: "3–4 patterns encoded — new developers inherit team conventions instantly",          icon: "🛠", isTarget: false },
    { label: "Month 2+", name: "Full Loop", description: "/plan + /review-plan on every feature — risk is a planning artifact, not a review finding", icon: "🗺", isTarget: true }
  ]'
  caption="The toolkit compounds — each asset makes every subsequent developer faster."
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="From Ad-hoc Copilot to the Agent Dev Loop"
  :leftItems='[
    "Generic suggestions that miss project conventions",
    "Vague tickets trigger mid-sprint context switches",
    "Domain knowledge locked in individuals&#39; heads",
    "Architectural gaps surface in code review, too late to fix cheaply"
  ]'
  :rightItems='[
    "AGENTS.md gives Copilot full project context from the first prompt",
    "evaluate-issue flags ticket gaps before a developer picks up the work",
    "Skills encode team patterns — invokable by any developer instantly",
    "/plan + /review-plan surface scope and risk before implementation"
  ]'
  :metrics='[
    { value: "5 days → 2", detail: "Onboarding to first merged PR" },
    { value: "Eliminated",  detail: "Mid-sprint context switches from incomplete tickets" },
    { value: "0",           detail: "Architectural rework items discovered post-review" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Clone any repo", "Send the /init prompt to Copilot Chat", "Review and commit the generated AGENTS.md"]'
  :thisWeek='["Save evaluate-issue.prompt.md to .github/prompts/", "Run it against 5 tickets from the current backlog", "Note the most common gap — that&#39;s the first encoding target"]'
  :thisMonth='["Encode 3 recurring patterns as skills in .github/skills/", "Use /plan on every non-trivial feature", "Run /review-plan before each implementation starts"]'
  footer="The toolkit compounds — each asset saved makes the next developer faster."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode",         label: "Copilot agent mode in VS Code",          description: "Agent mode, /plan, tool invocation, and autonomous task execution" },
      { href: "https://code.visualstudio.com/docs/copilot/copilot-customization",         label: "Customizing GitHub Copilot in VS Code",  description: ".prompt.md and .skill.md formats, storage locations, slash command invocation" },
      { href: "https://code.visualstudio.com/docs/copilot/copilot-instructions",          label: "Copilot Instructions and Context",        description: "How AGENTS.md and instruction files influence project-aware responses" },
      { href: "https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot", label: "Prompt Engineering for GitHub Copilot", description: "Principles for writing effective .prompt.md files that produce consistent output" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
      { label: "The Agentic Journey",              description: "GitHub Actions / PR automation: the async complement to the VS Code interactive loop" },
      { href: "https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md", label: "Real-world AGENTS.md example", description: "Reference implementation from a production SPA codebase" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="The Agent Dev Loop"
  subtitle="From Repo to Feature with Copilot in VS Code"
  :cards="[
    { value: '30 sec', detail: '/init generates AGENTS.md — permanent context for every Copilot interaction in the project' },
    { value: 'No-go', detail: '/review-plan returns its verdict before a line of implementation code is written' },
    { value: '5 → 2 days', detail: 'Onboarding to first merged PR when Copilot has full project context from day one' },
  ]"
  prompt="What's the first pattern your team would encode as a skill?"
/>

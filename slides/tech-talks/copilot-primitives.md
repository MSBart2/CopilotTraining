---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Copilot Configuration Primitives
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Copilot Configuration Primitives
mdc: true
section: Customization & Context
status: active
updated: 2026-04-22
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
</script>

# Title
<TitleSlide
  title="Copilot Configuration Primitives"
  subtitle="Instructions · Skills · Custom Prompts · Agents"
  tagline="Encode your codebase once. Every Copilot interaction inherits it."
  meta="GitHub Copilot · Customization & Context"
/>

---

# Core Question
<CoreQuestionSlide
  question="How can I make GitHub Copilot actually understand my codebase?"
  subtext="Generic responses ignore your team&#39;s conventions. The fix is not better prompting — it&#39;s configuration."
  highlight="Four primitives. Committed to the repo. Every interaction inherits your team&#39;s knowledge."
  :cards='[{"icon":"👩‍💻","title":"Individual contributors","description":"Developers who paste the same context into every chat session and want Copilot to just know their project conventions."},{"icon":"🏗️","title":"Team leads","description":"Engineering leads who want consistent, team-wide Copilot behavior — not per-developer variation in response quality."},{"icon":"🧑‍🔧","title":"Platform engineers","description":"Infrastructure engineers automating workflows who need Copilot to understand domain-specific tools and constraints."},{"icon":"🔄","title":"Repeated context today","description":"The average developer re-explains the same project conventions to Copilot in every single chat session — minutes wasted, every day."},{"icon":"⚡","title":"5-minute setup","description":"One copilot-instructions.md file transforms Copilot from generic assistant to team-aware partner — visible improvement on the first request."},{"icon":"📈","title":"Progressive stack","description":"Instructions to Skills to Prompts to Agents — each primitive builds on the last, adding capability without replacing what came before."}]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Instructions First", takeaway: "Create a small custom instruction file for immediate context gains.", whyItMatters: "Fast wins create momentum for deeper customization." },
    { title: "Skills as Knowledge", takeaway: "Package expertise into callable team capabilities.", whyItMatters: "Knowledge persists beyond any one expert or role." },
    { title: "Specialized Agents", takeaway: "Compose instructions, skills, prompts, and execution into collaborators.", whyItMatters: "Focused capabilities change AI from a tool into a teammate." }
  ]'
/>

---

# Table of Contents
<TocSlide
  title="Copilot Configuration Primitives"
  subtitle="Instructions → Skills → Custom Prompts → Agents"
  :sections='[{"icon":"📋","title":"Instructions","blurb":"Always-on foundation — the fastest ROI in the entire stack","slide":4},{"icon":"⚡","title":"Skills","blurb":"On-demand capability packs loaded by AI relevance matching","slide":10},{"icon":"💬","title":"Custom Prompts","blurb":"Team slash commands that crystallise tribal knowledge","slide":13},{"icon":"🤖","title":"Agents","blurb":"Constrained personas composing all prior primitives","slide":16}]'
/>

---

# Part 1 Opener
<SectionOpenerSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Instructions"
  subtitle="The 5-minute setup hook. One file. Every Copilot interaction inherits your team&#39;s conventions from this moment on."
  :cards='[{"icon":"🏗️","title":"Always-on baseline","blurb":"copilot-instructions.md is injected into every request automatically — no activation step required."},{"icon":"🎯","title":"Three surfaces","blurb":"Repo-wide, path-scoped by applyTo glob, and AGENTS.md nearest-directory playbook — pick the right selector."},{"icon":"👁️","title":"Transparent references","blurb":"VS Code shows which instruction files were applied in the References panel — the system is verifiably working."}]'
  :terminal='{"context":"$ cat .github/copilot-instructions.md","detail":"One file. Every Copilot interaction inherits it."}'
/>

---

# The Three Instruction Surfaces
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Three Instruction Surfaces — One for Each Scope"
  :columns='[{"icon":"🌐","title":"Repo-wide","description":"The whole-repository baseline — always active.","items":[".github/copilot-instructions.md","Applied to every request in this repo","Coding standards, build commands, file structure","No frontmatter needed — pure Markdown"]},{"icon":"🎯","title":"Path-scoped","description":"Activates only for matching file patterns.","items":[".github/instructions/*.instructions.md","applyTo: glob pattern in frontmatter","Language-specific rules, test conventions","Combines with repo-wide when both match"]},{"icon":"📁","title":"AGENTS.md","description":"Nearest-directory agent playbook — open format.","items":["AGENTS.md at repo root or any subdirectory","Commands, test steps, PR expectations","Monorepo-safe: each subproject gets its own","Cross-agent portable — not VS Code only"]}]'
  :progressDots='{"current":1,"total":5,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Repo Instructions Code
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="A Production-Ready copilot-instructions.md"
  :code='{"language":"markdown","content":"# Repository Instructions\n\nThis repository uses TypeScript with strict type checking.\n\n## Build and Test\n- Build: `npm run build`\n- Tests co-located in `__tests__/` directories\n- Use Vitest — never Mocha or Jest\n- Run: `npm test`\n\n## Coding Standards\n- Prefer functional patterns\n- Explicit return types on all functions\n- JSDoc on every exported function\n- Named exports only — no default exports\n\n## Error Handling\n- Custom error classes extending Error\n- Structured logging via logger.error()\n- Never swallow errors silently","filename":".github/copilot-instructions.md"}'
  codePosition="left"
  :features='[{"icon":"⚡","title":"Immediate effect","description":"Created this file? Every Copilot request in this repo now inherits your conventions — no restart or re-configuration."},{"icon":"📝","title":"Keep it under 2 pages","description":"Bloated instruction files consume context budget meant for your actual question. Distil to true conventions only."},{"icon":"🔍","title":"Verify via References","description":"After the first chat response, check the References panel in VS Code — instruction files used are listed there."}]'
  :progressDots='{"current":2,"total":5,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Path-scoped instructions
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Path-Scoped Instructions — Precision at File Level"
  :code='{"language":"markdown","content":"---\napplyTo: \"src/models/**/*.ts\"\n---\n\n# Database Model Instructions\n\nWhen working with database models:\n\n1. Use Prisma schema in `prisma/schema.prisma`\n2. Include JSDoc with field descriptions\n3. Define relationships with `@relation`\n4. Add indexes for foreign keys\n5. snake_case for DB columns, camelCase in TS\n6. Always include: `createdAt` and `updatedAt`","filename":".github/instructions/models.instructions.md"}'
  codePosition="left"
  :features='[{"icon":"🎯","title":"Surgical scoping","description":"applyTo: glob means these rules only activate when Copilot is working on matching files — never polluting other contexts."},{"icon":"➕","title":"Additive with repo-wide","description":"Path-scoped instructions combine with copilot-instructions.md — both apply when a file matches both selectors."},{"icon":"🗂️","title":"Store in .github/instructions/","description":"All .instructions.md files live in one place — easy to audit, review in PRs, and onboard new contributors."}]'
  :progressDots='{"current":3,"total":5,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# AGENTS.md
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="AGENTS.md — Cross-Tool Institutional Knowledge"
  :left='{"header":"📁 What goes in AGENTS.md","items":["Setup and install commands for the repo","Test commands and linting steps for PRs","Repository navigation tips and subproject layout","Per-directory guardrails in monorepos","PR title format, commit conventions, workflow rules"]}'
  :right='{"header":"🌐 Why it outlasts any single tool","items":["Open Markdown format — not VS Code-specific","Any coding agent that reads AGENTS.md gets the playbook","Nested files: frontend/AGENTS.md + infra/AGENTS.md","Subproject-scoped rules without a monolithic root file","Institutional knowledge that travels with the repo"]}'
  :progressDots='{"current":4,"total":5,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Instructions Architecture Stack
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Choosing the Right Instruction Surface"
  :rows='[{"label":"Always, whole repo","description":"copilot-instructions.md — the repo constitution, active on every request, zero conditions.","tag":"Repo-wide"},{"label":"Only these files","description":".instructions.md with applyTo glob — language-specific rules, test conventions, model patterns.","tag":"Path-scoped"},{"label":"This directory&#39;s commands","description":"AGENTS.md — setup, test, and PR rules scoped to a subproject or monorepo package.","tag":"AGENTS.md"},{"label":"Generated baseline","description":"Run /init in Copilot Chat — auto-generates copilot-instructions.md from your workspace.","tag":"Auto-generate"},{"label":"Verify it&#39;s working","description":"Check the References panel in every chat response — applied instruction files are listed there.","tag":"Debug tip"}]'
  :progressDots='{"current":5,"total":5,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Part 2 Opener
<SectionOpenerSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Skills"
  title="Skills"
  subtitle="GA as of v1.109 — the primitive that shifts Copilot from passive context to active capability."
  :cards='[{"icon":"🧠","title":"AI relevance matching","blurb":"Copilot loads the right skill without the developer doing anything — specialized expertise on demand."},{"icon":"📦","title":"Progressive loading","blurb":"Discovery metadata loads always; full skill body and scripts only load when the task matches."},{"icon":"🌐","title":"Portable open standard","blurb":"Skills work in VS Code, Copilot CLI, and GitHub Copilot coding agent — write once, use everywhere."}]'
  :terminal='{"context":"$ # Skill loaded automatically when you ask to run tests","detail":"AI relevance matching — zero invocation friction"}'
/>

---

# How Skills Work
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Skills"
  title="Three-Level Progressive Loading"
  :columns='[{"icon":"1️⃣","title":"Discovery","description":"Lightweight metadata scanned at startup.","items":["Skill name and description only","Always loaded — near-zero context cost","Powers AI relevance matching","Dozens of skills with minimal overhead"]},{"icon":"2️⃣","title":"Instructions","description":"Full SKILL.md body — when the task matches.","items":["Complete guidance and process steps","Loaded only when description matches prompt","Context-efficient — not always present","Contains scripts, examples references"]},{"icon":"3️⃣","title":"Resources","description":"Scripts and templates — when referenced.","items":["Shell scripts, test templates, examples","Fetched lazily during execution","Never loaded if not referenced","Keeps even complex skills lightweight"]}]'
  :progressDots='{"current":1,"total":2,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Skill anatomy code
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Skills"
  title="A Test-Runner Skill — Anatomy"
  :code='{"language":"markdown","content":"---\nname: test-runner\ndescription: Run tests, analyze failures, and suggest\n  fixes for unit and integration tests. Use when asked\n  to test, debug failures, or add test coverage.\n---\n\n# Test Runner Skill\n\n## When to Use\n- User asks to test an API endpoint\n- Debugging failing integration tests\n\n## Process\n1. Check existing tests in `tests/api/`\n2. Use the template in [template](./test-template.ts)\n3. Run: `npm run test:api`\n4. Analyze failures and suggest targeted fixes","filename":".github/skills/test-runner/SKILL.md"}'
  codePosition="left"
  :features='[{"icon":"🎯","title":"Description drives matching","description":"The description frontmatter is the matching key — Copilot compares your prompt semantically against every installed skill description."},{"icon":"🔗","title":"Resource links are lazy","description":"The [template](./test-template.ts) reference is only fetched if Copilot references it during execution — not on skill load."},{"icon":"📂","title":"Store in .github/skills/","description":"Each skill gets its own subdirectory: SKILL.md + scripts/ + examples/. Personal skills live in ~/.copilot/skills/."}]'
  :progressDots='{"current":2,"total":2,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Part 3 Opener
<SectionOpenerSlide
  :partNumber="3"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Custom Prompts"
  subtitle="Team slash commands — tribal knowledge crystallised into /commands any developer can invoke."
  :cards='[{"icon":"🗂️","title":"Anatomy first","blurb":".github/prompts/ path, frontmatter schema, /command binding, and variable interpolation."},{"icon":"👥","title":"Team sharing unlock","blurb":"One developer writes the prompt file. Every developer on the team gets the slash command."},{"icon":"📋","title":"Instructions vs Prompts","blurb":"Instructions load passively. Prompts are invoked explicitly — the developer decides when."}]'
  :terminal='{"context":"$ /component MyButtonGroup","detail":"Scaffolds a full React component with tests"}'
/>

---

# Prompt anatomy code
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Prompt File Anatomy"
  :code='{"language":"markdown","content":"---\nname: component\ndescription: Generate a React component with TypeScript,\n  tests, and documentation\ntools: [\"editFiles\", \"createFile\"]\nagent: agent\nmodel: Claude Sonnet 4 (copilot)\n---\n\n# Component Generator\n\nCreate a new React component: {{componentName}}\n\n## Files to Create\nsrc/components/{{componentName}}/\n  {{componentName}}.tsx\n  {{componentName}}.types.ts\n  {{componentName}}.module.css\n  __tests__/{{componentName}}.test.tsx\n  index.ts\n\nFollow conventions in [standards](../copilot-instructions.md)","filename":".github/prompts/component.prompt.md"}'
  codePosition="left"
  :features='[{"icon":"⚡","title":"Tool and agent scoping","description":"tools: restricts what the prompt can do. agent: agent gives it full agentic capability. model: lets you pick the best model per task."},{"icon":"🔤","title":"Variable interpolation","description":"{{componentName}} becomes a parameter. Also supports ${selection}, ${file}, and ${input:name:placeholder} for dynamic content."},{"icon":"🔗","title":"Reference instructions","description":"Link to copilot-instructions.md inside the prompt body — reuse conventions without duplicating them into every prompt file."}]'
  :progressDots='{"current":1,"total":2,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Skills vs Prompts contrast
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Skills vs. Custom Prompts — Know Which to Reach For"
  :left='{"header":"⚡ Skills — AI activates them","items":["Loaded automatically when the task description matches","Developer does nothing — relevance matching fires","Best for: specialized capabilities and repeatable expertise","Example: test-runner loads when you ask to test an endpoint","Stored in .github/skills/ — open standard across tools"]}'
  :right='{"header":"💬 Prompts — Developer invokes them","items":["Developer types /component or selects from the list","Explicit invocation — the command is the intent signal","Best for: scaffolding, checklists, and structured workflows","Example: /component MyForm creates the full file tree","Stored in .github/prompts/ — visible to all team members"]}'
  :progressDots='{"current":2,"total":2,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Part 4 Opener
<SectionOpenerSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="Agents"
  subtitle="Synthesis peak — constrained personas composing all prior primitives. Tool boundaries are the architecture."
  :cards='[{"icon":"🔒","title":"Constraint as design","blurb":"A read-only Planner cannot accidentally edit files. The tool restriction is not a workaround — it is the architecture."},{"icon":"🔄","title":"Planner-to-implementer handoff","blurb":"After planning, one button transitions to an implementer agent with full context preserved — the whoa moment."},{"icon":"🗺️","title":"Decision tree payoff","blurb":"The talk closes with a durable answer to which primitive do I reach for — earned after experiencing all four."}]'
  :terminal='{"context":"$ # Select Planner agent → research → handoff → Implementer","detail":"Tool constraints enforcing role separation by design"}'
/>

---

# Agent anatomy code
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="The Planner Agent — Constraint as Architecture"
  :code='{"language":"markdown","content":"---\nname: planner\ndescription: Generate implementation plans by researching\n  the codebase. Read-only — never modifies files.\ntools: [\"search\", \"readFile\", \"listFiles\", \"fetch\"]\nmodel: Claude Sonnet 4 (copilot)\nhandoffs:\n  - label: Start Implementation\n    agent: agent\n    prompt: Implement the plan outlined above.\n    send: false\n---\n\n# Planning Agent\n\nYou are a senior architect creating implementation plans.\n\n## Rules\n- NEVER modify files — you are read-only\n- Always cite files and line numbers\n- Include effort estimates for each step","filename":".github/agents/planner.agent.md"}'
  codePosition="left"
  :features='[{"icon":"🔒","title":"tools: is the boundary","description":"search, readFile, listFiles, fetch — no editFiles, no terminal. The Planner literally cannot write code. Intentional by design."},{"icon":"🔄","title":"Handoff button appears","description":"After planning, a Start Implementation button appears in chat. One click transitions to the implementer with full plan context."},{"icon":"🧠","title":"Model per agent","description":"Pick the best model for each role — a reasoning model for planning, a fast model for implementation. Not one-size-fits-all."}]'
  :progressDots='{"current":1,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Multi-agent orchestration
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="Advanced Agent Patterns"
  :cards='[{"icon":"🔄","title":"Planner → Implementer","description":"Read-only Planner researches and plans; handoff to Implementer with full context — role separation enforced by tools."},{"icon":"🔒","title":"Security reviewer","description":"search + readFile only — the security agent scans for vulnerabilities without the ability to change code it reviews."},{"icon":"🗄️","title":"Database admin agent","description":"terminal + SQL tools enabled; frontend directories excluded from listFiles — the right capability set, no more."},{"icon":"🧠","title":"Model selection per agent","description":"Planner uses a reasoning model for deep analysis; Implementer uses a fast model for code generation — match model to task."}]'
  :progressDots='{"current":2,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Full primitive stack
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="The Configuration Stack — How the Primitives Compose"
  :stages='[{"icon":"📋","label":"Instructions","description":"Foundation — always-on baseline every other primitive inherits"},{"icon":"⚡","label":"Skills","description":"Capabilities — on-demand expertise loaded by AI relevance matching"},{"icon":"💬","label":"Prompts","description":"Workflows — team slash commands encoding repeatable tasks"},{"icon":"🤖","label":"Agents","description":"Personas — constrained roles composing instructions + skills + prompts"}]'
  :progressDots='{"current":3,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Decision tree — choosing the right primitive
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="Choosing the Right Primitive"
  :rows='[{"label":"Passive context","description":"Copilot should always know your repo conventions, standards, and build commands.","tag":"→ Instructions"},{"label":"Directory rules","description":"A subproject or monorepo package needs its own commands, tests, and PR guidance.","tag":"→ AGENTS.md"},{"label":"Active capability","description":"Specialized expertise should load automatically when the task matches — no invocation.","tag":"→ Skills"},{"label":"Repeatable workflow","description":"A task is well-defined and the team should share a consistent /command for it.","tag":"→ Prompts"},{"label":"Full persona","description":"A role needs specific tools enabled or disabled, and possibly a handoff to another agent.","tag":"→ Agents"}]'
  :progressDots='{"current":4,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Before and After
<BeforeAfterSlide
  header="From Repeated Context to Inherited Knowledge"
  :leftItems='["Developer re-explains conventions in every chat session — minutes wasted, every day","Copilot suggests raw SQL when the project uses Prisma — zero codebase awareness","Different developers get different response quality based on how much context they include","Generic boilerplate: no types, console.log errors, wrong test framework"]'
  :rightItems='["copilot-instructions.md injected automatically — conventions always present, zero effort","Path-scoped instructions load Prisma patterns only for model files — surgical precision","Every team member gets the same configured baseline from day one — shared quality floor","TypeScript endpoint, custom error classes, Vitest tests, JSDoc — the first time"]'
  :metrics='[{"value":"5 min","detail":"To create your first instructions file and see immediate improvement"},{"value":"0 effort","detail":"Per-request — instructions inject automatically once committed"},{"value":"4 primitives","detail":"Progressive stack from foundation to orchestration"}]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Create .github/copilot-instructions.md with your build commands and coding standards","Ask Copilot to generate a first draft using the /init command in chat","Verify the References panel shows the file applied on your next request"]'
  :thisWeek='["Add one path-scoped .instructions.md for your most convention-heavy file pattern","Write one .prompt.md for a scaffolding workflow your team repeats — commit it to the repo","Audit whether any team conventions are buried in wikis that should be in instructions files"]'
  :thisMonth='["Create a SKILL.md for a specialized capability your team uses regularly","Author a Planner agent with read-only tools — try the handoff to an implementer once","Use the decision tree: for every new customization need, pick the right primitive first"]'
  footer="Start with instructions. Add skills and agents only when a clear need emerges. Over-engineering primitives is real — resist it."
/>

---

# References
<ReferencesSlide
  :groups='[{"title":"📖 VS Code Documentation","color":"cyan","items":[{"label":"Customize AI in Visual Studio Code","href":"https://code.visualstudio.com/docs/copilot/copilot-customization","description":"Overview of all customization options — the canonical starting point"},{"label":"Use custom instructions in VS Code","href":"https://code.visualstudio.com/docs/copilot/customization/custom-instructions","description":"Instructions syntax, applyTo globs, and personal vs. workspace scoping"},{"label":"Use Agent Skills in VS Code","href":"https://code.visualstudio.com/docs/copilot/customization/agent-skills","description":"Skill structure, progressive loading, and the open standard"},{"label":"Use prompt files in VS Code","href":"https://code.visualstudio.com/docs/copilot/customization/prompt-files","description":"Prompt frontmatter schema, variable interpolation, and team sharing"},{"label":"Custom agents in VS Code","href":"https://code.visualstudio.com/docs/copilot/customization/custom-agents","description":"Agent file structure, tool restrictions, model selection, and handoffs"}]},{"title":"📖 GitHub Documentation","color":"purple","items":[{"label":"Adding repository custom instructions for GitHub Copilot","href":"https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot","description":"GitHub-side documentation for repository instructions"},{"label":"AGENTS.md open format","href":"https://agents.md/","description":"Open specification for the cross-agent AGENTS.md playbook format"}]}]'
/>

---

# Thank You
<ThankYouSlide
  title="Copilot Configuration Primitives"
  subtitle="Encode your codebase once. Every interaction inherits it."
  :cards='[{"icon":"📋","value":"Instructions","detail":"5 minutes — one file, immediate improvement, zero ongoing maintenance"},{"icon":"⚡","value":"Skills","detail":"Expertise on demand — AI relevance matching, zero invocation friction"},{"icon":"🤖","value":"Agents","detail":"Constrained personas — tool boundaries as architecture, not workarounds"}]'
  prompt="Create .github/copilot-instructions.md today. Add skills and agents only when a clear need emerges."
/>

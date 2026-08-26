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
updated: 2026-08-26
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
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
</script>

# Title
<TitleSlide
  title="Copilot Configuration Primitives"
  subtitle="Instructions · Custom Prompts · Skills · Agents"
  tagline="Encode the convention once. Graduate the workflow when it is proven."
  meta="GitHub Copilot · Customization & Context"
/>

---

# Core Question
<CoreQuestionSlide
  question="How can I make GitHub Copilot actually understand my codebase?"
  subtext="Generic responses ignore your team&#39;s conventions. The fix is not better prompting — it is configuration."
  highlight="Solve the task as a prompt. Graduate it to a skill. Constrain it with an agent."
  :cards='[{"icon":"👩‍💻","title":"Individual contributors","description":"Developers who paste the same context into every chat session and want Copilot to just know their project conventions."},{"icon":"🏗️","title":"Team leads","description":"Engineering leads who want consistent, team-wide Copilot behavior — not per-developer variation in response quality."},{"icon":"🧑‍🔧","title":"Platform engineers","description":"Infrastructure engineers automating workflows who need Copilot to understand domain-specific tools and constraints."},{"icon":"🔄","title":"Repeated context today","description":"The average developer re-explains the same project conventions to Copilot in every single chat session — minutes wasted, every day."},{"icon":"⚡","title":"5-minute setup","description":"One copilot-instructions.md file transforms Copilot from generic assistant to team-aware partner — visible improvement on the first request."},{"icon":"📈","title":"Graduate, do not invent","description":"Instructions first. Prompt once the task is solved. Skill once scripts exist. Agent last."}]'
/>

---

# Table of Contents
<TocSlide
  title="Copilot Configuration Primitives"
  subtitle="Instructions → Custom Prompts → Skills → Agents"
  :sections='[{"icon":"📋","title":"Instructions","blurb":"Always-on foundation — the fastest ROI in the entire stack","slide":4},{"icon":"💬","title":"Custom Prompts","blurb":"Freeze a solved workflow as a team /command","slide":11},{"icon":"⚡","title":"Skills","blurb":"Graduate the prompt — add scripts the agent can run","slide":16},{"icon":"🤖","title":"Agents","blurb":"Constrained personas composing all prior primitives","slide":22}]'
/>

---

# Part 1 Opener
<SectionOpenerSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Instructions"
  subtitle="The 5-minute setup hook. One file. Every Copilot interaction inherits your team&#39;s conventions from this moment on."
  :cards='[{"icon":"🏗️","title":"Always-on baseline","blurb":"copilot-instructions.md is injected into every request automatically — no activation step."},{"icon":"🎯","title":"Three surfaces","blurb":"Repo-wide, path-scoped by applyTo, and root AGENTS.md as the portable playbook."},{"icon":"👁️","title":"Live /init","blurb":"Let Copilot draft the first file from the repo already on disk — then edit it."}]'
  :terminal='{"context":"$ /init","detail":"Draft always-on instructions from the workspace."}'
/>

---

# The Three Instruction Surfaces
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Three Instruction Surfaces — One for Each Scope"
  :columns='[{"icon":"🌐","title":"Repo-wide","description":"The whole-repository baseline — always active.","items":[".github/copilot-instructions.md","Applied to every request in this repo","Coding standards, build commands, file structure","No frontmatter needed — pure Markdown"]},{"icon":"🎯","title":"Path-scoped","description":"Activates only for matching file patterns.","items":[".github/instructions/*.instructions.md","applyTo glob in frontmatter — required","No applyTo means it is not auto-applied","Language rules, tests, framework patterns"]},{"icon":"📁","title":"AGENTS.md","description":"Portable agent playbook — open format.","items":["Root AGENTS.md is the default playbook","Setup, test, and PR commands live here","Cross-agent portable — not VS Code only","Nested files are still experimental"]}]'
  :progressDots='{"current":1,"total":6,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
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
  :progressDots='{"current":2,"total":6,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
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
  :features='[{"icon":"🎯","title":"Surgical scoping","description":"applyTo glob means these rules activate only on matching files — never polluting other contexts."},{"icon":"⚠️","title":"No glob, no auto-load","description":"Omit applyTo and the file is not applied automatically. You can still attach it by hand."},{"icon":"➕","title":"Additive with repo-wide","description":"Path-scoped files combine with copilot-instructions.md when both selectors match."}]'
  :progressDots='{"current":3,"total":6,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# How to write instructions
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="Write Instructions Like They Cost Tokens"
  :cards='[{"icon":"1️⃣","title":"One idea per line","description":"Each rule is a single statement. Split compound guidance into separate lines."},{"icon":"💡","title":"Include the why","description":"Use date-fns, not moment — moment is deprecated and inflates the bundle."},{"icon":"✅","title":"Show examples","description":"Preferred vs avoided snippets beat abstract style adjectives every time."},{"icon":"🧹","title":"Skip the linter","description":"Do not spend context on tabs, quotes, or import order. Tools already own that."}]'
  :progressDots='{"current":4,"total":6,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# AGENTS.md
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions"
  title="AGENTS.md — Cross-Tool Institutional Knowledge"
  :left='{"header":"📁 What goes in root AGENTS.md","items":["Setup and install commands for the repo","Test commands and linting steps for PRs","Repository navigation tips","PR title format and commit conventions","Commands agents should actually run"]}'
  :right='{"header":"🌐 Keep the playbook portable","items":["Open Markdown — not VS Code-specific","Any coding agent that reads AGENTS.md gets it","Prefer applyTo for folder-specific rules","Nested AGENTS.md is still experimental","Institutional knowledge that travels with the repo"]}'
  :progressDots='{"current":5,"total":6,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Live demo /init
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Instructions · Live Demo"
  title="Demo: /init Drafts the Baseline"
  subtitle="Do not hand-author the first constitution. Generate it, then edit."
  :transcript='[
    { "type": "user", "text": "/init" },
    { "type": "thinking", "label": "🤔 Copilot:" },
    { "type": "response", "lines": ["Scanning workspace conventions…", "Found: TypeScript, Vitest, Prisma, pnpm", "Drafting .github/copilot-instructions.md"] },
    { "type": "outcome", "text": "Always-on file created — review, trim, commit" },
    { "type": "user", "text": "Add a user endpoint" },
    { "type": "thinking" },
    { "type": "response", "lines": ["References: copilot-instructions.md", "Prisma + Vitest + named exports — not generic Express"] },
    { "type": "outcome", "text": "Check References. If the file is listed, it is working." }
  ]'
  footerMetric="5 minutes to a team-aware baseline"
  :progressDots='{"current":6,"total":6,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Part 2 Opener
<SectionOpenerSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Custom Prompts"
  subtitle="Solve the task in chat. Freeze the working recipe as a team /command."
  :cards='[{"icon":"🧪","title":"Solve first","blurb":"A prompt is a proven workflow — not a guess about what the team might need later."},{"icon":"👥","title":"Team /command","blurb":"One developer writes the file. Every developer gets /component with the same context."},{"icon":"🎓","title":"Then graduate","blurb":"When the recipe needs scripts or auto-load, it becomes a skill. Not before."}]'
  :terminal='{"context":"$ /create-prompt scaffold a React component with tests","detail":"Freeze the recipe. Do not retype it tomorrow."}'
/>

---

# Prompt anatomy code
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Prompt File Anatomy"
  :code='{"language":"markdown","content":"---\nname: component\ndescription: Generate a React component with TypeScript,\n  tests, and documentation\ntools: [\"editFiles\", \"createFile\"]\nagent: agent\n---\n\n# Component Generator\n\nCreate a new React component: ${input:componentName:Component name}\n\n## Files to Create\nsrc/components/${input:componentName}/\n  ${input:componentName}.tsx\n  ${input:componentName}.types.ts\n  __tests__/${input:componentName}.test.tsx\n  index.ts\n\nFollow conventions in [standards](../copilot-instructions.md)\nAlso available: ${selection} and ${file}","filename":".github/prompts/component.prompt.md"}'
  codePosition="left"
  :features='[{"icon":"🔤","title":"Real variables","description":"${input:name:hint} prompts the user. ${selection} and ${file} pull the current editor context."},{"icon":"🔗","title":"Link, do not copy","description":"Reference copilot-instructions.md. Duplicating the constitution creates drift."},{"icon":"🛠️","title":"Scope the tools","description":"tools and agent on the prompt override the current session for this one task."}]'
  :progressDots='{"current":1,"total":4,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Live demo /create-prompt
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Custom Prompts · Live Demo"
  title="Demo: /create-prompt From a Solved Chat"
  subtitle="Do not invent the file from a blank buffer. Extract the recipe that just worked."
  :transcript='[
    { "type": "user", "text": "Scaffold a React component with types, CSS modules, and a Vitest file." },
    { "type": "thinking" },
    { "type": "response", "lines": ["Created Button.tsx, Button.types.ts, Button.test.tsx", "Used named exports and Vitest — from instructions"] },
    { "type": "user", "text": "/create-prompt Save this as a reusable /component command" },
    { "type": "thinking", "label": "🤔 Copilot:" },
    { "type": "response", "lines": ["Writing .github/prompts/component.prompt.md", "Parameter: ${input:componentName}", "Linked ../copilot-instructions.md"] },
    { "type": "outcome", "text": "Team can now type /component — the recipe is frozen" }
  ]'
  footerMetric="One writer. Every developer gets the slash command."
  :progressDots='{"current":2,"total":4,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Prompt vs skill intent
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Prompt First — Skill When the Recipe Is Proven"
  :left='{"header":"💬 Stay on a prompt when","items":["A human should decide when it runs","The steps are text, not scripts","You are still iterating on the recipe","The team needs a shared /command now","Example: /component, /pr-checklist"]}'
  :right='{"header":"⚡ Graduate to a skill when","items":["The agent should notice the task itself","You have a script or template to run","The same workflow spans tools","You want auto-load, slash-only, or both","Example: test-runner with run-tests.sh"]}'
  :progressDots='{"current":3,"total":4,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Common prompt mistakes
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="💬"
  pillLabel="Custom Prompts"
  title="Keep Prompts Thin — They Are Not the Constitution"
  :columns='[{"icon":"🛑","title":"Do not copy rules","description":"Link instructions. Copied standards drift the first week.","items":["Link copilot-instructions.md","One source of conventions","Prompts describe the task only"]},{"icon":"🛑","title":"Do not skip variables","description":"Hard-coded names make a personal snippet, not a team command.","items":["${input:name:hint} for parameters","${selection} for the highlight","${file} for the active file"]},{"icon":"🛑","title":"Do not start here","description":"A prompt without instructions still produces generic files.","items":["Instructions first","Then freeze the recipe","Then add scripts as a skill"]}]'
  :progressDots='{"current":4,"total":4,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Part 3 Opener
<SectionOpenerSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Skills"
  title="Skills"
  subtitle="Graduate the proven prompt. Add scripts and templates the agent can actually run."
  :cards='[{"icon":"📦","title":"A pack, not a file","blurb":"SKILL.md plus scripts/ plus templates. If there is nothing to run, keep the prompt."},{"icon":"🎛️","title":"Both by default","blurb":"A skill can auto-load and appear as /skill. Lock either side on purpose."},{"icon":"🧪","title":"Live /create-skill","blurb":"Extract the prompt you just proved. Do not invent a capability from a blank folder."}]'
  :terminal='{"context":"$ /create-skill from how we just ran and fixed tests","detail":"Prompt solved it. Skill packages it."}'
/>

---

# How Skills Work
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Skills"
  title="Three-Level Progressive Loading"
  :columns='[{"icon":"1️⃣","title":"Discovery","description":"Lightweight metadata scanned at startup.","items":["Skill name and description only","Always loaded — near-zero context cost","Powers AI relevance matching","Dozens of skills with minimal overhead"]},{"icon":"2️⃣","title":"Instructions","description":"Full SKILL.md body — when the task matches.","items":["Complete guidance and process steps","Loaded only when description matches","Or when someone types /test-runner","Contains links to scripts and templates"]},{"icon":"3️⃣","title":"Resources","description":"Scripts and templates — when referenced.","items":["Shell scripts, test templates, examples","Fetched lazily during execution","Never loaded if not referenced","This is why a skill is a folder"]}]'
  :progressDots='{"current":1,"total":5,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Skill anatomy code
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Skills"
  title="A Test-Runner Skill — The Folder Is the Point"
  :code='{"language":"markdown","content":"---\nname: test-runner\ndescription: Run tests, analyze failures, and suggest\n  fixes. Use when asked to test, debug failures,\n  or add coverage.\n---\n\n# Test Runner Skill\n\n## Process\n1. Detect the runner from package.json\n2. Run [scripts/run-tests.sh](scripts/run-tests.sh)\n3. Start new files from [assets/test-template.ts](assets/test-template.ts)\n4. Suggest targeted fixes from the failure output","filename":".github/skills/test-runner/SKILL.md"}'
  codePosition="left"
  :features='[{"icon":"🎯","title":"Description is the trigger","description":"Write when to use it. That sentence is how auto-load decides."},{"icon":"🔗","title":"Links make resources real","description":"Unlinked files in the folder are invisible. Reference every script and template."},{"icon":"📂","title":".github/skills/test-runner/","description":"SKILL.md + scripts/ + assets/. Personal copy lives in ~/.copilot/skills/."}]'
  :progressDots='{"current":2,"total":5,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Skill script
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Skills"
  title="The Script the Skill Actually Runs"
  :code='{"language":"bash","content":"#!/usr/bin/env bash\nset -euo pipefail\n\n# scripts/run-tests.sh — invoked from SKILL.md\nTARGET=\"${1:-}\"\n\nif [[ -n \"$TARGET\" ]]; then\n  npm test -- \"$TARGET\"\nelse\n  npm test\nfi\n\nif [[ \"${2:-}\" == \"--coverage\" ]]; then\n  npm run test:coverage\nfi","filename":".github/skills/test-runner/scripts/run-tests.sh"}'
  codePosition="left"
  :features='[{"icon":"▶️","title":"Runnable, not descriptive","description":"The agent executes this script. A paragraph of advice is still a prompt."},{"icon":"📎","title":"Must be linked","description":"SKILL.md has to point at scripts/run-tests.sh or the file never loads."},{"icon":"🔒","title":"Keep it boring","description":"Detect the runner, run the suite, print failures. Leave analysis to SKILL.md."}]'
  :progressDots='{"current":3,"total":5,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Skill template
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Skills"
  title="The Template New Tests Start From"
  :code='{"language":"typescript","content":"import { render, screen, waitFor } from \"@testing-library/react\";\nimport userEvent from \"@testing-library/user-event\";\nimport { ComponentUnderTest } from \"./ComponentUnderTest\";\n\ndescribe(\"ComponentUnderTest\", () => {\n  it(\"renders without crashing\", () => {\n    render(<ComponentUnderTest />);\n    expect(screen.getByRole(\"main\")).toBeInTheDocument();\n  });\n});","filename":".github/skills/test-runner/assets/test-template.ts"}'
  codePosition="left"
  :features='[{"icon":"📄","title":"Start from house style","description":"New tests copy this file. The agent does not invent a second test stack."},{"icon":"🔗","title":"Linked from SKILL.md","description":"assets/test-template.ts is loaded only when the skill says to create a test."},{"icon":"♻️","title":"Why this is a skill","description":"A prompt can describe a test. A skill ships the template and the runner."}]'
  :progressDots='{"current":4,"total":5,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Live demo /create-skill
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Skills · Live Demo"
  title="Demo: /create-skill From the Prompt That Worked"
  subtitle="Graduate after the recipe is proven. Then add the script and the template."
  :transcript='[
    { "type": "user", "text": "/create-skill from how we just ran and fixed the API tests" },
    { "type": "thinking", "label": "🤔 Copilot:" },
    { "type": "response", "lines": ["Creating .github/skills/test-runner/", "SKILL.md + scripts/run-tests.sh + assets/test-template.ts"] },
    { "type": "user", "text": "Make it auto-load on test work, and keep /test-runner" },
    { "type": "thinking" },
    { "type": "response", "lines": ["Default: auto-load AND slash command", "user-invocable: false hides /skill", "disable-model-invocation: true is slash-only"] },
    { "type": "outcome", "text": "Ask to test an endpoint — the skill loads and runs the script" }
  ]'
  footerMetric="Prompt solved it. Skill packages the runner."
  :progressDots='{"current":5,"total":5,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Part 4 Opener
<SectionOpenerSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="Agents"
  subtitle="Compose the stack into a persona. The tool list is the architecture."
  :cards='[{"icon":"🔒","title":"Constraint as design","blurb":"A read-only Planner cannot edit files. The restriction is the design, not a workaround."},{"icon":"🔄","title":"Handoff, not hop","blurb":"Plan, then one button to Implementer with the plan intact. Role stays separated."},{"icon":"🧪","title":"Live /create-agent","blurb":"Generate the persona last — after instructions, prompts, and skills already exist."}]'
  :terminal='{"context":"$ /create-agent a read-only planner that hands off to implementer","detail":"Do not start teams here."}'
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
  :features='[{"icon":"🔒","title":"tools: is the boundary","description":"search, readFile, listFiles, fetch — no editFiles. Same pattern as a security reviewer."},{"icon":"🔄","title":"Handoff button appears","description":"Start Implementation switches to the implementer with the plan intact."},{"icon":"🧠","title":"Model per agent","description":"Reasoning model for planning. Fast model for implementation. Match the role."}]'
  :progressDots='{"current":1,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Live demo /create-agent
<AITerminalTranscriptSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents · Live Demo"
  title="Demo: /create-agent Last, Not First"
  subtitle="Generate the persona after the constitution, the prompt, and the skill already exist."
  :transcript='[
    { "type": "user", "text": "/create-agent a read-only planner that hands off to implementer" },
    { "type": "thinking", "label": "🤔 Copilot:" },
    { "type": "response", "lines": ["Writing .github/agents/planner.agent.md", "tools: search, readFile, listFiles, fetch", "handoff: Start Implementation → agent"] },
    { "type": "user", "text": "Plan adding rate limiting to the users API" },
    { "type": "thinking" },
    { "type": "response", "lines": ["Read src/api/users.ts:88-140", "Plan: middleware + tests via test-runner skill", "No files edited — Planner has no write tools"] },
    { "type": "outcome", "text": "Handoff button appears. Constraint held." }
  ]'
  footerMetric="Do not start teams on agents."
  :progressDots='{"current":2,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Full primitive stack
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="The Configuration Stack — How the Primitives Compose"
  :stages='[{"icon":"📋","label":"S1","name":"Instructions","description":"Always-on baseline every later file inherits"},{"icon":"💬","label":"S2","name":"Prompts","description":"Freeze a solved workflow as a team /command"},{"icon":"⚡","label":"S3","name":"Skills","description":"Graduate the recipe — add scripts and templates"},{"icon":"🤖","label":"S4","name":"Agents","isTarget":true,"description":"Constrain the persona that composes the rest"}]'
  caption="Solve with a prompt. Graduate to a skill. Constrain with an agent."
  :progressDots='{"current":3,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Decision tree — choosing the right primitive
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Agents"
  title="Choosing the Right Primitive"
  :rows='[{"label":"Always-on","description":"Repo conventions and build commands belong in every request.","tag":"→ Instruct"},{"label":"Folder rules","description":"applyTo for file patterns. Root AGENTS.md for portable commands.","tag":"→ Scope"},{"label":"Solved task","description":"The team repeats a proven recipe and shares one /command.","tag":"→ Prompt"},{"label":"Add scripts","description":"The recipe needs a runner, a template, or auto-load.","tag":"→ Skill"},{"label":"A persona","description":"A role needs tools on or off, and maybe a handoff.","tag":"→ Agent"}]'
  :progressDots='{"current":4,"total":4,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Before and After
<BeforeAfterSlide
  header="From Repeated Context to Inherited Knowledge"
  :leftItems='["Developer re-explains conventions in every chat session — minutes wasted, every day","The same scaffolding prompt is retyped until someone copies the wrong version","A skill folder is invented before the team has a working recipe","Generic boilerplate: no types, console.log errors, wrong test framework"]'
  :rightItems='["/init drafts copilot-instructions.md — conventions present on the next request","/create-prompt freezes the recipe the team just proved as /component","/create-skill adds run-tests.sh and the test template only after that recipe works","/create-agent last — a read-only Planner that cannot touch the files it planned"]'
  :metrics='[{"value":"5 min","detail":"To /init the first instructions file and see immediate improvement"},{"value":"Prompt → Skill","detail":"Solve thoroughly as a /command, then graduate scripts into a skill"},{"value":"4 primitives","detail":"Instructions, prompts, skills, agents — in that order"}]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Run /init and commit a trimmed .github/copilot-instructions.md","Verify the References panel lists that file on the next chat request","Write one rule with a why and a preferred vs avoided example"]'
  :thisWeek='["Add one path-scoped .instructions.md — and remember applyTo is required","Run /create-prompt on a scaffolding task your team already solved","Link that prompt to instructions instead of copying the constitution"]'
  :thisMonth='["Run /create-skill only after the prompt is stable — add a script and a template","Set user-invocable or disable-model-invocation on purpose, not by accident","Run /create-agent for a read-only Planner and try the handoff once"]'
  footer="Start with instructions. Solve with a prompt. Graduate to a skill. Constrain with an agent."
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
  subtitle="Encode the convention once. Graduate the workflow when it is proven."
  :cards='[{"icon":"📋","value":"Instructions","detail":"/init today — one file, immediate improvement, zero ongoing maintenance"},{"icon":"💬","value":"Prompts","detail":"Freeze a solved recipe as a team /command before you automate it"},{"icon":"⚡","value":"Skills","detail":"Graduate the prompt — scripts and templates the agent can run"}]'
  prompt="Solve with a prompt. Graduate to a skill. Add an agent only when the role needs a tool boundary."
/>

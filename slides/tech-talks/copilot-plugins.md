---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Copilot Plugins & APM
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Copilot Plugins & APM
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
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>

# Title
<TitleSlide
  title="Copilot Plugins & APM"
  subtitle="Composable AI Extensions"
  tagline="Install once, configure everywhere"
  meta="GitHub Copilot · Customization & Context"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do I extend Copilot and share that setup across my whole team?"
  subtext="Custom capabilities should travel with your code, not live on one developer's machine."
  highlight="apm.yml is the missing piece — agent configuration as code."
  :cards='[{"icon":"👩‍💻","title":"Developers","description":"Engineers who want domain-specific Copilot capabilities beyond the default — testing, code review, or architecture tools."},{"icon":"🏗️","title":"Platform Teams","description":"Teams responsible for standardizing developer tooling who need reproducible Copilot configuration across all contributors."},{"icon":"🧑‍🔧","title":"DevOps Engineers","description":"Engineers automating onboarding who want git clone && apm install to fully hydrate a new contributor with the right AI context."},{"icon":"📦","title":"Manual setup today","description":"Every new contributor manually configures their Copilot plugins, instructions, and MCP servers from a wiki page — or not at all."},{"icon":"⚡","title":"5 minutes","description":"Time to author an apm.yml that eliminates all manual setup for every future contributor on your team."},{"icon":"🔒","title":"Lockfile guarantee","description":"apm-lock.yml ensures every developer gets identical plugin versions — zero configuration drift across machines."}]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "One Team Setup", takeaway: "Install instructions, skills, plugins, and MCP servers from a manifest.", whyItMatters: "Configuration stops drifting across contributors." },
    { title: "Configuration as Code", takeaway: "Version agent setup through apm.yml and lock files.", whyItMatters: "Teams can review and reproduce their exact agent environment." },
    { title: "Faster Discovery", takeaway: "Find vetted extensions through a shared marketplace.", whyItMatters: "Useful capabilities become easier to evaluate and adopt." }
  ]'
/>

---

# Table of Contents
<TocSlide
  title="Copilot Plugins & APM"
  subtitle="WHY it matters → HOW to explore → CODIFY as infrastructure → ACT today"
  :sections='[{"icon":"💡","title":"The Opportunity","blurb":"Paradigm shift from per-developer to per-repository AI config","slide":4},{"icon":"⌨️","title":"CLI-First Plugin Management","blurb":"Discover, install, update, and remove plugins from the terminal","slide":7},{"icon":"📄","title":"Building an APM Manifest","blurb":"apm.yml, lockfile discipline, and full config orchestration","slide":11},{"icon":"🚀","title":"What You Can Do Today","blurb":"Concrete action ladder — try, codify, and share this week","slide":16}]'
/>

---

# Part 1 Opener
<SectionOpenerSlide
  :partNumber="1"
  pillIcon="💡"
  pillLabel="The Opportunity"
  title="The Opportunity"
  subtitle="Frame the paradigm shift — per-developer configuration to per-repository configuration — before any CLI commands appear."
  :cards='[{"icon":"🔄","title":"Paradigm shift","blurb":"From individual machine config to repository-scoped agent setup committed with your code."},{"icon":"📦","title":"Composable stack","blurb":"Plugins, instructions, skills, and MCP servers — one manifest, one install command."},{"icon":"🤝","title":"Team inheritance","blurb":"New contributors clone and run apm install — they inherit the accumulated AI context instantly."}]'
  :terminal='{"context":"$ git clone repo && apm install","detail":"Full team AI context in one command"}'
/>

---

# Two Scopes Two Tools
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="💡"
  pillLabel="The Opportunity"
  title="Two Tools. Two Scopes."
  :left='{"header":"🔌 copilot plugin","items":["Manages individual plugins for personal use","Perfect for exploration and ad-hoc capability testing","Changes are immediate — no restart required","Scoped to your user account, not the repository"]}'
  :right='{"header":"📦 APM — Agent Package Manager","items":["Orchestrates your full agent configuration stack","Plugins + instructions + skills + MCP servers in one pass","apm.yml lives in the repo — versioned alongside your code","apm-lock.yml guarantees identical setup across all contributors"]}'
  :progressDots='{"current":1,"total":2,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# What Becomes Possible
<FourCardGridSlide
  :partNumber="1"
  pillIcon="💡"
  pillLabel="The Opportunity"
  title="What Becomes Possible"
  :cards='[{"icon":"🔍","title":"Marketplace discovery","description":"Browse vetted plugins with apm marketplace browse — no UI required, results in seconds."},{"icon":"⚡","title":"One-command onboarding","description":"git clone && apm install fully hydrates a contributor with team plugins, instructions, and MCP servers."},{"icon":"🔒","title":"Lockfile discipline","description":"apm-lock.yml freezes exact versions — zero configuration drift between developer machines or CI."},{"icon":"🧩","title":"Full stack in one file","description":"apm.yml unifies plugins, instructions, skills, and MCP servers as a single versioned artifact."}]'
  :progressDots='{"current":2,"total":2,"activeColor":"bg-cyan-400 shadow-lg shadow-cyan-500/50"}'
/>

---

# Part 2 Opener
<SectionOpenerSlide
  :partNumber="2"
  pillIcon="⌨️"
  pillLabel="CLI Management"
  title="CLI-First Plugin Management"
  subtitle="Discover the ecosystem, install with one command, and set the CLI-first tone for the rest of the talk."
  :cards='[{"icon":"🔍","title":"Browse marketplace","description":"apm marketplace browse surfaces vetted plugins without leaving the terminal."},{"icon":"⬇️","title":"Install and verify","description":"copilot plugin install adds a capability immediately — active in your next chat."},{"icon":"🔄","title":"Update and remove","description":"Keep plugins current or clean up with copilot plugin update and uninstall."}]'
  :terminal='{"context":"$ apm marketplace browse --category code-review","detail":"Discovering plugins without leaving the terminal"}'
/>

---

# Install Update Remove
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="⌨️"
  pillLabel="CLI Management"
  title="Install, Update, Remove — All from the CLI"
  :columns='[{"icon":"⬇️","title":"Install","description":"Add a plugin to your environment instantly.","items":["copilot plugin install code-review-assistant","Active in Copilot Chat immediately","No restart or reload required"]},{"icon":"🔄","title":"Update","description":"Pull the latest version of an installed plugin.","items":["copilot plugin update code-review-assistant","copilot plugin update --all for bulk refresh","Review changes before merging to apm.yml"]},{"icon":"🗑️","title":"Uninstall","description":"Remove a plugin you no longer need.","items":["copilot plugin uninstall code-review-assistant","copilot plugin list to verify removal","Removes from user account, not team manifest"]}]'
  :progressDots='{"current":1,"total":3,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# CLI vs VS Code UI
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="⌨️"
  pillLabel="CLI Management"
  title="CLI or VS Code UI — Same Registry"
  :left='{"header":"⌨️ CLI — Fastest Path","items":["apm marketplace browse for discovery","copilot plugin install for immediate activation","Scriptable — composable with other shell commands","No context switch from your current workflow"]}'
  :right='{"header":"🖥️ VS Code UI — Visual Browsing","items":["Copilot sidebar > Plugins section for exploration","Browse, install, or remove plugins visually","Same plugin registry — changes sync with CLI immediately","Best for first-time exploration of the ecosystem"]}'
  :progressDots='{"current":2,"total":3,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Marketplace and Community
<FourCardGridSlide
  :partNumber="2"
  pillIcon="⌨️"
  pillLabel="CLI Management"
  title="Where to Find Plugins"
  :cards='[{"icon":"🏪","title":"Official marketplace","description":"apm marketplace browse — first-party plugins maintained by GitHub and Microsoft."},{"icon":"⭐","title":"Awesome Copilot","description":"Community-curated list at github/awesome-copilot — plugins, skills, MCP servers, and workflows."},{"icon":"🔧","title":"copilot-plugins repo","description":"github/copilot-plugins — first-party source code, manifest schema, and contribution guidelines."},{"icon":"🔍","title":"Category filters","description":"--category code-review, testing, integrations — narrow results to your immediate need."}]'
  :progressDots='{"current":3,"total":3,"activeColor":"bg-blue-400 shadow-lg shadow-blue-500/50"}'
/>

---

# Part 3 Opener
<SectionOpenerSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="APM Manifest"
  title="Building an APM Manifest"
  subtitle="apm.yml to the lockfile — plugins, instructions, skills, and MCP servers as versioned, reproducible infrastructure."
  :cards='[{"icon":"📄","title":"apm.yml","blurb":"The single source of truth for your entire agent configuration stack."},{"icon":"🔒","title":"apm-lock.yml","blurb":"Lockfile freezes exact versions — treat it like package-lock.json."},{"icon":"🤝","title":"apm install","blurb":"One command hydrates any fresh clone with the full team agent setup."}]'
  :terminal='{"context":"$ apm install","detail":"Full team agent stack in one command"}'
/>

---

# apm.yml anatomy
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="APM Manifest"
  title="A Complete apm.yml"
  :code='{"language":"yaml","content":"version: 1\n\nplugins:\n  - name: code-review-assistant\n    version: ^1.0.0\n  - name: test-generator\n    version: ^2.1.0\n\ninstructions:\n  - path: .github/copilot-instructions.md\n\nskills:\n  - path: .github/skills/testing/SKILL.md\n\nmcpServers:\n  - name: github-mcp\n    source: npm:@modelcontextprotocol/server-github\n    version: ^1.2.0","filename":"apm.yml"}'
  codePosition="left"
  :features='[{"icon":"🔌","title":"Plugins","description":"Named plugins with semver ranges — resolved to exact versions in the lockfile."},{"icon":"📋","title":"Instructions and skills","description":"Path references to your .github/ files — loaded automatically on apm install."},{"icon":"🌐","title":"MCP servers","description":"npm, GitHub, or local sources — live integrations resolved alongside plugins."}]'
  :progressDots='{"current":1,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Per-Repository Configuration
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="APM Manifest"
  title="Per-Repository Configuration"
  :columns='[{"icon":"🧪","title":"Test-heavy repo","description":"Full quality stack for a service with high coverage requirements.","items":["test-generator plugin","coverage-analyzer plugin","Testing SKILL.md","GitHub MCP for PR context"]},{"icon":"🔍","title":"API platform","description":"Architecture and documentation tooling for a public API project.","items":["api-design-assistant plugin","openapi-validator plugin","Architecture SKILL.md","AWS Docs MCP server"]},{"icon":"🔐","title":"Security-critical","description":"Compliance-aware setup for a regulated or high-risk codebase.","items":["security-scanner plugin","compliance-checker plugin","Security SKILL.md","Dependency audit MCP"]}]'
  :progressDots='{"current":2,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# The Lockfile
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="APM Manifest"
  title="The Lockfile — Your Version Control for AI"
  :code='{"language":"yaml","content":"# apm-lock.yml — generated by apm install\nversion: 1\nlockfileVersion: 1\n\nplugins:\n  code-review-assistant:\n    version: 1.2.3\n    resolved: https://registry.apm.dev/...\n    integrity: sha512-abc123...\n  test-generator:\n    version: 2.1.4\n    resolved: https://registry.apm.dev/...\n    integrity: sha512-def456...","filename":"apm-lock.yml"}'
  codePosition="left"
  :features='[{"icon":"📌","title":"Exact versions","description":"1.2.3 not ^1.0.0 — every developer gets the identical plugin build."},{"icon":"🔗","title":"Resolved URLs","description":"Download location is locked — reproducible even if the registry changes."},{"icon":"🛡️","title":"Integrity hashes","description":"sha512 checksum detects tampering or corruption before install completes."}]'
  :progressDots='{"current":3,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Lockfile Workflow
<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="APM Manifest"
  title="With vs. Without the Lockfile"
  leftLabel="No lockfile committed"
  rightLabel="apm-lock.yml committed"
  :steps='[{"left":{"label":"apm install resolves ^1.0.0"},"right":{"label":"apm install uses locked 1.2.3"}},{"left":{"label":"Dev A gets 1.2.3 on Monday"},"right":{"label":"Dev A gets 1.2.3"}},{"left":{"label":"Dev B gets 1.3.0 on Friday"},"right":{"label":"Dev B gets 1.2.3"}},{"left":{"label":"Agents behave differently"},"right":{"label":"Identical behavior guaranteed"}}]'
  :outcomeLeft='{"icon":"😤","label":"Configuration drift — debug across machines"}'
  :outcomeRight='{"icon":"✅","label":"Reproducible — every clone is identical"}'
  :progressDots='{"current":4,"total":4,"activeColor":"bg-indigo-400 shadow-lg shadow-indigo-500/50"}'
/>

---

# Part 4 Opener
<SectionOpenerSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Act Today"
  title="What You Can Do Today"
  subtitle="Try one plugin locally, add apm.yml to one repo, review the lockfile diff on the next PR."
  :cards='[{"icon":"⚡","title":"Try it now","blurb":"Install one plugin with copilot plugin install in the next 5 minutes."},{"icon":"📄","title":"Codify this week","blurb":"Author an apm.yml for your most active repo and commit it with the lockfile."},{"icon":"🤝","title":"Share this month","blurb":"Walk a teammate through apm install on a fresh clone — measure the time saved."}]'
  :terminal='{"context":"$ copilot plugin install code-review-assistant","detail":"Active in your next Copilot Chat session"}'
/>

---

# Plugin Ecosystem Value
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Act Today"
  title="The Onboarding Equation"
  :code='{"language":"bash","content":"# New contributor — fully configured in one pass\ngit clone https://github.com/your-org/your-repo\ncd your-repo\napm install\n\n# Copilot now has:\n#   ✓ Team plugins (exact locked versions)\n#   ✓ Project instructions from .github/\n#   ✓ Skills and MCP servers\n#   ✓ Zero manual configuration","filename":"onboarding.sh"}'
  codePosition="left"
  :features='[{"icon":"⏱️","title":"5 min to author","description":"Write apm.yml once — every future contributor benefits on their first git clone."},{"icon":"🔒","title":"Lockfile non-negotiable","description":"Commit apm-lock.yml alongside apm.yml — without it, plugin versions drift silently."},{"icon":"📈","title":"Compounds over time","description":"Every plugin, skill, and MCP server added to apm.yml compounds team productivity."}]'
  :progressDots='{"current":1,"total":2,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Framework mapping — two scopes
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Act Today"
  title="The Right Tool for Each Scope"
  :rows='[{"label":"Explore","description":"apm marketplace browse — discover vetted plugins without leaving the terminal.","tag":"Any time"},{"label":"Try it","description":"copilot plugin install — personal, immediate, no manifest change needed.","tag":"Today"},{"label":"Prove it","description":"Use the plugin for a week; validate it solves a real team problem.","tag":"This week"},{"label":"Codify it","description":"Add to apm.yml with a semver range; run apm install; commit the lockfile.","tag":"This week"},{"label":"Share it","description":"Open a PR — the lockfile diff shows exactly what changed in the agent stack.","tag":"This month"}]'
  :progressDots='{"current":2,"total":2,"activeColor":"bg-purple-400 shadow-lg shadow-purple-500/50"}'
/>

---

# Before and After
<BeforeAfterSlide
  header="From Manual Config to Reproducible Infrastructure"
  :leftItems='["New contributor spends 30 min following a Copilot setup wiki","Plugins installed vary by developer — behavior is inconsistent","No version control on agent configuration — drift is invisible","Different repos have no shared plugin standard or manifest"]'
  :rightItems='["git clone && apm install — full AI context in under a minute","Lockfile guarantees identical plugin versions across all machines","apm-lock.yml diffs in PRs make changes explicit and reviewable","Each repo carries its own apm.yml — the right tools for each codebase"]'
  :metrics='[{"value":"0 min","detail":"Manual Copilot setup for new contributors"},{"value":"1 cmd","detail":"Full team AI config hydration"},{"value":"100%","detail":"Version consistency across all machines"}]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Run apm marketplace browse and pick one plugin to try","Install it with copilot plugin install and use it in your next chat session","Note whether it would be valuable for your whole team"]'
  :thisWeek='["Author an apm.yml for your most active repository","Run apm install and commit both apm.yml and apm-lock.yml","Open a PR and review the lockfile diff with a teammate"]'
  :thisMonth='["Roll out apm.yml to two or three repos with different profiles","Add a skill or MCP server to the manifest and measure the impact","Make apm install part of your repository onboarding documentation"]'
  footer="apm.yml is infrastructure — commit it, review it in PRs, and treat lockfile diffs like dependency updates."
/>

---

# References
<ReferencesSlide
  :groups='[{"title":"📖 Official Documentation","color":"cyan","items":[{"label":"Agent plugins for Copilot customization","href":"https://code.visualstudio.com/docs/copilot/customization/agent-plugins","description":"Plugin concepts, installation, and VS Code integration"},{"label":"APM - Agent Package Manager","href":"https://microsoft.github.io/apm/introduction/what-is-apm/","description":"Manifest schema, lockfile mechanics, and CLI reference"}]},{"title":"🔧 Repositories and Community","color":"purple","items":[{"label":"Official Copilot Plugins Repository","href":"https://github.com/github/copilot-plugins","description":"First-party plugins, manifest schema, and contribution guidelines"},{"label":"Awesome GitHub Copilot","href":"https://github.com/github/awesome-copilot","description":"Community-curated plugins, skills, MCP servers, and workflows"}]}]'
/>

---

# Thank You
<ThankYouSlide
  title="Copilot Plugins & APM"
  subtitle="Agent configuration is infrastructure — version it, review it, share it."
  :cards='[{"icon":"📄","value":"apm.yml","detail":"Commit your agent stack alongside your code — one source of truth"},{"icon":"🔒","value":"apm-lock.yml","detail":"Freeze versions — eliminate configuration drift across the team"},{"icon":"⚡","value":"1 command","detail":"git clone && apm install — full AI context for every contributor"}]'
  prompt="Try one plugin today. Author your first apm.yml this week. Share it on the next PR."
/>

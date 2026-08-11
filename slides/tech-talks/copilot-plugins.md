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
section: Platform Teams
status: active
updated: 2026-08-11
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
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
</script>

# Title
<TitleSlide
  title="Copilot Plugins & APM"
  subtitle="Composable AI Extensions"
  tagline="Install once, configure everywhere"
  meta="Platform Teams · 25 min"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do I extend Copilot and share that configuration across every team clone?"
  subtext="Every team has custom instructions, skills, and integrations — but configuration scatters across developer machines."
  highlight="APM turns your agent setup into infrastructure that travels with the repo."
  :cards='[
    { icon: "🧰", title: "Platform Engineers", description: "Standardize Copilot config across every service repo" },
    { icon: "👩‍💻", title: "Developers", description: "Inherit the team&#39;s full AI context on first clone" },
    { icon: "🔒", title: "Enterprise Architects", description: "Govern the baseline while teams extend it safely" },
    { title: "Manual setup overhead", description: "New contributors spend hours configuring plugins before writing a line of code" },
    { title: "Configuration drift", description: "Developer A and Developer B have different plugin versions by Friday" },
    { title: "Plugin proliferation", description: "700+ extensions in the VS Code marketplace — no vetted fast-path" }
  ]'
/>

---

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
  :sections='[
    { icon: "💡", title: "The Opportunity", subtitle: "Per-developer config → per-repository config", blurb: "Why the packaging shift matters before any CLI syntax", slide: 5 },
    { icon: "⌨️", title: "CLI-First Plugin Management", subtitle: "Browse, install, and explore from the terminal", blurb: "Live ecosystem exploration sets the CLI-first tone", slide: 9 },
    { icon: "📦", title: "Building an APM Manifest", subtitle: "apm.yml + lockfile as team infrastructure", blurb: "Codify configuration; add governance companion beat", slide: 14 },
    { icon: "🚀", title: "What You Can Do Today", subtitle: "Concrete action ladder from plugin to full team", blurb: "Every attendee leaves with a step to take now", slide: 19 }
  ]'
/>

---

# Part 1 — The Opportunity
<SectionOpenerSlide
  :partNumber="1"
  title="The Opportunity"
  subtitle="Frame the paradigm shift — per-developer → per-repository configuration — before any CLI commands appear."
  :cards='[
    { icon: "🔄", title: "Paradigm Shift", blurb: "From scattered machines to versioned repo config" },
    { icon: "🛒", title: "Ecosystem Ready", blurb: "Marketplace + community catalog waiting to explore" },
    { icon: "⚡", title: "Zero Onboarding", blurb: "git clone && apm install = full AI context" }
  ]'
  :terminal='{ context: "The question teams are asking:", detail: "git clone → full Copilot context in one command?" }'
/>

---

# Two Tools, Two Scopes
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔧"
  pillLabel="The Opportunity: Two Tools"
  title="copilot plugin vs APM — Same Ecosystem, Different Jobs"
  :left='{
    header: "copilot plugin",
    icon: "👤",
    items: [
      { title: "Personal exploration", detail: "Install, try, remove — no team impact" },
      "Immediate activation — no manifest needed",
      { title: "30-second workflow", detail: "copilot plugin install <name>" },
      "Scoped to your user account"
    ]
  }'
  :right='{
    header: "APM (apm install)",
    icon: "👥",
    items: [
      { title: "Team infrastructure", detail: "apm.yml committed alongside code" },
      "Lockfile pins exact versions for everyone",
      { title: "One-command onboarding", detail: "git clone && apm install" },
      "Plugins, instructions, skills, MCP — one pass"
    ]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Paradigm Shift
<BeforeAfterPanelsSlide
  :partNumber="1"
  pillIcon="🔄"
  pillLabel="The Opportunity: Shift"
  title="Per-Developer Configuration → Per-Repository Configuration"
  :before='{
    header: "Per-Developer (Before)",
    items: [
      "Setup instructions live in a wiki page",
      { title: "Manual configuration", detail: "Every new clone → every developer does it again" },
      "Plugin versions drift silently across machines",
      "AI context is personal, not shared"
    ]
  }'
  :after='{
    header: "Per-Repository (After)",
    items: [
      "apm.yml committed next to the code",
      { title: "Automatic hydration", detail: "git clone && apm install — done" },
      "Lockfile enforces identical versions for all",
      "AI context is team knowledge, version-controlled"
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# What Is Now Possible
<FourCardGridSlide
  :partNumber="1"
  pillIcon="💡"
  pillLabel="The Opportunity: Now Possible"
  title="Four Capabilities Unlocked Today"
  :cards='[
    { icon: "🛒", title: "Marketplace Discovery", description: "apm marketplace browse — vetted plugins from the CLI without leaving your terminal" },
    { icon: "📦", title: "One Manifest, Everything", description: "apm.yml declares plugins, instructions, skills, and MCP servers in a single versioned file" },
    { icon: "🔒", title: "Lockfile Reproducibility", description: "apm-lock.yml pins exact versions — identical AI config on every machine, every time" },
    { icon: "🌐", title: "Cross-Editor Portability", description: "Plugins work in VS Code, Copilot CLI, and any ACP-compatible client — install once, use everywhere" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — CLI-First Plugin Management
<SectionOpenerSlide
  :partNumber="2"
  title="CLI-First Plugin Management"
  subtitle="Live-demo apm marketplace browse and copilot plugin install; hands-on ecosystem contact that sets the CLI-first tone."
  :cards='[
    { icon: "🔍", title: "Marketplace Browse", blurb: "Find vetted plugins without leaving the terminal" },
    { icon: "📥", title: "One-Command Install", blurb: "copilot plugin install — immediate activation" },
    { icon: "🔁", title: "Update & Remove", blurb: "Full lifecycle management from the same CLI" }
  ]'
  :terminal='{ context: "From exploration to team config:", detail: "copilot plugin install → lock into apm.yml" }'
/>

---

# Discovering Plugins
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🔍"
  pillLabel="CLI-First: Discovery"
  title="apm marketplace browse — Vetted Extensions at the Terminal"
  codePosition="left"
  :code='{ language: "bash", filename: "terminal", content: "# List all vetted plugins\napm marketplace browse\n\n# Filter by category\napm marketplace browse --category code-review\napm marketplace browse --category testing\n\n# Search by keyword\napm marketplace browse --search security\n\n# See what you have installed\ncopilot plugin list" }'
  :features='[
    { icon: "📋", title: "Category Filtering", description: "Narrow by code-review, testing, integrations, and more" },
    { icon: "🔎", title: "Keyword Search", description: "Find plugins by name, description, or capability" },
    { icon: "📊", title: "Inventory Check", description: "copilot plugin list shows installed versions and scope" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Installing Your First Plugin
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="📥"
  pillLabel="CLI-First: Install Demo"
  title="From Browse to Running — Under 60 Seconds"
  subtitle="No UI navigation, no extension marketplace search, no restart required"
  :transcript='[
    { type: "prompt", text: "apm marketplace browse --category code-review" },
    { type: "response", lines: ["code-review-assistant  v1.2.3  Review PRs for security, style, and architecture", "test-coverage-guard   v0.8.1  Flag PRs that reduce test coverage below threshold", "dependency-auditor    v1.0.0  Surface vulnerable or outdated dependencies in PRs"] },
    { type: "divider" },
    { type: "prompt", text: "copilot plugin install code-review-assistant" },
    { type: "thinking", label: "⏳ Installing:" },
    { type: "response", lines: ["✓ Resolved code-review-assistant@1.2.3", "✓ Plugin registered with Copilot runtime", "✓ Available in VS Code, CLI, and ACP clients immediately"] },
    { type: "divider" },
    { type: "outcome", text: "Plugin active — no restart required" },
    { type: "outcome", text: "Next: lock it into apm.yml for the whole team" }
  ]'
  footerMetric="30 seconds from browse to running"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Three Discovery Paths
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🗺️"
  pillLabel="CLI-First: Discovery Sources"
  title="Where to Find Plugins Before You Build"
  :columns='[
    { icon: "🏪", title: "Official Marketplace", description: "apm marketplace browse — GitHub and Microsoft maintained, vetted, and signed", items: ["First-party quality bar", "Category and keyword search", "Contribution guide for new plugins"] },
    { icon: "⭐", title: "Awesome GitHub Copilot", description: "Community-curated list of plugins, skills, MCP servers, and workflows", items: ["Third-party and niche integrations", "Skills files and instruction templates", "Community-validated use cases"] },
    { icon: "📂", title: "github/copilot-plugins", description: "First-party source code, manifest schema docs, and plugin contribution guidelines", items: ["Build your own plugin here", "Official schema reference", "Issue tracker for bugs and requests"] }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# When to Use Each Tool
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="⚖️"
  pillLabel="CLI-First: Scope Decision"
  title="copilot plugin for Exploration, APM for Infrastructure"
  :left='{
    header: "Use copilot plugin when...",
    icon: "🧪",
    items: [
      "You are evaluating a plugin personally",
      { title: "Ad-hoc capability test", detail: "Try it, discard it, no team impact" },
      "You want immediate activation without a manifest",
      "Personal customization outside any repo"
    ]
  }'
  :right='{
    header: "Graduate to APM when...",
    icon: "🏗️",
    items: [
      "The plugin proves valuable for the team",
      { title: "Commit apm.yml", detail: "Lock it in so every clone gets it" },
      "You want CI to validate the lockfile",
      "Different repos need different plugin profiles"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Building an APM Manifest
<SectionOpenerSlide
  :partNumber="3"
  title="Building an APM Manifest"
  subtitle="Walk a complete apm.yml, close with the lockfile capstone, then add the bounded managed-settings governance companion."
  :cards='[
    { icon: "📄", title: "apm.yml Anatomy", blurb: "Plugins, instructions, skills, MCP in one file" },
    { icon: "🔒", title: "Lockfile Pattern", blurb: "apm-lock.yml treats AI config like package-lock" },
    { icon: "🏢", title: "Managed Settings", blurb: "Enterprise floor — separate from apm.yml, additive" }
  ]'
  :terminal='{ context: "The lockfile is non-negotiable:", detail: "works-on-my-machine impossible for AI config" }'
/>

---

# The Complete apm.yml
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="APM Manifest: Anatomy"
  title="apm.yml — Everything Your Team&#39;s Agent Needs"
  codePosition="left"
  :code='{ language: "yaml", filename: "apm.yml", content: "version: 1\n\nplugins:\n  - name: code-review-assistant\n    version: ^1.0.0\n  - name: test-generator\n    version: ^2.1.0\n\ninstructions:\n  - path: .github/copilot-instructions.md\n\nskills:\n  - path: .github/skills/testing/SKILL.md\n\nmcpServers:\n  - name: github-mcp\n    source: npm:@modelcontextprotocol/server-github\n    version: ^1.2.0" }'
  :features='[
    { icon: "🔌", title: "Plugins", description: "Version-ranged dependencies resolved at apm install time" },
    { icon: "📝", title: "Instructions + Skills", description: "Instructions and skills files hydrated alongside plugins" },
    { icon: "🌐", title: "MCP Servers", description: "Live integrations from npm, GitHub, or local paths" },
    { icon: "🔁", title: "Reproducible", description: "One apm install gives every clone identical AI context" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Lockfile Pattern
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="🔒"
  pillLabel="APM Manifest: Lockfile"
  title="apm-lock.yml — Treat AI Config Like package-lock.json"
  :before='{
    header: "Without Lockfile",
    items: [
      { title: "^1.0.0 resolves differently on Monday vs Friday", detail: "New plugin release = different behavior" },
      "Developer A gets 1.2.3, Developer B gets 1.3.0",
      { title: "No review record", detail: "Plugin upgrades happen silently" },
      "Debugging: which version are you running?"
    ]
  }'
  :after='{
    header: "With apm-lock.yml",
    items: [
      { title: "1.2.3 pinned for everyone", detail: "Exact version, hash, and download URL frozen" },
      "apm install always produces identical results",
      { title: "Lockfile diff in every PR", detail: "Plugin upgrades are explicit, reviewable changes" },
      "apm install --frozen-lockfile fails if drifted"
    ]
  }'
  :metrics='[
    { value: "100%", label: "version consistency" },
    { value: "0", label: "silent upgrades" },
    { value: "1 PR", label: "per plugin change" }
  ]'
  :insight='{ icon: "🎯", text: "Commit both apm.yml and apm-lock.yml — they are a pair, not a choice." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# APM vs Managed Settings
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🏢"
  pillLabel="APM Manifest: Governance Companion"
  title="APM Packages Config — Managed Settings Govern the Floor"
  :left='{
    header: "APM (apm.yml)",
    icon: "📦",
    items: [
      { title: "Project-scoped packaging", detail: "Lives in the repo, travels with the code" },
      "Plugins, instructions, skills, MCP — one manifest",
      { title: "Team installs via apm install", detail: "Every clone gets identical AI context" },
      "Teams own their config — no enterprise dependency"
    ],
    code: { language: "yaml", content: "# apm.yml — per-repository\nplugins:\n  - name: code-review-assistant" }
  }'
  :right='{
    header: "Managed Settings",
    icon: "🏢",
    items: [
      { title: "Enterprise-wide governance", detail: "Additive floor beneath team customization" },
      "enabledPlugins + extraKnownMarketplaces — additive keys",
      { title: "Teams extend via copilot/teams/", detail: "Least-restrictive merges; enterprise is non-overridable" },
      "VS Code, CLI, Copilot App, cloud agent — Business/Enterprise"
    ],
    code: { language: "json", content: "// team-mappings.json\n{ \"backend-team\": \"teams/backend.json\" }" }
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Complete Onboarding
<HeroStatSlide
  :partNumber="3"
  pillIcon="🚀"
  pillLabel="APM Manifest: Onboarding"
  title="git clone && apm install"
  subtitle="The complete Copilot onboarding — no wiki page, no Slack message, no manual steps"
  :hero='{ value: "0", label: "manual setup steps for a new contributor to get full AI context", source: "" }'
  :supporting='[
    { icon: "🔌", title: "Plugins installed", description: "Exact versions from lockfile, identical to every teammate" },
    { icon: "📝", title: "Instructions loaded", description: "Team conventions and custom context ready immediately" },
    { icon: "🧠", title: "Skills available", description: "Domain-specific workflows active from the first session" },
    { icon: "🌐", title: "MCP servers running", description: "Live integrations wired — GitHub, AWS docs, whatever the team uses" }
  ]'
  :insight='{ icon: "💡", text: "APM packages reproducible project configuration. This is infrastructure — commit it." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — What You Can Do Today
<SectionOpenerSlide
  :partNumber="4"
  title="What You Can Do Today"
  subtitle="Concrete action ladder: one plugin, one apm.yml commit, one lockfile diff — all doable within the hour."
  :cards='[
    { icon: "🎯", title: "Try Locally", blurb: "One plugin in 15 minutes, no team approval needed" },
    { icon: "📋", title: "First Manifest", blurb: "One repo, one apm.yml, commit and share" },
    { icon: "✅", title: "Lockfile PRs", blurb: "Review diff on the next plugin update" }
  ]'
  :terminal='{ context: "The complete onboarding:", detail: "git clone && apm install — zero manual steps" }'
/>

---

# The Adoption Journey
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🗺️"
  pillLabel="What You Can Do Today: Journey"
  title="From First Plugin to Team Infrastructure"
  subtitle="Each stage unlocks the next — start anywhere, the path is linear"
  :stages='[
    { label: "L1", name: "Explore", description: "apm marketplace browse + copilot plugin install one plugin locally", icon: "🔍", isTarget: false },
    { label: "L2", name: "Manifest", description: "Create apm.yml in one repo, run apm install, commit both files", icon: "📄", isTarget: true },
    { label: "L3", name: "Team", description: "Share with teammates — verify identical setup on their next clone", icon: "👥", isTarget: false },
    { label: "L4", name: "CI Gate", description: "Add --frozen-lockfile validation to pull request checks", icon: "✅", isTarget: false },
    { label: "L5", name: "Scale", description: "Extend to all repos; evaluate managed settings for enterprise floor", icon: "🏢", isTarget: false }
  ]'
  caption="L2 is the leverage point — one committed apm.yml changes the onboarding story for everyone"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Three Teams Who Did It
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🏆"
  pillLabel="What You Can Do Today: Use Cases"
  title="Real Patterns Teams Are Running Now"
  :columns='[
    { icon: "👥", title: "Standardized Reviews", description: "code-review-assistant in every repo — new hires get consistent review on first clone, no setup doc", items: ["One apm.yml template", "Lockfile in every repo", "0 manual onboarding steps"] },
    { icon: "🔀", title: "Multi-Project Dev", description: "Three repos, three apm.yml files — each project gets purpose-fit plugins on apm install", items: ["Context switches with cd", "No global plugin sprawl", "Each repo owns its config"] },
    { icon: "🤖", title: "CI Lockfile Guard", description: "PR CI runs --frozen-lockfile — plugin upgrades become explicit, reviewable like any dependency bump", items: ["apm install --frozen-lockfile", "Fails on any drift", "Plugin changes need PR review"] }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Scattered Config to Reproducible Infrastructure"
  :leftItems='["Manual plugin setup docs in a wiki", "Different plugin versions per developer", "New hire spends hours on Copilot setup", "No review process for plugin changes"]'
  :rightItems='["apm.yml commits live alongside code", "apm-lock.yml pins exact versions team-wide", "git clone && apm install — zero manual steps", "Lockfile diffs reviewed in every PR"]'
  :metrics='[
    { value: "0", detail: "manual setup steps for new contributors" },
    { value: "100%", detail: "version consistency across all team machines" },
    { value: "1 PR", detail: "to review and approve any plugin change" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Run apm marketplace browse in your terminal", "Install one plugin: copilot plugin install <name>", "Test it in Copilot Chat or CLI immediately"]'
  :thisWeek='["Create apm.yml in one repo you own", "Run apm install and commit the lockfile", "Have a teammate clone and verify identical setup"]'
  :thisMonth='["Add CI lockfile validation step to one pipeline", "Expand apm.yml with instructions and skills", "Audit team plugins — standardize across repos"]'
  footer="Configuration as code starts with a single apm.yml commit — everything else follows from that habit."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/docs/copilot/customization/agent-plugins", label: "Agent plugins for Copilot customization", description: "Plugin concepts, installation, and VS Code integration" },
      { href: "https://microsoft.github.io/apm/introduction/what-is-apm/", label: "APM - Agent Package Manager", description: "Manifest schema, lockfile mechanics, and CLI reference" },
      { href: "https://github.com/github/copilot-plugins", label: "Official Copilot Plugins Repository", description: "First-party plugins, manifest schema, and contribution guide" }
    ]},
    { title: "🌐 Community & Ecosystem", color: "blue", items: [
      { href: "https://github.com/github/awesome-copilot", label: "Awesome GitHub Copilot", description: "Community-curated plugins, skills, MCP servers, and workflows" },
      { href: "https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings", label: "Enterprise team specialization for managed settings", description: "Additive team plugin settings, enterprise precedence, supported clients" }
    ]},
    { title: "🔗 Related Talks", color: "indigo", items: [
      { label: "Copilot Primitives", description: "Instructions, skills, and MCP servers that APM orchestrates" },
      { label: "Copilot CLI", description: "Plugin management from the command line in depth" }
    ]}
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Copilot Plugins & APM"
  subtitle="Composable AI Extensions — Install once, configure everywhere"
  :cards="[
    { value: 'apm.yml', detail: 'Infrastructure: commit it with your code, not in a wiki page' },
    { value: 'apm-lock.yml', detail: 'Non-negotiable: no more works-on-my-machine AI config' },
    { value: 'git clone && apm install', detail: 'Complete onboarding: zero manual steps, full AI context' }
  ]"
  prompt="What plugin or capability would you lock into your team&#39;s apm.yml first?"
/>
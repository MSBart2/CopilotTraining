---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## MCP Apps: Rich Interactive UI in Chat
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: MCP Apps
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
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

# Title
<TitleSlide
  title="MCP Apps"
  subtitle="Rich Interactive UI in Chat"
  tagline="Transform chat from text stream to visual workspace with inline charts, tables, and forms"
  meta="GitHub Copilot · Model Context Protocol · VS Code"
/>

---

# Core Question
<CoreQuestionSlide
  question="What if your chat responses were interactive visualizations you could explore inline?"
  subtext="Chat returns text. MCP Apps return"
  highlight="charts, tables, forms, and trees — interactive, inline, no context switch."
  :cards='[
    { icon: "🔧", title: "MCP Server Author", description: "Build tools that return component specs instead of text — VS Code renders them automatically" },
    { icon: "📊", title: "Data-Heavy Developer", description: "Replace copy-to-Excel workflows with inline sortable tables and drill-down charts" },
    { icon: "🏗️", title: "Tool Builder", description: "Compose custom agent workflows with stateful multi-step form interactions in chat" },
    { title: "12 min → 45 sec", description: "Copy-to-Excel chart workflow collapses to inline bar chart — 90 min/day reclaimed in data-heavy workflows" },
    { title: "6 component types", description: "Charts, tables, forms, trees, cards, custom — one decision tree maps any use case to the right type" },
    { title: "type: component", description: "Return one field differently in your MCP tool response — VS Code renders an interactive iframe in chat" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🎨", title: "Component Types",   subtitle: "The visual palette — 6 types",              blurb: "Charts, tables, forms, trees, cards, custom — and when to use each",      slide: 4  },
    { icon: "🔨", title: "Building MCP Apps", subtitle: "Server structure and the pivotal moment",    blurb: "type: component, callback lifecycle, security model",                      slide: 8  },
    { icon: "🗺️", title: "Real-World Patterns", subtitle: "Four canonical scenarios",               blurb: "Dashboard, drill-down, form workflow, tree navigation",                    slide: 13 },
    { icon: "🔗", title: "Integration",       subtitle: "Agents, skills, and memory",                blurb: "MCP Apps as first-class platform capability in agentic workflows",         slide: 17 }
  ]'
/>

---

# Part 1 — Component Types
<SectionOpenerSlide
  :partNumber="1"
  title="Component Types"
  subtitle="Six built-in component types cover the full visualization surface — one decision tree maps any use case."
  :cards='[
    { icon: "📊", title: "Charts & Tables", blurb: "Visual data with hover, zoom, sort, filter, export" },
    { icon: "📝", title: "Forms & Trees",   blurb: "Structured input, hierarchical navigation with callbacks" },
    { icon: "🃏", title: "Cards & Custom",  blurb: "Rich layouts and sandboxed HTML for anything else" }
  ]'
  :terminal='{ context: "Ask: show sales data", detail: "Interactive bar chart renders inline — filter, hover, drill down" }'
/>

---

# The Six Types
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🎨"
  pillLabel="Component Types: Visual Palette"
  title="Six Component Types — One Decision Tree"
  :rows='[
    { label: "chart",   description: "Time-series, comparisons, distributions — bar, line, pie, scatter, area", tag: "visual data"     },
    { label: "table",   description: ">20 rows needing sort, filter, search, pagination, CSV export",           tag: "tabular data"    },
    { label: "form",    description: "Multi-field structured input with validation, dropdowns, callbacks",       tag: "user input"      },
    { label: "tree",    description: "File systems, org charts, nested categories — expand/collapse + select",   tag: "hierarchical"    },
    { label: "cards",   description: "Options, portfolios, galleries — grid/list/carousel with action buttons",  tag: "rich layout"     },
    { label: "custom",  description: "Sandboxed HTML/CSS/JS for flame graphs, maps, or any bespoke visual",      tag: "anything else"   }
  ]'
  footnote="Default to built-in types. Reach for custom only when no built-in type fits."
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Charts and Tables in detail
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Component Types: Data"
  title="Charts and Tables — The Workhorses"
  :left='{
    header: "Charts",
    icon: "📈",
    items: [
      { title: "Five chart types", detail: "bar, line, pie, scatter, area — all interactive" },
      { title: "Hover, zoom, drill-down", detail: "Mouse over for exact values; click for details" },
      { title: "Custom colors + legend", detail: "Adapts to VS Code theme variables automatically" }
    ]
  }'
  :right='{
    header: "Tables",
    icon: "📋",
    items: [
      { title: "Sort and filter", detail: "Click column headers; dropdown filters for enum columns" },
      { title: "Full-text search", detail: "Search box across all columns, instant results" },
      { title: "Pagination + CSV export", detail: "10/25/50/100 per page; download button always visible" }
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Forms, Trees, Cards
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🔧"
  pillLabel="Component Types: Interaction"
  title="Forms, Trees, Cards — Stateful Interaction"
  :columns='[
    { icon: "📝", title: "Forms", description: "Collect structured input with validation and submit callbacks", items: ["text, email, number, select, checkbox", "Pattern matching + error messages", "onSubmit calls specified MCP tool"] },
    { icon: "🌲", title: "Trees", description: "Navigate hierarchical data with expand/collapse and selection", items: ["Lazy-load children on expand", "File-type icons or custom icons", "onSelect triggers MCP tool callback"] },
    { icon: "🃏", title: "Cards", description: "Present options or galleries with rich layouts and actions", items: ["Grid, list, or carousel layout", "Title, subtitle, image, badges", "Multiple action buttons per card"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Building MCP Apps
<SectionOpenerSlide
  :partNumber="2"
  title="Building MCP Apps"
  subtitle="One field changes everything: return type: 'component' instead of text — VS Code renders an interactive iframe."
  :cards='[
    { icon: "⚡", title: "The Pivotal Moment", blurb: "type: component in your content array triggers VS Code to render UI" },
    { icon: "🔄", title: "Callback Lifecycle", blurb: "User clicks → VS Code calls MCP tool → server returns updated state" },
    { icon: "🔒", title: "Security Model",     blurb: "Sandboxed iframe, CSP restrictions, explicit callback approval" }
  ]'
  :terminal='{ context: "return { content: [{ type: \"component\", component: { type: \"chart\"... } }] }", detail: "VS Code detects, instantiates, renders — no extra configuration" }'
/>

---

# The Pivotal Moment
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Building: The Key Change"
  title="One Field — From Text String to Interactive Chart"
  codePosition="left"
  :code='{ language: "typescript", content: "// Before: plain text response\nreturn {\n  content: [{\n    type: \"text\",\n    text: \"Jan: 45000, Feb: 52000\"\n  }]\n};\n\n// After: interactive chart\nreturn {\n  content: [{\n    type: \"component\",\n    component: {\n      type: \"chart\",\n      chartType: \"bar\",\n      title: \"Monthly Revenue\",\n      data: [\n        { label: \"Jan\", value: 45000 },\n        { label: \"Feb\", value: 52000 }\n      ],\n      options: { interactive: true }\n    }\n  }]\n};" }'
  :features='[
    { icon: "🔍", title: "VS Code detects it", description: "type: component in the content array triggers the chat renderer — no other config needed" },
    { icon: "📦", title: "Sandboxed iframe", description: "Component renders in an isolated iframe with VS Code theme variables available" },
    { icon: "🎨", title: "Theme-aware", description: "var(--vscode-editor-background) and all theme tokens accessible in custom components" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Full Callback Lifecycle
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🔄"
  pillLabel="Building: Callback Lifecycle"
  title="The Full Interaction Loop — Stateful Without a New Prompt"
  :rows='[
    { label: "User prompt",  description: "Developer types or agent routes a request that matches a tool",                     tag: "chat input"     },
    { label: "Model selects",description: "Model identifies the right MCP tool and calls it with arguments",                  tag: "tool call"      },
    { label: "Server runs",  description: "MCP server executes logic (fetch DB, query API) and builds component spec",        tag: "server side"    },
    { label: "VS Code renders",description: "Chat renderer detects type: component and instantiates interactive element",     tag: "iframe render"  },
    { label: "User interacts",description: "Click, filter, submit — action fires; VS Code calls the registered callback tool", tag: "user action"   },
    { label: "Updated state", description: "Callback tool processes data and returns a new component or text confirmation",    tag: "new response"   }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Callback Code Example
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🔗"
  pillLabel="Building: Callbacks"
  title="Callback Pattern — Form Collects, Tool Processes"
  codePosition="left"
  :code='{ language: "typescript", content: "// Tool 1: return form with callback\nreturn {\n  content: [{\n    type: \"component\",\n    component: {\n      type: \"form\",\n      title: \"Create User\",\n      fields: [\n        { name: \"username\", type: \"text\", required: true },\n        { name: \"role\", type: \"select\",\n          options: [\"Admin\",\"Editor\",\"Viewer\"] }\n      ],\n      onSubmit: \"process-user-creation\"\n    }\n  }]\n};\n\n// Tool 2: onSubmit callback\nif (name === \"process-user-creation\") {\n  const { username, role } = args;\n  await createUser(username, role);\n  return { content: [{ type: \"text\",\n    text: `User ${username} created!` }] };\n}" }'
  :features='[
    { icon: "📋", title: "onSubmit names the tool", description: "String value is the exact MCP tool name VS Code will call with the form data as arguments" },
    { icon: "🌲", title: "onSelect for trees", description: "Tree node clicks call the specified tool with the node&#39;s data payload as arguments" },
    { icon: "✅", title: "Explicit approval", description: "VS Code shows approval prompt before invoking callback tool — user controls what executes" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Security Model
<FourCardGridSlide
  :partNumber="2"
  pillIcon="🔒"
  pillLabel="Building: Security"
  title="Security by Default — Sandboxed, Restricted, Explicit"
  :cards='[
    { icon: "📦", title: "Sandboxed iframe",   description: "Custom components run in isolated iframes — no access to VS Code APIs or the host page DOM" },
    { icon: "🛡️", title: "CSP restrictions",   description: "Content Security Policy prevents arbitrary external requests from component scripts" },
    { icon: "✋", title: "Explicit callbacks",  description: "VS Code prompts for approval before invoking any MCP tool triggered by component interaction" },
    { icon: "🎨", title: "Theme tokens only",  description: "Custom components access VS Code color tokens via CSS variables — nothing else from the host" }
  ]'
  :insight='{ icon: "💡", text: "Use var(--vscode-editor-background) and related CSS variables in custom components — they auto-adapt to light and dark themes." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Real-World Patterns
<SectionOpenerSlide
  :partNumber="3"
  title="Real-World Patterns"
  subtitle="Four canonical scenarios that move from 'can build' to 'builds well' — with the 12-min → 45-sec payoff."
  :cards='[
    { icon: "📊", title: "Dashboard",        blurb: "Multi-component overview from a single query" },
    { icon: "🔍", title: "Drill-Down",       blurb: "Chart click opens detail table — no new prompt" },
    { icon: "📝", title: "Form Workflow",    blurb: "Multi-step guided collection with validation and callbacks" }
  ]'
  :terminal='{ context: "Manual: copy → Excel → chart → 12 minutes", detail: "MCP Apps: same query → 45 seconds inline" }'
/>

---

# Dashboard Pattern
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Patterns: Dashboard"
  title="Dashboard — Multi-Component Response from One Query"
  codePosition="top"
  :code='{ language: "typescript", content: "// One tool call returns chart + table together\nreturn {\n  content: [\n    { type: \"component\", component: { type: \"chart\",\n      chartType: \"bar\", title: \"Commits by Author\", data: authorStats } },\n    { type: \"component\", component: { type: \"table\",\n      title: \"Recent Pull Requests\",\n      columns: [{ key: \"title\", sortable: true }, { key: \"status\", filterable: true }],\n      data: recentPRs, options: { pagination: true } } }\n  ]\n};" }'
  :features='[
    { icon: "🔄", title: "Multiple components in one response", description: "Return array with chart + table + cards together — comprehensive view from a single query" },
    { icon: "🧩", title: "Each component independent", description: "Sort the table, hover the chart — components interact independently with their own callbacks" },
    { icon: "⚡", title: "No context switch", description: "Entire monitoring dashboard inline — developer never leaves chat to build the same view externally" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Progressive Drill-Down
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔍"
  pillLabel="Patterns: Drill-Down"
  title="Progressive Drill-Down — Summary to Detail Without a New Prompt"
  :left='{
    header: "Step 1: Summary chart",
    icon: "📈",
    items: [
      { title: "Tool returns bar chart", detail: "Sales by region — overview at a glance" },
      { title: "onClick: show-region-details", detail: "Click any bar to drill into that region" },
      { title: "Context preserved", detail: "Original chart stays visible above the detail" }
    ]
  }'
  :right='{
    header: "Step 2: Detail table",
    icon: "📋",
    items: [
      { title: "Callback receives region name", detail: "Arguments from the clicked bar — no prompt needed" },
      { title: "Returns sortable detail table", detail: "Product, units, revenue — exportable to CSV" },
      { title: "Natural master-detail flow", detail: "Same UX as a native app — stays inside chat" }
    ]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The 12-min → 45-sec Payoff
<HeroStatSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Patterns: ROI"
  title="12 Minutes of Manual Work → 45 Seconds Inline"
  subtitle="Copy-to-Excel workflows collapse — in data-heavy roles, that&#39;s 90 minutes per day reclaimed"
  :hero='{ value: "16×", label: "faster than copy-export-chart", source: "12 min manual → 45 sec inline — repeated dozens of times per day" }'
  :supporting='[
    { icon: "📊", title: "Form workflow pattern", description: "Multi-step guided data collection with validation — no external form builder needed" },
    { icon: "🌲", title: "Tree navigation pattern", description: "File system exploration with inline previews on select — stays in chat throughout" },
    { icon: "🔧", title: "MCP Apps Playground", description: "Working examples of all four patterns available as a hands-on follow-up resource" }
  ]'
  :insight='{ icon: "💡", text: "The Playground repository has runnable implementations of all four canonical patterns — import and adapt, no blank-page start." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Best Practices
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="✅"
  pillLabel="Patterns: Best Practices"
  title="Build Well — Five Rules for Production MCP Apps"
  :rows='[
    { label: "Component-first", description: "Return UI for visual data — never ASCII charts or 500-row markdown tables",          tag: "default to UI"   },
    { label: "Progressively", description: "Show summary first; enable drill-down — manage context window while preserving depth", tag: "summary → detail" },
    { label: "Callback-driven", description: "Let user interactions call back to MCP tools — stateful workflow without new prompts", tag: "stateful"        },
    { label: "Theme-aware",    description: "Use var(--vscode-*) tokens in custom components — adapts to light and dark mode",     tag: "CSS variables"   },
    { label: "Sandbox always", description: "Never return unsandboxed HTML/JS — XSS risk, CSP violations, theme inconsistency",    tag: "iframe only"     }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Integration
<SectionOpenerSlide
  :partNumber="4"
  title="Integration"
  subtitle="MCP Apps become first-class platform capability in agentic workflows — not a feature, a platform."
  :cards='[
    { icon: "🤖", title: "Custom Agents", blurb: "Wire MCP App tools into agent definitions for visual-first workflows" },
    { icon: "🧠", title: "Agent Skills",  blurb: "Skills declare which dashboard tools they use — composable visualization" },
    { icon: "💾", title: "Copilot Memory", blurb: "Persist chart preferences and UI state across sessions" }
  ]'
  :terminal='{ context: "agent calls analytics-app.show-metrics automatically", detail: "Interactive chart in chat — no manual tool invocation needed" }'
/>

---

# With Custom Agents and Skills
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Integration: Agents & Skills"
  title="Agents and Skills — Visual-First Agentic Workflows"
  :left='{
    header: "Custom Agents",
    icon: "🤖",
    items: [
      { title: "Declare MCP server in agent def", detail: "mcp-servers: analytics-app wires all its tools into the agent" },
      { title: "Agent uses tools automatically", detail: "\"Analyze last month&#39;s sales\" → agent calls show-metrics → chart renders" },
      { title: "No manual tool invocation", detail: "Developer describes intent — agent selects and calls the right component tool" }
    ]
  }'
  :right='{
    header: "Agent Skills",
    icon: "🎯",
    items: [
      { title: "Skills list which tools they use", detail: "review-dashboard/show-complexity — explicit tool declarations" },
      { title: "Composable visualization", detail: "Code review skill calls coverage table + complexity chart as workflow steps" },
      { title: "Shareable patterns", detail: "Org skill library can publish visual reporting skills for all teams" }
    ]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Copilot Memory Integration
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="💾"
  pillLabel="Integration: Memory"
  title="Copilot Memory — Persistent UI State Across Sessions"
  :columns='[
    { icon: "📌", title: "Store Preferences", description: "User says \"remember I prefer bar charts over pie\" — Memory stores it, every future query uses bar charts automatically" },
    { icon: "🔄", title: "Persistent State", description: "Dashboard filter settings, selected regions, and drill-down context survive session restarts — pick up where you left off" },
    { icon: "🏢", title: "Team Conventions", description: "Organization-level Memory can store chart color palettes and table column preferences — visual consistency across the team" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The Platform View
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Integration: Platform"
  title="MCP Apps as Platform — Not Feature, Architecture"
  :cards='[
    { icon: "🔧", title: "Build once", description: "MCP App tools are composable — dashboard used standalone or wired into agents and skills" },
    { icon: "🤖", title: "Agent-native", description: "Agents call visualization tools the same way they call any MCP tool — charts appear automatically" },
    { icon: "🌐", title: "Org-wide library", description: "Share visualization skills in the org skill library — every team gets the same interactive reporting" },
    { icon: "💾", title: "Memory-backed state", description: "Preferences, filters, and context persist — interactive UX that feels like a native application" }
  ]'
  :insight='{ icon: "🚀", text: "The progression: standalone MCP App → agent-integrated tool → org skill → Memory-backed preference. Each step multiplies reach." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Text-Stream Chat to Visual Workspace"
  :leftItems='["Data responses are markdown tables or ASCII — unreadable beyond toy examples", "Copy data to Excel, build chart, realize wrong date range, repeat — 12 min per query", "Static results: re-prompt and start over when you need a different filter or view", "Context switches accumulate: 90 minutes per day lost to data formatting in heavy workflows"]'
  :rightItems='["Charts, tables, forms, and trees render inline — interactive from the moment they appear", "Click to filter, hover for details, drill down into regions — no new prompts needed", "Callback-driven state: form submissions and tree selections call MCP tools and return updates", "12 minutes of manual copy-export-chart work → 45 seconds inline — flow preserved throughout"]'
  :metrics='[
    { value: "16×", detail: "faster than copy-to-Excel chart workflow — 12 min manual → 45 sec inline" },
    { value: "90 min/day", detail: "reclaimed in data-heavy workflows from eliminating context-switch overhead" },
    { value: "6 types", detail: "charts, tables, forms, trees, cards, custom — one decision tree maps any use case" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Install the MCP Apps Playground and run all six component type examples locally", "Change one existing MCP tool to return type: component instead of text — build your first chart", "Map your most text-heavy tool response to the decision tree: which component type fits best?"]'
  :thisWeek='["Add a sortable table component to your highest-traffic data query tool", "Implement one callback: form onSubmit or tree onSelect calling a second MCP tool", "Test the security model — verify iframe sandboxing and CSP restrictions with browser devtools"]'
  :thisMonth='["Build a dashboard tool returning chart + table from a single query", "Wire your MCP App into a Custom Agent definition so it fires automatically on data requests", "Set a Copilot Memory preference (chart type, color palette) and verify it persists across sessions"]'
  footer="MCP Apps transform chat from a text stream into a visual workspace — start with one tool, one component type, one callback."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support", label: "MCP Apps support in VS Code", description: "Introduction, capabilities overview, and getting started guide" },
      { href: "https://code.visualstudio.com/docs/copilot/customization/mcp-servers", label: "MCP servers documentation in VS Code", description: "MCP integration, configuration, and debugging reference" },
      { href: "https://modelcontextprotocol.io/", label: "Model Context Protocol specification", description: "Core MCP protocol spec — component content type details" }
    ] },
    { title: "🔧 SDKs & Examples", color: "purple", items: [
      { href: "https://github.com/modelcontextprotocol/servers", label: "MCP servers repository (Playground)", description: "Working examples of all component types — install locally for live demos" },
      { href: "https://github.com/modelcontextprotocol/typescript-sdk", label: "MCP TypeScript SDK", description: "SDK for building MCP servers — types, transport, request handlers" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="MCP Apps"
  subtitle="Rich Interactive UI in Chat"
  :cards="[
    { value: 'type: component', detail: 'one field change in your MCP tool response — VS Code renders an interactive iframe automatically' },
    { value: '16×', detail: 'faster than copy-to-Excel — 12-minute chart workflow collapses to 45 seconds inline' },
    { value: '6 types', detail: 'charts, tables, forms, trees, cards, custom — composable into agents, skills, and Memory-backed workflows' }
  ]"
  prompt="Which of your existing MCP tools has the most text-heavy response that would benefit from a chart or table component?"
/>

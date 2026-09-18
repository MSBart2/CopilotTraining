---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Useful Autonomy, Clear Authority
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: "Useful Autonomy, Clear Authority"
mdc: true
section: Verify and Govern
status: active
updated: 2026-09-17
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
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Useful Autonomy, Clear Authority
<!-- SLIDE: Title -->
<TitleSlide
  title="Useful Autonomy, Clear Authority"
  subtitle="GitHub Copilot governance from tool request to protected merge"
  tagline="Clear decision rights let routine work move and consequential changes reach the right owner."
  meta="Practitioner tech talk · Verify and Govern"
/>

---

# Core Question
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
  question="How can a platform team let useful Copilot work move while keeping authority explicit?"
  subtext="Follow one authentication-middleware change from local execution to protected merge."
  highlight="Every boundary returns a decision, evidence, or an owner route."
  :cards='[
    { icon: "⌨️", title: "Developer", description: "Completes bounded implementation work with visible routing decisions" },
    { icon: "🧭", title: "Platform team", description: "Places each decision at the layer that can enforce it" },
    { icon: "🔐", title: "Service owner", description: "Accepts protected changes through repository controls" },
    { title: "One change", description: "Authentication middleware stays in view from edit to merge" },
    { title: "Three routes", description: "Allow, ask, and deny each produce an actionable result" },
    { title: "Five homes", description: "Availability, context, execution, verification, and approval" }
  ]'
/>

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
  :sections='[
    { icon: "▶️", title: "Clear Runtime Routes", subtitle: "Every Copilot tool request receives an actionable decision", blurb: "Compare a routine edit, a git push, and a protected policy edit", slide: 4 },
    { icon: "🗺️", title: "Decision Rights", subtitle: "Each decision has one authoritative home", blurb: "Place access, context, execution, evidence, and acceptance", slide: 9 },
    { icon: "🔎", title: "Reviewable Evidence", subtitle: "The pull request carries reproducible results", blurb: "Connect delegated work to the exact tested revision", slide: 15 },
    { icon: "🛡️", title: "Durable Acceptance", subtitle: "Qualified acceptance survives the local session", blurb: "Trace checks, ownership, protection, and bypass authority", slide: 19 }
  ]'
/>

---

# Part 1 — Give Runtime Actions a Clear Route
<!-- SLIDE: Part 1 — Give Runtime Actions a Clear Route -->
<SectionOpenerSlide
  :partNumber="1"
  title="Every Tool Request Gets a Clear Route"
  subtitle="Copilot CLI proposes an authentication-middleware action. The repository hook evaluates it before execution."
  :cards='[
    { icon: "✓", title: "Allow Copilot", blurb: "Make the routine middleware edit" },
    { icon: "?", title: "Ask the developer", blurb: "Confirm before Copilot pushes" },
    { icon: "→", title: "Route to the owner", blurb: "Direct protected policy to the authorized team" }
  ]'
  :terminal='{ context: "Three separate Copilot requests", detail: "edit → allow   |   git push → ask   |   policy edit → deny" }'
/>

---

# Register the Runtime Boundary
<!-- SLIDE: Register the Runtime Boundary -->
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="⚙️"
  pillLabel="Clear Runtime Routes · Hook"
  title="The Repository Hook Establishes the Runtime Boundary"
  codePosition="left"
  :code='{ language: "json", filename: ".github/hooks/governance.json", content: "{\n  \"hooks\": {\n    \"PreToolUse\": [{\n      \"type\": \"command\",\n      \"command\": \"node scripts/pre-tool-use.mjs\",\n      \"timeout\": 5\n    }]\n  }\n}" }'
  :features='[
    { icon: "📥", title: "Copilot requests a tool", description: "PreToolUse sends the pending action to the hook as JSON" },
    { icon: "⚙️", title: "The hook evaluates it", description: "The repository script applies the team policy to that request" },
    { icon: "⏱", title: "The tool waits", description: "The hook has five seconds to return allow, ask, or deny" }
  ]'
  :insight='{ icon: "✓", text: "Copilot receives a policy decision before its requested tool executes." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Route Each Action
<!-- SLIDE: Route Each Action -->
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🧭"
  pillLabel="Clear Runtime Routes · Evaluator"
  title="Three Runtime Routes Keep Development Moving Safely"
  codePosition="left"
  :code='{ language: "javascript", filename: "scripts/pre-tool-use.mjs", content: "if (matchesSensitivePath(values))\n  return decision(\"deny\", ownerLedRoute)\n\nif (matchesPublicationCommand(values))\n  return decision(\"ask\", confirmationReason)\n\nreturn decision(\"allow\", workspaceReason)" }'
  :features='[
    { icon: "✓", title: "Allow Copilot", description: "A routine middleware edit continues automatically" },
    { icon: "?", title: "Ask the developer", description: "A git push waits for explicit human confirmation" },
    { icon: "→", title: "Route to the owner", description: "A protected policy edit moves to the authorized team" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Validate All Three Routes
<!-- SLIDE: Validate All Three Routes -->
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🧪"
  pillLabel="Clear Runtime Routes · Fixture Results"
  title="Deterministic Fixtures Prove All Three Runtime Boundaries"
  codePosition="top"
  :code='{ language: "text", filename: "Condensed PreToolUse payloads · 3/3 verified", content: "IN   tool_name=edit   path=src/auth/middleware.ts\nOUT  hookSpecificOutput.permissionDecision=\"allow\"\n\nIN   tool_name=shell  command=git push origin feature/auth-timeout\nOUT  hookSpecificOutput.permissionDecision=\"ask\"\n\nIN   tool_name=edit   path=src/auth/policy/production.json\nOUT  hookSpecificOutput.permissionDecision=\"deny\"" }'
  :features='[
    { icon: "✓", title: "Middleware edit", description: "Copilot continues because the file is inside the agreed boundary" },
    { icon: "?", title: "Git push", description: "Copilot pauses because publication changes repository state" },
    { icon: "→", title: "Policy edit", description: "Copilot stops because the protected path requires its owner" }
  ]'
  :insight='{ icon: "✓", text: "Allow, ask, and deny are alternative answers to separate requests, not steps in a sequence." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Define Failure Behavior
<!-- SLIDE: Define Failure Behavior -->
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="↩"
  pillLabel="Clear Runtime Routes · Recovery"
  title="Every Boundary Returns a Visible Result and Recovery Route"
  :columns='[
    { icon: "🛡️", title: "Unexpected event", items: [
      { title: "Trigger", detail: "The payload is not a PreToolUse event" },
      { title: "Result", detail: "permissionDecision=deny with an explicit reason" },
      { title: "Recovery", detail: "Verify hook registration and payload before retrying" }
    ] },
    { icon: "⚠️", title: "Malformed input", items: [
      { title: "Trigger", detail: "The hook cannot parse the incoming JSON" },
      { title: "Result", detail: "The process writes the parsing error and exits nonzero" },
      { title: "Recovery", detail: "Repair the producer or configuration, then rerun the fixture" }
    ] },
    { icon: "🧭", title: "Protected request", items: [
      { title: "Trigger", detail: "Copilot requests a change under src/auth/policy/" },
      { title: "Result", detail: "permissionDecision=deny names the protected boundary" },
      { title: "Recovery", detail: "Split the task and route policy work to its service owner" }
    ] }
  ]'
  :insight='{ icon: "💡", text: "Uncertainty becomes a visible stop; protected work gets an owner-led route." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Place Every Decision at the Right Layer
<!-- SLIDE: Part 2 — Place Every Decision at the Right Layer -->
<SectionOpenerSlide
  :partNumber="2"
  title="Each Decision Has an Authoritative Home"
  subtitle="Enterprise policy grants access. Repository files bound execution. Rulesets enforce merge authority."
  :cards='[
    { icon: "🏢", title: "Enterprise settings", blurb: "Copilot policies control CLI and MCP availability" },
    { icon: "📁", title: "Repository .github/", blurb: "Instructions, MCP config, hooks, workflows, and owners travel with code" },
    { icon: "🔐", title: "Repository rules", blurb: "Settings → Rules → Rulesets enforces protected merge" }
  ]'
  :terminal='{ context: "One Copilot change", detail: "hosted policy → repo files → hosted enforcement" }'
/>

---

# Assign Each Decision
<!-- SLIDE: Assign Each Decision -->
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🗺️"
  pillLabel="Explicit Decision Rights · Authority Map"
  title="Assign Each Operating Decision to Its Authority Surface"
  subtitle="Follow each decision to its hosted setting, repository file, or rule"
  :rows='[
    { label: "Use CLI?", description: "Copilot → Policies enables or disables Copilot CLI", tag: "hosted setting" },
    { label: "Use what?", description: ".github/copilot-instructions.md supplies repository guidance", tag: "repo file" },
    { label: "Use MCP?", description: "MCP policy enables servers; managed settings allow or deny them", tag: "enterprise policy" },
    { label: "Run tool?", description: "governance.json runs pre-tool-use.mjs before execution", tag: "repo hook" },
    { label: "Passed?", description: "change-evidence.yml publishes the required check", tag: "GitHub Actions" },
    { label: "Merge?", description: "CODEOWNERS plus Settings → Rules requires acceptance", tag: "hosted rule" }
  ]'
  :progressDots='{ current: 1, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Enable Approved MCP Capabilities
<!-- SLIDE: Enable Approved MCP Capabilities -->
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🔌"
  pillLabel="Explicit Decision Rights · MCP Policy"
  title="Enterprise Policy Enables Approved MCP Capabilities"
  codePosition="left"
  :code='{ language: "json", filename: "governance/mcp-managed-settings.json", content: "{\n  \"allowedMcpServers\": [\n    { \"serverUrl\": \"https://mcp.example.com/*\" }\n  ],\n  \"deniedMcpServers\": [\n    { \"serverCommand\": [\n      \"npx\", \"-y\",\n      \"@modelcontextprotocol/server-filesystem\", \"/\"\n    ] }\n  ]\n}" }'
  :features='[
    { icon: "🔛", title: "Enable MCP", description: "Copilot → Policies → MCP must permit MCP servers" },
    { icon: "✓", title: "Match an allow rule", description: "Approved URLs or commands may start; unmatched servers are blocked" },
    { icon: "⛔", title: "Deny wins", description: "A denied server stays blocked even when an allow rule matches" }
  ]'
  :insight='{ icon: "💡", text: "Registries support discovery. Managed allow and deny settings enforce access." }'
  :progressDots='{ current: 2, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Authorize a Repository MCP Server
<!-- SLIDE: Authorize a Repository MCP Server -->
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🔎"
  pillLabel="Explicit Decision Rights · MCP Evaluation"
  title="The Repository Requests Tools; Enterprise Policy Authorizes Access"
  codePosition="top"
  :code='{ language: "text", filename: ".github/mcp.json + documented policy result", content: "DECLARED  work-items\n          type=http  url=https://mcp.example.com/work-items\n          tools=[get_issue, search_docs]\n\nEVALUATED work-items       → ALLOWED  (URL matches allowlist)\n          filesystem-root → BLOCKED  (command matches denylist)" }'
  :features='[
    { icon: "📄", title: "Repository declaration", description: ".github/mcp.json shares the server definition and selected tools" },
    { icon: "📁", title: "Folder trust", description: "Copilot CLI loads workspace servers only from a trusted folder" },
    { icon: "🏢", title: "Enterprise evaluation", description: "The CLI applies managed allow and deny rules before connecting" }
  ]'
  :insight='{ icon: "✓", text: "Approval stays bounded by selected tools, credentials, and service permissions." }'
  :progressDots='{ current: 3, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Declare the Repository Contract
<!-- SLIDE: Declare the Repository Contract -->
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📁"
  pillLabel="Explicit Decision Rights · Repository"
  title="Repository Files Declare Context, Tools, and Runtime Rules"
  codePosition="top"
  :code='{ language: "text", filename: "Repository control surfaces", content: ".github/\n├─ copilot-instructions.md\n├─ mcp.json\n├─ hooks/governance.json\n├─ workflows/change-evidence.yml\n├─ CODEOWNERS\n└─ rulesets/protected-main.json\n\nscripts/pre-tool-use.mjs" }'
  :features='[
    { icon: "📘", title: "Guide + declare", description: "Instructions guide Copilot; mcp.json proposes shared server tools" },
    { icon: "🧭", title: "Route", description: "governance.json runs pre-tool-use.mjs to evaluate each pending tool request" },
    { icon: "🧪", title: "Verify", description: "change-evidence.yml runs tests, lint, and dependency review on the pull request" },
    { icon: "🔐", title: "Approve", description: "CODEOWNERS names the reviewer; the ruleset requires that review and check" }
  ]'
  :progressDots='{ current: 4, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Bound Each Decision Surface
<!-- SLIDE: Bound Each Decision Surface -->
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🎯"
  pillLabel="Explicit Decision Rights · Scope"
  title="Each Layer Owns a Specific Decision Boundary"
  :columns='[
    { icon: "🏢", title: "Enterprise policy", description: "Owns Copilot CLI and MCP server availability; repository acceptance stays downstream" },
    { icon: "🧭", title: "Instructions + hook", description: "Guides Copilot and routes pending tool requests; direct terminal commands remain human-driven" },
    { icon: "🔐", title: "Workflow + ruleset", description: "Requires pull-request evidence and authorized review before GitHub accepts the merge" }
  ]'
  :insight='{ icon: "✓", text: "Use a sandbox or direct human authority when consequences extend beyond these enforcement points." }'
  :progressDots='{ current: 5, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Carry Reviewable Evidence with the Change
<!-- SLIDE: Part 3 — Carry Reviewable Evidence with the Change -->
<SectionOpenerSlide
  :partNumber="3"
  title="Delegated Work Carries Evidence"
  subtitle="Repository guidance shapes the middleware change; automated checks attach reproducible results to its commit."
  :cards='[
    { icon: "📘", title: "Guidance", blurb: "Intent and edge cases stay visible" },
    { icon: "🧪", title: "Checks", blurb: "Results are reproducible" },
    { icon: "🔍", title: "Review", blurb: "Advice stays distinct from acceptance" }
  ]'
  :terminal='{ context: "Middleware pull request", detail: "artifact + checks → reviewable evidence" }'
/>

---

# Guide the Authentication Change
<!-- SLIDE: Guide the Authentication Change -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📘"
  pillLabel="Reviewable Evidence · Instructions"
  title="Custom Instructions Anchor Output in Repository Standards"
  codePosition="top"
  :code='{ language: "markdown", filename: "Repository baseline + path-scoped auth guidance", content: ".github/copilot-instructions.md\n- Use Node.js 22 and the committed npm lockfile.\n- Run focused tests and npm run lint.\n- Report commands, outcomes, and unresolved findings.\n\n.github/instructions/auth.instructions.md\napplyTo: src/auth/**\n- Preserve deny-by-default authentication.\n- Test invalid credentials, timeouts, and downstream failure.\n- Run npm test -- --runInBand test/auth." }'
  :features='[
    { icon: "🌐", title: "Repository baseline", description: "Stable runtime, structure, and validation guidance applies everywhere" },
    { icon: "🎯", title: "Auth-only contract", description: "The applyTo selector adds trust-boundary and test guidance only under src/auth" },
    { icon: "🔐", title: "Enforcement stays separate", description: "Hooks gate tools; CODEOWNERS and rulesets preserve acceptance authority" }
  ]'
  :insight='{ icon: "✓", text: "Instructions guide Copilot. Executable controls enforce consequential boundaries." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Produce Machine-Observed Results
<!-- SLIDE: Produce Machine-Observed Results -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="✅"
  pillLabel="Reviewable Evidence · Workflow"
  title="Automated Checks Attach Reproducible Proof to the Commit"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/change-evidence.yml", content: "permissions:\n  contents: read\n\nsteps:\n  - run: npm ci\n  - name: Focused authentication tests\n    run: npm test -- --runInBand test/auth\n  - name: Lint\n    run: npm run lint\n  - name: Dependency review\n    uses: actions/dependency-review-action@v4" }'
  :features='[
    { icon: "🧪", title: "Focused tests", description: "Authentication behavior gets a dedicated test path" },
    { icon: "🧹", title: "Lint", description: "Repository quality rules publish their result" },
    { icon: "📦", title: "Dependencies", description: "Dependency review adds an independent signal" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Separate Evidence from Acceptance
<!-- SLIDE: Separate Evidence from Acceptance -->
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔎"
  pillLabel="Reviewable Evidence · Meaning"
  title="Machine Evidence Informs; the Service Owner Accepts"
  :columns='[
    { icon: "🤖", title: "Advisory findings", items: [
      { title: "Source", detail: "Copilot code review" },
      { title: "Question", detail: "What deserves human attention?" },
      { title: "Result", detail: "Review comments or findings; no merge authority" }
    ] },
    { icon: "🛡️", title: "Machine evidence", items: [
      { title: "Source", detail: "Actions, code scanning, and secret scanning" },
      { title: "Question", detail: "What did automation observe on this commit?" },
      { title: "Result", detail: "Checks and findings tied to the tested revision" }
    ] },
    { icon: "👤", title: "Service-owner approval", items: [
      { title: "Source", detail: "The matching authentication code owner" },
      { title: "Question", detail: "Is this evidence sufficient for acceptance?" },
      { title: "Result", detail: "Approve or request changes; the ruleset enforces it" }
    ] }
  ]'
  :insight='{ icon: "📎", text: "Tools publish observations. The service owner makes the acceptance decision." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Keep Merge Authority Explicit and Durable
<!-- SLIDE: Part 4 — Keep Merge Authority Explicit and Durable -->
<SectionOpenerSlide
  :partNumber="4"
  title="Merge Authority Outlasts the Session"
  subtitle="CODEOWNERS and rulesets carry acceptance authority beyond the local Copilot session."
  :cards='[
    { icon: "✅", title: "Checks", blurb: "Required evidence must pass" },
    { icon: "🔐", title: "Approval", blurb: "Qualified ownership is explicit" },
    { icon: "🛡️", title: "Protection", blurb: "Bypass and force-push stay governed" }
  ]'
  :terminal='{ context: "Protected branch", detail: "evidence + owner approval → merge" }'
/>

---

# Declare Review Ownership
<!-- SLIDE: Declare Review Ownership -->
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="👥"
  pillLabel="Merge Authority · CODEOWNERS"
  title="Code Ownership Routes Review to the Authorized Team"
  codePosition="left"
  :code='{ language: "text", filename: ".github/CODEOWNERS + pull-request result", content: "/src/auth/ @octo-org/auth-service-owners\n/test/auth/ @octo-org/auth-service-owners\n/.github/workflows/ @octo-org/platform-security\n/.github/CODEOWNERS @octo-org/platform-security\n\nCHANGED  src/auth/middleware.ts\nMATCHED  /src/auth/\nREQUEST  @octo-org/auth-service-owners" }'
  :features='[
    { icon: "📍", title: "Path match", description: "GitHub compares each changed file with the CODEOWNERS patterns" },
    { icon: "👥", title: "Review request", description: "The matching team is requested because it owns that part of the repository" },
    { icon: "🛡️", title: "Enforcement handoff", description: "CODEOWNERS names the reviewer; the ruleset on slide 21 requires their approval" }
  ]'
  :insight='{ icon: "✓", text: "Ownership selects the reviewer. The ruleset turns that selection into a merge condition." }'
  :progressDots='{ current: 1, total: 6, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Enforce the Acceptance Boundary
<!-- SLIDE: Enforce the Acceptance Boundary -->
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🛡️"
  pillLabel="Merge Authority · Ruleset"
  title="Rulesets Recheck Every Acceptance Condition at Merge"
  codePosition="top"
  :code='{ language: "text", filename: "Protected default branch · ruleset evaluation", content: "TARGET  ~DEFAULT_BRANCH                  ENFORCEMENT  active\n\nREQUIRE code-owner approval             ✓ auth owner approved\nREQUIRE approval after the latest push   ✗ new commit needs review\nREQUIRE resolved review threads          ✗ 1 conversation open\nREQUIRE current change-evidence check    ✓ passed on latest commit\nBYPASS  none\n\nRESULT   MERGE BLOCKED" }'
  :features='[
    { icon: "🎯", title: "Target + enforcement", description: "The active ruleset evaluates every change headed for the default branch" },
    { icon: "👥", title: "Qualified approval", description: "An approval counts only when the matching code owner supplies it" },
    { icon: "🔄", title: "Fresh after each push", description: "A later commit can require new approval and a current status check" },
    { icon: "∅", title: "Explicit bypass", description: "An empty bypass list leaves no actor outside these merge conditions" }
  ]'
  :insight='{ icon: "🛡️", text: "A passing check is insufficient by itself: every required condition must be current at merge time." }'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Preserve Authority Beyond the Session
<!-- SLIDE: Preserve Authority Beyond the Session -->
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔒"
  pillLabel="Merge Authority · Durable Controls"
  title="Repository Rules Preserve Authority Beyond the Local Session"
  :cards='[
    { icon: "🌐", title: "Every entry path", description: "GitHub evaluates pushes from local Git, the web, APIs, and automation against the hosted ruleset" },
    { icon: "🚫", title: "Branch deletion blocked", description: "The deletion rule prevents removal of the protected default branch" },
    { icon: "↗", title: "History rewrite blocked", description: "The non-fast-forward rule rejects force-pushes that replace accepted history" },
    { icon: "🔄", title: "New commits reopen the gate", description: "A later push must satisfy the configured approval and evidence conditions again" }
  ]'
  :insight='{ icon: "🛡️", text: "Hooks govern Copilot tool requests. Rulesets govern what GitHub accepts." }'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Trace the Supported Path
<!-- SLIDE: Trace the Supported Path -->
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Merge Authority · End to End"
  title="Follow the Authority Chain from Request to Merge"
  subtitle="Each stage contributes a distinct decision and observable result"
  :stages='[
    { label: "1", name: "Admit", description: "Effective enterprise policy opens the approved capability", icon: "🔓" },
    { label: "2", name: "Guide", description: "Repository context bounds behavior and expected evidence", icon: "📘" },
    { label: "3", name: "Execute", description: "PreToolUse returns allow, ask, or deny", icon: "▶️" },
    { label: "4", name: "Verify", description: "Required checks publish inspectable results", icon: "✅" },
    { label: "5", name: "Approve", description: "The service owner authorizes protected merge", icon: "🔐", isTarget: true }
  ]'
  caption="The developer produces the change and evidence; the service owner accepts or requests another iteration."
  :progressDots='{ current: 4, total: 6, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Make Autonomy Operational
<!-- SLIDE: Make Autonomy Operational -->
<FourCardGridSlide
  :partNumber="4"
  pillIcon="⚡"
  pillLabel="Merge Authority · Operating Payoff"
  title="Clear Authority Makes Confident Delegation Possible"
  :cards='[
    { icon: "▶️", title: "Routine work keeps moving", description: "PreToolUse allows bounded edits, pauses publication, and routes protected work to its owner" },
    { icon: "🔌", title: "External tools stay bounded", description: "Enterprise policy authorizes repository-declared MCP servers, tools, and credentials" },
    { icon: "✅", title: "Evidence follows the revision", description: "Tests, scans, and status checks describe the exact commit awaiting review" },
    { icon: "🔐", title: "Authority survives the session", description: "CODEOWNERS and rulesets require qualified approval across every GitHub entry path" }
  ]'
  :insight='{ icon: "💡", text: "Every consequential decision has an owner, an enforcement point, observable evidence, and a recovery route." }'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Prove One Governed Workflow
<!-- SLIDE: Prove One Governed Workflow -->
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🛠️"
  pillLabel="Merge Authority · Start Here"
  title="Prove One Governed Workflow End to End"
  :columns='[
    { icon: "1️⃣", title: "Bound execution", items: [
      { title: "Configure", detail: "Route requests with PreToolUse; authorize MCP servers centrally" },
      { title: "Exercise", detail: "Run ordinary, publication, protected-path, and blocked-server fixtures" },
      { title: "Observe", detail: "See allow, ask, deny, and an explicit owner route" }
    ] },
    { icon: "2️⃣", title: "Bind evidence", items: [
      { title: "Configure", detail: "Add scoped instructions and an Actions workflow" },
      { title: "Exercise", detail: "Open a pull request; push again after the first check run" },
      { title: "Observe", detail: "Tests and scans attach to the latest commit" }
    ] },
    { icon: "3️⃣", title: "Enforce acceptance", items: [
      { title: "Configure", detail: "Require CODEOWNERS, current checks, and resolved threads" },
      { title: "Exercise", detail: "Try to merge after a new commit or with an open thread" },
      { title: "Observe", detail: "GitHub blocks merge until every condition is current" }
    ] }
  ]'
  :insight='{ icon: "💡", text: "Start with one workflow. Expand after the team can reproduce every route, result, and recovery." }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
  :groups='[
    { title: "Runtime and context", color: "cyan", items: [
      { href: "https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/policies", label: "Enterprise Copilot policies", description: "Availability, scope, and policy precedence" },
      { href: "https://docs.github.com/en/copilot/reference/hooks-configuration", label: "Hooks configuration reference", description: "PreToolUse payloads, decisions, timeouts, and failure behavior" },
      { href: "https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot", label: "Repository custom instructions", description: "Repository-wide and path-scoped guidance" }
    ] },
    { title: "MCP governance", color: "teal", items: [
      { href: "https://docs.github.com/en/copilot/concepts/enterprise/mcp-management", label: "MCP server usage in your company", description: "Enterprise enablement, registries, and policy boundaries" },
      { href: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist", label: "Configure the enterprise MCP allowlist", description: "Allowed and denied server evaluation" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers", label: "Add MCP servers for Copilot CLI", description: "Repository declarations, tools, and loading precedence" }
    ] },
    { title: "Evidence and merge authority", color: "purple", items: [
      { href: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions", label: "Workflow syntax for GitHub Actions", description: "Triggers, jobs, permissions, and revision-bound checks" },
      { href: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets", label: "About rulesets", description: "Required checks, pull requests, protection, and bypass visibility" },
      { href: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners", label: "About code owners", description: "Path ownership and qualified review requests" }
    ] },
    { title: "Related talks", color: "indigo", items: [
      { label: "GitHub Copilot Hooks", description: "Hook lifecycle mechanics and runtime contracts" },
      { label: "PR Trust Stack", description: "Evidence, review, and protected merge patterns" }
    ] }
  ]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
  title="Useful Autonomy, Clear Authority"
  subtitle="One change keeps its authority chain from request to protected merge."
  :cards='[
    { icon: "▶️", value: "Tool request", detail: "Copilot proposes an action", subdetail: "PreToolUse returns allow, ask, or deny" },
    { icon: "🔌", value: "MCP access", detail: "The repository proposes a server", subdetail: "Enterprise policy decides whether it may run" },
    { icon: "✅", value: "Current evidence", detail: "Actions publishes reproducible results", subdetail: "Checks rerun against the latest commit" },
    { icon: "🔐", value: "Protected merge", detail: "CODEOWNERS selects the qualified reviewer", subdetail: "The ruleset requires current approval and checks" }
  ]'
  prompt="Choose one consequential workflow: who may act, what proves the result, and who may approve it?"
/>

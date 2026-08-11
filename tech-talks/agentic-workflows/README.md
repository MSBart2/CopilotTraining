---
status: active
updated: 2026-08-10
section: "Agentic Systems"
references:
  - url: https://github.blog/changelog/2026-08-03-trigger-copilot-automations-with-comments
    label: "GitHub Changelog: Trigger Copilot automations with comments"
    verified: 2026-08-10
  - url: https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/
    label: "GitHub Blog: Automate repository tasks with GitHub Agentic Workflows"
    verified: 2026-03-05
  - url: https://github.github.com/gh-aw/introduction/overview/
    label: "GitHub Agentic Workflows Documentation: Introduction & Overview"
    verified: 2026-03-05
  - url: https://github.github.com/gh-aw/introduction/how-they-work/
    label: "GitHub Agentic Workflows Documentation: How They Work"
    verified: 2026-03-05
  - url: https://github.github.com/gh-aw/introduction/architecture/
    label: "GitHub Agentic Workflows Documentation: Security Architecture"
    verified: 2026-03-05
  - url: https://github.github.io/gh-aw/reference/safe-outputs/
    label: "GitHub Agentic Workflows Reference: Safe Outputs"
    verified: 2026-03-05
  - url: https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/
    label: "GitHub Agentic Workflows Blog: Welcome to Peli's Agent Factory"
    verified: 2026-03-05
  - url: https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows/
    label: "GitHub Agentic Workflows Blog: Meet the Workflows"
    verified: 2026-03-05
  - url: https://github.com/github/gh-aw/blob/main/create.md
    label: "GitHub Repository: Create Workflow Documentation"
    verified: 2026-03-05
  - url: https://github.com/Sentry01/AgentCouncil
    label: "GitHub Repository: Sentry01/AgentCouncil"
    verified: 2026-03-05
  - url: https://josh-ops.com/posts/github-agentic-workflows/
    label: "Josh-Ops Blog: Getting Started with GitHub Agentic Workflows"
    verified: 2026-03-05
  - url: https://www.trpkovski.com/2026/02/22/agentic-workflows-write-github-actions-in-markdown
    label: "Trpkovski Blog: Agentic Workflows: Write GitHub Actions in Markdown"
    verified: 2026-03-05
  - url: https://dev.to/htekdev/github-agentic-workflows-a-hands-on-guide-to-ai-powered-cicd-255e
    label: "Dev.to: GitHub Agentic Workflows: A Hands-On Guide to AI-Powered CI/CD"
    verified: 2026-03-05
  - url: https://yuv.ai/blog/gh-aw
    label: "Yuv.ai Blog: GitHub Agentic Workflows: Write CI/CD in Natural Language"
    verified: 2026-03-05
  - url: https://www.kenmuse.com/blog/github-agentic-workflows-bring-ai-agents-to-actions/
    label: "Ken Muse Blog: GitHub Agentic Workflows Bring AI Agents to Actions"
    verified: 2026-03-05
  - url: https://github.github.com/gh-aw/setup/quick-start/
    label: "GitHub Agentic Workflows: Quick Start Guide"
    verified: 2026-03-05
---

# GitHub Agentic Workflows: Repository Automation with AI Agents

> **The Question This Talk Answers:**
> *"How can I automate repository tasks that require judgment and context—like triaging issues, reviewing code quality, or synthesizing progress reports—without writing complex YAML workflows?"*

**Duration:** 45-60 minutes | **Target Audience:** Developers, DevOps Engineers, Platform Engineers, Engineering Managers

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Repository automation is universal; current approaches require complex YAML and can't adapt to context. AI-powered workflows unlock new automation paradigms. |
| **Compelling** | 🟢 High | Write workflows in Markdown instead of YAML; AI agents make decisions based on repository state; security-first sandbox design makes this practical. |
| **Actionable** | 🟢 High | Install gh-aw CLI extension, create first workflow in minutes, deploy to production with built-in security guardrails. |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

Repository automation has entered a new era. What once required intricate YAML configurations and deterministic logic can now be expressed as **intent in natural language**, executed by AI agents that adapt to your repository's context.[^1][^2]

**GitHub Agentic Workflows (gh-aw)** brings AI coding agents directly into your GitHub Actions—not as external services, but as **first-class repository automation primitives**. Write what you want to happen in Markdown; the AI figures out how.

- **Intent-Driven Automation**
  Describe desired outcomes ("Triage new issues based on content"), not implementation steps. AI agents interpret context and decide appropriate actions.

- **Security-First Design**
  Agents run in sandboxed environments with read-only access by default.[^4] Write operations require explicit "safe outputs"—pre-approved, sanitized GitHub actions that prevent prompt injection and unauthorized modifications.

- **Adaptive Intelligence**
  Unlike static workflows, agentic workflows make decisions based on repository state. They understand code structure, issue context, PR relationships, and project status—then act accordingly.[^3]

- **Continuous Repository Improvement**
  AI agents embedded in your development workflow compound value over time.[^6] Daily code simplifications, documentation updates, metric tracking—all running autonomously with human oversight.

**The shift:** From scripting what to do step-by-step, to declaring what success looks like and letting AI navigate the path.

---

## The Solution

### GitHub Agentic Workflows (gh-aw)

GitHub Agentic Workflows transform repository automation through three core innovations:[^3]

#### 1. Markdown-Based Workflow Definition

Instead of YAML with explicit steps, write workflows as **natural language instructions in Markdown files**:

```markdown
---
on:
  schedule: daily
permissions:
  contents: read
  issues: read
safe-outputs:
  create-issue:
    title-prefix: "[daily-status] "
    labels: [report, automation]
---

## Daily Team Status Report

Create an upbeat daily status report as a GitHub issue summarizing:
- Recent activity (issues, PRs, discussions, releases)
- Progress tracking and highlights
- Actionable next steps for maintainers
```

The AI agent reads these instructions, examines your repository, and produces the requested report—no explicit API calls, no complex conditionals.[^11]

#### 2. Compilation to Secure GitHub Actions

The `gh aw compile` command converts Markdown workflows into **secure YAML lock files** that run in GitHub Actions:[^8][^15]

- **Agent job** runs with read-only permissions in an isolated sandbox
- **Safe-output handler jobs** execute validated write operations with minimal permissions
- **Audit logging** tracks every action with workflow-id markers
- **Input sanitization** prevents prompt injection and unauthorized access

This separation of concerns—AI makes decisions, sanitized handlers execute actions—is the security foundation.[^4]

#### 3. Safe Outputs: Pre-Approved Write Operations

Agents can't directly modify repositories. Instead, they produce **structured JSON outputs** requesting specific GitHub operations:[^5]

```yaml
safe-outputs:
  create-issue:
    title-prefix: "[ai] "
    labels: [automation]
    max: 5
    expires: 7  # auto-close after 7 days
```

The safe-output handler validates agent requests, sanitizes inputs, and executes approved actions. Available operations include:

- **Issues:** Create, update, close, link sub-issues
- **Pull Requests:** Create, update, push commits, request reviews
- **Comments:** Add, hide
- **Labels & Assignments:** Add/remove labels, assign reviewers, set milestones
- **Projects:** Create projects, update items, post status updates
- **Code Review:** Add review comments, submit reviews, resolve threads
- **Security:** Create/autofix code scanning alerts

Each safe-output type has configurable max operations, expiration policies, and cross-repository controls.[^5]

---

## 📚 Key Artifacts

When working with agentic workflows, you'll interact with these files and tools:

| Artifact | Purpose | Example |
|----------|---------|---------|
| **Workflow Markdown** | Source workflow definition (human-editable) | `.github/workflows/issue-triage.md` |
| **Lock File** | Compiled secure YAML workflow (generated) | `.github/workflows/issue-triage.lock.yml` |
| **gh CLI Extension** | Install, create, compile, debug workflows | `gh aw compile`, `gh aw logs` |
| **Safe-Output Config** | Security declarations in frontmatter | `safe-outputs: create-issue: ...` |
| **Agent Prompts** | Natural language instructions in Markdown body | "Triage issues and apply labels..." |
| **MCP Config** | Model Context Protocol server declarations | `.vscode/mcp.json` |
| **Workflow Logs** | Execution logs and audit trails | `gh aw logs issue-triage` |

**Navigation:** Start with `.github/workflows/*.md` files—these are your workflows. The lock files (.lock.yml) are generated artifacts; never edit them directly.[^8]

---

## 🧠 The Shift

**From:** Stepwise prescriptions
**To:** Outcome-driven intent

Traditional workflows say "do these exact steps in this order." Agentic workflows say "achieve this outcome, adapting to what you find."

---

## When to Use This Pattern

### Decision Tree

```
Do you need repository automation?
│
├─ YES → Does it require judgment or context-awareness?
│        │
│        ├─ YES → Examples: Issue triage, code review feedback,
│        │        progress reports, quality analysis
│        │        ✅ USE AGENTIC WORKFLOWS
│        │        │
│        │        ├─ Need write operations?
│        │        │  └─ Declare safe-outputs with appropriate guardrails
│        │        │
│        │        └─ Read-only analysis?
│        │           └─ Simplest case—no safe-outputs needed
│        │
│        └─ NO → Examples: Build, test, deploy, static checks
│                ⚠️ USE TRADITIONAL GITHUB ACTIONS
│                (Deterministic tasks don't need AI)
│
└─ NO → No action needed
```

**Key Decision Factors:**

1. **Contextual Understanding Required?**
   - Analyzing issue content for triage → Agentic
   - Running test suite → Traditional

2. **Adaptive Decision-Making?**
   - Recommending code simplifications → Agentic
   - Deploying to staging → Traditional

3. **Synthesis & Summarization?**
   - Weekly progress report → Agentic
   - Slack notification on deploy → Traditional

4. **Natural Language Input/Output?**
   - Converting issue comments to labels → Agentic
   - Linting code → Traditional

**Complementary Approach:** Use both. Traditional GitHub Actions for CI/CD pipelines, agentic workflows for "Continuous AI" tasks—analysis, recommendations, coordination.[^10]

---

<!-- 🎬 MAJOR SECTION: Core Architecture -->
## Core Architecture & Compilation

### How Agentic Workflows Execute

An agentic workflow progresses through three distinct phases:[^3][^8]

#### Phase 1: Authoring (One Time)

Developers author workflows as Markdown files with YAML frontmatter:

```markdown
---
on:
  issues:
    types: [opened]
permissions:
  contents: read
  issues: write
tools:
  github:
    toolsets: [issues, labels]
safe-outputs:
  add-labels:
    allowed: [bug, feature, docs]
    max: 3
  add-comment:
    max: 1
---

## Issue Triage Workflow

Analyze new issues and apply appropriate labels.

### Instructions
1. Read the issue title and body
2. Identify the issue type
3. Apply 1-3 relevant labels
4. Add a friendly comment explaining the decision
```

**Key Components:**
- **Triggers** (`on:`): When the workflow runs (schedule, events, manual)
- **Permissions**: Minimal read-only access for agent
- **Tools**: GitHub APIs and MCP servers available to agent
- **Safe Outputs**: Pre-approved write operations
- **Instructions**: Natural language task description

#### Phase 2: Compilation (Per Source Change)

Run `gh aw compile issue-triage` to transform Markdown → secure YAML:[^8][^15]

1. **Parse frontmatter** (triggers, permissions, tools, safe-outputs)
2. **Extract Markdown body** (agent instructions)
3. **Generate secure workflow** with:
   - Agent job (read-only, sandboxed)
   - Safe-output handler jobs (minimal write permissions)
   - Permission isolation
   - Input sanitization logic
   - Audit trail markers
4. **Write lock file** (`.github/workflows/issue-triage.lock.yml`)

**Lock File Properties:**
- Marked as generated (`linguist-generated=true`)
- Git merge strategy: `merge=ours` (prevents conflicts)
- Should not be manually edited
- Re-compiled whenever source `.md` changes

**Deploy:** Commit both `.md` and `.lock.yml` files; GitHub Actions runs the lock file.

#### Phase 3: Execution (Per Trigger)

When triggered, the compiled workflow executes:[^4]

**Agent Job (Read-Only):**
1. Spin up isolated container (Ubuntu slim)
2. Load AI agent (GitHub Copilot, Claude, Codex, Gemini)
3. Provide agent with:
   - Workflow instructions from Markdown body
   - Declared GitHub tools (read-only API access)
   - Repository context
4. Agent explores repository, gathers data
5. Agent produces structured JSON output (safe-output requests)

**Safe-Output Handler Jobs (Write Operations):**
1. Receive agent's JSON output
2. Validate schema (correct format?)
3. Sanitize inputs (escape XML, validate URLs, check domains)
4. Verify permissions (is this safe-output declared?)
5. Enforce limits (max operations, expiration, cross-repo rules)
6. Execute approved GitHub operations
7. Log actions with workflow-id markers

**Isolation Guarantees:**
- Agent has zero write access
- Agent output goes through validation pipeline
- Only approved operations execute
- All actions auditable via workflow markers

**Example Audit Trail:**
```markdown
<!-- gh-aw-workflow-id: issue-triage -->
<!-- gh-aw-run-id: 1234567890 -->
```

Hidden markers embedded in issue/PR bodies enable searching:
```
repo:owner/repo is:issue "gh-aw-workflow-id: issue-triage" in:body
```

---

<!-- 🎬 MAJOR SECTION: Safe Outputs -->
## Safe Outputs Deep Dive

### Security Through Separation of Concerns

Safe outputs are the **security foundation** of agentic workflows. They solve the core tension: *How do we let AI agents automate repository tasks without risking unauthorized modifications or prompt injection?*[^4][^5]

**Answer:** Separate decision-making (read-only AI) from action execution (validated handlers).

#### The Safe Output Lifecycle

1. **Declaration (Workflow Frontmatter)**
   ```yaml
   safe-outputs:
     create-issue:
       title-prefix: "[bot] "
       labels: [automation]
       max: 5
       expires: 7
   ```

2. **Agent Request (Structured JSON)**
   ```json
   {
     "type": "create_issue",
     "title": "[bot] CI failure in test-auth.js",
     "body": "## Failure Summary\n\nTest suite failed...",
     "labels": ["automation", "ci-failure"]
   }
   ```

3. **Validation Pipeline**[^5]
   - Schema validation (correct JSON structure?)
   - Permission check (is `create-issue` declared?)
   - Sanitization (XML escape, URL validation)
   - Rate limiting (within `max: 5`?)
   - Domain filtering (URLs from allowed domains only?)

4. **Execution (Minimal Permissions)**
   - Safe-output handler job has `issues: write` only
   - Creates issue with sanitized content
   - Adds workflow-id marker
   - Sets expiration (if configured)

5. **Audit Trail**
   - Issue includes hidden markers
   - GitHub Actions logs capture full execution
   - `gh aw audit <run-id>` shows detailed trace

#### Critical Pattern: Noop

**The #1 runtime failure mode:** Agent finishes without calling any safe-output, workflow fails silently.[^10]

**Solution:** Always include `noop` safe-output (enabled by default):

```yaml
safe-outputs:
  create-issue:  # noop auto-enabled
```

Agent **must** call `noop` when no action is needed:

```json
{
  "noop": {
    "message": "No action needed: analysis complete, no issues found"
  }
}
```

**When to use noop:**
- No issues found during code scan
- No breaking changes detected
- Repository already in desired state
- Condition for action not met

Explicitly instruct agents in workflow Markdown:
```markdown
If no action is needed, call noop with an explanation.
```

#### Issue Operations

**Create Issue** supports:[^5]

```yaml
safe-outputs:
  create-issue:
    title-prefix: "[ai] "
    labels: [automation, agentic]
    assignees: [user1, copilot]
    max: 5
    expires: 7  # auto-close after 7 days
    group: true  # link as sub-issues under parent
    close-older-issues: true  # close previous issues from same workflow
    target-repo: "owner/repo"  # cross-repository
    allowed-repos: ["org/repo1", "org/repo2"]
```

**Features:**
- **Auto-expiration:** Issues auto-close after configurable time (`7d`, `2w`, `1m`, etc.)
- **Issue grouping:** Multiple issues linked as sub-issues under parent (max 64)
- **Auto-close older:** Close previous open issues from same workflow when new issue created
- **Cross-repository:** Target external repos with `target-repo` and `allowed-repos`
- **Workflow markers:** Hidden comments for searchability

**Searching for workflow-created items:**
```
repo:owner/repo is:issue is:open "gh-aw-workflow-id: daily-status" in:body
```

#### Pull Request Operations

**Create Pull Request** enables:[^5]

```yaml
safe-outputs:
  create-pull-request:
    title-prefix: "[ai] "
    labels: [automation]
    reviewers: [user1, copilot]
    draft: true
    max: 3
    expires: 14  # same-repo only
    if-no-changes: "warn"  # "warn", "error", or "ignore"
    base-branch: "vnext"  # target branch
    github-token-for-extra-empty-commit: ${{ secrets.CI_TOKEN }}
```

**Features:**
- **Multiple PRs:** Set `max > 1` for multiple independent PRs per run
- **Auto-expiration:** Auto-close PRs after time period (same-repo only)
- **Base branch:** Target non-default branch
- **CI triggering:** Use `github-token-for-extra-empty-commit` to trigger CI
- **Git commands:** Automatically enabled when `create-pull-request` declared

**Push to PR Branch:**
```yaml
safe-outputs:
  push-to-pull-request-branch:
    target: "*"  # or specific PR number
    max: 3
```

**Security:** Cannot push to PRs from forks (fails early).

#### Code Review Operations

**PR Review Comments** accumulate and submit as single review:[^5]

```yaml
safe-outputs:
  create-pull-request-review-comment:
    max: 10
    side: "RIGHT"  # or "LEFT"
  submit-pull-request-review:
    max: 1
    target: "triggering"
```

**Review flow:**
1. Agent calls `create-pull-request-review-comment` multiple times
2. Comments buffered
3. Agent calls `submit-pull-request-review` (or auto-submit)
4. Single review posted with all comments

**Review events:** `APPROVE`, `REQUEST_CHANGES`, `COMMENT`

**Resolve Review Thread:**
```yaml
safe-outputs:
  resolve-pull-request-review-thread:
    max: 10
```

#### Project Operations

**Create/Update Project** automates GitHub Projects v2:[^5]

```yaml
safe-outputs:
  create-project:
    max: 1
    github-token: ${{ secrets.GH_AW_PROJECT_GITHUB_TOKEN }}  # required
    target-owner: "myorg"
    views:
      - name: "Sprint Board"
        layout: board
      - name: "Task Tracker"
        layout: table
```

**Supported field types:** TEXT, DATE, NUMBER, ITERATION, SINGLE_SELECT

**Create Project Status Update:**
```yaml
safe-outputs:
  create-project-status-update:
    project: "https://github.com/orgs/myorg/projects/73"
    max: 1
    github-token: ${{ secrets.GH_AW_PROJECT_GITHUB_TOKEN }}
```

Agent specifies status: `ON_TRACK`, `AT_RISK`, `OFF_TRACK`, `COMPLETE`, `INACTIVE`

#### Workflow Orchestration

**Dispatch Workflow** triggers other workflows:[^5]

```yaml
safe-outputs:
  dispatch-workflow:
    workflows: [worker-1, worker-2]
    max: 3
```

**Features:**
- Compile-time validation (workflows must exist)
- No self-reference (prevents loops)
- 5-second rate limiting
- Same-repository only

**Use case:** Orchestrator-worker pattern (parent workflow dispatches specialized workers, synthesizes results).

---

<!-- 🎬 MAJOR SECTION: Agent Factory -->
## The Agent Factory Pattern

### Discovering Repository Automation Patterns

GitHub Next and Microsoft Research asked: *What does repository-level AI automation unlock?* Instead of theorizing, they built **100+ specialized workflows** and ran them continuously in the `github/gh-aw` repository. This collection is **"Peli's Agent Factory"** (named after Peli de Halleux).[^6][^7]

#### Factory Philosophy

1. **Embrace Diversity:** Create many specialized workflows as opportunities arise
2. **Use Them Continuously:** Run workflows in real development, not demos
3. **Observe What Works:** Identify patterns that succeed and fail
4. **Share the Knowledge:** Catalog effective structures for others to adapt

**Key Insight:** Don't build one monolithic "do-everything" agent. Build **many focused workflows** that each excel at a specific task.[^6]

#### Factory Categories

Workflows organized by automation purpose:[^7]

| Category | Focus | Example Workflows |
|----------|-------|-------------------|
| **Continuous Improvement** | Daily code quality enhancements | Simplify code, refactor patterns, update dependencies |
| **Issue & PR Management** | Triage, labeling, coordination | Auto-label issues, link related PRs, track sub-issues |
| **Metrics & Analytics** | Read-only monitoring and insights | Daily/weekly reports, trend analysis, contributor stats |
| **Quality & Testing** | Fault investigation and remediation | CI failure diagnosis, flaky test detection, coverage analysis |
| **Security & Compliance** | Security monitoring and fixes | Code scanning triage, dependency audits, license checks |
| **Operations & Release** | Release automation | Release notes generation, changelog updates, version bumping |
| **Multi-Repository** | Cross-repo coordination | Feature sync, multi-repo tracking, organization-wide metrics |
| **Interactive & ChatOps** | Command-triggered workflows | Issue comment commands, PR review requests |
| **Project Coordination** | Project management automation | Epic breakdown, task planning, milestone tracking |
| **Meta-Workflows** | Self-monitoring and optimization | Workflow health monitoring, performance analysis |

#### Proven Patterns from the Factory

**Pattern 1: Continuous Simplicity**[^6]
- **Trigger:** Daily schedule
- **Action:** Scan codebase for simplification opportunities
- **Output:** PR with simplification suggestions
- **Human Role:** Review and merge (or close)
- **Value:** Compounds over time—small daily improvements add up

**Pattern 2: Continuous Documentation**[^7]
- **Trigger:** Code changes (push, PR)
- **Action:** Identify outdated documentation sections
- **Output:** PR updating docs to match code
- **Human Role:** Review accuracy
- **Value:** Maintains code-docs consistency automatically

**Pattern 3: Orchestrator-Worker**[^7]
- **Structure:** Orchestrator workflow dispatches multiple worker workflows
- **Execution:** Workers run specialized tasks in parallel
- **Synthesis:** Orchestrator collects results and creates summary report
- **Value:** Enables multi-day, multi-phase agent tasks

**Pattern 4: Meta-Workflows**[^6]
- **Purpose:** Workflows that monitor other workflows
- **Analysis:** Execution logs, performance bottlenecks, failure patterns
- **Output:** Workflow improvement suggestions
- **Value:** Self-optimizing automation system

**Pattern 5: Issue Group Management**[^5]
- **Structure:** Parent issue with linked sub-issues (tasks)
- **Monitoring:** Workflow tracks sub-issue completion
- **Updates:** Auto-update parent with progress percentages
- **Completion:** Auto-close parent when all sub-issues resolved
- **Value:** Project tracking without manual coordination

#### Design Principles That Work

**1. Repository-Level Automation is Transformative**[^6]
- Agents embedded in development workflow have outsized impact
- Continuous daily improvements compound exponentially
- Meta-workflows (agents monitoring agents) unlock optimization loops

**2. Specialization Reveals Possibilities**[^7]
- Focused agents discover more applications than monolithic agents
- Each workflow solves one problem excellently
- Easier to debug, iterate, and improve

**3. Guardrails Enable Innovation**[^4]
- Strict constraints (safe outputs, sandboxing) make experimentation safer
- Teams willing to try agent automation when risks are bounded
- Security-first design builds trust and adoption

**4. Cost-Quality Tradeoffs Are Real**[^10]
- Longer analyses aren't always better
- Focused workflows with clear success criteria perform better
- Monitor execution costs and optimize

#### Common Failure Modes

**1. Agent Doesn't Produce Output**[^10]
- **Cause:** Forgot to call `noop` when no action needed
- **Fix:** Always include explicit `noop` instructions

**2. Permission Errors**
- **Cause:** Safe output requires permission not granted in frontmatter
- **Fix:** Review required permissions for each safe-output type

**3. Too Many Operations**
- **Cause:** Agent tries to create more items than `max` allows
- **Fix:** Set appropriate `max` values or narrow workflow scope

**4. Prompt Injection Attempts**
- **Cause:** Malicious input tries to manipulate agent
- **Fix:** Safe outputs sanitize automatically, but monitor anomalies

#### Best Practices from the Factory

**1. Start Small**[^10]
- Begin with read-only workflows (metrics, reports)
- Graduate to safe writes (labels, comments)
- Finally enable code changes (PRs) with review gates

**2. Human-in-the-Loop**[^14]
- Use `draft: true` for PRs (require review before merge)
- Use `expires` to auto-close old suggestions
- Monitor runs and adjust prompts iteratively

**3. Clear Success Criteria**[^11]
- Define explicit goals in workflow instructions
- Include examples of desired output
- Specify edge cases and failure modes

**4. Iterative Improvement**[^12]
- Start with basic workflow
- Observe behavior over multiple runs
- Refine prompts based on actual output
- Add guardrails as patterns emerge

---


## Real-World Use Cases

### 1. Issue Triage Automation

**Scenario:** Growing repository with dozens of new issues weekly; manual labeling is tedious and inconsistent.[^10][^11]

**Agentic Workflow Solution:**

```markdown
---
on:
  issues:
    types: [opened]
permissions:
  contents: read
  issues: write
tools:
  github:
    toolsets: [issues, labels]
safe-outputs:
  add-labels:
    allowed: [bug, feature, docs, question]
    max: 3
  add-comment:
    max: 1
---

## Issue Triage Workflow

Analyze new issues and apply appropriate labels based on content.

### Instructions

1. Read the issue title and body
2. Identify the issue type (bug, feature request, documentation, question)
3. Apply 1-3 relevant labels from the allowed list
4. Add a friendly comment explaining the labeling decision

### Examples

- "App crashes on startup" → `bug`
- "Add dark mode" → `feature`
- "How do I configure X?" → `question`, `docs`

If the issue is unclear, apply `question` and ask for clarification.
```

**Value:** Instant triage, consistent labeling, maintainers focus on substance not categorization.

---

### 2. CI Failure Diagnosis

**Scenario:** CI fails intermittently; debugging requires log diving; team wastes time on repetitive investigation.[^10][^12]

**Agentic Workflow Solution:**

```markdown
---
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    conclusion: [failure]
permissions:
  actions: read
  contents: read
  issues: write
safe-outputs:
  create-issue:
    title-prefix: "[ci-failure] "
    labels: [ci, automation]
    max: 1
    close-older-issues: true
    expires: 7
---

## CI Failure Diagnostic

When CI fails, analyze logs and create diagnostic issue.

### Instructions

1. Fetch the failed workflow run logs
2. Identify the failing step and error message
3. Search for similar past issues
4. Create a diagnostic issue with:
   - Failure summary
   - Error message and stack trace
   - Link to failed run
   - Suggested next steps
   - Related issues (if any)

Focus on actionable information. If this appears to be a flaky test, note that.
```

**Value:** Automatic diagnosis, knowledge base of failure modes, reduced MTTR (mean time to resolution).

---

### 3. Weekly Repository Health Report

**Scenario:** Engineering manager wants weekly snapshot of repository activity and health—what's progressing, what's stalled, what needs attention.[^7]

**Agentic Workflow Solution:**

```markdown
---
on:
  schedule: weekly
permissions:
  contents: read
  issues: read
  pull-requests: read
safe-outputs:
  create-issue:
    title-prefix: "[weekly-report] "
    labels: [report, weekly]
    close-older-issues: true
---

## Weekly Repository Health Report

Create a comprehensive weekly report of repository activity.

### Sections to Include

1. **Activity Summary** (past 7 days)
   - Issues opened/closed
   - PRs merged
   - Commits pushed
   - Top contributors

2. **Progress Metrics**
   - Open issue trend
   - PR merge time average
   - Stale issue count

3. **Highlights**
   - Notable merged PRs
   - New contributors
   - Milestone progress

4. **Recommendations**
   - Issues needing attention
   - Old PRs to review
   - Documentation gaps

5. **Next Week Goals**
   - Upcoming milestones
   - Priorities

Use charts/tables where helpful. Keep tone upbeat and actionable.
```

**Value:** Zero-effort visibility, trend awareness, data-driven prioritization.

---

### 4. Continuous Code Simplification

**Scenario:** Technical debt accumulates; no dedicated time for refactoring; team wants gradual improvement without project disruption.[^6][^7]

**Agentic Workflow Solution:**

```markdown
---
on:
  schedule: daily
permissions:
  contents: read
  pull-requests: write
safe-outputs:
  create-pull-request:
    title-prefix: "[simplify] "
    labels: [code-quality, bot]
    draft: true
    max: 1
    expires: 14
---

## Continuous Code Simplification

Scan codebase for simplification opportunities and propose improvements.

### Instructions

1. Review recent code changes or select a subsystem
2. Identify patterns that can be simplified:
   - Redundant logic
   - Verbose constructs
   - Outdated idioms
   - Complex conditionals that can be extracted
3. Create a PR with simplification suggestions
4. Include before/after examples in PR description
5. Explain why the simplification improves readability/maintainability

Keep changes focused and small (< 100 lines). If no simplifications found, call noop.
```

**Value:** Continuous improvement culture, compounding code quality gains, human reviews small focused changes.

---

### 5. Multi-Agent Orchestration

**Scenario:** Complex analysis requiring multiple specialized perspectives—can't do it all in one workflow pass.[^7]

**Agentic Workflow Solution:**

```markdown
---
on:
  schedule: daily
permissions:
  actions: write  # for dispatch-workflow
  contents: read
safe-outputs:
  dispatch-workflow:
    workflows: [analyze-issues, analyze-prs, analyze-ci]
    max: 3
  create-issue:
    title-prefix: "[orchestrator-report] "
    labels: [orchestrator, daily]
    close-older-issues: true
---

## Daily Orchestrator

Coordinate multiple analysis workflows and synthesize results.

### Instructions

1. Dispatch worker workflows in parallel:
   - `analyze-issues`: Triage and label new issues
   - `analyze-prs`: Review and comment on PRs
   - `analyze-ci`: Diagnose CI failures

2. Wait for workers to complete (check workflow runs)

3. Collect results from worker-created issues/comments

4. Create orchestrator summary issue with:
   - Worker status (success/failure)
   - Key findings from each worker
   - Cross-cutting insights
   - Prioritized action items

Include links to worker-generated issues for details.
```

**Value:** Parallel execution, specialized intelligence, coordinated insights.

---

### 6. Automated PR Review

**Scenario:** Every pull request arrives without context—reviewers apply the same checks repeatedly: test coverage, security risks, blast radius of API changes.[^12][^14]

**Agentic Workflow Solution:**

```markdown
---
on:
  pull_request:
    types: [opened, synchronize]
permissions:
  contents: read
  pull-requests: read
tools:
  github:
    toolsets: [pull-requests, code]
safe-outputs:
  create-pull-request-review-comment:
    max: 10
    side: RIGHT
  submit-pull-request-review:
    max: 1
    target: triggering
---

## PR Risk Reviewer

Analyze the incoming pull request and provide a structured first-pass review.

### Instructions

1. Read the PR title, description, and diff
2. Assess the change across three dimensions:
   - Code quality (complexity, duplication, naming clarity)
   - Security (injection points, credential exposure, unsafe dependencies)
   - Blast radius (how many call sites change? any public API surface affected?)
3. Add inline review comments for specific concerns with line references
4. Submit a COMMENT review summarizing:
   - Overall risk level: LOW / MEDIUM / HIGH
   - Top 3 concerns
   - At least one thing done well

Do not APPROVE or REQUEST_CHANGES—this is a first-pass context brief, not a gate.
```

**Value:** Every PR gets a consistent structured brief within seconds of opening. Human reviewers start from a risk-assessed summary instead of a blank diff.

---

### 7. Intelligent Dependency Audit

**Scenario:** Dependabot generates a stream of update PRs with no context—maintainers can't tell which upgrades matter, what breaks, or whether a major version bump is worth the migration cost.[^17]

**Agentic Workflow Solution:**

```markdown
---
on:
  schedule: weekly
permissions:
  contents: read
  pull-requests: write
tools:
  github:
    toolsets: [code, pull-requests]
  bash: [npm, pip]
safe-outputs:
  create-pull-request:
    title-prefix: "[deps] "
    labels: [dependencies, bot]
    draft: true
    max: 3
    expires: 14
---

## Intelligent Dependency Audit

Review outdated dependencies and create focused, context-rich upgrade PRs.

### Instructions

1. Run the package audit tool to identify outdated dependencies
2. For each outdated package:
   - Read the changelog between current and latest version
   - Identify breaking changes that affect this codebase's usage patterns
   - Note any CVEs or security advisories
3. Group by risk level:
   - PATCH/MINOR with no breaking changes → single combined PR
   - MAJOR or security-critical → one PR per package
4. For each PR, include:
   - What changed in the package and why it matters here
   - Required code changes with before/after examples
   - Any transitive vulnerabilities addressed

Skip packages requiring more than 2 hours of migration—note them as deferred in the PR body.
```

**Value:** One clear, annotated PR per upgrade decision instead of noisy bot churn. Maintainers understand the impact before merging, not after.

---

### 8. Release Notes Generation

**Scenario:** Every release requires manually aggregating merged PRs, writing upgrade guidance, and surfacing breaking changes—work that frequently gets skipped or rushed under release pressure.[^16]

**Agentic Workflow Solution:**

```markdown
---
on:
  release:
    types: [created]
permissions:
  contents: read
  pull-requests: read
tools:
  github:
    toolsets: [pull-requests, releases, issues]
safe-outputs:
  create-issue:
    title-prefix: "[release-notes] "
    labels: [release, documentation]
    max: 1
---

## Release Notes Generator

When a release is created, generate comprehensive release notes for team review.

### Instructions

1. Identify all PRs merged since the previous release tag
2. Categorize by change type:
   - ✨ New Features
   - 🐛 Bug Fixes
   - 💥 Breaking Changes
   - 🔒 Security Updates
   - 📚 Documentation
   - 🔧 Internal/Maintenance
3. For breaking changes, include migration paths with before/after examples
4. Surface top contributors by merged PR count
5. Write for end users, not contributors—focus on impact, not implementation

Create a draft issue with the notes for team review before publishing to the release.
```

**Value:** Release documentation ready within seconds of tagging. Breaking changes get explicit callouts. Consistent voice and format across every release without manual coordination.

---

### 9. ChatOps via Comment Commands

**Scenario:** Maintainers want to trigger triage, summaries, or ownership routing from directly within an issue or PR—without leaving GitHub, opening a terminal, or navigating to the Actions tab.[^16]

**Agentic Workflow Solution:**

```markdown
---
on:
  issue_comment:
    types: [created]
permissions:
  contents: read
  issues: read
  pull-requests: read
tools:
  github:
    toolsets: [issues, pull-requests, labels]
safe-outputs:
  add-comment:
    max: 1
  add-labels:
    allowed: [bug, needs-repro, wont-fix, good-first-issue, help-wanted]
    max: 3
  add-issue-assignees:
    max: 1
---

## Comment Command Handler

Respond to slash commands posted in issue or PR comments.

### Supported Commands

- `/triage` — Analyze the issue content and apply appropriate labels
- `/summarize` — Summarize the discussion thread so far
- `/suggest-owner` — Recommend the best team member based on code ownership
- `/close-reason [text]` — Draft a polite closing comment explaining the decision

### Instructions

1. Read the triggering comment body
2. Identify whether it starts with a recognized slash command
3. Execute the corresponding action using available tools
4. Reply in the same thread with a brief explanation of what was done and why

If no recognized command is found, call noop.
```

**Product boundary: two comment-triggered mechanisms.** The `gh-aw` example above is a repository Markdown workflow compiled to GitHub Actions; its slash commands are conventions defined by that workflow. Copilot cloud-agent **Automations** are configured under **Agents > Automations** in repository settings and delegate agent tasks when configured text appears in an issue or pull-request comment. That text can initiate documentation, investigation, or follow-up work, but it is repository-specific trigger text, not a set of built-in `gh-aw` slash commands.[^19]

Cloud-agent Automations require an eligible Copilot plan. For Copilot Business and Enterprise, an administrator must also enable the cloud-agent policy.[^19]

**Value:** Power-user automation available to anyone with comment access. Triage, summarization, and ownership routing happen in-thread without dashboards or terminal access.

---

### 10. Weekly External Research Digest

**Scenario:** Engineering teams want to stay current with developments relevant to their stack, but monitoring external feeds and distilling them into actionable context is manual overhead that fades when the team gets busy.[^18]

**Agentic Workflow Solution:**

```markdown
---
on:
  schedule: weekly
permissions:
  contents: read
tools:
  github:
    toolsets: [issues]
  bash: [curl, jq]
safe-outputs:
  create-issue:
    title-prefix: "[research-digest] "
    labels: [research, weekly]
    close-older-issues: true
    expires: 8
---

## Weekly External Research Digest

Every week, collect and summarize external developments relevant to this project's technology choices.

### Sources to Monitor

1. Hacker News — search for topics matching our primary technologies
2. arXiv — recent papers relevant to our domain
3. GitHub Trending — repositories gaining momentum in our language/ecosystem

### Instructions

1. Fetch content from each source using curl and jq
2. Filter to items with direct relevance to this project's tech stack
3. For each relevant item, write a 2-3 sentence summary explaining why it matters here
4. Score relevance: HIGH / MEDIUM / LOW
5. Include only HIGH and MEDIUM items in the digest

If fewer than 3 relevant items are found, call noop—don't post low-signal noise.
Format as a readable weekly briefing with source links.
```

**Value:** Version-controlled, auditable research automation that lives in the repository—not siloed in a personal automation account or an AI tool outside team governance.[^18]

---

## 🧠 Mental Model Shift

### From Scripted Steps to Adaptive Intent

**Old Mental Model: Prescriptive Automation**
- Write exact steps in YAML
- Account for every branch and edge case
- Update workflow whenever requirements change
- Deterministic execution: same input → same output

**New Mental Model: Intent-Driven Automation**
- Describe desired outcome in natural language
- AI adapts to repository context
- Workflow learns from repository state
- Context-sensitive execution: AI decides best path

#### ✅ Move Toward

| What | Why |
|------|-----|
| **Natural Language Instructions** | Express intent without implementation details[^11] |
| **Context-Aware Decisions** | AI examines repository state and adapts actions[^3] |
| **Read-Only by Default** | Security through minimal permissions[^4] |
| **Safe-Output Validation** | Separation of concerns: AI decides, handlers execute[^5] |
| **Human-in-the-Loop** | Draft PRs, expiration policies, review gates[^14] |
| **Specialized Workflows** | Many focused agents > one monolithic agent[^6] |
| **Continuous Improvement** | Daily automated enhancements that compound[^7] |
| **Meta-Workflows** | Agents monitoring and optimizing other agents[^6] |

#### ⚠️ Move Away From

| What | Why |
|------|-----|
| **Complex YAML Workflows** | Hard to maintain, brittle, verbose |
| **Deterministic-Only Logic** | Can't adapt to context or make judgments |
| **Manual Triage & Coordination** | AI handles repetitive decision-making better |
| **One-Size-Fits-All Agents** | Specialization reveals more possibilities |
| **Unlimited Agent Permissions** | Security risk—read-only + safe-outputs is safer |
| **Set-and-Forget Automation** | Monitor, iterate, improve continuously |

#### 🛑 Stop Doing (Dangerous/Obsolete)

| What | Why |
|------|-----|
| **Giving AI Direct Write Access** | Prompt injection risk, unauthorized modifications[^4] |
| **Ignoring noop Pattern** | #1 failure mode—always handle "no action needed" case[^10] |
| **Skipping Lock File Compilation** | Running uncompiled workflows bypasses security[^8] |
| **Manually Editing Lock Files** | Generated artifacts—edit source `.md` instead[^8] |
| **Triggering on Every Commit** | Cost adds up fast—use schedules or specific events |

---

## What You Can Do Today

### Immediate Actions (15 Minutes)

1. **Install gh-aw CLI Extension**[^15]
   ```bash
   curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash
   gh aw version
   ```

2. **Create Your First Workflow**
   ```bash
   gh aw new daily-status-report
   ```

3. **Edit the Workflow** (`.github/workflows/daily-status-report.md`)
   - Add natural language instructions in Markdown body
   - Configure `safe-outputs` in frontmatter
   - Set trigger to `on: schedule: daily`

4. **Compile and Deploy**
   ```bash
   gh aw compile daily-status-report
   git add .github/workflows/daily-status-report.md .github/workflows/daily-status-report.lock.yml
   git commit -m "Add daily status report workflow"
   git push
   ```

### Build Skills (1 Hour)

- **Explore the Agent Factory:** Browse [Peli's Agent Factory blog](https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/) for workflow patterns[^6]
- **Study Safe Outputs Reference:** Read [Safe Outputs documentation](https://github.github.io/gh-aw/reference/safe-outputs/) to understand security model[^5]
- **Review Examples:** Check `examples/` directory in this tech talk for starter workflows

### Go Deep (1 Day)

- **Create 3-5 Specialized Workflows:** Start with read-only (reports), then safe writes (labels), finally PRs[^10]
- **Implement Orchestrator-Worker Pattern:** Build a meta-workflow that coordinates specialized workers[^7]
- **Try AgentCouncil:** Install AgentCouncil skill and compare single-agent vs. multi-agent answers on architecture questions[^9]

### Key Concepts to Master

| Concept | Why It Matters |
|---------|----------------|
| **Safe Outputs** | Security foundation—understand validation pipeline[^5] |
| **Noop Pattern** | Prevent #1 failure mode—always handle "no action" case[^10] |
| **Compilation** | Markdown → secure YAML—verify lock files after changes[^8] |
| **Agent Factory Philosophy** | Specialization > monolithic—build many focused workflows[^6] |
| **Human-in-the-Loop** | Draft PRs, expirations, review gates—trust but verify[^14] |

---

## Related Patterns

### Patterns in This Talk

- **Agent Factory:** Many specialized workflows > one monolithic agent[^6]
- **Orchestrator-Worker:** Parent workflow dispatches specialized workers, synthesizes results[^7]
- **Meta-Workflows:** Agents monitoring and optimizing other agents[^6]
- **AgentCouncil:** Multi-agent collaboration/adversarial modes for better decisions[^9]
- **Safe Outputs:** Separation of concerns—AI decides, handlers execute[^5]

### Related Patterns (Other Talks)

- **Custom Instructions:** Teach Copilot your repository structure and conventions
- **Hooks & Primitives:** Extend Copilot with custom tooling and integrations
- **Model Context Protocol (MCP):** Connect agents to external data sources and APIs
- **Sandboxed Terminal Execution:** Run AI-generated commands safely
- **Multi-Agent Teams:** Coordinate multiple specialized agents (Copilot Teams)

### Further Exploration

- **GitHub Actions Best Practices:** How agentic workflows complement traditional CI/CD
- **AI Safety & Governance:** Enterprise policies for agent automation
- **Continuous Intelligence:** Moving beyond CI/CD to "Continuous AI"

---

## 📖 References

[^1]: GitHub Blog: [Automate repository tasks with GitHub Agentic Workflows](https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/)

[^2]: GitHub Agentic Workflows Documentation: [Introduction & Overview](https://github.github.com/gh-aw/introduction/overview/)

[^3]: GitHub Agentic Workflows Documentation: [How They Work](https://github.github.com/gh-aw/introduction/how-they-work/)

[^4]: GitHub Agentic Workflows Documentation: [Security Architecture](https://github.github.com/gh-aw/introduction/architecture/)

[^5]: GitHub Agentic Workflows Reference: [Safe Outputs](https://github.github.io/gh-aw/reference/safe-outputs/)

[^6]: GitHub Agentic Workflows Blog: [Welcome to Peli's Agent Factory](https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/)

[^7]: GitHub Agentic Workflows Blog: [Meet the Workflows](https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows/)

[^8]: GitHub Repository: [Create Workflow Documentation](https://github.com/github/gh-aw/blob/main/create.md)

[^9]: GitHub Repository: [Sentry01/AgentCouncil](https://github.com/Sentry01/AgentCouncil)

[^10]: Josh-Ops Blog: [Getting Started with GitHub Agentic Workflows](https://josh-ops.com/posts/github-agentic-workflows/)

[^11]: Trpkovski Blog: [Agentic Workflows: Write GitHub Actions in Markdown](https://www.trpkovski.com/2026/02/22/agentic-workflows-write-github-actions-in-markdown)

[^12]: Dev.to: [GitHub Agentic Workflows: A Hands-On Guide to AI-Powered CI/CD](https://dev.to/htekdev/github-agentic-workflows-a-hands-on-guide-to-ai-powered-cicd-255e)

[^13]: Yuv.ai Blog: [GitHub Agentic Workflows: Write CI/CD in Natural Language](https://yuv.ai/blog/gh-aw)

[^14]: Ken Muse Blog: [GitHub Agentic Workflows Bring AI Agents to Actions](https://www.kenmuse.com/blog/github-agentic-workflows-bring-ai-agents-to-actions/)

[^15]: GitHub Agentic Workflows: [Quick Start Guide](https://github.github.com/gh-aw/setup/quick-start/)

[^16]: GitHub Next: [githubnext/agentics — Sample Pack of GitHub Agentic Workflows](https://github.com/githubnext/agentics)

[^17]: Erik Lieben: [Dependency Updates That Understand Your Code](https://www.eriklieben.com/posts/agentic-dev-workflow-dependency-management/)

[^18]: Shing Lyu: [Automating Weekly Research with GitHub Agentic Workflows](https://shinglyu.com/blog/2026/04/15/automating-weekly-research-with-github-agentic-workflows.html)

[^19]: GitHub Changelog: [Trigger Copilot automations with comments](https://github.blog/changelog/2026-08-03-trigger-copilot-automations-with-comments)

---

## 🎭 Behind the Scenes

This tech talk was created using the **tech-talk-author** skill with a 3-phase workflow:

1. **Phase 1: Research** — Fetched 15 authoritative sources, extracted code examples, compiled comprehensive research.md
2. **Phase 2: Plan** — Created plan.md with near-final prose for every section (480+ lines)
3. **Phase 3: Build** — Assembled README.md incrementally from plan.md with inline citations and embedded examples

**Voice:** Optimistic curiosity—leading with discovery and possibility, not problems and pain.

**Architecture:** Research → Plan → Build ensures reviewability, iterative refinement, and high-quality output.

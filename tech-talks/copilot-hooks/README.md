---
status: active
updated: 2026-09-15
section: "Verify and Govern"
audience: [platform-engineer, security]
level: advanced
duration: 45
format: core-talk
decision: "Which agent actions should policy allow or deny at execution time?"
prerequisites: [copilot-primitives]
related: [agentic-workflows, agentic-sdlc, enterprise-patterns]
references:
  - url: https://code.visualstudio.com/docs/copilot/customization/hooks
    label: "Agent hooks configuration in VS Code"
    verified: 2026-02-11
  - url: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks
    label: "About Copilot hooks"
    verified: 2026-02-11
  - url: https://docs.github.com/en/copilot/reference/hooks-configuration
    label: "Hooks configuration reference"
    verified: 2026-02-11
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks
    label: "Using hooks with coding agent"
    verified: 2026-02-11
  - url: https://code.visualstudio.com/docs/copilot/security
    label: "Security considerations for AI in VS Code"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/updates/v1_121
    label: "VS Code release notes: v1.121"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/updates/v1_122
    label: "VS Code release notes: v1.122"
    verified: 2026-09-15
---

# GitHub Copilot Hooks: Programmable Governance for Agent Workflows

> **The Question This Talk Answers:**
> *"How do I govern AI agent workflows without blocking their velocity?"*

**Duration:** 45 minutes | **Target Audience:** DevOps Engineers / Security Architects / Compliance Officers

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Every team with agents needs governance — security, compliance, quality enforcement — without manual gates |
| **Compelling** | 🟢 High | Only `PreToolUse` can prevent violations before they happen; all other observability tools are post-incident |
| **Actionable** | 🟢 High | Working hook configurations you can deploy in 1-2 hours; immediate security/compliance value |

**Overall Status:** 🟢 Ready to use

---


## The Problem

### Key Points

- **AI agents operate autonomously**
  Copilot creates files, runs commands, accesses APIs — all without pre-approval gates or manual review

- **Compliance requires audit trails**
  Regulated environments (finance, healthcare, government) need complete evidence of what happened, when, and who authorized it

- **Security policies must be enforced in real-time**
  Can't rely on post-incident review to catch `rm -rf /` or `DROP TABLE` commands — violations must be prevented

- **Quality standards need validation at creation**
  Style violations, test failures, and policy breaches should block commits before they're created, not in CI review

- **Agents need context injection**
  Project-specific information, environment details, and API keys should be available to agents without manual setup

### Narrative

AI agents move fast — creating files, running commands, deploying changes. This autonomy creates value through velocity, but it also creates risk in regulated environments.

Security teams ask: "How do we prevent dangerous operations before they execute?" Post-incident review doesn't work when the damage is done. Audit teams need: "Complete evidence trail of every agent action" for compliance reporting and investigation. Quality teams demand: "Enforcement of standards at the point of creation, not in CI review" to eliminate rework cycles.

Manual approval gates destroy velocity. Static policies in CI catch violations too late. What's needed is programmable governance at the moment of action — control points that execute synchronously, validate operations against policies, and either allow or deny execution before anything happens.

GitHub Copilot Hooks provide exactly that: programmable control points at eight critical lifecycle moments. Hooks run deterministically and can control agent behavior, including blocking tool execution or injecting context into the conversation. This enables velocity with visibility, automation with accountability, and agent autonomy within governed boundaries.

---

## The Solution: GitHub Copilot Hooks

### What It Does

Hooks execute custom shell commands at key lifecycle points during agent sessions — before tool execution, after completion, on session start/stop, when subagents spawn, and before context compaction. Each hook receives structured JSON input via stdin and can return JSON output to influence agent behavior. Hooks are designed to work across agent types, including local agents, background agents, and cloud agents.

### Key Capabilities

- **Preventive Control**: `PreToolUse` hook can deny tool execution before it happens with `{"permissionDecision": "deny"}`, modify tool input with `updatedInput`, or require user confirmation with `"ask"`
- **Context Injection**: `SessionStart` and `SubagentStart` hooks can inject project-specific information via `additionalContext` to help agents make better decisions
- **Complete Audit Trail**: All eight lifecycle events (`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, `Stop`) provide full observability
- **Agent Flow Control**: `Stop` and `SubagentStop` hooks can prevent agents from stopping, directing them to complete additional work
- **Exit Code Semantics**: Exit code 0 = success, exit code 2 = blocking error, other = non-blocking warning
- **Synchronous Execution**: Hooks run in the agent execution path with configurable timeouts (default 30s) — agents wait for hook completion
- **JSON Lines Logging**: Structured append-only format enables direct querying with `jq`, SQL imports, and log aggregation platform compatibility

### Architecture Overview

Hooks are configured in JSON files stored in your workspace or user directory. VS Code searches for hook configurations in these locations (workspace hooks take precedence over user hooks):

- **Workspace**: `.github/hooks/*.json` — Project-specific hooks shared with your team
- **Workspace**: `.claude/settings.local.json` — Local workspace hooks (not committed)
- **Workspace**: `.claude/settings.json` — Workspace-level hooks
- **User**: `~/.claude/settings.json` — Personal hooks applied across all workspaces

When an event occurs, VS Code discovers hook configurations, spawns shell processes, writes JSON context to stdin, waits for completion, and reads stdout to parse the result. For `PreToolUse` hooks, the output determines whether tool execution is allowed, denied, or requires user confirmation.

The critical distinction: **`PreToolUse` is the only hook that can prevent actions** — but several hooks can now inject context and control agent flow. `Stop` and `SubagentStop` can prevent agents from finishing. `SessionStart` and `SubagentStart` can inject context. Keep hooks fast (<5 seconds ideal) to avoid degrading agent responsiveness.

> **Note:** VS Code parses both Claude Code and Copilot CLI hook configuration formats for compatibility. Both lowerCamelCase (`preToolUse`) and PascalCase (`PreToolUse`) event names are supported.

**Official Documentation:**
- 📖 [Agent Hooks in VS Code](https://code.visualstudio.com/docs/copilot/customization/hooks) — Complete configuration reference with input/output formats
- 📖 [About Hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks) — Core concepts and hook types
- 📖 [Hooks Configuration Reference](https://docs.github.com/en/copilot/reference/hooks-configuration) — Complete spec with input/output formats
- 📖 [Using Hooks with GitHub Copilot Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks) — Step-by-step implementation guide

---

## 📦 Key Artifacts

**This talk includes 5 complete working hook configurations** demonstrating security enforcement, compliance audit, quality gates, and context injection.

### Primary Artifacts

*Shown inline with detailed explanation in the major sections below*

- **`security-hooks.json`** — Security policy enforcement: blocks dangerous commands, privilege escalation, destructive operations via `PreToolUse`
- **`audit-hooks.json`** — Complete compliance audit trail: logs all lifecycle events to JSON Lines format
- **`quality-hooks.json`** — Code quality gates: enforces linting after file edits via `PostToolUse`, blocks non-compliant code
- **`context-hooks.json`** — Session context injection: provides project info to agents via `SessionStart`
- **`security-check.sh`** — Pre-execution validation script: pattern matching for dangerous operations with `deny`/`allow`/`ask` decisions

### Supporting Files

*Referenced but not shown inline — available in repository*

- **[Example Hook Scripts](../../examples/completed-config/hooks/scripts/)** — Reusable bash/PowerShell scripts for common patterns
- **[Hook Configuration Examples](../../examples/completed-config/hooks/)** — Complete working configurations for multiple use cases
- **[Terminal Sandboxing Talk](../terminal-sandboxing/)** — Complementary OS-level execution controls

---

## 🎯 Mental Model Shift

> **The Core Insight:** From "agents work and we review their output" to "agents propose actions and governance approves them in real-time"

### Move Toward (Embrace These Patterns)

- ✅ **Preventive Governance**: Use `PreToolUse` to deny operations before they execute → Stop violations before damage occurs, not after
- ✅ **Context Injection**: Use `SessionStart` and `SubagentStart` to inject project-specific information → Better agent decisions without manual setup
- ✅ **Structured Logging**: JSON Lines format (`.jsonl`) for all audit trails → Direct querying with `jq`, append safety, tool compatibility
- ✅ **Deny-by-Default Security**: Hooks block operations unless explicitly approved by policy → Safer than allow-with-filtering
- ✅ **Fast Synchronous Validation**: Keep hooks under 5 seconds → Governance without velocity impact
- ✅ **Separation of Concerns**: Hook logic in versioned scripts, not embedded in YAML → Reviewable, testable, maintainable governance

### Move Away From (Retire These Habits)

- ⚠️ **Post-Incident Review**: Manual log parsing after violations occur → Too late to prevent damage, expensive investigation
- ⚠️ **Manual Approval Gates**: Human review before every agent action → Destroys velocity, creates bottlenecks
- ⚠️ **Unstructured Logging**: Plain text logs without query capability → Hours of `grep`/`awk`, incomplete audit trails
- ⚠️ **CI-Only Validation**: Catching policy violations in CI pipelines → Rework cycles, wasted compute, frustrated teams

### Move Against (Active Resistance Required)

- 🛑 **Allow-by-Default Security**: Permissive policies that filter violations → Attack surface for policy bypass, incomplete coverage
- 🛑 **Slow Hooks**: Expensive operations in the execution path (>30s) → Agent timeouts, degraded responsiveness, poor experience
- 🛑 **Logging Sensitive Data**: Credentials, tokens, or PII in audit logs → Compliance violations, security incidents

> **Example Transformation:** Before: Developer manually reviews 50 issues, 8 are duplicates caught in sprint retrospective (wasted 6 hours). After: Triage agent with `SessionStart` hook validates state and injects project context, `PostToolUse` logs all actions, catches duplicates in 3 minutes with 100% coverage. Savings: 5.75 hours per sprint, real-time detection, complete audit trail.

---

## When to Use This Pattern

### Decision Tree

```
Q: What's your governance requirement?
├─ "Prevent dangerous operations before execution"
│  → Use: PreToolUse hook with security policies
│  └─ Best for: Security enforcement, regulated environments
│
├─ "Complete audit trail for compliance"
│  → Use: All 8 lifecycle hooks with JSON Lines logging
│  └─ Best for: Finance, healthcare, government compliance
│
├─ "Enforce code quality before commits"
│  → Use: PostToolUse hook with linter validation + context injection
│  └─ Best for: Quality gates, shift-left enforcement
│
├─ "Inject project context into agent sessions"
│  → Use: SessionStart hook with additionalContext
│  └─ Best for: Environment-aware agents, project metadata
│
└─ "Blanket network/filesystem restrictions"
   → Use: Terminal Sandboxing (see related talk)
   └─ Best for: Defense-in-depth, prompt injection protection
```

### Use This Pattern When

- You need real-time prevention (not post-incident review)
- Compliance requires complete audit trails (SOC 2, HIPAA, etc.)
- Quality standards must be enforced at creation (shift-left)
- Agents operate in regulated/sensitive environments
- You want observability into every agent action

### Don't Use This Pattern When

- You need OS-level execution controls → Use [Terminal Sandboxing](../terminal-sandboxing/)
- Agents don't touch sensitive systems → Observability overhead may not be worth it
- You have <5 agent sessions/week → Manual review may be sufficient

### Comparison with Related Features

| Aspect | Copilot Hooks | Terminal Sandboxing | Custom Instructions |
|--------|---------------|---------------------|---------------------|
| **Best For** | Real-time governance & audit | OS-level restrictions | Agent behavior guidance |
| **Control Timing** | Before/after each action | Blanket runtime limits | Pre-action intent setting |
| **Veto Power** | Yes (`PreToolUse` only) | Yes (blocks via OS) | No (suggestions only) |
| **Setup Time** | 1-2 hours | 30 minutes | 15 minutes |
| **Performance Impact** | <5s per action typical | None (native OS) | None |

### Defense in Depth, Not Substitution

Use deterministic hooks to inspect or block known action patterns, approval policy to retain human authority over consequential tools, and preview OS sandboxing to restrict filesystem and network effects if a command still runs. The VS Code sandbox is available on macOS and Linux, including WSL2, and is enabled with `chat.agent.sandbox.enabled`; it does not replace hooks or approval policy. Sensitive secret prompts remain a separate boundary: the user enters secrets directly in the terminal, and auto-approve flows cancel rather than supplying them.

---

<!-- 🎬 MAJOR SECTION: Lifecycle Control -->
## Phase 1: Lifecycle Control

*Understanding the eight hook types and when each executes*

### The Eight Lifecycle Events

| Hook Event | When It Fires | Common Use Cases |
|------------|---------------|------------------|
| `SessionStart` | User submits the first prompt of a new session | Initialize resources, log session start, validate project state, inject context |
| `UserPromptSubmit` | User submits a prompt | Audit user requests, inject system context |
| `PreToolUse` | Before agent invokes any tool | Block dangerous operations, require approval, modify tool input |
| `PostToolUse` | After tool completes successfully | Run formatters, log results, trigger follow-up actions |
| `PreCompact` | Before conversation context is compacted | Export important context, save state before truncation |
| `SubagentStart` | Subagent is spawned | Track nested agent usage, initialize subagent resources, inject context |
| `SubagentStop` | Subagent completes | Aggregate results, cleanup subagent resources |
| `Stop` | Agent session ends | Generate reports, cleanup resources, send notifications, or block stopping |

**1. `SessionStart`** — Agent session initialization
- Executes when a new agent session begins
- Input: Common fields + `source` (currently always `"new"`)
- Output: Can inject `additionalContext` into the agent's conversation
- **Use case**: Validate project state, initialize logging, inject project-specific context (branch, version, environment)

**2. `UserPromptSubmit`** — User request capture
- Executes when user submits a prompt to the agent
- Input: Common fields + `prompt` (user's submitted text)
- Output: Common output format only (can stop processing)
- **Use case**: Log requests for audit compliance, track prompt patterns for usage analysis

**3. `PreToolUse`** — Pre-execution validation ⚡ **MOST POWERFUL**
- Executes before agent uses any tool
- Input: Common fields + `tool_name`, `tool_input` (JSON object), `tool_use_id`
- Output: `hookSpecificOutput` with `permissionDecision` (`"allow"`, `"deny"`, `"ask"`), `updatedInput`, `additionalContext`
- **Use case**: Real-time security enforcement, approve/deny before execution, modify tool input, inject context

**4. `PostToolUse`** — Post-execution tracking
- Executes after tool completes successfully
- Input: Common fields + `tool_name`, `tool_input`, `tool_use_id`, `tool_response`
- Output: Can provide `additionalContext` or `decision: "block"` to stop further processing
- **Use case**: Run formatters, log results, trigger follow-up actions, inject context about results

**5. `PreCompact`** — Context compaction warning
- Executes before conversation context is compacted
- Input: Common fields + `trigger` (`"auto"` when conversation is too long)
- Output: Common output format only
- **Use case**: Export important context before truncation, save session state

**6. `SubagentStart`** — Subagent initialization
- Executes when a subagent is spawned
- Input: Common fields + `agent_id`, `agent_type` (e.g., `"Plan"`)
- Output: Can inject `additionalContext` into the subagent's conversation
- **Use case**: Track nested agent usage, initialize subagent resources, inject guidelines

**7. `SubagentStop`** — Subagent completion
- Executes when a subagent completes
- Input: Common fields + `agent_id`, `agent_type`, `stop_hook_active` (loop prevention)
- Output: Can block stopping with `decision: "block"` and `reason`
- **Use case**: Aggregate results, verify subagent output, cleanup resources

**8. `Stop`** — Agent session end
- Executes when the agent session ends
- Input: Common fields + `stop_hook_active` (loop prevention boolean)
- Output: Can block stopping with `decision: "block"` and `reason` (e.g., "Run the test suite before finishing")
- **Use case**: Generate reports, cleanup resources, enforce completion requirements

### Hook Configuration Format

Hooks are defined in `.github/hooks/*.json` files (or `.claude/settings.json` / `~/.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

**Configuration fields:**
- `type`: Must be `"command"`
- `command`: Default command to run (cross-platform)
- `windows`: Windows-specific command override
- `linux`: Linux-specific command override
- `osx`: macOS-specific command override
- `cwd`: Working directory (optional, relative to repository root)
- `timeout`: Maximum execution time in seconds (default: 30)
- `env`: Additional environment variables (optional)

> **OS-specific commands:** Specify different commands per platform. The execution service selects the appropriate command based on your OS. If no OS-specific command is defined, it falls back to the `command` property.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/format.sh",
        "windows": "powershell -File scripts\\format.ps1",
        "linux": "./scripts/format-linux.sh",
        "osx": "./scripts/format-mac.sh"
      }
    ]
  }
}
```

### Execution Flow

1. **Event Detection** — Agent detects lifecycle event (session start, tool request, etc.)
2. **Hook Discovery** — Reads hook configurations from `.github/hooks/*.json`, `.claude/settings.json`, and `~/.claude/settings.json`
3. **Script Invocation** — Spawns shell process with event context
4. **Context Passing** — Writes JSON payload to script stdin
5. **Execution** — Waits for script completion (up to `timeout` seconds)
6. **Exit Code Check** — Exit 0 = success (parse stdout), exit 2 = blocking error, other = warning
7. **Output Parsing** — For `PreToolUse`, reads `hookSpecificOutput` for permission decision
8. **Action** — Proceeds (allow), aborts (deny), or prompts user (ask) based on hook response

**Common input JSON (received by all hooks via stdin):**

```json
{
  "timestamp": "2026-02-09T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-identifier",
  "hookEventName": "PreToolUse",
  "transcript_path": "/path/to/transcript.json"
}
```

**Common output format (returned via stdout):**

```json
{
  "continue": true,
  "stopReason": "Security policy violation",
  "systemMessage": "Operation blocked by security hook"
}
```

**Example `PreToolUse` input:**

```json
{
  "timestamp": "2026-02-09T10:30:00.000Z",
  "cwd": "/workspace/project",
  "sessionId": "abc123",
  "hookEventName": "PreToolUse",
  "tool_name": "runTerminalCommand",
  "tool_input": { "command": "rm -rf dist" },
  "tool_use_id": "tool-123"
}
```

**Example `PreToolUse` output (deny):**

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive operations outside approved directories"
  }
}
```

**Example `PreToolUse` output (modify input):**

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "updatedInput": { "command": "rm -rf dist --dry-run" },
    "additionalContext": "Modified to dry-run mode per security policy"
  }
}
```

**Permission decision priority** (when multiple hooks run for the same tool):
1. `deny` (most restrictive): blocks tool execution
2. `ask`: requires user confirmation
3. `allow` (least restrictive): auto-approves execution
```

### Performance Considerations

Hooks run synchronously in the agent execution path. Keep them fast to avoid degrading responsiveness:

- **Target execution times:**
  - <2 seconds for security checks and logging
  - <5 seconds for linting and validation
  - <30 seconds only for external API calls (use `timeout` override)

- **Performance patterns:**
  - Cache expensive computations (compiled regex, policy lookups)
  - Use asynchronous logging (append to file, don't wait for I/O)
  - Offload slow work to background jobs triggered by hooks
  - Profile scripts: `time ./hook.sh < test-input.json`

- **Exit codes:**
  - Exit `0`: Success — VS Code parses stdout as JSON
  - Exit `2`: Blocking error — stops processing, shows error to model
  - Other exit codes: Non-blocking warning — shows warning to user, continues

---

<!-- 🎬 MAJOR SECTION: Preventive Enforcement -->
## Phase 2: Preventive Enforcement with `PreToolUse`

*The only hook that can deny operations before they happen*

### Why `PreToolUse` is Uniquely Powerful

`PreToolUse` is the most capable hook — it can deny execution, modify tool input, require user confirmation, and inject additional context. Other hooks are primarily observational or flow-control oriented.

This makes it ideal for:
- **Security enforcement**: Block dangerous commands before they run
- **Compliance validation**: Require approval for sensitive operations with `"ask"` decision
- **Quality gates**: Enforce standards before code is written
- **Input modification**: Adjust tool parameters via `updatedInput` to enforce safe defaults
- **Context enrichment**: Add project-specific context via `additionalContext`

### Security Check Implementation

Block dangerous operations before execution:

```bash
#!/bin/bash
# .github/hooks/scripts/security-check.sh

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input')

# Only validate terminal commands
if [ "$TOOL_NAME" != "runTerminalCommand" ]; then
  echo '{"continue":true}'
  exit 0
fi

# Extract command from tool input
COMMAND=$(echo "$TOOL_INPUT" | jq -r '.command // empty')

# Block dangerous delete operations
if echo "$COMMAND" | grep -qE 'rm -rf /|del /s /q|rmdir /s|format'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Destructive file operation blocked by security policy"}}'
  exit 0
fi

# Block privilege escalation
if echo "$COMMAND" | grep -qE '^sudo |^runas |^su '; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Privilege escalation not allowed"}}'
  exit 0
fi

# Block database destruction
if echo "$COMMAND" | grep -qiE 'DROP TABLE|DROP DATABASE|TRUNCATE TABLE'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Database destructive operations require manual approval"}}'
  exit 0
fi

# Default: allow
echo '{"continue":true}'
exit 0
```

### Hook Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/security-check.sh",
        "windows": "powershell -File scripts\\security-check.ps1",
        "cwd": ".github/hooks",
        "timeout": 5
      }
    ]
  }
}
```

### File Path Restrictions

Restrict agent operations to approved directories:

```bash
#!/bin/bash
# Only allow editing files in specific directories

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# Only validate file editing tools
if [ "$TOOL_NAME" != "editFiles" ] && [ "$TOOL_NAME" != "createFile" ]; then
  echo '{"continue":true}'
  exit 0
fi

# Extract file path from tool input
PATH_ARG=$(echo "$INPUT" | jq -r '.tool_input.path // .tool_input.files[0] // empty')

# Check if path is in approved directories
if [[ ! "$PATH_ARG" =~ ^(src/|test/|docs/) ]]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Can only edit files in src/, test/, or docs/ directories"}}'
  exit 0
fi

# Allow approved paths
echo '{"continue":true}'
exit 0
```

### Environment-Aware Policies

Apply stricter rules in production environments:

```bash
#!/bin/bash
INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# Stricter policies in production
if [[ "$CWD" =~ /production/ ]]; then
  # Require approval for all file writes
  if [[ "$TOOL_NAME" == "editFiles" || "$TOOL_NAME" == "createFile" ]]; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Production changes require manual approval"}}'
    exit 0
  fi
fi

# Permissive in development
echo '{"continue":true}'
exit 0
```

### Key Principles

**Deny by Default:**
- Hooks should deny operations unless explicitly approved
- Use `"ask"` for operations that need human judgment (safer than auto-allow)
- Reduces attack surface for policy bypass

**Fast Execution:**
- Keep validation logic simple and cached
- Target <2 seconds for security checks
- Use regex compilation and policy lookup caching

**Clear Denial Messages:**
- `permissionDecisionReason` should explain what was blocked and why
- Help developers understand policy violations
- Include guidance on how to proceed correctly

**Input Modification:**
- Use `updatedInput` to enforce safe defaults (e.g., add `--dry-run` flag)
- Verify input format matches expected tool schema via Chat Debug View
- If `updatedInput` doesn't match the schema, it will be ignored

---

<!-- 🎬 MAJOR SECTION: Observability & Audit -->
## Phase 3: Observability & Audit Trail

*Complete lifecycle logging for compliance and debugging*

### Structured Logging with JSON Lines

JSON Lines format (`.jsonl`) — one JSON object per line — provides:
- **Direct querying**: Use `jq` for SQL-like filtering without parsing
- **Append safety**: Concurrent writes don't corrupt file
- **Tool compatibility**: Import to SQLite, Elasticsearch, Datadog, etc.
- **Incremental streaming**: Process logs as they're written

### Session Lifecycle Logging

Log every session event for complete audit trail:

```bash
#!/bin/bash
# .github/hooks/scripts/log-session-start.sh

INPUT=$(cat)
LOG_FILE="logs/audit.jsonl"
mkdir -p logs

# Append structured log entry
echo "$INPUT" | jq -c '. + {
  event: "SessionStart",
  loggedAt: (now | todate)
}' >> "$LOG_FILE"
```

### Tool Usage Logging

Track every tool execution with results:

```bash
#!/bin/bash
# .github/hooks/scripts/log-tool-use.sh

INPUT=$(cat)
LOG_FILE="logs/audit.jsonl"
mkdir -p logs

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TOOL_RESPONSE=$(echo "$INPUT" | jq -r '.tool_response // "N/A"')

# Log tool execution with timestamp
jq -n \
  --arg tool "$TOOL_NAME" \
  --arg response "$TOOL_RESPONSE" \
  --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  '{
    timestamp: $ts,
    event: "PostToolUse",
    tool_name: $tool,
    response: $response
  }' >> "$LOG_FILE"
```

### Complete Audit Configuration

Wire up all eight lifecycle hooks for full observability:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "./scripts/log-session-start.sh",
        "cwd": ".github/hooks"
      }
    ],
    "UserPromptSubmit": [
      {
        "type": "command",
        "command": "./scripts/log-prompt.sh",
        "cwd": ".github/hooks"
      }
    ],
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/log-tool-pre.sh",
        "cwd": ".github/hooks"
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/log-tool-post.sh",
        "cwd": ".github/hooks"
      }
    ],
    "PreCompact": [
      {
        "type": "command",
        "command": "./scripts/log-pre-compact.sh",
        "cwd": ".github/hooks"
      }
    ],
    "SubagentStart": [
      {
        "type": "command",
        "command": "./scripts/log-subagent-start.sh",
        "cwd": ".github/hooks"
      }
    ],
    "SubagentStop": [
      {
        "type": "command",
        "command": "./scripts/log-subagent-stop.sh",
        "cwd": ".github/hooks"
      }
    ],
    "Stop": [
      {
        "type": "command",
        "command": "./scripts/log-session-end.sh",
        "cwd": ".github/hooks"
      }
    ]
  }
}
```

### Example Audit Log Output

```jsonl
{"timestamp":"2026-02-06T17:30:00Z","event":"SessionStart","sessionId":"abc123","source":"new"}
{"timestamp":"2026-02-06T17:30:15Z","event":"UserPromptSubmit","prompt":"Refactor authentication module"}
{"timestamp":"2026-02-06T17:30:20Z","event":"PreToolUse","tool_name":"editFiles","path":"src/auth.js","permissionDecision":"allow"}
{"timestamp":"2026-02-06T17:30:25Z","event":"PostToolUse","tool_name":"editFiles","response":"File edited successfully"}
{"timestamp":"2026-02-06T17:30:28Z","event":"SubagentStart","agent_id":"sub-456","agent_type":"Plan"}
{"timestamp":"2026-02-06T17:30:35Z","event":"SubagentStop","agent_id":"sub-456","agent_type":"Plan"}
{"timestamp":"2026-02-06T17:30:30Z","event":"Stop","toolsUsed":3,"violations":0}
```

### Querying Audit Logs

**Count tool usage by type:**
```bash
cat logs/audit.jsonl | jq -r '.tool_name // empty' | sort | uniq -c
```

**Find all denied operations:**
```bash
cat logs/audit.jsonl | jq 'select(.permissionDecision == "deny")'
```

**Export to CSV for compliance reporting:**
```bash
cat logs/audit.jsonl | jq -r '[.timestamp, .tool_name, .response] | @csv' > report.csv
```

**Track subagent usage:**
```bash
cat logs/audit.jsonl | jq 'select(.event == "SubagentStart" or .event == "SubagentStop")'
```

### Context Injection with SessionStart

Inject project-specific context when an agent session begins:

```bash
#!/bin/bash
# .github/hooks/scripts/inject-context.sh

PROJECT_INFO=$(cat package.json 2>/dev/null | jq -r '.name + " v" + .version' || echo "Unknown project")
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: $PROJECT_INFO | Branch: $BRANCH | Node: $(node -v 2>/dev/null || echo 'not installed')"
  }
}
EOF
```

This context is added to the agent's conversation, providing project-specific information without manual setup. Use this for environment variables, project versions, branch information, and team-specific guidelines.

---

<!-- 🎬 MAJOR SECTION: Real-World Patterns -->
## Phase 4: Real-World Implementation Patterns

*Proven patterns for security, compliance, and quality*

### Pattern 1: Multi-Layer Security Enforcement

Combine multiple security checks in sequence:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/security-dangerous-commands.sh",
        "timeout": 3
      },
      {
        "type": "command",
        "command": "./scripts/security-file-permissions.sh",
        "timeout": 3
      },
      {
        "type": "command",
        "command": "./scripts/security-secret-scanning.sh",
        "timeout": 5
      }
    ]
  }
}
```

**Execution**: Hooks run in order. The most restrictive permission decision wins — first `deny` blocks execution immediately.

### Pattern 2: Code Quality Gates

Enforce formatting after code changes using `PostToolUse`:

```bash
#!/bin/bash
# .github/hooks/scripts/format-changed-files.sh

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

if [ "$TOOL_NAME" = "editFiles" ] || [ "$TOOL_NAME" = "createFile" ]; then
  FILES=$(echo "$INPUT" | jq -r '.tool_input.files[]? // .tool_input.path // empty')

  for FILE in $FILES; do
    if [ -f "$FILE" ]; then
      npx prettier --write "$FILE" 2>/dev/null
    fi
  done
fi

echo '{"continue":true}'
```

**PostToolUse** can also inject context back to the agent:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

if [ "$TOOL_NAME" = "editFiles" ]; then
  FILE=$(echo "$INPUT" | jq -r '.tool_input.files[0] // empty')
  if [ -f "$FILE" ]; then
    LINT_OUTPUT=$(npx eslint "$FILE" --quiet 2>&1)
    if [ $? -ne 0 ]; then
      echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PostToolUse\",\"additionalContext\":\"The edited file has lint errors that need to be fixed: $LINT_OUTPUT\"}}"
      exit 0
    fi
  fi
fi

echo '{"continue":true}'
```

### Pattern 3: Conditional Policies by Environment

Apply different rules based on working directory:

```bash
#!/bin/bash
INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# Production environment: strict controls
if [[ "$CWD" =~ /production/ ]]; then
  # Block all writes
  if [[ "$TOOL_NAME" =~ ^(editFiles|createFile|runTerminalCommand)$ ]]; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Production changes require manual deployment process"}}'
    exit 0
  fi
fi

# Staging environment: require approval for destructive operations
if [[ "$CWD" =~ /staging/ ]]; then
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  if echo "$COMMAND" | grep -qE "rm |delete |drop "; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Destructive operations in staging require approval"}}'
    exit 0
  fi
fi

# Development environment: permissive (allow all)
echo '{"continue":true}'
exit 0
```

### Pattern 4: Cost Tracking & Metrics

Track tool usage for cost allocation and performance monitoring:

```bash
#!/bin/bash
# .github/hooks/scripts/metrics-tracker.sh

INPUT=$(cat)
LOG_FILE="logs/metrics.jsonl"
mkdir -p logs

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId')
USER=${GITHUB_ACTOR:-unknown}

# Calculate cost estimate (example: $0.01 per tool use)
COST=0.01

# Log usage metrics
jq -n \
  --arg ts "$TIMESTAMP" \
  --arg user "$USER" \
  --arg tool "$TOOL_NAME" \
  --arg cost "$COST" \
  '{
    timestamp: $ts,
    user: $user,
    toolName: $tool,
    estimatedCost: ($cost | tonumber)
  }' >> "$LOG_FILE"
```

**Query monthly costs:**
```bash
# Sum costs by user for current month
cat logs/metrics.jsonl | jq -s '
  group_by(.user) |
  map({user: .[0].user, totalCost: (map(.estimatedCost) | add)})
'
```

---

<!-- 🎬 MAJOR SECTION: Advanced Integration -->
## Phase 5: Advanced Integration Patterns

*Connecting hooks to external systems and workflows*

### Slack Notifications

Send alerts on security violations or failures:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Check for security violation
if echo "$COMMAND" | grep -qE "rm -rf|sudo|DROP TABLE"; then
  WEBHOOK_URL="$SLACK_WEBHOOK_URL"  # Set in hook env

  curl -X POST "$WEBHOOK_URL" \
    -H 'Content-Type: application/json' \
    -d "{
      \"text\": \"🚨 Security Violation Blocked\",
      \"blocks\": [
        {
          \"type\": \"section\",
          \"text\": {
            \"type\": \"mrkdwn\",
            \"text\": \"*Tool:* \`$TOOL_NAME\`\n*Command:* \`$COMMAND\`\"
          }
        }
      ]
    }"

  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Security policy violation - team alerted"}}'
  exit 0
fi

exit 0
```

### Metrics Platforms (Datadog, New Relic)

Send performance metrics in real-time:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TOOL_RESPONSE=$(echo "$INPUT" | jq -r '.tool_response // "N/A"')

# Send metric to Datadog (StatsD protocol)
STATSD_HOST=${STATSD_HOST:-localhost}
STATSD_PORT=${STATSD_PORT:-8125}

# Increment counter
echo "copilot.tool.executed:1|c|#tool:$TOOL_NAME" | \
  nc -u -w0 "$STATSD_HOST" "$STATSD_PORT"
```

### Ticketing Systems (Jira, ServiceNow)

Create incidents on security violations:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Create incident for blocked dangerous operations
if echo "$COMMAND" | grep -qE "rm -rf|DROP TABLE|sudo"; then
  JIRA_API="$JIRA_BASE_URL/rest/api/3/issue"

  curl -X POST "$JIRA_API" \
    -H "Authorization: Bearer $JIRA_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"fields\": {
        \"project\": {\"key\": \"SEC\"},
        \"summary\": \"Security Violation Blocked: $TOOL_NAME\",
        \"description\": \"Blocked command: $COMMAND\",
        \"issuetype\": {\"name\": \"Incident\"},
        \"priority\": {\"name\": \"P1\"}
      }
    }"

  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Dangerous operation blocked - incident created"}}'
  exit 0
fi

echo '{"continue":true}'
```

### PagerDuty Alerts

Trigger on-call alerts for security violations in production:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
CWD=$(echo "$INPUT" | jq -r '.cwd')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only alert for production security violations
if [[ ! "$CWD" =~ /production/ ]]; then
  echo '{"continue":true}'
  exit 0
fi

# Check for dangerous operations
if echo "$COMMAND" | grep -qE "rm -rf|DROP|TRUNCATE|sudo"; then
  # Send to PagerDuty
  PAGERDUTY_URL="https://events.pagerduty.com/v2/enqueue"

  curl -X POST "$PAGERDUTY_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"routing_key\": \"$PAGERDUTY_INTEGRATION_KEY\",
      \"event_action\": \"trigger\",
      \"payload\": {
        \"summary\": \"Agent security violation in production\",
        \"severity\": \"critical\",
        \"source\": \"copilot-hooks\",
        \"custom_details\": {
          \"tool\": \"$TOOL_NAME\",
          \"command\": \"$COMMAND\",
          \"cwd\": \"$CWD\"
        }
      }
    }"

  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Production security violation - on-call alerted"}}'
  exit 0
fi

echo '{"continue":true}'
```

### Database Logging (PostgreSQL, MySQL)

Store audit logs in database for advanced querying:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')
TOOL_RESPONSE=$(echo "$INPUT" | jq -r '.tool_response // "unknown"')
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId')

# Insert into PostgreSQL
psql "$DATABASE_URL" -c "
  INSERT INTO agent_audit_log (timestamp, session_id, tool_name, response, raw_json)
  VALUES ('$TIMESTAMP', '$SESSION_ID', '$TOOL_NAME', '$TOOL_RESPONSE', '$INPUT'::jsonb)
"
```

### Multi-Hook Coordination

Track session state across multiple hooks:

```bash
#!/bin/bash
# .github/hooks/scripts/session-tracker.sh

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId // "unknown"')
EVENT=$(echo "$INPUT" | jq -r '.hookEventName')
SESSION_STATE="/tmp/copilot-session-$SESSION_ID.json"

case "$EVENT" in
  SessionStart)
    # Initialize session tracking
    echo "$INPUT" | jq '{
      sessionId: .sessionId,
      startTime: .timestamp,
      toolsUsed: 0,
      violations: 0,
      subagents: 0
    }' > "$SESSION_STATE"
    ;;

  PreToolUse)
    # Track tool usage
    if [ -f "$SESSION_STATE" ]; then
      jq '.toolsUsed += 1' "$SESSION_STATE" > "${SESSION_STATE}.tmp"
      mv "${SESSION_STATE}.tmp" "$SESSION_STATE"
    fi
    ;;

  SubagentStart)
    # Track subagent spawning
    if [ -f "$SESSION_STATE" ]; then
      jq '.subagents += 1' "$SESSION_STATE" > "${SESSION_STATE}.tmp"
      mv "${SESSION_STATE}.tmp" "$SESSION_STATE"
    fi
    ;;

  Stop)
    # Generate summary report
    if [ -f "$SESSION_STATE" ]; then
      jq -c '. + {endTime: (now | todate)}' "$SESSION_STATE" >> logs/session-summary.jsonl
      rm "$SESSION_STATE"
    fi
    ;;
esac
```

---

## Real-World Use Cases

### Use Case 1: HIPAA Compliance Audit Trail

**The Problem:** Healthcare application development requires complete audit trail of all code changes for HIPAA compliance. Manual log collection takes 2-3 hours per audit request with 60-70% completeness.

**The Solution:** Hooks log every session event to JSON Lines format with automatic archival to S3 for long-term retention:

```json
{
  "hooks": {
    "SessionStart": [{"type": "command", "command": "./audit/log-session-start.sh"}],
    "UserPromptSubmit": [{"type": "command", "command": "./audit/log-prompt.sh"}],
    "PreToolUse": [{"type": "command", "command": "./audit/log-tool-pre.sh"}],
    "PostToolUse": [{"type": "command", "command": "./audit/log-tool-post.sh"}],
    "SubagentStart": [{"type": "command", "command": "./audit/log-subagent.sh"}],
    "SubagentStop": [{"type": "command", "command": "./audit/log-subagent.sh"}],
    "PreCompact": [{"type": "command", "command": "./audit/log-compact.sh"}],
    "Stop": [{"type": "command", "command": "./audit/archive-to-s3.sh"}]
  }
}
```

**Outcome:**
- Audit time: 2-3 hours → 5 minutes (automated queries)
- Coverage: 60-70% → 100% (complete lifecycle logging)
- Retention: Manual → Automated S3 archival (7-year retention)
- Query capability: Manual `grep` → SQL-like `jq` filtering

---

### Use Case 2: SOC 2 Security Enforcement

**The Problem:** SaaS company needs SOC 2 compliance proof that dangerous operations are prevented before execution. Manual review catches violations after-the-fact (not acceptable for audit).

**The Solution:** `PreToolUse` hook blocks dangerous operations with real-time denial:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block operations that violate SOC 2 requirements
if echo "$COMMAND" | grep -qE 'rm -rf|DROP|TRUNCATE|sudo|chmod 777'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"SOC 2 policy: Dangerous operation requires approval ticket"}}'
  # Log violation for audit trail
  echo "$INPUT" | jq -c '. + {violation: "SOC2_DANGEROUS_OP"}' >> logs/violations.jsonl
  exit 0
fi

echo '{"continue":true}'
```

**Outcome:**
- Violations detected: Post-incident → Real-time prevention
- Audit evidence: Manual → Automated violation log
- Compliance cost: 40 hours/year auditor time → 5 hours (automated reports)
- Security incidents: 3/year → 0 (preventive enforcement)

---

### Use Case 3: Multi-Tenant SaaS Quality Gates

**The Problem:** Agent-generated code for customer tenants averaging 15 linting violations per PR. Rework cycles cost 30-45 minutes per violation (average 7.5 hours per sprint).

**The Solution:** `PreToolUse` hook runs linter before file edits, denies non-compliant code:

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // .tool_input.files[0] // empty')

# Only lint code file edits
if [ "$TOOL_NAME" != "editFiles" ] || [[ ! "$FILE_PATH" =~ \.(js|ts)$ ]]; then
  echo '{"continue":true}'
  exit 0
fi

# Run ESLint on proposed changes
TEMP_FILE=$(mktemp)
echo "$INPUT" | jq -r '.tool_input.newContent // empty' > "$TEMP_FILE"

if ! npx eslint --no-eslintrc -c .eslintrc.json "$TEMP_FILE" > /dev/null 2>&1; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Code fails linting. Fix violations before applying."}}'
  rm "$TEMP_FILE"
  exit 0
fi

rm "$TEMP_FILE"
echo '{"continue":true}'
exit 0
```

**Outcome:**
- Rework time: 7.5 hours/sprint → 0 (violations blocked at creation)
- Rework rounds: 3 average → 1 (standards enforced before commit)
- CI failures: 15/sprint → 0 (shift-left validation)
- Developer experience: Frustration → Immediate feedback

---

### Use Case 4: Financial Services Regulatory Compliance

**The Problem:** Bank requires separation of duties — junior engineers can't modify production configuration. Manual enforcement relies on PR review (post-implementation, already wasted effort).

**The Solution:** `PreToolUse` hook enforces role-based permissions:

```bash
#!/bin/bash
INPUT=$(cat)
USER_ROLE=${COPILOT_USER_ROLE:-"junior"}  # Set via environment
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // .tool_input.files[0] // empty')

# Junior engineers can't edit production configs
if [ "$USER_ROLE" = "junior" ] && [[ "$FILE_PATH" =~ ^(production/|config/prod) ]]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Junior engineers require senior approval for production changes"}}'
  exit 0
fi

echo '{"continue":true}'
exit 0
```

**Outcome:**
- Policy enforcement: Post-review → Real-time prevention
- Wasted effort: 2-3 hours/week → 0 (blocked immediately)
- Audit compliance: Manual verification → Automated log evidence
- Regulatory risk: Medium → Low (technical controls enforced)

---

## ✅ What You Can Do Today

**Immediate Actions (15 minutes):**
- [ ] Review [official hooks documentation](https://code.visualstudio.com/docs/copilot/customization/hooks) to understand lifecycle events and configuration
- [ ] Create `.github/hooks/` directory in your test repository
- [ ] Copy the [example security-check script](#preventive-enforcement-with-pretooluse) to start with basic protection
- [ ] Try the `/hooks` slash command in VS Code chat to configure hooks interactively

**Short-Term Implementation (1-2 hours):**
- [ ] Deploy security enforcement hooks with dangerous command blocking
- [ ] Set up `SessionStart` context injection for project-specific information
- [ ] Test hooks locally: `echo '{"tool_name":"runTerminalCommand","tool_input":{"command":"rm -rf /"}}' | ./security-check.sh`
- [ ] Verify `PreToolUse` hook successfully denies dangerous operations

**Advanced Exploration (2-4 hours):**
- [ ] Implement complete audit trail with all 8 lifecycle hooks logging to JSON Lines
- [ ] Use `SubagentStart`/`SubagentStop` hooks to track nested agent usage
- [ ] Use `Stop` hook to enforce test suite execution before session completion
- [ ] Integrate with external systems (Slack, Datadog, PagerDuty) for alerts
- [ ] Add environment-aware policies (stricter in production, `"ask"` in staging, permissive in dev)
- [ ] Set up query dashboards: tool usage stats, violation trends, subagent metrics

**Next Steps After Completion:**
1. ✅ Complete the immediate actions above
2. 📖 Review related talk: [Terminal Sandboxing](../terminal-sandboxing/) for complementary OS-level controls
3. 💬 Share results with your security/compliance team
4. 🚀 Expand to organization-wide hook policies

---

## Related Patterns

### Complementary Features

- **[Terminal Sandboxing](../terminal-sandboxing/)** — OS-level execution controls (network/filesystem restrictions) that complement hook-based governance
- **[Custom Instructions](../../workshop/01-instructions/)** — Define agent behavior guidelines that hooks enforce through validation
- **[Agent Skills](../../workshop/04-agent-skills/)** — Domain-specific capabilities with hook-based audit trails
- **[Enterprise Patterns](../enterprise-patterns/)** — Organization-wide governance frameworks using hooks at scale

### Decision Flow

**If this talk doesn't fit your needs:**

```
Q: What's your governance requirement?
├─ "Block network/filesystem access at OS level"
│  → See: Terminal Sandboxing (blanket restrictions)
│
├─ "Guide agent behavior without enforcement"
│  → See: Custom Instructions (suggestions, not validation)
│
└─ "Organization-wide policy management"
   → See: Enterprise Patterns (centralized governance)
```

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for complete navigation help.

---

## 📚 Official Documentation

**Primary Documentation:**
- 📖 **[Agent Hooks in VS Code](https://code.visualstudio.com/docs/copilot/customization/hooks)** — Complete configuration reference, input/output formats, usage scenarios, and troubleshooting
- 📖 **[About Hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks)** — Core concepts, hook types, and when to use each
- 📖 **[Hooks Configuration Reference](https://docs.github.com/en/copilot/reference/hooks-configuration)** — Complete JSON schema, input/output formats, and script examples
- 📖 **[Using Hooks with GitHub Copilot Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks)** — Step-by-step setup, troubleshooting, and debugging

**Additional Resources:**
- 💬 [GitHub Community Discussions](https://github.com/orgs/community/discussions) — Get help and share experiences
- 📹 [GitHub Copilot Documentation](https://docs.github.com/en/copilot) — Complete product documentation

---

## 🎭 Behind the Scenes

*For those who want to understand the deeper mechanics*

### Hook Execution Environment

**Environment variables available to hooks:**
- `GITHUB_TOKEN`: For GitHub API calls (read-only access to repository)
- `GITHUB_REPOSITORY`: Repository name (e.g., `owner/repo`)
- `GITHUB_ACTOR`: User triggering the session
- Custom variables via `env` field in hook configuration

**Working directory:**
- Specified by `cwd` field (relative to repository root)
- Defaults to repository root if not specified
- Scripts can access any file in the repository

**Security context:**
- Hooks run with same permissions as VS Code
- No elevated privileges by default
- Use environment variables for secrets (never hardcode)
- Review hook scripts carefully, especially from untrusted sources
- Use `chat.tools.edits.autoApprove` to prevent agents from editing hook scripts without manual approval

### Input JSON Schema

All hooks receive JSON via stdin with common fields plus event-specific additions:

**Common fields (all hooks):**
```typescript
{
  timestamp: string;           // ISO 8601 timestamp
  cwd: string;                // Current working directory
  sessionId: string;          // Session identifier
  hookEventName: string;      // Event name (e.g., "PreToolUse")
  transcript_path: string;    // Path to conversation transcript
}
```

**`PreToolUse` additions:**
```typescript
{
  tool_name: string;          // Tool being invoked (e.g., "editFiles", "runTerminalCommand")
  tool_input: object;         // Tool parameters as JSON object
  tool_use_id: string;        // Unique tool invocation identifier
}
```

**`PostToolUse` additions:**
```typescript
{
  tool_name: string;          // Tool that was invoked
  tool_input: object;         // Tool parameters
  tool_use_id: string;        // Unique tool invocation identifier
  tool_response: string;      // Tool execution result
}
```

**`SessionStart` addition:**
```typescript
{
  source: "new";              // How the session was started (currently always "new")
}
```

**`Stop` addition:**
```typescript
{
  stop_hook_active: boolean;  // True when agent is continuing from a previous stop hook
}
```

**`SubagentStart` additions:**
```typescript
{
  agent_id: string;           // Unique subagent identifier
  agent_type: string;         // Agent name (e.g., "Plan")
}
```

**`SubagentStop` additions:**
```typescript
{
  agent_id: string;           // Unique subagent identifier
  agent_type: string;         // Agent name (e.g., "Plan")
  stop_hook_active: boolean;  // True when subagent is continuing from a previous stop hook
}
```

**`UserPromptSubmit` addition:**
```typescript
{
  prompt: string;             // User's submitted prompt text
}
```

**`PreCompact` addition:**
```typescript
{
  trigger: "auto";            // How compaction was triggered
}
```

### Output JSON Schema

**Common output format (all hooks):**
```typescript
{
  continue?: boolean;          // Set to false to stop processing (default: true)
  stopReason?: string;         // Reason for stopping (shown to the model)
  systemMessage?: string;      // Message displayed to the user
}
```

**`PreToolUse` hookSpecificOutput:**
```typescript
{
  hookSpecificOutput: {
    hookEventName: "PreToolUse";
    permissionDecision: "allow" | "deny" | "ask";
    permissionDecisionReason?: string;
    updatedInput?: object;        // Modified tool input
    additionalContext?: string;   // Extra context for the model
  }
}
```

**`PostToolUse` hookSpecificOutput:**
```typescript
{
  decision?: "block";           // Block further processing
  reason?: string;              // Reason for blocking
  hookSpecificOutput: {
    hookEventName: "PostToolUse";
    additionalContext?: string;  // Extra context injected into conversation
  }
}
```

**`SessionStart` / `SubagentStart` hookSpecificOutput:**
```typescript
{
  hookSpecificOutput: {
    hookEventName: "SessionStart" | "SubagentStart";
    additionalContext?: string;  // Context added to conversation
  }
}
```

**`Stop` / `SubagentStop` hookSpecificOutput:**
```typescript
{
  hookSpecificOutput: {
    hookEventName: "Stop" | "SubagentStop";
    decision?: "block";          // Prevent agent from stopping
    reason?: string;             // Why agent should continue (required when blocking)
  }
}
```

### Exit Code Behavior

| Exit Code | Behavior |
|-----------|----------|
| `0` | Success: VS Code parses stdout as JSON |
| `2` | Blocking error: stops processing, shows error to model |
| Other | Non-blocking warning: shows warning to user, continues processing |

### Timeout Behavior

- Default timeout: 30 seconds
- Configurable via `timeout` field
- Timeout triggers: Hook is killed, agent continues (treated as allow)
- Best practice: Set `timeout` based on expected execution time

**Timeout considerations:**
- Network calls: 60-120 seconds
- Linting/validation: 5-15 seconds
- Logging: 1-3 seconds
- Security checks: 2-5 seconds

### Multiple Hooks Execution Order

When multiple hooks are defined for the same event:
1. Execute in array order (first to last)
2. For `PreToolUse`: Most restrictive `permissionDecision` wins (`deny` > `ask` > `allow`)
3. For other events: All hooks execute regardless of errors
4. Each hook runs independently (no shared state except filesystem)

**Why This Matters:** You can layer security checks (dangerous commands → file permissions → secret scanning) with the most restrictive decision winning. For `PreToolUse`, a single `deny` from any hook blocks execution. For logging hooks, all execute even if one fails, ensuring audit completeness.

### Interactive Configuration

Use the `/hooks` slash command in VS Code chat to configure hooks through an interactive UI:

1. Type `/hooks` in the chat input and press Enter
2. Select a hook event type from the list
3. Choose an existing hook to edit or select **Add new hook** to create one
4. Select or create a hook configuration file

The command opens the hook file in the editor with your cursor positioned at the command field, ready for editing.

### Troubleshooting

**View hook diagnostics:** Right-click in the Chat view and select **Diagnostics** — look for the hooks section to see loaded hooks and any validation errors.

**View hook output:** Open the **Output** panel and select **GitHub Copilot Chat Hooks** from the channel list.

**Common issues:**
- **Hook not executing**: Verify the hook file is in `.github/hooks/` with a `.json` extension and `type` is `"command"`
- **Permission denied errors**: Ensure scripts have execute permissions (`chmod +x script.sh`)
- **Timeout errors**: Increase the `timeout` value or optimize your hook script
- **JSON parse errors**: Verify your hook script outputs valid JSON to stdout

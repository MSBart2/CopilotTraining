# Example Hook Configurations

This directory contains reference implementations of GitHub Copilot hooks for security enforcement, audit logging, and quality gates.

## Files

### Configuration Files

- **[audit-hooks.json](audit-hooks.json)** — Complete audit trail configuration with 6 lifecycle hooks (session start/end, prompts, pre/post tool use, errors)
- **[security-hooks.json](security-hooks.json)** — Security policy enforcement with command validation and directory restrictions

### Scripts

All scripts follow best practices: read JSON from stdin, use `jq` for parsing, output structured logs, return permission decisions when needed.

#### Security Scripts

- **[security-check.sh](scripts/security-check.sh)** — Validates commands against dangerous patterns (`rm -rf /`, `DROP TABLE`, etc.), denies violations
- **[directory-restrictions.sh](scripts/directory-restrictions.sh)** — Enforces file path policies (e.g., only allow edits in `src/`, `test/`, `docs/`)

#### Audit Logging Scripts

- **[log-session-start.sh](scripts/log-session-start.sh)** — Initialize session logging, create log directories
- **[log-session-end.sh](scripts/log-session-end.sh)** — Archive session, generate summary reports
- **[log-prompt.sh](scripts/log-prompt.sh)** — Capture user prompts for compliance audit trail
- **[log-tool-pre.sh](scripts/log-tool-pre.sh)** — Record tool invocations before execution
- **[log-tool-post.sh](scripts/log-tool-post.sh)** — Record tool results, track statistics, alert on failures
- **[log-error.sh](scripts/log-error.sh)** — Capture agent errors for debugging

## Usage

### Deploy Security Hooks

```bash
# Copy configuration to your repository
cp hooks/security-hooks.json /path/to/your/repo/.github/hooks/

# Copy scripts (make executable)
mkdir -p /path/to/your/repo/.github/hooks/scripts
cp hooks/scripts/security-check.sh /path/to/your/repo/.github/hooks/scripts/
cp hooks/scripts/directory-restrictions.sh /path/to/your/repo/.github/hooks/scripts/
chmod +x /path/to/your/repo/.github/hooks/scripts/*.sh

# Create logs directory
mkdir -p /path/to/your/repo/.github/hooks/logs
```

### Deploy Audit Hooks

```bash
# Copy audit configuration
cp hooks/audit-hooks.json /path/to/your/repo/.github/hooks/

# Copy all audit scripts
mkdir -p /path/to/your/repo/.github/hooks/scripts
cp hooks/scripts/log-*.sh /path/to/your/repo/.github/hooks/scripts/
chmod +x /path/to/your/repo/.github/hooks/scripts/*.sh

# Create logs directory
mkdir -p /path/to/your/repo/.github/hooks/logs
```

## Testing Hooks Locally

Test hooks before committing by piping test input:

```bash
# Test security hook with dangerous command
echo '{
  "timestamp": 1704614600000,
  "cwd": "/tmp/test",
  "toolName": "bash",
  "toolArgs": "{\"command\":\"rm -rf /tmp/*\"}"
}' | .github/hooks/scripts/security-check.sh

# Expected output: {"permissionDecision":"deny",...}
```

```bash
# Test with safe command
echo '{
  "timestamp": 1704614600000,
  "cwd": "/tmp/test",
  "toolName": "bash",
  "toolArgs": "{\"command\":\"npm test\"}"
}' | .github/hooks/scripts/security-check.sh

# Expect exit 0 (allowed)
```

## Querying Audit Logs

The audit scripts log to JSON Lines format (`logs/audit.jsonl`), enabling programmatic queries:

```bash
# Count tool usage by type
cat .github/hooks/logs/audit.jsonl | jq -r '.toolName' | sort | uniq -c

# Find all denied operations
cat .github/hooks/logs/audit.jsonl | jq 'select(.permissionDecision == "deny")'

# Get all prompts from a specific session
cat .github/hooks/logs/audit.jsonl | jq 'select(.event == "userPromptSubmitted")'

# Export to CSV for reporting
cat .github/hooks/logs/audit.jsonl | jq -r '[.timestamp, .event, .toolName // "N/A"] | @csv' > audit-report.csv
```

## Customization

### Adding New Dangerous Patterns

Edit `scripts/security-check.sh` and add patterns to the `DANGEROUS_PATTERNS` array:

```bash
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "DROP TABLE"
  "your-pattern-here"
)
```

### Changing Allowed Directories

Edit `scripts/directory-restrictions.sh`:

```bash
ALLOWED_PATTERNS=(
  "^src/"
  "^your-directory/"
)
```

### Integrating Alerts

Modify `scripts/log-tool-post.sh` to send notifications on failures:

```bash
if [ "$RESULT_TYPE" = "failure" ]; then
  curl -X POST https://hooks.slack.com/... \
    -d "{\"text\":\"Agent tool failed: $TOOL_NAME\"}"
fi
```

## Performance Notes

- All scripts use background logging (`>> file 2>&1 &`) to avoid blocking agent execution
- Security checks run synchronously (by design) but complete in <100ms for typical commands
- Default timeouts: 10-15 seconds (can be increased in JSON config if needed)
- Optimize expensive validation by caching results or using early exit patterns

## See Also

- **[Module 12: Copilot Hooks](../../../12-copilot-hooks/README.md)** — Complete training module with exercises
- **[GitHub Docs: Hooks Configuration](https://docs.github.com/en/copilot/reference/hooks-configuration)** — Official reference
- **[Exercise 12.1](../../../12-copilot-hooks/exercise-12.1.md)** — Security policy enforcement walkthrough
- **[Exercise 12.2](../../../12-copilot-hooks/exercise-12.2.md)** — Compliance audit trail setup
- **[Exercise 12.3](../../../12-copilot-hooks/exercise-12.3.md)** — Quality gate integration

---

**Questions?** These are reference implementations—adapt them to your organization's security policies, compliance requirements, and workflow needs.

Create a draft PR that adds an agentic workflow using these instructions:
- https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/create-agentic-workflow.md
- https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/maintainer.md

The purpose of the workflow is: Classify and label new issues

First, analyze this repository so the workflow is optimized for it:
- Read the README, AGENTS.md (and any CONTRIBUTING or docs files) to understand the project purpose and conventions
- Identify the languages, package managers, build/test/lint commands and CI setup actually used
- Note repository conventions such as labels, issue/PR templates and branch naming
- Use those findings to tailor the workflow prompt, tools, and instructions to this repository

## Intent
Triage new issues: label language, type, and severity, and comment with cited evidence from the code.

Requirements:
- Name: issue-triage
- Engine: copilot
- Triggers: when a new issue is opened
- Allowed outputs: add comments on issues/PRs, add labels
- Choose an appropriate kebab-case filename for the new .github/workflows/*.md file
- Include explicit boundary constraints in the workflow prompt, for example: Use DO NOT constraints (e.g., 'Do NOT close issues') — 61% more likely to be healthy
- Additional intent for this workflow, provided by the user: Triage new issues: label language, type, and severity, and comment with cited evidence from the code.
- Derive a single measurable "operational value" statement from that intent — one sentence describing the concrete outcome a successful run must deliver — and register it as the workflow grader: add it as the first entry of an `evals:` frontmatter block with `id: operational_value` and a question that asks whether the agent output demonstrates that value was delivered
- Add BinEval evaluations for the intent: 2-4 further `evals:` questions that each verify one observable property of the intent, phrased as falsifiable YES/NO questions answerable from the agent output alone (no compound questions, unique ids, YES means success)
- Reflect the intent in the workflow prompt itself so the agent optimizes for it at run time
- Keep a `safe-outputs:` block in the workflow so the evals judge can read `agent_output.json`
- Follow the workflow-specific guidance, for example: Prefer event-driven triggers like issues and schedule over manual-only execution; Include explicit label taxonomy in your prompt so the agent knows valid options

The workflow should be saved as a new Markdown file in .github/workflows/.
Create a pull request with the generated agentic workflow files.

## Suggested workflow file

Use this generated draft as a starting point for the new `.github/workflows/*.md` file, adapting it to the repository as needed:

```markdown
---
name: issue-triage
description: Classify and label new issues
on:
  issues:
    types: [opened]
permissions:
  contents: read
engine: copilot
safe-outputs:
  add-comment:
  add-labels:
timeout-minutes: 30
---

Let the agent generate the detailed issue triage prompt for this repository...
```
Name the file .github/workflows/triage-wizard.md. Also add a workflow_dispatch trigger with an issue_number input so it can run on existing issues. Do not change any other workflow.
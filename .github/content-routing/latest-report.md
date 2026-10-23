# Content refresh routing inbox

Generated: 2026-10-22T19:27:03.243Z
Feed last built: 2026-10-22T16:00:17.000Z
Window starts: 2026-09-16T00:00:00.000Z

Scanned 213 entries: 60 need review, 0 were previously adjudicated, 57 had no talk match, 96 were out of scope.

> Candidate ranking creates awareness. A talk receives work only after editorial adjudication finds that the announcement changes its thesis, workflow, decision guidance, demo, setup, status, or boundary.

## Visual Studio Code 1.143

- Published: 2026-10-21
- Source: https://code.visualstudio.com/updates/v1_143
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## GitHub CLI: Opt in to expiring, auto-refreshing OAuth tokens

- Published: 2026-10-21
- Source: https://github.blog/changelog/2026-10-21-github-cli-opt-in-to-expiring-auto-refreshing-oauth-tokens
- Disposition: **review**
- Topics: copilot-cli

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/copilot-acp` | copilot-cli: depends | Keep CLI server and ACP protocol integration behavior accurate. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references | Reference CLI behavior only where it changes cross-client agent continuity. |

## Bulk migrate branch protections to rulesets for a repository

- Published: 2026-10-20
- Source: https://github.blog/changelog/2026-10-20-bulk-migrate-branch-protections-to-rulesets-for-a-repository
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Updates to GitHub secret scanning

- Published: 2026-10-20
- Source: https://github.blog/changelog/2026-10-20-updates-to-github-secret-scanning
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Dependabot alerts REST API now includes dependency versions

- Published: 2026-10-20
- Source: https://github.blog/changelog/2026-10-20-dependabot-alerts-rest-api-now-includes-dependency-versions
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## GitHub package firewall in public preview

- Published: 2026-10-20
- Source: https://github.blog/changelog/2026-10-20-github-package-firewall-in-public-preview
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Dependabot now supports npm 12, pnpm 11 and 12, and Bun 1.4

- Published: 2026-10-20
- Source: https://github.blog/changelog/2026-10-20-dependabot-now-supports-npm-12-pnpm-11-and-12-and-bun-1-4
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Copilot model policy API for enterprise, orgs, and teams

- Published: 2026-10-19
- Source: https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams
- Disposition: **review**
- Topics: model-choice, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs<br>copilot-app: governs | Cover organization model policy, cost, access, and data-governance consequences.<br>Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |

## GitHub Copilot models deprecated on October 19, 2026

- Published: 2026-10-19
- Source: https://github.blog/changelog/2026-10-19-github-copilot-models-deprecated-on-october-19-2026
- Disposition: **review**
- Topics: model-choice

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs | Cover organization model policy, cost, access, and data-governance consequences. |

## Some Git over HTTPS may temporarily require authentication

- Published: 2026-10-19
- Source: https://github.blog/changelog/2026-10-19-some-git-over-https-may-temporarily-require-authentication
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## CodeQL changes for macOS 27, Xcode 27, and Swift 6.4

- Published: 2026-10-19
- Source: https://github.blog/changelog/2026-10-19-codeql-changes-for-macos-27-xcode-27-and-swift-6-4
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Open source license compliance generally available

- Published: 2026-10-16
- Source: https://github.blog/changelog/2026-10-16-open-source-license-compliance-generally-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Xcode 27 runner image generally available

- Published: 2026-10-16
- Source: https://github.blog/changelog/2026-10-15-xcode-27-runner-image-generally-available
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## Multi-repository support and other improvements for GitHub in Slack and Teams

- Published: 2026-10-16
- Source: https://github.blog/changelog/2026-10-15-copilot-in-slack-and-teams-adds-model-and-repository-updates
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Download GitHub Code Quality license usage as a CSV

- Published: 2026-10-15
- Source: https://github.blog/changelog/2026-10-15-download-github-code-quality-license-usage-as-a-csv
- Disposition: **review**
- Topics: code-quality

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/pr-trust-stack` | code-quality: explains (via copilot-code-quality) | Explain Code Quality setup, coverage, findings, rulesets, billing, and product boundaries. |
| [ ] | `tech-talks/agentic-sdlc` | code-quality: applies | Keep quality gates and coverage automation accurate. |

## Upcoming deprecation of selected GitHub Copilot models in mid-November

- Published: 2026-10-15
- Source: https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november
- Disposition: **review**
- Topics: model-choice

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs | Cover organization model policy, cost, access, and data-governance consequences. |

## AI Scan for pull requests generally available

- Published: 2026-10-15
- Source: https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Agentic autofix for code scanning alerts general availability

- Published: 2026-10-15
- Source: https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Email notifications for repository push events have been retired

- Published: 2026-10-15
- Source: https://github.blog/changelog/2026-10-15-email-notifications-for-repository-push-events-have-been-retired
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Modernizing the VS Code UI

- Published: 2026-10-15
- Source: https://code.visualstudio.com/blogs/2026/10/15/modern-ui
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## HydraFusion updates and new Max option

- Published: 2026-10-14
- Source: https://github.blog/changelog/2026-10-14-hydrafusion-updates-and-new-max-option
- Disposition: **review**
- Topics: vscode-copilot, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |
| [ ] | `tech-talks/enterprise-patterns` | copilot-app: governs | Cover app access policy, managed settings, and organization rollout. |

## Visual Studio Code 1.142

- Published: 2026-10-14
- Source: https://code.visualstudio.com/updates/v1_142
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## GitHub Actions workflow lockfiles in public preview

- Published: 2026-10-14
- Source: https://github.blog/changelog/2026-10-14-github-actions-workflow-lockfiles-in-public-preview
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## GitHub App improvements for least privilege and management

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-github-app-improvements-for-least-privilege-and-management
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Gemini 4 Argon in GitHub Copilot

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot
- Disposition: **review**
- Topics: model-choice, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs<br>copilot-app: governs | Cover organization model policy, cost, access, and data-governance consequences.<br>Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |

## Audit GitHub Code Quality finding dismissals and reopenings

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-audit-github-code-quality-finding-dismissals-and-reopenings
- Disposition: **review**
- Topics: code-quality

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/pr-trust-stack` | code-quality: explains (via copilot-code-quality) | Explain Code Quality setup, coverage, findings, rulesets, billing, and product boundaries. |
| [ ] | `tech-talks/agentic-sdlc` | code-quality: applies | Keep quality gates and coverage automation accurate. |

## Secret scanning blocks Anthropic keys by default, adds Salesforce

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-secret-scanning-blocks-anthropic-keys-by-default-adds-salesforce
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Enterprise managed settings enforcement updates

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates
- Disposition: **review**
- Topics: copilot-cli, customization, enterprise-governance

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | customization: governs<br>enterprise-governance: explains | Cover organization-wide distribution and enforcement of configuration.<br>Explain enterprise rollout, policy, controls, measurement, and federated governance. |
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains<br>enterprise-governance: governs | Explain current CLI commands, session lifecycle, steering, and remote workflows.<br>Mention managed settings only when they alter CLI behavior or deployment. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references<br>enterprise-governance: governs | Reference CLI behavior only where it changes cross-client agent continuity.<br>Mention enterprise controls only when they constrain editor capabilities. |
| [ ] | `tech-talks/copilot-primitives` | customization: explains | Explain instructions, skills, prompts, and agents as distinct configuration primitives. |
| [ ] | `tech-talks/copilot-hooks` | customization: applies | Keep hook availability, events, and governance behavior accurate. |

## Improved detection for withdrawn Dependabot alerts

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-improved-detection-for-withdrawn-dependabot-alerts
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Search and filter for budgets now available

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-search-and-filter-for-budgets-now-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Code scanning AI Scan metrics in security overview

- Published: 2026-10-13
- Source: https://github.blog/changelog/2026-10-13-code-scanning-ai-scan-metrics-in-security-overview
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Client telemetry user attribution and configurable capture

- Published: 2026-10-12
- Source: https://github.blog/changelog/2026-10-12-client-telemetry-user-attribution-and-configurable-capture
- Disposition: **review**
- Topics: customization

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-primitives` | customization: explains | Explain instructions, skills, prompts, and agents as distinct configuration primitives. |
| [ ] | `tech-talks/copilot-hooks` | customization: applies | Keep hook availability, events, and governance behavior accurate. |
| [ ] | `tech-talks/copilot-plugins` | customization: applies | Explain packaging and distributing customization bundles. |
| [ ] | `tech-talks/enterprise-patterns` | customization: governs | Cover organization-wide distribution and enforcement of configuration. |

## Push attribution for commits in limited public preview

- Published: 2026-10-12
- Source: https://github.blog/changelog/2026-10-12-push-attribution-public-preview
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Anonymous organization-level registries for Dependabot

- Published: 2026-10-12
- Source: https://github.blog/changelog/2026-10-12-anonymous-organization-level-registries-for-dependabot
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## New controls and chat improvements in Copilot for JetBrains

- Published: 2026-10-10
- Source: https://github.blog/changelog/2026-10-10-new-controls-and-chat-improvements-in-copilot-for-jetbrains
- Disposition: **review**
- Topics: mcp

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-azure-mcp` | mcp: applies | Keep Azure MCP installation, trust, tools, and workflow guidance accurate. |
| [ ] | `tech-talks/mcp-apps` | mcp: depends | Keep MCP Apps protocol, host support, security, and UI behavior accurate. |
| [ ] | `tech-talks/copilot-plugins` | mcp: depends | Keep plugin-bundled MCP configuration and portability behavior accurate. |
| [ ] | `tech-talks/copilot-primitives` | mcp: references | Clarify MCP's boundary relative to repository customization primitives. |

## GitHub Copilot weekly releases — October 5

- Published: 2026-10-09
- Source: https://github.blog/changelog/2026-10-09-github-copilot-weekly-releases-october-5
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## CodeQL 2.27.2 improves C++, Go, Rust, and JavaScript analysis

- Published: 2026-10-09
- Source: https://github.blog/changelog/2026-10-09-codeql-2-27-2-improves-c-go-rust-and-javascript-analysis
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Copilot code review: New organization billing options and controls

- Published: 2026-10-08
- Source: https://github.blog/changelog/2026-10-08-copilot-code-review-new-organization-billing-options-and-controls
- Disposition: **review**
- Topics: copilot-code-review

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/pr-trust-stack` | copilot-code-review: explains (via copilot-code-review) | Explain code-review configuration, depth, customization, findings, and response workflows. |
| [ ] | `tech-talks/agentic-sdlc` | copilot-code-review: applies | Keep the automated review and CI trust-factory workflow accurate. |
| [ ] | `tech-talks/copilot-web` | copilot-code-review: depends | Keep coding-agent response-to-review workflows accurate. |

## Triage role users or higher can now archive pull requests

- Published: 2026-10-08
- Source: https://github.blog/changelog/2026-10-08-triage-role-users-or-higher-can-now-archive-pull-requests
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Screen readers can navigate timelines as lists

- Published: 2026-10-08
- Source: https://github.blog/changelog/2026-10-08-screen-readers-can-navigate-timelines-as-lists
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Draft pull requests count toward pull request limits

- Published: 2026-10-08
- Source: https://github.blog/changelog/2026-10-08-draft-pull-requests-count-toward-pull-request-limits
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Claude Haiku 5.5 in GitHub Copilot

- Published: 2026-10-07
- Source: https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot
- Disposition: **review**
- Topics: model-choice, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs<br>copilot-app: governs | Cover organization model policy, cost, access, and data-governance consequences.<br>Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |

## Visual Studio Code 1.141

- Published: 2026-10-07
- Source: https://code.visualstudio.com/updates/v1_141
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## Purpose-built model for leaked secret detection

- Published: 2026-10-07
- Source: https://github.blog/changelog/2026-10-07-purpose-built-model-for-leaked-secret-detection
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Local sandboxing for GitHub Copilot now generally available

- Published: 2026-10-07
- Source: https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available
- Disposition: **review**
- Topics: vscode-copilot, model-choice, copilot-cli, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains<br>model-choice: explains<br>copilot-cli: references | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model.<br>Explain editor model choice, provider setup, local models, and sign-in boundaries.<br>Reference CLI behavior only where it changes cross-client agent continuity. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies<br>copilot-cli: explains | Explain model selection, provider configuration, and reasoning controls for CLI sessions.<br>Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs<br>copilot-app: governs | Cover organization model policy, cost, access, and data-governance consequences.<br>Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |

## Discover local models in GitHub Copilot CLI

- Published: 2026-10-07
- Source: https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli
- Disposition: **review**
- Topics: copilot-cli

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/copilot-acp` | copilot-cli: depends | Keep CLI server and ACP protocol integration behavior accurate. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references | Reference CLI behavior only where it changes cross-client agent continuity. |

## Update your IDE to restore agent activity in Copilot usage metrics

- Published: 2026-10-06
- Source: https://github.blog/changelog/2026-10-06-update-your-ide-to-restore-agent-activity-in-copilot-usage-metrics
- Disposition: **review**
- Topics: enterprise-governance

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | enterprise-governance: explains | Explain enterprise rollout, policy, controls, measurement, and federated governance. |
| [ ] | `tech-talks/vscode-latest` | enterprise-governance: governs | Mention enterprise controls only when they constrain editor capabilities. |
| [ ] | `tech-talks/exec-strategy` | enterprise-governance: applies | Keep board-level investment and control guidance grounded in available evidence. |
| [ ] | `tech-talks/copilot-cli` | enterprise-governance: governs | Mention managed settings only when they alter CLI behavior or deployment. |

## Stacked pull requests generally available

- Published: 2026-10-06
- Source: https://github.blog/changelog/2026-10-06-stacked-pull-requests-generally-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Code scanning AI Scan enablement status in security overview

- Published: 2026-10-06
- Source: https://github.blog/changelog/2026-10-06-code-scanning-ai-scan-enablement-status-in-security-overview
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Secret scanning adds detectors for Lovable, Supabase, and more

- Published: 2026-10-05
- Source: https://github.blog/changelog/2026-10-05-secret-scanning-adds-detectors-for-lovable-supabase-and-more
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Stateless GitHub App installation tokens rolled out

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-stateless-github-app-installation-tokens-rolled-out
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Copilot code review: API support and new default effort level

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level
- Disposition: **review**
- Topics: copilot-code-review

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/pr-trust-stack` | copilot-code-review: explains (via copilot-code-review) | Explain code-review configuration, depth, customization, findings, and response workflows. |
| [ ] | `tech-talks/agentic-sdlc` | copilot-code-review: applies | Keep the automated review and CI trust-factory workflow accurate. |
| [ ] | `tech-talks/copilot-web` | copilot-code-review: depends | Keep coding-agent response-to-review workflows accurate. |

## Unvalidated npm trusted publishing configurations now expire

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-unvalidated-npm-trusted-publishing-configurations-now-expire
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## npm staged publishing now supports creating new packages

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-npm-staged-publishing-now-supports-creating-new-packages
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Selected models in GitHub Copilot deprecated

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-selected-models-in-github-copilot-deprecated
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## GitHub Copilot weekly releases — September 28

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-github-copilot-weekly-releases-september-28
- Disposition: **review**
- Topics: vscode-copilot, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |
| [ ] | `tech-talks/enterprise-patterns` | copilot-app: governs | Cover app access policy, managed settings, and organization rollout. |

## New fields for SecurityAdvisory GraphQL API

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-new-fields-for-securityadvisory-graphql-api
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Confidential comments on repository security advisories

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-confidential-comments-on-repository-security-advisories
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Repository security advisory comments API in public preview

- Published: 2026-10-02
- Source: https://github.blog/changelog/2026-10-02-repository-security-advisory-comments-api-in-public-preview
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Rate limits for private vulnerability reports

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-rate-limits-for-private-vulnerability-reports
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Structured forms for private vulnerability reports

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-structured-forms-for-private-vulnerability-reports
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## GitHub Copilot can now interact with desktop apps with computer use

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-github-copilot-can-now-interact-with-desktop-apps
- Disposition: **review**
- Topics: copilot-cli, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/enterprise-patterns` | copilot-app: governs | Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/copilot-acp` | copilot-cli: depends | Keep CLI server and ACP protocol integration behavior accurate. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references | Reference CLI behavior only where it changes cross-client agent continuity. |

## GitHub Actions: macOS 14 runner image retirement

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-github-actions-macos-14-runner-image-retirement
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## GitHub Copilot in VS Code, September 2026 releases

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-github-copilot-in-vs-code-september-2026-releases
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## Accessibility statements highlighted on repository overview

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-accessibility-statements-highlighted-on-repository-overview
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Actions retention now covers checks, runs, and statuses

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-actions-retention-now-covers-checks-runs-and-statuses
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## Scheduled code scanning skips inactive repositories

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-scheduled-code-scanning-skips-inactive-repositories
- Disposition: **review**
- Topics: code-quality

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/pr-trust-stack` | code-quality: explains (via copilot-code-quality) | Explain Code Quality setup, coverage, findings, rulesets, billing, and product boundaries. |
| [ ] | `tech-talks/agentic-sdlc` | code-quality: applies | Keep quality gates and coverage automation accurate. |

## Code coverage uploads no longer fail CI for new branches

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-code-coverage-uploads-no-longer-fail-ci-for-new-branches
- Disposition: **review**
- Topics: code-quality

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-sdlc` | code-quality: applies | Keep quality gates and coverage automation accurate. |
| [ ] | `tech-talks/pr-trust-stack` | code-quality: explains (via copilot-code-quality) | Explain Code Quality setup, coverage, findings, rulesets, billing, and product boundaries. |

## Dynamic workflows in Copilot CLI and the Copilot app

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app
- Disposition: **review**
- Topics: copilot-cli, copilot-app, copilot-sdk

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-acp` | copilot-cli: depends<br>copilot-sdk: depends | Keep CLI server and ACP protocol integration behavior accurate.<br>Distinguish ACP integration from direct SDK embedding. |
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references<br>copilot-sdk: applies | Reference CLI behavior only where it changes cross-client agent continuity.<br>Explain how the SDK underpins portable VS Code agent infrastructure. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app)<br>copilot-sdk: depends (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows.<br>Keep app harness and runtime claims accurate. |
| [ ] | `tech-talks/copilot-sdk` | copilot-sdk: explains | Explain SDK runtime, APIs, authentication, tools, models, and production integration. |

## New dashboard experience now the default

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-new-dashboard-experience-now-the-default
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## GitHub async merge API generally available

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-github-async-merge-api-generally-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Actions Runner Controller release 0.15.0

- Published: 2026-10-01
- Source: https://github.blog/changelog/2026-10-01-actions-runner-controller-release-0-15-0
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## Opt-in dist-tag permissions for npm trusted publishing

- Published: 2026-09-30
- Source: https://github.blog/changelog/2026-09-30-opt-in-dist-tag-permissions-for-npm-trusted-publishing
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Announcing: Azure canvases for GitHub Copilot

- Published: 2026-09-30
- Source: https://azure.microsoft.com/updates?id=573385
- Disposition: **review**
- Topics: copilot-sdk

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-sdk` | copilot-sdk: explains | Explain SDK runtime, APIs, authentication, tools, models, and production integration. |
| [ ] | `tech-talks/vscode-latest` | copilot-sdk: applies | Explain how the SDK underpins portable VS Code agent infrastructure. |
| [ ] | `tech-talks/copilot-acp` | copilot-sdk: depends | Distinguish ACP integration from direct SDK embedding. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-sdk: depends (via copilot-app) | Keep app harness and runtime claims accurate. |

## Visual Studio Code 1.140

- Published: 2026-09-30
- Source: https://code.visualstudio.com/updates/v1_140
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## GitHub Advanced Security trials for GitHub Team

- Published: 2026-09-30
- Source: https://github.blog/changelog/2026-09-30-github-advanced-security-trials-for-github-team
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## HydraFusion in VS Code and the GitHub Copilot app

- Published: 2026-09-30
- Source: https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app
- Disposition: **review**
- Topics: vscode-copilot, copilot-cli, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains<br>copilot-cli: references | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model.<br>Reference CLI behavior only where it changes cross-client agent continuity. |
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## X25519-only TLS ends for GHE.com on October 7

- Published: 2026-09-30
- Source: https://github.blog/changelog/2026-09-30-x25519-only-tls-ends-for-ghe-com-on-september-15
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Repository custom runner settings for Dependabot

- Published: 2026-09-29
- Source: https://github.blog/changelog/2026-09-29-repository-custom-runner-settings-for-dependabot
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Bring business context with external custom properties

- Published: 2026-09-29
- Source: https://github.blog/changelog/2026-09-29-bring-business-context-with-external-custom-properties
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## [Launched] Generally Available: SQL Formatter

- Published: 2026-09-29
- Source: https://azure.microsoft.com/updates?id=571872
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## GPT-6.1 Sol in GitHub Copilot

- Published: 2026-09-29
- Source: https://github.blog/changelog/2026-09-29-gpt-6-1-sol-in-github-copilot
- Disposition: **review**
- Topics: copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/enterprise-patterns` | copilot-app: governs | Cover app access policy, managed settings, and organization rollout. |

## Visual Studio September Update – Power Your Workflow with Your Model

- Published: 2026-09-29
- Source: https://devblogs.microsoft.com/visualstudio/visual-studio-september-update-power-your-workflow-with-your-model/
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Self-hosted runner version enforcement date has moved

- Published: 2026-09-28
- Source: https://github.blog/changelog/2026-09-28-self-hosted-runner-version-enforcement-date-has-moved
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## Claude Sonnet 5.5 in GitHub Copilot

- Published: 2026-09-28
- Source: https://github.blog/changelog/2026-09-28-claude-sonnet-5-5-in-github-copilot
- Disposition: **review**
- Topics: model-choice, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs<br>copilot-app: governs | Cover organization model policy, cost, access, and data-governance consequences.<br>Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |

## Enterprise managed settings in-product validator

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-enterprise-managed-settings-in-product-validator
- Disposition: **review**
- Topics: customization, enterprise-governance

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | customization: governs<br>enterprise-governance: explains | Cover organization-wide distribution and enforcement of configuration.<br>Explain enterprise rollout, policy, controls, measurement, and federated governance. |
| [ ] | `tech-talks/copilot-primitives` | customization: explains | Explain instructions, skills, prompts, and agents as distinct configuration primitives. |
| [ ] | `tech-talks/copilot-hooks` | customization: applies | Keep hook availability, events, and governance behavior accurate. |
| [ ] | `tech-talks/copilot-plugins` | customization: applies | Explain packaging and distributing customization bundles. |
| [ ] | `tech-talks/copilot-cli` | enterprise-governance: governs | Mention managed settings only when they alter CLI behavior or deployment. |

## Usage metrics API adds pull request review stages

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages
- Disposition: **review**
- Topics: enterprise-governance

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | enterprise-governance: explains | Explain enterprise rollout, policy, controls, measurement, and federated governance. |
| [ ] | `tech-talks/vscode-latest` | enterprise-governance: governs | Mention enterprise controls only when they constrain editor capabilities. |
| [ ] | `tech-talks/copilot-cli` | enterprise-governance: governs | Mention managed settings only when they alter CLI behavior or deployment. |
| [ ] | `tech-talks/exec-strategy` | enterprise-governance: applies | Keep board-level investment and control guidance grounded in available evidence. |

## Private saved views for repository issues and "Relates to" issue relationship is generally available

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-personal-saved-views-for-repository-issues-and-more
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Changes to query results in the GitHub Actions API and UI

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-changes-to-query-results-in-the-github-actions-api-and-ui
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## Agentic autofix now uses Copilot Memory

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-agentic-autofix-now-uses-copilot-memory
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## GitHub Copilot weekly releases — September 21

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-github-copilot-weekly-releases-september-21
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## Updates to GitHub Copilot for Slack and Microsoft Teams

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-updates-to-github-copilot-for-slack-and-microsoft-teams
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## CodeQL 2.27.1 adds C and C++ query and Kotlin 2.4.20 support

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-25-codeql-2-27-1-adds-c-and-c-query-and-kotlin-2-4-20-support
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Default Enablement of Copilot features for Copilot Business and Enterprise

- Published: 2026-09-25
- Source: https://github.blog/changelog/2026-09-24-default-enablement-of-copilot-features-for-copilot-business-and-enterprise
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Require proof of presence for high-impact actions

- Published: 2026-09-24
- Source: https://github.blog/changelog/2026-09-24-require-proof-of-presence-for-high-impact-actions
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Expired GitHub Actions artifacts no longer shown in UI and API

- Published: 2026-09-24
- Source: https://github.blog/changelog/2026-09-24-expired-github-actions-artifacts-no-longer-shown-in-ui-and-api
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## More ways to request and configure Copilot code reviews

- Published: 2026-09-23
- Source: https://github.blog/changelog/2026-09-23-copilot-code-review-more-ways-to-request-and-configure-reviews
- Disposition: **review**
- Topics: copilot-code-review

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/pr-trust-stack` | copilot-code-review: explains (via copilot-code-review) | Explain code-review configuration, depth, customization, findings, and response workflows. |
| [ ] | `tech-talks/agentic-sdlc` | copilot-code-review: applies | Keep the automated review and CI trust-factory workflow accurate. |
| [ ] | `tech-talks/copilot-web` | copilot-code-review: depends | Keep coding-agent response-to-review workflows accurate. |

## Node 20 is no longer available in GitHub Actions

- Published: 2026-09-23
- Source: https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions
- Disposition: **review**
- Topics: agentic-workflows

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/agentic-lifecycle` | agentic-workflows: explains (via agentic-workflows) | Explain repository-native agent workflow triggers, permissions, outputs, and safety. |
| [ ] | `tech-talks/agentic-sdlc` | agentic-workflows: depends | Keep CI/CD infrastructure and agent workflow boundaries accurate. |

## Visual Studio Code 1.139

- Published: 2026-09-23
- Source: https://code.visualstudio.com/updates/v1_139
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## Local sandboxing in the GitHub Copilot app

- Published: 2026-09-23
- Source: https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app
- Disposition: **review**
- Topics: copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/enterprise-patterns` | copilot-app: governs | Cover app access policy, managed settings, and organization rollout. |

## OpenTelemetry in the GitHub Copilot app

- Published: 2026-09-23
- Source: https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app
- Disposition: **review**
- Topics: copilot-app, customization, observability

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | copilot-app: governs<br>customization: governs<br>observability: governs | Cover app access policy, managed settings, and organization rollout.<br>Cover organization-wide distribution and enforcement of configuration.<br>Cover organization telemetry ownership, approved collectors, and controls. |
| [ ] | `tech-talks/copilot-primitives` | customization: explains<br>observability: applies (via copilot-chat-internals) | Explain instructions, skills, prompts, and agents as distinct configuration primitives.<br>Explain available diagnostics and traces for debugging Copilot interactions. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |
| [ ] | `tech-talks/vscode-latest` | observability: applies | Keep VS Code agent observability and managed export claims accurate. |
| [ ] | `tech-talks/copilot-cli` | observability: applies | Keep CLI telemetry configuration and behavior accurate. |

## New features and improvements in Copilot for JetBrains

- Published: 2026-09-23
- Source: https://github.blog/changelog/2026-09-22-new-features-and-improvements-in-copilot-for-jetbrains
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Building the new GitHub Copilot Inline Suggestions Model: Part Two

- Published: 2026-09-23
- Source: https://code.visualstudio.com/blogs/2026/09/23/building-the-github-copilot-inline-suggestions-model-part-two
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |

## Faster C++ code intelligence with whole codebase indexing

- Published: 2026-09-22
- Source: https://github.blog/changelog/2026-09-22-faster-c-code-intelligence-with-whole-codebase-indexing
- Disposition: **review**
- Topics: copilot-cli

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/copilot-acp` | copilot-cli: depends | Keep CLI server and ACP protocol integration behavior accurate. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references | Reference CLI behavior only where it changes cross-client agent continuity. |

## Claude Opus 5.5 is now available in GitHub Copilot

- Published: 2026-09-22
- Source: https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot
- Disposition: **review**
- Topics: model-choice, copilot-app

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/enterprise-patterns` | model-choice: governs<br>copilot-app: governs | Cover organization model policy, cost, access, and data-governance consequences.<br>Cover app access policy, managed settings, and organization rollout. |
| [ ] | `tech-talks/vscode-latest` | model-choice: explains | Explain editor model choice, provider setup, local models, and sign-in boundaries. |
| [ ] | `tech-talks/copilot-cli` | model-choice: applies | Explain model selection, provider configuration, and reasoning controls for CLI sessions. |
| [ ] | `tech-talks/copilot-sdk` | model-choice: applies | Keep SDK model-provider, authentication, and BYOK integration guidance accurate. |
| [ ] | `tech-talks/multi-agent-coordination` | copilot-app: explains (via copilot-app) | Explain Copilot app availability, parallel work, controls, and review workflows. |

## OpenAI's GPT-6 Sol and GPT-6 Luna now available

- Published: 2026-09-22
- Source: https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Security improvements for SSH

- Published: 2026-09-22
- Source: https://github.blog/changelog/2026-09-22-security-improvements-for-ssh
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## Deprecation notice: All-platform CodeQL bundle

- Published: 2026-09-22
- Source: https://github.blog/changelog/2026-09-22-deprecation-notice-all-platform-codeql-bundle
- Disposition: **review**
- Topics: copilot-cli

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-cli` | copilot-cli: explains | Explain current CLI commands, session lifecycle, steering, and remote workflows. |
| [ ] | `tech-talks/copilot-acp` | copilot-cli: depends | Keep CLI server and ACP protocol integration behavior accurate. |
| [ ] | `tech-talks/vscode-latest` | copilot-cli: references | Reference CLI behavior only where it changes cross-client agent continuity. |

## Refreshed repository pull requests page generally available

- Published: 2026-09-22
- Source: https://github.blog/changelog/2026-09-21-refreshed-repository-pull-requests-page-generally-available
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## GitHub Enterprise adds credential inventory exports

- Published: 2026-09-21
- Source: https://github.blog/changelog/2026-09-21-github-enterprise-adds-credential-inventory-exports
- Disposition: **no-match**

No candidate talk crossed the V1 routing threshold.

## [In preview] Public Preview: Introducing a Guided Copilot Experience for Building Azure Apps in VS Code

- Published: 2026-09-21
- Source: https://azure.microsoft.com/updates?id=572214
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## [In preview] Public Preview: Foundry Routines in Foundry Agent Service

- Published: 2026-09-18
- Source: https://azure.microsoft.com/updates?id=563536
- Disposition: **review**
- Topics: foundry

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-with-foundry` | foundry: explains | Explain when Copilot needs Foundry and how organizational knowledge is connected. |
| [ ] | `tech-talks/copilot-azure-mcp` | foundry: applies | Keep Foundry-related Azure skills and MCP workflows accurate. |
| [ ] | `tech-talks/multi-agent-coordination` | foundry: references (via agent-teams) | Reference Foundry orchestration only when it changes the multi-agent mechanism comparison. |

## [Launched] Generally Available: Enable and disable controls for Microsoft Foundry agents in Agent 365

- Published: 2026-09-18
- Source: https://azure.microsoft.com/updates?id=571826
- Disposition: **review**
- Topics: foundry

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-with-foundry` | foundry: explains | Explain when Copilot needs Foundry and how organizational knowledge is connected. |
| [ ] | `tech-talks/copilot-azure-mcp` | foundry: applies | Keep Foundry-related Azure skills and MCP workflows accurate. |
| [ ] | `tech-talks/multi-agent-coordination` | foundry: references (via agent-teams) | Reference Foundry orchestration only when it changes the multi-agent mechanism comparison. |

## [In preview] Public Preview: Network egress controls for hosted agents in Microsoft Foundry

- Published: 2026-09-18
- Source: https://azure.microsoft.com/updates?id=571821
- Disposition: **review**
- Topics: foundry

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-with-foundry` | foundry: explains | Explain when Copilot needs Foundry and how organizational knowledge is connected. |
| [ ] | `tech-talks/copilot-azure-mcp` | foundry: applies | Keep Foundry-related Azure skills and MCP workflows accurate. |
| [ ] | `tech-talks/multi-agent-coordination` | foundry: references (via agent-teams) | Reference Foundry orchestration only when it changes the multi-agent mechanism comparison. |

## [Launched] Generally Available: Publishing Microsoft Foundry agents to Microsoft 365 Copilot and Teams

- Published: 2026-09-18
- Source: https://azure.microsoft.com/updates?id=571816
- Disposition: **review**
- Topics: foundry

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/copilot-with-foundry` | foundry: explains | Explain when Copilot needs Foundry and how organizational knowledge is connected. |
| [ ] | `tech-talks/copilot-azure-mcp` | foundry: applies | Keep Foundry-related Azure skills and MCP workflows accurate. |
| [ ] | `tech-talks/multi-agent-coordination` | foundry: references (via agent-teams) | Reference Foundry orchestration only when it changes the multi-agent mechanism comparison. |

## Visual Studio Code 1.138

- Published: 2026-09-16
- Source: https://code.visualstudio.com/updates/v1_138
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## Building the new GitHub Copilot Inline Suggestions Model: Part One

- Published: 2026-09-16
- Source: https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one
- Disposition: **review**
- Topics: vscode-copilot

| Review | Talk | Relationship | Obligation |
|---|---|---|---|
| [ ] | `tech-talks/vscode-latest` | vscode-copilot: explains | Explain current VS Code Copilot capabilities, statuses, boundaries, and operating model. |
| [ ] | `tech-talks/agent-dev-loop` | vscode-copilot: depends | Keep the end-to-end VS Code agent workflow and demos executable. |
| [ ] | `tech-talks/copilot-primitives` | vscode-copilot: depends (via copilot-chat-internals) | Keep VS Code chat debugging surfaces and diagnostics accurate. |

## Anomalies

- Visual Studio Code 1.144 (Insiders): future-dated


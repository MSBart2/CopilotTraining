# Research: GitHub Code Quality

Verified facts collected from official sources before drafting `README.md`. Any regeneration of this talk should treat this file as the primary source of truth over general knowledge.

## Timeline

- **2025-10-28** — GitHub Code Quality entered public preview.
- **2026-05-26** — Code coverage on pull requests entered public preview (Cobertura XML support).
- **2026-06-16** — GitHub announced GA would land 2026-07-20.
- **2026-07-20** — GitHub Code Quality reached **general availability** and usage-based billing began.

## What the product is

- Combines **deterministic CodeQL analysis** with **AI-assisted detection** to catch maintainability and reliability issues that pure static rules miss.
- Runs in two places:
  - **On pull requests**: findings post as PR comments/annotations, grouped by maintainability vs. reliability with severity labels; **Copilot Autofix** offers one-click fixes; a reviewer approves before merge.
  - **On the default branch**: full-branch scans surface accumulated "quality debt," scored and dashboarded; findings can be assigned to the Copilot coding agent for autofix.
- **Coverage** is a first-class signal: teams upload a **Cobertura XML** report via CI, and Code Quality shows the coverage percentage and delta directly on the PR.
- **Rulesets** enforce standards: maintainability/reliability scores and coverage thresholds can gate merges. Ruleset **enforcement status** can be `evaluate` (non-blocking, simulates what would be blocked) before switching to `active` (blocking).
- **Org-wide dashboards** show maintainability/reliability scores and quality-debt backlogs across every enabled repo.
- **APIs** exist to enable/disable Code Quality on repos programmatically and to fetch findings.
- Supported languages include Java, JavaScript, TypeScript, Python, Ruby, C#, Go, and more (CodeQL-supported set).

## Availability

- Available on **GitHub Enterprise Cloud** and **GitHub Team**.
- **Not available** on GitHub Enterprise Server as of GA.
- Enterprise owners allow it via **Enterprise settings → Policies → Code Quality** → "Allow for all organizations" or "Allow for selected organizations." Org/repo admins then enable it per org or repo.
- Public preview participants (10,000+ enterprises) needed no migration step — the same enabled repos continued under the new billing model starting 2026-07-20.

## Billing (GA model)

- **$10 per active committer per month** — the base license charge.
  - An "active committer" = anyone who pushed a commit to a Code-Quality-enabled repo in the trailing 90 days.
  - Counted **once per enterprise/organization**, not per repo. Bot accounts are excluded.
- **AI-powered features** (AI-assisted detection, Copilot Autofix generation) are billed **usage-based** via AI credits (1 credit ≈ $0.01). No separate Copilot subscription is required to use these features inside Code Quality.
- **CodeQL scan compute** runs as GitHub Actions workflows and consumes **Actions minutes** (or self-hosted runner compute if configured).
- Code Quality is a **standalone charge** — it is not bundled with GitHub Advanced Security.
- Billing became active automatically on 2026-07-20 for any repo left enabled; teams needed to audit and disable low-value repos before that date to avoid surprise charges.

## Coverage setup mechanics

- Test tooling must emit a **Cobertura XML** report (pytest-cov, JaCoCo w/ Cobertura format, nyc/Istanbul `--reporter=cobertura`, etc.).
- Workflow permissions need `contents: read` and `code-quality: write` (add `pull-requests: read` for push-triggered lookups).
- Upload via the official `actions/upload-code-coverage@v1` action, specifying `file`, `language`, and an optional `label`.
- Reference: [Setting up code coverage for your repository](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage)

## Ruleset / quality gate mechanics

- Quality gates are configured as **repository rulesets** (via UI, REST API, or `gh api`), not a checked-in declarative file format.
- Relevant rule types observed in official examples:
  - `code_quality` rule type with `parameters.minimum_coverage_percentage`
  - `code_scanning` rule type with `parameters.coverage.minimum_percentage`, `parameters.tool`, `parameters.severity`
- Rulesets support `enforcement: "evaluate"` (simulate/report only) and `enforcement: "active"` (blocking).
- Reference: [Setting code quality thresholds for pull requests](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds), [Preventing code quality issues from reaching your default branch](https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge)

## Reported outcomes

- GitHub reports internally that **67.3%** of Code Quality findings are resolved before merge (self-reported; framed as directional, not a guarantee, in the README).

## Primary sources

1. https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/
2. https://docs.github.com/en/code-security/concepts/code-quality/code-quality
3. https://docs.github.com/en/billing/concepts/product-billing/github-code-quality
4. https://docs.github.com/en/code-security/how-tos/secure-at-scale/configure-enterprise-security/configure-specific-tools/allow-github-code-quality-in-enterprise
5. https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality
6. https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge
7. https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage
8. https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds
9. https://developer.microsoft.com/en-us/changelog?search=code+quality

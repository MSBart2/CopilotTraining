---
status: active
updated: 2026-09-15
---

# Research: PR Trust Stack

Verified baseline for the replacement talk that combines the distinct decisions from `copilot-code-review` and `copilot-code-quality`. This file records the evidence used, claims intentionally narrowed from the source talks, and current boundaries that require re-verification as preview features evolve.

## Research Question

Which signals should advise, which should block, and who accepts the residual risk before merge?

## Approved Portfolio Direction

- Canonical section: **Verify and Govern**
- Audience: developers, team leads, platform engineers, and security practitioners
- Level: applied
- Duration: 50 minutes
- Format: core talk
- Required evidence: one pull request with Copilot review findings, deterministic quality findings, and a coverage delta
- Required authority decisions: one accepted advisory finding, one rejected advisory finding, one blocking signal, and one named human residual-risk owner
- Rollout evidence: the same quality ruleset in `evaluate` mode and then `active` mode
- Product boundaries: Copilot code review and GitHub Code Quality retain separate enablement and billing models

The merge is approved in `.github/content-routing/portfolio-decisions.yml`. The experiment coverage matrix in `.github/content-routing/coverage/wp5-pr-trust-stack.yml` reports 72% survival for Code Review and 78% for Code Quality, above the 70% pass condition. Its row-level `reviewer` fields remain open for the later publication workflow. The source talks remain active and unchanged until the replacement, redirects, navigation, deck, and companions complete that workflow.

## Current Capability Baseline

### Copilot code review

- Copilot code review produces review comments that practitioners evaluate and disposition. Its findings are advisory by default; a finding is not inherently a deterministic merge gate.[^1][^2]
- Automatic review is configured independently from Code Quality. Repository and organization rulesets can request reviews on matching pull requests.[^2]
- Repository custom instructions can guide reviews. Path-specific instruction files narrow guidance to matching files.[^1][^2]
- Lite and Balanced are the current generally available effort names. Organization defaults can be inherited, while a reviewer can select an effort for an individual review.[^3]
- Human review retains business, architecture, product, security acceptance, and compliance accountability. Copilot findings provide evidence; they do not transfer that accountability.
- **Current preview nuance:** Copilot approvals are a public-preview capability. They may count toward required approvals only when explicitly enabled through the applicable repository, organization, or enterprise policy. Without that explicit enablement, Copilot review remains advisory and does not satisfy required approval counts.[^1]

### GitHub Code Quality

- Code Quality analyzes maintainability and reliability on pull requests and the default branch. It combines CodeQL-backed analysis with AI-assisted findings and can offer Copilot Autofix proposals.[^4]
- A human reviews and approves any proposed fix before merge.[^4]
- Coverage enters the PR through a Cobertura XML upload. The workflow requires `contents: read` and `code-quality: write`; some push-based lookup patterns also require `pull-requests: read`.[^5]
- Repository rulesets can enforce Code Quality findings or coverage thresholds. `evaluate` observes rule impact without blocking; `active` enforces the rule.[^6][^7]
- Code Quality is enabled through enterprise policy and then organization or repository controls. It is not available on GitHub Enterprise Server according to the current source baseline.[^8][^9]

## Evidence Map

| Claim or mechanism | First-party source | Confidence | Boundary or unknown |
|---|---|---|---|
| Copilot review comments are advisory by default | Copilot code review concepts[^1] | Verified | Preview approval behavior changes only after explicit policy enablement |
| Copilot approvals can count toward required approvals when enabled | Copilot code review concepts[^1] | Verified current preview | Public preview; verify availability, inheritance, and audit semantics before rollout |
| Automatic Copilot review has its own ruleset configuration | Configure automatic review[^2] | Verified | Repository and organization applicability depends on policy and plan |
| Lite and Balanced effort levels support defaults and per-review selection | GitHub changelog[^3] | Verified | Recheck names and inheritance if the product changes |
| Code Quality findings and coverage can participate in merge rulesets | Code Quality thresholds and prevention guides[^6][^7] | Verified | Exact REST payloads and available thresholds can evolve |
| Evaluate mode observes while active mode enforces | Rulesets documentation[^6][^7] | Verified | Evaluate parity with eventual active behavior needs pilot evidence on the target repositories |
| Coverage upload consumes Cobertura XML with least-privilege workflow permissions | Coverage setup guide[^5] | Verified | Polyglot and monorepo label/aggregation behavior needs repository-specific validation |
| Code Quality enablement is separate from Copilot review | Enable Code Quality and August 2026 change notice[^8][^10] | Verified | Existing edited or user-authored rulesets require an explicit audit |
| Billing remains product-specific | Copilot billing and Code Quality billing docs[^11][^12] | Verified | Prices and entitlements are intentionally omitted; consult the live billing pages |
| Code Quality availability excludes GHES in the baseline | Code Quality concepts and enablement docs[^4][^8] | Verified | Regional GitHub Enterprise Cloud availability requires tenant-level confirmation |

## Architecture: Four Layers of Trust

1. **Advisory review** — Copilot comments add contextual hypotheses and suggested changes. A developer accepts, rejects, or escalates each material finding.
2. **Approval policy** — human approvals remain the default authority. Public-preview Copilot approvals can contribute only under explicit repository, organization, or enterprise enablement.
3. **Deterministic gates** — tests, Code Quality findings, and coverage thresholds produce reproducible pass/fail evidence. Active rulesets can block merge.
4. **Residual-risk acceptance** — a named human owner confirms that the evidence is sufficient for the change's domain, security, and operational risk.

The layers are complementary. Advisory comments help locate risk; approval policy defines whose judgment counts; deterministic gates enforce agreed thresholds; human acceptance covers context that automated evidence cannot settle.

## Primary Artifact Set

### `.github/copilot-instructions.md`

Repository-owned guidance for advisory review. It identifies high-risk code paths and asks for evidence without pretending that prose guidance is a policy gate.

### `.github/workflows/pr-evidence.yml`

A CI workflow that runs tests, emits Cobertura XML, and uploads coverage to Code Quality using least-privilege permissions.

### `rulesets/pr-trust-stack.evaluate.json`

A representative ruleset payload that begins in `evaluate` mode. The exact rule schema must be exported or confirmed against the current REST API before application.

### `docs/pr-trust-record.md`

A short disposition record for accepted and rejected advisory findings, blocking results, override authority, and residual-risk acceptance.

## Source Claims Narrowed or Excluded

The source READMEs contain valuable decision coverage, but several claims are too broad or stale for the replacement:

- No universal review-time, incident-reduction, acceptance-rate, or ROI percentage is carried forward. Local pilot data is the acceptable evidence.
- No invented `.github/copilot-review.yml` schema is used. Automatic review is configured with supported GitHub settings and rulesets; review guidance lives in supported instruction files.
- Copilot review is not described as a required status check by default.
- Severity labels in advisory comments are not treated as deterministic blocking semantics.
- Compliance findings are evidence for qualified reviewers, not proof of regulatory compliance.
- Code Quality prices are omitted. Billing units, entitlement, usage, and compute remain separate concepts documented by GitHub.
- GitHub Code Quality and Copilot review remain independently enabled even when their results appear on the same pull request.

## Decision Criteria

### Advisory evidence fits when

- the concern requires repository context or semantic judgment;
- a reviewer can inspect the rationale and proposed change;
- false positives can be dispositioned without stopping all delivery; and
- the finding improves human attention without claiming final authority.

### Blocking evidence fits when

- the signal is reproducible;
- ownership and remediation are clear;
- the threshold has been observed in evaluate mode;
- bypass authority is named and audited; and
- false positives stay below the team's agreed tolerance.

### Human acceptance remains required when

- business behavior, architecture, threat model, privacy, safety, or regulatory interpretation determines acceptability;
- automated signals disagree;
- an override is requested; or
- the cost of a wrong merge exceeds the confidence supported by available evidence.

## Verification Plan

Before enabling the stack broadly:

1. Confirm current plan eligibility and availability in the target enterprise and region.
2. Confirm Copilot approval preview enablement, inheritance, required-approval counting, and audit behavior at repository, organization, and enterprise levels.
3. Export or inspect the generated ruleset schema instead of pasting an unverified payload into production.
4. Run one representative ruleset in `evaluate` mode for at least one normal delivery cycle.
5. Compare evaluated failures with the same rules in a controlled active-mode pilot.
6. Validate Cobertura aggregation and permissions for every language and test job in scope.
7. Record accepted, rejected, blocked, bypassed, and escalated outcomes in the pilot PRs.
8. Review Copilot and Code Quality billing documentation separately using live tenant data; do not infer one product's cost from the other.

## References

[^1]: [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
[^2]: [Configuring automatic code review by GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-review)
[^3]: [Copilot code review effort levels are generally available](https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/)
[^4]: [About GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality)
[^5]: [Setting up code coverage for a repository](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage)
[^6]: [Setting Code Quality thresholds for pull requests](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds)
[^7]: [Preventing Code Quality issues from reaching the default branch](https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge)
[^8]: [Enabling GitHub Code Quality](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality)
[^9]: [Allowing GitHub Code Quality in an enterprise](https://docs.github.com/en/code-security/how-tos/secure-at-scale/configure-enterprise-security/configure-specific-tools/allow-github-code-quality-in-enterprise)
[^10]: [GitHub Code Quality no longer adds Copilot as a reviewer](https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer)
[^11]: [GitHub Copilot billing](https://docs.github.com/en/billing/concepts/product-billing/github-copilot)
[^12]: [GitHub Code Quality billing](https://docs.github.com/en/billing/concepts/product-billing/github-code-quality)

---
status: active
portfolioState: deployed
updated: 2026-09-15
section: "Verify and Govern"
audience:
  - developer
  - team-lead
  - platform-engineer
  - security
level: applied
duration: 50
format: core-talk
decision: "Which signals should advise, which should block, and who accepts residual risk before merge?"
prerequisites:
  - copilot-web
related:
  - copilot-hooks
  - agentic-sdlc
references:
  - url: https://docs.github.com/en/copilot/concepts/agents/code-review
    label: "About GitHub Copilot code review"
    verified: 2026-09-15
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-review
    label: "Configure automatic Copilot code review"
    verified: 2026-09-15
  - url: https://docs.github.com/en/code-security/concepts/code-quality/code-quality
    label: "About GitHub Code Quality"
    verified: 2026-09-15
  - url: https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage
    label: "Set up code coverage"
    verified: 2026-09-15
  - url: https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds
    label: "Set Code Quality thresholds for pull requests"
    verified: 2026-09-15
---

# PR Trust Stack: Evidence and Authority Before Merge

> **The Question This Talk Answers:**
> *"Which signals should advise, which should block, and who accepts residual risk before merge?"*

**Duration:** 50 minutes | **Target Audience:** Developers, Team Leads, Platform Engineers, Security Practitioners

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|---|---|---|
| **Relevant** | 🟢 High | Pull requests increasingly combine human review, AI review, quality findings, tests, and coverage. Teams need a precise contract for what each signal means. |
| **Compelling** | 🟢 High | The key move is separating signal generation from authority: an insightful finding can remain advisory, while a narrow reproducible threshold can block. |
| **Actionable** | 🟢 High | One PR, four committed teaching artifacts, an evaluate-to-active rollout, and a disposition record make the trust policy observable and testable. |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Contextual review before human attention**
  Copilot code review can surface repository-aware findings early enough for a developer to accept, reject, or investigate before requesting final review.[^1]

- **Explicit approval semantics**
  Copilot review remains advisory by default. Public-preview Copilot approvals may count toward required approvals only when that capability is explicitly enabled through the applicable repository, organization, or enterprise policy.[^1]

- **Reproducible merge gates**
  GitHub Code Quality findings and coverage thresholds can participate in repository rulesets, with `evaluate` mode exposing impact before `active` enforcement blocks merges.[^4][^5]

- **One visible evidence record**
  Advisory findings, test results, coverage delta, gate status, human review, and any override can meet in the pull request timeline.

### The Emerging Practice

A pull request can carry more evidence than any one reviewer can generate manually: contextual observations from Copilot, repeatable checks from CI, maintainability and reliability findings from Code Quality, and an explicit coverage delta. The useful question is not whether all signals deserve equal weight. It is what authority each signal receives.

A trust stack answers that question before a deadline does. Advisory findings focus attention. Required approvals establish whose judgment counts. Deterministic checks enforce agreed thresholds. A named human accepts the remaining domain, security, and operational risk. This separation lets teams add evidence without accidentally granting authority to every tool that can post a comment.

---

## How It Works: The PR Trust Stack

### What It Does

The stack assigns every pre-merge signal a semantic role and an owner. Copilot code review contributes contextual findings; approval policy determines whether any Copilot approval counts; Code Quality and CI contribute reproducible status; a human reviewer accepts or escalates residual risk.[^1][^3]

### Key Capabilities

- **Advisory review**: Copilot comments are evaluated on their merits and explicitly dispositioned.
- **Approval policy**: Required-review rules identify which approvals count. Copilot approvals count only under explicit preview enablement.
- **Blocking evidence**: Active rulesets can enforce Code Quality findings or coverage thresholds.
- **Safe rollout**: Evaluate mode reveals candidate blocks before enforcement begins.
- **Auditable acceptance**: A concise PR record names accepted findings, rejected findings, blocks, overrides, and the residual-risk owner.

### Architecture Overview

```text
Pull request diff
    |
    +--> Copilot code review --------> advisory findings
    |                                      |
    |                                      +--> accept / reject / escalate
    |
    +--> CI tests --> Cobertura XML --> coverage delta
    |
    +--> Code Quality scan ----------> maintainability / reliability findings
                                           |
                                           +--> ruleset: evaluate or active

Required approvals + active gates + human residual-risk decision
                            |
                         merge / stop
```

The paths are independently configured. Enabling Code Quality does not enable Copilot review. Enabling Copilot review does not turn its comments into blocking checks. Enabling public-preview Copilot approvals changes required-approval semantics only within the explicit policy scope.[^2][^8]

---

## Key Artifacts

### Primary Artifacts

- **[`examples/.github/copilot-instructions.md`](examples/.github/copilot-instructions.md)** — Focuses advisory review on repository-specific risks and expected evidence.
- **[`examples/.github/workflows/pr-evidence.yml`](examples/.github/workflows/pr-evidence.yml)** — Runs tests, emits Cobertura XML, and uploads coverage with least-privilege permissions.
- **[`examples/rulesets/pr-trust-stack.evaluate.json`](examples/rulesets/pr-trust-stack.evaluate.json)** — Represents the quality gate in observation mode before active enforcement.
- **[`examples/docs/pr-trust-record.md`](examples/docs/pr-trust-record.md)** — Records disposition, blocking status, override authority, and residual-risk acceptance.

### Supporting Evidence

- **Pull request timeline** — Shows review effort, comments, approvals, checks, and final merge decision.
- **Ruleset evaluation results** — Shows which pull requests would have blocked under active enforcement.
- **Product billing pages** — Confirm current Copilot and Code Quality commercial boundaries without relying on copied prices.[^9][^10]

---

## 🎯 Mental Model Shift

> **The Core Insight:** Trust comes from matching each signal to explicit authority, reproducible evidence, and a named risk owner.

### Move Toward

- ✅ **Typed signals**: Label each result advisory, approval-eligible, or blocking → reviewers know what action follows.
- ✅ **Evaluate-first rulesets**: Observe candidate failures before activation → thresholds reflect repository evidence.
- ✅ **Explicit disposition**: Record why a material finding was accepted, rejected, or escalated → disagreement becomes auditable judgment.
- ✅ **Named residual-risk ownership**: Identify the person or team authorized to merge or stop → automation never becomes anonymous authority.

### Move Away From

- 🔄 **One green check as complete assurance**: Combine tests, coverage, quality findings, and domain review → each signal covers a known slice of risk.
- 🔄 **Comment volume as review quality**: Track material findings and dispositions → attention moves to consequential evidence.
- 🔄 **Immediate enforcement**: Gather evaluate-mode results first → active rules reflect observed impact.

### Move Against

- 🛑 **Treating advisory text as deterministic proof**: Contextual findings can be valuable without being reproducible → keep acceptance human-owned.
- 🛑 **Letting preview defaults define authority**: Approval semantics can change materially under explicit preview enablement → document scope and inheritance.
- 🛑 **Combining product controls or bills**: Copilot review and Code Quality have separate enablement and commercial models → audit each independently.

> **What This Looks Like:** A pull request receives two Copilot findings. The developer accepts one and rejects the other with repository evidence. CI uploads a negative coverage delta, and an evaluate-mode rule reports that the PR would fail. After the threshold is validated and activated, the same regression blocks. A named human reviewer resolves the domain question and accepts the residual risk.

---

## When to Use This Pattern

### Decision Tree

```text
Q: What kind of uncertainty does the signal resolve?
├─ Contextual or semantic judgment
│  └─ Use advisory review; require explicit disposition for material findings
│
├─ Reproducible threshold with a clear remedy
│  └─ Run in evaluate mode; activate after observed false-positive review
│
├─ Required-approval policy
│  ├─ Human approval only → keep Copilot review advisory
│  └─ Copilot approval eligible → enable preview policy explicitly and audit scope
│
└─ Domain, security, privacy, safety, or business acceptance
   └─ Assign a qualified human residual-risk owner
```

### Use This Pattern When

- multiple automated and human signals appear on the same pull request;
- teams need a controlled path from observation to enforcement;
- repository owners can name bypass and residual-risk authority;
- coverage or Code Quality findings have clear, testable remediation; and
- auditability matters across developer, platform, and security roles.

### Don't Use This Pattern When

- a repository has no stable CI baseline; establish reproducible tests before adding gates;
- the team cannot name an owner for overrides and residual risk; keep signals advisory until authority is defined;
- a preview feature cannot be accepted under organizational policy; retain human-only approval counting;
- the target is GitHub Enterprise Server and the required Code Quality capability is unavailable; use supported CI checks and rulesets instead; or
- a threshold has not been observed on representative pull requests; collect evaluate-mode evidence first.

### Signal Contract

| Signal | Default role | Can block? | Decision owner | Evidence retained |
|---|---|---:|---|---|
| Copilot review comment | Advisory | No, by itself | Developer and human reviewer | Comment plus disposition |
| Copilot approval | Advisory by default | May count toward required approvals only under explicit preview enablement | Repository, organization, or enterprise policy owner | Approval event and policy scope |
| Test result | Deterministic | Yes, through required checks | Repository owner | Workflow run and logs |
| Coverage threshold | Deterministic | Yes, through active ruleset | Platform/repository owner | Cobertura result, delta, ruleset status |
| Code Quality finding threshold | Deterministic within configured rule semantics | Yes, through active ruleset | Platform/security owner | Finding, severity, rule result |
| Residual-risk acceptance | Human judgment | Authorizes merge or stop | Named qualified reviewer | Approval, rationale, override record |

---

<!-- 🎬 MAJOR SECTION: Classify the Signals -->
## Classify the Signals Before Granting Authority

### Advisory Review Is a Hypothesis Queue

Copilot code review examines the change and returns comments for consideration.[^1] The useful operating model is a queue of hypotheses:

1. **Accept** when the finding is relevant and the proposed direction fits the repository.
2. **Reject with evidence** when tests, constraints, or domain context invalidate the finding.
3. **Escalate** when the finding touches security, architecture, privacy, or another owned domain.

```markdown
# docs/pr-trust-record.md

## Advisory findings

| Finding | Disposition | Evidence | Owner |
|---|---|---|---|
| Missing authorization check | Accepted | Added policy test `denies_cross_tenant_read` | PR author |
| Cache invalidation race | Rejected | Cache key is request-scoped; see ADR-014 | Service owner |

## Blocking signals

| Signal | State | Remediation |
|---|---|---|
| Coverage threshold | Blocked | Add branch test or request documented override |

## Residual risk

- Domain reviewer: @payments-owner
- Security escalation required: no
- Override used: no
- Decision: accept for merge
- Rationale: deterministic checks pass and domain behavior matches ADR-014
```

The record is intentionally small. It preserves consequential judgment without turning every minor comment into process overhead. Use the committed [review record](examples/docs/pr-trust-record.md) as the inspectable starting point.

### Approval Is a Separate Policy Decision

A review comment and an approval are different artifacts. Copilot review remains advisory by default. In the public-preview approval model, a Copilot approval may count toward required approvals only after explicit enablement at the repository, organization, or enterprise level.[^1]

That creates three policy questions:

- **Scope:** Which repositories inherit or override the setting?
- **Counting:** Which required-approval rules recognize the Copilot approval?
- **Accountability:** Which human role still owns domain and residual-risk acceptance?

A preview approval can satisfy a configured count. It cannot establish that the team transferred legal, security, product, or operational accountability to the tool.

### Tune Review Effort Without Changing Authority

Lite and Balanced are the current effort levels. An organization default can flow to repositories, and an individual request can select an effort for that review.[^7] Effort changes analysis depth and consumption; it does not independently change whether the result advises, approves, or blocks.

---

<!-- 🎬 MAJOR SECTION: Assemble the Evidence -->
## Assemble One Reviewable Evidence Record

### Guide the Advisory Layer

Repository instructions can focus review attention on risks that matter locally:

```markdown
# .github/copilot-instructions.md

## Pull request review focus

- Trace authorization checks for every tenant-scoped data access change.
- Ask for a regression test when a changed branch affects billing outcomes.
- Flag logs that can contain credentials, tokens, payment data, or personal data.
- Cite the repository file or changed behavior behind each material finding.
- Treat architecture and policy conflicts as escalation points for named owners.
```

The committed [repository instructions](examples/.github/copilot-instructions.md) guide review. They are a teaching artifact, not an enforcement policy. A ruleset, required check, or qualified human approval owns enforcement.

### Feed Coverage as Reproducible Evidence

Code Quality accepts Cobertura XML produced by common test tools. A minimal Python workflow illustrates the contract:[^4]

```yaml
# .github/workflows/pr-evidence.yml
name: PR evidence

on:
  pull_request:

permissions:
  contents: read
  code-quality: write

jobs:
  test-and-cover:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install test dependencies
        run: pip install -r requirements.txt pytest pytest-cov
      - name: Run tests and emit Cobertura XML
        run: pytest --cov=src --cov-report=xml:coverage.xml
      - name: Upload coverage
        uses: actions/upload-code-coverage@v1
        with:
          file: coverage.xml
          language: Python
          label: code-coverage/pytest
```

The committed [coverage workflow](examples/.github/workflows/pr-evidence.yml) makes the example independently inspectable. The expected evidence is a test result plus a visible coverage percentage and delta on the pull request. Polyglot repositories can emit labeled reports per language or service; aggregation behavior needs validation in the target repository before a shared threshold becomes active.

### Read Findings by Provenance

Code Quality combines CodeQL-backed and AI-assisted analysis in one product surface.[^3] Provenance still matters:

| Evidence property | Deterministic rule | AI-assisted finding |
|---|---|---|
| Reproducibility | Expected for the same code and rule version | Can vary with model and context |
| Best use | Enforce a narrow known condition | Surface context-sensitive maintainability or reliability risk |
| Disposition | Fix, change threshold, or invoke governed bypass | Accept, reject, investigate, or escalate |
| Authority | Ruleset policy | Human reviewer unless another explicit policy applies |

The product can present both kinds of findings together. The team contract retains their distinct evidence semantics.

---

<!-- 🎬 MAJOR SECTION: Promote Proven Gates -->
## Promote Proven Signals from Evaluate to Active

### Start with Observation

A representative ruleset begins in `evaluate` mode:

```json
{
  "name": "PR trust stack",
  "target": "branch",
  "enforcement": "evaluate",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/main"],
      "exclude": []
    }
  },
  "rules": [
    {
      "type": "code_quality",
      "parameters": {
        "minimum_coverage_percentage": 80
      }
    }
  ]
}
```

The committed [evaluate-mode ruleset](examples/rulesets/pr-trust-stack.evaluate.json) is an instructional artifact. GitHub's current ruleset UI or REST schema is authoritative; exporting a generated rule or checking the current API avoids coupling rollout to a stale example.[^5]

Evaluate mode answers four practical questions:

- How many representative pull requests would block?
- Which failures identify real risk?
- Which failures come from missing or malformed evidence?
- Which teams own remediation and exceptions?

### Activate Only the Proven Rule

After the pilot data supports the threshold, change the enforcement state to `active` through the supported UI or API. The rule now blocks matching merges when its condition fails.[^5][^6]

```diff
-  "enforcement": "evaluate",
+  "enforcement": "active",
```

Activation is a policy event. Record the evidence window, threshold rationale, owner, exception path, and rollback condition. A useful rollback condition is a sustained rate of false or unexplained blocks above the team's agreed tolerance.

### Keep Bypass Authority Narrow

A blocking rule needs an explicit exception model:

- named roles permitted to bypass;
- a required rationale attached to the pull request;
- a time-bounded follow-up when risk is deferred;
- security escalation for protected domains; and
- periodic review of bypass frequency and causes.

Frequent bypasses are evidence about the rule, the underlying tests, or delivery pressure. They are not proof that governance is working.

---

<!-- 🎬 MAJOR SECTION: Govern the Boundary -->
## Govern Enablement, Billing, and Residual Risk Separately

### Enablement Boundaries

| Capability | Enterprise control | Organization control | Repository control |
|---|---|---|---|
| Copilot code review | Copilot policy and feature availability | Defaults and automatic-review rulesets | Automatic review, repository rulesets, instructions |
| Copilot approvals preview | Preview permission and policy scope | Explicit enablement/inheritance where available | Explicit enablement or inherited policy where available |
| GitHub Code Quality | Enterprise allowance for organizations | Organization enablement and policy | Repository enablement, scans, coverage, and rulesets |

The exact control inheritance can evolve, especially during public preview. A rollout record needs the observed settings from the target tenant, not an assumed hierarchy.

### Billing Boundaries

Copilot and Code Quality have separate billing documentation and accounting concepts.[^9][^10]

- **Copilot code review** follows applicable Copilot entitlement and consumption rules, including review effort implications.
- **Copilot approvals preview** belongs to the Copilot review capability and does not merge Code Quality billing into Copilot billing.
- **Code Quality** has its own enablement and billing dimensions, including eligible committers, AI-assisted feature usage, and workflow compute where applicable.
- **Coverage workflows** can consume GitHub Actions or self-hosted runner resources independently from product entitlement.

Prices are intentionally absent here. Commercial terms change, tenant agreements differ, and the live GitHub billing pages plus organization usage data are the authoritative inputs.

### Residual-Risk Acceptance

No combination of advisory review and deterministic checks proves every relevant property. Human ownership remains decisive for:

- business behavior and product intent;
- architecture and long-term operability;
- threat model and abuse cases;
- privacy, safety, and regulatory interpretation;
- production readiness and rollback; and
- exceptions to policy.

A merge-ready pull request identifies that owner directly. For routine changes, the code owner may fill the role. Sensitive paths can require a security, privacy, payments, or platform owner. Overrides belong to roles with explicit authority, not to whoever happens to be online.

---

## Real-World Use Cases

### Use Case 1: Coverage Regression with a Valid Domain Change

**The Scenario:** A payment calculation change produces one useful Copilot finding, one irrelevant cache warning, and a coverage drop below the evaluated threshold.

**How It Works:** The developer accepts the authorization finding, rejects the cache warning with an ADR citation, and adds the missing branch test. Evaluate mode records that the original revision would have blocked; the revised PR passes.

**What We Get:** Two advisory dispositions, one measured gate outcome, and one named payments reviewer in a single PR record.

### Use Case 2: Preview Approval in a Low-Risk Repository

**The Scenario:** A platform team wants to test whether Copilot approvals can satisfy one required approval for generated documentation updates.

**How It Works:** The enterprise and organization policy owners approve a repository-scoped preview. The team confirms required-approval counting, retains human ownership for sensitive paths, and audits every qualifying merge during the pilot.

**What We Get:** A bounded set of pull requests showing whether approval counting behaves as configured, with a rollback path that returns to human-only approval counting.

### Use Case 3: Security-Sensitive Override

**The Scenario:** An urgent fix fails a coverage rule because the unavailable dependency cannot be exercised in CI.

**How It Works:** The repository's named bypass role records the failing evidence, incident link, compensating validation, and follow-up test obligation. A security owner accepts the residual risk before merge.

**What We Get:** A visible exception with owner, rationale, compensating evidence, and expiry, rather than a silent disabled gate.

---

## What We Can Do Today

### 15 Minutes — Classify Existing Signals

- **Try:** Label every required pull-request check as advisory, approval-eligible, or blocking.
- **Expected signal:** Each check has one semantic role and one owner.
- **Validate:** A reviewer can explain what action follows a failure without opening external documentation.

### 1 Hour — Build the Evidence PR

- **Build:** Add focused Copilot instructions and a Cobertura-producing coverage workflow to a low-risk repository.
- **Expected signal:** One pull request shows advisory findings, test status, coverage percentage, and coverage delta.
- **Validate:** Accept one material finding, reject one with evidence, and confirm the coverage upload uses only required permissions.

### 2–4 Hours — Run a Bounded Trust Pilot

- **Pilot:** Configure one Code Quality or coverage rule in `evaluate` mode across a representative repository sample.
- **Success measure:** Every candidate block is classified as valid, missing evidence, threshold mismatch, or false positive; owners and remediation are known.
- **Boundary:** Keep the rule in evaluate mode or roll it back when unexplained blocks exceed the team's agreed tolerance. Keep Copilot approval counting disabled unless the preview, policy scope, and human accountability model are explicitly approved.

### Apply It to Our Work

- **Candidate task:** Select a pull request that changes production behavior and has meaningful test coverage.
- **Decisive context:** Repository instructions, test and coverage output, Code Quality findings, approval policy, CODEOWNERS, and relevant architecture decisions.
- **Delegation and authority:** Copilot proposes findings; CI and active rulesets enforce narrow conditions; qualified humans accept domain risk and authorize exceptions.
- **Evidence:** A PR timeline containing one accepted advisory finding, one evidence-backed rejection, one evaluated or active gate result, and one named residual-risk decision.

---

## Related Patterns

- **[Copilot Hooks](../copilot-hooks/)** — Applies policy at agent execution boundaries before actions reach the repository.
- **[Agentic SDLC](../agentic-sdlc/)** — Builds the repository and CI infrastructure that consistently produces trustworthy evidence.
- **[From Issue to Pull Request](../copilot-web/)** — Supplies the bounded delegation model that precedes this pre-merge verification decision.

---

## References

### Official Documentation

[^1]: [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) — Review behavior, current approval semantics, and capability boundaries.
[^2]: [Configuring automatic code review by GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-review) — Repository and organization configuration.
[^3]: [About GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality) — Pull-request findings, default-branch analysis, and Code Quality concepts.
[^4]: [Setting up code coverage for a repository](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage) — Cobertura upload contract and workflow permissions.
[^5]: [Setting Code Quality thresholds for pull requests](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds) — Coverage and quality ruleset configuration.
[^6]: [Preventing Code Quality issues from reaching the default branch](https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge) — Evaluate-to-active enforcement workflow.
[^7]: [Copilot code review effort levels are generally available](https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/) — Lite and Balanced effort, inheritance, and per-review selection.
[^8]: [GitHub Code Quality no longer adds Copilot as a reviewer](https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer) — Separate review and Code Quality enablement.
[^9]: [GitHub Copilot billing](https://docs.github.com/en/billing/concepts/product-billing/github-copilot) — Current Copilot billing concepts.
[^10]: [GitHub Code Quality billing](https://docs.github.com/en/billing/concepts/product-billing/github-code-quality) — Current Code Quality billing concepts.

### Portfolio Evidence

[^11]: [PR Trust Stack coverage matrix](../../.github/content-routing/coverage/wp5-pr-trust-stack.yml) — Experiment source-content survival and required evidence.
[^12]: [Tech-Talk Portfolio Plan](../../TECH-TALK-PORTFOLIO-PLAN.md) — Approved decision, audience, duration, and replacement contract.

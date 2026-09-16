---
status: active
updated: 2026-09-16
section: "Executive Talks"
references:
  - url: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/
    label: "GitHub and Accenture: assistant-era enterprise build and pull-request outcomes, 2024"
    verified: 2026-04-24
  - url: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
    label: "METR: randomized study of AI assistance for experienced open-source developers, 2025"
    verified: 2026-04-24
  - url: https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development
    label: "DORA: commercially interested outcome-based ROI framework for AI-assisted delivery, 2025"
    verified: 2026-04-24
  - url: https://getdx.com/blog/how-top-companies-measure-ai-impact-in-engineering/
    label: "DX: commercially interested review of engineering AI measurement practices, 2024"
    verified: 2026-04-24
  - url: https://airc.nist.gov/Home
    label: "NIST AI RMF: governance vocabulary for oversight, monitoring, and accountability, 2023"
    verified: 2026-04-24
---

# The Agentic Operating Model

*Where agents create value, where humans retain authority, and how leadership proves the return*

*A 30-45 minute decision briefing for C-suite leaders, VPs, and transformation leaders considering a controlled operating-model pilot.*

---

## The Decision

The reusable authorization template below defines the fields required for a controlled decision process. The final authorization is one decision: approve the completed charter and controlled pilot, leading to **scale once, adjust once, or stop**.

| Charter field | Required completed entry |
|---|---|
| **Authorizing body and signatory** | Named executive committee, investment committee, or delegated executive, plus the accountable signatory |
| **Executive sponsor** | CTO with responsibility for cross-functional sponsorship and escalation |
| **Operational owner** | VP of Engineering accountable for workflow selection, execution, and results |
| **Pilot scope** | One named team and one repeatable workflow |
| **Timing** | Four-week baseline, followed by a 90-day pilot; exact launch and return dates recorded in the charter |
| **Planning alignment** | Calendar return date aligned to the named annual operating plan, quarterly business review, or funding cycle used by the organization |
| **Budget** | Local ceiling, named funding source, and approved treatment of internal labor and platform cost |
| **Control capacity** | Named control owners and committed capacity for platform, security, compliance, release, and measurement duties |
| **Agent authority** | Explicit tools, data, environments, actions, and workflow boundaries available to the agent |
| **Retained human authority** | Named accountable humans for objectives, exceptions, production release, access changes, and risk acceptance |
| **Measurement custody** | Finance, Strategy, or an independent data owner responsible for baseline integrity, scenario assumptions, and gate reporting |
| **Return decision** | Scale once, adjust once, or stop, with a named tie-break authority |

This portfolio briefing cannot invent organization-specific dollars, minimum sample counts, performance thresholds, guardrail floors, or capacity commitments. The authorizing body and Finance or the independent measurement custodian complete, approve, and publish those fields in a dated threshold memo after the baseline and before assisted execution begins. No blank threshold may reach launch.

The authorization is **pre-authorization of a controlled decision process**. Executive authority is required because the charter commits cross-functional capacity, assigns a budget and funding source, grants bounded permissions to non-human tools, and reserves defined authority for accountable humans. The charter records exact launch and return dates and aligns the gate with a real planning or funding cycle.

---

## The Evidence

GitHub and Accenture reported 84% more successful builds, 8.7% more pull requests per developer, and a 15% higher merge rate among Copilot users in an enterprise study.[^1] This **external observation** carries commercial interest from GitHub and Accenture and reflects the study's participating enterprise population, available work, and assistant-era conditions.

METR's randomized study found that 16 experienced open-source developers working on mature repositories took 19% longer on eligible tasks with AI assistance, while participants had expected faster completion.[^2] This **external observation** comes from an independent, small expert cohort performing complex tasks in repositories they knew well.

Both studies concern assistant-era interventions under human authorship. Neither directly tests bounded agent execution with post-hoc human verification. The evidence supports a narrow inference: outcomes vary by task, context, and intervention. The gap between assistant-era research and the proposed operating model supplies a positive reason for a bounded internal pilot with comparable work and independent measurement.

DORA, part of Google Cloud, provides a commercially interested framework connecting AI-assisted development to delivery outcomes and organizational conditions.[^3] DX provides a commercially interested review of engineering measurement practices across outcome, quality, and developer-experience measures.[^4] These sources guide measurement design; local authorization rests on the completed **internal baseline**, the disclosed **modeled scenario**, and the approved **proposed threshold**.

| Evidence vocabulary | Use in this briefing |
|---|---|
| **external observation** | Calibrates plausible outcomes and boundaries from cited research |
| **internal baseline** | Records local workflow performance during the four weeks before assisted execution |
| **modeled scenario** | Applies disclosed local assumptions to cost and value |
| **proposed threshold** | Defines the approved test for scale, adjust, or stop |

Control, Coordination, and Context form **an editorial decision framework for this briefing**, with no claim of external validation.

| Editorial zone | Candidate work | Retained accountable expertise |
|---|---|---|
| **Control** | Checks, evidence collection, and policy-constrained preparation | Risk acceptance, exceptions, and release approval |
| **Coordination** | Triage, dependency mapping, status synthesis, and release preparation | Priority, sequencing, and stakeholder commitments |
| **Context** | Repository analysis, documentation comparison, and decision-history retrieval | Architecture, tradeoffs, and customer judgment |

Accountable developers remain experts responsible for acceptance and delivered outcomes. Product leaders retain priority and customer-outcome authority. Security and compliance leaders own mandatory controls and exceptions. Platform engineering owns enforceable verification. The VP of Engineering owns operational performance across the selected workflow.

**Excluded conclusions:** enterprise ROI, universal productivity, headcount reduction, and autonomous production authority.

---

## The Guardrails and Economics

NIST's AI Risk Management Framework supplies governance language for oversight, monitoring, and accountability.[^5] The pilot translates that language into a compact executive guardrail: agents receive least-privilege access to the named workflow, required checks produce reviewable evidence, accountable humans approve reserved actions, and control owners can halt execution.

Agents may gather context, propose plans, modify approved development assets, run approved checks, and prepare evidence within the charter. Humans retain authority for production deployment, production data or schema changes, security-control exceptions, new external dependencies, production configuration, access-control changes, external integrations, risk acceptance, and work outside the approved boundary. Tool permissions and delivery gates enforce the boundary; logs and review records evidence its operation.

The threshold memo names owners and minimum floors for workflow acceptance, test health, security, compliance, performance, dependency policy, release readiness, evidence completeness, and human review. It also commits enough owner capacity to operate those controls throughout the pilot. Any authority-boundary or control breach triggers an immediate stop.

The economic case is a local **modeled scenario** built from the four-week **internal baseline**. It uses fully burdened inputs and a downside case. Universal ROI remains an excluded conclusion.

| Input group | Required local inputs |
|---|---|
| **Cost** | Tooling; platform effort; enablement; agent operations; control operation; human review and rework; committed owner time; opportunity cost |
| **Value** | Cost per validated outcome; capacity redeployment; flow; quality |

| Scenario | Required treatment |
|---|---|
| **Local case** | Apply measured workflow volume, fully burdened cost, observed quality, and approved capacity-redeployment assumptions |
| **Downside case** | Apply lower validated-outcome volume, higher review and rework, higher control cost, and delayed or unrealized capacity redeployment |

Every assumption names an owner, source, date, and sensitivity range. Capacity value requires a documented destination such as higher-priority delivery, resilience work, customer response, or avoided external spend. Flow and quality enter the scenario only where they have a defensible local value relationship. The gate evaluates workflow-specific evidence and fully burdened economics.

---

## The Gate

The authorizing body and Finance or the independent measurement custodian jointly own the dated threshold memo. They approve it after the four-week baseline and before assisted execution. The memo makes the day-90 decision falsifiable by declaring all of the following:

| Gate field | Required declaration |
|---|---|
| **Completed-outcome minimum** | A numeric minimum supported by expected workflow event volume and sufficient for the declared decision |
| **Comparability** | A task-comparability rule defined before launch, or a concurrent comparison cohort |
| **Primary outcome** | One workflow-specific validated outcome with an accountable business owner |
| **Decision threshold** | Numeric or categorical **proposed threshold** for the primary outcome and fully burdened economics |
| **Directional floor** | A predeclared minimum signal eligible for one adjustment |
| **Guardrail floors** | Quality, control, authority, and evidence-completeness floors that must hold throughout |
| **Immediate stop** | Any authority-boundary breach or control failure |
| **Arbiter** | Named signatory or committee chair who resolves a tied or disputed disposition |

Measures must fit the event volume available during a four-week baseline. The selected workflow determines the primary outcome. Suitable examples include accepted change packages, resolved incidents, completed compliance reviews, or validated release decisions. `Time to validated customer outcome` applies only when the workflow produces enough attributable customer outcomes to establish a credible baseline.

| Decision | Falsifiable disposition |
|---|---|
| **Scale once** | The primary **proposed threshold**, fully burdened economic threshold, completed-outcome minimum, comparability rule, and every guardrail floor are satisfied |
| **Adjust once** | The predeclared directional floor is met, no authority or control failure occurred, and one bounded correction has a named owner, budget, and calendar return date |
| **Stop** | Any immediate-stop condition occurs, a guardrail floor fails, the directional floor is missed, comparability is inadequate, or the single adjustment fails its return gate |

The completed charter and threshold memo preserve the decision record, evidence classifications, scenario assumptions, control ownership, and return date. The authorizing body receives one final authorization request: approve the completed charter and controlled pilot, with the resulting decision limited to **scale once, adjust once, or stop**.

### References

[^1]: **[GitHub and Accenture enterprise study](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/)** - Commercially interested enterprise study reporting assistant-era build and pull-request outcomes, 2024.

[^2]: **[METR: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developers](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)** - Independent randomized study reporting a 19% slowdown for 16 experienced open-source developers on eligible tasks, 2025.

[^3]: **[DORA: ROI of AI-Assisted Software Development](https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development)** - Commercially interested Google Cloud framework for outcome-based evaluation, 2025.

[^4]: **[DX: How top companies measure AI impact in engineering](https://getdx.com/blog/how-top-companies-measure-ai-impact-in-engineering/)** - Commercially interested review of engineering AI measurement practices, 2024.

[^5]: **[NIST AI Risk Management Framework](https://airc.nist.gov/Home)** - Governance vocabulary for oversight, monitoring, and accountability, 2023.

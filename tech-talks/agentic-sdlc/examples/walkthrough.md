# Demo: Agentic SDLC — Infrastructure for AI Velocity

**Source talk:** [Agentic SDLC: Infrastructure for AI Velocity](../README.md)
**Core question:** How do I rewire repositories, PR workflows, and CI/CD to scale from 2-3 features/week to 10-15 features/day with AI agents?
**Target repo:** [github.com/MSBart2/FanHub](https://github.com/MSBart2/FanHub) — fork it, then imagine scaling it to a multi-service architecture

---

## Prerequisites

- Fork `github.com/MSBart2/FanHub` to your own GitHub account
- Node.js 18+ and `npm`
- Nx CLI: `npm install -g nx`
- Familiarity with GitHub Actions

---

## Exercise 1: Understand Where FanHub Sits on the AgentRC Maturity Model

Before building infrastructure, diagnose where you are. The AgentRC model defines 5 levels — each level unlocks more automation, speed, and safety.

Look at FanHub's current repository and ask: which level does it support?

| AgentRC Level | FanHub Today |
|---------------|-------------|
| **1 — Functional** | ✅ Code runs, builds pass |
| **2 — Documented** | ❌ No README, no architecture docs, no `copilot-instructions.md` |
| **3 — Standardized** | ❌ No CI/CD, no CODEOWNERS, no lint or security checks |
| **4 — Optimized** | ❌ No MCP servers, no custom agents, no affected analysis |
| **5 — Autonomous** | ❌ Can't reach Level 5 without Levels 2-4 |

**The immediate task:** Get FanHub to Level 2-3. You can't safely run autonomous agents on a Level 1 repo — they'll invent conventions instead of following them, and CI won't catch when they get it wrong.

Start with the cheapest Level 2 investment — document conventions in `.github/copilot-instructions.md` (which you already have from the Code Review demo). Then add CI.

**What to notice:** Autonomous delivery is a compounding result of maturity, not a shortcut around it. You can add agents to a Level 1 repo, but you won't like the output.

---

## Exercise 2: Add a Fast-Feedback CI Pipeline

At Level 3, CI is the first thing agents trust. If CI is slow or flaky, agents can't iterate confidently.

Create `.github/workflows/pr-checks.yml` in your FanHub fork:

```yaml
name: PR Checks

on:
  pull_request:
    branches: [main]

jobs:
  fast-feedback:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # Enforced ceiling — fail fast, don't queue

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: node/package-lock.json

      - name: Install dependencies
        working-directory: node
        run: npm ci

      - name: Lint
        working-directory: node
        run: npm run lint

      - name: Type check
        working-directory: node
        run: npm run typecheck

      - name: Tests
        working-directory: node
        run: npm test

      - name: Build
        working-directory: node
        run: npm run build
```

Add this to your branch protection rules: require `fast-feedback` to pass before merge.

Now the coding agent's PRs will automatically run this pipeline. The agent knows when tests fail — it says so in the PR description. You don't need to check.

**What to notice:** The `timeout-minutes: 10` ceiling matters. 60-minute CI means agents idle 80% of the time. If CI can't finish in 10 minutes at FanHub's current scale, something in the pipeline is wrong — diagnose and fix before scaling.

---

## Exercise 3: Add CODEOWNERS for Agent-Safe Routing

CODEOWNERS ensures the right humans review the right code — whether authored by a person or the coding agent. Without it, every PR goes to whoever is available, and you lose accountability at scale.

Create `.github/CODEOWNERS` in your FanHub fork:

```
# Default — all PRs require at least one owner review
*                   @your-github-handle

# Routes are sensitive — require explicit approval
node/routes/        @your-github-handle

# Config and CI changes require elevated review
.github/            @your-github-handle
*.json              @your-github-handle

# Database changes require careful review
node/data/          @your-github-handle
node/migrations/    @your-github-handle
```

Replace `@your-github-handle` with the appropriate reviewers.

Now assign the "add pagination to characters API" issue to the coding agent. When the draft PR arrives, GitHub automatically requests reviews from the code owners for the files touched.

**What to notice:** At scale, you can't manually decide who reviews every agent PR. CODEOWNERS makes ownership explicit and automatic. Code in `node/routes/` always goes to the routes expert. Changes to CI always go to someone who understands the pipeline.

---

## Exercise 4: Require an Evidence Bundle (Outcome-Based Review)

At Level 5, humans don't review every line — they validate outcomes against intent. PRs become evidence bundles: here's what changed, here's why, here are the automated checks that passed.

Add a PR template that makes evidence explicit. Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## What This Changes

<!-- 1-3 sentences. What is the user-visible change? -->

## Why

<!-- Link to the issue or describe the intent -->

Closes #

## Evidence

<!-- What automated checks confirm this is correct? -->

- [ ] Tests pass (see CI results above)
- [ ] No new lint errors
- [ ] Reviewed for security patterns (SQL injection, input validation)

## Notes for Reviewers

<!-- Where does a human reviewer focus? What tradeoffs were made? -->
```

The coding agent fills this template out automatically in its PR descriptions — the "Notes for Reviewers" section will contain the agent's summary of what it did and why, including any tradeoffs it noticed.

**What to notice:** This template works for human-authored and agent-authored PRs. It forces clarity from agents ("why did you make this change?") and trains human authors to communicate the same way. The review model shifts from "read every line" to "validate the evidence."

---

## Exercise 5: Measure What You've Built

Level 5 infrastructure is measurable. With the CI pipeline and CODEOWNERS in place, you can now track what matters:

Go to your repository → **Insights** → **Actions** to see:
- Average PR check duration (target: <10 minutes)
- Failure rate by workflow step (flaky tests will show up here)

Go to your repository → **Insights** → **Pull requests** to see:
- Average time from PR open to first review
- Average time from first review to merge

With the coding agent enabled, also track in your issues view:
- How long from issue creation to draft PR (agent session time)
- How many PR iterations before merge (comment → agent commits → re-review cycles)

**Baseline the numbers now.** In 4 weeks after running the agent on backlog issues, compare:
- Issue → merged PR time (was: days. target: hours)
- PR review cycles (was: multiple back-and-forth. target: 1-2 with clear standards)

**What to notice:** You can't improve what you don't measure. The Level 5 SDLC isn't a destination you declare — it's a system you tune continuously. Metrics tell you where the bottleneck is now.

---

## Key Takeaways

| Layer | What to build | Why it matters for agents |
|-------|--------------|--------------------------|
| Level 2 foundation | `.github/copilot-instructions.md` | Agents follow conventions instead of inventing them |
| Level 3 CI | `.github/workflows/pr-checks.yml` (<10 min) | Fast feedback; agents know when they break something |
| Level 3 ownership | `.github/CODEOWNERS` | Right humans review right code, automatically |
| Level 4 evidence | PR template with checklist | Humans validate outcomes, not line-by-line implementation |
| Level 5 measurement | Track PR cycle time and iteration count | Find and remove the current bottleneck |

**The through-line:** Autonomous delivery is the compounding result of maturity. Levels 1-4 are the infrastructure. Level 5 is what happens when that infrastructure is working correctly.

## References

- [AgentRC concepts and maturity model](https://github.com/microsoft/agentrc/blob/main/docs/concepts.md)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [GitHub Actions caching guide](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [SLSA supply chain security framework](https://slsa.dev/)

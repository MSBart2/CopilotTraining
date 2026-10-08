---
title: "From Issue to Merge Decision"
subtitle: "Agentic workflows, Copilot review, and Code Quality together"
slug: pr-trust-stack
category: tech-talks
duration: 50
updated: 2026-10-08
---

# From Issue to Merge Decision

Agenda (50 min)

1. Authorize the Work (8 min)
2. Inspect the Draft (9 min)
3. Review, Remediate, and Enforce (18 min)
4. Make the Merge Decision (9 min)
5. What You Can Do Today (4 min)
6. References (2 min)

Four distinct FanHub demos, not sequential heads of one PR:
- [Issue #110](https://github.com/MSBart2/FanHub/issues/110) → [draft #193](https://github.com/MSBart2/FanHub/pull/193): human-corrected plan, agent-created two-file CSS draft, build and layout comparison.
- [Draft #198](https://github.com/MSBart2/FanHub/pull/198): automatic Copilot review catches an inert Retry despite passing component tests; human verifies the correction.
- [Draft #199](https://github.com/MSBart2/FanHub/pull/199): a 27% coverage gate blocks 26.7%, then passes at displayed 30% after **manually** added tests.
- [Draft #201](https://github.com/MSBart2/FanHub/pull/201): Code Quality generates a `TryParse` Autofix; a person commits it; new-head build and analysis pass. No frontend tests or coverage gate on this PR.

All four PRs remain draft and unmerged. The demonstration ends with a human merge decision; security-specific checks and post-merge delivery need separate evidence.

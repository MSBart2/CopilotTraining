/*
  Choosing the AI Platform for Your SDLC — executive deck data and speaker notes.
  The notes are the teaching source; tech-talks/exec-strategy/README.md is the landing page.
  Approved per-slide plan: tech-talks/exec-strategy/deck.recipe.yml (nativePlan, 26 slides).
*/
(() => {
  const S = (id, part, title, more = {}) => ({
    id,
    part,
    title,
    section: part ? `Part ${part}` : "Frame",
    ...more,
  });

  const slides = [
    S("title", 0, "Choosing the AI Platform for Your SDLC", {
      chrome: false,
      visual: "pr-evidence",
      subtitle:
        "Better software, faster, on the delivery system you already run",
      tagline:
        "Evaluate the system around the model. Prove it on one team before you scale.",
      meta: "CopilotTraining · Executive Briefing · 45 minutes",
    }),
    S(
      "core-question",
      0,
      "Which AI platform helps my teams ship better software, faster?",
      {
        pill: "Core Question",
        scene: "question-system",
        subtitle:
          "AI amplifies the delivery system it runs in. Put agents inside the system of record, where code, pull requests, checks, and policy already live.",
        highlight:
          "Every agent action lands as reviewable evidence under controls the organization already runs.",
        audience: "For CTOs, VPs of Engineering, and platform and DevEx leads",
        lenses: ["Context", "Delegation", "Verification", "Authority"],
        record: ["code", "pull requests", "checks", "policy"],
      },
    ),
    S("contents", 0, "Decision Journey", {
      pill: "Agenda · Four parts",
      sections: [
        {
          icon: "🧭",
          title: "Look Past the Model",
          subtitle: "Evaluate the system around it",
          blurb: "Outcomes vary with the delivery system around the tool.",
          slide: 4,
        },
        {
          icon: "❓",
          title: "Four Questions for Any AI Platform",
          subtitle: "Hold every vendor to them",
          blurb: "Context, delegation, verification, and authority.",
          slide: 8,
        },
        {
          icon: "🔀",
          title: "What an AI-Enabled SDLC Looks Like",
          subtitle: "See it on one pull request",
          blurb: "Agent work lands as evidence a human merges.",
          slide: 14,
        },
        {
          icon: "📏",
          title: "Prove It in Your Org",
          subtitle: "Measure before scaling",
          blurb: "A 90-day pilot with a dated gate.",
          slide: 19,
        },
      ],
    }),

    S("p1-open", 1, "Look Past the Model", {
      scene: "opener",
      subtitle:
        "AI outcomes depend on the delivery system around the tool, and the models inside it change every month.",
      cards: [
        { icon: "📈", title: "Outcomes vary", blurb: "By task and context" },
        {
          icon: "📡",
          title: "AI amplifies",
          blurb: "The system shapes the result",
        },
        {
          icon: "🔀",
          title: "Models move",
          blurb: "The platform around them holds",
        },
      ],
      terminal: {
        context: "Same tool, different delivery systems",
        detail: "different results",
      },
    }),
    S("outcomes-vary", 1, "Agents Now Start Four in Ten Pull Requests", {
      pill: "Look Past the Model · GitHub data, 2026",
      steps: { current: 1, total: 3 },
      studies: [
        {
          name: "Octoverse 2026",
          context: "All GitHub activity · Oct 2025 to Sep 2026",
          z: "remote",
          tags: [
            { label: "platform telemetry", z: "remote" },
            { label: "first-party", z: "orange" },
          ],
          stats: [
            { value: "40%+", text: "of pull requests start with an agent's draft (17% in March)" },
            { value: "90%", text: "of agent PRs merge within two weeks, vs. 86% without" },
            { value: "55%", text: "of Copilot monthly users use agent features, up from 35%" },
          ],
        },
        {
          name: "Copilot impact dashboard",
          context: "Your enterprise · rolling 28 days",
          z: "purple",
          tags: [
            { label: "your own data", z: "purple" },
            { label: "ROI is directional", z: "orange" },
          ],
          stats: [
            { value: "3", text: "adoption cohorts: code-first, agent-first, multi-agent" },
            { value: "PRs", text: "merged per developer and median merge time, per cohort" },
            { value: "ROI", text: "cost per developer beside pull request output" },
          ],
        },
      ],
      inference:
        "Agent work is mainstream; your cohorts show whether it pays off here.",
    }),
    S("mirror-multiplier", 1, "AI Amplifies the Delivery System It Lands In", {
      scene: "showdown",
      pill: "Look Past the Model · DORA 2025",
      steps: { current: 2, total: 3 },
      subtitle:
        "DORA 2025: AI lifts delivery throughput and strains stability. Strong testing, version control, and fast feedback turn the extra change into shipped value.",
      leftLabel: "Weak control systems",
      rightLabel: "Robust control systems",
      pairs: [
        {
          left: {
            label: "Testing is manual or flaky",
            note: "A person interprets every failure",
          },
          right: {
            label: "Strong automated testing",
            note: "Build, test, and scans run on every pull request",
            z: "green",
          },
        },
        {
          left: {
            label: "Version control practice varies",
            note: "Large batches land without consistent rules",
          },
          right: {
            label: "Mature version control",
            note: "Small pull requests, rulesets, and CODEOWNERS on main",
            z: "local",
          },
        },
        {
          left: {
            label: "Feedback arrives late",
            note: "Failures surface after the merge",
          },
          right: {
            label: "Fast feedback loops",
            note: "Checks and review report on each push",
            z: "purple",
          },
        },
      ],
      outcomeLeft: {
        icon: "⚠️",
        label: "More change volume, more instability",
      },
      outcomeRight: {
        icon: "✅",
        label: "Added throughput meets the controls",
      },
    }),
    S(
      "moving-target",
      1,
      "The Model Will Change; Evaluate the System Around It",
      {
        pill: "Look Past the Model · Moving target",
        steps: { current: 3, total: 3 },
        bench: {
          name: "Copilot Fusion Max · Coding Agent Index",
          tag: "first-party benchmark · commercially interested",
          stats: [
            {
              value: "60",
              text: "index score, within two points of a leading competitor configuration",
            },
            { value: "~½", text: "the average API cost per task" },
            { value: "~½", text: "the tokens" },
            { value: "~40%", text: "less time" },
          ],
        },
        holdLabel: "What holds steady around the model",
        holds: [
          {
            icon: "🔀",
            title: "Fusion routes",
            text: "Routes or combines the models the policy enables, at Standard, High, or Max effort.",
            z: "purple",
          },
          {
            icon: "🏛️",
            title: "Model policy decides",
            text: "One API sets model availability for the enterprise, enterprise teams, agent apps, and orgs.",
            z: "local",
          },
          {
            icon: "📊",
            title: "Usage metrics count",
            text: "Partner agent apps from other AI vendors report activity into the same usage metrics.",
            z: "green",
          },
        ],
        claim:
          "Leaderboards move monthly. Routing, policy, and metrics are the durable decision.",
      },
    ),

    S("p2-open", 2, "Four Questions for Any AI Platform", {
      scene: "opener",
      subtitle:
        "Vendor-neutral criteria first, then the first-party Copilot answer for each one.",
      cards: [
        { icon: "🧭", title: "Context", blurb: "Where it comes from" },
        { icon: "🤝", title: "Delegation", blurb: "Where work is handed off" },
        {
          icon: "🔎",
          title: "Verification",
          blurb: "What lands on the change",
        },
        { icon: "🏛️", title: "Authority", blurb: "Who controls it" },
      ],
      terminal: {
        context: "Ask every vendor the same four questions",
        detail: "then inspect the evidence on your own repository",
      },
    }),
    S("four-questions", 2, "Four Questions Any Vendor Can Be Held To", {
      scene: "questions-trust",
      pill: "Four Questions · Criteria",
      steps: { current: 1, total: 5 },
      subtitle:
        "Each question asks for something a vendor can demonstrate on the organization's own repository, on top of a contract that protects the code.",
      trustLabel: "The floor under all four: the contract",
      trust: [
        { icon: "🔒", text: "Inputs and outputs stay yours" },
        { icon: "🚫", text: "Never used to train models" },
        { icon: "⚖️", text: "IP claims on outputs defended" },
        { icon: "🏅", text: "ISO/IEC 42001 certified" },
      ],
      cards: [
        {
          icon: "🧭",
          title: "Context",
          description:
            "Where does the agent's context come from, and who governs it?",
        },
        {
          icon: "🤝",
          title: "Delegation",
          description:
            "Where can work be handed off, and does one agent definition travel?",
        },
        {
          icon: "🔎",
          title: "Verification",
          description:
            "What evidence lands on the change before anyone merges it?",
        },
        {
          icon: "🏛️",
          title: "Authority",
          description:
            "Who may change what the agent can do, and how is it audited?",
        },
      ],
    }),
    S("q-context", 2, "Context: The Agent Works From the System of Record", {
      scene: "answers",
      pill: "Four Questions · Context",
      steps: { current: 2, total: 5 },
      subtitle:
        "Copilot reads the repository, the issue, and the instructions where the team already keeps them.",
      ask: "Where does the agent's context come from, and who governs it?",
      proof:
        "Run one real issue and show what the agent read and which policy bounded it.",
      rows: [
        {
          label: "Repository and issue",
          note: "The cloud agent takes the issue and the repository as its task",
          tag: "system of record",
          z: "github",
        },
        {
          label: "Instructions",
          note: "Repository instructions and AGENTS.md, reviewed in pull requests",
          tag: "versioned",
          z: "local",
        },
        {
          label: "Custom agents",
          note: "One agent file; every Copilot surface reads its description and body",
          tag: "portable",
          z: "purple",
        },
        {
          label: "MCP servers",
          note: "An enterprise allowlist decides which MCP servers clients may start",
          tag: "governed",
          z: "orange",
        },
        {
          label: "Organizational knowledge",
          note: "Copilot Spaces, or a Foundry IQ knowledge base over MCP",
          tag: "when needed",
          z: "remote",
        },
      ],
    }),
    S("q-delegation", 2, "Delegation: Hand Off Work Where It Starts", {
      scene: "answers",
      pill: "Four Questions · Delegation",
      steps: { current: 3, total: 5 },
      subtitle:
        "One custom agent file travels across the editor, the terminal, GitHub, and the Copilot app.",
      ask: "Where can work be handed off, and does one agent definition travel?",
      proof:
        "Hand one task to two surfaces and compare the artifacts that come back.",
      rows: [
        {
          label: "Editor",
          note: "Copilot in VS Code works beside the developer in agent mode",
          tag: "interactive",
          z: "local",
        },
        {
          label: "Terminal",
          note: "Copilot CLI plans before it builds and can run in a local sandbox",
          tag: "interactive",
          z: "local",
        },
        {
          label: "Cloud agent",
          note: "Assigned an issue, it works on GitHub and opens a draft pull request",
          tag: "asynchronous",
          z: "purple",
        },
        {
          label: "Agentic workflows",
          note: "Recurring repository chores run in GitHub Actions through safe outputs",
          tag: "scheduled",
          z: "green",
        },
        {
          label: "Copilot SDK",
          note: "Brings Copilot into the organization's own tools and services",
          tag: "embedded",
          z: "remote",
        },
      ],
    }),
    S("q-verification", 2, "Verification: Evidence Lands on the Pull Request", {
      scene: "answers",
      pill: "Four Questions · Verification",
      steps: { current: 4, total: 5 },
      subtitle:
        "Review, quality rules, scans, and checks report on the same change a person merges.",
      ask: "What evidence lands on the change before anyone merges it?",
      proof:
        "Open one agent pull request and list every check, review, and finding on its final commit.",
      rows: [
        {
          label: "Copilot code review",
          note: "Reviews on request or by ruleset, and again on each new push",
          tag: "AI review",
          z: "github",
        },
        {
          label: "Code Quality",
          note: "CodeQL quality rules on each push; standard findings can gate merge",
          tag: "rule-based",
          z: "green",
        },
        {
          label: "Autofix",
          note: "Suggests a fix for a Code Quality finding; a person commits it",
          tag: "suggested fix",
          z: "green",
        },
        {
          label: "Agent self-checks",
          note: "The cloud agent runs CodeQL, dependency, and secret scans first",
          tag: "in session log",
          z: "purple",
        },
        {
          label: "Required checks",
          note: "Actions workflows run on the pull request under repository rules",
          tag: "required",
          z: "local",
        },
      ],
    }),
    S("q-authority", 2, "Authority: One Policy Path Governs Copilot Surfaces", {
      scene: "answers",
      pill: "Four Questions · Authority",
      steps: { current: 5, total: 5 },
      subtitle:
        "Owners at each layer decide what agents may load, use, and change; metrics show what happened.",
      ask: "Who may change what the agent can do, and how is it audited?",
      proof:
        "Pick one developer and trace every effective setting to the layer that set it.",
      rows: [
        {
          label: "Layered policy",
          note: "Enterprise, org, team, repository, and personal layers, each owned",
          tag: "who decides",
          z: "orange",
        },
        {
          label: "Managed settings",
          note: "One governance repository sets what every Copilot client loads",
          tag: "reviewed by PR",
          z: "purple",
        },
        {
          label: "Model policy API",
          note: "Model availability per enterprise, team, agent app, and org",
          tag: "availability",
          z: "local",
        },
        {
          label: "Rulesets",
          note: "Required reviews and checks; the requester cannot approve the agent PR",
          tag: "merge rules",
          z: "github",
        },
        {
          label: "Metrics and telemetry",
          note: "Agent activity by API; OpenTelemetry with configurable capture",
          tag: "audit trail",
          z: "green",
        },
      ],
    }),

    S("p3-open", 3, "What an AI-Enabled SDLC Looks Like", {
      scene: "opener",
      subtitle:
        "One change flows from issue to agent to review to a measured, human-owned merge.",
      cards: [
        {
          icon: "🔀",
          title: "One pull request",
          blurb: "Evidence from three agents",
        },
        { icon: "🔁", title: "Recurring work", blurb: "Governed workflows" },
        { icon: "🚀", title: "Readiness", blurb: "The L3 launchpad" },
      ],
      terminal: {
        context: "issue → cloud agent → code review → Code Quality",
        detail: "a named human decides the merge",
      },
    }),
    S("one-pr", 3, "One Pull Request Carries Evidence From Three Agents", {
      pill: "AI-Enabled SDLC · The anchor",
      steps: { current: 1, total: 4 },
      subtitle:
        "A person assigns the issue, three agents add evidence to one pull request, and a named human decides the merge.",
      frameLabel: "One pull request · evidence on every push",
      stations: [
        {
          actor: "Person",
          title: "Issue",
          text: "Bounded task with acceptance criteria",
          z: "orange",
        },
        {
          actor: "Copilot",
          title: "Cloud agent",
          text: "Opens a draft PR with a session log",
          z: "purple",
        },
        {
          actor: "Copilot",
          title: "Code review",
          text: "Comments on the PR, again on each push",
          z: "github",
        },
        {
          actor: "GitHub",
          title: "Code Quality",
          text: "Rule findings on each push, with Autofix",
          z: "green",
        },
        {
          actor: "Named human",
          title: "Decides",
          text: "Steers rework, then merges or closes",
          z: "orange",
        },
      ],
      loop: "@copilot rework → a new push wakes review and Code Quality again",
      evidence: [
        {
          label: "The anchor · FanHub #221 (draft) ↗",
          text: "Cloud agent draft, eight pushes; every push woke Copilot code review and Code Quality.",
          href: "https://github.com/MSBart2/FanHub/pull/221",
          z: "green",
        },
        {
          label: "Separate PR · FanHub #210 · the merge step ↗",
          text: "A maintainer approved and merged a different cloud-agent PR; a revert is the recovery path.",
          href: "https://github.com/MSBart2/FanHub/pull/210",
          z: "orange",
        },
      ],
    }),
    S("recurring-work", 3, "Recurring Chores Run as Governed Workflows", {
      scene: "columns",
      pill: "AI-Enabled SDLC · Recurring work",
      steps: { current: 2, total: 4 },
      subtitle:
        "Agentic workflows run repository chores in GitHub Actions: the agent proposes, a separate job writes.",
      cols: [
        {
          icon: "🤖",
          title: "Agent job",
          who: "Read-only sandbox",
          z: "purple",
          rows: [
            {
              k: "Does",
              v: "Reads the repository, reasons, and proposes outputs",
            },
            { k: "Cannot", v: "Write to the repository" },
          ],
        },
        {
          icon: "🔍",
          title: "Threat detection",
          who: "Separate job",
          z: "orange",
          rows: [
            { k: "Does", v: "Scans the proposal for threats before any write" },
            { k: "Stops", v: "A flagged proposal means no write job runs" },
          ],
        },
        {
          icon: "⚙️",
          title: "Safe-outputs job",
          who: "Scoped token, no model",
          z: "green",
          rows: [
            { k: "Does", v: "Applies only the writes the workflow declares" },
            { k: "Cannot", v: "Exceed the declared maximums or allowlist" },
          ],
        },
      ],
      bar: {
        icon: "🧾",
        text: "Every run leaves an Actions record: the Markdown source, the compiled lock, and the run.",
        z: "purple",
      },
    }),
    S("readiness", 3, "Readiness: L3 Is the Launchpad", {
      scene: "ladder",
      pill: "AI-Enabled SDLC · Readiness",
      steps: { current: 3, total: 4 },
      subtitle:
        "Five maturity levels from a working build to AI-native delivery. At L3, agent pull requests meet the same bar as every other change.",
      levels: [
        { n: "L1", name: "Functional", note: "Builds and tests run" },
        { n: "L2", name: "Documented", note: "README and instructions" },
        { n: "L3", name: "Standardized", note: "CI/CD, security, owners", hero: true },
        { n: "L4", name: "Optimized", note: "MCP, agents, and skills" },
        { n: "L5", name: "Autonomous", note: "AI-native delivery" },
      ],
      heroTag: "Launchpad",
      pillarsLabel: "What L3 asks of the repository and the team",
      cols: [
        {
          icon: "🧭",
          title: "Reliable context",
          z: "purple",
          text: "AGENTS.md, repository instructions, and a deterministic agent setup",
        },
        {
          icon: "✅",
          title: "Repeatable checks",
          z: "green",
          text: "CI build, test, and lint; security scans on every pull request; CODEOWNERS on main",
        },
        {
          icon: "🔁",
          title: "Habitual use",
          z: "local",
          text: "Daily Copilot use, delegated issues with acceptance criteria, automatic review",
        },
      ],
    }),
    S("boundary", 3, "The Case Is Strongest Where GitHub Holds the Work", {
      scene: "quad",
      pill: "AI-Enabled SDLC · Boundary",
      steps: { current: 4, total: 4 },
      subtitle:
        "Where the platform fits, how it is licensed and paid for, how to read its numbers, and what stays with people.",
      cards: [
        {
          icon: "🎯",
          title: "Fit",
          tag: "strongest",
          z: "green",
          text: "GitHub is already the system of record for code and pull requests.",
        },
        {
          icon: "🎟️",
          title: "Licensing and spend",
          tag: "new · Oct 2026",
          z: "local",
          text: "GitHub Enterprise now includes Copilot: no separate seat. Usage meters against the enterprise budget.",
        },
        {
          icon: "📏",
          title: "Reading the numbers",
          tag: "directional",
          z: "orange",
          text: "Impact dashboard ROI is an estimate from AI credits and a salary input, not payroll data.",
        },
        {
          icon: "🧑‍⚖️",
          title: "Human authority",
          tag: "named people",
          z: "orange",
          text: "Merge, production release, access changes, and risk acceptance stay with named people.",
        },
      ],
    }),

    S("p4-open", 4, "Prove It in Your Org", {
      scene: "opener",
      subtitle:
        "A 90-day platform pilot with a baseline, platform metrics, and a gate dated before launch.",
      cards: [
        { icon: "🎯", title: "One team", blurb: "One repeatable workflow" },
        {
          icon: "📊",
          title: "Platform metrics",
          blurb: "Plus DORA delivery measures",
        },
        {
          icon: "🗳️",
          title: "Dated gate",
          blurb: "Scale, adjust once, or stop",
        },
      ],
      terminal: {
        context: "4-week baseline → 90-day pilot",
        detail: "thresholds dated before launch",
      },
    }),
    S("pilot-shape", 4, "One Team, One Workflow, Ninety Days", {
      scene: "pilot-plan",
      pill: "Prove It · Pilot shape",
      steps: { current: 1, total: 3 },
      timeline: [
        { label: "Baseline", detail: "4 weeks", weeks: 4, z: "local" },
        { label: "Thresholds dated", detail: "signed before launch", milestone: true },
        { label: "Pilot", detail: "90 days", weeks: 13, z: "purple" },
        { label: "Gate", detail: "day 90", milestone: true },
      ],
      docLabel: "Pilot charter",
      owners: "Every field named before launch",
      groups: [
        {
          title: "Scope",
          icon: "🎯",
          z: "green",
          fields: [
            { k: "Team", v: "One named team doing its normal work" },
            { k: "Workflow", v: "One repeatable flow, such as issue to merged PR" },
          ],
        },
        {
          title: "Owners",
          icon: "👥",
          z: "purple",
          fields: [
            { k: "Executive sponsor", v: "CTO: funding, escalation, gate call" },
            { k: "Operational owner", v: "VP of Engineering: execution and results" },
            { k: "Platform owner", v: "Platform team: policy, settings, metrics" },
            { k: "Measurement custodian", v: "Independent of the team that runs the pilot" },
          ],
        },
        {
          title: "Timing",
          icon: "📅",
          z: "local",
          fields: [
            { k: "Baseline", v: "Four weeks of comparable delivery data" },
            { k: "Return date", v: "Day 90, inside a real planning cycle" },
          ],
        },
      ],
      footnote:
        "Thresholds, sample sizes, and floors are organization-specific; the charter dates them before launch.",
    }),
    S("measures", 4, "Platform Metrics and DORA Measure the Pilot", {
      scene: "columns",
      pill: "Prove It · Measures",
      steps: { current: 2, total: 3 },
      cols: [
        {
          icon: "📊",
          title: "Usage metrics API",
          who: "Read by the platform owner",
          z: "local",
          rows: [
            {
              k: "Counts",
              v: "Activity by user, plugin, and agent, including partner agent apps",
            },
            {
              k: "Code review",
              v: "Addressed rate: Copilot comments evaluated versus addressed, per repository",
            },
            { k: "Evidence class", v: "Internal baseline and pilot record" },
          ],
        },
        {
          icon: "💹",
          title: "Impact dashboard",
          who: "Read by the sponsor and custodian",
          z: "purple",
          rows: [
            {
              k: "Shows",
              v: "A return-on-investment section and opt-in industry comparisons",
            },
            {
              k: "Evidence class",
              v: "Modeled scenario; GitHub calls it directional",
            },
          ],
        },
        {
          icon: "🚀",
          title: "DORA delivery metrics",
          who: "Kept by the measurement custodian",
          z: "green",
          rows: [
            {
              k: "Tracks",
              v: "Lead time, deployment frequency, change failure rate, and recovery time",
            },
            { k: "Evidence class", v: "Internal baseline, compared at day 90" },
          ],
        },
      ],
      bar: {
        icon: "🏷️",
        text: "Every number carries a class: external, internal baseline, modeled, or proposed threshold.",
        z: "purple",
      },
    }),
    S("gate", 4, "Thresholds Dated Before Launch Decide the Outcome", {
      scene: "dispositions",
      pill: "Prove It · The gate",
      steps: { current: 3, total: 3 },
      gate: "Thresholds dated before launch, applied by the custodian",
      branches: [
        {
          icon: "📈",
          title: "Scale",
          z: "green",
          text: "Delivery thresholds are met against the baseline, every quality and security floor holds, and use stays habitual.",
        },
        {
          icon: "🔧",
          title: "Adjust once",
          note: "↺ returns to the gate one time",
          z: "accent",
          text: "The directional signal holds with no control failure, and one fix to context, checks, or settings has an owner and a date.",
        },
        {
          icon: "🛑",
          title: "Stop",
          z: "orange",
          text: "A control failure, a missed quality or security floor, a missed directional signal, or an adjustment that misses its gate.",
        },
      ],
      stop: {
        label: "Immediate stop · any day",
        text: "Authority or control failure",
      },
    }),

    S("before-after", 0, "From Tool Trial to Platform Decision", {
      scene: "recap",
      pill: "The Value Recap",
      rows: [
        {
          part: "1",
          z: "local",
          icon: "🧭",
          before: "The model is treated as the platform decision",
          after: "The system around the model is what gets evaluated",
        },
        {
          part: "2",
          z: "remote",
          icon: "❓",
          before: "Bake-offs compare editor demos and model output",
          after: "Every vendor answers the same four questions",
        },
        {
          part: "3",
          z: "github",
          icon: "🔀",
          before: "Agent work lands outside review and policy",
          after: "Agent work lands on the pull request as evidence",
        },
        {
          part: "4",
          z: "runtime",
          icon: "📏",
          before: "Success is judged by anecdotes after rollout",
          after: "Thresholds are dated before a 90-day pilot",
        },
      ],
      metrics: [
        {
          value: "4 questions",
          detail: "context · delegation · verification · authority",
        },
        {
          value: "1 pull request",
          detail: "three agents' evidence, one human decision",
        },
        { value: "90 days", detail: "one team, one workflow, one gate" },
      ],
    }),
    S("today", 0, "Three Moves Start the Decision", {
      pill: "Leadership Actions",
      horizons: [
        {
          icon: "🎯",
          label: "This Week",
          z: "green",
          items: [
            "Name one team and one repeatable workflow",
            "Name the sponsor, platform owner, and custodian",
            "Put the four questions to every vendor",
          ],
        },
        {
          icon: "📊",
          label: "Baseline",
          z: "local",
          items: [
            "Record four weeks of delivery data",
            "Turn on usage metrics and the impact dashboard",
            "Check the team against the L3 readiness bar",
          ],
        },
        {
          icon: "📋",
          label: "Before Launch",
          z: "purple",
          items: [
            "Date the thresholds and stop conditions",
            "Set model policy and managed settings for the team",
            "Record the day-90 return date",
          ],
        },
      ],
      takeaway:
        "The pilot starts once the thresholds and the return date are written down.",
    }),
    S("references", 0, "References", {
      groups: [
        {
          icon: "📊",
          title: "Outcome Evidence",
          z: "remote",
          items: [
            {
              href: "https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/",
              label: "Octoverse 2026",
              description:
                "GitHub platform telemetry on agent pull requests and Copilot usage.",
            },
            {
              href: "https://github.blog/changelog/2026-07-22-new-copilot-usage-metrics-impact-dashboard/",
              label: "Copilot impact dashboard and adoption cohorts",
              description:
                "Code-first, agent-first, and multi-agent cohorts per enterprise.",
            },
            {
              href: "https://dora.dev/research/2025/dora-report/",
              label: "DORA: State of AI-assisted Software Development, 2025",
              description:
                "Google Cloud research; GitHub is a research partner.",
            },
            {
              href: "https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/",
              label: "Copilot Fusion GA, 2026",
              description:
                "Model routing, effort tiers, and a first-party benchmark.",
            },
          ],
        },
        {
          icon: "🛡️",
          title: "Platform and Governance",
          z: "purple",
          items: [
            {
              href: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
              label: "About Copilot cloud agent",
              description: "Issue to draft pull request, with human approval.",
            },
            {
              href: "https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/",
              label: "Copilot model policy API",
              description:
                "Availability per enterprise, team, agent app, and org.",
            },
            {
              href: "https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section",
              label: "Impact dashboard ROI section",
              description: "Directional return-on-investment view.",
            },
            {
              href: "https://github.blog/changelog/2026-11-05-usage-metrics-api-adds-code-review-details-and-addressed-rate",
              label: "Usage metrics: code review addressed rate",
              description:
                "Copilot review comments evaluated versus addressed.",
            },
          ],
        },
      ],
    }),
    S("thanks", 0, "Better Software, Faster", {
      chrome: false,
      subtitle: "Evaluate the system around the model. Prove it on one team.",
      cards: [
        { value: "4 questions", detail: "For every AI platform vendor" },
        {
          value: "1 pull request",
          detail: "Evidence from three agents; a named human decides",
        },
        { value: "90 days", detail: "One team, one workflow, one dated gate" },
      ],
      prompt: "Which team and which workflow will carry the 90-day pilot?",
    }),
  ];

  /* Speaker notes: the talk track for each slide.
     notes: lines starting with " are spoken; lines starting with → bridge to the next slide; others are presenter direction.
     know: facts to have ready for questions. sources: evidence. seconds: time budget (estimates until a timed run-through). */
  const SRC = {
    octoverse: {
      label: "Octoverse 2026: commits and pushes reach new highs as developers build with agents (first-party)",
      href: "https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/",
    },
    cohorts: {
      label: "Changelog 2026-05-29: usage metrics API adds cohorts for AI adoption",
      href: "https://github.blog/changelog/2026-05-29-copilot-usage-metrics-api-adds-cohorts-for-ai-adoption/",
    },
    impactDash: {
      label: "Changelog 2026-07-22: new Copilot usage metrics impact dashboard",
      href: "https://github.blog/changelog/2026-07-22-new-copilot-usage-metrics-impact-dashboard/",
    },
    impactChat: {
      label: "Changelog 2026-11-06: impact dashboard adds chat and VS Code agent usage",
      href: "https://github.blog/changelog/2026-11-06-copilot-impact-dashboard-adds-chat-and-vs-code-agent-usage",
    },
    genaiTerms: {
      label: "GitHub Generative AI Services Terms (March 2026): ownership, no training, defense of claims",
      href: "https://github.com/customer-terms/github-generative-ai-services-terms",
    },
    trustCenter: {
      label: "GitHub Copilot Trust Center: certifications, IP indemnification FAQ",
      href: "https://copilot.github.trust.page/",
    },
    codeRef: {
      label: "GitHub Docs: references to matching public code",
      href: "https://docs.github.com/en/copilot/concepts/completions/code-referencing",
    },
    metr: {
      label:
        "METR: early-2025 AI and experienced open-source developers (independent)",
      href: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",
    },
    dora: {
      label: "DORA: 2025 State of AI-assisted Software Development",
      href: "https://dora.dev/research/2025/dora-report/",
    },
    doraNews: {
      label: "Google Cloud, 2025-09-23: announcing the 2025 DORA report",
      href: "https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report",
    },
    reviewRate: {
      label:
        "Changelog 2026-11-05: usage metrics API adds code review details and addressed rate",
      href: "https://github.blog/changelog/2026-11-05-usage-metrics-api-adds-code-review-details-and-addressed-rate",
    },
    agentrc: {
      label: "AgentRC concepts and maturity model",
      href: "https://github.com/microsoft/agentrc/blob/main/docs/concepts.md",
    },
    actions: {
      label: "GitHub Actions documentation",
      href: "https://docs.github.com/en/actions",
    },
    fusion: {
      label:
        "Changelog 2026-10-28: Copilot Fusion GA (includes a first-party benchmark)",
      href: "https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/",
    },
    modelPolicy: {
      label: "Changelog 2026-10-19: Copilot model policy API",
      href: "https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/",
    },
    agentActivity: {
      label: "Changelog 2026-08-07: usage metrics API adds agent app activity",
      href: "https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity",
    },
    roi: {
      label: "Changelog 2026-08-07: impact dashboard ROI section",
      href: "https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section",
    },
    industry: {
      label:
        "Changelog 2026-10-22: industry comparisons in the impact dashboard",
      href: "https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard",
    },
    ghe: {
      label: "Changelog 2026-10-28: GitHub Enterprise includes Copilot",
      href: "https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/",
    },
    cloud: {
      label: "About Copilot cloud agent",
      href: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent",
    },
    best: {
      label: "Get the best results from Copilot cloud agent",
      href: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results",
    },
    cloudRisks: {
      label: "Copilot cloud agent: risks and mitigations",
      href: "https://docs.github.com/copilot/concepts/agents/cloud-agent/risks-and-mitigations",
    },
    review: {
      label: "About Copilot code review",
      href: "https://docs.github.com/en/copilot/concepts/agents/code-review",
    },
    reviewSetup: {
      label: "Configure automatic Copilot code review",
      href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review",
    },
    approvals: {
      label:
        "Changelog 2026-09-01: Copilot code review can approve pull requests (preview)",
      href: "https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/",
    },
    agentInstructions: {
      label: "Changelog 2025-11-12: agent-specific instructions",
      href: "https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/",
    },
    quality: {
      label: "About GitHub Code Quality",
      href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality",
    },
    qualityGA: {
      label: "Changelog 2026-07-20: GitHub Code Quality is generally available",
      href: "https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/",
    },
    pr221: {
      label: "FanHub draft #221: one issue through all three agents",
      href: "https://github.com/MSBart2/FanHub/pull/221",
    },
    pr210: {
      label: "FanHub #210: cloud-agent pull request and maintainer merge",
      href: "https://github.com/MSBart2/FanHub/pull/210",
    },
    pr201: {
      label: "FanHub #201: Code Quality Autofix demonstration",
      href: "https://github.com/MSBart2/FanHub/pull/201",
    },
    customAgents: {
      label: "About custom agents",
      href: "https://docs.github.com/en/copilot/concepts/customizations/custom-agents",
    },
    customAgentsRef: {
      label: "Custom agents configuration reference",
      href: "https://docs.github.com/en/copilot/reference/custom-agents-configuration",
    },
    orgInstr: {
      label: "Add organization custom instructions",
      href: "https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-organization-instructions",
    },
    mcpAllow: {
      label: "Configure an MCP server allowlist for your enterprise",
      href: "https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist",
    },
    spaces: {
      label: "Changelog 2025-10-17: knowledge bases convert to Copilot Spaces",
      href: "https://github.blog/changelog/2025-10-17-copilot-knowledge-bases-can-now-be-converted-to-copilot-spaces",
    },
    foundryMcp: {
      label: "Query a knowledge base via API or MCP (Azure AI Search)",
      href: "https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-retrieve",
    },
    vscode: {
      label: "GitHub Copilot in VS Code",
      href: "https://code.visualstudio.com/docs/copilot/overview",
    },
    cli: {
      label: "About Copilot CLI",
      href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli",
    },
    cliPlan: {
      label: "Changelog 2026-01-21: Copilot CLI plan before you build",
      href: "https://github.blog/changelog/2026-01-21-github-copilot-cli-plan-before-you-build-steer-as-you-go/",
    },
    sandbox: {
      label: "Changelog 2026-10-07: local sandboxing GA",
      href: "https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available",
    },
    sdk: {
      label: "GitHub Copilot SDK",
      href: "https://github.com/github/copilot-sdk",
    },
    aw: {
      label: "GitHub Agentic Workflows overview",
      href: "https://github.github.com/gh-aw/introduction/overview/",
    },
    awArch: {
      label: "GitHub Agentic Workflows security architecture",
      href: "https://github.github.com/gh-aw/introduction/architecture/",
    },
    safeOutputs: {
      label: "GitHub Agentic Workflows: safe outputs",
      href: "https://github.github.com/gh-aw/reference/safe-outputs/",
    },
    staged: {
      label: "GitHub Agentic Workflows: staged mode",
      href: "https://github.github.com/gh-aw/reference/staged-mode/",
    },
    policies: {
      label: "Copilot policies for enterprises",
      href: "https://docs.github.com/copilot/concepts/enterprise/policies",
    },
    managedRef: {
      label: "Enterprise managed settings reference",
      href: "https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings",
    },
    managedEnforce: {
      label: "Changelog 2026-10-13: managed settings enforcement updates",
      href: "https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates",
    },
    rulesets: {
      label: "Available rules for rulesets",
      href: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets",
    },
    otel: {
      label: "OpenTelemetry for agent monitoring",
      href: "https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry",
    },
    telemetry: {
      label:
        "Changelog 2026-10-12: telemetry attribution and configurable capture",
      href: "https://github.blog/changelog/2026-10-12-client-telemetry-user-attribution-and-configurable-capture/",
    },
  };

  const NOTES = {
    title: {
      seconds: 45,
      notes: [
        `"Every engineering organization is choosing an AI platform for its software delivery. This briefing gives technical leaders a way to make that choice on evidence."`,
        `Point at the visual: one pull request, three agents adding evidence to it, and a named human deciding what happens next.`,
        `→ Start with the question leaders already ask.`,
      ],
      know: [
        `Audience: CTOs, VPs of Engineering, and heads of platform engineering and developer experience who choose and standardize the AI coding platform.`,
        `Format: a 45-minute executive briefing. The slide budgets total 41 minutes, leaving about four minutes for questions. Budgets are estimates until a presenter times a run-through.`,
        `This briefing names no competitor. The four evaluation questions apply to any vendor.`,
      ],
    },
    "core-question": {
      seconds: 60,
      notes: [
        `"Which AI platform helps my teams ship better software, faster? That is the question on the table."`,
        `"The short answer: AI amplifies the delivery system it runs in. The platform that puts agents inside the system of record, where code, pull requests, checks, security, and policy already live, turns every agent action into evidence the organization can review."`,
        `Point at the diagram from the center out: the model in the middle changes monthly; the four questions around it decide whether its work is usable; the system of record around everything is where code, pull requests, checks, and policy already live.`,
        `Name the four lenses once: context, delegation, verification, authority. They become the four evaluation questions in part two.`,
        `"This briefing is for the people who choose the standard: the CTO, the VP of Engineering who owns delivery quality, and the platform and DevEx lead who configures the controls."`,
        `→ Four parts get there.`,
      ],
      know: [
        `Tension: tool bake-offs compare editor demos and model output, and both change monthly. Copilot itself routes models and hosts partner agent apps under one policy and one metrics surface, so the durable decision is the system around the model.`,
        `GitHub Copilot is built for the system-of-record position. The case is strongest where GitHub already holds code and pull requests; part three names that boundary.`,
      ],
    },
    contents: {
      seconds: 30,
      notes: [
        `"First, why leaders look past the model to the system around it. Then four questions any vendor can be held to. Then what an AI-enabled SDLC looks like on one pull request. Finally, how to prove it in this organization before standardizing."`,
        `Parts two and three carry the most time; they hold the competitive case and the anchor demonstration.`,
      ],
    },

    "p1-open": {
      seconds: 30,
      notes: [
        `"Part one reframes the decision. Choosing an AI platform is choosing how agents join the delivery system."`,
        `→ Start with what the research says.`,
      ],
    },
    "outcomes-vary": {
      seconds: 120,
      sources: [SRC.octoverse, SRC.cohorts, SRC.impactDash, SRC.impactChat, SRC.roi, SRC.metr],
      notes: [
        `"GitHub's own 2026 data shows how fast agent work went mainstream."`,
        `Left: Octoverse 2026 covers all GitHub activity from October 2025 through September 2026. By September, more than 40% of pull requests started with an agent's first draft, up from 17% in March: 110 million in September alone. Agent-involved pull requests merged within two weeks 90% of the time, against about 86% for pull requests without detected agent involvement. Among Copilot's monthly active users, 55% now use agentic features, up from 35% a year earlier.`,
        `"That is platform-wide telemetry from GitHub, so it carries GitHub's interest. It shows direction. It does not show what this organization will get."`,
        `Right: "This is where an organization's own answer lives. The Copilot impact dashboard sorts each engaged developer into an adoption cohort over a rolling 28 days: code-first, agent-first, or multi-agent. For each cohort it reports pull requests merged per developer per month and median merge time, and the ROI section puts cost per developer beside that output."`,
        `"The platform trend says agents are now how software ships. Your cohorts say whether that pays off here."`,
      ],
      know: [
        `Octoverse 2026 counts public and private repositories. Agent signals are a floor; not all agent use is detected. Agent-started pull requests also change multiple files more often: 87% versus 79%.`,
        `Copilot cloud agent usage grew 230% year over year, against 85% for agent chat. Usage of AI-assisted code review and GitHub Advanced Security each grew more than 90% year over year.`,
        `Cohort definitions (usage metrics API, v1): Phase 1 code-first uses completions or IDE agent mode; Phase 2 agent-first uses one GitHub-based agent surface (cloud agent, code review, or CLI); Phase 3 multi-agent uses two or more, or the Copilot app. Each needs use on at least two days in 28. Users below that line are now labeled chat-first.`,
        `GitHub labels the ROI section directional: cost comes from AI credit consumption, and the salary selector is a modeling input, not payroll data.`,
        `Independent counterpoint for questions: METR's 2025 randomized study found 16 experienced open-source developers took 19% longer on eligible tasks with AI assistance while expecting to finish faster. Expectations and measurements can diverge, which is why part four assigns measurement to an independent custodian.`,
      ],
    },
    "mirror-multiplier": {
      seconds: 120,
      sources: [SRC.dora, SRC.doraNews],
      notes: [
        `"DORA's 2025 report puts it plainly: AI's primary role is as an amplifier. It magnifies an organization's existing strengths and weaknesses."`,
        `"Here is the finding that matters for this decision. AI adoption now tracks with higher software delivery throughput and product performance, and it still tracks with lower delivery stability."`,
        `Walk the rows. DORA names the control systems: strong automated testing, mature version control, and fast feedback loops. Without them, more change volume leads to instability.`,
        `"So the evaluation has to include the system around the tool. Verification and authority are the questions that turn added throughput into stable delivery."`,
        `→ And the tool itself keeps changing.`,
      ],
      know: [
        `DORA is a Google Cloud research program; GitHub is listed as a research partner on the 2025 report.`,
        `The 2025 report surveyed nearly 5,000 technology professionals. 90% of respondents use AI at work; 30% report little or no trust in AI-generated code.`,
        `DORA: "The greatest returns on AI investment come not from the tools themselves, but from a strategic focus on the underlying organizational system."`,
        `DORA also finds that a high-quality internal platform correlates with an organization's ability to unlock AI value.`,
        `These are survey correlations across organizations. They describe a pattern; they do not predict this organization's results, which is what the pilot in part four measures.`,
      ],
    },
    "moving-target": {
      seconds: 150,
      sources: [SRC.fusion, SRC.modelPolicy, SRC.agentActivity],
      notes: [
        `"Model leaderboards move every month. A bake-off that crowns a model this quarter is out of date next quarter."`,
        `Left card: "At Fusion GA, GitHub published its own benchmark: Copilot Fusion Max scored 60 on the Artificial Analysis Coding Agent Index, within two points of a leading competitor configuration, at about half the average API cost per task, about half the tokens, and about 40% less time." Point at the orange tag: this is a first-party benchmark from a commercially interested source, and it will date like every other leaderboard.`,
        `Right column: "What holds steady is the system around the model. Fusion routes or combines whichever models the policy enables. The model policy API sets availability at four levels: enterprise, enterprise team, agent apps, and organization. And partner agent apps from other AI vendors report activity into the same usage metrics."`,
        `"So the durable evaluation is the routing, the policy, and the metrics. The model inside them is free to change."`,
        `→ Part two turns that into four questions.`,
      ],
      know: [
        `Copilot Fusion is generally available as of 2026-10-28. It replaces the Auto option and routes or combines models at Standard, High, or Max effort. Admins can disable a model for Fusion alone.`,
        `The benchmark is vendor-reported. The competitor configuration stays unnamed in this briefing, and the number is never presented as an independent or local result.`,
        `Managed settings set the default model and the Fusion effort tier per enterprise or team; the model policy API decides which models are available at all. Fusion only routes among enabled models.`,
        `Third-party agent app activity joins the usage metrics on agent_id.`,
      ],
    },

    "p2-open": {
      seconds: 30,
      notes: [
        `"Part two gives leaders four questions to put to any AI platform vendor, then shows the first-party Copilot answer for each."`,
        `→ The four questions.`,
      ],
    },
    "four-questions": {
      seconds: 120,
      sources: [SRC.genaiTerms, SRC.trustCenter, SRC.codeRef],
      notes: [
        `"These four questions work for any vendor in an evaluation."`,
        `Context: where does the agent's context come from, and who governs it? Delegation: where can work be handed off, and does one agent definition travel? Verification: what evidence lands on the change before anyone merges it? Authority: who may change what the agent can do, and how is it audited?`,
        `"Each question asks for something observable. A vendor answers with a demonstration on the organization's own repository."`,
        `Point at the strip: "Under all four sits the contract. Ask every vendor for the same four answers in writing."`,
        `"GitHub's Generative AI Services Terms, current since March 2026, say GitHub does not own inputs or outputs, will not use them to train generative AI models without documented instructions, and extends the agreement's defense of third-party claims to outputs. GitHub is certified to ISO/IEC 42001, the AI management system standard."`,
        `→ Context first.`,
      ],
      know: [
        `The four questions map to the judgment lenses used across this curriculum: context, delegation, verification, and authority.`,
        `The proof request on each of the next four slides is the evaluation step: what to ask a vendor to show.`,
        `Defense of third-party claims applies "if your Agreement provides for the defense of third party claims," and use is subject to the Required Mitigations of the Microsoft Customer Copyright Commitment (aka.ms/AIfilters). Turn on the policy that blocks suggestions matching public code, and confirm the coverage with the account team and legal; the presenter does not give legal advice.`,
        `Customers who buy GitHub through Microsoft are governed by the Microsoft Product Terms for GitHub Offerings instead of the GitHub terms. Copilot Business and Enterprise bought directly from GitHub before 5 March 2026 stay on the archived Copilot Product Specific Terms until renewal.`,
        `Third-party models GitHub makes available through Copilot's controls are part of the service under the terms, rather than separate third-party products. Marketplace products and third-party agent templates are excluded.`,
        `Public-code matches occur in less than one percent of inline suggestions. With the policy set to show matches, Copilot shows references and detected licenses, including in agent session logs.`,
        `The Copilot Trust Center lists SOC 1, SOC 2, and SOC 3 reports, ISO/IEC 27001, CSA STAR Level 2, TISAX, and ISO/IEC 42001:2023 (announced 25 March 2026).`,
      ],
    },
    "q-context": {
      seconds: 150,
      sources: [
        SRC.cloud,
        SRC.best,
        SRC.agentInstructions,
        SRC.customAgents,
        SRC.mcpAllow,
        SRC.spaces,
        SRC.foundryMcp,
      ],
      notes: [
        `Left panel: the question and the proof to request from every vendor.`,
        `"Copilot's answer starts with the system of record. Assign an issue to the cloud agent and the issue and the repository become its task."`,
        `"Standing context is versioned: repository instructions and AGENTS.md live in the repository and change through pull requests. A custom agent is one file that every Copilot surface reads."`,
        `"Context from outside the repository is governed. An enterprise allowlist decides which MCP servers clients may start. When a decision needs organizational knowledge, Copilot Spaces or a Foundry IQ knowledge base over MCP supplies it."`,
        `→ Next: where the work can be handed off.`,
      ],
      know: [
        `Organization instructions reach the cloud agent and code review; they stay out of a local CLI session. Agent-specific instructions can target one agent with excludeAgent.`,
        `Every Copilot surface reads a custom agent's description and body; each surface honors its own set of frontmatter fields.`,
        `Knowledge Bases convert to Copilot Spaces, which reference content across repositories.`,
        `In the Foundry pattern, Copilot stays the only agent and calls the knowledge base as the developer, so identity, read access, and human approval stay separate. Add it only when a consequential question needs evidence beyond the repository.`,
      ],
    },
    "q-delegation": {
      seconds: 150,
      sources: [
        SRC.vscode,
        SRC.cli,
        SRC.cliPlan,
        SRC.sandbox,
        SRC.cloud,
        SRC.aw,
        SRC.sdk,
        SRC.customAgentsRef,
      ],
      notes: [
        `"Work starts in different places, so delegation has to meet it there."`,
        `"In the editor, Copilot works beside the developer. In the terminal, Copilot CLI plans before it builds and can run inside a local sandbox. On GitHub, the cloud agent takes an assigned issue and returns a draft pull request."`,
        `"Recurring repository chores run as agentic workflows in GitHub Actions. And the Copilot SDK brings Copilot into the organization's own tools."`,
        `"The same custom agent file travels across the editor, the CLI, the cloud agent, and the Copilot app, so the team defines a role once."`,
        `→ Next: what evidence comes back.`,
      ],
      know: [
        `Custom agents live in .github/agents/ or ~/.copilot/agents/. Fields whose meaning differs by surface are placed deliberately; the portable core is the description and body.`,
        `Local sandboxing for Copilot is generally available as of 2026-10-07.`,
        `Interactive surfaces keep the developer in the loop turn by turn; asynchronous and scheduled surfaces return a reviewable artifact.`,
      ],
    },
    "q-verification": {
      seconds: 150,
      sources: [
        SRC.review,
        SRC.reviewSetup,
        SRC.quality,
        SRC.qualityGA,
        SRC.pr201,
        SRC.cloudRisks,
        SRC.actions,
      ],
      notes: [
        `"Verification is where the system-of-record position pays off. The evidence lands on the same pull request a person merges."`,
        `"Copilot code review runs when someone requests it or a ruleset does, and again on each new push. Code Quality runs CodeQL quality rules on each push; standard findings can gate the merge, and Autofix suggests a change that a person commits."`,
        `"Before the cloud agent finishes, it runs CodeQL, checks new dependencies, and runs secret scanning, and the session log shows it. Required Actions workflows run on the pull request under the repository's rules."`,
        `→ Last question: who controls all of this.`,
      ],
      know: [
        `Code Quality is generally available as of 2026-07-20. On pull requests it posts rules-based CodeQL findings only; AI-powered analysis runs on recently changed default-branch code and consumes AI credits.`,
        `Security CodeQL and secret scanning are separate analyses from Code Quality; a clean quality run is evidence about quality rules only.`,
        `In preview, Copilot code review can approve pull requests. The merge decision still sits with a person under the repository's rules.`,
        `By default, workflow runs on a cloud-agent pull request wait for a person with write access to select Approve and run.`,
      ],
    },
    "q-authority": {
      seconds: 150,
      sources: [
        SRC.policies,
        SRC.managedRef,
        SRC.managedEnforce,
        SRC.modelPolicy,
        SRC.rulesets,
        SRC.cloud,
        SRC.agentActivity,
        SRC.otel,
        SRC.telemetry,
      ],
      notes: [
        `"Authority is layered. Enterprise, organization, team, repository, and personal layers each have an owner, and each owner decides only what their layer controls."`,
        `"Managed settings live in one governance repository that changes by pull request, and they set what every Copilot client loads. The model policy API sets model availability per enterprise, team, agent app, and organization."`,
        `"Rulesets keep merge authority human: required reviews and checks, and the person who asked Copilot cannot approve its pull request."`,
        `"Usage metrics report agent activity by API, and OpenTelemetry attributes activity to identity with configurable content capture."`,
        `→ Part three puts it all on one pull request.`,
      ],
      know: [
        `Policies decide what is allowed; managed settings decide what each client loads. Team files resolve by least restrictive value per key, beneath enterprise settings.`,
        `The enterprise-patterns talk includes a thirteen-row effective-settings checklist: one developer, every value, and the layer that set it. That is the proof request on this slide.`,
        `The cloud agent cannot mark its own pull request ready, approve it, or merge it.`,
      ],
    },

    "p3-open": {
      seconds: 30,
      notes: [
        `"Part three makes better software, faster, concrete: what an AI-enabled SDLC looks like on one change."`,
        `→ The anchor.`,
      ],
    },
    "one-pr": {
      seconds: 180,
      sources: [SRC.pr221, SRC.pr210, SRC.cloud, SRC.review, SRC.quality],
      notes: [
        `"Here is the picture to carry out of this briefing: one pull request carrying evidence from three agents, decided by a named human."`,
        `Walk left to right. A person writes a bounded issue and assigns it to Copilot. The cloud agent opens a draft pull request with a session log. Copilot code review comments on the change. Code Quality runs its rules and can offer Autofix. A named human reads all of it.`,
        `Point at the loop: "When the human asks @copilot for rework, the agent pushes again, and the new push wakes review and Code Quality again. Every round leaves evidence on the same pull request."`,
        `Point at the green card: "This is the anchor, observed on a public demo repository. On FanHub pull request 221, the cloud agent opened a draft, and across eight pushes every push woke Copilot code review and Code Quality. Evidence from three agents, on one pull request."`,
        `Point at the orange card: "Pull request 221 is still a draft, so it has not been merged. The merge step comes from a separate pull request, 210: a maintainer approved a cloud-agent pull request and merged it, and a revert is the recovery path."`,
        `"Every agent action lands where the organization already reviews, checks, and audits change, and a named human decides the merge."`,
      ],
      know: [
        `#221 and #210 are different pull requests. #221 shows evidence from three agents on one pull request; #210 shows only the human approval and merge step.`,
        `The FanHub runs are single observed runs on a demonstration repository, not performance benchmarks. On #221, scans started about five seconds after each push and a finding appeared about 100 seconds after its push (one run, 2026-10-23).`,
        `The cloud agent cannot mark its pull request ready, approve it, or merge it. The requester cannot approve the agent-produced pull request either.`,
        `Review new pushes multiplies review cost per pull request; the platform owner sets it deliberately.`,
      ],
    },
    "recurring-work": {
      seconds: 120,
      sources: [SRC.aw, SRC.awArch, SRC.safeOutputs, SRC.staged],
      notes: [
        `"Not all agent work starts from an issue. Recurring chores, such as triage, reports, and CI diagnosis, run as agentic workflows in GitHub Actions."`,
        `Walk the three jobs. "The agent job runs in a read-only sandbox: it reads, reasons, and proposes. Threat detection scans the proposal; a flagged proposal means nothing gets written. Only then does a separate safe-outputs job, holding a scoped token and no model, apply the writes the workflow declared, within its maximums and allowlist."`,
        `"Every run leaves an Actions record: the Markdown source a person reviewed, the compiled lock, and the run itself."`,
        `→ What has to be true before any of this works well?`,
      ],
      know: [
        `Staged mode is a dry run: the agent works and the declared writes become previews in the run summary. Teams remove staged mode once the previews match maintainer judgment.`,
        `CI recompiles the workflow and rejects a lock file that drifts from its Markdown source.`,
        `Every job that runs a model is read-only.`,
      ],
    },
    readiness: {
      seconds: 120,
      sources: [SRC.agentrc, SRC.actions],
      notes: [
        `"In the AgentRC maturity model, every repository sits on one of five levels: functional, documented, standardized, optimized, and autonomous."`,
        `Walk the staircase. L1: builds and tests run. L2: README, contributing guide, and custom instructions exist. L3, standardized: CI/CD, security policies, CODEOWNERS, and observability. L4: MCP servers, custom agents, and skills are configured. L5: AI-native development with minimal oversight.`,
        `"L3 is the launchpad. Below it, agents add change faster than the repository can check it. At L3, three things hold."`,
        `Walk the cards. Reliable context: AGENTS.md, repository instructions, and a deterministic agent setup. Repeatable checks: CI build, test, and lint, security scans on every pull request, and CODEOWNERS on main. Habitual use: daily Copilot use, delegated issues with acceptance criteria, and automatic review.`,
        `"When all three hold, agent pull requests meet the bar every other change meets. L4 and L5 build on that floor; they do not replace it."`,
        `→ And the honest boundaries.`,
      ],
      know: [
        `AgentRC computes the level from a readiness score across nine pillars (style, build, testing, docs, dev environment, code quality, observability, security, and AI tooling). Teams can enforce a minimum in CI with agentrc readiness --fail-level 3.`,
        `"Launchpad" is this curriculum's framing (from the Agentic SDLC talk); AgentRC names the level Standardized. The three pillars are the Agentic SDLC talk's summary of what L3 asks of a team.`,
        `Signals to fix: unclear setup calls for documentation; manual CI steps call for automation; vague issues call for better task context.`,
        `The source talk lists planning targets such as flake rate and PR check time. They are targets to baseline locally, not observed results.`,
      ],
    },
    boundary: {
      seconds: 105,
      sources: [SRC.ghe, SRC.fusion, SRC.quality, SRC.roi],
      notes: [
        `"The case is strongest where GitHub is already the system of record for code and pull requests."`,
        `"Licensing got simpler in October: GitHub Enterprise now includes Copilot for every licensed user, so there is no separate Copilot seat to buy. What leaders manage is usage, metered from the first request against the enterprise budget with the policies, alerts, and attribution already in place."`,
        `"Completions and next edit suggestions keep working with no budget. Chat, code review, and Copilot in the cloud need available budget. An exhausted budget never removes the seat."`,
        `"Impact dashboard ROI figures are directional estimates. And merge, production release, access changes, and risk acceptance stay with named people."`,
        `→ Part four turns this into a test.`,
      ],
      know: [
        `GitHub Enterprise including Copilot is available now for GitHub Enterprise Cloud customers working with a GitHub or Microsoft account team; self-serve availability rolls out in stages, and existing self-serve subscriptions are unaffected. Copilot Business and Copilot Enterprise remain available.`,
        `Copilot through GitHub Enterprise has the same features and models as Copilot Enterprise but no monthly AI credits per seat; usage draws on the enterprise budget.`,
        `People without a GitHub Enterprise license get the same access through Copilot Standalone at ten dollars per user per month.`,
        `Fusion, Code Quality's AI findings, plugin actions such as Explain and Fix, and Dreaming all consume AI credits.`,
      ],
    },

    "p4-open": {
      seconds: 30,
      notes: [
        `"Part four converts conviction into evidence: a controlled pilot that makes standardization a measured, reversible decision."`,
        `→ The pilot shape.`,
      ],
    },
    "pilot-shape": {
      seconds: 120,
      notes: [
        `"One team, one workflow, ninety days."`,
        `Point at the timeline: four weeks of baseline, then thresholds dated and signed, then a ninety-day pilot, then the gate. The thresholds sit before the pilot, so nobody sets the bar after seeing the results.`,
        `Walk the charter: one named team doing its normal work; one repeatable flow, such as issue to merged pull request; the CTO as sponsor; the VP of Engineering as operational owner; platform engineering owning policy, settings, and metrics; a measurement custodian independent of the team; four weeks of comparable baseline data; and a return date inside a real planning cycle.`,
        `"Separating the operator from the measurer is what makes the result credible to the people who did not run the pilot."`,
      ],
      know: [
        `The four-week baseline and 90-day pilot are this briefing's proposed timing; the sponsor can set different dates in the charter.`,
        `The custodian can sit in Finance, Strategy, or an independent data team.`,
        `This briefing leaves thresholds, sample sizes, and floors blank on purpose; the organization completes them after the baseline.`,
      ],
    },
    measures: {
      seconds: 165,
      sources: [
        SRC.agentActivity,
        SRC.reviewRate,
        SRC.roi,
        SRC.industry,
        SRC.dora,
      ],
      notes: [
        `"Three instruments measure the pilot, and each number carries a label."`,
        `Usage metrics API: activity by user, plugin, and agent, including partner agent apps. That is the internal record of what was used.`,
        `"The usage metrics API now reports a code review addressed rate: of the Copilot review comments evaluated in a repository, how many the team addressed. It also counts merged pull requests with no human change request after Copilot's first review. That is a quality signal the pilot can baseline."`,
        `Impact dashboard: a return-on-investment section and opt-in industry comparisons. GitHub describes these as directional, so they enter the record as a modeled scenario.`,
        `DORA delivery metrics: lead time, deployment frequency, change failure rate, and recovery time, baselined before the pilot and compared at day ninety.`,
        `"External observation, internal baseline, modeled scenario, proposed threshold. Every number in the gate report carries one of those four labels."`,
      ],
      know: [
        `Usage metrics arrays keep the most active entries, so a plugin missing from a list can still be in use. Keep plugin and skill counts separate.`,
        `Code review details arrive in the repos-1-day reports as a copilot_code_review object, with breakdowns by severity, tier, type, and customization. Comments are counted on the merge day. Bot-opened pull requests, such as cloud agent pull requests, are usually not evaluated.`,
        `Industry comparisons are opt-in and are not in the API.`,
        `This briefing sets no saved-hours or ROI figures; any target the organization writes down stays a target until the pilot measures it.`,
      ],
    },
    gate: {
      seconds: 120,
      notes: [
        `"On day ninety the custodian applies the dated thresholds, and the result lands in exactly one of three places."`,
        `Scale: delivery thresholds met against the baseline, every quality and security floor held, and use stayed habitual.`,
        `Adjust once: the directional signal holds with no control failure, and one fix to context, checks, or settings has an owner and a return date. Point at the note: an adjustment returns to the gate one time.`,
        `Stop: a control failure, a missed floor, a missed directional signal, or an adjustment that misses its gate.`,
        `"Any authority or control failure stops the pilot on any day. That makes standardization a decision the organization can reverse."`,
      ],
      know: [
        `The thresholds name a primary delivery outcome, a directional floor, quality and security floors, and a named arbiter for disputes.`,
        `The supported conclusion is a disposition for this team and workflow. Enterprise-wide ROI and headcount claims need their own evidence.`,
      ],
    },

    "before-after": {
      seconds: 90,
      notes: [
        `"Each row is one part of this briefing as a shift: from the model to the system around it, from demos to four questions, from work outside review to evidence on the pull request, and from anecdotes to dated thresholds."`,
        `Land the three counts: four questions, one pull request, ninety days.`,
      ],
    },
    today: {
      seconds: 90,
      notes: [
        `"Three moves start the decision."`,
        `This week: name one team and one repeatable workflow; name the sponsor, the platform owner, and the custodian; put the four questions to every vendor in the evaluation.`,
        `During the baseline: record four weeks of delivery data, turn on usage metrics and the impact dashboard, and check the team against the L3 readiness bar.`,
        `Before launch: date the thresholds and stop conditions, set model policy and managed settings for the pilot team, and record the day-90 return date.`,
        `"The pilot starts once the thresholds and the return date are written down."`,
      ],
    },
    references: {
      seconds: 30,
      notes: [
        `Leave this up while questions start. Octoverse 2026 and the Fusion benchmark are GitHub's own data; METR is independent. The platform links are first-party documentation and changelogs.`,
      ],
    },
    thanks: {
      seconds: 15,
      notes: [
        `"Which team and which workflow will carry the 90-day pilot?" Take the first candidate from the room.`,
      ],
    },
  };
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: "exec-strategy",
      title: "Choosing the AI Platform for Your SDLC",
      short: "AI Platform for Your SDLC",
      category: "tech-talks",
      source: "tech-talks/exec-strategy/README.md",
      question:
        "Which AI platform helps my teams ship better software, faster?",
      thesis:
        "AI amplifies the delivery system it runs in. Better software, faster, comes from putting agents inside the SDLC system of record, where code, pull requests, checks, security, and policy already live, so every agent action lands as reviewable evidence under controls the organization already runs. GitHub Copilot is built for that position.",
    },
    slides,
  };
})();

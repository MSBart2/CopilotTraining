// Fresh-eyes onboarding check: an agent that knows only what the docs say tries to get FanHub running
// in a clean clone, and reports every place the docs and reality disagree.
//   npx tsx apps/fresh-eyes/app.ts
import { CopilotClient, defineTool } from "@github/copilot-sdk";
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRunLog } from "../../host-kit/run-log.ts";
import { EXAMPLES_DIR, prepareFanHub, stopListenerOnPort } from "../../host-kit/fanhub.ts";
import { createVisibilityPolicy, type Rel } from "../../host-kit/visibility.ts";
import { FRESH_EYES_SHELL, isDocLike, isSourceCode } from "./rules.ts";

interface Finding {
  step: string;
  docSays: string;
  reality: string;
  doc: string;
  severity: "blocker" | "confusing" | "minor";
}

const TOOL_BUDGET = Number(process.env.TOOL_BUDGET ?? 80);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MIN ?? 20) * 60_000;
const runDir = path.join(EXAMPLES_DIR, ".runs", `fresh-eyes-${Date.now()}`);
const log = createRunLog(runDir);
const findings: Finding[] = [];

const checkout = prepareFanHub();
console.log(`FanHub ${checkout.commit} cloned to ${checkout.dir}`);
log.emit({ layer: "host", event: "checkout", commit: checkout.commit });

function findSourceRoots(dir: string, rel = ""): Rel[] {
  const roots: Rel[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === ".git" || entry.name === "node_modules") continue;
    const child = rel ? `${rel}/${entry.name}` : entry.name;
    if (isSourceCode(child.toLowerCase())) roots.push(child.toLowerCase());
    else roots.push(...findSourceRoots(path.join(dir, entry.name), child));
  }
  return roots;
}

const reportFriction = defineTool("report_friction", {
  description: "Record one place where the documentation and what you observed disagree, or where the docs left you guessing.",
  parameters: {
    type: "object",
    properties: {
      step: { type: "string", description: "What you were trying to do" },
      docSays: { type: "string", description: "What the documentation told you (quote it)" },
      reality: { type: "string", description: "What actually happened" },
      doc: { type: "string", description: "Doc file and heading" },
      severity: { type: "string", enum: ["blocker", "confusing", "minor"] },
    },
    required: ["step", "docSays", "reality", "doc", "severity"],
  },
  handler: async (f: Finding) => {
    findings.push(f);
    log.emit({ layer: "host", event: "friction", severity: f.severity, doc: f.doc });
    console.log(`  [friction:${f.severity}] ${f.step}`);
    return `Recorded (${findings.length} so far). Continue.`;
  },
});

const policy = createVisibilityPolicy({
  repoRoot: checkout.dir,
  hidden: isSourceCode,
  hiddenRoots: findSourceRoots(checkout.dir),
  readable: isDocLike,
  writable: (rel) => /(^|\/)\.env$/.test(rel),
  shellCommands: FRESH_EYES_SHELL,
  shellTextDeny: [/(^|[\s"'\\/])src[\\/]/i],
  customTools: new Set(["report_friction"]),
  hiddenFeedback: "A new hire follows the docs. Source code is off-limits in this session; work from the documentation and report gaps with report_friction.",
  log: (d) => log.emit({ source: "host-policy", ...d }),
});

const client = new CopilotClient({ workingDirectory: checkout.dir });
const session = await client.createSession({
  clientName: "fresh-eyes",
  model: process.env.MODEL || "auto",
  workingDirectory: checkout.dir,
  enableFileHooks: true,
  excludedTools: ["web_fetch", "web_search"],
  tools: [reportFriction],
  systemMessage: {
    mode: "customize",
    sections: {
      custom_instructions: {
        action: "append",
        content: [
          "You are a capable engineer on your first day. You know only what this repository's documentation says.",
          "Follow the docs literally. When a step fails, is ambiguous, or the docs disagree with what you observe, call report_friction before you work around it.",
          "Never read source code to figure things out; that is exactly the gap we want to find.",
          "Before you finish, stop any server you started.",
        ].join(" "),
      },
    },
  },
  onPermissionRequest: policy.onPermissionRequest,
  hooks: { onPreToolUse: policy.onPreToolUse },
});
log.attach(session);

let toolCalls = 0;
session.on("tool.execution_start", () => {
  toolCalls += 1;
  if (toolCalls === TOOL_BUDGET) {
    log.emit({ layer: "host", event: "budget-exhausted", toolCalls });
    console.log(`  [host] tool budget of ${TOOL_BUDGET} reached; aborting`);
    void session.abort();
  }
});

let outcome = "completed";
let summary = "";
try {
  const reply = await session.sendAndWait(
    {
      prompt:
        "Get the FanHub Node.js track running locally from this clone using only the documentation, without Docker or Codespaces. " +
        "Success means the backend answers GET /api/characters. Finish with a short summary of what worked and what did not.",
    },
    TIMEOUT_MS,
  );
  summary = reply?.data.content ?? "";
} catch (err) {
  outcome = `ended: ${(err as Error).message}`;
} finally {
  log.emit({ layer: "host", event: "session-end", outcome, toolCalls, friction: findings.length, ...policy.counts });
  await session.disconnect();
  await client.stop();
  stopListenerOnPort(5265);
}

const order = { blocker: 0, confusing: 1, minor: 2 };
const report = [
  `# Fresh-eyes onboarding report`,
  ``,
  `FanHub \`${checkout.commit}\` · ${new Date().toISOString()} · outcome: ${outcome} · tool calls: ${toolCalls} · policy: ${policy.counts.allow} allowed, ${policy.counts.deny} denied`,
  ``,
  `| Severity | Step | Docs say | Reality | Where |`,
  `|---|---|---|---|---|`,
  ...findings
    .sort((a, b) => order[a.severity] - order[b.severity])
    .map((f) => `| ${f.severity} | ${f.step} | ${f.docSays} | ${f.reality} | ${f.doc} |`.replace(/\r?\n/g, " ")),
  ``,
  `## Agent summary`,
  ``,
  summary,
  ``,
  `## Denied by the host`,
  ``,
  ...policy.decisions.filter((d) => d.decision === "deny").map((d) => `- ${d.layer} · ${d.kind} · \`${d.subject}\` · ${d.rule}`),
].join("\n");
writeFileSync(path.join(runDir, "friction-report.md"), report);
console.log(`\nReport: ${path.join(runDir, "friction-report.md")}`);
if (!process.env.KEEP_CHECKOUT) checkout.dispose();

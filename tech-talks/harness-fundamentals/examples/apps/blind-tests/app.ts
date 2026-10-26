// Blind test writer: the agent writes API tests from the contract alone. It never sees the implementation or the
// bug list. Afterwards a separate referee session, which may read BUGS.md, maps each failure to a documented bug.
//   npx tsx apps/blind-tests/app.ts
import { CopilotClient, defineTool, type PermissionHandler } from "@github/copilot-sdk";
import { execFileSync, spawn } from "node:child_process";
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRunLog } from "../../host-kit/run-log.ts";
import { EXAMPLES_DIR, prepareFanHub } from "../../host-kit/fanhub.ts";
import { createVisibilityPolicy } from "../../host-kit/visibility.ts";
import { BLIND_SHELL, BLIND_TEST_DIR, BLIND_TEXT_DENY, isBlindReadable, isBlindWritable, isHiddenFromBlindTester, parseContract } from "./rules.ts";

const PORT = Number(process.env.FANHUB_PORT ?? 5299);
const BASE_URL = `http://localhost:${PORT}`;
const TOOL_BUDGET = Number(process.env.TOOL_BUDGET ?? 120);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MIN ?? 20) * 60_000;
const runDir = path.join(EXAMPLES_DIR, ".runs", `blind-tests-${Date.now()}`);
const log = createRunLog(runDir);
const isWin = process.platform === "win32";

// 1. The host owns the environment: clean checkout, dependencies, a running API on a known port.
const checkout = prepareFanHub();
const backend = path.join(checkout.dir, "node", "backend");
console.log(`FanHub ${checkout.commit} cloned to ${checkout.dir}`);
// FanHub pins better-sqlite3 ^9, which has no prebuilt binary for Node 22+. The host swaps in v12
// (--no-save leaves package.json untouched) so setup never depends on a local C++ toolchain.
const npmArgs = ["install", "--no-audit", "--no-fund", "--loglevel=error"];
if (Number(process.versions.node.split(".")[0]) >= 22) npmArgs.push("--no-save", "better-sqlite3@^12");
execFileSync(isWin ? "npm.cmd" : "npm", npmArgs, { cwd: backend, stdio: "inherit", shell: isWin });
const server = spawn(process.execPath, ["src/index.js"], { cwd: backend, env: { ...process.env, PORT: String(PORT) }, stdio: "ignore" });
for (let i = 0; i < 60; i++) {
  try {
    await fetch(`${BASE_URL}/api/shows`);
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}
log.emit({ layer: "host", event: "environment-ready", commit: checkout.commit, baseUrl: BASE_URL });

// 2. The only window onto the API: a contract the host builds from the docs, with the bug hints removed.
const contract = parseContract(readFileSync(path.join(checkout.dir, "node", "SETUP.md"), "utf8"));
const apiContract = defineTool("api_contract", {
  description: "Return the FanHub API contract: base URL and every documented endpoint with its purpose.",
  parameters: { type: "object", properties: {} },
  skipPermission: true,
  handler: async () => JSON.stringify({ baseUrl: BASE_URL, endpoints: contract }, null, 2),
});

// 3. The visibility policy: implementation, docs, and bug list hidden; writes only into the blind test folder.
const policy = createVisibilityPolicy({
  repoRoot: checkout.dir,
  hidden: isHiddenFromBlindTester,
  hiddenRoots: ["node/backend/src", "node/frontend", "docs", "dotnet", "java", "go"],
  readable: isBlindReadable,
  writable: isBlindWritable,
  shellCommands: BLIND_SHELL,
  shellTextDeny: BLIND_TEXT_DENY,
  customTools: new Set(["api_contract"]),
  hiddenFeedback:
    "You are testing a black box. The implementation and docs are hidden on purpose. Use api_contract and live HTTP calls to learn how the API behaves.",
  log: (d) => log.emit({ source: "host-policy", ...d }),
});

const client = new CopilotClient({ workingDirectory: checkout.dir });
const session = await client.createSession({
  clientName: "blind-tests",
  model: process.env.MODEL || "auto",
  workingDirectory: checkout.dir,
  enableFileHooks: true,
  excludedTools: ["web_fetch", "web_search"],
  tools: [apiContract],
  systemMessage: {
    mode: "customize",
    sections: {
      custom_instructions: {
        action: "append",
        content: [
          "You are a black-box API tester. You cannot see the implementation, and that independence is the point.",
          `Write tests with node:test and the global fetch in ${BLIND_TEST_DIR}/, one file per resource.`,
          "Assert what a careful client would expect from the contract and ordinary REST conventions: status codes, JSON bodies,",
          "consistent shapes across endpoints, 404 for unknown ids, 201 for creates, 400 for invalid input, unique records in lists.",
          "When a test fails, keep the assertion if it matches the contract; a failing test is a finding. Never weaken a test to make it pass.",
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
  if (++toolCalls === TOOL_BUDGET) {
    log.emit({ layer: "host", event: "budget-exhausted", toolCalls });
    void session.abort();
  }
});

let outcome = "completed";
let summary = "";
try {
  const reply = await session.sendAndWait(
    {
      prompt:
        `Write a black-box test suite for the FanHub API running at ${BASE_URL}. Start with api_contract. ` +
        `Run it from node/backend with \`node --test "${BLIND_TEST_DIR.replace("node/backend/", "")}/*.test.js"\`. ` +
        "Finish with the failing tests and what each one expected.",
    },
    TIMEOUT_MS,
  );
  summary = reply?.data.content ?? "";
} catch (err) {
  outcome = `ended: ${(err as Error).message}`;
}
log.emit({ layer: "host", event: "session-end", sessionId: session.sessionId, outcome, toolCalls, ...policy.counts });
await session.disconnect();

// 4. The host reruns the suite itself, so the result does not depend on the agent's account of it.
const blindDir = path.join(checkout.dir, ...BLIND_TEST_DIR.split("/"));
const testFiles = existsSync(blindDir) ? readdirSync(blindDir).filter((f) => f.endsWith(".test.js")).map((f) => path.join(blindDir, f)) : [];
const tap = (() => {
  if (testFiles.length === 0) return "";
  try {
    return execFileSync(process.execPath, ["--test", "--test-reporter=tap", ...testFiles], { cwd: backend, env: { ...process.env, FANHUB_BASE_URL: BASE_URL } }).toString();
  } catch (err) {
    return String((err as { stdout?: Buffer }).stdout ?? "");
  }
})();
server.kill();
const failing = [...tap.matchAll(/^\s*not ok \d+ - (.+)$/gm)].map((m) => m[1].trim()).filter((n) => !/\.test\.js$/.test(n));
const passing = [...tap.matchAll(/^\s*ok \d+ - (.+)$/gm)].map((m) => m[1].trim()).filter((n) => !/\.test\.js$/.test(n));
writeFileSync(path.join(runDir, "tests.tap"), tap);
if (existsSync(path.join(checkout.dir, BLIND_TEST_DIR))) cpSync(path.join(checkout.dir, BLIND_TEST_DIR), path.join(runDir, "blind"), { recursive: true });
log.emit({ layer: "host", event: "rerun", passing: passing.length, failing: failing.length });

// 5. The reveal: a second session with a different view. It may read BUGS.md, and only read.
const readOnly: PermissionHandler = (req) => (req.kind === "read" ? { kind: "approve-once" } : { kind: "reject", feedback: "Read-only referee." });
const referee = await client.createSession({
  clientName: "blind-tests-referee",
  model: process.env.MODEL || "auto",
  workingDirectory: checkout.dir,
  availableTools: ["view", "grep", "glob"],
  onPermissionRequest: readOnly,
});
const mapping = failing.length === 0 ? undefined : await referee.sendAndWait(
  {
    prompt:
      "These black-box API tests failed against FanHub. Read BUGS.md and map each failing test to the documented bug it reveals " +
      "(bug number and title), or write 'not documented' if none matches. Answer as a Markdown table: Failing test | Bug | Why.\n\n" +
      failing.map((f) => `- ${f}`).join("\n"),
  },
  5 * 60_000,
);
await referee.disconnect();
await client.stop();

const report = [
  `# Blind test writer report`,
  ``,
  `FanHub \`${checkout.commit}\` · ${new Date().toISOString()} · outcome: ${outcome} · tool calls: ${toolCalls}`,
  `Host rerun: **${passing.length} passing, ${failing.length} failing** · policy: ${policy.counts.allow} allowed, ${policy.counts.deny} denied`,
  ``,
  `## Failing tests mapped to BUGS.md (referee session)`,
  ``,
  mapping?.data.content ?? "_No failing tests._",
  ``,
  `## Blind agent summary`,
  ``,
  summary,
  ``,
  `## Denied by the host`,
  ``,
  ...policy.decisions.filter((d) => d.decision === "deny").map((d) => `- ${d.layer} · ${d.kind} · \`${d.subject}\` · ${d.rule}`),
].join("\n");
writeFileSync(path.join(runDir, "blind-report.md"), report);
console.log(`\nReport: ${path.join(runDir, "blind-report.md")}`);
if (process.env.KEEP_CHECKOUT) console.log(`Checkout kept at ${checkout.dir}`);
else checkout.dispose();

import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import { commandHeads, createVisibilityPolicy, sweepsHidden, toRel } from "../host-kit/visibility.ts";
import { FRESH_EYES_SHELL, isDocLike, isSourceCode } from "../apps/fresh-eyes/rules.ts";
import { BLIND_SHELL, isBlindReadable, isBlindWritable, isHiddenFromBlindTester, parseContract } from "../apps/blind-tests/rules.ts";

const root = path.resolve("/tmp/fanhub");
const abs = (rel: string) => path.join(root, rel);
const invocation = { sessionId: "s" } as never;

function freshEyes() {
  return createVisibilityPolicy({
    repoRoot: root,
    hidden: isSourceCode,
    hiddenRoots: ["node/backend/src", "node/frontend/src"],
    readable: isDocLike,
    writable: (rel) => /(^|\/)\.env$/.test(rel),
    shellCommands: FRESH_EYES_SHELL,
    shellTextDeny: [/(^|[\s"'\\/])src[\\/]/i],
    customTools: new Set(["report_friction"]),
    hiddenFeedback: "docs only",
  });
}

function blind() {
  return createVisibilityPolicy({
    repoRoot: root,
    hidden: isHiddenFromBlindTester,
    hiddenRoots: ["node/backend/src"],
    readable: isBlindReadable,
    writable: isBlindWritable,
    shellCommands: BLIND_SHELL,
    shellTextDeny: [/(^|[\s"'\\/])src[\\/]/i, /bugs\.md/i, /fanhub\.db/i, /readfilesync|readdirsync|child_process/i],
    customTools: new Set(["api_contract"]),
    hiddenFeedback: "black box",
  });
}

const shell = (fullCommandText: string, possiblePaths: string[] = []) =>
  ({ kind: "shell", fullCommandText, possiblePaths, commands: [], hasWriteFileRedirection: false, intention: "", canOfferSessionApproval: false, possibleUrls: [] }) as never;

test("commandHeads splits compound commands and keeps executables", () => {
  assert.deepEqual(commandHeads("cd node\\backend; npm start"), ["cd", "npm"]);
  assert.deepEqual(commandHeads("git --no-pager status --short"), ["git"]);
  assert.deepEqual(commandHeads("node.exe --version && Get-ChildItem -Name | Select-Object -First 3"), ["node", "get-childitem", "select-object"]);
  assert.deepEqual(commandHeads("& \"C:\\tools\\curl.exe\" http://x"), ["c:\\tools\\curl"]);
  assert.deepEqual(commandHeads("node -e \"a(); b() || c()\" | Select-Object -First 1"), ["node", "select-object"]);
});

test("toRel keeps paths inside the repo and rejects escapes", () => {
  assert.equal(toRel(abs("node/README.md"), root), process.platform === "win32" ? "node/readme.md" : "node/README.md");
  assert.equal(toRel("../outside.txt", root), null);
});

test("sweepsHidden flags searches whose scope contains a hidden root", () => {
  assert.equal(sweepsHidden("", ["node/backend/src"]), true);
  assert.equal(sweepsHidden("node", ["node/backend/src"]), true);
  assert.equal(sweepsHidden("node/backend/__tests__", ["node/backend/src"]), false);
});

test("fresh eyes: docs readable, source hidden, folders listable", async () => {
  const p = freshEyes();
  const read = (rel: string) => p.onPermissionRequest({ kind: "read", path: abs(rel), intention: "" } as never, invocation);
  assert.equal((await read("node/SETUP.md")).kind, "approve-once");
  assert.equal((await read("node/.env.example")).kind, "approve-once");
  assert.equal((await read("node/backend")).kind, "approve-once");
  assert.equal((await read("node/backend/src/index.js")).kind, "reject");
  assert.equal((await read("scripts/harness-fundamentals/pre-tool-use.mjs")).kind, "reject");
});

test("fresh eyes: documented commands run, source peeks do not", async () => {
  const p = freshEyes();
  const run = async (cmd: string) => (await p.onPermissionRequest(shell(cmd), invocation)).kind;
  assert.equal(await run("node --version"), "approve-once");
  assert.equal(await run("cd node\\backend; npm install"), "approve-once");
  assert.equal(await run("Copy-Item node/.env.example node/.env"), "approve-once");
  assert.equal(await run("Get-Content node/backend/src/index.js"), "reject");
  assert.equal(await run("cat README.md"), "reject");
});

test("fresh eyes: grep across the repo is denied before it runs, glob is allowed", async () => {
  const p = freshEyes();
  const grep = await p.onPreToolUse({ toolName: "grep", toolArgs: { pattern: "PORT" } });
  assert.equal(grep?.permissionDecision, "deny");
  const scoped = await p.onPreToolUse({ toolName: "grep", toolArgs: { pattern: "PORT", path: abs("node/SETUP.md") } });
  assert.equal(scoped, undefined);
  assert.equal(await p.onPreToolUse({ toolName: "glob", toolArgs: { pattern: "**/*.md" } }), undefined);
});

test("blind tester: only the test folder is writable, and tests may not read hidden files at runtime", async () => {
  const p = blind();
  const write = async (rel: string, body = "") =>
    (await p.onPermissionRequest({ kind: "write", fileName: abs(rel), newFileContents: body, intention: "" } as never, invocation)).kind;
  assert.equal(await write("node/backend/__tests__/blind/characters.test.js", "fetch(base + '/api/characters')"), "approve-once");
  assert.equal(await write("node/backend/src/routes/characters.js"), "reject");
  assert.equal(await write("node/backend/__tests__/blind/peek.test.js", "fs.readFileSync('../../src/routes/quotes.js')"), "reject");
});

test("blind tester: routes, bug lists, and docs stay hidden", async () => {
  const p = blind();
  const read = async (rel: string) => (await p.onPermissionRequest({ kind: "read", path: abs(rel), intention: "" } as never, invocation)).kind;
  assert.equal(await read("node/backend/src/routes/characters.js"), "reject");
  assert.equal(await read("BUGS.md"), "reject");
  assert.equal(await read("node/SETUP.md"), "reject");
  assert.equal(await read("node/backend/package.json"), "approve-once");
  assert.equal(await read("node/backend/__tests__/blind/a.test.js"), "approve-once");
  const run = async (cmd: string) => (await p.onPermissionRequest(shell(cmd), invocation)).kind;
  assert.equal(await run("cd node/backend; node --test __tests__/blind"), "approve-once");
  assert.equal(await run("curl http://localhost:5299/api/characters"), "approve-once");
  assert.equal(await run("type BUGS.md"), "reject");
  assert.equal(await run("node -e \"console.log(require('fs').readFileSync('src/index.js','utf8'))\""), "reject");
});

test("api contract strips bug hints from the endpoint list", () => {
  const md = [
    "## 🔍 Available API Endpoints",
    "### Characters",
    "- `GET /api/characters` — List all characters (includes duplicate Jesse Pinkman!)",
    "- `GET /api/episodes?seasonId=1` — Filter by season (has cache bug!)",
    "### Authentication (Incomplete)",
    "- `POST /auth/register` — Register (no password strength validation!)",
    "---",
    "## 🧪 Testing the App",
  ].join("\n");
  assert.deepEqual(parseContract(md), [
    { group: "Characters", method: "GET", path: "/api/characters", summary: "List all characters" },
    { group: "Characters", method: "GET", path: "/api/episodes?seasonId=1", summary: "Filter by season" },
    { group: "Authentication", method: "POST", path: "/auth/register", summary: "Register" },
  ]);
});

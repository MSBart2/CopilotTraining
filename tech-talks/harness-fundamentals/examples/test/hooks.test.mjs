import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const scripts = path.resolve(here, "..", "fanhub-overlay", "scripts", "harness-fundamentals");
const repo = path.resolve(here, "..", "fixtures");

function runHook(script, stdin) {
  const started = Date.now();
  const out = spawnSync(process.execPath, [path.join(scripts, script)], { input: stdin, encoding: "utf8" });
  return { status: out.status, json: out.stdout ? JSON.parse(out.stdout) : null, ms: Date.now() - started };
}

const payload = (toolName, toolArgs) => JSON.stringify({ sessionId: "s1", timestamp: Date.now(), cwd: repo, toolName, toolArgs });

test("preToolUse denies a direct read of the schema", () => {
  const r = runHook("pre-tool-use.mjs", payload("view", { path: "node/backend/src/database/schema.sql" }));
  assert.equal(r.status, 0);
  assert.equal(r.json.permissionDecision, "deny");
  assert.match(r.json.permissionDecisionReason, /fanhub-database-source/);
});

test("preToolUse denies a write to the SQLite file with an absolute path", () => {
  const r = runHook("pre-tool-use.mjs", payload("create", { path: path.join(repo, "node", "fanhub.db"), file_text: "x" }));
  assert.equal(r.json.permissionDecision, "deny");
  assert.match(r.json.permissionDecisionReason, /fanhub-sqlite-file/);
});

test("preToolUse denies an apply_patch that touches the database folder", () => {
  const patch = "*** Begin Patch\n*** Update File: node/backend/src/database/seed.sql\n@@\n-a\n+b\n*** End Patch";
  const r = runHook("pre-tool-use.mjs", payload("apply_patch", { input: patch }));
  assert.equal(r.json.permissionDecision, "deny");
});

test("preToolUse accepts JSON-string toolArgs and VS Code snake_case payloads", () => {
  const stringArgs = runHook("pre-tool-use.mjs", payload("view", JSON.stringify({ path: "node/backend/src/database/connection.js" })));
  assert.equal(stringArgs.json.permissionDecision, "deny");
  const vscode = JSON.stringify({ hook_event_name: "PreToolUse", cwd: repo, tool_name: "view", tool_input: { path: "node/backend/src/database/schema.sql" } });
  assert.equal(runHook("pre-tool-use.mjs", vscode).json.permissionDecision, "deny");
});

test("preToolUse leaves route files to the normal permission flow", () => {
  const r = runHook("pre-tool-use.mjs", payload("view", { path: "node/backend/src/routes/characters.js" }));
  assert.deepEqual(r.json, {});
});

test("preToolUse passes shell commands through: the hook sees only raw text", () => {
  const r = runHook("pre-tool-use.mjs", payload("bash", { command: "sqlite3 node/fanhub.db .schema" }));
  assert.deepEqual(r.json, {});
});

test("preToolUse denies malformed input explicitly", () => {
  const r = runHook("pre-tool-use.mjs", "{not json");
  assert.equal(r.status, 0);
  assert.equal(r.json.permissionDecision, "deny");
});

test("preToolUse finishes well inside its 5-second timeout (timeouts fail open)", () => {
  const r = runHook("pre-tool-use.mjs", payload("view", { path: "README.md" }));
  assert.ok(r.ms < 2000, `hook took ${r.ms}ms`);
});

test("sessionStart injects the boundary note", () => {
  const r = runHook("session-start.mjs", JSON.stringify({ cwd: repo }));
  assert.match(r.json.additionalContext, /node\/backend\/src\/database\//);
  assert.match(r.json.additionalContext, /data team/);
});

test("postToolUse logs a redacted record without argument contents", () => {
  const cwd = mkdtempSync(path.join(os.tmpdir(), "harness-log-"));
  const secret = "DATABASE_URL=postgres://user:pw@host/db";
  const input = JSON.stringify({ sessionId: "s1", timestamp: Date.now(), cwd, toolName: "create", toolArgs: { path: "notes.txt", file_text: secret }, toolResult: { resultType: "success" } });
  const r = runHook("post-tool-use.mjs", input);
  assert.deepEqual(r.json, {});
  const log = readFileSync(path.join(cwd, ".harness-logs", "tool-use.jsonl"), "utf8");
  assert.doesNotMatch(log, /postgres:\/\//);
  const record = JSON.parse(log.trim());
  assert.equal(record.toolName, "create");
  assert.equal(record.access, "write");
  assert.equal(record.resultType, "success");
});

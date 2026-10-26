// postToolUse command hook: append one redacted line per tool call. Records what happened, never argument contents.
import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { describeToolCall, findProtectedHits } from "./protected-paths.mjs";

export function toLogRecord(input) {
  const toolName = input?.toolName ?? input?.tool_name ?? "unknown";
  const call = describeToolCall(toolName, input?.toolArgs ?? input?.tool_input);
  const result = input?.toolResult ?? input?.tool_response ?? {};
  return {
    ts: new Date(typeof input?.timestamp === "number" ? input.timestamp : Date.now()).toISOString(),
    layer: "repo-hook",
    sessionId: input?.sessionId ?? input?.session_id ?? null,
    toolName,
    access: call.access,
    pathCount: call.paths.length,
    protectedHits: findProtectedHits(call.paths, input?.cwd).map((h) => h.ruleId),
    resultType: result.resultType ?? null,
  };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const input = JSON.parse(await readStdin());
    const logDir = path.resolve(input.cwd ?? process.cwd(), ".harness-logs");
    mkdirSync(logDir, { recursive: true });
    appendFileSync(path.join(logDir, "tool-use.jsonl"), JSON.stringify(toLogRecord(input)) + "\n");
  } catch {
    // Telemetry never blocks the agent; a logging failure leaves the tool result untouched.
  }
  process.stdout.write("{}");
}

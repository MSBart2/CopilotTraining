// One JSONL evidence file per run. Records decisions, tool outcomes, and repo-hook activity; never argument contents.
import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import type { CopilotSession } from "@github/copilot-sdk";

export function createRunLog(runDir: string, file = "events.jsonl") {
  mkdirSync(runDir, { recursive: true });
  const logFile = path.join(runDir, file);
  const emit = (entry: Record<string, unknown>) =>
    appendFileSync(logFile, JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n");

  /** Mirror the session's own events into the same file so host decisions and runtime activity line up. */
  function attach(session: CopilotSession, { echo = true } = {}) {
    const sessionId = session.sessionId;
    session.on("tool.execution_start", (e) => {
      emit({ layer: "runtime", event: "tool.start", sessionId, tool: e.data.toolName, toolCallId: e.data.toolCallId });
      if (echo) console.log(`  [tool] ${e.data.toolName}`);
    });
    session.on("tool.execution_complete", (e) =>
      emit({ layer: "runtime", event: "tool.complete", sessionId, toolCallId: e.data.toolCallId, success: e.data.success }),
    );
    session.on("hook.start", (e) => emit({ layer: "repo-hook", event: "hook.start", sessionId, hook: e.data.hookType }));
    session.on("hook.end", (e) => {
      const out = (e.data.output ?? {}) as { permissionDecision?: string };
      emit({ layer: "repo-hook", event: "hook.end", sessionId, hook: e.data.hookType, success: e.data.success, decision: out.permissionDecision ?? null });
      if (echo && out.permissionDecision === "deny") console.log(`  [repo hook] ${e.data.hookType} deny`);
    });
    session.on("assistant.message", (e) => {
      if (echo && e.data.content) console.log(`\nassistant> ${e.data.content}\n`);
    });
  }

  return { emit, attach, logFile };
}

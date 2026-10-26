// preToolUse command hook: deny direct reads and writes of protected FanHub paths.
// Command hooks fail closed on crashes and fail open on timeouts, so this script stays fast and total.
import { pathToFileURL } from "node:url";
import { describeToolCall, findProtectedHits } from "./protected-paths.mjs";

export function decide(input) {
  if (!input || typeof input !== "object" || typeof (input.toolName ?? input.tool_name) !== "string") {
    return {
      permissionDecision: "deny",
      permissionDecisionReason: "Harness policy could not read the tool call, so it was denied. Retry the call.",
    };
  }

  const toolName = input.toolName ?? input.tool_name;
  const call = describeToolCall(toolName, input.toolArgs ?? input.tool_input);
  const hits = findProtectedHits(call.paths, input.cwd);

  if (hits.length > 0) {
    return {
      permissionDecision: "deny",
      permissionDecisionReason:
        `Protected path (${hits[0].ruleId}): ${hits[0].path}. ` +
        "Database files are off limits in agent sessions. Ask for a schema summary instead.",
    };
  }
  return {};
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let input;
  try {
    input = JSON.parse(await readStdin());
  } catch {
    input = null;
  }
  process.stdout.write(JSON.stringify(decide(input)));
}

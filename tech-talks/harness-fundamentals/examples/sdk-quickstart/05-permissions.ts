// Step 5: decide what the agent can do. Every mediated read, write, and shell call asks your handler first.
//   npx tsx sdk-quickstart/05-permissions.ts
import { CopilotClient, type PermissionHandler } from "@github/copilot-sdk";

const onPermissionRequest: PermissionHandler = (request) => {
  const subject =
    request.kind === "shell" ? request.fullCommandText :
    request.kind === "read" ? request.path :
    request.kind === "write" ? request.fileName :
    request.kind;
  if (request.kind === "read") {
    console.log(`[allow] read ${subject}`);
    return { kind: "approve-once" };
  }
  console.log(`[reject] ${request.kind} ${subject}`);
  return { kind: "reject", feedback: "This session is read-only. Use the view tool to inspect files." };
};

const client = new CopilotClient();
const session = await client.createSession({ model: "auto", onPermissionRequest });

session.on("tool.execution_start", (e) => console.log(`[tool] ${e.data.toolName}`));

const reply = await session.sendAndWait({
  prompt: "Count the lines in each .ts file in this folder. Use a shell command if that is fastest.",
});
console.log(reply?.data.content);

await session.disconnect();
await client.stop();

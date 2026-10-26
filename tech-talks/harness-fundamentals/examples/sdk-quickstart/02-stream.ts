// Step 2: watch the loop. Every delta, tool call, and result arrives as an event your app can render or store.
//   npx tsx sdk-quickstart/02-stream.ts
import { CopilotClient, approveAll } from "@github/copilot-sdk";

const client = new CopilotClient();
const session = await client.createSession({ model: "auto", streaming: true, onPermissionRequest: approveAll });

session.on("assistant.message_delta", (e) => process.stdout.write(e.data.deltaContent));
session.on("tool.execution_start", (e) => console.log(`\n[tool] ${e.data.toolName}`));
session.on("tool.execution_complete", (e) => console.log(`[tool done] success=${e.data.success}`));
session.on("session.idle", () => console.log("\n[idle]"));

await session.sendAndWait({ prompt: "List the files in this folder, then tell me which one is the entry point." });

await session.disconnect();
await client.stop();

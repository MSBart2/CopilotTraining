// Step 1 · Loop: one client, one session, one answer. The SDK starts the bundled Copilot runtime, which runs the loop.
//   npx tsx sdk-quickstart/01-loop.ts
import { CopilotClient, approveAll } from "@github/copilot-sdk";

const client = new CopilotClient();
const session = await client.createSession({ model: "auto", onPermissionRequest: approveAll });

const reply = await session.sendAndWait({ prompt: "How do I run this project? Two sentences." });
console.log(reply?.data.content);

await session.disconnect();
await client.stop();

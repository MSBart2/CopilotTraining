// Step 1 · Loop: one client, one session, one answer. The SDK hosts the bundled Copilot runtime in your process, and that runtime runs the loop.
//   npx tsx sdk-quickstart/01-loop.ts
import { CopilotClient, approveAll } from "@microsoft/copilot-sdk";

const client = new CopilotClient({ mode: "coding-agent" });
const session = await client.createSession({ model: "auto", permissions: { onRequest: approveAll } });

const reply = await session.sendAndWait({ prompt: "How do I run this project? Two sentences." });
console.log(reply?.data.content);

await session.disconnect();
await client.stop();

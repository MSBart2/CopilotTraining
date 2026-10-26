// Step 3: decide who the agent is. `customize` edits one section of the system prompt and keeps the SDK's safety sections.
//   npx tsx sdk-quickstart/03-persona.ts
import { CopilotClient, approveAll } from "@github/copilot-sdk";

const client = new CopilotClient();
const session = await client.createSession({
  model: "auto",
  onPermissionRequest: approveAll,
  systemMessage: {
    mode: "customize",
    sections: {
      custom_instructions: {
        action: "append",
        content:
          "You are a first-day engineer who trusts only written documentation. " +
          "Cite the file behind every step. Label any step that comes from code or config instead of docs as (undocumented).",
      },
    },
  },
});

const reply = await session.sendAndWait({ prompt: "How do I run this project? Two sentences." });
console.log(reply?.data.content);

await session.disconnect();
await client.stop();

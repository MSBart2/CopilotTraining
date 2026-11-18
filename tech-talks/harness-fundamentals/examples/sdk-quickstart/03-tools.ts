// Step 3 · Tools: `tools.definitions` adds a tool object your app answers; `tools.availableTools` allowlists tool names, hiding the rest.
//   npx tsx sdk-quickstart/03-tools.ts
import { CopilotClient, approveAll, defineTool } from "@microsoft/copilot-sdk";

// Knowledge that lives in your systems, not in the repo.
const OWNERS: Record<string, string> = {
  "node/backend/src/routes/": "api-team",
  "node/backend/src/database/": "data-team",
  "node/frontend/": "web-team",
};

const lookupOwner = defineTool("lookup_owner", {
  description: "Return the team that owns a repository path.",
  parameters: {
    type: "object",
    properties: { path: { type: "string", description: "Repository-relative path" } },
    required: ["path"],
  },
  handler: async ({ path }: { path: string }) => {
    const match = Object.keys(OWNERS).find((prefix) => path.startsWith(prefix));
    return match ? `${path} is owned by ${OWNERS[match]}.` : `No owner on record for ${path}.`;
  },
});

const client = new CopilotClient({ mode: "coding-agent" });
const session = await client.createSession({
  model: "auto",
  permissions: { onRequest: approveAll },
  tools: {
    availableTools: ["view", "glob", "grep", "lookup_owner"],
    definitions: [lookupOwner],
  },
});

session.on("tool.execution_start", (e) => console.log(`[tool] ${e.data.toolName}`));

const reply = await session.sendAndWait({
  prompt: "Which team reviews a change to node/backend/src/routes/characters.js? Then try to run `git log` and tell me what happened.",
});
console.log(reply?.data.content);

await session.disconnect();
await client.stop();

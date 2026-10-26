// sessionStart command hook: inject one project note so the agent starts the session knowing the boundary.
import { pathToFileURL } from "node:url";

export const SESSION_NOTE = [
  "FanHub harness note:",
  "- node/backend/src/database/ and fanhub.db files are protected. Do not read, search, or edit them.",
  "- For table and column names, ask the data team.",
  "- Route fixes live in node/backend/src/routes/. Run the backend tests after a change.",
].join("\n");

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stdout.write(JSON.stringify({ additionalContext: SESSION_NOTE }));
}

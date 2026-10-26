// What a black-box tester may see and run. The implementation, the bug list, and every doc that hints at bugs stay hidden.
import type { Rel } from "../../host-kit/visibility.ts";

export const BLIND_TEST_DIR = "node/backend/__tests__/blind";

export const isHiddenFromBlindTester = (rel: Rel) =>
  /^node\/backend\/src(\/|$)/i.test(rel) ||
  /^node\/frontend(\/|$)/i.test(rel) ||
  /^(dotnet|java|go|docs|mcp-servers|\.copilot-loop)(\/|$)/i.test(rel) ||
  /(^|\/)fanhub\.db/i.test(rel) ||
  (/\.md$/i.test(rel) && !rel.toLowerCase().startsWith("node/backend/node_modules/"));

export const isBlindReadable = (rel: Rel) =>
  /^node\/backend\/(package\.json|__tests__(\/|$))/i.test(rel);

export const isBlindWritable = (rel: Rel) => rel.toLowerCase().startsWith(BLIND_TEST_DIR + "/");

export const BLIND_SHELL = new Set([
  "node", "cd", "set-location", "get-location", "pwd", "curl", "invoke-webrequest", "invoke-restmethod",
  "ls", "dir", "get-childitem", "test-path", "mkdir", "new-item", "start-sleep",
  "select-object", "where-object", "foreach-object", "convertto-json", "convertfrom-json",
  "format-list", "format-table", "out-string", "write-output", "write-host", "echo",
]);

/** Test code that would read the implementation when it runs: file APIs, child processes, or imports from src/. */
export const BLIND_TEXT_DENY = [
  /(^|[\s"'\\/])src[\\/]/i,
  /bugs\.md/i,
  /fanhub\.db/i,
  /readfile|readdir|createreadstream|opendir|child_process/i,
];

export interface Endpoint {
  group: string;
  method: string;
  path: string;
  summary: string;
}

/** Turn the SETUP.md endpoint list into a contract, dropping the parenthetical bug hints the docs carry. */
export function parseContract(markdown: string): Endpoint[] {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => /^##\s.*Available API Endpoints/i.test(l));
  if (start < 0) return [];
  const endpoints: Endpoint[] = [];
  let group = "";
  for (const line of lines.slice(start + 1)) {
    if (/^##\s/.test(line)) break;
    const heading = line.match(/^###\s+(.+)$/);
    if (heading) {
      group = heading[1].replace(/\s*\(.*\)\s*$/, "").trim();
      continue;
    }
    const item = line.match(/^-\s+`(GET|POST|PUT|PATCH|DELETE)\s+([^`]+)`\s+[—-]\s+(.+)$/);
    if (item) {
      const summary = item[3].replace(/\s*\([^)]*\)\s*$/, "").replace(/!+$/, "").trim();
      endpoints.push({ group, method: item[1], path: item[2].trim(), summary });
    }
  }
  return endpoints;
}

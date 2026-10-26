// What a first-day engineer may see and run. Pure predicates, so the tests can pin them down.
import type { Rel } from "../../host-kit/visibility.ts";

/** Any `src` folder and everything under it, in every language track. */
export const isSourceCode = (rel: Rel) => /(^|\/)src(\/|$)/i.test(rel);

/** Docs plus the files docs routinely tell you to open: env templates, manifests, compose files, start scripts. */
export const isDocLike = (rel: Rel) =>
  /\.(md|example|ya?ml)$/i.test(rel) || /(^|\/)(package\.json|\.env|start\.(ps1|sh)|dockerfile)$/i.test(rel);

export const FRESH_EYES_SHELL = new Set([
  "npm", "npx", "node", "git", "curl", "invoke-webrequest", "invoke-restmethod",
  "cd", "set-location", "get-location", "pwd", "ls", "dir", "get-childitem", "test-path",
  "cp", "copy", "copy-item", "mkdir", "new-item",
  "start-sleep", "start-process", "stop-process", "get-process", "get-nettcpconnection",
  "select-object", "where-object", "foreach-object", "convertto-json", "convertfrom-json",
  "format-list", "format-table", "out-string", "write-output", "write-host", "echo",
  "./start.ps1", ".\\start.ps1", "start.ps1", "bash", "sh",
]);

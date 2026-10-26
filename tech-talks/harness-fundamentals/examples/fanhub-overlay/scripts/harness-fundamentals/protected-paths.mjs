// One path rule shared by the repo hook and the SDK host, so both layers agree on what "protected" means.
import path from "node:path";

export const PROTECTED_RULES = [
  {
    id: "fanhub-database-source",
    description: "Database connection, schema, seed data, and setup scripts",
    test: (rel) => rel === "node/backend/src/database" || rel.startsWith("node/backend/src/database/"),
  },
  {
    id: "fanhub-sqlite-file",
    description: "SQLite database files",
    test: (rel) => /(^|\/)fanhub\.db(-wal|-shm|-journal)?$/.test(rel),
  },
];

const DIRECT_READ_TOOLS = new Set(["view", "read", "read_file", "grep", "rg", "glob"]);
const DIRECT_WRITE_TOOLS = new Set(["create", "edit", "str_replace_editor", "write", "apply_patch"]);
const SHELL_TOOLS = new Set(["bash", "powershell", "shell"]);

export function toRepoRelative(candidate, repoRoot) {
  if (typeof candidate !== "string" || candidate.trim() === "") return null;
  const root = path.resolve(repoRoot ?? process.cwd());
  const absolute = path.resolve(root, candidate.trim());
  const rel = path.relative(root, absolute).split(path.sep).join("/");
  return process.platform === "win32" ? rel.toLowerCase() : rel;
}

export function matchProtected(candidate, repoRoot) {
  const rel = toRepoRelative(candidate, repoRoot);
  if (rel === null || rel.startsWith("..")) return null;
  const rule = PROTECTED_RULES.find((r) => r.test(rel));
  return rule ? { ruleId: rule.id, path: rel } : null;
}

export function parseToolArgs(toolArgs) {
  if (typeof toolArgs !== "string") return toolArgs ?? {};
  try {
    return JSON.parse(toolArgs);
  } catch {
    return { input: toolArgs };
  }
}

function pathsFromPatch(text) {
  if (typeof text !== "string") return [];
  const found = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\*\*\* (?:Add|Update|Delete) File: (.+)$/) ?? line.match(/^\*\*\* Move to: (.+)$/);
    if (m) found.push(m[1].trim());
  }
  return found;
}

// Classifies a tool call by the paths it names directly. Shell commands are reported as indirect:
// the hook sees only raw command text, while the SDK permission request carries parsed paths.
export function describeToolCall(toolName, rawArgs) {
  const name = String(toolName ?? "").toLowerCase();
  const args = parseToolArgs(rawArgs);

  if (SHELL_TOOLS.has(name)) {
    return { access: "shell", paths: [], command: String(args.command ?? args.input ?? "") };
  }
  if (DIRECT_WRITE_TOOLS.has(name)) {
    const paths = name === "apply_patch" ? pathsFromPatch(args.input ?? args.patch) : [args.path ?? args.filePath];
    return { access: "write", paths: paths.filter(Boolean) };
  }
  if (DIRECT_READ_TOOLS.has(name)) {
    const paths = [args.path, ...(Array.isArray(args.paths) ? args.paths : [])];
    return { access: "read", paths: paths.filter(Boolean) };
  }
  return { access: "other", paths: [] };
}

export function findProtectedHits(paths, repoRoot) {
  return paths.map((p) => matchProtected(p, repoRoot)).filter(Boolean);
}

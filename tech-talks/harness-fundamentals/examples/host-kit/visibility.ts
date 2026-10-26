// The visibility policy both apps share. One object answers every question the runtime asks before a tool runs:
// may the agent read this, write this, run this? Rules are plain predicates over repo-relative paths, so they unit-test.
import path from "node:path";
import type { PermissionHandler, PermissionRequestResult } from "@github/copilot-sdk";

export type Rel = string;

export interface VisibilityRules {
  repoRoot: string;
  /** Paths the agent must never see. Checked first, for every kind of access. */
  hidden: (rel: Rel) => boolean;
  /** Concrete hidden folders/files, used to stop searches whose scope would sweep them in. */
  hiddenRoots: Rel[];
  /** Optional read allowlist. When set, files outside it are rejected even if not hidden. Folders stay listable. */
  readable?: (rel: Rel) => boolean;
  /** Paths the agent may create or edit. */
  writable: (rel: Rel) => boolean;
  /** Executables the agent may run (lowercase identifiers such as "npm", "node", "curl"). */
  shellCommands: Set<string>;
  /** Command text that reaches hidden material indirectly, e.g. /BUGS\.md/i. */
  shellTextDeny: RegExp[];
  /** Domain tools the host defined and trusts. */
  customTools: Set<string>;
  /** Feedback the agent receives when it reaches for something hidden. Shapes its recovery. */
  hiddenFeedback: string;
  log?: (entry: Record<string, unknown>) => void;
}

export interface Decision {
  layer: "permission" | "pre-tool";
  kind: string;
  subject: string;
  decision: "allow" | "deny";
  rule: string;
}

const CONTENT_SEARCH_TOOLS = new Set(["grep", "rg"]);
const PATH_TOOLS = new Set(["view", "read", "read_file", "glob", ...CONTENT_SEARCH_TOOLS]);
const WRITE_TOOLS = new Set(["create", "edit", "str_replace_editor", "write", "apply_patch"]);

/** First word of every command segment: `cd x; npm start | tee y` -> ["cd", "npm", "tee"]. */
export function commandHeads(text: string): string[] {
  return splitSegments(text)
    .map((seg) => seg.trim().replace(/^[&.]\s+/, ""))
    .filter(Boolean)
    .map((seg) => (seg.match(/^("[^"]+"|'[^']+'|\S+)/)?.[1] ?? "").replace(/^["']|["']$/g, "").toLowerCase().replace(/\.exe$/, ""));
}

// Separators inside quotes belong to an argument (`node -e "a(); b()"`), so only split outside them.
function splitSegments(text: string): string[] {
  const segments: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === quote) quote = null;
      current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
    } else if (ch === "\n" || ch === ";" || ch === "|" || (ch === "&" && text[i + 1] === "&")) {
      segments.push(current);
      current = "";
      if ((ch === "|" && text[i + 1] === "|") || ch === "&") i++;
    } else {
      current += ch;
    }
  }
  segments.push(current);
  return segments;
}

export function toRel(candidate: unknown, repoRoot: string): Rel | null {
  if (typeof candidate !== "string" || candidate.trim() === "") return null;
  const root = path.resolve(repoRoot);
  const rel = path.relative(root, path.resolve(root, candidate.trim())).split(path.sep).join("/");
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
  return process.platform === "win32" ? rel.toLowerCase() : rel;
}

/** True when a search rooted at `scope` would include any hidden root. */
export function sweepsHidden(scope: Rel, hiddenRoots: Rel[]): boolean {
  if (scope === "" || scope === ".") return hiddenRoots.length > 0;
  return hiddenRoots.some((h) => h === scope || h.startsWith(scope + "/"));
}

function looksLikeFolder(rel: Rel): boolean {
  return rel === "" || !path.posix.basename(rel).includes(".");
}

export function createVisibilityPolicy(rules: VisibilityRules) {
  const decisions: Decision[] = [];
  const counts = { allow: 0, deny: 0 };

  function record(d: Decision) {
    decisions.push(d);
    counts[d.decision] += 1;
    rules.log?.({ ts: new Date().toISOString(), ...d });
  }
  const allow = (d: Omit<Decision, "decision">): PermissionRequestResult => {
    record({ ...d, decision: "allow" });
    return { kind: "approve-once" };
  };
  const deny = (d: Omit<Decision, "decision">, feedback: string): PermissionRequestResult => {
    record({ ...d, decision: "deny" });
    return { kind: "reject", feedback };
  };

  /** Read decision for one path; exported through the policy so tests can call it directly. */
  function checkRead(raw: unknown): { ok: boolean; rule: string; rel: Rel | null } {
    const rel = toRel(raw, rules.repoRoot);
    if (rel === null) return { ok: false, rule: "outside-repo", rel };
    if (rules.hidden(rel)) return { ok: false, rule: "hidden", rel };
    if (rules.readable && !looksLikeFolder(rel) && !rules.readable(rel)) return { ok: false, rule: "not-readable", rel };
    return { ok: true, rule: "readable", rel };
  }

  const onPermissionRequest: PermissionHandler = (request) => {
    switch (request.kind) {
      case "read": {
        const r = checkRead(request.path);
        const base = { layer: "permission" as const, kind: "read", subject: r.rel === "" ? "." : (r.rel ?? String(request.path)), rule: r.rule };
        return r.ok ? allow(base) : deny(base, rules.hiddenFeedback);
      }
      case "write": {
        const rel = toRel(request.fileName, rules.repoRoot);
        const base = { layer: "permission" as const, kind: "write", subject: rel ?? String(request.fileName) };
        if (rel === null || rules.hidden(rel)) return deny({ ...base, rule: "hidden" }, rules.hiddenFeedback);
        if (!rules.writable(rel)) return deny({ ...base, rule: "not-writable" }, "You may only write files in your designated output folder.");
        const body = request.newFileContents ?? "";
        if (rules.shellTextDeny.some((re) => re.test(body))) {
          return deny({ ...base, rule: "content-reaches-hidden" }, "That file would read hidden material when it runs. " + rules.hiddenFeedback);
        }
        return allow({ ...base, rule: "writable" });
      }
      case "shell": {
        const text = request.fullCommandText ?? "";
        const base = { layer: "permission" as const, kind: "shell", subject: text.slice(0, 160) };
        const touched = (request.possiblePaths ?? []).map((p) => toRel(p, rules.repoRoot)).filter((p): p is Rel => p !== null);
        if (touched.some(rules.hidden) || rules.shellTextDeny.some((re) => re.test(text))) {
          return deny({ ...base, rule: "shell-reaches-hidden" }, rules.hiddenFeedback);
        }
        const ids = commandHeads(text);
        const blocked = ids.filter((id) => !rules.shellCommands.has(id));
        if (ids.length === 0 || blocked.length > 0) {
          return deny(
            { ...base, rule: `command-not-allowed:${blocked.join(",") || "unparsed"}` },
            `Allowed commands: ${[...rules.shellCommands].join(", ")}.`,
          );
        }
        return allow({ ...base, rule: "allowed-commands" });
      }
      case "custom-tool": {
        const base = { layer: "permission" as const, kind: "custom-tool", subject: request.toolName };
        return rules.customTools.has(request.toolName) ? allow({ ...base, rule: "host-tool" }) : deny({ ...base, rule: "unknown-tool" }, "Unknown tool.");
      }
      default:
        return deny({ layer: "permission", kind: request.kind, subject: request.kind, rule: "unhandled-kind" }, "Not available in this session.");
    }
  };

  /** Sees every tool's arguments before the permission layer; catches searches that would sweep hidden folders. */
  async function onPreToolUse(input: { toolName: string; toolArgs: unknown }) {
    const name = String(input.toolName ?? "").toLowerCase();
    let args: Record<string, unknown> = {};
    try {
      args = (typeof input.toolArgs === "string" ? JSON.parse(input.toolArgs) : input.toolArgs) ?? {};
    } catch {
      return undefined;
    }
    if (PATH_TOOLS.has(name) || WRITE_TOOLS.has(name)) {
      const raw = args.path ?? args.file_path ?? args.fileName ?? (CONTENT_SEARCH_TOOLS.has(name) ? "." : undefined);
      const rel = toRel(raw, rules.repoRoot);
      if (rel !== null && rules.hidden(rel)) {
        record({ layer: "pre-tool", kind: name, subject: rel, decision: "deny", rule: "hidden" });
        return { permissionDecision: "deny" as const, permissionDecisionReason: rules.hiddenFeedback };
      }
      if (rel !== null && CONTENT_SEARCH_TOOLS.has(name) && sweepsHidden(rel, rules.hiddenRoots)) {
        record({ layer: "pre-tool", kind: name, subject: rel || ".", decision: "deny", rule: "search-sweeps-hidden" });
        return {
          permissionDecision: "deny" as const,
          permissionDecisionReason: `That search scope includes hidden folders. Narrow it to a folder you are allowed to read. ${rules.hiddenFeedback}`,
        };
      }
    }
    return undefined;
  }

  return { onPermissionRequest, onPreToolUse, checkRead, decisions, counts };
}

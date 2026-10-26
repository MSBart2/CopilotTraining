// A clean, disposable FanHub checkout per run, with the repository hook overlay applied so the repo floor is present.
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const EXAMPLES_DIR = path.resolve(here, "..");

export interface FanHubCheckout {
  dir: string;
  commit: string;
  dispose: () => void;
}

export function prepareFanHub({
  source = process.env.FANHUB_SOURCE ?? "https://github.com/MSBart2/FanHub.git",
  commit = process.env.FANHUB_COMMIT ?? "0ea9e78",
  withRepoHooks = true,
} = {}): FanHubCheckout {
  const dir = mkdtempSync(path.join(os.tmpdir(), "fanhub-"));
  execFileSync("git", ["clone", "--quiet", source, dir], { stdio: "inherit" });
  execFileSync("git", ["-C", dir, "checkout", "--quiet", commit], { stdio: "inherit" });
  if (withRepoHooks) cpSync(path.join(EXAMPLES_DIR, "fanhub-overlay"), dir, { recursive: true });
  const resolved = execFileSync("git", ["-C", dir, "rev-parse", "--short", "HEAD"]).toString().trim();
  return {
    dir,
    commit: resolved,
    dispose: () => {
      stopProcessesUnder(dir);
      try {
        rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
      } catch {
        console.warn(`Could not remove ${dir}; delete it manually.`);
      }
    },
  };
}

/** Stop whatever is listening on a port, e.g. a dev server the agent left running. */
export function stopListenerOnPort(port: number) {
  try {
    if (process.platform === "win32") {
      execFileSync("powershell", [
        "-NoProfile",
        "-Command",
        `Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }`,
      ]);
    } else {
      execFileSync("sh", ["-c", `lsof -ti tcp:${port} | xargs -r kill`]);
    }
  } catch {
    // Nothing listening.
  }
}

/** Best-effort cleanup for servers the agent (or the host) started inside the checkout. */
export function stopProcessesUnder(dir: string) {
  try {
    if (process.platform === "win32") {
      const escaped = dir.replace(/'/g, "''");
      execFileSync("powershell", [
        "-NoProfile",
        "-Command",
        `Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*${escaped}*' -and $_.ProcessId -ne $PID } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`,
      ]);
    } else {
      execFileSync("pkill", ["-f", dir]);
    }
  } catch {
    // Nothing left running.
  }
}

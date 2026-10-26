// Copies the hook overlay into a FanHub checkout: node scripts/apply-overlay.mjs <path-to-fanhub>
import { cpSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const target = path.resolve(process.argv[2] ?? process.env.FANHUB_DIR ?? "");
if (!existsSync(path.join(target, "node", "backend", "src", "database"))) {
  console.error(`Not a FanHub checkout: ${target}`);
  process.exit(1);
}
const overlay = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "fanhub-overlay");
cpSync(overlay, target, { recursive: true });
console.log(`Applied harness overlay to ${target}`);
console.log("  .github/hooks/harness-fundamentals.json");
console.log("  scripts/harness-fundamentals/*.mjs");

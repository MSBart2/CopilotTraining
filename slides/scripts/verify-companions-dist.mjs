#!/usr/bin/env node
// ============================================================================
// verify-companions-dist.mjs — Ensure every companion file was copied into dist/
// ============================================================================
// Used by CI after copy-companions.mjs. Fails hard if a source companion is
// missing from dist/<category>/<slug>/. Does not regenerate anything.
// ============================================================================

import { existsSync, readdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "companions");
const DIST = join(ROOT, "dist");
const NAMES = new Set(["agenda.html", "agenda.md", "deck.pdf"]);

if (!existsSync(SRC)) {
  console.log("No companions/ directory — nothing to verify.");
  process.exit(0);
}

const missing = [];
let checked = 0;

for (const cat of readdirSync(SRC)) {
  const cdir = join(SRC, cat);
  if (!statSync(cdir).isDirectory()) continue;
  for (const slug of readdirSync(cdir)) {
    const sdir = join(cdir, slug);
    if (!statSync(sdir).isDirectory()) continue;
    for (const name of readdirSync(sdir)) {
      if (!NAMES.has(name)) continue;
      const src = join(sdir, name);
      if (!statSync(src).isFile()) continue;
      checked += 1;
      const dst = join(DIST, cat, slug, name);
      if (!existsSync(dst) || !statSync(dst).isFile()) {
        missing.push(`${cat}/${slug}/${name}`);
      }
    }
  }
}

if (missing.length) {
  console.error("::error::Companion copy failed — missing from dist/:");
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}

console.log(`✓ Verified ${checked} companion file(s) present in dist/`);
process.exit(0);

#!/usr/bin/env node
// ============================================================================
// copy-companions.mjs — Copy local agenda/PDF companions into dist (no generation)
// ============================================================================
//
// Source:  slides/companions/<category>/<slug>/{agenda.html,agenda.md,deck.pdf}
// Dest:    slides/dist/<category>/<slug>/
//
// Deploy and local builds call this so only inspected artifacts ship.
// ============================================================================

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SLIDES = join(__dirname, "..");
const SRC = join(SLIDES, "companions");
const DIST = join(SLIDES, "dist");

const COPY_NAMES = new Set(["agenda.html", "agenda.md", "deck.pdf"]);

if (!existsSync(SRC)) {
  console.log("No slides/companions/ directory — nothing to copy.");
  process.exit(0);
}

let copied = 0;
for (const cat of readdirSync(SRC, { withFileTypes: true })) {
  if (!cat.isDirectory()) continue;
  const catDir = join(SRC, cat.name);
  for (const slug of readdirSync(catDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const fromDir = join(catDir, slug.name);
    const toDir = join(DIST, cat.name, slug.name);
    for (const name of readdirSync(fromDir)) {
      if (!COPY_NAMES.has(name)) continue;
      const from = join(fromDir, name);
      if (!statSync(from).isFile()) continue;
      mkdirSync(toDir, { recursive: true });
      copyFileSync(from, join(toDir, name));
      copied++;
      console.log(`  ${cat.name}/${slug.name}/${name}`);
    }
  }
}

console.log(
  copied
    ? `✓ Copied ${copied} companion file(s) into dist/`
    : "No companion files found to copy.",
);

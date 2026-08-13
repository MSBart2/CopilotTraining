#!/usr/bin/env node
// ============================================================================
// check-companions.mjs — Detect missing/stale agenda + PDF companions
// ============================================================================
//
// For each active deck, requires:
//   slides/companions/<category>/<slug>/agenda.md
//   slides/companions/<category>/<slug>/agenda.html
//   slides/companions/<category>/<slug>/deck.pdf
//
// Stale if the deck markdown is newer than the companion (mtime), or the
// companion is missing entirely.
//
// Usage (from slides/ or repo root):
//   node scripts/check-companions.mjs              # report, exit 0
//   node scripts/check-companions.mjs --strict     # exit 1 if any issue
//   node scripts/check-companions.mjs --json
//   node scripts/check-companions.mjs vscode-latest
//   node scripts/check-companions.mjs --folder tech-talks
// ============================================================================

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "fs";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const COMPANIONS = join(ROOT, "companions");

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const asJson = args.includes("--json");
const folderFilter = (() => {
  const i = args.indexOf("--folder");
  return i >= 0 ? args[i + 1] : null;
})();
const slugFilter = args.find((a, i) => {
  if (a.startsWith("--")) return false;
  const prev = args[i - 1];
  if (prev === "--folder") return false;
  return true;
});

const SKIP = new Set([
  "global-top",
  "global-bottom",
  "template",
  "exec-spine",
  "component-test",
]);

function isArchived(filePath) {
  const head = readFileSync(filePath, "utf8").slice(0, 800);
  return /^status:\s*archived\b/m.test(head);
}

function discoverDecks() {
  const decks = [];
  for (const cat of ["tech-talks", "workshop", "exec-talks"]) {
    if (folderFilter && cat !== folderFilter) continue;
    const dir = join(ROOT, cat);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const slug = basename(file, ".md");
      if (SKIP.has(slug) || slug.endsWith("-reference")) continue;
      if (slugFilter && slug !== slugFilter) continue;
      const abs = join(dir, file);
      if (isArchived(abs)) continue;
      decks.push({
        category: cat,
        slug,
        deckPath: abs,
        key: `${cat}/${slug}`,
      });
    }
  }
  return decks;
}

function mtimeMs(p) {
  try {
    return statSync(p).mtimeMs;
  } catch {
    return null;
  }
}

function checkOne(deck) {
  const dir = join(COMPANIONS, deck.category, deck.slug);
  const needed = ["agenda.md", "agenda.html", "deck.pdf"];
  const deckM = mtimeMs(deck.deckPath);
  const issues = [];
  const files = {};

  for (const name of needed) {
    const p = join(dir, name);
    const m = mtimeMs(p);
    files[name] = m
      ? { path: p, mtimeMs: m, bytes: statSync(p).size }
      : null;
    if (!m) {
      issues.push({ code: "missing", file: name });
      continue;
    }
    // 2s skew tolerance for FS timestamp noise
    if (deckM != null && deckM > m + 2000) {
      issues.push({
        code: "stale",
        file: name,
        deckMtime: deckM,
        companionMtime: m,
      });
    }
  }

  // agenda.html should not be older than agenda.md when both exist
  if (files["agenda.md"] && files["agenda.html"]) {
    if (files["agenda.md"].mtimeMs > files["agenda.html"].mtimeMs + 2000) {
      issues.push({ code: "stale-html", file: "agenda.html" });
    }
  }

  return {
    key: deck.key,
    category: deck.category,
    slug: deck.slug,
    deckPath: deck.deckPath,
    ok: issues.length === 0,
    issues,
    files,
  };
}

const results = discoverDecks().map(checkOne);
const bad = results.filter((r) => !r.ok);
const missing = bad.filter((r) => r.issues.some((i) => i.code === "missing"));
const stale = bad.filter((r) =>
  r.issues.some((i) => i.code === "stale" || i.code === "stale-html"),
);

if (asJson) {
  console.log(
    JSON.stringify(
      {
        total: results.length,
        ok: results.length - bad.length,
        missing: missing.length,
        stale: stale.length,
        results: bad.length ? bad : results,
      },
      null,
      2,
    ),
  );
} else {
  console.log(`Companion check — ${results.length} active deck(s)\n`);
  if (!bad.length) {
    console.log("✓ All companions present and newer than their decks.");
  } else {
    for (const r of bad) {
      const bits = r.issues.map((i) => `${i.code}:${i.file}`).join(", ");
      console.log(`✗ ${r.key}  (${bits})`);
    }
    console.log(
      `\n${missing.length} missing, ${stale.length} stale, ${results.length - bad.length} ok.`,
    );
    console.log("\nFix:");
    console.log("  cd slides");
    console.log("  npm run generate-agendas -- --from-slides   # or per-slug");
    console.log("  npm run export-pdf -- <slug>                # compact PDF");
    console.log("  npm run check-companions -- --strict");
  }
}

if (strict && bad.length) process.exit(1);
process.exit(0);

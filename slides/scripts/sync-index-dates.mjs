#!/usr/bin/env node
// ============================================================================
// sync-index-dates.mjs — Regenerate SLIDE_DATES in index-custom.html
// ============================================================================
//
// Reads the "updated:" field from every slide's YAML frontmatter and writes
// the SLIDE_DATES map into slides/index-custom.html so the "NEW" badge
// appears automatically for slides updated within the last 7 days.
//
// Agenda HTML / PDFs are companion files (generate-agendas.mjs / export-pdfs.mjs)
// and are NOT embedded in the index.
//
// Usage:
//   node slides/scripts/sync-index-dates.mjs
//   node slides/scripts/sync-index-dates.mjs --check
// ============================================================================

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function collectDates() {
  const dates = {};
  const dirs = ["tech-talks", "exec-talks", "workshop"];

  for (const dir of dirs) {
    const folder = join(ROOT, dir);
    let files;
    try {
      files = readdirSync(folder).filter((f) => f.endsWith(".md"));
    } catch {
      continue;
    }

    for (const file of files) {
      const slug = basename(file, ".md");
      if (["global-top", "global-bottom", "template"].includes(slug)) continue;
      if (slug.endsWith("-reference")) continue;

      const content = readFileSync(join(folder, file), "utf8");
      const match = content.match(/^updated:\s*(\d{4}-\d{2}-\d{2})/m);
      if (match) dates[slug] = match[1];
    }
  }

  return dates;
}

function formatDatesMap(dates) {
  const entries = Object.entries(dates)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, date]) => `      '${slug}': '${date}',`)
    .join("\n");
  return `const SLIDE_DATES = {\n${entries}\n    }`;
}

const dates = collectDates();
const newMap = formatDatesMap(dates);
const indexPath = join(ROOT, "index-custom.html");
const html = readFileSync(indexPath, "utf8");
const pattern = /const SLIDE_DATES = \{[\s\S]*?\n\s*\}/;

if (!pattern.test(html)) {
  console.error("❌ Could not find SLIDE_DATES block in index-custom.html");
  process.exit(1);
}

let next = html.replace(pattern, newMap);
next = next.replace(
  /\n\s*\/\/ Placeholder[\s\S]*?\n\s*const SLIDE_AGENDAS = \{[\s\S]*?\n\s*\};?\n/,
  "\n",
);
next = next.replace(/\n\s*const SLIDE_AGENDAS = \{[\s\S]*?\n\s*\};?\n/, "\n");

if (process.argv.includes("--check")) {
  if (html === next) {
    console.log("✅ SLIDE_DATES is in sync with frontmatter");
    process.exit(0);
  }
  console.error(
    "❌ SLIDE_DATES is out of sync — run: node slides/scripts/sync-index-dates.mjs",
  );
  process.exit(1);
}

writeFileSync(indexPath, next);
console.log(`✅ Updated SLIDE_DATES with ${Object.keys(dates).length} entries`);

const now = new Date();
const oneWeek = 7 * 24 * 60 * 60 * 1000;
const newSlides = Object.entries(dates).filter(
  ([, d]) => now - new Date(d + "T00:00:00") < oneWeek,
);
if (newSlides.length) {
  console.log(
    `🆕 slides with NEW badge: ${newSlides.map(([s]) => s).join(", ")}`,
  );
} else {
  console.log("   (no slides within the 7-day NEW window)");
}

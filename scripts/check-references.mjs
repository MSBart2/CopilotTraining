#!/usr/bin/env node

/**
 * check-references.mjs
 *
 * Validates that all `references[].url` entries in tech-talk and exec-talk
 * YAML frontmatter are still accessible (HTTP 200). Also flags URLs whose
 * `verified` date is older than a configurable threshold.
 *
 * Usage:
 *   node scripts/check-references.mjs              # check all talks
 *   node scripts/check-references.mjs --stale 30   # flag URLs verified > 30 days ago
 *   node scripts/check-references.mjs --fix        # update verified dates for URLs that pass
 *   node scripts/check-references.mjs --verbose     # show per-URL status
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

// ── Configuration ─────────────────────────────────────────────────────────────
const CONTENT_DIRS = ["tech-talks", "exec-talks"];
const TARGET_FILES = ["README.md", "plan.md"];
const STALE_DAYS_DEFAULT = 90;

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const verbose = args.includes("--verbose");
const fix = args.includes("--fix");
const staleIdx = args.indexOf("--stale");
const staleDays =
  staleIdx !== -1 ? parseInt(args[staleIdx + 1], 10) : STALE_DAYS_DEFAULT;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Extract YAML frontmatter from a markdown file string.
 * Returns the raw YAML string between the first pair of `---` delimiters,
 * or null if none found.
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

/**
 * Minimal YAML parser for the `references` array.
 * Handles only the specific structure we expect:
 *   references:
 *     - url: ...
 *       label: "..."
 *       verified: YYYY-MM-DD
 */
function parseReferences(yaml) {
  const refs = [];

  // Find "references:" and grab everything after it until the next
  // top-level key (line starting with a non-space char) or end of string.
  const refStart = yaml.indexOf("references:");
  if (refStart === -1) return refs;

  const afterKey = yaml.slice(refStart + "references:".length);
  const lines = afterKey.split("\n").slice(1); // skip remainder of the "references:" line

  // Collect indented lines (part of the references block)
  const blockLines = [];
  for (const line of lines) {
    if (line.length === 0 || /^\s/.test(line)) {
      blockLines.push(line);
    } else {
      break; // hit a top-level key
    }
  }

  // Parse entries from block
  let current = null;
  for (const line of blockLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // New entry starts with "- "
    if (/^-\s+/.test(trimmed)) {
      if (current && current.url) refs.push(current);
      current = {};
      const kv = trimmed
        .replace(/^-\s+/, "")
        .match(/^(\w+):\s*"?([^"]*?)"?\s*$/);
      if (kv) current[kv[1]] = kv[2];
    } else if (current) {
      const kv = trimmed.match(/^(\w+):\s*"?([^"]*?)"?\s*$/);
      if (kv) current[kv[1]] = kv[2];
    }
  }
  if (current && current.url) refs.push(current);

  return refs;
}

/**
 * Check if a URL is accessible. Returns { ok, status, redirected }.
 * Follows redirects (GitHub docs redirect frequently).
 */
async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "CopilotTraining-RefChecker/1.0 (https://github.com/copilottraining)",
      },
    });
    clearTimeout(timeout);
    // Some servers reject HEAD — retry with GET
    if (res.status === 405 || res.status === 403) {
      const res2 = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(15000),
        redirect: "follow",
        headers: {
          "User-Agent":
            "CopilotTraining-RefChecker/1.0 (https://github.com/copilottraining)",
        },
      });
      return {
        ok: res2.ok,
        status: res2.status,
        redirected: res2.redirected,
      };
    }
    return { ok: res.ok, status: res.status, redirected: res.redirected };
  } catch (err) {
    return {
      ok: false,
      status: err.name === "AbortError" ? "TIMEOUT" : err.code || err.message,
      redirected: false,
    };
  }
}

/**
 * Calculate days since a YYYY-MM-DD date string.
 */
function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  if (isNaN(d)) return Infinity;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

/**
 * Recursively collect target files from content directories.
 */
function collectFiles(baseDir) {
  const files = [];
  for (const contentDir of CONTENT_DIRS) {
    const dir = join(baseDir, contentDir);
    try {
      for (const topic of readdirSync(dir)) {
        const topicPath = join(dir, topic);
        if (!statSync(topicPath).isDirectory()) continue;
        for (const file of TARGET_FILES) {
          const filePath = join(topicPath, file);
          try {
            statSync(filePath);
            files.push(filePath);
          } catch {
            // file doesn't exist — skip
          }
        }
      }
    } catch {
      // directory doesn't exist — skip
    }
  }
  return files;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const root = join(import.meta.dirname, "..");
const files = collectFiles(root);

let totalRefs = 0;
let broken = 0;
let stale = 0;
let passed = 0;
const issues = [];
const today = new Date().toISOString().slice(0, 10);

console.log(`\n🔗 Reference URL Checker`);
console.log(`   Stale threshold: ${staleDays} days`);
console.log(`   Scanning ${files.length} files...\n`);

for (const filePath of files) {
  const relPath = relative(root, filePath);
  const content = readFileSync(filePath, "utf-8");
  const yaml = extractFrontmatter(content);
  if (!yaml) continue;

  const refs = parseReferences(yaml);
  if (refs.length === 0) continue;

  if (verbose) console.log(`📄 ${relPath} (${refs.length} references)`);

  for (const ref of refs) {
    totalRefs++;
    const age = daysSince(ref.verified);

    // Check staleness
    if (age > staleDays) {
      stale++;
      issues.push({
        file: relPath,
        url: ref.url,
        issue: `Stale — verified ${ref.verified || "never"} (${age === Infinity ? "∞" : age} days ago)`,
      });
      if (verbose) console.log(`  ⚠️  STALE  ${ref.url}`);
    }

    // Check accessibility
    const result = await checkUrl(ref.url);
    if (result.ok) {
      passed++;
      if (verbose) console.log(`  ✅ ${result.status}  ${ref.url}`);
      // --fix: update verified date in the file
      if (fix && ref.verified !== today) {
        const updated = content.replace(
          new RegExp(
            `(url:\\s*${ref.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n\\s*label:.*\\n\\s*verified:\\s*)\\S+`,
          ),
          `$1${today}`,
        );
        if (updated !== content) {
          writeFileSync(filePath, updated, "utf-8");
          if (verbose) console.log(`     ↳ Updated verified → ${today}`);
        }
      }
    } else {
      broken++;
      issues.push({
        file: relPath,
        url: ref.url,
        issue: `Broken — HTTP ${result.status}`,
      });
      if (verbose) console.log(`  ❌ ${result.status}  ${ref.url}`);
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(60)}`);
console.log(`📊 Results: ${totalRefs} references checked`);
console.log(`   ✅ Passed:  ${passed}`);
console.log(`   ❌ Broken:  ${broken}`);
console.log(`   ⚠️  Stale:   ${stale}`);

if (issues.length > 0) {
  console.log(`\n🔍 Issues:\n`);
  for (const { file, url, issue } of issues) {
    console.log(`   ${file}`);
    console.log(`     ${url}`);
    console.log(`     → ${issue}\n`);
  }
}

console.log();
process.exit(broken > 0 ? 1 : 0);

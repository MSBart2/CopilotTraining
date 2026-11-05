#!/usr/bin/env node
// Publish one reviewed talk from the current (staging) branch to main without
// bringing along any other unreviewed talk. Works in a temporary worktree of
// origin/main, so the current branch and working tree are never touched.
//
//   npm run publish:talk -- <slug> [<slug>...] [--include <path>]... [-m "message"] [--push] [--keep]
//   npm run publish:talk -- --status                     # what is still only on this branch
//   npm run publish:talk -- --tooling [-m "message" --push]   # ship the non-talk leftovers
//
// Without --push it is a dry run: it stages the change in the worktree, runs the
// ship checks, prints the diff stat, and cleans up. Every run ends with a list of
// talks still waiting and, once none remain, a reminder to ship the tooling.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const TRAILER = "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>";
const repo = resolve(import.meta.dirname, "..");
// Regenerated on every publish, so they never count as leftovers.
const GENERATED = new Set(["slides/index-custom.html", "tech-talks/portfolio.generated.json"]);

function parseArgs(argv) {
  const opts = { include: [], push: false, keep: false, status: false, tooling: false, message: null, slugs: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--include") opts.include.push(argv[++i]);
    else if (a === "-m" || a === "--message") opts.message = argv[++i];
    else if (a === "--push") opts.push = true;
    else if (a === "--keep") opts.keep = true;
    else if (a === "--status") opts.status = true;
    else if (a === "--tooling") opts.tooling = true;
    else if (!a.startsWith("-")) opts.slugs.push(a);
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!opts.slugs.length && !opts.status && !opts.tooling) {
    throw new Error("Usage: npm run publish:talk -- <slug> [<slug>...] | --status | --tooling [--include <path>]... [-m \"message\"] [--push]");
  }
  if (opts.push && !opts.message) throw new Error("--push needs -m \"commit message\"");
  return opts;
}

const git = (args, cwd = repo) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
const run = (args, cwd) => execFileSync(process.execPath, args, { cwd, stdio: "inherit" });
const inTree = (rev, path, cwd) => git(["ls-tree", "-r", "--name-only", rev, "--", path], cwd) !== "";

// Split everything that differs between main and the branch into talks and tooling.
function pending(base, source) {
  const files = git(["diff", "--name-only", base, source]).split(/\r?\n/).filter(Boolean);
  const talks = new Set();
  const tooling = [];
  for (const f of files) {
    if (GENERATED.has(f)) continue;
    const m = f.match(/^(?:slides\/companions\/|slides\/)?tech-talks\/([^/]+)\//) ?? f.match(/^slides\/tech-talks\/([^/]+)\.md$/);
    if (m && (inTree(source, `tech-talks/${m[1]}/README.md`) || inTree(base, `tech-talks/${m[1]}/README.md`))) talks.add(m[1]);
    else tooling.push(f);
  }
  return { talks: [...talks].sort(), tooling };
}

function reportPending({ talks, tooling }, branch) {
  console.log("");
  if (talks.length) {
    console.log(`📋 Still only on ${branch} (${talks.length}): ${talks.join(", ")}`);
    if (tooling.length) console.log(`   Plus ${tooling.length} tooling file(s); ship them after the last talk (npm run publish:talk -- --tooling).`);
    return;
  }
  if (!tooling.length) {
    console.log(`✅ ${branch} has nothing left that main lacks. Safe to delete it (and backup/* branches).`);
    return;
  }
  const bar = "═".repeat(72);
  console.log(`${bar}\n⚠  LAST TALK IS OUT — BEFORE YOU DELETE ${branch}:\n`);
  console.log(`   ${tooling.length} tooling file(s) exist only on this branch and die with it:`);
  for (const f of tooling) console.log(`     · ${f}`);
  console.log(`\n   Review: npm run publish:talk -- --tooling`);
  console.log(`   Ship:   npm run publish:talk -- --tooling -m "<message>" --push`);
  console.log(`   Or drop any you don't want, then delete the branch.\n${bar}`);
}

// A fresh checkout gives every file a new mtime, so the inventory would report
// size and date churn for files this publish never touched. Keep main's values for those.
function restoreInventoryNoise(wt, changed) {
  const path = join(wt, "tech-talks", "portfolio.generated.json");
  const before = JSON.parse(git(["show", "HEAD:tech-talks/portfolio.generated.json"], wt).replace(/^\uFEFF/, ""));
  const after = JSON.parse(readFileSync(path, "utf8"));
  const old = new Map();
  for (const talk of before.talks ?? []) for (const f of Object.values(talk.files ?? {})) if (f?.path) old.set(f.path, f);
  for (const talk of after.talks ?? []) {
    for (const f of Object.values(talk.files ?? {})) {
      const prev = f?.path && old.get(f.path);
      if (prev && prev.exists === f.exists && !changed.has(f.path)) {
        f.bytes = prev.bytes;
        f.modified = prev.modified;
      }
    }
  }
  writeFileSync(path, JSON.stringify(after, null, 2) + "\n");
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const source = git(["rev-parse", "HEAD"]);
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);

  if (opts.status) {
    git(["fetch", "origin", "main", "--quiet"]);
    reportPending(pending("origin/main", source), branch);
    return;
  }

  const { slugs } = opts;
  let paths;
  if (opts.tooling) {
    paths = [...pending("origin/main", source).tooling, ...opts.include];
    if (!paths.length) {
      console.log("✓ No tooling left to publish.");
      return;
    }
  } else {
    paths = [];
    for (const slug of slugs) {
      const readme = join(repo, "tech-talks", slug, "README.md");
      if (!existsSync(readme)) throw new Error(`No talk at tech-talks/${slug}/README.md`);
      if (/^status:\s*archived\s*$/m.test(readFileSync(readme, "utf8"))) throw new Error(`${slug} is archived; nothing to publish.`);
      paths.push(`tech-talks/${slug}`, `slides/tech-talks/${slug}`, `slides/tech-talks/${slug}.md`, `slides/companions/tech-talks/${slug}`);
    }
    paths.push(...opts.include);
  }
  const label = opts.tooling ? "tooling" : slugs.join("+");

  const dirty = git(["status", "--porcelain", "--", ...paths]);
  if (dirty) console.warn(`⚠ Uncommitted changes in these paths are NOT published (commit them first):\n${dirty}\n`);

  git(["fetch", "origin", "main", "--quiet"]);
  const wt = join(tmpdir(), `publish-${label}-${Date.now()}`);
  git(["worktree", "add", "--quiet", "--detach", wt, "origin/main"]);
  const links = [];
  try {
    const restorable = paths.filter((p) => inTree(source, p, wt) || inTree("HEAD", p, wt));
    if (!restorable.length) throw new Error("Nothing to publish: none of the paths exist on the branch or main.");
    git(["restore", `--source=${source}`, "--staged", "--worktree", "--", ...restorable], wt);

    for (const dir of ["node_modules", "slides/node_modules"]) {
      const target = join(repo, dir);
      if (existsSync(target)) {
        symlinkSync(target, join(wt, dir), "junction");
        links.push(join(wt, dir));
      }
    }

    console.log(`\n▶ Regenerating index and inventory on main`);
    run(["slides/scripts/sync-index-dates.mjs"], wt);
    try {
      run(["scripts/portfolio-inventory.mjs"], wt);
    } catch {
      console.warn("⚠ Inventory reported errors (listed above); the file was still regenerated.");
    }
    git(["add", "-A", "--", ...restorable.filter((p) => existsSync(join(wt, p)))], wt);
    const changed = new Set(git(["diff", "--cached", "--name-only"], wt).split(/\r?\n/).filter(Boolean));
    restoreInventoryNoise(wt, changed);

    console.log(`\n▶ Ship checks`);
    run(["scripts/check-companions.mjs", "--strict"], join(wt, "slides"));
    for (const slug of slugs) {
      if (existsSync(join(wt, "slides", "tech-talks", slug, "slides.js"))) {
        run(["scripts/validate-native-deck.mjs", `tech-talks/${slug}`], join(wt, "slides"));
      }
    }

    for (const link of links.splice(0)) unlinkSync(link);
    git(["add", "-A"], wt);
    const stat = git(["diff", "--cached", "--stat"], wt);
    if (!stat) {
      console.log(`\n✓ main already matches ${branch} for ${label}; nothing to publish.`);
      return;
    }
    console.log(`\n▶ Changes for main (from ${branch} @ ${source.slice(0, 7)}):\n${stat}`);

    if (!opts.push) {
      const cmd = opts.tooling ? "--tooling" : slugs.join(" ");
      console.log(`\nDry run. Publish with: npm run publish:talk -- ${cmd}${opts.include.map((p) => ` --include ${p}`).join("")} -m "<message>" --push`);
      // Preview what would remain once this one ships.
      const after = pending("origin/main", source);
      after.talks = after.talks.filter((t) => !slugs.includes(t));
      if (opts.tooling) after.tooling = [];
      reportPending(after, branch);
      return;
    }
    git(["commit", "-q", "-m", opts.message, "-m", TRAILER], wt);
    git(["push", "origin", "HEAD:main"], wt);
    console.log(`\n✓ Pushed ${git(["log", "-1", "--format=%h %s"], wt)} to main`);
    reportPending(pending(git(["rev-parse", "HEAD"], wt), source), branch);
  } finally {
    for (const link of links) unlinkSync(link);
    if (opts.keep) console.log(`Worktree kept at ${wt}`);
    else git(["worktree", "remove", "--force", wt]);
  }
}

try {
  main();
} catch (err) {
  console.error(`✖ ${err.message}`);
  process.exit(1);
}

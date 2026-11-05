#!/usr/bin/env node
// Publish one reviewed talk from the current (staging) branch to main without
// bringing along any other unreviewed talk. Works in a temporary worktree of
// origin/main, so the current branch and working tree are never touched.
//
//   npm run publish:talk -- <slug> [--include <path>]... [-m "message"] [--push] [--keep]
//
// Without --push it is a dry run: it stages the change in the worktree, runs the
// ship checks, prints the diff stat, and cleans up.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const TRAILER = "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>";
const repo = resolve(import.meta.dirname, "..");

function parseArgs(argv) {
  const opts = { include: [], push: false, keep: false, message: null, slug: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--include") opts.include.push(argv[++i]);
    else if (a === "-m" || a === "--message") opts.message = argv[++i];
    else if (a === "--push") opts.push = true;
    else if (a === "--keep") opts.keep = true;
    else if (!a.startsWith("-") && !opts.slug) opts.slug = a;
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!opts.slug) throw new Error("Usage: npm run publish:talk -- <slug> [--include <path>]... [-m \"message\"] [--push]");
  if (opts.push && !opts.message) throw new Error("--push needs -m \"commit message\"");
  return opts;
}

const git = (args, cwd = repo) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
const run = (args, cwd) => execFileSync(process.execPath, args, { cwd, stdio: "inherit" });
const inTree = (rev, path, cwd) => git(["ls-tree", "-r", "--name-only", rev, "--", path], cwd) !== "";

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
  const { slug } = opts;
  const source = git(["rev-parse", "HEAD"]);
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);

  const readme = join(repo, "tech-talks", slug, "README.md");
  if (!existsSync(readme)) throw new Error(`No talk at tech-talks/${slug}/README.md`);
  if (/^status:\s*archived\s*$/m.test(readFileSync(readme, "utf8"))) throw new Error(`${slug} is archived; nothing to publish.`);

  const paths = [
    `tech-talks/${slug}`,
    `slides/tech-talks/${slug}`,
    `slides/tech-talks/${slug}.md`,
    `slides/companions/tech-talks/${slug}`,
    ...opts.include,
  ];

  const dirty = git(["status", "--porcelain", "--", ...paths]);
  if (dirty) console.warn(`⚠ Uncommitted changes in these paths are NOT published (commit them first):\n${dirty}\n`);

  git(["fetch", "origin", "main", "--quiet"]);
  const wt = join(tmpdir(), `publish-${slug}-${Date.now()}`);
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
    git(["add", "-A", "--", ...restorable], wt);
    const changed = new Set(git(["diff", "--cached", "--name-only"], wt).split(/\r?\n/).filter(Boolean));
    restoreInventoryNoise(wt, changed);

    console.log(`\n▶ Ship checks`);
    run(["scripts/check-companions.mjs", "--strict"], join(wt, "slides"));
    if (existsSync(join(wt, "slides", "tech-talks", slug, "slides.js"))) {
      run(["scripts/validate-native-deck.mjs", `tech-talks/${slug}`], join(wt, "slides"));
    }

    for (const link of links.splice(0)) unlinkSync(link);
    git(["add", "-A"], wt);
    const stat = git(["diff", "--cached", "--stat"], wt);
    if (!stat) {
      console.log(`\n✓ main already matches ${branch} for ${slug}; nothing to publish.`);
      return;
    }
    console.log(`\n▶ Changes for main (from ${branch} @ ${source.slice(0, 7)}):\n${stat}`);

    if (!opts.push) {
      console.log(`\nDry run. Publish with: npm run publish:talk -- ${slug}${opts.include.map((p) => ` --include ${p}`).join("")} -m "<message>" --push`);
      return;
    }
    git(["commit", "-q", "-m", opts.message, "-m", TRAILER], wt);
    git(["push", "origin", "HEAD:main"], wt);
    console.log(`\n✓ Pushed ${git(["log", "-1", "--format=%h %s"], wt)} to main`);
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

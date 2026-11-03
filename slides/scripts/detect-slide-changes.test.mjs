import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { detectSlideChanges } from "./detect-slide-changes.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "slide-changes-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return {
    root,
    add(file) {
      const path = join(root, file);
      mkdirSync(join(path, ".."), { recursive: true });
      writeFileSync(path, "");
    },
    native(slug) {
      for (const file of ["index.html", "slides.js", "scenes.js", "notes.html"]) {
        this.add(`tech-talks/${slug}/${file}`);
      }
    },
  };
}

test("native conversion satisfies talk sync without requiring a Slidev source", (t) => {
  const f = fixture(t);
  f.native("copilot-cli");
  const plan = detectSlideChanges([
    "tech-talks/copilot-cli/README.md",
    "slides/tech-talks/copilot-cli/slides.js",
    "slides/tech-talks/copilot-cli.md",
  ], f.root);
  assert.deepEqual(plan.changed_native, ["copilot-cli"]);
  assert.deepEqual(plan.changed_slides, []);
});

test("native deck takes precedence over a retained Slidev reference", (t) => {
  const f = fixture(t);
  f.native("copilot-cli");
  f.add("tech-talks/copilot-cli.md");
  const plan = detectSlideChanges([
    "slides/tech-talks/copilot-cli/slides.js",
    "slides/tech-talks/copilot-cli.md",
  ], f.root);
  assert.deepEqual(plan.changed_slides, []);
  assert.deepEqual(plan.changed_native, ["copilot-cli"]);
});

test("talk-only updates still fail for native and Slidev talks, even on full rebuilds", (t) => {
  const f = fixture(t);
  f.native("native");
  f.add("tech-talks/legacy.md");
  for (const slug of ["native", "legacy"]) {
    assert.throws(() => detectSlideChanges([
      `tech-talks/${slug}/README.md`,
      "slides/package.json",
    ], f.root), /requires a corresponding/);
  }
});

test("Slidev talk updates and workshop decks retain their build paths", (t) => {
  const f = fixture(t);
  f.add("tech-talks/legacy.md");
  f.add("workshop/exercise.md");
  const plan = detectSlideChanges([
    "tech-talks/legacy/README.md",
    "slides/tech-talks/legacy.md",
    "slides/workshop/exercise.md",
    "tech-talks/archive/old/README.md",
  ], f.root);
  assert.deepEqual(plan.changed_slides, ["tech-talks/legacy.md", "workshop/exercise.md"]);
  assert.deepEqual(plan.changed_native, []);
});

test("shared native changes validate all native decks without rebuilding Slidev", (t) => {
  const f = fixture(t);
  const plan = detectSlideChanges(["slides/native/theme.css"], f.root);
  assert.equal(plan.full_native, true);
  assert.equal(plan.full_rebuild, false);
  const shared = detectSlideChanges(["slides/package-lock.json"], f.root);
  assert.equal(shared.full_native, true);
  assert.equal(shared.full_rebuild, true);
});

test("incomplete native folders fail rather than silently skipping validation", (t) => {
  const f = fixture(t);
  f.add("tech-talks/partial/index.html");
  assert.throws(() => detectSlideChanges([
    "slides/tech-talks/partial/index.html",
  ], f.root), /Incomplete native deck/);
});

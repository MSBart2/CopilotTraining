import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { discoverNativeDecks, getNativeDeck } from "./native-decks.mjs";

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "native-decks-"));
  const techTalks = join(root, "tech-talks");
  mkdirSync(techTalks);
  return {
    root,
    addDeck(slug, files) {
      const dir = join(techTalks, slug);
      mkdirSync(dir);
      for (const file of files) writeFileSync(join(dir, file), "");
      return dir;
    },
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

test("discovers complete native decks and ignores non-native directories", () => {
  const f = fixture();
  try {
    f.addDeck("zeta", ["index.html", "slides.js", "scenes.js", "notes.html"]);
    f.addDeck("alpha", ["index.html", "slides.js", "scenes.js", "notes.html"]);
    f.addDeck("components", ["Button.vue"]);
    f.addDeck("dist", ["index.html", "slides.js", "scenes.js", "notes.html"]);

    assert.deepEqual(discoverNativeDecks(f.root).map(({ slug }) => slug), ["alpha", "zeta"]);
  } finally {
    f.cleanup();
  }
});

test("rejects incomplete native deck folders", () => {
  const f = fixture();
  try {
    f.addDeck("partial", ["index.html"]);
    assert.throws(() => getNativeDeck(f.root, "partial"), /missing slides\.js, scenes\.js, notes\.html/);
  } finally {
    f.cleanup();
  }
});

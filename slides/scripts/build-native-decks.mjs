#!/usr/bin/env node
import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { discoverNativeDecks } from "./native-decks.mjs";

const scriptsDir = fileURLToPath(new URL(".", import.meta.url));
const slidesRoot = join(scriptsDir, "..");
const distRoot = join(slidesRoot, "dist");
const args = process.argv.slice(2);
const deckIndex = args.indexOf("--deck");
const folderIndex = args.indexOf("--folder");
const deckFilter = deckIndex >= 0 ? args[deckIndex + 1] : null;
const folderFilter = folderIndex >= 0 ? args[folderIndex + 1] : null;

if (deckIndex >= 0 && !deckFilter) {
  console.error("--deck requires a slug.");
  process.exit(2);
}
if (folderFilter && folderFilter !== "tech-talks") {
  console.error("Native decks are available only in tech-talks.");
  process.exit(2);
}

const available = discoverNativeDecks(slidesRoot);
const decks = available.filter((deck) => !deckFilter || deck.slug === deckFilter);
if (deckFilter && !decks.length) {
  console.log(`No native deck selected for ${deckFilter}; Slidev build selection is unchanged.`);
  process.exit(0);
}
if (!decks.length) {
  console.log("No native decks found.");
  process.exit(0);
}

const keys = new Set();
for (const deck of decks) {
  const key = `${deck.category}/${deck.slug}`;
  if (keys.has(key)) throw new Error(`Duplicate native deployment target: ${key}`);
  keys.add(key);
  if (existsSync(join(slidesRoot, deck.category, `${deck.slug}.md`))) {
    console.log(`Using native ${key}; preserving its Slidev source as a conversion reference.`);
  }
}

for (const deck of decks) {
  console.log(`Validating ${deck.category}/${deck.slug}...`);
  const result = spawnSync(
    process.execPath,
    [join(scriptsDir, "validate-native-deck.mjs"), `${deck.category}/${deck.slug}`],
    { cwd: slidesRoot, stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    console.error(`Native validation failed for ${deck.category}/${deck.slug}.`);
    process.exit(result.status ?? 1);
  }
}

const sharedSource = join(slidesRoot, "native");
const sharedTarget = join(distRoot, "native");
if (!existsSync(sharedSource)) throw new Error(`Native engine directory is missing: ${sharedSource}`);
rmSync(sharedTarget, { recursive: true, force: true });
cpSync(sharedSource, sharedTarget, { recursive: true });

mkdirSync(join(distRoot, "tech-talks"), { recursive: true });
const logo = join(slidesRoot, "tech-talks", "sdp-logo.png");
if (existsSync(logo)) copyFileSync(logo, join(distRoot, "tech-talks", "sdp-logo.png"));
for (const deck of decks) {
  const target = join(distRoot, deck.category, deck.slug);
  rmSync(target, { recursive: true, force: true });
  cpSync(deck.dir, target, { recursive: true });
  console.log(`Published ${deck.category}/${deck.slug}.`);
}
